export const slidingWindowProblems = [
  {
    title: "Maximum Sum Subarray of Size K",
    slug: "max-sum-subarray-size-k",
    difficulty: "Easy",
    category: "dsa",
    topics: ["sliding-window", "arrays"],
    description: "Given an array of integers and an integer k, find the maximum sum of any contiguous subarray of size k.",
    examples: [
      { input: "2 1 5 1 3 2\n3", output: "9", explanation: "Subarray [5, 1, 3] has the maximum sum 9." }
    ],
    constraints: ["1 <= k <= arr.length <= 10^5"],
    hints: ["Calculate sum of the first k elements, then slide window by adding next and subtracting leaving element."],
    starterCode: {
      javascript: `function solve(input) {\n  const [l1, l2] = input.trim().split('\\n');\n  const nums = l1.split(/\\s+/).map(Number);\n  const k = Number(l2);\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "2 1 5 1 3 2\n3", expectedOutput: "9" },
      { input: "2 3 4 1 5\n2", expectedOutput: "7" }
    ],
    hiddenTestCases: [
      { input: "1 2\n1", expectedOutput: "2" },
      { input: "10 20 30 40\n4", expectedOutput: "100" },
      { input: "-1 -2 -3 -4\n2", expectedOutput: "-3" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [l1, l2] = input.trim().split('\\n');
  const nums = l1.trim().split(/\\s+/).map(Number);
  const k = Number(l2.trim());
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];
  let maxSum = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return String(maxSum);
}`
    }
  },
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    category: "dsa",
    topics: ["sliding-window", "strings", "hashing"],
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      { input: "abcabcbb", output: "3", explanation: "Answer is 'abc', with length of 3." },
      { input: "bbbbb", output: "1", explanation: "Answer is 'b', length 1." }
    ],
    constraints: ["0 <= s.length <= 5 * 10^4"],
    hints: ["Use a sliding window map of character positions."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "pwwkew", expectedOutput: "3" },
      { input: " ", expectedOutput: "1" },
      { input: "dvdf", expectedOutput: "3" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const s = input.replace(/\\r?\\n$/, '');
  const lastPos = new Map();
  let maxLen = 0;
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (lastPos.has(ch) && lastPos.get(ch) >= start) {
      start = lastPos.get(ch) + 1;
    }
    lastPos.set(ch, i);
    maxLen = Math.max(maxLen, i - start + 1);
  }
  return String(maxLen);
}`
    }
  },
  {
    title: "Smallest Subarray Exceeding Target Sum",
    slug: "smallest-subarray-exceeding-target-sum",
    difficulty: "Medium",
    category: "dsa",
    topics: ["sliding-window", "arrays"],
    description: "Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray of which the sum is greater than or equal to target. If there is no such subarray, return 0.",
    examples: [
      { input: "2 3 1 2 4 3\n7", output: "2", explanation: "Subarray [4, 3] has minimal length 2." }
    ],
    constraints: ["1 <= target <= 10^9", "1 <= nums.length <= 10^5"],
    hints: ["Expand window to right until sum >= target, then shrink from left while maintaining sum >= target."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "2 3 1 2 4 3\n7", expectedOutput: "2" },
      { input: "1 4 4\n4", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 1 1 1 1 1 1 1\n11", expectedOutput: "0" },
      { input: "1 2 3 4 5\n15", expectedOutput: "5" },
      { input: "10 2 3\n6", expectedOutput: "1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [l1, l2] = input.trim().split('\\n');
  const nums = l1.trim().split(/\\s+/).map(Number);
  const target = Number(l2.trim());
  let minLen = Infinity;
  let sum = 0, l = 0;
  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];
    while (sum >= target) {
      minLen = Math.min(minLen, r - l + 1);
      sum -= nums[l++];
    }
  }
  return String(minLen === Infinity ? 0 : minLen);
}`
    }
  },
  {
    title: "Longest Substring with At Most K Distinct Characters",
    slug: "longest-substring-at-most-k-distinct",
    difficulty: "Medium",
    category: "dsa",
    topics: ["sliding-window", "strings", "hashing"],
    description: "Given a string s and an integer k, return the length of the longest substring that contains at most k distinct characters.",
    examples: [
      { input: "eceba\n2", output: "3", explanation: "'ece' has length 3 and 2 distinct characters." }
    ],
    constraints: ["1 <= s.length <= 5 * 10^4", "0 <= k <= 50"],
    hints: ["Keep track of distinct character frequencies in the current window."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "eceba\n2", expectedOutput: "3" },
      { input: "aa\n1", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "a\n0", expectedOutput: "0" },
      { input: "araaci\n2", expectedOutput: "4" },
      { input: "cbbebi\n3", expectedOutput: "5" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [s, kStr] = input.trim().split('\\n');
  const k = Number(kStr.trim());
  if (k === 0 || !s) return '0';
  const freq = new Map();
  let maxLen = 0, l = 0;
  for (let r = 0; r < s.length; r++) {
    const ch = s[r];
    freq.set(ch, (freq.get(ch) || 0) + 1);
    while (freq.size > k) {
      const leftCh = s[l];
      freq.set(leftCh, freq.get(leftCh) - 1);
      if (freq.get(leftCh) === 0) freq.delete(leftCh);
      l++;
    }
    maxLen = Math.max(maxLen, r - l + 1);
  }
  return String(maxLen);
}`
    }
  },
  {
    title: "Fruit Harvest Maximum Pick",
    slug: "fruit-harvest-maximum-pick",
    difficulty: "Medium",
    category: "dsa",
    topics: ["sliding-window", "arrays"],
    description: "You have two baskets, and each basket can hold only a single type of fruit. Return the maximum number of fruits you can pick in a contiguous row such that you only pick at most 2 types of fruit.",
    examples: [
      { input: "1 2 1", output: "3", explanation: "Can pick all 3 fruits." },
      { input: "0 1 2 2", output: "3", explanation: "Can pick [1, 2, 2]." }
    ],
    constraints: ["1 <= fruits.length <= 10^5"],
    hints: ["This is equivalent to finding the longest subarray with at most 2 distinct numbers."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "1 2 1", expectedOutput: "3" },
      { input: "0 1 2 2", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 2 2", expectedOutput: "4" },
      { input: "3 3 3 1 2 1 1 2 3 3 4", expectedOutput: "5" },
      { input: "1", expectedOutput: "1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const fruits = input.trim().split(/\\s+/).map(Number);
  const freq = new Map();
  let maxLen = 0, l = 0;
  for (let r = 0; r < fruits.length; r++) {
    const f = fruits[r];
    freq.set(f, (freq.get(f) || 0) + 1);
    while (freq.size > 2) {
      const leftF = fruits[l];
      freq.set(leftF, freq.get(leftF) - 1);
      if (freq.get(leftF) === 0) freq.delete(leftF);
      l++;
    }
    maxLen = Math.max(maxLen, r - l + 1);
  }
  return String(maxLen);
}`
    }
  },
  {
    title: "Permutation in String Check",
    slug: "permutation-in-string-check",
    difficulty: "Medium",
    category: "dsa",
    topics: ["sliding-window", "strings", "hashing"],
    description: "Given two strings s1 and s2, return 'true' if s2 contains a permutation of s1, or 'false' otherwise. In other words, return true if one of s1's permutations is the substring of s2.",
    examples: [
      { input: "ab\neidbaooo", output: "true", explanation: "s2 contains 'ba' which is a permutation of s1." },
      { input: "ab\neidboaoo", output: "false", explanation: "s2 does not contain any permutation of s1." }
    ],
    constraints: ["1 <= s1.length, s2.length <= 10^4"],
    hints: ["Compare character frequency arrays of size 26 using a window of size s1.length in s2."],
    starterCode: {
      javascript: `function solve(input) {\n  return 'false';\n}`
    },
    sampleTestCases: [
      { input: "ab\neidbaooo", expectedOutput: "true" },
      { input: "ab\neidboaoo", expectedOutput: "false" }
    ],
    hiddenTestCases: [
      { input: "a\na", expectedOutput: "true" },
      { input: "adc\ndcda", expectedOutput: "true" },
      { input: "hello\nooolleoooleh", expectedOutput: "false" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [s1, s2] = input.trim().split('\\n').map(s => s.trim());
  if (s1.length > s2.length) return 'false';
  const c1 = new Array(26).fill(0);
  const c2 = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);
  for (let i = 0; i < s1.length; i++) {
    c1[s1.charCodeAt(i) - aCode]++;
    c2[s2.charCodeAt(i) - aCode]++;
  }
  const matches = () => c1.every((v, i) => v === c2[i]);
  if (matches()) return 'true';
  for (let i = s1.length; i < s2.length; i++) {
    c2[s2.charCodeAt(i) - aCode]++;
    c2[s2.charCodeAt(i - s1.length) - aCode]--;
    if (matches()) return 'true';
  }
  return 'false';
}`
    }
  },
  {
    title: "Minimum Window Substring",
    slug: "minimum-window-substring",
    difficulty: "Hard",
    category: "dsa",
    topics: ["sliding-window", "strings", "hashing"],
    description: "Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return an empty string.",
    examples: [
      { input: "ADOBECODEBANC\nABC", output: "BANC", explanation: "Minimum substring containing A, B, C is 'BANC'." },
      { input: "a\na", output: "a", explanation: "Matches itself." }
    ],
    constraints: ["1 <= s.length, t.length <= 10^5"],
    hints: ["Use two pointers and an integer `needed` representing characters still missing."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "ADOBECODEBANC\nABC", expectedOutput: "BANC" },
      { input: "a\na", expectedOutput: "a" }
    ],
    hiddenTestCases: [
      { input: "a\naa", expectedOutput: "" },
      { input: "ab\nb", expectedOutput: "b" },
      { input: "bba\nab", expectedOutput: "ba" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [s, t] = input.trim().split('\\n').map(x => x.trim());
  if (!s || !t || s.length < t.length) return '';
  const target = new Map();
  for (const ch of t) target.set(ch, (target.get(ch) || 0) + 1);
  let matched = 0, l = 0;
  let minLen = Infinity, startIdx = 0;
  const window = new Map();
  for (let r = 0; r < s.length; r++) {
    const ch = s[r];
    window.set(ch, (window.get(ch) || 0) + 1);
    if (target.has(ch) && window.get(ch) === target.get(ch)) {
      matched++;
    }
    while (matched === target.size) {
      if (r - l + 1 < minLen) {
        minLen = r - l + 1;
        startIdx = l;
      }
      const leftCh = s[l];
      window.set(leftCh, window.get(leftCh) - 1);
      if (target.has(leftCh) && window.get(leftCh) < target.get(leftCh)) {
        matched--;
      }
      l++;
    }
  }
  return minLen === Infinity ? '' : s.slice(startIdx, startIdx + minLen);
}`
    }
  }
];
