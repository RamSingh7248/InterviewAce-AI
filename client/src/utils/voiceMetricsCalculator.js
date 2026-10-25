/**
 * Client-side Voice Metrics & Speech Analysis Helper
 * Computes words-per-minute (WPM), detects filler words, and assesses vocal delivery.
 */

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
  /\btoh\b/gi
];

export function analyzeTranscriptMetrics(transcript = '', durationSeconds = 0, pauseCount = 0) {
  const text = (transcript || '').trim();
  const words = text ? text.split(/\s+/).filter(Boolean) : [];
  const wordsCount = words.length;

  const effectiveDuration = durationSeconds > 0 ? durationSeconds : Math.max(1, Math.round((wordsCount / 130) * 60));
  const durationMinutes = Math.max(0.08, effectiveDuration / 60);
  const wpm = wordsCount > 0 ? Math.round(wordsCount / durationMinutes) : 0;

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

  let paceAssessment = 'Optimal pace';
  let badgeColor = '#22c55e'; // green

  if (wordsCount === 0) {
    paceAssessment = 'Waiting for speech';
    badgeColor = 'var(--text-muted)';
  } else if (wpm < 85) {
    paceAssessment = 'Slow pace (< 85 WPM)';
    badgeColor = '#eab308'; // amber
  } else if (wpm > 180) {
    paceAssessment = 'Fast pace (> 180 WPM)';
    badgeColor = '#f97316'; // orange
  } else if (wpm >= 115 && wpm <= 165) {
    paceAssessment = 'Natural pace (115–165 WPM)';
    badgeColor = '#22c55e';
  } else {
    paceAssessment = 'Moderate pace';
    badgeColor = '#38bdf8'; // cyan
  }

  return {
    wpm,
    wordsCount,
    durationSeconds: effectiveDuration,
    fillerWordsCount,
    fillerWords: foundFillers,
    pauseCount,
    paceAssessment,
    badgeColor
  };
}
