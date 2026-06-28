"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, RadioTower } from "lucide-react";
import { projects } from "@/constants/portfolio";
import { fadeUp } from "@/animations/variants";
import { MagneticButton } from "@/components/MagneticButton";
import { ProjectVisual } from "@/components/ProjectVisuals";
import { SectionHeader } from "@/components/SectionHeader";

export function ProjectsSection() {
  return (
    <section id="projects" className="section-shell py-24 sm:py-32">
      <SectionHeader
        eyebrow="Cinematic showcases"
        title="Nine builds, nine ways of thinking."
        copy="Each project ships with its own visual demo — from Android finance apps and minimax AI to compiler pipelines and cross-device sync."
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
                    <MagneticButton href={project.github} external icon={false}>
                      <Github className="h-4 w-4" />
                      View on GitHub
                    </MagneticButton>
                    {project.liveUrl ? (
                      <MagneticButton href={project.liveUrl} variant="ghost" external icon={false}>
                        <ExternalLink className="h-4 w-4" />
                        Live demo
                      </MagneticButton>
                    ) : (
                      <MagneticButton href="#contact" variant="ghost">
                        Discuss build
                      </MagneticButton>
                    )}
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
