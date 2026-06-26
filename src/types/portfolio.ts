import type { LucideIcon } from "lucide-react";

export type ProjectTone = "pulse" | "ledger" | "tree" | "compiler";

export type Project = {
  name: string;
  kicker: string;
  description: string;
  longDescription: string;
  tech: string[];
  proof: string[];
  tone: ProjectTone;
  accent: string;
};

export type TimelineItem = {
  role: string;
  organization: string;
  period: string;
  summary: string;
  signals: string[];
};

export type SkillCluster = {
  name: string;
  items: string[];
  icon: LucideIcon;
};

export type Stat = {
  value: string;
  label: string;
};
