/**
 * PROFILE & PORTFOLIO DATA CONFIGURATION
 * ----------------------------------------------------
 * Configured for: Saumya Pandya
 * CSE Core 2nd Year | VIT Chennai
 */

export const profileData = {
  personal: {
    name: "Saumya Pandya",
    title: "2nd Year CSE (Core) Undergraduate | VIT Chennai",
    pronouns: "he/him",
    tagline: "Engineering full-stack architectures, autonomous AI multi-agent systems, and open-source software as a Development Member at Microsoft Innovations Club (MIC) and GSSoC 2026.",
    avatarUrl: "./assets/user-portrait-2.png",
    secondaryAvatarUrl: "./assets/user-portrait-2.png",
    location: "VIT Chennai, India",
    availability: "Open for SDE Internships, Research & Collabs",
    statusBadge: "2nd Year CSE Core • VIT Chennai",
    email: "saumyapandyaartist@gmail.com",
    phone: "+91-7984641399",
    resumeUrl: "./assets/Saumya_Pandya_Resume.pdf",
    heroMetrics: [
      { value: "2nd Yr", label: "B.Tech CSE Core @ VIT Chennai" },
      { value: "8.53", label: "Academic CGPA @ VIT Chennai" },
      { value: "63 POTD", label: "Daily LeetCode Streak" },
      { value: "133+", label: "Algorithms Solved (145+ Subs)" }
    ],
    bioParagraphs: [
      "I am a Computer Science & Engineering undergraduate at VIT Chennai (Class of 2029, 8.53 CGPA). Most of my week is spent building full-stack web projects, solving algorithmic challenges on LeetCode, and contributing to open-source through GSSoC 2026 and Microsoft Innovations Club (MIC).",
      "I enjoy building tools that solve practical problems—like OrbitCheck, a real-time event gate check-in system adopted for campus tech events, and an autonomous financial multi-agent reasoning pipeline in Python. My core foundations are in C++, Java, relational SQL modeling, and modern web architectures.",
      "I care about writing clean, reliable code that actually works in production, keeping my daily coding streak active, and constantly learning through hands-on development."
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
      title: "Event Management — OrbitCheck",
      category: "Full-Stack & Event OS",
      year: "2026",
      featured: true,
      tagline: "Real-time campus event operating system and automated gate check-in platform, built for MIC and VIT Chennai.",
      description: "Engineered an automated webcam frame scanner using client-side canvas decoding with real-time database state synchronization. Achieved sub-2-second check-in speed, 3-second live metrics sync, and cryptographically signed 2D QR passes to prevent duplicate entries. Adopted by MIC at VIT Chennai.",
      impact: "Adopted by MIC at VIT Chennai for its digital entry management workflow.",
      tags: ["TypeScript", "React/Next.js", "Webcam QR Scanner", "SQL", "Real-Time Sync"],
      accentColor: "#d97706",
      mediaType: "interactive-preview",
      liveUrl: "https://mic-project-vtcs-2.vercel.app/",
      githubUrl: "https://github.com/SAMJOD07-devz/MIC-PROJECT",
      stats: [
        { label: "Check-in Speed", value: "< 2.0s" },
        { label: "Metrics Sync", value: "3s Live" },
        { label: "Pass Security", value: "Signed 2D QR" }
      ],
      caseStudy: {
        challenge: "Real-time campus event operating system and automated gate check-in platform, built for MIC and VIT Chennai.",
        solution: "Engineered an automated webcam frame scanner using client-side canvas decoding with real-time database state synchronization.",
        outcome: "Achieved sub-2-second check-in speed, 3-second live metrics sync, and cryptographically signed 2D QR passes to prevent duplicate entries. Adopted by MIC at VIT Chennai for its digital entry management workflow."
      }
    },
    {
      id: "project-2",
      title: "Multi-Agent Autonomous Financial Intelligence",
      category: "Autonomous AI & Systems",
      year: "2026",
      featured: true,
      tagline: "A collaborative swarm of autonomous AI agents delivering fully cited financial intelligence in under 60 seconds.",
      description: "Built specialized agents for real-time news extraction, quantitative parsing, and risk modeling. Delivered comprehensive, 100% source-cited financial dossiers with complete transparency.",
      impact: "Delivered comprehensive, 100% source-cited financial dossiers in under 60 seconds.",
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
        challenge: "Retail investors lack institutional infrastructure to rapidly parse dense regulatory filings and volatile telemetry.",
        solution: "Built specialized agents for real-time news extraction, quantitative parsing, and risk modeling.",
        outcome: "Delivered comprehensive, 100% source-cited financial dossiers with complete transparency in under 60 seconds."
      }
    },
    {
      id: "project-3",
      title: "National Health Vault",
      category: "Secure Systems & Backend",
      year: "2026",
      featured: true,
      tagline: "Secure, centralized healthcare records management and digital vault architecture.",
      description: "Engineered an encrypted, role-based access vault with relational database design and patient dashboards. Delivered a modular, OOP-based backend with AES encryption and 100% data integrity.",
      impact: "Delivered a modular, OOP-based backend with AES encryption and 100% data integrity.",
      tags: ["TypeScript", "SQL", "AES Security", "Backend REST API"],
      accentColor: "#0d9468",
      mediaType: "interactive-preview",
      liveUrl: "https://national-health-vault-mu.vercel.app/",
      githubUrl: "https://github.com/SAMJOD07-devz/National-Health-Vault",
      stats: [
        { label: "Data Integrity", value: "100%" },
        { label: "Architecture", value: "Modular OOP" },
        { label: "Security Layer", value: "AES Encrypted" }
      ],
      caseStudy: {
        challenge: "Fragmented health records create latency and security vulnerabilities during emergency medical access.",
        solution: "Engineered an encrypted, role-based access vault with relational database design and patient dashboards.",
        outcome: "Delivered a modular, OOP-based backend with AES encryption and 100% data integrity."
      }
    },
    {
      id: "project-4",
      title: "Smart Irrigation IoT System",
      category: "IoT & Embedded Systems",
      year: "2025",
      featured: false,
      tagline: "Automated, telemetry-driven soil moisture monitoring and precision water management system.",
      description: "Built a microcontroller-based feedback loop in C/C++ integrating soil probes and automated solenoid valves. Achieved a 40% efficiency gain in water usage with under 250ms telemetry delay; showcased at the university IoT exhibition.",
      impact: "Achieved a 40% efficiency gain in water usage with under 250ms telemetry delay.",
      tags: ["C/C++", "IoT Sensors", "Embedded Systems", "Telemetry", "Algorithms"],
      accentColor: "#7c3aed",
      mediaType: "interactive-preview",
      liveUrl: "https://github.com/SAMJOD07-devz/smart-irrigation-system-iot",
      githubUrl: "https://github.com/SAMJOD07-devz/smart-irrigation-system-iot",
      stats: [
        { label: "Efficiency Gain", value: "40%" },
        { label: "Telemetry Delay", value: "< 250ms" },
        { label: "Core Stack", value: "C/C++" }
      ],
      caseStudy: {
        challenge: "Manual agricultural irrigation causes irregular moisture cycles and excessive water loss.",
        solution: "Built a microcontroller-based feedback loop in C/C++ integrating soil probes and automated solenoid valves.",
        outcome: "Achieved a 40% efficiency gain in water usage with under 250ms telemetry delay; showcased at the university IoT exhibition."
      }
    }
  ],

  capabilities: [
    {
      category: "Frontend Development & Interactive UI",
      icon: "orbit",
      description: "Building responsive, interactive web applications with modern component structures, smooth animations, and clean CSS.",
      skills: ["React & Next.js Ecosystem", "TypeScript & Modern JavaScript", "Tailored CSS & Responsive Design Systems", "Spatial UI & Three.js / WebGL", "State Management & Performance Tuning"]
    },
    {
      category: "Backend Systems & Database Modeling",
      icon: "code",
      description: "Developing reliable backend services, clean RESTful APIs, and well-modeled relational databases with SQL.",
      skills: ["Node.js & Express Framework", "SQL (PostgreSQL / MySQL)", "Database Modeling & Complex Queries", "RESTful API Design & Integration", "Server-side Optimization"]
    },
    {
      category: "Object-Oriented Programming & DSA",
      icon: "compass",
      description: "Practicing algorithms and data structures daily on LeetCode, and applying clean OOP patterns across C++, Java, and Python.",
      skills: ["C & C++ (DSA & Memory Management)", "Java (Object-Oriented Design & Principles)", "Abstraction, Encapsulation, Polymorphism, Inheritance", "Algorithmic Problem Solving", "Time & Space Complexity Optimization"]
    },
    {
      category: "AI Agents & Emerging Systems",
      icon: "sparkles",
      description: "Experimenting with multi-agent reasoning pipelines in Python, smart contract fundamentals, and practical Web3 integrations.",
      skills: ["Python Multi-Agent Pipelines", "FastAPI & Automated Data Feeds", "Smart Contract Logic & Web3 Basics", "System Architecture & Security", "Continuous Integration & Deployment"]
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
      period: "July 2025 — May 2029",
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
      title: "Strong DSA & CS Foundations",
      description: "Frameworks change fast, but solid problem-solving stays. Practicing DSA regularly on LeetCode, understanding time-space trade-offs, and writing clean OOP in C++ and Java gives me the confidence to adapt to any stack."
    },
    {
      number: "02",
      title: "Build for Real People & Use Cases",
      description: "A project only matters if it genuinely works in practice. When building OrbitCheck for MIC campus events, the focus was real-time speed, reliable QR verification, and zero hassle for attendees at the door."
    },
    {
      number: "03",
      title: "Clean, Maintainable Architecture",
      description: "Whether it's responsive React interfaces, clean REST APIs, or structured SQL schemas, I like keeping code readable, data flow predictable, and components modular without unnecessary over-engineering."
    },
    {
      number: "04",
      title: "Consistency & Hands-On Growth",
      description: "Consistency beats cramming. Staying active with daily problem-solving, contributing to open source via GSSoC, and testing new ideas in AI and systems keeps my engineering momentum steady every single week."
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

