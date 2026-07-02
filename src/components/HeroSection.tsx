"use client";

import Image from "next/image";
import { ChevronDown, GraduationCap, MapPin, PackageCheck, Trophy } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, scaleIn, stagger } from "@/animations/variants";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { HeroCanvas } from "@/components/HeroCanvas";
import { MagneticButton } from "@/components/MagneticButton";
import { identity } from "@/constants/portfolio";

const heroChips = [
  { label: "Global Rank 24", icon: Trophy, className: "right-0 top-12", duration: "4s" },
  { label: "9 Projects Shipped", icon: PackageCheck, className: "bottom-24 left-0", duration: "5s" },
  { label: "B.Tech CSE 2023", icon: GraduationCap, className: "bottom-8 right-8", duration: "3.5s" }
];

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -54]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0.58]);

  return (
    <section
      id="top"
      className="hero-mobile-poster relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[var(--grad-hero)] px-5 pb-20 pt-[120px]"
    >
      <BackgroundVideo />
      <HeroCanvas />
      <div aria-hidden="true" className="absolute inset-0 z-10 bg-[rgba(2,3,4,0.38)]" />
      <div aria-hidden="true" className="section-fade z-20" />

      <div className="relative z-30 w-full">
        <div className="section-shell grid items-center gap-14 lg:grid-cols-[0.6fr_0.4fr]">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10">
            <motion.div
              variants={fadeUp}
              className="mb-7 inline-flex rounded-full border-[0.5px] border-[rgba(99,136,255,0.2)] bg-[rgba(99,136,255,0.06)] px-[14px] py-[5px] text-[10px] font-medium uppercase tracking-[0.18em] text-[rgba(99,136,255,0.8)]"
            >
              {identity.heroEyebrow}
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-display max-w-4xl text-balance font-display text-[var(--text-primary)]">
              <span className="block">{identity.name}</span>
              {" "}
              <span className="block">
                builds <span className="gradient-text">quietly brilliant</span> software.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-body mt-7 max-w-[400px] text-base">
              {identity.tagline}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-3 inline-flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <MapPin className="h-4 w-4 text-[var(--accent-cyan)]" aria-hidden="true" />
              {identity.location}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="#projects">Explore projects</MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                Work together
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            style={{ y, opacity }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[480px]"
          >
            <div className="absolute right-[-20px] top-10 aspect-[4/3] w-[75%] rotate-[6deg] overflow-hidden rounded-[var(--card-radius)] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] opacity-50 blur-[1px]">
              <Image
                src="/assets/hero-lab.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 74vw, 28vw"
                className="object-cover"
              />
            </div>

            <div
              className="scanline absolute left-0 top-0 aspect-[4/3] w-[85%] overflow-hidden rounded-[var(--card-radius)] border-[0.5px] border-[var(--border-mid)] bg-[var(--bg-raised)] shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_0.5px_rgba(255,255,255,0.06)_inset]"
              style={{ animation: "heroFloat 6s ease-in-out infinite" }}
            >
              <Image
                src="/assets/hero-lab.png"
                alt="Cinematic Android engineering visual"
                fill
                priority
                sizes="(max-width: 1024px) 86vw, 34vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(99,136,255,0.18),transparent_42%),linear-gradient(180deg,transparent,rgba(2,3,4,0.35))]" />
            </div>

            {heroChips.map((chip) => {
              const Icon = chip.icon;
              return (
                <div
                  key={chip.label}
                  className={`absolute inline-flex items-center gap-2 rounded-full border-[0.5px] border-white/10 bg-[rgba(10,13,18,0.85)] px-[14px] py-1.5 text-[11px] font-medium text-[var(--text-secondary)] shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-xl ${chip.className}`}
                  style={{ animation: `chipFloat ${chip.duration} ease-in-out infinite` }}
                >
                  <Icon className="h-3.5 w-3.5 text-[var(--accent-cyan)]" />
                  {chip.label}
                </div>
              );
            })}
          </motion.div>
        </div>

        <a
          href="#profile"
          aria-label="Scroll to profile"
          className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full border-[0.5px] border-white/[0.12] p-3 text-white/50 transition hover:border-white/25 hover:text-white md:grid"
        >
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
