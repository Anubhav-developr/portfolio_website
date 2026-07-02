"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ScrollProgress() {
  useScrollReveal();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[200] h-[1.5px] origin-left bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan"
      style={{ scaleX, width: "100%" }}
    />
  );
}
