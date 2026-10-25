import { makeQuestion } from './questionFactory.js';

export const LANGUAGE_QUESTIONS = [
  // ==================== JAVA ====================
  makeQuestion({
    category: 'Java',
    topic: 'Core Java & JVM Internals',
    question: 'Explain how the JVM JIT compiler performs Escape Analysis and what optimizations it enables.',
    idealAnswer: 'Escape Analysis is a compiler optimization technique where the JIT analyzes if an object allocated in a method escapes outside the method scope or thread. If an object does not escape, the JVM can perform three major optimizations: 1) Scalar Replacement, decomposing object fields into primitive CPU registers/stack variables without heap allocation; 2) Stack Allocation, allocating the object on the thread stack to eliminate GC pressure; and 3) Lock Elision (Lock Coarsening), removing synchronized blocks if the lock object is thread-confined.',
    keyPoints: [
      'Escape analysis checks if an object reference is returned or stored in a static/heap field.',
      'Scalar replacement breaks objects into local primitives on the stack.',
      'Lock elision removes synchronization overhead for thread-local objects.',
      'Significantly reduces Garbage Collection overhead and allocation rate.'
    ],
    followUps: [
      'How can you verify escape analysis optimizations using JVM flags (-XX:+PrintEscapeAnalysis)?',
      'Why does Java not directly allocate full objects on the stack instead of scalar replacement?'
    ],
    difficulty: 'Hard',
    levels: ['mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive'],
    type: 'conceptual',
    importance: 5,
    tags: ['java', 'jvm', 'jit', 'escape-analysis', 'memory']
  }),
  makeQuestion({
    category: 'Java',
    topic: 'Collections Framework & Generics',
    question: 'How does ConcurrentHashMap achieve high concurrency without global locking in Java 8+? Compare it with Hashtable and Collections.synchronizedMap.',
    idealAnswer: 'In Java 8+, ConcurrentHashMap discarded the Segment array lock stripping of Java 7 and uses a Node table with fine-grained per-bucket synchronization using CAS (Compare-And-Swap) for insertions into empty buckets and synchronized blocks on the bucket head node for collisions. Reads are completely lock-free because Node value and next pointers are declared volatile. In contrast, Hashtable and synchronizedMap use a single global mutex for all reads and writes, creating extreme thread contention under multi-core workloads.',
    keyPoints: [
      'Lock-free reads using volatile Node values and next pointers.',
      'CAS for bucket initialization without locking.',
      'Synchronized locked strictly to the individual bucket head node during hash collisions.',
      'Treeification into Red-Black trees when bucket exceeds 8 nodes and table capacity >= 64.'
    ],
    followUps: [
      'What happens during concurrent resizing in ConcurrentHashMap?',
      'How does size() calculate the aggregate count concurrently without locking the whole map?'
    ],
    difficulty: 'Hard',
    levels: ['junior', 'mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive'],
    type: 'conceptual',
    importance: 5,
    tags: ['java', 'concurrenthashmap', 'collections', 'multithreading', 'concurrency']
  }),
  makeQuestion({
    category: 'Java',
    topic: 'Multithreading, Concurrency & JMM',
    question: 'What are Virtual Threads in Java 21 (Project Loom), and how do they differ from platform threads in memory footprint and scheduling?',
    idealAnswer: 'Virtual threads are lightweight user-mode threads managed by the JVM rather than the OS kernel. A platform thread corresponds 1:1 with an OS thread and requires ~1MB of allocated stack memory, limiting concurrency to thousands of threads. Virtual threads have dynamic resizing call stacks stored in Java heap (starting at a few hundred bytes), allowing millions of concurrent virtual threads. They are scheduled onto a small pool of carrier platform threads via a work-stealing ForkJoinPool and unmount automatically during non-blocking I/O operations.',
    keyPoints: [
      'Platform threads map 1:1 to OS kernel threads with fixed ~1MB stacks.',
      'Virtual threads are M:N scheduled onto carrier platform threads via ForkJoinPool.',
      'Unmounting yields carrier threads during blocking socket/network I/O.',
      'Thread pinning occurs when executing synchronized blocks or native JNI calls.'
    ],
    followUps: [
      'What is thread pinning and why should developers favor ReentrantLock over synchronized with Virtual Threads?',
      'Why are virtual threads inappropriate for CPU-bound computations?'
    ],
    difficulty: 'Hard',
    levels: ['mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive', 'scenario-based'],
    type: 'conceptual',
    importance: 5,
    tags: ['java', 'virtual-threads', 'loom', 'concurrency', 'java21']
  }),
  makeQuestion({
    category: 'Java',
    topic: 'Memory Management & Garbage Collection',
    question: 'Compare the G1 Garbage Collector with the ZGC (Z Garbage Collector). When would you choose ZGC in production?',
    idealAnswer: 'G1 GC divides the heap into equal-sized regions and targets a user-specified pause time goal (default 200ms) by performing incremental generational collection prioritizing regions with the most garbage. ZGC is a scalable low-latency garbage collector that performs almost all phases concurrently (marking, relocation, reference processing) using colored pointers and load barriers. ZGC guarantees pause times under 1 millisecond regardless of heap size (from megabytes to 16 terabytes). ZGC is favored in ultra-low latency services like fintech order matching, real-time gaming, and microservices with strict p99 SLAs.',
    keyPoints: [
      'G1 uses regionalized heap with pause targets, usually 50-200ms pauses.',
      'ZGC uses colored pointers and load barriers to achieve sub-millisecond pauses.',
      'ZGC relocation is concurrent; threads encountering un-relocated objects self-heal via load barriers.',
      'ZGC trade-off is slightly higher CPU throughput overhead (~5-10%) compared to G1 throughput.'
    ],
    followUps: [
      'How does Generational ZGC in Java 21 optimize weak generational hypothesis workloads?',
      'What JVM flags are required to enable ZGC?'
    ],
    difficulty: 'Hard',
    levels: ['mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive'],
    type: 'conceptual',
    importance: 4,
    tags: ['java', 'gc', 'zgc', 'g1gc', 'memory', 'performance']
  }),
  makeQuestion({
    category: 'Java',
    topic: 'Java Streams, Lambdas & Modern Java',
    question: 'Why should you be cautious when using parallelStream() in production Java applications, especially in web servers like Spring Boot?',
    idealAnswer: 'By default, parallelStream() utilizes the common ForkJoinPool shared across the entire JVM. If a parallel stream performs blocking I/O (database queries, external HTTP REST calls, disk reads), it starves the worker threads of the common pool. In a web server handling concurrent HTTP requests, this causes thread pool exhaustion where unrelated requests freeze waiting for common pool worker threads to become available. Parallel streams should either be restricted to purely CPU-bound tasks or submitted to a custom isolated ForkJoinPool.',
    keyPoints: [
      'parallelStream() shares the JVM-wide Common ForkJoinPool (ForkJoinPool.commonPool()).',
      'Blocking I/O in parallel streams blocks common worker threads.',
      'Creates cascading latency spikes and thread starvation across unrelated server threads.',
      'Best practice: use regular sequential streams, reactive publishers, or custom ForkJoinPool.'
    ],
    followUps: [
      'How can you execute a parallelStream inside a custom ForkJoinPool?',
      'At what data element threshold does the overhead of thread splitting outweigh sequential processing?'
    ],
    difficulty: 'Medium',
    levels: ['junior', 'mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive', 'scenario-based'],
    type: 'scenario',
    importance: 5,
    tags: ['java', 'streams', 'concurrency', 'forkjoinpool', 'performance']
  }),
  makeQuestion({
    category: 'Java',
    topic: 'OOP Principles & Class Design',
    question: 'Debug this Java code: A developer reports that HashSet contains duplicate Employee objects even though equals() was implemented. What is wrong and how do you fix it?\n\n```java\npublic class Employee {\n    private String id;\n    private String name;\n    public Employee(String id, String name) { this.id = id; this.name = name; }\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Employee)) return false;\n        Employee e = (Employee) o;\n        return Objects.equals(id, e.id);\n    }\n}\n```',
    idealAnswer: 'The bug is that the class overrides equals() but fails to override hashCode(). In Java, hash-based collections (HashSet, HashMap) first call hashCode() to determine the bucket index. If hashCode() is not overridden, the default Object.hashCode() allocates distinct integer bucket hashes based on internal object memory addresses. Even though the two Employee objects would return true in equals(), they are placed into completely different buckets and never compared, resulting in duplicate entries. The fix is to override hashCode() returning Objects.hash(id).',
    keyPoints: [
      'Failing to override hashCode violates the equals/hashCode contract.',
      'HashSet checks hashCode first to compute bucket array index.',
      'Distinct hashCodes route identical logical objects to different buckets.',
      'Fix: implement @Override public int hashCode() { return Objects.hash(id); }'
    ],
    followUps: [
      'What happens if a field used in hashCode() is mutable and modified after insertion into a HashSet?',
      'Why is hashCode collision resolution important for HashSet performance?'
    ],
    difficulty: 'Medium',
    levels: ['internship', 'fresher', 'junior'],
    modes: ['debugging', 'mixed-technical'],
    type: 'debugging',
    importance: 5,
    tags: ['java', 'debugging', 'hashset', 'hashcode', 'equals', 'oop']
  }),
  makeQuestion({
    category: 'Java',
    topic: 'JDBC & Database Connectivity',
    question: 'Write a safe Java method using JDBC PreparedStatement to update user balance within an ACID transaction, demonstrating proper connection rollback on failure.',
    idealAnswer: 'To ensure ACID transaction safety in JDBC: 1) Disable auto-commit on the Connection (`conn.setAutoCommit(false)`); 2) Execute SQL statements using PreparedStatement with parameterized values to prevent SQL injection; 3) Call `conn.commit()` upon successful execution; 4) Wrap the operation in a try-catch block where the catch block explicitly invokes `conn.rollback()`; 5) Ensure the Connection and Statements are enclosed in try-with-resources to guarantee safe return to the connection pool.',
    keyPoints: [
      'conn.setAutoCommit(false) starts manual transaction boundary.',
      'PreparedStatements prevent SQL injection via parameterized execution plans.',
      'conn.commit() commits atomic modifications.',
      'Catch block must execute conn.rollback() on SQLException.',
      'Try-with-resources closes connection and restores state for connection pool reuse.'
    ],
    followUps: [
      'What are the advantages of using connection poolers like HikariCP over raw DriverManager?',
      'How does JDBC handle transaction isolation levels (e.g. READ_COMMITTED vs SERIALIZABLE)?'
    ],
    difficulty: 'Medium',
    levels: ['junior', 'mid'],
    modes: ['live-coding', 'mixed-technical'],
    type: 'coding',
    importance: 4,
    tags: ['java', 'jdbc', 'database', 'transactions', 'acid']
  }),

  // ==================== PYTHON ====================
  makeQuestion({
    category: 'Python',
    topic: 'Data Types, Mutability & Memory Model',
    question: 'Debug this Python function: Why does the following function produce unexpected cumulative lists across multiple invocations, and how do you write the idiomatic fix?\n\n```python\ndef append_item(val, target_list=[]):\n    target_list.append(val)\n    return target_list\n\nprint(append_item(1)) # [1]\nprint(append_item(2)) # [1, 2] -- expected [2]!\n```',
    idealAnswer: 'In Python, default parameter expressions are evaluated once when the function definition is executed, NOT each time the function is called. Because a list is a mutable object, the same single list instance in memory is bound to the default parameter `target_list` and reused across all subsequent calls. The idiomatic fix is to set the default argument to `None` and initialize a new list inside the function body: `def append_item(val, target_list=None): if target_list is None: target_list = [] target_list.append(val); return target_list`.',
    keyPoints: [
      'Default function arguments are evaluated at function definition time, not runtime call time.',
      'Mutable default objects (lists, dicts, sets) persist state across calls.',
      'Idiomatic Python pattern uses None as sentinel default value.',
      'New object initialized inside function scope ensures fresh memory instance per invocation.'
    ],
    followUps: [
      'Can mutable default arguments ever be intentionally used (e.g. memoization cache)?',
      'How does Python store default argument objects internally on function.__defaults__?'
    ],
    difficulty: 'Easy',
    levels: ['internship', 'fresher', 'junior'],
    modes: ['debugging', 'mixed-technical'],
    type: 'debugging',
    importance: 5,
    tags: ['python', 'debugging', 'mutability', 'functions', 'memory']
  }),
  makeQuestion({
    category: 'Python',
    topic: 'GIL (Global Interpreter Lock) & Threading vs Multiprocessing',
    question: 'What is the Global Interpreter Lock (GIL) in CPython, why does it exist, and how should an engineer architect CPU-bound vs I/O-bound Python workloads?',
    idealAnswer: 'The GIL is a mutex that prevents multiple native threads from executing CPython bytecodes simultaneously. It was introduced to simplify CPython memory management and reference counting (which is not thread-safe). For I/O-bound workloads (web APIs, network sockets, database queries), standard threading or asyncio works efficiently because the thread releases the GIL while awaiting system calls. For CPU-bound workloads (data crunching, image processing, model training), Python threads cannot utilize multi-core CPUs; instead, engineers must use `multiprocessing` (spawning separate OS processes with separate GILs and address spaces) or C-extensions/NumPy that release the GIL during execution.',
    keyPoints: [
      'GIL ensures only one thread executes Python bytecode at any moment in CPython.',
      'Protects CPython memory management and reference counts from race conditions.',
      'I/O-bound tasks release the GIL during blocking system calls, making threading/asyncio viable.',
      'CPU-bound tasks require multiprocessing or Cython/C extensions to achieve parallel multicore utilization.'
    ],
    followUps: [
      'What is PEP 703 (Free-threaded Python 3.13) and how does it remove the GIL?',
      'How do multiprocessing workers communicate efficiently using shared memory (multiprocessing.shared_memory)?'
    ],
    difficulty: 'Medium',
    levels: ['junior', 'mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive'],
    type: 'conceptual',
    importance: 5,
    tags: ['python', 'gil', 'concurrency', 'multiprocessing', 'threading']
  }),
  makeQuestion({
    category: 'Python',
    topic: 'Decorators, Context Managers & Closures',
    question: 'Implement a reusable Python decorator @retry(max_attempts=3, delay=1.0) with exponential backoff that preserves function signature and docstrings.',
    idealAnswer: '```python\nimport time\nfrom functools import wraps\n\ndef retry(max_attempts=3, delay=1.0, backoff=2.0):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            current_delay = delay\n            for attempt in range(1, max_attempts + 1):\n                try:\n                    return func(*args, **kwargs)\n                except Exception as err:\n                    if attempt == max_attempts:\n                        raise\n                    time.sleep(current_delay)\n                    current_delay *= backoff\n        return wrapper\n    return decorator\n```\nUsing `@wraps(func)` from `functools` ensures metadata such as `__name__` and `__doc__` are preserved.',
    keyPoints: [
      'Uses a three-level closure: parameter decorator -> function wrapper -> execution wrapper.',
      'Uses functools.wraps to preserve wrapped function identity and docstrings.',
      'Implements exponential backoff delay calculation.',
      'Reraises the final exception when max_attempts is exhausted.'
    ],
    followUps: [
      'How would you specify custom exception types to retry on (e.g. exceptions=(TimeoutError, ConnectionError))?',
      'How do async decorators work with asyncio coroutines?'
    ],
    difficulty: 'Medium',
    levels: ['junior', 'mid', 'senior'],
    modes: ['live-coding', 'mixed-technical'],
    type: 'coding',
    importance: 5,
    tags: ['python', 'decorators', 'closures', 'coding', 'resilience']
  }),
  makeQuestion({
    category: 'Python',
    topic: 'Asyncio & Asynchronous Programming',
    question: 'Explain the difference between asyncio.gather() and asyncio.TaskGroup (introduced in Python 3.11). Why is TaskGroup considered safer?',
    idealAnswer: '`asyncio.gather()` runs multiple awaitables concurrently. However, if one coroutine raises an exception, other running tasks continue executing in the background unmanaged (unless explicitly cancelled), which can cause resource leaks and silent failures. `asyncio.TaskGroup` provides structured concurrency through an asynchronous context manager (`async with asyncio.TaskGroup() as tg:`). If any task inside the group raises an uncaught exception, TaskGroup automatically cancels all other remaining tasks in the group and aggregates errors into an `ExceptionGroup`, ensuring no orphaned background tasks remain.',
    keyPoints: [
      'asyncio.gather does not enforce structured task lifecycle cancellation on partial failure.',
      'asyncio.TaskGroup guarantees structured concurrency via async context manager.',
      'TaskGroup automatically cancels sibling tasks when any task fails.',
      'Aggregates simultaneous multiple exceptions into Python 3.11 ExceptionGroup.'
    ],
    followUps: [
      'How do you handle ExceptionGroup in Python 3.11 using the `except*` syntax?',
      'What happens if a task within TaskGroup handles its own exception with try/except?'
    ],
    difficulty: 'Hard',
    levels: ['mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive'],
    type: 'conceptual',
    importance: 4,
    tags: ['python', 'asyncio', 'taskgroup', 'python311', 'concurrency']
  }),

  // ==================== JAVASCRIPT ====================
  makeQuestion({
    category: 'JavaScript',
    topic: 'Event Loop, Microtasks & Asynchronous JS',
    question: 'Predict the console output of this snippet and explain the execution order between synchronous code, Promise microtasks, and setTimeout macrotasks:\n\n```javascript\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => {\n  console.log(3);\n  process.nextTick ? queueMicrotask(() => console.log(4)) : null;\n});\nconsole.log(5);\n```',
    idealAnswer: 'The output is: `1`, `5`, `3`, `4`, `2`.\nExecution explanation:\n1. Synchronous code executes first: `console.log(1)` and `console.log(5)` are pushed to call stack and output immediately.\n2. `setTimeout` schedules callback `2` onto the Macrotask (Task) queue.\n3. `Promise.resolve().then()` schedules callback `3` onto the Microtask queue.\n4. Call stack empties. The Event Loop prioritizes and completely drains the Microtask queue before picking any macrotask.\n5. Microtask executes: prints `3`, and queues another microtask `4`.\n6. The Event Loop continues draining microtasks, printing `4`.\n7. When microtask queue is empty, the Event Loop picks the macrotask `setTimeout`, printing `2`.',
    keyPoints: [
      'Synchronous call stack has highest priority (prints 1, 5).',
      'Microtask queue (Promises, queueMicrotask) executes completely before next macrotask.',
      'Microtasks queued from within microtasks run in the current turn before any macrotask (prints 3, 4).',
      'Macrotask queue (setTimeout, setInterval, I/O) runs only after call stack and microtasks are clear (prints 2).'
    ],
    followUps: [
      'How does requestAnimationFrame fit into this sequence in browser rendering?',
      'What happens if a microtask recursively queues another microtask endlessly?'
    ],
    difficulty: 'Medium',
    levels: ['fresher', 'junior', 'mid'],
    modes: ['mixed-technical', 'conceptual-deep-dive'],
    type: 'conceptual',
    importance: 5,
    tags: ['javascript', 'event-loop', 'microtasks', 'promises', 'async']
  }),
  makeQuestion({
    category: 'JavaScript',
    topic: 'Scope, Closures & Execution Context',
    question: 'Implement a debounce function with leading and trailing execution options in JavaScript.',
    idealAnswer: '```javascript\nfunction debounce(func, wait, { leading = false, trailing = true } = {}) {\n  let timerId = null;\n  let lastArgs = null;\n  let lastThis = null;\n\n  return function (...args) {\n    lastArgs = args;\n    lastThis = this;\n    const isInvoking = leading && !timerId;\n\n    clearTimeout(timerId);\n    timerId = setTimeout(() => {\n      if (trailing && !isInvoking) {\n        func.apply(lastThis, lastArgs);\n      }\n      timerId = null;\n      lastArgs = null;\n      lastThis = null;\n    }, wait);\n\n    if (isInvoking) {\n      func.apply(lastThis, lastArgs);\n    }\n  };\n}\n```',
    keyPoints: [
      'Uses closure to encapsulate timerId across successive invocations.',
      'Preserves execution context (this) and dynamic arguments (*args).',
      'clearTimeout resets elapsed timer on rapid successive calls.',
      'Supports leading edge immediate execution and trailing edge final execution.'
    ],
    followUps: [
      'How does debounce differ fundamentally from throttle in rate-limiting?',
      'How would you add a `.cancel()` method to the returned debounced function?'
    ],
    difficulty: 'Medium',
    levels: ['junior', 'mid', 'senior'],
    modes: ['live-coding', 'mixed-technical'],
    type: 'coding',
    importance: 5,
    tags: ['javascript', 'debounce', 'closures', 'coding', 'web']
  }),

  // ==================== TYPESCRIPT ====================
  makeQuestion({
    category: 'TypeScript',
    topic: 'Generics, Conditional Types & Inference',
    question: 'Implement a custom TypeScript utility type `DeepReadonly<T>` that recursively makes all nested object properties, arrays, and tuples readonly.',
    idealAnswer: '```typescript\ntype DeepReadonly<T> = T extends Function | boolean | number | string | symbol | null | undefined\n  ? T\n  : T extends Array<infer U>\n  ? ReadonlyArray<DeepReadonly<U>>\n  : T extends Map<infer K, infer V>\n  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>\n  : T extends Set<infer M>\n  ? ReadonlySet<DeepReadonly<M>>\n  : { readonly [K in keyof T]: DeepReadonly<T[K]> };\n```\nThis conditional type checks primitives, arrays, built-in collections, and objects, recursively applying `readonly` to each layer.',
    keyPoints: [
      'Handles base primitive types and functions by returning T unchanged.',
      'Handles Array<U> using infer U and ReadonlyArray.',
      'Uses mapped types `{ readonly [K in keyof T]: DeepReadonly<T[K]> }` for object keys.',
      'Recursively prevents property mutation throughout deep object trees.'
    ],
    followUps: [
      'How does TypeScript infer keyword work inside conditional type extends clauses?',
      'Why must Function be excluded from recursive mapped property traversal?'
    ],
    difficulty: 'Hard',
    levels: ['mid', 'senior'],
    modes: ['live-coding', 'mixed-technical'],
    type: 'coding',
    importance: 5,
    tags: ['typescript', 'generics', 'conditional-types', 'types']
  }),
  makeQuestion({
    category: 'TypeScript',
    topic: 'Type Narrowing, Guards & Discriminated Unions',
    question: 'What is a Discriminated Union (Tagged Union) in TypeScript, and why is exhaustive type checking with the `never` type a production best practice?',
    idealAnswer: 'A Discriminated Union is a union of object types where each variant shares a common literal property with unique string/number values (e.g. `type Action = { type: "FETCH_SUCCESS"; payload: Data } | { type: "FETCH_ERROR"; error: Error }`). TypeScript automatically narrows the type in switch/if blocks based on that discriminant key. Exhaustive type checking assigns the default branch in a switch statement to a variable of type `never`: `const _exhaustiveCheck: never = action; throw new Error("Unhandled action: " + action)`. If a developer adds a new variant to the union in the future without updating the switch statement, the TypeScript compiler fails at build time, preventing runtime bugs.',
    keyPoints: [
      'Shared literal property acts as discriminant tag for compiler narrowing.',
      'Switch/if statements automatically narrow type inside matching case blocks.',
      'Assigning unhandled cases to `never` enforces compile-time exhaustiveness.',
      'Build fails if new variants are added to union without updating all consumer branches.'
    ],
    followUps: [
      'How do custom user-defined type guards (`pet is Dog`) differ from discriminated unions?',
      'Can template literal types be used as union discriminants?'
    ],
    difficulty: 'Medium',
    levels: ['junior', 'mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive'],
    type: 'conceptual',
    importance: 5,
    tags: ['typescript', 'type-narrowing', 'discriminated-unions', 'compiler']
  }),

  // ==================== C++ ====================
  makeQuestion({
    category: 'C++',
    topic: 'Smart Pointers, RAII & Memory Management',
    question: 'Compare std::unique_ptr, std::shared_ptr, and std::weak_ptr in C++. How does std::weak_ptr resolve cyclic dependency memory leaks?',
    idealAnswer: '`std::unique_ptr` represents exclusive ownership with zero runtime overhead over a raw pointer; it cannot be copied, only moved. `std::shared_ptr` provides shared ownership via a reference-counted control block allocated on the heap (incrementing on copy, decrementing on destruction). `std::weak_ptr` holds a non-owning observer reference to a `std::shared_ptr`-managed object without incrementing the strong reference count. If two objects hold `std::shared_ptr` to each other, their strong counts never drop to zero, leaking memory. Replacing one reference with `std::weak_ptr` breaks the cycle, allowing destruction when all strong references disappear. To access the object, `weak_ptr::lock()` must be called to produce a temporary `std::shared_ptr`.',
    keyPoints: [
      'unique_ptr has exclusive ownership, move-only semantics, zero overhead.',
      'shared_ptr has reference counting via control block; thread-safe counter manipulation.',
      'weak_ptr does not increment strong count; prevents cyclic reference memory leaks.',
      'weak_ptr.lock() safely checks if object is still alive before dereferencing.'
    ],
    followUps: [
      'Why should you prefer std::make_shared over explicit new with std::shared_ptr?',
      'Is the object pointed to by std::shared_ptr thread-safe if the reference counter itself is thread-safe?'
    ],
    difficulty: 'Medium',
    levels: ['junior', 'mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive'],
    type: 'conceptual',
    importance: 5,
    tags: ['cpp', 'smart-pointers', 'raii', 'memory', 'modern-cpp']
  }),
  makeQuestion({
    category: 'C++',
    topic: 'Modern C++ (C++11/14/17/20), Move Semantics & Rvalues',
    question: 'Explain Move Semantics and Rvalue References (T&&) in C++11. How does std::move differ from std::forward?',
    idealAnswer: 'Move semantics enables the transfer of expensive resources (dynamically allocated memory, file descriptors) from temporary rvalue objects to new objects without deep-copying. Rvalue references (`T&&`) bind to temporary objects about to be destroyed. `std::move<T>(var)` is an unconditional static cast that converts an lvalue expression into an rvalue, indicating its resources can be pilfered. `std::forward<T>(var)` is a conditional cast used in template forwarding (perfect forwarding); it preserves the original value category (lvalue vs rvalue) passed to universal references (`auto&&` or `T&&`), ensuring lvalues remain lvalues and rvalues remain rvalues.',
    keyPoints: [
      'Move semantics avoids expensive heap deep-copies by transferring internal pointer ownership.',
      'Rvalues represent temporary objects at the end of their lifecycle.',
      'std::move unconditionally casts an expression to an rvalue.',
      'std::forward conditionally casts to preserve value category in perfect forwarding.'
    ],
    followUps: [
      'What is the Rule of 5 in modern C++?',
      'Why should you not access an object after passing it to std::move?'
    ],
    difficulty: 'Hard',
    levels: ['mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive'],
    type: 'conceptual',
    importance: 5,
    tags: ['cpp', 'move-semantics', 'rvalues', 'modern-cpp', 'performance']
  }),

  // ==================== C ====================
  makeQuestion({
    category: 'C',
    topic: 'Pointers & Memory Addresses',
    question: 'Debug this C function: Identify all undefined behaviors and memory leaks, and write the corrected version.\n\n```c\nchar* get_greeting(const char* name) {\n    char buffer[64];\n    sprintf(buffer, "Hello, %s!", name);\n    return buffer;\n}\n```',
    idealAnswer: 'The critical bug is returning a pointer to a stack-allocated local array (`buffer`). When `get_greeting` returns, its stack frame is popped from memory. The returned pointer points to deallocated stack memory (dangling pointer), causing undefined behavior, memory corruption, or segmentation faults when dereferenced. Additionally, `sprintf` risks buffer overflow if `name` exceeds 56 characters.\n\nCorrected version:\n```c\nchar* get_greeting(const char* name) {\n    if (!name) return NULL;\n    size_t len = strlen(name) + 16;\n    char* buffer = (char*)malloc(len);\n    if (!buffer) return NULL;\n    snprintf(buffer, len, "Hello, %s!", name);\n    return buffer;\n}\n```\nThe caller is responsible for calling `free()` on the returned heap pointer.',
    keyPoints: [
      'Returning address of local stack variable leads to dangling pointer undefined behavior.',
      'Local arrays cease to exist after function stack frame returns.',
      'sprintf is vulnerable to buffer overflow; snprintf with explicit bounds must be used.',
      'Must allocate heap memory via malloc() and document that caller owns the free() responsibility.'
    ],
    followUps: [
      'What is an alternative approach where the caller passes an allocated buffer and its capacity?',
      'How does Valgrind detect use-after-free and stack-address returns?'
    ],
    difficulty: 'Easy',
    levels: ['internship', 'fresher', 'junior'],
    modes: ['debugging', 'mixed-technical'],
    type: 'debugging',
    importance: 5,
    tags: ['c', 'pointers', 'memory', 'debugging', 'buffer-overflow']
  }),
  makeQuestion({
    category: 'C',
    topic: 'Dynamic Memory Allocation (malloc, calloc, realloc, free)',
    question: 'Write a robust dynamic array (vector) in C supporting push_back and memory growth with proper realloc error handling.',
    idealAnswer: '```c\n#include <stdlib.h>\n\ntypedef struct {\n    int* data;\n    size_t size;\n    size_t capacity;\n} DynamicArray;\n\nint darray_push_back(DynamicArray* arr, int val) {\n    if (arr->size == arr->capacity) {\n        size_t new_cap = arr->capacity == 0 ? 4 : arr->capacity * 2;\n        int* new_data = (int*)realloc(arr->data, new_cap * sizeof(int));\n        if (!new_data) return 0; // Allocation failed; original array unharmed\n        arr->data = new_data;\n        arr->capacity = new_cap;\n    }\n    arr->data[arr->size++] = val;\n    return 1;\n}\n```\nCrucially, assigning `realloc` directly to `arr->data` (`arr->data = realloc(...)`) would cause a memory leak if `realloc` failed and returned `NULL`.',
    keyPoints: [
      'Geometric capacity doubling achieves amortized O(1) insertion time.',
      'Never assign realloc result directly to original pointer; failure leaks original memory.',
      'Checks for NULL return from realloc to handle out-of-memory gracefully.',
      'Properly tracks both active size and allocated capacity.'
    ],
    followUps: [
      'Why is geometric capacity growth (factor of 1.5 or 2) required for amortized O(1) performance?',
      'What is memory fragmentation and how does frequent reallocation affect allocator efficiency?'
    ],
    difficulty: 'Medium',
    levels: ['junior', 'mid'],
    modes: ['live-coding', 'mixed-technical'],
    type: 'coding',
    importance: 5,
    tags: ['c', 'realloc', 'malloc', 'dynamic-array', 'coding']
  }),

  // ==================== GO ====================
  makeQuestion({
    category: 'Go',
    topic: 'Goroutines, Channels & Concurrency Patterns',
    question: 'How do unbuffered and buffered channels differ in Go? What causes a goroutine leak, and how do you prevent it using context.Context?',
    idealAnswer: 'An unbuffered channel (`make(chan T)`) provides synchronous rendezvous communication: a sender blocks until a receiver is ready, and vice versa. A buffered channel (`make(chan T, n)`) accepts up to `n` elements without blocking. A goroutine leak occurs when a goroutine is launched but blocks indefinitely on a channel send or receive because no other goroutine is reading/writing or because an error caused the parent to exit early. To prevent leaks, long-running goroutines should monitor `ctx.Done()` from `context.Context` in a `select` statement and terminate immediately when cancellation is triggered.',
    keyPoints: [
      'Unbuffered channels synchronize sender and receiver at exact point of handoff.',
      'Buffered channels decouple execution until the ring buffer fills or empties.',
      'Goroutine leaks waste stack memory and file descriptors because Go runtime cannot GC blocked goroutines.',
      'context.Context propagation with select { case <-ctx.Done(): return } ensures clean termination.'
    ],
    followUps: [
      'What happens if you send to or close a closed channel in Go?',
      'How does the Go race detector (`go test -race`) detect unsynchronized memory access?'
    ],
    difficulty: 'Medium',
    levels: ['junior', 'mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive'],
    type: 'conceptual',
    importance: 5,
    tags: ['go', 'channels', 'goroutines', 'concurrency', 'context']
  }),
  makeQuestion({
    category: 'Go',
    topic: 'Slices, Arrays & Memory Layout',
    question: 'Debug this Go code: Why does modifying `sub` sometimes mutate `original` and sometimes not?\n\n```go\nfunc main() {\n    original := []int{1, 2, 3, 4, 5}\n    sub := original[1:3]\n    sub = append(sub, 99)\n    fmt.Println(original)\n}\n```',
    idealAnswer: 'In Go, a slice is a header struct consisting of a pointer to an underlying array, a length, and a capacity. `sub := original[1:3]` creates a slice pointing to index 1 of the same backing array, with length 2 and capacity 4 (`5 - 1`). When `append(sub, 99)` is executed, because `len < cap`, Go writes `99` directly into the existing backing array at index 3, mutating `original[3]` to `99`. However, if `sub` had exceeded its capacity, `append` would allocate a brand new backing array on the heap, decoupling `sub` from `original`. To avoid unintended mutations, developers use the 3-index slice syntax `original[1:3:3]` to restrict capacity to length.',
    keyPoints: [
      'Slices are headers { pointer, len, cap } pointing to underlying backing arrays.',
      'Sub-slicing shares the existing backing array up to the original capacity.',
      'append() mutates shared backing array if capacity is available.',
      'append() reallocates to a new backing array when capacity is exceeded.',
      'Fix: use 3-index slicing `original[low:high:max]` to constrain capacity.'
    ],
    followUps: [
      'How does Go growth formula for slice capacity change between Go 1.18+ and earlier versions?',
      'Can passing a slice to a function modify the caller slice length?'
    ],
    difficulty: 'Medium',
    levels: ['fresher', 'junior', 'mid'],
    modes: ['debugging', 'mixed-technical'],
    type: 'debugging',
    importance: 5,
    tags: ['go', 'slices', 'memory', 'debugging', 'internals']
  }),

  // ==================== RUST ====================
  makeQuestion({
    category: 'Rust',
    topic: 'Ownership, Borrowing & Lifetimes',
    question: 'Explain Rust\'s Ownership model and the Borrow Checker rules. How do these eliminate data races and dangling pointers at compile time without a Garbage Collector?',
    idealAnswer: 'Rust enforces memory safety via three ownership rules: 1) Each value has a single owner variable; 2) When the owner goes out of scope, the value is dropped; 3) You can have either any number of immutable references (`&T`) OR exactly one mutable reference (`&mut T`) at any given time, but not both simultaneously. This prevents data races at compile time because no thread or reference can mutate data while another reads it. Dangling pointers are impossible because the borrow checker verifies through lifetimes (`\'a`) that references never outlive the data they point to, eliminating the need for a runtime garbage collector.',
    keyPoints: [
      'Single owner per resource with deterministic drop (RAII) at end of scope.',
      'Aliasing XOR Mutability: multiple readers OR one writer, never both.',
      'Compile-time lifetime analysis guarantees references never outlive referenced data.',
      'Zero-cost abstraction: all safety verification occurs at compile time without GC pauses.'
    ],
    followUps: [
      'What is interior mutability (RefCell<T> / Mutex<T>) and how does it defer borrow checking to runtime?',
      'What does the `Send` and `Sync` marker traits signify in multithreaded Rust?'
    ],
    difficulty: 'Medium',
    levels: ['junior', 'mid', 'senior'],
    modes: ['mixed-technical', 'conceptual-deep-dive'],
    type: 'conceptual',
    importance: 5,
    tags: ['rust', 'ownership', 'borrow-checker', 'lifetimes', 'memory']
  })
];
