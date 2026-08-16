"use client";

import { useEffect, useRef, useState } from "react";

type TelemetryRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

const statusRows: TelemetryRow[] = [
  { label: "SYSTEMS", value: "ONLINE", highlight: true },
  { label: "BASE", value: "SHAHJAHANPUR, IN" },
  { label: "STATUS", value: "OPEN TO WORK", highlight: true }
];

const metricRows: TelemetryRow[] = [
  { label: "GLOBAL RANK", value: "24" },
  { label: "PROJECTS SHIPPED", value: "09" },
  { label: "B.TECH CSE", value: "2023" }
];

export function MissionTelemetry() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`mission-telemetry font-mono transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
      aria-label="Mission status telemetry"
    >
      <div className="telemetry-header">
        <span className="telemetry-dot" aria-hidden="true" />
        <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--ion-cyan)]">Live readout</span>
      </div>

      <div className="telemetry-block">
        {statusRows.map((row) => (
          <div key={row.label} className="telemetry-row">
            <span className="telemetry-label">{row.label}</span>
            <span className={row.highlight ? "telemetry-value telemetry-value--live" : "telemetry-value"}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="telemetry-divider" aria-hidden="true" />

      <div className="telemetry-block">
        {metricRows.map((row) => (
          <div key={row.label} className="telemetry-row">
            <span className="telemetry-label">{row.label}</span>
            <span className="telemetry-value telemetry-value--metric">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="telemetry-scanline" aria-hidden="true" />
    </div>
  );
}

export function MissionTelemetryCompact() {
  return (
    <div className="mission-telemetry mission-telemetry--compact font-mono" aria-label="Mission status">
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px]">
        <span>
          <span className="text-[var(--text-muted)]">SYSTEMS </span>
          <span className="text-[var(--ion-cyan)]">ONLINE</span>
        </span>
        <span>
          <span className="text-[var(--text-muted)]">RANK </span>
          <span className="text-[var(--starlight-amber)]">24</span>
        </span>
        <span>
          <span className="text-[var(--text-muted)]">SHIPPED </span>
          <span className="text-[var(--text-primary)]">09</span>
        </span>
      </div>
    </div>
  );
}
