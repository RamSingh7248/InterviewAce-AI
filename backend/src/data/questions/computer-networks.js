/**
 * Curated High-Value Questions for Computer Networks
 * Total Questions: 42
 */

export const COMPUTER_NETWORKS_QUESTIONS = [
  {
    "category": "Computer Networks",
    "topic": "OSI Model, TCP/IP, DNS, HTTP/HTTPS, Sockets, Proxies & Subnetting",
    "subtopic": "TCP Handshake, Teardown & TIME_WAIT",
    "question": "Walk through the TCP Three-Way Handshake and Four-Way Connection Termination. Why is the TIME_WAIT state essential on the active closer, and what problems occur if it is disabled?",
    "questionText": "Walk through the TCP Three-Way Handshake and Four-Way Connection Termination. Why is the TIME_WAIT state essential on the active closer, and what problems occur if it is disabled?",
    "idealAnswer": "The Transmission Control Protocol (TCP) establishes reliable connections via a Three-Way Handshake: (1) The client sends a SYN packet with an Initial Sequence Number (ISN=X). (2) The server responds with SYN-ACK, acknowledging X+1 and sending its own sequence number (ISN=Y). (3) The client responds with ACK (Y+1), completing connection setup and synchronizing bi-directional sequence tracking. Connection teardown requires a Four-Way Handshake because TCP is full-duplex: either side can finish sending data independently. When the active closer sends FIN and receives ACK, then receives the peer's FIN and replies with the final ACK, it enters the TIME_WAIT state for a duration of 2 * MSL (Maximum Segment Lifetime, typically 1 to 2 minutes). The TIME_WAIT state serves two critical functions: (1) It ensures reliable connection termination: if the client's final ACK packet is dropped in transit, the server retransmits its FIN; in TIME_WAIT, the client can resend the ACK instead of throwing a connection reset (RST). (2) It allows old delayed duplicate packets wandering through internet routers to expire, preventing them from corrupting a new reincarnation of the same socket pair (ClientIP:ClientPort + ServerIP:ServerPort).",
    "referenceAnswer": "The Transmission Control Protocol (TCP) establishes reliable connections via a Three-Way Handshake: (1) The client sends a SYN packet with an Initial Sequence Number (ISN=X). (2) The server responds with SYN-ACK, acknowledging X+1 and sending its own sequence number (ISN=Y). (3) The client responds with ACK (Y+1), completing connection setup and synchronizing bi-directional sequence tracking. Connection teardown requires a Four-Way Handshake because TCP is full-duplex: either side can finish sending data independently. When the active closer sends FIN and receives ACK, then receives the peer's FIN and replies with the final ACK, it enters the TIME_WAIT state for a duration of 2 * MSL (Maximum Segment Lifetime, typically 1 to 2 minutes). The TIME_WAIT state serves two critical functions: (1) It ensures reliable connection termination: if the client's final ACK packet is dropped in transit, the server retransmits its FIN; in TIME_WAIT, the client can resend the ACK instead of throwing a connection reset (RST). (2) It allows old delayed duplicate packets wandering through internet routers to expire, preventing them from corrupting a new reincarnation of the same socket pair (ClientIP:ClientPort + ServerIP:ServerPort).",
    "keyPoints": [
      "3-Way Handshake: (1) Client sends SYN(seq=x), (2) Server replies SYN-ACK(seq=y, ack=x+1), (3) Client replies ACK(ack=y+1)",
      "Establishes initial sequence numbers (ISN) and confirms bi-directional transmission capability",
      "4-Way Teardown: (1) Client sends FIN, (2) Server sends ACK, (3) Server finishes transmission and sends FIN, (4) Client sends ACK",
      "TIME_WAIT state duration equals 2 * MSL (Maximum Segment Lifetime, typically 60-120 seconds)",
      "TIME_WAIT Purpose 1: Ensure final ACK arrives at server; if lost, server re-sends FIN and client can re-ACK",
      "TIME_WAIT Purpose 2: Allow delayed stray packets from old connection to expire in network so they do not corrupt a newly opened connection on the same socket pair (IP:Port)"
    ],
    "expectedKeyPoints": [
      "3-Way Handshake: (1) Client sends SYN(seq=x), (2) Server replies SYN-ACK(seq=y, ack=x+1), (3) Client replies ACK(ack=y+1)",
      "Establishes initial sequence numbers (ISN) and confirms bi-directional transmission capability",
      "4-Way Teardown: (1) Client sends FIN, (2) Server sends ACK, (3) Server finishes transmission and sends FIN, (4) Client sends ACK",
      "TIME_WAIT state duration equals 2 * MSL (Maximum Segment Lifetime, typically 60-120 seconds)",
      "TIME_WAIT Purpose 1: Ensure final ACK arrives at server; if lost, server re-sends FIN and client can re-ACK",
      "TIME_WAIT Purpose 2: Allow delayed stray packets from old connection to expire in network so they do not corrupt a newly opened connection on the same socket pair (IP:Port)"
    ],
    "followUps": [
      "How does TCP SYN Flood attack exploit the handshake, and how do SYN Cookies mitigate it?"
    ],
    "suggestedFollowUps": [
      "How does TCP SYN Flood attack exploit the handshake, and how do SYN Cookies mitigate it?"
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
      "networking",
      "tcp",
      "handshake",
      "time-wait",
      "transport-layer",
      "computer networks"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "walk through the tcp threeway handshake and fourway connection termination why is the time_wait state essential on the active closer and what problems occur if it is disabled",
    "normalizedText": "walk through the tcp threeway handshake and fourway connection termination why is the time_wait state essential on the active closer and what problems occur if it is disabled",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "OSI Model, TCP/IP, DNS, HTTP/HTTPS, Sockets, Proxies & Subnetting",
    "subtopic": "HTTP Protocols, Multiplexing & QUIC",
    "question": "Trace the architectural evolution of HTTP from HTTP/1.1 to HTTP/2 and HTTP/3. Explain Head-of-Line (HoL) blocking at the application layer versus the transport layer, and why HTTP/3 moved to QUIC over UDP.",
    "questionText": "Trace the architectural evolution of HTTP from HTTP/1.1 to HTTP/2 and HTTP/3. Explain Head-of-Line (HoL) blocking at the application layer versus the transport layer, and why HTTP/3 moved to QUIC over UDP.",
    "idealAnswer": "The evolution of HTTP addresses latency and concurrency bottlenecks. HTTP/1.1 introduced persistent TCP connections, but suffered from Application-layer Head-of-Line (HoL) blocking: a single TCP socket can only serialize one HTTP request/response transaction at a time; if the first request is slow, all subsequent requests are blocked. HTTP/2 solved this at the application layer by replacing plain text with binary framing, enabling full Multiplexing: hundreds of independent requests and responses interleave concurrently as discrete stream frames over a single TCP connection. However, HTTP/2 introduced a Transport-layer HoL blocking vulnerability: because all streams share one underlying TCP connection, if even a single TCP packet is dropped by an intermediate router, TCP's sliding window protocol freezes all streams until the dropped packet is retransmitted. HTTP/3 solves this by replacing TCP with QUIC running on top of UDP. Under QUIC, stream multiplexing is native to the transport protocol: a lost packet only pauses the specific stream it belongs to, allowing all other streams to continue unimpeded. QUIC also combines transport and cryptographic handshakes into a single round trip (0-RTT or 1-RTT with TLS 1.3) and enables connection migration across cellular/Wi-Fi transitions without renegotiation.",
    "referenceAnswer": "The evolution of HTTP addresses latency and concurrency bottlenecks. HTTP/1.1 introduced persistent TCP connections, but suffered from Application-layer Head-of-Line (HoL) blocking: a single TCP socket can only serialize one HTTP request/response transaction at a time; if the first request is slow, all subsequent requests are blocked. HTTP/2 solved this at the application layer by replacing plain text with binary framing, enabling full Multiplexing: hundreds of independent requests and responses interleave concurrently as discrete stream frames over a single TCP connection. However, HTTP/2 introduced a Transport-layer HoL blocking vulnerability: because all streams share one underlying TCP connection, if even a single TCP packet is dropped by an intermediate router, TCP's sliding window protocol freezes all streams until the dropped packet is retransmitted. HTTP/3 solves this by replacing TCP with QUIC running on top of UDP. Under QUIC, stream multiplexing is native to the transport protocol: a lost packet only pauses the specific stream it belongs to, allowing all other streams to continue unimpeded. QUIC also combines transport and cryptographic handshakes into a single round trip (0-RTT or 1-RTT with TLS 1.3) and enables connection migration across cellular/Wi-Fi transitions without renegotiation.",
    "keyPoints": [
      "HTTP/1.1 introduced keep-alive persistent connections, but suffered from Application-layer Head-of-Line (HoL) blocking: requests on a single TCP connection must be processed sequentially in FIFO order",
      "HTTP/2 introduced binary framing and Multiplexing: multiple concurrent bidirectional streams interleave over a single TCP connection without waiting for prior requests",
      "HTTP/2 HPACK header compression reduces bandwidth overhead",
      "HTTP/2 Transport-layer HoL blocking: because HTTP/2 shares a single TCP stream, dropping a single TCP packet halts ALL multiplexed streams until TCP retransmits and acknowledges the missing packet",
      "HTTP/3 replaces TCP with QUIC over UDP: streams are independent at the transport layer, meaning a dropped packet on Stream A does NOT stall Stream B. QUIC also integrates TLS 1.3 for 0-RTT/1-RTT connection handshakes and seamless connection migration across IP changes"
    ],
    "expectedKeyPoints": [
      "HTTP/1.1 introduced keep-alive persistent connections, but suffered from Application-layer Head-of-Line (HoL) blocking: requests on a single TCP connection must be processed sequentially in FIFO order",
      "HTTP/2 introduced binary framing and Multiplexing: multiple concurrent bidirectional streams interleave over a single TCP connection without waiting for prior requests",
      "HTTP/2 HPACK header compression reduces bandwidth overhead",
      "HTTP/2 Transport-layer HoL blocking: because HTTP/2 shares a single TCP stream, dropping a single TCP packet halts ALL multiplexed streams until TCP retransmits and acknowledges the missing packet",
      "HTTP/3 replaces TCP with QUIC over UDP: streams are independent at the transport layer, meaning a dropped packet on Stream A does NOT stall Stream B. QUIC also integrates TLS 1.3 for 0-RTT/1-RTT connection handshakes and seamless connection migration across IP changes"
    ],
    "followUps": [
      "How does QUIC Connection Migration use Connection IDs to maintain connections when a mobile device switches from Wi-Fi to 5G?"
    ],
    "suggestedFollowUps": [
      "How does QUIC Connection Migration use Connection IDs to maintain connections when a mobile device switches from Wi-Fi to 5G?"
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
      "networking",
      "http",
      "http2",
      "http3",
      "quic",
      "multiplexing",
      "computer networks"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "trace the architectural evolution of http from http11 to http2 and http3 explain headofline hol blocking at the application layer versus the transport layer and why http3 moved to quic over udp",
    "normalizedText": "trace the architectural evolution of http from http11 to http2 and http3 explain headofline hol blocking at the application layer versus the transport layer and why http3 moved to quic over udp",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "DNS Resolution & Domain Routing",
    "subtopic": "DNS Resolution & Domain Routing Internals & Best Practices",
    "question": "Explain the foundational architecture and primary responsibilities of DNS Resolution & Domain Routing in Computer Networks. What core problems does it solve in modern software development?",
    "questionText": "Explain the foundational architecture and primary responsibilities of DNS Resolution & Domain Routing in Computer Networks. What core problems does it solve in modern software development?",
    "idealAnswer": "In Computer Networks, DNS Resolution & Domain Routing establishes the fundamental structural guarantees, resource lifecycles, and programming contracts required for reliable systems. It addresses core challenges around predictability, maintainability, and clean separation of concerns.",
    "referenceAnswer": "In Computer Networks, DNS Resolution & Domain Routing establishes the fundamental structural guarantees, resource lifecycles, and programming contracts required for reliable systems. It addresses core challenges around predictability, maintainability, and clean separation of concerns.",
    "keyPoints": [
      "Defines the role and primary responsibilities of DNS Resolution & Domain Routing in Computer Networks",
      "Articulates core system contracts, data guarantees, or lifecycle management",
      "Identifies standard design trade-offs and idiomatic conventions"
    ],
    "expectedKeyPoints": [
      "Defines the role and primary responsibilities of DNS Resolution & Domain Routing in Computer Networks",
      "Articulates core system contracts, data guarantees, or lifecycle management",
      "Identifies standard design trade-offs and idiomatic conventions"
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
      "computer_networks",
      "curated",
      "fallback",
      "dns",
      "computer networks"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain the foundational architecture and primary responsibilities of dns resolution domain routing in computer networks what core problems does it solve in modern software development",
    "normalizedText": "explain the foundational architecture and primary responsibilities of dns resolution domain routing in computer networks what core problems does it solve in modern software development",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
    "subtopic": "HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS Internals & Best Practices",
    "question": "How is HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS implemented internally in Computer Networks? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "questionText": "How is HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS implemented internally in Computer Networks? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "idealAnswer": "Internally, HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS in Computer Networks manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "referenceAnswer": "Internally, HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS in Computer Networks manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "keyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
    ],
    "expectedKeyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
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
      "computer_networks",
      "curated",
      "fallback",
      "http/1.1",
      "computer networks"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how is http11 vs http2 vs http3 httpstls implemented internally in computer networks discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "normalizedText": "how is http11 vs http2 vs http3 httpstls implemented internally in computer networks discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "IP Addressing, CIDR & Subnetting",
    "subtopic": "IP Addressing, CIDR & Subnetting Internals & Best Practices",
    "question": "How is IP Addressing, CIDR & Subnetting implemented internally in Computer Networks? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "questionText": "How is IP Addressing, CIDR & Subnetting implemented internally in Computer Networks? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "idealAnswer": "Internally, IP Addressing, CIDR & Subnetting in Computer Networks manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "referenceAnswer": "Internally, IP Addressing, CIDR & Subnetting in Computer Networks manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "keyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for IP Addressing, CIDR & Subnetting",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
    ],
    "expectedKeyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for IP Addressing, CIDR & Subnetting",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
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
      "computer_networks",
      "curated",
      "fallback",
      "ip",
      "computer networks"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how is ip addressing cidr subnetting implemented internally in computer networks discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "normalizedText": "how is ip addressing cidr subnetting implemented internally in computer networks discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "Cookies, Sessions, Caching & CDNs",
    "subtopic": "Cookies, Sessions, Caching & CDNs Internals & Best Practices",
    "question": "How is Cookies, Sessions, Caching & CDNs implemented internally in Computer Networks? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "questionText": "How is Cookies, Sessions, Caching & CDNs implemented internally in Computer Networks? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "idealAnswer": "Internally, Cookies, Sessions, Caching & CDNs in Computer Networks manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "referenceAnswer": "Internally, Cookies, Sessions, Caching & CDNs in Computer Networks manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "keyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for Cookies, Sessions, Caching & CDNs",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
    ],
    "expectedKeyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for Cookies, Sessions, Caching & CDNs",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
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
      "computer_networks",
      "curated",
      "fallback",
      "cookies,",
      "computer networks"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how is cookies sessions caching cdns implemented internally in computer networks discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "normalizedText": "how is cookies sessions caching cdns implemented internally in computer networks discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "WebSockets, Long Polling & WebRTC",
    "subtopic": "WebSockets, Long Polling & WebRTC Internals & Best Practices",
    "question": "How is WebSockets, Long Polling & WebRTC implemented internally in Computer Networks? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "questionText": "How is WebSockets, Long Polling & WebRTC implemented internally in Computer Networks? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "idealAnswer": "Internally, WebSockets, Long Polling & WebRTC in Computer Networks manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "referenceAnswer": "Internally, WebSockets, Long Polling & WebRTC in Computer Networks manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "keyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for WebSockets, Long Polling & WebRTC",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
    ],
    "expectedKeyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for WebSockets, Long Polling & WebRTC",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
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
      "computer_networks",
      "curated",
      "fallback",
      "websockets,",
      "computer networks"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how is websockets long polling webrtc implemented internally in computer networks discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "normalizedText": "how is websockets long polling webrtc implemented internally in computer networks discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "Load Balancers, Reverse Proxies & NAT",
    "subtopic": "Load Balancers, Reverse Proxies & NAT Internals & Best Practices",
    "question": "Suppose a mission-critical Computer Networks service encounters high latency and degraded throughput centered on Load Balancers, Reverse Proxies & NAT. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "questionText": "Suppose a mission-critical Computer Networks service encounters high latency and degraded throughput centered on Load Balancers, Reverse Proxies & NAT. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "idealAnswer": "Diagnosing bottlenecks in Computer Networks related to Load Balancers, Reverse Proxies & NAT requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "referenceAnswer": "Diagnosing bottlenecks in Computer Networks related to Load Balancers, Reverse Proxies & NAT requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "keyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Computer Networks",
      "Architectural optimizations targeting thread contention, memory fragmentation, or I/O bounds",
      "Verification strategy measuring P99 latency, SLA guarantees, and fault recovery"
    ],
    "expectedKeyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Computer Networks",
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
      "computer_networks",
      "curated",
      "fallback",
      "load",
      "computer networks"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "suppose a missioncritical computer networks service encounters high latency and degraded throughput centered on load balancers reverse proxies nat how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "normalizedText": "suppose a missioncritical computer networks service encounters high latency and degraded throughput centered on load balancers reverse proxies nat how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "OSI Model & TCP/IP Layer Architecture",
    "subtopic": "OSI Model & TCP/IP Layer Architecture Internals & Best Practices",
    "question": "Suppose a mission-critical Computer Networks service encounters high latency and degraded throughput centered on OSI Model & TCP/IP Layer Architecture. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "questionText": "Suppose a mission-critical Computer Networks service encounters high latency and degraded throughput centered on OSI Model & TCP/IP Layer Architecture. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "idealAnswer": "Diagnosing bottlenecks in Computer Networks related to OSI Model & TCP/IP Layer Architecture requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "referenceAnswer": "Diagnosing bottlenecks in Computer Networks related to OSI Model & TCP/IP Layer Architecture requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "keyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Computer Networks",
      "Architectural optimizations targeting thread contention, memory fragmentation, or I/O bounds",
      "Verification strategy measuring P99 latency, SLA guarantees, and fault recovery"
    ],
    "expectedKeyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Computer Networks",
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
      "mid",
      "senior"
    ],
    "experienceLevels": [
      "mid",
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
      "computer_networks",
      "curated",
      "fallback",
      "osi",
      "computer networks"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "suppose a missioncritical computer networks service encounters high latency and degraded throughput centered on osi model tcpip layer architecture how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "normalizedText": "suppose a missioncritical computer networks service encounters high latency and degraded throughput centered on osi model tcpip layer architecture how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "TCP vs UDP & 3-Way Handshake / Termination",
    "subtopic": "TCP vs UDP & 3-Way Handshake / Termination Internals & Best Practices",
    "question": "Suppose a mission-critical Computer Networks service encounters high latency and degraded throughput centered on TCP vs UDP & 3-Way Handshake / Termination. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "questionText": "Suppose a mission-critical Computer Networks service encounters high latency and degraded throughput centered on TCP vs UDP & 3-Way Handshake / Termination. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "idealAnswer": "Diagnosing bottlenecks in Computer Networks related to TCP vs UDP & 3-Way Handshake / Termination requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "referenceAnswer": "Diagnosing bottlenecks in Computer Networks related to TCP vs UDP & 3-Way Handshake / Termination requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "keyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Computer Networks",
      "Architectural optimizations targeting thread contention, memory fragmentation, or I/O bounds",
      "Verification strategy measuring P99 latency, SLA guarantees, and fault recovery"
    ],
    "expectedKeyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Computer Networks",
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
      "computer_networks",
      "curated",
      "fallback",
      "tcp",
      "computer networks"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "suppose a missioncritical computer networks service encounters high latency and degraded throughput centered on tcp vs udp 3way handshake termination how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "normalizedText": "suppose a missioncritical computer networks service encounters high latency and degraded throughput centered on tcp vs udp 3way handshake termination how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "OSI Model & TCP/IP Layer Architecture",
    "subtopic": "OSI Model & TCP/IP Layer Architecture",
    "question": "Design a high-resiliency workflow in Computer Networks for OSI Model & TCP/IP Layer Architecture. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Computer Networks for OSI Model & TCP/IP Layer Architecture. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient OSI Model & TCP/IP Layer Architecture workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient OSI Model & TCP/IP Layer Architecture workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "computer networks",
      "osi model  tcpip layer architecture",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in computer networks for osi model tcpip layer architecture how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in computer networks for osi model tcpip layer architecture how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "TCP vs UDP & 3-Way Handshake / Termination",
    "subtopic": "TCP vs UDP & 3-Way Handshake / Termination",
    "question": "In production Computer Networks architectures, explain how TCP vs UDP & 3-Way Handshake / Termination is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Computer Networks architectures, explain how TCP vs UDP & 3-Way Handshake / Termination is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Computer Networks, TCP vs UDP & 3-Way Handshake / Termination enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Computer Networks, TCP vs UDP & 3-Way Handshake / Termination enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for TCP vs UDP & 3-Way Handshake / Termination",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for TCP vs UDP & 3-Way Handshake / Termination",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark TCP vs UDP & 3-Way Handshake / Termination metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with TCP vs UDP & 3-Way Handshake / Termination?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark TCP vs UDP & 3-Way Handshake / Termination metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with TCP vs UDP & 3-Way Handshake / Termination?"
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
      "computer networks",
      "tcp vs udp  3way handshake  termination",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production computer networks architectures explain how tcp vs udp 3way handshake termination is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production computer networks architectures explain how tcp vs udp 3way handshake termination is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Computer Networks",
    "topic": "DNS Resolution & Domain Routing",
    "subtopic": "DNS Resolution & Domain Routing",
    "question": "Design a high-resiliency workflow in Computer Networks for DNS Resolution & Domain Routing. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Computer Networks for DNS Resolution & Domain Routing. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient DNS Resolution & Domain Routing workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient DNS Resolution & Domain Routing workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "mid",
      "senior"
    ],
    "experienceLevels": [
      "mid",
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
    "importance": 5,
    "tags": [
      "computer networks",
      "dns resolution  domain routing",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in computer networks for dns resolution domain routing how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in computer networks for dns resolution domain routing how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
    "subtopic": "HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
    "question": "In production Computer Networks architectures, explain how HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Computer Networks architectures, explain how HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Computer Networks, HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Computer Networks, HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS?"
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
      "computer networks",
      "http11 vs http2 vs http3  httpstls",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production computer networks architectures explain how http11 vs http2 vs http3 httpstls is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production computer networks architectures explain how http11 vs http2 vs http3 httpstls is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "IP Addressing, CIDR & Subnetting",
    "subtopic": "IP Addressing, CIDR & Subnetting",
    "question": "Design a high-resiliency workflow in Computer Networks for IP Addressing, CIDR & Subnetting. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Computer Networks for IP Addressing, CIDR & Subnetting. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient IP Addressing, CIDR & Subnetting workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient IP Addressing, CIDR & Subnetting workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
    "importance": 3,
    "tags": [
      "computer networks",
      "ip addressing cidr  subnetting",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in computer networks for ip addressing cidr subnetting how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in computer networks for ip addressing cidr subnetting how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Computer Networks",
    "topic": "Cookies, Sessions, Caching & CDNs",
    "subtopic": "Cookies, Sessions, Caching & CDNs",
    "question": "In production Computer Networks architectures, explain how Cookies, Sessions, Caching & CDNs is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Computer Networks architectures, explain how Cookies, Sessions, Caching & CDNs is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Computer Networks, Cookies, Sessions, Caching & CDNs enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Computer Networks, Cookies, Sessions, Caching & CDNs enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Cookies, Sessions, Caching & CDNs",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Cookies, Sessions, Caching & CDNs",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Cookies, Sessions, Caching & CDNs metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Cookies, Sessions, Caching & CDNs?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Cookies, Sessions, Caching & CDNs metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Cookies, Sessions, Caching & CDNs?"
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
      "computer networks",
      "cookies sessions caching  cdns",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production computer networks architectures explain how cookies sessions caching cdns is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production computer networks architectures explain how cookies sessions caching cdns is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "WebSockets, Long Polling & WebRTC",
    "subtopic": "WebSockets, Long Polling & WebRTC",
    "question": "Design a high-resiliency workflow in Computer Networks for WebSockets, Long Polling & WebRTC. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Computer Networks for WebSockets, Long Polling & WebRTC. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient WebSockets, Long Polling & WebRTC workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient WebSockets, Long Polling & WebRTC workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "computer networks",
      "websockets long polling  webrtc",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in computer networks for websockets long polling webrtc how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in computer networks for websockets long polling webrtc how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "Load Balancers, Reverse Proxies & NAT",
    "subtopic": "Load Balancers, Reverse Proxies & NAT",
    "question": "In production Computer Networks architectures, explain how Load Balancers, Reverse Proxies & NAT is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Computer Networks architectures, explain how Load Balancers, Reverse Proxies & NAT is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Computer Networks, Load Balancers, Reverse Proxies & NAT enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Computer Networks, Load Balancers, Reverse Proxies & NAT enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Load Balancers, Reverse Proxies & NAT",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Load Balancers, Reverse Proxies & NAT",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Load Balancers, Reverse Proxies & NAT metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Load Balancers, Reverse Proxies & NAT?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Load Balancers, Reverse Proxies & NAT metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Load Balancers, Reverse Proxies & NAT?"
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
      "computer networks",
      "load balancers reverse proxies  nat",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production computer networks architectures explain how load balancers reverse proxies nat is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production computer networks architectures explain how load balancers reverse proxies nat is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Computer Networks",
    "topic": "TCP vs UDP & 3-Way Handshake / Termination",
    "subtopic": "TCP vs UDP & 3-Way Handshake / Termination",
    "question": "Compare alternative design strategies for TCP vs UDP & 3-Way Handshake / Termination in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for TCP vs UDP & 3-Way Handshake / Termination in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for TCP vs UDP & 3-Way Handshake / Termination in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for TCP vs UDP & 3-Way Handshake / Termination in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for TCP vs UDP & 3-Way Handshake / Termination",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for TCP vs UDP & 3-Way Handshake / Termination",
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
      "computer networks",
      "tcp vs udp  3way handshake  termination",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for tcp vs udp 3way handshake termination in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for tcp vs udp 3way handshake termination in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Computer Networks",
    "topic": "DNS Resolution & Domain Routing",
    "subtopic": "DNS Resolution & Domain Routing",
    "question": "Debug this Computer Networks scenario regarding DNS Resolution & Domain Routing: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for DNS Resolution & Domain Routing\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Computer Networks scenario regarding DNS Resolution & Domain Routing: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for DNS Resolution & Domain Routing\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in DNS Resolution & Domain Routing. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in DNS Resolution & Domain Routing. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this DNS Resolution & Domain Routing bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this DNS Resolution & Domain Routing bug?",
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
      "computer networks",
      "dns resolution  domain routing",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this computer networks scenario regarding dns resolution domain routing a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for dns resolution domain routing service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this computer networks scenario regarding dns resolution domain routing a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for dns resolution domain routing service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
    "subtopic": "HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
    "question": "Compare alternative design strategies for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
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
      "computer networks",
      "http11 vs http2 vs http3  httpstls",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for http11 vs http2 vs http3 httpstls in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for http11 vs http2 vs http3 httpstls in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "IP Addressing, CIDR & Subnetting",
    "subtopic": "IP Addressing, CIDR & Subnetting",
    "question": "Debug this Computer Networks scenario regarding IP Addressing, CIDR & Subnetting: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for IP Addressing, CIDR & Subnetting\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Computer Networks scenario regarding IP Addressing, CIDR & Subnetting: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for IP Addressing, CIDR & Subnetting\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in IP Addressing, CIDR & Subnetting. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in IP Addressing, CIDR & Subnetting. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this IP Addressing, CIDR & Subnetting bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this IP Addressing, CIDR & Subnetting bug?",
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
      "computer networks",
      "ip addressing cidr  subnetting",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this computer networks scenario regarding ip addressing cidr subnetting a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for ip addressing cidr subnetting service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this computer networks scenario regarding ip addressing cidr subnetting a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for ip addressing cidr subnetting service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Computer Networks",
    "topic": "Cookies, Sessions, Caching & CDNs",
    "subtopic": "Cookies, Sessions, Caching & CDNs",
    "question": "Compare alternative design strategies for Cookies, Sessions, Caching & CDNs in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Cookies, Sessions, Caching & CDNs in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Cookies, Sessions, Caching & CDNs in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Cookies, Sessions, Caching & CDNs in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Cookies, Sessions, Caching & CDNs",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Cookies, Sessions, Caching & CDNs",
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
      "computer networks",
      "cookies sessions caching  cdns",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for cookies sessions caching cdns in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for cookies sessions caching cdns in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "WebSockets, Long Polling & WebRTC",
    "subtopic": "WebSockets, Long Polling & WebRTC",
    "question": "Debug this Computer Networks scenario regarding WebSockets, Long Polling & WebRTC: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for WebSockets, Long Polling & WebRTC\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Computer Networks scenario regarding WebSockets, Long Polling & WebRTC: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for WebSockets, Long Polling & WebRTC\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in WebSockets, Long Polling & WebRTC. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in WebSockets, Long Polling & WebRTC. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this WebSockets, Long Polling & WebRTC bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this WebSockets, Long Polling & WebRTC bug?",
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
      "computer networks",
      "websockets long polling  webrtc",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this computer networks scenario regarding websockets long polling webrtc a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for websockets long polling webrtc service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this computer networks scenario regarding websockets long polling webrtc a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for websockets long polling webrtc service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "Load Balancers, Reverse Proxies & NAT",
    "subtopic": "Load Balancers, Reverse Proxies & NAT",
    "question": "Compare alternative design strategies for Load Balancers, Reverse Proxies & NAT in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Load Balancers, Reverse Proxies & NAT in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Load Balancers, Reverse Proxies & NAT in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Load Balancers, Reverse Proxies & NAT in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Load Balancers, Reverse Proxies & NAT",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Load Balancers, Reverse Proxies & NAT",
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
      "computer networks",
      "load balancers reverse proxies  nat",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for load balancers reverse proxies nat in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for load balancers reverse proxies nat in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Computer Networks",
    "topic": "OSI Model & TCP/IP Layer Architecture",
    "subtopic": "OSI Model & TCP/IP Layer Architecture",
    "question": "Debug this Computer Networks scenario regarding OSI Model & TCP/IP Layer Architecture: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for OSI Model & TCP/IP Layer Architecture\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Computer Networks scenario regarding OSI Model & TCP/IP Layer Architecture: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for OSI Model & TCP/IP Layer Architecture\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in OSI Model & TCP/IP Layer Architecture. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in OSI Model & TCP/IP Layer Architecture. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this OSI Model & TCP/IP Layer Architecture bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this OSI Model & TCP/IP Layer Architecture bug?",
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
      "computer networks",
      "osi model  tcpip layer architecture",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this computer networks scenario regarding osi model tcpip layer architecture a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for osi model tcpip layer architecture service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this computer networks scenario regarding osi model tcpip layer architecture a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for osi model tcpip layer architecture service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "DNS Resolution & Domain Routing",
    "subtopic": "DNS Resolution & Domain Routing",
    "question": "In production Computer Networks architectures, explain how DNS Resolution & Domain Routing is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Computer Networks architectures, explain how DNS Resolution & Domain Routing is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Computer Networks, DNS Resolution & Domain Routing enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Computer Networks, DNS Resolution & Domain Routing enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for DNS Resolution & Domain Routing",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for DNS Resolution & Domain Routing",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark DNS Resolution & Domain Routing metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with DNS Resolution & Domain Routing?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark DNS Resolution & Domain Routing metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with DNS Resolution & Domain Routing?"
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
    "importance": 5,
    "tags": [
      "computer networks",
      "dns resolution  domain routing",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production computer networks architectures explain how dns resolution domain routing is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production computer networks architectures explain how dns resolution domain routing is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
    "subtopic": "HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
    "question": "Design a high-resiliency workflow in Computer Networks for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Computer Networks for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "computer networks",
      "http11 vs http2 vs http3  httpstls",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in computer networks for http11 vs http2 vs http3 httpstls how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in computer networks for http11 vs http2 vs http3 httpstls how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "IP Addressing, CIDR & Subnetting",
    "subtopic": "IP Addressing, CIDR & Subnetting",
    "question": "In production Computer Networks architectures, explain how IP Addressing, CIDR & Subnetting is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Computer Networks architectures, explain how IP Addressing, CIDR & Subnetting is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Computer Networks, IP Addressing, CIDR & Subnetting enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Computer Networks, IP Addressing, CIDR & Subnetting enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for IP Addressing, CIDR & Subnetting",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for IP Addressing, CIDR & Subnetting",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark IP Addressing, CIDR & Subnetting metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with IP Addressing, CIDR & Subnetting?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark IP Addressing, CIDR & Subnetting metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with IP Addressing, CIDR & Subnetting?"
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
    "importance": 3,
    "tags": [
      "computer networks",
      "ip addressing cidr  subnetting",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production computer networks architectures explain how ip addressing cidr subnetting is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production computer networks architectures explain how ip addressing cidr subnetting is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Computer Networks",
    "topic": "Cookies, Sessions, Caching & CDNs",
    "subtopic": "Cookies, Sessions, Caching & CDNs",
    "question": "Design a high-resiliency workflow in Computer Networks for Cookies, Sessions, Caching & CDNs. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Computer Networks for Cookies, Sessions, Caching & CDNs. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Cookies, Sessions, Caching & CDNs workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Cookies, Sessions, Caching & CDNs workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
    "importance": 5,
    "tags": [
      "computer networks",
      "cookies sessions caching  cdns",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in computer networks for cookies sessions caching cdns how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in computer networks for cookies sessions caching cdns how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "WebSockets, Long Polling & WebRTC",
    "subtopic": "WebSockets, Long Polling & WebRTC",
    "question": "In production Computer Networks architectures, explain how WebSockets, Long Polling & WebRTC is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Computer Networks architectures, explain how WebSockets, Long Polling & WebRTC is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Computer Networks, WebSockets, Long Polling & WebRTC enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Computer Networks, WebSockets, Long Polling & WebRTC enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for WebSockets, Long Polling & WebRTC",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for WebSockets, Long Polling & WebRTC",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark WebSockets, Long Polling & WebRTC metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with WebSockets, Long Polling & WebRTC?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark WebSockets, Long Polling & WebRTC metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with WebSockets, Long Polling & WebRTC?"
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
      "computer networks",
      "websockets long polling  webrtc",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production computer networks architectures explain how websockets long polling webrtc is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production computer networks architectures explain how websockets long polling webrtc is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "Load Balancers, Reverse Proxies & NAT",
    "subtopic": "Load Balancers, Reverse Proxies & NAT",
    "question": "Design a high-resiliency workflow in Computer Networks for Load Balancers, Reverse Proxies & NAT. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Computer Networks for Load Balancers, Reverse Proxies & NAT. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Load Balancers, Reverse Proxies & NAT workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Load Balancers, Reverse Proxies & NAT workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
    "importance": 3,
    "tags": [
      "computer networks",
      "load balancers reverse proxies  nat",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in computer networks for load balancers reverse proxies nat how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in computer networks for load balancers reverse proxies nat how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Computer Networks",
    "topic": "OSI Model & TCP/IP Layer Architecture",
    "subtopic": "OSI Model & TCP/IP Layer Architecture",
    "question": "In production Computer Networks architectures, explain how OSI Model & TCP/IP Layer Architecture is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Computer Networks architectures, explain how OSI Model & TCP/IP Layer Architecture is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Computer Networks, OSI Model & TCP/IP Layer Architecture enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Computer Networks, OSI Model & TCP/IP Layer Architecture enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for OSI Model & TCP/IP Layer Architecture",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for OSI Model & TCP/IP Layer Architecture",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark OSI Model & TCP/IP Layer Architecture metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with OSI Model & TCP/IP Layer Architecture?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark OSI Model & TCP/IP Layer Architecture metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with OSI Model & TCP/IP Layer Architecture?"
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
    "importance": 5,
    "tags": [
      "computer networks",
      "osi model  tcpip layer architecture",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production computer networks architectures explain how osi model tcpip layer architecture is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production computer networks architectures explain how osi model tcpip layer architecture is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "TCP vs UDP & 3-Way Handshake / Termination",
    "subtopic": "TCP vs UDP & 3-Way Handshake / Termination",
    "question": "Design a high-resiliency workflow in Computer Networks for TCP vs UDP & 3-Way Handshake / Termination. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Computer Networks for TCP vs UDP & 3-Way Handshake / Termination. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient TCP vs UDP & 3-Way Handshake / Termination workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient TCP vs UDP & 3-Way Handshake / Termination workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "computer networks",
      "tcp vs udp  3way handshake  termination",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in computer networks for tcp vs udp 3way handshake termination how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in computer networks for tcp vs udp 3way handshake termination how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
    "subtopic": "HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS",
    "question": "Debug this Computer Networks scenario regarding HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Computer Networks scenario regarding HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this HTTP/1.1 vs HTTP/2 vs HTTP/3 & HTTPS/TLS bug?",
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
      "computer networks",
      "http11 vs http2 vs http3  httpstls",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this computer networks scenario regarding http11 vs http2 vs http3 httpstls a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for http11 vs http2 vs http3 httpstls service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this computer networks scenario regarding http11 vs http2 vs http3 httpstls a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for http11 vs http2 vs http3 httpstls service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "IP Addressing, CIDR & Subnetting",
    "subtopic": "IP Addressing, CIDR & Subnetting",
    "question": "Compare alternative design strategies for IP Addressing, CIDR & Subnetting in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for IP Addressing, CIDR & Subnetting in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for IP Addressing, CIDR & Subnetting in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for IP Addressing, CIDR & Subnetting in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for IP Addressing, CIDR & Subnetting",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for IP Addressing, CIDR & Subnetting",
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
      "computer networks",
      "ip addressing cidr  subnetting",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for ip addressing cidr subnetting in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for ip addressing cidr subnetting in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Computer Networks",
    "topic": "Cookies, Sessions, Caching & CDNs",
    "subtopic": "Cookies, Sessions, Caching & CDNs",
    "question": "Debug this Computer Networks scenario regarding Cookies, Sessions, Caching & CDNs: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for Cookies, Sessions, Caching & CDNs\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Computer Networks scenario regarding Cookies, Sessions, Caching & CDNs: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for Cookies, Sessions, Caching & CDNs\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Cookies, Sessions, Caching & CDNs. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Cookies, Sessions, Caching & CDNs. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Cookies, Sessions, Caching & CDNs bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Cookies, Sessions, Caching & CDNs bug?",
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
      "computer networks",
      "cookies sessions caching  cdns",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this computer networks scenario regarding cookies sessions caching cdns a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for cookies sessions caching cdns service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this computer networks scenario regarding cookies sessions caching cdns a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for cookies sessions caching cdns service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "WebSockets, Long Polling & WebRTC",
    "subtopic": "WebSockets, Long Polling & WebRTC",
    "question": "Compare alternative design strategies for WebSockets, Long Polling & WebRTC in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for WebSockets, Long Polling & WebRTC in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for WebSockets, Long Polling & WebRTC in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for WebSockets, Long Polling & WebRTC in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for WebSockets, Long Polling & WebRTC",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for WebSockets, Long Polling & WebRTC",
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
      "computer networks",
      "websockets long polling  webrtc",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for websockets long polling webrtc in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for websockets long polling webrtc in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "Load Balancers, Reverse Proxies & NAT",
    "subtopic": "Load Balancers, Reverse Proxies & NAT",
    "question": "Debug this Computer Networks scenario regarding Load Balancers, Reverse Proxies & NAT: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for Load Balancers, Reverse Proxies & NAT\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Computer Networks scenario regarding Load Balancers, Reverse Proxies & NAT: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for Load Balancers, Reverse Proxies & NAT\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Load Balancers, Reverse Proxies & NAT. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Load Balancers, Reverse Proxies & NAT. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Load Balancers, Reverse Proxies & NAT bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Load Balancers, Reverse Proxies & NAT bug?",
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
      "computer networks",
      "load balancers reverse proxies  nat",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this computer networks scenario regarding load balancers reverse proxies nat a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for load balancers reverse proxies nat service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this computer networks scenario regarding load balancers reverse proxies nat a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for load balancers reverse proxies nat service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Computer Networks",
    "topic": "OSI Model & TCP/IP Layer Architecture",
    "subtopic": "OSI Model & TCP/IP Layer Architecture",
    "question": "Compare alternative design strategies for OSI Model & TCP/IP Layer Architecture in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for OSI Model & TCP/IP Layer Architecture in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for OSI Model & TCP/IP Layer Architecture in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for OSI Model & TCP/IP Layer Architecture in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for OSI Model & TCP/IP Layer Architecture",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for OSI Model & TCP/IP Layer Architecture",
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
      "computer networks",
      "osi model  tcpip layer architecture",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for osi model tcpip layer architecture in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for osi model tcpip layer architecture in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "TCP vs UDP & 3-Way Handshake / Termination",
    "subtopic": "TCP vs UDP & 3-Way Handshake / Termination",
    "question": "Debug this Computer Networks scenario regarding TCP vs UDP & 3-Way Handshake / Termination: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for TCP vs UDP & 3-Way Handshake / Termination\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Computer Networks scenario regarding TCP vs UDP & 3-Way Handshake / Termination: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Computer Networks config for TCP vs UDP & 3-Way Handshake / Termination\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in TCP vs UDP & 3-Way Handshake / Termination. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in TCP vs UDP & 3-Way Handshake / Termination. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this TCP vs UDP & 3-Way Handshake / Termination bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this TCP vs UDP & 3-Way Handshake / Termination bug?",
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
      "computer networks",
      "tcp vs udp  3way handshake  termination",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this computer networks scenario regarding tcp vs udp 3way handshake termination a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for tcp vs udp 3way handshake termination service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this computer networks scenario regarding tcp vs udp 3way handshake termination a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic computer networks config for tcp vs udp 3way handshake termination service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Computer Networks",
    "topic": "DNS Resolution & Domain Routing",
    "subtopic": "DNS Resolution & Domain Routing",
    "question": "Compare alternative design strategies for DNS Resolution & Domain Routing in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for DNS Resolution & Domain Routing in Computer Networks. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for DNS Resolution & Domain Routing in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for DNS Resolution & Domain Routing in Computer Networks, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for DNS Resolution & Domain Routing",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for DNS Resolution & Domain Routing",
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
      "computer networks",
      "dns resolution  domain routing",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for dns resolution domain routing in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for dns resolution domain routing in computer networks under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  }
];

export default COMPUTER_NETWORKS_QUESTIONS;
