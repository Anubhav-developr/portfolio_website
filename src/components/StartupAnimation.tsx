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
const dataStreams = [
  "01001000 01100101 01101100 01101100",
  "MVVM -> Room -> Hilt -> Lottie",
  "build() -> commit() -> ship()",
  "01000001 01001101",
  "Android · Java · MVVM",
  "git push origin main"
];
const streamLeft = ["5%", "15%", "60%", "72%", "82%", "90%"];
const streamDelay = ["0.5s", "1.2s", "0.8s", "2s", "1.5s", "0.3s"];
const streamDuration = ["6s", "8s", "7s", "11s", "9s", "6.8s"];

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
      <div className="startup-streams" aria-hidden="true">
        {dataStreams.map((stream, index) => (
          <span
            key={stream}
            className="startup-stream"
            style={{
              left: streamLeft[index],
              animationDelay: streamDelay[index],
              animationDuration: streamDuration[index]
            }}
          >
            {stream}
          </span>
        ))}
      </div>
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

        <p className="startup-tagline">Android Engineer · Builder · CS Graduate</p>

        <button className="startup-enter" type="button" onClick={complete}>
          Enter portfolio
        </button>
      </div>

      <div className="startup-progress" />
      <div className="startup-status">INITIALIZING · v2025.1</div>
      <div ref={dotRef} className="startup-cursor-dot" />
      <div ref={ringRef} className="startup-cursor-ring" />

      <style jsx>{`
        .startup-stage {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;
          cursor: none;
          background:
            radial-gradient(circle at 50% 48%, rgba(99, 136, 255, 0.13), transparent 30%),
            radial-gradient(circle at 72% 24%, rgba(167, 139, 250, 0.12), transparent 26%),
            #03040a;
          color: white;
          opacity: 1;
          transition: opacity 0.8s ease;
        }

        .startup-stage--exit {
          opacity: 0;
          pointer-events: none;
        }

        .startup-canvas,
        .startup-grid,
        .startup-streams,
        .startup-scanline {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .startup-canvas {
          display: block;
        }

        .startup-grid {
          pointer-events: none;
          opacity: 0;
          animation: startupGrid 1s ease 0.3s forwards;
          background-image:
            linear-gradient(to right, transparent 24.95%, rgba(99, 136, 255, 0.04) 25%, transparent 25.05%),
            linear-gradient(to right, transparent 49.95%, rgba(99, 136, 255, 0.04) 50%, transparent 50.05%),
            linear-gradient(to right, transparent 74.95%, rgba(99, 136, 255, 0.04) 75%, transparent 75.05%),
            linear-gradient(to bottom, transparent 24.95%, rgba(99, 136, 255, 0.04) 25%, transparent 25.05%),
            linear-gradient(to bottom, transparent 49.95%, rgba(99, 136, 255, 0.04) 50%, transparent 50.05%),
            linear-gradient(to bottom, transparent 74.95%, rgba(99, 136, 255, 0.04) 75%, transparent 75.05%);
        }

        .startup-streams {
          pointer-events: none;
        }

        .startup-stream {
          position: absolute;
          bottom: 0;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 9px;
          color: rgba(99, 136, 255, 0.25);
          white-space: nowrap;
          opacity: 0;
          animation-name: startupStream;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .startup-scanline {
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(99, 136, 255, 0.6) 30%,
            rgba(167, 139, 250, 0.8) 50%,
            rgba(99, 136, 255, 0.6) 70%,
            transparent 100%
          );
          animation: startupScan 3s ease-in-out 0.1s forwards;
          opacity: 0;
        }

        .startup-bracket {
          position: absolute;
          width: 20px;
          height: 20px;
          opacity: 0;
          animation: startupBracket 0.4s ease forwards;
        }

        .startup-bracket--top-left {
          top: 16px;
          left: 16px;
          border-top: 1px solid rgba(99, 136, 255, 0.4);
          border-left: 1px solid rgba(99, 136, 255, 0.4);
          animation-delay: 1s;
        }

        .startup-bracket--top-right {
          top: 16px;
          right: 16px;
          border-top: 1px solid rgba(99, 136, 255, 0.4);
          border-right: 1px solid rgba(99, 136, 255, 0.4);
          animation-delay: 1s;
        }

        .startup-bracket--bottom-left {
          bottom: 16px;
          left: 16px;
          border-bottom: 1px solid rgba(99, 136, 255, 0.4);
          border-left: 1px solid rgba(99, 136, 255, 0.4);
          animation-delay: 1.1s;
        }

        .startup-bracket--bottom-right {
          right: 16px;
          bottom: 16px;
          border-right: 1px solid rgba(99, 136, 255, 0.4);
          border-bottom: 1px solid rgba(99, 136, 255, 0.4);
          animation-delay: 1.2s;
        }

        .startup-center {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(92vw, 440px);
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .startup-orbit {
          position: relative;
          width: 180px;
          height: 180px;
          margin: 0 auto;
        }

        .startup-ring {
          position: absolute;
          border-style: solid;
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.2);
          animation-name: startupRingIn, startupSpinClockwise;
          animation-duration: 3.2s, var(--spin-duration);
          animation-delay: var(--ring-delay), var(--ring-delay);
          animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1), linear;
          animation-iteration-count: 1, infinite;
          animation-fill-mode: forwards, none;
        }

        .startup-ring--one {
          inset: 0;
          --ring-delay: 0.2s;
          --spin-duration: 12s;
          border-width: 0.5px;
          border-color: rgba(99, 136, 255, 0.15);
        }

        .startup-ring--two {
          inset: 14px;
          --ring-delay: 0.5s;
          --spin-duration: 18s;
          border-width: 0.5px;
          border-color: rgba(167, 139, 250, 0.12);
          animation-name: startupRingIn, startupSpinCounter;
        }

        .startup-ring--three {
          inset: 30px;
          --ring-delay: 0.8s;
          --spin-duration: 9s;
          border-width: 0.5px;
          border-color: rgba(56, 189, 248, 0.1);
        }

        .startup-ring--four {
          inset: 48px;
          --ring-delay: 1.1s;
          --spin-duration: 24s;
          border-width: 0.5px;
          border-color: rgba(99, 136, 255, 0.08);
          animation-name: startupRingIn, startupSpinCounter;
        }

        .startup-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          opacity: 0;
          transform-origin: 0 0;
          animation-name: startupOrbit;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }

        .startup-dot--one {
          --orbit-radius: 86px;
          background: rgba(99, 136, 255, 0.8);
          animation-duration: 6s;
          animation-delay: 1.5s;
        }

        .startup-dot--two {
          --orbit-radius: 72px;
          background: rgba(167, 139, 250, 0.7);
          animation-duration: 10s;
          animation-delay: 2s;
        }

        .startup-dot--three {
          --orbit-radius: 56px;
          background: rgba(56, 189, 248, 0.6);
          animation-duration: 15s;
          animation-delay: 2.5s;
        }

        .startup-logo {
          position: absolute;
          inset: 62px;
          border-radius: 50%;
          opacity: 0;
          transform: scale(0) rotate(0deg);
          animation: startupLogo 1s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s forwards;
        }

        .startup-logo-bar {
          position: absolute;
          display: block;
          border-radius: 999px;
          transform: scaleY(0);
          transform-origin: bottom;
          animation: startupLogoBar 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .startup-logo-bar--one {
          left: 8px;
          top: 9px;
          width: 6px;
          height: 38px;
          background: #6388ff;
          animation-delay: 1.6s;
        }

        .startup-logo-bar--two {
          left: 18px;
          top: 19px;
          width: 6px;
          height: 28px;
          background: #a78bfa;
          animation-delay: 1.72s;
        }

        .startup-logo-bar--three {
          left: 28px;
          top: 27px;
          width: 6px;
          height: 20px;
          background: #38bdf8;
          animation-delay: 1.84s;
        }

        .startup-logo-bar--four {
          left: 8px;
          top: 50px;
          width: 20px;
          height: 3px;
          background: rgba(99, 136, 255, 0.5);
          animation-delay: 1.96s;
        }

        .startup-name {
          margin: 26px 0 0;
          color: white;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .startup-name-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(20px) scale(0.6);
          animation: startupLetter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .startup-name-letter--6 {
          color: #6388ff;
        }

        .startup-name-letter--8 {
          color: #a78bfa;
        }

        .startup-name-letter--9 {
          color: #38bdf8;
        }

        .startup-tagline {
          margin: 14px 0 0;
          color: rgba(255, 255, 255, 0.35);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.45em;
          line-height: 1.8;
          text-transform: uppercase;
          opacity: 0;
          animation: startupTagline 0.8s ease 3.5s forwards;
        }

        .startup-enter {
          position: relative;
          margin-top: 34px;
          overflow: hidden;
          border: 0.5px solid rgba(99, 136, 255, 0.35);
          border-radius: 6px;
          padding: 10px 28px;
          color: rgba(255, 255, 255, 0.7);
          background: transparent;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
          animation: startupEnter 0.8s ease 4s forwards;
          cursor: none;
          transition:
            background 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .startup-enter::before {
          position: absolute;
          inset: 0;
          content: "";
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.18),
            transparent
          );
          transform: translateX(-120%);
          animation: startupShimmer 3s ease-in-out 4.5s infinite;
        }

        .startup-enter:hover {
          border-color: rgba(99, 136, 255, 0.6);
          color: white;
          background: rgba(99, 136, 255, 0.1);
        }

        .startup-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1.5px;
          width: 0;
          background: linear-gradient(90deg, #6388ff, #a78bfa, #38bdf8);
          animation: startupProgress 3.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
        }

        .startup-status {
          position: absolute;
          right: 24px;
          bottom: 24px;
          color: rgba(99, 136, 255, 0.5);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          opacity: 0;
          animation: startupStatus 0.5s ease 2s forwards;
        }

        .startup-cursor-dot,
        .startup-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 2;
          pointer-events: none;
          border-radius: 50%;
          opacity: 0;
        }

        .startup-cursor-dot {
          width: 4px;
          height: 4px;
          background: #6388ff;
        }

        .startup-cursor-ring {
          width: 24px;
          height: 24px;
          border: 0.5px solid rgba(99, 136, 255, 0.5);
        }

        @keyframes startupGrid {
          to {
            opacity: 1;
          }
        }

        @keyframes startupStream {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          12% {
            opacity: 1;
          }
          82% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-520px);
          }
        }

        @keyframes startupScan {
          0% {
            top: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          88% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes startupBracket {
          from {
            opacity: 0;
            transform: scale(1.4);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes startupRingIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes startupSpinClockwise {
          to {
            rotate: 360deg;
          }
        }

        @keyframes startupSpinCounter {
          to {
            rotate: -360deg;
          }
        }

        @keyframes startupOrbit {
          0% {
            opacity: 0;
            transform: rotate(0deg) translateX(var(--orbit-radius)) scale(0);
          }
          10% {
            opacity: 1;
            transform: rotate(36deg) translateX(var(--orbit-radius)) scale(1);
          }
          100% {
            opacity: 1;
            transform: rotate(360deg) translateX(var(--orbit-radius)) scale(1);
          }
        }

        @keyframes startupLogo {
          to {
            opacity: 1;
            transform: scale(1) rotate(360deg);
          }
        }

        @keyframes startupLogoBar {
          to {
            transform: scaleY(1);
          }
        }

        @keyframes startupLetter {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes startupTagline {
          to {
            opacity: 1;
            letter-spacing: 0.22em;
          }
        }

        @keyframes startupEnter {
          to {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        @keyframes startupShimmer {
          0% {
            transform: translateX(-120%);
          }
          55%,
          100% {
            transform: translateX(120%);
          }
        }

        @keyframes startupProgress {
          to {
            width: 100%;
          }
        }

        @keyframes startupStatus {
          to {
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          .startup-orbit {
            width: 160px;
            height: 160px;
          }

          .startup-name {
            font-size: 28px;
          }

          .startup-tagline {
            padding-inline: 20px;
            font-size: 9px;
          }

          .startup-status {
            right: 16px;
            bottom: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .startup-stage,
          .startup-stage * {
            animation-duration: 0.001ms !important;
            animation-delay: 0s !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </div>
  );
}
