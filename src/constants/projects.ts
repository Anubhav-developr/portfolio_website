import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    name: "ExamPulse",
    kicker: "Android quiz engine",
    description:
      "Production-ready Android quiz and exam-preparation app with offline-first MVVM, Hilt, Room, WorkManager, and Lottie animations.",
    longDescription:
      "Built for fast exam prep loops with Room persistence, MPAndroidChart analytics, background sync, and a clean codebase ready for Google Play deployment.",
    tech: ["Java", "MVVM", "Room", "Hilt", "WorkManager", "Lottie"],
    proof: ["Offline-first architecture", "Dependency-injected MVVM", "Analytics-ready UX"],
    tone: "pulse",
    accent: "#6388ff",
    github: "https://github.com/Anubhav-developr/MY_College-AKTU-MCQer"
  },
  {
    name: "Post Office Account Management System",
    kicker: "Python finance system",
    description:
      "Python and MySQL finance app for post office account workflows: deposits, customer records, balances, and office-grade reporting.",
    longDescription:
      "Models structured financial operations with searchable customer data, transaction history, account ledger flows, and disciplined persistence for savings-account style workflows.",
    tech: ["Python", "MySQL", "Tkinter", "Finance Logic", "Reporting"],
    proof: ["Account ledger flows", "Customer record search", "Deposit and balance tracking"],
    tone: "postoffice",
    accent: "#a78bfa",
    github: "https://github.com/Anubhav-developr/post-office-account-system2"
  },
  {
    name: "Tic-Tac-Toe Minimax AI",
    kicker: "Adversarial search",
    description:
      "AI-powered tic-tac-toe with minimax and alpha-beta pruning for strategic move selection in Python and C++.",
    longDescription:
      "Explores adversarial search trees, pruning efficiency, and evaluation heuristics with a playable board that visualises how the AI chooses winning lines.",
    tech: ["Python", "C++", "Minimax", "Alpha-beta", "Arduino"],
    proof: ["Pruned search trees", "Alpha-beta optimisation", "Playable AI opponent"],
    tone: "tree",
    accent: "#38bdf8",
    github: "https://github.com/Anubhav-developr/Tic_tac_toe_AI_Arudieno"
  },
  {
    name: "Custom Language Interpreter",
    kicker: "Compiler design lab",
    description:
      "Lexer, parser, and AST pipeline for a custom language interpreter built from compiler design fundamentals.",
    longDescription:
      "Covers tokenization, grammar handling, AST construction, and execution-ready structure as a full compiler front-end demo.",
    tech: ["Lexer", "Parser", "AST", "C++", "Compiler Design"],
    proof: ["Token stream design", "Grammar-driven parsing", "AST visualisation"],
    tone: "compiler",
    accent: "#f4f0e8",
    github: "https://github.com/Anubhav-developr/CPP-Programs-"
  },
  {
    name: "ClipboardMig",
    kicker: "Cross-device sync",
    description:
      "Real-time phone-to-PC clipboard synchronisation using an Android client, Chrome extension, and Firebase backend.",
    longDescription:
      "Eliminates the friction of sharing text across devices with a Firebase-backed pipeline connecting mobile and browser clients in real time.",
    tech: ["Android", "Chrome Extension", "Firebase", "JavaScript"],
    proof: ["Real-time sync", "Multi-platform clients", "Firebase backend"],
    tone: "clipboard",
    accent: "#6388ff",
    github: "https://github.com/Anubhav-developr/clipboardMIG"
  },
  {
    name: "Invofly",
    kicker: "Invoice generator",
    description:
      "Cross-platform invoice generator with PDF export, local storage persistence, multi-currency support, and seamless sharing.",
    longDescription:
      "Targets freelancers and small businesses with a React Native interface, share-ready exports, and durable local records.",
    tech: ["React Native", "PDF Export", "Local Storage", "Multi-currency"],
    proof: ["PDF generation", "Multi-currency flows", "Share-ready exports"],
    tone: "invoice",
    accent: "#a78bfa",
    github: "https://github.com/Anubhav-developr/invofly"
  },
  {
    name: "OrbitCast Nova Lite",
    kicker: "Weather and satellite app",
    description:
      "Weather application integrating live NASA and ISRO satellite content, multi-day forecasts, and on-device PDF reports.",
    longDescription:
      "Combines satellite imagery, forecast data, and on-device report generation inside a polished Android experience.",
    tech: ["Android", "NASA API", "ISRO API", "PDF Generation"],
    proof: ["Live satellite feeds", "Multi-day forecasts", "On-device PDF reports"],
    tone: "weather",
    accent: "#38bdf8",
    github: "https://github.com/Anubhav-developr/ISRO_NASA_Weather_App"
  },
  {
    name: "PeacePages",
    kicker: "Mindfulness journal",
    description:
      "Mindfulness and journaling app with clean MVVM architecture, Firebase authentication, Firestore sync, and Room caching.",
    longDescription:
      "Built for daily reflection with local offline support, cloud sync, and a Firebase-backed identity layer.",
    tech: ["Java", "MVVM", "Firebase", "Firestore", "Room"],
    proof: ["Firebase auth", "Cloud sync", "Offline Room cache"],
    tone: "journal",
    accent: "#a78bfa",
    github: "https://github.com/Anubhav-developr/peacePages"
  },
  {
    name: "Premium Portfolio Website",
    kicker: "This site",
    description:
      "Cinematic personal portfolio with hero video, startup animation, GPU-friendly interactions, custom cursor, and responsive motion.",
    longDescription:
      "Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion, then tuned as a premium visual system for public presentation.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    proof: ["Cinematic hero video", "Startup animation", "Custom cursor"],
    tone: "portfolio",
    accent: "#38bdf8",
    github: "https://github.com/Anubhav-developr/portfolio_website",
    liveUrl: "https://portfolio-website-anubhavdeveloprs-projects.vercel.app"
  }
];
