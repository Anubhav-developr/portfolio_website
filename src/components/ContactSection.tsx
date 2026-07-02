"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Code2, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { identity, socialLinks } from "@/constants/portfolio";
import { SectionHeader } from "@/components/SectionHeader";

const socialIconMap = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
  CodeChef: Code2
};

export function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Contact"
          title="Bring the build brief. He will bring the commits."
          copy="For Android apps, database-backed tools, Firebase products, or software ideas that need patient engineering and crisp execution."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="reveal mx-auto grid max-w-[900px] gap-10 rounded-t-[24px] border-t-[0.5px] border-[var(--border-dim)] bg-[var(--bg-surface)] p-6 shadow-[0_-20px_90px_rgba(0,0,0,0.28)] sm:p-10 lg:grid-cols-[0.4fr_0.6fr] lg:p-20"
        >
          <div>
            <p className="text-micro text-[var(--accent-blue)]">Base</p>
            <h3 className="mt-5 text-title font-display text-[var(--text-primary)]">
              {identity.location}
            </h3>
            <p className="text-body mt-5">{identity.availability}</p>

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${identity.email}`}
                className="flex items-center gap-3 rounded-[10px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] p-4 text-sm text-[var(--text-secondary)] transition hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
              >
                <Mail className="h-4 w-4 text-[var(--accent-cyan)]" />
                {identity.email}
              </a>
              <div className="flex items-center gap-3 rounded-[10px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] p-4 text-sm text-[var(--text-secondary)]">
                <MapPin className="h-4 w-4 text-[var(--accent-cyan)]" />
                Shahjahanpur, Uttar Pradesh
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.label as keyof typeof socialIconMap] ?? Code2;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="grid h-9 w-9 place-items-center rounded-[10px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] text-[var(--text-muted)] transition duration-[250ms] hover:-translate-y-1 hover:border-[var(--border-accent)] hover:text-[var(--accent-blue)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Name
                </span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="h-[52px] w-full rounded-[10px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] px-4 text-[13px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-ghost)] focus:border-[rgba(99,136,255,0.5)] focus:shadow-[0_0_0_3px_rgba(99,136,255,0.08)]"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Email
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="h-[52px] w-full rounded-[10px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] px-4 text-[13px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-ghost)] focus:border-[rgba(99,136,255,0.5)] focus:shadow-[0_0_0_3px_rgba(99,136,255,0.08)]"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Project
              </span>
              <input
                required
                name="project"
                className="h-[52px] w-full rounded-[10px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] px-4 text-[13px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-ghost)] focus:border-[rgba(99,136,255,0.5)] focus:shadow-[0_0_0_3px_rgba(99,136,255,0.08)]"
                placeholder="Android app, backend tool, AI project..."
              />
            </label>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Message
              </span>
              <textarea
                required
                name="message"
                rows={7}
                className="w-full resize-none rounded-[10px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] px-4 py-4 text-[13px] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-ghost)] focus:border-[rgba(99,136,255,0.5)] focus:shadow-[0_0_0_3px_rgba(99,136,255,0.08)]"
                placeholder="Share the context, scope, or idea."
              />
            </label>

            <button
              type="submit"
              className="shimmer-button mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-[10px] bg-[var(--accent-blue)] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.04em] text-white shadow-[0_0_32px_rgba(99,136,255,0.2)] transition hover:-translate-y-px hover:shadow-[0_0_48px_rgba(99,136,255,0.35)]"
            >
              {sent ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              {sent ? "Message staged" : "Send message"}
            </button>

            {sent ? (
              <p className="mt-4 rounded-[10px] border-[0.5px] border-[rgba(52,211,153,0.2)] bg-[rgba(52,211,153,0.08)] p-4 text-sm leading-6 text-[rgba(52,211,153,0.85)]">
                The form is ready for a backend or email service. For now, use the email link to send this brief directly.
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
