import {
  Binary,
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Landmark,
  Layers3,
  Mail,
  MapPin,
  Smartphone,
  TerminalSquare,
  Trophy
} from "lucide-react";

import type { Achievement, SkillCluster, SocialLink, Stat, TimelineItem } from "@/types/portfolio";
import { projects } from "@/constants/projects";

export { projects };

export const identity = {
  name: "Anubhav Mishra",
  title: "Full Stack Developer / GDS ABPM / CS Graduate",
  heroEyebrow: "Full Stack Developer / GDS ABPM / CS Graduate",
  tagline: "Building elegant software, one commit at a time.",
  location: "Shahjahanpur, Uttar Pradesh, India",
  email: "anubhavm1234@gmail.com",
  availability:
    "Currently serving as Gramin Dak Sevak at India Post while shipping production-grade Android, full-stack, Firebase, and TypeScript projects.",
  github: "https://github.com/Anubhav-developr",
  linkedin:
    "https://www.linkedin.com/in/anubhav-mishra-%E0%A4%85%E0%A4%A8%E0%A5%81%E0%A4%AD%E0%A4%B5-%E0%A4%AE%E0%A4%BF%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A4%BE-51b751141/",
  codechef: "https://www.codechef.com/users/anubhav_258",
  website: "https://portfolio-website-anubhavdeveloprs-projects.vercel.app",
  summary:
    "Results-driven B.Tech CSE graduate with hands-on experience in full-stack web development, Android engineering, Firebase ecosystems, and TypeScript. Passionate about clean architecture, intuitive UX, and solving real-world problems through scalable code."
};

export const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Proof", href: "#achievements" },
  { label: "Contact", href: "#contact" }
];

export const stats: Stat[] = [
  { value: "24", label: "CodeChef global rank" },
  { value: "9", label: "production-grade projects shipped" },
  { value: "2023", label: "B.Tech CSE graduate" }
];

export const achievements: Achievement[] = [
  {
    title: "CodeChef Global Rank 24",
    detail: "April Long Two 2022, Division 4 rated contest.",
    metric: "#24",
    href: identity.codechef
  },
  {
    title: "Active GitHub Portfolio",
    detail: "A consistent portfolio across Android, web, AI, compiler, and Firebase-backed builds.",
    metric: "Open source",
    href: identity.github
  },
  {
    title: "Government Service",
    detail: "Secured Gramin Dak Sevak role at Department of Posts in February 2024.",
    metric: "India Post"
  }
];

export const socialLinks: SocialLink[] = [
  { label: "Email", href: `mailto:${identity.email}`, external: false },
  { label: "GitHub", href: identity.github, external: true },
  { label: "LinkedIn", href: identity.linkedin, external: true },
  { label: "CodeChef", href: identity.codechef, external: true }
];

export const timeline: TimelineItem[] = [
  {
    role: "Gramin Dak Sevak (GDS)",
    organization: "Department of Posts, India Post",
    period: "Feb 2024 - Present",
    summary:
      "Manages daily postal operations, customer service, and financial services for savings accounts and government schemes in Shahjahanpur.",
    signals: ["Public service", "Financial operations", "Citizen-facing systems"]
  },
  {
    role: "Freelance Android & Web Developer",
    organization: "Independent / Remote",
    period: "2022 - Present",
    summary:
      "Designed and developed Android and web applications from concept through deployment-ready delivery, with a focus on clean architecture and useful product workflows.",
    signals: ["Android UI flows", "Full-stack delivery", "Client communication"]
  },
  {
    role: "CodeChef Global Rank 24",
    organization: "April Long Two 2022 / Division 4",
    period: "Apr 2022",
    summary:
      "Achieved global rank 24 in a rated CodeChef long contest through algorithmic problem solving and disciplined contest execution.",
    signals: ["Competitive programming", "Global rank 24", "Problem solving"]
  }
];

export const education = {
  degree: "B.Tech - Computer Science & Engineering",
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
    name: "Frameworks",
    icon: Smartphone,
    items: ["React", "React Native", "Node.js", "Android SDK"]
  },
  {
    name: "Database",
    icon: Database,
    items: ["Firebase Realtime DB", "Cloud Firestore", "SQLite", "Room", "MySQL"]
  },
  {
    name: "Architecture",
    icon: Layers3,
    items: ["MVVM", "REST APIs", "WebSockets", "Hilt DI", "WorkManager"]
  },
  {
    name: "Tools",
    icon: Code2,
    items: ["Git", "GitHub", "Android Studio", "VS Code", "Jupyter Notebook"]
  },
  {
    name: "CS Concepts",
    icon: BrainCircuit,
    items: ["Compiler Design", "Lexical Analysis", "Parsing", "AST", "Minimax AI"]
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
  { label: identity.location, icon: MapPin },
  { label: identity.email, icon: Mail }
];
