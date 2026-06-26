"use client";

import { motion } from "framer-motion";
import { education, identity, serviceSignals, skillClusters } from "@/constants/portfolio";
import { fadeUp, stagger } from "@/animations/variants";
import { SectionHeader } from "@/components/SectionHeader";

export function ProfileSection() {
  const EducationIcon = education.icon;

  return (
    <section id="profile" className="section-shell py-24 sm:py-32">
      <SectionHeader
        eyebrow="Profile"
        title="An Android builder with a CS backbone."
        copy="Anubhav blends mobile product craft with algorithmic curiosity, database thinking, and the discipline that comes from shipping real workflows."
      />

      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative overflow-hidden rounded-[28px] border border-ivory/12 bg-ink-900/70 p-6 shadow-rim"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-citron/60 to-transparent" />
          <div className="flex min-h-[420px] flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-ivory/38">Current identity</p>
              <h3 className="mt-6 font-display text-4xl font-black leading-tight text-ivory">
                {identity.title}
              </h3>
              <p className="mt-5 text-lg leading-8 text-ivory/62">{identity.availability}</p>
            </div>

            <div className="rounded-3xl border border-ivory/12 bg-white/[0.035] p-5">
              <div className="flex items-center gap-4">
                <span className="grid h-13 w-13 place-items-center rounded-2xl bg-citron text-ink-950">
                  <EducationIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold text-ivory">{education.degree}</p>
                  <p className="text-sm text-ivory/58">
                    {education.school}, {education.year}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {skillClusters.map((cluster) => {
            const Icon = cluster.icon;
            return (
              <motion.div
                variants={fadeUp}
                key={cluster.name}
                className="group rounded-[28px] border border-ivory/12 bg-white/[0.035] p-5 shadow-rim transition hover:-translate-y-1 hover:border-teal/40"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ivory text-ink-950 transition group-hover:bg-citron">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm text-ivory/36">{cluster.items.length} signals</span>
                </div>
                <h3 className="font-display text-2xl font-black text-ivory">{cluster.name}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cluster.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-ivory/10 bg-ink-950/50 px-3 py-1.5 text-sm text-ivory/64"
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

      <div className="mt-8 overflow-hidden rounded-full border border-ivory/10 bg-white/[0.025] py-3">
        <div className="flex w-max animate-[rail_32s_linear_infinite] gap-3 px-3">
          {[...serviceSignals, ...serviceSignals].map((signal, index) => {
            const Icon = signal.icon;
            return (
              <span
                key={`${signal.label}-${index}`}
                className="inline-flex items-center gap-2 rounded-full border border-ivory/10 bg-ink-950/72 px-4 py-2 text-sm text-ivory/64"
              >
                <Icon className="h-4 w-4 text-teal" />
                {signal.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
