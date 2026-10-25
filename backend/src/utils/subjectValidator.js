/**
 * Subject Isolation & Validation System for Technical Mock Interviews
 * Enforces strict boundaries between programming languages and domains
 * to prevent subject leaks (e.g. JavaScript event loop appearing in Java).
 */

// Subject-specific negative and positive prompt instructions for Gemini AI
export const getSubjectIsolationDirectives = (category) => {
  const cat = (category || '').trim();

  switch (cat) {
    case 'Java':
      return `CRITICAL SUBJECT ISOLATION RULES FOR JAVA:
- Generate questions EXCLUSIVELY about Java (Core Java, JVM internals, Memory Model, Garbage Collection, Collections Framework, OOP in Java, Multithreading & Concurrency, Generics, Streams & Lambdas, JDBC).
- STRICT PROHIBITION: Under NO circumstances generate questions about JavaScript, TypeScript, Node.js, Python, C++, SQL window functions, HTML/CSS, or browser/DOM APIs.
- NEVER confuse Java with JavaScript. Reject concepts like JavaScript closures, prototype chains, event loops, async/await, V8, or browser window objects.`;

    case 'JavaScript':
      return `CRITICAL SUBJECT ISOLATION RULES FOR JAVASCRIPT:
- Generate questions EXCLUSIVELY about JavaScript (ES6+, Execution Context, Scope, Closures, Prototypes, Prototype Chain, Event Loop, Microtasks & Macrotasks, Promises, async/await, DOM, Web/Browser APIs, V8 engine).
- STRICT PROHIBITION: Under NO circumstances generate questions about Java (JVM, bytecode, JDK), Python, C, C++, or standalone SQL database queries.`;

    case 'Python':
      return `CRITICAL SUBJECT ISOLATION RULES FOR PYTHON:
- Generate questions EXCLUSIVELY about Python (Python syntax & data model, Mutability, Lists/Tuples/Dicts/Sets, Generators, Iterators, Decorators, Context Managers, OOP in Python, GIL, Asyncio, Multiprocessing, PyTest).
- STRICT PROHIBITION: Under NO circumstances generate questions about Java, JavaScript, C, C++, or browser APIs.`;

    case 'C':
      return `CRITICAL SUBJECT ISOLATION RULES FOR C:
- Generate questions EXCLUSIVELY about the C programming language (Pointers, Memory addresses, malloc/calloc/realloc/free, Pointer arithmetic, Arrays, Strings, Structs, Unions, Bit fields, Function pointers, Preprocessor directives, Compilation stages).
- STRICT PROHIBITION: Under NO circumstances generate questions about C++ classes/templates, Java, JavaScript, Python, or Web APIs.`;

    case 'C++':
      return `CRITICAL SUBJECT ISOLATION RULES FOR C++:
- Generate questions EXCLUSIVELY about C++ (OOP in C++, Virtual functions & VTable, STL containers & algorithms, Templates, Smart pointers, RAII, Move semantics & Rvalue references, Memory management, Modern C++11/14/17/20).
- STRICT PROHIBITION: Under NO circumstances generate questions about Java (JVM), JavaScript, Python, or browser APIs.`;

    case 'SQL/DBMS':
      return `CRITICAL SUBJECT ISOLATION RULES FOR SQL/DBMS:
- Generate questions EXCLUSIVELY about Relational Databases, SQL queries, Indexing (B-Trees, Hash), ACID transactions, Normalization, Query optimization, Window functions, and CTEs.
- STRICT PROHIBITION: Do NOT generate general application code in Java, JavaScript, or Python.`;

    case 'React':
      return `CRITICAL SUBJECT ISOLATION RULES FOR REACT:
- Generate questions EXCLUSIVELY about React (Hooks, Component lifecycle, Virtual DOM, Reconciliation, Fiber, Context API, State management, Custom hooks, Performance optimization like useMemo/useCallback, SSR).
- STRICT PROHIBITION: Do NOT generate Java, Python, C++, or backend SQL queries.`;

    case 'Node.js':
      return `CRITICAL SUBJECT ISOLATION RULES FOR NODE.JS:
- Generate questions EXCLUSIVELY about Node.js runtime, Libuv, Event Loop phases, Streams, Buffers, Cluster module, Middleware, REST APIs, and Node concurrency.
- STRICT PROHIBITION: Do NOT generate Java, Python, or C++ questions.`;

    default:
      return `CRITICAL SUBJECT ISOLATION RULES:
- Generate questions strictly tailored to '${cat}'. Do not cross-pollinate with unrelated languages or technologies.`;
  }
};

/**
 * Forbidden pattern definitions per subject to detect and reject cross-subject contamination
 */
const FORBIDDEN_PATTERNS = {
  Java: [
    { pattern: /\bjavascript\b/i, reason: 'Mentions JavaScript' },
    { pattern: /\bevent\s+loop\b/i, reason: 'Mentions JavaScript Event Loop' },
    { pattern: /\bprototype\s+chain\b/i, reason: 'Mentions JavaScript Prototype Chain' },
    { pattern: /\bprototypal\s+inheritance\b/i, reason: 'Mentions JavaScript Prototypal Inheritance' },
    { pattern: /\bclosure[s]?\b.*?\b(lexical\s+scope|execution\s+context|iife|outer\s+function)\b/i, reason: 'Mentions JavaScript Closure/Lexical scope' },
    { pattern: /\bpromise\.(all|race|allsettled|any)\b/i, reason: 'Mentions JavaScript Promise API' },
    { pattern: /\b(microtask|macrotask)[s]?\b/i, reason: 'Mentions JavaScript task queue' },
    { pattern: /\b(window\.|document\.|dom\s+manipulation|queryselector|addeventlistener)\b/i, reason: 'Mentions Browser/DOM API' },
    { pattern: /\btypeof\s+null\b/i, reason: 'Mentions JavaScript typeof quirk' },
    { pattern: /\b(v8\s+engine|nodejs|npm)\b/i, reason: 'Mentions JavaScript engine/runtime' },
    { pattern: /\b(react|usestate|useeffect|usememo|usecallback|jsx)\b/i, reason: 'Mentions React framework' },
    { pattern: /\bwindow\s+functions?,\s*ranking\b/i, reason: 'Mentions SQL Window functions directly' },
    { pattern: /\bselect\s+.*?\s+from\s+.*?\s+where\b/i, reason: 'Raw SQL query without Java context' },
    { pattern: /\bdef\s+[a-z_][a-z0-9_]*\s*\(self/i, reason: 'Mentions Python syntax' },
    { pattern: /\bgil\s*\(/i, reason: 'Mentions Python GIL' },
    { pattern: /\bstd::\b/i, reason: 'Mentions C++ std namespace' }
  ],

  JavaScript: [
    { pattern: /\b(jvm|jre|jdk)\b/i, reason: 'Mentions Java JVM/JRE/JDK' },
    { pattern: /\bpublic\s+static\s+void\s+main\b/i, reason: 'Mentions Java main method' },
    { pattern: /\bsystem\.out\.print/i, reason: 'Mentions Java System.out' },
    { pattern: /\b(eden|survivor|tenured)\s+space/i, reason: 'Mentions Java Generational Heap' },
    { pattern: /\breentrantlock\b/i, reason: 'Mentions Java concurrency lock' },
    { pattern: /\bvolatile\s+keyword\b.*?\bjmm\b/i, reason: 'Mentions Java Memory Model volatile' },
    { pattern: /\bglobal\s+interpreter\s+lock\b/i, reason: 'Mentions Python GIL' },
    { pattern: /\bmalloc\s*\(/i, reason: 'Mentions C memory allocation' },
    { pattern: /\bstd::\b/i, reason: 'Mentions C++ std namespace' },
    { pattern: /\bvtable\b/i, reason: 'Mentions C++ virtual table' }
  ],

  Python: [
    { pattern: /\b(jvm|jre|jdk)\b/i, reason: 'Mentions Java JVM/JRE/JDK' },
    { pattern: /\bpublic\s+static\s+void\b/i, reason: 'Mentions Java syntax' },
    { pattern: /\bprototype\s+chain\b/i, reason: 'Mentions JavaScript Prototype Chain' },
    { pattern: /\bprototypal\b/i, reason: 'Mentions JavaScript Prototypal' },
    { pattern: /\bmalloc\s*\(/i, reason: 'Mentions C memory allocation' },
    { pattern: /\bstd::\b/i, reason: 'Mentions C++ std namespace' }
  ],

  C: [
    { pattern: /\b(class\s+[A-Z]|private:|public:|protected:)\b/i, reason: 'Mentions C++/OOP class access specifiers' },
    { pattern: /\bstd::\b/i, reason: 'Mentions C++ std namespace' },
    { pattern: /\b(cout|cin)\b/i, reason: 'Mentions C++ iostream' },
    { pattern: /\b(jvm|jre)\b/i, reason: 'Mentions Java JVM' },
    { pattern: /\bprototype\b/i, reason: 'Mentions JavaScript prototype' }
  ],

  'C++': [
    { pattern: /\b(jvm|jre|jdk)\b/i, reason: 'Mentions Java JVM' },
    { pattern: /\bprototype\s+chain\b/i, reason: 'Mentions JavaScript prototype chain' },
    { pattern: /\bdef\s+[a-z_][a-z0-9_]*\s*\(self/i, reason: 'Mentions Python syntax' },
    { pattern: /\bsystem\.out\.println\b/i, reason: 'Mentions Java System.out' }
  ]
};

/**
 * Validate a question against an expected category.
 * Rejects questions with wrong category metadata or content belonging to foreign subjects.
 *
 * @param {Object} question - The question object to evaluate
 * @param {string} targetCategory - The session's required category
 * @returns {{ isValid: boolean, reason?: string }}
 */
export const validateQuestionSubject = (question, targetCategory) => {
  if (!question || typeof question !== 'object') {
    return { isValid: false, reason: 'Question object is undefined or not an object' };
  }

  const expected = (targetCategory || '').trim();
  const actualCategory = (question.category || '').trim();

  // If session is a single focused language/discipline:
  if (expected && actualCategory && actualCategory.toLowerCase() !== expected.toLowerCase()) {
    // Shared concepts: DSA can be allowed only if explicitly configured, but never in language-specific sessions
    return {
      isValid: false,
      reason: `Category mismatch: question is tagged '${actualCategory}', expected '${expected}'`
    };
  }

  const combinedContent = `${question.questionText || ''} ${question.topic || ''} ${question.subtopic || ''} ${(question.tags || []).join(' ')} ${question.referenceAnswer || ''}`;

  const rules = FORBIDDEN_PATTERNS[expected];
  if (rules && Array.isArray(rules)) {
    for (const rule of rules) {
      if (rule.pattern.test(combinedContent)) {
        return {
          isValid: false,
          reason: `Content violation for ${expected}: ${rule.reason}`
        };
      }
    }
  }

  return { isValid: true };
};

export default {
  getSubjectIsolationDirectives,
  validateQuestionSubject
};
