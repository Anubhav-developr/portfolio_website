"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/constants/portfolio";
import type { Stat } from "@/types/portfolio";

function CountUpStat({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const target = Number.parseInt(stat.value, 10);
  const [display, setDisplay] = useState(Number.isFinite(target) ? 0 : stat.value);

  useEffect(() => {
    if (!isInView || !Number.isFinite(target)) return;

    let frame = 0;
    const start = performance.now();
    const duration = 1100 + index * 140;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased).toString());

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [index, isInView, target]);

  return (
    <div
      ref={ref}
      className="reveal relative min-h-36 px-7 py-10 md:border-r-[0.5px] md:border-[var(--border-dim)] last:md:border-r-0"
    >
      <p className="font-display text-[clamp(36px,5vw,56px)] font-extrabold leading-none text-transparent [background:var(--grad-name)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
        {display}
      </p>
      <p className="mt-4 max-w-56 text-[12px] font-medium uppercase leading-5 tracking-[0.10em] text-[var(--text-muted)]">
        {stat.label}
      </p>
    </div>
  );
}

export function StatsRibbon() {
  return (
    <section aria-label="Portfolio statistics" className="relative border-y-[0.5px] border-[var(--border-dim)] bg-[var(--bg-surface)] py-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto grid max-w-[1180px] md:grid-cols-3"
      >
        {stats.map((stat, index) => (
          <CountUpStat key={stat.label} stat={stat} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
