export const twoPointersProblems = [
  {
    title: "Two Sum Sorted Array",
    slug: "two-sum-sorted-array",
    difficulty: "Easy",
    category: "dsa",
    topics: ["two-pointers", "arrays"],
    description: "Given a 1-indexed array of integers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return their 1-based indices space-separated.",
    examples: [
      { input: "2 7 11 15\n9", output: "1 2", explanation: "2 + 7 = 9. 1-based indices are 1 and 2." }
    ],
    constraints: ["2 <= numbers.length <= 3 * 10^4", "Numbers are sorted"],
    hints: ["Since the array is sorted, place left pointer at 0 and right pointer at length - 1."],
    starterCode: {
      javascript: `function solve(input) {\n  const [l1, l2] = input.trim().split('\\n');\n  const nums = l1.split(/\\s+/).map(Number);\n  const target = Number(l2);\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "2 7 11 15\n9", expectedOutput: "1 2" },
      { input: "2 3 4\n6", expectedOutput: "1 3" }
    ],
    hiddenTestCases: [
      { input: "-1 0\n-1", expectedOutput: "1 2" },
      { input: "1 2 3 4 4 9 56 90\n8", expectedOutput: "4 5" },
      { input: "5 25 75\n100", expectedOutput: "2 3" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [l1, l2] = input.trim().split('\\n');
  const nums = l1.trim().split(/\\s+/).map(Number);
  const target = Number(l2.trim());
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return \`\${left + 1} \${right + 1}\`;
    if (sum < target) left++;
    else right--;
  }
  return '';
}`
    }
  },
  {
    title: "Valid Palindrome String",
    slug: "valid-palindrome-string",
    difficulty: "Easy",
    category: "dsa",
    topics: ["two-pointers", "strings"],
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Return 'true' or 'false'.",
    examples: [
      { input: "A man, a plan, a canal: Panama", output: "true", explanation: "'amanaplanacanalpanama' is a palindrome." },
      { input: "race a car", output: "false", explanation: "'raceacar' is not a palindrome." }
    ],
    constraints: ["1 <= s.length <= 2 * 10^5"],
    hints: ["Use two pointers moving inward, skipping non-alphanumeric characters."],
    starterCode: {
      javascript: `function solve(input) {\n  return 'false';\n}`
    },
    sampleTestCases: [
      { input: "A man, a plan, a canal: Panama", expectedOutput: "true" },
      { input: "race a car", expectedOutput: "false" }
    ],
    hiddenTestCases: [
      { input: " ", expectedOutput: "true" },
      { input: "0P", expectedOutput: "false" },
      { input: "ab_a", expectedOutput: "true" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const clean = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  let l = 0, r = clean.length - 1;
  while (l < r) {
    if (clean[l] !== clean[r]) return 'false';
    l++;
    r--;
  }
  return 'true';
}`
    }
  },
  {
    title: "Move Zeroes to End",
    slug: "move-zeroes-to-end",
    difficulty: "Easy",
    category: "dsa",
    topics: ["two-pointers", "arrays"],
    description: "Given an integer array, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Return the modified array space-separated.",
    examples: [
      { input: "0 1 0 3 12", output: "1 3 12 0 0", explanation: "All 0s moved to the end" }
    ],
    constraints: ["1 <= nums.length <= 10^4"],
    hints: ["Keep an insert pointer for the next position of a non-zero element."],
    starterCode: {
      javascript: `function solve(input) {\n  const nums = input.trim().split(/\\s+/).map(Number);\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "0 1 0 3 12", expectedOutput: "1 3 12 0 0" },
      { input: "0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1 2 3", expectedOutput: "1 2 3" },
      { input: "0 0 1", expectedOutput: "1 0 0" },
      { input: "4 0 5 0 0 6", expectedOutput: "4 5 6 0 0 0" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  let pos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[pos++] = nums[i];
    }
  }
  while (pos < nums.length) {
    nums[pos++] = 0;
  }
  return nums.join(' ');
}`
    }
  },
  {
    title: "Container with Most Liquid",
    slug: "container-with-most-liquid",
    difficulty: "Medium",
    category: "dsa",
    topics: ["two-pointers", "greedy"],
    description: "You are given an integer array height representing vertical bars. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    examples: [
      { input: "1 8 6 2 5 4 8 3 7", output: "49", explanation: "Bars at index 1 and 8 (heights 8 and 7, width 7) form area 7 * min(8,7) = 49." }
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5"],
    hints: ["Start with maximum width. Move the pointer with the smaller height inward."],
    starterCode: {
      javascript: `function solve(input) {\n  const h = input.trim().split(/\\s+/).map(Number);\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "1 8 6 2 5 4 8 3 7", expectedOutput: "49" },
      { input: "1 1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "4 3 2 1 4", expectedOutput: "16" },
      { input: "1 2 1", expectedOutput: "2" },
      { input: "2 3 4 5 18 17 6", expectedOutput: "17" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const h = input.trim().split(/\\s+/).map(Number);
  let l = 0, r = h.length - 1;
  let maxArea = 0;
  while (l < r) {
    const area = (r - l) * Math.min(h[l], h[r]);
    maxArea = Math.max(maxArea, area);
    if (h[l] < h[r]) l++;
    else r--;
  }
  return String(maxArea);
}`
    }
  },
  {
    title: "Remove Duplicates from Sorted Sequence",
    slug: "remove-duplicates-from-sorted-sequence",
    difficulty: "Easy",
    category: "dsa",
    topics: ["two-pointers", "arrays"],
    description: "Given an integer array sorted in non-decreasing order, remove duplicates in-place such that each unique element appears only once. Return the count of unique elements followed by the unique elements space-separated on a new line.",
    examples: [
      { input: "1 1 2", output: "2\n1 2", explanation: "Unique elements are 1 and 2." }
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    hints: ["Use a slow pointer for the last placed unique element."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "1 1 2", expectedOutput: "2\n1 2" },
      { input: "0 0 1 1 1 2 2 3 3 4", expectedOutput: "5\n0 1 2 3 4" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1\n1" },
      { input: "1 1 1 1", expectedOutput: "1\n1" },
      { input: "-3 -3 0 0 5", expectedOutput: "3\n-3 0 5" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  if (nums.length === 0) return '0\\n';
  let insertIdx = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[insertIdx++] = nums[i];
    }
  }
  return \`\${insertIdx}\\n\${nums.slice(0, insertIdx).join(' ')}\`;
}`
    }
  },
  {
    title: "3Sum Zero Triplets Count",
    slug: "3sum-zero-triplets-count",
    difficulty: "Medium",
    category: "dsa",
    topics: ["two-pointers", "sorting"],
    description: "Given an integer array nums, return the number of distinct triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    examples: [
      { input: "-1 0 1 2 -1 -4", output: "2", explanation: "Triplets are [-1,-1,2] and [-1,0,1]" }
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    hints: ["Sort array first. Iterate i from 0 to n-3 and use two pointers for j and k. Skip duplicate values."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "-1 0 1 2 -1 -4", expectedOutput: "2" },
      { input: "0 1 1", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "0 0 0", expectedOutput: "1" },
      { input: "-2 0 1 1 2", expectedOutput: "2" },
      { input: "0 0 0 0", expectedOutput: "1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number).sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        count++;
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }
  return String(count);
}`
    }
  },
  {
    title: "Trapping Rainwater Elevation",
    slug: "trapping-rainwater-elevation",
    difficulty: "Hard",
    category: "dsa",
    topics: ["two-pointers", "dynamic-programming"],
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      { input: "0 1 0 2 1 0 1 3 2 1 2 1", output: "6", explanation: "6 units of rainwater are trapped." }
    ],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4"],
    hints: ["Use two pointers with leftMax and rightMax."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "0 1 0 2 1 0 1 3 2 1 2 1", expectedOutput: "6" },
      { input: "4 2 0 3 2 5", expectedOutput: "9" }
    ],
    hiddenTestCases: [
      { input: "3 0 2 0 4", expectedOutput: "7" },
      { input: "1 2 3", expectedOutput: "0" },
      { input: "2 0 2", expectedOutput: "2" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const h = input.trim().split(/\\s+/).map(Number);
  let l = 0, r = h.length - 1;
  let leftMax = 0, rightMax = 0;
  let trapped = 0;
  while (l < r) {
    if (h[l] <= h[r]) {
      if (h[l] >= leftMax) leftMax = h[l];
      else trapped += leftMax - h[l];
      l++;
    } else {
      if (h[r] >= rightMax) rightMax = h[r];
      else trapped += rightMax - h[r];
      r--;
    }
  }
  return String(trapped);
}`
    }
  },
  {
    title: "Squares of Sorted Array",
    slug: "squares-of-sorted-array",
    difficulty: "Easy",
    category: "dsa",
    topics: ["two-pointers", "sorting"],
    description: "Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order, space-separated.",
    examples: [
      { input: "-4 -1 0 3 10", output: "0 1 9 16 100", explanation: "Squares are [16, 1, 0, 9, 100]. Sorted: [0, 1, 9, 16, 100]." }
    ],
    constraints: ["1 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4"],
    hints: ["Numbers with largest absolute values are at either end. Place them from right to left in the result."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "-4 -1 0 3 10", expectedOutput: "0 1 9 16 100" },
      { input: "-7 -3 2 3 11", expectedOutput: "4 9 9 49 121" }
    ],
    hiddenTestCases: [
      { input: "-1", expectedOutput: "1" },
      { input: "-5 -4 -3 -2 -1", expectedOutput: "1 4 9 16 25" },
      { input: "1 2 3", expectedOutput: "1 4 9" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  const n = nums.length;
  const res = new Array(n);
  let l = 0, r = n - 1;
  let p = n - 1;
  while (l <= r) {
    const lSq = nums[l] * nums[l];
    const rSq = nums[r] * nums[r];
    if (lSq > rSq) {
      res[p--] = lSq;
      l++;
    } else {
      res[p--] = rSq;
      r--;
    }
  }
  return res.join(' ');
}`
    }
  }
];
