import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    name: "ExamPulse",
    kicker: "Android quiz engine",
    description:
      "Production-ready Android quiz app with offline-first MVVM, Hilt, WorkManager, and Lottie animations.",
    longDescription:
      "Built for fast exam prep loops with Room persistence, MPAndroidChart analytics, background sync, and a clean codebase ready for Google Play.",
    tech: ["Java", "MVVM", "Room", "Hilt", "WorkManager", "Lottie"],
    proof: ["Offline-first architecture", "Dependency-injected MVVM", "Play Store ready"],
    tone: "pulse",
    accent: "#c9ff64",
    github: "https://github.com/Anubhav-developr/MY_College-AKTU-MCQer"
  },
  {
    name: "Post Office Account Management",
    kicker: "Android finance app",
    description:
      "Android app for India Post savings account workflows — deposits, customer records, balances, and office-grade reporting.",
    longDescription:
      "Models structured financial operations for post office account management with searchable customer records, transaction history, and disciplined data integrity on Android.",
    tech: ["Android", "Java", "SQLite", "Material Design", "MVVM"],
    proof: ["Account ledger flows", "Customer record search", "Deposit & balance tracking"],
    tone: "postoffice",
    accent: "#c47b4d",
    github: "https://github.com/Anubhav-developr/post-office-account-system2"
  },
  {
    name: "Tic-Tac-Toe Minimax AI",
    kicker: "Adversarial search",
    description:
      "AI-powered tic-tac-toe with minimax and alpha-beta pruning — strategic move selection in Python and C++.",
    longDescription:
      "Explores adversarial search trees, pruning efficiency, and evaluation heuristics with a playable board that visualises how the AI chooses winning lines.",
    tech: ["Python", "C++", "Minimax", "Alpha-beta", "Arduino"],
    proof: ["Pruned search trees", "Alpha-beta optimisation", "Playable AI opponent"],
    tone: "tree",
    accent: "#4dd4bd",
    github: "https://github.com/Anubhav-developr/Tic_tac_toe_AI_Arudieno"
  },
  {
    name: "Custom Language Interpreter",
    kicker: "Compiler design lab",
    description:
      "A lexer, parser, and AST pipeline for a custom language interpreter built from compiler design fundamentals.",
    longDescription:
      "Tokenization, grammar handling, AST construction, and execution-ready structure — a full compiler front-end demo with animated token flow and tree building.",
    tech: ["Lexer", "Parser", "AST", "C++", "Compiler Design"],
    proof: ["Token stream design", "Grammar-driven parsing", "AST visualisation"],
    tone: "compiler",
    accent: "#f4f0e8",
    github: "https://github.com/Anubhav-developr/CPP-Programs-"
  },
  {
    name: "ClipboardMig",
    kicker: "Cross-device sync",
    description: "Real-time phone-to-PC clipboard sync via Android client, Chrome extension, and Firebase.",
    longDescription:
      "Eliminates friction when sharing text across devices with a Firebase-backed pipeline connecting mobile and browser in real time.",
    tech: ["Android", "Chrome Extension", "Firebase", "JavaScript"],
    proof: ["Real-time sync", "Multi-platform clients", "Firebase backend"],
    tone: "clipboard",
    accent: "#6388ff",
    github: "https://github.com/Anubhav-developr/clipboardMIG"
  },
  {
    name: "Invofly",
    kicker: "Invoice generator",
    description: "Cross-platform invoice app with PDF export, multi-currency support, and local persistence.",
    longDescription:
      "Targets freelancers and small businesses with seamless sharing, React Native UI, and on-device storage.",
    tech: ["React Native", "PDF Export", "Local Storage", "Multi-currency"],
    proof: ["PDF generation", "Multi-currency flows", "Share-ready exports"],
    tone: "invoice",
    accent: "#a78bfa",
    github: "https://github.com/Anubhav-developr/invofly"
  },
  {
    name: "OrbitCast Nova Lite",
    kicker: "Weather & satellite app",
    description: "Weather app integrating NASA and ISRO satellite content with multi-day forecasts and PDF reports.",
    longDescription:
      "Combines live satellite imagery, forecast data, and on-device PDF report generation in a polished Android experience.",
    tech: ["Android", "NASA API", "ISRO API", "PDF Generation"],
    proof: ["Live satellite feeds", "Multi-day forecasts", "On-device PDF reports"],
    tone: "weather",
    accent: "#38bdf8",
    github: "https://github.com/Anubhav-developr/ISRO_NASA_Weather_App"
  },
  {
    name: "PeacePages",
    kicker: "Mindfulness journal",
    description: "Mindfulness and journaling app with MVVM, Firebase auth, Firestore sync, and Room caching.",
    longDescription:
      "Clean architecture for daily reflection with cloud sync, local offline support, and Firebase-backed authentication.",
    tech: ["Java", "MVVM", "Firebase", "Firestore", "Room"],
    proof: ["Firebase auth", "Cloud sync", "Offline Room cache"],
    tone: "journal",
    accent: "#c9a0ff",
    github: "https://github.com/Anubhav-developr/peacePages"
  },
  {
    name: "Premium Portfolio Website",
    kicker: "This site",
    description:
      "Award-quality portfolio with cinematic background, GPU animations, custom cursor, and Lighthouse 100 score.",
    longDescription:
      "Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion — deployed on Vercel with production-grade performance.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    proof: ["Cinematic hero video", "Custom cursor", "Lighthouse 100"],
    tone: "portfolio",
    accent: "#38bdf8",
    github: "https://github.com/Anubhav-developr/portfolio_website",
    liveUrl: "https://portfolio-website-anubhavdeveloprs-projects.vercel.app"
  }
];
