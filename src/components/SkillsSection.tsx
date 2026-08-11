"use client";

import { motion } from "framer-motion";
import { skillClusters } from "@/constants/portfolio";
import { fadeUp, stagger } from "@/animations/variants";
import { SectionHeader } from "@/components/SectionHeader";

const clusterGlow = [
  "from-[rgba(99,136,255,0.16)]",
  "from-[rgba(167,139,250,0.16)]",
  "from-[rgba(52,211,153,0.14)]",
  "from-[rgba(56,189,248,0.14)]",
  "from-[rgba(167,139,250,0.14)]",
  "from-[rgba(251,191,36,0.12)]"
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Skills"
          title="A nebula of mobile, web, data, and CS fundamentals."
          copy="The practical stack behind the builds: Android architecture, Firebase-backed systems, TypeScript frontends, Python tooling, and algorithmic thinking."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillClusters.map((cluster, index) => {
            const Icon = cluster.icon;
            return (
              <motion.article
                key={cluster.name}
                variants={fadeUp}
                className={`reveal rounded-[20px] border-[0.5px] border-[var(--border-soft)] bg-[radial-gradient(circle_at_30%_0%,var(--tw-gradient-from),transparent_42%),var(--bg-surface)] p-5 ${clusterGlow[index]}`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] text-[var(--accent-cyan)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-title font-display text-[var(--text-primary)]">{cluster.name}</h3>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {cluster.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] px-3 py-1.5 text-[11px] text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
      <div aria-hidden="true" className="section-fade" />
    </section>
  );
}
