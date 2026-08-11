"use client";

import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, RadioTower } from "lucide-react";
import { projects } from "@/constants/portfolio";
import { fadeUp } from "@/animations/variants";
import { MagneticButton } from "@/components/MagneticButton";
import { ProjectVisual } from "@/components/ProjectVisuals";
import { SectionHeader } from "@/components/SectionHeader";

function updateGlow(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (((event.clientX - rect.left) / rect.width) * 100).toFixed(1);
  const y = (((event.clientY - rect.top) / rect.height) * 100).toFixed(1);
  card.style.setProperty("--mx", `${x}%`);
  card.style.setProperty("--my", `${y}%`);
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-[rgba(2,3,4,0.68)] py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Cinematic showcases"
          title="Nine builds, each with its own engineering signature."
          copy="Android systems, Python finance tools, cross-device sync, compiler fundamentals, AI search, and product-grade web craft."
        />

        <div className="space-y-10">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-140px" }}
              onMouseMove={updateGlow}
              className="project-card reveal group relative mx-auto max-w-[900px] overflow-hidden rounded-[20px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-surface)] shadow-[0_28px_90px_rgba(0,0,0,0.34)] transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:scale-[1.005] hover:border-[rgba(99,136,255,0.20)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.5),0_0_0_0.5px_rgba(99,136,255,0.15)_inset]"
            >
              <div className="relative z-10 grid lg:grid-cols-[0.4fr_0.6fr]">
                <ProjectVisual project={project} />

                <div className="flex min-h-[420px] flex-col justify-between p-7 sm:p-9">
                  <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] px-3 py-2 text-[12px] text-[var(--text-secondary)]">
                      <RadioTower className="h-3.5 w-3.5" style={{ color: project.accent }} />
                      {project.kicker}
                    </div>
                    <h3 className="text-title font-display text-[var(--text-primary)]">{project.name}</h3>
                    <p className="text-body mt-4">{project.description}</p>
                    <p className="text-small mt-4">{project.longDescription}</p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-9">
                    <div className="grid gap-3">
                      {project.proof.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-[12px] text-[var(--text-muted)]">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
                          />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <MagneticButton href={project.github} external icon={false} variant="ghost">
                        <Github className="h-4 w-4" />
                        View on GitHub
                      </MagneticButton>
                      {project.liveUrl ? (
                        <MagneticButton href={project.liveUrl} variant="ghost" external icon={false}>
                          <ExternalLink className="h-4 w-4" />
                          Live demo
                        </MagneticButton>
                      ) : (
                        <a
                          href="#contact"
                          className="inline-flex min-h-12 items-center gap-2 rounded-full px-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                        >
                          Discuss build
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <span className="absolute right-5 top-5 z-10 font-mono text-[10px] text-[var(--text-ghost)]">
                {(index + 1).toString().padStart(2, "0")}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="section-fade" />
    </section>
  );
}
