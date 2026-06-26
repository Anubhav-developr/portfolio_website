"use client";

import { motion } from "framer-motion";
import { CalendarDays, GraduationCap } from "lucide-react";
import { education, timeline } from "@/constants/portfolio";
import { fadeUp, stagger } from "@/animations/variants";
import { SectionHeader } from "@/components/SectionHeader";

export function TimelineSection() {
  return (
    <section id="experience" className="section-shell py-24 sm:py-32">
      <SectionHeader
        eyebrow="Trajectory"
        title="A timeline shaped by service, software, and study."
        copy="The portfolio connects current responsibility with long-running freelance Android practice and a formal computer science foundation."
      />

      <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="rounded-[28px] border border-ivory/12 bg-white/[0.035] p-6 shadow-rim"
        >
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-citron text-ink-950">
            <GraduationCap className="h-7 w-7" />
          </div>
          <p className="mt-12 text-sm uppercase tracking-[0.24em] text-ivory/42">Education</p>
          <h3 className="mt-4 font-display text-4xl font-black text-ivory">{education.degree}</h3>
          <p className="mt-4 text-lg text-ivory/64">
            {education.school}, {education.year}
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative space-y-5 before:absolute before:left-5 before:top-8 before:h-[calc(100%-4rem)] before:w-px before:bg-gradient-to-b before:from-teal before:via-ivory/16 before:to-copper"
        >
          {timeline.map((item) => (
            <motion.article
              variants={fadeUp}
              key={`${item.role}-${item.organization}`}
              className="relative pl-14"
            >
              <span className="absolute left-0 top-6 grid h-10 w-10 place-items-center rounded-full border border-ivory/14 bg-ink-950 shadow-rim">
                <CalendarDays className="h-4 w-4 text-teal" />
              </span>
              <div className="rounded-[28px] border border-ivory/12 bg-ink-900/70 p-6 shadow-rim transition hover:border-citron/38">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-citron/78">
                  {item.period}
                </p>
                <h3 className="mt-3 font-display text-3xl font-black text-ivory">{item.role}</h3>
                <p className="mt-1 text-ivory/58">{item.organization}</p>
                <p className="mt-5 leading-7 text-ivory/60">{item.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.signals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border border-ivory/10 bg-white/[0.035] px-3 py-1.5 text-sm text-ivory/56"
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
    </section>
  );
}
