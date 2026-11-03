/**
 * PROFILE & PORTFOLIO DATA CONFIGURATION
 * ----------------------------------------------------
 * Source-of-Truth: Saumya Pandya
 * B.Tech CSE Core (Class of 2029) | VIT Chennai
 * Development Member @ MIC VITC | GSSoC 2026 Contributor
 */

export const profileData = {
  personal: {
    name: "Saumya Pandya",
    title: "CSE @ VIT Chennai '29 | Full-Stack Developer | DSA & Machine Learning | Blockchain Enthusiast | GSSoC '26 Contributor | MIC Development @ VITC",
    pronouns: "he/him",
    tagline: "Engineering full-stack systems, applied AI, and open-source software.",
    bannerQuote: "I CODE THEREFORE I AM",
    avatarUrl: "./assets/user-portrait-2.png",
    secondaryAvatarUrl: "./assets/user-portrait-2.png",
    location: "Chennai, Tamil Nadu, India",
    availability: "Open for SDE internships & research",
    statusBadge: "CSE @ VIT Chennai '29",
    shortBio: "2nd year CSE grad at Vellore Institute of Technology Chennai. Development Member in MIC @VIT CHENNAI. GSSoC'26 Open Source Contributor. Full stack web dev. AIML. CP with 200+ leetcode solved.",
    email: "saumyapandyaartist@gmail.com",
    phone: "+91-7984641399",
    resumeUrl: "./assets/Saumya_Pandya_Resume.pdf",
    heroMetrics: [
      { value: "200+", label: "LeetCode Solved (91E / 80M / 29H)" },
      { value: "85 Days", label: "Max Daily Coding Streak" },
      { value: "1,440", label: "Contest Rating (4 Contests)" },
      { value: "8.53", label: "Academic CGPA @ VIT Chennai '29" }
    ],
    bioParagraphs: [
      "I'm Saumya Pandya, a second-year Computer Science student at VIT Chennai (Class of 2029, 8.53 CGPA) who loves building things end to end. I work across the full stack (React, databases, APIs), apply machine learning to real problems like demand forecasting and medical records, and explore blockchain through smart-contract projects.",
      "I'm a Development Member of the Microsoft Innovations Club at VIT Chennai, an open-source contributor in GirlScript Summer of Code 2026 (selected among 35,000+ applicants), and a consistent competitive programmer with 200+ LeetCode problems solved across 3 months of daily consistency.",
      "I care about writing clean, reliable code that actually works in production, keeping my daily coding streak active, and constantly learning through hands-on development. I'm actively looking for SDE internships, research opportunities, and collaborations in Chennai (on-site & hybrid) or remote."
    ]
  },

  themeAccents: [
    { id: "amber", name: "Solar Amber", color: "#d97706", glow: "rgba(217, 119, 6, 0.22)", text: "#d97706" },
    { id: "coral", name: "Radiant Coral", color: "#e04b2a", glow: "rgba(224, 75, 42, 0.22)", text: "#e04b2a" },
    { id: "sage", name: "Hyper Sage", color: "#0d9468", glow: "rgba(13, 148, 104, 0.22)", text: "#0d9468" },
    { id: "aurora", name: "Astral Violet", color: "#7c3aed", glow: "rgba(124, 58, 237, 0.22)", text: "#7c3aed" }
  ],

  projects: [
    {
      id: "aims",
      title: "AIMS — Autonomous Inventory & Demand Intelligence Platform",
      category: "Full-Stack & Applied ML",
      year: "2026",
      featured: true,
      tagline: "A full-stack inventory management system combining a 3NF normalized relational database with machine learning for demand forecasting and automated replenishment.",
      description: "Designed a 3NF schema with 11 entities, foreign keys, cascade rules, and CHECK constraints. Implemented double-entry ledger semantics for auditable stock movements and SQL views with a stock alert trigger (trg_stock_level_alert). Tested against 913,000 real sales records (Kaggle Store Item Demand dataset). Features scikit-learn regression forecasting, K-Means (K=3) ABC clustering, safety stock calculations, and an interactive B2B dashboard with role-based access control.",
      impact: "Simulated 913k+ transactions with zero ledger drift and automated safety-stock alerts.",
      tags: ["SQL", "Database Design", "Scikit-Learn", "K-Means", "React", "PostgreSQL", "Docker"],
      accentColor: "#d97706",
      mediaType: "interactive-preview",
      liveUrl: "https://github.com/SAMJOD07-devz",
      githubUrl: "https://github.com/SAMJOD07-devz",
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
      tags: ["Solidity 0.8.20", "Ethereum", "Hardhat", "React 18", "Ethers.js v6", "Three.js / R3F", "Web Audio API", "IndexedDB"],
      accentColor: "#f59e0b",
      mediaType: "interactive-preview",
      liveUrl: "https://github.com/SAMJOD07-devz/SoundChain-Blockchain",
      githubUrl: "https://github.com/SAMJOD07-devz/SoundChain-Blockchain",
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
      tagline: "Aadhaar-verified medical record architecture with Google Gemma 4 function calling and clinical RAG.",
      description: "Developed for the Google Gemma Hackathon ('Intelligence with Purpose' track, earning an official Participation Certificate from Google). Solves fragmented healthcare records in India through Aadhaar-verified centralization. Gemma 4 powers real function calling to extract diagnoses, medications, dosages, and follow-ups from unstructured clinical notes, cross-checks safety against patient allergies, and powers a RAG chatbot strictly grounded in verified health data.",
      impact: "Official Google Gemma Hackathon Participation Certificate; decision-support AI architecture.",
      tags: ["Google Gemma 4", "Function Calling", "Clinical RAG", "Healthcare AI", "TypeScript", "SQL", "AES Security"],
      accentColor: "#0d9468",
      mediaType: "interactive-preview",
      liveUrl: "https://national-health-vault-mu.vercel.app/",
      githubUrl: "https://github.com/SAMJOD07-devz/National-Health-Vault",
      stats: [
        { label: "AI Engine", value: "Gemma 4" },
        { label: "Inference Mode", value: "Function Calling" },
        { label: "Safety Guard", value: "Clinical RAG" }
      ],
      caseStudy: {
        challenge: "Patient history across India is fragmented across physical papers, lost prescriptions, and disconnected hospital silos, creating dangerous blindspots during emergencies.",
        solution: "Engineered a centralized, Aadhaar-verified medical vault with Google Gemma 4 deeply embedded into the pipeline. Deployed real function calling to convert raw, unstructured clinical notes into structured diagnosis, dosage, and allergy entities. Added safety cross-checks for drug interactions and built a RAG chatbot allowing patients to ask plain-language questions grounded strictly in verified records.",
        outcome: "Received official participation certificate from Google in the Gemma Hackathon; proved effective clinical decision-support AI with strict safety guardrails (decision-support, never autonomous)."
      }
    },
    {
      id: "orbitcheck",
      title: "Event Management — OrbitCheck",
      category: "Full-Stack & Event OS",
      year: "2026",
      featured: true,
      tagline: "Real-time campus event operating system and automated gate check-in platform, built for MIC & VIT Chennai.",
      description: "Engineered an automated webcam frame scanner using client-side canvas decoding with real-time database state synchronization. Achieved sub-2-second check-in speed, 3-second live metrics sync, and cryptographically signed 2D QR passes to prevent duplicate entries. Adopted by MIC at VIT Chennai for digital entry management workflows.",
      impact: "Adopted by Microsoft Innovations Club (MIC) @ VIT Chennai for campus summits.",
      tags: ["TypeScript", "React/Next.js", "Webcam QR Scanner", "SQL", "Real-Time Sync"],
      accentColor: "#e04b2a",
      mediaType: "interactive-preview",
      liveUrl: "https://mic-project-vtcs-2.vercel.app/",
      githubUrl: "https://github.com/SAMJOD07-devz/MIC-PROJECT",
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
      featured: false,
      tagline: "Zero-bloat personal portfolio and proof of journey: pure Vanilla JS, CSS tokens, and physics canvas.",
      description: "Built with pure Vanilla JavaScript, clean CSS design tokens, and a custom canvas physics background with zero framework bloat. Engineered as a proof of journey aggregating projects, verified LeetCode stats, skills, certifications, and academic trajectory with high tactile fidelity and 60fps performance.",
      impact: "Zero framework bloat, 100% responsive, sub-second initial load.",
      tags: ["Vanilla JS", "HTML Canvas", "CSS Tokens", "Interactive Physics", "Responsive Design"],
      accentColor: "#7c3aed",
      mediaType: "interactive-preview",
      liveUrl: "https://samjod07-devz.github.io/portfolio/",
      githubUrl: "https://github.com/SAMJOD07-devz/portfolio",
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
      tags: ["Python", "Multi-Agent AI", "LLM Orchestration", "Market APIs", "Data Pipelines"],
      accentColor: "#d97706",
      mediaType: "interactive-preview",
      liveUrl: "https://github.com/SAMJOD07-devz/Multi-Agent-Autonomous-Financial-Intelligence-System",
      githubUrl: "https://github.com/SAMJOD07-devz/Multi-Agent-Autonomous-Financial-Intelligence-System",
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
  ],

  capabilities: [
    {
      category: "Frontend Development & Spatial UI",
      icon: "orbit",
      description: "Building responsive, tactile web interfaces with modern React 18, Three.js 3D visualizers, clean CSS design tokens, and canvas graphics.",
      skills: [
        "React.js (React 18) & Vite",
        "Tailwind CSS & CSS Design Tokens",
        "Three.js & React Three Fiber (R3F)",
        "HTML5 Canvas Physics & Animations",
        "State Management & Spatial UI Systems"
      ]
    },
    {
      category: "Backend Systems & Database Modeling",
      icon: "code",
      description: "Architecting normalized relational databases with 3NF integrity, SQL triggers and views, alongside modular RESTful APIs and secure authentication.",
      skills: [
        "SQL & 3NF Relational Database Design",
        "PostgreSQL (Supabase-hosted)",
        "Triggers, Views & Double-Entry Ledger",
        "Node.js / Express & REST APIs",
        "JWT Auth, bcrypt & Role-Based Access Control"
      ]
    },
    {
      category: "Applied AI & Machine Learning",
      icon: "sparkles",
      description: "Integrating production-grade LLM function calling, retrieval-augmented generation (RAG), and statistical regression/clustering pipelines.",
      skills: [
        "Google Gemma 4 Function Calling",
        "Retrieval-Augmented Generation (RAG)",
        "scikit-learn (Regression Forecasting)",
        "K-Means (K=3) ABC Clustering",
        "Time-Series Backtesting (MAE, RMSE, WAPE)"
      ]
    },
    {
      category: "Blockchain, Web3 & Core CS",
      icon: "compass",
      description: "Writing secure Solidity smart contracts with BPS revenue splits, Web3 integrations, and daily competitive programming in C++ and Python.",
      skills: [
        "Solidity 0.8.20 & Ethereum Virtual Machine",
        "Hardhat & Ethers.js v6 Integration",
        "ERC-20 Tokens & ECDSA Signatures",
        "Data Structures & Algorithms (200+ LeetCode)",
        "Web Audio API & IndexedDB Browser Storage"
      ]
    }
  ],

  techStack: [
    { name: "Python", category: "Language", level: "92%" },
    { name: "C / C++", category: "Language", level: "95%" },
    { name: "JavaScript / ES6+", category: "Language", level: "94%" },
    { name: "SQL (3NF Design)", category: "Database", level: "92%" },
    { name: "Solidity 0.8.20", category: "Web3", level: "86%" },
    { name: "React.js (React 18)", category: "Frontend", level: "95%" },
    { name: "PostgreSQL / Supabase", category: "Database", level: "88%" },
    { name: "Google Gemma 4 & RAG", category: "Applied AI", level: "90%" },
    { name: "scikit-learn", category: "ML", level: "86%" },
    { name: "Three.js / R3F", category: "Frontend", level: "85%" },
    { name: "Hardhat & Ethers.js v6", category: "Web3", level: "88%" },
    { name: "Docker", category: "DevOps", level: "82%" }
  ],

  experience: [
    {
      period: "Sep 2026 — Present",
      role: "Development Member",
      company: "Microsoft Innovations Club (MIC) @ VIT Chennai",
      location: "Chennai, India (On-site)",
      description: "Core development member engineering campus platforms and event infrastructure. Engineered the OrbitCheck digital entry management system with client-side canvas QR decoding, sub-2-second check-in speed, and real-time database metric syncing."
    },
    {
      period: "May 2026 — Aug 2026",
      role: "Open Source Contributor",
      company: "GirlScript Summer of Code (GSSoC 2026)",
      location: "Remote / Open Source",
      description: "Selected among 35,000+ applicants (awarded official GSSoC 2026 Contributor badge). Contributing passionately across community open-source repositories, collaborating with maintainers on web platforms, developer tooling, and algorithmic workflows."
    },
    {
      period: "Jun 2025 — Jul 2029",
      role: "B.Tech Computer Science & Engineering (Core)",
      company: "Vellore Institute of Technology (VIT Chennai)",
      location: "Chennai, India",
      description: "Maintaining an 8.53 CGPA across rigorous coursework in Data Structures and Algorithms, Database Management Systems (SQL), Operating Systems, and Object-Oriented Software Design."
    },
    {
      period: "2025 — Present",
      role: "Competitive Programming & Problem Solving",
      company: "LeetCode & Codolio Hub",
      location: "Online",
      description: "Solved 200+ algorithmic problems across LeetCode (91 Easy, 80 Medium, 29 Hard) with an 85-day max daily streak, 1,440 contest rating across 4 contests, 129 active days, and 5 milestone badges including 100 Days Badge 2026 and DCC August 2026."
    }
  ],

  education: [
    {
      institution: "Vellore Institute of Technology (VIT Chennai)",
      degree: "B.Tech, Computer Science & Engineering (CSE Core)",
      period: "Jun 2025 – Jul 2029",
      grade: "8.53 CGPA",
      highlights: "School of Computer Science. Coursework in Advanced DSA, Database Systems (SQL), Operating Systems, and Object-Oriented Analysis."
    },
    {
      institution: "Shree P.V. Modi School",
      degree: "Higher Secondary Certificate (Class 12)",
      period: "Jun 2022 – May 2023",
      grade: "Grade A, 93%",
      highlights: "Science stream with mathematics and computer science fundamentals. Academic excellence award."
    }
  ],

  certifications: [
    {
      title: "Google Gemma Hackathon Participation Certificate",
      issuer: "Google",
      track: "Intelligence with Purpose Track",
      year: "2026",
      description: "Awarded by Google for engineering iNHV (Indian National Health Vault) utilizing Google Gemma 4 function calling, clinical cross-checking, and RAG.",
      badgeText: "Google Certified"
    },
    {
      title: "GSSoC 2026 Official Contributor Badge",
      issuer: "GirlScript Foundation",
      track: "Open Source Contributor Cohort",
      year: "2026",
      description: "Selected among 35,000+ applicants for the GirlScript Summer of Code 2026 contributor track.",
      badgeText: "Top Contributor"
    },
    {
      title: "LeetCode 100 Days Badge 2026 & DCC August Badge",
      issuer: "LeetCode",
      track: "Competitive Programming Milestones",
      year: "2026",
      description: "Completed 100 consecutive days of daily problem solving & 31/31 Daily Challenge Champion challenges including hard-tier algorithms.",
      badgeText: "100 Days + DCC"
    },
    {
      title: "Development Member — Microsoft Innovations Club",
      issuer: "MIC @ VIT Chennai",
      track: "Campus Systems Engineering",
      year: "2026",
      description: "Recognized for building OrbitCheck campus gate check-in operating system and full-stack event infrastructure.",
      badgeText: "Core Dev"
    }
  ],

  principles: [
    {
      number: "01",
      title: "Strong DSA & CS Foundations",
      description: "Frameworks change fast, but solid problem-solving stays. Practicing DSA regularly on LeetCode (200+ solved), understanding time-space trade-offs, and writing clean OOP in C++ and Python gives me the confidence to adapt to any stack."
    },
    {
      number: "02",
      title: "Build for Real People & Use Cases",
      description: "A project only matters if it genuinely works in practice. When building OrbitCheck for MIC campus events or AIMS for demand forecasting, the focus is real-time speed, reliable verification, and zero hassle for users."
    },
    {
      number: "03",
      title: "Clean, Maintainable Architecture",
      description: "Whether it's responsive React interfaces, clean REST APIs, or 3NF normalized SQL schemas, I like keeping code readable, data flow predictable, and components modular without unnecessary over-engineering."
    },
    {
      number: "04",
      title: "Consistency & Hands-On Growth",
      description: "Consistency beats cramming. Staying active with daily problem-solving (85-day streak), contributing to open source via GSSoC, and testing new ideas in AI and systems keeps my engineering momentum steady every single week."
    }
  ],

  presenceHub: {
    github: {
      username: "SAMJOD07-devz",
      handle: "@SAMJOD07-devz",
      url: "https://github.com/SAMJOD07-devz",
      status: "Active CSE Contributor",
      headline: "Development Member @ Microsoft Innovations Club (MIC) & GSSoC 2026 Contributor building full-stack, AI, OOPS, and blockchain architectures in C, C++, Python, JavaScript, and SQL.",
      stats: [
        { value: "9+", label: "Repositories" },
        { value: "GSSoC '26", label: "Open Source" },
        { value: "MIC VITC", label: "Dev Member" },
        { value: "Python • Web3", label: "Core Stack" }
      ],
      featuredRepos: [
        { name: "SoundChain-Blockchain", desc: "Ethereum royalty settlement protocol with 10,000 BPS splits, ERC-20 $LSTN, and 3D vinyl visualizer", language: "Solidity / React", url: "https://github.com/SAMJOD07-devz/SoundChain-Blockchain" },
        { name: "National-Health-Vault", desc: "Aadhaar-verified medical vault with Google Gemma 4 function calling & clinical RAG", language: "TypeScript / SQL", url: "https://github.com/SAMJOD07-devz/National-Health-Vault" },
        { name: "MIC-PROJECT", desc: "EventsManager & real-time QR gate pass check-in system for Microsoft Innovations Club", language: "TypeScript", url: "https://github.com/SAMJOD07-devz/MIC-PROJECT" },
        { name: "Multi-Agent-Autonomous-Financial-Intelligence-System", desc: "Autonomous AI financial multi-agent reasoning system delivering insights in <60s", language: "Python", url: "https://github.com/SAMJOD07-devz/Multi-Agent-Autonomous-Financial-Intelligence-System" }
      ]
    },
    linkedin: {
      name: "Saumya Pandya",
      handle: "in/saumya-pandya",
      url: "https://www.linkedin.com/in/saumya-pandya-5a0376369?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      status: "CSE @ VIT Chennai '29",
      headline: "CSE @ VIT Chennai '29 | Full-Stack Developer | DSA & Machine Learning | Blockchain Enthusiast | GSSoC '26 Contributor | MIC Development @ VITC",
      bannerQuote: "I CODE THEREFORE I AM",
      stats: [
        { value: "8.53", label: "CGPA @ VITC" },
        { value: "463+", label: "Connections" },
        { value: "2nd Yr", label: "B.Tech CSE" },
        { value: "Open", label: "To Work" }
      ],
      endorsements: [
        "Python", "Web Development", "C / C++", "React.js", "SQL & Database Design", "Blockchain & Solidity", "Machine Learning"
      ]
    },
    leetcode: {
      username: "SAUMYA_PANDYA2207",
      handle: "@SAUMYA_PANDYA2207",
      url: "https://leetcode.com/u/SAUMYA_PANDYA2207/",
      status: "85-Day Streak Active",
      potdStreak: "85 Days",
      activeDays: "129 Days",
      submissions: 303,
      contestRating: "1,440",
      contestsAttended: 4,
      headline: "Active daily problem solver on LeetCode with 200+ solved problems (91 Easy, 80 Medium, 29 Hard), 85-day max streak, 1,440 contest rating, and 5 milestone badges.",
      stats: [
        { value: "200+", label: "Problems Solved" },
        { value: "85 Days", label: "Max Daily Streak" },
        { value: "1,440", label: "Contest Rating" },
        { value: "129", label: "Total Active Days" }
      ],
      difficultyStats: [
        { label: "Easy", count: 91, percent: "45.5%", color: "#00b8a3" },
        { label: "Medium", count: 80, percent: "40.0%", color: "#ffaa00" },
        { label: "Hard", count: 29, percent: "14.5%", color: "#ef4743" }
      ],
      goals: [
        { title: "Problems Solved", current: 200, target: 300, percent: 67 },
        { title: "Contest Rating", current: 1440, target: 1600, percent: 90 },
        { title: "Contests Attended", current: 4, target: 10, percent: 40 }
      ],
      badges: [
        {
          name: "100 Days Badge 2026",
          category: "Annual Milestone",
          icon: "https://assets.leetcode.com/static_assets/others/100_1080_1080.png"
        },
        {
          name: "DCC August 2026 Badge",
          category: "31/31 Daily Challenges (incl. Hard)",
          icon: "https://assets.leetcode.com/static_assets/marketing/8.png"
        },
        {
          name: "50 Days Badge 2026",
          category: "Consistency Milestone",
          icon: "https://assets.leetcode.com/static_assets/others/50_1080_1080.png"
        }
      ],
      breakdown: {
        easy: 91,
        medium: 80,
        hard: 29,
        total: 200,
        submissions: 303
      }
    },
    codolio: {
      username: "SAMJOD",
      handle: "@SAMJOD",
      url: "https://codolio.com/profile/SAMJOD",
      status: "Verified Coder",
      headline: "Unified developer portfolio aggregating competitive programming streaks, contest ratings, and verified DSA progress.",
      stats: [
        { value: "SAMJOD", label: "Codolio ID" },
        { value: "Active", label: "DSA Streak" },
        { value: "Verified", label: "Profile" },
        { value: "Multi", label: "CP Hub" }
      ]
    }
  },

  socialLinks: [
    { platform: "GitHub", handle: "SAMJOD07-devz", url: "https://github.com/SAMJOD07-devz", icon: "github" },
    { platform: "LinkedIn", handle: "saumya-pandya", url: "https://www.linkedin.com/in/saumya-pandya-5a0376369?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: "linkedin" },
    { platform: "LeetCode", handle: "SAUMYA_PANDYA2207", url: "https://leetcode.com/u/SAUMYA_PANDYA2207/", icon: "leetcode" },
    { platform: "Codolio", handle: "SAMJOD", url: "https://codolio.com/profile/SAMJOD", icon: "codolio" }
  ]
};
