"use client";

import { motion } from "framer-motion";
import { stats } from "@/constants/portfolio";

export function StatsRibbon() {
  return (
    <section aria-label="Portfolio statistics" className="section-shell py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="grid overflow-hidden rounded-[28px] border border-ivory/12 bg-white/[0.035] shadow-rim backdrop-blur-xl md:grid-cols-3"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative min-h-36 border-b border-ivory/10 p-6 md:border-b-0 md:border-r last:md:border-r-0"
          >
            <p className="font-display text-5xl font-black text-ivory">{stat.value}</p>
            <p className="mt-3 max-w-48 text-sm leading-6 text-ivory/58">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
