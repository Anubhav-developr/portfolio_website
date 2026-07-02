"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education, timeline } from "@/constants/portfolio";
import { fadeUp, stagger } from "@/animations/variants";
import { SectionHeader } from "@/components/SectionHeader";

export function TimelineSection() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Experience"
          title="A timeline shaped by service, software, and study."
          copy="Current responsibility at India Post sits beside a long-running build practice across Android, web, algorithms, and product tooling."
        />

        <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="reveal rounded-[20px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-surface)] p-6"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-blue)] text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <p className="text-micro mt-10 text-[var(--text-muted)]">Education</p>
            <h3 className="text-title mt-4 font-display text-[var(--text-primary)]">{education.degree}</h3>
            <p className="text-body mt-3 text-sm">
              {education.school}, {education.year}
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="relative space-y-8 before:absolute before:left-[5px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[var(--border-soft)]"
          >
            {timeline.map((item, index) => (
              <motion.article
                variants={fadeUp}
                key={`${item.role}-${item.organization}`}
                className="reveal relative grid gap-5 pl-9 sm:grid-cols-[28px_1fr] sm:pl-0"
              >
                <div className="absolute left-0 top-2 sm:relative sm:top-0">
                  <span
                    className={`relative block h-3 w-3 rounded-full border-[1.5px] border-[var(--accent-blue)] ${
                      index === 0 ? "bg-[var(--accent-blue)]" : "bg-[var(--bg-void)]"
                    }`}
                  >
                    {index === 0 ? <span className="node-ring" /> : null}
                  </span>
                </div>

                <div className="relative rounded-[20px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-surface)] p-6 transition duration-[300ms] hover:border-[var(--border-accent)]">
                  <span className="absolute -left-7 top-7 hidden h-px w-7 border-t-[0.5px] border-dashed border-[var(--border-dim)] sm:block" />
                  <p className="text-[10px] font-medium uppercase italic tracking-[0.08em] text-[var(--accent-blue)]">
                    {item.period}
                  </p>
                  <h3 className="mt-3 text-[15px] font-semibold text-[var(--text-primary)]">{item.role}</h3>
                  <p className="mt-1 text-[12px] text-[var(--text-secondary)]">{item.organization}</p>
                  <p className="text-body mt-5 text-sm">{item.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.signals.map((signal) => (
                      <span
                        key={signal}
                        className="rounded-full border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] px-3 py-1 text-[10px] text-[var(--text-secondary)]"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
      <div aria-hidden="true" className="section-fade" />
    </section>
  );
}
