/**
 * Curated Question Bank - Java
 * Structured progression from JVM fundamentals to multithreading and memory diagnostics.
 */

export const JAVA_QUESTIONS = [
  {
    questionId: "java_jvm_001",
    questionText: "Explain the architecture of the Java Virtual Machine (JVM). How does Java achieve platform independence through the execution lifecycle from source code to native machine execution?",
    category: "Java",
    topic: "Core Java & JVM Internals",
    subtopic: "JVM Architecture & Execution Lifecycle",
    difficulty: "Easy",
    questionType: "conceptual",
    sequenceOrder: 1,
    learningStage: "Fundamentals",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Java Developer", "Backend Developer", "Junior Software Engineer"],
    interviewMode: "conceptual",
    tags: ["java", "jvm", "bytecode", "jit", "classloader"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Source code (.java) compiles to bytecode (.class) via javac",
      "Classloader loads, links, and initializes bytecode into JVM memory",
      "Execution engine uses Interpreter for rapid startup and JIT (Just-In-Time) compiler for hot code optimization into native machine code",
      "Platform independence: bytecode runs on any OS having a platform-specific JVM implementation"
    ],
    referenceAnswer: "Java achieves platform independence through its write-once, run-anywhere model. The javac compiler translates human-readable source code (.java) into intermediate bytecode (.class). When executed, the host operating system's platform-specific JVM loads the bytecode via its ClassLoader subsystem. The JVM execution engine initially interprets bytecode instructions. For frequently executed hot spots, the JIT (Just-In-Time) compiler compiles bytecode directly into native host machine code, applying optimizations like method inlining and loop unrolling.",
    stepByStepExplanation: "1. Compilation: 'javac App.java' produces platform-neutral bytecode ('App.class').\n2. Class Loading: Bootstrap, Extension/Platform, and Application ClassLoaders load bytecode into the JVM Metaspace/Method Area.\n3. Bytecode Verification: JVM verifies memory boundaries and type safety before execution.\n4. Execution Engine: Uses an interpreter for quick execution, while HotSpot JIT compilers (C1/C2) monitor execution counters and compile repetitive code paths into optimized native machine instructions.",
    practicalExample: "public class JVMInspection {\n    public static void main(String[] args) {\n        // Demonstrates runtime info from the active JVM instance\n        Runtime rt = Runtime.getRuntime();\n        System.out.println(\"Available CPU Processors: \" + rt.availableProcessors());\n        System.out.println(\"Total Heap Memory: \" + (rt.totalMemory() / (1024 * 1024)) + \" MB\");\n    }\n}",
    commonMistakes: [
      "Confusing JDK (development tools + compiler), JRE (runtime libraries), and JVM (execution engine)",
      "Claiming Java is purely interpreted or purely compiled; it is hybrid (interpreted + JIT compiled)",
      "Assuming bytecode is platform-dependent; bytecode is universal, whereas JVM binaries are platform-specific"
    ],
    timeComplexity: "",
    spaceComplexity: "",
    suggestedFollowUps: ["How do ClassLoaders enforce delegation through the Parent Delegation Model?", "What is the difference between HotSpot C1 and C2 compilers?"],
    hints: ["Trace the path of a .java file from 'javac' to bytecode to native CPU execution."]
  },
  {
    questionId: "java_str_002",
    questionText: "Why are String objects immutable in Java? Explain how the String Constant Pool functions and compare String with StringBuilder and StringBuffer.",
    category: "Java",
    topic: "Core Java & JVM Internals",
    subtopic: "String Immutability & Memory Pooling",
    difficulty: "Easy",
    questionType: "conceptual",
    sequenceOrder: 2,
    learningStage: "Fundamentals",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Java Developer", "Junior Software Engineer"],
    interviewMode: "conceptual",
    tags: ["java", "strings", "immutability", "string-pool", "memory"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Immutability enables String Constant Pool caching in heap memory",
      "Security: Strings are used for database credentials, URLs, and network sockets; immutability prevents tampering",
      "Thread Safety: Immutable objects are inherently thread-safe across concurrent threads without synchronization",
      "StringBuilder is mutable and non-synchronized (faster for single-thread loops); StringBuffer is synchronized (thread-safe, higher overhead)"
    ],
    referenceAnswer: "Strings in Java are immutable for security, caching, and thread safety. Because Strings cannot be mutated after creation, the JVM can safely cache identical string literals in the String Constant Pool (located in the heap), saving significant memory. Immutability also guarantees that sensitive parameters (e.g., file paths, database URLs, auth tokens) cannot be altered maliciously between validation and usage, and allows hashCode caching for fast hash lookups. For frequent concatenations, StringBuilder provides mutable buffers without synchronization overhead, whereas StringBuffer synchronizes all mutation methods for legacy thread safety.",
    stepByStepExplanation: "1. Literal Creation: 'String s1 = \"hello\";' checks the String Pool. If present, it returns the pooled reference; otherwise, it creates it in the pool.\n2. Constructor: 'String s2 = new String(\"hello\");' allocates a new object in normal heap memory pointing to pooled char/byte content.\n3. Concatenation in loops creates excessive garbage objects unless StringBuilder is utilized.",
    practicalExample: "// Inefficient: creates 10,000 intermediate String objects\nString s = \"\";\nfor (int i = 0; i < 10000; i++) s += i;\n\n// Efficient: single expandable array buffer\nStringBuilder sb = new StringBuilder(10000);\nfor (int i = 0; i < 10000; i++) sb.append(i);\nString result = sb.toString();",
    commonMistakes: [
      "Using String concatenation inside tight loops instead of StringBuilder",
      "Believing String Constant Pool is still in PermGen; it was moved to the Java Heap in Java 7",
      "Believing String.intern() should be used everywhere without understanding memory footprint costs"
    ],
    suggestedFollowUps: ["What does String.intern() do?", "How did Java 9 Compact Strings change memory layout from char[] to byte[]?"],
    hints: ["Consider what would happen in a multi-threaded system if a String used as a database connection URL could be modified in place."]
  },
  {
    questionId: "java_eq_003",
    questionText: "What is the difference between '==' and '.equals()' in Java? Why is overriding hashCode() mandatory whenever you override equals(), and what happens if you violate this contract?",
    category: "Java",
    topic: "Core Java & JVM Internals",
    subtopic: "Object Equality & Hashing Contract",
    difficulty: "Easy",
    questionType: "conceptual",
    sequenceOrder: 3,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Java Developer", "Backend Developer"],
    interviewMode: "conceptual",
    tags: ["java", "equality", "hashcode", "hashmap", "contract"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "'==' checks memory address reference equality for objects and raw values for primitives",
      "'.equals()' evaluates semantic state/value equality as overridden by class implementation",
      "Contract: If two objects are equal according to equals(), they must produce identical hashCode() values",
      "Violating contract causes hash-based collections (HashMap, HashSet) to misplace keys in wrong buckets, leading to null lookups or duplicate entries"
    ],
    referenceAnswer: "'==' tests reference identity (whether both reference variables point to the exact same memory address), whereas '.equals()' tests logical state equality as defined by the class. The Object contract dictates that if o1.equals(o2) is true, then o1.hashCode() must equal o2.hashCode(). If equals() is overridden without hashCode(), two objects deemed equal will produce different hash codes. In a HashMap or HashSet, the bucket index is computed from hashCode(); mismatched hash codes cause the key to be searched in the wrong bucket, resulting in null returns or duplicate key entries.",
    stepByStepExplanation: "1. Default Object.equals() uses '==' reference equality.\n2. When overriding equals(), you compare the business identifier fields (e.g., employeeId).\n3. You must override hashCode() using those exact same fields.\n4. When a key is inserted into HashMap: bucket index = hash(key.hashCode()) & (capacity - 1).\n5. On lookup: HashMap checks bucket index by hashCode first, then traverses entries checking equals().",
    practicalExample: "public class Employee {\n    private final int id;\n    private final String department;\n\n    public Employee(int id, String department) {\n        this.id = id;\n        this.department = department;\n    }\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Employee e)) return false;\n        return id == e.id && Objects.equals(department, e.department);\n    }\n\n    @Override\n    public int hashCode() {\n        return Objects.hash(id, department);\n    }\n}",
    commonMistakes: [
      "Overloading equals(Employee other) instead of overriding equals(Object other)",
      "Using mutable fields in hashCode() calculations, causing elements in HashSet to become unretrievable if mutated after insertion",
      "Assuming two objects with the same hashCode must be equal (hash collisions are valid)"
    ],
    suggestedFollowUps: ["Can two unequal objects have the same hashCode?", "What happens if a key object's field is mutated after insertion into a HashMap?"],
    hints: ["Consider what HashMap does step-by-step during a map.get(key) operation."]
  },
  {
    questionId: "java_coll_004",
    questionText: "How does Java 8's HashMap handle internal collisions? Explain the conditions and internal mechanism for treeification (LinkedList to Red-Black Tree) and load factor.",
    category: "Java",
    topic: "Collections Framework & Generics",
    subtopic: "HashMap Internal Architecture & Collision Resolution",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 4,
    learningStage: "Common Interview Questions",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Java Developer", "Backend Developer", "Senior Java Engineer"],
    interviewMode: "conceptual",
    tags: ["java", "hashmap", "data-structures", "red-black-tree", "collections"],
    companyStyleLabel: "Enterprise / FinTech",
    expectedKeyPoints: [
      "HashMap stores entries in an array of Node buckets (Node<K,V>[] table)",
      "Collisions are resolved via separate chaining (LinkedList)",
      "Java 8 Treeification: When a bucket chain length reaches TREEIFY_THRESHOLD (8) AND total table capacity >= MIN_TREEIFY_CAPACITY (64), the linked list converts to a balanced Red-Black Tree (TreeNode)",
      "Complexity drops from O(n) worst-case linear search down to O(log n) tree lookup",
      "Default load factor is 0.75; resizing doubles the bucket array (capacity * 2) and re-indexes nodes using high/low bit partitioning"
    ],
    referenceAnswer: "In Java 8, HashMap resolves collisions via separate chaining using a bucket array (Node<K,V>[] table). When multiple keys map to the same bucket index, entries form a singly linked list. If the chain length reaches TREEIFY_THRESHOLD (8) and the overall array capacity is at least MIN_TREEIFY_CAPACITY (64), Java converts the chain into a balanced Red-Black Tree (TreeNode). This prevents Denial-of-Service attacks from hash collisions by reducing worst-case lookup time from O(n) to O(log n). If table capacity is under 64, it resizes the table instead of treeifying. When items are removed and tree size drops below UNTREEIFY_THRESHOLD (6), it reverts back to a linked list.",
    stepByStepExplanation: "1. Key hash is spread using 'hash = key.hashCode() ^ (key.hashCode() >>> 16)'.\n2. Bucket index is computed using 'index = (n - 1) & hash'.\n3. If empty, a new Node is placed.\n4. If occupied, it traverses the list/tree checking equals(); updates existing value or appends.\n5. If chain count reaches 8 and array length >= 64, treeifyBin converts it to a Red-Black Tree.\n6. If total size > capacity * loadFactor (0.75), resize() doubles the table capacity.",
    practicalExample: "// Demonstrating high-collision scenario\nMap<BadHashKey, String> map = new HashMap<>();\n// When 8+ BadHashKey entries share identical hash codes,\n// Java 8 upgrades the bucket from LinkedList to Red-Black Tree automatically.",
    commonMistakes: [
      "Claiming treeification occurs as soon as 8 elements collide regardless of table capacity (capacity must also be >= 64, otherwise it resizes)",
      "Claiming HashMap is thread-safe (use ConcurrentHashMap in multi-threaded code)",
      "Thinking untreeification happens at 8; it happens at 6 to avoid thrashing between tree and list"
    ],
    suggestedFollowUps: ["Why does HashMap capacity always remain a power of two?", "How does the bitwise (n - 1) & hash operation optimize the modulo operator?"],
    hints: ["Think about time complexity: why was O(n) worst-case collision unacceptable in security-sensitive production apps?"]
  },
  {
    questionId: "java_th_005",
    questionText: "Explain the difference between the volatile keyword and the synchronized keyword in Java. How does the Java Memory Model (JMM) guarantee visibility and ordering?",
    category: "Java",
    topic: "Multithreading, Concurrency & JMM",
    subtopic: "JMM, Volatile & Synchronization",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 5,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Java Developer", "Backend Developer", "Senior Java Engineer"],
    interviewMode: "conceptual",
    tags: ["java", "concurrency", "multithreading", "jmm", "volatile", "synchronized"],
    companyStyleLabel: "Enterprise / FinTech",
    expectedKeyPoints: [
      "volatile guarantees memory visibility and instruction ordering (happens-before), but NOT mutual exclusion or compound atomicity (e.g. count++)",
      "synchronized guarantees mutual exclusion (atomicity), memory visibility, and ordering via monitor locks",
      "JMM: CPU caches write volatile variables directly to main memory and invalidates core caches on reads",
      "Memory barriers / fence instructions prevent compiler and CPU reordering around volatile reads/writes"
    ],
    referenceAnswer: "The volatile keyword guarantees visibility and ordering across threads without locking. In modern multi-core processors, threads maintain local CPU caches. When a variable is declared volatile, the Java Memory Model ensures that every write is flushed directly to main memory and every read fetches directly from main memory, invalidating stale CPU core caches. It also establishes a happens-before relationship, preventing instruction reordering via memory barriers. However, volatile does NOT guarantee atomicity for compound operations like count++ (which involves read-modify-write). The synchronized keyword, conversely, provides both atomicity and visibility by acquiring an intrinsic monitor lock on an object, allowing only one thread inside the critical section.",
    stepByStepExplanation: "1. CPU Cache Problem: Thread A writes 'flag = true' into its L1 cache; Thread B on Core 2 continues reading 'flag == false' from its own cache.\n2. volatile solution: Enforces cache coherence protocol; writes write through to RAM; reads invalidate local cache.\n3. Atomicity limitation: 'volatile int count = 0; count++;' is three bytecode steps (getfield, iadd, putfield); multiple threads will overwrite each other.\n4. Atomic alternative: AtomicInteger uses hardware CAS (Compare-And-Swap) without synchronized lock overhead.",
    practicalExample: "public class GracefulShutdownWorker implements Runnable {\n    // volatile ensures thread instantly observes stop request from another thread\n    private volatile boolean running = true;\n\n    public void stopRunning() { this.running = false; }\n\n    @Override\n    public void run() {\n        while (running) {\n            // perform task\n        }\n    }\n}",
    commonMistakes: [
      "Assuming volatile makes 'count++' or compound operations thread-safe",
      "Using synchronized everywhere without considering contention bottlenecks",
      "Thinking volatile variables can be cached in thread-local registers indefinitely"
    ],
    suggestedFollowUps: ["How does AtomicInteger implement thread-safe counter increment without locks?", "What is a happens-before guarantee in the JMM?"],
    hints: ["Distinguish between 'visibility of single variable' versus 'atomicity of multi-step operation'."]
  },
  {
    questionId: "java_str_006",
    questionText: "How do Java 8 Streams process data? Explain the difference between intermediate and terminal operations, lazy evaluation, and the trade-offs of using parallelStream().",
    category: "Java",
    topic: "Java Streams, Lambdas & Modern Java",
    subtopic: "Stream Pipeline & Lazy Evaluation",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 6,
    learningStage: "Implementation & Coding",
    interviewRelevanceLabel: "Common interview topic",
    targetRoles: ["Software Engineer", "Java Developer", "Backend Developer"],
    interviewMode: "conceptual",
    tags: ["java", "streams", "functional-programming", "parallel-stream", "performance"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Streams do not store data; they are functional pipelines operating over sequences of elements",
      "Intermediate operations (filter, map, sorted) return a new Stream and are lazily evaluated",
      "Terminal operations (collect, forEach, reduce, count) trigger the pipeline execution and close the stream",
      "Short-circuiting terminal operations (findFirst, anyMatch) can terminate traversal early without visiting all elements",
      "parallelStream() utilizes the common ForkJoinPool; can degrade performance for small datasets or blocking I/O tasks"
    ],
    referenceAnswer: "Java 8 Streams represent a functional pipeline of operations over a data source. Operations are bifurcated into intermediate and terminal. Intermediate operations (like filter() and map()) are purely declarative and lazily evaluated; they record pipeline transformations without iterating the underlying data. Execution only begins when a terminal operation (such as collect() or reduce()) is invoked. Streams optimize traversal by fusing operations into a single pass and supporting short-circuiting. While parallelStream() partitions work across cores using the common ForkJoinPool, it introduces thread coordination overhead and should be avoided for small collections, stateful operations, or blocking I/O calls that saturate the shared pool.",
    stepByStepExplanation: "1. Pipeline Construction: list.stream().filter(x -> x > 10).map(x -> x * 2)\n2. Lazy Stage: No elements are processed yet; an internal linked pipeline of Spliterator stages is built.\n3. Terminal Trigger: '.toList()' or '.collect(Collectors.toList())' starts iteration.\n4. Loop Fusion: For each element, filter and map execute in a single pass rather than multiple array passes.\n5. Stream Termination: The stream is consumed and cannot be reused.",
    practicalExample: "List<String> activeUserNames = users.stream()\n    .filter(User::isActive)              // Intermediate (lazy)\n    .map(User::getUsername)             // Intermediate (lazy)\n    .sorted()                           // Intermediate (stateful)\n    .limit(10)                          // Short-circuiting intermediate\n    .collect(Collectors.toList());      // Terminal (triggers execution)",
    commonMistakes: [
      "Attempting to reuse or re-consume a stream after a terminal operation has executed (throws IllegalStateException)",
      "Using parallelStream() for I/O-bound operations, which starves the application-wide common ForkJoinPool",
      "Mutating shared external state inside stream lambda functions (side effects ruin parallelism)"
    ],
    suggestedFollowUps: ["What is the difference between stateful (e.g. sorted) and stateless (e.g. filter) intermediate operations?", "How does Spliterator enable parallel decomposition?"],
    hints: ["What triggers the actual traversal of stream elements?"]
  },
  {
    questionId: "java_gc_007",
    questionText: "How does the HotSpot Garbage Collector manage memory across Eden, Survivor (S0/S1), and Tenured spaces? Explain the Generational Hypothesis and minor vs major GC.",
    category: "Java",
    topic: "Memory Management & Garbage Collection",
    subtopic: "Generational Memory Model & Garbage Collectors",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 7,
    learningStage: "Performance & Optimization",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Java Developer", "Backend Developer", "Senior Java Engineer"],
    interviewMode: "conceptual",
    tags: ["java", "jvm", "garbage-collection", "memory", "hotspot"],
    companyStyleLabel: "Enterprise / FinTech",
    expectedKeyPoints: [
      "Generational Hypothesis: The vast majority of allocated objects have short lifespans and die shortly after allocation",
      "Young Generation: Eden + two Survivor spaces (From/To or S0/S1)",
      "Minor GC: Fast copying collector cleans Eden and active Survivor; survivors copy to alternate Survivor space with incremented age",
      "Tenuring threshold: Objects surviving tenure threshold (default 15 in HotSpot) promote to Old/Tenured Generation",
      "Major/Full GC: Collects Old Generation; incurs higher Stop-The-World (STW) latency"
    ],
    referenceAnswer: "HotSpot's memory architecture is based on the Weak Generational Hypothesis: empirical observation shows that most objects die very shortly after allocation. To optimize collection, the Java heap is partitioned into the Young Generation (Eden + two Survivor spaces, S0 and S1) and the Old/Tenured Generation. New allocations occur in Eden. When Eden fills, a Minor GC executes: reachable objects are copied to the active Survivor space with their age counter incremented, while dead objects are reclaimed instantly. Once an object survives enough collection cycles to exceed the tenuring threshold (default 15), it is promoted to the Old Generation. Major/Full GC reclaims the Old Generation; because the Old Generation is large and fragmented, it requires mark-sweep-compact algorithms that cause longer Stop-The-World (STW) application pauses.",
    stepByStepExplanation: "1. Allocation: New object is allocated in Eden.\n2. Minor GC: Eden fills; JVM stops application threads (STW); copies live Eden + S0 objects to S1; increments age.\n3. Swapping: S0 and S1 swap roles (one is always empty as the destination buffer).\n4. Promotion: Objects crossing tenure threshold promote to Old Generation.\n5. Major GC: Old generation fills; G1, ZGC, or Parallel GC executes to reclaim tenured objects.",
    practicalExample: "// Flags controlling JVM Generational GC:\n// -XX:NewRatio=2        (Old gen is 2x Young gen)\n// -XX:SurvivorRatio=8   (Eden is 8x Survivor space)\n// -XX:MaxTenuringThreshold=15 (Max survivals before promotion)\n// -XX:+UseG1GC          (Enable G1 Garbage Collector)",
    commonMistakes: [
      "Believing System.gc() forces an immediate full GC; it is merely a non-binding hint to the JVM",
      "Thinking both Survivor spaces are used concurrently; one is always empty to receive survivors during Minor GC",
      "Assuming modern collectors like ZGC or G1 use rigid traditional heap regions; G1 uses dynamic regional partitions"
    ],
    suggestedFollowUps: ["How does G1 GC balance pause-time targets with memory reclamation?", "What is the difference between ZGC and traditional CMS/Parallel GC?"],
    hints: ["Why does dividing heap memory into young and old generations make garbage collection much faster than scanning the entire heap every time?"]
  },
  {
    questionId: "java_dbg_008",
    questionText: "How do you diagnose and resolve an OutOfMemoryError in production? Distinguish between 'Java heap space' and 'Metaspace', and describe how to capture and analyze heap dumps.",
    category: "Java",
    topic: "Memory Management & Garbage Collection",
    subtopic: "Production Diagnostics & Memory Leak Analysis",
    difficulty: "Hard",
    questionType: "scenario",
    sequenceOrder: 8,
    learningStage: "Debugging & Edge Cases",
    interviewRelevanceLabel: "Practical scenario",
    targetRoles: ["Senior Java Engineer", "Backend Developer", "Staff Engineer", "SRE"],
    interviewMode: "scenario",
    tags: ["java", "oom", "debugging", "profiling", "heapdump", "production"],
    companyStyleLabel: "Enterprise / FinTech",
    expectedKeyPoints: [
      "'java.lang.OutOfMemoryError: Java heap space' means allocated live objects exceeded -Xmx heap limit, often due to memory leaks (e.g., uncleared static collections, unclosed streams)",
      "'OutOfMemoryError: Metaspace' means class metadata loaded into native memory exceeded -XX:MaxMetaspaceSize (e.g., dynamic class generation with CGLIB or classloader leaks)",
      "Production flags: -XX:+HeapDumpOnOutOfMemoryError and -XX:HeapDumpPath=/var/dumps/",
      "Analysis tools: Eclipse Memory Analyzer Tool (MAT), VisualVM, jcmd, jmap, or async-profiler to inspect dominator tree and GC roots"
    ],
    referenceAnswer: "An OutOfMemoryError indicates that the JVM cannot allocate memory for an object. If the error specifies 'Java heap space', live object instances have filled the configured heap (-Xmx). This typically indicates either an undersized heap for current traffic or a true memory leak where references remain tethered to GC roots (such as unbounded static collections, unclosed resources, or ThreadLocals). If the error specifies 'Metaspace', native memory for class definitions has exceeded -XX:MaxMetaspaceSize, usually caused by dynamic class proxy generation (e.g., CGLIB, ByteBuddy) or hot redeployments without classloader unloading. In production, we configure '-XX:+HeapDumpOnOutOfMemoryError' to capture an HPROF snapshot upon failure. We then analyze the dump in Eclipse MAT or JProfiler, inspect the Dominator Tree to find objects retaining the most heap, and trace the path to GC roots to identify the leaking reference.",
    stepByStepExplanation: "1. Configure Automated Heap Dump: add '-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/var/log/heap.hprof'.\n2. Live Production Inspection: run 'jcmd <pid> GC.heap_info' and 'jmap -histo:live <pid>' to observe instance counts.\n3. Heap Dump Loading: Open HPROF in Eclipse MAT.\n4. Run Leak Suspects Report: Identify classes occupying top percentage of heap.\n5. Inspect Dominator Tree: Find suspect object and right click 'Path to GC Roots' -> 'Exclude weak/soft references' to find the strong reference holding memory.\n6. Fix Root Cause: Clear references, close stream buffers, or implement bounded caches (e.g., Caffeine with eviction policies).",
    practicalExample: "// Classic memory leak: static collection holds strong references indefinitely\npublic class EventRegistry {\n    // Leaking reference: static list prevents GC of registered listeners\n    private static final List<EventListener> listeners = new ArrayList<>();\n    \n    public static void register(EventListener l) { listeners.add(l); }\n    // Fix: provide unregister, or use WeakReference/bounded cache with TTL\n}",
    commonMistakes: [
      "Simply increasing -Xmx when a true memory leak is present; this only postpones the crash",
      "Taking a live heap dump using 'jmap -dump:live' during peak production traffic without realizing it pauses the JVM",
      "Confusing Metaspace (native memory for class metadata) with the Java Heap"
    ],
    suggestedFollowUps: ["What are GC Roots and why do weak references not prevent garbage collection?", "How can uncleaned ThreadLocal variables cause memory leaks in thread pools?"]
  },
  {
    questionId: "java_adv_009",
    questionText: "How does ConcurrentHashMap achieve thread safety in Java 8 compared to Collections.synchronizedMap? Explain CAS, synchronized node locks, and why size() estimation is non-blocking.",
    category: "Java",
    topic: "Multithreading, Concurrency & JMM",
    subtopic: "ConcurrentHashMap Internals & Lock Striping",
    difficulty: "Hard",
    questionType: "conceptual",
    sequenceOrder: 9,
    learningStage: "Advanced Concepts",
    interviewRelevanceLabel: "Advanced concept",
    targetRoles: ["Senior Java Engineer", "Backend Developer", "Staff Engineer", "Tech Lead"],
    interviewMode: "conceptual",
    tags: ["java", "concurrency", "concurrenthashmap", "cas", "multithreading"],
    companyStyleLabel: "Enterprise / FinTech",
    expectedKeyPoints: [
      "Collections.synchronizedMap wraps an entire map with a single global mutex lock, serializing all read and write operations",
      "Java 8 ConcurrentHashMap eliminates segment locks in favor of fine-grained bucket-level synchronization and CAS (Compare-And-Swap)",
      "Lock-free reads: volatile node values allow get() operations to execute concurrently without acquiring any lock",
      "Writes use CAS to insert the first node in an empty bucket; if occupied, it locks only the bucket's head node using synchronized",
      "Concurrent size estimation uses a LongAdder-like CounterCell striped counter to avoid contention during concurrent increments"
    ],
    referenceAnswer: "Collections.synchronizedMap provides thread safety by wrapping a standard Map inside a synchronized block on a single mutex, meaning all concurrent reads and writes contend for one lock. Java 8's ConcurrentHashMap achieves high concurrent throughput through lock-free reads and bucket-level write synchronization. Reads (get) require zero locks because node values and next pointers are declared volatile, ensuring immediate visibility. Writes (put) first use non-blocking hardware CAS (Compare-And-Swap) to insert into an empty bucket. If the bucket is already occupied, it synchronizes only on the head node of that specific bucket, allowing threads writing to different buckets to proceed in parallel. Furthermore, size() does not freeze the map; it uses a LongAdder-style striped counter (CounterCell array) to record element counts across threads without lock contention.",
    stepByStepExplanation: "1. Read Operation: 'get(key)' hashes the key, navigates to bucket, and reads volatile fields without locking.\n2. Write to empty bucket: 'putVal()' uses CAS (Unsafe.compareAndSwapObject) to set bucket head. If successful, no lock was acquired.\n3. Write to colliding bucket: 'putVal()' enters 'synchronized(f)' on the head node of that bucket only.\n4. Resizing: Multiple threads collaborate in parallel on transfer() using ForwardingNode markers.\n5. Size Calculation: Sums 'baseCount' and active 'CounterCell' array values without global locks.",
    practicalExample: "// ConcurrentHashMap eliminates write contention across distinct buckets\nConcurrentMap<String, UserSession> sessionCache = new ConcurrentHashMap<>();\n\n// Atomic computeIfAbsent: computes value only once even if multiple threads request concurrently\nUserSession session = sessionCache.computeIfAbsent(userId, id -> loadSessionFromDb(id));",
    commonMistakes: [
      "Thinking Java 8 still uses Segment locks; Segment arrays were replaced by bucket-level synchronization in Java 8",
      "Assuming ConcurrentHashMap.size() provides an instantaneous exact snapshot under continuous concurrent writes",
      "Performing non-atomic check-then-act operations outside of atomic methods like computeIfAbsent or putIfAbsent"
    ],
    suggestedFollowUps: ["Why does ConcurrentHashMap disallow null keys and null values?", "How does the CounterCell striping mechanism work in LongAdder?"]
  },
  {
    questionId: "java_sync_010",
    questionText: "Compare the intrinsic synchronized keyword with java.util.concurrent.locks.ReentrantLock. When would you prefer ReentrantLock in production, and how do Condition variables compare to wait() and notify()?",
    category: "Java",
    topic: "Multithreading, Concurrency & JMM",
    subtopic: "Locks & Synchronization",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 10,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Java Developer", "Backend Developer"],
    interviewMode: "conceptual",
    tags: ["java", "concurrency", "reentrantlock", "synchronized", "condition"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "synchronized is language-level and automatically releases locks on block exit or exception, whereas ReentrantLock requires explicit unlock() in a finally block",
      "ReentrantLock provides advanced features: fairness policies, tryLock() with timeout, lockInterruptibly(), and multiple Condition variables",
      "Condition variables allow selective notification (e.g., notEmpty and notFull on bounded buffers) avoiding wasteful spurious wakeups of all threads"
    ],
    referenceAnswer: "While the intrinsic synchronized keyword is concise and automatically releases monitors upon exception or block exit, java.util.concurrent.locks.ReentrantLock offers capabilities essential for complex production concurrency. ReentrantLock allows non-blocking lock attempts via tryLock(timeout), interruptible lock acquisition with lockInterruptibly(), and optional fair queuing policies. Crucially, ReentrantLock supports multiple Condition objects per lock (such as notEmpty and notFull in ArrayBlockingQueue). This enables targeted signaling of waiting producer or consumer threads, avoiding the thundering herd problem common with Object.notifyAll().",
    stepByStepExplanation: "1. Lock Acquisition: 'lock.lock()' acquires the monitor or parks the thread.\n2. Protected Execution: Always execute guarded operations inside a 'try' block.\n3. Mandatory Cleanup: Always place 'lock.unlock()' in a 'finally' block to prevent deadlocks on runtime exceptions.\n4. Targeted Signaling: Use 'condition.await()' and 'condition.signal()' for fine-grained coordination.",
    practicalExample: "Lock lock = new ReentrantLock();\nCondition notEmpty = lock.newCondition();\nlock.lock();\ntry {\n    while (count == 0) notEmpty.await();\n    // consume item\n} finally {\n    lock.unlock();\n}",
    commonMistakes: [
      "Forgetting to call lock.unlock() in a finally block",
      "Calling Condition.wait() instead of Condition.await()",
      "Using ReentrantLock everywhere when standard synchronized suffices with lower syntax overhead"
    ],
    hints: ["Consider what happens if a thread throws an unexpected runtime exception inside a synchronized block versus inside a ReentrantLock."]
  },
  {
    questionId: "java_exc_011",
    questionText: "Explain Java's exception hierarchy (Throwable, Error, Exception, RuntimeException). Why does Java distinguish checked and unchecked exceptions, and how does try-with-resources prevent resource leaks via AutoCloseable?",
    category: "Java",
    topic: "Exception Handling & Best Practices",
    subtopic: "Exception Hierarchy & try-with-resources",
    difficulty: "Easy",
    questionType: "conceptual",
    sequenceOrder: 11,
    learningStage: "Fundamentals",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Java Developer", "Junior Software Engineer"],
    interviewMode: "conceptual",
    tags: ["java", "exceptions", "autocloseable", "try-with-resources"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Throwable is the root class; Error denotes fatal JVM-level failures (e.g. OutOfMemoryError, StackOverflowError) that applications should not catch",
      "Checked exceptions (direct subclasses of Exception) force compile-time handling; unchecked exceptions (subclasses of RuntimeException) denote programming defects",
      "try-with-resources automatically invokes close() on any AutoCloseable resource in reverse declaration order, even if exceptions are thrown, and preserves suppressed exceptions"
    ],
    referenceAnswer: "Java's Throwable hierarchy splits into Error and Exception. Error represents serious JVM infrastructure failures (like OutOfMemoryError or StackOverflowError) that normal applications should not attempt to handle. Checked exceptions (subclasses of Exception excluding RuntimeException) force callers at compile-time to either catch or declare them, used for recoverable environmental failures like IOException or SQLException. Unchecked exceptions (subclasses of RuntimeException like NullPointerException or IllegalArgumentException) denote programming bugs or logic flaws. Introduced in Java 7, try-with-resources ensures any object implementing AutoCloseable or Closeable is deterministically closed in reverse declaration order when exiting the block, properly attaching any secondary close exceptions as suppressed exceptions via Throwable.addSuppressed().",
    stepByStepExplanation: "1. Hierarchy: Throwable -> Error (fatal) & Exception (application).\n2. Checked: Subclasses of Exception (excluding RuntimeException) checked at compile time.\n3. Unchecked: Subclasses of RuntimeException (logic/contract bugs).\n4. try-with-resources: Declares resources in parentheses; bytecode compiler emits deterministic finally-close logic preserving suppressed exceptions.",
    practicalExample: "try (BufferedReader br = new BufferedReader(new FileReader(\"data.txt\"))) {\n    return br.readLine();\n} // br.close() is guaranteed even if readLine() throws",
    commonMistakes: [
      "Catching Throwable or Error in business code",
      "Empty catch blocks that swallow exceptions silently",
      "Closing resources manually inside try-catch rather than using try-with-resources"
    ],
    hints: ["Check the difference between Exception and RuntimeException in compiler enforcement."]
  },
  {
    questionId: "java_gen_012",
    questionText: "What is Type Erasure in Java Generics? Explain the PECS principle (Producer Extends, Consumer Super) with wildcards, and why generic array creation is prohibited.",
    category: "Java",
    topic: "Collections Framework & Generics",
    subtopic: "Generics, Type Erasure & PECS",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 12,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Common interview topic",
    targetRoles: ["Software Engineer", "Java Developer", "Backend Developer"],
    interviewMode: "conceptual",
    tags: ["java", "generics", "type-erasure", "pecs", "wildcards"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Type Erasure: The javac compiler enforces type safety at compile time and removes generic type arguments, replacing them with bounds or Object in bytecode",
      "PECS: Producer Extends, Consumer Super. Use ? extends T when reading from a collection; use ? super T when writing into a collection",
      "Generic arrays like new List<String>[10] are illegal because arrays are reified and covariant, while generics are invariant and erased, creating heap pollution"
    ],
    referenceAnswer: "Java Generics use Type Erasure for backwards compatibility with pre-Java 5 bytecode. At compile time, javac validates generic type safety and inserts necessary casts, but erases type parameters in the generated bytecode (replacing them with their first bound or Object). The PECS guideline dictates wildcard usage: if a parameterized collection produces data (you only read from it), use '? extends T' (covariant); if it consumes data (you write elements into it), use '? super T' (contravariant). Generic arrays (e.g. new List<T>[10]) are forbidden because Java arrays are reified and covariant at runtime, while generics are invariant and erased, which would otherwise allow runtime ArrayStoreException violations to bypass compiler safety.",
    stepByStepExplanation: "1. Compilation: javac checks generic constraints and emits casts.\n2. Erasure: Generic type parameters become Object (or the upper bound class in bytecode).\n3. Covariance with extends: List<? extends Number> allows reading Numbers, forbids writes (except null).\n4. Contravariance with super: List<? super Integer> allows writing Integers safely.",
    practicalExample: "// Collections.copy uses PECS:\npublic static <T> void copy(List<? super T> dest, List<? extends T> src) {\n    for (int i = 0; i < src.size(); i++) {\n        dest.set(i, src.get(i));\n    }\n}",
    commonMistakes: [
      "Attempting to add elements to a collection typed as List<? extends Number>",
      "Assuming generic type parameters exist at runtime (unless preserved in class metadata for reflection)",
      "Confusing invariance of List<String> with covariance of String[]"
    ],
    hints: ["Remember: PECS = Producer Extends, Consumer Super."]
  },
  {
    questionId: "java_thpool_013",
    questionText: "How does ThreadPoolExecutor manage its thread lifecycle? Explain the relationship between corePoolSize, maximumPoolSize, workQueue, and describe the 4 standard RejectedExecutionHandler policies.",
    category: "Java",
    topic: "Multithreading, Concurrency & JMM",
    subtopic: "ThreadPoolExecutor Architecture & Rejection",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 13,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Java Developer", "Backend Developer"],
    interviewMode: "conceptual",
    tags: ["java", "threadpool", "executorservice", "concurrency"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Task submission order: 1) if active threads < corePoolSize, spawn new worker; 2) if corePoolSize reached, offer task to workQueue; 3) if workQueue full, spawn new worker up to maximumPoolSize; 4) if maximumPoolSize reached and queue full, invoke RejectedExecutionHandler",
      "Using Executors.newFixedThreadPool() uses an unbounded LinkedBlockingQueue which can cause OutOfMemoryError under load",
      "4 Rejection Policies: AbortPolicy (throws RejectedExecutionException), CallerRunsPolicy (executes task on calling thread, applying natural backpressure), DiscardPolicy (silently drops task), DiscardOldestPolicy (drops oldest unhandled task in queue)"
    ],
    referenceAnswer: "ThreadPoolExecutor regulates concurrency via a multi-tier allocation strategy. When a task is submitted: 1) If current worker threads are below corePoolSize, a new core worker is created. 2) If corePoolSize is satisfied, the task is queued into the BlockingQueue. 3) If the queue becomes completely full, new threads are created up to maximumPoolSize. 4) If maximumPoolSize is reached and the queue remains saturated, the configured RejectedExecutionHandler is triggered. The 4 built-in rejection policies are: AbortPolicy (default, throws RejectedExecutionException), CallerRunsPolicy (executes the task in the submitter's thread, creating natural upstream backpressure), DiscardPolicy (silently ignores the task), and DiscardOldestPolicy (evicts the head of the work queue and retries execution). In production, bounded queues with CallerRunsPolicy or metrics-backed custom handlers are strongly preferred over Executors factory methods that use unbounded queues.",
    stepByStepExplanation: "1. Thread count < corePoolSize: Create new worker thread.\n2. Thread count >= corePoolSize: Offer task to workQueue.\n3. workQueue is full & Thread count < maxPoolSize: Create non-core worker.\n4. workQueue is full & Thread count == maxPoolSize: Invoke RejectedExecutionHandler.\n5. Idle non-core threads terminate after keepAliveTime.",
    practicalExample: "ThreadPoolExecutor executor = new ThreadPoolExecutor(\n    8, 16, 60L, TimeUnit.SECONDS,\n    new ArrayBlockingQueue<>(500),\n    new ThreadPoolExecutor.CallerRunsPolicy()\n);",
    commonMistakes: [
      "Assuming maximumPoolSize threads spawn immediately before filling the workQueue",
      "Using Executors.newCachedThreadPool() in high-load services, leading to unbounded thread creation and CPU starvation",
      "Silently discarding failed tasks without logging or metrics alerts"
    ],
    hints: ["Trace the exact order: corePoolSize -> workQueue -> maximumPoolSize -> Rejection Handler."]
  },
  {
    questionId: "java_classload_014",
    questionText: "How does the Java ClassLoader subsystem operate? Detail the Parent Delegation Model and explain scenarios (such as OSGi or Web Application Servers) where this delegation must be broken.",
    category: "Java",
    topic: "Core Java & JVM Internals",
    subtopic: "ClassLoaders & Parent Delegation Model",
    difficulty: "Hard",
    questionType: "conceptual",
    sequenceOrder: 14,
    learningStage: "Advanced Concepts",
    interviewRelevanceLabel: "Advanced concept",
    targetRoles: ["Senior Java Engineer", "Backend Developer", "Staff Engineer", "Software Architect"],
    interviewMode: "conceptual",
    tags: ["java", "jvm", "classloader", "parent-delegation", "metaspace"],
    companyStyleLabel: "FAANG / Big Tech",
    expectedKeyPoints: [
      "Three standard ClassLoaders: Bootstrap (native C++, loads core rt.jar/java.base), Platform/Extension (loads platform modules), and Application/System (loads classpath classes)",
      "Parent Delegation: When asked to load a class, a ClassLoader delegates to its parent before searching its own repositories, ensuring system classes (like java.lang.Object) cannot be spoofed",
      "Breaking Delegation: Web containers (Tomcat child-first loading to isolate application dependencies) and OSGi modular plugins override loadClass() to achieve isolated dependency versions"
    ],
    referenceAnswer: "The JVM employs a hierarchical ClassLoader architecture consisting of the Bootstrap ClassLoader (native C++ engine loading java.base), Platform ClassLoader (loading platform extensions), and Application ClassLoader (loading the user classpath). Under the Parent Delegation Model, when a ClassLoader receives a request to load a class, it delegates the lookup upward to its parent before attempting to locate the bytecode itself. This prevents hostile code from overriding fundamental JDK classes like java.lang.String. However, certain enterprise environments deliberately invert or break parent delegation: Tomcat and servlet containers use a child-first (webapp-first) ClassLoader so that web applications can bundle newer library versions without conflicting with shared server libraries. Similarly, OSGi modular systems resolve classes horizontally across bundle dependencies rather than in a strict vertical tree.",
    stepByStepExplanation: "1. Class Loading Request: 'loadClass(name)' is invoked.\n2. Parent Delegation: Check if already loaded; if not, delegate to parent.\n3. Root Check: Parent delegates recursively until reaching the Bootstrap ClassLoader.\n4. Fallback: If parent returns ClassNotFoundException, the current loader calls its own 'findClass(name)'.\n5. Child-First Inversion: Web containers override 'loadClass' to run 'findClass' first for webapp packages.",
    practicalExample: "public class CustomChildFirstClassLoader extends URLClassLoader {\n    @Override\n    protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {\n        // Override delegation for custom packages to load application-specific versions first\n        if (name.startsWith(\"com.myapp.\")) {\n            try { return findClass(name); } catch (ClassNotFoundException ignored) {}\n        }\n        return super.loadClass(name, resolve);\n    }\n}",
    commonMistakes: [
      "Thinking two identical bytecode classes loaded by different ClassLoaders are castable to each other; ClassCastException occurs because class identity in the JVM includes its ClassLoader",
      "Overriding loadClass() without calling resolveClass() when resolve flag is true"
    ],
    hints: ["Consider why an application server cannot have all webapps sharing a single classloader."]
  },
  {
    questionId: "java_virtual_015",
    questionText: "Explain Java 21 Virtual Threads (Project Loom). How do they differ from Platform (OS) threads, how does carrier thread scheduling operate, and what are the primary ThreadLocal and pinning caveats?",
    category: "Java",
    topic: "Multithreading, Concurrency & JMM",
    subtopic: "Virtual Threads & Project Loom",
    difficulty: "Hard",
    questionType: "conceptual",
    sequenceOrder: 15,
    learningStage: "Advanced Concepts",
    interviewRelevanceLabel: "Advanced concept",
    targetRoles: ["Senior Java Engineer", "Backend Developer", "Staff Engineer", "Software Architect"],
    interviewMode: "conceptual",
    tags: ["java", "virtual-threads", "loom", "concurrency", "java21"],
    companyStyleLabel: "FAANG / Big Tech",
    expectedKeyPoints: [
      "Platform threads map 1:1 to OS kernel threads, incurring ~1MB memory overhead per thread and expensive OS context switching",
      "Virtual threads are user-mode lightweight threads managed by the JVM runtime; millions can run concurrently with negligible footprint (~few KB)",
      "Carrier Threads: Virtual threads are scheduled onto a ForkJoinPool of carrier platform threads. When a virtual thread performs blocking I/O, the JVM unmounts its stack from the carrier thread, freeing the carrier to execute other virtual threads",
      "Pinning: A virtual thread becomes pinned to its carrier thread if it blocks inside a 'synchronized' block/method or native JNI call, preventing carrier unmounting. Fix by replacing synchronized with ReentrantLock"
    ],
    referenceAnswer: "Virtual Threads, introduced as a stable feature in Java 21 via Project Loom, decouple Java threads from underlying operating system kernel threads. Standard platform threads map 1:1 to OS threads with substantial memory stacks (~1MB) and high context-switching costs, limiting scalability to thousands of threads. Virtual threads are lightweight user-space threads managed entirely by the JVM, consuming only a few kilobytes initially on the heap. They execute mounted atop a small pool of carrier platform threads (managed by ForkJoinPool). When a virtual thread encounters blocking I/O (e.g., socket read, database call), the JVM unmounts its execution continuation from the carrier thread and suspends it; when the I/O completes, the continuation is remounted onto an available carrier thread. Key caveats include 'thread pinning'—blocking inside synchronized blocks or native methods locks the carrier thread from being unmounted (mitigated by using ReentrantLock)—and avoid pooling virtual threads, as they are cheap to create on-demand per request.",
    stepByStepExplanation: "1. Thread Creation: 'Thread.ofVirtual().start(runnable)' creates lightweight continuation.\n2. Mounting: JVM mounts virtual thread stack onto an available carrier platform thread in ForkJoinPool.\n3. Non-blocking I/O Hook: When I/O blocks (e.g. SocketChannel), JVM yields continuation, saving stack frames on heap.\n4. Carrier Reuse: Carrier thread is immediately assigned to execute other runnable virtual threads.\n5. Remounting: I/O completion event queues continuation back onto ForkJoinPool.",
    practicalExample: "// Spawning 100,000 concurrent tasks with virtual threads without OOM:\ntry (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    IntStream.range(0, 100_000).forEach(i -> {\n        executor.submit(() -> {\n            Thread.sleep(1000); // Does NOT block the OS thread!\n            return i;\n        });\n    });\n}",
    commonMistakes: [
      "Attempting to pool virtual threads using a bounded thread pool; virtual threads should never be pooled, create them per task",
      "Blocking inside synchronized blocks causing thread pinning that paralyzes carrier thread pools",
      "Overusing heavy ThreadLocal objects across millions of virtual threads, leading to heap exhaustion"
    ],
    hints: ["Focus on continuation unmounting when blocking I/O occurs, and how pinning prevents it."]
  }
];

