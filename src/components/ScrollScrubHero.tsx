"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FRAME_COUNT = 0;
const FRAME_PATH = "/assets/hero-frames/frame";
const VIDEO_SRC = "/assets/hero-bg.mp4";
const POSTER_SRC = "/assets/hero-lab.png";

type ScrollScrubHeroProps = {
  className?: string;
};

export function ScrollScrubHero({ className = "" }: ScrollScrubHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [useFrames, setUseFrames] = useState(false);
  const framesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const onMotionChange = () => setReducedMotion(motionQuery.matches);
    motionQuery.addEventListener("change", onMotionChange);
    return () => motionQuery.removeEventListener("change", onMotionChange);
  }, []);

  useEffect(() => {
    if (FRAME_COUNT <= 0) return;

    let cancelled = false;

    async function loadFrames() {
      const images: HTMLImageElement[] = [];
      for (let index = 1; index <= FRAME_COUNT; index += 1) {
        const frameNumber = index.toString().padStart(3, "0");
        const image = new window.Image();
        image.src = `${FRAME_PATH}-${frameNumber}.webp`;
        await new Promise<void>((resolve) => {
          image.onload = () => resolve();
          image.onerror = () => resolve();
        });
        if (cancelled) return;
        if (image.complete && image.naturalWidth > 0) {
          images.push(image);
        }
      }
      if (images.length > 0) {
        framesRef.current = images;
        setUseFrames(true);
      }
    }

    loadFrames();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;

    let frame = 0;

    function resize() {
      if (!container || !canvas || !context) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawFrame(source: CanvasImageSource) {
            if (!container || !canvas || !context) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      context.clearRect(0, 0, width, height);

      const sourceWidth =
        "videoWidth" in source && source.videoWidth ? source.videoWidth : (source as HTMLImageElement).naturalWidth;
      const sourceHeight =
        "videoHeight" in source && source.videoHeight
          ? source.videoHeight
          : (source as HTMLImageElement).naturalHeight;

      if (!sourceWidth || !sourceHeight) return;

      const scale = Math.max(width / sourceWidth, height / sourceHeight);
      const drawWidth = sourceWidth * scale;
      const drawHeight = sourceHeight * scale;
      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;

      context.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);
      context.fillStyle = "rgba(1, 2, 8, 0.28)";
      context.fillRect(0, 0, width, height);
    }

    function update() {
            if (!container || !canvas || !context) return;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollStart = container.offsetTop;
      const scrollEnd = scrollStart + container.offsetHeight - viewportHeight;
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - scrollStart) / Math.max(1, scrollEnd - scrollStart))
      );

      const frames = framesRef.current;
      if (useFrames && frames.length > 0) {
        const frameIndex = Math.min(frames.length - 1, Math.floor(progress * (frames.length - 1)));
        drawFrame(frames[frameIndex]);
      } else if (video && video.readyState >= 2) {
        const duration = video.duration || 1;
        video.currentTime = progress * duration * 0.92;
        drawFrame(video);
      }

      frame = window.requestAnimationFrame(update);
    }

    resize();
    update();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", update);
    };
  }, [reducedMotion, useFrames]);

  if (reducedMotion) {
    return (
      <div className={`scroll-scrub-hero scroll-scrub-hero--static ${className}`}>
        <Image
          src={POSTER_SRC}
          alt="Mission control viewport"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover"
        />
        <div className="scroll-scrub-vignette" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`scroll-scrub-hero ${className}`}>
      <canvas ref={canvasRef} className="scroll-scrub-canvas" aria-hidden="true" />
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="sr-only"
        aria-hidden="true"
      />
      <div className="scroll-scrub-vignette" aria-hidden="true" />
      <div className="scroll-scrub-grid" aria-hidden="true" />
    </div>
  );
}

export function HeroScrollStage({ children }: { children: React.ReactNode }) {
  return <div className="hero-scroll-stage">{children}</div>;
}
