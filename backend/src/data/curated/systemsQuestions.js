/**
 * Curated Question Bank - Systems, Architecture, Networking, OS & Core Languages
 * Structured progression from core systems fundamentals to distributed architecture and memory models.
 */

export const SYSTEM_DESIGN_QUESTIONS = [
  {
    questionId: "sys_scaling_001",
    questionText: "Explain the architectural differences between Horizontal Scaling and Vertical Scaling. How do Layer 4 and Layer 7 Load Balancers distribute traffic across a stateless web tier?",
    category: "System Design",
    topic: "High-Level Architecture, Scalability, Caching, Databases & Microservices",
    subtopic: "Scalability, Stateless Web Tiers & Load Balancing",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 1,
    learningStage: "Fundamentals",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "System Architect", "DevOps Engineer"],
    interviewMode: "system_design",
    tags: ["system-design", "scalability", "load-balancer", "l4-vs-l7", "stateless"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Vertical Scaling (scale-up): Adding CPU, RAM, or SSD to a single server; hardware ceiling limits growth and single point of failure (SPOF)",
      "Horizontal Scaling (scale-out): Adding more identical commodity servers behind a load balancer; virtually unlimited scalability and high fault tolerance",
      "Stateless tier: Web servers store no session state locally; user sessions are offloaded to distributed stores (Redis) or signed stateless JWTs",
      "Layer 4 (Transport): Balances based on IP and TCP/UDP ports without inspecting packet payload; extremely fast, low CPU overhead",
      "Layer 7 (Application): Balances based on HTTP headers, URLs, cookies, and message content; enables path-based routing (/api vs /static) and SSL termination"
    ],
    referenceAnswer: "Vertical scaling (scale-up) enhances the compute capacity of a single physical machine by adding more CPU cores, RAM, or I/O bandwidth. While simple to deploy without architectural overhaul, it has hard physical hardware limits, exponentially increasing costs, and represents a Single Point of Failure (SPOF). Horizontal scaling (scale-out) adds multiple independent server instances behind a load balancer, enabling linear scale and redundancy. For horizontal scaling to succeed, the application tier must be stateless: requests can route to any arbitrary instance without local state loss, requiring session state to be stored in an external distributed cache (like Redis) or encoded in signed JWT tokens. Load balancers distribute incoming traffic: Layer 4 load balancers operate at the transport layer (TCP/UDP), routing traffic purely on IP address and port without inspecting HTTP payloads, making them blazing fast. Layer 7 load balancers operate at the application layer (HTTP/HTTPS), parsing request headers, URLs, and cookies to enable smart routing, SSL termination, and rate limiting.",
    stepByStepExplanation: "1. Client resolves domain to Load Balancer IP via DNS.\n2. Layer 4 LB receives TCP SYN packet, forwards to backend server based on round-robin or least-connections.\n3. Layer 7 LB completes TCP handshake with client, decrypts TLS, parses HTTP request URL (e.g. '/api/checkout'), and routes to dedicated service cluster.\n4. Backend servers process stateless request, pulling user session from Redis.\n5. Responses stream back through LB to client.",
    practicalExample: "// Architecture Pattern: Stateless API Server with Redis Session Store\n// express-session configured with connect-redis\napp.use(session({\n    store: new RedisStore({ client: redisClient }),\n    secret: process.env.SESSION_SECRET,\n    resave: false,\n    saveUninitialized: false\n}));",
    commonMistakes: [
      "Storing session state in local server memory while deploying behind a round-robin load balancer (causes users to get logged out on next request)",
      "Confusing L4 (packet-level routing) with L7 (content-aware routing)",
      "Assuming horizontal scaling is free; it introduces distributed systems complexity, consensus challenges, and network latency"
    ],
    suggestedFollowUps: ["How does Consistent Hashing prevent massive cache invalidation when servers are added or removed from a cluster?"]
  },
  {
    questionId: "sys_caching_002",
    questionText: "Compare the Cache-Aside, Write-Through, and Write-Back caching strategies. How do you mitigate the Cache Stampede (Thundering Herd) problem in high-throughput distributed systems?",
    category: "System Design",
    topic: "High-Level Architecture, Scalability, Caching, Databases & Microservices",
    subtopic: "Distributed Caching Strategies & Stampede Mitigation",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 2,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "System Architect", "Senior Engineer"],
    interviewMode: "system_design",
    tags: ["system-design", "caching", "redis", "cache-aside", "thundering-herd"],
    companyStyleLabel: "Enterprise / FinTech",
    expectedKeyPoints: [
      "Cache-Aside (Lazy Loading): Application reads from cache; on miss, reads from DB and populates cache. Writes update DB and invalidate cache",
      "Write-Through: Application writes to cache; cache immediately writes to DB synchronously before returning success",
      "Write-Back (Write-Behind): Application writes to cache; cache acknowledges immediately and writes to DB asynchronously in batches (high throughput, data loss risk on crash)",
      "Cache Stampede (Thundering Herd): Occurs when a high-traffic cache key expires; hundreds of concurrent requests miss and hammer the database simultaneously",
      "Mitigations: Mutex locking (single thread rebuilds cache using distributed lock), probabilistic early expiration (XFetch algorithm), or background cron pre-warming"
    ],
    referenceAnswer: "Distributed caching dramatically lowers database read latency. In Cache-Aside (Lazy Loading), the application queries the cache first; on a miss, it fetches data from the database, stores it in cache with a TTL, and returns it. Writes update the database directly and invalidate the cache key. In Write-Through, the application writes to the cache, which synchronously persists changes to the database before returning success, guaranteeing consistency at the cost of higher write latency. In Write-Back (Write-Behind), the application writes to the cache and receives an immediate acknowledgement; the cache asynchronously batches updates to the database, maximizing write performance but risking data loss if the cache node crashes before flushing. A Cache Stampede (Thundering Herd) occurs when a popular hot key expires, causing hundreds of concurrent requests to miss and query the database simultaneously, potentially crashing it. We mitigate stampedes using: (1) Distributed Mutex locking (only one thread acquires a Redis lock to query the DB and refresh cache, while others wait or return stale data), (2) Probabilistic early expiration (recomputing the cache before it officially expires), or (3) Permanent keys refreshed by background jobs.",
    stepByStepExplanation: "1. Cache Miss occurs for hot key 'trending_products'.\n2. Thread A acquires distributed lock 'lock:trending_products' with 5s TTL.\n3. Threads B, C, D fail to acquire lock; either wait briefly and re-check cache, or serve stale cache value with warning.\n4. Thread A executes expensive DB query, writes result to Redis with 1-hour TTL, and releases lock.\n5. Subsequent requests hit the warm cache.",
    practicalExample: "// Cache-Aside with Mutex Lock to Prevent Thundering Herd:\nasync function getProductWithLock(productId) {\n    let product = await redis.get(`product:${productId}`);\n    if (product) return JSON.parse(product);\n\n    const lock = await redis.set(`lock:${productId}`, 'locked', 'NX', 'EX', 5);\n    if (lock) {\n        try {\n            product = await db.query('SELECT * FROM products WHERE id = ?', [productId]);\n            await redis.set(`product:${productId}`, JSON.stringify(product), 'EX', 3600);\n        } finally {\n            await redis.del(`lock:${productId}`);\n        }\n    } else {\n        await new Promise(r => setTimeout(r, 100));\n        return getProductWithLock(productId); // Retry from cache\n    }\n    return product;\n}",
    commonMistakes: [
      "Updating cache before the database in Cache-Aside; if DB write fails, cache contains invalid ghost data",
      "Setting identical TTLs for millions of keys, causing synchronized mass expiration at the exact same second (use jitter)",
      "Ignoring cache eviction policies (e.g., allkeys-lru vs volatile-lru)"
    ],
    suggestedFollowUps: ["How does the XFetch algorithm use beta distribution to achieve probabilistic early cache recomputation?"]
  },
  {
    questionId: "sys_cap_theorem_003",
    questionText: "Explain the CAP Theorem and its real-world implications in distributed systems. Why is 'CA' impossible in distributed networks, and how do CP systems (e.g. HBase, CockroachDB) differ from AP systems (e.g. Cassandra, DynamoDB)?",
    category: "System Design",
    topic: "High-Level Architecture, Scalability, Caching, Databases & Microservices",
    subtopic: "Distributed Systems & The CAP Theorem",
    difficulty: "Hard",
    questionType: "conceptual",
    sequenceOrder: 3,
    learningStage: "Advanced Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "System Architect", "Distributed Systems Engineer"],
    interviewMode: "conceptual",
    tags: ["system-design", "cap-theorem", "distributed-systems", "consistency", "availability"],
    companyStyleLabel: "Enterprise / FinTech",
    expectedKeyPoints: [
      "CAP components: Consistency (linearizability: all nodes see same data at same time), Availability (every non-failing node returns non-error response), Partition Tolerance (system continues operating despite network packet loss or splits)",
      "Partition Tolerance (P) is mandatory in real-world distributed networks because physical cables, switches, and network partitions inevitably fail",
      "When a network partition occurs, the system MUST choose between Consistency (CP) or Availability (AP)",
      "CP choice: Refuse writes or return error on partitioned nodes to prevent split-brain / inconsistent state (e.g. banking balances)",
      "AP choice: Accept writes on both partitions and sync later via eventual consistency, CRDTs, or vector clocks (e.g. social media feeds, shopping carts)"
    ],
    referenceAnswer: "The CAP Theorem states that in a distributed data store, you can only simultaneously guarantee at most two out of three properties: Consistency, Availability, and Partition Tolerance. In any real-world distributed network, network partitions (P)—such as packet loss, fiber cuts, or network latency spikes—are an unavoidable physical reality. Therefore, Partition Tolerance cannot be traded away; a distributed system must choose how to behave when a partition occurs: Consistency (CP) or Availability (AP). A CP system (like HBase, etcd, ZooKeeper, or CockroachDB) prioritizes strict linearizable consistency: if nodes cannot communicate across a partition, minority nodes reject writes and reads or throw errors to prevent stale reads or split-brain states. An AP system (like Apache Cassandra or Amazon DynamoDB) prioritizes 100% availability: every reachable node accepts reads and writes even during a partition, tolerating temporary divergence and reconciling conflicts later through eventual consistency, vector clocks, or Last-Write-Wins (LWW).",
    stepByStepExplanation: "1. Normal State: Nodes A and B communicate perfectly. Writes update both nodes. Reads return identical data.\n2. Partition Occurs: Network link between Node A and Node B breaks.\n3. Client writes X = 10 to Node A.\n4. CP Choice: Node A cannot replicate to Node B. Node A rejects the write or waits indefinitely, preserving consistency (X is never contradictory).\n5. AP Choice: Node A accepts X = 10. Node B still serves X = 5. System stays available, but data is temporarily inconsistent until partition heals.",
    practicalExample: "// PACELC Theorem Extension:\n// If Partition (P): choose between Availability (A) and Consistency (C);\n// Else (E): choose between Latency (L) and Consistency (C).\n// MongoDB default: PC/EC (prefers consistency);\n// Cassandra default: PA/EL (prefers availability and low latency).",
    commonMistakes: [
      "Claiming a distributed system can choose 'CA'; in distributed networks, network failures are guaranteed, making pure CA impossible",
      "Equating ACID Consistency (schema constraints) with CAP Consistency (linearizability across nodes)",
      "Assuming AP systems cannot be tuned; Cassandra allows tunable consistency levels (e.g., LOCAL_QUORUM)"
    ],
    suggestedFollowUps: ["What is the PACELC theorem and how does it describe distributed database trade-offs during normal non-partition operation?"]
  }
];

export const OS_QUESTIONS = [
  {
    questionId: "os_process_thread_001",
    questionText: "What are the fundamental differences between a Process and a Thread? Compare their memory layouts, context switching costs, and inter-process communication (IPC) mechanisms.",
    category: "Operating Systems",
    topic: "Processes, Threads, CPU Scheduling, Virtual Memory, Concurrency & Deadlocks",
    subtopic: "Process & Thread Models",
    difficulty: "Easy",
    questionType: "conceptual",
    sequenceOrder: 1,
    learningStage: "Fundamentals",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Systems Engineer", "Backend Developer"],
    interviewMode: "conceptual",
    tags: ["os", "processes", "threads", "context-switch", "ipc"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Process: Independent executing program instance with its own isolated virtual memory space (Text, Data, Heap, Stack)",
      "Thread: Lightweight unit of execution within a process; threads share the process's Text, Data, Heap, and open file descriptors, but each thread has its own private Stack and CPU registers",
      "Context Switch: Process context switch is heavy (invalidates CPU TLB cache, switches page tables); Thread context switch is lightweight (shares address space, keeps TLB valid)",
      "Communication: Threads communicate via shared memory; Processes require OS-mediated Inter-Process Communication (IPC: Pipes, Sockets, Shared Memory, Message Queues)"
    ],
    referenceAnswer: "A process is an executing instance of a computer program allocated its own isolated virtual address space, containing its own text segment (code), data segment (globals), heap (dynamic allocations), and stack. A thread is the smallest schedulable unit of CPU execution within a process. Multiple threads within the same process share the process's heap, global variables, code segment, and operating system resources (like open sockets and file descriptors), but each thread maintains its own private execution stack, program counter, and CPU register set. Because processes are isolated by the OS kernel, context switching between processes is expensive: the OS must change the memory page directory, invalidating the CPU Translation Lookaside Buffer (TLB) and L1/L2 caches. Thread context switches within the same process are much faster because the address space and page tables remain intact. While threads communicate easily through shared memory (requiring mutexes to prevent race conditions), processes require Inter-Process Communication (IPC) mechanisms such as Unix Domain Sockets, named pipes, or shared memory segments.",
    stepByStepExplanation: "1. Memory: Process A cannot read Process B's memory (enforced by OS MMU hardware). Threads 1 & 2 in Process A read the exact same heap pointers.\n2. Crash resilience: If a thread triggers a segmentation fault, it crashes the entire process. If a process crashes, other processes remain alive.\n3. Creation overhead: Creating a thread is orders of magnitude faster than fork()ing a process (even with Copy-on-Write).",
    practicalExample: "// Thread: Shared Memory\nint counter = 0; // Shared across all threads in process\n\n// Process: Isolated Memory\npid_t pid = fork();\nif (pid == 0) {\n    counter = 100; // Only modifies child process copy; parent process counter remains 0\n}",
    commonMistakes: [
      "Claiming threads share their execution stack; each thread must have its own stack to track its own function calls and local variables",
      "Thinking multi-threading is always faster than multi-processing; multi-threading introduces lock contention and race conditions",
      "Forgetting that thread crashes (SIGSEGV) terminate the entire host process"
    ],
    suggestedFollowUps: ["How does the OS Kernel implement Copy-On-Write (COW) during fork() to optimize process creation?"]
  },
  {
    questionId: "os_deadlock_002",
    questionText: "Define the four Coffman Conditions necessary for a Deadlock to occur. How can an Operating System prevent, avoid, or detect and recover from deadlocks?",
    category: "Operating Systems",
    topic: "Processes, Threads, CPU Scheduling, Virtual Memory, Concurrency & Deadlocks",
    subtopic: "Deadlock Theory & Coffman Conditions",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 2,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Systems Engineer", "Backend Developer"],
    interviewMode: "conceptual",
    tags: ["os", "deadlock", "coffman-conditions", "concurrency", "bankers-algorithm"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Four Coffman conditions: (1) Mutual Exclusion, (2) Hold and Wait, (3) No Preemption, (4) Circular Wait",
      "ALL four conditions must hold simultaneously for a deadlock to exist",
      "Deadlock Prevention: Invalidate at least one condition (e.g. enforce strict global lock ordering to eliminate Circular Wait)",
      "Deadlock Avoidance: Banker's Algorithm dynamically verifies resource allocations remain in a 'safe state'",
      "Deadlock Detection & Recovery: Build Resource Allocation Graph (RAG); terminate victim process or preempt resources if cycle is detected"
    ],
    referenceAnswer: "A deadlock occurs when a set of concurrent processes are permanently blocked because each process holds a resource and waits for another resource held by another process in the set. For a deadlock to occur, all four Coffman Conditions must hold simultaneously: (1) Mutual Exclusion: Resources cannot be shared; only one process holds a resource at a time. (2) Hold and Wait: A process holding at least one resource is actively waiting to acquire additional resources held by others. (3) No Preemption: Resources cannot be forcibly confiscated from a process; they can only be released voluntarily. (4) Circular Wait: A closed chain of processes exists where P0 waits for P1, P1 waits for P2, and Pn waits for P0. To handle deadlocks, an OS can use: (a) Prevention, by eliminating one condition (most commonly eliminating Circular Wait by enforcing a strict global lock acquisition hierarchy), (b) Avoidance, such as Dijkstra's Banker's Algorithm which checks for safe resource allocation states before granting requests, or (c) Detection and Recovery, which periodically scans the Resource Allocation Graph for directed cycles and terminates the lowest-priority process to break the cycle.",
    stepByStepExplanation: "1. Mutual Exclusion: e.g. printer or mutex lock can only be held by 1 process.\n2. Hold and Wait: Process 1 locks Mutex A, requests Mutex B without releasing A.\n3. No Preemption: OS cannot seize Mutex A from Process 1.\n4. Circular Wait: Process 2 locks Mutex B, requests Mutex A. Circular dependency formed.\n5. Prevention Solution: Number all locks 1 to N. Processes MUST acquire locks in strictly increasing numerical order. Circular wait becomes mathematically impossible.",
    practicalExample: "// Preventing Deadlock by Strict Lock Ordering:\nvoid transfer(Account from, Account to, double amount) {\n    Account first = from.id < to.id ? from : to;\n    Account second = from.id < to.id ? to : from;\n    \n    // Always acquire locks in uniform order (eliminates circular wait)\n    synchronized(first) {\n        synchronized(second) {\n            from.debit(amount);\n            to.credit(amount);\n        }\n    }\n}",
    commonMistakes: [
      "Believing breaking any three conditions is required; breaking ANY SINGLE condition prevents deadlock completely",
      "Confusing Deadlock (frozen state, 0% CPU) with Livelock (active state changes without progress, 100% CPU)",
      "Assuming Banker's Algorithm is widely used in general-purpose OS kernels; it requires knowing total future resource claims in advance, which is rarely realistic"
    ],
    suggestedFollowUps: ["What is the difference between Deadlock and Livelock? How does Starvation differ from Deadlock?"]
  }
];

export const NETWORK_QUESTIONS = [
  {
    questionId: "net_tcp_handshake_001",
    questionText: "Walk through the TCP Three-Way Handshake and Four-Way Connection Termination. Why is the TIME_WAIT state essential on the active closer, and what problems occur if it is disabled?",
    category: "Computer Networks",
    topic: "OSI Model, TCP/IP, DNS, HTTP/HTTPS, Sockets, Proxies & Subnetting",
    subtopic: "TCP Handshake, Teardown & TIME_WAIT",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 1,
    learningStage: "Fundamentals",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Software Engineer", "Backend Developer", "DevOps Engineer", "Networking Engineer"],
    interviewMode: "conceptual",
    tags: ["networking", "tcp", "handshake", "time-wait", "transport-layer"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "3-Way Handshake: (1) Client sends SYN(seq=x), (2) Server replies SYN-ACK(seq=y, ack=x+1), (3) Client replies ACK(ack=y+1)",
      "Establishes initial sequence numbers (ISN) and confirms bi-directional transmission capability",
      "4-Way Teardown: (1) Client sends FIN, (2) Server sends ACK, (3) Server finishes transmission and sends FIN, (4) Client sends ACK",
      "TIME_WAIT state duration equals 2 * MSL (Maximum Segment Lifetime, typically 60-120 seconds)",
      "TIME_WAIT Purpose 1: Ensure final ACK arrives at server; if lost, server re-sends FIN and client can re-ACK",
      "TIME_WAIT Purpose 2: Allow delayed stray packets from old connection to expire in network so they do not corrupt a newly opened connection on the same socket pair (IP:Port)"
    ],
    referenceAnswer: "The Transmission Control Protocol (TCP) establishes reliable connections via a Three-Way Handshake: (1) The client sends a SYN packet with an Initial Sequence Number (ISN=X). (2) The server responds with SYN-ACK, acknowledging X+1 and sending its own sequence number (ISN=Y). (3) The client responds with ACK (Y+1), completing connection setup and synchronizing bi-directional sequence tracking. Connection teardown requires a Four-Way Handshake because TCP is full-duplex: either side can finish sending data independently. When the active closer sends FIN and receives ACK, then receives the peer's FIN and replies with the final ACK, it enters the TIME_WAIT state for a duration of 2 * MSL (Maximum Segment Lifetime, typically 1 to 2 minutes). The TIME_WAIT state serves two critical functions: (1) It ensures reliable connection termination: if the client's final ACK packet is dropped in transit, the server retransmits its FIN; in TIME_WAIT, the client can resend the ACK instead of throwing a connection reset (RST). (2) It allows old delayed duplicate packets wandering through internet routers to expire, preventing them from corrupting a new reincarnation of the same socket pair (ClientIP:ClientPort + ServerIP:ServerPort).",
    stepByStepExplanation: "1. SYN (seq=x): 'I want to connect; my sequence counter starts at x.'\n2. SYN-ACK (seq=y, ack=x+1): 'Acknowledged; my counter starts at y.'\n3. ACK (seq=x+1, ack=y+1): 'Acknowledged; connection established.'\n4. Active Close sends FIN; Passive Close ACKs.\n5. Passive Close finishes buffer write, sends FIN.\n6. Active Close sends ACK, enters TIME_WAIT for 2 * MSL.\n7. Active Close cleans up socket resources and closes.",
    practicalExample: "// Linux kernel parameters governing TIME_WAIT:\n// cat /proc/sys/net/ipv4/tcp_fin_timeout (default 60 seconds)\n// netstat -nat | grep TIME_WAIT\n// In high-throughput proxy servers, SO_REUSEADDR allows binding to ports in TIME_WAIT safely.",
    commonMistakes: [
      "Confusing the 3-Way Handshake (connection establishment) with the 4-Way Handshake (connection teardown)",
      "Thinking TIME_WAIT is on the server; TIME_WAIT occurs on whichever endpoint initiated the active close (client or server)",
      "Aggressively setting tcp_fin_timeout to 0 in production, which causes silent packet corruption on recycled ports"
    ],
    suggestedFollowUps: ["How does TCP SYN Flood attack exploit the handshake, and how do SYN Cookies mitigate it?"]
  },
  {
    questionId: "net_http_versions_002",
    questionText: "Trace the architectural evolution of HTTP from HTTP/1.1 to HTTP/2 and HTTP/3. Explain Head-of-Line (HoL) blocking at the application layer versus the transport layer, and why HTTP/3 moved to QUIC over UDP.",
    category: "Computer Networks",
    topic: "OSI Model, TCP/IP, DNS, HTTP/HTTPS, Sockets, Proxies & Subnetting",
    subtopic: "HTTP Protocols, Multiplexing & QUIC",
    difficulty: "Hard",
    questionType: "conceptual",
    sequenceOrder: 2,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Advanced concept",
    targetRoles: ["Software Engineer", "Backend Developer", "Frontend Architect", "Infrastructure Engineer"],
    interviewMode: "conceptual",
    tags: ["networking", "http", "http2", "http3", "quic", "multiplexing"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "HTTP/1.1 introduced keep-alive persistent connections, but suffered from Application-layer Head-of-Line (HoL) blocking: requests on a single TCP connection must be processed sequentially in FIFO order",
      "HTTP/2 introduced binary framing and Multiplexing: multiple concurrent bidirectional streams interleave over a single TCP connection without waiting for prior requests",
      "HTTP/2 HPACK header compression reduces bandwidth overhead",
      "HTTP/2 Transport-layer HoL blocking: because HTTP/2 shares a single TCP stream, dropping a single TCP packet halts ALL multiplexed streams until TCP retransmits and acknowledges the missing packet",
      "HTTP/3 replaces TCP with QUIC over UDP: streams are independent at the transport layer, meaning a dropped packet on Stream A does NOT stall Stream B. QUIC also integrates TLS 1.3 for 0-RTT/1-RTT connection handshakes and seamless connection migration across IP changes"
    ],
    referenceAnswer: "The evolution of HTTP addresses latency and concurrency bottlenecks. HTTP/1.1 introduced persistent TCP connections, but suffered from Application-layer Head-of-Line (HoL) blocking: a single TCP socket can only serialize one HTTP request/response transaction at a time; if the first request is slow, all subsequent requests are blocked. HTTP/2 solved this at the application layer by replacing plain text with binary framing, enabling full Multiplexing: hundreds of independent requests and responses interleave concurrently as discrete stream frames over a single TCP connection. However, HTTP/2 introduced a Transport-layer HoL blocking vulnerability: because all streams share one underlying TCP connection, if even a single TCP packet is dropped by an intermediate router, TCP's sliding window protocol freezes all streams until the dropped packet is retransmitted. HTTP/3 solves this by replacing TCP with QUIC running on top of UDP. Under QUIC, stream multiplexing is native to the transport protocol: a lost packet only pauses the specific stream it belongs to, allowing all other streams to continue unimpeded. QUIC also combines transport and cryptographic handshakes into a single round trip (0-RTT or 1-RTT with TLS 1.3) and enables connection migration across cellular/Wi-Fi transitions without renegotiation.",
    stepByStepExplanation: "1. HTTP/1.1: 6 parallel TCP connections per domain to work around sequential request limits.\n2. HTTP/2: Single TCP connection; binary frames with stream IDs multiplex in parallel. HPACK compresses duplicate headers.\n3. Packet drop in HTTP/2: Kernel TCP stack stops passing data to application until missing byte arrives.\n4. HTTP/3 (QUIC): Operates over UDP. Each stream has independent packet sequence tracking. Dropped packet in Stream 3 has zero impact on Stream 4.",
    practicalExample: "// Comparing Connection Latency:\n// HTTP/1.1 + TLS 1.2: TCP Handshake (1 RTT) + TLS Handshake (2 RTT) = 3 RTT before first byte.\n// HTTP/2 + TLS 1.2: TCP (1 RTT) + TLS (1-2 RTT) = 2-3 RTT.\n// HTTP/3 (QUIC): Combined Transport + TLS 1.3 handshake = 1 RTT (or 0-RTT on session resumption).",
    commonMistakes: [
      "Believing HTTP/3 uses UDP without reliability; QUIC implements full packet acknowledgement, flow control, and loss recovery on top of UDP in userspace",
      "Assuming HTTP/2 requires multiple TCP connections; HTTP/2 was specifically engineered to use exactly one TCP connection per origin",
      "Thinking HTTP/2 eliminates all Head-of-Line blocking; it eliminated application HoL blocking, but retained TCP transport HoL blocking"
    ],
    suggestedFollowUps: ["How does QUIC Connection Migration use Connection IDs to maintain connections when a mobile device switches from Wi-Fi to 5G?"]
  }
];
