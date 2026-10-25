/**
 * InterviewAce AI - Comprehensive Technical Catalog Configuration
 * Covers all 18 Core Programming Languages, Major Technical Disciplines,
 * and Categorized Job Roles across the engineering spectrum.
 */

// 1. Core Programming Languages (18 Languages)
export const PROGRAMMING_LANGUAGES = [
  {
    id: 'Java',
    name: 'Java',
    type: 'language',
    iconName: 'FileCode2',
    description: 'Core Java, JVM, Collections, Concurrency, Streams & Spring Framework',
    topics: [
      'Core Java & JVM Internals',
      'OOP Principles & Class Design',
      'Collections Framework & Generics',
      'Multithreading, Concurrency & JMM',
      'Java Streams, Lambdas & Modern Java',
      'Exception Handling & Best Practices',
      'SOLID Principles & Design Patterns',
      'Memory Management & Garbage Collection',
      'JDBC & Database Connectivity'
    ]
  },
  {
    id: 'Python',
    name: 'Python',
    type: 'language',
    iconName: 'Terminal',
    description: 'Data types, Generators, Decorators, OOP, GIL, Asyncio & Concurrency',
    topics: [
      'Data Types, Mutability & Memory Model',
      'Lists, Tuples, Dictionaries & Sets',
      'Comprehensions, Iterators & Generators',
      'Decorators, Context Managers & Closures',
      'Object-Oriented Python & Magic Methods',
      'GIL (Global Interpreter Lock) & Threading vs Multiprocessing',
      'Asyncio & Asynchronous Programming',
      'Exception Handling & Custom Exceptions',
      'Unit Testing, PyTest & Mocking',
      'Standard Library & Common Packages'
    ]
  },
  {
    id: 'C',
    name: 'C',
    type: 'language',
    iconName: 'Cpu',
    description: 'Pointers, Memory Allocation, Pointer Arithmetic, Structs & Preprocessing',
    topics: [
      'Pointers & Memory Addresses',
      'Dynamic Memory Allocation (malloc, calloc, realloc, free)',
      'Pointer Arithmetic & Multi-dimensional Arrays',
      'Strings & String Manipulation Mechanics',
      'Structures, Unions & Bit Fields',
      'Functions, Function Pointers & Callbacks',
      'Storage Classes (auto, static, extern, register)',
      'Pre-processor Directives & Macros',
      'Undefined Behavior, Segmentation Faults & Memory Leaks',
      'Compilation Stages (Preprocess, Compile, Assemble, Link)'
    ]
  },
  {
    id: 'C++',
    name: 'C++',
    type: 'language',
    iconName: 'Cpu',
    description: 'OOP, STL Containers, Smart Pointers, RAII, Templates & Modern C++',
    topics: [
      'OOP, Inheritance, Virtual Functions & VTable',
      'STL Containers (vector, map, unordered_map, set)',
      'Iterators, Algorithms & Custom Comparators',
      'Templates, Metaprogramming & Type Traits',
      'Pointers, References & Const Correctness',
      'Smart Pointers (unique_ptr, shared_ptr, weak_ptr)',
      'RAII (Resource Acquisition Is Initialization)',
      'Move Semantics, Rvalue References & std::move',
      'Memory Management & Custom Allocators',
      'Modern C++ Features (C++11/14/17/20)'
    ]
  },
  {
    id: 'C#',
    name: 'C#',
    type: 'language',
    iconName: 'Box',
    description: 'CLR, .NET Runtime, LINQ, Async/Await, Delegates & ASP.NET Core',
    topics: [
      'CLR Internals, JIT Compilation & IL Code',
      '.NET Memory Management & Garbage Collection',
      'OOP, Interfaces & Abstract Classes in C#',
      'LINQ (Language Integrated Query) & Expressions',
      'Collections, Generics & Thread-Safe Collections',
      'Delegates, Events, Func and Action',
      'Asynchronous Programming (async, await, Task)',
      'Exception Handling & Custom Exceptions',
      'ASP.NET Core Architecture, Middleware & Dependency Injection',
      'C# Modern Language Features (Records, Pattern Matching, Nullable)'
    ]
  },
  {
    id: 'JavaScript',
    name: 'JavaScript',
    type: 'language',
    iconName: 'Terminal',
    description: 'Scope, Closures, Event Loop, Prototypes, Promises & ES6+ Modules',
    topics: [
      'Execution Context, Lexical Scope, Hoisting & Closures',
      'this, call, apply, bind & Arrow Functions',
      'Prototypes, Prototype Chain & Prototypal Inheritance',
      'Event Loop, Microtasks & Macrotasks',
      'Promises, async/await & Promise Concurrency (all, allSettled, race)',
      'ES6+ Features, Destructuring, Rest/Spread & Modules',
      'Arrays, Objects & Functional Methods',
      'Error Handling & Custom Error Types',
      'DOM Manipulation & Browser Event Bubbling/Capturing',
      'Memory Leaks & V8 Garbage Collection'
    ]
  },
  {
    id: 'TypeScript',
    name: 'TypeScript',
    type: 'language',
    iconName: 'FileCode2',
    description: 'Types, Interfaces, Generics, Narrowing, Utility Types & Type Inference',
    topics: [
      'Primitive Types, Type Annotations & Type Inference',
      'Interfaces vs Type Aliases & Declaration Merging',
      'Generics, Constraints & Default Type Arguments',
      'Union & Intersection Types',
      'Type Narrowing, Guards (typeof, instanceof, custom is)',
      'Utility Types (Partial, Required, Pick, Omit, Record, Readonly)',
      'Conditional Types & infer Keyword',
      'Mapped Types & Keyof Operators',
      'Async Programming with Promises & Generics',
      'TypeScript with React (Props, Hooks, Generics)',
      'tsconfig.json Configuration & Strict Mode Rules'
    ]
  },
  {
    id: 'Go',
    name: 'Go (Golang)',
    type: 'language',
    iconName: 'Cpu',
    description: 'Goroutines, Channels, Interfaces, Slices, Memory & Concurrency Patterns',
    topics: [
      'Goroutines & Go Runtime Scheduler (M:P:N Model)',
      'Channels (Buffered, Unbuffered) & select Statement',
      'Sync Package (Mutex, RWMutex, WaitGroup, Once)',
      'Interfaces, Implicit Implementation & Type Assertions',
      'Slices, Arrays, Capacities & Append Mechanics',
      'Maps, Key Constraints & Concurrency Safety',
      'Error Handling Idioms & panic/recover',
      'Context Package for Cancellation & Timeouts',
      'Pointers, Value vs Pointer Receivers',
      'Unit Testing, Benchmarking & Race Detector'
    ]
  },
  {
    id: 'Ruby',
    name: 'Ruby',
    type: 'language',
    iconName: 'Box',
    description: 'Blocks, Procs, Lambdas, Modules, Mixins, Metaprogramming & Rails',
    topics: [
      'Blocks, Procs and Lambdas & Closures',
      'Modules, Mixins & Method Lookup Hierarchy',
      'Object Model, Classes & Inheritance',
      'Enumerable Methods & Collections',
      'Metaprogramming & method_missing',
      'Exception Handling & ensure',
      'Ruby Memory Model & Garbage Collection',
      'Ruby on Rails MVC Architecture & ActiveRecord',
      'ActiveRecord Associations, Scopes & N+1 Query Optimization',
      'Testing with RSpec & Minitest'
    ]
  },
  {
    id: 'PHP',
    name: 'PHP',
    type: 'language',
    iconName: 'Terminal',
    description: 'Type System, OOP, Namespaces, Composer, PDO, Security & Laravel',
    topics: [
      'PHP Type System & Strict Types',
      'Arrays, Array Functions & Iterators',
      'OOP, Classes, Interfaces, Abstract Classes & Traits',
      'Namespaces & Composer Autoloading (PSR Standards)',
      'Database Operations with PDO & Prepared Statements',
      'Sessions, Cookies & State Management',
      'Security: SQL Injection, XSS, CSRF & Input Sanitization',
      'Exception Handling & Error Reporting Levels',
      'Modern PHP Features (PHP 8.x: Attributes, Match, JIT, Fibers)',
      'Laravel Fundamentals: Service Providers, Routing, Middleware & Eloquent'
    ]
  },
  {
    id: 'Kotlin',
    name: 'Kotlin',
    type: 'language',
    iconName: 'Sparkles',
    description: 'Null Safety, Data Classes, Coroutines, Extensions & Android/JVM Interop',
    topics: [
      'Null Safety, Safe Call (?.) & Elvis Operator (?:)',
      'Data Classes, Sealed Classes & Enum Classes',
      'Coroutines, Dispatchers, Scopes & Flow',
      'Extension Functions & Extension Properties',
      'Collections, Sequences & Functional Transforms',
      'Higher-Order Functions & Inlining (inline, noinline, crossinline)',
      'Delegated Properties & lazy Initializer',
      'JVM Interoperability & Annotations (@JvmStatic, @JvmOverloads)',
      'Smart Casts, When Expressions & Pattern Matching',
      'Kotlin Multiplatform & Android Architecture'
    ]
  },
  {
    id: 'Swift',
    name: 'Swift',
    type: 'language',
    iconName: 'Sparkles',
    description: 'Optionals, Protocols, Struct vs Class, ARC, Closures & SwiftUI',
    topics: [
      'Optionals, Optional Binding (if let, guard let) & Chaining',
      'Value Types (Structs, Enums) vs Reference Types (Classes)',
      'Protocols, Protocol Extensions & Protocol-Oriented Programming',
      'ARC (Automatic Reference Counting), Strong, Weak & Unowned',
      'Closures, Escaping vs Non-Escaping Closures & Retain Cycles',
      'Generics, Constraints & Associated Types',
      'Swift Concurrency: async/await, Actors & Task Groups',
      'Error Handling (do-try-catch, Result Type)',
      'Property Wrappers (@State, @Binding, @ObservedObject)',
      'SwiftUI & UIKit Architectural Fundamentals'
    ]
  },
  {
    id: 'Rust',
    name: 'Rust',
    type: 'language',
    iconName: 'Cpu',
    description: 'Ownership, Borrowing, Lifetimes, Traits, Concurrency & Pattern Matching',
    topics: [
      'Ownership System, Move Semantics & Copy vs Clone',
      'Borrowing, References (&T, &mut T) & Borrow Checker Rules',
      'Lifetimes, Lifetime Annotations (\'a) & Elision Rules',
      'Structs, Enums & Exhaustive Pattern Matching',
      'Traits, Trait Bounds, Derive Macros & Default Implementations',
      'Error Handling: Result, Option & the ? Operator',
      'Smart Pointers: Box, Rc, Arc, RefCell & Interior Mutability',
      'Iterators, Closures & Functional Combinators',
      'Fearless Concurrency: Threads, Channels & Send/Sync Traits',
      'Unsafe Rust & FFI (Foreign Function Interface)'
    ]
  },
  {
    id: 'Dart',
    name: 'Dart',
    type: 'language',
    iconName: 'Sparkles',
    description: 'Sound Null Safety, Futures, Streams, Event Loop & Flutter Architecture',
    topics: [
      'Sound Null Safety & Type Inference',
      'Classes, Constructors (Named, Factory, Const) & Mixins',
      'Asynchronous Programming: Future, async/await & Event Loop',
      'Streams, StreamControllers & Reactive Programming',
      'Collections & Iterable Operators',
      'Isolates & Multi-threaded Execution Model',
      'Flutter Widget Lifecycle & State Management (Provider, Riverpod, Bloc)',
      'Rendering Pipeline, Element Tree & RenderObjects',
      'Platform Channels & Native Interoperability',
      'Testing: Unit Tests, Widget Tests & Integration Tests'
    ]
  },
  {
    id: 'Scala',
    name: 'Scala',
    type: 'language',
    iconName: 'Layers',
    description: 'Functional Programming, Pattern Matching, Traits, Implicits & Spark',
    topics: [
      'Functional Programming Paradigms & Immutability',
      'Case Classes, Sealed Traits & Pattern Matching',
      'Higher-Order Functions, Currying & Partial Application',
      'Traits, Multiple Inheritance & Linearization',
      'Collections Framework (List, Vector, Map, Set)',
      'Given, Using & Context Parameters (Scala 3) vs Implicits (Scala 2)',
      'Option, Either, Try & Monadic Error Handling',
      'Concurrency, Futures & Akka Actors',
      'Type System, Variance (Covariance, Contravariance) & Bounds',
      'Apache Spark Integration with Scala'
    ]
  },
  {
    id: 'R',
    name: 'R',
    type: 'language',
    iconName: 'Database',
    description: 'Vectors, Data Frames, Functional Programming, Tidyverse & Statistical Modeling',
    topics: [
      'Data Structures: Vectors, Lists, Matrices, Data Frames & Factors',
      'Vectorization & Avoiding Explicit Loops',
      'Functional Programming with apply, lapply, sapply & purrr',
      'Data Wrangling with dplyr & tidyr',
      'Data Visualization with ggplot2',
      'Statistical Hypothesis Testing, ANOVA & Regression Analysis',
      'Missing Value Handling (NA, NULL, NaN, Inf)',
      'R Environments, Scoping & Closures',
      'Package Development & CRAN Standards',
      'Performance Optimization & Rcpp'
    ]
  },
  {
    id: 'Perl',
    name: 'Perl',
    type: 'language',
    iconName: 'Terminal',
    description: 'Regular Expressions, Hashes, Scalars, References, Text & File I/O',
    topics: [
      'Scalars, Arrays, Hashes & Context (Scalar vs List)',
      'Regular Expressions & Pattern Matching Mastery',
      'References, Complex Data Structures & Dereferencing',
      'File Handling, File Tests & Stream I/O',
      'Subroutines, Parameter Passing & Scope (my, our, local)',
      'Packages, Modules & CPAN Ecosystem',
      'Special Variables ($_, @_, $/, $?)',
      'Object-Oriented Perl (bless mechanism & modern Moose/Moo)',
      'Text Processing, Parsing & Report Generation',
      'System Administration & Shell Script Interoperability'
    ]
  },
  {
    id: 'Bash',
    name: 'Bash / Shell Scripting',
    type: 'language',
    iconName: 'Terminal',
    description: 'POSIX Shell, Pipes, Redirection, Grep, Sed, Awk & Process Management',
    topics: [
      'Variables, Quoting Rules (\' vs ") & Parameter Expansion',
      'Pipes, Input/Output Redirection & File Descriptors',
      'Exit Codes, Conditionals (if, test, [[]]) & Logical Operators',
      'Loops (for, while, until) & Command Substitution',
      'Functions, Variable Scope & Arguments ($1, $@, $*)',
      'Stream Editors & Text Processing: grep, sed & awk',
      'Process Management: Backgrounding, Signals (trap), ps & kill',
      'Environment Variables, Subshells & Parent Shell Propagation',
      'Error Handling & Script Safety (set -euo pipefail)',
      'Cron Jobs, Automation & System Monitoring Scripts'
    ]
  }
];

// 2. Major Technical Subjects & Disciplines (35 Categories)
export const TECHNICAL_SUBJECTS = [
  {
    id: 'DSA',
    name: 'Data Structures & Algorithms',
    type: 'subject',
    iconName: 'Layers',
    description: 'Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis',
    topics: [
      'Arrays, Strings & Two Pointers',
      'Hashing & Frequency Counting',
      'Binary Search & Sliding Window',
      'Linked Lists, Stacks & Queues',
      'Trees, BST & Tree Traversals',
      'Heaps & Priority Queues',
      'Graphs, BFS, DFS & Shortest Path',
      'Dynamic Programming & Recursion',
      'Greedy Algorithms & Backtracking',
      'Tries & Advanced Data Structures'
    ]
  },
  {
    id: 'OOP',
    name: 'Object-Oriented Programming',
    type: 'subject',
    iconName: 'Box',
    description: 'Encapsulation, Inheritance, Polymorphism, Abstraction & Design Patterns',
    topics: [
      'The 4 Pillars of OOP',
      'Inheritance vs Composition',
      'Interfaces vs Abstract Classes',
      'Method Overloading vs Overriding',
      'Coupling, Cohesion & Clean Code',
      'SOLID Design Principles',
      'Creational Design Patterns (Singleton, Factory, Builder)',
      'Structural & Behavioral Design Patterns (Observer, Strategy, Adapter)',
      'Real-World Object-Oriented Modeling'
    ]
  },
  {
    id: 'SQL/DBMS',
    name: 'SQL & DBMS',
    type: 'subject',
    iconName: 'Database',
    description: 'Queries, Indexing, Transactions, Normalization, ACID & Query Optimization',
    topics: [
      'Basic & Advanced SELECT, Filtering, Aggregation',
      'JOINs, Subqueries & Set Operations',
      'Window Functions, Ranking & CTEs',
      'Indexes, B-Trees & Query Optimization',
      'Transactions, ACID Properties & Concurrency',
      'Database Normalization & Constraints',
      'Views, Triggers, Stored Procedures & Deadlocks',
      'Schema Design & Relational Modeling'
    ]
  },
  {
    id: 'Operating Systems',
    name: 'Operating Systems',
    type: 'subject',
    iconName: 'Cpu',
    description: 'Processes, Threads, CPU Scheduling, Virtual Memory, Concurrency & Deadlocks',
    topics: [
      'Processes vs Threads & Context Switching',
      'CPU Scheduling Algorithms (FCFS, SJF, RR, Priority)',
      'Process Synchronization, Mutex & Semaphores',
      'Race Conditions, Critical Sections & Deadlocks',
      'Paging, Segmentation & Virtual Memory',
      'Page Replacement Algorithms (FIFO, LRU, Optimal)',
      'File Systems, Inodes & Disk Scheduling',
      'Inter-Process Communication (IPC)'
    ]
  },
  {
    id: 'Computer Networks',
    name: 'Computer Networks',
    type: 'subject',
    iconName: 'Network',
    description: 'OSI Model, TCP/IP, DNS, HTTP/HTTPS, Sockets, Proxies & Subnetting',
    topics: [
      'OSI Model & TCP/IP Layer Architecture',
      'TCP vs UDP & 3-Way Handshake / Termination',
      'DNS Resolution & Domain Routing',
      'HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS',
      'IP Addressing, CIDR & Subnetting',
      'Cookies, Sessions, Caching & CDNs',
      'WebSockets, Long Polling & WebRTC',
      'Load Balancers, Reverse Proxies & NAT'
    ]
  },
  {
    id: 'System Design',
    name: 'System Design (HLD & LLD)',
    type: 'subject',
    iconName: 'Layers',
    description: 'High-Level Architecture, Scalability, Caching, Databases & Microservices',
    topics: [
      'Scalability (Vertical vs Horizontal) & Availability',
      'Load Balancing & Reverse Proxies',
      'Caching Strategies (Redis, Memcached, Cache-Aside)',
      'SQL vs NoSQL & CAP Theorem',
      'Database Sharding, Partitioning & Replication',
      'Message Queues & Event-Driven Architecture (Kafka, RabbitMQ)',
      'Rate Limiting & API Gateway Design',
      'Low-Level Design (LLD) & Class Diagrams',
      'Classic HLD: URL Shortener, Notification Service, Chat App'
    ]
  },
  {
    id: 'React',
    name: 'React',
    type: 'subject',
    iconName: 'Sparkles',
    description: 'Hooks, Virtual DOM, State Management, Component Lifecycle & Performance',
    topics: [
      'Components, Props & State Management',
      'Hooks (useState, useEffect, useMemo, useCallback)',
      'Custom Hooks & Hook Rules',
      'Virtual DOM, Reconciliation & Fiber',
      'Context API & Global State Management',
      'Performance Optimization & Memoization',
      'Forms, Controlled Components & Validation',
      'Error Boundaries, Routing & Architecture'
    ]
  },
  {
    id: 'Node.js',
    name: 'Node.js & Express',
    type: 'subject',
    iconName: 'Cpu',
    description: 'Event Loop, Libuv, Streams, Express Middleware, REST APIs & Security',
    topics: [
      'Node.js Runtime, Libuv & Event Loop',
      'Asynchronous Programming & Worker Threads',
      'Streams, Buffers & File System',
      'Express Routing, Middleware & Architecture',
      'REST API Design & Centralized Error Handling',
      'Authentication, JWT, Cookies & Security',
      'Database Integration & ORM/ODM Patterns',
      'Performance, Caching & Rate Limiting'
    ]
  },
  {
    id: 'Full Stack',
    name: 'Full Stack Development',
    type: 'subject',
    iconName: 'Box',
    description: 'Client-Server Communication, HTTP, Security, Deployment & System Integration',
    topics: [
      'Frontend-Backend API Contracts & HTTP Protocol',
      'Authentication Flows (JWT, Sessions, OAuth)',
      'Database Integration, Pagination & Filtering',
      'Web Security (CORS, CSRF, XSS, SQLi)',
      'State Hydration & Server-Side Rendering',
      'File Uploads, Background Jobs & Sockets',
      'Deployment, Environment Config & CI/CD',
      'Real-World Debugging & System Troubleshooting'
    ]
  },
  {
    id: 'Software Engineering',
    name: 'Software Engineering & SDLC',
    type: 'subject',
    iconName: 'Workflow',
    description: 'SDLC, Agile/Scrum, Requirements Engineering, Clean Code & Estimation',
    topics: [
      'Software Development Life Cycle (SDLC) Models',
      'Agile, Scrum, Kanban & Sprint Ceremonies',
      'Requirements Analysis, User Stories & Acceptance Criteria',
      'Clean Code, Refactoring & Code Smells',
      'Technical Debt Management & Prioritization',
      'Code Review Best Practices & Pair Programming',
      'Estimation Techniques (Story Points, Planning Poker)',
      'Documentation: RFCs, ADRs (Architecture Decision Records) & Runbooks'
    ]
  },
  {
    id: 'Design Patterns',
    name: 'Design Patterns & SOLID',
    type: 'subject',
    iconName: 'Box',
    description: 'SOLID Principles, Creational, Structural & Behavioral GoF Design Patterns',
    topics: [
      'SOLID Principles Deep-Dive with Code Examples',
      'Creational: Singleton, Factory Method, Abstract Factory, Builder, Prototype',
      'Structural: Adapter, Decorator, Proxy, Facade, Composite, Bridge',
      'Behavioral: Observer, Strategy, Command, Chain of Responsibility, State',
      'Inversion of Control (IoC) & Dependency Injection (DI)',
      'Anti-Patterns: God Object, Golden Hammer, Spaghetti Code',
      'Enterprise Integration Patterns (EIP)'
    ]
  },
  {
    id: 'REST APIs',
    name: 'REST APIs & API Design',
    type: 'subject',
    iconName: 'Network',
    description: 'REST Principles, HTTP Verbs, Status Codes, Versioning, Idempotency & Auth',
    topics: [
      'REST Architectural Constraints & Statelessness',
      'HTTP Methods (GET, POST, PUT, PATCH, DELETE) & Idempotency',
      'HTTP Status Codes & Standardized Response Formats',
      'API Versioning Strategies (URI, Header, Query)',
      'Pagination, Sorting & Filtering Standards',
      'Authentication (API Keys, Bearer Tokens, OAuth2, HMAC)',
      'Rate Limiting, Throttling & Header Protocols',
      'OpenAPI, Swagger & API Documentation',
      'GraphQL vs REST vs gRPC Tradeoffs'
    ]
  },
  {
    id: 'Competitive Programming',
    name: 'Competitive Programming',
    type: 'subject',
    iconName: 'Layers',
    description: 'Advanced Algorithms, Bitmask DP, Segment Trees, Number Theory & Graph Theory',
    topics: [
      'Time & Space Complexity Asymptotic Bounds (Big-O, Big-Omega)',
      'Bit Manipulation, XOR Tricks & Bitmask Dynamic Programming',
      'Advanced Trees: Segment Trees, Fenwick Trees (BIT), Treaps',
      'Disjoint Set Union (DSU / Union-Find) with Path Compression',
      'Number Theory: Sieve of Eratosthenes, Modular Arithmetic, GCD/LCM',
      'Shortest Paths: Dijkstra, Bellman-Ford, Floyd-Warshall',
      'String Algorithms: KMP, Rabin-Karp, Z-Algorithm, Suffix Automaton',
      'Flow Networks & Bipartite Matching'
    ]
  },
  {
    id: 'Git & Version Control',
    name: 'Git & Version Control',
    type: 'subject',
    iconName: 'Workflow',
    description: 'Git Internals, Branching, Rebase vs Merge, Cherry-Pick & Conflict Resolution',
    topics: [
      'Git Object Model: Blobs, Trees, Commits & Annotated Tags',
      'Branching Strategies: GitFlow, Trunk-Based Development, Feature Branching',
      'git merge vs git rebase & Interactive Rebase (-i)',
      'Resolving Merge Conflicts & Three-Way Merges',
      'git reset (soft, mixed, hard) vs git revert',
      'git stash, cherry-pick & bisect for Debugging',
      'Remote Repositories, Fetch, Pull & Upstream Tracking',
      'Hooks, Git Submodules, LFS & Best Commit Practices'
    ]
  },
  {
    id: 'Testing & QA',
    name: 'Testing & Debugging',
    type: 'subject',
    iconName: 'CheckCircle2',
    description: 'Unit, Integration, E2E Testing, Test Pyramid, TDD, Mocks & Profiling',
    topics: [
      'The Test Pyramid: Unit, Integration, Component & E2E Tests',
      'Test-Driven Development (TDD) & Behavior-Driven Development (BDD)',
      'Test Doubles: Mocks, Stubs, Spies, Fakes & Dummies',
      'End-to-End Automation Frameworks (Cypress, Playwright, Selenium)',
      'API Testing & Contract Testing (Postman, Pact)',
      'Performance & Load Testing (JMeter, k6)',
      'Code Coverage Metrics & Flaky Test Elimination',
      'System Debugging: Core Dumps, Stack Traces & Profilers'
    ]
  },
  {
    id: 'Software Architecture',
    name: 'Software Architecture',
    type: 'subject',
    iconName: 'Layers',
    description: 'Monoliths, Clean Architecture, CQRS, Event Sourcing & Hexagonal Architecture',
    topics: [
      'Monolithic vs Microservices Architectural Tradeoffs',
      'Clean Architecture & Hexagonal / Ports-and-Adapters Pattern',
      'CQRS (Command Query Responsibility Segregation)',
      'Event Sourcing & Event-Driven Architecture',
      'Domain-Driven Design (DDD): Bounded Contexts, Aggregates & Entities',
      'Architectural Quality Attributes: Scalability, Availability, Maintainability',
      'Technical Evaluation & Technology Selection Matrices'
    ]
  },
  {
    id: 'Distributed Systems',
    name: 'Distributed Systems',
    type: 'subject',
    iconName: 'Layers',
    description: 'Consensus (Raft/Paxos), CAP & PACELC, Vector Clocks & Eventual Consistency',
    topics: [
      'Distributed Consensus Algorithms (Raft, Paxos)',
      'CAP Theorem & PACELC Tradeoffs',
      'Consistency Models (Strict, Sequential, Causal, Eventual)',
      'Clock Synchronization: NTP, Lamport Timestamps & Vector Clocks',
      'Distributed Data Stores: Leader-Follower, Multi-Leader & Leaderless',
      'Gossip Protocols, Failure Detectors & Heartbeats',
      'Distributed Caching & Cache Invalidation Hazards',
      'Distributed Locks (Chubby, Redlock, ZooKeeper)'
    ]
  },
  {
    id: 'Microservices',
    name: 'Microservices Architecture',
    type: 'subject',
    iconName: 'Box',
    description: 'Decomposition, Saga Pattern, API Gateways, Circuit Breakers & Service Mesh',
    topics: [
      'Microservices Decomposition Strategies (By Business Capability, By Subdomain)',
      'Inter-Service Communication: Synchronous (REST/gRPC) vs Asynchronous (Kafka/RabbitMQ)',
      'Distributed Transactions & the Saga Pattern (Orchestration vs Choreography)',
      'API Gateway Pattern, Backend-for-Frontend (BFF)',
      'Resilience Patterns: Circuit Breaker, Bulkhead, Retry, Rate Limiter',
      'Service Discovery (Consul, Eureka) & Client-Side vs Server-Side Load Balancing',
      'Service Mesh (Istio, Linkerd) & Sidecar Architecture',
      'Distributed Tracing with OpenTelemetry, Jaeger & Zipkin'
    ]
  },
  {
    id: 'Web Security',
    name: 'Web & Application Security',
    type: 'subject',
    iconName: 'ShieldCheck',
    description: 'OWASP Top 10, Auth Vulnerabilities, Encryption, CSRF, XSS & PenTesting',
    topics: [
      'OWASP Top 10 Vulnerabilities Overview',
      'SQL Injection (SQLi) & Parameterized Queries',
      'Cross-Site Scripting (XSS: Stored, Reflected, DOM)',
      'Cross-Site Request Forgery (CSRF) & SameSite Cookie Defenses',
      'Authentication Flaws, Session Hijacking & JWT Security',
      'Symmetric vs Asymmetric Encryption & Cryptographic Hashing (bcrypt, argon2)',
      'HTTPS, TLS Handshakes & Certificate Pinning',
      'CORS Misconfigurations & Security Headers (CSP, HSTS)',
      'Threat Modeling & STRIDE Framework'
    ]
  },
  {
    id: 'Performance & Optimization',
    name: 'Performance & Optimization',
    type: 'subject',
    iconName: 'Cpu',
    description: 'Profiling, Latency, Memory Leaks, DB Optimization, Concurrency & Caching',
    topics: [
      'CPU & Memory Profiling, Flame Graphs & Allocation Tracking',
      'Garbage Collection Tuning & Memory Leak Detection',
      'Database Query Plan Analysis (EXPLAIN ANALYZE) & Index Tuning',
      'High-Throughput Concurrency & Lock-Free Data Structures',
      'Network Optimization: HTTP/2 Multiplexing, Keep-Alive, TCP Tuning',
      'Caching Topologies (Cache-Aside, Write-Through, Write-Behind, Refresh-Ahead)',
      'I/O Optimization: Non-blocking I/O, Async I/O, Epoll'
    ]
  },
  {
    id: 'Cloud Computing',
    name: 'Cloud Computing (AWS / GCP / Azure)',
    type: 'subject',
    iconName: 'Layers',
    description: 'Cloud Models, Compute, Storage, Networking, IAM & High Availability',
    topics: [
      'IaaS vs PaaS vs SaaS Cloud Service Models',
      'Cloud Compute: VMs, Serverless (Lambda), Containers (ECS/EKS)',
      'Object Storage (S3/GCS) vs Block Storage (EBS) vs File Systems',
      'VPC, Subnets, Route Tables, NAT Gateways & Security Groups',
      'Identity & Access Management (IAM) & Least Privilege',
      'High Availability, Multi-AZ & Disaster Recovery Strategies',
      'Serverless Architectures, Event-Driven Compute & Cold Starts',
      'Cloud Cost Optimization & FinOps Fundamentals'
    ]
  },
  {
    id: 'DevOps',
    name: 'DevOps & CI/CD',
    type: 'subject',
    iconName: 'Workflow',
    description: 'CI/CD Pipelines, Build Automation, Deployment Strategies & Observability',
    topics: [
      'Continuous Integration & Continuous Delivery Principles',
      'Pipeline Configuration (GitHub Actions, GitLab CI, Jenkins)',
      'Build Artifacts, Dependency Caching & Automated Testing',
      'Deployment Strategies: Blue/Green, Canary, Rolling, Feature Flags',
      'Infrastructure as Code (IaC) with Terraform & CloudFormation',
      'Configuration Management with Ansible & Helm',
      'Observability: Metrics, Logs, Traces (Prometheus, Grafana, ELK)',
      'Site Reliability Engineering (SRE): SLI, SLO, SLA & Error Budgets'
    ]
  },
  {
    id: 'Docker & Kubernetes',
    name: 'Docker & Kubernetes',
    type: 'subject',
    iconName: 'Box',
    description: 'Containers, Dockerfiles, K8s Pods, Services, Deployments & Ingress',
    topics: [
      'Containers vs Virtual Machines & Linux Namespaces/Cgroups',
      'Dockerfile Optimization, Multi-Stage Builds & Minimal Base Images',
      'Docker Compose & Container Networking',
      'Kubernetes Architecture: Control Plane (API Server, Etcd, Scheduler) vs Kubelet',
      'Pods, ReplicaSets, Deployments & StatefulSets',
      'Services: ClusterIP, NodePort, LoadBalancer & Headless',
      'ConfigMaps, Secrets, Persistent Volumes (PV/PVC)',
      'Ingress Controllers, Routing & Cert-Manager TLS',
      'Horizontal Pod Autoscaling (HPA) & Cluster Autoscaling'
    ]
  },
  {
    id: 'Linux & Shell Scripting',
    name: 'Linux & Shell Scripting',
    type: 'subject',
    iconName: 'Terminal',
    description: 'Kernel, Processes, Signals, Permissions, VFS, Systemd & Bash Scripting',
    topics: [
      'Linux Kernel Architecture, User Space vs Kernel Space, System Calls',
      'Process Management: fork, exec, signals, zombies & orphans',
      'Virtual File System (VFS), Inodes, File Permissions & ACLs',
      'Memory Management: Virtual Memory, Swap, OOM Killer',
      'Systemd, Service Management & Init Systems',
      'Networking Utilities: netstat, ss, curl, dig, iptables/nftables',
      'Shell Scripting: Text processing with grep, awk, sed, pipes, redirection',
      'System Troubleshooting via /proc, /sys & log analysis'
    ]
  },
  {
    id: 'Networking & Infrastructure',
    name: 'Networking & Infrastructure',
    type: 'subject',
    iconName: 'Network',
    description: 'BGP, Routing, Firewalls, Load Balancers, VPNs, CDNs & Edge Infrastructure',
    topics: [
      'Network Routing Protocols: BGP, OSPF & RIP',
      'Layer 4 vs Layer 7 Load Balancing & Health Checking',
      'Content Delivery Networks (CDNs), Anycast DNS & Edge Caching',
      'Firewalls (Stateful vs Stateless), NAT & WAFs',
      'VPNs (IPsec, WireGuard, OpenVPN) & SD-WAN',
      'Subnetting, CIDR, VLANs & Overlay Networks (VXLAN)',
      'Troubleshooting with tcpdump, Wireshark & traceroute'
    ]
  },
  {
    id: 'Data Engineering',
    name: 'Data Engineering & Big Data',
    type: 'subject',
    iconName: 'Database',
    description: 'ETL/ELT Pipelines, Data Warehouses, Spark, Kafka & Data Modeling',
    topics: [
      'ETL vs ELT Architecture & Data Ingestion Pipelines',
      'Data Warehousing (Snowflake, BigQuery, Redshift)',
      'Data Lakes & Lakehouses (Delta Lake, Apache Iceberg, Apache Hudi)',
      'Dimensional Modeling: Star vs Snowflake Schemas, SCD Types',
      'Distributed Processing with Apache Spark (RDDs, DataFrames, Catalysts)',
      'Streaming Architecture with Apache Kafka, Event Streams & Flink',
      'Workflow Orchestration with Apache Airflow & Dagster',
      'Data Quality, Lineage, Schema Evolution & Governance'
    ]
  },
  {
    id: 'Data Analytics',
    name: 'Data Analytics & Business Intelligence',
    type: 'subject',
    iconName: 'Database',
    description: 'EDA, Statistical Testing, A/B Testing, Dashboards, Metrics & SQL for Analytics',
    topics: [
      'Exploratory Data Analysis (EDA) & Data Cleansing',
      'Advanced SQL for Analytics: Window Functions, CTEs, Pivot & Cohorts',
      'Statistical Hypothesis Testing (t-tests, Chi-Square, ANOVA)',
      'A/B Testing: Experiment Design, Sample Size & Statistical Significance',
      'Key Performance Indicators (KPIs), Funnel Analysis & Retention Metrics',
      'Business Intelligence & Dashboard Design (Tableau, PowerBI, Looker)',
      'Data Storytelling & Communicating Insights to Stakeholders'
    ]
  },
  {
    id: 'AI & Machine Learning',
    name: 'Artificial Intelligence & ML',
    type: 'subject',
    iconName: 'Sparkles',
    description: 'Supervised/Unsupervised ML, Evaluation Metrics, Neural Networks & Algorithms',
    topics: [
      'Supervised vs Unsupervised vs Reinforcement Learning',
      'Linear & Logistic Regression, Decision Trees, Random Forests, XGBoost',
      'Overfitting, Underfitting & Bias-Variance Tradeoff',
      'Regularization Techniques (L1 Lasso, L2 Ridge, ElasticNet)',
      'Model Evaluation: Precision, Recall, F1-Score, ROC-AUC, PR-Curves',
      'Cross-Validation, Hyperparameter Tuning & Bayesian Optimization',
      'Feature Engineering, Scaling & Dimensionality Reduction (PCA, t-SNE)',
      'Gradient Descent Variants (Batch, Mini-Batch, Adam)',
      'Neural Network Foundations (Perceptrons, Backpropagation)'
    ]
  },
  {
    id: 'Deep Learning',
    name: 'Deep Learning & Neural Networks',
    type: 'subject',
    iconName: 'Cpu',
    description: 'CNNs, RNNs, Transformers, Backpropagation, Optimizers & PyTorch/TensorFlow',
    topics: [
      'Feedforward Neural Networks & Universal Approximation Theorem',
      'Activation Functions (ReLU, GELU, Sigmoid, Softmax) & Vanishing Gradients',
      'Convolutional Neural Networks (CNNs) & Computer Vision Architectures (ResNet)',
      'Recurrent Neural Networks (RNNs, LSTMs, GRUs) & Sequence Modeling',
      'Attention Mechanisms & Transformer Backbones',
      'Optimization Algorithms (SGD, Adam, AdamW) & Learning Rate Schedulers',
      'Regularization in Deep Learning: Dropout, Batch Normalization, Layer Normalization',
      'Frameworks: PyTorch vs TensorFlow, Model Training Loops & GPU Acceleration'
    ]
  },
  {
    id: 'Generative AI & LLMs',
    name: 'Generative AI & LLMs',
    type: 'subject',
    iconName: 'Sparkles',
    description: 'Transformers, Attention, Fine-Tuning (LoRA), Tokenization & Guardrails',
    topics: [
      'Transformer Architecture & Self-Attention Mechanisms',
      'LLM Foundations: Pre-training, Fine-Tuning (LoRA, QLoRA) & RLHF',
      'Tokenization, Context Windows & Temperature/Top-P Controls',
      'Embeddings, Cosine Similarity & Vector Representations',
      'Hallucinations, Grounding & Guardrails (NeMo, Llama Guard)',
      'Function Calling & Tool-Augmented LLMs',
      'Agentic Workflows & Multi-Agent Collaboration (LangChain, LangGraph)',
      'LLM Evaluation Benchmarks (MMLU, GSM8K, MT-Bench)'
    ]
  },
  {
    id: 'Prompt Engineering',
    name: 'Prompt Engineering & Context Design',
    type: 'subject',
    iconName: 'Sparkles',
    description: 'Few-Shot, Chain of Thought, ReAct, System Prompts & Injection Defenses',
    topics: [
      'Zero-Shot vs Few-Shot In-Context Learning',
      'Chain-of-Thought (CoT) & Tree-of-Thought Prompting',
      'ReAct Framework (Reasoning + Acting) for AI Agents',
      'System Prompt Crafting & Persona Structuring',
      'Output Formatting: JSON Mode & Structured Outputs',
      'Prompt Injection, Jailbreaking & Defensive System Instructions',
      'Context Window Optimization & Information Retrieval Placement'
    ]
  },
  {
    id: 'Vector DB & RAG',
    name: 'Vector Databases & RAG',
    type: 'subject',
    iconName: 'Database',
    description: 'Retrieval-Augmented Generation, Vector Indexing (HNSW), Chunking & Re-ranking',
    topics: [
      'RAG Architecture & End-to-End Pipeline Workflow',
      'Document Ingestion, Chunking Strategies & Overlap',
      'Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)',
      'Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)',
      'Hybrid Search (Sparse BM25 + Dense Semantic Vector)',
      'Re-ranking Techniques & Cross-Encoders',
      'Query Expansion, Multi-Query & Contextual Compression',
      'RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance'
    ]
  },
  {
    id: 'MLOps',
    name: 'MLOps & ML Engineering',
    type: 'subject',
    iconName: 'Workflow',
    description: 'Experiment Tracking, Feature Stores, Model Serving, Drift Detection & CI/CD',
    topics: [
      'ML Lifecycle Management & Reproducibility',
      'Experiment Tracking with MLflow, Weights & Biases',
      'Feature Stores (Feast, Hopsworks) & Online/Offline Stores',
      'Model Serving Frameworks (Triton, TorchServe, vLLM, FastAPI)',
      'Model Monitoring: Data Drift, Concept Drift & Performance Degradation',
      'Continuous Training (CT) & Automated Retraining Pipelines',
      'Containerization & Cloud Deployment for Machine Learning'
    ]
  },
  {
    id: 'Big Data',
    name: 'Big Data Technologies',
    type: 'subject',
    iconName: 'Database',
    description: 'Apache Spark, Kafka, Hadoop HDFS, Flink, Distributed Storage & Processing',
    topics: [
      'Hadoop Ecosystem: HDFS, YARN & MapReduce Architecture',
      'Apache Spark Internals: DAG, Catalyst Optimizer, Tungsten & RDDs',
      'Spark Streaming vs Structured Streaming',
      'Apache Kafka Architecture: Partitions, Consumer Groups & Offsets',
      'NoSQL at Scale: Apache Cassandra, HBase & DynamoDB',
      'Distributed Stream Processing with Apache Flink',
      'Data Serialization Formats: Parquet, ORC, Avro & Protobuf'
    ]
  },
  {
    id: 'Cybersecurity',
    name: 'Cybersecurity Fundamentals & SOC',
    type: 'subject',
    iconName: 'ShieldCheck',
    description: 'Threat Modeling, Zero Trust, Cryptography, Incident Response, SIEM & IAM',
    topics: [
      'Information Security Principles: CIA Triad (Confidentiality, Integrity, Availability)',
      'Zero Trust Architecture (ZTA) & Defense in Depth',
      'Identity & Access Management (IAM), MFA & SSO Protocols (SAML, OIDC)',
      'Network Security: IDS/IPS, Firewalls, DMZ & Microsegmentation',
      'Vulnerability Management & Penetration Testing Methodologies',
      'Security Operations Center (SOC) & SIEM Log Analysis',
      'Incident Response Lifecycle (NIST Framework)'
    ]
  },
  {
    id: 'Blockchain',
    name: 'Blockchain Fundamentals',
    type: 'subject',
    iconName: 'Box',
    description: 'Consensus (PoW, PoS), Smart Contracts, Cryptography, EVM & Web3 Architecture',
    topics: [
      'Blockchain Fundamentals: Blocks, Chains, Hashing & Immutability',
      'Consensus Mechanisms: Proof of Work (PoW) vs Proof of Stake (PoS)',
      'Cryptographic Primitives: Public/Private Keys, ECDSA & Merkle Trees',
      'Smart Contracts & Ethereum Virtual Machine (EVM)',
      'Decentralized Storage: IPFS & Arweave',
      'Smart Contract Security: Reentrancy, Front-Running & Integer Overflows',
      'Web3 Architecture & Decentralized Applications (dApps)'
    ]
  },
  {
    id: 'Mobile Development',
    name: 'Mobile Application Development',
    type: 'subject',
    iconName: 'Smartphone',
    description: 'iOS & Android Lifecycles, State Management, Offline Storage & Native APIs',
    topics: [
      'Mobile App Architecture (MVC, MVVM, MVI) in iOS & Android',
      'Activity, Fragment & View Controller Lifecycles',
      'State Management in Flutter, React Native, Swift & Jetpack Compose',
      'Offline Data Storage: Room, SQLite, CoreData, Realm',
      'Push Notifications (APNs, FCM) & Background Tasks',
      'Mobile Performance Optimization: App Startup Time, Memory & Battery Usage',
      'App Store & Google Play Publishing, Code Signing & CI/CD'
    ]
  },
  {
    id: 'Accessibility & Performance',
    name: 'Accessibility & Web Performance',
    type: 'subject',
    iconName: 'Activity',
    description: 'WCAG 2.1 Guidelines, ARIA, Core Web Vitals, Bundle Optimization & SSR',
    topics: [
      'Web Content Accessibility Guidelines (WCAG 2.1 AA/AAA)',
      'Accessible Rich Internet Applications (ARIA) Roles & Attributes',
      'Keyboard Navigation, Focus Trapping & Screen Reader Compatibility',
      'Core Web Vitals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), CLS',
      'JavaScript Bundle Optimization: Code Splitting, Tree Shaking & Minification',
      'Asset Optimization: Modern Image Formats (WebP, AVIF), Font Loading & CDN Delivery',
      'Rendering Strategies: Client-Side Rendering (CSR), SSR, SSG & Incremental Hydration'
    ]
  }
];

// Combine all categories into single unified array for seamless backwards compatibility
export const ALL_CATEGORIES = [...PROGRAMMING_LANGUAGES, ...TECHNICAL_SUBJECTS];

// 3. All Major Job Roles (Grouped into 6 Disciplines)
export const ROLE_GROUPS = [
  {
    id: 'software_development',
    name: 'Software Development',
    roles: [
      'Software Engineer Intern',
      'Graduate Engineer Trainee',
      'Associate Software Engineer',
      'Junior Software Engineer',
      'Software Development Engineer (SDE-1)',
      'Software Development Engineer (SDE-2)',
      'Senior Software Engineer',
      'Staff / Principal Engineer',
      'Backend Developer',
      'Frontend Developer',
      'Full Stack Developer',
      'Java Developer',
      'Python Developer',
      'C/C++ Developer',
      '.NET Developer',
      'Go Developer',
      'PHP / Laravel Developer',
      'Ruby / Rails Developer',
      'Kotlin Developer',
      'Swift / iOS Developer',
      'Android Developer',
      'Flutter Developer',
      'Mobile App Developer',
      'API Developer',
      'Platform Engineer'
    ]
  },
  {
    id: 'data_and_ai',
    name: 'Data & Artificial Intelligence',
    roles: [
      'Data Analyst',
      'Business Intelligence Analyst',
      'Data Engineer',
      'Analytics Engineer',
      'Data Scientist',
      'Machine Learning Engineer',
      'AI Engineer',
      'Generative AI Engineer',
      'LLM Application Developer',
      'NLP Engineer',
      'Computer Vision Engineer',
      'MLOps Engineer',
      'Research Engineer'
    ]
  },
  {
    id: 'cloud_and_devops',
    name: 'Cloud, DevOps & Infrastructure',
    roles: [
      'DevOps Engineer',
      'Site Reliability Engineer (SRE)',
      'Cloud Engineer',
      'Cloud Architect',
      'Infrastructure Engineer',
      'Kubernetes Engineer',
      'Systems Engineer',
      'Network Engineer',
      'Database Administrator (DBA)',
      'Database Engineer',
      'Solutions Architect'
    ]
  },
  {
    id: 'quality_and_security',
    name: 'Quality Assurance & Cybersecurity',
    roles: [
      'QA Engineer',
      'Manual Test Engineer',
      'Automation Test Engineer',
      'SDET (Software Dev Engineer in Test)',
      'Performance Test Engineer',
      'Security Engineer',
      'Application Security Engineer',
      'Penetration Tester',
      'Cybersecurity Analyst',
      'SOC Analyst'
    ]
  },
  {
    id: 'product_and_business',
    name: 'Product, Design & Business Tech',
    roles: [
      'Technical Product Manager',
      'Product Manager',
      'Technical Business Analyst',
      'Business Analyst',
      'UI/UX Designer',
      'Technical Support Engineer',
      'Implementation Engineer',
      'Solutions Engineer',
      'Technical Consultant',
      'ERP / SAP Consultant'
    ]
  },
  {
    id: 'architecture_and_leadership',
    name: 'Architecture & Engineering Leadership',
    roles: [
      'Software Architect',
      'Solutions Architect',
      'Technical Lead',
      'Engineering Manager'
    ]
  }
];

// Flat array of all roles
export const ALL_ROLES = ROLE_GROUPS.flatMap(g => g.roles);

// Role Suggestions (Maps each role to prioritized recommended interview categories)
export const ROLE_SUGGESTIONS = {
  // Software Development
  'Software Engineer Intern': ['DSA', 'Java', 'Python', 'C++', 'SQL/DBMS'],
  'Graduate Engineer Trainee': ['DSA', 'OOP', 'SQL/DBMS', 'Operating Systems', 'Java'],
  'Associate Software Engineer': ['DSA', 'Java', 'JavaScript', 'SQL/DBMS', 'Git & Version Control'],
  'Junior Software Engineer': ['DSA', 'OOP', 'REST APIs', 'SQL/DBMS', 'Testing & QA'],
  'Software Development Engineer (SDE-1)': ['DSA', 'System Design', 'OOP', 'SQL/DBMS', 'REST APIs'],
  'Software Development Engineer (SDE-2)': ['System Design', 'Distributed Systems', 'DSA', 'Microservices', 'SQL/DBMS'],
  'Senior Software Engineer': ['System Design', 'Distributed Systems', 'Software Architecture', 'Performance & Optimization'],
  'Staff / Principal Engineer': ['System Design', 'Distributed Systems', 'Software Architecture', 'Cloud Computing'],
  'Backend Developer': ['Node.js', 'Java', 'Python', 'REST APIs', 'SQL/DBMS', 'Distributed Systems'],
  'Frontend Developer': ['React', 'JavaScript', 'TypeScript', 'Accessibility & Performance', 'Web Security'],
  'Full Stack Developer': ['Full Stack', 'React', 'Node.js', 'SQL/DBMS', 'REST APIs'],
  'Java Developer': ['Java', 'OOP', 'SQL/DBMS', 'Design Patterns', 'Microservices'],
  'Python Developer': ['Python', 'DSA', 'REST APIs', 'SQL/DBMS'],
  'C/C++ Developer': ['C++', 'C', 'Operating Systems', 'DSA', 'Design Patterns'],
  '.NET Developer': ['C#', 'SQL/DBMS', 'REST APIs', 'OOP', 'Design Patterns'],
  'Go Developer': ['Go', 'Distributed Systems', 'Docker & Kubernetes', 'REST APIs'],
  'PHP / Laravel Developer': ['PHP', 'SQL/DBMS', 'REST APIs', 'Web Security'],
  'Ruby / Rails Developer': ['Ruby', 'SQL/DBMS', 'REST APIs', 'Software Engineering'],
  'Kotlin Developer': ['Kotlin', 'Java', 'Mobile Development', 'OOP'],
  'Swift / iOS Developer': ['Swift', 'Mobile Development', 'Design Patterns', 'REST APIs'],
  'Android Developer': ['Kotlin', 'Java', 'Mobile Development', 'REST APIs'],
  'Flutter Developer': ['Dart', 'Mobile Development', 'REST APIs', 'Full Stack'],
  'Mobile App Developer': ['Mobile Development', 'Dart', 'Swift', 'Kotlin', 'REST APIs'],
  'API Developer': ['REST APIs', 'Web Security', 'Microservices', 'Node.js', 'Go'],
  'Platform Engineer': ['DevOps', 'Docker & Kubernetes', 'Cloud Computing', 'Distributed Systems', 'Linux & Shell Scripting'],

  // Data & Artificial Intelligence
  'Data Analyst': ['SQL/DBMS', 'Data Analytics', 'Python', 'R'],
  'Business Intelligence Analyst': ['Data Analytics', 'SQL/DBMS', 'Big Data', 'Python'],
  'Data Engineer': ['Data Engineering', 'Big Data', 'Python', 'SQL/DBMS', 'Distributed Systems'],
  'Analytics Engineer': ['Data Engineering', 'Data Analytics', 'SQL/DBMS', 'Python'],
  'Data Scientist': ['AI & Machine Learning', 'Python', 'Data Analytics', 'R', 'Deep Learning'],
  'Machine Learning Engineer': ['AI & Machine Learning', 'Deep Learning', 'MLOps', 'Python'],
  'AI Engineer': ['Generative AI & LLMs', 'Vector DB & RAG', 'AI & Machine Learning', 'Python'],
  'Generative AI Engineer': ['Generative AI & LLMs', 'Prompt Engineering', 'Vector DB & RAG', 'Python'],
  'LLM Application Developer': ['Generative AI & LLMs', 'Vector DB & RAG', 'Python', 'TypeScript', 'REST APIs'],
  'NLP Engineer': ['AI & Machine Learning', 'Deep Learning', 'Python', 'Generative AI & LLMs'],
  'Computer Vision Engineer': ['AI & Machine Learning', 'Deep Learning', 'Python', 'C++'],
  'MLOps Engineer': ['MLOps', 'Docker & Kubernetes', 'DevOps', 'AI & Machine Learning', 'Cloud Computing'],
  'Research Engineer': ['AI & Machine Learning', 'Deep Learning', 'Python', 'DSA'],

  // Cloud, DevOps & Infrastructure
  'DevOps Engineer': ['DevOps', 'Docker & Kubernetes', 'Cloud Computing', 'Linux & Shell Scripting', 'Bash'],
  'Site Reliability Engineer (SRE)': ['Linux & Shell Scripting', 'Networking & Infrastructure', 'Performance & Optimization', 'DevOps', 'Distributed Systems'],
  'Cloud Engineer': ['Cloud Computing', 'Docker & Kubernetes', 'DevOps', 'Networking & Infrastructure'],
  'Cloud Architect': ['Cloud Computing', 'System Design', 'Software Architecture', 'Web Security'],
  'Infrastructure Engineer': ['Linux & Shell Scripting', 'Networking & Infrastructure', 'Cloud Computing', 'DevOps'],
  'Kubernetes Engineer': ['Docker & Kubernetes', 'DevOps', 'Cloud Computing', 'Linux & Shell Scripting'],
  'Systems Engineer': ['Operating Systems', 'Linux & Shell Scripting', 'Computer Networks', 'C', 'C++'],
  'Network Engineer': ['Computer Networks', 'Networking & Infrastructure', 'Cybersecurity', 'Linux & Shell Scripting'],
  'Database Administrator (DBA)': ['SQL/DBMS', 'Performance & Optimization', 'Linux & Shell Scripting', 'Data Engineering'],
  'Database Engineer': ['SQL/DBMS', 'Distributed Systems', 'Data Engineering', 'Performance & Optimization'],
  'Solutions Architect': ['Cloud Computing', 'System Design', 'Software Architecture', 'Microservices'],

  // Quality Assurance & Cybersecurity
  'QA Engineer': ['Testing & QA', 'REST APIs', 'Software Engineering', 'SQL/DBMS'],
  'Manual Test Engineer': ['Testing & QA', 'Software Engineering', 'SQL/DBMS'],
  'Automation Test Engineer': ['Testing & QA', 'Python', 'Java', 'JavaScript', 'REST APIs'],
  'SDET (Software Dev Engineer in Test)': ['Testing & QA', 'Java', 'Python', 'DSA', 'REST APIs'],
  'Performance Test Engineer': ['Testing & QA', 'Performance & Optimization', 'Computer Networks', 'Operating Systems'],
  'Security Engineer': ['Web Security', 'Cybersecurity', 'Networking & Infrastructure', 'Linux & Shell Scripting'],
  'Application Security Engineer': ['Web Security', 'REST APIs', 'Cybersecurity', 'Software Engineering'],
  'Penetration Tester': ['Cybersecurity', 'Web Security', 'Computer Networks', 'Linux & Shell Scripting'],
  'Cybersecurity Analyst': ['Cybersecurity', 'Networking & Infrastructure', 'Web Security', 'Operating Systems'],
  'SOC Analyst': ['Cybersecurity', 'Computer Networks', 'Linux & Shell Scripting', 'Operating Systems'],

  // Product, Design & Business Tech
  'Technical Product Manager': ['Software Engineering', 'System Design', 'REST APIs', 'Data Analytics'],
  'Product Manager': ['Software Engineering', 'Data Analytics', 'Full Stack'],
  'Technical Business Analyst': ['Software Engineering', 'SQL/DBMS', 'Data Analytics', 'REST APIs'],
  'Business Analyst': ['SQL/DBMS', 'Data Analytics', 'Software Engineering'],
  'UI/UX Designer': ['Accessibility & Performance', 'React', 'JavaScript', 'Full Stack'],
  'Technical Support Engineer': ['Computer Networks', 'Linux & Shell Scripting', 'SQL/DBMS', 'REST APIs'],
  'Implementation Engineer': ['REST APIs', 'SQL/DBMS', 'Computer Networks', 'Software Engineering'],
  'Solutions Engineer': ['REST APIs', 'Cloud Computing', 'System Design', 'Full Stack'],
  'Technical Consultant': ['Software Architecture', 'Cloud Computing', 'SQL/DBMS', 'Software Engineering'],
  'ERP / SAP Consultant': ['SQL/DBMS', 'Software Engineering', 'Data Engineering'],

  // Architecture & Engineering Leadership
  'Software Architect': ['System Design', 'Software Architecture', 'Distributed Systems', 'Microservices', 'Design Patterns'],
  'Technical Lead': ['Software Architecture', 'System Design', 'Design Patterns', 'Testing & QA', 'Software Engineering'],
  'Engineering Manager': ['Software Engineering', 'Software Architecture', 'System Design', 'Testing & QA']
};

// Experience Levels
export const EXPERIENCE_LEVELS = [
  { id: 'internship', label: 'Internship / Campus Placement', desc: 'Foundations, academics & problem-solving aptitude' },
  { id: 'fresher', label: 'Fresher / Entry-Level (0-1 yrs)', desc: 'Core syntax, basics, data structures & projects' },
  { id: 'junior', label: 'Junior (1-3 yrs)', desc: 'Practical production engineering, debugging & APIs' },
  { id: 'mid', label: 'Mid-Level / SDE-2 (3-5 yrs)', desc: 'Architecture, trade-offs, concurrency & deep performance' },
  { id: 'senior', label: 'Senior / Staff (5+ yrs)', desc: 'System design, leadership, resilience & distributed scale' }
];

// Difficulties
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

// Question Types
export const QUESTION_TYPES = [
  'conceptual',
  'coding',
  'sql',
  'debugging',
  'scenario',
  'output_prediction',
  'system_design'
];

// Interview Modes
export const INTERVIEW_MODES = [
  { id: 'mixed', label: 'Mixed Technical Interview', desc: 'Balanced combination of concepts, scenarios, and practical problem-solving' },
  { id: 'conceptual', label: 'Conceptual Technical Deep-Dive', desc: 'Deep dive into fundamental mechanisms, internals, and theoretical clarity' },
  { id: 'coding', label: 'Coding Round', desc: 'Data structures, algorithm challenges, complexity analysis, and edge cases' },
  { id: 'sql', label: 'SQL & Database Round', desc: 'Query authoring, optimization, transactions, and schema design' },
  { id: 'debugging', label: 'Debugging Round', desc: 'Diagnose tricky bugs, output prediction, and concurrency anomalies' },
  { id: 'system_design', label: 'System Design (LLD & HLD)', desc: 'High-level architecture, scalability, trade-offs, and microservices' },
  { id: 'scenario', label: 'Scenario-Based Interview', desc: 'Real-world production outages, incident management, and architecture decisions' },
  { id: 'role_specific', label: 'Role-Specific Deep Dive', desc: 'Tailored strictly to target job role responsibilities and daily tools' }
];

// Company Styles
export const COMPANY_STYLES = [
  { id: 'General Tech', label: 'General Tech', desc: 'Broad industry best practices and core engineering craft' },
  { id: 'FAANG / Big Tech', label: 'FAANG / Big Tech Style', desc: 'Rigorous scale, algorithmic depth, concurrency & high availability' },
  { id: 'High-Growth Startup', label: 'High-Growth Startup', desc: 'Agile problem solving, pragmatism, velocity & full-stack craftsmanship' },
  { id: 'Enterprise / FinTech', label: 'Enterprise / FinTech', desc: 'ACID transactions, data integrity, security & auditability' }
];

const CATEGORY_ALIASES = {
  'java': 'Java',
  'core java': 'Java',
  'python': 'Python',
  'py': 'Python',
  'c': 'C',
  'c++': 'C++',
  'cpp': 'C++',
  'c#': 'C#',
  'csharp': 'C#',
  'cs': 'C#',
  'dotnet': 'C#',
  '.net': 'C#',
  'javascript': 'JavaScript',
  'js': 'JavaScript',
  'typescript': 'TypeScript',
  'ts': 'TypeScript',
  'go': 'Go',
  'golang': 'Go',
  'ruby': 'Ruby',
  'php': 'PHP',
  'kotlin': 'Kotlin',
  'swift': 'Swift',
  'rust': 'Rust',
  'dart': 'Dart',
  'scala': 'Scala',
  'r': 'R',
  'perl': 'Perl',
  'bash': 'Bash',
  'shell': 'Bash',
  'bash / shell': 'Bash',
  'dsa': 'DSA',
  'data structures': 'DSA',
  'data structures & algorithms': 'DSA',
  'data structures and algorithms': 'DSA',
  'oop': 'OOP',
  'oops': 'OOP',
  'object-oriented programming': 'OOP',
  'object oriented programming': 'OOP',
  'sql': 'SQL/DBMS',
  'dbms': 'SQL/DBMS',
  'sql/dbms': 'SQL/DBMS',
  'sql & dbms': 'SQL/DBMS',
  'operating systems': 'Operating Systems',
  'os': 'Operating Systems',
  'computer networks': 'Computer Networks',
  'cn': 'Computer Networks',
  'networking': 'Computer Networks',
  'system design': 'System Design',
  'system design (lld & hld)': 'System Design',
  'system design (hld & lld)': 'System Design',
  'hld': 'System Design',
  'lld': 'System Design',
  'react': 'React',
  'reactjs': 'React',
  'node': 'Node.js',
  'nodejs': 'Node.js',
  'node.js': 'Node.js',
  'node.js & express': 'Node.js',
  'full stack': 'Full Stack',
  'fullstack': 'Full Stack',
  'full stack development': 'Full Stack',
  'software engineering': 'Software Engineering',
  'software engineering & sdlc': 'Software Engineering',
  'design patterns': 'Design Patterns',
  'design patterns & solid': 'Design Patterns',
  'rest apis': 'REST APIs',
  'rest api': 'REST APIs',
  'rest apis & api design': 'REST APIs',
  'competitive programming': 'Competitive Programming',
  'git': 'Git & Version Control',
  'git & version control': 'Git & Version Control',
  'testing & qa': 'Testing & QA',
  'testing & debugging': 'Testing & QA',
  'qa': 'Testing & QA',
  'software architecture': 'Software Architecture',
  'distributed systems': 'Distributed Systems',
  'microservices': 'Microservices',
  'microservices architecture': 'Microservices',
  'web security': 'Web Security',
  'web & application security': 'Web Security',
  'security': 'Web Security',
  'performance & optimization': 'Performance & Optimization',
  'cloud computing': 'Cloud Computing',
  'cloud': 'Cloud Computing',
  'devops': 'DevOps',
  'devops & ci/cd': 'DevOps',
  'docker & kubernetes': 'Docker & Kubernetes',
  'docker': 'Docker & Kubernetes',
  'kubernetes': 'Docker & Kubernetes',
  'k8s': 'Docker & Kubernetes',
  'linux & shell scripting': 'Linux & Shell Scripting',
  'linux': 'Linux & Shell Scripting',
  'networking & infrastructure': 'Networking & Infrastructure',
  'data engineering': 'Data Engineering',
  'data analytics': 'Data Analytics',
  'ai & machine learning': 'AI & Machine Learning',
  'artificial intelligence & ml': 'AI & Machine Learning',
  'ai/ml': 'AI & Machine Learning',
  'machine learning': 'AI & Machine Learning',
  'deep learning': 'Deep Learning',
  'generative ai & llms': 'Generative AI & LLMs',
  'genai': 'Generative AI & LLMs',
  'generative ai': 'Generative AI & LLMs',
  'prompt engineering': 'Prompt Engineering',
  'vector db & rag': 'Vector DB & RAG',
  'rag': 'Vector DB & RAG',
  'mlops': 'MLOps',
  'big data': 'Big Data',
  'cybersecurity': 'Cybersecurity',
  'blockchain': 'Blockchain',
  'mobile development': 'Mobile Development',
  'accessibility & performance': 'Accessibility & Performance'
};

/**
 * Normalizes any category string (ID, label, alias, or case variation)
 * to its canonical category ID.
 */
export const normalizeCategory = (cat) => {
  if (!cat || typeof cat !== 'string') return null;
  const trimmed = cat.trim();
  const lower = trimmed.toLowerCase();

  // 1. Direct alias match
  if (CATEGORY_ALIASES[lower]) {
    return CATEGORY_ALIASES[lower];
  }

  // 2. Exact or case-insensitive match on ID or name
  for (const c of ALL_CATEGORIES) {
    if (c.id.toLowerCase() === lower || (c.name && c.name.toLowerCase() === lower)) {
      return c.id;
    }
  }

  return trimmed;
};

export const INTERVIEW_CATALOG = {
  languages: PROGRAMMING_LANGUAGES,
  subjects: TECHNICAL_SUBJECTS,
  categories: ALL_CATEGORIES,
  roleGroups: ROLE_GROUPS,
  targetRoles: ALL_ROLES,
  roleSuggestions: ROLE_SUGGESTIONS,
  experienceLevels: EXPERIENCE_LEVELS,
  difficulties: DIFFICULTIES,
  questionTypes: QUESTION_TYPES,
  interviewModes: INTERVIEW_MODES,
  companyStyles: COMPANY_STYLES,
  normalizeCategory
};

export default INTERVIEW_CATALOG;
