/**
 * Normalize question text for reliable deduplication comparison and indexing.
 * Strips whitespace, standardizes punctuation, and removes case differences.
 * 
 * @param {string} text - Raw question text
 * @returns {string} Normalized string
 */
export const normalizeQuestionText = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // remove punctuation
    .replace(/\s+/g, ' ')     // collapse multiple spaces/newlines
    .trim();
};

export default normalizeQuestionText;
