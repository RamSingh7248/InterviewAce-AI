export const sortingSearchingProblems = [
  {
    title: "Binary Search Target Index",
    slug: "binary-search-target-index",
    difficulty: "Easy",
    category: "dsa",
    topics: ["binary-search", "arrays"],
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its 0-based index. Otherwise, return -1.",
    examples: [
      { input: "-1 0 3 5 9 12\n9", output: "4", explanation: "9 exists in nums and its index is 4." },
      { input: "-1 0 3 5 9 12\n2", output: "-1", explanation: "2 does not exist in nums." }
    ],
    constraints: ["1 <= nums.length <= 10^4", "All integers in nums are unique", "nums is sorted in ascending order"],
    hints: ["Divide the search space in half each iteration using mid = left + floor((right - left) / 2)."],
    starterCode: {
      javascript: `function solve(input) {\n  return '-1';\n}`
    },
    sampleTestCases: [
      { input: "-1 0 3 5 9 12\n9", expectedOutput: "4" },
      { input: "-1 0 3 5 9 12\n2", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "5\n5", expectedOutput: "0" },
      { input: "2 5\n5", expectedOutput: "1" },
      { input: "1 3 5 7 9\n1", expectedOutput: "0" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [l1, l2] = input.trim().split('\\n');
  const nums = l1.trim().split(/\\s+/).map(Number);
  const target = Number(l2.trim());
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return String(mid);
    if (nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return '-1';
}`
    }
  },
  {
    title: "Search in Rotated Sorted Array",
    slug: "search-rotated-sorted-array",
    difficulty: "Medium",
    category: "dsa",
    topics: ["binary-search", "arrays"],
    description: "Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
    examples: [
      { input: "4 5 6 7 0 1 2\n0", output: "4", explanation: "0 is at index 4." },
      { input: "4 5 6 7 0 1 2\n3", output: "-1", explanation: "3 does not exist." }
    ],
    constraints: ["1 <= nums.length <= 5000", "All values are unique"],
    hints: ["At least one half (left to mid or mid to right) is always properly sorted."],
    starterCode: {
      javascript: `function solve(input) {\n  return '-1';\n}`
    },
    sampleTestCases: [
      { input: "4 5 6 7 0 1 2\n0", expectedOutput: "4" },
      { input: "4 5 6 7 0 1 2\n3", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "1\n0", expectedOutput: "-1" },
      { input: "3 1\n1", expectedOutput: "1" },
      { input: "5 1 3\n5", expectedOutput: "0" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [l1, l2] = input.trim().split('\\n');
  const nums = l1.trim().split(/\\s+/).map(Number);
  const target = Number(l2.trim());
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return String(mid);
    if (nums[l] <= nums[mid]) {
      if (nums[l] <= target && target < nums[mid]) r = mid - 1;
      else l = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[r]) l = mid + 1;
      else r = mid - 1;
    }
  }
  return '-1';
}`
    }
  },
  {
    title: "First and Last Position in Sorted Array",
    slug: "first-last-position-sorted-array",
    difficulty: "Medium",
    category: "dsa",
    topics: ["binary-search", "arrays"],
    description: "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. Return space-separated indices, or '-1 -1' if not found.",
    examples: [
      { input: "5 7 7 8 8 10\n8", output: "3 4", explanation: "8 starts at 3 and ends at 4." },
      { input: "5 7 7 8 8 10\n6", output: "-1 -1", explanation: "6 is not in array." }
    ],
    constraints: ["0 <= nums.length <= 10^5"],
    hints: ["Run two binary searches: one searching for leftmost occurrence, one for rightmost."],
    starterCode: {
      javascript: `function solve(input) {\n  return '-1 -1';\n}`
    },
    sampleTestCases: [
      { input: "5 7 7 8 8 10\n8", expectedOutput: "3 4" },
      { input: "5 7 7 8 8 10\n6", expectedOutput: "-1 -1" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "0 0" },
      { input: "2 2 2 2\n2", expectedOutput: "0 3" },
      { input: "1 2 3\n2", expectedOutput: "1 1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [l1, l2] = input.trim().split('\\n');
  const nums = l1.trim().split(/\\s+/).map(Number);
  const target = Number(l2.trim());
  function findBound(isFirst) {
    let l = 0, r = nums.length - 1, res = -1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (nums[mid] === target) {
        res = mid;
        if (isFirst) r = mid - 1;
        else l = mid + 1;
      } else if (nums[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return res;
  }
  return \`\${findBound(true)} \${findBound(false)}\`;
}`
    }
  },
  {
    title: "Peak Element Index Search",
    slug: "peak-element-index-search",
    difficulty: "Medium",
    category: "dsa",
    topics: ["binary-search", "arrays"],
    description: "A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index in O(log n) time.",
    examples: [
      { input: "1 2 3 1", output: "2", explanation: "Index 2 has value 3, strictly greater than neighbors 2 and 1." }
    ],
    constraints: ["1 <= nums.length <= 1000", "nums[i] != nums[i + 1]"],
    hints: ["If nums[mid] < nums[mid + 1], a peak is guaranteed to exist on the right."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "1 2 3 1", expectedOutput: "2" },
      { input: "1 2 1 3 5 6 4", expectedOutput: "5" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "0" },
      { input: "2 1", expectedOutput: "0" },
      { input: "1 2", expectedOutput: "1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] > nums[mid + 1]) r = mid;
    else l = mid + 1;
  }
  return String(l);
}`
    }
  },
  {
    title: "Kth Largest Element in Array",
    slug: "kth-largest-element-array",
    difficulty: "Medium",
    category: "dsa",
    topics: ["sorting", "heap", "quickselect"],
    description: "Given an integer array nums and an integer k, return the kth largest element in the array.",
    examples: [
      { input: "3 2 1 5 6 4\n2", output: "5", explanation: "2nd largest is 5." },
      { input: "3 2 3 1 2 4 5 5 6\n4", output: "4", explanation: "4th largest is 4." }
    ],
    constraints: ["1 <= k <= nums.length <= 10^5"],
    hints: ["Sort in descending order and return element at index k - 1."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "3 2 1 5 6 4\n2", expectedOutput: "5" },
      { input: "3 2 3 1 2 4 5 5 6\n4", expectedOutput: "4" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "7 10 4 3 20 15\n3", expectedOutput: "10" },
      { input: "-1 2 0\n1", expectedOutput: "2" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [l1, l2] = input.trim().split('\\n');
  const nums = l1.trim().split(/\\s+/).map(Number);
  const k = Number(l2.trim());
  nums.sort((a, b) => b - a);
  return String(nums[k - 1]);
}`
    }
  },
  {
    title: "Merge Sorted Arrays Representation",
    slug: "merge-sorted-arrays-representation",
    difficulty: "Easy",
    category: "dsa",
    topics: ["sorting", "two-pointers"],
    description: "You are given two integer arrays nums1 and nums2, both sorted in non-decreasing order. Merge nums1 and nums2 into a single sorted array. Return space-separated merged integers.",
    examples: [
      { input: "1 2 3\n2 5 6", output: "1 2 2 3 5 6", explanation: "Merged sorted list." }
    ],
    constraints: ["0 <= nums1.length, nums2.length <= 10^4"],
    hints: ["Use two pointers comparing the heads of both arrays."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "1 2 3\n2 5 6", expectedOutput: "1 2 2 3 5 6" },
      { input: "1\n", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "2 4 6\n1 3 5", expectedOutput: "1 2 3 4 5 6" },
      { input: "0\n1", expectedOutput: "0 1" },
      { input: "5 10\n2 3 4", expectedOutput: "2 3 4 5 10" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const lines = input.trim().split('\\n');
  const a = lines[0] ? lines[0].trim().split(/\\s+/).filter(Boolean).map(Number) : [];
  const b = lines[1] ? lines[1].trim().split(/\\s+/).filter(Boolean).map(Number) : [];
  const res = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) res.push(a[i++]);
    else res.push(b[j++]);
  }
  while (i < a.length) res.push(a[i++]);
  while (j < b.length) res.push(b[j++]);
  return res.join(' ');
}`
    }
  }
];
