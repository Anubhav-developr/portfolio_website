"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface StartupAnimationProps {
  onComplete: () => void;
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
};

type CircuitLine = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  age: number;
  life: number;
};

const particleColors = ["rgb(99,136,255)", "rgb(167,139,250)", "rgb(56,189,248)"];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(-0.25, 0.25),
    vy: randomBetween(-0.25, 0.25),
    radius: randomBetween(0.3, 1.5),
    alpha: randomBetween(0.1, 0.6),
    color: particleColors[Math.floor(Math.random() * particleColors.length)]
  };
}

function createCircuitLine(width: number, height: number): CircuitLine {
  return {
    x1: Math.random() * width,
    y1: Math.random() * height,
    x2: Math.random() * width,
    y2: Math.random() * height,
    age: 0,
    life: Math.floor(randomBetween(60, 140))
  };
}

export function StartupAnimation({ onComplete }: StartupAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const completeRef = useRef(false);
  const [isExiting, setIsExiting] = useState(false);

  const complete = useCallback(() => {
    if (completeRef.current) return;
    completeRef.current = true;
    setIsExiting(true);
    window.setTimeout(onComplete, 800);
  }, [onComplete]);

  useEffect(() => {
    const autoComplete = window.setTimeout(complete, 6000);
    return () => window.clearTimeout(autoComplete);
  }, [complete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;
    let particles: Particle[] = [];
    let circuitLines: CircuitLine[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: 60 }, () => createParticle(width, height));
      circuitLines = Array.from({ length: 12 }, () => createCircuitLine(width, height));
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        context.beginPath();
        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            context.beginPath();
            context.strokeStyle = `rgba(99,136,255, ${0.06 * (1 - distance / 80)})`;
            context.lineWidth = 0.5;
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();
          }
        }
      }

      for (let i = 0; i < circuitLines.length; i += 1) {
        const line = circuitLines[i];
        line.age += 1;

        if (line.age >= line.life) {
          circuitLines[i] = createCircuitLine(width, height);
          continue;
        }

        const progress = line.age / line.life;
        const fadeIn = Math.min(progress / 0.22, 1);
        const fadeOut = Math.min((1 - progress) / 0.28, 1);
        const alpha = Math.min(fadeIn, fadeOut) * 0.04;

        context.beginPath();
        context.strokeStyle = `rgba(99,136,255, ${alpha})`;
        context.lineWidth = 0.75;
        context.moveTo(line.x1, line.y1);
        context.lineTo(line.x2, line.y2);
        context.stroke();
      }

      const pulse = Math.sin(frame * 0.04) * 4;
      context.beginPath();
      context.strokeStyle = "rgba(99,136,255,0.025)";
      context.lineWidth = 1;
      context.arc(width / 2, height / 2, 80 + pulse, 0, Math.PI * 2);
      context.stroke();

      context.beginPath();
      context.strokeStyle = "rgba(167,139,250,0.015)";
      context.lineWidth = 1;
      context.arc(width / 2, height / 2, 130 - pulse, 0, Math.PI * 2);
      context.stroke();

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!stage || !dot || !ring) return undefined;

    let isVisible = false;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animationFrame = 0;

    const moveCursor = (event: MouseEvent) => {
      isVisible = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const hideCursor = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const animateCursor = () => {
      if (isVisible) {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }

      animationFrame = window.requestAnimationFrame(animateCursor);
    };

    stage.addEventListener("mousemove", moveCursor);
    stage.addEventListener("mouseleave", hideCursor);
    animateCursor();

    return () => {
      stage.removeEventListener("mousemove", moveCursor);
      stage.removeEventListener("mouseleave", hideCursor);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={stageRef} className={`startup-stage${isExiting ? " startup-stage--exit" : ""}`}>
      <canvas ref={canvasRef} className="startup-canvas" />
      <div className="startup-grid" />
      <div className="startup-scanline" />
      <span className="startup-bracket startup-bracket--top-left" />
      <span className="startup-bracket startup-bracket--top-right" />
      <span className="startup-bracket startup-bracket--bottom-left" />
      <span className="startup-bracket startup-bracket--bottom-right" />

      <div className="startup-center">
        <div className="startup-orbit">
          <span className="startup-ring startup-ring--one" />
          <span className="startup-ring startup-ring--two" />
          <span className="startup-ring startup-ring--three" />
          <span className="startup-ring startup-ring--four" />
          <span className="startup-dot startup-dot--one" />
          <span className="startup-dot startup-dot--two" />
          <span className="startup-dot startup-dot--three" />

          <div className="startup-logo" aria-hidden="true">
            <span className="startup-logo-bar startup-logo-bar--one" />
            <span className="startup-logo-bar startup-logo-bar--two" />
            <span className="startup-logo-bar startup-logo-bar--three" />
            <span className="startup-logo-bar startup-logo-bar--four" />
          </div>
        </div>

        <h1 className="startup-name" aria-label="Anubhav Mishra">
          {"Anubhav Mishra".split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className={`startup-name-letter startup-name-letter--${index}`}
              style={{ animationDelay: `${2.35 + index * 0.07}s` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        <p className="startup-tagline">Full Stack Developer · Builder · CS Graduate</p>

        <button className="startup-enter" type="button" onClick={complete}>
          Enter portfolio
        </button>
      </div>

      <div className="startup-progress" />
      <div className="startup-status">Portfolio · 2026</div>
      <div ref={dotRef} className="startup-cursor-dot" />
      <div ref={ringRef} className="startup-cursor-ring" />
    </div>
  );
}
