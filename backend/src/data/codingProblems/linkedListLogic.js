export const linkedListLogicProblems = [
  {
    title: "Reverse Linked Sequence",
    slug: "reverse-linked-sequence",
    difficulty: "Easy",
    category: "dsa",
    topics: ["linked-list", "two-pointers"],
    description: "Given space-separated values of a singly linked sequence, reverse the sequence and return the values space-separated.",
    examples: [
      { input: "1 2 3 4 5", output: "5 4 3 2 1", explanation: "Sequence reversed." },
      { input: "1 2", output: "2 1", explanation: "Reversed." }
    ],
    constraints: ["0 <= number of nodes <= 5000"],
    hints: ["Iteratively reverse the links or reverse the array representing nodes."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "5 4 3 2 1" },
      { input: "1 2", expectedOutput: "2 1" }
    ],
    hiddenTestCases: [
      { input: "42", expectedOutput: "42" },
      { input: "9 8 7 6", expectedOutput: "6 7 8 9" },
      { input: "1 0 -1", expectedOutput: "-1 0 1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  if (!input.trim()) return '';
  const nums = input.trim().split(/\\s+/);
  return nums.reverse().join(' ');
}`
    }
  },
  {
    title: "Cycle Detection in Pointer Indices",
    slug: "cycle-detection-pointer-indices",
    difficulty: "Medium",
    category: "dsa",
    topics: ["linked-list", "two-pointers"],
    description: "Given an array of 'next' pointers (indices, where -1 means null termination), determine if a cycle exists starting at index 0. Return 'true' or 'false'.",
    examples: [
      { input: "1 2 0", output: "true", explanation: "0 -> 1 -> 2 -> 0 forms a cycle." },
      { input: "1 2 -1", output: "false", explanation: "0 -> 1 -> 2 -> -1 ends." }
    ],
    constraints: ["1 <= n <= 10^4"],
    hints: ["Floyd's Tortoise and Hare algorithm: slow moves 1 step, fast moves 2 steps."],
    starterCode: {
      javascript: `function solve(input) {\n  return 'false';\n}`
    },
    sampleTestCases: [
      { input: "1 2 0", expectedOutput: "true" },
      { input: "1 2 -1", expectedOutput: "false" }
    ],
    hiddenTestCases: [
      { input: "-1", expectedOutput: "false" },
      { input: "0", expectedOutput: "true" },
      { input: "1 3 0 1", expectedOutput: "true" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const next = input.trim().split(/\\s+/).map(Number);
  let slow = 0, fast = 0;
  while (fast !== -1 && next[fast] !== undefined && next[fast] !== -1) {
    slow = next[slow];
    fast = next[next[fast]];
    if (slow === fast && slow !== -1 && slow !== undefined) return 'true';
  }
  return 'false';
}`
    }
  },
  {
    title: "Middle Node Value",
    slug: "middle-node-value",
    difficulty: "Easy",
    category: "dsa",
    topics: ["linked-list", "two-pointers"],
    description: "Given a sequence representing a linked list, return the value of the middle node. If there are two middle nodes, return the second middle node.",
    examples: [
      { input: "1 2 3 4 5", output: "3", explanation: "Middle is 3." },
      { input: "1 2 3 4 5 6", output: "4", explanation: "Two middles (3 and 4), return second." }
    ],
    constraints: ["1 <= n <= 100"],
    hints: ["Fast pointer moves 2 nodes, slow pointer moves 1 node."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "3" },
      { input: "1 2 3 4 5 6", expectedOutput: "4" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "10 20", expectedOutput: "20" },
      { input: "7 8 9", expectedOutput: "8" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/);
  const mid = Math.floor(nums.length / 2);
  return nums[mid];
}`
    }
  },
  {
    title: "Merge Two Sorted Linked Sequences",
    slug: "merge-two-sorted-linked-sequences",
    difficulty: "Easy",
    category: "dsa",
    topics: ["linked-list", "two-pointers"],
    description: "Merge two sorted linked sequences into one sorted sequence and return space-separated values.",
    examples: [
      { input: "1 2 4\n1 3 4", output: "1 1 2 3 4 4", explanation: "Merged in sorted order." }
    ],
    constraints: ["Number of nodes in both sequences is in range [0, 50]"],
    hints: ["Maintain a current pointer attaching the smaller of the two head nodes."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "1 2 4\n1 3 4", expectedOutput: "1 1 2 3 4 4" },
      { input: "\n0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "2\n1", expectedOutput: "1 2" },
      { input: "5 10 15\n2 8", expectedOutput: "2 5 8 10 15" },
      { input: "1 3\n2 4", expectedOutput: "1 2 3 4" }
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
  },
  {
    title: "Remove Nth Element from End of Sequence",
    slug: "remove-nth-element-from-end",
    difficulty: "Medium",
    category: "dsa",
    topics: ["linked-list", "two-pointers"],
    description: "Given a sequence of values representing a linked list and an integer n, remove the nth node from the end of the list and return the remaining values space-separated.",
    examples: [
      { input: "1 2 3 4 5\n2", output: "1 2 3 5", explanation: "4 is the 2nd from end, removed." },
      { input: "1\n1", output: "", explanation: "Only node removed." }
    ],
    constraints: ["1 <= list length <= 30", "1 <= n <= list length"],
    hints: ["Advance fast pointer n steps ahead, then move both until fast reaches the end."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "1 2 3 4 5\n2", expectedOutput: "1 2 3 5" },
      { input: "1\n1", expectedOutput: "" }
    ],
    hiddenTestCases: [
      { input: "1 2\n1", expectedOutput: "1" },
      { input: "1 2\n2", expectedOutput: "2" },
      { input: "10 20 30 40\n4", expectedOutput: "20 30 40" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [l1, l2] = input.trim().split('\\n');
  const nums = l1.trim().split(/\\s+/).filter(Boolean);
  const n = Number(l2.trim());
  const removeIdx = nums.length - n;
  nums.splice(removeIdx, 1);
  return nums.join(' ');
}`
    }
  }
];
