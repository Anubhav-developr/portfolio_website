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
      className="reveal mb-12 max-w-3xl"
    >
      <p className="text-micro mb-3 text-[var(--accent-blue)]">
        {eyebrow}
      </p>
      <h2 className="text-heading text-balance font-display text-[var(--text-primary)]">
        {title}
      </h2>
      {copy ? <p className="text-body mt-5 max-w-2xl">{copy}</p> : null}
    </motion.div>
  );
}
