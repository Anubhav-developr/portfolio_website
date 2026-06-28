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
  TerminalSquare,
  Trophy
} from "lucide-react";

import type { SkillCluster, Stat, TimelineItem } from "@/types/portfolio";
import { projects } from "@/constants/projects";

export { projects };

export const identity = {
  name: "Anubhav Mishra",
  title: "Full Stack Developer · GDS ABPM · CS Graduate",
  tagline: "Building elegant software, one commit at a time.",
  location: "Shahjahanpur, Uttar Pradesh, India",
  email: "anubhavm1234@gmail.com",
  availability:
    "Open to Android, full-stack, and product-minded engineering work — shipping production-grade software alongside public service.",
  github: "https://github.com/Anubhav-developr",
  linkedin:
    "https://www.linkedin.com/in/anubhav-mishra-%E0%A4%85%E0%A4%A8%E0%A4%81%E0%A4%AD%E0%A4%B5-%E0%A4%AE%E0%A4%BF%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A4%BE-51b751141/",
  codechef: "https://www.codechef.com/users/anubhav_258",
  website: "https://portfolio-website-anubhavdeveloprs-projects.vercel.app"
};

export const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export const stats: Stat[] = [
  { value: "24", label: "CodeChef global rank — April Long Two 2022" },
  { value: "9", label: "production-grade projects shipped" },
  { value: "2023", label: "B.Tech CSE graduate" }
];

export const achievements = [
  {
    title: "CodeChef Global Rank 24",
    detail: "April Long Two 2022 · Division 4 (Rated)",
    href: identity.codechef
  },
  {
    title: "Active open-source portfolio",
    detail: "Consistent shipping cadence across mobile, web, and AI projects",
    href: identity.github
  },
  {
    title: "Gramin Dak Sevak",
    detail: "Department of Posts, India — secured Feb 2024",
    href: undefined
  }
];

export const timeline: TimelineItem[] = [
  {
    role: "Gramin Dak Sevak (GDS)",
    organization: "Department of Posts, India Post",
    period: "Feb 2024–Present",
    summary:
      "Manages daily postal operations, customer service, and financial services for savings accounts and government schemes in Shahjahanpur.",
    signals: ["Public service", "Financial operations", "Citizen-facing systems"]
  },
  {
    role: "Freelance Android & Web Developer",
    organization: "Independent · Remote",
    period: "2022–Present",
    summary:
      "Designed and developed multiple Android and web applications from concept through Google Play Console deployment.",
    signals: ["Android UI flows", "Full-stack delivery", "Client communication"]
  },
  {
    role: "CodeChef Global Rank 24",
    organization: "April Long Two 2022 · Division 4",
    period: "Apr 2022",
    summary:
      "Achieved global rank 24 in a rated CodeChef long contest — competitive programming across algorithmic problem solving.",
    signals: ["Competitive programming", "Global rank 24", "Problem solving"]
  }
];

export const education = {
  degree: "B.Tech — Computer Science & Engineering",
  school: "REC Sonbhadra (Rajkiya Engineering College)",
  year: "2023",
  icon: GraduationCap
};

export const skillClusters: SkillCluster[] = [
  {
    name: "Languages",
    icon: TerminalSquare,
    items: ["Java", "JavaScript", "TypeScript", "HTML5", "CSS3", "Python"]
  },
  {
    name: "Frameworks & Mobile",
    icon: Smartphone,
    items: ["React", "React Native", "Node.js", "Android SDK", "MVVM", "Hilt"]
  },
  {
    name: "Data & Backend",
    icon: Database,
    items: ["Firebase", "Firestore", "SQLite", "Room", "REST APIs", "WebSockets"]
  },
  {
    name: "CS & Tools",
    icon: BrainCircuit,
    items: ["Compiler Design", "Minimax AI", "Git", "Android Studio", "VS Code"]
  }
];

export const serviceSignals = [
  { label: "Full-stack builds", icon: Layers3 },
  { label: "Firebase ecosystems", icon: Landmark },
  { label: "CodeChef rank 24", icon: Trophy },
  { label: "Algorithmic systems", icon: Cpu },
  { label: "Compiler fundamentals", icon: Binary },
  { label: "Product shipping", icon: Blocks },
  { label: "Reliable delivery", icon: BriefcaseBusiness },
  { label: identity.location, icon: MapPin }
];
