import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sliders, 
  Layers, 
  Clock, 
  FileCode2, 
  Database, 
  Cpu, 
  Network, 
  Box, 
  Terminal,
  Briefcase,
  Workflow,
  Building2,
  RefreshCw,
  Search,
  Code,
  ShieldCheck,
  Smartphone,
  Activity,
  Brain,
  Zap,
  Lock,
  Target,
  Mic
} from 'lucide-react';
import Button from '../components/ui/Button';
import UserMenu from '../components/UserMenu';
import '../styles/auth.css';

const ICON_MAP = {
  FileCode2,
  Terminal,
  Cpu,
  Layers,
  Box,
  Sparkles,
  Database,
  Network,
  Code,
  Workflow,
  Briefcase,
  ShieldCheck,
  Smartphone,
  Activity,
  CheckCircle2
};

const FALLBACK_LANGUAGES = [
  { id: 'Java', label: 'Java', iconName: 'FileCode2', desc: 'Core Java, Collections, Multithreading, JVM & Memory' },
  { id: 'Python', label: 'Python', iconName: 'Terminal', desc: 'Data types, Generators, Decorators, OOP, GIL, Asyncio & Concurrency' },
  { id: 'C', label: 'C', iconName: 'Cpu', desc: 'Pointers, Memory Allocation, Pointer Arithmetic, Structs & Preprocessing' },
  { id: 'C++', label: 'C++', iconName: 'Cpu', desc: 'OOP, STL Containers, Smart Pointers, RAII, Templates & Modern C++' },
  { id: 'C#', label: 'C#', iconName: 'Box', desc: 'CLR, .NET Runtime, LINQ, Async/Await, Delegates & ASP.NET Core' },
  { id: 'JavaScript', label: 'JavaScript', iconName: 'Terminal', desc: 'Scope, Closures, Event Loop, Prototypes, Promises & ES6+ Modules' },
  { id: 'TypeScript', label: 'TypeScript', iconName: 'FileCode2', desc: 'Types, Interfaces, Generics, Narrowing, Utility Types & Type Inference' },
  { id: 'Go', label: 'Go (Golang)', iconName: 'Cpu', desc: 'Goroutines, Channels, Interfaces, Slices, Memory & Concurrency Patterns' },
  { id: 'Ruby', label: 'Ruby', iconName: 'Box', desc: 'Blocks, Procs, Lambdas, Modules, Mixins, Metaprogramming & Rails' },
  { id: 'PHP', label: 'PHP', iconName: 'Terminal', desc: 'Type System, OOP, Namespaces, Composer, PDO, Security & Laravel' },
  { id: 'Kotlin', label: 'Kotlin', iconName: 'Sparkles', desc: 'Null Safety, Data Classes, Coroutines, Extensions & Android/JVM Interop' },
  { id: 'Swift', label: 'Swift', iconName: 'Sparkles', desc: 'Optionals, Protocols, Struct vs Class, ARC, Closures & SwiftUI' },
  { id: 'Rust', label: 'Rust', iconName: 'Cpu', desc: 'Ownership, Borrowing, Lifetimes, Traits, Concurrency & Pattern Matching' },
  { id: 'Dart', label: 'Dart', iconName: 'Sparkles', desc: 'Sound Null Safety, Futures, Streams, Event Loop & Flutter Architecture' },
  { id: 'Scala', label: 'Scala', iconName: 'Layers', desc: 'Functional Programming, Pattern Matching, Traits, Implicits & Spark' },
  { id: 'R', label: 'R', iconName: 'Database', desc: 'Vectors, Data Frames, Functional Programming, Tidyverse & Modeling' },
  { id: 'Perl', label: 'Perl', iconName: 'Terminal', desc: 'Regular Expressions, Hashes, Scalars, References, Text & File I/O' },
  { id: 'Bash', label: 'Bash / Shell', iconName: 'Terminal', desc: 'POSIX Shell, Pipes, Redirection, Grep, Sed, Awk & Processes' }
];

const FALLBACK_SUBJECTS = [
  { id: 'DSA', label: 'Data Structures & Algorithms', iconName: 'Layers', desc: 'Arrays, Trees, Graphs, Dynamic Programming & Complexity Analysis' },
  { id: 'OOP', label: 'Object-Oriented Programming', iconName: 'Box', desc: 'Encapsulation, Inheritance, Polymorphism, Abstraction & Design Patterns' },
  { id: 'SQL/DBMS', label: 'SQL & DBMS', iconName: 'Database', desc: 'Queries, Indexing, Transactions, Normalization, ACID & Query Optimization' },
  { id: 'Operating Systems', label: 'Operating Systems', iconName: 'Cpu', desc: 'Processes, Threads, CPU Scheduling, Virtual Memory, Concurrency & Deadlocks' },
  { id: 'Computer Networks', label: 'Computer Networks', iconName: 'Network', desc: 'OSI Model, TCP/IP, DNS, HTTP/HTTPS, Sockets, Proxies & Subnetting' },
  { id: 'System Design', label: 'System Design (HLD & LLD)', iconName: 'Layers', desc: 'High-Level Architecture, Scalability, Caching, Databases & Microservices' },
  { id: 'React', label: 'React', iconName: 'Sparkles', desc: 'Hooks, Virtual DOM, State Management, Component Lifecycle & Performance' },
  { id: 'Node.js', label: 'Node.js & Express', iconName: 'Cpu', desc: 'Event Loop, Libuv, Streams, Express Middleware, REST APIs & Security' },
  { id: 'Full Stack', label: 'Full Stack Development', iconName: 'Box', desc: 'Client-Server Communication, HTTP, Security, Deployment & System Integration' },
  { id: 'Software Engineering', label: 'Software Engineering & SDLC', iconName: 'Workflow', desc: 'SDLC, Agile/Scrum, Requirements Engineering, Clean Code & Estimation' },
  { id: 'Design Patterns', label: 'Design Patterns & SOLID', iconName: 'Box', desc: 'SOLID, Creational, Structural & Behavioral Gang of Four Patterns' },
  { id: 'REST APIs', label: 'REST APIs & API Design', iconName: 'Network', desc: 'REST Constraints, Status Codes, Versioning, Rate Limiting & OpenAPI' },
  { id: 'Competitive Programming', label: 'Competitive Programming', iconName: 'Layers', desc: 'Bit Manipulation, Number Theory, Fenwick Trees, Segment Trees & DP' },
  { id: 'Git & Version Control', label: 'Git & Version Control', iconName: 'Workflow', desc: 'Branching, Merging, Rebase, Cherry-Pick, Conflict Resolution & Internals' },
  { id: 'Testing & QA', label: 'Testing & Debugging', iconName: 'CheckCircle2', desc: 'Unit, Integration, E2E Testing, TDD/BDD, Mocking & Profiling' },
  { id: 'Software Architecture', label: 'Software Architecture', iconName: 'Layers', desc: 'Clean Architecture, Hexagonal, Monolith vs Distributed & Event-Driven' },
  { id: 'Distributed Systems', label: 'Distributed Systems', iconName: 'Layers', desc: 'Consensus (Raft/Paxos), CAP Theorem, Replication, Quorums & Gossip' },
  { id: 'Microservices', label: 'Microservices Architecture', iconName: 'Box', desc: 'Service Discovery, API Gateways, Saga Pattern, Circuit Breakers & Observability' },
  { id: 'Web Security', label: 'Web & Application Security', iconName: 'ShieldCheck', desc: 'OWASP Top 10, XSS, CSRF, SQLi, CORS, OAuth2, JWT Security & Cryptography' },
  { id: 'Performance & Optimization', label: 'Performance & Optimization', iconName: 'Cpu', desc: 'Profiling, Memory Leaks, Latency Optimization, Caching & Concurrency' },
  { id: 'Cloud Computing', label: 'Cloud Computing (AWS / GCP / Azure)', iconName: 'Layers', desc: 'Compute, Serverless, IAM, VPC, Object Storage & Cloud Architecture' },
  { id: 'DevOps', label: 'DevOps & CI/CD', iconName: 'Workflow', desc: 'CI/CD Pipelines, GitHub Actions, Infrastructure as Code, Terraform & GitOps' },
  { id: 'Docker & Kubernetes', label: 'Docker & Kubernetes', iconName: 'Box', desc: 'Containers, Multi-stage Builds, Pods, Deployments, Services & Ingress' },
  { id: 'Linux & Shell Scripting', label: 'Linux & Shell Scripting', iconName: 'Terminal', desc: 'File Permissions, Process Hierarchy, Cron, Sysadmin, Sed, Awk & Bash' },
  { id: 'Networking & Infrastructure', label: 'Networking & Infrastructure', iconName: 'Network', desc: 'BGP, Routing, Firewalls, Load Balancers, VPNs, NAT & TLS Termination' },
  { id: 'Data Engineering', label: 'Data Engineering & Big Data', iconName: 'Database', desc: 'ETL/ELT Pipelines, Spark, Airflow, Data Warehouses & Streaming (Kafka)' },
  { id: 'Data Analytics', label: 'Data Analytics & Business Intelligence', iconName: 'Database', desc: 'SQL Analytics, Aggregation, Cohorts, Retention, Dashboards & BI Tools' },
  { id: 'AI & Machine Learning', label: 'Artificial Intelligence & ML', iconName: 'Sparkles', desc: 'Supervised/Unsupervised Learning, Regression, Classification & Metrics' },
  { id: 'Deep Learning', label: 'Deep Learning & Neural Networks', iconName: 'Cpu', desc: 'Backpropagation, CNNs, RNNs, Transformers, Attention & Optimization' },
  { id: 'Generative AI & LLMs', label: 'Generative AI & LLMs', iconName: 'Sparkles', desc: 'LLM Architectures, Prompting, Fine-Tuning, Quantization & Sampling' },
  { id: 'Prompt Engineering', label: 'Prompt Engineering & Context Design', iconName: 'Sparkles', desc: 'Few-Shot, Chain-of-Thought, ReAct, Guardrails & Evaluation Benchmarks' },
  { id: 'Vector DB & RAG', label: 'Vector Databases & RAG', iconName: 'Database', desc: 'Embeddings, Similarity Metrics, Chunking, Hybrid Search & Re-Ranking' },
  { id: 'MLOps', label: 'MLOps & ML Engineering', iconName: 'Workflow', desc: 'Model Registry, MLflow, Drift Detection, Feature Stores & Deployment' },
  { id: 'Big Data', label: 'Big Data Technologies', iconName: 'Database', desc: 'Hadoop, HDFS, Spark, MapReduce, Cassandra, Hive & Distributed Storage' },
  { id: 'Cybersecurity', label: 'Cybersecurity Fundamentals & SOC', iconName: 'ShieldCheck', desc: 'Threat Modeling, Network Defense, SIEM, Incident Response & Zero Trust' },
  { id: 'Blockchain', label: 'Blockchain Fundamentals', iconName: 'Box', desc: 'Consensus (PoW, PoS), Smart Contracts, Cryptography, EVM & Web3 Architecture' },
  { id: 'Mobile Development', label: 'Mobile Application Development', iconName: 'Smartphone', desc: 'iOS & Android Lifecycles, State Management, Offline Storage & Native APIs' },
  { id: 'Accessibility & Performance', label: 'Accessibility & Web Performance', iconName: 'Activity', desc: 'WCAG 2.1, Core Web Vitals (LCP, FID, CLS), ARIA & Critical Rendering Path' }
];

const CATEGORIES = FALLBACK_SUBJECTS;

const DEFAULT_TOPICS = {
  Java: [
    'Core Java & JVM Internals',
    'Collections Framework & Generics',
    'Multithreading, Concurrency & JMM',
    'Memory Management & Garbage Collection',
    'Java Streams, Lambdas & Modern Java',
    'SOLID Principles & Design Patterns'
  ],
  DSA: [
    'Arrays, Strings & Two Pointers',
    'Hashing & Frequency Counting',
    'Binary Search & Sliding Window',
    'Linked Lists, Stacks & Queues',
    'Trees, BST & Tree Traversals',
    'Graphs, BFS, DFS & Shortest Path',
    'Dynamic Programming & Recursion'
  ],
  'SQL/DBMS': [
    'Basic & Advanced SELECT, Filtering, Aggregation',
    'JOINs, Subqueries & Set Operations',
    'Window Functions, Ranking & CTEs',
    'Indexes, B-Trees & Query Optimization',
    'Transactions, ACID Properties & Concurrency',
    'Database Normalization & Constraints'
  ],
  JavaScript: [
    'Execution Context, Scope & Closures',
    'this, Call, Apply, Bind & Prototypes',
    'Event Loop, Microtasks & Asynchronous JS',
    'Promises, Async/Await & Error Handling',
    'ES6+ Features, Destructuring & Modules',
    'Output Prediction & Tricky Mechanics'
  ],
  React: [
    'Hooks (useState, useEffect, useMemo, useCallback)',
    'Components, Props & State Management',
    'Virtual DOM, Reconciliation & Fiber',
    'Performance Optimization & Memoization',
    'Context API & Global State Management',
    'Error Boundaries, Routing & Architecture'
  ],
  'Node.js': [
    'Node.js Runtime, Libuv & Event Loop',
    'Streams, Buffers & File System',
    'Express Routing, Middleware & Architecture',
    'REST API Design & Centralized Error Handling',
    'Authentication, JWT, Cookies & Security',
    'Performance, Caching & Rate Limiting'
  ],
  'Full Stack': [
    'Frontend-Backend API Contracts & HTTP Protocol',
    'Authentication Flows (JWT, Sessions, OAuth)',
    'Web Security (CORS, CSRF, XSS, SQLi)',
    'Database Integration, Pagination & Filtering',
    'Deployment, Environment Config & CI/CD',
    'Real-World Debugging & System Troubleshooting'
  ],
  OOP: [
    'The 4 Pillars of OOP',
    'Inheritance vs Composition',
    'Interfaces vs Abstract Classes',
    'SOLID Design Principles',
    'Creational Design Patterns (Singleton, Factory, Builder)',
    'Structural & Behavioral Design Patterns (Observer, Strategy)'
  ],
  'Computer Networks': [
    'OSI Model & TCP/IP Layer Architecture',
    'TCP vs UDP & 3-Way Handshake / Termination',
    'DNS Resolution & Domain Routing',
    'HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS',
    'IP Addressing, CIDR & Subnetting',
    'Load Balancers, Reverse Proxies & NAT'
  ],
  'Operating Systems': [
    'Processes vs Threads & Context Switching',
    'CPU Scheduling Algorithms (FCFS, SJF, RR, Priority)',
    'Process Synchronization, Mutex & Semaphores',
    'Race Conditions, Critical Sections & Deadlocks',
    'Paging, Segmentation & Virtual Memory',
    'Page Replacement Algorithms (FIFO, LRU, Optimal)'
  ],
  'System Design': [
    'Scalability (Vertical vs Horizontal) & Availability',
    'Load Balancing & Reverse Proxies',
    'Caching Strategies (Redis, Memcached, Cache-Aside)',
    'SQL vs NoSQL & CAP Theorem',
    'Database Sharding, Partitioning & Replication',
    'Classic HLD: URL Shortener, Notification Service, Chat App'
  ],
  Python: [
    'Data Types, Mutability & Memory Model',
    'Lists, Tuples, Dictionaries & Sets',
    'Comprehensions, Iterators & Generators',
    'Decorators, Context Managers & Closures',
    'Object-Oriented Python & Magic Methods',
    'GIL (Global Interpreter Lock) & Threading vs Multiprocessing',
    'Asyncio & Asynchronous Programming',
    'Unit Testing, PyTest & Mocking'
  ],
  C: [
    'Pointers & Memory Addresses',
    'Dynamic Memory Allocation (malloc, calloc, realloc, free)',
    'Pointer Arithmetic & Multi-dimensional Arrays',
    'Strings & String Manipulation Mechanics',
    'Structures, Unions & Bit Fields',
    'Undefined Behavior, Segmentation Faults & Memory Leaks'
  ],
  'C++': [
    'OOP, Inheritance, Virtual Functions & VTable',
    'STL Containers (vector, map, unordered_map, set)',
    'Templates, Metaprogramming & Type Traits',
    'Smart Pointers (unique_ptr, shared_ptr, weak_ptr)',
    'RAII (Resource Acquisition Is Initialization)',
    'Move Semantics, Rvalue References & std::move'
  ],
  'C#': [
    'CLR Internals, JIT Compilation & IL Code',
    '.NET Memory Management & Garbage Collection',
    'LINQ (Language Integrated Query) & Expressions',
    'Collections, Generics & Thread-Safe Collections',
    'Asynchronous Programming (async, await, Task)',
    'ASP.NET Core Architecture, Middleware & Dependency Injection'
  ],
  TypeScript: [
    'Primitive Types, Type Annotations & Type Inference',
    'Interfaces vs Type Aliases & Declaration Merging',
    'Generics, Constraints & Default Type Arguments',
    'Type Narrowing, Guards (typeof, instanceof, custom is)',
    'Utility Types (Partial, Required, Pick, Omit, Record, Readonly)'
  ],
  Go: [
    'Goroutines & Go Runtime Scheduler',
    'Channels (Buffered, Unbuffered) & select Statement',
    'Sync Package (Mutex, RWMutex, WaitGroup, Once)',
    'Interfaces, Implicit Implementation & Type Assertions',
    'Slices, Arrays, Capacities & Append Mechanics'
  ],
  Rust: [
    'Ownership System, Move Semantics & Copy vs Clone',
    'Borrowing, References (&T, &mut T) & Borrow Checker Rules',
    'Lifetimes, Lifetime Annotations (\'a) & Elision Rules',
    'Structs, Enums & Exhaustive Pattern Matching',
    'Smart Pointers: Box, Rc, Arc, RefCell & Interior Mutability'
  ],
  Bash: [
    'Pipes, Input/Output Redirection & File Descriptors',
    'Variables, Quoting Rules (\' vs ") & Parameter Expansion',
    'Exit Codes, Conditionals (if, test, [[]]) & Logical Operators',
    'Stream Editors & Text Processing: grep, sed & awk',
    'Process Management: Backgrounding, Signals (trap), ps & kill'
  ],
  Ruby: [
    'Blocks, Procs and Lambdas & Closures',
    'Modules, Mixins & Method Lookup Hierarchy',
    'Object Model, Classes & Inheritance',
    'Ruby on Rails MVC Architecture & ActiveRecord'
  ],
  PHP: [
    'PHP Type System & Strict Types',
    'OOP, Classes, Interfaces, Abstract Classes & Traits',
    'Database Operations with PDO & Prepared Statements',
    'Security: SQL Injection, XSS, CSRF & Input Sanitization'
  ],
  Kotlin: [
    'Null Safety, Safe Call (?.) & Elvis Operator (?:)',
    'Data Classes, Sealed Classes & Enum Classes',
    'Coroutines, Dispatchers, Scopes & Flow',
    'Extension Functions & Extension Properties'
  ],
  Swift: [
    'Optionals, Optional Binding & Chaining',
    'Value Types vs Reference Types',
    'ARC (Automatic Reference Counting) & Retain Cycles',
    'Swift Concurrency: async/await, Actors & Task Groups'
  ],
  Dart: [
    'Sound Null Safety & Type Inference',
    'Classes, Constructors (Named, Factory, Const) & Mixins',
    'Asynchronous Programming: Future, async/await & Event Loop',
    'Streams, StreamControllers & Reactive Programming',
    'Flutter Widget Lifecycle & State Management',
    'Platform Channels & Native Interoperability'
  ],
  Scala: [
    'Functional Programming Paradigms & Immutability',
    'Case Classes, Sealed Traits & Pattern Matching',
    'Higher-Order Functions, Currying & Partial Application',
    'Traits, Multiple Inheritance & Linearization',
    'Given, Using & Context Parameters vs Implicits',
    'Concurrency, Futures & Akka Actors'
  ],
  R: [
    'Data Structures: Vectors, Lists, Matrices, Data Frames',
    'Vectorization & Avoiding Explicit Loops',
    'Functional Programming with apply, lapply, sapply & purrr',
    'Data Wrangling with dplyr & tidyr',
    'Data Visualization with ggplot2',
    'Statistical Hypothesis Testing & Regression Analysis'
  ],
  Perl: [
    'Scalars, Arrays, Hashes & Context (Scalar vs List)',
    'Regular Expressions & Pattern Matching Mastery',
    'References, Complex Data Structures & Dereferencing',
    'File Handling, File Tests & Stream I/O',
    'Subroutines, Parameter Passing & Scope (my, our, local)',
    'Packages, Modules & CPAN Ecosystem'
  ],
  'Software Engineering': [
    'Software Development Life Cycle (SDLC) Models',
    'Agile, Scrum, Kanban & Sprint Ceremonies',
    'Requirements Engineering & User Stories',
    'Code Quality, Static Analysis & Refactoring',
    'CI/CD Pipelines & Continuous Delivery',
    'Technical Debt & Estimation Techniques'
  ],
  'Design Patterns': [
    'SOLID Principles & Clean Code Design',
    'Creational Patterns: Singleton, Factory Method, Abstract Factory, Builder',
    'Structural Patterns: Adapter, Decorator, Facade, Composite, Proxy',
    'Behavioral Patterns: Observer, Strategy, Command, Chain of Responsibility',
    'Pattern Trade-Offs & Anti-Patterns'
  ],
  'REST APIs': [
    'REST Architectural Constraints & Statelessness',
    'HTTP Methods (GET, POST, PUT, PATCH, DELETE) & Idempotency',
    'HTTP Status Code Mastery (2xx, 3xx, 4xx, 5xx)',
    'API Versioning Strategies (URI, Header, Query)',
    'Pagination, Filtering & Sorting Best Practices',
    'Rate Limiting (Token Bucket, Leaky Bucket)',
    'OpenAPI / Swagger Documentation Standards'
  ],
  'Competitive Programming': [
    'Fast I/O & Time Complexity Optimization (O(10^8) rule)',
    'Bit Manipulation & Bitmask Dynamic Programming',
    'Number Theory: Sieve of Eratosthenes, GCD & Modular Arithmetic',
    'Binary Exponentiation & Matrix Exponentiation',
    'Segment Trees, Fenwick Trees (Binary Indexed Trees)',
    'Shortest Path: Dijkstra, Bellman-Ford, Floyd-Warshall'
  ],
  'Git & Version Control': [
    'Git Object Model (Blobs, Trees, Commits, Tags)',
    'Branching, Merging & Fast-Forward vs 3-Way Merge',
    'Rebase vs Merge & Interactive Rebase Workflow',
    'Merge Conflicts, Resolving Strategies & git rerere',
    'Cherry-pick, Revert & Reset (Soft, Mixed, Hard)',
    'Git Stash, Reflog & Recovering Lost Commits'
  ],
  'Testing & QA': [
    'Test Pyramid: Unit, Integration, Component & E2E',
    'Test-Driven Development (TDD) & Behavior-Driven Development (BDD)',
    'Mocking, Stubbing, Spies & Dependency Injection',
    'Code Coverage Metrics & Mutation Testing',
    'Regression Testing & Automated Test Suites',
    'Flaky Tests Diagnosis & Mitigation'
  ],
  'Software Architecture': [
    'Clean Architecture & Onion / Hexagonal Architecture',
    'Monolith vs Microservices vs Modular Monolith',
    'Event-Driven Architecture & Message Brokers',
    'CQRS (Command Query Responsibility Segregation) & Event Sourcing',
    'Architecture Trade-Off Analysis & ADRs'
  ],
  'Distributed Systems': [
    'Consensus Algorithms: Raft vs Paxos',
    'CAP Theorem, PACELC & Consistency Models',
    'Replication Strategies: Leader-Follower, Multi-Leader, Leaderless',
    'Split-Brain Scenarios, Quorums & Fencing Tokens',
    'Distributed Transactions: 2PC vs Saga Pattern',
    'Gossip Protocols, Vector Clocks & CRDTs'
  ],
  'Microservices': [
    'Service Decomposition Patterns & Domain-Driven Design (DDD)',
    'API Gateway Pattern, Reverse Proxies & BFF (Backend for Frontend)',
    'Inter-Service Communication: REST vs gRPC vs Message Queues',
    'Saga Pattern (Choreography vs Orchestration)',
    'Circuit Breaker Pattern, Bulkheads & Retry Policies',
    'Distributed Tracing (OpenTelemetry, Jaeger) & Observability'
  ],
  'Web Security': [
    'OWASP Top 10 Vulnerabilities & Mitigations',
    'Cross-Site Scripting (XSS: Stored, Reflected, DOM-based)',
    'Cross-Site Request Forgery (CSRF) & SameSite Cookie Policies',
    'SQL Injection & Blind SQLi Prevention',
    'CORS (Cross-Origin Resource Sharing) Preflight & Headers',
    'Authentication Security: JWT Pitfalls, Session Fixation, Brute Force'
  ],
  'Performance & Optimization': [
    'CPU & Memory Profiling, Flame Graphs & Heap Dumps',
    'Database Query Optimization & EXPLAIN Query Plans',
    'Caching Architectures (Client, Edge CDN, In-Memory Redis)',
    'Concurrency Bottlenecks, Lock Contention & Thread Pools',
    'Network Latency Reduction: Keep-Alive, HTTP/2 Multiplexing'
  ],
  'Cloud Computing': [
    'Cloud Service Models: IaaS vs PaaS vs SaaS vs FaaS',
    'AWS / Cloud Core Services (Compute, S3, RDS, DynamoDB)',
    'Virtual Private Cloud (VPC), Subnets, Route Tables & NAT Gateways',
    'Identity and Access Management (IAM) Roles, Policies & Least Privilege',
    'Serverless Architecture (AWS Lambda, Cloud Functions, Cold Starts)',
    'High Availability, Multi-AZ & Multi-Region Disaster Recovery'
  ],
  'DevOps': [
    'CI/CD Pipelines: Build, Test, Security Scan & Automated Deployment',
    'Infrastructure as Code (IaC) with Terraform & CloudFormation',
    'Deployment Strategies: Blue/Green, Canary, Rolling, Feature Flags',
    'GitOps Principles with ArgoCD / Flux',
    'Monitoring, Metrics, Alerting & SLA/SLO/SLI Definitions'
  ],
  'Docker & Kubernetes': [
    'Container Internals: Linux Namespaces, Cgroups & UnionFS',
    'Dockerfile Best Practices & Multi-Stage Production Builds',
    'Container Networking & Volume Persistence',
    'Kubernetes Architecture: Control Plane vs Worker Nodes',
    'Pods, ReplicaSets, Deployments & DaemonSets',
    'Services (ClusterIP, NodePort, LoadBalancer) & Ingress Controllers',
    'ConfigMaps, Secrets & Environment Injection'
  ],
  'Linux & Shell Scripting': [
    'Linux Directory Hierarchy & Filesystem Permissions (chmod, chown, umask)',
    'Process Management: fork/exec, PID, Signals, Backgrounding & kill',
    'Pipes, I/O Redirection & Standard Descriptors (0, 1, 2)',
    'Text Processing Power Tools: grep, sed, awk & cut',
    'System Monitoring: top, htop, vmstat, iostat, netstat & journalctl',
    'Cron Jobs & Systemd Service Management'
  ],
  'Networking & Infrastructure': [
    'BGP, OSPF & Autonomous System Routing',
    'Load Balancing Algorithms (Round Robin, Least Connections, IP Hash)',
    'Stateful Firewalls, Security Groups & iptables',
    'VPNs, IPsec, WireGuard & Tunneling Protocols',
    'NAT (Network Address Translation) & Port Forwarding',
    'TLS/SSL Handshake, Public Key Infrastructure (PKI) & Certificates'
  ],
  'Data Engineering': [
    'ETL vs ELT Architecture & Pipeline Design',
    'Batch vs Stream Processing Paradigms',
    'Distributed Data Processing with Apache Spark (RDDs, DataFrames)',
    'Workflow Orchestration with Apache Airflow (DAGs, Operators)',
    'Data Warehouses (Snowflake, BigQuery, Redshift) vs Data Lakes',
    'Data Quality, Schema Evolution & Idempotent Pipelines'
  ],
  'Data Analytics': [
    'Exploratory Data Analysis (EDA) Techniques',
    'Advanced SQL Analytics: Window Functions, Rolling Averages & CTEs',
    'Cohort Analysis, Churn Rates & Retention Calculations',
    'Business Metrics & KPIs (LTV, CAC, Conversion Funnels)',
    'A/B Testing Methodology, Sample Sizes & Statistical Significance',
    'Data Visualization Best Practices & Dashboard Storytelling'
  ],
  'AI & Machine Learning': [
    'Supervised vs Unsupervised vs Reinforcement Learning',
    'Overfitting, Underfitting & Bias-Variance Trade-off',
    'Regularization Techniques (L1 Lasso, L2 Ridge, Dropout)',
    'Evaluation Metrics: Precision, Recall, F1-Score, ROC-AUC',
    'Ensemble Methods: Random Forests, Gradient Boosting (XGBoost, LightGBM)',
    'Feature Engineering, Scaling & Missing Value Imputation'
  ],
  'Deep Learning': [
    'Neural Network Architectures & Forward/Backward Propagation',
    'Activation Functions: ReLU, GeLU, Sigmoid, Softmax',
    'Optimization Algorithms: SGD, Momentum, Adam, AdamW',
    'Convolutional Neural Networks (CNNs) & Computer Vision',
    'Transformers, Self-Attention Mechanism & Multi-Head Attention',
    'Vanishing/Exploding Gradient Problems & Normalization (BatchNorm, LayerNorm)'
  ],
  'Generative AI & LLMs': [
    'Large Language Model Architectures (Decoder-only vs Encoder-Decoder)',
    'Tokenization, Context Windows & Temperature/Top-P Controls',
    'Prompt Engineering: Few-Shot, Chain-of-Thought & System Prompts',
    'Retrieval-Augmented Generation (RAG) Architecture',
    'Fine-Tuning Techniques (Full, PEFT, LoRA, QLoRA)',
    'Hallucination Mitigation, Grounding & Automated Guardrails'
  ],
  'Prompt Engineering': [
    'Zero-Shot vs Few-Shot Prompting Strategies',
    'Chain-of-Thought (CoT) & Tree-of-Thoughts Reasoning',
    'ReAct (Reason + Act) Framework for LLM Agents',
    'System Prompt Architecture & Persona Conditioning',
    'Prompt Injection Vulnerabilities & Security Guardrails',
    'Automated Prompt Optimization & Evaluation Benchmarks'
  ],
  'Vector DB & RAG': [
    'Text Embeddings, Dimensionality & Semantic Vector Space',
    'Vector Similarity Metrics: Cosine Similarity, Dot Product, Euclidean',
    'Vector Indexing Algorithms: HNSW, IVF & Flat Indexing',
    'Document Chunking Strategies & Overlap Trade-Offs',
    'Hybrid Search: Combining Dense Vectors with BM25 Sparse Search',
    'Reranking Models (Cross-Encoders) & Context Filtering'
  ],
  'MLOps': [
    'Machine Learning Life Cycle & MLOps Maturity Levels',
    'Model Versioning & Experiment Tracking with MLflow / W&B',
    'Data Drift vs Concept Drift & Monitoring Techniques',
    'Feature Stores (Feast, Hopsworks) & Online/Offline Consistency',
    'Model Serving & Low-Latency Inference (Triton, TorchServe)',
    'Continuous Training (CT) Pipelines & Automated Retraining Triggers'
  ],
  'Big Data': [
    'Hadoop Ecosystem: HDFS Architecture & MapReduce Paradigm',
    'Apache Spark Architecture: Driver, Executors & Memory Management',
    'NoSQL Storage: Wide-Column (Cassandra), Document (MongoDB), Key-Value (Redis)',
    'Partitioning Strategies, Sharding & Hotspot Avoidance',
    'Stream Ingestion: Apache Kafka (Topics, Partitions, Consumer Groups)'
  ],
  'Cybersecurity': [
    'CIA Triad (Confidentiality, Integrity, Availability) & Defense-in-Depth',
    'Zero Trust Architecture & Least Privilege Access',
    'Threat Modeling Frameworks (STRIDE, PASTA, MITRE ATT&CK)',
    'Network Security: Firewalls, IDS/IPS, SIEM & SOC Workflow',
    'Vulnerability Assessment, Penetration Testing & Patch Management',
    'Incident Response Life Cycle (NIST / SANS Frameworks)'
  ],
  'Blockchain': [
    'Blockchain Fundamentals: Blocks, Chains, Hashing & Immutability',
    'Consensus Mechanisms: Proof of Work (PoW) vs Proof of Stake (PoS)',
    'Cryptographic Primitives: Public/Private Keys, ECDSA & Merkle Trees',
    'Smart Contracts & Ethereum Virtual Machine (EVM)',
    'Smart Contract Security: Reentrancy, Front-Running & Integer Overflows',
    'Web3 Architecture & Decentralized Applications (dApps)'
  ],
  'Mobile Development': [
    'Mobile App Architecture (MVC, MVVM, MVI) in iOS & Android',
    'Activity, Fragment & View Controller Lifecycles',
    'State Management in Flutter, React Native, Swift & Jetpack Compose',
    'Offline Data Storage: Room, SQLite, CoreData, Realm',
    'Push Notifications (APNs, FCM) & Background Tasks',
    'Mobile Performance Optimization: App Startup Time, Memory & Battery Usage'
  ],
  'Accessibility & Performance': [
    'WCAG 2.1 Guidelines & Compliance Levels (A, AA, AAA)',
    'Semantic HTML5 & Accessible Name Computation',
    'WAI-ARIA Roles, States & Properties',
    'Keyboard Navigation, Focus Trapping & Skip Links',
    'Core Web Vitals: LCP (Largest Contentful Paint), INP, CLS',
    'Critical Rendering Path & Asset Optimization'
  ]
};

const DIFFICULTIES = [
  { id: 'Easy', label: 'Easy', desc: 'Foundational concepts and direct definitions' },
  { id: 'Medium', label: 'Medium', desc: 'Practical problem solving and internal mechanics' },
  { id: 'Hard', label: 'Hard', desc: 'Edge cases, architectural trade-offs, and deep concurrency' }
];

const FALLBACK_ROLE_GROUPS = [
  {
    id: 'software_development',
    name: 'Software Dev',
    roles: [
      'Software Development Engineer (SDE-1)',
      'Software Development Engineer (SDE-2)',
      'Junior Software Engineer',
      'Associate Software Engineer',
      'Graduate Engineer Trainee',
      'Software Engineer Intern',
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
    name: 'Data & AI',
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
    name: 'Cloud & DevOps',
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
    name: 'QA & Security',
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
    name: 'Product & Tech',
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
    name: 'Leadership & Arch',
    roles: [
      'Software Architect',
      'Solutions Architect',
      'Technical Lead',
      'Engineering Manager'
    ]
  }
];

const ALL_FALLBACK_ROLES = FALLBACK_ROLE_GROUPS.flatMap(g => g.roles);

const ROLE_SUGGESTIONS = {
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

const INTERVIEW_MODES = [
  { id: 'mixed', label: 'Mixed Technical', desc: 'Balanced concepts, scenarios, and code' },
  { id: 'conceptual', label: 'Conceptual Deep-Dive', desc: 'Architecture, mechanics & internals' },
  { id: 'live_coding', label: 'Live Coding', desc: 'Monaco code editor, multi-language execution, Run Code & Submit' },
  { id: 'sql', label: 'SQL & Database Round', desc: 'Queries, optimization & transactions' },
  { id: 'debugging', label: 'Debugging Round', desc: 'Bugs, output prediction & anomalies' },
  { id: 'system_design', label: 'System Design (LLD & HLD)', desc: 'Architecture, trade-offs & microservices' },
  { id: 'scenario', label: 'Scenario-Based', desc: 'System design & production trade-offs' },
  { id: 'role_specific', label: 'Role-Specific Deep Dive', desc: 'Tailored strictly to target job role responsibilities' }
];

const EXPERIENCE_LEVELS = [
  { id: 'internship', label: 'Internship / Campus', desc: 'Academics & problem solving' },
  { id: 'fresher', label: 'Fresher (0-1 yrs)', desc: 'Core syntax, basics & projects' },
  { id: 'junior', label: 'Junior (1-3 yrs)', desc: 'Practical engineering & APIs' },
  { id: 'mid', label: 'Mid-Level (3-5 yrs)', desc: 'Architecture & concurrency' },
  { id: 'senior', label: 'Senior / Staff (5+ yrs)', desc: 'Scale, resilience & leadership' }
];

const COMPANY_STYLES = [
  { id: 'General Tech', label: 'General Tech', desc: 'Broad industry best practices' },
  { id: 'FAANG / Big Tech', label: 'FAANG / Big Tech Style', desc: 'Rigorous scale, algorithmic & concurrency depth' },
  { id: 'High-Growth Startup', label: 'High-Growth Startup', desc: 'Agile problem solving, pragmatism & full stack craft' },
  { id: 'Enterprise / FinTech', label: 'Enterprise / FinTech', desc: 'ACID transactions, reliability & high availability' }
];

const QUESTION_COUNTS = [3, 5, 7, 10];

const InterviewSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const qCategory = searchParams.get('category');
  const qTopic = searchParams.get('topic');
  const qMode = searchParams.get('mode');

  const [category, setCategory] = useState(qCategory || user?.preferences?.preferredCategories?.[0] || 'Java');
  const [difficulty, setDifficulty] = useState(user?.preferences?.preferredDifficulty || 'Medium');
  const [totalQuestions, setTotalQuestions] = useState(user?.preferences?.preferredQuestionCount || 5);
  const [targetRole, setTargetRole] = useState(user?.preferences?.targetRole || 'SDE-1');
  const [experienceLevel, setExperienceLevel] = useState('fresher');
  const [interviewMode, setInterviewMode] = useState(qMode || 'mixed');
  const [companyStyle, setCompanyStyle] = useState('General Tech');
  const [interviewLanguage, setInterviewLanguage] = useState('en-US');
  
  // Catalog categories, languages and subjects
  const [activeTab, setActiveTab] = useState('languages'); // 'languages' | 'subjects' | 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogLanguages, setCatalogLanguages] = useState(FALLBACK_LANGUAGES);
  const [catalogSubjects, setCatalogSubjects] = useState(CATEGORIES);
  const [catalogAll, setCatalogAll] = useState([...FALLBACK_LANGUAGES, ...CATEGORIES]);

  // Role Taxonomy State
  const [catalogRoleGroups, setCatalogRoleGroups] = useState(FALLBACK_ROLE_GROUPS);
  const [catalogAllRoles, setCatalogAllRoles] = useState(ALL_FALLBACK_ROLES);
  const [catalogRoleSuggestions, setCatalogRoleSuggestions] = useState(ROLE_SUGGESTIONS);
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [roleSearchQuery, setRoleSearchQuery] = useState('');

  // Topic selection
  const [availableTopics, setAvailableTopics] = useState(DEFAULT_TOPICS['Java'] || []);
  const [selectedTopic, setSelectedTopic] = useState(qTopic || '');
  const [customTopic, setCustomTopic] = useState('');

  // AI Interviewer Intelligence Toggles
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  const [focusWeakAreas, setFocusWeakAreas] = useState(false);
  const [voiceInterview, setVoiceInterview] = useState(false);
  const [completedSessionsCount, setCompletedSessionsCount] = useState(0);
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch past session count to determine whether enough data exists for weak areas
  useEffect(() => {
    let isMounted = true;
    api.get('/interviews?limit=10')
      .then(res => {
        if (!isMounted) return;
        const interviews = res.data?.interviews || [];
        const completed = interviews.filter(i => i.status === 'completed').length;
        setCompletedSessionsCount(completed);
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  // Synchronize category and topic if searchParams change
  useEffect(() => {
    const paramCat = searchParams.get('category');
    const paramTop = searchParams.get('topic');
    if (paramCat) setCategory(paramCat);
    if (paramTop) {
      setSelectedTopic(paramTop);
      setAvailableTopics(prev => prev.includes(paramTop) ? prev : [paramTop, ...prev]);
    }
  }, [searchParams]);

  // Fetch full catalog metadata from backend on mount
  useEffect(() => {
    let isMounted = true;
    api.get('/questions/categories')
      .then(res => {
        if (!isMounted || !res.data || !res.data.data) return;
        const { languages, subjects, categories, roleGroups, targetRoles, roleSuggestions } = res.data.data;
        if (Array.isArray(languages) && languages.length > 0) {
          setCatalogLanguages(languages);
        }
        if (Array.isArray(subjects) && subjects.length > 0) {
          setCatalogSubjects(subjects);
        }
        if (Array.isArray(categories) && categories.length > 0) {
          setCatalogAll(categories);
        }
        if (Array.isArray(roleGroups) && roleGroups.length > 0) {
          setCatalogRoleGroups(roleGroups);
          setCatalogAllRoles(targetRoles || roleGroups.flatMap(g => g.roles));
        }
        if (roleSuggestions && typeof roleSuggestions === 'object') {
          setCatalogRoleSuggestions(roleSuggestions);
        }
      })
      .catch(() => {
        // Fallbacks already initialized
      });

    return () => { isMounted = false; };
  }, []);

  // Filtered displayed list based on active tab and search query
  const displayedItems = (() => {
    let baseList = catalogAll;
    if (activeTab === 'languages') baseList = catalogLanguages;
    else if (activeTab === 'subjects') baseList = catalogSubjects;

    if (!searchQuery.trim()) return baseList;
    const q = searchQuery.toLowerCase().trim();
    return baseList.filter(item => {
      const name = (item.name || item.label || item.id || '').toLowerCase();
      const desc = (item.description || item.desc || '').toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  })();

  // Filtered displayed roles based on discipline and roleSearchQuery
  const displayedRoles = (() => {
    let base = catalogAllRoles;
    if (selectedDiscipline !== 'all') {
      const group = catalogRoleGroups.find(g => g.id === selectedDiscipline);
      base = group ? group.roles : catalogAllRoles;
    }

    if (!roleSearchQuery.trim()) return base;
    const q = roleSearchQuery.toLowerCase().trim();
    return base.filter(r => r.toLowerCase().includes(q));
  })();

  // Role-driven category suggestions
  const suggestedSubjects = (catalogRoleSuggestions || ROLE_SUGGESTIONS)[targetRole] || [];

  // Update topics whenever category changes
  useEffect(() => {
    let isMounted = true;
    const defaultList = DEFAULT_TOPICS[category] || [];
    setAvailableTopics(defaultList);
    setSelectedTopic('');
    setCustomTopic('');

    // Fetch dynamic topics from backend
    api.get(`/questions/topics?category=${encodeURIComponent(category)}`)
      .then(res => {
        if (isMounted && res.data && Array.isArray(res.data.topics) && res.data.topics.length > 0) {
          setAvailableTopics(res.data.topics);
        }
      })
      .catch(() => {
        // Fallback already populated via defaultList
      });

    return () => { isMounted = false; };
  }, [category]);

  const effectiveTopic = customTopic.trim() || selectedTopic;

  const getMissingField = () => {
    if (!category || !category.trim()) return 'Select a technical category / language';
    if (!targetRole || !targetRole.trim()) return 'Select a target job role';
    if (!difficulty) return 'Select a difficulty level';
    if (!totalQuestions || Number(totalQuestions) <= 0) return 'Select number of questions';
    return null;
  };

  const missingField = getMissingField();
  const isStartDisabled = submitting || Boolean(missingField);

  // Clear error whenever any configuration option changes
  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [
    category,
    difficulty,
    totalQuestions,
    targetRole,
    experienceLevel,
    interviewMode,
    companyStyle,
    interviewLanguage,
    selectedTopic,
    customTopic
  ]);

  const handleStartInterview = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (submitting) return; // prevent double clicks

    const missing = getMissingField();
    if (missing) {
      setError(`Please complete required field: ${missing}`);
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const response = await api.post('/interviews/start', {
        category,
        difficulty,
        totalQuestions,
        topic: effectiveTopic,
        targetRole,
        experienceLevel,
        interviewMode: voiceInterview ? 'voice' : interviewMode,
        companyStyle,
        language: interviewLanguage,
        adaptiveMode,
        focusWeakAreas: completedSessionsCount >= 2 ? focusWeakAreas : false,
        voiceInterview
      });

      if (response.data && response.data.status === 'success' && response.data.interview) {
        navigate(`/interview/${response.data.interview._id}`, {
          state: { interviewMode, interview: response.data.interview }
        });
      } else {
        setError('Failed to initialize interview session. The response was incomplete.');
      }
    } catch (err) {
      if (!navigator.onLine || !err.response) {
        setError('Network error: Unable to connect to backend server. Please verify your connection.');
      } else if (err.response.status === 429) {
        setError('Rate limit reached: AI question generation is temporarily throttled. Please wait a moment and try again.');
      } else if (err.response.status === 401 || err.response.status === 403) {
        setError('Authentication error: Your session has expired. Please log in again.');
      } else if (err.response.status === 400) {
        setError(`Configuration error: ${err.response.data?.message || 'Invalid interview parameters.'}`);
      } else if (err.response.status === 503) {
        setError('AI generation service temporarily unavailable. Fallback question bank is ready, please retry.');
      } else {
        setError(err.response?.data?.message || 'Unable to prepare interview questions for this configuration. Please try another topic or category.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', paddingBottom: '160px', transition: 'background-color var(--transition-fast), color var(--transition-fast)' }}>
      
      {/* Header Bar */}
      <header style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link 
            to="/dashboard" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              color: 'var(--text-secondary)', 
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
              <Sparkles size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)' }}>InterviewAce AI</span>
          </div>
        </div>

        {/* User Navigation Dropdown */}
        <UserMenu />
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: '1080px', margin: '32px auto 0 auto', padding: '0 20px' }}>
        
        {/* Title Box */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Configure Practice Mock Session
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
            Customize your technical subject, specific focus topic, target role, and interview mode for realistic interview practice.
          </p>
        </div>

        {error && (
          <div className="auth-alert-error" style={{ marginBottom: '24px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleStartInterview}>
          
          {/* Section 1: Choose Technical Category / Programming Language */}
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', marginBottom: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                <Layers size={18} color="var(--primary-text)" /> 1. Select Technical Category / Language
              </label>

              {/* Search Filter */}
              <div style={{ position: 'relative', minWidth: '240px', flex: '1', maxWidth: '340px' }}>
                <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search languages or subjects..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '8px 12px 8px 34px',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Role-Based Subject Suggestions */}
            {suggestedSubjects.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px', padding: '10px 14px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--warning-text)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sparkles size={14} color="var(--warning-text)" /> Suggested for {targetRole}:
                </span>
                {suggestedSubjects.map(sub => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setCategory(sub)}
                    style={{
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: category === sub ? '1px solid var(--primary-text)' : '1px solid var(--border-subtle)',
                      backgroundColor: category === sub ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                      color: category === sub ? 'var(--primary-text)' : 'var(--text-secondary)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            {/* Segmented Controls / Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('languages')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeTab === 'languages' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: activeTab === 'languages' ? 'var(--primary)' : 'var(--bg-card-subtle)',
                  color: activeTab === 'languages' ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                💻 Programming Languages ({catalogLanguages.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('subjects')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeTab === 'subjects' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: activeTab === 'subjects' ? 'var(--primary)' : 'var(--bg-card-subtle)',
                  color: activeTab === 'subjects' ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                ⚙️ Technical Subjects ({catalogSubjects.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeTab === 'all' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: activeTab === 'all' ? 'var(--primary)' : 'var(--bg-card-subtle)',
                  color: activeTab === 'all' ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                All Categories ({catalogAll.length})
              </button>
            </div>

            {/* Language & Subject Cards Grid */}
            {displayedItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-muted)' }}>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem' }}>No matching categories or languages found for "{searchQuery}".</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    padding: '6px 14px',
                    backgroundColor: 'var(--bg-card-subtle)',
                    color: 'var(--primary-text)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                {displayedItems.map(cat => {
                  const IconComponent = ICON_MAP[cat.iconName] || cat.icon || Code;
                  const isSelected = category === cat.id;
                  const catLabel = cat.name || cat.label || cat.id;
                  const catDesc = cat.description || cat.desc || '';

                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      style={{
                        textAlign: 'left',
                        padding: '14px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                        backgroundColor: isSelected ? 'var(--primary-subtle)' : 'var(--bg-card-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <IconComponent size={18} color={isSelected ? 'var(--primary-text)' : 'var(--text-secondary)'} />
                          <span style={{ fontWeight: 600, color: isSelected ? 'var(--primary-text)' : 'var(--text-primary)', fontSize: '0.95rem' }}>
                            {catLabel}
                          </span>
                        </div>
                        {isSelected && <CheckCircle2 size={16} color="var(--primary-text)" />}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {catDesc}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 2: Topic & Focus Selection */}
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', marginBottom: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
              <Sliders size={18} color="var(--primary-text)" /> 2. Topic & Focus Area ({category})
            </label>

            {/* Topic Chips */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                Select a Curated Topic or enter a custom focus below:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => { setSelectedTopic(''); setCustomTopic(''); }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    border: !selectedTopic && !customTopic ? '1px solid var(--primary-text)' : '1px solid var(--border-subtle)',
                    backgroundColor: !selectedTopic && !customTopic ? 'var(--primary-subtle)' : 'var(--bg-card-subtle)',
                    color: !selectedTopic && !customTopic ? 'var(--primary-text)' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  All {category} Topics (Comprehensive)
                </button>
                {availableTopics.map(t => {
                  const isCuratedSelected = selectedTopic === t && !customTopic;
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => { setSelectedTopic(t); setCustomTopic(''); }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        border: isCuratedSelected ? '1px solid var(--primary-text)' : '1px solid var(--border-subtle)',
                        backgroundColor: isCuratedSelected ? 'var(--primary-subtle)' : 'var(--bg-card-subtle)',
                        color: isCuratedSelected ? 'var(--primary-text)' : 'var(--text-secondary)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Focus Keyword Input */}
            <div>
              <label htmlFor="topicFocus" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Or Custom Keyword / Specific Subtopic:
              </label>
              <input
                id="topicFocus"
                type="text"
                placeholder="e.g. Memory Management, BST, Indexing, Closures, Redux Toolkit..."
                value={customTopic}
                onChange={e => { setCustomTopic(e.target.value); setSelectedTopic(''); }}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Section 3: Target Role & Interview Mode */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            
            {/* Target Role */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  <Briefcase size={18} color="var(--warning-text)" /> 3. Target Job Role
                </label>
                <span style={{ fontSize: '0.78rem', color: 'var(--warning-text)', backgroundColor: 'var(--warning-subtle)', border: '1px solid var(--warning)', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
                  {targetRole}
                </span>
              </div>

              {/* Role Search Filter */}
              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search 70+ roles (e.g. SRE, Data Analyst, MLOps, Java)..."
                  value={roleSearchQuery}
                  onChange={e => setRoleSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '8px 10px 8px 30px',
                    color: 'var(--text-primary)',
                    fontSize: '0.82rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Discipline Filter Chips */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedDiscipline('all')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '0.74rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    border: selectedDiscipline === 'all' ? '1px solid var(--warning)' : '1px solid var(--border-subtle)',
                    backgroundColor: selectedDiscipline === 'all' ? 'var(--warning-subtle)' : 'var(--bg-card-subtle)',
                    color: selectedDiscipline === 'all' ? 'var(--warning-text)' : 'var(--text-secondary)'
                  }}
                >
                  All Roles ({catalogAllRoles.length})
                </button>
                {catalogRoleGroups.map(group => {
                  const isSelected = selectedDiscipline === group.id;
                  return (
                    <button
                      type="button"
                      key={group.id}
                      onClick={() => setSelectedDiscipline(group.id)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '16px',
                        fontSize: '0.74rem',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        border: isSelected ? '1px solid var(--warning)' : '1px solid var(--border-subtle)',
                        backgroundColor: isSelected ? 'var(--warning-subtle)' : 'var(--bg-card-subtle)',
                        color: isSelected ? 'var(--warning-text)' : 'var(--text-secondary)'
                      }}
                    >
                      {group.name} ({group.roles.length})
                    </button>
                  );
                })}
              </div>

              {/* Scrollable list of roles */}
              <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
                {displayedRoles.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px 8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    No roles match "{roleSearchQuery}".
                  </div>
                ) : (
                  displayedRoles.map(role => {
                    const isSelected = targetRole === role;
                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => setTargetRole(role)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: isSelected ? '1px solid var(--warning)' : '1px solid var(--border-subtle)',
                          backgroundColor: isSelected ? 'var(--warning-subtle)' : 'var(--bg-card-subtle)',
                          color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '0.85rem',
                          fontWeight: isSelected ? 600 : 400,
                          transition: 'all 0.1s ease'
                        }}
                      >
                        <span>{role}</span>
                        {isSelected && <CheckCircle2 size={15} color="var(--warning-text)" />}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Interview Mode */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
                <Workflow size={18} color="var(--accent, #a855f7)" /> 4. Interview Mode
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {INTERVIEW_MODES.map(mode => {
                  const isSelected = interviewMode === mode.id;
                  return (
                    <button
                      type="button"
                      key={mode.id}
                      onClick={() => setInterviewMode(mode.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: isSelected ? '1px solid #a855f7' : '1px solid var(--border-subtle)',
                        backgroundColor: isSelected ? 'rgba(168, 85, 247, 0.12)' : 'var(--bg-card-subtle)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                          {mode.label}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {mode.desc}
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 size={16} color="#c084fc" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Section 4: Experience Level */}
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', marginBottom: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
              <Sparkles size={18} color="#f97316" /> 4. Experience Level
            </label>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Calibrates question complexity, depth of expected answers, and AI evaluation standards to your seniority.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
              {EXPERIENCE_LEVELS.map(level => {
                const isSelected = experienceLevel === level.id;
                return (
                  <button
                    type="button"
                    key={level.id}
                    onClick={() => setExperienceLevel(level.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: isSelected ? '2px solid #f97316' : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? 'rgba(249, 115, 22, 0.12)' : 'var(--bg-card-subtle)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {level.label}
                      </span>
                      {isSelected && <CheckCircle2 size={15} color="#fb923c" />}
                    </div>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {level.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Difficulty, Question Count & Company Style */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            
            {/* Difficulty */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
                <Sliders size={18} color="var(--success-text)" /> 5. Target Difficulty
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {DIFFICULTIES.map(diff => {
                  const isSelected = difficulty === diff.id;
                  return (
                    <button
                      type="button"
                      key={diff.id}
                      onClick={() => setDifficulty(diff.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid var(--success)' : '1px solid var(--border-subtle)',
                        backgroundColor: isSelected ? 'var(--success-subtle)' : 'var(--bg-card-subtle)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                          {diff.label}
                        </span>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {diff.desc}
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 size={16} color="var(--success-text)" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Count & Company Style */}
            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
                <Clock size={18} color="var(--primary-text)" /> 6. Session Length &amp; Company Style
              </label>

              {/* Question Count Buttons */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Number of Questions:
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {QUESTION_COUNTS.map(count => (
                    <button
                      type="button"
                      key={count}
                      onClick={() => setTotalQuestions(count)}
                      style={{
                        flex: 1,
                        padding: '10px 0',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        border: totalQuestions === count ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                        backgroundColor: totalQuestions === count ? 'var(--primary-subtle)' : 'var(--bg-card-subtle)',
                        color: totalQuestions === count ? 'var(--primary-text)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Style Selector */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <Building2 size={15} /> Company Practice Style:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {COMPANY_STYLES.map(style => {
                    const isSelected = companyStyle === style.id;
                    return (
                      <button
                        type="button"
                        key={style.id}
                        onClick={() => setCompanyStyle(style.id)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '6px',
                          border: isSelected ? '1px solid var(--primary-text)' : '1px solid var(--border-subtle)',
                          backgroundColor: isSelected ? 'var(--primary-subtle)' : 'var(--bg-card-subtle)',
                          color: isSelected ? 'var(--primary-text)' : 'var(--text-secondary)',
                          fontSize: '0.8rem',
                          fontWeight: isSelected ? 600 : 400,
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {style.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Native Language Selector */}
              <div style={{ marginTop: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <Sparkles size={15} color="var(--primary-text)" /> Interview Spoken &amp; Recognition Language:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { id: 'en-US', label: 'English (US)', desc: 'Standard Technical English' },
                    { id: 'hi-IN', label: 'Hindi (हिंदी)', desc: 'हिंदी तकनीकी साक्षात्कार' }
                  ].map(lang => {
                    const isSelected = interviewLanguage === lang.id;
                    return (
                      <button
                        type="button"
                        key={lang.id}
                        onClick={() => setInterviewLanguage(lang.id)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                          backgroundColor: isSelected ? 'var(--primary-subtle)' : 'var(--bg-card-subtle)',
                          color: isSelected ? 'var(--primary-text)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{lang.label}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{lang.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* Section 7: AI Interviewer Persona & Intelligence */}
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', boxShadow: 'var(--shadow-card)', marginBottom: '24px', transition: 'background-color var(--transition-fast), border-color var(--transition-fast)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
              <Brain size={18} color="#818cf8" /> 7. AI Interviewer Persona &amp; Intelligence
            </label>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Configure adaptive difficulty progression, weak-topic targeting, and conversational voice interaction.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {/* Toggle 1: Adaptive Mode */}
              <div 
                onClick={() => setAdaptiveMode(prev => !prev)}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: adaptiveMode ? '2px solid #818cf8' : '1px solid var(--border-subtle)',
                  backgroundColor: adaptiveMode ? 'rgba(129, 140, 248, 0.1)' : 'var(--bg-card-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '10px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Zap size={16} color="#818cf8" />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        Adaptive Mode (Recommended)
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: adaptiveMode ? '#818cf8' : 'var(--bg-subtle)', color: adaptiveMode ? '#ffffff' : 'var(--text-muted)' }}>
                      {adaptiveMode ? 'ENABLED' : 'OFF'}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    Tracks running accuracy. 2 strong answers in a row trigger slightly harder questions. Probes partial or unclear answers with 1 smart follow-up.
                  </p>
                </div>
              </div>

              {/* Toggle 2: Focus on Weak Areas */}
              <div 
                onClick={() => {
                  if (completedSessionsCount >= 2) {
                    setFocusWeakAreas(prev => !prev);
                  }
                }}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: (completedSessionsCount >= 2 && focusWeakAreas) ? '2px solid var(--warning)' : '1px solid var(--border-subtle)',
                  backgroundColor: (completedSessionsCount >= 2 && focusWeakAreas) ? 'rgba(234, 179, 8, 0.12)' : 'var(--bg-card-subtle)',
                  cursor: completedSessionsCount >= 2 ? 'pointer' : 'not-allowed',
                  opacity: completedSessionsCount >= 2 ? 1 : 0.65,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '10px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {completedSessionsCount < 2 ? <Lock size={15} color="var(--text-muted)" /> : <Target size={16} color="var(--warning-text)" />}
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        Focus on My Weak Areas
                      </span>
                    </div>
                    {completedSessionsCount >= 2 ? (
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: focusWeakAreas ? 'var(--warning)' : 'var(--bg-subtle)', color: focusWeakAreas ? '#000' : 'var(--text-muted)' }}>
                        {focusWeakAreas ? 'ACTIVE' : 'OFF'}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', backgroundColor: 'var(--bg-subtle)', padding: '2px 6px', borderRadius: '4px' }}>
                        {completedSessionsCount}/2 Sessions
                      </span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    {completedSessionsCount >= 2 
                      ? 'Prioritizes categories and topics where your past scores fell below 65%.'
                      : 'Complete at least 2 sessions to unlock weak-area targeting based on your skill gap analysis.'}
                  </p>
                </div>
              </div>

              {/* Toggle 3: Realistic Voice Interview */}
              <div 
                onClick={() => setVoiceInterview(prev => !prev)}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: voiceInterview ? '2px solid #22c55e' : '1px solid var(--border-subtle)',
                  backgroundColor: voiceInterview ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-card-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '10px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mic size={16} color="#22c55e" />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        Realistic Voice Interview
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: voiceInterview ? '#22c55e' : 'var(--bg-subtle)', color: voiceInterview ? '#ffffff' : 'var(--text-muted)' }}>
                      {voiceInterview ? 'VOICE ON' : 'OPTIONAL'}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    Interviewer speaks questions aloud with natural pacing. Your mic opens automatically with live speech recognition &amp; silence detection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Bar with Real-time Summary & Start Button */}
          <div 
            id="sticky-start-bar"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-surface)',
              borderTop: '1px solid var(--border-subtle)',
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.18)',
              zIndex: 90,
              padding: '12px 24px',
              transition: 'background-color var(--transition-fast), border-color var(--transition-fast)'
            }}
          >
            <div style={{
              maxWidth: '1080px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ flex: '1 1 320px', minWidth: '240px' }}>
                <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span>Ready to practice:</span>
                  <span style={{ color: 'var(--primary-text)', fontWeight: 700 }}>{category || 'No Category Selected'}</span>
                  <span style={{ fontSize: '0.78rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                    {difficulty}
                  </span>
                  <span>•</span>
                  <span style={{ color: 'var(--warning-text)', fontWeight: 600 }}>{targetRole}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.4 }}>
                  Mode: <strong style={{ color: 'var(--accent, #a855f7)' }}>{INTERVIEW_MODES.find(m => m.id === interviewMode)?.label}</strong>
                  {' '}• Level: <strong style={{ color: '#fb923c' }}>{EXPERIENCE_LEVELS.find(l => l.id === experienceLevel)?.label}</strong>
                  {' '}• Language: <strong style={{ color: '#38bdf8' }}>{interviewLanguage === 'hi-IN' ? 'Hindi (हिंदी)' : 'English (US)'}</strong>
                  {effectiveTopic && <> • Focus: <strong style={{ color: 'var(--primary-text)' }}>{effectiveTopic}</strong></>}
                  {' '}• <strong style={{ color: 'var(--success-text)' }}>{totalQuestions} Questions</strong> ({companyStyle})
                </div>
                {error && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--danger-text, #ef4444)', marginTop: '4px', fontWeight: 500 }}>
                    <AlertCircle size={14} color="#ef4444" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {missingField && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--warning-text, #f59e0b)', fontWeight: 600 }}>
                    <AlertCircle size={15} color="var(--warning-text, #f59e0b)" />
                    <span>{missingField}</span>
                  </div>
                )}

                <button
                  id="start-interview-btn"
                  type="submit"
                  disabled={isStartDisabled}
                  title={missingField ? `Required: ${missingField}` : (submitting ? 'Preparing questions...' : 'Start Interview Now')}
                  style={{
                    minWidth: '220px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: isStartDisabled && !submitting ? 'var(--bg-subtle, #f1f5f9)' : 'var(--primary, #2563eb)',
                    color: isStartDisabled && !submitting ? 'var(--text-muted, #94a3b8)' : '#ffffff',
                    border: isStartDisabled && !submitting ? '1px solid var(--border-subtle, #cbd5e1)' : 'none',
                    borderRadius: '8px',
                    padding: '11px 22px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: isStartDisabled ? 'not-allowed' : (submitting ? 'wait' : 'pointer'),
                    opacity: submitting ? 0.85 : (isStartDisabled ? 0.65 : 1),
                    boxShadow: isStartDisabled ? 'none' : '0 4px 14px rgba(37, 99, 235, 0.35)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Preparing Question Bank...</span>
                    </>
                  ) : (
                    <>
                      <span>Start Interview Now</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

export default InterviewSetup;
