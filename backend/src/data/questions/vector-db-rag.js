/**
 * Curated High-Value Questions for Vector DB & RAG
 * Total Questions: 35
 */

export const VECTOR_DB_RAG_QUESTIONS = [
  {
    "category": "Vector DB & RAG",
    "topic": "RAG Architecture & End-to-End Pipeline Workflow",
    "subtopic": "Chunking, Vector Search & Re-Ranking",
    "question": "Explain the end-to-end architecture of a Retrieval-Augmented Generation (RAG) system. How do chunking strategies, dense embeddings, and cross-encoder re-rankers improve response quality?",
    "questionText": "Explain the end-to-end architecture of a Retrieval-Augmented Generation (RAG) system. How do chunking strategies, dense embeddings, and cross-encoder re-rankers improve response quality?",
    "idealAnswer": "A RAG system augments LLMs with external proprietary knowledge: 1. Ingestion: Documents are segmented into semantically coherent chunks with overlap (e.g. 500 tokens with 50-token overlap) and transformed into dense vector embeddings using models like OpenAI text-embedding-3 or BGE. 2. Indexing: Stored in a vector database (Pinecone, Weaviate, Milvus) using HNSW (Hierarchical Navigable Small World) indexing. 3. Retrieval: Query embedding is matched against document vectors using cosine similarity or hybrid search (combining dense vectors + BM25 keyword search). 4. Re-ranking: A cross-encoder model scores top-K retrieved chunks to filter out noise. 5. Generation: Re-ranked top chunks are injected into the LLM system prompt as grounded context for synthesized, citation-backed answers.",
    "referenceAnswer": "A RAG system augments LLMs with external proprietary knowledge: 1. Ingestion: Documents are segmented into semantically coherent chunks with overlap (e.g. 500 tokens with 50-token overlap) and transformed into dense vector embeddings using models like OpenAI text-embedding-3 or BGE. 2. Indexing: Stored in a vector database (Pinecone, Weaviate, Milvus) using HNSW (Hierarchical Navigable Small World) indexing. 3. Retrieval: Query embedding is matched against document vectors using cosine similarity or hybrid search (combining dense vectors + BM25 keyword search). 4. Re-ranking: A cross-encoder model scores top-K retrieved chunks to filter out noise. 5. Generation: Re-ranked top chunks are injected into the LLM system prompt as grounded context for synthesized, citation-backed answers.",
    "keyPoints": [
      "Pipeline stages: Ingestion -> Chunking -> Vector Embedding -> Vector Indexing -> Retrieval -> Re-ranking -> LLM Generation",
      "Chunk size and overlap balance context granularity against lost cross-chunk relationships",
      "Hybrid search (BM25 + Dense) with Cross-Encoder re-ranking drastically cuts retrieval noise and hallucination"
    ],
    "expectedKeyPoints": [
      "Pipeline stages: Ingestion -> Chunking -> Vector Embedding -> Vector Indexing -> Retrieval -> Re-ranking -> LLM Generation",
      "Chunk size and overlap balance context granularity against lost cross-chunk relationships",
      "Hybrid search (BM25 + Dense) with Cross-Encoder re-ranking drastically cuts retrieval noise and hallucination"
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
      "ai",
      "rag",
      "vector-db",
      "embeddings",
      "llm",
      "vector db & rag"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain the endtoend architecture of a retrievalaugmented generation rag system how do chunking strategies dense embeddings and crossencoder rerankers improve response quality",
    "normalizedText": "explain the endtoend architecture of a retrievalaugmented generation rag system how do chunking strategies dense embeddings and crossencoder rerankers improve response quality",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Document Ingestion, Chunking Strategies & Overlap",
    "subtopic": "Document Ingestion, Chunking Strategies & Overlap Internals & Best Practices",
    "question": "Explain the foundational architecture and primary responsibilities of Document Ingestion, Chunking Strategies & Overlap in Vector DB & RAG. What core problems does it solve in modern software development?",
    "questionText": "Explain the foundational architecture and primary responsibilities of Document Ingestion, Chunking Strategies & Overlap in Vector DB & RAG. What core problems does it solve in modern software development?",
    "idealAnswer": "In Vector DB & RAG, Document Ingestion, Chunking Strategies & Overlap establishes the fundamental structural guarantees, resource lifecycles, and programming contracts required for reliable systems. It addresses core challenges around predictability, maintainability, and clean separation of concerns.",
    "referenceAnswer": "In Vector DB & RAG, Document Ingestion, Chunking Strategies & Overlap establishes the fundamental structural guarantees, resource lifecycles, and programming contracts required for reliable systems. It addresses core challenges around predictability, maintainability, and clean separation of concerns.",
    "keyPoints": [
      "Defines the role and primary responsibilities of Document Ingestion, Chunking Strategies & Overlap in Vector DB & RAG",
      "Articulates core system contracts, data guarantees, or lifecycle management",
      "Identifies standard design trade-offs and idiomatic conventions"
    ],
    "expectedKeyPoints": [
      "Defines the role and primary responsibilities of Document Ingestion, Chunking Strategies & Overlap in Vector DB & RAG",
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
      "vector_db_rag",
      "curated",
      "fallback",
      "document",
      "vector db & rag"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain the foundational architecture and primary responsibilities of document ingestion chunking strategies overlap in vector db rag what core problems does it solve in modern software development",
    "normalizedText": "explain the foundational architecture and primary responsibilities of document ingestion chunking strategies overlap in vector db rag what core problems does it solve in modern software development",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)",
    "subtopic": "Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) Internals & Best Practices",
    "question": "Explain the foundational architecture and primary responsibilities of Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) in Vector DB & RAG. What core problems does it solve in modern software development?",
    "questionText": "Explain the foundational architecture and primary responsibilities of Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) in Vector DB & RAG. What core problems does it solve in modern software development?",
    "idealAnswer": "In Vector DB & RAG, Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) establishes the fundamental structural guarantees, resource lifecycles, and programming contracts required for reliable systems. It addresses core challenges around predictability, maintainability, and clean separation of concerns.",
    "referenceAnswer": "In Vector DB & RAG, Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) establishes the fundamental structural guarantees, resource lifecycles, and programming contracts required for reliable systems. It addresses core challenges around predictability, maintainability, and clean separation of concerns.",
    "keyPoints": [
      "Defines the role and primary responsibilities of Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) in Vector DB & RAG",
      "Articulates core system contracts, data guarantees, or lifecycle management",
      "Identifies standard design trade-offs and idiomatic conventions"
    ],
    "expectedKeyPoints": [
      "Defines the role and primary responsibilities of Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) in Vector DB & RAG",
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
      "vector_db_rag",
      "curated",
      "fallback",
      "vector",
      "vector db & rag"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "explain the foundational architecture and primary responsibilities of vector search algorithms hnsw ivf ann vs exact knn in vector db rag what core problems does it solve in modern software development",
    "normalizedText": "explain the foundational architecture and primary responsibilities of vector search algorithms hnsw ivf ann vs exact knn in vector db rag what core problems does it solve in modern software development",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
    "subtopic": "Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) Internals & Best Practices",
    "question": "How is Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) implemented internally in Vector DB & RAG? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "questionText": "How is Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) implemented internally in Vector DB & RAG? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "idealAnswer": "Internally, Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) in Vector DB & RAG manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "referenceAnswer": "Internally, Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) in Vector DB & RAG manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "keyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
    ],
    "expectedKeyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
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
      "vector_db_rag",
      "curated",
      "fallback",
      "vector",
      "vector db & rag"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how is vector databases pinecone weaviate milvus chroma qdrant implemented internally in vector db rag discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "normalizedText": "how is vector databases pinecone weaviate milvus chroma qdrant implemented internally in vector db rag discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Hybrid Search (Sparse BM25 + Dense Semantic Vector)",
    "subtopic": "Hybrid Search (Sparse BM25 + Dense Semantic Vector) Internals & Best Practices",
    "question": "How is Hybrid Search (Sparse BM25 + Dense Semantic Vector) implemented internally in Vector DB & RAG? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "questionText": "How is Hybrid Search (Sparse BM25 + Dense Semantic Vector) implemented internally in Vector DB & RAG? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "idealAnswer": "Internally, Hybrid Search (Sparse BM25 + Dense Semantic Vector) in Vector DB & RAG manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "referenceAnswer": "Internally, Hybrid Search (Sparse BM25 + Dense Semantic Vector) in Vector DB & RAG manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "keyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for Hybrid Search (Sparse BM25 + Dense Semantic Vector)",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
    ],
    "expectedKeyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for Hybrid Search (Sparse BM25 + Dense Semantic Vector)",
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
      "vector_db_rag",
      "curated",
      "fallback",
      "hybrid",
      "vector db & rag"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how is hybrid search sparse bm25 dense semantic vector implemented internally in vector db rag discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "normalizedText": "how is hybrid search sparse bm25 dense semantic vector implemented internally in vector db rag discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Re-ranking Techniques & Cross-Encoders",
    "subtopic": "Re-ranking Techniques & Cross-Encoders Internals & Best Practices",
    "question": "How is Re-ranking Techniques & Cross-Encoders implemented internally in Vector DB & RAG? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "questionText": "How is Re-ranking Techniques & Cross-Encoders implemented internally in Vector DB & RAG? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "idealAnswer": "Internally, Re-ranking Techniques & Cross-Encoders in Vector DB & RAG manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "referenceAnswer": "Internally, Re-ranking Techniques & Cross-Encoders in Vector DB & RAG manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "keyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for Re-ranking Techniques & Cross-Encoders",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
    ],
    "expectedKeyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for Re-ranking Techniques & Cross-Encoders",
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
      "vector_db_rag",
      "curated",
      "fallback",
      "re-ranking",
      "vector db & rag"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how is reranking techniques crossencoders implemented internally in vector db rag discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "normalizedText": "how is reranking techniques crossencoders implemented internally in vector db rag discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Query Expansion, Multi-Query & Contextual Compression",
    "subtopic": "Query Expansion, Multi-Query & Contextual Compression Internals & Best Practices",
    "question": "How is Query Expansion, Multi-Query & Contextual Compression implemented internally in Vector DB & RAG? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "questionText": "How is Query Expansion, Multi-Query & Contextual Compression implemented internally in Vector DB & RAG? Discuss internal state transitions, runtime performance characteristics, and common edge cases encountered in production.",
    "idealAnswer": "Internally, Query Expansion, Multi-Query & Contextual Compression in Vector DB & RAG manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "referenceAnswer": "Internally, Query Expansion, Multi-Query & Contextual Compression in Vector DB & RAG manages state transitions and resource allocations through deterministic algorithmic invariants. Key considerations include asymptotic time and memory bounds, cache locality, and failure boundary isolation under high operational load.",
    "keyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for Query Expansion, Multi-Query & Contextual Compression",
      "Analyzes time and space complexity, memory footprints, and latency profiles",
      "Outlines defensive error handling and recovery mechanisms for production edge cases"
    ],
    "expectedKeyPoints": [
      "Explains internal mechanics, state models, or algorithmic invariants for Query Expansion, Multi-Query & Contextual Compression",
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
      "vector_db_rag",
      "curated",
      "fallback",
      "query",
      "vector db & rag"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "how is query expansion multiquery contextual compression implemented internally in vector db rag discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "normalizedText": "how is query expansion multiquery contextual compression implemented internally in vector db rag discuss internal state transitions runtime performance characteristics and common edge cases encountered in production",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance",
    "subtopic": "RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance Internals & Best Practices",
    "question": "Suppose a mission-critical Vector DB & RAG service encounters high latency and degraded throughput centered on RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "questionText": "Suppose a mission-critical Vector DB & RAG service encounters high latency and degraded throughput centered on RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "idealAnswer": "Diagnosing bottlenecks in Vector DB & RAG related to RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "referenceAnswer": "Diagnosing bottlenecks in Vector DB & RAG related to RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "keyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Vector DB & RAG",
      "Architectural optimizations targeting thread contention, memory fragmentation, or I/O bounds",
      "Verification strategy measuring P99 latency, SLA guarantees, and fault recovery"
    ],
    "expectedKeyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Vector DB & RAG",
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
      "vector_db_rag",
      "curated",
      "fallback",
      "rag",
      "vector db & rag"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "suppose a missioncritical vector db rag service encounters high latency and degraded throughput centered on rag triad evaluation context relevance groundedness answer relevance how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "normalizedText": "suppose a missioncritical vector db rag service encounters high latency and degraded throughput centered on rag triad evaluation context relevance groundedness answer relevance how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "RAG Architecture & End-to-End Pipeline Workflow",
    "subtopic": "RAG Architecture & End-to-End Pipeline Workflow Internals & Best Practices",
    "question": "Suppose a mission-critical Vector DB & RAG service encounters high latency and degraded throughput centered on RAG Architecture & End-to-End Pipeline Workflow. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "questionText": "Suppose a mission-critical Vector DB & RAG service encounters high latency and degraded throughput centered on RAG Architecture & End-to-End Pipeline Workflow. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "idealAnswer": "Diagnosing bottlenecks in Vector DB & RAG related to RAG Architecture & End-to-End Pipeline Workflow requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "referenceAnswer": "Diagnosing bottlenecks in Vector DB & RAG related to RAG Architecture & End-to-End Pipeline Workflow requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "keyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Vector DB & RAG",
      "Architectural optimizations targeting thread contention, memory fragmentation, or I/O bounds",
      "Verification strategy measuring P99 latency, SLA guarantees, and fault recovery"
    ],
    "expectedKeyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Vector DB & RAG",
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
      "vector_db_rag",
      "curated",
      "fallback",
      "rag",
      "vector db & rag"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "suppose a missioncritical vector db rag service encounters high latency and degraded throughput centered on rag architecture endtoend pipeline workflow how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "normalizedText": "suppose a missioncritical vector db rag service encounters high latency and degraded throughput centered on rag architecture endtoend pipeline workflow how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Document Ingestion, Chunking Strategies & Overlap",
    "subtopic": "Document Ingestion, Chunking Strategies & Overlap Internals & Best Practices",
    "question": "Suppose a mission-critical Vector DB & RAG service encounters high latency and degraded throughput centered on Document Ingestion, Chunking Strategies & Overlap. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "questionText": "Suppose a mission-critical Vector DB & RAG service encounters high latency and degraded throughput centered on Document Ingestion, Chunking Strategies & Overlap. How would you diagnose, profile, and optimize the architecture to sustain high availability and scale?",
    "idealAnswer": "Diagnosing bottlenecks in Vector DB & RAG related to Document Ingestion, Chunking Strategies & Overlap requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "referenceAnswer": "Diagnosing bottlenecks in Vector DB & RAG related to Document Ingestion, Chunking Strategies & Overlap requires telemetry analysis across CPU utilization, memory pressure, and I/O wait times. Architecture remediation involves partitioning state, optimizing data structures, introducing non-blocking synchronization or caching tiers, and enforcing strict latency SLAs.",
    "keyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Vector DB & RAG",
      "Architectural optimizations targeting thread contention, memory fragmentation, or I/O bounds",
      "Verification strategy measuring P99 latency, SLA guarantees, and fault recovery"
    ],
    "expectedKeyPoints": [
      "Systematic diagnostic approach using telemetry, metrics, and profiling tools for Vector DB & RAG",
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
      "vector_db_rag",
      "curated",
      "fallback",
      "document",
      "vector db & rag"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "suppose a missioncritical vector db rag service encounters high latency and degraded throughput centered on document ingestion chunking strategies overlap how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "normalizedText": "suppose a missioncritical vector db rag service encounters high latency and degraded throughput centered on document ingestion chunking strategies overlap how would you diagnose profile and optimize the architecture to sustain high availability and scale",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "RAG Architecture & End-to-End Pipeline Workflow",
    "subtopic": "RAG Architecture & End-to-End Pipeline Workflow",
    "question": "Design a high-resiliency workflow in Vector Databases & RAG for RAG Architecture & End-to-End Pipeline Workflow. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Vector Databases & RAG for RAG Architecture & End-to-End Pipeline Workflow. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient RAG Architecture & End-to-End Pipeline Workflow workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient RAG Architecture & End-to-End Pipeline Workflow workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "vector db & rag",
      "rag architecture  endtoend pipeline workflow",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in vector databases rag for rag architecture endtoend pipeline workflow how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in vector databases rag for rag architecture endtoend pipeline workflow how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Document Ingestion, Chunking Strategies & Overlap",
    "subtopic": "Document Ingestion, Chunking Strategies & Overlap",
    "question": "In production Vector Databases & RAG architectures, explain how Document Ingestion, Chunking Strategies & Overlap is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Vector Databases & RAG architectures, explain how Document Ingestion, Chunking Strategies & Overlap is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Vector Databases & RAG, Document Ingestion, Chunking Strategies & Overlap enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Vector Databases & RAG, Document Ingestion, Chunking Strategies & Overlap enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Document Ingestion, Chunking Strategies & Overlap",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Document Ingestion, Chunking Strategies & Overlap",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Document Ingestion, Chunking Strategies & Overlap metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Document Ingestion, Chunking Strategies & Overlap?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Document Ingestion, Chunking Strategies & Overlap metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Document Ingestion, Chunking Strategies & Overlap?"
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
      "vector db & rag",
      "document ingestion chunking strategies  overlap",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production vector databases rag architectures explain how document ingestion chunking strategies overlap is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production vector databases rag architectures explain how document ingestion chunking strategies overlap is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)",
    "subtopic": "Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)",
    "question": "Design a high-resiliency workflow in Vector Databases & RAG for Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN). How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Vector Databases & RAG for Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN). How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "vector db & rag",
      "vector search algorithms hnsw ivf ann vs exact knn",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in vector databases rag for vector search algorithms hnsw ivf ann vs exact knn how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in vector databases rag for vector search algorithms hnsw ivf ann vs exact knn how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
    "subtopic": "Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
    "question": "In production Vector Databases & RAG architectures, explain how Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Vector Databases & RAG architectures, explain how Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Vector Databases & RAG, Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Vector Databases & RAG, Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)?"
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
      "vector db & rag",
      "vector databases pinecone weaviate milvus chroma qdrant",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production vector databases rag architectures explain how vector databases pinecone weaviate milvus chroma qdrant is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production vector databases rag architectures explain how vector databases pinecone weaviate milvus chroma qdrant is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Hybrid Search (Sparse BM25 + Dense Semantic Vector)",
    "subtopic": "Hybrid Search (Sparse BM25 + Dense Semantic Vector)",
    "question": "Design a high-resiliency workflow in Vector Databases & RAG for Hybrid Search (Sparse BM25 + Dense Semantic Vector). How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Vector Databases & RAG for Hybrid Search (Sparse BM25 + Dense Semantic Vector). How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Hybrid Search (Sparse BM25 + Dense Semantic Vector) workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Hybrid Search (Sparse BM25 + Dense Semantic Vector) workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "vector db & rag",
      "hybrid search sparse bm25  dense semantic vector",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in vector databases rag for hybrid search sparse bm25 dense semantic vector how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in vector databases rag for hybrid search sparse bm25 dense semantic vector how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Re-ranking Techniques & Cross-Encoders",
    "subtopic": "Re-ranking Techniques & Cross-Encoders",
    "question": "In production Vector Databases & RAG architectures, explain how Re-ranking Techniques & Cross-Encoders is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Vector Databases & RAG architectures, explain how Re-ranking Techniques & Cross-Encoders is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Vector Databases & RAG, Re-ranking Techniques & Cross-Encoders enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Vector Databases & RAG, Re-ranking Techniques & Cross-Encoders enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Re-ranking Techniques & Cross-Encoders",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Re-ranking Techniques & Cross-Encoders",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Re-ranking Techniques & Cross-Encoders metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Re-ranking Techniques & Cross-Encoders?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Re-ranking Techniques & Cross-Encoders metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Re-ranking Techniques & Cross-Encoders?"
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
      "vector db & rag",
      "reranking techniques  crossencoders",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production vector databases rag architectures explain how reranking techniques crossencoders is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production vector databases rag architectures explain how reranking techniques crossencoders is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Query Expansion, Multi-Query & Contextual Compression",
    "subtopic": "Query Expansion, Multi-Query & Contextual Compression",
    "question": "Design a high-resiliency workflow in Vector Databases & RAG for Query Expansion, Multi-Query & Contextual Compression. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Vector Databases & RAG for Query Expansion, Multi-Query & Contextual Compression. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Query Expansion, Multi-Query & Contextual Compression workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Query Expansion, Multi-Query & Contextual Compression workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "vector db & rag",
      "query expansion multiquery  contextual compression",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in vector databases rag for query expansion multiquery contextual compression how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in vector databases rag for query expansion multiquery contextual compression how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance",
    "subtopic": "RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance",
    "question": "In production Vector Databases & RAG architectures, explain how RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Vector Databases & RAG architectures, explain how RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Vector Databases & RAG, RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Vector Databases & RAG, RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance?"
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
      "vector db & rag",
      "rag triad evaluation context relevance groundedness answer relevance",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production vector databases rag architectures explain how rag triad evaluation context relevance groundedness answer relevance is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production vector databases rag architectures explain how rag triad evaluation context relevance groundedness answer relevance is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Document Ingestion, Chunking Strategies & Overlap",
    "subtopic": "Document Ingestion, Chunking Strategies & Overlap",
    "question": "Compare alternative design strategies for Document Ingestion, Chunking Strategies & Overlap in Vector Databases & RAG. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Document Ingestion, Chunking Strategies & Overlap in Vector Databases & RAG. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Document Ingestion, Chunking Strategies & Overlap in Vector Databases & RAG, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Document Ingestion, Chunking Strategies & Overlap in Vector Databases & RAG, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Document Ingestion, Chunking Strategies & Overlap",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Document Ingestion, Chunking Strategies & Overlap",
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
      "vector db & rag",
      "document ingestion chunking strategies  overlap",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for document ingestion chunking strategies overlap in vector databases rag under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for document ingestion chunking strategies overlap in vector databases rag under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)",
    "subtopic": "Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)",
    "question": "Debug this Vector Databases & RAG scenario regarding Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN): A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Vector Databases & RAG config for Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Vector Databases & RAG scenario regarding Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN): A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Vector Databases & RAG config for Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN). In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN). In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) bug?",
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
      "vector db & rag",
      "vector search algorithms hnsw ivf ann vs exact knn",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this vector databases rag scenario regarding vector search algorithms hnsw ivf ann vs exact knn a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic vector databases rag config for vector search algorithms hnsw ivf ann vs exact knn service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this vector databases rag scenario regarding vector search algorithms hnsw ivf ann vs exact knn a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic vector databases rag config for vector search algorithms hnsw ivf ann vs exact knn service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
    "subtopic": "Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
    "question": "Compare alternative design strategies for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) in Vector Databases & RAG. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) in Vector Databases & RAG. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) in Vector Databases & RAG, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) in Vector Databases & RAG, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
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
      "vector db & rag",
      "vector databases pinecone weaviate milvus chroma qdrant",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for vector databases pinecone weaviate milvus chroma qdrant in vector databases rag under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for vector databases pinecone weaviate milvus chroma qdrant in vector databases rag under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Hybrid Search (Sparse BM25 + Dense Semantic Vector)",
    "subtopic": "Hybrid Search (Sparse BM25 + Dense Semantic Vector)",
    "question": "Debug this Vector Databases & RAG scenario regarding Hybrid Search (Sparse BM25 + Dense Semantic Vector): A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Vector Databases & RAG config for Hybrid Search (Sparse BM25 + Dense Semantic Vector)\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Vector Databases & RAG scenario regarding Hybrid Search (Sparse BM25 + Dense Semantic Vector): A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Vector Databases & RAG config for Hybrid Search (Sparse BM25 + Dense Semantic Vector)\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Hybrid Search (Sparse BM25 + Dense Semantic Vector). In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Hybrid Search (Sparse BM25 + Dense Semantic Vector). In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Hybrid Search (Sparse BM25 + Dense Semantic Vector) bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Hybrid Search (Sparse BM25 + Dense Semantic Vector) bug?",
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
      "vector db & rag",
      "hybrid search sparse bm25  dense semantic vector",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this vector databases rag scenario regarding hybrid search sparse bm25 dense semantic vector a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic vector databases rag config for hybrid search sparse bm25 dense semantic vector service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this vector databases rag scenario regarding hybrid search sparse bm25 dense semantic vector a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic vector databases rag config for hybrid search sparse bm25 dense semantic vector service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Re-ranking Techniques & Cross-Encoders",
    "subtopic": "Re-ranking Techniques & Cross-Encoders",
    "question": "Compare alternative design strategies for Re-ranking Techniques & Cross-Encoders in Vector Databases & RAG. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for Re-ranking Techniques & Cross-Encoders in Vector Databases & RAG. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for Re-ranking Techniques & Cross-Encoders in Vector Databases & RAG, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for Re-ranking Techniques & Cross-Encoders in Vector Databases & RAG, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for Re-ranking Techniques & Cross-Encoders",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for Re-ranking Techniques & Cross-Encoders",
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
      "vector db & rag",
      "reranking techniques  crossencoders",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for reranking techniques crossencoders in vector databases rag under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for reranking techniques crossencoders in vector databases rag under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Query Expansion, Multi-Query & Contextual Compression",
    "subtopic": "Query Expansion, Multi-Query & Contextual Compression",
    "question": "Debug this Vector Databases & RAG scenario regarding Query Expansion, Multi-Query & Contextual Compression: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Vector Databases & RAG config for Query Expansion, Multi-Query & Contextual Compression\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Vector Databases & RAG scenario regarding Query Expansion, Multi-Query & Contextual Compression: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Vector Databases & RAG config for Query Expansion, Multi-Query & Contextual Compression\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Query Expansion, Multi-Query & Contextual Compression. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Query Expansion, Multi-Query & Contextual Compression. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Query Expansion, Multi-Query & Contextual Compression bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Query Expansion, Multi-Query & Contextual Compression bug?",
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
      "vector db & rag",
      "query expansion multiquery  contextual compression",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this vector databases rag scenario regarding query expansion multiquery contextual compression a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic vector databases rag config for query expansion multiquery contextual compression service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this vector databases rag scenario regarding query expansion multiquery contextual compression a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic vector databases rag config for query expansion multiquery contextual compression service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance",
    "subtopic": "RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance",
    "question": "Compare alternative design strategies for RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance in Vector Databases & RAG. Under what specific scale or latency requirements would you choose one approach over another?",
    "questionText": "Compare alternative design strategies for RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance in Vector Databases & RAG. Under what specific scale or latency requirements would you choose one approach over another?",
    "idealAnswer": "When designing for RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance in Vector Databases & RAG, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "referenceAnswer": "When designing for RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance in Vector Databases & RAG, the primary trade-off is between latency, memory footprint, and consistency guarantees. For read-heavy, low-latency requirements, asynchronous caching with eventual consistency is optimal. For mission-critical transactional paths, synchronous replication and strict ACID guarantees are required despite the latency overhead.",
    "keyPoints": [
      "Compares at least two architectural alternatives for RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance",
      "Analyzes performance trade-offs: latency vs consistency, memory vs CPU overhead",
      "Justifies decision criteria based on traffic volume, SLAs, and failure modes"
    ],
    "expectedKeyPoints": [
      "Compares at least two architectural alternatives for RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance",
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
      "vector db & rag",
      "rag triad evaluation context relevance groundedness answer relevance",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "compare alternative design strategies for rag triad evaluation context relevance groundedness answer relevance in vector databases rag under what specific scale or latency requirements would you choose one approach over another",
    "normalizedText": "compare alternative design strategies for rag triad evaluation context relevance groundedness answer relevance in vector databases rag under what specific scale or latency requirements would you choose one approach over another",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "RAG Architecture & End-to-End Pipeline Workflow",
    "subtopic": "RAG Architecture & End-to-End Pipeline Workflow",
    "question": "Debug this Vector Databases & RAG scenario regarding RAG Architecture & End-to-End Pipeline Workflow: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Vector Databases & RAG config for RAG Architecture & End-to-End Pipeline Workflow\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Vector Databases & RAG scenario regarding RAG Architecture & End-to-End Pipeline Workflow: A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Vector Databases & RAG config for RAG Architecture & End-to-End Pipeline Workflow\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in RAG Architecture & End-to-End Pipeline Workflow. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in RAG Architecture & End-to-End Pipeline Workflow. In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this RAG Architecture & End-to-End Pipeline Workflow bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this RAG Architecture & End-to-End Pipeline Workflow bug?",
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
      "vector db & rag",
      "rag architecture  endtoend pipeline workflow",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this vector databases rag scenario regarding rag architecture endtoend pipeline workflow a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic vector databases rag config for rag architecture endtoend pipeline workflow service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this vector databases rag scenario regarding rag architecture endtoend pipeline workflow a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic vector databases rag config for rag architecture endtoend pipeline workflow service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)",
    "subtopic": "Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)",
    "question": "In production Vector Databases & RAG architectures, explain how Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Vector Databases & RAG architectures, explain how Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Vector Databases & RAG, Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Vector Databases & RAG, Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN) metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Vector Search Algorithms (HNSW, IVF, ANN vs Exact KNN)?"
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
      "vector db & rag",
      "vector search algorithms hnsw ivf ann vs exact knn",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production vector databases rag architectures explain how vector search algorithms hnsw ivf ann vs exact knn is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production vector databases rag architectures explain how vector search algorithms hnsw ivf ann vs exact knn is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
    "subtopic": "Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
    "question": "Design a high-resiliency workflow in Vector Databases & RAG for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant). How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Vector Databases & RAG for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant). How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "vector db & rag",
      "vector databases pinecone weaviate milvus chroma qdrant",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in vector databases rag for vector databases pinecone weaviate milvus chroma qdrant how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in vector databases rag for vector databases pinecone weaviate milvus chroma qdrant how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Hybrid Search (Sparse BM25 + Dense Semantic Vector)",
    "subtopic": "Hybrid Search (Sparse BM25 + Dense Semantic Vector)",
    "question": "In production Vector Databases & RAG architectures, explain how Hybrid Search (Sparse BM25 + Dense Semantic Vector) is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Vector Databases & RAG architectures, explain how Hybrid Search (Sparse BM25 + Dense Semantic Vector) is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Vector Databases & RAG, Hybrid Search (Sparse BM25 + Dense Semantic Vector) enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Vector Databases & RAG, Hybrid Search (Sparse BM25 + Dense Semantic Vector) enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Hybrid Search (Sparse BM25 + Dense Semantic Vector)",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Hybrid Search (Sparse BM25 + Dense Semantic Vector)",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Hybrid Search (Sparse BM25 + Dense Semantic Vector) metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Hybrid Search (Sparse BM25 + Dense Semantic Vector)?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Hybrid Search (Sparse BM25 + Dense Semantic Vector) metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Hybrid Search (Sparse BM25 + Dense Semantic Vector)?"
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
      "vector db & rag",
      "hybrid search sparse bm25  dense semantic vector",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production vector databases rag architectures explain how hybrid search sparse bm25 dense semantic vector is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production vector databases rag architectures explain how hybrid search sparse bm25 dense semantic vector is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Re-ranking Techniques & Cross-Encoders",
    "subtopic": "Re-ranking Techniques & Cross-Encoders",
    "question": "Design a high-resiliency workflow in Vector Databases & RAG for Re-ranking Techniques & Cross-Encoders. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Vector Databases & RAG for Re-ranking Techniques & Cross-Encoders. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Re-ranking Techniques & Cross-Encoders workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Re-ranking Techniques & Cross-Encoders workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "vector db & rag",
      "reranking techniques  crossencoders",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in vector databases rag for reranking techniques crossencoders how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in vector databases rag for reranking techniques crossencoders how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Query Expansion, Multi-Query & Contextual Compression",
    "subtopic": "Query Expansion, Multi-Query & Contextual Compression",
    "question": "In production Vector Databases & RAG architectures, explain how Query Expansion, Multi-Query & Contextual Compression is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Vector Databases & RAG architectures, explain how Query Expansion, Multi-Query & Contextual Compression is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Vector Databases & RAG, Query Expansion, Multi-Query & Contextual Compression enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Vector Databases & RAG, Query Expansion, Multi-Query & Contextual Compression enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for Query Expansion, Multi-Query & Contextual Compression",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for Query Expansion, Multi-Query & Contextual Compression",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark Query Expansion, Multi-Query & Contextual Compression metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Query Expansion, Multi-Query & Contextual Compression?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark Query Expansion, Multi-Query & Contextual Compression metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with Query Expansion, Multi-Query & Contextual Compression?"
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
      "vector db & rag",
      "query expansion multiquery  contextual compression",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production vector databases rag architectures explain how query expansion multiquery contextual compression is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production vector databases rag architectures explain how query expansion multiquery contextual compression is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance",
    "subtopic": "RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance",
    "question": "Design a high-resiliency workflow in Vector Databases & RAG for RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Vector Databases & RAG for RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient RAG Triad Evaluation: Context Relevance, Groundedness, Answer Relevance workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "vector db & rag",
      "rag triad evaluation context relevance groundedness answer relevance",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in vector databases rag for rag triad evaluation context relevance groundedness answer relevance how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in vector databases rag for rag triad evaluation context relevance groundedness answer relevance how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "RAG Architecture & End-to-End Pipeline Workflow",
    "subtopic": "RAG Architecture & End-to-End Pipeline Workflow",
    "question": "In production Vector Databases & RAG architectures, explain how RAG Architecture & End-to-End Pipeline Workflow is implemented internally and what architectural trade-offs govern its design.",
    "questionText": "In production Vector Databases & RAG architectures, explain how RAG Architecture & End-to-End Pipeline Workflow is implemented internally and what architectural trade-offs govern its design.",
    "idealAnswer": "In Vector Databases & RAG, RAG Architecture & End-to-End Pipeline Workflow enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "referenceAnswer": "In Vector Databases & RAG, RAG Architecture & End-to-End Pipeline Workflow enforces modularity, high availability, and scalability by decoupling component responsibilities. Internal mechanisms coordinate state, optimize throughput, and isolate failure domains so that systemic regressions or traffic spikes do not cause cascading failures.",
    "keyPoints": [
      "Articulates internal data structure and runtime execution model for RAG Architecture & End-to-End Pipeline Workflow",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "expectedKeyPoints": [
      "Articulates internal data structure and runtime execution model for RAG Architecture & End-to-End Pipeline Workflow",
      "Analyzes memory allocation boundaries and resource lifecycle management",
      "Considers latency, CPU throughput, and cache efficiency under production load"
    ],
    "followUps": [
      "How do you monitor and benchmark RAG Architecture & End-to-End Pipeline Workflow metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with RAG Architecture & End-to-End Pipeline Workflow?"
    ],
    "suggestedFollowUps": [
      "How do you monitor and benchmark RAG Architecture & End-to-End Pipeline Workflow metrics in a live production environment?",
      "What are the most common performance bottlenecks associated with RAG Architecture & End-to-End Pipeline Workflow?"
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
      "vector db & rag",
      "rag architecture  endtoend pipeline workflow",
      "conceptual"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "in production vector databases rag architectures explain how rag architecture endtoend pipeline workflow is implemented internally and what architectural tradeoffs govern its design",
    "normalizedText": "in production vector databases rag architectures explain how rag architecture endtoend pipeline workflow is implemented internally and what architectural tradeoffs govern its design",
    "sequenceOrder": 9,
    "learningStage": "Advanced Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Document Ingestion, Chunking Strategies & Overlap",
    "subtopic": "Document Ingestion, Chunking Strategies & Overlap",
    "question": "Design a high-resiliency workflow in Vector Databases & RAG for Document Ingestion, Chunking Strategies & Overlap. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "questionText": "Design a high-resiliency workflow in Vector Databases & RAG for Document Ingestion, Chunking Strategies & Overlap. How do you ensure high availability, data consistency, and fault tolerance when downstream dependencies fail?",
    "idealAnswer": "A resilient Document Ingestion, Chunking Strategies & Overlap workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
    "referenceAnswer": "A resilient Document Ingestion, Chunking Strategies & Overlap workflow implements the Circuit Breaker pattern with fallback responses, uses asynchronous message queues (e.g. Kafka/RabbitMQ) for load leveling, and applies idempotency keys to guarantee exactly-once processing semantics during retries.",
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
      "vector db & rag",
      "document ingestion chunking strategies  overlap",
      "scenario"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "design a highresiliency workflow in vector databases rag for document ingestion chunking strategies overlap how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "normalizedText": "design a highresiliency workflow in vector databases rag for document ingestion chunking strategies overlap how do you ensure high availability data consistency and fault tolerance when downstream dependencies fail",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  },
  {
    "category": "Vector DB & RAG",
    "topic": "Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
    "subtopic": "Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)",
    "question": "Debug this Vector Databases & RAG scenario regarding Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant): A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Vector Databases & RAG config for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "questionText": "Debug this Vector Databases & RAG scenario regarding Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant): A high-throughput service experiences latency spikes, unexpected memory growth, or silent failures. Identify the bug in the following implementation and explain the correct fix:\n\n# Problematic Vector Databases & RAG config for Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant)\nservice:\n  timeout: 0 # Unbounded timeout risks connection thread starvation\n  retries: 10 # Excessive retries without backoff causes thundering herd\n  concurrency: 5000",
    "idealAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant). In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
    "referenceAnswer": "The bug stems from unbounded resource retention and lack of backoff protection in Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant). In the code/config, resources or cache collections accumulate without size limits or eviction bounds, causing memory leaks and Garbage Collection pressure. The fix is to: 1) Implement strict bounded collections with LRU eviction; 2) Apply timeout limits on all I/O paths; and 3) Add exponential backoff and jitter to retry policies to prevent thundering herd problems.",
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
      "How would you write an automated regression test to catch this Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) bug?",
      "What telemetry metric would alert on this issue before it causes full service outage?"
    ],
    "suggestedFollowUps": [
      "How would you write an automated regression test to catch this Vector Databases (Pinecone, Weaviate, Milvus, Chroma, Qdrant) bug?",
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
      "vector db & rag",
      "vector databases pinecone weaviate milvus chroma qdrant",
      "debugging"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    },
    "isActive": true,
    "normalizedHash": "debug this vector databases rag scenario regarding vector databases pinecone weaviate milvus chroma qdrant a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic vector databases rag config for vector databases pinecone weaviate milvus chroma qdrant service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "normalizedText": "debug this vector databases rag scenario regarding vector databases pinecone weaviate milvus chroma qdrant a highthroughput service experiences latency spikes unexpected memory growth or silent failures identify the bug in the following implementation and explain the correct fix problematic vector databases rag config for vector databases pinecone weaviate milvus chroma qdrant service timeout 0 unbounded timeout risks connection thread starvation retries 10 excessive retries without backoff causes thundering herd concurrency 5000",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Core interview question"
  }
];

export default VECTOR_DB_RAG_QUESTIONS;
