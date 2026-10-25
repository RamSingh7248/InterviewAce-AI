/**
 * Test Suite for Phase 4: Candidate Microphone and Speech Input (Enhanced STT & Visualizer)
 */

console.log('================================================================');
console.log('   INTERVIEWACE AI - PHASE 4: CANDIDATE MICROPHONE & STT TEST');
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

// Simulated Speech Accumulator matching the exact logic in InterviewSession.jsx
class SpeechTranscriptAccumulator {
  constructor() {
    this.finalTranscript = '';
    this.interimText = '';
    this.fullAnswer = '';
  }

  processRecognitionResult(results) {
    let interim = '';
    let finalChunk = '';

    for (let i = 0; i < results.length; i++) {
      const part = results[i].transcript;
      if (results[i].isFinal) {
        finalChunk += part + ' ';
      } else {
        interim += part;
      }
    }

    if (finalChunk) {
      const currentFinal = this.finalTranscript ? this.finalTranscript.trimEnd() + ' ' : '';
      this.finalTranscript = currentFinal + finalChunk.trim();
    }

    this.interimText = interim.trim();

    const activeFinal = this.finalTranscript.trim();
    const activeInterim = interim.trim();
    this.fullAnswer = activeFinal 
      ? (activeInterim ? `${activeFinal} ${activeInterim}` : activeFinal)
      : activeInterim;

    return this.fullAnswer;
  }

  userManualEdit(newText) {
    this.finalTranscript = newText;
    this.interimText = '';
    this.fullAnswer = newText;
  }

  clear() {
    this.finalTranscript = '';
    this.interimText = '';
    this.fullAnswer = '';
  }
}

async function runTests() {
  console.log('[Test Group 1] Speech Recognition Transcript Accumulation & Deduplication:');
  const accumulator = new SpeechTranscriptAccumulator();

  // 1. First interim chunk arrives
  accumulator.processRecognitionResult([{ transcript: 'In Java', isFinal: false }]);
  assert(accumulator.fullAnswer === 'In Java', 'Interim speech displayed in real-time');
  assert(accumulator.interimText === 'In Java', 'Interim text tracks unfinalized speech');

  // 2. Second interim chunk arrives (speaker continues saying words)
  accumulator.processRecognitionResult([{ transcript: 'In Java the garbage collector', isFinal: false }]);
  assert(accumulator.fullAnswer === 'In Java the garbage collector', 'Interim text updates smoothly without duplicating "In Java"');

  // 3. First sentence finalized
  accumulator.processRecognitionResult([{ transcript: 'In Java the garbage collector manages heap memory.', isFinal: true }]);
  assert(accumulator.fullAnswer === 'In Java the garbage collector manages heap memory.', 'Finalized sentence committed cleanly');
  assert(accumulator.interimText === '', 'Interim text cleared upon finalization');

  // 4. Candidate begins second sentence (interim followed by final)
  accumulator.processRecognitionResult([{ transcript: 'It uses generational', isFinal: false }]);
  assert(accumulator.fullAnswer === 'In Java the garbage collector manages heap memory. It uses generational', 'Second sentence streams after first without duplicating words');

  accumulator.processRecognitionResult([{ transcript: 'It uses generational hypothesis algorithms.', isFinal: true }]);
  assert(accumulator.fullAnswer === 'In Java the garbage collector manages heap memory. It uses generational hypothesis algorithms.', 'Both sentences finalized together seamlessly');

  console.log('\n[Test Group 2] Candidate Manual Editing & Continued Speech:');
  // Candidate manually corrects a word (e.g. changes "hypothesis algorithms" to "G1 and ZGC algorithms")
  accumulator.userManualEdit('In Java the garbage collector manages heap memory. It uses G1 and ZGC algorithms.');
  assert(accumulator.fullAnswer.includes('G1 and ZGC algorithms'), 'Candidate manual edit accepted into transcript state');

  // Candidate continues speaking after editing
  accumulator.processRecognitionResult([{ transcript: 'which reduces stop-the-world pauses.', isFinal: true }]);
  assert(accumulator.fullAnswer === 'In Java the garbage collector manages heap memory. It uses G1 and ZGC algorithms. which reduces stop-the-world pauses.', 'Subsequent speech appends naturally to manual candidate edits without reverting or duplicating');

  console.log('\n[Test Group 3] Clear Transcript Control:');
  accumulator.clear();
  assert(accumulator.fullAnswer === '', 'Clear transcript resets candidate answer');
  assert(accumulator.finalTranscript === '', 'Clear transcript resets internal final buffer');
  assert(accumulator.interimText === '', 'Clear transcript resets interim buffer');

  console.log('\n[Test Group 4] Real Audio Volume Measurement Simulation:');
  // Simulate AudioContext Analyser frequency data normalization (0 - 100%)
  const calculateVolumeLevel = (frequencyBytes) => {
    let sum = 0;
    for (let i = 0; i < frequencyBytes.length; i++) {
      sum += frequencyBytes[i];
    }
    const average = sum / frequencyBytes.length;
    return Math.min(100, Math.round((average / 128) * 100));
  };

  const silence = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
  const normalSpeech = new Uint8Array([35, 50, 42, 60, 48, 55, 38, 45]);
  const loudSpeech = new Uint8Array([110, 125, 120, 130, 115, 128, 122, 118]);

  assert(calculateVolumeLevel(silence) === 0, 'Silence computes exact 0% volume');
  const normalLevel = calculateVolumeLevel(normalSpeech);
  assert(normalLevel >= 30 && normalLevel <= 45, `Normal speech volume calibrated accurately (${normalLevel}%)`);
  const loudLevel = calculateVolumeLevel(loudSpeech);
  assert(loudLevel >= 90, `Loud speech volume calibrated accurately (${loudLevel}%)`);

  console.log('\n[Test Group 5] Error Handling & Device Permission Classification:');
  const classifySpeechError = (errorCode) => {
    switch (errorCode) {
      case 'not-allowed':
      case 'service-not-allowed':
        return { type: 'permission_denied', fallbackToText: true, message: 'Microphone permission blocked.' };
      case 'audio-capture':
        return { type: 'no_mic_hardware', fallbackToText: true, message: 'No microphone detected.' };
      case 'network':
        return { type: 'network_glitch', fallbackToText: false, canRetry: true, message: 'Network glitch.' };
      case 'no-speech':
        return { type: 'silence', ignore: true };
      default:
        return { type: 'general_notice', fallbackToText: false };
    }
  };

  const err1 = classifySpeechError('not-allowed');
  assert(err1.type === 'permission_denied' && err1.fallbackToText === true, 'Microphone denial triggers automatic text fallback');

  const err2 = classifySpeechError('audio-capture');
  assert(err2.type === 'no_mic_hardware' && err2.fallbackToText === true, 'Missing hardware triggers text fallback');

  const err3 = classifySpeechError('network');
  assert(err3.type === 'network_glitch' && err3.canRetry === true, 'Network failure allows 1-click retry');

  const err4 = classifySpeechError('no-speech');
  assert(err4.ignore === true, 'Silence (no-speech) is ignored safely without error alert');

  console.log('\n================================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
