"use client";

import { motion } from "framer-motion";
import { education, identity, serviceSignals, skillClusters } from "@/constants/portfolio";
import { fadeUp, stagger } from "@/animations/variants";
import { SectionHeader } from "@/components/SectionHeader";

const clusterStyle = [
  "border-[rgba(99,136,255,0.25)] text-[rgba(99,136,255,0.9)]",
  "border-[rgba(167,139,250,0.25)] text-[rgba(167,139,250,0.9)]",
  "border-[rgba(52,211,153,0.25)] text-[rgba(52,211,153,0.9)]",
  "border-[rgba(99,136,255,0.25)] text-[rgba(99,136,255,0.9)]",
  "border-[rgba(167,139,250,0.25)] text-[rgba(167,139,250,0.9)]",
  "border-[rgba(251,191,36,0.25)] text-[rgba(251,191,36,0.9)]"
];

export function ProfileSection() {
  const EducationIcon = education.icon;

  return (
    <section id="profile" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Profile"
          title="An engineer with public-service discipline and product instincts."
          copy={identity.summary}
        />

        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="reveal rounded-[24px] border-[0.5px] border-[var(--border-soft)] bg-[var(--grad-card)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)]"
          >
            <p className="text-micro text-[var(--text-muted)]">Current identity</p>
            <h3 className="mt-6 font-display text-[clamp(28px,3.5vw,42px)] font-bold leading-tight text-[var(--text-primary)]">
              {identity.title}
            </h3>
            <p className="text-body mt-5">{identity.availability}</p>

            <div className="mt-10 rounded-[16px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] p-5">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[var(--accent-blue)] text-white">
                  <EducationIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{education.degree}</p>
                  <p className="text-small mt-1">
                    {education.school}, {education.year}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="grid gap-5"
          >
            {skillClusters.map((cluster, index) => {
              const Icon = cluster.icon;
              return (
                <motion.div
                  variants={fadeUp}
                  key={cluster.name}
                  className="reveal rounded-[20px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-surface)] p-5"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] text-[var(--accent-cyan)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="text-title text-[var(--text-primary)]">{cluster.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cluster.items.map((item, itemIndex) => (
                      <span
                        key={item}
                        className={`reveal reveal-delay-${Math.min(itemIndex, 4)} rounded-full border-[0.5px] bg-[var(--bg-raised)] px-4 py-[7px] text-[11px] font-medium transition duration-[250ms] hover:-translate-y-0.5 hover:border-[var(--border-accent)] hover:text-[var(--text-primary)] ${clusterStyle[index]}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-10 overflow-hidden rounded-full border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-surface)] py-3">
          <div className="flex w-max animate-[rail_32s_linear_infinite] gap-3 px-3">
            {[...serviceSignals, ...serviceSignals].map((signal, index) => {
              const Icon = signal.icon;
              return (
                <span
                  key={`${signal.label}-${index}`}
                  className="inline-flex items-center gap-2 rounded-full border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] px-4 py-2 text-sm text-[var(--text-secondary)]"
                >
                  <Icon className="h-4 w-4 text-[var(--accent-cyan)]" />
                  {signal.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="section-fade" />
    </section>
  );
}
