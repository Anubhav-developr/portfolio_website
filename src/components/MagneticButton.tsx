"use client";

import { type ComponentPropsWithoutRef, type ElementType, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps<T extends ElementType> = {
  as?: T;
  icon?: boolean;
  variant?: "primary" | "ghost";
} & ComponentPropsWithoutRef<T>;

export function MagneticButton<T extends ElementType = "a">({
  as,
  className,
  children,
  icon = true,
  variant = "primary",
  ...props
}: MagneticButtonProps<T>) {
  const Component = as ?? "a";
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18 });
  const springY = useSpring(y, { stiffness: 240, damping: 18 });

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      onMouseMove={(event) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return;
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
    >
      <Component
        className={cn(
          "magnetic-target group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-semibold tracking-normal transition",
          variant === "primary" &&
            "bg-ivory text-ink-950 shadow-[0_16px_50px_rgba(244,240,232,0.14)] hover:bg-citron",
          variant === "ghost" && "border border-ivory/14 bg-white/[0.035] text-ivory hover:border-teal/55",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {icon ? (
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        ) : null}
      </Component>
    </motion.span>
  );
}
