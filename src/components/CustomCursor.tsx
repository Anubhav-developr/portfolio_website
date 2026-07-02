"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [hoverState, setHoverState] = useState<"idle" | "hover" | "project">("idle");
  const [pressed, setPressed] = useState(false);
  const springX = useSpring(x, { stiffness: 170, damping: 26, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 170, damping: 26, mass: 0.6 });

  useEffect(() => {
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest(".project-card")) {
        setHoverState("project");
        return;
      }

      if (target.closest("a, button, input, textarea, select")) {
        setHoverState("hover");
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const related = event.relatedTarget as HTMLElement | null;
      if (!target) return;

      if (target.closest(".project-card") && related?.closest(".project-card")) return;
      if (target.closest("a, button, input, textarea, select") && related?.closest("a, button, input, textarea, select")) {
        return;
      }

      setHoverState("idle");
    };

    const onPointerDown = () => setPressed(true);
    const onPointerUp = () => setPressed(false);

    window.addEventListener("pointerover", onPointerOver);
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <>
      <motion.div
        className={cn(
          "cursor-ring",
          hoverState === "hover" && "cursor-hover",
          hoverState === "project" && "cursor-project"
        )}
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="cursor-dot"
        animate={{ x, y, scale: pressed ? 0.6 : 1 }}
        transition={{ duration: pressed ? 0.08 : 0.14 }}
      />
    </>
  );
}
