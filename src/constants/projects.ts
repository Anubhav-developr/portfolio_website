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
  },
{
  name: "CofWah – COVID-19 Awareness Platform",
  kicker: "Healthcare Information Experience",
  description:
    "A Hindi-language web application created to spread COVID-19 awareness, counter misinformation, and make verified healthcare resources easier to access.",
  longDescription:
    "CofWah is a socially driven health-awareness platform built for Hindi-speaking audiences. It simplifies complex COVID-19 information into accessible, user-friendly content, helping users understand common myths, safety practices, and vaccination resources without confusion. The experience is designed to feel trustworthy, calm, and clear, with a modern interface that supports public education through myth-busting content and vaccine discovery features.",
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "CoWIN API"],
  proof: [
    "Myth-busting content design",
    "Hindi-first user experience",
    "Vaccination resource discovery",
    "Accessible public-health storytelling"
  ],
  tone: "myth-buster",
  accent: "#38bdf8",
  github: "https://github.com/Anubhav-developr/cofwah",
  liveUrl: "https://cofwah.vercel.app/"
},
{
  name: "REC Sonbhadra – Official College Website",
  kicker: "Institutional Web Platform",
  description:
    "Contributed to the official website of Rajkiya Engineering College Sonbhadra, helping build and refine a public-facing institutional platform for students, faculty, notices, departments, and academic information.",
  longDescription:
    "Worked on the official REC Sonbhadra website as part of a private repository-based development workflow. The platform serves as the college’s public digital presence, covering institutional information, circulars, department pages, contact details, facilities, and placement-related content. My contribution focused on improving the web experience for a real educational institution, with attention to usability, structure, and production-oriented development practices.",
  tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  proof: [
    "Official institutional website contribution",
    "Private repository collaboration",
    "Public-facing academic content platform",
    "Production deployment for real users"
  ],
  tone: "institutional",
  accent: "#38bdf8",
  github: "",
  liveUrl: "https://www.recsonbhadra.ac.in"
},
{
  name: "CocamS-K – Browser Camera Toolkit",
  kicker: "WebRTC Media Experiment",
  description:
    "A browser-based camera application built with JavaScript that explores webcam access, media capture, and client-side recording directly in the browser.",
  longDescription:
    "CocamS-K is a front-end media experiment focused on real-time camera interaction inside the browser. Built with HTML, CSS, and JavaScript, the project works around browser media APIs, WebRTC-based webcam access, and file handling to create a hands-on camera experience. With separate webcam, screen, and recorder-oriented files in the codebase, it reflects practical experimentation with browser-native media workflows rather than a static UI-only build.",
  tech: ["HTML", "CSS", "JavaScript", "WebRTC", "File API", "OpenCV.js"],
  proof: [
    "Browser webcam access",
    "Client-side media interaction",
    "Real-time capture workflow",
    "Experimental computer-vision ready structure"
  ],
  tone: "experimental",
  accent: "#22d3ee",
  github: "https://github.com/Anubhav-developr/cocamS-K",
  liveUrl: ""
},
{
  name: "PIXEy-EDITOR – Browser Pixel Art Editor",
  kicker: "Canvas-Based Creative Tool",
  description:
    "A browser-based pixel art editor built from scratch using vanilla JavaScript and the Canvas API, featuring drawing, rectangle, fill, color-pick, undo, and image import/export tools.",
  longDescription:
    "PIXEy-EDITOR is a self-built creative tool that recreates the core mechanics of a professional pixel-art application entirely in the browser. It combines a custom canvas rendering engine with a state-driven editor architecture, supporting freehand pixel drawing, rectangle shape tools, bucket fill, color picking, and multi-step undo history. Image loading and saving round out the workflow, making it a fully functional editor rather than a static demo. The project reflects hands-on engineering of canvas rendering, coordinate mapping, and interactive tool state management from the ground up.",
  tech: ["JavaScript", "HTML5 Canvas API", "CSS"],
  proof: [
    "Custom canvas rendering engine",
    "Multi-tool editor (draw, rectangle, fill, pick)",
    "Undo history system",
    "Image import/export workflow"
  ],
  tone: "pixel",
  accent: "#22d3ee",
  github: "https://github.com/Anubhav-developr/PIXEy-EDITOR",
  liveUrl: ""
},
{
  name: "CodeChef User Finder",
  kicker: "Developer Utility",
  description:
    "A small, fast utility that resolves a CodeChef profile ID directly to that user's CodeChef profile page.",
  longDescription:
    "CodeChef User Finder is a lightweight HTML, CSS, and JavaScript utility built to remove the friction of manually navigating to CodeChef profiles. A user enters a CodeChef handle, and the application immediately routes them to the corresponding profile URL. It's a simple, focused tool rather than a full analytics dashboard, reflecting practical problem-solving for competitive programming workflows.",
  tech: ["HTML", "CSS", "JavaScript"],
  proof: [
    "Instant handle-to-profile routing",
    "Clean input-driven interface",
    "Zero backend, fully client-side",
    "Deployed on GitHub Pages"
  ],
  tone: "codechef",
  accent: "#8b5cf6",
  github: "https://github.com/Anubhav-developr/codechef-user-info",
  liveUrl: "https://anubhav-developr.github.io/codechef-user-info/"
},
];
