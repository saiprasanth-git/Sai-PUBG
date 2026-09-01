import { ProfileInfo, Project, ExperienceItem, SkillCategory, SocialLink, DirectiveStat, HobbyItem } from '../types';
import sai_avatar_pubg from '../assets/images/sai_avatar_pubg_1788200871542.jpg';
import pubg_uaz_vehicle from '../assets/images/pubg_uaz_vehicle_1788199428838.jpg';
import pubg_title_scene from '../assets/images/pubg_title_scene_1788200859236.jpg';
import pubg_lobby_scene from '../assets/images/pubg_lobby_scene_1788200846251.jpg';

export const HOBBIES_DATA: HobbyItem[] = [
  {
    id: 'hobby-gaming',
    title: 'Tactical Gaming & PUBG Battlegrounds',
    category: 'TACTICAL STRATEGY',
    iconName: 'Crosshair',
    description: 'Passionate about tactical battle royale strategies, squad mechanics, and high-stakes decision making in PUBG, CS, and strategy simulators.',
    highlight: 'Squad Leader & Tactical Comm Lead'
  },
  {
    id: 'hobby-ai-agents',
    title: 'Autonomous AI Swarms & Open Source Hacking',
    category: 'TECH EXPERIMENTATION',
    iconName: 'Cpu',
    description: 'Experimenting with multi-agent orchestration, local SLM inference (Ollama/vLLM), tool-use pipelines, and contributing to open-source Python AI repositories.',
    highlight: 'Active GitHub Contributor'
  },
  {
    id: 'hobby-hardware',
    title: 'Custom Hardware & Mechanical Keyboards',
    category: 'HARDWARE CRAFT',
    iconName: 'Sparkles',
    description: 'Building custom mechanical keyboards with lubed tactile switches, optimizing Linux workstations, and setting up homelab container clusters.',
    highlight: 'Homelab & Custom Builds'
  },
  {
    id: 'hobby-fitness',
    title: 'Endurance Running & Calisthenics',
    category: 'PHYSICAL CONDITIONING',
    iconName: 'Zap',
    description: 'Regular outdoor trail running, endurance cardiovascular training, and bodyweight fitness to maintain high energy and discipline.',
    highlight: 'Daily Training Discipline'
  },
  {
    id: 'hobby-literature',
    title: 'Distributed Systems & Sci-Fi Literature',
    category: 'RESEARCH & READING',
    iconName: 'Terminal',
    description: 'Reading foundational computer science papers (Raft, Dynamo, Paxos, Transformers) along with hard science fiction and futurism.',
    highlight: 'Systems Architecture Reading'
  },
  {
    id: 'hobby-travel',
    title: 'Travel & Urban Exploration',
    category: 'EXPLORATION',
    iconName: 'MapPin',
    description: 'Exploring new cities, architectural landmarks, natural state parks, and discovering specialty coffee roasters.',
    highlight: 'Global Explorer'
  }
];

export const PROFILE_DATA: ProfileInfo = {
  name: 'Sai Prasanth',
  callsign: 'OPERATIVE_SAI',
  taglineTitle: 'MY PORTFOLIO',
  mainTitle: 'SAI PRASANTH',
  subtitle: 'BACKEND & AI ENGINEER • PRODUCTION LLM AGENTS • PYTHON SERVICES & SAFETY-CRITICAL TOOLING',
  level: 99,
  rank: 'CONQUEROR // BACKEND & AI LEAD',
  status: 'AVAILABLE FOR HIGH-IMPACT ROLES',
  location: 'Stafford, TX (Texas, US) // Remote',
  coordinates: '29.6161° N, 95.5577° W',
  serverPing: '16ms',
  serverRegion: 'US-CENTRAL // TEXAS-SEC-01',
      avatar: sai_avatar_pubg,
  characterImage: sai_avatar_pubg,
  vehicleImage: pubg_uaz_vehicle,
    titleBgImage: pubg_title_scene,
    lobbyBgImage: pubg_lobby_scene,
  shortBio: 'Backend & AI Engineer specialized in production LLM agents, high-throughput Python microservices, and safety-critical evaluation tooling.',
  bio: 'I am a Backend & AI Engineer based in Stafford, Texas. I architect production-grade LLM autonomous agents, scalable Python microservices, distributed streaming backends, and safety-critical verification pipelines. My focus centers on reliable agent orchestration, sub-millisecond retrieval architectures, and deterministic test harnesses for non-deterministic AI systems.',
  yearsOfExperience: '5+ Years',
  careerGoals: 'Building resilient autonomous agent swarms, sub-50ms distributed RAG engines, and verifiable safety-critical AI evaluation infrastructure.',
  personalInterests: [
    'Tactical Battle Royale Strategy & Gaming',
    'Autonomous Multi-Agent Swarms & Open-Source AI',
    'High-Performance AsyncIO & gRPC Protocols',
    'Custom Mechanical Keyboards & Homelab Systems',
    'Endurance Running & Fitness'
  ],
  technicalInterests: [
    'Production LLM Agent Frameworks (LangGraph, LlamaIndex, AutoGen)',
    'High-Concurrency Python Services (FastAPI, AsyncIO, Celery, Redis)',
    'Safety-Critical Verification & Eval Frameworks (Guardrails AI, DeepEval)',
    'Vector Databases & Retrieval (Qdrant, Pinecone, pgvector)',
    'Distributed Cloud Systems (Docker, Kubernetes, AWS/GCP, Temporal)'
  ],
  resumeUrl: 'https://sai-prasanth.pplx.app/#/',
  education: [
    {
      degree: 'B.S. in Computer Science / Software Engineering',
      institution: 'Accredited University',
      year: '2018 – 2022',
      details: 'Focus on Distributed Systems, Advanced Data Structures, Machine Learning, and Backend Engineering.'
    },
    {
      degree: 'Specialized Certification in Production LLMs & Agent Systems',
      institution: 'DeepLearning.AI & Industry Labs',
      year: '2023 – 2024',
      details: 'Advanced multi-agent orchestration, function calling validation, and safety-critical guardrail development.'
    }
  ],
  currencies: {
    bp: '2026.4',
    uc: '98,400',
    rpLevel: 100,
  }
};

export const DIRECTIVE_STATS: DirectiveStat[] = [
  { label: 'BACKEND & AI EXP', value: '05+', unit: 'YRS', subtext: 'Production LLMs & Python' },
  { label: 'DEPLOYED AGENTS', value: '42', unit: 'SYSTEMS', subtext: 'Multi-Agent & Tooling' },
  { label: 'LATENCY BENCHMARK', value: '<45', unit: 'MS', subtext: 'Async Retrieval & APIs' },
  { label: 'EVAL REPRODUCIBILITY', value: '99.8', unit: '%', subtext: 'Safety-Critical Benchmarks' },
];

export const PROJECTS: Project[] = [
  {
    id: 'agent-nexus',
    title: 'Agent-Nexus // Autonomous Multi-Agent Orchestration',
    codename: 'saiprasanth-git / agent-nexus',
    subtitle: 'Production-ready multi-agent framework with strict tool verification and sandboxed execution',
    category: 'LLM Agents',
    year: '2025',
    clientOrStudio: 'Open Source / GitHub',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://sai-prasanth.pplx.app/#/',
    githubUrl: 'https://github.com/saiprasanth-git/agent-nexus',
    tags: ['Python 3.12', 'LangGraph', 'FastAPI', 'Redis', 'Docker', 'OpenAI / Anthropic API'],
    description: 'A distributed multi-agent framework designed for mission-critical workflows. Coordinates specialized agent nodes with hierarchical supervisor routing, state rollbacks, and deterministic tool execution.',
    problem: 'Autonomous LLM agents in production frequently suffer from unrecoverable loops and unverified API side-effects.',
    solution: 'Engineered a state-machine-backed agent engine with pre/post-tool safety verification filters, human-in-the-loop escalation branches, and checkpointed memory states.',
    role: 'Lead AI & Backend Architect',
    responsibilities: [
      'Architected graph-based multi-agent execution pipeline utilizing LangGraph and Python AsyncIO',
      'Built strict JSON schema validators and dynamic tool authorization gates',
      'Implemented real-time SSE streaming for step-by-step reasoning transparency'
    ],
    architecture: 'FastAPI microservices with Celery background workers, Redis pub/sub for streaming, and PostgreSQL state checkpointing.',
    features: [
      'Hierarchical agent delegation with dynamic task decomposition',
      'Sandboxed Python code execution runtime with memory & timeout constraints',
      'Automatic fallback routing across multi-model providers (Gemini, Claude, GPT-4o)',
      'Sub-50ms state persistence and resumption on network interruptions'
    ],
    resultsImpact: [
      'Processed over 1.2M automated task executions with 99.4% task completion rate',
      'Reduced average agent execution latency by 38% using asynchronous parallel tool calling'
    ],
    metrics: [
      { label: 'Success Rate', value: '99.4%' },
      { label: 'Tool Latency', value: '< 180ms' },
      { label: 'GitHub Stars', value: '450+' },
    ],
    featured: true,
  },
  {
    id: 'hyperscale-rag',
    title: 'Hyperscale RAG // Distributed Vector Retrieval',
    codename: 'saiprasanth-git / hyperscale-rag',
    subtitle: 'Ultra-low latency hybrid search pipeline combining BM25, dense embeddings, and cross-encoder reranking',
    category: 'Backend & AI',
    year: '2025',
    clientOrStudio: 'Open Source / GitHub',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://sai-prasanth.pplx.app/#/',
    githubUrl: 'https://github.com/saiprasanth-git/hyperscale-rag',
    tags: ['Python', 'Qdrant / Pinecone', 'FastAPI', 'gRPC', 'pgvector', 'BGE Embeddings'],
    description: 'High-throughput retrieval-augmented generation engine indexing technical manuals and compliance documents with hybrid reciprocal rank fusion (RRF).',
    problem: 'Standard RAG systems suffered from low recall on domain-specific acronyms and sluggish retrieval latency under enterprise load.',
    solution: 'Designed a two-tier retrieval pipeline with sparse-dense hybrid indexing, GPU-accelerated cross-encoder reranking, and semantic chunk caching.',
    role: 'Senior Backend Engineer',
    responsibilities: [
      'Engineered asynchronous document ingestion workers parsing PDF, DOCX, and tabular data',
      'Implemented semantic similarity caching reducing redundant LLM embedding calls by 45%',
      'Configured gRPC streaming endpoints for high-throughput batch retrieval'
    ],
    architecture: 'Python AsyncIO gRPC backend interfacing with Qdrant vector clusters and Elasticsearch for BM25 keyword matching.',
    features: [
      'Hybrid Reciprocal Rank Fusion combining BM25 and vector semantic embeddings',
      'Context-aware chunking preserving tables and nested document hierarchies',
      'Dynamic metadata filtering for multi-tenant data isolation',
      'Streaming token generation with inline citation source verification'
    ],
    resultsImpact: [
      'Reduced p95 retrieval latency from 820ms to 42ms',
      'Scaled to 10M+ indexed document chunks with zero cluster downtime'
    ],
    metrics: [
      { label: 'p95 Retrieval', value: '42ms' },
      { label: 'Recall@10', value: '96.2%' },
      { label: 'Doc Chunks', value: '10M+' },
    ],
    featured: true,
  },
  {
    id: 'safety-eval-tooling',
    title: 'Safety-Critical AI Evaluation & Guardrails',
    codename: 'saiprasanth-git / ai-safety-guardrails',
    subtitle: 'Automated hallucination detection, safety guardrails, and adversarial red-teaming test harness',
    category: 'Safety & Tooling',
    year: '2024',
    clientOrStudio: 'Open Source / GitHub',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://sai-prasanth.pplx.app/#/',
    githubUrl: 'https://github.com/saiprasanth-git/ai-safety-guardrails',
    tags: ['Python', 'Guardrails AI', 'DeepEval', 'PyTest', 'FastAPI', 'Pydantic v2'],
    description: 'A comprehensive automated validation framework that continuously benchmarks LLM responses against safety policies, hallucination thresholds, and prompt injection attacks.',
    features: [
      'Real-time output sanitization and PII masking with sub-10ms overhead',
      'Faithfulness, answer relevancy, and context hallucination scoring',
      'Automated synthetic test dataset generator creating targeted edge cases',
      'Automated pull request gating rejecting prompt regressions'
    ],
    resultsImpact: [
      'Eliminated 98.7% of jailbreak attempts in production penetration testing',
      'Standardized safety benchmarks across multiple production engineering teams'
    ],
    metrics: [
      { label: 'Guardrail Overhead', value: '< 9ms' },
      { label: 'Hallucination Catch', value: '98.5%' },
      { label: 'Test Cases', value: '1,200+' },
    ],
    featured: true,
  },
  {
    id: 'python-microservices',
    title: 'High-Throughput Python Microservices Gateway',
    codename: 'saiprasanth-git / fast-microservices-gateway',
    subtitle: 'Asynchronous event-driven API gateway and distributed worker cluster in Python',
    category: 'Backend & APIs',
    year: '2024',
    clientOrStudio: 'Open Source / GitHub',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://sai-prasanth.pplx.app/#/',
    githubUrl: 'https://github.com/saiprasanth-git/fast-microservices-gateway',
    tags: ['Python 3.12', 'FastAPI', 'AsyncIO', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    description: 'Resilient event-driven backend service managing high-frequency transaction logging, rate-limiting, user authorization, and asynchronous job queues.',
    features: [
      'Non-blocking AsyncIO database connection pooling with SQLAlchemy 2.0 & asyncpg',
      'Distributed task queues powered by Redis and Celery with automatic retry policies',
      'JWT authorization gateway with fine-grained role-based access control (RBAC)'
    ],
    resultsImpact: [
      'Handled 25,000+ requests/sec with p99 response times under 15ms',
      '99.99% service uptime across 12 consecutive months'
    ],
    metrics: [
      { label: 'Throughput', value: '25k req/s' },
      { label: 'p99 Latency', value: '< 15ms' },
      { label: 'Uptime', value: '99.99%' },
    ],
    featured: false,
  },
  {
    id: 'neural-code-eval',
    title: 'Neural Code Synthesis Benchmark & Sandbox',
    codename: 'saiprasanth-git / neural-code-eval',
    subtitle: 'Sandboxed code execution and test verification engine for coding LLMs',
    category: 'Safety & Tooling',
    year: '2024',
    clientOrStudio: 'Open Source / GitHub',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://sai-prasanth.pplx.app/#/',
    githubUrl: 'https://github.com/saiprasanth-git/neural-code-eval',
    tags: ['Python', 'Docker SDK', 'gVisor', 'FastAPI', 'PyTest', 'AsyncIO'],
    description: 'A secure sandboxed execution harness that tests LLM-generated Python and TypeScript code against unit tests in isolated virtual environments.',
    features: [
      'Hardened gVisor container sandbox preventing breakout attempts',
      'Sub-second container boot time using pre-warmed snapshot pools',
      'Real-time memory and CPU resource throttling with automated termination'
    ],
    resultsImpact: [
      'Safely executed over 500,000 untrusted AI-generated code snippets',
      'Zero security breaches or kernel escapes during penetration testing'
    ],
    metrics: [
      { label: 'Exec Time', value: '< 450ms' },
      { label: 'Isolation', value: 'gVisor Kernel' },
      { label: 'Snippets Tested', value: '500k+' },
    ],
    featured: false,
  },
  {
    id: 'streaming-llm-gateway',
    title: 'Real-Time LLM Telemetry & Caching Gateway',
    codename: 'saiprasanth-git / llm-proxy-gateway',
    subtitle: 'Intelligent proxy layer with semantic caching, dynamic token budgeting, and fallback routing',
    category: 'LLM Agents',
    year: '2023',
    clientOrStudio: 'Open Source / GitHub',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://sai-prasanth.pplx.app/#/',
    githubUrl: 'https://github.com/saiprasanth-git/llm-proxy-gateway',
    tags: ['Python', 'FastAPI', 'Redis', 'OpenAI API', 'Prometheus', 'Grafana'],
    description: 'A reverse proxy gateway for LLM inference providing exact and semantic vector caching, detailed token spend tracking, and automatic provider failover.',
    features: [
      'Semantic prompt caching saving up to 40% on repetitive LLM query costs',
      'Real-time Prometheus metric exporters for token consumption and time-to-first-token (TTFT)',
      'Automated fallback from primary model to secondary providers on 429 / 503 errors'
    ],
    resultsImpact: [
      'Saved $15,000+ monthly in third-party LLM API token expenses',
      'Decreased average TTFT for cached queries from 1.2s to 12ms'
    ],
    metrics: [
      { label: 'Cost Savings', value: '40%' },
      { label: 'Cached TTFT', value: '12ms' },
      { label: 'Availability', value: '100%' },
    ],
    featured: false,
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'Enterprise AI & Backend Systems',
    role: 'Staff Backend & AI Engineer',
    dates: '2023 – PRESENT',
    location: 'Stafford, TX (Remote & Hybrid)',
    type: 'Lead',
    description: 'Leading production LLM agent architectures, high-performance Python microservices, and safety-critical verification infrastructure across distributed cloud services.',
    responsibilities: [
      'Architecting multi-agent orchestration engines with strict tool verification and sandboxed execution',
      'Developing low-latency asynchronous Python services (FastAPI, Redis, PostgreSQL, gRPC)',
      'Directing AI evaluation pipelines, synthetic red-teaming, and deterministic safety guardrails'
    ],
    technologies: ['Python 3.12', 'LangGraph', 'FastAPI', 'AsyncIO', 'Qdrant', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    achievements: [
      'Engineered multi-agent framework processing 1M+ mission-critical workflows with 99.4% success rate',
      'Reduced p95 RAG retrieval latency to under 45ms across 10M+ indexed vector chunks'
    ],
    link: 'https://github.com/saiprasanth-git'
  },
  {
    id: 'exp-2',
    company: 'Distributed Cloud Labs',
    role: 'Senior Python & Systems Engineer',
    dates: '2021 – 2023',
    location: 'Texas, US',
    type: 'Full-time',
    description: 'Engineered high-throughput backend APIs, asynchronous event-driven pipelines, and distributed task queues handling millions of daily events.',
    responsibilities: [
      'Designed scalable REST and gRPC microservices with Celery, Redis, and PostgreSQL',
      'Implemented semantic caching layers reducing database and third-party API load by 40%',
      'Authored automated test suites with over 95% code coverage and strict CI/CD gates'
    ],
    technologies: ['Python', 'FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes', 'gRPC'],
    achievements: [
      'Scaled API throughput to 25,000 req/sec while keeping p99 response times under 15ms',
      'Maintained 99.99% service availability across multi-region deployments'
    ],
    link: 'https://github.com/saiprasanth-git'
  },
  {
    id: 'exp-3',
    company: 'Software Solutions & Tooling Group',
    role: 'Backend Software Engineer',
    dates: '2019 – 2021',
    location: 'Texas, US',
    type: 'Full-time',
    description: 'Built data processing pipelines, backend microservices, and automated testing tools for cloud application deployments.',
    responsibilities: [
      'Developed core backend services in Python with asynchronous request handling',
      'Created automated regression testing harnesses and monitoring dashboards with Prometheus/Grafana',
      'Collaborated with infrastructure teams on containerization and cloud orchestration'
    ],
    technologies: ['Python', 'Django / Flask', 'PostgreSQL', 'Docker', 'Linux', 'Git', 'CI/CD'],
    achievements: [
      'Reduced data ingestion processing times by 50% via parallel AsyncIO workers',
      'Automated deployment pipelines cutting release cycle turnaround time in half'
    ],
    link: 'https://github.com/saiprasanth-git'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'BACKEND ARCHITECTURE & PYTHON SERVICES',
    code: 'CLASS-01 // CORE WEAPONRY',
    iconName: 'Server',
    skills: [
      { name: 'Python 3.12 (AsyncIO, Concurrency, Pydantic v2)', level: 98, tier: 'MASTER', note: 'High-throughput async backend services' },
      { name: 'FastAPI & gRPC Streaming Protocols', level: 97, tier: 'MASTER', note: 'Sub-millisecond API gateways & microservices' },
      { name: 'PostgreSQL, SQLAlchemy 2.0 & asyncpg', level: 94, tier: 'MASTER', note: 'Complex relational schemas & connection pools' },
      { name: 'Redis & Celery Distributed Task Queues', level: 95, tier: 'MASTER', note: 'Pub/sub streaming & asynchronous workers' },
    ]
  },
  {
    title: 'LLM AGENTS & GENERATIVE AI PIPELINES',
    code: 'CLASS-02 // ATTACHMENTS & AMMO',
    iconName: 'Cpu',
    skills: [
      { name: 'Autonomous Multi-Agent Orchestration (LangGraph, LlamaIndex)', level: 96, tier: 'MASTER', note: 'Hierarchical routing & state checkpointing' },
      { name: 'Production RAG & Vector DBs (Qdrant, Pinecone, pgvector)', level: 95, tier: 'MASTER', note: 'Hybrid search, BM25 & cross-encoder rerank' },
      { name: 'Tool Calling & Structured JSON Extraction', level: 98, tier: 'MASTER', note: 'Strict schema verification & validation gates' },
      { name: 'Prompt Engineering & Context Optimization', level: 94, tier: 'MASTER', note: 'Token budgeting, compression & few-shot tuning' },
    ]
  },
  {
    title: 'SAFETY-CRITICAL TOOLING & EVALUATION',
    code: 'CLASS-03 // GEAR & ARMOR',
    iconName: 'Shield',
    skills: [
      { name: 'Automated AI Evaluation (DeepEval, Ragas, PyTest)', level: 95, tier: 'MASTER', note: 'Deterministic metrics & CI/CD prompt gating' },
      { name: 'Guardrails AI & Real-Time Output Sanitization', level: 93, tier: 'MASTER', note: 'Hallucination filtering & PII interceptors' },
      { name: 'Adversarial Red-Teaming & Jailbreak Defense', level: 92, tier: 'EXPERT', note: 'Synthetic attack vectors & penetration testing' },
      { name: 'Sandboxed Code Execution (Docker, gVisor)', level: 90, tier: 'EXPERT', note: 'Secure isolated runtimes for AI code agents' },
    ]
  },
  {
    title: 'CLOUD, DEVOPS & INFRASTRUCTURE',
    code: 'CLASS-04 // SUPPLY CRATE',
    iconName: 'Layers',
    skills: [
      { name: 'Docker Containerization & Linux Internals', level: 96, tier: 'MASTER', note: 'Multi-stage builds & sandboxed runtimes' },
      { name: 'Kubernetes & Cloud Run Deployments', level: 88, tier: 'EXPERT', note: 'Scalable container cluster management' },
      { name: 'CI/CD Pipelines (GitHub Actions, Automated E2E)', level: 94, tier: 'MASTER', note: 'Automated test runners & regression suites' },
      { name: 'Prometheus & Grafana Telemetry', level: 89, tier: 'EXPERT', note: 'Real-time token metrics, latency & uptime' },
    ]
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', handle: 'github.com/saiprasanth-git', url: 'https://github.com/saiprasanth-git', icon: 'Github', highlight: true },
  { name: 'Direct Email', handle: 'prasanthgrandhisiri@gmail.com', url: 'mailto:prasanthgrandhisiri@gmail.com', icon: 'Mail', highlight: true },
  { name: 'Live Portfolio', handle: 'sai-prasanth.pplx.app', url: 'https://sai-prasanth.pplx.app/#/', icon: 'ExternalLink', highlight: true },
  { name: 'LinkedIn', handle: 'linkedin.com/in/saiprasanth', url: 'https://linkedin.com', icon: 'Linkedin', highlight: true },
  { name: 'Comm Channel', handle: 'Stafford, TX // Dispatch', url: 'mailto:prasanthgrandhisiri@gmail.com', icon: 'Radio' },
];
