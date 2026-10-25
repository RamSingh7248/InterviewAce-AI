export const intervalsAndBitTricksProblems = [
  {
    title: "Merge Overlapping Intervals Count",
    slug: "merge-overlapping-intervals-count",
    difficulty: "Medium",
    category: "dsa",
    topics: ["intervals", "sorting"],
    description: "Given a collection of intervals represented as space-separated start end pairs on each line, merge all overlapping intervals, and return the count of merged non-overlapping intervals.",
    examples: [
      { input: "1 3\n2 6\n8 10\n15 18", output: "3", explanation: "Merged into [1, 6], [8, 10], [15, 18], count = 3." }
    ],
    constraints: ["1 <= intervals.length <= 10^4"],
    hints: ["Sort intervals by start time. Merge with previous if start <= prev.end."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "1 3\n2 6\n8 10\n15 18", expectedOutput: "3" },
      { input: "1 4\n4 5", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 4\n0 4", expectedOutput: "1" },
      { input: "1 2\n3 4\n5 6", expectedOutput: "3" },
      { input: "2 3\n4 5\n6 7\n1 10", expectedOutput: "1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const lines = input.trim().split('\\n').map(l => l.trim()).filter(Boolean);
  const intervals = lines.map(l => l.split(/\\s+/).map(Number)).sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const cur = intervals[i];
    if (cur[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], cur[1]);
    } else {
      merged.push(cur);
    }
  }
  return String(merged.length);
}`
    }
  },
  {
    title: "Insert New Interval",
    slug: "insert-new-interval",
    difficulty: "Medium",
    category: "dsa",
    topics: ["intervals", "arrays"],
    description: "You are given an array of non-overlapping intervals sorted by start time, and a newInterval. Insert newInterval into intervals such that intervals is still sorted and non-overlapping (merge if necessary). Return the count of resulting intervals.",
    examples: [
      { input: "1 3\n6 9\n2 5", output: "2", explanation: "Inserting [2, 5] yields [1, 5], [6, 9] (2 intervals)." }
    ],
    constraints: ["0 <= intervals.length <= 10^4"],
    hints: ["Add all intervals ending before newInterval starts, merge overlaps, then add remainder."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "1 3\n6 9\n2 5", expectedOutput: "2" },
      { input: "1 2\n3 5\n6 7\n8 10\n12 16\n4 8", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "5 7", expectedOutput: "1" },
      { input: "1 5\n2 3", expectedOutput: "1" },
      { input: "1 5\n6 8", expectedOutput: "2" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const lines = input.trim().split('\\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 1) return '1';
  const newInterval = lines[lines.length - 1].split(/\\s+/).map(Number);
  const intervals = lines.slice(0, lines.length - 1).map(l => l.split(/\\s+/).map(Number));
  const res = [];
  let i = 0;
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i++]);
  }
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval);
  while (i < intervals.length) {
    res.push(intervals[i++]);
  }
  return String(res.length);
}`
    }
  },
  {
    title: "Non-overlapping Intervals Minimum Removals",
    slug: "non-overlapping-intervals-min-removals",
    difficulty: "Medium",
    category: "dsa",
    topics: ["intervals", "greedy"],
    description: "Given an array of intervals where each interval is start end, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    examples: [
      { input: "1 2\n2 3\n3 4\n1 3", output: "1", explanation: "[1, 3] can be removed and the rest are non-overlapping." }
    ],
    constraints: ["1 <= intervals.length <= 10^5"],
    hints: ["Greedy approach: sort by end time. Keep the interval that finishes earliest."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "1 2\n2 3\n3 4\n1 3", expectedOutput: "1" },
      { input: "1 2\n1 2\n1 2", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "1 2\n2 3", expectedOutput: "0" },
      { input: "1 100\n11 22\n1 11\n2 12", expectedOutput: "2" },
      { input: "0 2\n1 3\n2 4\n3 5\n4 6", expectedOutput: "2" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const lines = input.trim().split('\\n').map(l => l.trim()).filter(Boolean);
  const intervals = lines.map(l => l.split(/\\s+/).map(Number)).sort((a, b) => a[1] - b[1]);
  let count = 0;
  let end = -Infinity;
  for (const [s, e] of intervals) {
    if (s >= end) {
      end = e;
    } else {
      count++;
    }
  }
  return String(count);
}`
    }
  },
  {
    title: "Single Number Among Pairs",
    slug: "single-number-among-pairs",
    difficulty: "Easy",
    category: "dsa",
    topics: ["bit-manipulation", "arrays"],
    description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    examples: [
      { input: "2 2 1", output: "1", explanation: "1 appears once." },
      { input: "4 1 2 1 2", output: "4", explanation: "4 appears once." }
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4", "Every element appears twice except one"],
    hints: ["XOR of any number with itself is 0: a ^ a = 0 and a ^ 0 = a."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "2 2 1", expectedOutput: "1" },
      { input: "4 1 2 1 2", expectedOutput: "4" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "-1 -1 99", expectedOutput: "99" },
      { input: "10 20 10", expectedOutput: "20" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  let res = 0;
  for (const n of nums) res ^= n;
  return String(res);
}`
    }
  },
  {
    title: "Number of 1 Bits (Hamming Weight)",
    slug: "number-of-1-bits",
    difficulty: "Easy",
    category: "dsa",
    topics: ["bit-manipulation"],
    description: "Given a positive integer n, write a function that returns the number of set bits (1s) in its binary representation.",
    examples: [
      { input: "11", output: "3", explanation: "11 in binary is 1011 (three 1s)." },
      { input: "128", output: "1", explanation: "128 in binary is 10000000 (one 1)." }
    ],
    constraints: ["1 <= n <= 2^31 - 1"],
    hints: ["Brian Kernighan's algorithm: n = n & (n - 1) clears the lowest set bit."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "11", expectedOutput: "3" },
      { input: "128", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "2147483645", expectedOutput: "30" },
      { input: "1", expectedOutput: "1" },
      { input: "7", expectedOutput: "3" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  let n = Number(input.trim());
  let count = 0;
  while (n > 0) {
    n = n & (n - 1);
    count++;
  }
  return String(count);
}`
    }
  },
  {
    title: "Counting Bits Sequence",
    slug: "counting-bits-sequence",
    difficulty: "Easy",
    category: "dsa",
    topics: ["bit-manipulation", "dynamic-programming"],
    description: "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i. Return space-separated values.",
    examples: [
      { input: "2", output: "0 1 1", explanation: "0->0, 1->1, 2->10 (1 one)." },
      { input: "5", output: "0 1 1 2 1 2", explanation: "Counts for 0 through 5." }
    ],
    constraints: ["0 <= n <= 10^5"],
    hints: ["dp[i] = dp[i >> 1] + (i & 1)."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "2", expectedOutput: "0 1 1" },
      { input: "5", expectedOutput: "0 1 1 2 1 2" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "0 1" },
      { input: "4", expectedOutput: "0 1 1 2 1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const n = Number(input.trim());
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i >> 1] + (i & 1);
  }
  return dp.join(' ');
}`
    }
  }
];
