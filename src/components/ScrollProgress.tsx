"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-citron via-teal to-copper"
      style={{ scaleX, width: "100%" }}
    />
  );
}
