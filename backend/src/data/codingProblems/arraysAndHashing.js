export const arraysAndHashingProblems = [
  {
    title: "Pair Sum Check",
    slug: "pair-sum-check",
    difficulty: "Easy",
    category: "dsa",
    topics: ["arrays", "hashing"],
    description: "Given an array of integers and an integer target, determine whether there exist two distinct elements in the array whose sum equals the target. Return 'true' if such a pair exists, otherwise 'false'.",
    examples: [
      { input: "2 7 11 15\n9", output: "true", explanation: "2 + 7 = 9" },
      { input: "1 2 3 9\n8", output: "false", explanation: "No two numbers sum to 8" }
    ],
    constraints: ["2 <= numbers.length <= 10^5", "-10^9 <= numbers[i] <= 10^9"],
    hints: ["Use a hash set to store elements as you iterate.", "For each number x, check if (target - x) has already been visited."],
    starterCode: {
      javascript: `function solve(input) {\n  const [line1, line2] = input.trim().split('\\n');\n  const nums = line1.split(' ').map(Number);\n  const target = Number(line2);\n  // Return 'true' or 'false'\n  return 'false';\n}`,
      python: `def solve(input_str):\n    lines = input_str.strip().split('\\n')\n    nums = list(map(int, lines[0].split()))\n    target = int(lines[1])\n    # Write logic\n    return 'false'`,
      java: `public class Solution {\n    public static String solve(String input) {\n        // Parse input and return 'true' or 'false'\n        return "false";\n    }\n}`,
      cpp: `#include <string>\nstd::string solve(std::string input) {\n    return "false";\n}`
    },
    sampleTestCases: [
      { input: "2 7 11 15\n9", expectedOutput: "true" },
      { input: "1 2 3 9\n8", expectedOutput: "false" }
    ],
    hiddenTestCases: [
      { input: "-3 4 3 90\n0", expectedOutput: "true" },
      { input: "5 5\n10", expectedOutput: "true" },
      { input: "1 5\n10", expectedOutput: "false" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [line1, line2] = input.trim().split('\\n');
  const nums = line1.trim().split(/\\s+/).map(Number);
  const target = Number(line2.trim());
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(target - n)) return 'true';
    seen.add(n);
  }
  return 'false';
}`
    }
  },
  {
    title: "First Non-Repeating Element",
    slug: "first-non-repeating-element",
    difficulty: "Easy",
    category: "dsa",
    topics: ["arrays", "hashing"],
    description: "Given an array of integers, identify the first integer that occurs exactly once. If every element repeats, return '-1'.",
    examples: [
      { input: "4 5 1 2 0 4 1 2", output: "5", explanation: "5 is the first element with frequency 1" },
      { input: "1 1 2 2", output: "-1", explanation: "All elements repeat" }
    ],
    constraints: ["1 <= n <= 10^5", "-10^9 <= arr[i] <= 10^9"],
    hints: ["Count occurrences with a frequency map.", "Iterate through the array a second time to find the first element with count 1."],
    starterCode: {
      javascript: `function solve(input) {\n  const nums = input.trim().split(/\\s+/).map(Number);\n  // Return number as string or '-1'\n  return '-1';\n}`,
      python: `def solve(input_str):\n    nums = list(map(int, input_str.strip().split()))\n    return '-1'`,
      java: `public class Solution {\n    public static String solve(String input) { return "-1"; }\n}`,
      cpp: `std::string solve(std::string input) { return "-1"; }`
    },
    sampleTestCases: [
      { input: "4 5 1 2 0 4 1 2", expectedOutput: "5" },
      { input: "1 1 2 2", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "9 4 9 6 7 4", expectedOutput: "6" },
      { input: "-1 2 -1 3 2", expectedOutput: "3" },
      { input: "42", expectedOutput: "42" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  for (const n of nums) {
    if (freq.get(n) === 1) return String(n);
  }
  return '-1';
}`
    }
  },
  {
    title: "Array Leader Elements",
    slug: "array-leader-elements",
    difficulty: "Easy",
    category: "dsa",
    topics: ["arrays"],
    description: "An element is a leader if it is greater than or equal to all elements to its right. The rightmost element is always a leader. Find all leaders in the array from left to right, space-separated.",
    examples: [
      { input: "16 17 4 3 5 2", output: "17 5 2", explanation: "17 > 4,3,5,2. 5 > 2. 2 is rightmost." }
    ],
    constraints: ["1 <= n <= 10^5"],
    hints: ["Scan the array from right to left maintaining the running maximum."],
    starterCode: {
      javascript: `function solve(input) {\n  const nums = input.trim().split(/\\s+/).map(Number);\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "16 17 4 3 5 2", expectedOutput: "17 5 2" },
      { input: "1 2 3 4 0", expectedOutput: "4 0" }
    ],
    hiddenTestCases: [
      { input: "7 10 4 10 6 5 2", expectedOutput: "10 10 6 5 2" },
      { input: "5 4 3 2 1", expectedOutput: "5 4 3 2 1" },
      { input: "10", expectedOutput: "10" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  const leaders = [];
  let maxRight = -Infinity;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] >= maxRight) {
      leaders.push(nums[i]);
      maxRight = nums[i];
    }
  }
  return leaders.reverse().join(' ');
}`
    }
  },
  {
    title: "Group Anagram Strings",
    slug: "group-anagram-strings",
    difficulty: "Medium",
    category: "dsa",
    topics: ["arrays", "hashing", "strings"],
    description: "Given space-separated lowercase words, group the anagrams together. Output the count of distinct anagram groups.",
    examples: [
      { input: "eat tea tan ate nat bat", output: "3", explanation: "Groups are [eat, tea, ate], [tan, nat], [bat]" }
    ],
    constraints: ["1 <= words.length <= 10^4", "1 <= word.length <= 100"],
    hints: ["Sort the characters of each string to form a canonical key in a hash map."],
    starterCode: {
      javascript: `function solve(input) {\n  const words = input.trim().split(/\\s+/);\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "eat tea tan ate nat bat", expectedOutput: "3" },
      { input: "a", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "abc bca cab def fed xyz", expectedOutput: "3" },
      { input: "rat tar art car", expectedOutput: "2" },
      { input: "listen silent enlist google", expectedOutput: "2" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const words = input.trim().split(/\\s+/).filter(Boolean);
  const map = new Map();
  for (const w of words) {
    const key = w.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w);
  }
  return String(map.size);
}`
    }
  },
  {
    title: "Majority Element Frequency",
    slug: "majority-element-frequency",
    difficulty: "Easy",
    category: "dsa",
    topics: ["arrays", "hashing"],
    description: "Given an array of size n, find the majority element that appears strictly more than floor(n / 2) times. You may assume that the majority element always exists.",
    examples: [
      { input: "3 2 3", output: "3", explanation: "3 appears 2 times, which is > 3/2" },
      { input: "2 2 1 1 1 2 2", output: "2", explanation: "2 appears 4 times, > 7/2" }
    ],
    constraints: ["1 <= n <= 5 * 10^4"],
    hints: ["Boyer-Moore Voting Algorithm solves this in O(n) time and O(1) space."],
    starterCode: {
      javascript: `function solve(input) {\n  const nums = input.trim().split(/\\s+/).map(Number);\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "3 2 3", expectedOutput: "3" },
      { input: "2 2 1 1 1 2 2", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "6 5 5", expectedOutput: "5" },
      { input: "8 8 7 7 7 8 8", expectedOutput: "8" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  let candidate = null;
  let count = 0;
  for (const n of nums) {
    if (count === 0) candidate = n;
    count += (n === candidate) ? 1 : -1;
  }
  return String(candidate);
}`
    }
  },
  {
    title: "Missing Number in Sequence",
    slug: "missing-number-in-sequence",
    difficulty: "Easy",
    category: "dsa",
    topics: ["arrays", "bit-manipulation"],
    description: "Given an array containing n distinct integers taken from the range 0 to n inclusive, return the only number in the range that is missing from the array.",
    examples: [
      { input: "3 0 1", output: "2", explanation: "n=3, numbers are in [0,3], 2 is missing" },
      { input: "0 1", output: "2", explanation: "n=2, numbers are in [0,2], 2 is missing" }
    ],
    constraints: ["n == nums.length", "1 <= n <= 10^4"],
    hints: ["Sum of 0..n is n*(n+1)/2. The difference between expected and actual sum is the answer."],
    starterCode: {
      javascript: `function solve(input) {\n  const nums = input.trim().split(/\\s+/).map(Number);\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "3 0 1", expectedOutput: "2" },
      { input: "0 1", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "9 6 4 2 3 5 7 0 1", expectedOutput: "8" },
      { input: "0", expectedOutput: "1" },
      { input: "1", expectedOutput: "0" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((acc, x) => acc + x, 0);
  return String(expectedSum - actualSum);
}`
    }
  },
  {
    title: "Subarray with Given Sum",
    slug: "subarray-with-given-sum",
    difficulty: "Medium",
    category: "dsa",
    topics: ["arrays", "hashing"],
    description: "Given an array of integers and an integer k, return the total number of continuous subarrays whose sum equals to k.",
    examples: [
      { input: "1 1 1\n2", output: "2", explanation: "[1,1] at indices [0,1] and [1,2]" },
      { input: "1 2 3\n3", output: "2", explanation: "[1,2] and [3]" }
    ],
    constraints: ["1 <= nums.length <= 2 * 10^4", "-1000 <= nums[i] <= 1000"],
    hints: ["Use prefix sums and a hash map of prefix sum frequencies."],
    starterCode: {
      javascript: `function solve(input) {\n  const [l1, l2] = input.trim().split('\\n');\n  const nums = l1.split(/\\s+/).map(Number);\n  const k = Number(l2);\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "1 1 1\n2", expectedOutput: "2" },
      { input: "1 2 3\n3", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "1 -1 0\n0", expectedOutput: "3" },
      { input: "3 4 7 2 -3 1 4 2\n7", expectedOutput: "4" },
      { input: "1\n0", expectedOutput: "0" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [l1, l2] = input.trim().split('\\n');
  const nums = l1.trim().split(/\\s+/).map(Number);
  const k = Number(l2.trim());
  const prefixCount = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const n of nums) {
    sum += n;
    if (prefixCount.has(sum - k)) count += prefixCount.get(sum - k);
    prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
  }
  return String(count);
}`
    }
  },
  {
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    difficulty: "Medium",
    category: "dsa",
    topics: ["arrays", "prefix-product"],
    description: "Given an integer array nums, return an array such that output[i] is equal to the product of all the elements of nums except nums[i], space-separated, without using division.",
    examples: [
      { input: "1 2 3 4", output: "24 12 8 6", explanation: "24=2*3*4, 12=1*3*4, 8=1*2*4, 6=1*2*3" }
    ],
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
    hints: ["Compute prefix products from left, then multiply by running suffix products from right."],
    starterCode: {
      javascript: `function solve(input) {\n  const nums = input.trim().split(/\\s+/).map(Number);\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "1 2 3 4", expectedOutput: "24 12 8 6" },
      { input: "-1 1 0 -3 3", expectedOutput: "0 0 9 0 0" }
    ],
    hiddenTestCases: [
      { input: "2 3", expectedOutput: "3 2" },
      { input: "0 0", expectedOutput: "0 0" },
      { input: "1 -1", expectedOutput: "-1 1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  const n = nums.length;
  const res = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res.join(' ');
}`
    }
  },
  {
    title: "Longest Consecutive Elements",
    slug: "longest-consecutive-elements",
    difficulty: "Medium",
    category: "dsa",
    topics: ["arrays", "hashing"],
    description: "Given an unsorted array of integers, return the length of the longest consecutive elements sequence in O(n) runtime.",
    examples: [
      { input: "100 4 200 1 3 2", output: "4", explanation: "Longest consecutive elements sequence is [1, 2, 3, 4]. Length is 4." }
    ],
    constraints: ["0 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    hints: ["Insert numbers into a Set. Only initiate a sequence check if (num - 1) is not in the set."],
    starterCode: {
      javascript: `function solve(input) {\n  const nums = input.trim().split(/\\s+/).map(Number);\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "100 4 200 1 3 2", expectedOutput: "4" },
      { input: "0 3 7 2 5 8 4 6 0 1", expectedOutput: "9" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "10 20 30", expectedOutput: "1" },
      { input: "5 4 3 2 1", expectedOutput: "5" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  if (!input.trim()) return '0';
  const nums = input.trim().split(/\\s+/).map(Number);
  const set = new Set(nums);
  let longest = 0;
  for (const n of set) {
    if (!set.has(n - 1)) {
      let cur = n;
      let streak = 1;
      while (set.has(cur + 1)) {
        cur += 1;
        streak += 1;
      }
      longest = Math.max(longest, streak);
    }
  }
  return String(longest);
}`
    }
  },
  {
    title: "Maximum Subarray Sum (Kadane)",
    slug: "maximum-subarray-sum-kadane",
    difficulty: "Medium",
    category: "dsa",
    topics: ["arrays", "dynamic-programming"],
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "Subarray [4,-1,2,1] has the largest sum 6." }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    hints: ["Kadane's algorithm: keep running max of current element vs current element + prev sum."],
    starterCode: {
      javascript: `function solve(input) {\n  const nums = input.trim().split(/\\s+/).map(Number);\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "5 4 -1 7 8", expectedOutput: "23" },
      { input: "-1 -2 -3", expectedOutput: "-1" },
      { input: "-2 -1", expectedOutput: "-1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  let maxSoFar = nums[0];
  let curMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curMax = Math.max(nums[i], curMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, curMax);
  }
  return String(maxSoFar);
}`
    }
  }
];
