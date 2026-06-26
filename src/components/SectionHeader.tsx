"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export function SectionHeader({ eyebrow, title, copy }: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="mb-12 max-w-3xl"
    >
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-teal/82">
        {eyebrow}
      </p>
      <h2 className="text-balance font-display text-4xl font-black leading-tight text-ivory sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {copy ? <p className="mt-5 text-lg leading-8 text-ivory/62">{copy}</p> : null}
    </motion.div>
  );
}
