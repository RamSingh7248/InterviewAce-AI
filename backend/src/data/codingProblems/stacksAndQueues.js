export const stacksAndQueuesProblems = [
  {
    title: "Balanced Parentheses Validation",
    slug: "balanced-parentheses-validation",
    difficulty: "Easy",
    category: "dsa",
    topics: ["stacks", "strings"],
    description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Return 'true' or 'false'.",
    examples: [
      { input: "()[]{}", output: "true", explanation: "All brackets closed properly." },
      { input: "(]", output: "false", explanation: "Mismatched closing bracket." }
    ],
    constraints: ["1 <= s.length <= 10^4"],
    hints: ["Push opening brackets onto stack. Pop and check corresponding matching bracket when closing bracket seen."],
    starterCode: {
      javascript: `function solve(input) {\n  return 'false';\n}`
    },
    sampleTestCases: [
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" }
    ],
    hiddenTestCases: [
      { input: "([)]", expectedOutput: "false" },
      { input: "{[]}", expectedOutput: "true" },
      { input: "]", expectedOutput: "false" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const s = input.trim();
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch);
    } else if (map[ch]) {
      if (stack.length === 0 || stack.pop() !== map[ch]) return 'false';
    }
  }
  return stack.length === 0 ? 'true' : 'false';
}`
    }
  },
  {
    title: "Next Greater Element to Right",
    slug: "next-greater-element-right",
    difficulty: "Medium",
    category: "dsa",
    topics: ["stacks", "monotonic-stack"],
    description: "Given an array of integers, find the next greater element for each element in the array. If no greater element exists to the right, output -1. Return space-separated values.",
    examples: [
      { input: "4 5 2 25", output: "5 25 25 -1", explanation: "Next greater to 4 is 5, to 5 is 25, to 2 is 25, for 25 none exists (-1)." }
    ],
    constraints: ["1 <= nums.length <= 10^5"],
    hints: ["Use a monotonic decreasing stack processing from right to left."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "4 5 2 25", expectedOutput: "5 25 25 -1" },
      { input: "13 7 6 12", expectedOutput: "-1 12 12 -1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4", expectedOutput: "2 3 4 -1" },
      { input: "4 3 2 1", expectedOutput: "-1 -1 -1 -1" },
      { input: "10", expectedOutput: "-1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const nums = input.trim().split(/\\s+/).map(Number);
  const n = nums.length;
  const res = new Array(n).fill(-1);
  const stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] <= nums[i]) {
      stack.pop();
    }
    if (stack.length) res[i] = stack[stack.length - 1];
    stack.push(nums[i]);
  }
  return res.join(' ');
}`
    }
  },
  {
    title: "Daily Temperatures Wait Days",
    slug: "daily-temperatures-wait-days",
    difficulty: "Medium",
    category: "dsa",
    topics: ["stacks", "monotonic-stack"],
    description: "Given an array of integers temperatures represents daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0. Return space-separated.",
    examples: [
      { input: "73 74 75 71 69 72 76 73", output: "1 1 4 2 1 1 0 0", explanation: "Day 0 (73) waits 1 day for 74, etc." }
    ],
    constraints: ["1 <= temperatures.length <= 10^5"],
    hints: ["Stack stores indices of temperatures whose next warmer day has not yet been found."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "73 74 75 71 69 72 76 73", expectedOutput: "1 1 4 2 1 1 0 0" },
      { input: "30 40 50 60", expectedOutput: "1 1 1 0" }
    ],
    hiddenTestCases: [
      { input: "30 60 90", expectedOutput: "1 1 0" },
      { input: "90 80 70", expectedOutput: "0 0 0" },
      { input: "55", expectedOutput: "0" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const temps = input.trim().split(/\\s+/).map(Number);
  const res = new Array(temps.length).fill(0);
  const stack = [];
  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
      const prevIdx = stack.pop();
      res[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return res.join(' ');
}`
    }
  },
  {
    title: "Evaluate Reverse Polish Notation",
    slug: "evaluate-reverse-polish-notation",
    difficulty: "Medium",
    category: "dsa",
    topics: ["stacks", "math"],
    description: "Evaluate the value of an arithmetic expression in Reverse Polish Notation (postfix notation). Valid operators are +, -, *, and /. Division between two integers truncates toward zero.",
    examples: [
      { input: "2 1 + 3 *", output: "9", explanation: "((2 + 1) * 3) = 9" },
      { input: "4 13 5 / +", output: "6", explanation: "(4 + (13 / 5)) = 6" }
    ],
    constraints: ["1 <= tokens.length <= 10^4"],
    hints: ["When encountering a number, push to stack. When an operator is met, pop two operands, compute, and push back."],
    starterCode: {
      javascript: `function solve(input) {\n  return '0';\n}`
    },
    sampleTestCases: [
      { input: "2 1 + 3 *", expectedOutput: "9" },
      { input: "4 13 5 / +", expectedOutput: "6" }
    ],
    hiddenTestCases: [
      { input: "10 6 9 3 + -11 * / * 17 + 5 +", expectedOutput: "22" },
      { input: "3 4 -", expectedOutput: "-1" },
      { input: "7", expectedOutput: "7" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const tokens = input.trim().split(/\\s+/);
  const stack = [];
  for (const t of tokens) {
    if (t === '+' || t === '-' || t === '*' || t === '/') {
      const b = stack.pop();
      const a = stack.pop();
      if (t === '+') stack.push(a + b);
      else if (t === '-') stack.push(a - b);
      else if (t === '*') stack.push(a * b);
      else if (t === '/') stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(t));
    }
  }
  return String(stack.pop());
}`
    }
  },
  {
    title: "Min Stack Design Logic",
    slug: "min-stack-design-logic",
    difficulty: "Medium",
    category: "dsa",
    topics: ["stacks", "design"],
    description: "Given a sequence of stack operations: 'push X', 'pop', 'top', 'getMin', output the results of all 'top' and 'getMin' operations space-separated.",
    examples: [
      { input: "push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin", output: "-3 0 -2", explanation: "getMin returns -3. pop removes -3. top returns 0. getMin returns -2." }
    ],
    constraints: ["1 <= operations <= 10^4"],
    hints: ["Store pairs of (value, currentMin) or use an auxiliary min-tracking stack."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin", expectedOutput: "-3 0 -2" },
      { input: "push 1\npush 2\ntop\ngetMin", expectedOutput: "2 1" }
    ],
    hiddenTestCases: [
      { input: "push 5\ngetMin\npop", expectedOutput: "5" },
      { input: "push 2\npush 0\npush 3\npush 0\ngetMin\npop\ngetMin\npop\ngetMin", expectedOutput: "0 0 0" },
      { input: "push -1\ntop", expectedOutput: "-1" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const lines = input.trim().split('\\n').map(l => l.trim()).filter(Boolean);
  const stack = [];
  const minStack = [];
  const out = [];
  for (const line of lines) {
    const parts = line.split(/\\s+/);
    const op = parts[0];
    if (op === 'push') {
      const val = Number(parts[1]);
      stack.push(val);
      const curMin = minStack.length === 0 ? val : Math.min(val, minStack[minStack.length - 1]);
      minStack.push(curMin);
    } else if (op === 'pop') {
      stack.pop();
      minStack.pop();
    } else if (op === 'top') {
      out.push(stack[stack.length - 1]);
    } else if (op === 'getMin') {
      out.push(minStack[minStack.length - 1]);
    }
  }
  return out.join(' ');
}`
    }
  },
  {
    title: "Asteroid Collision Simulator",
    slug: "asteroid-collision-simulator",
    difficulty: "Medium",
    category: "dsa",
    topics: ["stacks", "simulation"],
    description: "Given an array of integers representing asteroids in a row. Absolute value represents size, sign represents direction (positive = right, negative = left). Find out the state of the asteroids after all collisions. Return space-separated values, or 'empty' if none survive.",
    examples: [
      { input: "5 10 -5", output: "5 10", explanation: "10 and -5 collide resulting in 10. 5 and 10 never collide." },
      { input: "8 -8", output: "empty", explanation: "8 and -8 collide and both explode." }
    ],
    constraints: ["2 <= asteroids.length <= 10^4", "asteroids[i] != 0"],
    hints: ["Only positive followed by negative asteroids collide."],
    starterCode: {
      javascript: `function solve(input) {\n  return '';\n}`
    },
    sampleTestCases: [
      { input: "5 10 -5", expectedOutput: "5 10" },
      { input: "8 -8", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "10 2 -5", expectedOutput: "10" },
      { input: "-2 -1 1 2", expectedOutput: "-2 -1 1 2" },
      { input: "-2 -2 1 -2", expectedOutput: "-2 -2 -2" }
    ],
    referenceSolution: {
      javascript: `function solve(input) {
  const asteroids = input.trim().split(/\\s+/).map(Number);
  const stack = [];
  for (const ast of asteroids) {
    let exploded = false;
    while (stack.length && ast < 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -ast) {
        stack.pop();
      } else if (top === -ast) {
        stack.pop();
        exploded = true;
        break;
      } else {
        exploded = true;
        break;
      }
    }
    if (!exploded) stack.push(ast);
  }
  return stack.length === 0 ? 'empty' : stack.join(' ');
}`
    }
  }
];
