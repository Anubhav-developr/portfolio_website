"use client";

import { type ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, ExternalLink, Globe, Landmark, Monitor, Smartphone } from "lucide-react";
import type { Project, ProjectTone } from "@/types/portfolio";

type VisualProps = { accent: string };

export function ProjectVisual({ project }: { project: Project }) {
  const visuals: Record<ProjectTone, ReactNode> = {
    pulse: <ExamPulseVisual accent={project.accent} />,
    postoffice: <PostOfficeVisual accent={project.accent} />,
    tree: <MinimaxVisual accent={project.accent} />,
    compiler: <CompilerVisual accent={project.accent} />,
    clipboard: <ClipboardVisual accent={project.accent} />,
    invoice: <InvoiceVisual accent={project.accent} />,
    weather: <WeatherVisual accent={project.accent} />,
    journal: <JournalVisual accent={project.accent} />,
    portfolio: <PortfolioVisual accent={project.accent} />
  };

  return (
    <div className="relative min-h-[460px] overflow-hidden rounded-[26px] border border-ivory/10 bg-ink-950/80 p-5">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(135deg, ${project.accent}24, transparent 38%), linear-gradient(45deg, rgba(244,240,232,0.08), transparent 50%)`
        }}
      />
      <div className="relative z-10 flex h-full min-h-[420px] items-center justify-center">
        {visuals[project.tone]}
      </div>
    </div>
  );
}

function ExamPulseVisual({ accent }: VisualProps) {
  return (
    <div className="relative h-[390px] w-[220px] rounded-[34px] border border-ivory/18 bg-ink-900 p-3 shadow-velvet transition duration-500 group-hover:rotate-[-2deg] group-hover:scale-[1.02]">
      <div className="h-full rounded-[26px] border border-white/8 bg-[#0b0f0d] p-4">
        <div className="mx-auto mb-5 h-1 w-14 rounded-full bg-white/22" />
        <motion.div
          className="rounded-3xl p-4"
          style={{ background: `${accent}18` }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-ivory/42">Quiz pulse</p>
          <div className="mt-5 h-24 rounded-2xl border border-ivory/10 bg-white/[0.055]">
            <motion.div
              className="h-full rounded-2xl"
              style={{ background: `linear-gradient(180deg, ${accent}44, transparent)` }}
              animate={{ height: ["20%", "78%", "45%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
        <div className="mt-5 space-y-3">
          {[0, 1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-ivory/10 bg-white/[0.035] p-3"
              initial={{ opacity: 0.4, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item * 0.35, duration: 0.5, repeat: Infinity, repeatDelay: 2.8 }}
            >
              <motion.span
                className="h-5 w-5 rounded-full border"
                style={{ borderColor: accent }}
                animate={item === 1 ? { backgroundColor: `${accent}55` } : {}}
                transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 3, repeatType: "reverse" }}
              />
              <span className="h-2 flex-1 rounded-full bg-white/14" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PostOfficeVisual({ accent }: VisualProps) {
  const rows = ["Savings A/C · ₹12,450", "RD Deposit · ₹2,000", "Customer #PO-2841", "Balance update"];

  return (
    <div className="w-full max-w-[520px]">
      <div className="mx-auto mb-5 flex h-[280px] w-[160px] flex-col rounded-[28px] border border-ivory/14 bg-ink-900 p-3 shadow-velvet">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
        <div className="mb-3 flex items-center gap-2 rounded-xl px-2 py-2" style={{ background: `${accent}22` }}>
          <Landmark className="h-4 w-4" style={{ color: accent }} />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-ivory/70">India Post</span>
        </div>
        <div className="flex-1 space-y-2 overflow-hidden p-1">
          {rows.map((row, index) => (
            <motion.div
              key={row}
              className="rounded-xl border border-ivory/10 bg-white/[0.04] px-3 py-2 text-[10px] text-ivory/62"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.55, duration: 0.45, repeat: Infinity, repeatDelay: 4 }}
            >
              {row}
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-2 rounded-xl py-2 text-center text-[10px] font-bold uppercase tracking-wider text-ink-950"
          style={{ background: accent }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Record deposit
        </motion.div>
      </div>
    </div>
  );
}

function MinimaxVisual({ accent }: VisualProps) {
  const board = ["X", "", "O", "", "X", "", "O", "", ""];
  const [activeCell, setActiveCell] = useState(4);

  useEffect(() => {
    const cells = [0, 4, 8, 2, 6];
    let i = 0;
    const timer = window.setInterval(() => {
      i = (i + 1) % cells.length;
      setActiveCell(cells[i]);
    }, 1200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="grid w-full max-w-[560px] gap-4 md:grid-cols-[0.95fr_1.05fr]">
      <div
        className="grid grid-cols-3 gap-2 rounded-[24px] border border-ivory/12 bg-ink-900/82 p-4"
        style={{ animation: "boardPulse 2.4s ease-in-out infinite" }}
      >
        {board.map((mark, index) => (
          <motion.div
            key={index}
            className="grid h-14 place-items-center rounded-xl border border-ivory/10 bg-white/[0.04] font-display text-xl font-black"
            animate={
              activeCell === index
                ? { scale: [1, 1.08, 1], borderColor: [`${accent}44`, accent, `${accent}44`] }
                : { scale: 1 }
            }
            transition={{ duration: 0.5 }}
            style={{ color: mark === "X" ? accent : mark === "O" ? "#a78bfa" : "transparent" }}
          >
            {mark}
          </motion.div>
        ))}
      </div>
      <div className="relative h-[220px] rounded-[24px] border border-ivory/12 bg-ink-900/82 p-4">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ivory/42">Minimax tree</p>
        <svg className="absolute inset-x-4 top-12 h-[150px] w-[calc(100%-2rem)]" viewBox="0 0 240 150" aria-hidden="true">
          <path d="M120 10 L60 55 L30 100" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
          <path d="M120 10 L60 55 L90 100" stroke={accent} strokeOpacity="0.3" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
          <path d="M120 10 L180 55 L150 100" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
          <path d="M180 55 L210 100" stroke={accent} strokeOpacity="0.3" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
        </svg>
        {[
          { label: "max", top: "8%", left: "46%" },
          { label: "min", top: "36%", left: "22%" },
          { label: "min", top: "36%", left: "70%" },
          { label: "9", top: "68%", left: "10%" },
          { label: "prune", top: "68%", left: "34%" },
          { label: "7", top: "68%", left: "58%" },
          { label: "prune", top: "68%", left: "82%" }
        ].map((node, index) => (
          <motion.span
            key={`${node.label}-${index}`}
            className="absolute grid h-9 w-9 -translate-x-1/2 place-items-center rounded-lg border border-ivory/12 bg-ink-950 font-mono text-[10px]"
            style={{ top: node.top, left: node.left, color: node.label === "prune" ? "#666" : accent }}
            animate={{ opacity: [0.35, 1, 0.35], scale: [0.92, 1, 0.92] }}
            transition={{ delay: index * 0.25, duration: 2.4, repeat: Infinity }}
          >
            {node.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function CompilerVisual({ accent }: VisualProps) {
  const tokens = ["LET", "IDENT", "EQUAL", "NUMBER", "PLUS", "CALL", "EOF"];
  const branches = ["Program", "Declaration", "BinaryExpr", "CallExpr"];

  return (
    <div className="grid w-full max-w-[560px] gap-4 md:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[24px] border border-ivory/12 bg-ink-900/82 p-4 shadow-rim">
        <div className="mb-4 flex items-center gap-2 text-sm text-ivory/48">
          <Code2 className="h-4 w-4" style={{ color: accent }} />
          token stream
        </div>
        <div className="space-y-2 font-mono text-xs text-ivory/58">
          {tokens.map((token, index) => (
            <motion.div
              key={token}
              className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2"
              animate={{ x: [0, 6, 0], backgroundColor: ["rgba(255,255,255,0.04)", `${accent}18`, "rgba(255,255,255,0.04)"] }}
              transition={{ delay: index * 0.3, duration: 2.2, repeat: Infinity, repeatDelay: 0.5 }}
            >
              <span>{token}</span>
              <ArrowRight className="h-3 w-3" style={{ color: accent }} />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="rounded-[24px] border border-ivory/12 bg-ink-900/82 p-5 shadow-rim">
        <p className="mb-4 text-sm text-ivory/48">abstract syntax tree</p>
        <div className="space-y-3">
          {branches.map((branch, index) => (
            <motion.div
              key={branch}
              className="rounded-2xl border border-ivory/10 bg-white/[0.035] px-4 py-3 text-sm text-ivory/68"
              style={{ marginLeft: index * 18, transformOrigin: "left center" }}
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: index * 0.45, duration: 0.6, repeat: Infinity, repeatDelay: 3.5 }}
            >
              {branch}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClipboardVisual({ accent }: VisualProps) {
  return (
    <div className="relative flex w-full max-w-[480px] items-center justify-center gap-6">
      <div className="grid h-28 w-20 place-items-center rounded-2xl border border-ivory/12 bg-ink-900">
        <Smartphone className="h-8 w-8" style={{ color: accent }} />
        <span className="mt-1 text-[9px] text-ivory/42">Android</span>
      </div>
      <div className="relative h-1 w-24 origin-left rounded-full bg-white/10">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="grid h-24 w-32 place-items-center rounded-xl border border-ivory/12 bg-ink-900">
        <Monitor className="h-7 w-7" style={{ color: accent }} />
        <span className="mt-1 text-[9px] text-ivory/42">Chrome ext</span>
      </div>
      <motion.div
        className="absolute -top-2 rounded-full border px-2 py-1 font-mono text-[9px]"
        style={{ borderColor: `${accent}55`, color: accent }}
        animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        text synced
      </motion.div>
    </div>
  );
}

function InvoiceVisual({ accent }: VisualProps) {
  const lines = ["Invoice #1042", "Client · Acme Co.", "₹ 4,500.00", "PDF ready"];

  return (
    <div className="w-full max-w-[380px] rounded-[24px] border border-ivory/12 bg-ivory/[0.04] p-5 shadow-rim">
      <div className="mb-4 h-2 w-16 rounded-full" style={{ background: accent }} />
      {lines.map((line, index) => (
        <motion.div
          key={line}
          className="mb-2 rounded-xl border border-ivory/10 bg-ink-950/60 px-4 py-3 text-sm text-ivory/68"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.4, duration: 0.5, repeat: Infinity, repeatDelay: 3.2 }}
        >
          {line}
        </motion.div>
      ))}
      <motion.div
        className="mt-4 rounded-xl py-2 text-center text-xs font-bold uppercase tracking-wider"
        style={{ background: `${accent}22`, color: accent }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        Export PDF
      </motion.div>
    </div>
  );
}

function WeatherVisual({ accent }: VisualProps) {
  return (
    <div className="relative h-[320px] w-full max-w-[420px]">
      <motion.div
        className="absolute left-1/2 top-4 h-28 w-28 -translate-x-1/2 rounded-full border border-ivory/10"
        style={{ borderColor: `${accent}44` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <motion.span
          className="absolute -right-1 top-1/2 h-2 w-2 rounded-full"
          style={{ background: accent }}
        />
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-2">
        {["28°C", "NASA", "ISRO"].map((label, index) => (
          <motion.div
            key={label}
            className="rounded-2xl border border-ivory/10 bg-ink-900/80 p-3 text-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ delay: index * 0.3, duration: 2.5, repeat: Infinity }}
          >
            <Globe className="mx-auto mb-1 h-4 w-4" style={{ color: accent }} />
            <span className="text-xs text-ivory/62">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function JournalVisual({ accent }: VisualProps) {
  return (
    <div className="relative h-[300px] w-[240px]" style={{ perspective: 800 }}>
      {[0, 1, 2].map((page) => (
        <motion.div
          key={page}
          className="absolute inset-x-0 top-8 rounded-2xl border border-ivory/12 bg-ink-900 p-4 shadow-rim"
          style={{ zIndex: 3 - page, rotateY: page * -4 }}
          animate={{ rotateY: [page * -4, page * -4 - 12, page * -4], y: [page * 8, page * 8 - 4, page * 8] }}
          transition={{ delay: page * 0.4, duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-[10px] uppercase tracking-wider text-ivory/38">Day {page + 1}</p>
          <div className="mt-3 space-y-2">
            <div className="h-2 w-full rounded-full bg-white/10" />
            <div className="h-2 w-4/5 rounded-full bg-white/10" />
            <div className="h-2 w-3/5 rounded-full" style={{ background: `${accent}44` }} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PortfolioVisual({ accent }: VisualProps) {
  return (
    <div className="w-full max-w-[440px] rounded-[20px] border border-ivory/12 bg-ink-900 p-3 shadow-velvet">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 text-[10px] text-ivory/38">portfolio · live</span>
      </div>
      <div className="relative h-[260px] overflow-hidden rounded-xl border border-ivory/10 bg-ink-950">
        <motion.div
          className="absolute inset-x-6 top-6 h-16 rounded-xl"
          style={{ background: `linear-gradient(135deg, ${accent}33, transparent)` }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-8 top-32 h-3 w-3 rounded-full"
          style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          animate={{ x: [0, 120, 60, 180, 0], y: [0, 40, 80, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <ExternalLink className="absolute bottom-4 right-4 h-4 w-4 text-ivory/30" />
      </div>
    </div>
  );
}
