/**
 * Voice Metrics Calculator Utility for InterviewAce AI
 * 
 * Computes words-per-minute (WPM), filler word count, speech duration,
 * pause counts, and delivery clarity tips from candidate speech transcripts.
 */

// Common English & Hindi vocal disfluencies and fillers
const FILLER_PATTERNS = [
  /\bum+\b/gi,
  /\buh+\b/gi,
  /\blike\b/gi,
  /\bbasically\b/gi,
  /\bactually\b/gi,
  /\byou know\b/gi,
  /\bsort of\b/gi,
  /\bkind of\b/gi,
  /\bmatlab\b/gi,
  /\byaani\b/gi,
  /\btoh\b/gi,
  /\bi mean\b/gi
];

/**
 * Calculate comprehensive vocal delivery metrics
 * 
 * @param {string} transcript - The spoken answer text
 * @param {Object} clientMetrics - Optional client-measured data (duration, pause count)
 * @returns {Object} Voice metrics breakdown
 */
export function computeVoiceMetrics(transcript = '', clientMetrics = {}) {
  const text = (transcript || '').trim();
  const words = text ? text.split(/\s+/).filter(Boolean) : [];
  const wordsCount = words.length;

  // Use client-measured duration if valid; otherwise estimate based on standard speaking rate (~130 WPM)
  let durationSeconds = Number(clientMetrics.durationSeconds);
  if (!durationSeconds || durationSeconds <= 0) {
    durationSeconds = Math.max(1, Math.round((wordsCount / 130) * 60));
  }
  const durationMinutes = Math.max(0.08, durationSeconds / 60);
  const wpm = wordsCount > 0 ? Math.round(wordsCount / durationMinutes) : 0;

  // Detect filler words
  const foundFillers = [];
  let fillerWordsCount = 0;

  FILLER_PATTERNS.forEach(regex => {
    const matches = text.match(regex);
    if (matches && matches.length > 0) {
      fillerWordsCount += matches.length;
      const lowerWord = matches[0].toLowerCase();
      if (!foundFillers.includes(lowerWord)) {
        foundFillers.push(lowerWord);
      }
    }
  });

  const pauseCount = Number(clientMetrics.pauseCount) || 0;

  // Pace assessment
  let paceAssessment = 'Optimal pace';
  let clarityTip = 'Natural, conversational pace that is easy for interviewers to follow.';

  if (wordsCount === 0) {
    paceAssessment = 'No speech recorded';
    clarityTip = 'Please speak clearly into your microphone.';
  } else if (wpm < 85) {
    paceAssessment = 'Slow / Deliberate pace';
    clarityTip = 'Speaking rate was slightly slow (< 85 WPM). Try speaking with more momentum (aim for 120-150 WPM).';
  } else if (wpm > 180) {
    paceAssessment = 'Fast pace';
    clarityTip = 'Speaking rate was rapid (> 180 WPM). Slow down slightly and pause between key technical points.';
  } else if (wpm >= 115 && wpm <= 165) {
    paceAssessment = 'Natural interview pace';
    clarityTip = 'Excellent pacing! Intelligible, confident, and well-structured delivery.';
  } else {
    paceAssessment = 'Moderate pace';
    clarityTip = 'Good speech cadence suitable for technical explanations.';
  }

  // Filler word impact
  if (fillerWordsCount > 4) {
    clarityTip += ` Detected ${fillerWordsCount} filler words (${foundFillers.join(', ')}). Replacing fillers with brief silent pauses creates an impression of high composure.`;
  }

  return {
    wpm,
    wordsCount,
    durationSeconds,
    fillerWordsCount,
    fillerWords: foundFillers,
    pauseCount,
    paceAssessment,
    clarityTip
  };
}

export default {
  computeVoiceMetrics
};
