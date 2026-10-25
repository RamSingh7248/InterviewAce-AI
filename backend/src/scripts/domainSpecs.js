import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_CATEGORIES, normalizeCategory } from '../config/interviewCatalog.js';
import { normalizeQuestionText } from '../utils/textNormalize.js';
import { SEED_QUESTIONS } from '../data/seedQuestions.js';
import { CATEGORY_TO_SLUG, QUESTIONS_DIR } from './questionBankHelper.js';
import { makeQuestion } from './questionGenerators/questionFactory.js';
import { LANGUAGE_QUESTIONS } from './questionGenerators/languages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Real-world high-value question matrices covering production technologies, failure modes, internals, and coding
const DOMAIN_QUESTION_SPECS = {
  // Programming Languages
  'Java': [
    {
      topic: 'Core Java & JVM Internals',
      question: "What is the difference between '==' and the '.equals()' method in Java? When should you override equals() and hashCode()?",
      idealAnswer: "In Java, '==' compares reference identity for objects (whether two references point to the exact same memory address), whereas '.equals()' is intended for logical value equivalence. By default, Object.equals() behaves like '=='. When implementing custom objects stored in hash-based collections (HashMap, HashSet), both equals() and hashCode() must be overridden together to maintain the general contract: equal objects must produce the identical integer hash code.",
      keyPoints: ["'==' checks memory address identity, whereas equals() checks logical equivalence", "The contract requires equal objects to return identical hashCodes", "Failing to override hashCode causes HashMap/HashSet to lose keys or create duplicate entries"],
      followUps: ["What happens if two unequal objects produce the same hashCode?", "Why is it recommended to use immutable fields when computing hashCode?"],
      difficulty: 'Easy', levels: ['internship', 'fresher', 'junior'], modes: ['mixed-technical', 'conceptual-deep-dive'], type: 'conceptual', importance: 5
    },
    {
      topic: 'Core Java & JVM Internals',
      question: "Explain the JVM memory structure: Heap, Metaspace, JVM Stack, Native Method Stack, and PC Register. What causes an OutOfMemoryError: Metaspace?",
      idealAnswer: "The JVM memory consists of: 1) Heap (shared across all threads, stores object instances and arrays); 2) Metaspace (native memory storing class metadata, replaced PermGen in Java 8); 3) JVM Stacks (per-thread, stores stack frames with local variables and partial results); 4) PC Registers (tracks current bytecode instruction per thread); and 5) Native Method Stack. OutOfMemoryError: Metaspace occurs when dynamic class generation (via CGLIB, ByteBuddy, proxies in Spring/Hibernate) or classloader leaks continuously load new Class definitions until native memory or MaxMetaspaceSize is exceeded.",
      keyPoints: ["Metaspace resides in off-heap native memory rather than contiguous JVM heap", "OOM Metaspace occurs due to excessive class generation or classloader leaks in app servers", "JVM stack is per-thread, throwing StackOverflowError on deep recursion"],
      followUps: ["How do you analyze a classloader memory leak using jcmd and Eclipse MAT?", "What is the difference between -Xms, -Xmx, and -XX:MaxMetaspaceSize?"],
      difficulty: 'Hard', levels: ['mid', 'senior'], modes: ['mixed-technical', 'conceptual-deep-dive'], type: 'conceptual', importance: 5
    },
    {
      topic: 'Collections Framework & Generics',
      question: "How does HashMap work internally in Java 8+? Explain bucket arrays, hash calculation, collision resolution, and treeification.",
      idealAnswer: "Java 8 HashMap uses an array of Node (table) with index calculated via `(n - 1) & hash(key)`. Hash calculation applies a bitwise XOR shift (`h ^ (h >>> 16)`) to spread higher bits into lower bits, minimizing collisions. When two keys map to the same bucket index, they form a singly linked list. When a single bucket list length reaches 8 (TREEIFY_THRESHOLD) and total table capacity is at least 64, the linked list transforms into a Red-Black Tree (TreeNode), reducing worst-case lookup from O(N) to O(log N). When tree size drops to 6 during resizing, it untreeifies back to a linked list.",
      keyPoints: ["Bit-shift perturbation spreading high bits into lower bits", "Bucket index calculation via bitwise AND with power-of-two capacity", "Treeification to Red-Black tree when bucket length >= 8 and table capacity >= 64", "Untreeification threshold of 6 to prevent oscillation"],
      followUps: ["Why must HashMap table capacity always be a power of two?", "What happens to HashMap during concurrent put operations in a multi-threaded environment?"],
      difficulty: 'Medium', levels: ['fresher', 'junior', 'mid'], modes: ['mixed-technical', 'conceptual-deep-dive'], type: 'conceptual', importance: 5
    },
    {
      topic: 'Multithreading, Concurrency & JMM',
      question: "What is the Java Memory Model (JMM) happens-before relationship, and what does the 'volatile' keyword guarantee and not guarantee?",
      idealAnswer: "The JMM defines how threads interact through memory and when updates by one thread become visible to another. A 'happens-before' relationship guarantees that memory writes by one action are visible to a subsequent read. The `volatile` keyword guarantees two things: 1) Visibility (reads and writes go directly to main memory, bypassing CPU caches); and 2) Ordering (prevents compiler and CPU instruction reordering across volatile boundaries using memory barriers). Volatile does NOT guarantee atomicity: compound operations like `count++` (read-modify-write) are not atomic and require AtomicInteger or synchronized locks.",
      keyPoints: ["Volatile guarantees visibility and prevents instruction reordering", "Volatile does NOT guarantee atomicity for compound operations (e.g. i++)", "Happens-before order guarantees memory consistency across threads", "Memory barriers (load/store fences) are emitted by the JIT compiler"],
      followUps: ["Explain how double-checked locking singleton works and why volatile is mandatory", "What is false sharing and how does @Contended resolve it?"],
      difficulty: 'Hard', levels: ['mid', 'senior'], modes: ['mixed-technical', 'conceptual-deep-dive'], type: 'conceptual', importance: 5
    },
    {
      topic: 'Multithreading, Concurrency & JMM',
      question: "Implement a thread-safe, bounded, generic In-Memory LRU Cache in Java without using LinkedHashMap.",
      idealAnswer: "An optimal LRU Cache uses a combination of a HashMap (for O(1) key-to-node lookup) and a custom Doubly Linked List (for O(1) node relocation to head on access, and O(1) eviction from tail when capacity is exceeded). Thread-safety is achieved using a ReentrantReadWriteLock or ReentrantLock around put, get, and remove operations.",
      keyPoints: ["HashMap maps keys to doubly linked list Node references for O(1) lookups", "Doubly linked list maintains access recency with head (most recent) and tail (least recent)", "Eviction removes the tail node from both linked list and map in O(1) time", "ReentrantLock synchronizes concurrent accesses safely"],
      followUps: ["How would you design lock-free reads using ConcurrentHashMap and a concurrent queue?", "How does Caffeine cache achieve higher throughput than standard synchronized LRU?"],
      difficulty: 'Hard', levels: ['mid', 'senior'], modes: ['live-coding', 'mixed-technical'], type: 'coding', importance: 5,
      codingDetails: {
        constraints: ["get(key) and put(key, value) must run in O(1) average time complexity", "Thread-safe concurrent access"],
        examples: [{ input: "cache.put(1, 10); cache.put(2, 20); cache.get(1); cache.put(3, 30) on cap=2", output: "key 2 is evicted", explanation: "Key 1 was accessed, making key 2 the least recently used" }]
      }
    },
    {
      topic: 'Exception Handling & Best Practices',
      question: "Debug this Java snippet: Why does this resource leak occur despite using a finally block, and how does try-with-resources resolve it?\n\n```java\nFileInputStream fis = null;\ntry {\n    fis = new FileInputStream(\"data.txt\");\n    // read data\n} finally {\n    fis.close(); // What if an exception is thrown before or during close?\n}\n```",
      idealAnswer: "Two major bugs exist: 1) If `new FileInputStream` fails and throws an exception, `fis` remains `null`, causing `fis.close()` in the `finally` block to throw a NullPointerException, masking the original root cause; 2) If an exception is thrown in both the `try` block and the `finally` block, the `finally` exception completely suppresses and swallows the primary exception. In Java 7+, try-with-resources (`try (FileInputStream fis = new FileInputStream(\"data.txt\")) { ... }`) automatically handles null checking and closes resources in reverse declaration order, while preserving the primary exception and attaching secondary close exceptions to `getSuppressed()`.",
      keyPoints: ["Raw finally requires explicit null check before calling close()", "Exceptions in finally block mask and overwrite original exceptions in try block", "try-with-resources implements AutoCloseable and preserves suppressed exceptions", "Cleaner, leak-proof resource management for files, sockets, and JDBC connections"],
      followUps: ["How can you inspect suppressed exceptions in Java?", "What order are multiple resources closed when declared in a single try-with-resources statement?"],
      difficulty: 'Medium', levels: ['fresher', 'junior', 'mid'], modes: ['debugging', 'mixed-technical'], type: 'debugging', importance: 4
    },
    {
      topic: 'SOLID Principles & Design Patterns',
      question: "Explain the Dependency Inversion Principle (DIP) and how Spring Framework utilizes Inversion of Control (IoC) and Dependency Injection (DI) to implement it.",
      idealAnswer: "The Dependency Inversion Principle states that: 1) High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces); and 2) Abstractions should not depend on details; details should depend on abstractions. Inversion of Control (IoC) reverses the control flow: instead of an object instantiating its dependencies directly using `new Service()`, an external container manages object lifecycles. Dependency Injection (DI) is the pattern where the Spring IoC container injects required dependencies (via constructor injection, setter injection, or field injection) at runtime, decoupling business logic from concrete implementations.",
      keyPoints: ["DIP mandates decoupling high-level policy from low-level implementation details via interfaces", "IoC shifts lifecycle and dependency instantiation responsibility to the container", "Constructor injection is preferred over field injection for immutability and unit testing", "Enables seamless mocking and unit testing without spin-up of concrete services"],
      followUps: ["Why is field injection with @Autowired considered an anti-pattern in modern Spring?", "What are the Spring bean scopes (Singleton, Prototype, Request, Session)?"],
      difficulty: 'Medium', levels: ['junior', 'mid', 'senior'], modes: ['mixed-technical', 'conceptual-deep-dive'], type: 'conceptual', importance: 5
    }
  ],

  // Data Structures & Algorithms
  'DSA': [
    {
      topic: 'Arrays, Strings & Two Pointers',
      question: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target. Implement the optimal O(N) solution in your language of choice.",
      idealAnswer: "Use a hash map to store each number's value mapped to its index. As you iterate through the array with index `i` and value `num`: 1) Calculate complement `target - num`; 2) Check if complement exists in the hash map. If it does, return `[map[complement], i]`; 3) Otherwise, insert `map[num] = i`. This solves the problem in a single pass with O(N) time complexity and O(N) auxiliary space.",
      keyPoints: ["Single pass hash map lookup achieves O(N) time complexity", "Space-time trade-off storing elements in hash map", "Handles positive, negative, and zero values correctly"],
      followUps: ["If the input array is already sorted, how can you solve it in O(1) extra space?", "What happens if there are duplicate values or multiple valid pairs?"],
      difficulty: 'Easy', levels: ['internship', 'fresher', 'junior'], modes: ['live-coding', 'mixed-technical'], type: 'coding', importance: 5,
      codingDetails: {
        constraints: ["2 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9", "Exactly one valid answer exists"],
        examples: [
          { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "nums[0] + nums[1] == 9" },
          { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]", explanation: "nums[1] + nums[2] == 6" }
        ]
      }
    },
    {
      topic: 'Binary Search & Sliding Window',
      question: "Given a string `s`, find the length of the longest substring without repeating characters. Solve in O(N) time.",
      idealAnswer: "Use the sliding window technique with two pointers (`left` and `right`) and a hash map storing the most recent index of each character. As `right` iterates from 0 to `s.length - 1`: if `s[right]` is already in the map and its recorded index is >= `left`, advance `left = map[s[right]] + 1`. Then update `map[s[right]] = right` and calculate `maxLen = Math.max(maxLen, right - left + 1)`. This runs in O(N) time since each character is visited at most twice.",
      keyPoints: ["Sliding window with variable size bounded by left and right pointers", "Hash map records character last-seen index for instant window shrinking", "O(N) time complexity with O(min(N, alphabet_size)) auxiliary space"],
      followUps: ["How would you adapt this if at most k distinct characters are permitted?", "What is the optimal space complexity if character set is restricted to ASCII?"],
      difficulty: 'Medium', levels: ['fresher', 'junior', 'mid'], modes: ['live-coding', 'mixed-technical'], type: 'coding', importance: 5,
      codingDetails: {
        constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces"],
        examples: [
          { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with length 3' },
          { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with length 1' }
        ]
      }
    },
    {
      topic: 'Trees, BST & Tree Traversals',
      question: "Given the root of a binary tree, determine if it is a valid binary search tree (BST). Explain the common pitfall with checking only immediate child nodes.",
      idealAnswer: "A common pitfall is checking only that `node.left.val < node.val` and `node.right.val > node.val`. This fails because a node in the right subtree might have a value smaller than a root ancestor. The correct approach enforces a valid range `(minVal, maxVal)` for each subtree: recursively verify that `minVal < node.val < maxVal`. When traversing left, update `maxVal = node.val`; when traversing right, update `minVal = node.val`. An alternative optimal approach performs an in-order traversal, verifying that values are strictly monotonically increasing.",
      keyPoints: ["Local child validation is insufficient; all descendants must satisfy global ancestor boundaries", "Recursive range validation passes (min, max) bounds through subtrees", "In-order traversal of a valid BST produces strictly increasing sorted order", "O(N) time complexity, O(H) call stack space where H is tree height"],
      followUps: ["How do you find the Lowest Common Ancestor (LCA) in a BST in O(H) time?", "How does Morris In-Order Traversal achieve O(1) auxiliary space without recursion?"],
      difficulty: 'Medium', levels: ['fresher', 'junior', 'mid', 'senior'], modes: ['live-coding', 'mixed-technical'], type: 'coding', importance: 5,
      codingDetails: {
        constraints: ["The number of nodes in the tree is in the range [1, 10^4]", "-2^31 <= Node.val <= 2^31 - 1"],
        examples: [
          { input: "root = [2, 1, 3]", output: "true", explanation: "Left child 1 < 2, right child 3 > 2" },
          { input: "root = [5, 1, 4, null, null, 3, 6]", output: "false", explanation: "Root node's value is 5, but right child node has value 4" }
        ]
      }
    },
    {
      topic: 'Dynamic Programming & Recursion',
      question: "You are given an integer array `coins` representing coin denominations and an integer `amount`. Return the fewest number of coins needed to make up that amount. If impossible, return -1. Write the bottom-up DP solution and state its complexity.",
      idealAnswer: "Define `dp[i]` as the minimum coins needed to make amount `i`. Initialize an array of size `amount + 1` with a sentinel infinity value (`amount + 1`), with base case `dp[0] = 0`. For `i` from 1 to `amount`: for each coin in `coins`: if `coin <= i`, `dp[i] = Math.min(dp[i], dp[i - coin] + 1)`. If `dp[amount] > amount`, return -1; otherwise return `dp[amount]`. Time complexity is O(amount * len(coins)) and space complexity is O(amount).",
      keyPoints: ["Optimal substructure: dp[i] = min(dp[i - coin] + 1)", "Bottom-up tabulation prevents stack overflow from deep recursion", "O(amount * number_of_coins) time, O(amount) space", "Sentinel value handles unreachable amounts cleanly"],
      followUps: ["How would you modify this to find the total number of unique combinations to make the amount (Unbounded Knapsack)?", "Can Greedy approach work if coin denominations are arbitrary?"],
      difficulty: 'Medium', levels: ['junior', 'mid', 'senior'], modes: ['live-coding', 'mixed-technical'], type: 'coding', importance: 5,
      codingDetails: {
        constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
        examples: [
          { input: "coins = [1, 2, 5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1" },
          { input: "coins = [2], amount = 3", output: "-1", explanation: "Amount cannot be formed" }
        ]
      }
    },
    {
      topic: 'Graphs, BFS, DFS & Shortest Path',
      question: "Explain Dijkstra's Algorithm for Single-Source Shortest Path. What data structure is used to achieve O((V + E) log V) complexity, and why does Dijkstra fail on graphs with negative edge weights?",
      idealAnswer: "Dijkstra's algorithm finds the shortest path from a starting node to all other nodes in a weighted graph with non-negative edge weights. It maintains a Min-Heap (priority queue) of pairs `(distance, node)` and a `dist[]` array initialized to infinity. It iteratively extracts the unvisited node with minimum tentative distance, relaxes its outgoing edges, and pushes updated distances into the priority queue. Using a binary min-heap, extraction takes O(V log V) and edge relaxations take O(E log V), yielding O((V + E) log V). Dijkstra fails on negative edges because it greedily assumes once a node is marked visited, its minimum distance is permanently finalized; a negative edge discovered later could retroactively decrease an already-finalized distance. Bellman-Ford or SPFA must be used for graphs with negative weights.",
      keyPoints: ["Min-Heap / Priority Queue optimizes vertex selection to O(log V)", "Greedy invariant assumes visited node distances are permanently optimal", "Fails on negative edge weights because greedy assumption breaks", "Bellman-Ford handles negative weights and detects negative cycles in O(V * E)"],
      followUps: ["How does the A* algorithm extend Dijkstra using heuristics?", "What is the difference between Dijkstra and Prim's Minimum Spanning Tree algorithm?"],
      difficulty: 'Hard', levels: ['mid', 'senior'], modes: ['mixed-technical', 'conceptual-deep-dive'], type: 'conceptual', importance: 5
    }
  ],

  // SQL & DBMS
  'SQL/DBMS': [
    {
      topic: 'Indexes, B-Trees & Query Optimization',
      question: "How do B-Tree and B+Tree indexes work internally in relational databases (PostgreSQL/MySQL)? Why do database engines prefer B+Trees over standard Binary Search Trees or B-Trees for disk storage?",
      idealAnswer: "B+Trees are self-balancing search trees optimized for block storage. Unlike Binary Search Trees (which have a low branching factor of 2, resulting in deep trees and frequent disk I/O seeks), B+Trees have a high fan-out (hundreds of keys per node), keeping tree height low (typically 3-4 levels for millions of rows). B+Trees differ from standard B-Trees in two critical ways: 1) Internal nodes store only search keys and child pointers without data records, maximizing fan-out in memory pages; 2) Leaf nodes contain all actual data pointers and are connected via a bidirectional linked list, enabling highly efficient O(log N + K) range scans without traversing parent nodes.",
      keyPoints: ["High branching factor / fan-out minimizes disk I/O seek operations", "Internal nodes store keys only, maximizing page density", "Leaf nodes contain all data records and are linked sequentially for rapid range queries", "Binary search trees are too deep and cache-unfriendly for block storage engines"],
      followUps: ["What is a clustered index vs a secondary (non-clustered) index in InnoDB?", "What is index covering and how does it prevent table bookmark lookups?"],
      difficulty: 'Medium', levels: ['junior', 'mid', 'senior'], modes: ['mixed-technical', 'conceptual-deep-dive'], type: 'conceptual', importance: 5
    },
    {
      topic: 'Transactions, ACID Properties & Concurrency',
      question: "Compare the four ANSI SQL Transaction Isolation Levels: Read Uncommitted, Read Committed, Repeatable Read, and Serializable. What concurrency anomalies (Dirty Read, Non-repeatable Read, Phantom Read) does each prevent?",
      idealAnswer: "1) Read Uncommitted allows transactions to see uncommitted changes from concurrent transactions, allowing Dirty Reads, Non-repeatable Reads, and Phantom Reads. 2) Read Committed ensures queries see only committed data, preventing Dirty Reads; however, re-reading the same row within the transaction can yield different values if another transaction commits an update (Non-repeatable Read). 3) Repeatable Read ensures any row read remains identical throughout the transaction (implemented via MVCC snapshots in Postgres/MySQL), preventing Dirty Reads and Non-repeatable Reads; in strict locking, phantom inserts could occur. 4) Serializable completely isolates transactions as if executed sequentially, preventing all anomalies including Phantom Reads and Write Skew via two-phase locking or Serializable Snapshot Isolation (SSI).",
      keyPoints: ["Dirty Read: reading uncommitted volatile data", "Non-repeatable Read: reading different values for the same row within one transaction", "Phantom Read: new rows appearing in a range query when re-executed", "MVCC (Multi-Version Concurrency Control) provides snapshot isolation without read locks"],
      followUps: ["How does PostgreSQL MVCC handle row updates without in-place mutation?", "What is Write Skew anomaly and why does Repeatable Read not prevent it?"],
      difficulty: 'Hard', levels: ['mid', 'senior'], modes: ['mixed-technical', 'conceptual-deep-dive'], type: 'conceptual', importance: 5
    },
    {
      topic: 'Window Functions, Ranking & CTEs',
      question: "Write an SQL query using Common Table Expressions (CTEs) and Window Functions to find the 2nd highest salary in each department. If a department has ties, handle them gracefully.",
      idealAnswer: "```sql\nWITH RankedSalaries AS (\n    SELECT \n        employee_id,\n        department_id,\n        salary,\n        DENSE_RANK() OVER (\n            PARTITION BY department_id \n            ORDER BY salary DESC\n        ) as salary_rank\n    FROM employees\n)\nSELECT department_id, employee_id, salary\nFROM RankedSalaries\nWHERE salary_rank = 2;\n```\n`DENSE_RANK()` is used instead of `ROW_NUMBER()` or `RANK()` so that if multiple employees tie for the highest salary, the next distinct salary value receives rank 2 rather than rank 3 or being arbitrarily skipped.",
      keyPoints: ["DENSE_RANK() assigns consecutive ranks without skipping numbers on ties", "PARTITION BY department_id calculates independent ranking partitions per department", "CTE modularizes query for readable filtering in WHERE salary_rank = 2", "ROW_NUMBER() would arbitrarily break ties, while RANK() would skip rank 2 on top ties"],
      followUps: ["What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?", "How can you query the N-th highest salary dynamically across the entire organization?"],
      difficulty: 'Medium', levels: ['fresher', 'junior', 'mid'], modes: ['sql-database', 'live-coding'], type: 'sql', importance: 5
    }
  ],

  // System Design
  'System Design': [
    {
      topic: 'Scalability (Vertical vs Horizontal) & Availability',
      question: "Design a URL Shortening Service like Bitly or TinyURL (handling 500 million new URLs/month and 10 billion reads/month). Outline capacity estimation, database schema, short link generation algorithm, and caching.",
      idealAnswer: "1) Scale estimation: ~200 writes/sec, ~4000 reads/sec (read-heavy 20:1 ratio). Storage: 500M * 500 bytes = 250GB/month (15TB over 5 years). 2) Base62 encoding (a-z, A-Z, 0-9): 7 characters yield 62^7 = 3.5 trillion unique URLs, sufficient for decades. 3) ID generation: Use a distributed counter (Twitter Snowflake or pre-allocated range coordination via Zookeeper) to generate 64-bit unique IDs, then Base62 encode. Avoid MD5/SHA256 hashing with truncation due to collision resolution overhead. 4) Database: Distributed Key-Value or NoSQL store (DynamoDB or Cassandra) partitioned on short_key with secondary index on user_id. 5) Caching: Redis cluster storing top 20% most accessed URLs with LRU eviction policy, serving 80%+ of reads from memory.",
      keyPoints: ["Base62 encoding of 64-bit distributed auto-increment IDs avoids hash collision queries", "Read-heavy architecture benefits from Redis cluster with LRU caching", "Distributed ID generation via Snowflake prevents single points of failure", "NoSQL / Key-Value store partitioned by short_url key for horizontal scale"],
      followUps: ["How do you handle custom alias URLs requested by users?", "How do you implement URL expiration and asynchronous database purging?"],
      difficulty: 'Hard', levels: ['mid', 'senior'], modes: ['system-design', 'scenario-based'], type: 'system_design', importance: 5
    },
    {
      topic: 'Distributed Systems & Consistency (CAP Theorem)',
      question: "Explain the CAP Theorem and PACELC theorem. In an event-driven distributed system, how does eventual consistency work, and what patterns guarantee idempotency?",
      idealAnswer: "CAP theorem states that a distributed data store can guarantee at most two of: Consistency (every read receives latest write), Availability (every non-failing node returns non-error response), and Partition Tolerance (system continues functioning despite network splits). Since network partitions (P) are unavoidable in distributed physical networks, systems must trade off CP (e.g. HBase, Raft) or AP (e.g. Cassandra, DynamoDB). PACELC extends CAP: if there is a Partition (P), trade off Availability (A) and Consistency (C); Else (E), trade off Latency (L) and Consistency (C). In event-driven systems with eventual consistency, idempotency is guaranteed using: 1) Unique idempotent transaction IDs; 2) Deduplication database tables / unique constraints; and 3) The Outbox Pattern with Change Data Capture (CDC) to eliminate dual-write inconsistencies.",
      keyPoints: ["In real distributed systems, network partitions (P) must be tolerated", "CP favors strict consistency at the cost of rejecting reads/writes during partitions", "AP favors continuous availability returning potentially stale data", "PACELC accounts for latency vs consistency trade-offs during normal operation", "Idempotency keys and transactional outbox pattern ensure safe duplicate message handling"],
      followUps: ["Explain the Two Generals' Problem and Byzantine Fault Tolerance", "What is the difference between strong consistency, causal consistency, and eventual consistency?"],
      difficulty: 'Hard', levels: ['mid', 'senior'], modes: ['system-design', 'conceptual-deep-dive'], type: 'system_design', importance: 5
    }
  ]
};

export { DOMAIN_QUESTION_SPECS };
