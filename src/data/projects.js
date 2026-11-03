/**
 * projects.js — Single Source of Truth for Saumya Pandya's Engineering Portfolio
 * Used by both the Home Page Horizontal Carousel and the Dedicated All Projects Archive.
 */

export const projectsData = [
  {
    id: "aims",
    title: "AIMS — Autonomous Inventory & Demand Intelligence Platform",
    category: "Full-Stack & Applied ML",
    year: "2026",
    featured: true,
    tagline: "A full-stack inventory management system combining a 3NF normalized relational database with machine learning for demand forecasting and automated replenishment.",
    description: "Designed a 3NF schema with 11 entities, foreign keys, cascade rules, and CHECK constraints. Implemented double-entry ledger semantics for auditable stock movements and SQL views with a stock alert trigger (trg_stock_level_alert). Tested against 913,000 real sales records (Kaggle Store Item Demand dataset). Features scikit-learn regression forecasting, K-Means (K=3) ABC clustering, safety stock calculations, and an interactive B2B dashboard with role-based access control.",
    impact: "Simulated 913k+ transactions with zero ledger drift and automated safety-stock alerts.",
    thumbnail: "./assets/projects/aims-preview.webp", // [PLACEHOLDER: Mockup WebP slot]
    thumbnailFallback: "aims", // uses interactive vector graphic fallback
    tech: ["SQL", "Database Design", "Scikit-Learn", "K-Means", "React", "PostgreSQL", "Docker"],
    tags: ["SQL", "Database Design", "Scikit-Learn", "K-Means", "React", "PostgreSQL", "Docker"],
    accentColor: "#d97706",
    mediaType: "interactive-preview",
    liveUrl: "https://github.com/SAMJOD07-devz", // [TO CONFIRM: Live deployment URL if hosted on Render/Railway]
    githubUrl: "https://github.com/SAMJOD07-devz",
    caseStudyUrl: "#case-study-modal",
    stats: [
      { label: "Sales Records", value: "913k+" },
      { label: "Schema Entities", value: "3NF (11)" },
      { label: "Clustering", value: "K=3 ABC" }
    ],
    caseStudy: {
      challenge: "Inaccurate inventory records, lack of auditability, and manual replenishment workflows cause high holding costs, stockouts, and unpredictable supply chain bottlenecks.",
      solution: "Engineered a normalized 3NF relational schema with 11 entities, CHECK constraints, and double-entry ledger semantics. Created SQL views and triggers for automated stock reorder alerts, queried against 913,000 sales records. Added scikit-learn regression for demand forecasting and K-Means ABC clustering for inventory prioritization.",
      outcome: "Delivered an interactive B2B dashboard with role-based access control (Admin, Manager, Staff), automated purchase-order approval workflows, and lead-time-aware safety stock calculations. Currently migrating to Supabase PostgreSQL with Docker containerization."
    }
  },
  {
    id: "soundchain",
    title: "SoundChain — Blockchain Music Royalty Platform",
    category: "Blockchain & Web3",
    year: "2026",
    featured: true,
    tagline: "Every stream, split the moment it's paid — Ethereum royalty settlement protocol.",
    description: "An Ethereum-based music platform designed to make royalty distribution transparent and automated. Smart contracts split payments among artists, producers, and songwriters using a 10,000 Basis Points (BPS) system in ETH and USDC. Features Listen-to-Earn ERC-20 utility token ($LSTN) with ECDSA signatures, replay protection, and anti-bot verification, alongside a 3D vinyl visualizer built with Three.js and React Three Fiber powered by the Web Audio API.",
    impact: "18 passing Hardhat unit tests with instant BPS splits in ETH/USDC.",
    thumbnail: "./assets/projects/soundchain-preview.webp", // [PLACEHOLDER: Mockup WebP slot]
    thumbnailFallback: "soundchain",
    tech: ["Solidity 0.8.20", "Ethereum", "Hardhat", "React 18", "Ethers.js v6", "Three.js / R3F", "Web Audio API", "IndexedDB"],
    tags: ["Solidity 0.8.20", "Ethereum", "Hardhat", "React 18", "Ethers.js v6", "Three.js / R3F", "Web Audio API", "IndexedDB"],
    accentColor: "#f59e0b",
    mediaType: "interactive-preview",
    liveUrl: "https://github.com/SAMJOD07-devz/SoundChain-Blockchain",
    githubUrl: "https://github.com/SAMJOD07-devz/SoundChain-Blockchain",
    caseStudyUrl: "#case-study-modal",
    stats: [
      { label: "Royalty Engine", value: "10,000 BPS" },
      { label: "Hardhat Tests", value: "18 Passing" },
      { label: "Utility Token", value: "ERC-20 $LSTN" }
    ],
    caseStudy: {
      challenge: "Traditional music streaming royalties suffer from opaque accounting, multi-month payout lags, and high middleman fees that disadvantage creators.",
      solution: "Authored Solidity 0.8.20 smart contracts on Ethereum distributing royalties instantaneously via a 10,000 Basis Points (BPS) mechanism supporting both ETH and USDC. Built a Listen-to-Earn utility token ($LSTN) protected by ECDSA oracle signatures, replay protection, and duration verification. Paired with a 3D vinyl visualizer using Three.js, React Three Fiber, and Web Audio API with IndexedDB browser-side audio storage.",
      outcome: "Verified contract security with 18 passing Hardhat unit tests covering reentrancy, revenue splits, and signature validation, integrated with MetaMask via Ethers.js v6."
    }
  },
  {
    id: "inhv",
    title: "iNHV — Indian National Health Vault",
    category: "Applied AI & Healthcare",
    year: "2026",
    featured: true,
    tagline: "Sovereign, patient-owned health records powered by Google Gemma 4 AI function calling.",
    description: "A centralized digital health repository designed for India's healthcare ecosystem. Implemented Google Gemma 4 with structured function calling to extract clinical parameters from unstructured doctor notes and lab reports. Features clinical RAG for multi-document patient history summarization, Aadhaar-derived cryptographic patient identifiers, and AES-256 encrypted emergency data access.",
    impact: "Clinical RAG & Gemma 4 function calling on Aadhaar-derived encrypted health vaults.",
    thumbnail: "./assets/projects/inhv-preview.webp", // [PLACEHOLDER: Mockup WebP slot]
    thumbnailFallback: "inhv",
    tech: ["Google Gemma 4", "Function Calling", "Clinical RAG", "Healthcare AI", "TypeScript", "SQL", "AES Security"],
    tags: ["Google Gemma 4", "Function Calling", "Clinical RAG", "Healthcare AI", "TypeScript", "SQL", "AES Security"],
    accentColor: "#0d9468",
    mediaType: "interactive-preview",
    liveUrl: "https://github.com/SAMJOD07-devz/INHV",
    githubUrl: "https://github.com/SAMJOD07-devz/INHV",
    caseStudyUrl: "#case-study-modal",
    stats: [
      { label: "Intelligence", value: "Gemma 4 RAG" },
      { label: "Encryption", value: "AES-256" },
      { label: "Architecture", value: "Sovereign Vault" }
    ],
    caseStudy: {
      challenge: "Fragmented paper records, delayed emergency access, and unstructured clinical notes cause diagnostic errors and administrative drag across Indian hospitals.",
      solution: "Engineered an encrypted health records vault using Google Gemma 4 function calling to automatically parse unstructured prescriptions and discharge summaries into standardized clinical schema. Added retrieval-augmented generation (RAG) to query longitudinal patient histories safely.",
      outcome: "Architected a sovereign health record vault prototype supporting role-based emergency access with cryptographic audit trails and Aadhaar pseudonymization."
    }
  },
  {
    id: "orbitcheck",
    title: "Event Management — OrbitCheck",
    category: "Full-Stack & Event OS",
    year: "2026",
    featured: true,
    tagline: "Sub-2-second QR scanner and live attendee telemetry engine built for Microsoft Innovations Club.",
    description: "A high-concurrency event check-in and attendee management operating system engineered for campus tech summits. Features sub-2-second in-browser webcam barcode scanning, 3-second live metrics sync, and cryptographically signed 2D QR passes to prevent duplicate entries. Adopted by MIC at VIT Chennai for digital entry management workflows.",
    impact: "Adopted by Microsoft Innovations Club (MIC) @ VIT Chennai for campus summits.",
    thumbnail: "./assets/projects/orbitcheck-preview.webp", // [PLACEHOLDER: Mockup WebP slot]
    thumbnailFallback: "orbitcheck",
    tech: ["TypeScript", "React/Next.js", "Webcam QR Scanner", "SQL", "Real-Time Sync"],
    tags: ["TypeScript", "React/Next.js", "Webcam QR Scanner", "SQL", "Real-Time Sync"],
    accentColor: "#e04b2a",
    mediaType: "interactive-preview",
    liveUrl: "https://mic-project-vtcs-2.vercel.app/",
    githubUrl: "https://github.com/SAMJOD07-devz/MIC-PROJECT",
    caseStudyUrl: "#case-study-modal",
    stats: [
      { label: "Check-in Speed", value: "< 2.0s" },
      { label: "Metrics Sync", value: "3s Live" },
      { label: "Pass Security", value: "Signed 2D QR" }
    ],
    caseStudy: {
      challenge: "Campus events face severe entry congestion, duplicate ticket sharing, and latency when reconciling attendance lists at scale.",
      solution: "Built a real-time event OS with in-browser webcam barcode/QR decoding, cryptographically signed digital passes, and instant server state synchronization.",
      outcome: "Achieved sub-2-second scan verification with 3-second live attendee dashboard synchronization; officially adopted by Microsoft Innovations Club (MIC) @ VIT Chennai."
    }
  },
  {
    id: "portfolio",
    title: "Personal Portfolio (v1 & Spatial v2)",
    category: "Spatial Web & Systems",
    year: "2026",
    featured: true,
    tagline: "Zero-bloat personal portfolio and proof of journey: pure Vanilla JS, CSS tokens, and physics canvas.",
    description: "Built with pure Vanilla JavaScript, clean CSS design tokens, and a custom canvas physics background with zero framework bloat. Engineered as a proof of journey aggregating projects, verified LeetCode stats, skills, certifications, and academic trajectory with high tactile fidelity and 60fps performance.",
    impact: "Zero framework bloat, 100% responsive, sub-second initial load.",
    thumbnail: "./assets/projects/portfolio-preview.webp", // [PLACEHOLDER: Mockup WebP slot]
    thumbnailFallback: "portfolio",
    tech: ["Vanilla JS", "HTML Canvas", "CSS Tokens", "Interactive Physics", "Responsive Design"],
    tags: ["Vanilla JS", "HTML Canvas", "CSS Tokens", "Interactive Physics", "Responsive Design"],
    accentColor: "#7c3aed",
    mediaType: "interactive-preview",
    liveUrl: "https://samjod07-devz.github.io/portfolio/",
    githubUrl: "https://github.com/SAMJOD07-devz/portfolio",
    caseStudyUrl: "#case-study-modal",
    stats: [
      { label: "Framework Bloat", value: "0 kB" },
      { label: "Canvas Engine", value: "60 FPS" },
      { label: "Responsive", value: "100%" }
    ],
    caseStudy: {
      challenge: "Modern portfolio templates are often bloated with megabytes of JavaScript frameworks, slow load times, and generic layouts that fail to represent real engineering skills.",
      solution: "Engineered a lightweight, tactile portfolio from scratch using pure Vanilla JavaScript, CSS design tokens, and a custom spatial physics particle canvas background.",
      outcome: "Instant load times, smooth 60fps physics interactions, and an extensible architecture designed to record every milestone of Saumya's engineering trajectory."
    }
  },
  {
    id: "multiagent",
    title: "Multi-Agent Autonomous Financial Intelligence",
    category: "Autonomous AI & Systems",
    year: "2026",
    featured: false,
    tagline: "A collaborative swarm of autonomous AI agents delivering fully cited financial intelligence in under 60 seconds.",
    description: "Built specialized agents for real-time news extraction, quantitative parsing, and risk modeling. Delivered comprehensive, 100% source-cited financial dossiers with complete transparency.",
    impact: "Delivered comprehensive, 100% source-cited financial dossiers in under 60 seconds.",
    thumbnail: "./assets/projects/multiagent-preview.webp", // [PLACEHOLDER: Mockup WebP slot]
    thumbnailFallback: "multiagent",
    tech: ["Python", "Multi-Agent AI", "LLM Orchestration", "Market APIs", "Data Pipelines"],
    tags: ["Python", "Multi-Agent AI", "LLM Orchestration", "Market APIs", "Data Pipelines"],
    accentColor: "#d97706",
    mediaType: "interactive-preview",
    liveUrl: "https://github.com/SAMJOD07-devz/Multi-Agent-Autonomous-Financial-Intelligence-System",
    githubUrl: "https://github.com/SAMJOD07-devz/Multi-Agent-Autonomous-Financial-Intelligence-System",
    caseStudyUrl: "#case-study-modal",
    stats: [
      { label: "Execution Latency", value: "< 60s" },
      { label: "Agent Pipeline", value: "Multi-Agent" },
      { label: "Citation Index", value: "100% Sourced" }
    ],
    caseStudy: {
      challenge: "Retail investors lack institutional infrastructure to rapidly parse dense regulatory filings and volatile telemetry.",
      solution: "Built specialized agents for real-time news extraction, quantitative parsing, and risk modeling.",
      outcome: "Delivered comprehensive, 100% source-cited financial dossiers with complete transparency in under 60 seconds."
    }
  }
];

