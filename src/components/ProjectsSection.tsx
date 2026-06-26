"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, GitBranch, RadioTower } from "lucide-react";
import { projects } from "@/constants/portfolio";
import { fadeUp } from "@/animations/variants";
import { MagneticButton } from "@/components/MagneticButton";
import { SectionHeader } from "@/components/SectionHeader";
import type { Project } from "@/types/portfolio";

export function ProjectsSection() {
  return (
    <section id="projects" className="section-shell py-24 sm:py-32">
      <SectionHeader
        eyebrow="Cinematic showcases"
        title="Four builds, four ways of thinking."
        copy="Each project is framed as a product moment: mobile experience, finance workflow, search intelligence, and compiler design."
      />

      <div className="space-y-10">
        {projects.map((project, index) => (
          <motion.article
            key={project.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-140px" }}
            className="group relative overflow-hidden rounded-[32px] border border-ivory/12 bg-white/[0.032] p-4 shadow-velvet sm:p-6 lg:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`
              }}
            />
            <div
              className={`grid gap-8 lg:grid-cols-[1.05fr_0.95fr] ${
                index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <ProjectVisual project={project} />

              <div className="flex min-h-[460px] flex-col justify-between p-2 sm:p-4">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ivory/10 bg-ink-950/64 px-3 py-2 text-sm text-ivory/52">
                    <RadioTower className="h-4 w-4" style={{ color: project.accent }} />
                    {project.kicker}
                  </div>
                  <h3 className="font-display text-4xl font-black leading-tight text-ivory sm:text-5xl">
                    {project.name}
                  </h3>
                  <p className="mt-5 text-lg leading-8 text-ivory/70">{project.description}</p>
                  <p className="mt-4 leading-7 text-ivory/52">{project.longDescription}</p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-ivory/10 bg-white/[0.035] px-3 py-1.5 text-sm text-ivory/62"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.proof.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-ivory/10 bg-ink-950/52 p-4 text-sm leading-6 text-ivory/58"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <MagneticButton href="#contact">Discuss build</MagneticButton>
                    <MagneticButton href="#contact" variant="ghost">
                      Source on request
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="relative min-h-[460px] overflow-hidden rounded-[26px] border border-ivory/10 bg-ink-950/80 p-5">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(135deg, ${project.accent}24, transparent 38%), linear-gradient(45deg, rgba(244,240,232,0.08), transparent 50%)`
        }}
      />

      <div className="relative z-10 flex h-full min-h-[420px] items-center justify-center">
        {project.tone === "pulse" ? <ExamPulseVisual accent={project.accent} /> : null}
        {project.tone === "ledger" ? <LedgerVisual accent={project.accent} /> : null}
        {project.tone === "tree" ? <MinimaxVisual accent={project.accent} /> : null}
        {project.tone === "compiler" ? <CompilerVisual accent={project.accent} /> : null}
      </div>
    </div>
  );
}

function ExamPulseVisual({ accent }: { accent: string }) {
  return (
    <div className="relative h-[390px] w-[220px] rounded-[34px] border border-ivory/18 bg-ink-900 p-3 shadow-velvet transition duration-500 group-hover:rotate-[-2deg] group-hover:scale-[1.02]">
      <div className="h-full rounded-[26px] border border-white/8 bg-[#0b0f0d] p-4">
        <div className="mx-auto mb-5 h-1 w-14 rounded-full bg-white/22" />
        <div className="rounded-3xl p-4" style={{ background: `${accent}18` }}>
          <p className="text-xs uppercase tracking-[0.22em] text-ivory/42">Quiz pulse</p>
          <div className="mt-5 h-24 rounded-2xl border border-ivory/10 bg-white/[0.055]" />
        </div>
        <div className="mt-5 space-y-3">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-ivory/10 bg-white/[0.035] p-3">
              <span className="h-5 w-5 rounded-full border" style={{ borderColor: accent }} />
              <span className="h-2 flex-1 rounded-full bg-white/14" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LedgerVisual({ accent }: { accent: string }) {
  return (
    <div className="w-full max-w-[520px] rounded-[26px] border border-ivory/12 bg-ink-900/88 p-5 shadow-velvet">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ivory/38">Account ledger</p>
          <h4 className="mt-2 font-display text-2xl font-black text-ivory">Daily balance sheet</h4>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: `${accent}22` }}>
          <GitBranch className="h-5 w-5" style={{ color: accent }} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 28 }).map((_, index) => (
          <span
            key={index}
            className="h-9 rounded-xl border border-white/8 bg-white/[0.035]"
            style={{
              opacity: index % 6 === 0 ? 1 : 0.48,
              background: index % 6 === 0 ? `${accent}28` : undefined
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MinimaxVisual({ accent }: { accent: string }) {
  const nodes = [
    "left-[46%] top-[5%]",
    "left-[20%] top-[32%]",
    "left-[70%] top-[32%]",
    "left-[9%] top-[68%]",
    "left-[34%] top-[68%]",
    "left-[62%] top-[68%]",
    "left-[84%] top-[68%]"
  ];

  return (
    <div className="relative h-[390px] w-full max-w-[560px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 390" aria-hidden="true">
        <path d="M280 56 L138 142 L56 284" stroke={accent} strokeOpacity=".55" strokeWidth="2" fill="none" />
        <path d="M280 56 L138 142 L204 284" stroke={accent} strokeOpacity=".35" strokeWidth="2" fill="none" />
        <path d="M280 56 L414 142 L348 284" stroke={accent} strokeOpacity=".55" strokeWidth="2" fill="none" />
        <path d="M414 142 L498 284" stroke={accent} strokeOpacity=".35" strokeWidth="2" fill="none" />
      </svg>
      {nodes.map((position, index) => (
        <div
          key={position}
          className={`absolute ${position} grid h-16 w-16 -translate-x-1/2 place-items-center rounded-2xl border border-ivory/12 bg-ink-900 shadow-rim`}
          style={{ animation: `drift ${6 + index}s ease-in-out infinite` }}
        >
          <span className="font-mono text-sm" style={{ color: accent }}>
            {index % 2 === 0 ? "max" : "min"}
          </span>
        </div>
      ))}
    </div>
  );
}

function CompilerVisual({ accent }: { accent: string }) {
  return (
    <div className="grid w-full max-w-[560px] gap-4 md:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[24px] border border-ivory/12 bg-ink-900/82 p-4 shadow-rim">
        <div className="mb-4 flex items-center gap-2 text-sm text-ivory/48">
          <Code2 className="h-4 w-4" style={{ color: accent }} />
          token stream
        </div>
        <div className="space-y-2 font-mono text-xs text-ivory/58">
          {["LET", "IDENT", "EQUAL", "NUMBER", "PLUS", "CALL", "EOF"].map((token) => (
            <div key={token} className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2">
              <span>{token}</span>
              <ArrowRight className="h-3 w-3" style={{ color: accent }} />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[24px] border border-ivory/12 bg-ink-900/82 p-5 shadow-rim">
        <p className="mb-4 text-sm text-ivory/48">abstract syntax tree</p>
        <div className="space-y-3">
          {["Program", "Declaration", "BinaryExpression", "CallExpression"].map((branch, index) => (
            <div
              key={branch}
              className="rounded-2xl border border-ivory/10 bg-white/[0.035] px-4 py-3 text-sm text-ivory/68"
              style={{ marginLeft: index * 18 }}
            >
              {branch}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
