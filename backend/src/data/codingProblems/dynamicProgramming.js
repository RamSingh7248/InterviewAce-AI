export const dynamicProgrammingProblems = [
  {
    title: "Climbing Stairs Step Ways",
    slug: "climbing-stairs-step-ways",
    difficulty: "Easy",
    category: "dsa",
    topics: ["dynamic-programming", "memoization"],
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "2", output: "2", explanation: "1 step + 1 step, or 2 steps." },
      { input: "3", output: "3", explanation: "1+1+1, 1+2, 2+1." }
    ],
    constraints: ["1 <= n <= 45"],
    hints: ["dp[i] = dp[i-1] + dp[i-2] with base cases dp[1] = 1, dp[2] = 2."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "4", expectedOutput: "5" },
      { input: "5", expectedOutput: "8" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const n = Number(input.trim());
  if (n <= 2) return String(n);
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return String(b);
}`
    }
  },
  {
    title: "Fibonacci Sequence Value",
    slug: "fibonacci-sequence-value",
    difficulty: "Easy",
    category: "dsa",
    topics: ["dynamic-programming", "math"],
    description: "Calculate F(n) for the Fibonacci sequence where F(0) = 0, F(1) = 1, and F(n) = F(n - 1) + F(n - 2) for n > 1.",
    examples: [
      { input: "2", output: "1", explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1." },
      { input: "4", output: "3", explanation: "F(4) = 3." }
    ],
    constraints: ["0 <= n <= 30"],
    hints: ["Use two variables to track the previous two values."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "2", expectedOutput: "1" },
      { input: "4", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "1" },
      { input: "6", expectedOutput: "8" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const n = Number(input.trim());
  if (n === 0) return '0';
  if (n === 1) return '1';
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return String(b);
}`
    }
  },
  {
    title: "House Robber Maximum Loot",
    slug: "house-robber-maximum-loot",
    difficulty: "Medium",
    category: "dsa",
    topics: ["dynamic-programming", "arrays"],
    description: "You are a robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected that automatically contact the police if two adjacent houses were broken into on the same night. Return the maximum amount of money you can rob tonight without alerting the police.",
    examples: [
      { input: "1 2 3 1", output: "4", explanation: "Rob house 1 (1) and house 3 (3) = 4." },
      { input: "2 7 9 3 1", output: "12", explanation: "Rob 1 (2), 3 (9), 5 (1) = 12." }
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    hints: ["dp[i] = max(dp[i-1], dp[i-2] + nums[i])."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "1 2 3 1", expectedOutput: "4" },
      { input: "2 7 9 3 1", expectedOutput: "12" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "2 1 1 2", expectedOutput: "4" },
      { input: "5 3 4 11 2", expectedOutput: "16" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  if (nums.length === 0) return '0';
  if (nums.length === 1) return String(nums[0]);
  let prev2 = 0;
  let prev1 = 0;
  for (const n of nums) {
    const cur = Math.max(prev1, prev2 + n);
    prev2 = prev1;
    prev1 = cur;
  }
  return String(prev1);
}`
    }
  },
  {
    title: "Coin Change Minimum Coins",
    slug: "coin-change-minimum-coins",
    difficulty: "Medium",
    category: "dsa",
    topics: ["dynamic-programming", "knapsack"],
    description: "You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    examples: [
      { input: "1 2 5\n11", output: "3", explanation: "11 = 5 + 5 + 1 (3 coins)." },
      { input: "2\n3", output: "-1", explanation: "Cannot make 3 with 2-coins." }
    ],
    constraints: ["1 <= coins.length <= 12", "0 <= amount <= 10^4"],
    hints: ["Bottom-up DP table: dp[i] = min(dp[i], dp[i - coin] + 1)."],
    starterCode: {
      javascript: `function solve(input) {\n  return '-1';\n}`
    },
    sampleTestCases: [
      { input: "1 2 5\n11", expectedOutput: "3" },
      { input: "2\n3", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "1\n0", expectedOutput: "0" },
      { input: "1 3 4 5\n7", expectedOutput: "2" },
      { input: "2 5\n6", expectedOutput: "3" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [l1, l2] = input.trim().split('\\n');
  const coins = l1.trim().split(/\\s+/).map(Number);
  const amount = Number(l2.trim());
  if (amount === 0) return '0';
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (i - c >= 0 && dp[i - c] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - c] + 1);
      }
    }
  }
  return String(dp[amount] === Infinity ? -1 : dp[amount]);
}`
    }
  },
  {
    title: "Longest Increasing Subsequence Length",
    slug: "longest-increasing-subsequence-length",
    difficulty: "Medium",
    category: "dsa",
    topics: ["dynamic-programming", "binary-search"],
    description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    examples: [
      { input: "10 9 2 5 3 7 101 18", output: "4", explanation: "Longest increasing subsequence is [2, 3, 7, 101], length 4." },
      { input: "0 1 0 3 2 3", output: "4", explanation: "[0, 1, 2, 3], length 4." }
    ],
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    hints: ["Patience sorting using binary search array of minimum tails (O(n log n))."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "10 9 2 5 3 7 101 18", expectedOutput: "4" },
      { input: "0 1 0 3 2 3", expectedOutput: "4" }
    ],
    hiddenTestCases: [
      { input: "7 7 7 7", expectedOutput: "1" },
      { input: "1 3 6 7 9 4 10 5 6", expectedOutput: "6" },
      { input: "5", expectedOutput: "1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  const tails = [];
  for (const x of nums) {
    let l = 0, r = tails.length;
    while (l < r) {
      const mid = Math.floor((l + r) / 2);
      if (tails[mid] < x) l = mid + 1;
      else r = mid;
    }
    tails[l] = x;
  }
  return String(tails.length);
}`
    }
  },
  {
    title: "Unique Paths in Grid",
    slug: "unique-paths-in-grid",
    difficulty: "Medium",
    category: "dsa",
    topics: ["dynamic-programming", "combinatorics"],
    description: "There is a robot on an m x n grid. The robot starts at the top-left corner and tries to move to the bottom-right corner. The robot can only move either down or right at any point in time. Given m and n space-separated, return the number of possible unique paths.",
    examples: [
      { input: "3 7", output: "28", explanation: "Total unique paths = 28." },
      { input: "3 2", output: "3", explanation: "Paths = 3." }
    ],
    constraints: ["1 <= m, n <= 30"],
    hints: ["dp[r][c] = dp[r-1][c] + dp[r][c-1]. Or combination formula (m+n-2 choose m-1)."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "3 7", expectedOutput: "28" },
      { input: "3 2", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "1 1", expectedOutput: "1" },
      { input: "3 3", expectedOutput: "6" },
      { input: "7 3", expectedOutput: "28" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [m, n] = input.trim().split(/\\s+/).map(Number);
  const row = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      row[j] += row[j - 1];
    }
  }
  return String(row[n - 1]);
}`
    }
  }
];
