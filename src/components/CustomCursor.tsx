"use client";

import { motion, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const springX = useSpring(x, { stiffness: 320, damping: 34, mass: 0.28 });
  const springY = useSpring(y, { stiffness: 320, damping: 34, mass: 0.28 });

  return (
    <>
      <motion.div className="cursor-ring" style={{ x: springX, y: springY }} />
      <motion.div className="cursor-dot" animate={{ x, y }} transition={{ duration: 0 }} />
    </>
  );
}
