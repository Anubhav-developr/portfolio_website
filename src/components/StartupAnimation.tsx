"use client";

import { useCallback, useEffect, useState } from "react";

interface StartupAnimationProps {
  onComplete: () => void;
}

const stars = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 37) % 101}%`,
  top: `${(index * 61) % 97}%`,
  delay: `${(index % 7) * 0.22}s`,
  size: index % 5 === 0 ? "3px" : "2px"
}));

export function StartupAnimation({ onComplete }: StartupAnimationProps) {
  const [isExiting, setIsExiting] = useState(false);

  const complete = useCallback(() => {
    setIsExiting((current) => {
      if (current) return current;
      window.setTimeout(onComplete, 420);
      return true;
    });
  }, [onComplete]);

  useEffect(() => {
    const autoComplete = window.setTimeout(complete, 2600);
    return () => window.clearTimeout(autoComplete);
  }, [complete]);

  return (
    <div className={`startup-stage startup-stage--quantum${isExiting ? " startup-stage--burst startup-stage--exit" : ""}`}>
      <div className="quantum-stars" aria-hidden="true">
        {stars.map((star, index) => (
          <i key={index} style={{ left: star.left, top: star.top, animationDelay: star.delay, width: star.size, height: star.size }} />
        ))}
      </div>
      <div className="quantum-grid" aria-hidden="true" />
      <div className="quantum-scan" aria-hidden="true" />
      <span className="quantum-corner quantum-corner--tl" aria-hidden="true" />
      <span className="quantum-corner quantum-corner--tr" aria-hidden="true" />
      <span className="quantum-corner quantum-corner--bl" aria-hidden="true" />
      <span className="quantum-corner quantum-corner--br" aria-hidden="true" />

      <div className="quantum-research-readout quantum-research-readout--left">OBSERVATORY / 07</div>
      <div className="quantum-research-readout quantum-research-readout--right">Q-STATE: STABLE</div>

      <div className="quantum-center">
        <div className="quantum-orbit" aria-hidden="true">
          <span className="quantum-ring quantum-ring--outer" />
          <span className="quantum-ring quantum-ring--middle" />
          <span className="quantum-ring quantum-ring--inner" />
          <span className="quantum-particle quantum-particle--one" />
          <span className="quantum-particle quantum-particle--two" />
          <span className="quantum-particle quantum-particle--three" />
          <span className="quantum-core"><span /></span>
        </div>

        <div className="quantum-kicker"><span /> Initialising research sequence <span /></div>
        <h1 className="quantum-title" aria-label="Anubhav Mishra">Anubhav <em>Mishra</em></h1>
        <p className="quantum-subtitle">Space · Quantum · Research · Engineering</p>

        <button className="quantum-enter" type="button" onClick={complete}>
          <span>Enter the observatory</span>
          <b>↗</b>
        </button>
      </div>

      <div className="quantum-status"><span /> calibrating field / 100%</div>
      <div className="quantum-progress" aria-hidden="true" />
      <div className="quantum-burst" aria-hidden="true">
        <span className="quantum-burst__core" />
        <span className="quantum-burst__wave quantum-burst__wave--one" />
        <span className="quantum-burst__wave quantum-burst__wave--two" />
        <span className="quantum-burst__ray quantum-burst__ray--one" />
        <span className="quantum-burst__ray quantum-burst__ray--two" />
        <span className="quantum-burst__ray quantum-burst__ray--three" />
        <span className="quantum-burst__ray quantum-burst__ray--four" />
        <span className="quantum-burst__ray quantum-burst__ray--five" />
        <span className="quantum-burst__ray quantum-burst__ray--six" />
      </div>
    </div>
  );
}
