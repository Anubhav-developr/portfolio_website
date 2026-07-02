"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink, Github, Trophy } from "lucide-react";
import { achievements } from "@/constants/portfolio";
import { fadeUp, stagger } from "@/animations/variants";
import { SectionHeader } from "@/components/SectionHeader";

const icons = [Trophy, Github, BadgeCheck];

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Proof"
          title="Signals that stand up outside the screen."
          copy="A compact record of contest performance, consistent shipping, and responsibility held in public service."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-4 md:grid-cols-3"
        >
          {achievements.map((achievement, index) => {
            const Icon = icons[index] ?? BadgeCheck;
            const content = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] text-[var(--accent-cyan)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border-[0.5px] border-[var(--border-accent)] bg-[rgba(99,136,255,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-blue)]">
                    {achievement.metric}
                  </span>
                </div>
                <h3 className="mt-10 text-title font-display text-[var(--text-primary)]">{achievement.title}</h3>
                <p className="text-body mt-3 text-sm">{achievement.detail}</p>
                {achievement.href ? (
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition group-hover:text-[var(--text-primary)]">
                    View proof
                    <ExternalLink className="h-4 w-4" />
                  </span>
                ) : null}
              </>
            );

            return (
              <motion.article
                key={achievement.title}
                variants={fadeUp}
                className="reveal group rounded-[20px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-surface)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition duration-[300ms] hover:-translate-y-1 hover:border-[var(--border-accent)]"
              >
                {achievement.href ? (
                  <a href={achievement.href} target="_blank" rel="noopener noreferrer" className="block">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
      <div aria-hidden="true" className="section-fade" />
    </section>
  );
}
