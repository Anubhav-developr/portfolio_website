"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Code2, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { identity } from "@/constants/portfolio";
import { SectionHeader } from "@/components/SectionHeader";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="section-shell py-24 sm:py-32">
      <SectionHeader
        eyebrow="Contact"
        title="Bring the build brief. He will bring the commits."
        copy="For Android apps, database-backed tools, or software ideas that need patient engineering and crisp execution."
      />

      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="rounded-[28px] border border-ivory/12 bg-ink-900/70 p-6 shadow-rim"
        >
          <div className="flex min-h-[420px] flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-teal/80">Base</p>
              <h3 className="mt-5 font-display text-4xl font-black text-ivory">
                {identity.location}
              </h3>
              <p className="mt-5 leading-8 text-ivory/62">{identity.availability}</p>
            </div>
            <div className="space-y-3">
              <a
                href={`mailto:${identity.email}`}
                className="flex items-center gap-3 rounded-2xl border border-ivory/10 bg-white/[0.035] p-4 text-ivory/68 transition hover:border-citron/42 hover:text-ivory"
              >
                <Mail className="h-5 w-5 text-citron" />
                {identity.email}
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-ivory/10 bg-white/[0.035] p-4 text-ivory/68">
                <MapPin className="h-5 w-5 text-teal" />
                Shahjahanpur, Uttar Pradesh
              </div>
              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-ivory/10 bg-white/[0.035] p-4 text-ivory/68 transition hover:border-citron/42 hover:text-ivory"
              >
                <Github className="h-5 w-5 text-citron" />
                GitHub · Anubhav-developr
              </a>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-ivory/10 bg-white/[0.035] p-4 text-ivory/68 transition hover:border-citron/42 hover:text-ivory"
              >
                <Linkedin className="h-5 w-5 text-citron" />
                LinkedIn · Anubhav Mishra
              </a>
              <a
                href={identity.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-ivory/10 bg-white/[0.035] p-4 text-ivory/68 transition hover:border-citron/42 hover:text-ivory"
              >
                <Code2 className="h-5 w-5 text-teal" />
                CodeChef · Global Rank 24
              </a>
            </div>
          </div>
        </motion.div>

        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-ivory/12 bg-white/[0.035] p-5 shadow-rim sm:p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-ivory/58">Name</span>
              <input
                required
                name="name"
                autoComplete="name"
                className="h-13 w-full rounded-2xl border border-ivory/12 bg-ink-950/70 px-4 text-ivory outline-none transition placeholder:text-ivory/28 focus:border-citron"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-ivory/58">Email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="h-13 w-full rounded-2xl border border-ivory/12 bg-ink-950/70 px-4 text-ivory outline-none transition placeholder:text-ivory/28 focus:border-citron"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm text-ivory/58">Project</span>
            <input
              required
              name="project"
              className="h-13 w-full rounded-2xl border border-ivory/12 bg-ink-950/70 px-4 text-ivory outline-none transition placeholder:text-ivory/28 focus:border-citron"
              placeholder="Android app, backend tool, AI project..."
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm text-ivory/58">Message</span>
            <textarea
              required
              name="message"
              rows={7}
              className="w-full resize-none rounded-2xl border border-ivory/12 bg-ink-950/70 px-4 py-4 text-ivory outline-none transition placeholder:text-ivory/28 focus:border-citron"
              placeholder="Share the context, scope, or idea."
            />
          </label>

          <button
            type="submit"
            className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-ivory px-5 py-3 font-semibold text-ink-950 transition hover:bg-citron sm:w-auto"
          >
            {sent ? <CheckCircle2 className="h-5 w-5" /> : <Send className="h-5 w-5" />}
            {sent ? "Message staged" : "Send message"}
          </button>

          {sent ? (
            <p className="mt-4 rounded-2xl border border-citron/24 bg-citron/10 p-4 text-sm leading-6 text-citron">
              The form is ready for a backend or email service. For now, use the email link to send this brief directly.
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
