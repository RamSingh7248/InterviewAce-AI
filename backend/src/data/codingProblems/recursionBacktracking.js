export const recursionBacktrackingProblems = [
  {
    title: "Fast Power Exponentiation",
    slug: "fast-power-exponentiation",
    difficulty: "Medium",
    category: "dsa",
    topics: ["recursion", "math"],
    description: "Implement pow(x, n) which calculates x raised to the power n (x^n). Return the integer floor of the answer when x and n are positive integers, or accurate to 2 decimal places if fractional.",
    examples: [
      { input: "2 10", output: "1024", explanation: "2^10 = 1024" },
      { input: "3 5", output: "243", explanation: "3^5 = 243" }
    ],
    constraints: ["-100.0 < x < 100.0", "-2^31 <= n <= 2^31-1"],
    hints: ["Binary exponentiation: if n is even, x^n = (x*x)^(n/2); if odd, x * x^(n-1)."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "2 10", expectedOutput: "1024" },
      { input: "3 5", expectedOutput: "243" }
    ],
    hiddenTestCases: [
      { input: "5 0", expectedOutput: "1" },
      { input: "2 1", expectedOutput: "2" },
      { input: "7 3", expectedOutput: "343" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [xStr, nStr] = input.trim().split(/\\s+/);
  let x = Number(xStr);
  let n = Number(nStr);
  function myPow(base, exp) {
    if (exp === 0) return 1;
    if (exp < 0) return 1 / myPow(base, -exp);
    const half = myPow(base, Math.floor(exp / 2));
    if (exp % 2 === 0) return half * half;
    return half * half * base;
  }
  const ans = myPow(x, n);
  return Number.isInteger(ans) ? String(ans) : ans.toFixed(2);
}`
    }
  },
  {
    title: "Subsets Count and Power Set Size",
    slug: "subsets-count-power-set-size",
    difficulty: "Medium",
    category: "dsa",
    topics: ["recursion", "backtracking"],
    description: "Given an array of unique integers, return the total count of distinct subsets (the power set), followed by the size of the largest subset.",
    examples: [
      { input: "1 2 3", output: "8 3", explanation: "2^3 = 8 subsets. Largest subset has size 3." }
    ],
    constraints: ["1 <= nums.length <= 15"],
    hints: ["Power set size for n unique items is 2^n."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "1 2 3", expectedOutput: "8 3" },
      { input: "0", expectedOutput: "2 1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4", expectedOutput: "16 4" },
      { input: "5 9", expectedOutput: "4 2" },
      { input: "10 20 30 40 50", expectedOutput: "32 5" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  const n = nums.length;
  const count = Math.pow(2, n);
  return \`\${count} \${n}\`;
}`
    }
  },
  {
    title: "Permutations of Distinct Integers Count",
    slug: "permutations-distinct-integers-count",
    difficulty: "Medium",
    category: "dsa",
    topics: ["recursion", "backtracking"],
    description: "Given an array of distinct integers, return the count of all possible permutations, followed by the first permutation in lexicographical order space-separated on a new line.",
    examples: [
      { input: "1 2 3", output: "6\n1 2 3", explanation: "3! = 6 permutations. First sorted is 1 2 3." }
    ],
    constraints: ["1 <= nums.length <= 8"],
    hints: ["Factorial n! gives total count. Sort numbers to get the first lexicographical permutation."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "1 2 3", expectedOutput: "6\n1 2 3" },
      { input: "0 1", expectedOutput: "2\n0 1" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1\n1" },
      { input: "4 2 1", expectedOutput: "6\n1 2 4" },
      { input: "3 2 1 4", expectedOutput: "24\n1 2 3 4" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  let fact = 1;
  for (let i = 2; i <= nums.length; i++) fact *= i;
  const sorted = [...nums].sort((a, b) => a - b);
  return \`\${fact}\\n\${sorted.join(' ')}\`;
}`
    }
  },
  {
    title: "Combination Sum Ways Count",
    slug: "combination-sum-ways-count",
    difficulty: "Medium",
    category: "dsa",
    topics: ["recursion", "backtracking"],
    description: "Given an array of distinct integers candidates and a target integer, return the count of unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen unlimited times.",
    examples: [
      { input: "2 3 6 7\n7", output: "2", explanation: "[2,2,3] and [7] are the 2 combinations." }
    ],
    constraints: ["1 <= candidates.length <= 30", "1 <= target <= 40"],
    hints: ["Use backtracking branching into taking the same element or advancing to the next."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "2 3 6 7\n7", expectedOutput: "2" },
      { input: "2 3 5\n8", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "2\n1", expectedOutput: "0" },
      { input: "1\n3", expectedOutput: "1" },
      { input: "2 4\n6", expectedOutput: "2" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const [l1, l2] = input.trim().split('\\n');
  const candidates = l1.trim().split(/\\s+/).map(Number);
  const target = Number(l2.trim());
  let count = 0;
  function backtrack(idx, rem) {
    if (rem === 0) { count++; return; }
    if (rem < 0 || idx >= candidates.length) return;
    backtrack(idx, rem - candidates[idx]);
    backtrack(idx + 1, rem);
  }
  backtrack(0, target);
  return String(count);
}`
    }
  },
  {
    title: "Word Search in Character Grid",
    slug: "word-search-character-grid",
    difficulty: "Medium",
    category: "dsa",
    topics: ["backtracking", "matrix", "dfs"],
    description: "Given an m x n grid of characters and a word, return 'true' if the word exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically). Cell cannot be reused.",
    examples: [
      { input: "A B C E\nS F C S\nA D E E\nABCCED", output: "true", explanation: "Word ABCCED is found." }
    ],
    constraints: ["m, n <= 6", "1 <= word.length <= 15"],
    hints: ["DFS with backtracking; mark visited cells with a sentinel character and restore."],
    starterCode: {
      javascript: `function solve(input) {\n  return 'false';\n}`
    },
    sampleTestCases: [
      { input: "A B C E\nS F C S\nA D E E\nABCCED", expectedOutput: "true" },
      { input: "A B C E\nS F C S\nA D E E\nSEE", expectedOutput: "true" }
    ],
    hiddenTestCases: [
      { input: "A B C E\nS F C S\nA D E E\nABCB", expectedOutput: "false" },
      { input: "a\na", expectedOutput: "true" },
      { input: "a b\nc d\nabdc", expectedOutput: "true" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const lines = input.trim().split('\\n').map(l => l.trim()).filter(Boolean);
  const word = lines[lines.length - 1];
  const grid = lines.slice(0, lines.length - 1).map(r => r.split(/\\s+/));
  const R = grid.length, C = grid[0].length;
  function dfs(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] !== word[idx]) return false;
    const temp = grid[r][c];
    grid[r][c] = '#';
    const found = dfs(r + 1, c, idx + 1) ||
                  dfs(r - 1, c, idx + 1) ||
                  dfs(r, c + 1, idx + 1) ||
                  dfs(r, c - 1, idx + 1);
    grid[r][c] = temp;
    return found;
  }
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (dfs(r, c, 0)) return 'true';
    }
  }
  return 'false';
}`
    }
  },
  {
    title: "Generate Balanced Parentheses Combinations",
    slug: "generate-balanced-parentheses-combinations",
    difficulty: "Medium",
    category: "dsa",
    topics: ["recursion", "backtracking", "strings"],
    description: "Given an integer n representing pairs of parentheses, return the count of all combinations of well-formed parentheses.",
    examples: [
      { input: "3", output: "5", explanation: "((())), (()()), (())(), ()(()), ()()() -> 5 combinations." },
      { input: "1", output: "1", explanation: "Only ()" }
    ],
    constraints: ["1 <= n <= 8"],
    hints: ["Catalan numbers formula C(n) = (1 / (n + 1)) * (2n choose n)."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "3", expectedOutput: "5" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "2", expectedOutput: "2" },
      { input: "4", expectedOutput: "14" },
      { input: "5", expectedOutput: "42" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const n = Number(input.trim());
  let count = 0;
  function backtrack(open, close) {
    if (open === n && close === n) { count++; return; }
    if (open < n) backtrack(open + 1, close);
    if (close < open) backtrack(open, close + 1);
  }
  backtrack(0, 0);
  return String(count);
}`
    }
  }
];
