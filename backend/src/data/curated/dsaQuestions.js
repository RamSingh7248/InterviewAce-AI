/**
 * Curated Question Bank - Data Structures & Algorithms (DSA)
 * Structured progression from two-pointers and sliding windows to binary search, trees, graphs, DP, and LRU Cache.
 */

export const DSA_QUESTIONS = [
  {
    questionId: "dsa_two_sum_001",
    questionText: "Explain how to solve the Pair Sum (Two Sum) problem. Compare the Hash Map approach on an unsorted array with the Two-Pointer approach on a sorted array, analyzing their time and space complexity trade-offs.",
    category: "DSA",
    topic: "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    subtopic: "Two Pointers & Hash-Based Lookup",
    difficulty: "Easy",
    questionType: "coding",
    sequenceOrder: 1,
    learningStage: "Fundamentals",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "Junior SDE", "Full Stack Developer"],
    interviewMode: "coding",
    tags: ["dsa", "arrays", "two-pointers", "hash-map", "time-complexity"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Unsorted array: One-pass Hash Map lookup storing (target - current_val) provides O(n) time and O(n) auxiliary space",
      "Sorted array: Two pointers initialized at left (0) and right (n - 1) adjust inwards based on sum comparison in O(n) time and O(1) space",
      "If unsorted array must be sorted first: sorting takes O(n log n) time, so Hash Map is superior if auxiliary memory is available"
    ],
    referenceAnswer: "The Two Sum problem can be solved with different trade-offs depending on whether the input array is sorted. For an unsorted array, a single-pass Hash Map achieves optimal O(N) time by storing each element's value and index; for each element x, we check if the complement (target - x) already exists in the map. This uses O(N) auxiliary space. If the array is already sorted, the Two-Pointer technique is optimal: we place one pointer at the start (left) and one at the end (right). If 'arr[left] + arr[right] == target', we found the solution. If the sum is less than target, we increment left to increase the sum; if greater, we decrement right. This achieves O(N) time with O(1) auxiliary space. If an unsorted array must be sorted first, the sort step takes O(N log N) time.",
    stepByStepExplanation: "1. Two-Pointer on Sorted Array:\n   - Set left = 0, right = arr.length - 1.\n   - While left < right:\n     - Calculate sum = arr[left] + arr[right].\n     - If sum == target: return indices [left, right].\n     - If sum < target: left++ (need a larger value).\n     - If sum > target: right-- (need a smaller value).\n2. Time Complexity: Each step moves at least one pointer; terminates in at most N steps -> O(N).\n3. Space Complexity: Only two pointer integers -> O(1).",
    practicalExample: "public int[] twoSumSorted(int[] numbers, int target) {\n    int left = 0, right = numbers.length - 1;\n    while (left < right) {\n        int sum = numbers[left] + numbers[right];\n        if (sum == target) return new int[]{left + 1, right + 1};\n        else if (sum < target) left++;\n        else right--;\n    }\n    return new int[]{-1, -1};\n}",
    commonMistakes: [
      "Using a brute-force nested loop taking O(N^2) time",
      "Using two pointers on an unsorted array without sorting first",
      "Using the same element twice (e.g. index left == right)"
    ],
    timeComplexity: "O(n) time",
    spaceComplexity: "O(1) auxiliary space (O(n) for Hash Map approach)",
    suggestedFollowUps: ["How would you extend this approach to solve the 3Sum problem in O(n^2) time without duplicate triplets?"],
    hints: ["If the array is sorted, how does moving the left pointer affect the sum? How does moving the right pointer affect it?"]
  },
  {
    questionId: "dsa_sliding_window_002",
    questionText: "How do you find the length of the Longest Substring Without Repeating Characters? Explain the Sliding Window technique with an auxiliary hash set or frequency map and analyze edge cases.",
    category: "DSA",
    topic: "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    subtopic: "Sliding Window & Hash Frequency",
    difficulty: "Medium",
    questionType: "coding",
    sequenceOrder: 2,
    learningStage: "Implementation & Coding",
    interviewRelevanceLabel: "Coding exercise",
    targetRoles: ["Software Engineer", "Backend Developer", "SDE-1", "SDE-2"],
    interviewMode: "coding",
    tags: ["dsa", "strings", "sliding-window", "hash-map", "two-pointers"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Maintain a dynamic sliding window [left, right] of unique characters",
      "Store last seen index of each character in a Hash Map or integer array of size 128/256 for ASCII",
      "When character at 'right' was previously seen at prevIndex within current window (prevIndex >= left), jump left pointer to prevIndex + 1",
      "Update max length at each iteration: maxLength = Math.max(maxLength, right - left + 1)"
    ],
    referenceAnswer: "The Longest Substring Without Repeating Characters problem is optimally solved using a dynamic Sliding Window with an auxiliary index map. We maintain a window [left, right] representing the current substring of unique characters. As the right pointer advances from index 0 to N-1, we check if the current character s[right] has been seen previously. If s[right] was recorded at index 'prev' and 'prev >= left' (meaning it falls inside our active window), we jump the left pointer forward to 'prev + 1' to eliminate the duplicate. We record the updated position of s[right] in our map and update 'maxLength = Math.max(maxLength, right - left + 1)'. This processes every character in O(N) time and requires O(min(N, M)) auxiliary space, where M is the character alphabet size.",
    stepByStepExplanation: "1. Initialize 'left = 0', 'maxLength = 0', and an array 'lastSeen' initialized to -1 (or Map<Character, Integer>).\n2. Iterate 'right' from 0 to s.length() - 1:\n   - char c = s.charAt(right);\n   - If lastSeen contains c and lastSeen.get(c) >= left:\n     - left = lastSeen.get(c) + 1;\n   - lastSeen.put(c, right);\n   - maxLength = Math.max(maxLength, right - left + 1);\n3. Return maxLength.",
    practicalExample: "public int lengthOfLongestSubstring(String s) {\n    int[] lastSeen = new int[128];\n    Arrays.fill(lastSeen, -1);\n    int maxLength = 0, left = 0;\n    \n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        if (lastSeen[c] >= left) {\n            left = lastSeen[c] + 1; // Jump left pointer past previous duplicate\n        }\n        lastSeen[c] = right;\n        maxLength = Math.max(maxLength, right - left + 1);\n    }\n    return maxLength;\n}",
    commonMistakes: [
      "Incrementing 'left' only by 1 on duplicates instead of jumping directly past the duplicate index",
      "Updating 'left' backwards if a duplicate was seen outside the current window (must enforce prevIndex >= left)",
      "Failing to test edge cases: empty string (returns 0), single character (returns 1), and all identical characters (returns 1)"
    ],
    timeComplexity: "O(n) time — single pass through string",
    spaceComplexity: "O(min(n, m)) space — where m is alphabet size (128 for ASCII)",
    suggestedFollowUps: ["How would you solve the Minimum Window Substring problem using a frequency count map and required match counter?"]
  },
  {
    questionId: "dsa_binary_search_003",
    questionText: "Explain how to implement Binary Search to find the First and Last Position of an Element in a Sorted Array. How do you prevent integer overflow in midpoint calculation?",
    category: "DSA",
    topic: "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    subtopic: "Binary Search & Boundary Lookups",
    difficulty: "Medium",
    questionType: "coding",
    sequenceOrder: 3,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "Junior SDE"],
    interviewMode: "coding",
    tags: ["dsa", "binary-search", "arrays", "logarithmic", "overflow"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Integer overflow prevention: compute midpoint using 'mid = left + (right - left) / 2' instead of '(left + right) / 2'",
      "Finding first position (lower bound): when target is found at mid, continue searching left half (right = mid - 1)",
      "Finding last position (upper bound): when target is found at mid, continue searching right half (left = mid + 1)",
      "Two logarithmic binary search passes achieve O(log n) total runtime with O(1) space"
    ],
    referenceAnswer: "Binary Search operates by repeatedly halving the search space of a sorted array. A common bug in midpoint calculation is '(left + right) / 2', which causes integer overflow when 'left + right' exceeds Integer.MAX_VALUE; we prevent this by calculating 'mid = left + (right - left) / 2'. To find the first and last position of a target in an array with duplicate values, standard binary search must be modified. To find the first occurrence (left boundary), when arr[mid] == target, we record mid as a potential answer and continue searching the left sub-array (right = mid - 1). Conversely, to find the last occurrence (right boundary), when arr[mid] == target, we record mid and continue searching the right sub-array (left = mid + 1). Executing these two passes takes O(log N) time and O(1) space.",
    stepByStepExplanation: "1. Find First Position:\n   - While left <= right:\n     - mid = left + (right - left) / 2;\n     - If arr[mid] == target: ans = mid; right = mid - 1 (keep looking left);\n     - Else if arr[mid] < target: left = mid + 1;\n     - Else: right = mid - 1;\n2. Find Last Position:\n   - While left <= right:\n     - mid = left + (right - left) / 2;\n     - If arr[mid] == target: ans = mid; left = mid + 1 (keep looking right);\n     - Else if arr[mid] < target: left = mid + 1;\n     - Else: right = mid - 1;\n3. Combine results: return [firstIndex, lastIndex].",
    practicalExample: "public int findFirst(int[] nums, int target) {\n    int left = 0, right = nums.length - 1, res = -1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) {\n            res = mid;\n            right = mid - 1; // explore earlier occurrences in left half\n        } else if (nums[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return res;\n}",
    commonMistakes: [
      "Using '(left + right) / 2' which overflows at 2^31 - 1",
      "Using linear scan after finding one instance (degrades worst-case runtime to O(n) when all elements are duplicates)",
      "Loop termination condition errors: using 'left < right' instead of 'left <= right' leading to off-by-one errors"
    ],
    timeComplexity: "O(log n) time",
    spaceComplexity: "O(1) auxiliary space",
    suggestedFollowUps: ["How can binary search be used to find the minimum in a Rotated Sorted Array?"]
  },
  {
    questionId: "dsa_linked_list_cycle_004",
    questionText: "How do you detect a cycle in a singly linked list and locate the node where the cycle begins? Explain the mathematical proof behind Floyd's Cycle-Finding Algorithm (Tortoise and Hare).",
    category: "DSA",
    topic: "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    subtopic: "Linked Lists & Cycle Detection",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 4,
    learningStage: "Common Interview Questions",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "Junior SDE", "Full Stack Developer"],
    interviewMode: "conceptual",
    tags: ["dsa", "linked-list", "floyd-algorithm", "two-pointers", "cycle-detection"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Fast pointer advances 2 steps while slow pointer advances 1 step; if a cycle exists, they must meet inside the cycle",
      "If fast or fast.next reaches null, no cycle exists",
      "Mathematical proof for cycle start: Let L1 be distance from head to cycle entrance, L2 be distance from entrance to meeting point, and C be cycle length. When they meet: 2 * (L1 + L2) = L1 + L2 + k * C => L1 = k * C - L2",
      "Resetting one pointer to head while keeping the other at meeting point and advancing both by 1 step guarantees they meet at the exact cycle entrance node",
      "Runs in O(n) time and O(1) space without modifying node structures"
    ],
    referenceAnswer: "Floyd's Cycle-Finding Algorithm detects cycles in a linked list using two pointers moving at different speeds: slow moves 1 step per iteration, fast moves 2 steps. If no cycle exists, fast reaches null. If a cycle exists, fast will catch up and collide with slow inside the cycle loop. To find the entrance node where the cycle begins: Let L1 be the distance from the head to the cycle start, and L2 be the distance from the cycle start to the collision point. Slow traveled (L1 + L2), and Fast traveled 2 * (L1 + L2). Fast also traveled L1 + L2 + k * C (where C is the cycle loop length and k >= 1). Equating these gives: 2(L1 + L2) = L1 + L2 + kC, simplifying to L1 = kC - L2. This mathematical identity means that if we reset one pointer back to the list head and keep the other pointer at the collision point, advancing both 1 step at a time will cause them to collide after exactly L1 steps at the cycle entrance.",
    stepByStepExplanation: "1. Phase 1 (Cycle Detection):\n   - slow = head, fast = head;\n   - while fast != null && fast.next != null:\n     - slow = slow.next;\n     - fast = fast.next.next;\n     - if slow == fast: cycle detected, break.\n2. If fast == null || fast.next == null: return null (no cycle).\n3. Phase 2 (Find Entrance):\n   - ptr1 = head, ptr2 = slow;\n   - while ptr1 != ptr2:\n     - ptr1 = ptr1.next;\n     - ptr2 = ptr2.next;\n   - return ptr1 (the cycle entrance node).",
    practicalExample: "public ListNode detectCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) {\n            ListNode ptr = head;\n            while (ptr != slow) {\n                ptr = ptr.next;\n                slow = slow.next;\n            }\n            return ptr; // Cycle start node\n        }\n    }\n    return null; // No cycle\n}",
    commonMistakes: [
      "Using an auxiliary HashSet of visited nodes, which takes O(n) extra space instead of O(1) space",
      "Dereferencing null on fast.next.next without verifying fast != null and fast.next != null",
      "Failing to handle an empty list or a list of one node without a cycle"
    ],
    timeComplexity: "O(n) time",
    spaceComplexity: "O(1) auxiliary space",
    suggestedFollowUps: ["How can Floyd's algorithm be applied to find the duplicate number in an array of n + 1 integers where values range from 1 to n?"]
  },
  {
    questionId: "dsa_valid_parentheses_005",
    questionText: "How do you determine if an input string containing '()[]{}' is valid using a Stack? Explain the algorithmic steps, space complexity, and edge cases.",
    category: "DSA",
    topic: "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    subtopic: "Stacks & String Validation",
    difficulty: "Easy",
    questionType: "coding",
    sequenceOrder: 5,
    learningStage: "Implementation & Coding",
    interviewRelevanceLabel: "Coding exercise",
    targetRoles: ["Software Engineer", "Backend Developer", "Junior SDE"],
    interviewMode: "coding",
    tags: ["dsa", "stack", "strings", "parentheses", "validation"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Use LIFO (Last-In-First-Out) stack to match the most recently opened parenthesis with its corresponding closer",
      "When encountering opening bracket '(', '{', '[', push corresponding expected closer onto stack",
      "When encountering closing bracket, pop from stack; if stack is empty or popped character does not match, string is invalid",
      "At end of traversal, stack must be completely empty (stack.isEmpty() == true) to guarantee all opened brackets were closed"
    ],
    referenceAnswer: "The Valid Parentheses problem requires verifying that every opening bracket has a corresponding closing bracket in the correct nested order. A Stack (LIFO data structure) is optimal because the most recently opened bracket must be the first one closed. We iterate through the string character by character. When an opening bracket '(', '{', or '[' is encountered, we push its corresponding expected closing bracket onto the stack. When a closing bracket is encountered, we check if the stack is empty (which indicates an unmatched closing bracket) or if the popped element does not match the current character. If either condition fails, the string is invalid. Finally, after the loop finishes, the stack must be empty; if elements remain, it indicates unclosed opening brackets.",
    stepByStepExplanation: "1. Quick check: If s.length() is odd, return false immediately.\n2. Initialize Stack<Character> stack = new ArrayDeque<>()\n3. For each char c in s:\n   - If c == '(', push ')'\n   - Else if c == '{', push '}'\n   - Else if c == '[', push ']'\n   - Else (it's a closer): if stack.isEmpty() || stack.pop() != c, return false\n4. Return stack.isEmpty() (ensures no dangling openers).",
    practicalExample: "public boolean isValid(String s) {\n    if (s.length() % 2 != 0) return false;\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n        if (c == '(') stack.push(')');\n        else if (c == '{') stack.push('}');\n        else if (c == '[') stack.push(']');\n        else if (stack.isEmpty() || stack.pop() != c) return false;\n    }\n    return stack.isEmpty();\n}",
    commonMistakes: [
      "Using integer counters for each bracket type; counters fail on interleaving cases like '([)]'",
      "Forgetting to check if stack is empty before popping on a closing character",
      "Forgetting the final check 'stack.isEmpty()', returning true for unclosed strings like '((('"
    ],
    timeComplexity: "O(n) time — single pass through string",
    spaceComplexity: "O(n) space in worst case (e.g. all opening brackets)",
    suggestedFollowUps: ["How would you solve Longest Valid Parentheses in O(n) time using a stack or two-pass counter?"]
  },
  {
    questionId: "dsa_validate_bst_006",
    questionText: "How do you validate whether a Binary Tree is a valid Binary Search Tree (BST)? Explain why comparing a node only with its immediate parent is insufficient, and present an O(n) solution.",
    category: "DSA",
    topic: "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    subtopic: "Trees & Binary Search Tree Invariants",
    difficulty: "Medium",
    questionType: "coding",
    sequenceOrder: 6,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "Junior SDE", "SDE-1"],
    interviewMode: "coding",
    tags: ["dsa", "trees", "bst", "recursion", "in-order-traversal"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "BST Invariant: For every node X, ALL nodes in its left subtree must be strictly less than X, and ALL nodes in its right subtree must be strictly greater than X",
      "Locality Fallacy: Simply checking node.left < node < node.right is insufficient because a descendant node in the right subtree could be less than the root ancestor",
      "Approach 1 (Range propagation): Recursively pass valid range [min, max], initialized to [-Infinity, +Infinity]; update bounds at each recursive step",
      "Approach 2 (In-order traversal): An in-order traversal of a valid BST must produce a strictly monotonically increasing sequence"
    ],
    referenceAnswer: "A binary tree is a valid Binary Search Tree (BST) if and only if for every node, all values in its entire left subtree are strictly less than the node's value, and all values in its entire right subtree are strictly greater. A classic pitfall is only checking immediate children (node.left.val < node.val < node.right.val); this fails on trees where a right subtree contains a grandchild smaller than the root ancestor (e.g., [5, 1, 4, null, null, 3, 6], where 3 is in 5's right subtree). The standard recursive approach propagates valid boundaries [min, max] down the tree: the root starts with (-∞, +∞). When moving left, the upper bound becomes current node value; when moving right, the lower bound becomes current node value. If any node falls outside (min, max), the tree is invalid. Alternatively, an in-order traversal (Left -> Node -> Right) must produce a strictly increasing sequence; we track the previous visited node value and return false if current <= prev.",
    stepByStepExplanation: "1. Recursive Range Method:\n   - boolean validate(TreeNode node, Long min, Long max)\n   - If node == null, return true (empty tree is valid).\n   - If node.val <= min || node.val >= max, return false.\n   - Return validate(node.left, min, node.val) && validate(node.right, node.val, max).\n2. Initial Call: validate(root, Long.MIN_VALUE, Long.MAX_VALUE) using Long to handle Integer.MAX_VALUE edge cases.",
    practicalExample: "public boolean isValidBST(TreeNode root) {\n    return validate(root, null, null);\n}\n\nprivate boolean validate(TreeNode node, Integer min, Integer max) {\n    if (node == null) return true;\n    if (min != null && node.val <= min) return false;\n    if (max != null && node.val >= max) return false;\n    return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n}",
    commonMistakes: [
      "Using Integer.MIN_VALUE / Integer.MAX_VALUE as initial bounds without handling trees containing nodes with Integer.MIN_VALUE or Integer.MAX_VALUE",
      "Allowing duplicate values when the definition specifies strictly less than / strictly greater than",
      "Checking only immediate child nodes instead of enforcing the global ancestor invariant"
    ],
    timeComplexity: "O(n) time — visits every node once",
    spaceComplexity: "O(h) space — call stack proportional to tree height (O(log n) balanced, O(n) skewed)",
    suggestedFollowUps: ["How do you find the Lowest Common Ancestor (LCA) in a Binary Search Tree in O(h) time?"]
  },
  {
    questionId: "dsa_shortest_path_bfs_007",
    questionText: "How do you find the shortest path between two nodes in an unweighted graph? Explain why Breadth-First Search (BFS) guarantees the shortest path whereas Depth-First Search (DFS) does not.",
    category: "DSA",
    topic: "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    subtopic: "Graph Traversal & Shortest Path",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 7,
    learningStage: "Practical Applications",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "SDE-1", "SDE-2"],
    interviewMode: "conceptual",
    tags: ["dsa", "graphs", "bfs", "dfs", "shortest-path"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "In an unweighted graph, all edge weights are uniform (cost = 1); shortest path equals minimum number of edge hops",
      "BFS visits nodes level by level in order of their distance from source (distance 1, distance 2, distance k); the first time the target node is visited is guaranteed to be its shortest path",
      "DFS explores down a single branch deeply before backtracking, potentially discovering a long path before a shorter path",
      "Queue data structure enforces FIFO level-order traversal; visited set prevents infinite loops in cyclic graphs"
    ],
    referenceAnswer: "In an unweighted graph where every edge has identical unit cost, Breadth-First Search (BFS) is guaranteed to find the shortest path between a source and a destination. BFS uses a First-In-First-Out (FIFO) queue to explore nodes level-by-level in increasing order of their distance from the source: first all nodes at distance 1, then all nodes at distance 2, and so forth. Because paths are explored in non-decreasing order of edge count, the very first time the destination node is dequeued or discovered, that path is mathematically guaranteed to have the minimum possible number of edges. Conversely, Depth-First Search (DFS) explores as deep as possible along a single branch before backtracking; it can reach the destination via an arbitrary convoluted path of 10 hops before even considering a direct 1-hop edge. BFS runs in O(V + E) time using an adjacency list and O(V) auxiliary space for the queue and visited set.",
    stepByStepExplanation: "1. Initialize Queue<Integer> queue and boolean[] visited.\n2. Enqueue source node and mark visited[source] = true; distance = 0.\n3. While queue is not empty:\n   - int levelSize = queue.size();\n   - for i from 0 to levelSize - 1:\n     - curr = queue.poll();\n     - if curr == destination: return distance;\n     - for each neighbor of curr:\n       - if !visited[neighbor]: visited[neighbor] = true; queue.offer(neighbor);\n   - distance++;\n4. Return -1 if destination is unreachable.",
    practicalExample: "public int shortestPathBFS(List<List<Integer>> adj, int src, int dest, int n) {\n    boolean[] visited = new boolean[n];\n    Queue<Integer> queue = new ArrayDeque<>();\n    queue.offer(src);\n    visited[src] = true;\n    int dist = 0;\n    \n    while (!queue.isEmpty()) {\n        int size = queue.size();\n        for (int i = 0; i < size; i++) {\n            int curr = queue.poll();\n            if (curr == dest) return dist;\n            for (int neighbor : adj.get(curr)) {\n                if (!visited[neighbor]) {\n                    visited[neighbor] = true;\n                    queue.offer(neighbor);\n                }\n            }\n        }\n        dist++;\n    }\n    return -1;\n}",
    commonMistakes: [
      "Using BFS for weighted graphs with non-uniform edge weights (use Dijkstra's Algorithm instead)",
      "Marking a node as visited when it is dequeued rather than when it is enqueued, causing duplicate nodes to enter the queue and inflating memory",
      "Forgetting visited tracking in cyclic graphs, causing infinite loops"
    ],
    timeComplexity: "O(V + E) time",
    spaceComplexity: "O(V) auxiliary space for queue and visited set",
    suggestedFollowUps: ["When edges have non-negative weights, how does Dijkstra's algorithm generalize BFS using a PriorityQueue?"]
  },
  {
    questionId: "dsa_coin_change_dp_008",
    questionText: "Explain how to solve the Coin Change problem (minimum coins to make amount) using Dynamic Programming. Distinguish between top-down memoization and bottom-up tabulation.",
    category: "DSA",
    topic: "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    subtopic: "Dynamic Programming & Optimization",
    difficulty: "Medium",
    questionType: "coding",
    sequenceOrder: 8,
    learningStage: "Advanced Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "SDE-1", "SDE-2"],
    interviewMode: "coding",
    tags: ["dsa", "dynamic-programming", "memoization", "tabulation", "knapsack"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Greedy approach (always picking largest coin) fails on non-canonical coin systems (e.g., coins [1, 3, 4] for amount 6: greedy picks 4+1+1=3 coins, optimal is 3+3=2 coins)",
      "Optimal Substructure: minCoins(amount) = 1 + min(minCoins(amount - coin)) across all available coin denominations",
      "Overlapping Subproblems: subproblems for smaller amounts are re-computed repeatedly, making DP optimal",
      "Bottom-up DP table: dp[i] represents minimum coins to make amount i, initialized to amount + 1"
    ],
    referenceAnswer: "The Coin Change problem asks for the minimum number of coins needed to make up a given amount. A greedy strategy (repeatedly picking the largest coin) fails for arbitrary denominations—for example, with coins [1, 3, 4] and target 6, greedy picks 4 + 1 + 1 (3 coins), whereas the optimal solution is 3 + 3 (2 coins). Dynamic Programming is optimal because the problem exhibits optimal substructure and overlapping subproblems. The recurrence relation is: dp[i] = 1 + min(dp[i - c]) for each coin c where i - c >= 0. In bottom-up tabulation, we allocate an array dp of size (amount + 1) initialized to a sentinel value (amount + 1), with base case dp[0] = 0. We iterate from i = 1 to amount, updating dp[i] = Math.min(dp[i], 1 + dp[i - coin]). If dp[amount] remains amount + 1, the amount is unreachable and we return -1. This runs in O(amount * n) time and O(amount) space.",
    stepByStepExplanation: "1. Base Case: dp[0] = 0 (0 coins needed for amount 0).\n2. Initialization: fill dp[1...amount] with amount + 1 (infinity sentinel).\n3. Recurrence Loop:\n   - for i from 1 to amount:\n     - for each coin in coins:\n       - if i - coin >= 0:\n         - dp[i] = Math.min(dp[i], 1 + dp[i - coin])\n4. Final answer: dp[amount] > amount ? -1 : dp[amount].",
    practicalExample: "public int coinChange(int[] coins, int amount) {\n    int max = amount + 1;\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, max);\n    dp[0] = 0;\n    \n    for (int i = 1; i <= amount; i++) {\n        for (int coin : coins) {\n            if (i - coin >= 0) {\n                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);\n            }\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}",
    commonMistakes: [
      "Using Integer.MAX_VALUE as the sentinel, which causes integer overflow when doing '1 + dp[i - coin]'",
      "Attempting a greedy approach without realizing it fails on general coin systems",
      "Ignoring the base case dp[0] = 0, causing all amounts to evaluate to infinity"
    ],
    timeComplexity: "O(amount * n) time — where n is number of coin denominations",
    spaceComplexity: "O(amount) space for DP table",
    suggestedFollowUps: ["How would you modify this to count the total number of distinct combinations that make up the amount (Coin Change 2)?"]
  },
  {
    questionId: "dsa_lru_cache_009",
    questionText: "Design and implement a Least Recently Used (LRU) Cache that supports get() and put() in O(1) time complexity. Explain the choice of data structures and node eviction mechanics.",
    category: "DSA",
    topic: "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    subtopic: "System Data Structures & LRU Cache",
    difficulty: "Hard",
    questionType: "coding",
    sequenceOrder: 9,
    learningStage: "Real-World Scenarios",
    interviewRelevanceLabel: "Practical scenario",
    targetRoles: ["Software Engineer", "Backend Developer", "Senior SDE", "Systems Engineer"],
    interviewMode: "coding",
    tags: ["dsa", "lru-cache", "doubly-linked-list", "hash-map", "system-design"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "To achieve O(1) get and put, combine a Hash Map with a Doubly Linked List",
      "Hash Map provides O(1) lookup: maps Key -> DoublyLinkedListNode",
      "Doubly Linked List provides O(1) node removal and insertion: maintains access order without shifting array elements",
      "Dummy head and dummy tail nodes eliminate edge-case null pointer checks when inserting at head or evicting from tail",
      "get(key): If present, move node to head (most recently used) and return value",
      "put(key, value): If key exists, update value and move to head; if new, insert at head; if capacity exceeded, remove node from tail (least recently used) and delete from map"
    ],
    referenceAnswer: "An LRU Cache requires O(1) lookups and O(1) eviction/updates. A Hash Map alone provides O(1) lookup but cannot re-order elements in O(1). A LinkedList alone maintains order but requires O(N) lookup. Therefore, the optimal solution combines a Hash Map with a Doubly Linked List. The Hash Map maps keys to Doubly Linked List nodes (Node<Key, Value>). The Doubly Linked List maintains access recency: newly accessed or inserted nodes are placed right after a dummy head (Most Recently Used), while candidate eviction nodes sit right before a dummy tail (Least Recently Used). On get(key), if found in the map, we unlink the node in O(1) and re-insert it right after head, then return its value. On put(key, value), if the key exists, we update its value and move it to head. If new, we insert a new node at head; if capacity is exceeded, we delete the tail.prev node from both the linked list and the hash map in O(1).",
    stepByStepExplanation: "1. Data Structure: Doubly linked list node with key, val, prev, next.\n2. Sentinel Nodes: Dummy head and dummy tail initialized pointing to each other.\n3. Helper methods: addNode(node) inserts right after head; removeNode(node) unlinks node from list.\n4. moveToHead(node): calls removeNode(node) then addNode(node).\n5. popTail(): removes and returns tail.prev.\n6. get(key): looks up map; if hit, moveToHead(node) and return node.val.\n7. put(key, val): if exists, update and moveToHead; if new, add node; if size > capacity, evict popTail() from list and map.",
    practicalExample: "public class LRUCache {\n    class Node { int key, val; Node prev, next; }\n    private final Map<Integer, Node> map = new HashMap<>();\n    private final int capacity;\n    private final Node head = new Node(), tail = new Node();\n    \n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        head.next = tail; tail.prev = head;\n    }\n    \n    public int get(int key) {\n        Node n = map.get(key);\n        if (n == null) return -1;\n        moveToHead(n);\n        return n.val;\n    }\n    \n    public void put(int key, int value) {\n        Node n = map.get(key);\n        if (n != null) {\n            n.val = value;\n            moveToHead(n);\n        } else {\n            if (map.size() >= capacity) {\n                Node lru = tail.prev;\n                removeNode(lru);\n                map.remove(lru.key);\n            }\n            Node newNode = new Node();\n            newNode.key = key; newNode.val = value;\n            addNode(newNode);\n            map.put(key, newNode);\n        }\n    }\n    private void addNode(Node n) { n.next = head.next; n.prev = head; head.next.prev = n; head.next = n; }\n    private void removeNode(Node n) { n.prev.next = n.next; n.next.prev = n.prev; }\n    private void moveToHead(Node n) { removeNode(n); addNode(n); }\n}",
    commonMistakes: [
      "Using a singly linked list; unlinking a node in a singly linked list requires traversing from head to find the predecessor in O(n) time",
      "Forgetting to store the key inside the Node structure; when evicting tail, the key is required to remove the entry from the Hash Map",
      "Failing to handle updating an existing key without exceeding cache capacity"
    ],
    timeComplexity: "O(1) time for both get() and put()",
    spaceComplexity: "O(capacity) space for hash map and doubly linked list",
    suggestedFollowUps: ["How would you make this LRU Cache thread-safe for high concurrent throughput?"]
  }
];
