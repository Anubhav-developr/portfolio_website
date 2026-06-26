"use client";

import Image from "next/image";
import { ChevronDown, MapPin, Sparkle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, scaleIn, stagger } from "@/animations/variants";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { identity } from "@/constants/portfolio";
import { MagneticButton } from "@/components/MagneticButton";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -96]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0.46]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28"
    >
      <BackgroundVideo />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <div className="section-shell grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10">
          <motion.div
            variants={fadeUp}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-ivory/12 bg-white/[0.04] px-3 py-2 text-sm text-ivory/68 backdrop-blur"
          >
            <Sparkle className="h-4 w-4 text-citron" aria-hidden="true" />
            {identity.title}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-balance font-display text-[clamp(3.4rem,8.2vw,8.5rem)] font-black leading-[0.9] tracking-normal"
          >
            {identity.name}
            {" "}
            <span className="block gradient-text">builds quietly brilliant software.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-lg leading-8 text-ivory/70 sm:text-xl"
          >
            {identity.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 inline-flex items-center gap-2 text-sm text-ivory/58"
          >
            <MapPin className="h-4 w-4 text-teal" aria-hidden="true" />
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
          className="relative min-h-[520px] lg:min-h-[680px]"
        >
          <div className="absolute inset-0 rounded-[36px] border border-ivory/10 bg-white/[0.028] shadow-velvet backdrop-blur-2xl" />
          <div className="scanline absolute inset-4 overflow-hidden rounded-[28px] border border-white/10 bg-ink-900/74">
            <div className="absolute inset-0">
              <Image
                src="/assets/hero-lab.png"
                alt="Cinematic Android engineering visual"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover opacity-88"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.18),transparent_45%,rgba(7,8,7,0.26))]" />
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute left-3 top-14 w-52 rounded-2xl border border-ivory/12 bg-ink-950/68 p-4 shadow-rim backdrop-blur-xl sm:left-8"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-ivory/42">
              build graph
              <span className="h-2 w-2 rounded-full bg-citron" />
            </div>
            <div className="mt-5 space-y-2">
              {[88, 64, 78].map((width, index) => (
                <div key={width} className="h-2 rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal to-citron"
                    style={{ width: `${width - index * 5}%` }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="absolute bottom-16 right-2 w-60 rounded-2xl border border-ivory/12 bg-ink-950/70 p-4 shadow-rim backdrop-blur-xl sm:right-8"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 15 }).map((_, index) => (
                <span
                  key={index}
                  className="h-8 rounded-lg border border-white/8 bg-white/[0.04]"
                  style={{
                    opacity: 0.35 + (index % 5) * 0.12,
                    background:
                      index % 4 === 0 ? "rgba(201,255,100,.16)" : "rgba(255,255,255,.04)"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#profile"
        aria-label="Scroll to profile"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full border border-ivory/12 p-3 text-ivory/58 transition hover:text-ivory md:grid"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
