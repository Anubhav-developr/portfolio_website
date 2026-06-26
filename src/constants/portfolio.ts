import {
  Binary,
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  Cpu,
  Database,
  GraduationCap,
  Landmark,
  Layers3,
  MapPin,
  Smartphone,
  Sparkles,
  TerminalSquare
} from "lucide-react";

import type { Project, SkillCluster, Stat, TimelineItem } from "@/types/portfolio";

export const identity = {
  name: "Anubhav Mishra",
  title: "Android Engineer · CS Graduate · Builder",
  tagline: "Building elegant software, one commit at a time.",
  location: "Shahjahanpur, Uttar Pradesh, India",
  email: "hello@example.com",
  availability: "Open to Android, backend, and product-minded engineering work"
};

export const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export const stats: Stat[] = [
  { value: "2020", label: "building Android products since" },
  { value: "4", label: "featured engineering showcases" },
  { value: "2023", label: "B.Tech CSE graduate" }
];

export const projects: Project[] = [
  {
    name: "ExamPulse",
    kicker: "Android quiz engine",
    description: "A polished Android quiz app built with Java, MVVM, Room, Hilt, and Lottie.",
    longDescription:
      "Designed around fast practice loops, persistent progress, clean state ownership, and moments of delight through lightweight motion.",
    tech: ["Java", "MVVM", "Room", "Hilt", "Lottie"],
    proof: ["Offline-first question flow", "Dependency-injected architecture", "Animated feedback states"],
    tone: "pulse",
    accent: "#c9ff64"
  },
  {
    name: "Post Office Account Management System",
    kicker: "Finance operations app",
    description: "A Python + MySQL account management system for structured financial workflows.",
    longDescription:
      "Built to model deposits, customer account records, balances, and office-grade reporting with practical data integrity.",
    tech: ["Python", "MySQL", "SQL", "Reports"],
    proof: ["Ledger-style data model", "Account transaction workflows", "Searchable customer records"],
    tone: "ledger",
    accent: "#c47b4d"
  },
  {
    name: "Minimax Game AI",
    kicker: "Decision intelligence",
    description: "Alpha-beta pruning implemented in Python and C++ for strategic move selection.",
    longDescription:
      "Explores adversarial search, pruning efficiency, evaluation heuristics, and the clarity needed to debug recursive AI.",
    tech: ["Python", "C++", "Minimax", "Alpha-beta"],
    proof: ["Pruned search trees", "Evaluation scoring", "Cross-language implementation"],
    tone: "tree",
    accent: "#4dd4bd"
  },
  {
    name: "Custom Language Interpreter",
    kicker: "Compiler design lab",
    description: "A lexer, parser, and AST pipeline for a custom language interpreter.",
    longDescription:
      "Built from compiler design fundamentals: tokenization, grammar handling, AST construction, and execution-ready structure.",
    tech: ["Lexer", "Parser", "AST", "Compiler Design"],
    proof: ["Token stream design", "Grammar-driven parsing", "AST visualization"],
    tone: "compiler",
    accent: "#f4f0e8"
  }
];

export const timeline: TimelineItem[] = [
  {
    role: "ABPM",
    organization: "Department of Posts",
    period: "2024-Present",
    summary:
      "Working in a public-service environment where reliability, clear records, and disciplined execution matter every day.",
    signals: ["Operations discipline", "Citizen-facing systems", "Financial record awareness"]
  },
  {
    role: "Freelance Android Developer",
    organization: "Independent",
    period: "2020-Present",
    summary:
      "Designing and building Android applications with a practical eye for architecture, maintainability, and user experience.",
    signals: ["Android UI flows", "Local data storage", "Client communication"]
  }
];

export const education = {
  degree: "B.Tech CSE",
  school: "REC Sonbhadra",
  year: "2023",
  icon: GraduationCap
};

export const skillClusters: SkillCluster[] = [
  {
    name: "Android Systems",
    icon: Smartphone,
    items: ["Java", "MVVM", "Room", "Hilt", "Lottie", "Material flows"]
  },
  {
    name: "Data & Backend",
    icon: Database,
    items: ["Python", "MySQL", "SQL modeling", "Reports", "Persistence"]
  },
  {
    name: "Computer Science",
    icon: BrainCircuit,
    items: ["C++", "Algorithms", "Alpha-beta pruning", "ASTs", "Parsing"]
  },
  {
    name: "Product Craft",
    icon: Sparkles,
    items: ["UI polish", "State design", "Accessibility", "Performance", "Git"]
  }
];

export const serviceSignals = [
  { label: "App architecture", icon: Layers3 },
  { label: "Database-backed tools", icon: Landmark },
  { label: "Algorithmic systems", icon: Cpu },
  { label: "Compiler fundamentals", icon: Binary },
  { label: "Product builds", icon: Blocks },
  { label: "Reliable delivery", icon: BriefcaseBusiness },
  { label: "Clear documentation", icon: TerminalSquare },
  { label: identity.location, icon: MapPin }
];
