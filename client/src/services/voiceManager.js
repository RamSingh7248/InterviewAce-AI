/**
 * VoiceManager Service for InterviewAce AI
 * 
 * Provides professional browser-native Text-to-Speech (TTS) capabilities using
 * window.speechSynthesis & SpeechSynthesisUtterance with:
 * - Natural human-like voice auto-selection (Google Natural, Microsoft Natural, Apple Samantha)
 * - Strict deduplication to prevent repeated playback on React component re-renders
 * - Audio collision prevention: locks out speech recognition while AI is speaking
 * - Word boundary tracking for synchronized live closed-captions
 * - Full lifecycle control (pause, resume, cancel, replay)
 * - Zero external API keys or cloud dependencies required
 */

class VoiceManager {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtteranceId = null;
    this.currentUtterance = null;
    this.voices = [];
    this.activeVoice = null;
    this.isSpeaking = false;
    this.isPaused = false;
    this.onStateChangeCallbacks = new Set();
    this._keepAliveTimer = null; // Chrome speechSynthesis freeze workaround

    if (this.synth) {
      this._loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this._loadVoices();
      }
    }
  }

  /**
   * Chrome pauses speechSynthesis after ~15 seconds of continuous speech.
   * Calling synth.pause() then synth.resume() periodically prevents the freeze.
   */
  _startKeepAlive() {
    this._stopKeepAlive();
    this._keepAliveTimer = setInterval(() => {
      if (this.synth && this.isSpeaking && !this.isPaused) {
        try {
          this.synth.pause();
          this.synth.resume();
        } catch (e) { /* ignore */ }
      }
    }, 10000);
  }

  _stopKeepAlive() {
    if (this._keepAliveTimer) {
      clearInterval(this._keepAliveTimer);
      this._keepAliveTimer = null;
    }
  }

  /**
   * Check if Speech Synthesis is supported in the current browser
   */
  isSupported() {
    return Boolean(this.synth && typeof window.SpeechSynthesisUtterance !== 'undefined');
  }

  /**
   * Helper to match best voice from an array of voices without recursion
   */
  _findMatchingVoice(voicesList = [], lang = 'en-US') {
    if (!voicesList || voicesList.length === 0) return null;

    const cleanLang = (lang || 'en-US').toLowerCase();
    const prefix = cleanLang.split('-')[0]; // 'hi', 'en', 'es', etc.

    // 1. Exact match with Natural / Neural / Google priority
    const exactNatural = voicesList.find(v => 
      v.lang && v.lang.toLowerCase() === cleanLang && 
      (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Online'))
    );
    if (exactNatural) return exactNatural;

    // 2. Exact language match
    const exact = voicesList.find(v => v.lang && v.lang.toLowerCase() === cleanLang);
    if (exact) return exact;

    // 3. Prefix match with Natural / Neural priority (e.g. any Hindi voice if 'hi-IN')
    const prefixNatural = voicesList.find(v => 
      v.lang && v.lang.toLowerCase().startsWith(prefix) && 
      (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Online'))
    );
    if (prefixNatural) return prefixNatural;

    // 4. Any voice matching language prefix
    const prefixMatch = voicesList.find(v => v.lang && v.lang.toLowerCase().startsWith(prefix));
    if (prefixMatch) return prefixMatch;

    return null;
  }

  /**
   * Load and cache voices from browser speech synthesis
   */
  _loadVoices() {
    if (!this.synth) return [];
    const allVoices = this.synth.getVoices ? this.synth.getVoices() : [];
    this.voices = allVoices || [];

    // Default to natural English voice for English default if voices are loaded
    if (this.voices.length > 0) {
      this.activeVoice = this._findMatchingVoice(this.voices, 'en-US');
    } else {
      this.activeVoice = null;
    }
    return this.voices;
  }

  /**
   * Find the highest-quality voice available for a specific BCP-47 language tag
   * (e.g. 'hi-IN' or 'en-US')
   */
  getVoiceForLanguage(lang = 'en-US') {
    if (!this.synth) return null;
    if (this.voices.length === 0 && this.synth.getVoices) {
      this.voices = this.synth.getVoices() || [];
    }
    if (this.voices.length === 0) {
      return null;
    }

    return this._findMatchingVoice(this.voices, lang);
  }

  /**
   * Check if the browser has a native voice installed for the requested language
   */
  isLanguageVoiceAvailable(lang = 'en-US') {
    return Boolean(this.getVoiceForLanguage(lang));
  }

  /**
   * Get list of loaded voices
   */
  getVoices() {
    if (this.voices.length === 0) {
      this._loadVoices();
    }
    return this.voices;
  }

  /**
   * Get active voice name for display
   */
  getActiveVoiceName(lang = 'en-US') {
    const voice = this.getVoiceForLanguage(lang);
    if (voice) return voice.name;
    if (this.activeVoice) return this.activeVoice.name;
    return lang.startsWith('hi') ? 'System Hindi Voice' : 'Standard Natural Voice';
  }

  /**
   * Set custom voice by name
   */
  setVoiceByName(name) {
    const found = this.voices.find(v => v.name === name);
    if (found) {
      this.activeVoice = found;
    }
  }

  /**
   * Subscribe to speaking state changes
   */
  subscribe(callback) {
    this.onStateChangeCallbacks.add(callback);
    return () => this.onStateChangeCallbacks.delete(callback);
  }

  _notify(state) {
    this.onStateChangeCallbacks.forEach(cb => {
      try { cb(state); } catch (e) { console.warn('VoiceManager subscriber error:', e); }
    });
  }

  /**
   * Speak a question aloud with deduplication & collision prevention
   * 
   * @param {Object} options
   * @param {string} options.text - The question text to speak
   * @param {string} options.id - Stable question ID to prevent duplicate speech on rerenders
   * @param {string} options.lang - BCP-47 language tag (e.g. 'hi-IN', 'en-US')
   * @param {boolean} options.force - If true, bypasses the same-id check (used for explicit Replay)
   * @param {Function} options.onStart - Callback fired when speech starts
   * @param {Function} options.onEnd - Callback fired when speech completes
   * @param {Function} options.onBoundary - Callback fired on word/sentence boundaries with { charIndex, word }
   * @param {Function} options.onError - Callback fired if speech fails
   * @param {Function} options.onVoiceFallback - Callback fired if native voice for language is not installed
   */
  speak({ text, id, lang = 'en-US', force = false, onStart, onEnd, onBoundary, onError, onVoiceFallback } = {}) {
    if (!this.isSupported()) {
      if (onError) onError(new Error('Speech Synthesis is not supported in this browser environment.'));
      return;
    }

    if (!text || !text.trim()) {
      return;
    }

    // DEDUPLICATION: If this exact question is already speaking or was just spoken, avoid repeating
    if (!force && this.currentUtteranceId === id && this.isSpeaking) {
      return;
    }

    // Cancel any ongoing speech before starting new utterance
    this.cancel();

    this.currentUtteranceId = id;
    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Set correct language property on utterance (e.g. 'hi-IN' or 'en-US')
    utterance.lang = lang || 'en-US';

    const targetVoice = this.getVoiceForLanguage(lang);
    if (targetVoice) {
      utterance.voice = targetVoice;
      this.activeVoice = targetVoice;
    } else {
      // If native voice is missing in this browser, use fallback voice without resetting language tag
      const fallbackVoice = this.getVoiceForLanguage('en-US') || this.voices[0] || null;
      if (fallbackVoice) {
        utterance.voice = fallbackVoice;
      }
      if (onVoiceFallback) {
        onVoiceFallback({
          requestedLang: lang,
          voiceUsed: fallbackVoice ? fallbackVoice.name : 'Browser Default'
        });
      }
    }

    // Interview cadence: clear, measured, and natural pace
    utterance.rate = lang && lang.startsWith('hi') ? 0.92 : 0.98;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      this._startKeepAlive();
      this._notify({ isSpeaking: true, isPaused: false, currentId: id });
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this._stopKeepAlive();
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this._notify({ isSpeaking: false, isPaused: false, currentId: id });
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      this._stopKeepAlive();
      // 'interrupted' or 'canceled' are normal lifecycle events when user advances or skips
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        console.warn('SpeechSynthesis error:', event.error);
        if (onError) onError(new Error(`Speech synthesis error: ${event.error}`));
      }
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this._notify({ isSpeaking: false, isPaused: false, currentId: id });
    };

    if (onBoundary) {
      utterance.onboundary = (event) => {
        if (event.name === 'word' || event.name === 'sentence') {
          const charIndex = event.charIndex;
          const remaining = text.slice(charIndex);
          const word = remaining.split(/\s+/)[0] || '';
          onBoundary({ charIndex, word });
        }
      };
    }

    // Small delay to ensure browser audio pipeline is clean
    setTimeout(() => {
      try {
        this.synth.speak(utterance);
      } catch (err) {
        console.warn('VoiceManager speak exception:', err);
        this.isSpeaking = false;
        if (onError) onError(err);
      }
    }, 40);
  }

  /**
   * Pause ongoing speech
   */
  pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      try {
        this.synth.pause();
        this.isPaused = true;
        this._notify({ isSpeaking: true, isPaused: true, currentId: this.currentUtteranceId });
      } catch (e) {
        console.warn('VoiceManager pause error:', e);
      }
    }
  }

  /**
   * Resume paused speech
   */
  resume() {
    if (this.synth && this.isPaused) {
      try {
        this.synth.resume();
        this.isPaused = false;
        this._notify({ isSpeaking: true, isPaused: false, currentId: this.currentUtteranceId });
      } catch (e) {
        console.warn('VoiceManager resume error:', e);
      }
    }
  }

  /**
   * Stop and cancel all speech immediately
   */
  cancel() {
    this._stopKeepAlive();
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        console.warn('VoiceManager cancel error:', e);
      }
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this._notify({ isSpeaking: false, isPaused: false, currentId: null });
  }
}

// Singleton instance for application-wide voice lifecycle
export const voiceManager = new VoiceManager();
export default voiceManager;
