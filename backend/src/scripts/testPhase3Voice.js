/**
 * Test Suite for Phase 3: Spoken AI Questions (Text-to-Speech Engine & Audio Collision Prevention)
 */

console.log('================================================================');
console.log('   INTERVIEWACE AI - PHASE 3: SPOKEN AI QUESTIONS & COLLISION TEST');
console.log('================================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

// Mock SpeechSynthesis environment for Node testing
class MockSpeechSynthesisUtterance {
  constructor(text) {
    this.text = text;
    this.rate = 1.0;
    this.pitch = 1.0;
    this.volume = 1.0;
    this.onstart = null;
    this.onend = null;
    this.onerror = null;
    this.onboundary = null;
  }
}

class MockSpeechSynthesis {
  constructor() {
    this.speaking = false;
    this.paused = false;
    this._voices = [
      { name: 'Microsoft David Desktop - English (United States)', lang: 'en-US' },
      { name: 'Google US English Natural', lang: 'en-US' },
      { name: 'Microsoft Zira Desktop - English (United States)', lang: 'en-US' }
    ];
  }

  getVoices() {
    return this._voices;
  }

  speak(utterance) {
    this.speaking = true;
    this.paused = false;
    if (utterance.onstart) utterance.onstart();
  }

  pause() {
    if (this.speaking) {
      this.paused = true;
    }
  }

  resume() {
    if (this.paused) {
      this.paused = false;
    }
  }

  cancel() {
    this.speaking = false;
    this.paused = false;
  }
}

// Simulated VoiceManager implementation for Node test verification
class VoiceManagerTest {
  constructor(mockSynth) {
    this.synth = mockSynth;
    this.currentUtteranceId = null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.isPaused = false;
    this.voices = this.synth.getVoices();
    this.activeVoice = this._selectBestVoice(this.voices);
  }

  _selectBestVoice(voices) {
    const natural = voices.find(v => v.name.includes('Natural') || v.name.includes('Google'));
    return natural || voices[0];
  }

  speak({ text, id, force = false, onStart, onEnd, onError }) {
    // 1. Deduplication guard
    if (!force && this.currentUtteranceId === id && this.isSpeaking) {
      return { skipped: true, reason: 'duplicate_guard' };
    }

    this.cancel();
    this.currentUtteranceId = id;
    const utterance = new MockSpeechSynthesisUtterance(text);
    utterance.voice = this.activeVoice;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
    this.currentUtterance = utterance;
    return { skipped: false, utterance };
  }

  pause() {
    if (this.synth && this.isSpeaking) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  cancel() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentUtterance = null;
  }
}

// Simulated Audio Collision Prevention logic
class CollisionPreventer {
  constructor(voiceManager) {
    this.voiceManager = voiceManager;
    this.isMicListening = false;
  }

  tryStartListening() {
    // Strict lockout guard: cannot listen while AI is speaking or paused
    if (this.voiceManager.isSpeaking || this.voiceManager.isPaused) {
      return { allowed: false, reason: 'ai_is_speaking_lockout' };
    }
    this.isMicListening = true;
    return { allowed: true };
  }

  stopListening() {
    this.isMicListening = false;
  }

  onAiWillSpeak() {
    // Halts mic immediately
    this.stopListening();
  }
}

async function runTests() {
  console.log('[Test Group 1] Voice Selection & Natural Prioritization:');
  const synth = new MockSpeechSynthesis();
  const vm = new VoiceManagerTest(synth);

  assert(vm.activeVoice !== null, 'Voice was successfully loaded');
  assert(vm.activeVoice.name.includes('Google') || vm.activeVoice.name.includes('Natural'), 'Natural voice prioritized over basic voice');

  console.log('\n[Test Group 2] Spoken Question Deduplication (Rerender Protection):');
  let startCount = 0;
  const res1 = vm.speak({
    text: 'What are the memory areas in the Java Virtual Machine?',
    id: 'q_jvm_101',
    force: false,
    onStart: () => { startCount++; }
  });

  assert(res1.skipped === false, 'First speak request for question q_jvm_101 executes normally');
  assert(vm.isSpeaking === true, 'VoiceManager status is speaking');
  assert(startCount === 1, 'onStart callback fired once');

  // Simulate component rerender attempting to speak the same active question
  const res2 = vm.speak({
    text: 'What are the memory areas in the Java Virtual Machine?',
    id: 'q_jvm_101',
    force: false,
    onStart: () => { startCount++; }
  });

  assert(res2.skipped === true && res2.reason === 'duplicate_guard', 'Duplicate speech request on rerender was strictly blocked by deduplication guard');
  assert(startCount === 1, 'onStart callback was not duplicated');

  // Forced replay explicitly bypasses the deduplication guard
  const res3 = vm.speak({
    text: 'What are the memory areas in the Java Virtual Machine?',
    id: 'q_jvm_101',
    force: true,
    onStart: () => { startCount++; }
  });

  assert(res3.skipped === false, 'Replay request (force: true) successfully re-triggers question speech');
  assert(startCount === 2, 'onStart callback fired for explicit question replay');

  console.log('\n[Test Group 3] Audio Collision & Echo Prevention:');
  const collision = new CollisionPreventer(vm);

  // Attempt to start mic while AI is speaking
  assert(vm.isSpeaking === true, 'AI is currently speaking question');
  const listenAttempt1 = collision.tryStartListening();
  assert(listenAttempt1.allowed === false && listenAttempt1.reason === 'ai_is_speaking_lockout', 'Candidate microphone listening is strictly locked out while AI is speaking');
  assert(collision.isMicListening === false, 'Microphone was not permitted to activate');

  // AI finishes speaking
  vm.currentUtterance.onend();
  assert(vm.isSpeaking === false, 'AI finished speaking question');

  // Attempt to start mic after AI finishes
  const listenAttempt2 = collision.tryStartListening();
  assert(listenAttempt2.allowed === true, 'Candidate microphone permitted to activate after AI finishes speech');
  assert(collision.isMicListening === true, 'Microphone is now actively listening');

  // If AI starts speaking next question or replay, mic is immediately halted
  collision.onAiWillSpeak();
  assert(collision.isMicListening === false, 'Microphone immediately halted before AI speaks again');

  console.log('\n[Test Group 4] Lifecycle & Pause/Resume/Cancel:');
  vm.speak({ text: 'Explain deadlock conditions.', id: 'q_deadlock_2', force: true });
  assert(vm.isSpeaking === true, 'Question speech active');

  vm.pause();
  assert(vm.isPaused === true, 'Question speech paused on interview pause');
  assert(synth.paused === true, 'SpeechSynthesis paused');

  vm.resume();
  assert(vm.isPaused === false, 'Question speech resumed on interview resume');
  assert(synth.paused === false, 'SpeechSynthesis resumed');

  vm.cancel();
  assert(vm.isSpeaking === false, 'Speech cancelled immediately on cancel');
  assert(synth.speaking === false, 'Audio playback stopped and cleaned up');

  console.log('\n================================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
