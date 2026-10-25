/**
 * Curated High-Value Questions for Java
 * Total Questions: 45
 */

export const JAVA_QUESTIONS = [
  {
    "category": "Java",
    "topic": "Core Java & JVM Internals",
    "subtopic": "JVM Architecture & Execution Lifecycle",
    "question": "Explain the architecture of the Java Virtual Machine (JVM). How does Java achieve platform independence through the execution lifecycle from source code to native machine execution?",
    "questionText": "Explain the architecture of the Java Virtual Machine (JVM). How does Java achieve platform independence through the execution lifecycle from source code to native machine execution?",
    "idealAnswer": "Java achieves platform independence through its write-once, run-anywhere model. The javac compiler translates human-readable source code (.java) into intermediate bytecode (.class). When executed, the host operating system's platform-specific JVM loads the bytecode via its ClassLoader subsystem. The JVM execution engine initially interprets bytecode instructions. For frequently executed hot spots, the JIT (Just-In-Time) compiler compiles bytecode directly into native host machine code, applying optimizations like method inlining and loop unrolling.",
    "referenceAnswer": "Java achieves platform independence through its write-once, run-anywhere model. The javac compiler translates human-readable source code (.java) into intermediate bytecode (.class). When executed, the host operating system's platform-specific JVM loads the bytecode via its ClassLoader subsystem. The JVM execution engine initially interprets bytecode instructions. For frequently executed hot spots, the JIT (Just-In-Time) compiler compiles bytecode directly into native host machine code, applying optimizations like method inlining and loop unrolling.",
    "keyPoints": [
      "Source code (.java) compiles to bytecode (.class) via javac",
      "Classloader loads, links, and initializes bytecode into JVM memory",
      "Execution engine uses Interpreter for rapid startup and JIT (Just-In-Time) compiler for hot code optimization into native machine code",
      "Platform independence: bytecode runs on any OS having a platform-specific JVM implementation"
    ],
    "expectedKeyPoints": [
      "Source code (.java) compiles to bytecode (.class) via javac",
      "Classloader loads, links, and initializes bytecode into JVM memory",
      "Execution engine uses Interpreter for rapid startup and JIT (Just-In-Time) compiler for hot code optimization into native machine code",
      "Platform independence: bytecode runs on any OS having a platform-specific JVM implementation"
    ],
    "followUps": [
      "How do ClassLoaders enforce delegation through the Parent Delegation Model?",
      "What is the difference between HotSpot C1 and C2 compilers?"
    ],
    "suggestedFollowUps": [
      "How do ClassLoaders enforce delegation through the Parent Delegation Model?",
      "What is the difference between HotSpot C1 and C2 compilers?"
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
    "importance": 4,
    "tags": [
      "java",
      "jvm",
      "bytecode",
      "jit",
      "classloader"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain the architecture of the java virtual machine jvm how does java achieve platform independence through the execution lifecycle from source code to native machine execution",
    "normalizedText": "explain the architecture of the java virtual machine jvm how does java achieve platform independence through the execution lifecycle from source code to native machine execution",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Core Java & JVM Internals",
    "subtopic": "String Immutability & Memory Pooling",
    "question": "Why are String objects immutable in Java? Explain how the String Constant Pool functions and compare String with StringBuilder and StringBuffer.",
    "questionText": "Why are String objects immutable in Java? Explain how the String Constant Pool functions and compare String with StringBuilder and StringBuffer.",
    "idealAnswer": "Strings in Java are immutable for security, caching, and thread safety. Because Strings cannot be mutated after creation, the JVM can safely cache identical string literals in the String Constant Pool (located in the heap), saving significant memory. Immutability also guarantees that sensitive parameters (e.g., file paths, database URLs, auth tokens) cannot be altered maliciously between validation and usage, and allows hashCode caching for fast hash lookups. For frequent concatenations, StringBuilder provides mutable buffers without synchronization overhead, whereas StringBuffer synchronizes all mutation methods for legacy thread safety.",
    "referenceAnswer": "Strings in Java are immutable for security, caching, and thread safety. Because Strings cannot be mutated after creation, the JVM can safely cache identical string literals in the String Constant Pool (located in the heap), saving significant memory. Immutability also guarantees that sensitive parameters (e.g., file paths, database URLs, auth tokens) cannot be altered maliciously between validation and usage, and allows hashCode caching for fast hash lookups. For frequent concatenations, StringBuilder provides mutable buffers without synchronization overhead, whereas StringBuffer synchronizes all mutation methods for legacy thread safety.",
    "keyPoints": [
      "Immutability enables String Constant Pool caching in heap memory",
      "Security: Strings are used for database credentials, URLs, and network sockets; immutability prevents tampering",
      "Thread Safety: Immutable objects are inherently thread-safe across concurrent threads without synchronization",
      "StringBuilder is mutable and non-synchronized (faster for single-thread loops); StringBuffer is synchronized (thread-safe, higher overhead)"
    ],
    "expectedKeyPoints": [
      "Immutability enables String Constant Pool caching in heap memory",
      "Security: Strings are used for database credentials, URLs, and network sockets; immutability prevents tampering",
      "Thread Safety: Immutable objects are inherently thread-safe across concurrent threads without synchronization",
      "StringBuilder is mutable and non-synchronized (faster for single-thread loops); StringBuffer is synchronized (thread-safe, higher overhead)"
    ],
    "followUps": [
      "What does String.intern() do?",
      "How did Java 9 Compact Strings change memory layout from char[] to byte[]?"
    ],
    "suggestedFollowUps": [
      "What does String.intern() do?",
      "How did Java 9 Compact Strings change memory layout from char[] to byte[]?"
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
    "importance": 4,
    "tags": [
      "java",
      "strings",
      "immutability",
      "string-pool",
      "memory"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "why are string objects immutable in java explain how the string constant pool functions and compare string with stringbuilder and stringbuffer",
    "normalizedText": "why are string objects immutable in java explain how the string constant pool functions and compare string with stringbuilder and stringbuffer",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Core Java & JVM Internals",
    "subtopic": "Object Equality & Hashing Contract",
    "question": "What is the difference between '==' and '.equals()' in Java? Why is overriding hashCode() mandatory whenever you override equals(), and what happens if you violate this contract?",
    "questionText": "What is the difference between '==' and '.equals()' in Java? Why is overriding hashCode() mandatory whenever you override equals(), and what happens if you violate this contract?",
    "idealAnswer": "'==' tests reference identity (whether both reference variables point to the exact same memory address), whereas '.equals()' tests logical state equality as defined by the class. The Object contract dictates that if o1.equals(o2) is true, then o1.hashCode() must equal o2.hashCode(). If equals() is overridden without hashCode(), two objects deemed equal will produce different hash codes. In a HashMap or HashSet, the bucket index is computed from hashCode(); mismatched hash codes cause the key to be searched in the wrong bucket, resulting in null returns or duplicate key entries.",
    "referenceAnswer": "'==' tests reference identity (whether both reference variables point to the exact same memory address), whereas '.equals()' tests logical state equality as defined by the class. The Object contract dictates that if o1.equals(o2) is true, then o1.hashCode() must equal o2.hashCode(). If equals() is overridden without hashCode(), two objects deemed equal will produce different hash codes. In a HashMap or HashSet, the bucket index is computed from hashCode(); mismatched hash codes cause the key to be searched in the wrong bucket, resulting in null returns or duplicate key entries.",
    "keyPoints": [
      "'==' checks memory address reference equality for objects and raw values for primitives",
      "'.equals()' evaluates semantic state/value equality as overridden by class implementation",
      "Contract: If two objects are equal according to equals(), they must produce identical hashCode() values",
      "Violating contract causes hash-based collections (HashMap, HashSet) to misplace keys in wrong buckets, leading to null lookups or duplicate entries"
    ],
    "expectedKeyPoints": [
      "'==' checks memory address reference equality for objects and raw values for primitives",
      "'.equals()' evaluates semantic state/value equality as overridden by class implementation",
      "Contract: If two objects are equal according to equals(), they must produce identical hashCode() values",
      "Violating contract causes hash-based collections (HashMap, HashSet) to misplace keys in wrong buckets, leading to null lookups or duplicate entries"
    ],
    "followUps": [
      "Can two unequal objects have the same hashCode?",
      "What happens if a key object's field is mutated after insertion into a HashMap?"
    ],
    "suggestedFollowUps": [
      "Can two unequal objects have the same hashCode?",
      "What happens if a key object's field is mutated after insertion into a HashMap?"
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
    "importance": 4,
    "tags": [
      "java",
      "equality",
      "hashcode",
      "hashmap",
      "contract"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "what is the difference between and equals in java why is overriding hashcode mandatory whenever you override equals and what happens if you violate this contract",
    "normalizedText": "what is the difference between and equals in java why is overriding hashcode mandatory whenever you override equals and what happens if you violate this contract",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Collections Framework & Generics",
    "subtopic": "HashMap Internal Architecture & Collision Resolution",
    "question": "How does Java 8's HashMap handle internal collisions? Explain the conditions and internal mechanism for treeification (LinkedList to Red-Black Tree) and load factor.",
    "questionText": "How does Java 8's HashMap handle internal collisions? Explain the conditions and internal mechanism for treeification (LinkedList to Red-Black Tree) and load factor.",
    "idealAnswer": "In Java 8, HashMap resolves collisions via separate chaining using a bucket array (Node<K,V>[] table). When multiple keys map to the same bucket index, entries form a singly linked list. If the chain length reaches TREEIFY_THRESHOLD (8) and the overall array capacity is at least MIN_TREEIFY_CAPACITY (64), Java converts the chain into a balanced Red-Black Tree (TreeNode). This prevents Denial-of-Service attacks from hash collisions by reducing worst-case lookup time from O(n) to O(log n). If table capacity is under 64, it resizes the table instead of treeifying. When items are removed and tree size drops below UNTREEIFY_THRESHOLD (6), it reverts back to a linked list.",
    "referenceAnswer": "In Java 8, HashMap resolves collisions via separate chaining using a bucket array (Node<K,V>[] table). When multiple keys map to the same bucket index, entries form a singly linked list. If the chain length reaches TREEIFY_THRESHOLD (8) and the overall array capacity is at least MIN_TREEIFY_CAPACITY (64), Java converts the chain into a balanced Red-Black Tree (TreeNode). This prevents Denial-of-Service attacks from hash collisions by reducing worst-case lookup time from O(n) to O(log n). If table capacity is under 64, it resizes the table instead of treeifying. When items are removed and tree size drops below UNTREEIFY_THRESHOLD (6), it reverts back to a linked list.",
    "keyPoints": [
      "HashMap stores entries in an array of Node buckets (Node<K,V>[] table)",
      "Collisions are resolved via separate chaining (LinkedList)",
      "Java 8 Treeification: When a bucket chain length reaches TREEIFY_THRESHOLD (8) AND total table capacity >= MIN_TREEIFY_CAPACITY (64), the linked list converts to a balanced Red-Black Tree (TreeNode)",
      "Complexity drops from O(n) worst-case linear search down to O(log n) tree lookup",
      "Default load factor is 0.75; resizing doubles the bucket array (capacity * 2) and re-indexes nodes using high/low bit partitioning"
    ],
    "expectedKeyPoints": [
      "HashMap stores entries in an array of Node buckets (Node<K,V>[] table)",
      "Collisions are resolved via separate chaining (LinkedList)",
      "Java 8 Treeification: When a bucket chain length reaches TREEIFY_THRESHOLD (8) AND total table capacity >= MIN_TREEIFY_CAPACITY (64), the linked list converts to a balanced Red-Black Tree (TreeNode)",
      "Complexity drops from O(n) worst-case linear search down to O(log n) tree lookup",
      "Default load factor is 0.75; resizing doubles the bucket array (capacity * 2) and re-indexes nodes using high/low bit partitioning"
    ],
    "followUps": [
      "Why does HashMap capacity always remain a power of two?",
      "How does the bitwise (n - 1) & hash operation optimize the modulo operator?"
    ],
    "suggestedFollowUps": [
      "Why does HashMap capacity always remain a power of two?",
      "How does the bitwise (n - 1) & hash operation optimize the modulo operator?"
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
      "java",
      "hashmap",
      "data-structures",
      "red-black-tree",
      "collections"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how does java 8s hashmap handle internal collisions explain the conditions and internal mechanism for treeification linkedlist to redblack tree and load factor",
    "normalizedText": "how does java 8s hashmap handle internal collisions explain the conditions and internal mechanism for treeification linkedlist to redblack tree and load factor",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Multithreading, Concurrency & JMM",
    "subtopic": "JMM, Volatile & Synchronization",
    "question": "Explain the difference between the volatile keyword and the synchronized keyword in Java. How does the Java Memory Model (JMM) guarantee visibility and ordering?",
    "questionText": "Explain the difference between the volatile keyword and the synchronized keyword in Java. How does the Java Memory Model (JMM) guarantee visibility and ordering?",
    "idealAnswer": "The volatile keyword guarantees visibility and ordering across threads without locking. In modern multi-core processors, threads maintain local CPU caches. When a variable is declared volatile, the Java Memory Model ensures that every write is flushed directly to main memory and every read fetches directly from main memory, invalidating stale CPU core caches. It also establishes a happens-before relationship, preventing instruction reordering via memory barriers. However, volatile does NOT guarantee atomicity for compound operations like count++ (which involves read-modify-write). The synchronized keyword, conversely, provides both atomicity and visibility by acquiring an intrinsic monitor lock on an object, allowing only one thread inside the critical section.",
    "referenceAnswer": "The volatile keyword guarantees visibility and ordering across threads without locking. In modern multi-core processors, threads maintain local CPU caches. When a variable is declared volatile, the Java Memory Model ensures that every write is flushed directly to main memory and every read fetches directly from main memory, invalidating stale CPU core caches. It also establishes a happens-before relationship, preventing instruction reordering via memory barriers. However, volatile does NOT guarantee atomicity for compound operations like count++ (which involves read-modify-write). The synchronized keyword, conversely, provides both atomicity and visibility by acquiring an intrinsic monitor lock on an object, allowing only one thread inside the critical section.",
    "keyPoints": [
      "volatile guarantees memory visibility and instruction ordering (happens-before), but NOT mutual exclusion or compound atomicity (e.g. count++)",
      "synchronized guarantees mutual exclusion (atomicity), memory visibility, and ordering via monitor locks",
      "JMM: CPU caches write volatile variables directly to main memory and invalidates core caches on reads",
      "Memory barriers / fence instructions prevent compiler and CPU reordering around volatile reads/writes"
    ],
    "expectedKeyPoints": [
      "volatile guarantees memory visibility and instruction ordering (happens-before), but NOT mutual exclusion or compound atomicity (e.g. count++)",
      "synchronized guarantees mutual exclusion (atomicity), memory visibility, and ordering via monitor locks",
      "JMM: CPU caches write volatile variables directly to main memory and invalidates core caches on reads",
      "Memory barriers / fence instructions prevent compiler and CPU reordering around volatile reads/writes"
    ],
    "followUps": [
      "How does AtomicInteger implement thread-safe counter increment without locks?",
      "What is a happens-before guarantee in the JMM?"
    ],
    "suggestedFollowUps": [
      "How does AtomicInteger implement thread-safe counter increment without locks?",
      "What is a happens-before guarantee in the JMM?"
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
      "java",
      "concurrency",
      "multithreading",
      "jmm",
      "volatile",
      "synchronized"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain the difference between the volatile keyword and the synchronized keyword in java how does the java memory model jmm guarantee visibility and ordering",
    "normalizedText": "explain the difference between the volatile keyword and the synchronized keyword in java how does the java memory model jmm guarantee visibility and ordering",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Java Streams, Lambdas & Modern Java",
    "subtopic": "Stream Pipeline & Lazy Evaluation",
    "question": "How do Java 8 Streams process data? Explain the difference between intermediate and terminal operations, lazy evaluation, and the trade-offs of using parallelStream().",
    "questionText": "How do Java 8 Streams process data? Explain the difference between intermediate and terminal operations, lazy evaluation, and the trade-offs of using parallelStream().",
    "idealAnswer": "Java 8 Streams represent a functional pipeline of operations over a data source. Operations are bifurcated into intermediate and terminal. Intermediate operations (like filter() and map()) are purely declarative and lazily evaluated; they record pipeline transformations without iterating the underlying data. Execution only begins when a terminal operation (such as collect() or reduce()) is invoked. Streams optimize traversal by fusing operations into a single pass and supporting short-circuiting. While parallelStream() partitions work across cores using the common ForkJoinPool, it introduces thread coordination overhead and should be avoided for small collections, stateful operations, or blocking I/O calls that saturate the shared pool.",
    "referenceAnswer": "Java 8 Streams represent a functional pipeline of operations over a data source. Operations are bifurcated into intermediate and terminal. Intermediate operations (like filter() and map()) are purely declarative and lazily evaluated; they record pipeline transformations without iterating the underlying data. Execution only begins when a terminal operation (such as collect() or reduce()) is invoked. Streams optimize traversal by fusing operations into a single pass and supporting short-circuiting. While parallelStream() partitions work across cores using the common ForkJoinPool, it introduces thread coordination overhead and should be avoided for small collections, stateful operations, or blocking I/O calls that saturate the shared pool.",
    "keyPoints": [
      "Streams do not store data; they are functional pipelines operating over sequences of elements",
      "Intermediate operations (filter, map, sorted) return a new Stream and are lazily evaluated",
      "Terminal operations (collect, forEach, reduce, count) trigger the pipeline execution and close the stream",
      "Short-circuiting terminal operations (findFirst, anyMatch) can terminate traversal early without visiting all elements",
      "parallelStream() utilizes the common ForkJoinPool; can degrade performance for small datasets or blocking I/O tasks"
    ],
    "expectedKeyPoints": [
      "Streams do not store data; they are functional pipelines operating over sequences of elements",
      "Intermediate operations (filter, map, sorted) return a new Stream and are lazily evaluated",
      "Terminal operations (collect, forEach, reduce, count) trigger the pipeline execution and close the stream",
      "Short-circuiting terminal operations (findFirst, anyMatch) can terminate traversal early without visiting all elements",
      "parallelStream() utilizes the common ForkJoinPool; can degrade performance for small datasets or blocking I/O tasks"
    ],
    "followUps": [
      "What is the difference between stateful (e.g. sorted) and stateless (e.g. filter) intermediate operations?",
      "How does Spliterator enable parallel decomposition?"
    ],
    "suggestedFollowUps": [
      "What is the difference between stateful (e.g. sorted) and stateless (e.g. filter) intermediate operations?",
      "How does Spliterator enable parallel decomposition?"
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
      "java",
      "streams",
      "functional-programming",
      "parallel-stream",
      "performance"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how do java 8 streams process data explain the difference between intermediate and terminal operations lazy evaluation and the tradeoffs of using parallelstream",
    "normalizedText": "how do java 8 streams process data explain the difference between intermediate and terminal operations lazy evaluation and the tradeoffs of using parallelstream",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Memory Management & Garbage Collection",
    "subtopic": "Generational Memory Model & Garbage Collectors",
    "question": "How does the HotSpot Garbage Collector manage memory across Eden, Survivor (S0/S1), and Tenured spaces? Explain the Generational Hypothesis and minor vs major GC.",
    "questionText": "How does the HotSpot Garbage Collector manage memory across Eden, Survivor (S0/S1), and Tenured spaces? Explain the Generational Hypothesis and minor vs major GC.",
    "idealAnswer": "HotSpot's memory architecture is based on the Weak Generational Hypothesis: empirical observation shows that most objects die very shortly after allocation. To optimize collection, the Java heap is partitioned into the Young Generation (Eden + two Survivor spaces, S0 and S1) and the Old/Tenured Generation. New allocations occur in Eden. When Eden fills, a Minor GC executes: reachable objects are copied to the active Survivor space with their age counter incremented, while dead objects are reclaimed instantly. Once an object survives enough collection cycles to exceed the tenuring threshold (default 15), it is promoted to the Old Generation. Major/Full GC reclaims the Old Generation; because the Old Generation is large and fragmented, it requires mark-sweep-compact algorithms that cause longer Stop-The-World (STW) application pauses.",
    "referenceAnswer": "HotSpot's memory architecture is based on the Weak Generational Hypothesis: empirical observation shows that most objects die very shortly after allocation. To optimize collection, the Java heap is partitioned into the Young Generation (Eden + two Survivor spaces, S0 and S1) and the Old/Tenured Generation. New allocations occur in Eden. When Eden fills, a Minor GC executes: reachable objects are copied to the active Survivor space with their age counter incremented, while dead objects are reclaimed instantly. Once an object survives enough collection cycles to exceed the tenuring threshold (default 15), it is promoted to the Old Generation. Major/Full GC reclaims the Old Generation; because the Old Generation is large and fragmented, it requires mark-sweep-compact algorithms that cause longer Stop-The-World (STW) application pauses.",
    "keyPoints": [
      "Generational Hypothesis: The vast majority of allocated objects have short lifespans and die shortly after allocation",
      "Young Generation: Eden + two Survivor spaces (From/To or S0/S1)",
      "Minor GC: Fast copying collector cleans Eden and active Survivor; survivors copy to alternate Survivor space with incremented age",
      "Tenuring threshold: Objects surviving tenure threshold (default 15 in HotSpot) promote to Old/Tenured Generation",
      "Major/Full GC: Collects Old Generation; incurs higher Stop-The-World (STW) latency"
    ],
    "expectedKeyPoints": [
      "Generational Hypothesis: The vast majority of allocated objects have short lifespans and die shortly after allocation",
      "Young Generation: Eden + two Survivor spaces (From/To or S0/S1)",
      "Minor GC: Fast copying collector cleans Eden and active Survivor; survivors copy to alternate Survivor space with incremented age",
      "Tenuring threshold: Objects surviving tenure threshold (default 15 in HotSpot) promote to Old/Tenured Generation",
      "Major/Full GC: Collects Old Generation; incurs higher Stop-The-World (STW) latency"
    ],
    "followUps": [
      "How does G1 GC balance pause-time targets with memory reclamation?",
      "What is the difference between ZGC and traditional CMS/Parallel GC?"
    ],
    "suggestedFollowUps": [
      "How does G1 GC balance pause-time targets with memory reclamation?",
      "What is the difference between ZGC and traditional CMS/Parallel GC?"
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
      "java",
      "jvm",
      "garbage-collection",
      "memory",
      "hotspot"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how does the hotspot garbage collector manage memory across eden survivor s0s1 and tenured spaces explain the generational hypothesis and minor vs major gc",
    "normalizedText": "how does the hotspot garbage collector manage memory across eden survivor s0s1 and tenured spaces explain the generational hypothesis and minor vs major gc",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Memory Management & Garbage Collection",
    "subtopic": "Production Diagnostics & Memory Leak Analysis",
    "question": "How do you diagnose and resolve an OutOfMemoryError in production? Distinguish between 'Java heap space' and 'Metaspace', and describe how to capture and analyze heap dumps.",
    "questionText": "How do you diagnose and resolve an OutOfMemoryError in production? Distinguish between 'Java heap space' and 'Metaspace', and describe how to capture and analyze heap dumps.",
    "idealAnswer": "An OutOfMemoryError indicates that the JVM cannot allocate memory for an object. If the error specifies 'Java heap space', live object instances have filled the configured heap (-Xmx). This typically indicates either an undersized heap for current traffic or a true memory leak where references remain tethered to GC roots (such as unbounded static collections, unclosed resources, or ThreadLocals). If the error specifies 'Metaspace', native memory for class definitions has exceeded -XX:MaxMetaspaceSize, usually caused by dynamic class proxy generation (e.g., CGLIB, ByteBuddy) or hot redeployments without classloader unloading. In production, we configure '-XX:+HeapDumpOnOutOfMemoryError' to capture an HPROF snapshot upon failure. We then analyze the dump in Eclipse MAT or JProfiler, inspect the Dominator Tree to find objects retaining the most heap, and trace the path to GC roots to identify the leaking reference.",
    "referenceAnswer": "An OutOfMemoryError indicates that the JVM cannot allocate memory for an object. If the error specifies 'Java heap space', live object instances have filled the configured heap (-Xmx). This typically indicates either an undersized heap for current traffic or a true memory leak where references remain tethered to GC roots (such as unbounded static collections, unclosed resources, or ThreadLocals). If the error specifies 'Metaspace', native memory for class definitions has exceeded -XX:MaxMetaspaceSize, usually caused by dynamic class proxy generation (e.g., CGLIB, ByteBuddy) or hot redeployments without classloader unloading. In production, we configure '-XX:+HeapDumpOnOutOfMemoryError' to capture an HPROF snapshot upon failure. We then analyze the dump in Eclipse MAT or JProfiler, inspect the Dominator Tree to find objects retaining the most heap, and trace the path to GC roots to identify the leaking reference.",
    "keyPoints": [
      "'java.lang.OutOfMemoryError: Java heap space' means allocated live objects exceeded -Xmx heap limit, often due to memory leaks (e.g., uncleared static collections, unclosed streams)",
      "'OutOfMemoryError: Metaspace' means class metadata loaded into native memory exceeded -XX:MaxMetaspaceSize (e.g., dynamic class generation with CGLIB or classloader leaks)",
      "Production flags: -XX:+HeapDumpOnOutOfMemoryError and -XX:HeapDumpPath=/var/dumps/",
      "Analysis tools: Eclipse Memory Analyzer Tool (MAT), VisualVM, jcmd, jmap, or async-profiler to inspect dominator tree and GC roots"
    ],
    "expectedKeyPoints": [
      "'java.lang.OutOfMemoryError: Java heap space' means allocated live objects exceeded -Xmx heap limit, often due to memory leaks (e.g., uncleared static collections, unclosed streams)",
      "'OutOfMemoryError: Metaspace' means class metadata loaded into native memory exceeded -XX:MaxMetaspaceSize (e.g., dynamic class generation with CGLIB or classloader leaks)",
      "Production flags: -XX:+HeapDumpOnOutOfMemoryError and -XX:HeapDumpPath=/var/dumps/",
      "Analysis tools: Eclipse Memory Analyzer Tool (MAT), VisualVM, jcmd, jmap, or async-profiler to inspect dominator tree and GC roots"
    ],
    "followUps": [
      "What are GC Roots and why do weak references not prevent garbage collection?",
      "How can uncleaned ThreadLocal variables cause memory leaks in thread pools?"
    ],
    "suggestedFollowUps": [
      "What are GC Roots and why do weak references not prevent garbage collection?",
      "How can uncleaned ThreadLocal variables cause memory leaks in thread pools?"
    ],
    "difficulty": "Hard",
    "levels": [
      "senior"
    ],
    "experienceLevels": [
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
    "importance": 4,
    "tags": [
      "java",
      "oom",
      "debugging",
      "profiling",
      "heapdump",
      "production"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how do you diagnose and resolve an outofmemoryerror in production distinguish between java heap space and metaspace and describe how to capture and analyze heap dumps",
    "normalizedText": "how do you diagnose and resolve an outofmemoryerror in production distinguish between java heap space and metaspace and describe how to capture and analyze heap dumps",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Multithreading, Concurrency & JMM",
    "subtopic": "ConcurrentHashMap Internals & Lock Striping",
    "question": "How does ConcurrentHashMap achieve thread safety in Java 8 compared to Collections.synchronizedMap? Explain CAS, synchronized node locks, and why size() estimation is non-blocking.",
    "questionText": "How does ConcurrentHashMap achieve thread safety in Java 8 compared to Collections.synchronizedMap? Explain CAS, synchronized node locks, and why size() estimation is non-blocking.",
    "idealAnswer": "Collections.synchronizedMap provides thread safety by wrapping a standard Map inside a synchronized block on a single mutex, meaning all concurrent reads and writes contend for one lock. Java 8's ConcurrentHashMap achieves high concurrent throughput through lock-free reads and bucket-level write synchronization. Reads (get) require zero locks because node values and next pointers are declared volatile, ensuring immediate visibility. Writes (put) first use non-blocking hardware CAS (Compare-And-Swap) to insert into an empty bucket. If the bucket is already occupied, it synchronizes only on the head node of that specific bucket, allowing threads writing to different buckets to proceed in parallel. Furthermore, size() does not freeze the map; it uses a LongAdder-style striped counter (CounterCell array) to record element counts across threads without lock contention.",
    "referenceAnswer": "Collections.synchronizedMap provides thread safety by wrapping a standard Map inside a synchronized block on a single mutex, meaning all concurrent reads and writes contend for one lock. Java 8's ConcurrentHashMap achieves high concurrent throughput through lock-free reads and bucket-level write synchronization. Reads (get) require zero locks because node values and next pointers are declared volatile, ensuring immediate visibility. Writes (put) first use non-blocking hardware CAS (Compare-And-Swap) to insert into an empty bucket. If the bucket is already occupied, it synchronizes only on the head node of that specific bucket, allowing threads writing to different buckets to proceed in parallel. Furthermore, size() does not freeze the map; it uses a LongAdder-style striped counter (CounterCell array) to record element counts across threads without lock contention.",
    "keyPoints": [
      "Collections.synchronizedMap wraps an entire map with a single global mutex lock, serializing all read and write operations",
      "Java 8 ConcurrentHashMap eliminates segment locks in favor of fine-grained bucket-level synchronization and CAS (Compare-And-Swap)",
      "Lock-free reads: volatile node values allow get() operations to execute concurrently without acquiring any lock",
      "Writes use CAS to insert the first node in an empty bucket; if occupied, it locks only the bucket's head node using synchronized",
      "Concurrent size estimation uses a LongAdder-like CounterCell striped counter to avoid contention during concurrent increments"
    ],
    "expectedKeyPoints": [
      "Collections.synchronizedMap wraps an entire map with a single global mutex lock, serializing all read and write operations",
      "Java 8 ConcurrentHashMap eliminates segment locks in favor of fine-grained bucket-level synchronization and CAS (Compare-And-Swap)",
      "Lock-free reads: volatile node values allow get() operations to execute concurrently without acquiring any lock",
      "Writes use CAS to insert the first node in an empty bucket; if occupied, it locks only the bucket's head node using synchronized",
      "Concurrent size estimation uses a LongAdder-like CounterCell striped counter to avoid contention during concurrent increments"
    ],
    "followUps": [
      "Why does ConcurrentHashMap disallow null keys and null values?",
      "How does the CounterCell striping mechanism work in LongAdder?"
    ],
    "suggestedFollowUps": [
      "Why does ConcurrentHashMap disallow null keys and null values?",
      "How does the CounterCell striping mechanism work in LongAdder?"
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
    "importance": 4,
    "tags": [
      "java",
      "concurrency",
      "concurrenthashmap",
      "cas",
      "multithreading"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how does concurrenthashmap achieve thread safety in java 8 compared to collectionssynchronizedmap explain cas synchronized node locks and why size estimation is nonblocking",
    "normalizedText": "how does concurrenthashmap achieve thread safety in java 8 compared to collectionssynchronizedmap explain cas synchronized node locks and why size estimation is nonblocking",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Multithreading, Concurrency & JMM",
    "subtopic": "Locks & Synchronization",
    "question": "Compare the intrinsic synchronized keyword with java.util.concurrent.locks.ReentrantLock. When would you prefer ReentrantLock in production, and how do Condition variables compare to wait() and notify()?",
    "questionText": "Compare the intrinsic synchronized keyword with java.util.concurrent.locks.ReentrantLock. When would you prefer ReentrantLock in production, and how do Condition variables compare to wait() and notify()?",
    "idealAnswer": "While the intrinsic synchronized keyword is concise and automatically releases monitors upon exception or block exit, java.util.concurrent.locks.ReentrantLock offers capabilities essential for complex production concurrency. ReentrantLock allows non-blocking lock attempts via tryLock(timeout), interruptible lock acquisition with lockInterruptibly(), and optional fair queuing policies. Crucially, ReentrantLock supports multiple Condition objects per lock (such as notEmpty and notFull in ArrayBlockingQueue). This enables targeted signaling of waiting producer or consumer threads, avoiding the thundering herd problem common with Object.notifyAll().",
    "referenceAnswer": "While the intrinsic synchronized keyword is concise and automatically releases monitors upon exception or block exit, java.util.concurrent.locks.ReentrantLock offers capabilities essential for complex production concurrency. ReentrantLock allows non-blocking lock attempts via tryLock(timeout), interruptible lock acquisition with lockInterruptibly(), and optional fair queuing policies. Crucially, ReentrantLock supports multiple Condition objects per lock (such as notEmpty and notFull in ArrayBlockingQueue). This enables targeted signaling of waiting producer or consumer threads, avoiding the thundering herd problem common with Object.notifyAll().",
    "keyPoints": [
      "synchronized is language-level and automatically releases locks on block exit or exception, whereas ReentrantLock requires explicit unlock() in a finally block",
      "ReentrantLock provides advanced features: fairness policies, tryLock() with timeout, lockInterruptibly(), and multiple Condition variables",
      "Condition variables allow selective notification (e.g., notEmpty and notFull on bounded buffers) avoiding wasteful spurious wakeups of all threads"
    ],
    "expectedKeyPoints": [
      "synchronized is language-level and automatically releases locks on block exit or exception, whereas ReentrantLock requires explicit unlock() in a finally block",
      "ReentrantLock provides advanced features: fairness policies, tryLock() with timeout, lockInterruptibly(), and multiple Condition variables",
      "Condition variables allow selective notification (e.g., notEmpty and notFull on bounded buffers) avoiding wasteful spurious wakeups of all threads"
    ],
    "followUps": [
      "How would you test and validate this behavior under extreme concurrency or scale?",
      "What alternative design or pattern could be used to optimize latency?"
    ],
    "suggestedFollowUps": [
      "How would you test and validate this behavior under extreme concurrency or scale?",
      "What alternative design or pattern could be used to optimize latency?"
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
      "java",
      "concurrency",
      "reentrantlock",
      "synchronized",
      "condition"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare the intrinsic synchronized keyword with javautilconcurrentlocksreentrantlock when would you prefer reentrantlock in production and how do condition variables compare to wait and notify",
    "normalizedText": "compare the intrinsic synchronized keyword with javautilconcurrentlocksreentrantlock when would you prefer reentrantlock in production and how do condition variables compare to wait and notify",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Exception Handling & Best Practices",
    "subtopic": "Exception Hierarchy & try-with-resources",
    "question": "Explain Java's exception hierarchy (Throwable, Error, Exception, RuntimeException). Why does Java distinguish checked and unchecked exceptions, and how does try-with-resources prevent resource leaks via AutoCloseable?",
    "questionText": "Explain Java's exception hierarchy (Throwable, Error, Exception, RuntimeException). Why does Java distinguish checked and unchecked exceptions, and how does try-with-resources prevent resource leaks via AutoCloseable?",
    "idealAnswer": "Java's Throwable hierarchy splits into Error and Exception. Error represents serious JVM infrastructure failures (like OutOfMemoryError or StackOverflowError) that normal applications should not attempt to handle. Checked exceptions (subclasses of Exception excluding RuntimeException) force callers at compile-time to either catch or declare them, used for recoverable environmental failures like IOException or SQLException. Unchecked exceptions (subclasses of RuntimeException like NullPointerException or IllegalArgumentException) denote programming bugs or logic flaws. Introduced in Java 7, try-with-resources ensures any object implementing AutoCloseable or Closeable is deterministically closed in reverse declaration order when exiting the block, properly attaching any secondary close exceptions as suppressed exceptions via Throwable.addSuppressed().",
    "referenceAnswer": "Java's Throwable hierarchy splits into Error and Exception. Error represents serious JVM infrastructure failures (like OutOfMemoryError or StackOverflowError) that normal applications should not attempt to handle. Checked exceptions (subclasses of Exception excluding RuntimeException) force callers at compile-time to either catch or declare them, used for recoverable environmental failures like IOException or SQLException. Unchecked exceptions (subclasses of RuntimeException like NullPointerException or IllegalArgumentException) denote programming bugs or logic flaws. Introduced in Java 7, try-with-resources ensures any object implementing AutoCloseable or Closeable is deterministically closed in reverse declaration order when exiting the block, properly attaching any secondary close exceptions as suppressed exceptions via Throwable.addSuppressed().",
    "keyPoints": [
      "Throwable is the root class; Error denotes fatal JVM-level failures (e.g. OutOfMemoryError, StackOverflowError) that applications should not catch",
      "Checked exceptions (direct subclasses of Exception) force compile-time handling; unchecked exceptions (subclasses of RuntimeException) denote programming defects",
      "try-with-resources automatically invokes close() on any AutoCloseable resource in reverse declaration order, even if exceptions are thrown, and preserves suppressed exceptions"
    ],
    "expectedKeyPoints": [
      "Throwable is the root class; Error denotes fatal JVM-level failures (e.g. OutOfMemoryError, StackOverflowError) that applications should not catch",
      "Checked exceptions (direct subclasses of Exception) force compile-time handling; unchecked exceptions (subclasses of RuntimeException) denote programming defects",
      "try-with-resources automatically invokes close() on any AutoCloseable resource in reverse declaration order, even if exceptions are thrown, and preserves suppressed exceptions"
    ],
    "followUps": [
      "How would you test and validate this behavior under extreme concurrency or scale?",
      "What alternative design or pattern could be used to optimize latency?"
    ],
    "suggestedFollowUps": [
      "How would you test and validate this behavior under extreme concurrency or scale?",
      "What alternative design or pattern could be used to optimize latency?"
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
    "importance": 4,
    "tags": [
      "java",
      "exceptions",
      "autocloseable",
      "try-with-resources"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain javas exception hierarchy throwable error exception runtimeexception why does java distinguish checked and unchecked exceptions and how does trywithresources prevent resource leaks via autocloseable",
    "normalizedText": "explain javas exception hierarchy throwable error exception runtimeexception why does java distinguish checked and unchecked exceptions and how does trywithresources prevent resource leaks via autocloseable",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Collections Framework & Generics",
    "subtopic": "Generics, Type Erasure & PECS",
    "question": "What is Type Erasure in Java Generics? Explain the PECS principle (Producer Extends, Consumer Super) with wildcards, and why generic array creation is prohibited.",
    "questionText": "What is Type Erasure in Java Generics? Explain the PECS principle (Producer Extends, Consumer Super) with wildcards, and why generic array creation is prohibited.",
    "idealAnswer": "Java Generics use Type Erasure for backwards compatibility with pre-Java 5 bytecode. At compile time, javac validates generic type safety and inserts necessary casts, but erases type parameters in the generated bytecode (replacing them with their first bound or Object). The PECS guideline dictates wildcard usage: if a parameterized collection produces data (you only read from it), use '? extends T' (covariant); if it consumes data (you write elements into it), use '? super T' (contravariant). Generic arrays (e.g. new List<T>[10]) are forbidden because Java arrays are reified and covariant at runtime, while generics are invariant and erased, which would otherwise allow runtime ArrayStoreException violations to bypass compiler safety.",
    "referenceAnswer": "Java Generics use Type Erasure for backwards compatibility with pre-Java 5 bytecode. At compile time, javac validates generic type safety and inserts necessary casts, but erases type parameters in the generated bytecode (replacing them with their first bound or Object). The PECS guideline dictates wildcard usage: if a parameterized collection produces data (you only read from it), use '? extends T' (covariant); if it consumes data (you write elements into it), use '? super T' (contravariant). Generic arrays (e.g. new List<T>[10]) are forbidden because Java arrays are reified and covariant at runtime, while generics are invariant and erased, which would otherwise allow runtime ArrayStoreException violations to bypass compiler safety.",
    "keyPoints": [
      "Type Erasure: The javac compiler enforces type safety at compile time and removes generic type arguments, replacing them with bounds or Object in bytecode",
      "PECS: Producer Extends, Consumer Super. Use ? extends T when reading from a collection; use ? super T when writing into a collection",
      "Generic arrays like new List<String>[10] are illegal because arrays are reified and covariant, while generics are invariant and erased, creating heap pollution"
    ],
    "expectedKeyPoints": [
      "Type Erasure: The javac compiler enforces type safety at compile time and removes generic type arguments, replacing them with bounds or Object in bytecode",
      "PECS: Producer Extends, Consumer Super. Use ? extends T when reading from a collection; use ? super T when writing into a collection",
      "Generic arrays like new List<String>[10] are illegal because arrays are reified and covariant, while generics are invariant and erased, creating heap pollution"
    ],
    "followUps": [
      "How would you test and validate this behavior under extreme concurrency or scale?",
      "What alternative design or pattern could be used to optimize latency?"
    ],
    "suggestedFollowUps": [
      "How would you test and validate this behavior under extreme concurrency or scale?",
      "What alternative design or pattern could be used to optimize latency?"
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
      "java",
      "generics",
      "type-erasure",
      "pecs",
      "wildcards"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "what is type erasure in java generics explain the pecs principle producer extends consumer super with wildcards and why generic array creation is prohibited",
    "normalizedText": "what is type erasure in java generics explain the pecs principle producer extends consumer super with wildcards and why generic array creation is prohibited",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Multithreading, Concurrency & JMM",
    "subtopic": "ThreadPoolExecutor Architecture & Rejection",
    "question": "How does ThreadPoolExecutor manage its thread lifecycle? Explain the relationship between corePoolSize, maximumPoolSize, workQueue, and describe the 4 standard RejectedExecutionHandler policies.",
    "questionText": "How does ThreadPoolExecutor manage its thread lifecycle? Explain the relationship between corePoolSize, maximumPoolSize, workQueue, and describe the 4 standard RejectedExecutionHandler policies.",
    "idealAnswer": "ThreadPoolExecutor regulates concurrency via a multi-tier allocation strategy. When a task is submitted: 1) If current worker threads are below corePoolSize, a new core worker is created. 2) If corePoolSize is satisfied, the task is queued into the BlockingQueue. 3) If the queue becomes completely full, new threads are created up to maximumPoolSize. 4) If maximumPoolSize is reached and the queue remains saturated, the configured RejectedExecutionHandler is triggered. The 4 built-in rejection policies are: AbortPolicy (default, throws RejectedExecutionException), CallerRunsPolicy (executes the task in the submitter's thread, creating natural upstream backpressure), DiscardPolicy (silently ignores the task), and DiscardOldestPolicy (evicts the head of the work queue and retries execution). In production, bounded queues with CallerRunsPolicy or metrics-backed custom handlers are strongly preferred over Executors factory methods that use unbounded queues.",
    "referenceAnswer": "ThreadPoolExecutor regulates concurrency via a multi-tier allocation strategy. When a task is submitted: 1) If current worker threads are below corePoolSize, a new core worker is created. 2) If corePoolSize is satisfied, the task is queued into the BlockingQueue. 3) If the queue becomes completely full, new threads are created up to maximumPoolSize. 4) If maximumPoolSize is reached and the queue remains saturated, the configured RejectedExecutionHandler is triggered. The 4 built-in rejection policies are: AbortPolicy (default, throws RejectedExecutionException), CallerRunsPolicy (executes the task in the submitter's thread, creating natural upstream backpressure), DiscardPolicy (silently ignores the task), and DiscardOldestPolicy (evicts the head of the work queue and retries execution). In production, bounded queues with CallerRunsPolicy or metrics-backed custom handlers are strongly preferred over Executors factory methods that use unbounded queues.",
    "keyPoints": [
      "Task submission order: 1) if active threads < corePoolSize, spawn new worker; 2) if corePoolSize reached, offer task to workQueue; 3) if workQueue full, spawn new worker up to maximumPoolSize; 4) if maximumPoolSize reached and queue full, invoke RejectedExecutionHandler",
      "Using Executors.newFixedThreadPool() uses an unbounded LinkedBlockingQueue which can cause OutOfMemoryError under load",
      "4 Rejection Policies: AbortPolicy (throws RejectedExecutionException), CallerRunsPolicy (executes task on calling thread, applying natural backpressure), DiscardPolicy (silently drops task), DiscardOldestPolicy (drops oldest unhandled task in queue)"
    ],
    "expectedKeyPoints": [
      "Task submission order: 1) if active threads < corePoolSize, spawn new worker; 2) if corePoolSize reached, offer task to workQueue; 3) if workQueue full, spawn new worker up to maximumPoolSize; 4) if maximumPoolSize reached and queue full, invoke RejectedExecutionHandler",
      "Using Executors.newFixedThreadPool() uses an unbounded LinkedBlockingQueue which can cause OutOfMemoryError under load",
      "4 Rejection Policies: AbortPolicy (throws RejectedExecutionException), CallerRunsPolicy (executes task on calling thread, applying natural backpressure), DiscardPolicy (silently drops task), DiscardOldestPolicy (drops oldest unhandled task in queue)"
    ],
    "followUps": [
      "How would you test and validate this behavior under extreme concurrency or scale?",
      "What alternative design or pattern could be used to optimize latency?"
    ],
    "suggestedFollowUps": [
      "How would you test and validate this behavior under extreme concurrency or scale?",
      "What alternative design or pattern could be used to optimize latency?"
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
      "java",
      "threadpool",
      "executorservice",
      "concurrency"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how does threadpoolexecutor manage its thread lifecycle explain the relationship between corepoolsize maximumpoolsize workqueue and describe the 4 standard rejectedexecutionhandler policies",
    "normalizedText": "how does threadpoolexecutor manage its thread lifecycle explain the relationship between corepoolsize maximumpoolsize workqueue and describe the 4 standard rejectedexecutionhandler policies",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Core Java & JVM Internals",
    "subtopic": "ClassLoaders & Parent Delegation Model",
    "question": "How does the Java ClassLoader subsystem operate? Detail the Parent Delegation Model and explain scenarios (such as OSGi or Web Application Servers) where this delegation must be broken.",
    "questionText": "How does the Java ClassLoader subsystem operate? Detail the Parent Delegation Model and explain scenarios (such as OSGi or Web Application Servers) where this delegation must be broken.",
    "idealAnswer": "The JVM employs a hierarchical ClassLoader architecture consisting of the Bootstrap ClassLoader (native C++ engine loading java.base), Platform ClassLoader (loading platform extensions), and Application ClassLoader (loading the user classpath). Under the Parent Delegation Model, when a ClassLoader receives a request to load a class, it delegates the lookup upward to its parent before attempting to locate the bytecode itself. This prevents hostile code from overriding fundamental JDK classes like java.lang.String. However, certain enterprise environments deliberately invert or break parent delegation: Tomcat and servlet containers use a child-first (webapp-first) ClassLoader so that web applications can bundle newer library versions without conflicting with shared server libraries. Similarly, OSGi modular systems resolve classes horizontally across bundle dependencies rather than in a strict vertical tree.",
    "referenceAnswer": "The JVM employs a hierarchical ClassLoader architecture consisting of the Bootstrap ClassLoader (native C++ engine loading java.base), Platform ClassLoader (loading platform extensions), and Application ClassLoader (loading the user classpath). Under the Parent Delegation Model, when a ClassLoader receives a request to load a class, it delegates the lookup upward to its parent before attempting to locate the bytecode itself. This prevents hostile code from overriding fundamental JDK classes like java.lang.String. However, certain enterprise environments deliberately invert or break parent delegation: Tomcat and servlet containers use a child-first (webapp-first) ClassLoader so that web applications can bundle newer library versions without conflicting with shared server libraries. Similarly, OSGi modular systems resolve classes horizontally across bundle dependencies rather than in a strict vertical tree.",
    "keyPoints": [
      "Three standard ClassLoaders: Bootstrap (native C++, loads core rt.jar/java.base), Platform/Extension (loads platform modules), and Application/System (loads classpath classes)",
      "Parent Delegation: When asked to load a class, a ClassLoader delegates to its parent before searching its own repositories, ensuring system classes (like java.lang.Object) cannot be spoofed",
      "Breaking Delegation: Web containers (Tomcat child-first loading to isolate application dependencies) and OSGi modular plugins override loadClass() to achieve isolated dependency versions"
    ],
    "expectedKeyPoints": [
      "Three standard ClassLoaders: Bootstrap (native C++, loads core rt.jar/java.base), Platform/Extension (loads platform modules), and Application/System (loads classpath classes)",
      "Parent Delegation: When asked to load a class, a ClassLoader delegates to its parent before searching its own repositories, ensuring system classes (like java.lang.Object) cannot be spoofed",
      "Breaking Delegation: Web containers (Tomcat child-first loading to isolate application dependencies) and OSGi modular plugins override loadClass() to achieve isolated dependency versions"
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
      "java",
      "jvm",
      "classloader",
      "parent-delegation",
      "metaspace"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how does the java classloader subsystem operate detail the parent delegation model and explain scenarios such as osgi or web application servers where this delegation must be broken",
    "normalizedText": "how does the java classloader subsystem operate detail the parent delegation model and explain scenarios such as osgi or web application servers where this delegation must be broken",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Multithreading, Concurrency & JMM",
    "subtopic": "Virtual Threads & Project Loom",
    "question": "Explain Java 21 Virtual Threads (Project Loom). How do they differ from Platform (OS) threads, how does carrier thread scheduling operate, and what are the primary ThreadLocal and pinning caveats?",
    "questionText": "Explain Java 21 Virtual Threads (Project Loom). How do they differ from Platform (OS) threads, how does carrier thread scheduling operate, and what are the primary ThreadLocal and pinning caveats?",
    "idealAnswer": "Virtual Threads, introduced as a stable feature in Java 21 via Project Loom, decouple Java threads from underlying operating system kernel threads. Standard platform threads map 1:1 to OS threads with substantial memory stacks (~1MB) and high context-switching costs, limiting scalability to thousands of threads. Virtual threads are lightweight user-space threads managed entirely by the JVM, consuming only a few kilobytes initially on the heap. They execute mounted atop a small pool of carrier platform threads (managed by ForkJoinPool). When a virtual thread encounters blocking I/O (e.g., socket read, database call), the JVM unmounts its execution continuation from the carrier thread and suspends it; when the I/O completes, the continuation is remounted onto an available carrier thread. Key caveats include 'thread pinning'—blocking inside synchronized blocks or native methods locks the carrier thread from being unmounted (mitigated by using ReentrantLock)—and avoid pooling virtual threads, as they are cheap to create on-demand per request.",
    "referenceAnswer": "Virtual Threads, introduced as a stable feature in Java 21 via Project Loom, decouple Java threads from underlying operating system kernel threads. Standard platform threads map 1:1 to OS threads with substantial memory stacks (~1MB) and high context-switching costs, limiting scalability to thousands of threads. Virtual threads are lightweight user-space threads managed entirely by the JVM, consuming only a few kilobytes initially on the heap. They execute mounted atop a small pool of carrier platform threads (managed by ForkJoinPool). When a virtual thread encounters blocking I/O (e.g., socket read, database call), the JVM unmounts its execution continuation from the carrier thread and suspends it; when the I/O completes, the continuation is remounted onto an available carrier thread. Key caveats include 'thread pinning'—blocking inside synchronized blocks or native methods locks the carrier thread from being unmounted (mitigated by using ReentrantLock)—and avoid pooling virtual threads, as they are cheap to create on-demand per request.",
    "keyPoints": [
      "Platform threads map 1:1 to OS kernel threads, incurring ~1MB memory overhead per thread and expensive OS context switching",
      "Virtual threads are user-mode lightweight threads managed by the JVM runtime; millions can run concurrently with negligible footprint (~few KB)",
      "Carrier Threads: Virtual threads are scheduled onto a ForkJoinPool of carrier platform threads. When a virtual thread performs blocking I/O, the JVM unmounts its stack from the carrier thread, freeing the carrier to execute other virtual threads",
      "Pinning: A virtual thread becomes pinned to its carrier thread if it blocks inside a 'synchronized' block/method or native JNI call, preventing carrier unmounting. Fix by replacing synchronized with ReentrantLock"
    ],
    "expectedKeyPoints": [
      "Platform threads map 1:1 to OS kernel threads, incurring ~1MB memory overhead per thread and expensive OS context switching",
      "Virtual threads are user-mode lightweight threads managed by the JVM runtime; millions can run concurrently with negligible footprint (~few KB)",
      "Carrier Threads: Virtual threads are scheduled onto a ForkJoinPool of carrier platform threads. When a virtual thread performs blocking I/O, the JVM unmounts its stack from the carrier thread, freeing the carrier to execute other virtual threads",
      "Pinning: A virtual thread becomes pinned to its carrier thread if it blocks inside a 'synchronized' block/method or native JNI call, preventing carrier unmounting. Fix by replacing synchronized with ReentrantLock"
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
    "importance": 4,
    "tags": [
      "java",
      "virtual-threads",
      "loom",
      "concurrency",
      "java21"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain java 21 virtual threads project loom how do they differ from platform os threads how does carrier thread scheduling operate and what are the primary threadlocal and pinning caveats",
    "normalizedText": "explain java 21 virtual threads project loom how do they differ from platform os threads how does carrier thread scheduling operate and what are the primary threadlocal and pinning caveats",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Core Java & JVM Internals",
    "subtopic": "Core Java & JVM Internals",
    "question": "Explain how the JVM JIT compiler performs Escape Analysis and what optimizations it enables.",
    "questionText": "Explain how the JVM JIT compiler performs Escape Analysis and what optimizations it enables.",
    "idealAnswer": "Escape Analysis is a compiler optimization technique where the JIT analyzes if an object allocated in a method escapes outside the method scope or thread. If an object does not escape, the JVM can perform three major optimizations: 1) Scalar Replacement, decomposing object fields into primitive CPU registers/stack variables without heap allocation; 2) Stack Allocation, allocating the object on the thread stack to eliminate GC pressure; and 3) Lock Elision (Lock Coarsening), removing synchronized blocks if the lock object is thread-confined.",
    "referenceAnswer": "Escape Analysis is a compiler optimization technique where the JIT analyzes if an object allocated in a method escapes outside the method scope or thread. If an object does not escape, the JVM can perform three major optimizations: 1) Scalar Replacement, decomposing object fields into primitive CPU registers/stack variables without heap allocation; 2) Stack Allocation, allocating the object on the thread stack to eliminate GC pressure; and 3) Lock Elision (Lock Coarsening), removing synchronized blocks if the lock object is thread-confined.",
    "keyPoints": [
      "Escape analysis checks if an object reference is returned or stored in a static/heap field.",
      "Scalar replacement breaks objects into local primitives on the stack.",
      "Lock elision removes synchronization overhead for thread-local objects.",
      "Significantly reduces Garbage Collection overhead and allocation rate."
    ],
    "expectedKeyPoints": [
      "Escape analysis checks if an object reference is returned or stored in a static/heap field.",
      "Scalar replacement breaks objects into local primitives on the stack.",
      "Lock elision removes synchronization overhead for thread-local objects.",
      "Significantly reduces Garbage Collection overhead and allocation rate."
    ],
    "followUps": [
      "How can you verify escape analysis optimizations using JVM flags (-XX:+PrintEscapeAnalysis)?",
      "Why does Java not directly allocate full objects on the stack instead of scalar replacement?"
    ],
    "suggestedFollowUps": [
      "How can you verify escape analysis optimizations using JVM flags (-XX:+PrintEscapeAnalysis)?",
      "Why does Java not directly allocate full objects on the stack instead of scalar replacement?"
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
      "java",
      "jvm",
      "jit",
      "escape-analysis",
      "memory"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain how the jvm jit compiler performs escape analysis and what optimizations it enables",
    "normalizedText": "explain how the jvm jit compiler performs escape analysis and what optimizations it enables",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Collections Framework & Generics",
    "subtopic": "Collections Framework & Generics",
    "question": "How does ConcurrentHashMap achieve high concurrency without global locking in Java 8+? Compare it with Hashtable and Collections.synchronizedMap.",
    "questionText": "How does ConcurrentHashMap achieve high concurrency without global locking in Java 8+? Compare it with Hashtable and Collections.synchronizedMap.",
    "idealAnswer": "In Java 8+, ConcurrentHashMap discarded the Segment array lock stripping of Java 7 and uses a Node table with fine-grained per-bucket synchronization using CAS (Compare-And-Swap) for insertions into empty buckets and synchronized blocks on the bucket head node for collisions. Reads are completely lock-free because Node value and next pointers are declared volatile. In contrast, Hashtable and synchronizedMap use a single global mutex for all reads and writes, creating extreme thread contention under multi-core workloads.",
    "referenceAnswer": "In Java 8+, ConcurrentHashMap discarded the Segment array lock stripping of Java 7 and uses a Node table with fine-grained per-bucket synchronization using CAS (Compare-And-Swap) for insertions into empty buckets and synchronized blocks on the bucket head node for collisions. Reads are completely lock-free because Node value and next pointers are declared volatile. In contrast, Hashtable and synchronizedMap use a single global mutex for all reads and writes, creating extreme thread contention under multi-core workloads.",
    "keyPoints": [
      "Lock-free reads using volatile Node values and next pointers.",
      "CAS for bucket initialization without locking.",
      "Synchronized locked strictly to the individual bucket head node during hash collisions.",
      "Treeification into Red-Black trees when bucket exceeds 8 nodes and table capacity >= 64."
    ],
    "expectedKeyPoints": [
      "Lock-free reads using volatile Node values and next pointers.",
      "CAS for bucket initialization without locking.",
      "Synchronized locked strictly to the individual bucket head node during hash collisions.",
      "Treeification into Red-Black trees when bucket exceeds 8 nodes and table capacity >= 64."
    ],
    "followUps": [
      "What happens during concurrent resizing in ConcurrentHashMap?",
      "How does size() calculate the aggregate count concurrently without locking the whole map?"
    ],
    "suggestedFollowUps": [
      "What happens during concurrent resizing in ConcurrentHashMap?",
      "How does size() calculate the aggregate count concurrently without locking the whole map?"
    ],
    "difficulty": "Hard",
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
      "java",
      "concurrenthashmap",
      "collections",
      "multithreading",
      "concurrency"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how does concurrenthashmap achieve high concurrency without global locking in java 8 compare it with hashtable and collectionssynchronizedmap",
    "normalizedText": "how does concurrenthashmap achieve high concurrency without global locking in java 8 compare it with hashtable and collectionssynchronizedmap",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Multithreading, Concurrency & JMM",
    "subtopic": "Multithreading, Concurrency & JMM",
    "question": "What are Virtual Threads in Java 21 (Project Loom), and how do they differ from platform threads in memory footprint and scheduling?",
    "questionText": "What are Virtual Threads in Java 21 (Project Loom), and how do they differ from platform threads in memory footprint and scheduling?",
    "idealAnswer": "Virtual threads are lightweight user-mode threads managed by the JVM rather than the OS kernel. A platform thread corresponds 1:1 with an OS thread and requires ~1MB of allocated stack memory, limiting concurrency to thousands of threads. Virtual threads have dynamic resizing call stacks stored in Java heap (starting at a few hundred bytes), allowing millions of concurrent virtual threads. They are scheduled onto a small pool of carrier platform threads via a work-stealing ForkJoinPool and unmount automatically during non-blocking I/O operations.",
    "referenceAnswer": "Virtual threads are lightweight user-mode threads managed by the JVM rather than the OS kernel. A platform thread corresponds 1:1 with an OS thread and requires ~1MB of allocated stack memory, limiting concurrency to thousands of threads. Virtual threads have dynamic resizing call stacks stored in Java heap (starting at a few hundred bytes), allowing millions of concurrent virtual threads. They are scheduled onto a small pool of carrier platform threads via a work-stealing ForkJoinPool and unmount automatically during non-blocking I/O operations.",
    "keyPoints": [
      "Platform threads map 1:1 to OS kernel threads with fixed ~1MB stacks.",
      "Virtual threads are M:N scheduled onto carrier platform threads via ForkJoinPool.",
      "Unmounting yields carrier threads during blocking socket/network I/O.",
      "Thread pinning occurs when executing synchronized blocks or native JNI calls."
    ],
    "expectedKeyPoints": [
      "Platform threads map 1:1 to OS kernel threads with fixed ~1MB stacks.",
      "Virtual threads are M:N scheduled onto carrier platform threads via ForkJoinPool.",
      "Unmounting yields carrier threads during blocking socket/network I/O.",
      "Thread pinning occurs when executing synchronized blocks or native JNI calls."
    ],
    "followUps": [
      "What is thread pinning and why should developers favor ReentrantLock over synchronized with Virtual Threads?",
      "Why are virtual threads inappropriate for CPU-bound computations?"
    ],
    "suggestedFollowUps": [
      "What is thread pinning and why should developers favor ReentrantLock over synchronized with Virtual Threads?",
      "Why are virtual threads inappropriate for CPU-bound computations?"
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
      "conceptual-deep-dive",
      "scenario-based"
    ],
    "interviewModes": [
      "mixed-technical",
      "conceptual-deep-dive",
      "scenario-based"
    ],
    "type": "conceptual",
    "questionType": "conceptual",
    "importance": 5,
    "tags": [
      "java",
      "virtual-threads",
      "loom",
      "concurrency",
      "java21"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "what are virtual threads in java 21 project loom and how do they differ from platform threads in memory footprint and scheduling",
    "normalizedText": "what are virtual threads in java 21 project loom and how do they differ from platform threads in memory footprint and scheduling",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Memory Management & Garbage Collection",
    "subtopic": "Memory Management & Garbage Collection",
    "question": "Compare the G1 Garbage Collector with the ZGC (Z Garbage Collector). When would you choose ZGC in production?",
    "questionText": "Compare the G1 Garbage Collector with the ZGC (Z Garbage Collector). When would you choose ZGC in production?",
    "idealAnswer": "G1 GC divides the heap into equal-sized regions and targets a user-specified pause time goal (default 200ms) by performing incremental generational collection prioritizing regions with the most garbage. ZGC is a scalable low-latency garbage collector that performs almost all phases concurrently (marking, relocation, reference processing) using colored pointers and load barriers. ZGC guarantees pause times under 1 millisecond regardless of heap size (from megabytes to 16 terabytes). ZGC is favored in ultra-low latency services like fintech order matching, real-time gaming, and microservices with strict p99 SLAs.",
    "referenceAnswer": "G1 GC divides the heap into equal-sized regions and targets a user-specified pause time goal (default 200ms) by performing incremental generational collection prioritizing regions with the most garbage. ZGC is a scalable low-latency garbage collector that performs almost all phases concurrently (marking, relocation, reference processing) using colored pointers and load barriers. ZGC guarantees pause times under 1 millisecond regardless of heap size (from megabytes to 16 terabytes). ZGC is favored in ultra-low latency services like fintech order matching, real-time gaming, and microservices with strict p99 SLAs.",
    "keyPoints": [
      "G1 uses regionalized heap with pause targets, usually 50-200ms pauses.",
      "ZGC uses colored pointers and load barriers to achieve sub-millisecond pauses.",
      "ZGC relocation is concurrent; threads encountering un-relocated objects self-heal via load barriers.",
      "ZGC trade-off is slightly higher CPU throughput overhead (~5-10%) compared to G1 throughput."
    ],
    "expectedKeyPoints": [
      "G1 uses regionalized heap with pause targets, usually 50-200ms pauses.",
      "ZGC uses colored pointers and load barriers to achieve sub-millisecond pauses.",
      "ZGC relocation is concurrent; threads encountering un-relocated objects self-heal via load barriers.",
      "ZGC trade-off is slightly higher CPU throughput overhead (~5-10%) compared to G1 throughput."
    ],
    "followUps": [
      "How does Generational ZGC in Java 21 optimize weak generational hypothesis workloads?",
      "What JVM flags are required to enable ZGC?"
    ],
    "suggestedFollowUps": [
      "How does Generational ZGC in Java 21 optimize weak generational hypothesis workloads?",
      "What JVM flags are required to enable ZGC?"
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
    "importance": 4,
    "tags": [
      "java",
      "gc",
      "zgc",
      "g1gc",
      "memory",
      "performance"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare the g1 garbage collector with the zgc z garbage collector when would you choose zgc in production",
    "normalizedText": "compare the g1 garbage collector with the zgc z garbage collector when would you choose zgc in production",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Java Streams, Lambdas & Modern Java",
    "subtopic": "Java Streams, Lambdas & Modern Java",
    "question": "Why should you be cautious when using parallelStream() in production Java applications, especially in web servers like Spring Boot?",
    "questionText": "Why should you be cautious when using parallelStream() in production Java applications, especially in web servers like Spring Boot?",
    "idealAnswer": "By default, parallelStream() utilizes the common ForkJoinPool shared across the entire JVM. If a parallel stream performs blocking I/O (database queries, external HTTP REST calls, disk reads), it starves the worker threads of the common pool. In a web server handling concurrent HTTP requests, this causes thread pool exhaustion where unrelated requests freeze waiting for common pool worker threads to become available. Parallel streams should either be restricted to purely CPU-bound tasks or submitted to a custom isolated ForkJoinPool.",
    "referenceAnswer": "By default, parallelStream() utilizes the common ForkJoinPool shared across the entire JVM. If a parallel stream performs blocking I/O (database queries, external HTTP REST calls, disk reads), it starves the worker threads of the common pool. In a web server handling concurrent HTTP requests, this causes thread pool exhaustion where unrelated requests freeze waiting for common pool worker threads to become available. Parallel streams should either be restricted to purely CPU-bound tasks or submitted to a custom isolated ForkJoinPool.",
    "keyPoints": [
      "parallelStream() shares the JVM-wide Common ForkJoinPool (ForkJoinPool.commonPool()).",
      "Blocking I/O in parallel streams blocks common worker threads.",
      "Creates cascading latency spikes and thread starvation across unrelated server threads.",
      "Best practice: use regular sequential streams, reactive publishers, or custom ForkJoinPool."
    ],
    "expectedKeyPoints": [
      "parallelStream() shares the JVM-wide Common ForkJoinPool (ForkJoinPool.commonPool()).",
      "Blocking I/O in parallel streams blocks common worker threads.",
      "Creates cascading latency spikes and thread starvation across unrelated server threads.",
      "Best practice: use regular sequential streams, reactive publishers, or custom ForkJoinPool."
    ],
    "followUps": [
      "How can you execute a parallelStream inside a custom ForkJoinPool?",
      "At what data element threshold does the overhead of thread splitting outweigh sequential processing?"
    ],
    "suggestedFollowUps": [
      "How can you execute a parallelStream inside a custom ForkJoinPool?",
      "At what data element threshold does the overhead of thread splitting outweigh sequential processing?"
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
      "conceptual-deep-dive",
      "scenario-based"
    ],
    "interviewModes": [
      "mixed-technical",
      "conceptual-deep-dive",
      "scenario-based"
    ],
    "type": "scenario",
    "questionType": "scenario",
    "importance": 5,
    "tags": [
      "java",
      "streams",
      "concurrency",
      "forkjoinpool",
      "performance"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "why should you be cautious when using parallelstream in production java applications especially in web servers like spring boot",
    "normalizedText": "why should you be cautious when using parallelstream in production java applications especially in web servers like spring boot",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "OOP Principles & Class Design",
    "subtopic": "OOP Principles & Class Design",
    "question": "Debug this Java code: A developer reports that HashSet contains duplicate Employee objects even though equals() was implemented. What is wrong and how do you fix it?\n\n```java\npublic class Employee {\n    private String id;\n    private String name;\n    public Employee(String id, String name) { this.id = id; this.name = name; }\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Employee)) return false;\n        Employee e = (Employee) o;\n        return Objects.equals(id, e.id);\n    }\n}\n```",
    "questionText": "Debug this Java code: A developer reports that HashSet contains duplicate Employee objects even though equals() was implemented. What is wrong and how do you fix it?\n\n```java\npublic class Employee {\n    private String id;\n    private String name;\n    public Employee(String id, String name) { this.id = id; this.name = name; }\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Employee)) return false;\n        Employee e = (Employee) o;\n        return Objects.equals(id, e.id);\n    }\n}\n```",
    "idealAnswer": "The bug is that the class overrides equals() but fails to override hashCode(). In Java, hash-based collections (HashSet, HashMap) first call hashCode() to determine the bucket index. If hashCode() is not overridden, the default Object.hashCode() allocates distinct integer bucket hashes based on internal object memory addresses. Even though the two Employee objects would return true in equals(), they are placed into completely different buckets and never compared, resulting in duplicate entries. The fix is to override hashCode() returning Objects.hash(id).",
    "referenceAnswer": "The bug is that the class overrides equals() but fails to override hashCode(). In Java, hash-based collections (HashSet, HashMap) first call hashCode() to determine the bucket index. If hashCode() is not overridden, the default Object.hashCode() allocates distinct integer bucket hashes based on internal object memory addresses. Even though the two Employee objects would return true in equals(), they are placed into completely different buckets and never compared, resulting in duplicate entries. The fix is to override hashCode() returning Objects.hash(id).",
    "keyPoints": [
      "Failing to override hashCode violates the equals/hashCode contract.",
      "HashSet checks hashCode first to compute bucket array index.",
      "Distinct hashCodes route identical logical objects to different buckets.",
      "Fix: implement @Override public int hashCode() { return Objects.hash(id); }"
    ],
    "expectedKeyPoints": [
      "Failing to override hashCode violates the equals/hashCode contract.",
      "HashSet checks hashCode first to compute bucket array index.",
      "Distinct hashCodes route identical logical objects to different buckets.",
      "Fix: implement @Override public int hashCode() { return Objects.hash(id); }"
    ],
    "followUps": [
      "What happens if a field used in hashCode() is mutable and modified after insertion into a HashSet?",
      "Why is hashCode collision resolution important for HashSet performance?"
    ],
    "suggestedFollowUps": [
      "What happens if a field used in hashCode() is mutable and modified after insertion into a HashSet?",
      "Why is hashCode collision resolution important for HashSet performance?"
    ],
    "difficulty": "Medium",
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
    "importance": 5,
    "tags": [
      "java",
      "debugging",
      "hashset",
      "hashcode",
      "equals",
      "oop"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this java code a developer reports that hashset contains duplicate employee objects even though equals was implemented what is wrong and how do you fix it java public class employee private string id private string name public employeestring id string name thisid id thisname name override public boolean equalsobject o if this o return true if o instanceof employee return false employee e employee o return objectsequalsid eid",
    "normalizedText": "debug this java code a developer reports that hashset contains duplicate employee objects even though equals was implemented what is wrong and how do you fix it java public class employee private string id private string name public employeestring id string name thisid id thisname name override public boolean equalsobject o if this o return true if o instanceof employee return false employee e employee o return objectsequalsid eid",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "JDBC & Database Connectivity",
    "subtopic": "JDBC & Database Connectivity",
    "question": "Write a safe Java method using JDBC PreparedStatement to update user balance within an ACID transaction, demonstrating proper connection rollback on failure.",
    "questionText": "Write a safe Java method using JDBC PreparedStatement to update user balance within an ACID transaction, demonstrating proper connection rollback on failure.",
    "idealAnswer": "To ensure ACID transaction safety in JDBC: 1) Disable auto-commit on the Connection (`conn.setAutoCommit(false)`); 2) Execute SQL statements using PreparedStatement with parameterized values to prevent SQL injection; 3) Call `conn.commit()` upon successful execution; 4) Wrap the operation in a try-catch block where the catch block explicitly invokes `conn.rollback()`; 5) Ensure the Connection and Statements are enclosed in try-with-resources to guarantee safe return to the connection pool.",
    "referenceAnswer": "To ensure ACID transaction safety in JDBC: 1) Disable auto-commit on the Connection (`conn.setAutoCommit(false)`); 2) Execute SQL statements using PreparedStatement with parameterized values to prevent SQL injection; 3) Call `conn.commit()` upon successful execution; 4) Wrap the operation in a try-catch block where the catch block explicitly invokes `conn.rollback()`; 5) Ensure the Connection and Statements are enclosed in try-with-resources to guarantee safe return to the connection pool.",
    "keyPoints": [
      "conn.setAutoCommit(false) starts manual transaction boundary.",
      "PreparedStatements prevent SQL injection via parameterized execution plans.",
      "conn.commit() commits atomic modifications.",
      "Catch block must execute conn.rollback() on SQLException.",
      "Try-with-resources closes connection and restores state for connection pool reuse."
    ],
    "expectedKeyPoints": [
      "conn.setAutoCommit(false) starts manual transaction boundary.",
      "PreparedStatements prevent SQL injection via parameterized execution plans.",
      "conn.commit() commits atomic modifications.",
      "Catch block must execute conn.rollback() on SQLException.",
      "Try-with-resources closes connection and restores state for connection pool reuse."
    ],
    "followUps": [
      "What are the advantages of using connection poolers like HikariCP over raw DriverManager?",
      "How does JDBC handle transaction isolation levels (e.g. READ_COMMITTED vs SERIALIZABLE)?"
    ],
    "suggestedFollowUps": [
      "What are the advantages of using connection poolers like HikariCP over raw DriverManager?",
      "How does JDBC handle transaction isolation levels (e.g. READ_COMMITTED vs SERIALIZABLE)?"
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
      "java",
      "jdbc",
      "database",
      "transactions",
      "acid"
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
    "normalizedHash": "write a safe java method using jdbc preparedstatement to update user balance within an acid transaction demonstrating proper connection rollback on failure",
    "normalizedText": "write a safe java method using jdbc preparedstatement to update user balance within an acid transaction demonstrating proper connection rollback on failure",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Core Java & JVM Internals",
    "subtopic": "Core Java & JVM Internals",
    "question": "What is the difference between '==' and the '.equals()' method in Java? When should you override equals() and hashCode()?",
    "questionText": "What is the difference between '==' and the '.equals()' method in Java? When should you override equals() and hashCode()?",
    "idealAnswer": "In Java, '==' compares reference identity for objects (whether two references point to the exact same memory address), whereas '.equals()' is intended for logical value equivalence. By default, Object.equals() behaves like '=='. When implementing custom objects stored in hash-based collections (HashMap, HashSet), both equals() and hashCode() must be overridden together to maintain the general contract: equal objects must produce the identical integer hash code.",
    "referenceAnswer": "In Java, '==' compares reference identity for objects (whether two references point to the exact same memory address), whereas '.equals()' is intended for logical value equivalence. By default, Object.equals() behaves like '=='. When implementing custom objects stored in hash-based collections (HashMap, HashSet), both equals() and hashCode() must be overridden together to maintain the general contract: equal objects must produce the identical integer hash code.",
    "keyPoints": [
      "'==' checks memory address identity, whereas equals() checks logical equivalence",
      "The contract requires equal objects to return identical hashCodes",
      "Failing to override hashCode causes HashMap/HashSet to lose keys or create duplicate entries"
    ],
    "expectedKeyPoints": [
      "'==' checks memory address identity, whereas equals() checks logical equivalence",
      "The contract requires equal objects to return identical hashCodes",
      "Failing to override hashCode causes HashMap/HashSet to lose keys or create duplicate entries"
    ],
    "followUps": [
      "What happens if two unequal objects produce the same hashCode?",
      "Why is it recommended to use immutable fields when computing hashCode?"
    ],
    "suggestedFollowUps": [
      "What happens if two unequal objects produce the same hashCode?",
      "Why is it recommended to use immutable fields when computing hashCode?"
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
      "java",
      "core java  jvm internals"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "what is the difference between and the equals method in java when should you override equals and hashcode",
    "normalizedText": "what is the difference between and the equals method in java when should you override equals and hashcode",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Core Java & JVM Internals",
    "subtopic": "Core Java & JVM Internals",
    "question": "Explain the JVM memory structure: Heap, Metaspace, JVM Stack, Native Method Stack, and PC Register. What causes an OutOfMemoryError: Metaspace?",
    "questionText": "Explain the JVM memory structure: Heap, Metaspace, JVM Stack, Native Method Stack, and PC Register. What causes an OutOfMemoryError: Metaspace?",
    "idealAnswer": "The JVM memory consists of: 1) Heap (shared across all threads, stores object instances and arrays); 2) Metaspace (native memory storing class metadata, replaced PermGen in Java 8); 3) JVM Stacks (per-thread, stores stack frames with local variables and partial results); 4) PC Registers (tracks current bytecode instruction per thread); and 5) Native Method Stack. OutOfMemoryError: Metaspace occurs when dynamic class generation (via CGLIB, ByteBuddy, proxies in Spring/Hibernate) or classloader leaks continuously load new Class definitions until native memory or MaxMetaspaceSize is exceeded.",
    "referenceAnswer": "The JVM memory consists of: 1) Heap (shared across all threads, stores object instances and arrays); 2) Metaspace (native memory storing class metadata, replaced PermGen in Java 8); 3) JVM Stacks (per-thread, stores stack frames with local variables and partial results); 4) PC Registers (tracks current bytecode instruction per thread); and 5) Native Method Stack. OutOfMemoryError: Metaspace occurs when dynamic class generation (via CGLIB, ByteBuddy, proxies in Spring/Hibernate) or classloader leaks continuously load new Class definitions until native memory or MaxMetaspaceSize is exceeded.",
    "keyPoints": [
      "Metaspace resides in off-heap native memory rather than contiguous JVM heap",
      "OOM Metaspace occurs due to excessive class generation or classloader leaks in app servers",
      "JVM stack is per-thread, throwing StackOverflowError on deep recursion"
    ],
    "expectedKeyPoints": [
      "Metaspace resides in off-heap native memory rather than contiguous JVM heap",
      "OOM Metaspace occurs due to excessive class generation or classloader leaks in app servers",
      "JVM stack is per-thread, throwing StackOverflowError on deep recursion"
    ],
    "followUps": [
      "How do you analyze a classloader memory leak using jcmd and Eclipse MAT?",
      "What is the difference between -Xms, -Xmx, and -XX:MaxMetaspaceSize?"
    ],
    "suggestedFollowUps": [
      "How do you analyze a classloader memory leak using jcmd and Eclipse MAT?",
      "What is the difference between -Xms, -Xmx, and -XX:MaxMetaspaceSize?"
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
      "java",
      "core java  jvm internals"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain the jvm memory structure heap metaspace jvm stack native method stack and pc register what causes an outofmemoryerror metaspace",
    "normalizedText": "explain the jvm memory structure heap metaspace jvm stack native method stack and pc register what causes an outofmemoryerror metaspace",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Collections Framework & Generics",
    "subtopic": "Collections Framework & Generics",
    "question": "How does HashMap work internally in Java 8+? Explain bucket arrays, hash calculation, collision resolution, and treeification.",
    "questionText": "How does HashMap work internally in Java 8+? Explain bucket arrays, hash calculation, collision resolution, and treeification.",
    "idealAnswer": "Java 8 HashMap uses an array of Node (table) with index calculated via `(n - 1) & hash(key)`. Hash calculation applies a bitwise XOR shift (`h ^ (h >>> 16)`) to spread higher bits into lower bits, minimizing collisions. When two keys map to the same bucket index, they form a singly linked list. When a single bucket list length reaches 8 (TREEIFY_THRESHOLD) and total table capacity is at least 64, the linked list transforms into a Red-Black Tree (TreeNode), reducing worst-case lookup from O(N) to O(log N). When tree size drops to 6 during resizing, it untreeifies back to a linked list.",
    "referenceAnswer": "Java 8 HashMap uses an array of Node (table) with index calculated via `(n - 1) & hash(key)`. Hash calculation applies a bitwise XOR shift (`h ^ (h >>> 16)`) to spread higher bits into lower bits, minimizing collisions. When two keys map to the same bucket index, they form a singly linked list. When a single bucket list length reaches 8 (TREEIFY_THRESHOLD) and total table capacity is at least 64, the linked list transforms into a Red-Black Tree (TreeNode), reducing worst-case lookup from O(N) to O(log N). When tree size drops to 6 during resizing, it untreeifies back to a linked list.",
    "keyPoints": [
      "Bit-shift perturbation spreading high bits into lower bits",
      "Bucket index calculation via bitwise AND with power-of-two capacity",
      "Treeification to Red-Black tree when bucket length >= 8 and table capacity >= 64",
      "Untreeification threshold of 6 to prevent oscillation"
    ],
    "expectedKeyPoints": [
      "Bit-shift perturbation spreading high bits into lower bits",
      "Bucket index calculation via bitwise AND with power-of-two capacity",
      "Treeification to Red-Black tree when bucket length >= 8 and table capacity >= 64",
      "Untreeification threshold of 6 to prevent oscillation"
    ],
    "followUps": [
      "Why must HashMap table capacity always be a power of two?",
      "What happens to HashMap during concurrent put operations in a multi-threaded environment?"
    ],
    "suggestedFollowUps": [
      "Why must HashMap table capacity always be a power of two?",
      "What happens to HashMap during concurrent put operations in a multi-threaded environment?"
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
      "java",
      "collections framework  generics"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how does hashmap work internally in java 8 explain bucket arrays hash calculation collision resolution and treeification",
    "normalizedText": "how does hashmap work internally in java 8 explain bucket arrays hash calculation collision resolution and treeification",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Multithreading, Concurrency & JMM",
    "subtopic": "Multithreading, Concurrency & JMM",
    "question": "What is the Java Memory Model (JMM) happens-before relationship, and what does the 'volatile' keyword guarantee and not guarantee?",
    "questionText": "What is the Java Memory Model (JMM) happens-before relationship, and what does the 'volatile' keyword guarantee and not guarantee?",
    "idealAnswer": "The JMM defines how threads interact through memory and when updates by one thread become visible to another. A 'happens-before' relationship guarantees that memory writes by one action are visible to a subsequent read. The `volatile` keyword guarantees two things: 1) Visibility (reads and writes go directly to main memory, bypassing CPU caches); and 2) Ordering (prevents compiler and CPU instruction reordering across volatile boundaries using memory barriers). Volatile does NOT guarantee atomicity: compound operations like `count++` (read-modify-write) are not atomic and require AtomicInteger or synchronized locks.",
    "referenceAnswer": "The JMM defines how threads interact through memory and when updates by one thread become visible to another. A 'happens-before' relationship guarantees that memory writes by one action are visible to a subsequent read. The `volatile` keyword guarantees two things: 1) Visibility (reads and writes go directly to main memory, bypassing CPU caches); and 2) Ordering (prevents compiler and CPU instruction reordering across volatile boundaries using memory barriers). Volatile does NOT guarantee atomicity: compound operations like `count++` (read-modify-write) are not atomic and require AtomicInteger or synchronized locks.",
    "keyPoints": [
      "Volatile guarantees visibility and prevents instruction reordering",
      "Volatile does NOT guarantee atomicity for compound operations (e.g. i++)",
      "Happens-before order guarantees memory consistency across threads",
      "Memory barriers (load/store fences) are emitted by the JIT compiler"
    ],
    "expectedKeyPoints": [
      "Volatile guarantees visibility and prevents instruction reordering",
      "Volatile does NOT guarantee atomicity for compound operations (e.g. i++)",
      "Happens-before order guarantees memory consistency across threads",
      "Memory barriers (load/store fences) are emitted by the JIT compiler"
    ],
    "followUps": [
      "Explain how double-checked locking singleton works and why volatile is mandatory",
      "What is false sharing and how does @Contended resolve it?"
    ],
    "suggestedFollowUps": [
      "Explain how double-checked locking singleton works and why volatile is mandatory",
      "What is false sharing and how does @Contended resolve it?"
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
      "java",
      "multithreading concurrency  jmm"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "what is the java memory model jmm happensbefore relationship and what does the volatile keyword guarantee and not guarantee",
    "normalizedText": "what is the java memory model jmm happensbefore relationship and what does the volatile keyword guarantee and not guarantee",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Multithreading, Concurrency & JMM",
    "subtopic": "Multithreading, Concurrency & JMM",
    "question": "Implement a thread-safe, bounded, generic In-Memory LRU Cache in Java without using LinkedHashMap.",
    "questionText": "Implement a thread-safe, bounded, generic In-Memory LRU Cache in Java without using LinkedHashMap.",
    "idealAnswer": "An optimal LRU Cache uses a combination of a HashMap (for O(1) key-to-node lookup) and a custom Doubly Linked List (for O(1) node relocation to head on access, and O(1) eviction from tail when capacity is exceeded). Thread-safety is achieved using a ReentrantReadWriteLock or ReentrantLock around put, get, and remove operations.",
    "referenceAnswer": "An optimal LRU Cache uses a combination of a HashMap (for O(1) key-to-node lookup) and a custom Doubly Linked List (for O(1) node relocation to head on access, and O(1) eviction from tail when capacity is exceeded). Thread-safety is achieved using a ReentrantReadWriteLock or ReentrantLock around put, get, and remove operations.",
    "keyPoints": [
      "HashMap maps keys to doubly linked list Node references for O(1) lookups",
      "Doubly linked list maintains access recency with head (most recent) and tail (least recent)",
      "Eviction removes the tail node from both linked list and map in O(1) time",
      "ReentrantLock synchronizes concurrent accesses safely"
    ],
    "expectedKeyPoints": [
      "HashMap maps keys to doubly linked list Node references for O(1) lookups",
      "Doubly linked list maintains access recency with head (most recent) and tail (least recent)",
      "Eviction removes the tail node from both linked list and map in O(1) time",
      "ReentrantLock synchronizes concurrent accesses safely"
    ],
    "followUps": [
      "How would you design lock-free reads using ConcurrentHashMap and a concurrent queue?",
      "How does Caffeine cache achieve higher throughput than standard synchronized LRU?"
    ],
    "suggestedFollowUps": [
      "How would you design lock-free reads using ConcurrentHashMap and a concurrent queue?",
      "How does Caffeine cache achieve higher throughput than standard synchronized LRU?"
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
    "importance": 5,
    "tags": [
      "java",
      "multithreading concurrency  jmm"
    ],
    "codingDetails": {
      "constraints": [
        "get(key) and put(key, value) must run in O(1) average time complexity",
        "Thread-safe concurrent access"
      ],
      "examples": [
        {
          "input": "cache.put(1, 10); cache.put(2, 20); cache.get(1); cache.put(3, 30) on cap=2",
          "output": "key 2 is evicted",
          "explanation": "Key 1 was accessed, making key 2 the least recently used"
        }
      ]
    },
    "isActive": true,
    "normalizedHash": "implement a threadsafe bounded generic inmemory lru cache in java without using linkedhashmap",
    "normalizedText": "implement a threadsafe bounded generic inmemory lru cache in java without using linkedhashmap",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Exception Handling & Best Practices",
    "subtopic": "Exception Handling & Best Practices",
    "question": "Debug this Java snippet: Why does this resource leak occur despite using a finally block, and how does try-with-resources resolve it?\n\n```java\nFileInputStream fis = null;\ntry {\n    fis = new FileInputStream(\"data.txt\");\n    // read data\n} finally {\n    fis.close(); // What if an exception is thrown before or during close?\n}\n```",
    "questionText": "Debug this Java snippet: Why does this resource leak occur despite using a finally block, and how does try-with-resources resolve it?\n\n```java\nFileInputStream fis = null;\ntry {\n    fis = new FileInputStream(\"data.txt\");\n    // read data\n} finally {\n    fis.close(); // What if an exception is thrown before or during close?\n}\n```",
    "idealAnswer": "Two major bugs exist: 1) If `new FileInputStream` fails and throws an exception, `fis` remains `null`, causing `fis.close()` in the `finally` block to throw a NullPointerException, masking the original root cause; 2) If an exception is thrown in both the `try` block and the `finally` block, the `finally` exception completely suppresses and swallows the primary exception. In Java 7+, try-with-resources (`try (FileInputStream fis = new FileInputStream(\"data.txt\")) { ... }`) automatically handles null checking and closes resources in reverse declaration order, while preserving the primary exception and attaching secondary close exceptions to `getSuppressed()`.",
    "referenceAnswer": "Two major bugs exist: 1) If `new FileInputStream` fails and throws an exception, `fis` remains `null`, causing `fis.close()` in the `finally` block to throw a NullPointerException, masking the original root cause; 2) If an exception is thrown in both the `try` block and the `finally` block, the `finally` exception completely suppresses and swallows the primary exception. In Java 7+, try-with-resources (`try (FileInputStream fis = new FileInputStream(\"data.txt\")) { ... }`) automatically handles null checking and closes resources in reverse declaration order, while preserving the primary exception and attaching secondary close exceptions to `getSuppressed()`.",
    "keyPoints": [
      "Raw finally requires explicit null check before calling close()",
      "Exceptions in finally block mask and overwrite original exceptions in try block",
      "try-with-resources implements AutoCloseable and preserves suppressed exceptions",
      "Cleaner, leak-proof resource management for files, sockets, and JDBC connections"
    ],
    "expectedKeyPoints": [
      "Raw finally requires explicit null check before calling close()",
      "Exceptions in finally block mask and overwrite original exceptions in try block",
      "try-with-resources implements AutoCloseable and preserves suppressed exceptions",
      "Cleaner, leak-proof resource management for files, sockets, and JDBC connections"
    ],
    "followUps": [
      "How can you inspect suppressed exceptions in Java?",
      "What order are multiple resources closed when declared in a single try-with-resources statement?"
    ],
    "suggestedFollowUps": [
      "How can you inspect suppressed exceptions in Java?",
      "What order are multiple resources closed when declared in a single try-with-resources statement?"
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
      "java",
      "exception handling  best practices"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this java snippet why does this resource leak occur despite using a finally block and how does trywithresources resolve it java fileinputstream fis null try fis new fileinputstreamdatatxt read data finally fisclose what if an exception is thrown before or during close",
    "normalizedText": "debug this java snippet why does this resource leak occur despite using a finally block and how does trywithresources resolve it java fileinputstream fis null try fis new fileinputstreamdatatxt read data finally fisclose what if an exception is thrown before or during close",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "SOLID Principles & Design Patterns",
    "subtopic": "SOLID Principles & Design Patterns",
    "question": "Explain the Dependency Inversion Principle (DIP) and how Spring Framework utilizes Inversion of Control (IoC) and Dependency Injection (DI) to implement it.",
    "questionText": "Explain the Dependency Inversion Principle (DIP) and how Spring Framework utilizes Inversion of Control (IoC) and Dependency Injection (DI) to implement it.",
    "idealAnswer": "The Dependency Inversion Principle states that: 1) High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces); and 2) Abstractions should not depend on details; details should depend on abstractions. Inversion of Control (IoC) reverses the control flow: instead of an object instantiating its dependencies directly using `new Service()`, an external container manages object lifecycles. Dependency Injection (DI) is the pattern where the Spring IoC container injects required dependencies (via constructor injection, setter injection, or field injection) at runtime, decoupling business logic from concrete implementations.",
    "referenceAnswer": "The Dependency Inversion Principle states that: 1) High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces); and 2) Abstractions should not depend on details; details should depend on abstractions. Inversion of Control (IoC) reverses the control flow: instead of an object instantiating its dependencies directly using `new Service()`, an external container manages object lifecycles. Dependency Injection (DI) is the pattern where the Spring IoC container injects required dependencies (via constructor injection, setter injection, or field injection) at runtime, decoupling business logic from concrete implementations.",
    "keyPoints": [
      "DIP mandates decoupling high-level policy from low-level implementation details via interfaces",
      "IoC shifts lifecycle and dependency instantiation responsibility to the container",
      "Constructor injection is preferred over field injection for immutability and unit testing",
      "Enables seamless mocking and unit testing without spin-up of concrete services"
    ],
    "expectedKeyPoints": [
      "DIP mandates decoupling high-level policy from low-level implementation details via interfaces",
      "IoC shifts lifecycle and dependency instantiation responsibility to the container",
      "Constructor injection is preferred over field injection for immutability and unit testing",
      "Enables seamless mocking and unit testing without spin-up of concrete services"
    ],
    "followUps": [
      "Why is field injection with @Autowired considered an anti-pattern in modern Spring?",
      "What are the Spring bean scopes (Singleton, Prototype, Request, Session)?"
    ],
    "suggestedFollowUps": [
      "Why is field injection with @Autowired considered an anti-pattern in modern Spring?",
      "What are the Spring bean scopes (Singleton, Prototype, Request, Session)?"
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
      "java",
      "solid principles  design patterns"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain the dependency inversion principle dip and how spring framework utilizes inversion of control ioc and dependency injection di to implement it",
    "normalizedText": "explain the dependency inversion principle dip and how spring framework utilizes inversion of control ioc and dependency injection di to implement it",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Core Java & JVM Internals",
    "subtopic": "Core Java & JVM Internals",
    "question": "Debug this Java scenario regarding Core Java & JVM Internals: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for Core Java & JVM Internals\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "questionText": "Debug this Java scenario regarding Core Java & JVM Internals: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for Core Java & JVM Internals\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Core Java & JVM Internals. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Core Java & JVM Internals. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Core Java & JVM Internals bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Core Java & JVM Internals bug?",
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
      "java",
      "core java  jvm internals",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this java scenario regarding core java jvm internals a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for core java jvm internals function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "normalizedText": "debug this java scenario regarding core java jvm internals a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for core java jvm internals function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "OOP Principles & Class Design",
    "subtopic": "OOP Principles & Class Design",
    "question": "Compare alternative design strategies for OOP Principles & Class Design in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for OOP Principles & Class Design in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for OOP Principles & Class Design in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for OOP Principles & Class Design in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for OOP Principles & Class Design",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for OOP Principles & Class Design",
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
      "java",
      "oop principles  class design",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for oop principles class design in java under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for oop principles class design in java under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Collections Framework & Generics",
    "subtopic": "Collections Framework & Generics",
    "question": "Debug this Java scenario regarding Collections Framework & Generics: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for Collections Framework & Generics\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "questionText": "Debug this Java scenario regarding Collections Framework & Generics: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for Collections Framework & Generics\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Collections Framework & Generics. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Collections Framework & Generics. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Collections Framework & Generics bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Collections Framework & Generics bug?",
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
      "java",
      "collections framework  generics",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this java scenario regarding collections framework generics a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for collections framework generics function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "normalizedText": "debug this java scenario regarding collections framework generics a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for collections framework generics function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Java",
    "topic": "Multithreading, Concurrency & JMM",
    "subtopic": "Multithreading, Concurrency & JMM",
    "question": "Compare alternative design strategies for Multithreading, Concurrency & JMM in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Multithreading, Concurrency & JMM in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Multithreading, Concurrency & JMM in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Multithreading, Concurrency & JMM in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Multithreading, Concurrency & JMM",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Multithreading, Concurrency & JMM",
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
      "java",
      "multithreading concurrency  jmm",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for multithreading concurrency jmm in java under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for multithreading concurrency jmm in java under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Java Streams, Lambdas & Modern Java",
    "subtopic": "Java Streams, Lambdas & Modern Java",
    "question": "Debug this Java scenario regarding Java Streams, Lambdas & Modern Java: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for Java Streams, Lambdas & Modern Java\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "questionText": "Debug this Java scenario regarding Java Streams, Lambdas & Modern Java: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for Java Streams, Lambdas & Modern Java\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Java Streams, Lambdas & Modern Java. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Java Streams, Lambdas & Modern Java. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Java Streams, Lambdas & Modern Java bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Java Streams, Lambdas & Modern Java bug?",
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
      "java",
      "java streams lambdas  modern java",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this java scenario regarding java streams lambdas modern java a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for java streams lambdas modern java function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "normalizedText": "debug this java scenario regarding java streams lambdas modern java a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for java streams lambdas modern java function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Exception Handling & Best Practices",
    "subtopic": "Exception Handling & Best Practices",
    "question": "Compare alternative design strategies for Exception Handling & Best Practices in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Exception Handling & Best Practices in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Exception Handling & Best Practices in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Exception Handling & Best Practices in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Exception Handling & Best Practices",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Exception Handling & Best Practices",
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
      "java",
      "exception handling  best practices",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for exception handling best practices in java under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for exception handling best practices in java under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Java",
    "topic": "SOLID Principles & Design Patterns",
    "subtopic": "SOLID Principles & Design Patterns",
    "question": "Debug this Java scenario regarding SOLID Principles & Design Patterns: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for SOLID Principles & Design Patterns\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "questionText": "Debug this Java scenario regarding SOLID Principles & Design Patterns: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for SOLID Principles & Design Patterns\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in SOLID Principles & Design Patterns. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in SOLID Principles & Design Patterns. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this SOLID Principles & Design Patterns bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this SOLID Principles & Design Patterns bug?",
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
      "java",
      "solid principles  design patterns",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this java scenario regarding solid principles design patterns a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for solid principles design patterns function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "normalizedText": "debug this java scenario regarding solid principles design patterns a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for solid principles design patterns function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Memory Management & Garbage Collection",
    "subtopic": "Memory Management & Garbage Collection",
    "question": "Compare alternative design strategies for Memory Management & Garbage Collection in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Memory Management & Garbage Collection in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Memory Management & Garbage Collection in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Memory Management & Garbage Collection in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Memory Management & Garbage Collection",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Memory Management & Garbage Collection",
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
      "java",
      "memory management  garbage collection",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for memory management garbage collection in java under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for memory management garbage collection in java under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "JDBC & Database Connectivity",
    "subtopic": "JDBC & Database Connectivity",
    "question": "Debug this Java scenario regarding JDBC & Database Connectivity: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for JDBC & Database Connectivity\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "questionText": "Debug this Java scenario regarding JDBC & Database Connectivity: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for JDBC & Database Connectivity\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in JDBC & Database Connectivity. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in JDBC & Database Connectivity. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this JDBC & Database Connectivity bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this JDBC & Database Connectivity bug?",
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
      "java",
      "jdbc  database connectivity",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this java scenario regarding jdbc database connectivity a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for jdbc database connectivity function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "normalizedText": "debug this java scenario regarding jdbc database connectivity a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for jdbc database connectivity function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Java",
    "topic": "Core Java & JVM Internals",
    "subtopic": "Core Java & JVM Internals",
    "question": "Compare alternative design strategies for Core Java & JVM Internals in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Core Java & JVM Internals in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Core Java & JVM Internals in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Core Java & JVM Internals in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Core Java & JVM Internals",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Core Java & JVM Internals",
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
      "java",
      "core java  jvm internals",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for core java jvm internals in java under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for core java jvm internals in java under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "OOP Principles & Class Design",
    "subtopic": "OOP Principles & Class Design",
    "question": "Debug this Java scenario regarding OOP Principles & Class Design: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for OOP Principles & Class Design\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "questionText": "Debug this Java scenario regarding OOP Principles & Class Design: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for OOP Principles & Class Design\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in OOP Principles & Class Design. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in OOP Principles & Class Design. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this OOP Principles & Class Design bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this OOP Principles & Class Design bug?",
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
      "java",
      "oop principles  class design",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this java scenario regarding oop principles class design a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for oop principles class design function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "normalizedText": "debug this java scenario regarding oop principles class design a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for oop principles class design function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Collections Framework & Generics",
    "subtopic": "Collections Framework & Generics",
    "question": "Compare alternative design strategies for Collections Framework & Generics in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Collections Framework & Generics in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Collections Framework & Generics in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Collections Framework & Generics in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Collections Framework & Generics",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Collections Framework & Generics",
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
      "java",
      "collections framework  generics",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for collections framework generics in java under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for collections framework generics in java under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Java",
    "topic": "Multithreading, Concurrency & JMM",
    "subtopic": "Multithreading, Concurrency & JMM",
    "question": "Debug this Java scenario regarding Multithreading, Concurrency & JMM: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for Multithreading, Concurrency & JMM\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "questionText": "Debug this Java scenario regarding Multithreading, Concurrency & JMM: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for Multithreading, Concurrency & JMM\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Multithreading, Concurrency & JMM. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Multithreading, Concurrency & JMM. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Multithreading, Concurrency & JMM bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Multithreading, Concurrency & JMM bug?",
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
      "java",
      "multithreading concurrency  jmm",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this java scenario regarding multithreading concurrency jmm a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for multithreading concurrency jmm function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "normalizedText": "debug this java scenario regarding multithreading concurrency jmm a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for multithreading concurrency jmm function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Java Streams, Lambdas & Modern Java",
    "subtopic": "Java Streams, Lambdas & Modern Java",
    "question": "Compare alternative design strategies for Java Streams, Lambdas & Modern Java in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Java Streams, Lambdas & Modern Java in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Java Streams, Lambdas & Modern Java in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Java Streams, Lambdas & Modern Java in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Java Streams, Lambdas & Modern Java",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Java Streams, Lambdas & Modern Java",
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
      "java",
      "java streams lambdas  modern java",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for java streams lambdas modern java in java under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for java streams lambdas modern java in java under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Java",
    "topic": "Exception Handling & Best Practices",
    "subtopic": "Exception Handling & Best Practices",
    "question": "Debug this Java scenario regarding Exception Handling & Best Practices: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for Exception Handling & Best Practices\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "questionText": "Debug this Java scenario regarding Exception Handling & Best Practices: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n// Problematic Java snippet for Exception Handling & Best Practices\nfunction processPayload(data) {\n    // Bug: Unhandled edge case, race condition, or memory leak\n    let cache = [];\n    return data.map(item => {\n        if (!item) return null;\n        cache.push(item);\n        return item.calculate ? item.calculate() : item;\n    });\n}",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Exception Handling & Best Practices. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Exception Handling & Best Practices. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Exception Handling & Best Practices bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Exception Handling & Best Practices bug?",
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
      "java",
      "exception handling  best practices",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this java scenario regarding exception handling best practices a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for exception handling best practices function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "normalizedText": "debug this java scenario regarding exception handling best practices a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic java snippet for exception handling best practices function processpayloaddata bug unhandled edge case race condition or memory leak let cache return datamapitem if item return null cachepushitem return itemcalculate itemcalculate item",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Java",
    "topic": "SOLID Principles & Design Patterns",
    "subtopic": "SOLID Principles & Design Patterns",
    "question": "Compare alternative design strategies for SOLID Principles & Design Patterns in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for SOLID Principles & Design Patterns in Java. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for SOLID Principles & Design Patterns in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for SOLID Principles & Design Patterns in Java, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for SOLID Principles & Design Patterns",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for SOLID Principles & Design Patterns",
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
      "java",
      "solid principles  design patterns",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for solid principles design patterns in java under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for solid principles design patterns in java under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  }
];

export default JAVA_QUESTIONS;
