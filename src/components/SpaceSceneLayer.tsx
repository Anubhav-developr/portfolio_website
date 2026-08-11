"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SpaceScene = dynamic(() => import("@/components/SpaceScene").then((module) => module.SpaceScene), {
  ssr: false,
  loading: () => null
});

type SpaceQuality = {
  isMobile: boolean;
  reducedMotion: boolean;
  ready: boolean;
};

export function SpaceSceneLayer() {
  const [quality, setQuality] = useState<SpaceQuality>({
    isMobile: false,
    reducedMotion: true,
    ready: false
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateQuality = () => {
      setQuality((current) => ({
        ...current,
        isMobile: mobileQuery.matches,
        reducedMotion: motionQuery.matches
      }));
    };

    updateQuality();

    const timer = window.setTimeout(() => {
      setQuality((current) => ({ ...current, ready: true }));
    }, 260);

    mobileQuery.addEventListener("change", updateQuality);
    motionQuery.addEventListener("change", updateQuality);

    return () => {
      window.clearTimeout(timer);
      mobileQuery.removeEventListener("change", updateQuality);
      motionQuery.removeEventListener("change", updateQuality);
    };
  }, []);

  return (
    <div aria-hidden="true" className="space-scene-layer">
      <div className="space-scene-fallback" />
      {quality.ready && !quality.reducedMotion ? <SpaceScene isMobile={quality.isMobile} /> : null}
    </div>
  );
}
