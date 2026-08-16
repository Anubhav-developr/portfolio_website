"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkle: number;
  tone: "amber" | "violet" | "cyan" | "white";
};

const toneColors: Record<Star["tone"], string> = {
  amber: "232, 168, 73",
  violet: "123, 111, 212",
  cyan: "61, 214, 200",
  white: "255, 255, 255"
};

function makeStar(width: number, height: number): Star {
  const tones: Star["tone"][] = ["white", "white", "white", "cyan", "violet", "amber"];
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.4 + 0.4,
    alpha: Math.random() * 0.55 + 0.15,
    twinkle: Math.random() * Math.PI * 2,
    tone: tones[Math.floor(Math.random() * tones.length)] ?? "white"
  };
}

export function AmbientStarfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const starCount = isMobile ? 90 : 180;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let tick = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: starCount }, () => makeStar(width, height));
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      tick += 0.016;

      for (const star of stars) {
        const pulse = 0.55 + Math.sin(tick * 1.4 + star.twinkle) * 0.45;
        const rgb = toneColors[star.tone];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${rgb}, ${star.alpha * pulse})`;
        context.fill();
      }

      frame = window.requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className="ambient-nebula" aria-hidden="true" />
      <canvas ref={canvasRef} className="ambient-starfield-canvas" aria-hidden="true" />
    </>
  );
}
