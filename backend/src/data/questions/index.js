/**
 * Master Question Bank Index
 * Aggregates high-value production interview questions across all 56 categories.
 * Total Bank Inventory: 2088 questions
 */

import { JAVA_QUESTIONS } from './java.js';
import { PYTHON_QUESTIONS } from './python.js';
import { C_QUESTIONS } from './c.js';
import { CPP_QUESTIONS } from './cpp.js';
import { CSHARP_QUESTIONS } from './csharp.js';
import { JAVASCRIPT_QUESTIONS } from './javascript.js';
import { TYPESCRIPT_QUESTIONS } from './typescript.js';
import { GO_QUESTIONS } from './go.js';
import { RUBY_QUESTIONS } from './ruby.js';
import { PHP_QUESTIONS } from './php.js';
import { KOTLIN_QUESTIONS } from './kotlin.js';
import { SWIFT_QUESTIONS } from './swift.js';
import { RUST_QUESTIONS } from './rust.js';
import { DART_QUESTIONS } from './dart.js';
import { SCALA_QUESTIONS } from './scala.js';
import { R_QUESTIONS } from './r.js';
import { PERL_QUESTIONS } from './perl.js';
import { BASH_QUESTIONS } from './bash.js';
import { DSA_QUESTIONS } from './dsa.js';
import { OOP_QUESTIONS } from './oop.js';
import { SQL_DBMS_QUESTIONS } from './sql-dbms.js';
import { OPERATING_SYSTEMS_QUESTIONS } from './operating-systems.js';
import { COMPUTER_NETWORKS_QUESTIONS } from './computer-networks.js';
import { SYSTEM_DESIGN_QUESTIONS } from './system-design.js';
import { REACT_QUESTIONS } from './react.js';
import { NODEJS_QUESTIONS } from './nodejs.js';
import { FULL_STACK_QUESTIONS } from './full-stack.js';
import { SOFTWARE_ENGINEERING_QUESTIONS } from './software-engineering.js';
import { DESIGN_PATTERNS_QUESTIONS } from './design-patterns.js';
import { REST_APIS_QUESTIONS } from './rest-apis.js';
import { COMPETITIVE_PROGRAMMING_QUESTIONS } from './competitive-programming.js';
import { GIT_VERSION_CONTROL_QUESTIONS } from './git-version-control.js';
import { TESTING_QA_QUESTIONS } from './testing-qa.js';
import { SOFTWARE_ARCHITECTURE_QUESTIONS } from './software-architecture.js';
import { DISTRIBUTED_SYSTEMS_QUESTIONS } from './distributed-systems.js';
import { MICROSERVICES_QUESTIONS } from './microservices.js';
import { WEB_SECURITY_QUESTIONS } from './web-security.js';
import { PERFORMANCE_OPTIMIZATION_QUESTIONS } from './performance-optimization.js';
import { CLOUD_COMPUTING_QUESTIONS } from './cloud-computing.js';
import { DEVOPS_QUESTIONS } from './devops.js';
import { DOCKER_KUBERNETES_QUESTIONS } from './docker-kubernetes.js';
import { LINUX_SHELL_SCRIPTING_QUESTIONS } from './linux-shell-scripting.js';
import { NETWORKING_INFRASTRUCTURE_QUESTIONS } from './networking-infrastructure.js';
import { DATA_ENGINEERING_QUESTIONS } from './data-engineering.js';
import { DATA_ANALYTICS_QUESTIONS } from './data-analytics.js';
import { AI_MACHINE_LEARNING_QUESTIONS } from './ai-machine-learning.js';
import { DEEP_LEARNING_QUESTIONS } from './deep-learning.js';
import { GENERATIVE_AI_LLMS_QUESTIONS } from './generative-ai-llms.js';
import { PROMPT_ENGINEERING_QUESTIONS } from './prompt-engineering.js';
import { VECTOR_DB_RAG_QUESTIONS } from './vector-db-rag.js';
import { MLOPS_QUESTIONS } from './mlops.js';
import { BIG_DATA_QUESTIONS } from './big-data.js';
import { CYBERSECURITY_QUESTIONS } from './cybersecurity.js';
import { BLOCKCHAIN_QUESTIONS } from './blockchain.js';
import { MOBILE_DEVELOPMENT_QUESTIONS } from './mobile-development.js';
import { ACCESSIBILITY_PERFORMANCE_QUESTIONS } from './accessibility-performance.js';

export const ALL_CATEGORY_QUESTIONS = {
  'Java': JAVA_QUESTIONS,
  'Python': PYTHON_QUESTIONS,
  'C': C_QUESTIONS,
  'C++': CPP_QUESTIONS,
  'C#': CSHARP_QUESTIONS,
  'JavaScript': JAVASCRIPT_QUESTIONS,
  'TypeScript': TYPESCRIPT_QUESTIONS,
  'Go': GO_QUESTIONS,
  'Ruby': RUBY_QUESTIONS,
  'PHP': PHP_QUESTIONS,
  'Kotlin': KOTLIN_QUESTIONS,
  'Swift': SWIFT_QUESTIONS,
  'Rust': RUST_QUESTIONS,
  'Dart': DART_QUESTIONS,
  'Scala': SCALA_QUESTIONS,
  'R': R_QUESTIONS,
  'Perl': PERL_QUESTIONS,
  'Bash': BASH_QUESTIONS,
  'DSA': DSA_QUESTIONS,
  'OOP': OOP_QUESTIONS,
  'SQL/DBMS': SQL_DBMS_QUESTIONS,
  'Operating Systems': OPERATING_SYSTEMS_QUESTIONS,
  'Computer Networks': COMPUTER_NETWORKS_QUESTIONS,
  'System Design': SYSTEM_DESIGN_QUESTIONS,
  'React': REACT_QUESTIONS,
  'Node.js': NODEJS_QUESTIONS,
  'Full Stack': FULL_STACK_QUESTIONS,
  'Software Engineering': SOFTWARE_ENGINEERING_QUESTIONS,
  'Design Patterns': DESIGN_PATTERNS_QUESTIONS,
  'REST APIs': REST_APIS_QUESTIONS,
  'Competitive Programming': COMPETITIVE_PROGRAMMING_QUESTIONS,
  'Git & Version Control': GIT_VERSION_CONTROL_QUESTIONS,
  'Testing & QA': TESTING_QA_QUESTIONS,
  'Software Architecture': SOFTWARE_ARCHITECTURE_QUESTIONS,
  'Distributed Systems': DISTRIBUTED_SYSTEMS_QUESTIONS,
  'Microservices': MICROSERVICES_QUESTIONS,
  'Web Security': WEB_SECURITY_QUESTIONS,
  'Performance & Optimization': PERFORMANCE_OPTIMIZATION_QUESTIONS,
  'Cloud Computing': CLOUD_COMPUTING_QUESTIONS,
  'DevOps': DEVOPS_QUESTIONS,
  'Docker & Kubernetes': DOCKER_KUBERNETES_QUESTIONS,
  'Linux & Shell Scripting': LINUX_SHELL_SCRIPTING_QUESTIONS,
  'Networking & Infrastructure': NETWORKING_INFRASTRUCTURE_QUESTIONS,
  'Data Engineering': DATA_ENGINEERING_QUESTIONS,
  'Data Analytics': DATA_ANALYTICS_QUESTIONS,
  'AI & Machine Learning': AI_MACHINE_LEARNING_QUESTIONS,
  'Deep Learning': DEEP_LEARNING_QUESTIONS,
  'Generative AI & LLMs': GENERATIVE_AI_LLMS_QUESTIONS,
  'Prompt Engineering': PROMPT_ENGINEERING_QUESTIONS,
  'Vector DB & RAG': VECTOR_DB_RAG_QUESTIONS,
  'MLOps': MLOPS_QUESTIONS,
  'Big Data': BIG_DATA_QUESTIONS,
  'Cybersecurity': CYBERSECURITY_QUESTIONS,
  'Blockchain': BLOCKCHAIN_QUESTIONS,
  'Mobile Development': MOBILE_DEVELOPMENT_QUESTIONS,
  'Accessibility & Performance': ACCESSIBILITY_PERFORMANCE_QUESTIONS
};

export const ALL_QUESTIONS = [
  ...JAVA_QUESTIONS,
  ...PYTHON_QUESTIONS,
  ...C_QUESTIONS,
  ...CPP_QUESTIONS,
  ...CSHARP_QUESTIONS,
  ...JAVASCRIPT_QUESTIONS,
  ...TYPESCRIPT_QUESTIONS,
  ...GO_QUESTIONS,
  ...RUBY_QUESTIONS,
  ...PHP_QUESTIONS,
  ...KOTLIN_QUESTIONS,
  ...SWIFT_QUESTIONS,
  ...RUST_QUESTIONS,
  ...DART_QUESTIONS,
  ...SCALA_QUESTIONS,
  ...R_QUESTIONS,
  ...PERL_QUESTIONS,
  ...BASH_QUESTIONS,
  ...DSA_QUESTIONS,
  ...OOP_QUESTIONS,
  ...SQL_DBMS_QUESTIONS,
  ...OPERATING_SYSTEMS_QUESTIONS,
  ...COMPUTER_NETWORKS_QUESTIONS,
  ...SYSTEM_DESIGN_QUESTIONS,
  ...REACT_QUESTIONS,
  ...NODEJS_QUESTIONS,
  ...FULL_STACK_QUESTIONS,
  ...SOFTWARE_ENGINEERING_QUESTIONS,
  ...DESIGN_PATTERNS_QUESTIONS,
  ...REST_APIS_QUESTIONS,
  ...COMPETITIVE_PROGRAMMING_QUESTIONS,
  ...GIT_VERSION_CONTROL_QUESTIONS,
  ...TESTING_QA_QUESTIONS,
  ...SOFTWARE_ARCHITECTURE_QUESTIONS,
  ...DISTRIBUTED_SYSTEMS_QUESTIONS,
  ...MICROSERVICES_QUESTIONS,
  ...WEB_SECURITY_QUESTIONS,
  ...PERFORMANCE_OPTIMIZATION_QUESTIONS,
  ...CLOUD_COMPUTING_QUESTIONS,
  ...DEVOPS_QUESTIONS,
  ...DOCKER_KUBERNETES_QUESTIONS,
  ...LINUX_SHELL_SCRIPTING_QUESTIONS,
  ...NETWORKING_INFRASTRUCTURE_QUESTIONS,
  ...DATA_ENGINEERING_QUESTIONS,
  ...DATA_ANALYTICS_QUESTIONS,
  ...AI_MACHINE_LEARNING_QUESTIONS,
  ...DEEP_LEARNING_QUESTIONS,
  ...GENERATIVE_AI_LLMS_QUESTIONS,
  ...PROMPT_ENGINEERING_QUESTIONS,
  ...VECTOR_DB_RAG_QUESTIONS,
  ...MLOPS_QUESTIONS,
  ...BIG_DATA_QUESTIONS,
  ...CYBERSECURITY_QUESTIONS,
  ...BLOCKCHAIN_QUESTIONS,
  ...MOBILE_DEVELOPMENT_QUESTIONS,
  ...ACCESSIBILITY_PERFORMANCE_QUESTIONS
];

export default ALL_QUESTIONS;
