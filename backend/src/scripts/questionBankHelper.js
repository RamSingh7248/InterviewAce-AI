import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_CATEGORIES, normalizeCategory } from '../config/interviewCatalog.js';
import { normalizeQuestionText } from '../utils/textNormalize.js';
import { SEED_QUESTIONS } from '../data/seedQuestions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const QUESTIONS_DIR = path.join(__dirname, '../data/questions');

export const CATEGORY_TO_SLUG = {
  'Java': 'java',
  'Python': 'python',
  'C': 'c',
  'C++': 'cpp',
  'C#': 'csharp',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'Go': 'go',
  'Ruby': 'ruby',
  'PHP': 'php',
  'Kotlin': 'kotlin',
  'Swift': 'swift',
  'Rust': 'rust',
  'Dart': 'dart',
  'Scala': 'scala',
  'R': 'r',
  'Perl': 'perl',
  'Bash': 'bash',
  'DSA': 'dsa',
  'OOP': 'oop',
  'SQL/DBMS': 'sql-dbms',
  'Operating Systems': 'operating-systems',
  'Computer Networks': 'computer-networks',
  'System Design': 'system-design',
  'React': 'react',
  'Node.js': 'nodejs',
  'Full Stack': 'full-stack',
  'Software Engineering': 'software-engineering',
  'Design Patterns': 'design-patterns',
  'REST APIs': 'rest-apis',
  'Competitive Programming': 'competitive-programming',
  'Git & Version Control': 'git-version-control',
  'Testing & QA': 'testing-qa',
  'Software Architecture': 'software-architecture',
  'Distributed Systems': 'distributed-systems',
  'Microservices': 'microservices',
  'Web Security': 'web-security',
  'Performance & Optimization': 'performance-optimization',
  'Cloud Computing': 'cloud-computing',
  'DevOps': 'devops',
  'Docker & Kubernetes': 'docker-kubernetes',
  'Linux & Shell Scripting': 'linux-shell-scripting',
  'Networking & Infrastructure': 'networking-infrastructure',
  'Data Engineering': 'data-engineering',
  'Data Analytics': 'data-analytics',
  'AI & Machine Learning': 'ai-machine-learning',
  'Deep Learning': 'deep-learning',
  'Generative AI & LLMs': 'generative-ai-llms',
  'Prompt Engineering': 'prompt-engineering',
  'Vector DB & RAG': 'vector-db-rag',
  'MLOps': 'mlops',
  'Big Data': 'big-data',
  'Cybersecurity': 'cybersecurity',
  'Blockchain': 'blockchain',
  'Mobile Development': 'mobile-development',
  'Accessibility & Performance': 'accessibility-performance'
};

export { ALL_CATEGORIES, normalizeCategory, normalizeQuestionText, SEED_QUESTIONS, QUESTIONS_DIR };
