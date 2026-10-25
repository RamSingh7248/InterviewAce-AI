/**
 * Target Role Skill Requirements & Importance Weights
 * 
 * Maps industry roles to required categories and topics with weights (0.1 - 1.0).
 * Used for deterministic role readiness % calculations in Phase 3 Skill Gap Analyzer.
 */

export const ROLE_REQUIREMENTS = {
  'Software Development Engineer (SDE-1)': {
    name: 'Software Development Engineer (SDE-1)',
    experienceTier: 'Junior (0-2 yrs)',
    skills: [
      { category: 'DSA', topic: 'Arrays, Strings & Two Pointers', weight: 1.0 },
      { category: 'DSA', topic: 'Hashing & Frequency Counting', weight: 0.9 },
      { category: 'DSA', topic: 'Binary Search & Sliding Window', weight: 0.9 },
      { category: 'DSA', topic: 'Trees, BST & Tree Traversals', weight: 0.8 },
      { category: 'Java', topic: 'Core Java & JVM Internals', weight: 0.85 },
      { category: 'Java', topic: 'Collections Framework & Generics', weight: 0.8 },
      { category: 'OOP', topic: 'OOP Fundamentals & Polymorphism', weight: 0.85 },
      { category: 'SQL/DBMS', topic: 'JOINs, Subqueries & Set Operations', weight: 0.8 },
      { category: 'SQL/DBMS', topic: 'Indexes, B-Trees & Query Optimization', weight: 0.75 },
      { category: 'REST APIs', topic: 'HTTP Verbs, Status Codes & RESTful Design', weight: 0.75 }
    ]
  },

  'Software Development Engineer (SDE-2)': {
    name: 'Software Development Engineer (SDE-2)',
    experienceTier: 'Mid-Senior (2-5 yrs)',
    skills: [
      { category: 'System Design', topic: 'High-Level Architecture & Scaling', weight: 1.0 },
      { category: 'System Design', topic: 'Caching Strategies (Redis/Memcached)', weight: 0.95 },
      { category: 'System Design', topic: 'Load Balancing & API Gateways', weight: 0.9 },
      { category: 'Distributed Systems', topic: 'CAP Theorem & Consensus (Raft/Paxos)', weight: 0.9 },
      { category: 'Microservices', topic: 'Service Discovery, Saga Pattern & Observability', weight: 0.85 },
      { category: 'DSA', topic: 'Dynamic Programming & Recursion', weight: 0.8 },
      { category: 'DSA', topic: 'Graphs, BFS, DFS & Shortest Path', weight: 0.8 },
      { category: 'SQL/DBMS', topic: 'Transactions, ACID Properties & Concurrency', weight: 0.85 },
      { category: 'Performance & Optimization', topic: 'Profiling, Latency & Caching', weight: 0.8 }
    ]
  },

  'Junior Software Engineer': {
    name: 'Junior Software Engineer',
    experienceTier: 'Entry-Level (0-1 yrs)',
    skills: [
      { category: 'DSA', topic: 'Arrays, Strings & Two Pointers', weight: 1.0 },
      { category: 'DSA', topic: 'Linked Lists, Stacks & Queues', weight: 0.9 },
      { category: 'OOP', topic: 'OOP Fundamentals & Polymorphism', weight: 0.9 },
      { category: 'SQL/DBMS', topic: 'Basic & Advanced SELECT, Filtering, Aggregation', weight: 0.85 },
      { category: 'REST APIs', topic: 'HTTP Verbs, Status Codes & RESTful Design', weight: 0.8 },
      { category: 'Git & Version Control', topic: 'Branching, Merging & Rebasing', weight: 0.7 }
    ]
  },

  'Senior Software Engineer': {
    name: 'Senior Software Engineer',
    experienceTier: 'Senior (5+ yrs)',
    skills: [
      { category: 'System Design', topic: 'High-Level Architecture & Scaling', weight: 1.0 },
      { category: 'Distributed Systems', topic: 'Replication, Sharding & Partitioning', weight: 1.0 },
      { category: 'Software Architecture', topic: 'Clean Architecture, Hexagonal & Event-Driven', weight: 0.95 },
      { category: 'Performance & Optimization', topic: 'Memory Leaks, Concurrency & Profiling', weight: 0.9 },
      { category: 'Cloud Computing', topic: 'Compute, Serverless & Cloud Architecture', weight: 0.85 },
      { category: 'Microservices', topic: 'Resilience Patterns (Circuit Breakers, Bulkheads)', weight: 0.85 }
    ]
  },

  'Backend Developer': {
    name: 'Backend Developer',
    experienceTier: 'Core Backend',
    skills: [
      { category: 'Node.js', topic: 'Event Loop, Streams & Asynchronous I/O', weight: 1.0 },
      { category: 'REST APIs', topic: 'API Security, OAuth2, JWT & Rate Limiting', weight: 0.95 },
      { category: 'SQL/DBMS', topic: 'Indexes, B-Trees & Query Optimization', weight: 0.95 },
      { category: 'SQL/DBMS', topic: 'Transactions, ACID Properties & Concurrency', weight: 0.9 },
      { category: 'System Design', topic: 'Caching Strategies & Data Modeling', weight: 0.85 },
      { category: 'Docker & Kubernetes', topic: 'Containers, Multi-stage Builds & Pods', weight: 0.75 }
    ]
  },

  'Frontend Developer': {
    name: 'Frontend Developer',
    experienceTier: 'Web & UI',
    skills: [
      { category: 'JavaScript', topic: 'Execution Context, Scope & Closures', weight: 1.0 },
      { category: 'JavaScript', topic: 'Event Loop, Microtasks & Async JS', weight: 0.95 },
      { category: 'React', topic: 'Hooks (useState, useEffect, useMemo, useCallback)', weight: 1.0 },
      { category: 'React', topic: 'Virtual DOM, Reconciliation & Fiber', weight: 0.9 },
      { category: 'React', topic: 'Performance Optimization & Memoization', weight: 0.9 },
      { category: 'Accessibility & Performance', topic: 'Core Web Vitals (LCP, FID, CLS)', weight: 0.8 },
      { category: 'Web Security', topic: 'XSS, CSRF, CORS & Content Security Policy', weight: 0.75 }
    ]
  },

  'Full Stack Developer': {
    name: 'Full Stack Developer',
    experienceTier: 'Full Spectrum',
    skills: [
      { category: 'React', topic: 'Components, Props & State Management', weight: 0.95 },
      { category: 'JavaScript', topic: 'ES6+ Features, Async/Await & Promises', weight: 0.95 },
      { category: 'Node.js', topic: 'Node.js Runtime, Express & Middleware', weight: 0.95 },
      { category: 'REST APIs', topic: 'RESTful Architecture & Status Codes', weight: 0.9 },
      { category: 'SQL/DBMS', topic: 'JOINs, Subqueries & Normalization', weight: 0.85 },
      { category: 'Web Security', topic: 'JWT Authentication & Authorization', weight: 0.8 }
    ]
  },

  'Data Engineer': {
    name: 'Data Engineer',
    experienceTier: 'Data Platforms',
    skills: [
      { category: 'Data Engineering', topic: 'ETL/ELT Pipelines & Spark', weight: 1.0 },
      { category: 'Big Data', topic: 'Hadoop, Spark & Kafka Ingestion', weight: 0.95 },
      { category: 'SQL/DBMS', topic: 'Window Functions, Ranking & CTEs', weight: 0.95 },
      { category: 'Python', topic: 'Data Structures, Generators & Decorators', weight: 0.9 },
      { category: 'Distributed Systems', topic: 'Partitioning & Sharding', weight: 0.85 }
    ]
  },

  'DevOps Engineer': {
    name: 'DevOps Engineer',
    experienceTier: 'Infrastructure & Operations',
    skills: [
      { category: 'Docker & Kubernetes', topic: 'Containers, Multi-stage Builds & Pods', weight: 1.0 },
      { category: 'DevOps', topic: 'CI/CD Pipelines & GitHub Actions', weight: 1.0 },
      { category: 'Cloud Computing', topic: 'IAM, VPC & Cloud Architecture', weight: 0.95 },
      { category: 'Linux & Shell Scripting', topic: 'Process Hierarchy, Bash & Sysadmin', weight: 0.9 },
      { category: 'Networking & Infrastructure', topic: 'DNS, TLS, Load Balancers & Routing', weight: 0.85 }
    ]
  },

  'AI Engineer': {
    name: 'AI Engineer / Generative AI Developer',
    experienceTier: 'Modern AI Systems',
    skills: [
      { category: 'Generative AI & LLMs', topic: 'LLM Architectures & Quantization', weight: 1.0 },
      { category: 'Vector DB & RAG', topic: 'Embeddings, Similarity & Chunking', weight: 1.0 },
      { category: 'Prompt Engineering', topic: 'Few-Shot, Chain-of-Thought & Guardrails', weight: 0.9 },
      { category: 'Python', topic: 'Python Concurrency & Libraries', weight: 0.85 },
      { category: 'AI & Machine Learning', topic: 'Supervised Learning & Evaluation Metrics', weight: 0.8 }
    ]
  }
};

/**
 * Fallback generic engineering role profile
 */
export const GENERIC_FALLBACK_ROLE = {
  name: 'General Software Engineer',
  experienceTier: 'Core Engineering',
  skills: [
    { category: 'DSA', topic: 'Arrays, Strings & Algorithms', weight: 1.0 },
    { category: 'DSA', topic: 'Data Structures & Problem Solving', weight: 0.9 },
    { category: 'SQL/DBMS', topic: 'Database Queries & Optimization', weight: 0.85 },
    { category: 'OOP', topic: 'Object-Oriented Design & Principles', weight: 0.85 },
    { category: 'System Design', topic: 'System Architecture & Scaling', weight: 0.8 },
    { category: 'REST APIs', topic: 'API Design & Communication', weight: 0.75 }
  ]
};

/**
 * Helper to retrieve skill requirements for any role with fallback
 */
export const getRequirementsForRole = (targetRole) => {
  if (!targetRole) return GENERIC_FALLBACK_ROLE;
  
  // Exact match
  if (ROLE_REQUIREMENTS[targetRole]) {
    return ROLE_REQUIREMENTS[targetRole];
  }

  // Substring or normalized match
  const normalized = targetRole.toLowerCase().trim();
  const foundKey = Object.keys(ROLE_REQUIREMENTS).find(k => 
    k.toLowerCase().includes(normalized) || normalized.includes(k.toLowerCase())
  );

  if (foundKey) {
    return ROLE_REQUIREMENTS[foundKey];
  }

  // Check aliases
  if (normalized.includes('sde') || normalized.includes('software')) {
    return ROLE_REQUIREMENTS['Software Development Engineer (SDE-1)'];
  }
  if (normalized.includes('backend') || normalized.includes('api')) {
    return ROLE_REQUIREMENTS['Backend Developer'];
  }
  if (normalized.includes('frontend') || normalized.includes('ui') || normalized.includes('web')) {
    return ROLE_REQUIREMENTS['Frontend Developer'];
  }
  if (normalized.includes('full') || normalized.includes('stack')) {
    return ROLE_REQUIREMENTS['Full Stack Developer'];
  }
  if (normalized.includes('data')) {
    return ROLE_REQUIREMENTS['Data Engineer'];
  }
  if (normalized.includes('devops') || normalized.includes('cloud') || normalized.includes('infra')) {
    return ROLE_REQUIREMENTS['DevOps Engineer'];
  }
  if (normalized.includes('ai') || normalized.includes('ml') || normalized.includes('llm')) {
    return ROLE_REQUIREMENTS['AI Engineer'];
  }

  return GENERIC_FALLBACK_ROLE;
};
