/**
 * Curated High-Value Questions for DSA
 * Total Questions: 45
 */

export const DSA_QUESTIONS = [
  {
    "category": "DSA",
    "topic": "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    "subtopic": "Two Pointers & Hash-Based Lookup",
    "question": "Explain how to solve the Pair Sum (Two Sum) problem. Compare the Hash Map approach on an unsorted array with the Two-Pointer approach on a sorted array, analyzing their time and space complexity trade-offs.",
    "questionText": "Explain how to solve the Pair Sum (Two Sum) problem. Compare the Hash Map approach on an unsorted array with the Two-Pointer approach on a sorted array, analyzing their time and space complexity trade-offs.",
    "idealAnswer": "The Two Sum problem can be solved with different trade-offs depending on whether the input array is sorted. For an unsorted array, a single-pass Hash Map achieves optimal O(N) time by storing each element's value and index; for each element x, we check if the complement (target - x) already exists in the map. This uses O(N) auxiliary space. If the array is already sorted, the Two-Pointer technique is optimal: we place one pointer at the start (left) and one at the end (right). If 'arr[left] + arr[right] == target', we found the solution. If the sum is less than target, we increment left to increase the sum; if greater, we decrement right. This achieves O(N) time with O(1) auxiliary space. If an unsorted array must be sorted first, the sort step takes O(N log N) time.",
    "referenceAnswer": "The Two Sum problem can be solved with different trade-offs depending on whether the input array is sorted. For an unsorted array, a single-pass Hash Map achieves optimal O(N) time by storing each element's value and index; for each element x, we check if the complement (target - x) already exists in the map. This uses O(N) auxiliary space. If the array is already sorted, the Two-Pointer technique is optimal: we place one pointer at the start (left) and one at the end (right). If 'arr[left] + arr[right] == target', we found the solution. If the sum is less than target, we increment left to increase the sum; if greater, we decrement right. This achieves O(N) time with O(1) auxiliary space. If an unsorted array must be sorted first, the sort step takes O(N log N) time.",
    "keyPoints": [
      "Unsorted array: One-pass Hash Map lookup storing (target - current_val) provides O(n) time and O(n) auxiliary space",
      "Sorted array: Two pointers initialized at left (0) and right (n - 1) adjust inwards based on sum comparison in O(n) time and O(1) space",
      "If unsorted array must be sorted first: sorting takes O(n log n) time, so Hash Map is superior if auxiliary memory is available"
    ],
    "expectedKeyPoints": [
      "Unsorted array: One-pass Hash Map lookup storing (target - current_val) provides O(n) time and O(n) auxiliary space",
      "Sorted array: Two pointers initialized at left (0) and right (n - 1) adjust inwards based on sum comparison in O(n) time and O(1) space",
      "If unsorted array must be sorted first: sorting takes O(n log n) time, so Hash Map is superior if auxiliary memory is available"
    ],
    "followUps": [
      "How would you extend this approach to solve the 3Sum problem in O(n^2) time without duplicate triplets?"
    ],
    "suggestedFollowUps": [
      "How would you extend this approach to solve the 3Sum problem in O(n^2) time without duplicate triplets?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher"
    ],
    "experienceLevels": [
      "internship",
      "fresher"
    ],
    "modes": [
      "live-coding",
      "mixed-technical"
    ],
    "interviewModes": [
      "live-coding",
      "mixed-technical"
    ],
    "type": "coding",
    "questionType": "coding",
    "importance": 4,
    "tags": [
      "dsa",
      "arrays",
      "two-pointers",
      "hash-map",
      "time-complexity"
    ],
    "codingDetails": {
      "constraints": [
        "Time Complexity: O(N) or O(N log N)",
        "Space Complexity: O(1) or O(N) auxiliary space"
      ],
      "examples": [
        {
          "input": "Standard valid input",
          "output": "Expected result",
          "explanation": "Optimal boundary execution"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "explain how to solve the pair sum two sum problem compare the hash map approach on an unsorted array with the twopointer approach on a sorted array analyzing their time and space complexity tradeoffs",
    "normalizedText": "explain how to solve the pair sum two sum problem compare the hash map approach on an unsorted array with the twopointer approach on a sorted array analyzing their time and space complexity tradeoffs",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    "subtopic": "Sliding Window & Hash Frequency",
    "question": "How do you find the length of the Longest Substring Without Repeating Characters? Explain the Sliding Window technique with an auxiliary hash set or frequency map and analyze edge cases.",
    "questionText": "How do you find the length of the Longest Substring Without Repeating Characters? Explain the Sliding Window technique with an auxiliary hash set or frequency map and analyze edge cases.",
    "idealAnswer": "The Longest Substring Without Repeating Characters problem is optimally solved using a dynamic Sliding Window with an auxiliary index map. We maintain a window [left, right] representing the current substring of unique characters. As the right pointer advances from index 0 to N-1, we check if the current character s[right] has been seen previously. If s[right] was recorded at index 'prev' and 'prev >= left' (meaning it falls inside our active window), we jump the left pointer forward to 'prev + 1' to eliminate the duplicate. We record the updated position of s[right] in our map and update 'maxLength = Math.max(maxLength, right - left + 1)'. This processes every character in O(N) time and requires O(min(N, M)) auxiliary space, where M is the character alphabet size.",
    "referenceAnswer": "The Longest Substring Without Repeating Characters problem is optimally solved using a dynamic Sliding Window with an auxiliary index map. We maintain a window [left, right] representing the current substring of unique characters. As the right pointer advances from index 0 to N-1, we check if the current character s[right] has been seen previously. If s[right] was recorded at index 'prev' and 'prev >= left' (meaning it falls inside our active window), we jump the left pointer forward to 'prev + 1' to eliminate the duplicate. We record the updated position of s[right] in our map and update 'maxLength = Math.max(maxLength, right - left + 1)'. This processes every character in O(N) time and requires O(min(N, M)) auxiliary space, where M is the character alphabet size.",
    "keyPoints": [
      "Maintain a dynamic sliding window [left, right] of unique characters",
      "Store last seen index of each character in a Hash Map or integer array of size 128/256 for ASCII",
      "When character at 'right' was previously seen at prevIndex within current window (prevIndex >= left), jump left pointer to prevIndex + 1",
      "Update max length at each iteration: maxLength = Math.max(maxLength, right - left + 1)"
    ],
    "expectedKeyPoints": [
      "Maintain a dynamic sliding window [left, right] of unique characters",
      "Store last seen index of each character in a Hash Map or integer array of size 128/256 for ASCII",
      "When character at 'right' was previously seen at prevIndex within current window (prevIndex >= left), jump left pointer to prevIndex + 1",
      "Update max length at each iteration: maxLength = Math.max(maxLength, right - left + 1)"
    ],
    "followUps": [
      "How would you solve the Minimum Window Substring problem using a frequency count map and required match counter?"
    ],
    "suggestedFollowUps": [
      "How would you solve the Minimum Window Substring problem using a frequency count map and required match counter?"
    ],
    "difficulty": "Medium",
    "levels": [
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "junior",
      "mid"
    ],
    "modes": [
      "live-coding",
      "mixed-technical"
    ],
    "interviewModes": [
      "live-coding",
      "mixed-technical"
    ],
    "type": "coding",
    "questionType": "coding",
    "importance": 4,
    "tags": [
      "dsa",
      "strings",
      "sliding-window",
      "hash-map",
      "two-pointers"
    ],
    "codingDetails": {
      "constraints": [
        "Time Complexity: O(N) or O(N log N)",
        "Space Complexity: O(1) or O(N) auxiliary space"
      ],
      "examples": [
        {
          "input": "Standard valid input",
          "output": "Expected result",
          "explanation": "Optimal boundary execution"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "how do you find the length of the longest substring without repeating characters explain the sliding window technique with an auxiliary hash set or frequency map and analyze edge cases",
    "normalizedText": "how do you find the length of the longest substring without repeating characters explain the sliding window technique with an auxiliary hash set or frequency map and analyze edge cases",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    "subtopic": "Binary Search & Boundary Lookups",
    "question": "Explain how to implement Binary Search to find the First and Last Position of an Element in a Sorted Array. How do you prevent integer overflow in midpoint calculation?",
    "questionText": "Explain how to implement Binary Search to find the First and Last Position of an Element in a Sorted Array. How do you prevent integer overflow in midpoint calculation?",
    "idealAnswer": "Binary Search operates by repeatedly halving the search space of a sorted array. A common bug in midpoint calculation is '(left + right) / 2', which causes integer overflow when 'left + right' exceeds Integer.MAX_VALUE; we prevent this by calculating 'mid = left + (right - left) / 2'. To find the first and last position of a target in an array with duplicate values, standard binary search must be modified. To find the first occurrence (left boundary), when arr[mid] == target, we record mid as a potential answer and continue searching the left sub-array (right = mid - 1). Conversely, to find the last occurrence (right boundary), when arr[mid] == target, we record mid and continue searching the right sub-array (left = mid + 1). Executing these two passes takes O(log N) time and O(1) space.",
    "referenceAnswer": "Binary Search operates by repeatedly halving the search space of a sorted array. A common bug in midpoint calculation is '(left + right) / 2', which causes integer overflow when 'left + right' exceeds Integer.MAX_VALUE; we prevent this by calculating 'mid = left + (right - left) / 2'. To find the first and last position of a target in an array with duplicate values, standard binary search must be modified. To find the first occurrence (left boundary), when arr[mid] == target, we record mid as a potential answer and continue searching the left sub-array (right = mid - 1). Conversely, to find the last occurrence (right boundary), when arr[mid] == target, we record mid and continue searching the right sub-array (left = mid + 1). Executing these two passes takes O(log N) time and O(1) space.",
    "keyPoints": [
      "Integer overflow prevention: compute midpoint using 'mid = left + (right - left) / 2' instead of '(left + right) / 2'",
      "Finding first position (lower bound): when target is found at mid, continue searching left half (right = mid - 1)",
      "Finding last position (upper bound): when target is found at mid, continue searching right half (left = mid + 1)",
      "Two logarithmic binary search passes achieve O(log n) total runtime with O(1) space"
    ],
    "expectedKeyPoints": [
      "Integer overflow prevention: compute midpoint using 'mid = left + (right - left) / 2' instead of '(left + right) / 2'",
      "Finding first position (lower bound): when target is found at mid, continue searching left half (right = mid - 1)",
      "Finding last position (upper bound): when target is found at mid, continue searching right half (left = mid + 1)",
      "Two logarithmic binary search passes achieve O(log n) total runtime with O(1) space"
    ],
    "followUps": [
      "How can binary search be used to find the minimum in a Rotated Sorted Array?"
    ],
    "suggestedFollowUps": [
      "How can binary search be used to find the minimum in a Rotated Sorted Array?"
    ],
    "difficulty": "Medium",
    "levels": [
      "fresher",
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "fresher",
      "junior",
      "mid"
    ],
    "modes": [
      "live-coding",
      "mixed-technical"
    ],
    "interviewModes": [
      "live-coding",
      "mixed-technical"
    ],
    "type": "coding",
    "questionType": "coding",
    "importance": 4,
    "tags": [
      "dsa",
      "binary-search",
      "arrays",
      "logarithmic",
      "overflow"
    ],
    "codingDetails": {
      "constraints": [
        "Time Complexity: O(N) or O(N log N)",
        "Space Complexity: O(1) or O(N) auxiliary space"
      ],
      "examples": [
        {
          "input": "Standard valid input",
          "output": "Expected result",
          "explanation": "Optimal boundary execution"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "explain how to implement binary search to find the first and last position of an element in a sorted array how do you prevent integer overflow in midpoint calculation",
    "normalizedText": "explain how to implement binary search to find the first and last position of an element in a sorted array how do you prevent integer overflow in midpoint calculation",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    "subtopic": "Linked Lists & Cycle Detection",
    "question": "How do you detect a cycle in a singly linked list and locate the node where the cycle begins? Explain the mathematical proof behind Floyd's Cycle-Finding Algorithm (Tortoise and Hare).",
    "questionText": "How do you detect a cycle in a singly linked list and locate the node where the cycle begins? Explain the mathematical proof behind Floyd's Cycle-Finding Algorithm (Tortoise and Hare).",
    "idealAnswer": "Floyd's Cycle-Finding Algorithm detects cycles in a linked list using two pointers moving at different speeds: slow moves 1 step per iteration, fast moves 2 steps. If no cycle exists, fast reaches null. If a cycle exists, fast will catch up and collide with slow inside the cycle loop. To find the entrance node where the cycle begins: Let L1 be the distance from the head to the cycle start, and L2 be the distance from the cycle start to the collision point. Slow traveled (L1 + L2), and Fast traveled 2 * (L1 + L2). Fast also traveled L1 + L2 + k * C (where C is the cycle loop length and k >= 1). Equating these gives: 2(L1 + L2) = L1 + L2 + kC, simplifying to L1 = kC - L2. This mathematical identity means that if we reset one pointer back to the list head and keep the other pointer at the collision point, advancing both 1 step at a time will cause them to collide after exactly L1 steps at the cycle entrance.",
    "referenceAnswer": "Floyd's Cycle-Finding Algorithm detects cycles in a linked list using two pointers moving at different speeds: slow moves 1 step per iteration, fast moves 2 steps. If no cycle exists, fast reaches null. If a cycle exists, fast will catch up and collide with slow inside the cycle loop. To find the entrance node where the cycle begins: Let L1 be the distance from the head to the cycle start, and L2 be the distance from the cycle start to the collision point. Slow traveled (L1 + L2), and Fast traveled 2 * (L1 + L2). Fast also traveled L1 + L2 + k * C (where C is the cycle loop length and k >= 1). Equating these gives: 2(L1 + L2) = L1 + L2 + kC, simplifying to L1 = kC - L2. This mathematical identity means that if we reset one pointer back to the list head and keep the other pointer at the collision point, advancing both 1 step at a time will cause them to collide after exactly L1 steps at the cycle entrance.",
    "keyPoints": [
      "Fast pointer advances 2 steps while slow pointer advances 1 step; if a cycle exists, they must meet inside the cycle",
      "If fast or fast.next reaches null, no cycle exists",
      "Mathematical proof for cycle start: Let L1 be distance from head to cycle entrance, L2 be distance from entrance to meeting point, and C be cycle length. When they meet: 2 * (L1 + L2) = L1 + L2 + k * C => L1 = k * C - L2",
      "Resetting one pointer to head while keeping the other at meeting point and advancing both by 1 step guarantees they meet at the exact cycle entrance node",
      "Runs in O(n) time and O(1) space without modifying node structures"
    ],
    "expectedKeyPoints": [
      "Fast pointer advances 2 steps while slow pointer advances 1 step; if a cycle exists, they must meet inside the cycle",
      "If fast or fast.next reaches null, no cycle exists",
      "Mathematical proof for cycle start: Let L1 be distance from head to cycle entrance, L2 be distance from entrance to meeting point, and C be cycle length. When they meet: 2 * (L1 + L2) = L1 + L2 + k * C => L1 = k * C - L2",
      "Resetting one pointer to head while keeping the other at meeting point and advancing both by 1 step guarantees they meet at the exact cycle entrance node",
      "Runs in O(n) time and O(1) space without modifying node structures"
    ],
    "followUps": [
      "How can Floyd's algorithm be applied to find the duplicate number in an array of n + 1 integers where values range from 1 to n?"
    ],
    "suggestedFollowUps": [
      "How can Floyd's algorithm be applied to find the duplicate number in an array of n + 1 integers where values range from 1 to n?"
    ],
    "difficulty": "Medium",
    "levels": [
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "junior",
      "mid"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "dsa",
      "linked-list",
      "floyd-algorithm",
      "two-pointers",
      "cycle-detection"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how do you detect a cycle in a singly linked list and locate the node where the cycle begins explain the mathematical proof behind floyds cyclefinding algorithm tortoise and hare",
    "normalizedText": "how do you detect a cycle in a singly linked list and locate the node where the cycle begins explain the mathematical proof behind floyds cyclefinding algorithm tortoise and hare",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    "subtopic": "Stacks & String Validation",
    "question": "How do you determine if an input string containing '()[]{}' is valid using a Stack? Explain the algorithmic steps, space complexity, and edge cases.",
    "questionText": "How do you determine if an input string containing '()[]{}' is valid using a Stack? Explain the algorithmic steps, space complexity, and edge cases.",
    "idealAnswer": "The Valid Parentheses problem requires verifying that every opening bracket has a corresponding closing bracket in the correct nested order. A Stack (LIFO data structure) is optimal because the most recently opened bracket must be the first one closed. We iterate through the string character by character. When an opening bracket '(', '{', or '[' is encountered, we push its corresponding expected closing bracket onto the stack. When a closing bracket is encountered, we check if the stack is empty (which indicates an unmatched closing bracket) or if the popped element does not match the current character. If either condition fails, the string is invalid. Finally, after the loop finishes, the stack must be empty; if elements remain, it indicates unclosed opening brackets.",
    "referenceAnswer": "The Valid Parentheses problem requires verifying that every opening bracket has a corresponding closing bracket in the correct nested order. A Stack (LIFO data structure) is optimal because the most recently opened bracket must be the first one closed. We iterate through the string character by character. When an opening bracket '(', '{', or '[' is encountered, we push its corresponding expected closing bracket onto the stack. When a closing bracket is encountered, we check if the stack is empty (which indicates an unmatched closing bracket) or if the popped element does not match the current character. If either condition fails, the string is invalid. Finally, after the loop finishes, the stack must be empty; if elements remain, it indicates unclosed opening brackets.",
    "keyPoints": [
      "Use LIFO (Last-In-First-Out) stack to match the most recently opened parenthesis with its corresponding closer",
      "When encountering opening bracket '(', '{', '[', push corresponding expected closer onto stack",
      "When encountering closing bracket, pop from stack; if stack is empty or popped character does not match, string is invalid",
      "At end of traversal, stack must be completely empty (stack.isEmpty() == true) to guarantee all opened brackets were closed"
    ],
    "expectedKeyPoints": [
      "Use LIFO (Last-In-First-Out) stack to match the most recently opened parenthesis with its corresponding closer",
      "When encountering opening bracket '(', '{', '[', push corresponding expected closer onto stack",
      "When encountering closing bracket, pop from stack; if stack is empty or popped character does not match, string is invalid",
      "At end of traversal, stack must be completely empty (stack.isEmpty() == true) to guarantee all opened brackets were closed"
    ],
    "followUps": [
      "How would you solve Longest Valid Parentheses in O(n) time using a stack or two-pass counter?"
    ],
    "suggestedFollowUps": [
      "How would you solve Longest Valid Parentheses in O(n) time using a stack or two-pass counter?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher"
    ],
    "experienceLevels": [
      "internship",
      "fresher"
    ],
    "modes": [
      "live-coding",
      "mixed-technical"
    ],
    "interviewModes": [
      "live-coding",
      "mixed-technical"
    ],
    "type": "coding",
    "questionType": "coding",
    "importance": 4,
    "tags": [
      "dsa",
      "stack",
      "strings",
      "parentheses",
      "validation"
    ],
    "codingDetails": {
      "constraints": [
        "Time Complexity: O(N) or O(N log N)",
        "Space Complexity: O(1) or O(N) auxiliary space"
      ],
      "examples": [
        {
          "input": "Standard valid input",
          "output": "Expected result",
          "explanation": "Optimal boundary execution"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "how do you determine if an input string containing is valid using a stack explain the algorithmic steps space complexity and edge cases",
    "normalizedText": "how do you determine if an input string containing is valid using a stack explain the algorithmic steps space complexity and edge cases",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    "subtopic": "Trees & Binary Search Tree Invariants",
    "question": "How do you validate whether a Binary Tree is a valid Binary Search Tree (BST)? Explain why comparing a node only with its immediate parent is insufficient, and present an O(n) solution.",
    "questionText": "How do you validate whether a Binary Tree is a valid Binary Search Tree (BST)? Explain why comparing a node only with its immediate parent is insufficient, and present an O(n) solution.",
    "idealAnswer": "A binary tree is a valid Binary Search Tree (BST) if and only if for every node, all values in its entire left subtree are strictly less than the node's value, and all values in its entire right subtree are strictly greater. A classic pitfall is only checking immediate children (node.left.val < node.val < node.right.val); this fails on trees where a right subtree contains a grandchild smaller than the root ancestor (e.g., [5, 1, 4, null, null, 3, 6], where 3 is in 5's right subtree). The standard recursive approach propagates valid boundaries [min, max] down the tree: the root starts with (-∞, +∞). When moving left, the upper bound becomes current node value; when moving right, the lower bound becomes current node value. If any node falls outside (min, max), the tree is invalid. Alternatively, an in-order traversal (Left -> Node -> Right) must produce a strictly increasing sequence; we track the previous visited node value and return false if current <= prev.",
    "referenceAnswer": "A binary tree is a valid Binary Search Tree (BST) if and only if for every node, all values in its entire left subtree are strictly less than the node's value, and all values in its entire right subtree are strictly greater. A classic pitfall is only checking immediate children (node.left.val < node.val < node.right.val); this fails on trees where a right subtree contains a grandchild smaller than the root ancestor (e.g., [5, 1, 4, null, null, 3, 6], where 3 is in 5's right subtree). The standard recursive approach propagates valid boundaries [min, max] down the tree: the root starts with (-∞, +∞). When moving left, the upper bound becomes current node value; when moving right, the lower bound becomes current node value. If any node falls outside (min, max), the tree is invalid. Alternatively, an in-order traversal (Left -> Node -> Right) must produce a strictly increasing sequence; we track the previous visited node value and return false if current <= prev.",
    "keyPoints": [
      "BST Invariant: For every node X, ALL nodes in its left subtree must be strictly less than X, and ALL nodes in its right subtree must be strictly greater than X",
      "Locality Fallacy: Simply checking node.left < node < node.right is insufficient because a descendant node in the right subtree could be less than the root ancestor",
      "Approach 1 (Range propagation): Recursively pass valid range [min, max], initialized to [-Infinity, +Infinity]; update bounds at each recursive step",
      "Approach 2 (In-order traversal): An in-order traversal of a valid BST must produce a strictly monotonically increasing sequence"
    ],
    "expectedKeyPoints": [
      "BST Invariant: For every node X, ALL nodes in its left subtree must be strictly less than X, and ALL nodes in its right subtree must be strictly greater than X",
      "Locality Fallacy: Simply checking node.left < node < node.right is insufficient because a descendant node in the right subtree could be less than the root ancestor",
      "Approach 1 (Range propagation): Recursively pass valid range [min, max], initialized to [-Infinity, +Infinity]; update bounds at each recursive step",
      "Approach 2 (In-order traversal): An in-order traversal of a valid BST must produce a strictly monotonically increasing sequence"
    ],
    "followUps": [
      "How do you find the Lowest Common Ancestor (LCA) in a Binary Search Tree in O(h) time?"
    ],
    "suggestedFollowUps": [
      "How do you find the Lowest Common Ancestor (LCA) in a Binary Search Tree in O(h) time?"
    ],
    "difficulty": "Medium",
    "levels": [
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "junior",
      "mid"
    ],
    "modes": [
      "live-coding",
      "mixed-technical"
    ],
    "interviewModes": [
      "live-coding",
      "mixed-technical"
    ],
    "type": "coding",
    "questionType": "coding",
    "importance": 4,
    "tags": [
      "dsa",
      "trees",
      "bst",
      "recursion",
      "in-order-traversal"
    ],
    "codingDetails": {
      "constraints": [
        "Time Complexity: O(N) or O(N log N)",
        "Space Complexity: O(1) or O(N) auxiliary space"
      ],
      "examples": [
        {
          "input": "Standard valid input",
          "output": "Expected result",
          "explanation": "Optimal boundary execution"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "how do you validate whether a binary tree is a valid binary search tree bst explain why comparing a node only with its immediate parent is insufficient and present an on solution",
    "normalizedText": "how do you validate whether a binary tree is a valid binary search tree bst explain why comparing a node only with its immediate parent is insufficient and present an on solution",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    "subtopic": "Graph Traversal & Shortest Path",
    "question": "How do you find the shortest path between two nodes in an unweighted graph? Explain why Breadth-First Search (BFS) guarantees the shortest path whereas Depth-First Search (DFS) does not.",
    "questionText": "How do you find the shortest path between two nodes in an unweighted graph? Explain why Breadth-First Search (BFS) guarantees the shortest path whereas Depth-First Search (DFS) does not.",
    "idealAnswer": "In an unweighted graph where every edge has identical unit cost, Breadth-First Search (BFS) is guaranteed to find the shortest path between a source and a destination. BFS uses a First-In-First-Out (FIFO) queue to explore nodes level-by-level in increasing order of their distance from the source: first all nodes at distance 1, then all nodes at distance 2, and so forth. Because paths are explored in non-decreasing order of edge count, the very first time the destination node is dequeued or discovered, that path is mathematically guaranteed to have the minimum possible number of edges. Conversely, Depth-First Search (DFS) explores as deep as possible along a single branch before backtracking; it can reach the destination via an arbitrary convoluted path of 10 hops before even considering a direct 1-hop edge. BFS runs in O(V + E) time using an adjacency list and O(V) auxiliary space for the queue and visited set.",
    "referenceAnswer": "In an unweighted graph where every edge has identical unit cost, Breadth-First Search (BFS) is guaranteed to find the shortest path between a source and a destination. BFS uses a First-In-First-Out (FIFO) queue to explore nodes level-by-level in increasing order of their distance from the source: first all nodes at distance 1, then all nodes at distance 2, and so forth. Because paths are explored in non-decreasing order of edge count, the very first time the destination node is dequeued or discovered, that path is mathematically guaranteed to have the minimum possible number of edges. Conversely, Depth-First Search (DFS) explores as deep as possible along a single branch before backtracking; it can reach the destination via an arbitrary convoluted path of 10 hops before even considering a direct 1-hop edge. BFS runs in O(V + E) time using an adjacency list and O(V) auxiliary space for the queue and visited set.",
    "keyPoints": [
      "In an unweighted graph, all edge weights are uniform (cost = 1); shortest path equals minimum number of edge hops",
      "BFS visits nodes level by level in order of their distance from source (distance 1, distance 2, distance k); the first time the target node is visited is guaranteed to be its shortest path",
      "DFS explores down a single branch deeply before backtracking, potentially discovering a long path before a shorter path",
      "Queue data structure enforces FIFO level-order traversal; visited set prevents infinite loops in cyclic graphs"
    ],
    "expectedKeyPoints": [
      "In an unweighted graph, all edge weights are uniform (cost = 1); shortest path equals minimum number of edge hops",
      "BFS visits nodes level by level in order of their distance from source (distance 1, distance 2, distance k); the first time the target node is visited is guaranteed to be its shortest path",
      "DFS explores down a single branch deeply before backtracking, potentially discovering a long path before a shorter path",
      "Queue data structure enforces FIFO level-order traversal; visited set prevents infinite loops in cyclic graphs"
    ],
    "followUps": [
      "When edges have non-negative weights, how does Dijkstra's algorithm generalize BFS using a PriorityQueue?"
    ],
    "suggestedFollowUps": [
      "When edges have non-negative weights, how does Dijkstra's algorithm generalize BFS using a PriorityQueue?"
    ],
    "difficulty": "Medium",
    "levels": [
      "fresher",
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "fresher",
      "junior",
      "mid"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "dsa",
      "graphs",
      "bfs",
      "dfs",
      "shortest-path"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how do you find the shortest path between two nodes in an unweighted graph explain why breadthfirst search bfs guarantees the shortest path whereas depthfirst search dfs does not",
    "normalizedText": "how do you find the shortest path between two nodes in an unweighted graph explain why breadthfirst search bfs guarantees the shortest path whereas depthfirst search dfs does not",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    "subtopic": "Dynamic Programming & Optimization",
    "question": "Explain how to solve the Coin Change problem (minimum coins to make amount) using Dynamic Programming. Distinguish between top-down memoization and bottom-up tabulation.",
    "questionText": "Explain how to solve the Coin Change problem (minimum coins to make amount) using Dynamic Programming. Distinguish between top-down memoization and bottom-up tabulation.",
    "idealAnswer": "The Coin Change problem asks for the minimum number of coins needed to make up a given amount. A greedy strategy (repeatedly picking the largest coin) fails for arbitrary denominations—for example, with coins [1, 3, 4] and target 6, greedy picks 4 + 1 + 1 (3 coins), whereas the optimal solution is 3 + 3 (2 coins). Dynamic Programming is optimal because the problem exhibits optimal substructure and overlapping subproblems. The recurrence relation is: dp[i] = 1 + min(dp[i - c]) for each coin c where i - c >= 0. In bottom-up tabulation, we allocate an array dp of size (amount + 1) initialized to a sentinel value (amount + 1), with base case dp[0] = 0. We iterate from i = 1 to amount, updating dp[i] = Math.min(dp[i], 1 + dp[i - coin]). If dp[amount] remains amount + 1, the amount is unreachable and we return -1. This runs in O(amount * n) time and O(amount) space.",
    "referenceAnswer": "The Coin Change problem asks for the minimum number of coins needed to make up a given amount. A greedy strategy (repeatedly picking the largest coin) fails for arbitrary denominations—for example, with coins [1, 3, 4] and target 6, greedy picks 4 + 1 + 1 (3 coins), whereas the optimal solution is 3 + 3 (2 coins). Dynamic Programming is optimal because the problem exhibits optimal substructure and overlapping subproblems. The recurrence relation is: dp[i] = 1 + min(dp[i - c]) for each coin c where i - c >= 0. In bottom-up tabulation, we allocate an array dp of size (amount + 1) initialized to a sentinel value (amount + 1), with base case dp[0] = 0. We iterate from i = 1 to amount, updating dp[i] = Math.min(dp[i], 1 + dp[i - coin]). If dp[amount] remains amount + 1, the amount is unreachable and we return -1. This runs in O(amount * n) time and O(amount) space.",
    "keyPoints": [
      "Greedy approach (always picking largest coin) fails on non-canonical coin systems (e.g., coins [1, 3, 4] for amount 6: greedy picks 4+1+1=3 coins, optimal is 3+3=2 coins)",
      "Optimal Substructure: minCoins(amount) = 1 + min(minCoins(amount - coin)) across all available coin denominations",
      "Overlapping Subproblems: subproblems for smaller amounts are re-computed repeatedly, making DP optimal",
      "Bottom-up DP table: dp[i] represents minimum coins to make amount i, initialized to amount + 1"
    ],
    "expectedKeyPoints": [
      "Greedy approach (always picking largest coin) fails on non-canonical coin systems (e.g., coins [1, 3, 4] for amount 6: greedy picks 4+1+1=3 coins, optimal is 3+3=2 coins)",
      "Optimal Substructure: minCoins(amount) = 1 + min(minCoins(amount - coin)) across all available coin denominations",
      "Overlapping Subproblems: subproblems for smaller amounts are re-computed repeatedly, making DP optimal",
      "Bottom-up DP table: dp[i] represents minimum coins to make amount i, initialized to amount + 1"
    ],
    "followUps": [
      "How would you modify this to count the total number of distinct combinations that make up the amount (Coin Change 2)?"
    ],
    "suggestedFollowUps": [
      "How would you modify this to count the total number of distinct combinations that make up the amount (Coin Change 2)?"
    ],
    "difficulty": "Medium",
    "levels": [
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "junior",
      "mid"
    ],
    "modes": [
      "live-coding",
      "mixed-technical"
    ],
    "interviewModes": [
      "live-coding",
      "mixed-technical"
    ],
    "type": "coding",
    "questionType": "coding",
    "importance": 4,
    "tags": [
      "dsa",
      "dynamic-programming",
      "memoization",
      "tabulation",
      "knapsack"
    ],
    "codingDetails": {
      "constraints": [
        "Time Complexity: O(N) or O(N log N)",
        "Space Complexity: O(1) or O(N) auxiliary space"
      ],
      "examples": [
        {
          "input": "Standard valid input",
          "output": "Expected result",
          "explanation": "Optimal boundary execution"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "explain how to solve the coin change problem minimum coins to make amount using dynamic programming distinguish between topdown memoization and bottomup tabulation",
    "normalizedText": "explain how to solve the coin change problem minimum coins to make amount using dynamic programming distinguish between topdown memoization and bottomup tabulation",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis",
    "subtopic": "System Data Structures & LRU Cache",
    "question": "Design and implement a Least Recently Used (LRU) Cache that supports get() and put() in O(1) time complexity. Explain the choice of data structures and node eviction mechanics.",
    "questionText": "Design and implement a Least Recently Used (LRU) Cache that supports get() and put() in O(1) time complexity. Explain the choice of data structures and node eviction mechanics.",
    "idealAnswer": "An LRU Cache requires O(1) lookups and O(1) eviction/updates. A Hash Map alone provides O(1) lookup but cannot re-order elements in O(1). A LinkedList alone maintains order but requires O(N) lookup. Therefore, the optimal solution combines a Hash Map with a Doubly Linked List. The Hash Map maps keys to Doubly Linked List nodes (Node<Key, Value>). The Doubly Linked List maintains access recency: newly accessed or inserted nodes are placed right after a dummy head (Most Recently Used), while candidate eviction nodes sit right before a dummy tail (Least Recently Used). On get(key), if found in the map, we unlink the node in O(1) and re-insert it right after head, then return its value. On put(key, value), if the key exists, we update its value and move it to head. If new, we insert a new node at head; if capacity is exceeded, we delete the tail.prev node from both the linked list and the hash map in O(1).",
    "referenceAnswer": "An LRU Cache requires O(1) lookups and O(1) eviction/updates. A Hash Map alone provides O(1) lookup but cannot re-order elements in O(1). A LinkedList alone maintains order but requires O(N) lookup. Therefore, the optimal solution combines a Hash Map with a Doubly Linked List. The Hash Map maps keys to Doubly Linked List nodes (Node<Key, Value>). The Doubly Linked List maintains access recency: newly accessed or inserted nodes are placed right after a dummy head (Most Recently Used), while candidate eviction nodes sit right before a dummy tail (Least Recently Used). On get(key), if found in the map, we unlink the node in O(1) and re-insert it right after head, then return its value. On put(key, value), if the key exists, we update its value and move it to head. If new, we insert a new node at head; if capacity is exceeded, we delete the tail.prev node from both the linked list and the hash map in O(1).",
    "keyPoints": [
      "To achieve O(1) get and put, combine a Hash Map with a Doubly Linked List",
      "Hash Map provides O(1) lookup: maps Key -> DoublyLinkedListNode",
      "Doubly Linked List provides O(1) node removal and insertion: maintains access order without shifting array elements",
      "Dummy head and dummy tail nodes eliminate edge-case null pointer checks when inserting at head or evicting from tail",
      "get(key): If present, move node to head (most recently used) and return value",
      "put(key, value): If key exists, update value and move to head; if new, insert at head; if capacity exceeded, remove node from tail (least recently used) and delete from map"
    ],
    "expectedKeyPoints": [
      "To achieve O(1) get and put, combine a Hash Map with a Doubly Linked List",
      "Hash Map provides O(1) lookup: maps Key -> DoublyLinkedListNode",
      "Doubly Linked List provides O(1) node removal and insertion: maintains access order without shifting array elements",
      "Dummy head and dummy tail nodes eliminate edge-case null pointer checks when inserting at head or evicting from tail",
      "get(key): If present, move node to head (most recently used) and return value",
      "put(key, value): If key exists, update value and move to head; if new, insert at head; if capacity exceeded, remove node from tail (least recently used) and delete from map"
    ],
    "followUps": [
      "How would you make this LRU Cache thread-safe for high concurrent throughput?"
    ],
    "suggestedFollowUps": [
      "How would you make this LRU Cache thread-safe for high concurrent throughput?"
    ],
    "difficulty": "Hard",
    "levels": [
      "mid",
      "senior"
    ],
    "experienceLevels": [
      "mid",
      "senior"
    ],
    "modes": [
      "live-coding",
      "mixed-technical"
    ],
    "interviewModes": [
      "live-coding",
      "mixed-technical"
    ],
    "type": "coding",
    "questionType": "coding",
    "importance": 4,
    "tags": [
      "dsa",
      "lru-cache",
      "doubly-linked-list",
      "hash-map",
      "system-design"
    ],
    "codingDetails": {
      "constraints": [
        "Time Complexity: O(N) or O(N log N)",
        "Space Complexity: O(1) or O(N) auxiliary space"
      ],
      "examples": [
        {
          "input": "Standard valid input",
          "output": "Expected result",
          "explanation": "Optimal boundary execution"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "design and implement a least recently used lru cache that supports get and put in o1 time complexity explain the choice of data structures and node eviction mechanics",
    "normalizedText": "design and implement a least recently used lru cache that supports get and put in o1 time complexity explain the choice of data structures and node eviction mechanics",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Tries & Advanced Data Structures",
    "subtopic": "Tries & Advanced Data Structures Internals & Best Practices",
    "question": "Suppose a mission-critical DSA service encounters high latency and degraded throughput centered on Tries & Advanced Data Structures. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "questionText": "Suppose a mission-critical DSA service encounters high latency and degraded throughput centered on Tries & Advanced Data Structures. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "idealAnswer": "Diagnosing bottlenecks in DSA related to Tries & Advanced Data Structures requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "referenceAnswer": "Diagnosing bottlenecks in DSA related to Tries & Advanced Data Structures requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "keyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for DSA",
      "Architectural optimizations targeting thread contention, memory fragmentation, or I/O bounds",
      "Verification strategy measuring P99 latency, SLA guarantees, and fault recovery"
    ],
    "expectedKeyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for DSA",
      "Architectural optimizations targeting thread contention, memory fragmentation, or I/O bounds",
      "Verification strategy measuring P99 latency, SLA guarantees, and fault recovery"
    ],
    "followUps": [
      "How would you test and validate this behavior under extreme concurrency or scale?",
      "What alternative design or pattern could be used to optimize latency?"
    ],
    "suggestedFollowUps": [
      "How would you test and validate this behavior under extreme concurrency or scale?",
      "What alternative design or pattern could be used to optimize latency?"
    ],
    "difficulty": "Hard",
    "levels": [
      "senior"
    ],
    "experienceLevels": [
      "senior"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "dsa",
      "curated",
      "fallback",
      "tries"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "suppose a missioncritical dsa service encounters high latency and degraded throughput centered on tries advanced data structures how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "normalizedText": "suppose a missioncritical dsa service encounters high latency and degraded throughput centered on tries advanced data structures how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Strings & Two Pointers",
    "subtopic": "Arrays, Strings & Two Pointers",
    "question": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target. Implement the optimal O(N) solution in your language of choice.",
    "questionText": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target. Implement the optimal O(N) solution in your language of choice.",
    "idealAnswer": "Use a hash map to store each number's value mapped to its index. As you iterate through the array with index `i` and value `num`: 1) Calculate complement `target - num`; 2) Check if complement exists in the hash map. If it does, return `[map[complement], i]`; 3) Otherwise, insert `map[num] = i`. This solves the problem in a single pass with O(N) time complexity and O(N) auxiliary space.",
    "referenceAnswer": "Use a hash map to store each number's value mapped to its index. As you iterate through the array with index `i` and value `num`: 1) Calculate complement `target - num`; 2) Check if complement exists in the hash map. If it does, return `[map[complement], i]`; 3) Otherwise, insert `map[num] = i`. This solves the problem in a single pass with O(N) time complexity and O(N) auxiliary space.",
    "keyPoints": [
      "Single pass hash map lookup achieves O(N) time complexity",
      "Space-time trade-off storing elements in hash map",
      "Handles positive, negative, and zero values correctly"
    ],
    "expectedKeyPoints": [
      "Single pass hash map lookup achieves O(N) time complexity",
      "Space-time trade-off storing elements in hash map",
      "Handles positive, negative, and zero values correctly"
    ],
    "followUps": [
      "If the input array is already sorted, how can you solve it in O(1) extra space?",
      "What happens if there are duplicate values or multiple valid pairs?"
    ],
    "suggestedFollowUps": [
      "If the input array is already sorted, how can you solve it in O(1) extra space?",
      "What happens if there are duplicate values or multiple valid pairs?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher",
      "junior"
    ],
    "experienceLevels": [
      "internship",
      "fresher",
      "junior"
    ],
    "modes": [
      "live-coding",
      "mixed-technical"
    ],
    "interviewModes": [
      "live-coding",
      "mixed-technical"
    ],
    "type": "coding",
    "questionType": "coding",
    "importance": 5,
    "tags": [
      "dsa",
      "arrays strings  two pointers"
    ],
    "codingDetails": {
      "constraints": [
        "2 <= nums.length <= 10^5",
        "-10^9 <= nums[i] <= 10^9",
        "Exactly one valid answer exists"
      ],
      "examples": [
        {
          "input": "nums = [2, 7, 11, 15], target = 9",
          "output": "[0, 1]",
          "explanation": "nums[0] + nums[1] == 9"
        },
        {
          "input": "nums = [3, 2, 4], target = 6",
          "output": "[1, 2]",
          "explanation": "nums[1] + nums[2] == 6"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "given an array of integers nums and an integer target return indices of the two numbers such that they add up to target implement the optimal on solution in your language of choice",
    "normalizedText": "given an array of integers nums and an integer target return indices of the two numbers such that they add up to target implement the optimal on solution in your language of choice",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Binary Search & Sliding Window",
    "subtopic": "Binary Search & Sliding Window",
    "question": "Given a string `s`, find the length of the longest substring without repeating characters. Solve in O(N) time.",
    "questionText": "Given a string `s`, find the length of the longest substring without repeating characters. Solve in O(N) time.",
    "idealAnswer": "Use the sliding window technique with two pointers (`left` and `right`) and a hash map storing the most recent index of each character. As `right` iterates from 0 to `s.length - 1`: if `s[right]` is already in the map and its recorded index is >= `left`, advance `left = map[s[right]] + 1`. Then update `map[s[right]] = right` and calculate `maxLen = Math.max(maxLen, right - left + 1)`. This runs in O(N) time since each character is visited at most twice.",
    "referenceAnswer": "Use the sliding window technique with two pointers (`left` and `right`) and a hash map storing the most recent index of each character. As `right` iterates from 0 to `s.length - 1`: if `s[right]` is already in the map and its recorded index is >= `left`, advance `left = map[s[right]] + 1`. Then update `map[s[right]] = right` and calculate `maxLen = Math.max(maxLen, right - left + 1)`. This runs in O(N) time since each character is visited at most twice.",
    "keyPoints": [
      "Sliding window with variable size bounded by left and right pointers",
      "Hash map records character last-seen index for instant window shrinking",
      "O(N) time complexity with O(min(N, alphabet_size)) auxiliary space"
    ],
    "expectedKeyPoints": [
      "Sliding window with variable size bounded by left and right pointers",
      "Hash map records character last-seen index for instant window shrinking",
      "O(N) time complexity with O(min(N, alphabet_size)) auxiliary space"
    ],
    "followUps": [
      "How would you adapt this if at most k distinct characters are permitted?",
      "What is the optimal space complexity if character set is restricted to ASCII?"
    ],
    "suggestedFollowUps": [
      "How would you adapt this if at most k distinct characters are permitted?",
      "What is the optimal space complexity if character set is restricted to ASCII?"
    ],
    "difficulty": "Medium",
    "levels": [
      "fresher",
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "fresher",
      "junior",
      "mid"
    ],
    "modes": [
      "live-coding",
      "mixed-technical"
    ],
    "interviewModes": [
      "live-coding",
      "mixed-technical"
    ],
    "type": "coding",
    "questionType": "coding",
    "importance": 5,
    "tags": [
      "dsa",
      "binary search  sliding window"
    ],
    "codingDetails": {
      "constraints": [
        "0 <= s.length <= 5 * 10^4",
        "s consists of English letters, digits, symbols and spaces"
      ],
      "examples": [
        {
          "input": "s = \"abcabcbb\"",
          "output": "3",
          "explanation": "The answer is \"abc\", with length 3"
        },
        {
          "input": "s = \"bbbbb\"",
          "output": "1",
          "explanation": "The answer is \"b\", with length 1"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "given a string s find the length of the longest substring without repeating characters solve in on time",
    "normalizedText": "given a string s find the length of the longest substring without repeating characters solve in on time",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Trees, BST & Tree Traversals",
    "subtopic": "Trees, BST & Tree Traversals",
    "question": "Given the root of a binary tree, determine if it is a valid binary search tree (BST). Explain the common pitfall with checking only immediate child nodes.",
    "questionText": "Given the root of a binary tree, determine if it is a valid binary search tree (BST). Explain the common pitfall with checking only immediate child nodes.",
    "idealAnswer": "A common pitfall is checking only that `node.left.val < node.val` and `node.right.val > node.val`. This fails because a node in the right subtree might have a value smaller than a root ancestor. The correct approach enforces a valid range `(minVal, maxVal)` for each subtree: recursively verify that `minVal < node.val < maxVal`. When traversing left, update `maxVal = node.val`; when traversing right, update `minVal = node.val`. An alternative optimal approach performs an in-order traversal, verifying that values are strictly monotonically increasing.",
    "referenceAnswer": "A common pitfall is checking only that `node.left.val < node.val` and `node.right.val > node.val`. This fails because a node in the right subtree might have a value smaller than a root ancestor. The correct approach enforces a valid range `(minVal, maxVal)` for each subtree: recursively verify that `minVal < node.val < maxVal`. When traversing left, update `maxVal = node.val`; when traversing right, update `minVal = node.val`. An alternative optimal approach performs an in-order traversal, verifying that values are strictly monotonically increasing.",
    "keyPoints": [
      "Local child validation is insufficient; all descendants must satisfy global ancestor boundaries",
      "Recursive range validation passes (min, max) bounds through subtrees",
      "In-order traversal of a valid BST produces strictly increasing sorted order",
      "O(N) time complexity, O(H) call stack space where H is tree height"
    ],
    "expectedKeyPoints": [
      "Local child validation is insufficient; all descendants must satisfy global ancestor boundaries",
      "Recursive range validation passes (min, max) bounds through subtrees",
      "In-order traversal of a valid BST produces strictly increasing sorted order",
      "O(N) time complexity, O(H) call stack space where H is tree height"
    ],
    "followUps": [
      "How do you find the Lowest Common Ancestor (LCA) in a BST in O(H) time?",
      "How does Morris In-Order Traversal achieve O(1) auxiliary space without recursion?"
    ],
    "suggestedFollowUps": [
      "How do you find the Lowest Common Ancestor (LCA) in a BST in O(H) time?",
      "How does Morris In-Order Traversal achieve O(1) auxiliary space without recursion?"
    ],
    "difficulty": "Medium",
    "levels": [
      "fresher",
      "junior",
      "mid",
      "senior"
    ],
    "experienceLevels": [
      "fresher",
      "junior",
      "mid",
      "senior"
    ],
    "modes": [
      "live-coding",
      "mixed-technical"
    ],
    "interviewModes": [
      "live-coding",
      "mixed-technical"
    ],
    "type": "coding",
    "questionType": "coding",
    "importance": 5,
    "tags": [
      "dsa",
      "trees bst  tree traversals"
    ],
    "codingDetails": {
      "constraints": [
        "The number of nodes in the tree is in the range [1, 10^4]",
        "-2^31 <= Node.val <= 2^31 - 1"
      ],
      "examples": [
        {
          "input": "root = [2, 1, 3]",
          "output": "true",
          "explanation": "Left child 1 < 2, right child 3 > 2"
        },
        {
          "input": "root = [5, 1, 4, null, null, 3, 6]",
          "output": "false",
          "explanation": "Root node's value is 5, but right child node has value 4"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "given the root of a binary tree determine if it is a valid binary search tree bst explain the common pitfall with checking only immediate child nodes",
    "normalizedText": "given the root of a binary tree determine if it is a valid binary search tree bst explain the common pitfall with checking only immediate child nodes",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Dynamic Programming & Recursion",
    "subtopic": "Dynamic Programming & Recursion",
    "question": "You are given an integer array `coins` representing coin denominations and an integer `amount`. Return the fewest number of coins needed to make up that amount. If impossible, return -1. Write the bottom-up DP solution and state its complexity.",
    "questionText": "You are given an integer array `coins` representing coin denominations and an integer `amount`. Return the fewest number of coins needed to make up that amount. If impossible, return -1. Write the bottom-up DP solution and state its complexity.",
    "idealAnswer": "Define `dp[i]` as the minimum coins needed to make amount `i`. Initialize an array of size `amount + 1` with a sentinel infinity value (`amount + 1`), with base case `dp[0] = 0`. For `i` from 1 to `amount`: for each coin in `coins`: if `coin <= i`, `dp[i] = Math.min(dp[i], dp[i - coin] + 1)`. If `dp[amount] > amount`, return -1; otherwise return `dp[amount]`. Time complexity is O(amount * len(coins)) and space complexity is O(amount).",
    "referenceAnswer": "Define `dp[i]` as the minimum coins needed to make amount `i`. Initialize an array of size `amount + 1` with a sentinel infinity value (`amount + 1`), with base case `dp[0] = 0`. For `i` from 1 to `amount`: for each coin in `coins`: if `coin <= i`, `dp[i] = Math.min(dp[i], dp[i - coin] + 1)`. If `dp[amount] > amount`, return -1; otherwise return `dp[amount]`. Time complexity is O(amount * len(coins)) and space complexity is O(amount).",
    "keyPoints": [
      "Optimal substructure: dp[i] = min(dp[i - coin] + 1)",
      "Bottom-up tabulation prevents stack overflow from deep recursion",
      "O(amount * number_of_coins) time, O(amount) space",
      "Sentinel value handles unreachable amounts cleanly"
    ],
    "expectedKeyPoints": [
      "Optimal substructure: dp[i] = min(dp[i - coin] + 1)",
      "Bottom-up tabulation prevents stack overflow from deep recursion",
      "O(amount * number_of_coins) time, O(amount) space",
      "Sentinel value handles unreachable amounts cleanly"
    ],
    "followUps": [
      "How would you modify this to find the total number of unique combinations to make the amount (Unbounded Knapsack)?",
      "Can Greedy approach work if coin denominations are arbitrary?"
    ],
    "suggestedFollowUps": [
      "How would you modify this to find the total number of unique combinations to make the amount (Unbounded Knapsack)?",
      "Can Greedy approach work if coin denominations are arbitrary?"
    ],
    "difficulty": "Medium",
    "levels": [
      "junior",
      "mid",
      "senior"
    ],
    "experienceLevels": [
      "junior",
      "mid",
      "senior"
    ],
    "modes": [
      "live-coding",
      "mixed-technical"
    ],
    "interviewModes": [
      "live-coding",
      "mixed-technical"
    ],
    "type": "coding",
    "questionType": "coding",
    "importance": 5,
    "tags": [
      "dsa",
      "dynamic programming  recursion"
    ],
    "codingDetails": {
      "constraints": [
        "1 <= coins.length <= 12",
        "1 <= coins[i] <= 2^31 - 1",
        "0 <= amount <= 10^4"
      ],
      "examples": [
        {
          "input": "coins = [1, 2, 5], amount = 11",
          "output": "3",
          "explanation": "11 = 5 + 5 + 1"
        },
        {
          "input": "coins = [2], amount = 3",
          "output": "-1",
          "explanation": "Amount cannot be formed"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "you are given an integer array coins representing coin denominations and an integer amount return the fewest number of coins needed to make up that amount if impossible return 1 write the bottomup dp solution and state its complexity",
    "normalizedText": "you are given an integer array coins representing coin denominations and an integer amount return the fewest number of coins needed to make up that amount if impossible return 1 write the bottomup dp solution and state its complexity",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Graphs, BFS, DFS & Shortest Path",
    "subtopic": "Graphs, BFS, DFS & Shortest Path",
    "question": "Explain Dijkstra's Algorithm for Single-Source Shortest Path. What data structure is used to achieve O((V + E) log V) complexity, and why does Dijkstra fail on graphs with negative edge weights?",
    "questionText": "Explain Dijkstra's Algorithm for Single-Source Shortest Path. What data structure is used to achieve O((V + E) log V) complexity, and why does Dijkstra fail on graphs with negative edge weights?",
    "idealAnswer": "Dijkstra's algorithm finds the shortest path from a starting node to all other nodes in a weighted graph with non-negative edge weights. It maintains a Min-Heap (priority queue) of pairs `(distance, node)` and a `dist[]` array initialized to infinity. It iteratively extracts the unvisited node with minimum tentative distance, relaxes its outgoing edges, and pushes updated distances into the priority queue. Using a binary min-heap, extraction takes O(V log V) and edge relaxations take O(E log V), yielding O((V + E) log V). Dijkstra fails on negative edges because it greedily assumes once a node is marked visited, its minimum distance is permanently finalized; a negative edge discovered later could retroactively decrease an already-finalized distance. Bellman-Ford or SPFA must be used for graphs with negative weights.",
    "referenceAnswer": "Dijkstra's algorithm finds the shortest path from a starting node to all other nodes in a weighted graph with non-negative edge weights. It maintains a Min-Heap (priority queue) of pairs `(distance, node)` and a `dist[]` array initialized to infinity. It iteratively extracts the unvisited node with minimum tentative distance, relaxes its outgoing edges, and pushes updated distances into the priority queue. Using a binary min-heap, extraction takes O(V log V) and edge relaxations take O(E log V), yielding O((V + E) log V). Dijkstra fails on negative edges because it greedily assumes once a node is marked visited, its minimum distance is permanently finalized; a negative edge discovered later could retroactively decrease an already-finalized distance. Bellman-Ford or SPFA must be used for graphs with negative weights.",
    "keyPoints": [
      "Min-Heap / Priority Queue optimizes vertex selection to O(log V)",
      "Greedy invariant assumes visited node distances are permanently optimal",
      "Fails on negative edge weights because greedy assumption breaks",
      "Bellman-Ford handles negative weights and detects negative cycles in O(V * E)"
    ],
    "expectedKeyPoints": [
      "Min-Heap / Priority Queue optimizes vertex selection to O(log V)",
      "Greedy invariant assumes visited node distances are permanently optimal",
      "Fails on negative edge weights because greedy assumption breaks",
      "Bellman-Ford handles negative weights and detects negative cycles in O(V * E)"
    ],
    "followUps": [
      "How does the A* algorithm extend Dijkstra using heuristics?",
      "What is the difference between Dijkstra and Prim's Minimum Spanning Tree algorithm?"
    ],
    "suggestedFollowUps": [
      "How does the A* algorithm extend Dijkstra using heuristics?",
      "What is the difference between Dijkstra and Prim's Minimum Spanning Tree algorithm?"
    ],
    "difficulty": "Hard",
    "levels": [
      "mid",
      "senior"
    ],
    "experienceLevels": [
      "mid",
      "senior"
    ],
    "modes": [
      "mixed-technical",
      "conceptual-deep-dive"
    ],
    "interviewModes": [
      "mixed-technical",
      "conceptual-deep-dive"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "dsa",
      "graphs bfs dfs  shortest path"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain dijkstras algorithm for singlesource shortest path what data structure is used to achieve ov e log v complexity and why does dijkstra fail on graphs with negative edge weights",
    "normalizedText": "explain dijkstras algorithm for singlesource shortest path what data structure is used to achieve ov e log v complexity and why does dijkstra fail on graphs with negative edge weights",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Hashing & Frequency Counting",
    "subtopic": "Hashing & Frequency Counting",
    "question": "Design a high-resiliency workflow in Data Structures & Algorithms for Hashing & Frequency Counting. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Data Structures & Algorithms for Hashing & Frequency Counting. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Hashing & Frequency Counting workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Hashing & Frequency Counting workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "keyPoints": [
      "Handles edge cases (null inputs, empty sets, network timeouts) gracefully",
      "Demonstrates optimal algorithmic complexity (O(N) time, minimal auxiliary allocations)",
      "Applies production patterns (circuit breakers, idempotency, bounded queues)"
    ],
    "expectedKeyPoints": [
      "Handles edge cases (null inputs, empty sets, network timeouts) gracefully",
      "Demonstrates optimal algorithmic complexity (O(N) time, minimal auxiliary allocations)",
      "Applies production patterns (circuit breakers, idempotency, bounded queues)"
    ],
    "followUps": [
      "How does this implementation scale when processing streaming inputs of infinite length?",
      "What concurrency primitives would you introduce to parallelize this across multiple cores?"
    ],
    "suggestedFollowUps": [
      "How does this implementation scale when processing streaming inputs of infinite length?",
      "What concurrency primitives would you introduce to parallelize this across multiple cores?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher",
      "junior"
    ],
    "experienceLevels": [
      "internship",
      "fresher",
      "junior"
    ],
    "modes": [
      "scenario-based",
      "role-specific",
      "mixed-technical"
    ],
    "interviewModes": [
      "scenario-based",
      "role-specific",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 3,
    "tags": [
      "dsa",
      "hashing  frequency counting",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in data structures algorithms for hashing frequency counting how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in data structures algorithms for hashing frequency counting how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "DSA",
    "topic": "Linked Lists, Stacks & Queues",
    "subtopic": "Linked Lists, Stacks & Queues",
    "question": "In production Data Structures & Algorithms architectures, explain how Linked Lists, Stacks & Queues is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Data Structures & Algorithms architectures, explain how Linked Lists, Stacks & Queues is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Data Structures & Algorithms, Linked Lists, Stacks & Queues enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Data Structures & Algorithms, Linked Lists, Stacks & Queues enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Linked Lists, Stacks & Queues",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Linked Lists, Stacks & Queues",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Linked Lists, Stacks & Queues metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Linked Lists, Stacks & Queues?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Linked Lists, Stacks & Queues metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Linked Lists, Stacks & Queues?"
    ],
    "difficulty": "Hard",
    "levels": [
      "mid",
      "senior"
    ],
    "experienceLevels": [
      "mid",
      "senior"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "dsa",
      "linked lists stacks  queues",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production data structures algorithms architectures explain how linked lists stacks queues is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production data structures algorithms architectures explain how linked lists stacks queues is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Heaps & Priority Queues",
    "subtopic": "Heaps & Priority Queues",
    "question": "Design a high-resiliency workflow in Data Structures & Algorithms for Heaps & Priority Queues. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Data Structures & Algorithms for Heaps & Priority Queues. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Heaps & Priority Queues workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Heaps & Priority Queues workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "keyPoints": [
      "Handles edge cases (null inputs, empty sets, network timeouts) gracefully",
      "Demonstrates optimal algorithmic complexity (O(N) time, minimal auxiliary allocations)",
      "Applies production patterns (circuit breakers, idempotency, bounded queues)"
    ],
    "expectedKeyPoints": [
      "Handles edge cases (null inputs, empty sets, network timeouts) gracefully",
      "Demonstrates optimal algorithmic complexity (O(N) time, minimal auxiliary allocations)",
      "Applies production patterns (circuit breakers, idempotency, bounded queues)"
    ],
    "followUps": [
      "How does this implementation scale when processing streaming inputs of infinite length?",
      "What concurrency primitives would you introduce to parallelize this across multiple cores?"
    ],
    "suggestedFollowUps": [
      "How does this implementation scale when processing streaming inputs of infinite length?",
      "What concurrency primitives would you introduce to parallelize this across multiple cores?"
    ],
    "difficulty": "Medium",
    "levels": [
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "junior",
      "mid"
    ],
    "modes": [
      "scenario-based",
      "role-specific",
      "mixed-technical"
    ],
    "interviewModes": [
      "scenario-based",
      "role-specific",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 4,
    "tags": [
      "dsa",
      "heaps  priority queues",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in data structures algorithms for heaps priority queues how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in data structures algorithms for heaps priority queues how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Greedy Algorithms & Backtracking",
    "subtopic": "Greedy Algorithms & Backtracking",
    "question": "In production Data Structures & Algorithms architectures, explain how Greedy Algorithms & Backtracking is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Data Structures & Algorithms architectures, explain how Greedy Algorithms & Backtracking is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Data Structures & Algorithms, Greedy Algorithms & Backtracking enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Data Structures & Algorithms, Greedy Algorithms & Backtracking enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Greedy Algorithms & Backtracking",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Greedy Algorithms & Backtracking",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Greedy Algorithms & Backtracking metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Greedy Algorithms & Backtracking?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Greedy Algorithms & Backtracking metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Greedy Algorithms & Backtracking?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher"
    ],
    "experienceLevels": [
      "internship",
      "fresher"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 3,
    "tags": [
      "dsa",
      "greedy algorithms  backtracking",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production data structures algorithms architectures explain how greedy algorithms backtracking is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production data structures algorithms architectures explain how greedy algorithms backtracking is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Strings & Two Pointers",
    "subtopic": "Arrays, Strings & Two Pointers",
    "question": "Compare alternative design strategies for Arrays, Strings & Two Pointers in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Arrays, Strings & Two Pointers in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Arrays, Strings & Two Pointers in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Arrays, Strings & Two Pointers in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Arrays, Strings & Two Pointers",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Arrays, Strings & Two Pointers",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "followUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "suggestedFollowUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "difficulty": "Medium",
    "levels": [
      "fresher",
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "fresher",
      "junior",
      "mid"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "dsa",
      "arrays strings  two pointers",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for arrays strings two pointers in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for arrays strings two pointers in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Hashing & Frequency Counting",
    "subtopic": "Hashing & Frequency Counting",
    "question": "Debug this Data Structures & Algorithms scenario regarding Hashing & Frequency Counting: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Hashing & Frequency Counting\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Data Structures & Algorithms scenario regarding Hashing & Frequency Counting: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Hashing & Frequency Counting\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Hashing & Frequency Counting. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Hashing & Frequency Counting. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "keyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "expectedKeyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "followUps": [
      "How would you write an automated regression test to catch this Hashing & Frequency Counting bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Hashing & Frequency Counting bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher",
      "junior"
    ],
    "experienceLevels": [
      "internship",
      "fresher",
      "junior"
    ],
    "modes": [
      "debugging",
      "mixed-technical"
    ],
    "interviewModes": [
      "debugging",
      "mixed-technical"
    ],
    "type": "debugging",
    "questionType": "debugging",
    "importance": 3,
    "tags": [
      "dsa",
      "hashing  frequency counting",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this data structures algorithms scenario regarding hashing frequency counting a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for hashing frequency counting service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this data structures algorithms scenario regarding hashing frequency counting a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for hashing frequency counting service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "DSA",
    "topic": "Binary Search & Sliding Window",
    "subtopic": "Binary Search & Sliding Window",
    "question": "Compare alternative design strategies for Binary Search & Sliding Window in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Binary Search & Sliding Window in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Binary Search & Sliding Window in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Binary Search & Sliding Window in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Binary Search & Sliding Window",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Binary Search & Sliding Window",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "followUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "suggestedFollowUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "difficulty": "Hard",
    "levels": [
      "mid",
      "senior"
    ],
    "experienceLevels": [
      "mid",
      "senior"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "dsa",
      "binary search  sliding window",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for binary search sliding window in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for binary search sliding window in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Linked Lists, Stacks & Queues",
    "subtopic": "Linked Lists, Stacks & Queues",
    "question": "Debug this Data Structures & Algorithms scenario regarding Linked Lists, Stacks & Queues: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Linked Lists, Stacks & Queues\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Data Structures & Algorithms scenario regarding Linked Lists, Stacks & Queues: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Linked Lists, Stacks & Queues\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Linked Lists, Stacks & Queues. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Linked Lists, Stacks & Queues. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "keyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "expectedKeyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "followUps": [
      "How would you write an automated regression test to catch this Linked Lists, Stacks & Queues bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Linked Lists, Stacks & Queues bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "difficulty": "Medium",
    "levels": [
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "junior",
      "mid"
    ],
    "modes": [
      "debugging",
      "mixed-technical"
    ],
    "interviewModes": [
      "debugging",
      "mixed-technical"
    ],
    "type": "debugging",
    "questionType": "debugging",
    "importance": 4,
    "tags": [
      "dsa",
      "linked lists stacks  queues",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this data structures algorithms scenario regarding linked lists stacks queues a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for linked lists stacks queues service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this data structures algorithms scenario regarding linked lists stacks queues a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for linked lists stacks queues service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Trees, BST & Tree Traversals",
    "subtopic": "Trees, BST & Tree Traversals",
    "question": "Compare alternative design strategies for Trees, BST & Tree Traversals in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Trees, BST & Tree Traversals in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Trees, BST & Tree Traversals in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Trees, BST & Tree Traversals in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Trees, BST & Tree Traversals",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Trees, BST & Tree Traversals",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "followUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "suggestedFollowUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher"
    ],
    "experienceLevels": [
      "internship",
      "fresher"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 3,
    "tags": [
      "dsa",
      "trees bst  tree traversals",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for trees bst tree traversals in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for trees bst tree traversals in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "DSA",
    "topic": "Heaps & Priority Queues",
    "subtopic": "Heaps & Priority Queues",
    "question": "Debug this Data Structures & Algorithms scenario regarding Heaps & Priority Queues: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Heaps & Priority Queues\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Data Structures & Algorithms scenario regarding Heaps & Priority Queues: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Heaps & Priority Queues\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Heaps & Priority Queues. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Heaps & Priority Queues. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "keyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "expectedKeyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "followUps": [
      "How would you write an automated regression test to catch this Heaps & Priority Queues bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Heaps & Priority Queues bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "difficulty": "Hard",
    "levels": [
      "senior"
    ],
    "experienceLevels": [
      "senior"
    ],
    "modes": [
      "debugging",
      "mixed-technical"
    ],
    "interviewModes": [
      "debugging",
      "mixed-technical"
    ],
    "type": "debugging",
    "questionType": "debugging",
    "importance": 5,
    "tags": [
      "dsa",
      "heaps  priority queues",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this data structures algorithms scenario regarding heaps priority queues a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for heaps priority queues service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this data structures algorithms scenario regarding heaps priority queues a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for heaps priority queues service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Graphs, BFS, DFS & Shortest Path",
    "subtopic": "Graphs, BFS, DFS & Shortest Path",
    "question": "Compare alternative design strategies for Graphs, BFS, DFS & Shortest Path in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Graphs, BFS, DFS & Shortest Path in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Graphs, BFS, DFS & Shortest Path in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Graphs, BFS, DFS & Shortest Path in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Graphs, BFS, DFS & Shortest Path",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Graphs, BFS, DFS & Shortest Path",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "followUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "suggestedFollowUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "difficulty": "Medium",
    "levels": [
      "fresher",
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "fresher",
      "junior",
      "mid"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "dsa",
      "graphs bfs dfs  shortest path",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for graphs bfs dfs shortest path in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for graphs bfs dfs shortest path in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Dynamic Programming & Recursion",
    "subtopic": "Dynamic Programming & Recursion",
    "question": "Debug this Data Structures & Algorithms scenario regarding Dynamic Programming & Recursion: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Dynamic Programming & Recursion\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Data Structures & Algorithms scenario regarding Dynamic Programming & Recursion: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Dynamic Programming & Recursion\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Dynamic Programming & Recursion. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Dynamic Programming & Recursion. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "keyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "expectedKeyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "followUps": [
      "How would you write an automated regression test to catch this Dynamic Programming & Recursion bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Dynamic Programming & Recursion bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher",
      "junior"
    ],
    "experienceLevels": [
      "internship",
      "fresher",
      "junior"
    ],
    "modes": [
      "debugging",
      "mixed-technical"
    ],
    "interviewModes": [
      "debugging",
      "mixed-technical"
    ],
    "type": "debugging",
    "questionType": "debugging",
    "importance": 3,
    "tags": [
      "dsa",
      "dynamic programming  recursion",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this data structures algorithms scenario regarding dynamic programming recursion a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for dynamic programming recursion service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this data structures algorithms scenario regarding dynamic programming recursion a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for dynamic programming recursion service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "DSA",
    "topic": "Greedy Algorithms & Backtracking",
    "subtopic": "Greedy Algorithms & Backtracking",
    "question": "Compare alternative design strategies for Greedy Algorithms & Backtracking in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Greedy Algorithms & Backtracking in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Greedy Algorithms & Backtracking in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Greedy Algorithms & Backtracking in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Greedy Algorithms & Backtracking",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Greedy Algorithms & Backtracking",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "followUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "suggestedFollowUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "difficulty": "Hard",
    "levels": [
      "mid",
      "senior"
    ],
    "experienceLevels": [
      "mid",
      "senior"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "dsa",
      "greedy algorithms  backtracking",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for greedy algorithms backtracking in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for greedy algorithms backtracking in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Tries & Advanced Data Structures",
    "subtopic": "Tries & Advanced Data Structures",
    "question": "Debug this Data Structures & Algorithms scenario regarding Tries & Advanced Data Structures: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Tries & Advanced Data Structures\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Data Structures & Algorithms scenario regarding Tries & Advanced Data Structures: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Tries & Advanced Data Structures\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Tries & Advanced Data Structures. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Tries & Advanced Data Structures. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "keyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "expectedKeyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "followUps": [
      "How would you write an automated regression test to catch this Tries & Advanced Data Structures bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Tries & Advanced Data Structures bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "difficulty": "Medium",
    "levels": [
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "junior",
      "mid"
    ],
    "modes": [
      "debugging",
      "mixed-technical"
    ],
    "interviewModes": [
      "debugging",
      "mixed-technical"
    ],
    "type": "debugging",
    "questionType": "debugging",
    "importance": 4,
    "tags": [
      "dsa",
      "tries  advanced data structures",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this data structures algorithms scenario regarding tries advanced data structures a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for tries advanced data structures service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this data structures algorithms scenario regarding tries advanced data structures a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for tries advanced data structures service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Hashing & Frequency Counting",
    "subtopic": "Hashing & Frequency Counting",
    "question": "In production Data Structures & Algorithms architectures, explain how Hashing & Frequency Counting is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Data Structures & Algorithms architectures, explain how Hashing & Frequency Counting is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Data Structures & Algorithms, Hashing & Frequency Counting enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Data Structures & Algorithms, Hashing & Frequency Counting enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Hashing & Frequency Counting",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Hashing & Frequency Counting",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Hashing & Frequency Counting metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Hashing & Frequency Counting?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Hashing & Frequency Counting metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Hashing & Frequency Counting?"
    ],
    "difficulty": "Medium",
    "levels": [
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "junior",
      "mid"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "dsa",
      "hashing  frequency counting",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production data structures algorithms architectures explain how hashing frequency counting is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production data structures algorithms architectures explain how hashing frequency counting is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Binary Search & Sliding Window",
    "subtopic": "Binary Search & Sliding Window",
    "question": "Design a high-resiliency workflow in Data Structures & Algorithms for Binary Search & Sliding Window. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Data Structures & Algorithms for Binary Search & Sliding Window. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Binary Search & Sliding Window workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Binary Search & Sliding Window workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "keyPoints": [
      "Handles edge cases (null inputs, empty sets, network timeouts) gracefully",
      "Demonstrates optimal algorithmic complexity (O(N) time, minimal auxiliary allocations)",
      "Applies production patterns (circuit breakers, idempotency, bounded queues)"
    ],
    "expectedKeyPoints": [
      "Handles edge cases (null inputs, empty sets, network timeouts) gracefully",
      "Demonstrates optimal algorithmic complexity (O(N) time, minimal auxiliary allocations)",
      "Applies production patterns (circuit breakers, idempotency, bounded queues)"
    ],
    "followUps": [
      "How does this implementation scale when processing streaming inputs of infinite length?",
      "What concurrency primitives would you introduce to parallelize this across multiple cores?"
    ],
    "suggestedFollowUps": [
      "How does this implementation scale when processing streaming inputs of infinite length?",
      "What concurrency primitives would you introduce to parallelize this across multiple cores?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher"
    ],
    "experienceLevels": [
      "internship",
      "fresher"
    ],
    "modes": [
      "scenario-based",
      "role-specific",
      "mixed-technical"
    ],
    "interviewModes": [
      "scenario-based",
      "role-specific",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 3,
    "tags": [
      "dsa",
      "binary search  sliding window",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in data structures algorithms for binary search sliding window how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in data structures algorithms for binary search sliding window how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "DSA",
    "topic": "Trees, BST & Tree Traversals",
    "subtopic": "Trees, BST & Tree Traversals",
    "question": "Debug this Data Structures & Algorithms scenario regarding Trees, BST & Tree Traversals: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Trees, BST & Tree Traversals\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Data Structures & Algorithms scenario regarding Trees, BST & Tree Traversals: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Trees, BST & Tree Traversals\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Trees, BST & Tree Traversals. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Trees, BST & Tree Traversals. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "keyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "expectedKeyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "followUps": [
      "How would you write an automated regression test to catch this Trees, BST & Tree Traversals bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Trees, BST & Tree Traversals bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher"
    ],
    "experienceLevels": [
      "internship",
      "fresher"
    ],
    "modes": [
      "debugging",
      "mixed-technical"
    ],
    "interviewModes": [
      "debugging",
      "mixed-technical"
    ],
    "type": "debugging",
    "questionType": "debugging",
    "importance": 3,
    "tags": [
      "dsa",
      "trees bst  tree traversals",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this data structures algorithms scenario regarding trees bst tree traversals a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for trees bst tree traversals service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this data structures algorithms scenario regarding trees bst tree traversals a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for trees bst tree traversals service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "DSA",
    "topic": "Heaps & Priority Queues",
    "subtopic": "Heaps & Priority Queues",
    "question": "Compare alternative design strategies for Heaps & Priority Queues in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Heaps & Priority Queues in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Heaps & Priority Queues in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Heaps & Priority Queues in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Heaps & Priority Queues",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Heaps & Priority Queues",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "followUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "suggestedFollowUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "difficulty": "Hard",
    "levels": [
      "senior"
    ],
    "experienceLevels": [
      "senior"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "dsa",
      "heaps  priority queues",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for heaps priority queues in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for heaps priority queues in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Graphs, BFS, DFS & Shortest Path",
    "subtopic": "Graphs, BFS, DFS & Shortest Path",
    "question": "Debug this Data Structures & Algorithms scenario regarding Graphs, BFS, DFS & Shortest Path: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Graphs, BFS, DFS & Shortest Path\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Data Structures & Algorithms scenario regarding Graphs, BFS, DFS & Shortest Path: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Graphs, BFS, DFS & Shortest Path\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Graphs, BFS, DFS & Shortest Path. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Graphs, BFS, DFS & Shortest Path. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "keyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "expectedKeyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "followUps": [
      "How would you write an automated regression test to catch this Graphs, BFS, DFS & Shortest Path bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Graphs, BFS, DFS & Shortest Path bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "difficulty": "Medium",
    "levels": [
      "fresher",
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "fresher",
      "junior",
      "mid"
    ],
    "modes": [
      "debugging",
      "mixed-technical"
    ],
    "interviewModes": [
      "debugging",
      "mixed-technical"
    ],
    "type": "debugging",
    "questionType": "debugging",
    "importance": 4,
    "tags": [
      "dsa",
      "graphs bfs dfs  shortest path",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this data structures algorithms scenario regarding graphs bfs dfs shortest path a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for graphs bfs dfs shortest path service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this data structures algorithms scenario regarding graphs bfs dfs shortest path a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for graphs bfs dfs shortest path service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Dynamic Programming & Recursion",
    "subtopic": "Dynamic Programming & Recursion",
    "question": "Compare alternative design strategies for Dynamic Programming & Recursion in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Dynamic Programming & Recursion in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Dynamic Programming & Recursion in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Dynamic Programming & Recursion in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Dynamic Programming & Recursion",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Dynamic Programming & Recursion",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "followUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "suggestedFollowUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher",
      "junior"
    ],
    "experienceLevels": [
      "internship",
      "fresher",
      "junior"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 3,
    "tags": [
      "dsa",
      "dynamic programming  recursion",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for dynamic programming recursion in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for dynamic programming recursion in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "DSA",
    "topic": "Greedy Algorithms & Backtracking",
    "subtopic": "Greedy Algorithms & Backtracking",
    "question": "Debug this Data Structures & Algorithms scenario regarding Greedy Algorithms & Backtracking: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Greedy Algorithms & Backtracking\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Data Structures & Algorithms scenario regarding Greedy Algorithms & Backtracking: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Greedy Algorithms & Backtracking\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Greedy Algorithms & Backtracking. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Greedy Algorithms & Backtracking. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "keyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "expectedKeyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "followUps": [
      "How would you write an automated regression test to catch this Greedy Algorithms & Backtracking bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Greedy Algorithms & Backtracking bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "difficulty": "Hard",
    "levels": [
      "mid",
      "senior"
    ],
    "experienceLevels": [
      "mid",
      "senior"
    ],
    "modes": [
      "debugging",
      "mixed-technical"
    ],
    "interviewModes": [
      "debugging",
      "mixed-technical"
    ],
    "type": "debugging",
    "questionType": "debugging",
    "importance": 5,
    "tags": [
      "dsa",
      "greedy algorithms  backtracking",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this data structures algorithms scenario regarding greedy algorithms backtracking a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for greedy algorithms backtracking service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this data structures algorithms scenario regarding greedy algorithms backtracking a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for greedy algorithms backtracking service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Tries & Advanced Data Structures",
    "subtopic": "Tries & Advanced Data Structures",
    "question": "Compare alternative design strategies for Tries & Advanced Data Structures in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Tries & Advanced Data Structures in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Tries & Advanced Data Structures in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Tries & Advanced Data Structures in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Tries & Advanced Data Structures",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Tries & Advanced Data Structures",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "followUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "suggestedFollowUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "difficulty": "Medium",
    "levels": [
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "junior",
      "mid"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "dsa",
      "tries  advanced data structures",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for tries advanced data structures in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for tries advanced data structures in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Strings & Two Pointers",
    "subtopic": "Arrays, Strings & Two Pointers",
    "question": "Debug this Data Structures & Algorithms scenario regarding Arrays, Strings & Two Pointers: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Arrays, Strings & Two Pointers\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Data Structures & Algorithms scenario regarding Arrays, Strings & Two Pointers: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Arrays, Strings & Two Pointers\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Arrays, Strings & Two Pointers. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Arrays, Strings & Two Pointers. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "keyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "expectedKeyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "followUps": [
      "How would you write an automated regression test to catch this Arrays, Strings & Two Pointers bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Arrays, Strings & Two Pointers bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher"
    ],
    "experienceLevels": [
      "internship",
      "fresher"
    ],
    "modes": [
      "debugging",
      "mixed-technical"
    ],
    "interviewModes": [
      "debugging",
      "mixed-technical"
    ],
    "type": "debugging",
    "questionType": "debugging",
    "importance": 3,
    "tags": [
      "dsa",
      "arrays strings  two pointers",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this data structures algorithms scenario regarding arrays strings two pointers a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for arrays strings two pointers service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this data structures algorithms scenario regarding arrays strings two pointers a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for arrays strings two pointers service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "DSA",
    "topic": "Hashing & Frequency Counting",
    "subtopic": "Hashing & Frequency Counting",
    "question": "Compare alternative design strategies for Hashing & Frequency Counting in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Hashing & Frequency Counting in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Hashing & Frequency Counting in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Hashing & Frequency Counting in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Hashing & Frequency Counting",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Hashing & Frequency Counting",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "followUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "suggestedFollowUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "difficulty": "Hard",
    "levels": [
      "senior"
    ],
    "experienceLevels": [
      "senior"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "dsa",
      "hashing  frequency counting",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for hashing frequency counting in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for hashing frequency counting in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Binary Search & Sliding Window",
    "subtopic": "Binary Search & Sliding Window",
    "question": "Debug this Data Structures & Algorithms scenario regarding Binary Search & Sliding Window: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Binary Search & Sliding Window\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Data Structures & Algorithms scenario regarding Binary Search & Sliding Window: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Data Structures & Algorithms config for Binary Search & Sliding Window\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Binary Search & Sliding Window. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Binary Search & Sliding Window. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "keyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "expectedKeyPoints": [
      "Identifies root cause: unbounded resource accumulation, missing timeouts, or missing bounds",
      "Explains system impact: memory leaks, connection starvation, and latency spikes",
      "Provides concrete remediation: bounded memory pools, explicit timeouts, and circuit breakers"
    ],
    "followUps": [
      "How would you write an automated regression test to catch this Binary Search & Sliding Window bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Binary Search & Sliding Window bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "difficulty": "Medium",
    "levels": [
      "fresher",
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "fresher",
      "junior",
      "mid"
    ],
    "modes": [
      "debugging",
      "mixed-technical"
    ],
    "interviewModes": [
      "debugging",
      "mixed-technical"
    ],
    "type": "debugging",
    "questionType": "debugging",
    "importance": 4,
    "tags": [
      "dsa",
      "binary search  sliding window",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this data structures algorithms scenario regarding binary search sliding window a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for binary search sliding window service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this data structures algorithms scenario regarding binary search sliding window a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic data structures algorithms config for binary search sliding window service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Linked Lists, Stacks & Queues",
    "subtopic": "Linked Lists, Stacks & Queues",
    "question": "Compare alternative design strategies for Linked Lists, Stacks & Queues in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Linked Lists, Stacks & Queues in Data Structures & Algorithms. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Linked Lists, Stacks & Queues in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Linked Lists, Stacks & Queues in Data Structures & Algorithms, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Linked Lists, Stacks & Queues",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Linked Lists, Stacks & Queues",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "followUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "suggestedFollowUps": [
      "How would you migrate between these two architectures with zero downtime in production?",
      "What cost implications arise in cloud infrastructure for each approach?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher",
      "junior"
    ],
    "experienceLevels": [
      "internship",
      "fresher",
      "junior"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 3,
    "tags": [
      "dsa",
      "linked lists stacks  queues",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for linked lists stacks queues in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for linked lists stacks queues in data structures algorithms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "DSA",
    "topic": "Dynamic Programming & Recursion",
    "subtopic": "Dynamic Programming & Recursion",
    "question": "In production Data Structures & Algorithms architectures, explain how Dynamic Programming & Recursion is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Data Structures & Algorithms architectures, explain how Dynamic Programming & Recursion is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Data Structures & Algorithms, Dynamic Programming & Recursion enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Data Structures & Algorithms, Dynamic Programming & Recursion enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Dynamic Programming & Recursion",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Dynamic Programming & Recursion",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Dynamic Programming & Recursion metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Dynamic Programming & Recursion?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Dynamic Programming & Recursion metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Dynamic Programming & Recursion?"
    ],
    "difficulty": "Hard",
    "levels": [
      "senior"
    ],
    "experienceLevels": [
      "senior"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "dsa",
      "dynamic programming  recursion",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production data structures algorithms architectures explain how dynamic programming recursion is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production data structures algorithms architectures explain how dynamic programming recursion is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Greedy Algorithms & Backtracking",
    "subtopic": "Greedy Algorithms & Backtracking",
    "question": "Design a high-resiliency workflow in Data Structures & Algorithms for Greedy Algorithms & Backtracking. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Data Structures & Algorithms for Greedy Algorithms & Backtracking. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Greedy Algorithms & Backtracking workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Greedy Algorithms & Backtracking workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "keyPoints": [
      "Handles edge cases (null inputs, empty sets, network timeouts) gracefully",
      "Demonstrates optimal algorithmic complexity (O(N) time, minimal auxiliary allocations)",
      "Applies production patterns (circuit breakers, idempotency, bounded queues)"
    ],
    "expectedKeyPoints": [
      "Handles edge cases (null inputs, empty sets, network timeouts) gracefully",
      "Demonstrates optimal algorithmic complexity (O(N) time, minimal auxiliary allocations)",
      "Applies production patterns (circuit breakers, idempotency, bounded queues)"
    ],
    "followUps": [
      "How does this implementation scale when processing streaming inputs of infinite length?",
      "What concurrency primitives would you introduce to parallelize this across multiple cores?"
    ],
    "suggestedFollowUps": [
      "How does this implementation scale when processing streaming inputs of infinite length?",
      "What concurrency primitives would you introduce to parallelize this across multiple cores?"
    ],
    "difficulty": "Medium",
    "levels": [
      "fresher",
      "junior",
      "mid"
    ],
    "experienceLevels": [
      "fresher",
      "junior",
      "mid"
    ],
    "modes": [
      "scenario-based",
      "role-specific",
      "mixed-technical"
    ],
    "interviewModes": [
      "scenario-based",
      "role-specific",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 4,
    "tags": [
      "dsa",
      "greedy algorithms  backtracking",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in data structures algorithms for greedy algorithms backtracking how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in data structures algorithms for greedy algorithms backtracking how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "DSA",
    "topic": "Tries & Advanced Data Structures",
    "subtopic": "Tries & Advanced Data Structures",
    "question": "In production Data Structures & Algorithms architectures, explain how Tries & Advanced Data Structures is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Data Structures & Algorithms architectures, explain how Tries & Advanced Data Structures is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Data Structures & Algorithms, Tries & Advanced Data Structures enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Data Structures & Algorithms, Tries & Advanced Data Structures enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Tries & Advanced Data Structures",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Tries & Advanced Data Structures",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Tries & Advanced Data Structures metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Tries & Advanced Data Structures?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Tries & Advanced Data Structures metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Tries & Advanced Data Structures?"
    ],
    "difficulty": "Easy",
    "levels": [
      "internship",
      "fresher",
      "junior"
    ],
    "experienceLevels": [
      "internship",
      "fresher",
      "junior"
    ],
    "modes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "interviewModes": [
      "conceptual-deep-dive",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 3,
    "tags": [
      "dsa",
      "tries  advanced data structures",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production data structures algorithms architectures explain how tries advanced data structures is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production data structures algorithms architectures explain how tries advanced data structures is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "DSA",
    "topic": "Arrays, Strings & Two Pointers",
    "subtopic": "Arrays, Strings & Two Pointers",
    "question": "Design a high-resiliency workflow in Data Structures & Algorithms for Arrays, Strings & Two Pointers. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Data Structures & Algorithms for Arrays, Strings & Two Pointers. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Arrays, Strings & Two Pointers workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Arrays, Strings & Two Pointers workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "keyPoints": [
      "Handles edge cases (null inputs, empty sets, network timeouts) gracefully",
      "Demonstrates optimal algorithmic complexity (O(N) time, minimal auxiliary allocations)",
      "Applies production patterns (circuit breakers, idempotency, bounded queues)"
    ],
    "expectedKeyPoints": [
      "Handles edge cases (null inputs, empty sets, network timeouts) gracefully",
      "Demonstrates optimal algorithmic complexity (O(N) time, minimal auxiliary allocations)",
      "Applies production patterns (circuit breakers, idempotency, bounded queues)"
    ],
    "followUps": [
      "How does this implementation scale when processing streaming inputs of infinite length?",
      "What concurrency primitives would you introduce to parallelize this across multiple cores?"
    ],
    "suggestedFollowUps": [
      "How does this implementation scale when processing streaming inputs of infinite length?",
      "What concurrency primitives would you introduce to parallelize this across multiple cores?"
    ],
    "difficulty": "Hard",
    "levels": [
      "mid",
      "senior"
    ],
    "experienceLevels": [
      "mid",
      "senior"
    ],
    "modes": [
      "scenario-based",
      "role-specific",
      "mixed-technical"
    ],
    "interviewModes": [
      "scenario-based",
      "role-specific",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 5,
    "tags": [
      "dsa",
      "arrays strings  two pointers",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in data structures algorithms for arrays strings two pointers how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in data structures algorithms for arrays strings two pointers how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  }
];

export default DSA_QUESTIONS;
