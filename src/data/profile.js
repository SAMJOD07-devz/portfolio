/**
 * PROFILE & PORTFOLIO DATA CONFIGURATION
 * ----------------------------------------------------
 * Configured for: Saumya Pandya
 * CSE Core 2nd Year | VIT Chennai
 */

export const profileData = {
  personal: {
    name: "Saumya Pandya",
    title: "CSE Core Undergraduate & Creative Technologist",
    pronouns: "he/him",
    tagline: "Engineering full-stack architectures, autonomous AI multi-agent systems, and open-source software as a Development Member at Microsoft Innovations Club (MIC) and GSSoC 2026 Contributor.",
    avatarUrl: "./assets/user-portrait-1.png",
    secondaryAvatarUrl: "./assets/user-portrait-2.png",
    location: "VIT Chennai, India",
    availability: "Open for SDE Internships, Research & Collabs",
    statusBadge: "2nd Year CSE Core • VIT Chennai",
    email: "saumyapandyaartist@gmail.com",
    phone: "+91 98765 43210",
    resumeUrl: "#",
    heroMetrics: [
      { value: "2nd Yr", label: "B.Tech CSE Core @ VIT Chennai" },
      { value: "8.53", label: "Academic CGPA @ VIT Chennai" },
      { value: "63 POTD", label: "Daily LeetCode Streak" },
      { value: "133+", label: "Algorithms Solved (145+ Subs)" }
    ],
    bioParagraphs: [
      "I am a Computer Science & Engineering (CSE Core) 2nd-year undergraduate at Vellore Institute of Technology (VIT Chennai), maintaining an 8.53 CGPA, contributing to open-source through GSSoC 2026, and serving as a Development Member at Microsoft Innovations Club (MIC).",
      "My engineering spans Full-Stack web platforms (OrbitCheck EventsManager), Autonomous AI Multi-Agent reasoning systems, rigorous Object-Oriented Programming (OOPS) in C, C++, and Java, relational SQL database modeling, and decentralized Blockchain protocols.",
      "With 133+ algorithmic problems solved on LeetCode and active open-source contributions across GitHub, GSSoC, and Codolio, I build software characterized by speed, clean architecture, and responsive modern aesthetics."
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
      id: "project-1",
      title: "MIC EventsManager (OrbitCheck)",
      category: "Full Stack & Event OS",
      year: "2026",
      featured: true,
      tagline: "Real-time campus event operating system & automated gate check-in platform built for Microsoft Innovations Club (MIC) & VIT Chennai.",
      description: "Engineered a high-performance event platform integrating live club event discovery, duplicate-proof digital 2D QR passes, automated webcam video frame scanning, and live 3-second database metrics streaming.",
      impact: "Streamlined summit attendance and club entry verification with zero-queue webcam QR check-in.",
      tags: ["TypeScript", "React / Next.js", "Webcam QR Scanner", "SQL", "Real-Time"],
      accentColor: "#d97706",
      mediaType: "interactive-preview",
      liveUrl: "https://github.com/SAMJOD07-devz/MIC-PROJECT",
      githubUrl: "https://github.com/SAMJOD07-devz/MIC-PROJECT",
      stats: [
        { label: "Check-in Speed", value: "< 2.0s" },
        { label: "Metrics Sync", value: "3s Live" },
        { label: "Pass Security", value: "2D QR Signed" }
      ],
      caseStudy: {
        challenge: "Managing high-volume student check-ins at campus tech summits results in bottlenecks and duplicate ticket passes.",
        solution: "Engineered an automated webcam frame scanner with client-side canvas decoding and real-time database state synchronization.",
        outcome: "Adopted by Microsoft Innovations Club (MIC) at VIT Chennai for seamless digital entry management."
      }
    },
    {
      id: "project-2",
      title: "Multi-Agent Autonomous Financial Intelligence",
      category: "Autonomous AI & Systems",
      year: "2026",
      featured: true,
      tagline: "Eliminating market asymmetry through collaborative autonomous AI agents delivering cited financial intelligence in under 60 seconds.",
      description: "Orchestrated autonomous multi-agent reasoning pipelines that analyze live market feeds, SEC regulatory filings, and user risk profiles to deliver explainable, personalized investment intelligence.",
      impact: "Processes complex regulatory documentation and multi-source telemetry in sub-minute execution windows.",
      tags: ["Python", "Multi-Agent AI", "LLM Orchestration", "Market APIs", "Data Pipelines"],
      accentColor: "#e04b2a",
      mediaType: "interactive-preview",
      liveUrl: "https://github.com/SAMJOD07-devz/Multi-Agent-Autonomous-Financial-Intelligence-System",
      githubUrl: "https://github.com/SAMJOD07-devz/Multi-Agent-Autonomous-Financial-Intelligence-System",
      stats: [
        { label: "Execution Latency", value: "< 60s" },
        { label: "Agent Pipeline", value: "Multi-Agent" },
        { label: "Citation Index", value: "100% Sourced" }
      ],
      caseStudy: {
        challenge: "Retail investors lack the institutional infrastructure to rapidly parse dense regulatory filings and volatile telemetry.",
        solution: "Built a collaborative swarm of specialized AI agents for real-time news extraction, quantitative parsing, and risk modeling.",
        outcome: "Delivers comprehensive, cited financial intelligence dossiers with complete transparency."
      }
    },
    {
      id: "project-3",
      title: "National Health Vault",
      category: "Secure Systems & Backend",
      year: "2026",
      featured: true,
      tagline: "Secure centralized healthcare records management and digital vault architecture.",
      description: "Engineered a robust, privacy-compliant digital medical record vault featuring encrypted data streams, role-based access controls, and fast relational indexing.",
      impact: "Designed for seamless patient-doctor authentication and high-integrity medical audits.",
      tags: ["Full Stack", "TypeScript", "SQL", "Security", "Backend API"],
      accentColor: "#0d9468",
      mediaType: "interactive-preview",
      liveUrl: "https://github.com/SAMJOD07-devz/National-Health-Vault",
      githubUrl: "https://github.com/SAMJOD07-devz/National-Health-Vault",
      stats: [
        { label: "Data Integrity", value: "100%" },
        { label: "Architecture", value: "Modular OOPS" },
        { label: "Security Layer", value: "AES Encrypted" }
      ],
      caseStudy: {
        challenge: "Fragmented health records create latency and security vulnerabilities during emergency medical access.",
        solution: "Engineered an encrypted, role-based access vault with relational database design and intuitive patient dashboards.",
        outcome: "Clean modular repository structured with production-grade backend architecture."
      }
    },
    {
      id: "project-4",
      title: "Smart Irrigation IoT System",
      category: "IoT & Embedded Systems",
      year: "2025",
      featured: false,
      tagline: "Automated telemetry-driven soil moisture monitoring and precision water management.",
      description: "Developed an IoT sensing pipeline integrating hardware microcontrollers, telemetry sensors, and automated irrigation control with real-time analytics.",
      impact: "Reduced simulated water waste by 40% using automated threshold switching.",
      tags: ["C / C++", "IoT Sensors", "Embedded Systems", "Telemetry", "Algorithms"],
      accentColor: "#7c3aed",
      mediaType: "interactive-preview",
      liveUrl: "https://github.com/SAMJOD07-devz/smart-irrigation-system-iot",
      githubUrl: "https://github.com/SAMJOD07-devz/smart-irrigation-system-iot",
      stats: [
        { label: "Efficiency Gain", value: "~40%" },
        { label: "Telemetry Delay", value: "< 250ms" },
        { label: "Embedded Core", value: "C/C++" }
      ],
      caseStudy: {
        challenge: "Manual agricultural irrigation causes irregular moisture cycles and excessive water loss.",
        solution: "Built a microcontroller-based feedback loop in C++ with soil probes and automated solenoid valves.",
        outcome: "Showcased engineering prototype at university IoT exhibition."
      }
    }
  ],

  capabilities: [
    {
      category: "Frontend Development & Spatial UI",
      icon: "orbit",
      description: "Crafting highly responsive, interactive web applications with modern component architectures and fluid visual choreography.",
      skills: ["React & Next.js Ecosystem", "TypeScript & Modern JavaScript", "Tailored CSS & Responsive Design Systems", "Spatial UI & Three.js / WebGL", "State Management & Performance Tuning"]
    },
    {
      category: "Backend Systems & Database Design",
      icon: "code",
      description: "Engineering scalable server architectures, secure RESTful APIs, and optimized relational database models.",
      skills: ["Node.js & Express Framework", "SQL (PostgreSQL / MySQL)", "Database Modeling & Complex Queries", "RESTful API Design & Integration", "Server-side Optimization"]
    },
    {
      category: "Object-Oriented Programming (OOPS) & DSA",
      icon: "compass",
      description: "Applying strong OOPs design patterns, algorithmic optimization, and computational rigor across C, C++, and Java.",
      skills: ["C & C++ (DSA & Memory Management)", "Java (Object-Oriented Design & Principles)", "Abstraction, Encapsulation, Polymorphism, Inheritance", "Algorithmic Problem Solving", "Time & Space Complexity Optimization"]
    },
    {
      category: "Blockchain & Decentralized Systems",
      icon: "sparkles",
      description: "Exploring decentralized ledger technologies, smart contract logic, cryptographic hashing, and Web3 integration.",
      skills: ["Blockchain Architecture & Consensus", "Smart Contract Logic & Solidity Basics", "Decentralized Protocols & P2P Networks", "Cryptographic Primitives & Hashing", "Web3 Frontend & DApp Integration"]
    }
  ],

  techStack: [
    { name: "C / C++", category: "Language", level: "95%" },
    { name: "Java (OOPs)", category: "Language", level: "92%" },
    { name: "Python", category: "Language", level: "90%" },
    { name: "SQL", category: "Language", level: "90%" },
    { name: "Frontend (React/TS)", category: "Domain", level: "94%" },
    { name: "Backend (Node/REST)", category: "Domain", level: "88%" },
    { name: "OOPS & DSA", category: "Core CS", level: "95%" },
    { name: "Blockchain & Web3", category: "Domain", level: "85%" }
  ],

  experience: [
    {
      period: "2025 — Present",
      role: "B.Tech CSE Core Undergraduate (2nd Year)",
      company: "Vellore Institute of Technology (VIT Chennai)",
      location: "Chennai, India",
      description: "Pursuing rigorous academic curriculum in Computer Science & Engineering (Core), maintaining an 8.53 CGPA while mastering Advanced Data Structures, Operating Systems, Relational Database Management (SQL), and Object-Oriented Analysis."
    },
    {
      period: "2025 — Present",
      role: "Development Member",
      company: "Microsoft Innovations Club (MIC) @ VIT Chennai",
      location: "Chennai, India",
      description: "Engineered the OrbitCheck EventsManager web platform for campus tech summits, integrating duplicate-proof digital 2D QR passes, automated webcam gate verification, and real-time database metric syncing."
    },
    {
      period: "2026 — Present",
      role: "Open Source Contributor",
      company: "GirlScript Summer of Code (GSSoC 2026)",
      location: "Remote / Open Source",
      description: "Contributing to community open-source repositories, collaborating with maintainers on full-stack web platforms, developer tools, and algorithmic systems."
    },
    {
      period: "2025 — Present",
      role: "Competitive Programming & Problem Solving",
      company: "LeetCode & Codolio Hub",
      location: "Online",
      description: "Solved 133+ algorithmic problems across LeetCode and Codolio (69 Easy, 47 Medium, 17 Hard) with a 63-day POTD streak; active continuous coding in C++, Java, and Python."
    }
  ],

  principles: [
    {
      number: "01",
      title: "Strong OOPs & Fundamentals",
      description: "Technologies and frameworks evolve, but clean Object-Oriented design, memory management, and solid data structures remain timeless foundations."
    },
    {
      number: "02",
      title: "End-to-End System Harmony",
      description: "A great application requires seamless synergy between intuitive frontend interfaces, resilient backend APIs, and structured SQL databases."
    },
    {
      number: "03",
      title: "Decentralized & Resilient Logic",
      description: "Exploring blockchain and consensus primitives to build trustless, transparent, and fault-tolerant software architectures."
    },
    {
      number: "04",
      title: "Zero-Latency Performance",
      description: "Optimization is an engineering discipline. 60fps animations, efficient time complexity, and minimal bundle sizes are non-negotiable."
    }
  ],

  presenceHub: {
    github: {
      username: "SAMJOD07-devz",
      handle: "@SAMJOD07-devz",
      url: "https://github.com/SAMJOD07-devz",
      status: "Active CSE Contributor",
      headline: "Development Member @ Microsoft Innovations Club (MIC) & GSSoC 2026 Contributor building full-stack, AI, OOPS, and blockchain architectures in C, C++, Java, Python, and SQL.",
      stats: [
        { value: "9+", label: "Repos" },
        { value: "GSSoC", label: "2026 Contrib" },
        { value: "MIC", label: "Dev Member" },
        { value: "Python/TS", label: "Languages" }
      ],
      featuredRepos: [
        { name: "MIC-PROJECT", desc: "EventsManager & real-time QR gate pass check-in system for Microsoft Innovations Club", language: "TypeScript", url: "https://github.com/SAMJOD07-devz/MIC-PROJECT" },
        { name: "Multi-Agent-Autonomous-Financial-Intelligence-System", desc: "Autonomous AI financial multi-agent reasoning system delivering insights in <60s", language: "Python", url: "https://github.com/SAMJOD07-devz/Multi-Agent-Autonomous-Financial-Intelligence-System" },
        { name: "National-Health-Vault", desc: "Centralized medical records vault with secure encryption", language: "TypeScript / SQL", url: "https://github.com/SAMJOD07-devz/National-Health-Vault" },
        { name: "smart-irrigation-system-iot", desc: "Automated telemetry-driven soil moisture management system", language: "C++ / IoT", url: "https://github.com/SAMJOD07-devz/smart-irrigation-system-iot" }
      ]
    },
    linkedin: {
      name: "Saumya Pandya",
      handle: "in/saumya-pandya",
      url: "https://www.linkedin.com/in/saumya-pandya-5a0376369?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      status: "CSE Core 2nd Year",
      headline: "B.Tech CSE Core 2nd Year @ VIT Chennai (CGPA 8.53) | Frontend, Backend, OOPS, Blockchain | C, C++, Java, Python, SQL",
      stats: [
        { value: "8.53", label: "CGPA" },
        { value: "VIT", label: "Chennai" },
        { value: "2nd Yr", label: "B.Tech" },
        { value: "Core", label: "CSE Stream" }
      ],
      endorsements: [
        "Frontend Development", "Backend & SQL", "Object-Oriented Programming (OOPS)", "Blockchain Technology", "C / C++ / Java / Python"
      ]
    },
    leetcode: {
      username: "SAUMYA_PANDYA2207",
      handle: "@SAUMYA_PANDYA2207",
      url: "https://leetcode.com/u/SAUMYA_PANDYA2207/",
      status: "63-Day POTD Streak Active",
      potdStreak: "63 Days",
      activeDays: "80+ Days",
      headline: "Active daily problem solver on LeetCode with 63-day Problem-of-the-Day (POTD) continuous streak & 133+ verified algorithm solutions.",
      stats: [
        { value: "63 Days", label: "POTD Streak" },
        { value: "133", label: "Solved" },
        { value: "80+", label: "Active Days" },
        { value: "145+", label: "Submissions" }
      ],
      difficultyStats: [
        { label: "Easy", count: 69, percent: "52%", color: "#00b8a3" },
        { label: "Medium", count: 47, percent: "35%", color: "#ffaa00" },
        { label: "Hard", count: 17, percent: "13%", color: "#ef4743" }
      ],
      badges: [
        {
          name: "50 Days Badge 2026",
          category: "Annual Milestone",
          icon: "https://assets.leetcode.com/static_assets/others/50_1080_1080.png"
        },
        {
          name: "Monthly DCC Badge",
          category: "Daily Challenge Champion",
          icon: "https://assets.leetcode.com/static_assets/marketing/8.png"
        }
      ],
      breakdown: {
        easy: 69,
        medium: 47,
        hard: 17,
        total: 133,
        submissions: 145
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

