import { ProfileInfo, Project, ExperienceItem, SkillCategory, SocialLink, DirectiveStat, HobbyItem } from '../types';
import sai_avatar_pubg from '../assets/images/sai_avatar_pubg_1788200871542.jpg';
import pubg_uaz_vehicle from '../assets/images/pubg_uaz_vehicle_1788199428838.jpg';
import pubg_title_scene from '../assets/images/pubg_title_scene_1788200859236.jpg';
import pubg_lobby_scene from '../assets/images/pubg_lobby_scene_1788200846251.jpg';

export const HOBBIES_DATA: HobbyItem[] = [
  {
    id: 'hobby-pubg',
    title: 'PUBG Battlegrounds',
    category: 'TACTICAL STRATEGY',
    iconName: 'Crosshair',
    description: 'Tactical battle royale strategy, squad shot-calling, and high-stakes late-circle decision making.',
    highlight: 'Squad Leader & Tactical Comm Lead'
  },
  {
    id: 'hobby-badminton',
    title: 'Badminton',
    category: 'RACKET SPORT',
    iconName: 'Zap',
    description: 'Competitive singles and doubles play focused on reflexes, footwork, and rally control.',
    highlight: 'Weekly League Player'
  },
  {
    id: 'hobby-cricket',
    title: 'Cricket',
    category: 'TEAM SPORT',
    iconName: 'Target',
    description: 'Lifelong follower and player of cricket, from weekend matches to tracking international series.',
    highlight: 'Batting & Team Strategy'
  },
  {
    id: 'hobby-cinema',
    title: 'Cinema',
    category: 'ENTERTAINMENT',
    iconName: 'Terminal',
    description: 'Exploring films across genres and eras, with a soft spot for sci-fi and tightly-written thrillers.',
    highlight: 'Sci-Fi & Thriller Enthusiast'
  },
  {
    id: 'hobby-politics',
    title: 'Politics',
    category: 'CURRENT AFFAIRS',
    iconName: 'MapPin',
    description: 'Following domestic and global political developments and how policy shapes technology and society.',
    highlight: 'Active Current-Events Reader'
  },
  {
    id: 'hobby-geopolitics',
    title: 'Geopolitics',
    category: 'GLOBAL STRATEGY',
    iconName: 'Compass',
    description: 'Studying the strategic relationships between nations, trade, and power across regions.',
    highlight: 'Global Systems Thinking'
  },
  {
    id: 'hobby-space',
    title: 'Space',
    category: 'ASTRONOMY',
    iconName: 'Sparkles',
    description: 'Following space exploration, astrophysics, and the frontier of launch and orbital technology.',
    highlight: 'Space Exploration Follower'
  },
  {
    id: 'hobby-ocean',
    title: 'Deep Ocean',
    category: 'EXPLORATION',
    iconName: 'Compass',
    description: 'Fascinated by deep-sea exploration, marine biology, and the mysteries of the ocean floor.',
    highlight: 'Deep-Sea Documentaries'
  },
  {
    id: 'hobby-hindu-culture',
    title: 'Hindu Culture',
    category: 'HERITAGE',
    iconName: 'BookOpen',
    description: 'Engaging with Hindu philosophy, traditions, and festivals as part of cultural and personal grounding.',
    highlight: 'Philosophy & Traditions'
  }
];

export const PROFILE_DATA: ProfileInfo = {
  name: 'Sai Prasanth',
  callsign: 'OPERATIVE_SAI',
  taglineTitle: 'BACKEND & AI ENGINEER',
  mainTitle: 'SAI PRASANTH',
  subtitle: 'BACKEND & AI ENGINEER • PRODUCTION LLM AGENTS • PYTHON SERVICES • CLOUD SERVICES',
  level: 99,
  rank: 'CONQUEROR // BACKEND & AI',
  status: 'AVAILABLE FOR HIGH-IMPACT ROLES',
  location: 'Stafford, TX (Texas, US)',
  coordinates: '29.6161° N, 95.5577° W',
  serverPing: '16ms',
  serverRegion: 'US-CENTRAL // TEXAS-SEC-01',
  avatar: sai_avatar_pubg,
  characterImage: sai_avatar_pubg,
  vehicleImage: pubg_uaz_vehicle,
  titleBgImage: pubg_title_scene,
  lobbyBgImage: pubg_lobby_scene,
  shortBio: 'Backend & AI Engineer specialized in production LLM agents, high-throughput Python microservices',
  bio: 'I am a Backend & AI Engineer based in Stafford, Texas. I architect production-grade LLM autonomous agents, scalable Python microservices, distributed streaming backends, and safety-critical verification pipelines. My focus centers on reliable agent orchestration, sub-millisecond retrieval architectures, and deterministic test harnesses for non-deterministic AI systems.',
  yearsOfExperience: '3+ Years',
  careerGoals: 'Building resilient autonomous agent swarms, sub-50ms distributed RAG engines, and verifiable safety-critical AI evaluation infrastructure.',
  personalInterests: [
    'PUBG Battlegrounds & Tactical Strategy',
    'Badminton & Cricket',
    'Cinema, Politics & Geopolitics',
    'Space & Deep Ocean Exploration',
    'Hindu Culture & Philosophy'
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
      degree: 'B.S. in Computer Science',
      institution: 'Lovely Professional University',
      year: '2017 – 2021',
      details: 'Focus on Distributed Systems, Advanced Data Structures, Machine Learning, and Backend Engineering.'
    },
    {
      degree: 'M.s. in Computer Science',
      institution: 'Texas A&M University - Corpus Christi',
      year: '2022 – 2023',
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
    id: 'traceguard',
    title: 'TraceGuard',
    codename: 'saiprasanth-git / traceguard',
    subtitle: 'Requirements traceability gate for safety-critical software (DO-178C style)',
    category: 'Safety & Tooling',
    year: '2026',
    clientOrStudio: 'Personal / Open Source',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/saiprasanth-git/traceguard',
    tags: ['Python 3.11+', 'Zero Dependencies', 'CI/CD', 'DO-178C'],
    description: 'A requirements traceability gate for safety-critical software. Reads requirement specs, @implements code annotations, and @verifies test annotations to resolve a bidirectional traceability graph, failing the build when the trace is broken.',
    features: [
      'Continuous enforcement of requirements-code-test traceability as a CI property',
      'Actionable failure codes (e.g. TG005-unimplemented-llr) pinpointing missing links',
      'Markdown, HTML, and JSON traceability reports for audit and review',
      'Waiver management for specific rules via traceguard.toml',
    ],
    resultsImpact: [
      'Turns manual traceability matrix maintenance into an automated CI check on every commit',
      'Zero third-party runtime dependencies, pure Python 3.11+ standard library',
    ],
    metrics: [
      { label: 'Dependencies', value: '0' },
      { label: 'Python', value: '3.11+' },
      { label: 'License', value: 'MIT' },
    ],
    featured: true,
  },
  {
    id: 'qsim',
    title: 'qsim — Quantum Circuit Simulator',
    codename: 'saiprasanth-git / quantum-simulator',
    subtitle: 'Zero-dependency quantum circuit simulator with cross-verified Python and JS engines',
    category: 'Backend & AI',
    year: '2026',
    clientOrStudio: 'Personal / Open Source',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/saiprasanth-git/quantum-simulator',
    tags: ['Python', 'NumPy', 'JavaScript', 'State-Vector Simulation'],
    description: 'A tiny, optimized state-vector quantum computer simulator with two engines — Python and browser JS — cross-verified to agree to machine epsilon (2.2 x 10^-16).',
    features: [
      'Reshaped strided views instead of matrix multiplication for O(2^n) time complexity',
      'Structure-aware kernels for diagonal, anti-diagonal, and dense gate matrices',
      'Projective measurement, shot-based sampling, expectation values, Bloch sphere visualization',
      'Interactive browser circuit builder with OpenQASM/Python export',
    ],
    resultsImpact: [
      'Python and JS engines cross-verified to machine precision',
      'No build steps, servers, or external installs beyond numpy',
    ],
    metrics: [
      { label: 'Precision', value: '2.2e-16' },
      { label: 'Engines', value: '2' },
      { label: 'Dependencies', value: 'numpy only' },
    ],
    featured: true,
  },
  {
    id: 'repomind',
    title: 'RepoMind',
    codename: 'saiprasanth-git / repomind',
    subtitle: 'Codebase-aware AI assistant that answers questions about any public GitHub repo',
    category: 'LLM Agents',
    year: '2026',
    clientOrStudio: 'Personal / Open Source',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/saiprasanth-git/repomind',
    tags: ['Python', 'TypeScript', 'FastAPI', 'React', 'pgvector', 'Gemini 1.5 Pro', 'LangChain'],
    description: 'Paste any public GitHub URL and ask questions about the code in plain English, with answers cited to exact files and line numbers. Also a research harness comparing RAG vs. Long-Context architectures for code understanding.',
    features: [
      'Talks to a GitHub repository as if it were a senior engineer',
      'Dual architecture analysis: RAG chunk retrieval vs. full-repo long-context',
      'Ingestion pipeline that clones, parses, chunks, embeds, and stores repo code',
      'REST endpoints for indexing repos, retrieving file trees, and querying details',
    ],
    resultsImpact: [
      'Evaluation harness comparing performance, cost, and accuracy across approaches',
      'Deployed on GCP Cloud Run with PostgreSQL + pgvector',
    ],
    metrics: [
      { label: 'Vector DB', value: 'pgvector' },
      { label: 'LLM', value: 'Gemini 1.5 Pro' },
      { label: 'Infra', value: 'Cloud Run' },
    ],
    featured: true,
  },
  {
    id: 'snapstore',
    title: 'SnapStore',
    codename: 'saiprasanth-git / Snapstore',
    subtitle: 'AI-powered visual e-commerce platform turning product photos into shoppable storefronts',
    category: 'Creative Web',
    year: '2026',
    clientOrStudio: 'Personal / Hackathon',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/saiprasanth-git/Snapstore',
    tags: ['React 18', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe'],
    description: 'Small business owners upload a product photo and description; an AI generates titles, descriptions, pricing, and SEO tags, turning it into a live shoppable storefront in seconds with Stripe checkout.',
    features: [
      'AI listing generation: title, 150-word description, price, 5 SEO tags',
      'Drag & drop image uploads with editable listings and seller dashboard',
      'Responsive storefront with sidebar cart and Stripe checkout',
      'Secure authentication and revenue/order tracking for sellers',
    ],
    resultsImpact: [
      'End-to-end flow from photo upload to live checkout in seconds',
      'Built for the Build with MeDo hackathon',
    ],
    metrics: [
      { label: 'Frontend', value: 'React 18' },
      { label: 'Payments', value: 'Stripe' },
      { label: 'DB', value: 'Supabase' },
    ],
    featured: false,
  },
  {
    id: 'python-etl-pipeline',
    title: 'Python ETL Pipeline',
    codename: 'saiprasanth-git / python-etl-pipeline',
    subtitle: 'Production-style ETL pipeline with automated testing, Docker, and CI/CD',
    category: 'Backend & APIs',
    year: '2025',
    clientOrStudio: 'Personal / Open Source',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/saiprasanth-git/python-etl-pipeline',
    tags: ['Python', 'Docker', 'GitHub Actions', 'pytest'],
    description: 'A complete Extract-Transform-Load pipeline with structured logging, configurable data sources, schema validation, automated testing, Docker containerization, and multi-stage GitHub Actions CI/CD.',
    features: [
      'Configurable extraction from built-in datasets, CSV, or JSON',
      'Schema and null validation with custom exception handling',
      'Dockerized with multi-stage builds, non-root user, and healthchecks',
      'CI covering lint (black, isort, flake8, mypy) across Python 3.10-3.12',
    ],
    resultsImpact: [
      'Comprehensive pytest suite with coverage reporting',
      'Full CI/CD gate from lint to Docker build',
    ],
    metrics: [
      { label: 'Python', value: '93%' },
      { label: 'CI Matrix', value: '3.10-3.12' },
      { label: 'License', value: 'MIT' },
    ],
    featured: false,
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'Crusade Tech',
    role: 'Staff Backend & AI Engineer',
    dates: '2024 – PRESENT',
    location: 'Stafford, TX (Remote)',
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
  },
  {
    id: 'exp-2',
    company: 'Onspec',
    role: 'Backend Software Engineer',
    dates: '2020 – 2021',
    location: 'India, Hyd',
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
