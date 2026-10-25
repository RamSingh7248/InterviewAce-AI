/**
 * Curated Question Bank - SQL / DBMS
 * Structured progression from filtering and joins to window functions, indexing, ACID, and lock diagnostics.
 */

export const SQL_QUESTIONS = [
  {
    questionId: "sql_where_having_001",
    questionText: "What is the difference between the WHERE clause and the HAVING clause in SQL? Explain the logical execution order of a SQL SELECT statement.",
    category: "SQL/DBMS",
    topic: "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    subtopic: "Filtering & SQL Logical Execution Order",
    difficulty: "Easy",
    questionType: "conceptual",
    sequenceOrder: 1,
    learningStage: "Fundamentals",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "Data Engineer", "Database Administrator"],
    interviewMode: "sql",
    tags: ["sql", "where", "having", "group-by", "execution-order"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "WHERE filters individual rows BEFORE aggregation/GROUP BY takes place",
      "HAVING filters aggregated groups AFTER GROUP BY execution and supports aggregate functions (SUM, COUNT, AVG)",
      "WHERE cannot contain aggregate functions directly",
      "Logical execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT/OFFSET"
    ],
    referenceAnswer: "The fundamental distinction between WHERE and HAVING lies in when filtering occurs relative to data aggregation. The WHERE clause filters raw individual rows before groupings and aggregate calculations occur; consequently, WHERE cannot evaluate aggregate functions like SUM() or COUNT(). Conversely, the HAVING clause filters grouped records after GROUP BY has aggregated rows, allowing conditions on aggregate computations. In SQL's logical execution order, the database engine processes clauses in this sequence: (1) FROM and JOINs to assemble tables, (2) WHERE to filter candidate rows, (3) GROUP BY to partition rows into groups, (4) HAVING to filter aggregated groups, (5) SELECT to project columns and evaluate window functions, (6) DISTINCT, (7) ORDER BY to sort the output, and (8) LIMIT/OFFSET for pagination.",
    stepByStepExplanation: "1. FROM/JOIN: Database loads base tables and matches join predicates.\n2. WHERE: Evaluates boolean conditions on each row; non-matching rows are discarded before grouping.\n3. GROUP BY: Partitions remaining rows by specified grouping keys.\n4. HAVING: Filters the aggregated buckets using aggregate conditions (e.g., HAVING COUNT(*) > 5).\n5. SELECT: Evaluates expressions, aliases, and aggregates.\n6. ORDER BY: Sorts the final result set.",
    practicalExample: "-- Example: Find departments having more than 5 active employees with total budget > $500,000\nSELECT department_id, COUNT(*) AS employee_count, SUM(salary) AS total_payroll\nFROM employees\nWHERE status = 'ACTIVE'                -- WHERE filters individual employee rows first\nGROUP BY department_id\nHAVING COUNT(*) > 5 AND SUM(salary) > 500000; -- HAVING filters the aggregated department totals",
    commonMistakes: [
      "Attempting to put aggregate functions inside WHERE (e.g., WHERE COUNT(*) > 1 throws a syntax error)",
      "Using HAVING for row-level filtering that could have been executed earlier in WHERE (which degrades index usage and increases aggregation memory)",
      "Thinking SQL executes in the written syntactic order (SELECT first); SELECT is evaluated near the end"
    ],
    suggestedFollowUps: ["Why can aliases defined in SELECT be used in ORDER BY but cannot be used in WHERE or GROUP BY in standard SQL?"],
    hints: ["Consider whether the condition applies to individual rows or to summarized groups of rows."]
  },
  {
    questionId: "sql_joins_002",
    questionText: "Explain the behavioral differences between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN. How do these joins handle non-matching rows and NULL values?",
    category: "SQL/DBMS",
    topic: "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    subtopic: "Relational Joins & NULL Semantics",
    difficulty: "Easy",
    questionType: "conceptual",
    sequenceOrder: 2,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "Data Analyst", "Data Engineer"],
    interviewMode: "sql",
    tags: ["sql", "joins", "inner-join", "left-join", "outer-join", "nulls"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "INNER JOIN returns only rows where the join condition matches in both tables",
      "LEFT (OUTER) JOIN returns all rows from the left table, with matching rows from the right table or NULLs if no match exists",
      "RIGHT (OUTER) JOIN returns all rows from the right table, with matching rows from the left table or NULLs",
      "FULL OUTER JOIN returns all rows from both tables, filling with NULL on either side where a match is absent",
      "Join filters on NULL: NULL = NULL evaluates to UNKNOWN (three-valued logic), so NULL values never match each other in standard join predicates"
    ],
    referenceAnswer: "Relational joins combine columns from multiple tables based on related predicates. An INNER JOIN produces only records with matching keys in both participating tables, discarding unmatched rows from both sides. A LEFT JOIN preserves all rows from the left table; when a corresponding record exists in the right table, right-side columns are populated; otherwise, right-side columns evaluate to NULL. A RIGHT JOIN symmetrically preserves all rows from the right table. A FULL OUTER JOIN preserves all rows from both tables, producing matches where available and populating NULLs for unmatched rows on either side. In SQL's three-valued logic, comparison with NULL evaluates to UNKNOWN, meaning two NULL keys will not match in an equijoin unless explicitly handled using IS NOT DISTINCT FROM or COALESCE.",
    stepByStepExplanation: "1. INNER JOIN: Intersection (A ∩ B). Only matched rows returned.\n2. LEFT JOIN: Entire table A plus matched columns from B; unmatched B fields set to NULL.\n3. RIGHT JOIN: Entire table B plus matched columns from A; unmatched A fields set to NULL.\n4. FULL OUTER JOIN: Union of all records from A and B with NULLs for unmatched sides.\n5. Filtering unmatched records: Adding 'WHERE b.id IS NULL' to a LEFT JOIN creates an anti-join (rows in A that do not exist in B).",
    practicalExample: "-- Find customers who have never placed an order (Anti-Join Pattern)\nSELECT c.customer_id, c.name\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL; -- Filters to only customers with zero matching orders",
    commonMistakes: [
      "Placing right-table filter predicates in the WHERE clause of a LEFT JOIN, which inadvertently converts it into an INNER JOIN (e.g. WHERE o.status = 'PENDING' discards NULLs)",
      "Expecting 'col = NULL' to evaluate to true; in SQL you must use 'col IS NULL'",
      "Confusing joins with UNION; JOINs horizontally combine columns, while UNION vertically combines result sets"
    ],
    suggestedFollowUps: ["What is the difference between filtering in the ON clause vs filtering in the WHERE clause during a LEFT JOIN?"],
    hints: ["Think about what happens to columns from the non-matching side when no pair exists."]
  },
  {
    questionId: "sql_subquery_cte_003",
    questionText: "Compare a Correlated Subquery, a Non-Correlated Subquery, and a Common Table Expression (CTE). When would you choose a CTE or Window Function over a subquery for performance and readability?",
    category: "SQL/DBMS",
    topic: "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    subtopic: "Subqueries, CTEs & Query Optimization",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 3,
    learningStage: "Common Interview Questions",
    interviewRelevanceLabel: "Common interview topic",
    targetRoles: ["Software Engineer", "Backend Developer", "Data Engineer", "Senior SQL Developer"],
    interviewMode: "sql",
    tags: ["sql", "cte", "subqueries", "query-optimization", "window-functions"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Non-correlated subquery is independent of outer query; can execute once and its result cached/reused",
      "Correlated subquery references columns from the outer query; conceptually executes once per row of the outer query (unless optimizer transforms it into a join)",
      "CTE (WITH clause) defines a named temporary result set, improving readability, supporting recursion, and enabling modular multi-step transformations",
      "Modern query optimizers can inline CTEs; non-materialized CTEs optimize identically to subqueries, while recursive CTEs handle hierarchical tree traversal"
    ],
    referenceAnswer: "A non-correlated subquery is independent of outer query columns; it executes once, and its result is reused (e.g. comparing against a static scalar or set). A correlated subquery depends directly on values from the outer query row, conceptually evaluating once for each row processed by the outer query, which can lead to O(N * M) performance penalties if the database cannot optimize it into an internal hash or merge join. A Common Table Expression (CTE, using the WITH clause) provides a clean, modular way to define named intermediate result sets within a single query. CTEs dramatically enhance readability for complex multi-stage pipelines and are essential for recursive operations (such as traversing organizational hierarchies or graphs). Window functions are often preferred over correlated subqueries because they calculate running totals, rankings, and moving averages in a single sequential scan over sorted partitions without requiring self-joins.",
    stepByStepExplanation: "1. Non-correlated: 'WHERE salary > (SELECT AVG(salary) FROM employees)' evaluates inner query once.\n2. Correlated: 'WHERE salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.dept_id = e1.dept_id)' re-evaluates for each department.\n3. CTE: 'WITH DeptAvg AS (...) SELECT ...' isolates business logic into named readable stages.\n4. Window Function: 'AVG(salary) OVER (PARTITION BY dept_id)' computes department average inline in O(N log N) time without secondary subquery scans.",
    practicalExample: "-- Window Function replacement for correlated subquery\n-- Inefficient Correlated Subquery:\n-- SELECT name, salary FROM employees e1 WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id);\n\n-- Efficient Window Function Query:\nWITH EmployeeSalaries AS (\n    SELECT name, department_id, salary,\n           AVG(salary) OVER(PARTITION BY department_id) as dept_avg_salary\n    FROM employees\n)\nSELECT name, department_id, salary\nFROM EmployeeSalaries\nWHERE salary > dept_avg_salary;",
    commonMistakes: [
      "Assuming CTEs are always physically materialized in temporary tables; in modern PostgreSQL and SQL Server, non-recursive CTEs can be inlined",
      "Using correlated subqueries inside the SELECT list for large tables, creating severe CPU bottlenecks",
      "Not knowing that recursive CTEs require a base query and a recursive union member with a termination condition"
    ],
    suggestedFollowUps: ["How does a Recursive CTE execute when traversing a parent-child adjacency list?"]
  },
  {
    questionId: "sql_second_highest_004",
    questionText: "Write a SQL query to find the second highest salary from an Employee table. Explain how you handle edge cases such as duplicate salaries and tables containing fewer than two records.",
    category: "SQL/DBMS",
    topic: "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    subtopic: "Window Functions & Ranking Queries",
    difficulty: "Medium",
    questionType: "sql",
    sequenceOrder: 4,
    learningStage: "Implementation & Coding",
    interviewRelevanceLabel: "Coding exercise",
    targetRoles: ["Software Engineer", "Backend Developer", "Data Analyst"],
    interviewMode: "sql",
    tags: ["sql", "dense-rank", "subquery", "window-functions", "ranking"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Must account for duplicate top salaries (e.g., if two people earn the maximum $100k, the second highest must be the next distinct value like $90k)",
      "Using DENSE_RANK() OVER (ORDER BY salary DESC) assigns identical ranks to ties without skipping numbers",
      "Alternative using subquery: MAX(salary) WHERE salary < (SELECT MAX(salary) FROM Employee) naturally returns NULL if no second salary exists",
      "LIMIT 1 OFFSET 1 with DISTINCT: fails to return NULL if table has fewer than 2 distinct records unless wrapped in an outer SELECT"
    ],
    referenceAnswer: "To find the second highest salary while handling ties and empty/single-row tables, we use either a window function with DENSE_RANK() or an aggregate subquery. Using DENSE_RANK() ensures that if multiple employees share the top salary, they all receive rank 1, and the next distinct salary receives rank 2 (unlike RANK(), which would skip rank 2). A robust solution that returns NULL when no second highest salary exists is: 'SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);'. Another industry-standard approach uses a CTE with DENSE_RANK(): 'WITH Ranked AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM Employee) SELECT (SELECT DISTINCT salary FROM Ranked WHERE rnk = 2) AS SecondHighestSalary;'.",
    stepByStepExplanation: "1. Identify requirement: Second distinct highest salary.\n2. Handle duplicate salaries: DENSE_RANK() ranks [100, 100, 90] as [1, 1, 2].\n3. Handle edge case of 0 or 1 row: An outer query 'SELECT (subquery)' evaluates to NULL if the subquery returns empty.\n4. Solution: Use MAX(salary) filtered below top salary.",
    practicalExample: "-- Approach 1: Most reliable scalar subquery (automatically returns NULL if absent)\nSELECT MAX(salary) AS SecondHighestSalary\nFROM Employee\nWHERE salary < (SELECT MAX(salary) FROM Employee);\n\n-- Approach 2: Window function (extensible to N-th highest salary)\nWITH SalaryRanks AS (\n    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk\n    FROM Employee\n)\nSELECT (\n    SELECT DISTINCT salary \n    FROM SalaryRanks \n    WHERE rnk = 2\n) AS SecondHighestSalary;",
    commonMistakes: [
      "Using 'ORDER BY salary DESC LIMIT 1 OFFSET 1' without DISTINCT, which returns the duplicate maximum salary if top 2 earners earn the same",
      "Using 'LIMIT 1 OFFSET 1' directly without wrapping in a scalar subquery, returning an empty result set instead of NULL when only 1 record exists",
      "Using RANK() instead of DENSE_RANK() (RANK skips numbers after ties: 1, 1, 3)"
    ],
    timeComplexity: "O(n log n) with sorting or O(n) with single scan max",
    spaceComplexity: "O(1) auxiliary space",
    suggestedFollowUps: ["How would you generalize this query to find the N-th highest salary dynamically?"]
  },
  {
    questionId: "sql_indexing_005",
    questionText: "How do B-Tree indexes operate in relational databases? Explain the Composite Index 'Leftmost Prefix' rule and how to interpret an EXPLAIN query execution plan.",
    category: "SQL/DBMS",
    topic: "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    subtopic: "B-Tree Indexes & Query Execution Plans",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 5,
    learningStage: "Performance & Optimization",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "Database Administrator", "Senior Engineer"],
    interviewMode: "sql",
    tags: ["sql", "indexing", "b-tree", "composite-index", "explain", "optimization"],
    companyStyleLabel: "Enterprise / FinTech",
    expectedKeyPoints: [
      "B-Tree (Balanced Tree) maintains sorted keys in balanced nodes for O(log n) search, insertion, and range queries",
      "Composite index on (A, B, C) can satisfy queries filtering on (A), (A, B), or (A, B, C), but CANNOT satisfy queries filtering on only (B) or (C) alone (Leftmost Prefix Rule)",
      "Range predicate stops index utility for subsequent columns (e.g. WHERE A = 5 AND B > 10 AND C = 20 uses index for A and B, but cannot use index for C)",
      "EXPLAIN terms: Index Scan / Seek vs Index Fast Full Scan vs Table Scan / Sequential Scan (Seq Scan) and Filter vs Index Condition"
    ],
    referenceAnswer: "A B-Tree index is a balanced, self-sorting multi-way search tree where leaf nodes reside at equal depth and are doubly linked for rapid sequential range traversals. Lookups, inserts, and deletes operate in O(log N) time. For composite indexes defined on multiple columns, say (col_a, col_b, col_c), keys are sorted lexicographically: first by col_a, then by col_b within equal col_a values, and finally by col_c. Under the Leftmost Prefix Rule, the query optimizer can only use the index if the query condition includes the leading leftmost columns. A query filtering on (col_a) or (col_a, col_b) leverages the index, but filtering on (col_b, col_c) alone cannot utilize the tree and causes a full table scan. In an EXPLAIN plan, an 'Index Seek' or 'Index Scan' indicates direct traversal of the tree, while a 'Sequential Scan' (Seq Scan) means the database must read every disk page. High 'Rows Removed by Filter' indicates missing or sub-optimal index coverage.",
    stepByStepExplanation: "1. B-Tree Structure: Root -> Internal Branch Nodes -> Leaf Nodes containing (Key, RowID/Pointer).\n2. Composite sorting: Analogy to a phone book sorted by (LastName, FirstName). You can easily find 'Smith', or 'Smith, John', but you cannot use the sorting to find all people named 'John' without checking every entry.\n3. Range scan barrier: In 'WHERE a = 1 AND b BETWEEN 10 AND 20 AND c = 5', the index seeks on 'a', scans range on 'b', but must inspect 'c' as a post-filter.\n4. EXPLAIN Verification: Run 'EXPLAIN ANALYZE SELECT ...'; verify that 'type' is 'ref' or 'range', not 'ALL'.",
    practicalExample: "-- Composite Index definition:\nCREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date, status);\n\n-- Uses index efficiently (Leftmost prefix satisfied):\nSELECT * FROM orders WHERE customer_id = 42 AND order_date >= '2026-01-01';\n\n-- CANNOT use index effectively (violates leftmost prefix rule; causes Table Scan):\nSELECT * FROM orders WHERE order_date >= '2026-01-01' AND status = 'COMPLETED';",
    commonMistakes: [
      "Applying functions or type casts to indexed columns (e.g. WHERE YEAR(order_date) = 2026 or LOWER(name) = 'alice'), which invalidates B-Tree index lookups",
      "Creating redundant individual indexes on col_a and col_b when a composite index already covers both",
      "Over-indexing tables with high write/insert throughput, as every insert/update incurs index rebalancing overhead"
    ],
    suggestedFollowUps: ["What is a Covering Index (Index-Only Scan) and how does it eliminate table heap lookups?"]
  },
  {
    questionId: "sql_acid_006",
    questionText: "Define the ACID properties of database transactions. Walk through a real-world bank fund transfer scenario showing how Atomicity, Consistency, Isolation, and Durability prevent financial discrepancies.",
    category: "SQL/DBMS",
    topic: "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    subtopic: "ACID Transaction Guarantees",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 6,
    learningStage: "Practical Applications",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "Database Administrator", "FinTech Engineer"],
    interviewMode: "conceptual",
    tags: ["sql", "acid", "transactions", "wal", "durability", "atomicity"],
    companyStyleLabel: "Enterprise / FinTech",
    expectedKeyPoints: [
      "Atomicity: All operations in a transaction succeed completely or all are rolled back (all-or-nothing)",
      "Consistency: Transaction transitions database from one valid state satisfying all schema rules, constraints, and business invariants to another",
      "Isolation: Concurrent executing transactions operate without mutual interference as if executing sequentially",
      "Durability: Once committed, state changes survive server crashes, power failures, or restarts (achieved via WAL - Write-Ahead Logging)"
    ],
    referenceAnswer: "The ACID properties guarantee data integrity in transactional databases. In a $100 bank transfer from Account A to Account B: (1) Atomicity ensures that debiting $100 from A and crediting $100 to B occur as an indivisible unit; if the server crashes or network drops after debiting A, the transaction rolls back so money is never lost. (2) Consistency guarantees that all database constraints (such as 'balance >= 0' and foreign keys) are satisfied before and after the transaction, ensuring total money across both accounts remains unchanged. (3) Isolation ensures that if Account A is concurrently checked by an ATM or debited for a recurring subscription, the concurrent process sees either the pre-transfer balance or post-transfer balance, never a half-updated intermediate balance. (4) Durability ensures that once the database returns 'COMMIT successful', the updates are persisted to non-volatile storage via the Write-Ahead Log (WAL), surviving immediate power failure.",
    stepByStepExplanation: "1. BEGIN TRANSACTION.\n2. UPDATE accounts SET balance = balance - 100 WHERE id = 'A' AND balance >= 100;\n3. Check rows affected: If 0, ROLLBACK (Insufficient Funds).\n4. UPDATE accounts SET balance = balance + 100 WHERE id = 'B';\n5. INSERT INTO transfer_audit_log (from_acc, to_acc, amount) VALUES ('A', 'B', 100);\n6. COMMIT: Flushes commit record to WAL on disk.\n7. On any unhandled exception or crash: automatic ROLLBACK restores pre-transaction state.",
    practicalExample: "BEGIN TRANSACTION;\nBEGIN TRY\n    UPDATE accounts SET balance = balance - 100 WHERE id = 101;\n    UPDATE accounts SET balance = balance + 100 WHERE id = 102;\n    COMMIT TRANSACTION;\nEND TRY\nBEGIN CATCH\n    ROLLBACK TRANSACTION;\n    THROW;\nEND CATCH;",
    commonMistakes: [
      "Confusing Consistency in ACID (schema constraints and invariants) with Consistency in the CAP theorem (linearizability across distributed replicas)",
      "Assuming Durability means data is immediately written to data table files; it is flushed to Write-Ahead Logs (WAL) first",
      "Neglecting database error handling so failed statements leave open uncommitted transactions"
    ],
    suggestedFollowUps: ["How does Write-Ahead Logging (WAL) enable crash recovery via ARIES protocol?"]
  },
  {
    questionId: "sql_isolation_007",
    questionText: "Explain the four standard ANSI SQL Transaction Isolation Levels. Describe the concurrency anomalies each level prevents: Dirty Reads, Non-Repeatable Reads, and Phantom Reads.",
    category: "SQL/DBMS",
    topic: "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    subtopic: "Concurrency Anomalies & Isolation Levels",
    difficulty: "Hard",
    questionType: "conceptual",
    sequenceOrder: 7,
    learningStage: "Advanced Concepts",
    interviewRelevanceLabel: "Advanced concept",
    targetRoles: ["Software Engineer", "Backend Developer", "Staff Engineer", "Database Architect"],
    interviewMode: "conceptual",
    tags: ["sql", "transactions", "isolation-levels", "dirty-read", "phantom-read", "mvcc"],
    companyStyleLabel: "Enterprise / FinTech",
    expectedKeyPoints: [
      "Read Uncommitted: Lowest isolation; allows Dirty Reads (reading uncommitted data that may later roll back)",
      "Read Committed: Default in PostgreSQL/Oracle; prevents Dirty Reads but allows Non-Repeatable Reads (re-reading same row returns different values if committed concurrently)",
      "Repeatable Read: Default in MySQL InnoDB; prevents Dirty Reads and Non-Repeatable Reads; MySQL uses MVCC and gap locks to prevent Phantom Reads",
      "Serializable: Highest isolation; prevents all anomalies including Phantom Reads (new rows inserted matching search condition) using two-phase locking or SSI",
      "Modern relational databases use MVCC (Multi-Version Concurrency Control) so readers do not block writers and writers do not block readers"
    ],
    referenceAnswer: "ANSI SQL defines four transaction isolation levels to balance concurrency against data consistency anomalies. (1) Read Uncommitted permits a transaction to read uncommitted changes from concurrent transactions, creating 'Dirty Reads' where data is read that subsequently rolls back. (2) Read Committed ensures queries read only committed data, preventing Dirty Reads; however, 'Non-Repeatable Reads' can occur: if Transaction A reads a row, Transaction B updates and commits that row, A re-reading the row sees different values. (3) Repeatable Read guarantees that any row read during a transaction retains identical values upon subsequent reads; however, traditional locking allowed 'Phantom Reads', where another transaction inserts a new row matching the WHERE criteria. (4) Serializable enforces the highest isolation, guaranteeing execution order equivalent to serial execution using Range/Predicate locks or Serializable Snapshot Isolation (SSI). Modern engines (PostgreSQL, MySQL InnoDB) rely heavily on MVCC (Multi-Version Concurrency Control), maintaining row snapshot versions so readers never block writers.",
    stepByStepExplanation: "1. Dirty Read: Tx1 sets salary=9000 (uncommitted); Tx2 reads 9000; Tx1 rolls back. Tx2 acted on phantom data.\n2. Non-Repeatable Read: Tx1 reads balance=$100; Tx2 updates balance=$150 and commits; Tx1 re-reads balance and finds $150.\n3. Phantom Read: Tx1 queries 'COUNT(*) WHERE age > 30' (returns 5); Tx2 inserts new person age=35 and commits; Tx1 re-queries and returns 6.\n4. MVCC: Every transaction reads from a snapshot corresponding to transaction start or statement start timestamp.",
    practicalExample: "-- Setting isolation level in standard SQL\nSET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\nBEGIN TRANSACTION;\nSELECT balance FROM accounts WHERE user_id = 42;\n-- Under Repeatable Read, subsequent queries within this transaction will\n-- guaranteed read the same $1000 balance even if another user commits an update concurrently.\nCOMMIT;",
    commonMistakes: [
      "Thinking Serializable means single-threaded execution; it allows concurrent execution as long as serializable order is maintained",
      "Assuming Repeatable Read always requires heavy shared read locks; modern MVCC engines implement Repeatable Read via snapshot versions without read locks",
      "Ignoring deadlocks that can increase at higher isolation levels like Serializable"
    ],
    suggestedFollowUps: ["How does MySQL InnoDB use Next-Key Locks (record lock + gap lock) to prevent phantom reads in Repeatable Read?"]
  },
  {
    questionId: "sql_normalization_008",
    questionText: "What are the rules for First, Second, and Third Normal Forms (1NF, 2NF, 3NF)? When and why would an enterprise software system intentionally denormalize a relational database schema?",
    category: "SQL/DBMS",
    topic: "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    subtopic: "Database Normalization & Denormalization Trade-offs",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 8,
    learningStage: "Real-World Scenarios",
    interviewRelevanceLabel: "Practical scenario",
    targetRoles: ["Software Engineer", "Backend Developer", "Data Architect", "System Architect"],
    interviewMode: "conceptual",
    tags: ["sql", "normalization", "database-design", "3nf", "denormalization", "architecture"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "1NF: Atomic values (no repeating groups or arrays), primary key defined",
      "2NF: In 1NF and no partial dependencies (all non-key attributes fully dependent on the entire composite primary key)",
      "3NF: In 2NF and no transitive dependencies (non-key attributes depend only on the primary key, not on other non-key attributes)",
      "Normalization eliminates update anomalies, deletion anomalies, and duplicate storage",
      "Denormalization deliberately introduces redundancy (e.g., pre-aggregating counts, caching user names on order records) to eliminate expensive multi-table joins on high-throughput read workloads"
    ],
    referenceAnswer: "Database normalization organizes tables to reduce data redundancy and eliminate modification anomalies. 1NF mandates that table attributes contain only atomic (indivisible) scalar values and each record is uniquely identifiable by a primary key. 2NF requires 1NF and guarantees that every non-key column is fully functionally dependent on the entire primary key, eliminating partial dependencies on composite keys. 3NF requires 2NF and mandates that no non-key attribute depends transitively on another non-key attribute (e.g., storing zip code, city, and state together where city depends on zip code rather than customer ID). While 3NF is optimal for write-heavy OLTP systems with strict consistency, enterprise read-heavy systems intentionally denormalize data. Denormalization reduces expensive multi-table JOINs, supports high-speed reporting dashboards, pre-computes aggregate metrics, and keeps historical point-in-time snapshots (such as preserving the product price and customer address on an invoice record).",
    stepByStepExplanation: "1. Unnormalized: Table with 'PhoneNumbers: [111, 222]' violates 1NF.\n2. 1NF: Split into separate rows or child table so each field is atomic.\n3. 2NF: In OrderItems(OrderID, ProductID, ProductName, Quantity), ProductName depends only on ProductID, not OrderID. Move Product to separate table.\n4. 3NF: In Employee(EmpID, DeptID, DeptName, DeptLocation), DeptName depends on DeptID. Move Department to separate table.\n5. Denormalize: Add 'total_order_amount' to Orders table to avoid summing 1,000 OrderItems rows on every user profile load.",
    practicalExample: "-- Intentional Denormalization in E-Commerce:\n-- An order invoice MUST preserve the unit price at the time of purchase,\n-- even if the central Products catalog price changes tomorrow.\nCREATE TABLE order_items (\n    order_id INT,\n    product_id INT,\n    quantity INT,\n    unit_price_at_purchase DECIMAL(10, 2), -- Denormalized snapshot\n    PRIMARY KEY(order_id, product_id)\n);",
    commonMistakes: [
      "Premature denormalization before measuring read bottlenecks or query execution profiles",
      "Denormalizing data without transactional mechanisms or background workers to keep redundant fields synchronized",
      "Confusing 2NF with 3NF; 2NF addresses partial key dependencies, 3NF addresses non-key transitive dependencies"
    ],
    suggestedFollowUps: ["What is Boyce-Codd Normal Form (BCNF) and how does it handle overlapping composite candidate keys?"]
  },
  {
    questionId: "sql_deadlock_009",
    questionText: "How do database deadlocks occur in high-concurrency production systems? How do database engines detect and resolve deadlocks, and what engineering practices prevent them?",
    category: "SQL/DBMS",
    topic: "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    subtopic: "Lock Contention & Deadlock Prevention",
    difficulty: "Hard",
    questionType: "scenario",
    sequenceOrder: 9,
    learningStage: "Debugging & Edge Cases",
    interviewRelevanceLabel: "Debugging scenario",
    targetRoles: ["Senior Software Engineer", "Backend Developer", "Database Administrator", "Site Reliability Engineer"],
    interviewMode: "scenario",
    tags: ["sql", "deadlock", "concurrency", "locking", "troubleshooting", "production"],
    companyStyleLabel: "Enterprise / FinTech",
    expectedKeyPoints: [
      "Deadlock occurs when two or more transactions hold exclusive locks that the other requires, forming a circular wait graph (e.g. Tx1 locks Row A, wants Row B; Tx2 locks Row B, wants Row A)",
      "Detection: Database background engine uses a Wait-For Graph cycle detection algorithm; detects cycle and aborts/rolls back the transaction with lowest cost (the victim)",
      "Prevention: Always access and update tables and rows in consistent deterministic order across the codebase (e.g. sort IDs ascending before updating)",
      "Keep transactions short: perform external API calls and heavy compute outside transactional boundaries",
      "Use appropriate indexing to avoid table-level lock escalation during updates"
    ],
    referenceAnswer: "A database deadlock is a circular dependency condition where Transaction 1 holds a lock on Resource A and waits for Resource B, while concurrent Transaction 2 holds a lock on Resource B and waits for Resource A. Neither can advance without the other releasing its lock. Relational database engines detect deadlocks using a background thread running a cycle-detection algorithm on an internal Wait-For Graph. Once a cycle is detected, the database engine resolves it by selecting one transaction as the 'victim' (typically the transaction with the fewest modified rows or lowest rollback cost), aborting it, rolling back its changes, and throwing a Deadlock Error (e.g. MySQL Error 1213 / Postgres 40P01) to let the other transaction complete. In production systems, deadlocks are prevented by: (1) Enforcing uniform resource access order (e.g., sorting account IDs in ascending order before acquiring update locks in batch operations), (2) Keeping transactions minimal by keeping network calls and CPU computations outside the transaction block, (3) Ensuring query filters use exact index lookups to avoid broad range or table locks, and (4) Implementing client-side exponential backoff retries.",
    stepByStepExplanation: "1. Scenario: Tx1 updates User 10, then User 20. Tx2 updates User 20, then User 10.\n2. Collision: Tx1 locks Row 10; Tx2 locks Row 20. Tx1 requests Row 20 (blocked). Tx2 requests Row 10 (blocked).\n3. Deadlock Detector: Runs every deadlock_timeout (e.g. 1 second); detects directed cycle in lock wait graph.\n4. Victim Selection: Database aborts Tx2; Tx1 proceeds to commit.\n5. Application Remediation: Application catches DeadlockException and executes retry with jitter.",
    practicalExample: "// Preventing Deadlocks by Sorting Entity IDs before locking:\npublic void transferFunds(int fromAccountId, int toAccountId, BigDecimal amount) {\n    // Always lock in deterministic order regardless of transaction source\n    int firstLockId = Math.min(fromAccountId, toAccountId);\n    int secondLockId = Math.max(fromAccountId, toAccountId);\n\n    transactionTemplate.execute(status -> {\n        accountRepo.lockForUpdate(firstLockId);\n        accountRepo.lockForUpdate(secondLockId);\n        // execute transfer\n        return null;\n    });\n}",
    commonMistakes: [
      "Assuming deadlocks represent a catastrophic database bug; deadlocks are a normal concurrency condition that application code must catch and retry",
      "Holding database transaction locks open while awaiting third-party HTTP API responses (e.g. Stripe or PayPal callbacks)",
      "Updating tables without indexes, causing row updates to escalate into full-table scans that lock unrelated rows"
    ],
    suggestedFollowUps: ["What is the difference between Optimistic Concurrency Control (OCC via version column) and Pessimistic Locking (SELECT ... FOR UPDATE)?"]
  }
];
