"use client";

import { useState } from "react";
import { StartupAnimation } from "@/components/StartupAnimation";

export function StartupIntro() {
  const [showIntro, setShowIntro] = useState(true);

  if (!showIntro) return null;

  return <StartupAnimation onComplete={() => setShowIntro(false)} />;
}
