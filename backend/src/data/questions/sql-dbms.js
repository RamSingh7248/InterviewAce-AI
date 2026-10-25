/**
 * Curated High-Value Questions for SQL/DBMS
 * Total Questions: 45
 */

export const SQL_DBMS_QUESTIONS = [
  {
    "category": "SQL/DBMS",
    "topic": "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    "subtopic": "Filtering & SQL Logical Execution Order",
    "question": "What is the difference between the WHERE clause and the HAVING clause in SQL? Explain the logical execution order of a SQL SELECT statement.",
    "questionText": "What is the difference between the WHERE clause and the HAVING clause in SQL? Explain the logical execution order of a SQL SELECT statement.",
    "idealAnswer": "The fundamental distinction between WHERE and HAVING lies in when filtering occurs relative to data aggregation. The WHERE clause filters raw individual rows before groupings and aggregate calculations occur; consequently, WHERE cannot evaluate aggregate functions like SUM() or COUNT(). Conversely, the HAVING clause filters grouped records after GROUP BY has aggregated rows, allowing conditions on aggregate computations. In SQL's logical execution order, the database engine processes clauses in this sequence: (1) FROM and JOINs to assemble tables, (2) WHERE to filter candidate rows, (3) GROUP BY to partition rows into groups, (4) HAVING to filter aggregated groups, (5) SELECT to project columns and evaluate window functions, (6) DISTINCT, (7) ORDER BY to sort the output, and (8) LIMIT/OFFSET for pagination.",
    "referenceAnswer": "The fundamental distinction between WHERE and HAVING lies in when filtering occurs relative to data aggregation. The WHERE clause filters raw individual rows before groupings and aggregate calculations occur; consequently, WHERE cannot evaluate aggregate functions like SUM() or COUNT(). Conversely, the HAVING clause filters grouped records after GROUP BY has aggregated rows, allowing conditions on aggregate computations. In SQL's logical execution order, the database engine processes clauses in this sequence: (1) FROM and JOINs to assemble tables, (2) WHERE to filter candidate rows, (3) GROUP BY to partition rows into groups, (4) HAVING to filter aggregated groups, (5) SELECT to project columns and evaluate window functions, (6) DISTINCT, (7) ORDER BY to sort the output, and (8) LIMIT/OFFSET for pagination.",
    "keyPoints": [
      "WHERE filters individual rows BEFORE aggregation/GROUP BY takes place",
      "HAVING filters aggregated groups AFTER GROUP BY execution and supports aggregate functions (SUM, COUNT, AVG)",
      "WHERE cannot contain aggregate functions directly",
      "Logical execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT/OFFSET"
    ],
    "expectedKeyPoints": [
      "WHERE filters individual rows BEFORE aggregation/GROUP BY takes place",
      "HAVING filters aggregated groups AFTER GROUP BY execution and supports aggregate functions (SUM, COUNT, AVG)",
      "WHERE cannot contain aggregate functions directly",
      "Logical execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT/OFFSET"
    ],
    "followUps": [
      "Why can aliases defined in SELECT be used in ORDER BY but cannot be used in WHERE or GROUP BY in standard SQL?"
    ],
    "suggestedFollowUps": [
      "Why can aliases defined in SELECT be used in ORDER BY but cannot be used in WHERE or GROUP BY in standard SQL?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql",
      "where",
      "having",
      "group-by",
      "execution-order",
      "sql/dbms"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "what is the difference between the where clause and the having clause in sql explain the logical execution order of a sql select statement",
    "normalizedText": "what is the difference between the where clause and the having clause in sql explain the logical execution order of a sql select statement",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    "subtopic": "Relational Joins & NULL Semantics",
    "question": "Explain the behavioral differences between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN. How do these joins handle non-matching rows and NULL values?",
    "questionText": "Explain the behavioral differences between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN. How do these joins handle non-matching rows and NULL values?",
    "idealAnswer": "Relational joins combine columns from multiple tables based on related predicates. An INNER JOIN produces only records with matching keys in both participating tables, discarding unmatched rows from both sides. A LEFT JOIN preserves all rows from the left table; when a corresponding record exists in the right table, right-side columns are populated; otherwise, right-side columns evaluate to NULL. A RIGHT JOIN symmetrically preserves all rows from the right table. A FULL OUTER JOIN preserves all rows from both tables, producing matches where available and populating NULLs for unmatched rows on either side. In SQL's three-valued logic, comparison with NULL evaluates to UNKNOWN, meaning two NULL keys will not match in an equijoin unless explicitly handled using IS NOT DISTINCT FROM or COALESCE.",
    "referenceAnswer": "Relational joins combine columns from multiple tables based on related predicates. An INNER JOIN produces only records with matching keys in both participating tables, discarding unmatched rows from both sides. A LEFT JOIN preserves all rows from the left table; when a corresponding record exists in the right table, right-side columns are populated; otherwise, right-side columns evaluate to NULL. A RIGHT JOIN symmetrically preserves all rows from the right table. A FULL OUTER JOIN preserves all rows from both tables, producing matches where available and populating NULLs for unmatched rows on either side. In SQL's three-valued logic, comparison with NULL evaluates to UNKNOWN, meaning two NULL keys will not match in an equijoin unless explicitly handled using IS NOT DISTINCT FROM or COALESCE.",
    "keyPoints": [
      "INNER JOIN returns only rows where the join condition matches in both tables",
      "LEFT (OUTER) JOIN returns all rows from the left table, with matching rows from the right table or NULLs if no match exists",
      "RIGHT (OUTER) JOIN returns all rows from the right table, with matching rows from the left table or NULLs",
      "FULL OUTER JOIN returns all rows from both tables, filling with NULL on either side where a match is absent",
      "Join filters on NULL: NULL = NULL evaluates to UNKNOWN (three-valued logic), so NULL values never match each other in standard join predicates"
    ],
    "expectedKeyPoints": [
      "INNER JOIN returns only rows where the join condition matches in both tables",
      "LEFT (OUTER) JOIN returns all rows from the left table, with matching rows from the right table or NULLs if no match exists",
      "RIGHT (OUTER) JOIN returns all rows from the right table, with matching rows from the left table or NULLs",
      "FULL OUTER JOIN returns all rows from both tables, filling with NULL on either side where a match is absent",
      "Join filters on NULL: NULL = NULL evaluates to UNKNOWN (three-valued logic), so NULL values never match each other in standard join predicates"
    ],
    "followUps": [
      "What is the difference between filtering in the ON clause vs filtering in the WHERE clause during a LEFT JOIN?"
    ],
    "suggestedFollowUps": [
      "What is the difference between filtering in the ON clause vs filtering in the WHERE clause during a LEFT JOIN?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql",
      "joins",
      "inner-join",
      "left-join",
      "outer-join",
      "nulls",
      "sql/dbms"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain the behavioral differences between inner join left join right join and full outer join how do these joins handle nonmatching rows and null values",
    "normalizedText": "explain the behavioral differences between inner join left join right join and full outer join how do these joins handle nonmatching rows and null values",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    "subtopic": "Subqueries, CTEs & Query Optimization",
    "question": "Compare a Correlated Subquery, a Non-Correlated Subquery, and a Common Table Expression (CTE). When would you choose a CTE or Window Function over a subquery for performance and readability?",
    "questionText": "Compare a Correlated Subquery, a Non-Correlated Subquery, and a Common Table Expression (CTE). When would you choose a CTE or Window Function over a subquery for performance and readability?",
    "idealAnswer": "A non-correlated subquery is independent of outer query columns; it executes once, and its result is reused (e.g. comparing against a static scalar or set). A correlated subquery depends directly on values from the outer query row, conceptually evaluating once for each row processed by the outer query, which can lead to O(N * M) performance penalties if the database cannot optimize it into an internal hash or merge join. A Common Table Expression (CTE, using the WITH clause) provides a clean, modular way to define named intermediate result sets within a single query. CTEs dramatically enhance readability for complex multi-stage pipelines and are essential for recursive operations (such as traversing organizational hierarchies or graphs). Window functions are often preferred over correlated subqueries because they calculate running totals, rankings, and moving averages in a single sequential scan over sorted partitions without requiring self-joins.",
    "referenceAnswer": "A non-correlated subquery is independent of outer query columns; it executes once, and its result is reused (e.g. comparing against a static scalar or set). A correlated subquery depends directly on values from the outer query row, conceptually evaluating once for each row processed by the outer query, which can lead to O(N * M) performance penalties if the database cannot optimize it into an internal hash or merge join. A Common Table Expression (CTE, using the WITH clause) provides a clean, modular way to define named intermediate result sets within a single query. CTEs dramatically enhance readability for complex multi-stage pipelines and are essential for recursive operations (such as traversing organizational hierarchies or graphs). Window functions are often preferred over correlated subqueries because they calculate running totals, rankings, and moving averages in a single sequential scan over sorted partitions without requiring self-joins.",
    "keyPoints": [
      "Non-correlated subquery is independent of outer query; can execute once and its result cached/reused",
      "Correlated subquery references columns from the outer query; conceptually executes once per row of the outer query (unless optimizer transforms it into a join)",
      "CTE (WITH clause) defines a named temporary result set, improving readability, supporting recursion, and enabling modular multi-step transformations",
      "Modern query optimizers can inline CTEs; non-materialized CTEs optimize identically to subqueries, while recursive CTEs handle hierarchical tree traversal"
    ],
    "expectedKeyPoints": [
      "Non-correlated subquery is independent of outer query; can execute once and its result cached/reused",
      "Correlated subquery references columns from the outer query; conceptually executes once per row of the outer query (unless optimizer transforms it into a join)",
      "CTE (WITH clause) defines a named temporary result set, improving readability, supporting recursion, and enabling modular multi-step transformations",
      "Modern query optimizers can inline CTEs; non-materialized CTEs optimize identically to subqueries, while recursive CTEs handle hierarchical tree traversal"
    ],
    "followUps": [
      "How does a Recursive CTE execute when traversing a parent-child adjacency list?"
    ],
    "suggestedFollowUps": [
      "How does a Recursive CTE execute when traversing a parent-child adjacency list?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql",
      "cte",
      "subqueries",
      "query-optimization",
      "window-functions",
      "sql/dbms"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare a correlated subquery a noncorrelated subquery and a common table expression cte when would you choose a cte or window function over a subquery for performance and readability",
    "normalizedText": "compare a correlated subquery a noncorrelated subquery and a common table expression cte when would you choose a cte or window function over a subquery for performance and readability",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    "subtopic": "Window Functions & Ranking Queries",
    "question": "Write a SQL query to find the second highest salary from an Employee table. Explain how you handle edge cases such as duplicate salaries and tables containing fewer than two records.",
    "questionText": "Write a SQL query to find the second highest salary from an Employee table. Explain how you handle edge cases such as duplicate salaries and tables containing fewer than two records.",
    "idealAnswer": "To find the second highest salary while handling ties and empty/single-row tables, we use either a window function with DENSE_RANK() or an aggregate subquery. Using DENSE_RANK() ensures that if multiple employees share the top salary, they all receive rank 1, and the next distinct salary receives rank 2 (unlike RANK(), which would skip rank 2). A robust solution that returns NULL when no second highest salary exists is: 'SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);'. Another industry-standard approach uses a CTE with DENSE_RANK(): 'WITH Ranked AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM Employee) SELECT (SELECT DISTINCT salary FROM Ranked WHERE rnk = 2) AS SecondHighestSalary;'.",
    "referenceAnswer": "To find the second highest salary while handling ties and empty/single-row tables, we use either a window function with DENSE_RANK() or an aggregate subquery. Using DENSE_RANK() ensures that if multiple employees share the top salary, they all receive rank 1, and the next distinct salary receives rank 2 (unlike RANK(), which would skip rank 2). A robust solution that returns NULL when no second highest salary exists is: 'SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);'. Another industry-standard approach uses a CTE with DENSE_RANK(): 'WITH Ranked AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM Employee) SELECT (SELECT DISTINCT salary FROM Ranked WHERE rnk = 2) AS SecondHighestSalary;'.",
    "keyPoints": [
      "Must account for duplicate top salaries (e.g., if two people earn the maximum $100k, the second highest must be the next distinct value like $90k)",
      "Using DENSE_RANK() OVER (ORDER BY salary DESC) assigns identical ranks to ties without skipping numbers",
      "Alternative using subquery: MAX(salary) WHERE salary < (SELECT MAX(salary) FROM Employee) naturally returns NULL if no second salary exists",
      "LIMIT 1 OFFSET 1 with DISTINCT: fails to return NULL if table has fewer than 2 distinct records unless wrapped in an outer SELECT"
    ],
    "expectedKeyPoints": [
      "Must account for duplicate top salaries (e.g., if two people earn the maximum $100k, the second highest must be the next distinct value like $90k)",
      "Using DENSE_RANK() OVER (ORDER BY salary DESC) assigns identical ranks to ties without skipping numbers",
      "Alternative using subquery: MAX(salary) WHERE salary < (SELECT MAX(salary) FROM Employee) naturally returns NULL if no second salary exists",
      "LIMIT 1 OFFSET 1 with DISTINCT: fails to return NULL if table has fewer than 2 distinct records unless wrapped in an outer SELECT"
    ],
    "followUps": [
      "How would you generalize this query to find the N-th highest salary dynamically?"
    ],
    "suggestedFollowUps": [
      "How would you generalize this query to find the N-th highest salary dynamically?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "sql",
    "questionType": "sql",
    "importance": 4,
    "tags": [
      "sql",
      "dense-rank",
      "subquery",
      "window-functions",
      "ranking",
      "sql/dbms"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "write a sql query to find the second highest salary from an employee table explain how you handle edge cases such as duplicate salaries and tables containing fewer than two records",
    "normalizedText": "write a sql query to find the second highest salary from an employee table explain how you handle edge cases such as duplicate salaries and tables containing fewer than two records",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    "subtopic": "B-Tree Indexes & Query Execution Plans",
    "question": "How do B-Tree indexes operate in relational databases? Explain the Composite Index 'Leftmost Prefix' rule and how to interpret an EXPLAIN query execution plan.",
    "questionText": "How do B-Tree indexes operate in relational databases? Explain the Composite Index 'Leftmost Prefix' rule and how to interpret an EXPLAIN query execution plan.",
    "idealAnswer": "A B-Tree index is a balanced, self-sorting multi-way search tree where leaf nodes reside at equal depth and are doubly linked for rapid sequential range traversals. Lookups, inserts, and deletes operate in O(log N) time. For composite indexes defined on multiple columns, say (col_a, col_b, col_c), keys are sorted lexicographically: first by col_a, then by col_b within equal col_a values, and finally by col_c. Under the Leftmost Prefix Rule, the query optimizer can only use the index if the query condition includes the leading leftmost columns. A query filtering on (col_a) or (col_a, col_b) leverages the index, but filtering on (col_b, col_c) alone cannot utilize the tree and causes a full table scan. In an EXPLAIN plan, an 'Index Seek' or 'Index Scan' indicates direct traversal of the tree, while a 'Sequential Scan' (Seq Scan) means the database must read every disk page. High 'Rows Removed by Filter' indicates missing or sub-optimal index coverage.",
    "referenceAnswer": "A B-Tree index is a balanced, self-sorting multi-way search tree where leaf nodes reside at equal depth and are doubly linked for rapid sequential range traversals. Lookups, inserts, and deletes operate in O(log N) time. For composite indexes defined on multiple columns, say (col_a, col_b, col_c), keys are sorted lexicographically: first by col_a, then by col_b within equal col_a values, and finally by col_c. Under the Leftmost Prefix Rule, the query optimizer can only use the index if the query condition includes the leading leftmost columns. A query filtering on (col_a) or (col_a, col_b) leverages the index, but filtering on (col_b, col_c) alone cannot utilize the tree and causes a full table scan. In an EXPLAIN plan, an 'Index Seek' or 'Index Scan' indicates direct traversal of the tree, while a 'Sequential Scan' (Seq Scan) means the database must read every disk page. High 'Rows Removed by Filter' indicates missing or sub-optimal index coverage.",
    "keyPoints": [
      "B-Tree (Balanced Tree) maintains sorted keys in balanced nodes for O(log n) search, insertion, and range queries",
      "Composite index on (A, B, C) can satisfy queries filtering on (A), (A, B), or (A, B, C), but CANNOT satisfy queries filtering on only (B) or (C) alone (Leftmost Prefix Rule)",
      "Range predicate stops index utility for subsequent columns (e.g. WHERE A = 5 AND B > 10 AND C = 20 uses index for A and B, but cannot use index for C)",
      "EXPLAIN terms: Index Scan / Seek vs Index Fast Full Scan vs Table Scan / Sequential Scan (Seq Scan) and Filter vs Index Condition"
    ],
    "expectedKeyPoints": [
      "B-Tree (Balanced Tree) maintains sorted keys in balanced nodes for O(log n) search, insertion, and range queries",
      "Composite index on (A, B, C) can satisfy queries filtering on (A), (A, B), or (A, B, C), but CANNOT satisfy queries filtering on only (B) or (C) alone (Leftmost Prefix Rule)",
      "Range predicate stops index utility for subsequent columns (e.g. WHERE A = 5 AND B > 10 AND C = 20 uses index for A and B, but cannot use index for C)",
      "EXPLAIN terms: Index Scan / Seek vs Index Fast Full Scan vs Table Scan / Sequential Scan (Seq Scan) and Filter vs Index Condition"
    ],
    "followUps": [
      "What is a Covering Index (Index-Only Scan) and how does it eliminate table heap lookups?"
    ],
    "suggestedFollowUps": [
      "What is a Covering Index (Index-Only Scan) and how does it eliminate table heap lookups?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql",
      "indexing",
      "b-tree",
      "composite-index",
      "explain",
      "optimization",
      "sql/dbms"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how do btree indexes operate in relational databases explain the composite index leftmost prefix rule and how to interpret an explain query execution plan",
    "normalizedText": "how do btree indexes operate in relational databases explain the composite index leftmost prefix rule and how to interpret an explain query execution plan",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    "subtopic": "ACID Transaction Guarantees",
    "question": "Define the ACID properties of database transactions. Walk through a real-world bank fund transfer scenario showing how Atomicity, Consistency, Isolation, and Durability prevent financial discrepancies.",
    "questionText": "Define the ACID properties of database transactions. Walk through a real-world bank fund transfer scenario showing how Atomicity, Consistency, Isolation, and Durability prevent financial discrepancies.",
    "idealAnswer": "The ACID properties guarantee data integrity in transactional databases. In a $100 bank transfer from Account A to Account B: (1) Atomicity ensures that debiting $100 from A and crediting $100 to B occur as an indivisible unit; if the server crashes or network drops after debiting A, the transaction rolls back so money is never lost. (2) Consistency guarantees that all database constraints (such as 'balance >= 0' and foreign keys) are satisfied before and after the transaction, ensuring total money across both accounts remains unchanged. (3) Isolation ensures that if Account A is concurrently checked by an ATM or debited for a recurring subscription, the concurrent process sees either the pre-transfer balance or post-transfer balance, never a half-updated intermediate balance. (4) Durability ensures that once the database returns 'COMMIT successful', the updates are persisted to non-volatile storage via the Write-Ahead Log (WAL), surviving immediate power failure.",
    "referenceAnswer": "The ACID properties guarantee data integrity in transactional databases. In a $100 bank transfer from Account A to Account B: (1) Atomicity ensures that debiting $100 from A and crediting $100 to B occur as an indivisible unit; if the server crashes or network drops after debiting A, the transaction rolls back so money is never lost. (2) Consistency guarantees that all database constraints (such as 'balance >= 0' and foreign keys) are satisfied before and after the transaction, ensuring total money across both accounts remains unchanged. (3) Isolation ensures that if Account A is concurrently checked by an ATM or debited for a recurring subscription, the concurrent process sees either the pre-transfer balance or post-transfer balance, never a half-updated intermediate balance. (4) Durability ensures that once the database returns 'COMMIT successful', the updates are persisted to non-volatile storage via the Write-Ahead Log (WAL), surviving immediate power failure.",
    "keyPoints": [
      "Atomicity: All operations in a transaction succeed completely or all are rolled back (all-or-nothing)",
      "Consistency: Transaction transitions database from one valid state satisfying all schema rules, constraints, and business invariants to another",
      "Isolation: Concurrent executing transactions operate without mutual interference as if executing sequentially",
      "Durability: Once committed, state changes survive server crashes, power failures, or restarts (achieved via WAL - Write-Ahead Logging)"
    ],
    "expectedKeyPoints": [
      "Atomicity: All operations in a transaction succeed completely or all are rolled back (all-or-nothing)",
      "Consistency: Transaction transitions database from one valid state satisfying all schema rules, constraints, and business invariants to another",
      "Isolation: Concurrent executing transactions operate without mutual interference as if executing sequentially",
      "Durability: Once committed, state changes survive server crashes, power failures, or restarts (achieved via WAL - Write-Ahead Logging)"
    ],
    "followUps": [
      "How does Write-Ahead Logging (WAL) enable crash recovery via ARIES protocol?"
    ],
    "suggestedFollowUps": [
      "How does Write-Ahead Logging (WAL) enable crash recovery via ARIES protocol?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql",
      "acid",
      "transactions",
      "wal",
      "durability",
      "atomicity",
      "sql/dbms"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "define the acid properties of database transactions walk through a realworld bank fund transfer scenario showing how atomicity consistency isolation and durability prevent financial discrepancies",
    "normalizedText": "define the acid properties of database transactions walk through a realworld bank fund transfer scenario showing how atomicity consistency isolation and durability prevent financial discrepancies",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    "subtopic": "Concurrency Anomalies & Isolation Levels",
    "question": "Explain the four standard ANSI SQL Transaction Isolation Levels. Describe the concurrency anomalies each level prevents: Dirty Reads, Non-Repeatable Reads, and Phantom Reads.",
    "questionText": "Explain the four standard ANSI SQL Transaction Isolation Levels. Describe the concurrency anomalies each level prevents: Dirty Reads, Non-Repeatable Reads, and Phantom Reads.",
    "idealAnswer": "ANSI SQL defines four transaction isolation levels to balance concurrency against data consistency anomalies. (1) Read Uncommitted permits a transaction to read uncommitted changes from concurrent transactions, creating 'Dirty Reads' where data is read that subsequently rolls back. (2) Read Committed ensures queries read only committed data, preventing Dirty Reads; however, 'Non-Repeatable Reads' can occur: if Transaction A reads a row, Transaction B updates and commits that row, A re-reading the row sees different values. (3) Repeatable Read guarantees that any row read during a transaction retains identical values upon subsequent reads; however, traditional locking allowed 'Phantom Reads', where another transaction inserts a new row matching the WHERE criteria. (4) Serializable enforces the highest isolation, guaranteeing execution order equivalent to serial execution using Range/Predicate locks or Serializable Snapshot Isolation (SSI). Modern engines (PostgreSQL, MySQL InnoDB) rely heavily on MVCC (Multi-Version Concurrency Control), maintaining row snapshot versions so readers never block writers.",
    "referenceAnswer": "ANSI SQL defines four transaction isolation levels to balance concurrency against data consistency anomalies. (1) Read Uncommitted permits a transaction to read uncommitted changes from concurrent transactions, creating 'Dirty Reads' where data is read that subsequently rolls back. (2) Read Committed ensures queries read only committed data, preventing Dirty Reads; however, 'Non-Repeatable Reads' can occur: if Transaction A reads a row, Transaction B updates and commits that row, A re-reading the row sees different values. (3) Repeatable Read guarantees that any row read during a transaction retains identical values upon subsequent reads; however, traditional locking allowed 'Phantom Reads', where another transaction inserts a new row matching the WHERE criteria. (4) Serializable enforces the highest isolation, guaranteeing execution order equivalent to serial execution using Range/Predicate locks or Serializable Snapshot Isolation (SSI). Modern engines (PostgreSQL, MySQL InnoDB) rely heavily on MVCC (Multi-Version Concurrency Control), maintaining row snapshot versions so readers never block writers.",
    "keyPoints": [
      "Read Uncommitted: Lowest isolation; allows Dirty Reads (reading uncommitted data that may later roll back)",
      "Read Committed: Default in PostgreSQL/Oracle; prevents Dirty Reads but allows Non-Repeatable Reads (re-reading same row returns different values if committed concurrently)",
      "Repeatable Read: Default in MySQL InnoDB; prevents Dirty Reads and Non-Repeatable Reads; MySQL uses MVCC and gap locks to prevent Phantom Reads",
      "Serializable: Highest isolation; prevents all anomalies including Phantom Reads (new rows inserted matching search condition) using two-phase locking or SSI",
      "Modern relational databases use MVCC (Multi-Version Concurrency Control) so readers do not block writers and writers do not block readers"
    ],
    "expectedKeyPoints": [
      "Read Uncommitted: Lowest isolation; allows Dirty Reads (reading uncommitted data that may later roll back)",
      "Read Committed: Default in PostgreSQL/Oracle; prevents Dirty Reads but allows Non-Repeatable Reads (re-reading same row returns different values if committed concurrently)",
      "Repeatable Read: Default in MySQL InnoDB; prevents Dirty Reads and Non-Repeatable Reads; MySQL uses MVCC and gap locks to prevent Phantom Reads",
      "Serializable: Highest isolation; prevents all anomalies including Phantom Reads (new rows inserted matching search condition) using two-phase locking or SSI",
      "Modern relational databases use MVCC (Multi-Version Concurrency Control) so readers do not block writers and writers do not block readers"
    ],
    "followUps": [
      "How does MySQL InnoDB use Next-Key Locks (record lock + gap lock) to prevent phantom reads in Repeatable Read?"
    ],
    "suggestedFollowUps": [
      "How does MySQL InnoDB use Next-Key Locks (record lock + gap lock) to prevent phantom reads in Repeatable Read?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql",
      "transactions",
      "isolation-levels",
      "dirty-read",
      "phantom-read",
      "mvcc",
      "sql/dbms"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain the four standard ansi sql transaction isolation levels describe the concurrency anomalies each level prevents dirty reads nonrepeatable reads and phantom reads",
    "normalizedText": "explain the four standard ansi sql transaction isolation levels describe the concurrency anomalies each level prevents dirty reads nonrepeatable reads and phantom reads",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    "subtopic": "Database Normalization & Denormalization Trade-offs",
    "question": "What are the rules for First, Second, and Third Normal Forms (1NF, 2NF, 3NF)? When and why would an enterprise software system intentionally denormalize a relational database schema?",
    "questionText": "What are the rules for First, Second, and Third Normal Forms (1NF, 2NF, 3NF)? When and why would an enterprise software system intentionally denormalize a relational database schema?",
    "idealAnswer": "Database normalization organizes tables to reduce data redundancy and eliminate modification anomalies. 1NF mandates that table attributes contain only atomic (indivisible) scalar values and each record is uniquely identifiable by a primary key. 2NF requires 1NF and guarantees that every non-key column is fully functionally dependent on the entire primary key, eliminating partial dependencies on composite keys. 3NF requires 2NF and mandates that no non-key attribute depends transitively on another non-key attribute (e.g., storing zip code, city, and state together where city depends on zip code rather than customer ID). While 3NF is optimal for write-heavy OLTP systems with strict consistency, enterprise read-heavy systems intentionally denormalize data. Denormalization reduces expensive multi-table JOINs, supports high-speed reporting dashboards, pre-computes aggregate metrics, and keeps historical point-in-time snapshots (such as preserving the product price and customer address on an invoice record).",
    "referenceAnswer": "Database normalization organizes tables to reduce data redundancy and eliminate modification anomalies. 1NF mandates that table attributes contain only atomic (indivisible) scalar values and each record is uniquely identifiable by a primary key. 2NF requires 1NF and guarantees that every non-key column is fully functionally dependent on the entire primary key, eliminating partial dependencies on composite keys. 3NF requires 2NF and mandates that no non-key attribute depends transitively on another non-key attribute (e.g., storing zip code, city, and state together where city depends on zip code rather than customer ID). While 3NF is optimal for write-heavy OLTP systems with strict consistency, enterprise read-heavy systems intentionally denormalize data. Denormalization reduces expensive multi-table JOINs, supports high-speed reporting dashboards, pre-computes aggregate metrics, and keeps historical point-in-time snapshots (such as preserving the product price and customer address on an invoice record).",
    "keyPoints": [
      "1NF: Atomic values (no repeating groups or arrays), primary key defined",
      "2NF: In 1NF and no partial dependencies (all non-key attributes fully dependent on the entire composite primary key)",
      "3NF: In 2NF and no transitive dependencies (non-key attributes depend only on the primary key, not on other non-key attributes)",
      "Normalization eliminates update anomalies, deletion anomalies, and duplicate storage",
      "Denormalization deliberately introduces redundancy (e.g., pre-aggregating counts, caching user names on order records) to eliminate expensive multi-table joins on high-throughput read workloads"
    ],
    "expectedKeyPoints": [
      "1NF: Atomic values (no repeating groups or arrays), primary key defined",
      "2NF: In 1NF and no partial dependencies (all non-key attributes fully dependent on the entire composite primary key)",
      "3NF: In 2NF and no transitive dependencies (non-key attributes depend only on the primary key, not on other non-key attributes)",
      "Normalization eliminates update anomalies, deletion anomalies, and duplicate storage",
      "Denormalization deliberately introduces redundancy (e.g., pre-aggregating counts, caching user names on order records) to eliminate expensive multi-table joins on high-throughput read workloads"
    ],
    "followUps": [
      "What is Boyce-Codd Normal Form (BCNF) and how does it handle overlapping composite candidate keys?"
    ],
    "suggestedFollowUps": [
      "What is Boyce-Codd Normal Form (BCNF) and how does it handle overlapping composite candidate keys?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql",
      "normalization",
      "database-design",
      "3nf",
      "denormalization",
      "architecture",
      "sql/dbms"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "what are the rules for first second and third normal forms 1nf 2nf 3nf when and why would an enterprise software system intentionally denormalize a relational database schema",
    "normalizedText": "what are the rules for first second and third normal forms 1nf 2nf 3nf when and why would an enterprise software system intentionally denormalize a relational database schema",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Queries, Indexing, Transactions, Normalization, ACID & Query Optimization",
    "subtopic": "Lock Contention & Deadlock Prevention",
    "question": "How do database deadlocks occur in high-concurrency production systems? How do database engines detect and resolve deadlocks, and what engineering practices prevent them?",
    "questionText": "How do database deadlocks occur in high-concurrency production systems? How do database engines detect and resolve deadlocks, and what engineering practices prevent them?",
    "idealAnswer": "A database deadlock is a circular dependency condition where Transaction 1 holds a lock on Resource A and waits for Resource B, while concurrent Transaction 2 holds a lock on Resource B and waits for Resource A. Neither can advance without the other releasing its lock. Relational database engines detect deadlocks using a background thread running a cycle-detection algorithm on an internal Wait-For Graph. Once a cycle is detected, the database engine resolves it by selecting one transaction as the 'victim' (typically the transaction with the fewest modified rows or lowest rollback cost), aborting it, rolling back its changes, and throwing a Deadlock Error (e.g. MySQL Error 1213 / Postgres 40P01) to let the other transaction complete. In production systems, deadlocks are prevented by: (1) Enforcing uniform resource access order (e.g., sorting account IDs in ascending order before acquiring update locks in batch operations), (2) Keeping transactions minimal by keeping network calls and CPU computations outside the transaction block, (3) Ensuring query filters use exact index lookups to avoid broad range or table locks, and (4) Implementing client-side exponential backoff retries.",
    "referenceAnswer": "A database deadlock is a circular dependency condition where Transaction 1 holds a lock on Resource A and waits for Resource B, while concurrent Transaction 2 holds a lock on Resource B and waits for Resource A. Neither can advance without the other releasing its lock. Relational database engines detect deadlocks using a background thread running a cycle-detection algorithm on an internal Wait-For Graph. Once a cycle is detected, the database engine resolves it by selecting one transaction as the 'victim' (typically the transaction with the fewest modified rows or lowest rollback cost), aborting it, rolling back its changes, and throwing a Deadlock Error (e.g. MySQL Error 1213 / Postgres 40P01) to let the other transaction complete. In production systems, deadlocks are prevented by: (1) Enforcing uniform resource access order (e.g., sorting account IDs in ascending order before acquiring update locks in batch operations), (2) Keeping transactions minimal by keeping network calls and CPU computations outside the transaction block, (3) Ensuring query filters use exact index lookups to avoid broad range or table locks, and (4) Implementing client-side exponential backoff retries.",
    "keyPoints": [
      "Deadlock occurs when two or more transactions hold exclusive locks that the other requires, forming a circular wait graph (e.g. Tx1 locks Row A, wants Row B; Tx2 locks Row B, wants Row A)",
      "Detection: Database background engine uses a Wait-For Graph cycle detection algorithm; detects cycle and aborts/rolls back the transaction with lowest cost (the victim)",
      "Prevention: Always access and update tables and rows in consistent deterministic order across the codebase (e.g. sort IDs ascending before updating)",
      "Keep transactions short: perform external API calls and heavy compute outside transactional boundaries",
      "Use appropriate indexing to avoid table-level lock escalation during updates"
    ],
    "expectedKeyPoints": [
      "Deadlock occurs when two or more transactions hold exclusive locks that the other requires, forming a circular wait graph (e.g. Tx1 locks Row A, wants Row B; Tx2 locks Row B, wants Row A)",
      "Detection: Database background engine uses a Wait-For Graph cycle detection algorithm; detects cycle and aborts/rolls back the transaction with lowest cost (the victim)",
      "Prevention: Always access and update tables and rows in consistent deterministic order across the codebase (e.g. sort IDs ascending before updating)",
      "Keep transactions short: perform external API calls and heavy compute outside transactional boundaries",
      "Use appropriate indexing to avoid table-level lock escalation during updates"
    ],
    "followUps": [
      "What is the difference between Optimistic Concurrency Control (OCC via version column) and Pessimistic Locking (SELECT ... FOR UPDATE)?"
    ],
    "suggestedFollowUps": [
      "What is the difference between Optimistic Concurrency Control (OCC via version column) and Pessimistic Locking (SELECT ... FOR UPDATE)?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 4,
    "tags": [
      "sql",
      "deadlock",
      "concurrency",
      "locking",
      "troubleshooting",
      "production",
      "sql/dbms"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how do database deadlocks occur in highconcurrency production systems how do database engines detect and resolve deadlocks and what engineering practices prevent them",
    "normalizedText": "how do database deadlocks occur in highconcurrency production systems how do database engines detect and resolve deadlocks and what engineering practices prevent them",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "JOINs, Subqueries & Set Operations",
    "subtopic": "JOINs, Subqueries & Set Operations Internals & Best Practices",
    "question": "Suppose a mission-critical SQL/DBMS service encounters high latency and degraded throughput centered on JOINs, Subqueries & Set Operations. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "questionText": "Suppose a mission-critical SQL/DBMS service encounters high latency and degraded throughput centered on JOINs, Subqueries & Set Operations. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "idealAnswer": "Diagnosing bottlenecks in SQL/DBMS related to JOINs, Subqueries & Set Operations requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "referenceAnswer": "Diagnosing bottlenecks in SQL/DBMS related to JOINs, Subqueries & Set Operations requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "keyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for SQL/DBMS",
      "Architectural optimizations targeting thread contention, memory fragmentation, or I/O bounds",
      "Verification strategy measuring P99 latency, SLA guarantees, and fault recovery"
    ],
    "expectedKeyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for SQL/DBMS",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql_dbms",
      "curated",
      "fallback",
      "joins,",
      "sql/dbms"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "suppose a missioncritical sqldbms service encounters high latency and degraded throughput centered on joins subqueries set operations how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "normalizedText": "suppose a missioncritical sqldbms service encounters high latency and degraded throughput centered on joins subqueries set operations how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Indexes, B-Trees & Query Optimization",
    "subtopic": "Indexes, B-Trees & Query Optimization",
    "question": "How do B-Tree and B+Tree indexes work internally in relational databases (PostgreSQL/MySQL)? Why do database engines prefer B+Trees over standard Binary Search Trees or B-Trees for disk storage?",
    "questionText": "How do B-Tree and B+Tree indexes work internally in relational databases (PostgreSQL/MySQL)? Why do database engines prefer B+Trees over standard Binary Search Trees or B-Trees for disk storage?",
    "idealAnswer": "B+Trees are self-balancing search trees optimized for block storage. Unlike Binary Search Trees (which have a low branching factor of 2, resulting in deep trees and frequent disk I/O seeks), B+Trees have a high fan-out (hundreds of keys per node), keeping tree height low (typically 3-4 levels for millions of rows). B+Trees differ from standard B-Trees in two critical ways: 1) Internal nodes store only search keys and child pointers without data records, maximizing fan-out in memory pages; 2) Leaf nodes contain all actual data pointers and are connected via a bidirectional linked list, enabling highly efficient O(log N + K) range scans without traversing parent nodes.",
    "referenceAnswer": "B+Trees are self-balancing search trees optimized for block storage. Unlike Binary Search Trees (which have a low branching factor of 2, resulting in deep trees and frequent disk I/O seeks), B+Trees have a high fan-out (hundreds of keys per node), keeping tree height low (typically 3-4 levels for millions of rows). B+Trees differ from standard B-Trees in two critical ways: 1) Internal nodes store only search keys and child pointers without data records, maximizing fan-out in memory pages; 2) Leaf nodes contain all actual data pointers and are connected via a bidirectional linked list, enabling highly efficient O(log N + K) range scans without traversing parent nodes.",
    "keyPoints": [
      "High branching factor / fan-out minimizes disk I/O seek operations",
      "Internal nodes store keys only, maximizing page density",
      "Leaf nodes contain all data records and are linked sequentially for rapid range queries",
      "Binary search trees are too deep and cache-unfriendly for block storage engines"
    ],
    "expectedKeyPoints": [
      "High branching factor / fan-out minimizes disk I/O seek operations",
      "Internal nodes store keys only, maximizing page density",
      "Leaf nodes contain all data records and are linked sequentially for rapid range queries",
      "Binary search trees are too deep and cache-unfriendly for block storage engines"
    ],
    "followUps": [
      "What is a clustered index vs a secondary (non-clustered) index in InnoDB?",
      "What is index covering and how does it prevent table bookmark lookups?"
    ],
    "suggestedFollowUps": [
      "What is a clustered index vs a secondary (non-clustered) index in InnoDB?",
      "What is index covering and how does it prevent table bookmark lookups?"
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
      "sql/dbms",
      "indexes btrees  query optimization"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how do btree and btree indexes work internally in relational databases postgresqlmysql why do database engines prefer btrees over standard binary search trees or btrees for disk storage",
    "normalizedText": "how do btree and btree indexes work internally in relational databases postgresqlmysql why do database engines prefer btrees over standard binary search trees or btrees for disk storage",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Transactions, ACID Properties & Concurrency",
    "subtopic": "Transactions, ACID Properties & Concurrency",
    "question": "Compare the four ANSI SQL Transaction Isolation Levels: Read Uncommitted, Read Committed, Repeatable Read, and Serializable. What concurrency anomalies (Dirty Read, Non-repeatable Read, Phantom Read) does each prevent?",
    "questionText": "Compare the four ANSI SQL Transaction Isolation Levels: Read Uncommitted, Read Committed, Repeatable Read, and Serializable. What concurrency anomalies (Dirty Read, Non-repeatable Read, Phantom Read) does each prevent?",
    "idealAnswer": "1) Read Uncommitted allows transactions to see uncommitted changes from concurrent transactions, allowing Dirty Reads, Non-repeatable Reads, and Phantom Reads. 2) Read Committed ensures queries see only committed data, preventing Dirty Reads; however, re-reading the same row within the transaction can yield different values if another transaction commits an update (Non-repeatable Read). 3) Repeatable Read ensures any row read remains identical throughout the transaction (implemented via MVCC snapshots in Postgres/MySQL), preventing Dirty Reads and Non-repeatable Reads; in strict locking, phantom inserts could occur. 4) Serializable completely isolates transactions as if executed sequentially, preventing all anomalies including Phantom Reads and Write Skew via two-phase locking or Serializable Snapshot Isolation (SSI).",
    "referenceAnswer": "1) Read Uncommitted allows transactions to see uncommitted changes from concurrent transactions, allowing Dirty Reads, Non-repeatable Reads, and Phantom Reads. 2) Read Committed ensures queries see only committed data, preventing Dirty Reads; however, re-reading the same row within the transaction can yield different values if another transaction commits an update (Non-repeatable Read). 3) Repeatable Read ensures any row read remains identical throughout the transaction (implemented via MVCC snapshots in Postgres/MySQL), preventing Dirty Reads and Non-repeatable Reads; in strict locking, phantom inserts could occur. 4) Serializable completely isolates transactions as if executed sequentially, preventing all anomalies including Phantom Reads and Write Skew via two-phase locking or Serializable Snapshot Isolation (SSI).",
    "keyPoints": [
      "Dirty Read: reading uncommitted volatile data",
      "Non-repeatable Read: reading different values for the same row within one transaction",
      "Phantom Read: new rows appearing in a range query when re-executed",
      "MVCC (Multi-Version Concurrency Control) provides snapshot isolation without read locks"
    ],
    "expectedKeyPoints": [
      "Dirty Read: reading uncommitted volatile data",
      "Non-repeatable Read: reading different values for the same row within one transaction",
      "Phantom Read: new rows appearing in a range query when re-executed",
      "MVCC (Multi-Version Concurrency Control) provides snapshot isolation without read locks"
    ],
    "followUps": [
      "How does PostgreSQL MVCC handle row updates without in-place mutation?",
      "What is Write Skew anomaly and why does Repeatable Read not prevent it?"
    ],
    "suggestedFollowUps": [
      "How does PostgreSQL MVCC handle row updates without in-place mutation?",
      "What is Write Skew anomaly and why does Repeatable Read not prevent it?"
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
      "sql/dbms",
      "transactions acid properties  concurrency"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare the four ansi sql transaction isolation levels read uncommitted read committed repeatable read and serializable what concurrency anomalies dirty read nonrepeatable read phantom read does each prevent",
    "normalizedText": "compare the four ansi sql transaction isolation levels read uncommitted read committed repeatable read and serializable what concurrency anomalies dirty read nonrepeatable read phantom read does each prevent",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Window Functions, Ranking & CTEs",
    "subtopic": "Window Functions, Ranking & CTEs",
    "question": "Write an SQL query using Common Table Expressions (CTEs) and Window Functions to find the 2nd highest salary in each department. If a department has ties, handle them gracefully.",
    "questionText": "Write an SQL query using Common Table Expressions (CTEs) and Window Functions to find the 2nd highest salary in each department. If a department has ties, handle them gracefully.",
    "idealAnswer": "```sql\nWITH RankedSalaries AS (\n    SELECT \n        employee_id,\n        department_id,\n        salary,\n        DENSE_RANK() OVER (\n            PARTITION BY department_id \n            ORDER BY salary DESC\n        ) as salary_rank\n    FROM employees\n)\nSELECT department_id, employee_id, salary\nFROM RankedSalaries\nWHERE salary_rank = 2;\n```\n`DENSE_RANK()` is used instead of `ROW_NUMBER()` or `RANK()` so that if multiple employees tie for the highest salary, the next distinct salary value receives rank 2 rather than rank 3 or being arbitrarily skipped.",
    "referenceAnswer": "```sql\nWITH RankedSalaries AS (\n    SELECT \n        employee_id,\n        department_id,\n        salary,\n        DENSE_RANK() OVER (\n            PARTITION BY department_id \n            ORDER BY salary DESC\n        ) as salary_rank\n    FROM employees\n)\nSELECT department_id, employee_id, salary\nFROM RankedSalaries\nWHERE salary_rank = 2;\n```\n`DENSE_RANK()` is used instead of `ROW_NUMBER()` or `RANK()` so that if multiple employees tie for the highest salary, the next distinct salary value receives rank 2 rather than rank 3 or being arbitrarily skipped.",
    "keyPoints": [
      "DENSE_RANK() assigns consecutive ranks without skipping numbers on ties",
      "PARTITION BY department_id calculates independent ranking partitions per department",
      "CTE modularizes query for readable filtering in WHERE salary_rank = 2",
      "ROW_NUMBER() would arbitrarily break ties, while RANK() would skip rank 2 on top ties"
    ],
    "expectedKeyPoints": [
      "DENSE_RANK() assigns consecutive ranks without skipping numbers on ties",
      "PARTITION BY department_id calculates independent ranking partitions per department",
      "CTE modularizes query for readable filtering in WHERE salary_rank = 2",
      "ROW_NUMBER() would arbitrarily break ties, while RANK() would skip rank 2 on top ties"
    ],
    "followUps": [
      "What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?",
      "How can you query the N-th highest salary dynamically across the entire organization?"
    ],
    "suggestedFollowUps": [
      "What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?",
      "How can you query the N-th highest salary dynamically across the entire organization?"
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
      "sql-database",
      "live-coding"
    ],
    "interviewModes": [
      "sql-database",
      "live-coding"
    ],
    "type": "sql",
    "questionType": "sql",
    "importance": 5,
    "tags": [
      "sql/dbms",
      "window functions ranking  ctes"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "write an sql query using common table expressions ctes and window functions to find the 2nd highest salary in each department if a department has ties handle them gracefully",
    "normalizedText": "write an sql query using common table expressions ctes and window functions to find the 2nd highest salary in each department if a department has ties handle them gracefully",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Basic & Advanced SELECT, Filtering, Aggregation",
    "subtopic": "Basic & Advanced SELECT, Filtering, Aggregation",
    "question": "Design a high-resiliency workflow in SQL & DBMS for Basic & Advanced SELECT, Filtering, Aggregation. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in SQL & DBMS for Basic & Advanced SELECT, Filtering, Aggregation. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Basic & Advanced SELECT, Filtering, Aggregation workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Basic & Advanced SELECT, Filtering, Aggregation workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "senior"
    ],
    "experienceLevels": [
      "senior"
    ],
    "modes": [
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 5,
    "tags": [
      "sql/dbms",
      "basic  advanced select filtering aggregation",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in sql dbms for basic advanced select filtering aggregation how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in sql dbms for basic advanced select filtering aggregation how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Database Normalization & Constraints",
    "subtopic": "Database Normalization & Constraints",
    "question": "In production SQL & DBMS architectures, explain how Database Normalization & Constraints is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production SQL & DBMS architectures, explain how Database Normalization & Constraints is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In SQL & DBMS, Database Normalization & Constraints enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In SQL & DBMS, Database Normalization & Constraints enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Database Normalization & Constraints",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Database Normalization & Constraints",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Database Normalization & Constraints metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Database Normalization & Constraints?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Database Normalization & Constraints metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Database Normalization & Constraints?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql/dbms",
      "database normalization  constraints",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production sql dbms architectures explain how database normalization constraints is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production sql dbms architectures explain how database normalization constraints is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Views, Triggers, Stored Procedures & Deadlocks",
    "subtopic": "Views, Triggers, Stored Procedures & Deadlocks",
    "question": "Design a high-resiliency workflow in SQL & DBMS for Views, Triggers, Stored Procedures & Deadlocks. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in SQL & DBMS for Views, Triggers, Stored Procedures & Deadlocks. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Views, Triggers, Stored Procedures & Deadlocks workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Views, Triggers, Stored Procedures & Deadlocks workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 3,
    "tags": [
      "sql/dbms",
      "views triggers stored procedures  deadlocks",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in sql dbms for views triggers stored procedures deadlocks how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in sql dbms for views triggers stored procedures deadlocks how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Schema Design & Relational Modeling",
    "subtopic": "Schema Design & Relational Modeling",
    "question": "In production SQL & DBMS architectures, explain how Schema Design & Relational Modeling is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production SQL & DBMS architectures, explain how Schema Design & Relational Modeling is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In SQL & DBMS, Schema Design & Relational Modeling enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In SQL & DBMS, Schema Design & Relational Modeling enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Schema Design & Relational Modeling",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Schema Design & Relational Modeling",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Schema Design & Relational Modeling metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Schema Design & Relational Modeling?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Schema Design & Relational Modeling metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Schema Design & Relational Modeling?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "sql/dbms",
      "schema design  relational modeling",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production sql dbms architectures explain how schema design relational modeling is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production sql dbms architectures explain how schema design relational modeling is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Basic & Advanced SELECT, Filtering, Aggregation",
    "subtopic": "Basic & Advanced SELECT, Filtering, Aggregation",
    "question": "Debug this SQL & DBMS scenario regarding Basic & Advanced SELECT, Filtering, Aggregation: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Basic & Advanced SELECT, Filtering, Aggregation\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this SQL & DBMS scenario regarding Basic & Advanced SELECT, Filtering, Aggregation: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Basic & Advanced SELECT, Filtering, Aggregation\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Basic & Advanced SELECT, Filtering, Aggregation. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Basic & Advanced SELECT, Filtering, Aggregation. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Basic & Advanced SELECT, Filtering, Aggregation bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Basic & Advanced SELECT, Filtering, Aggregation bug?",
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
      "sql/dbms",
      "basic  advanced select filtering aggregation",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this sql dbms scenario regarding basic advanced select filtering aggregation a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for basic advanced select filtering aggregation service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this sql dbms scenario regarding basic advanced select filtering aggregation a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for basic advanced select filtering aggregation service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "JOINs, Subqueries & Set Operations",
    "subtopic": "JOINs, Subqueries & Set Operations",
    "question": "Compare alternative design strategies for JOINs, Subqueries & Set Operations in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for JOINs, Subqueries & Set Operations in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for JOINs, Subqueries & Set Operations in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for JOINs, Subqueries & Set Operations in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for JOINs, Subqueries & Set Operations",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for JOINs, Subqueries & Set Operations",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql/dbms",
      "joins subqueries  set operations",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for joins subqueries set operations in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for joins subqueries set operations in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Window Functions, Ranking & CTEs",
    "subtopic": "Window Functions, Ranking & CTEs",
    "question": "Debug this SQL & DBMS scenario regarding Window Functions, Ranking & CTEs: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Window Functions, Ranking & CTEs\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this SQL & DBMS scenario regarding Window Functions, Ranking & CTEs: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Window Functions, Ranking & CTEs\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Window Functions, Ranking & CTEs. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Window Functions, Ranking & CTEs. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Window Functions, Ranking & CTEs bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Window Functions, Ranking & CTEs bug?",
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
      "sql/dbms",
      "window functions ranking  ctes",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this sql dbms scenario regarding window functions ranking ctes a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for window functions ranking ctes service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this sql dbms scenario regarding window functions ranking ctes a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for window functions ranking ctes service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Indexes, B-Trees & Query Optimization",
    "subtopic": "Indexes, B-Trees & Query Optimization",
    "question": "Compare alternative design strategies for Indexes, B-Trees & Query Optimization in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Indexes, B-Trees & Query Optimization in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Indexes, B-Trees & Query Optimization in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Indexes, B-Trees & Query Optimization in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Indexes, B-Trees & Query Optimization",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Indexes, B-Trees & Query Optimization",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "sql/dbms",
      "indexes btrees  query optimization",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for indexes btrees query optimization in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for indexes btrees query optimization in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Transactions, ACID Properties & Concurrency",
    "subtopic": "Transactions, ACID Properties & Concurrency",
    "question": "Debug this SQL & DBMS scenario regarding Transactions, ACID Properties & Concurrency: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Transactions, ACID Properties & Concurrency\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this SQL & DBMS scenario regarding Transactions, ACID Properties & Concurrency: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Transactions, ACID Properties & Concurrency\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Transactions, ACID Properties & Concurrency. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Transactions, ACID Properties & Concurrency. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Transactions, ACID Properties & Concurrency bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Transactions, ACID Properties & Concurrency bug?",
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
      "sql/dbms",
      "transactions acid properties  concurrency",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this sql dbms scenario regarding transactions acid properties concurrency a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for transactions acid properties concurrency service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this sql dbms scenario regarding transactions acid properties concurrency a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for transactions acid properties concurrency service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Database Normalization & Constraints",
    "subtopic": "Database Normalization & Constraints",
    "question": "Compare alternative design strategies for Database Normalization & Constraints in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Database Normalization & Constraints in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Database Normalization & Constraints in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Database Normalization & Constraints in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Database Normalization & Constraints",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Database Normalization & Constraints",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 3,
    "tags": [
      "sql/dbms",
      "database normalization  constraints",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for database normalization constraints in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for database normalization constraints in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Views, Triggers, Stored Procedures & Deadlocks",
    "subtopic": "Views, Triggers, Stored Procedures & Deadlocks",
    "question": "Debug this SQL & DBMS scenario regarding Views, Triggers, Stored Procedures & Deadlocks: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Views, Triggers, Stored Procedures & Deadlocks\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this SQL & DBMS scenario regarding Views, Triggers, Stored Procedures & Deadlocks: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Views, Triggers, Stored Procedures & Deadlocks\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Views, Triggers, Stored Procedures & Deadlocks. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Views, Triggers, Stored Procedures & Deadlocks. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Views, Triggers, Stored Procedures & Deadlocks bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Views, Triggers, Stored Procedures & Deadlocks bug?",
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
      "sql/dbms",
      "views triggers stored procedures  deadlocks",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this sql dbms scenario regarding views triggers stored procedures deadlocks a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for views triggers stored procedures deadlocks service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this sql dbms scenario regarding views triggers stored procedures deadlocks a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for views triggers stored procedures deadlocks service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Schema Design & Relational Modeling",
    "subtopic": "Schema Design & Relational Modeling",
    "question": "Compare alternative design strategies for Schema Design & Relational Modeling in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Schema Design & Relational Modeling in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Schema Design & Relational Modeling in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Schema Design & Relational Modeling in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Schema Design & Relational Modeling",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Schema Design & Relational Modeling",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql/dbms",
      "schema design  relational modeling",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for schema design relational modeling in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for schema design relational modeling in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "JOINs, Subqueries & Set Operations",
    "subtopic": "JOINs, Subqueries & Set Operations",
    "question": "Design a high-resiliency workflow in SQL & DBMS for JOINs, Subqueries & Set Operations. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in SQL & DBMS for JOINs, Subqueries & Set Operations. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient JOINs, Subqueries & Set Operations workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient JOINs, Subqueries & Set Operations workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 4,
    "tags": [
      "sql/dbms",
      "joins subqueries  set operations",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in sql dbms for joins subqueries set operations how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in sql dbms for joins subqueries set operations how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Window Functions, Ranking & CTEs",
    "subtopic": "Window Functions, Ranking & CTEs",
    "question": "In production SQL & DBMS architectures, explain how Window Functions, Ranking & CTEs is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production SQL & DBMS architectures, explain how Window Functions, Ranking & CTEs is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In SQL & DBMS, Window Functions, Ranking & CTEs enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In SQL & DBMS, Window Functions, Ranking & CTEs enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Window Functions, Ranking & CTEs",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Window Functions, Ranking & CTEs",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Window Functions, Ranking & CTEs metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Window Functions, Ranking & CTEs?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Window Functions, Ranking & CTEs metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Window Functions, Ranking & CTEs?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 3,
    "tags": [
      "sql/dbms",
      "window functions ranking  ctes",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production sql dbms architectures explain how window functions ranking ctes is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production sql dbms architectures explain how window functions ranking ctes is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Indexes, B-Trees & Query Optimization",
    "subtopic": "Indexes, B-Trees & Query Optimization",
    "question": "Design a high-resiliency workflow in SQL & DBMS for Indexes, B-Trees & Query Optimization. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in SQL & DBMS for Indexes, B-Trees & Query Optimization. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Indexes, B-Trees & Query Optimization workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Indexes, B-Trees & Query Optimization workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "senior"
    ],
    "experienceLevels": [
      "senior"
    ],
    "modes": [
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 5,
    "tags": [
      "sql/dbms",
      "indexes btrees  query optimization",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in sql dbms for indexes btrees query optimization how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in sql dbms for indexes btrees query optimization how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Transactions, ACID Properties & Concurrency",
    "subtopic": "Transactions, ACID Properties & Concurrency",
    "question": "In production SQL & DBMS architectures, explain how Transactions, ACID Properties & Concurrency is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production SQL & DBMS architectures, explain how Transactions, ACID Properties & Concurrency is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In SQL & DBMS, Transactions, ACID Properties & Concurrency enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In SQL & DBMS, Transactions, ACID Properties & Concurrency enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Transactions, ACID Properties & Concurrency",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Transactions, ACID Properties & Concurrency",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Transactions, ACID Properties & Concurrency metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Transactions, ACID Properties & Concurrency?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Transactions, ACID Properties & Concurrency metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Transactions, ACID Properties & Concurrency?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql/dbms",
      "transactions acid properties  concurrency",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production sql dbms architectures explain how transactions acid properties concurrency is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production sql dbms architectures explain how transactions acid properties concurrency is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Database Normalization & Constraints",
    "subtopic": "Database Normalization & Constraints",
    "question": "Design a high-resiliency workflow in SQL & DBMS for Database Normalization & Constraints. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in SQL & DBMS for Database Normalization & Constraints. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Database Normalization & Constraints workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Database Normalization & Constraints workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 3,
    "tags": [
      "sql/dbms",
      "database normalization  constraints",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in sql dbms for database normalization constraints how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in sql dbms for database normalization constraints how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Views, Triggers, Stored Procedures & Deadlocks",
    "subtopic": "Views, Triggers, Stored Procedures & Deadlocks",
    "question": "In production SQL & DBMS architectures, explain how Views, Triggers, Stored Procedures & Deadlocks is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production SQL & DBMS architectures, explain how Views, Triggers, Stored Procedures & Deadlocks is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In SQL & DBMS, Views, Triggers, Stored Procedures & Deadlocks enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In SQL & DBMS, Views, Triggers, Stored Procedures & Deadlocks enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Views, Triggers, Stored Procedures & Deadlocks",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Views, Triggers, Stored Procedures & Deadlocks",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Views, Triggers, Stored Procedures & Deadlocks metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Views, Triggers, Stored Procedures & Deadlocks?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Views, Triggers, Stored Procedures & Deadlocks metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Views, Triggers, Stored Procedures & Deadlocks?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "sql/dbms",
      "views triggers stored procedures  deadlocks",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production sql dbms architectures explain how views triggers stored procedures deadlocks is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production sql dbms architectures explain how views triggers stored procedures deadlocks is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Schema Design & Relational Modeling",
    "subtopic": "Schema Design & Relational Modeling",
    "question": "Design a high-resiliency workflow in SQL & DBMS for Schema Design & Relational Modeling. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in SQL & DBMS for Schema Design & Relational Modeling. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Schema Design & Relational Modeling workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Schema Design & Relational Modeling workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 4,
    "tags": [
      "sql/dbms",
      "schema design  relational modeling",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in sql dbms for schema design relational modeling how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in sql dbms for schema design relational modeling how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Basic & Advanced SELECT, Filtering, Aggregation",
    "subtopic": "Basic & Advanced SELECT, Filtering, Aggregation",
    "question": "In production SQL & DBMS architectures, explain how Basic & Advanced SELECT, Filtering, Aggregation is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production SQL & DBMS architectures, explain how Basic & Advanced SELECT, Filtering, Aggregation is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In SQL & DBMS, Basic & Advanced SELECT, Filtering, Aggregation enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In SQL & DBMS, Basic & Advanced SELECT, Filtering, Aggregation enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Basic & Advanced SELECT, Filtering, Aggregation",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Basic & Advanced SELECT, Filtering, Aggregation",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Basic & Advanced SELECT, Filtering, Aggregation metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Basic & Advanced SELECT, Filtering, Aggregation?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Basic & Advanced SELECT, Filtering, Aggregation metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Basic & Advanced SELECT, Filtering, Aggregation?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 3,
    "tags": [
      "sql/dbms",
      "basic  advanced select filtering aggregation",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production sql dbms architectures explain how basic advanced select filtering aggregation is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production sql dbms architectures explain how basic advanced select filtering aggregation is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Window Functions, Ranking & CTEs",
    "subtopic": "Window Functions, Ranking & CTEs",
    "question": "Compare alternative design strategies for Window Functions, Ranking & CTEs in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Window Functions, Ranking & CTEs in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Window Functions, Ranking & CTEs in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Window Functions, Ranking & CTEs in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Window Functions, Ranking & CTEs",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Window Functions, Ranking & CTEs",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 3,
    "tags": [
      "sql/dbms",
      "window functions ranking  ctes",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for window functions ranking ctes in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for window functions ranking ctes in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Indexes, B-Trees & Query Optimization",
    "subtopic": "Indexes, B-Trees & Query Optimization",
    "question": "Debug this SQL & DBMS scenario regarding Indexes, B-Trees & Query Optimization: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Indexes, B-Trees & Query Optimization\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this SQL & DBMS scenario regarding Indexes, B-Trees & Query Optimization: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Indexes, B-Trees & Query Optimization\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Indexes, B-Trees & Query Optimization. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Indexes, B-Trees & Query Optimization. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Indexes, B-Trees & Query Optimization bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Indexes, B-Trees & Query Optimization bug?",
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
      "sql/dbms",
      "indexes btrees  query optimization",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this sql dbms scenario regarding indexes btrees query optimization a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for indexes btrees query optimization service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this sql dbms scenario regarding indexes btrees query optimization a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for indexes btrees query optimization service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Transactions, ACID Properties & Concurrency",
    "subtopic": "Transactions, ACID Properties & Concurrency",
    "question": "Compare alternative design strategies for Transactions, ACID Properties & Concurrency in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Transactions, ACID Properties & Concurrency in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Transactions, ACID Properties & Concurrency in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Transactions, ACID Properties & Concurrency in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Transactions, ACID Properties & Concurrency",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Transactions, ACID Properties & Concurrency",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql/dbms",
      "transactions acid properties  concurrency",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for transactions acid properties concurrency in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for transactions acid properties concurrency in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Database Normalization & Constraints",
    "subtopic": "Database Normalization & Constraints",
    "question": "Debug this SQL & DBMS scenario regarding Database Normalization & Constraints: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Database Normalization & Constraints\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this SQL & DBMS scenario regarding Database Normalization & Constraints: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Database Normalization & Constraints\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Database Normalization & Constraints. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Database Normalization & Constraints. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Database Normalization & Constraints bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Database Normalization & Constraints bug?",
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
      "sql/dbms",
      "database normalization  constraints",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this sql dbms scenario regarding database normalization constraints a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for database normalization constraints service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this sql dbms scenario regarding database normalization constraints a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for database normalization constraints service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Views, Triggers, Stored Procedures & Deadlocks",
    "subtopic": "Views, Triggers, Stored Procedures & Deadlocks",
    "question": "Compare alternative design strategies for Views, Triggers, Stored Procedures & Deadlocks in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Views, Triggers, Stored Procedures & Deadlocks in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Views, Triggers, Stored Procedures & Deadlocks in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Views, Triggers, Stored Procedures & Deadlocks in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Views, Triggers, Stored Procedures & Deadlocks",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Views, Triggers, Stored Procedures & Deadlocks",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "sql/dbms",
      "views triggers stored procedures  deadlocks",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for views triggers stored procedures deadlocks in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for views triggers stored procedures deadlocks in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Schema Design & Relational Modeling",
    "subtopic": "Schema Design & Relational Modeling",
    "question": "Debug this SQL & DBMS scenario regarding Schema Design & Relational Modeling: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Schema Design & Relational Modeling\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this SQL & DBMS scenario regarding Schema Design & Relational Modeling: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for Schema Design & Relational Modeling\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Schema Design & Relational Modeling. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Schema Design & Relational Modeling. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Schema Design & Relational Modeling bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Schema Design & Relational Modeling bug?",
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
      "sql/dbms",
      "schema design  relational modeling",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this sql dbms scenario regarding schema design relational modeling a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for schema design relational modeling service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this sql dbms scenario regarding schema design relational modeling a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for schema design relational modeling service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Basic & Advanced SELECT, Filtering, Aggregation",
    "subtopic": "Basic & Advanced SELECT, Filtering, Aggregation",
    "question": "Compare alternative design strategies for Basic & Advanced SELECT, Filtering, Aggregation in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Basic & Advanced SELECT, Filtering, Aggregation in SQL & DBMS. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Basic & Advanced SELECT, Filtering, Aggregation in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Basic & Advanced SELECT, Filtering, Aggregation in SQL & DBMS, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Basic & Advanced SELECT, Filtering, Aggregation",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Basic & Advanced SELECT, Filtering, Aggregation",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 3,
    "tags": [
      "sql/dbms",
      "basic  advanced select filtering aggregation",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for basic advanced select filtering aggregation in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for basic advanced select filtering aggregation in sql dbms under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "SQL/DBMS",
    "topic": "JOINs, Subqueries & Set Operations",
    "subtopic": "JOINs, Subqueries & Set Operations",
    "question": "Debug this SQL & DBMS scenario regarding JOINs, Subqueries & Set Operations: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for JOINs, Subqueries & Set Operations\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this SQL & DBMS scenario regarding JOINs, Subqueries & Set Operations: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic SQL & DBMS config for JOINs, Subqueries & Set Operations\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in JOINs, Subqueries & Set Operations. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in JOINs, Subqueries & Set Operations. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this JOINs, Subqueries & Set Operations bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this JOINs, Subqueries & Set Operations bug?",
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
      "sql/dbms",
      "joins subqueries  set operations",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this sql dbms scenario regarding joins subqueries set operations a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for joins subqueries set operations service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this sql dbms scenario regarding joins subqueries set operations a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic sql dbms config for joins subqueries set operations service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Indexes, B-Trees & Query Optimization",
    "subtopic": "Indexes, B-Trees & Query Optimization",
    "question": "In production SQL & DBMS architectures, explain how Indexes, B-Trees & Query Optimization is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production SQL & DBMS architectures, explain how Indexes, B-Trees & Query Optimization is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In SQL & DBMS, Indexes, B-Trees & Query Optimization enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In SQL & DBMS, Indexes, B-Trees & Query Optimization enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Indexes, B-Trees & Query Optimization",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Indexes, B-Trees & Query Optimization",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Indexes, B-Trees & Query Optimization metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Indexes, B-Trees & Query Optimization?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Indexes, B-Trees & Query Optimization metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Indexes, B-Trees & Query Optimization?"
    ],
    "difficulty": "Hard",
    "levels": [
      "senior"
    ],
    "experienceLevels": [
      "senior"
    ],
    "modes": [
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "sql/dbms",
      "indexes btrees  query optimization",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production sql dbms architectures explain how indexes btrees query optimization is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production sql dbms architectures explain how indexes btrees query optimization is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Transactions, ACID Properties & Concurrency",
    "subtopic": "Transactions, ACID Properties & Concurrency",
    "question": "Design a high-resiliency workflow in SQL & DBMS for Transactions, ACID Properties & Concurrency. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in SQL & DBMS for Transactions, ACID Properties & Concurrency. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Transactions, ACID Properties & Concurrency workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Transactions, ACID Properties & Concurrency workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 4,
    "tags": [
      "sql/dbms",
      "transactions acid properties  concurrency",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in sql dbms for transactions acid properties concurrency how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in sql dbms for transactions acid properties concurrency how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "JOINs, Subqueries & Set Operations",
    "subtopic": "JOINs, Subqueries & Set Operations",
    "question": "In production SQL & DBMS architectures, explain how JOINs, Subqueries & Set Operations is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production SQL & DBMS architectures, explain how JOINs, Subqueries & Set Operations is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In SQL & DBMS, JOINs, Subqueries & Set Operations enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In SQL & DBMS, JOINs, Subqueries & Set Operations enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for JOINs, Subqueries & Set Operations",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for JOINs, Subqueries & Set Operations",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark JOINs, Subqueries & Set Operations metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with JOINs, Subqueries & Set Operations?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark JOINs, Subqueries & Set Operations metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with JOINs, Subqueries & Set Operations?"
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 4,
    "tags": [
      "sql/dbms",
      "joins subqueries  set operations",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production sql dbms architectures explain how joins subqueries set operations is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production sql dbms architectures explain how joins subqueries set operations is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "SQL/DBMS",
    "topic": "Window Functions, Ranking & CTEs",
    "subtopic": "Window Functions, Ranking & CTEs",
    "question": "Design a high-resiliency workflow in SQL & DBMS for Window Functions, Ranking & CTEs. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in SQL & DBMS for Window Functions, Ranking & CTEs. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Window Functions, Ranking & CTEs workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Window Functions, Ranking & CTEs workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "sql-database",
      "mixed-technical"
    ],
    "interviewModes": [
      "sql-database",
      "mixed-technical"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 3,
    "tags": [
      "sql/dbms",
      "window functions ranking  ctes",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in sql dbms for window functions ranking ctes how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in sql dbms for window functions ranking ctes how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  }
];

export default SQL_DBMS_QUESTIONS;
