"use client";

import { useEffect, useState } from "react";
import { StartupAnimation } from "@/components/StartupAnimation";

export function StartupIntro() {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      document.body.classList.remove("startup-active");
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.classList.add("startup-active");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.classList.remove("startup-active");
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  if (!showIntro) return null;

  if (!mounted) {
    return <div className="startup-stage" aria-hidden="true" />;
  }

  return <StartupAnimation onComplete={() => setShowIntro(false)} />;
}
