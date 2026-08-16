"use client";

import { type ReactNode, useEffect, useState , useRef} from "react";
import { motion,useMotionValue, useSpring, useTransform,useAnimation ,useReducedMotion,AnimatePresence} from "framer-motion";
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
    portfolio: <PortfolioVisual accent={project.accent} />,
    "myth-buster": <CofWahVisual accent={project.accent} />,
    institutional: <RecSonbhadraVisual accent={project.accent} />,
    experimental: <CocamSKVisual accent={project.accent} />,
    pixel: <PixeyEditorShowcase accent={project.accent} />,
    codechef: <CodeChefFinderShowcase accent={project.accent} />,
  };

  return (
    <div className="relative min-h-[300px] overflow-hidden border-b-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] p-5 lg:min-h-full lg:border-b-0 lg:border-r-[0.5px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${project.accent}24, transparent 42%), linear-gradient(135deg, ${project.accent}18, transparent 38%), linear-gradient(45deg, rgba(255,255,255,0.06), transparent 50%)`
        }}
      />
      <div className="relative z-10 flex h-full min-h-[280px] items-center justify-center">
        {visuals[project.tone]}
      </div>
    </div>
  );
}

function ExamPulseVisual({ accent }: VisualProps) {
  return (
    <div className="relative h-[390px] w-[220px] rounded-[34px] border border-white/[0.18] bg-ink-900 p-3 shadow-velvet transition duration-500 group-hover:rotate-[-2deg] group-hover:scale-[1.02]">
      <div className="h-full rounded-[26px] border border-white/[0.08] bg-[#0b0f0d] p-4">
        <div className="mx-auto mb-5 h-1 w-14 rounded-full bg-white/22" />
        <motion.div
          className="rounded-3xl p-4"
          style={{ background: `${accent}18` }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-white/[0.42]">Quiz pulse</p>
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
  const rows = ["Savings A/C / INR 12,450", "RD Deposit / INR 2,000", "Customer #PO-2841", "Balance update"];

  return (
    <div className="w-full max-w-[520px]">
      <div className="mx-auto mb-5 flex h-[280px] w-[160px] flex-col rounded-[28px] border border-white/[0.14] bg-ink-900 p-3 shadow-velvet">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
        <div className="mb-3 flex items-center gap-2 rounded-xl px-2 py-2" style={{ background: `${accent}22` }}>
          <Landmark className="h-4 w-4" style={{ color: accent }} />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">India Post</span>
        </div>
        <div className="flex-1 space-y-2 overflow-hidden p-1">
          {rows.map((row, index) => (
            <motion.div
              key={row}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] text-white/[0.62]"
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
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/[0.42]">Minimax tree</p>
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
        <div className="mb-4 flex items-center gap-2 text-sm text-white/[0.48]">
          <Code2 className="h-4 w-4" style={{ color: accent }} />
          token stream
        </div>
        <div className="space-y-2 font-mono text-xs text-white/[0.58]">
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
        <p className="mb-4 text-sm text-white/[0.48]">abstract syntax tree</p>
        <div className="space-y-3">
          {branches.map((branch, index) => (
            <motion.div
              key={branch}
              className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/[0.68]"
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
        <span className="mt-1 text-[9px] text-white/[0.42]">Android</span>
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
        <span className="mt-1 text-[9px] text-white/[0.42]">Chrome ext</span>
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
  const lines = ["Invoice #1042", "Client / Acme Co.", "INR 4,500.00", "PDF ready"];

  return (
    <div className="w-full max-w-[380px] rounded-[24px] border border-ivory/12 bg-ivory/[0.04] p-5 shadow-rim">
      <div className="mb-4 h-2 w-16 rounded-full" style={{ background: accent }} />
      {lines.map((line, index) => (
        <motion.div
          key={line}
          className="mb-2 rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white/[0.68]"
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
        {["28 C", "NASA", "ISRO"].map((label, index) => (
          <motion.div
            key={label}
            className="rounded-2xl border border-ivory/10 bg-ink-900/80 p-3 text-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ delay: index * 0.3, duration: 2.5, repeat: Infinity }}
          >
            <Globe className="mx-auto mb-1 h-4 w-4" style={{ color: accent }} />
            <span className="text-xs text-white/[0.62]">{label}</span>
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
          <p className="text-[10px] uppercase tracking-wider text-white/[0.38]">Day {page + 1}</p>
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
        <span className="ml-2 text-[10px] text-white/[0.38]">portfolio / live</span>
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

function CofWahVisual({ accent }: VisualProps) {
  const myths = [
    {
      myth: "गरम पानी पीने से वायरस खत्म हो जाता है?",
      answer: "Fact checked",
      status: "FALSE"
    },
    {
      myth: "क्या वैक्सीन सुरक्षित है?",
      answer: "Verified information",
      status: "TRUE"
    },
    {
      myth: "COVID-19 की जानकारी हिंदी में",
      answer: "Trusted awareness",
      status: "INFO"
    }
  ];

  return (
    <div className="relative w-full max-w-[540px]">
      {/* Floating background particles */}
      {[0, 1, 2, 3, 4].map((particle) => (
        <motion.span
          key={particle}
          className="absolute h-2 w-2 rounded-full"
          style={{
            background: accent,
            left: `${12 + particle * 18}%`,
            top: `${12 + (particle % 3) * 28}%`,
            boxShadow: `0 0 14px ${accent}`
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.25, 0.9, 0.25],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 2.8 + particle * 0.35,
            delay: particle * 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Main application window */}
      <motion.div
        className="relative z-10 overflow-hidden rounded-[28px] border border-white/[0.14] bg-ink-900/95 p-4 shadow-velvet"
        initial={{ opacity: 0, y: 22, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ y: -6, scale: 1.015 }}
      >
        {/* Browser header */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

          <motion.span
            className="ml-2 text-[10px] text-white/[0.38]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            cofwah / awareness
          </motion.span>
        </div>

        {/* App header */}
        <div
          className="mb-4 rounded-2xl border border-white/10 p-4"
          style={{
            background: `linear-gradient(135deg, ${accent}25, transparent)`
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-lg font-black tracking-tight"
                style={{ color: accent }}
              >
                CofWah
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/[0.42]">
                COVID-19 myth buster
              </p>
            </div>

            <motion.div
              className="grid h-10 w-10 place-items-center rounded-xl border"
              style={{
                borderColor: `${accent}66`,
                background: `${accent}18`
              }}
              animate={{
                rotate: [0, -8, 8, 0],
                scale: [1, 1.08, 1]
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-lg">✓</span>
            </motion.div>
          </div>
        </div>

        {/* Myth cards */}
        <div className="space-y-3">
          {myths.map((item, index) => (
            <motion.div
              key={item.myth}
              className="rounded-2xl border border-white/10 bg-white/[0.045] p-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.35 + index * 0.35,
                duration: 0.55,
                repeat: Infinity,
                repeatDelay: 4.5
              }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-black"
                  style={{
                    color: accent,
                    background: `${accent}20`
                  }}
                  animate={{
                    scale: [1, 1.12, 1],
                    rotate: [0, 4, 0]
                  }}
                  transition={{
                    delay: index * 0.4,
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  ?
                </motion.div>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] leading-4 text-white/[0.72]">
                    {item.myth}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[9px] text-white/[0.38]">
                      {item.answer}
                    </span>

                    <motion.span
                      className="rounded-full border px-2 py-1 text-[8px] font-bold tracking-wider"
                      style={{
                        color: accent,
                        borderColor: `${accent}55`,
                        background: `${accent}12`
                      }}
                      animate={{
                        opacity: [0.55, 1, 0.55]
                      }}
                      transition={{
                        duration: 1.8,
                        delay: index * 0.3,
                        repeat: Infinity
                      }}
                    >
                      {item.status}
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vaccine finder button */}
        <motion.div
          className="mt-4 flex items-center justify-between rounded-2xl px-4 py-3"
          style={{
            background: accent,
            color: "#101410"
          }}
          animate={{
            boxShadow: [
              `0 0 0px ${accent}`,
              `0 0 18px ${accent}88`,
              `0 0 0px ${accent}`
            ]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-[10px] font-black uppercase tracking-wider">
            Find vaccine centre
          </span>

          <motion.span
            className="text-base font-black"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Bottom status indicator */}
      <motion.div
        className="absolute -bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border px-3 py-1.5 font-mono text-[9px] whitespace-nowrap"
        style={{
          color: accent,
          borderColor: `${accent}66`,
          background: "#111714"
        }}
        animate={{
          y: [0, -5, 0],
          opacity: [0.65, 1, 0.65]
        }}
        transition={{
          duration: 2.3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ✓ information verified in Hindi
      </motion.div>
    </div>
  );
}





function RecSonbhadraVisual( { accent }:VisualProps) {
  const modules = ["About", "Circulars", "Departments", "Placements", "Contact"];
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 220,
    damping: 24,
    mass: 0.7,
  });

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 220,
    damping: 24,
    mass: 0.7,
  });

  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], ["20%", "80%"]), {
    stiffness: 180,
    damping: 20,
  });

  const glowY = useSpring(useTransform(my, [-0.5, 0.5], ["20%", "80%"]), {
    stiffness: 180,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full min-h-[420px] w-full [perspective:1400px]"
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full overflow-hidden rounded-[32px] border border-white/10 bg-[#06101d]/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-[1px] rounded-[32px] opacity-70"
          style={{
            background:
              "linear-gradient(135deg, rgba(96,165,250,0.24), rgba(56,189,248,0.1), rgba(167,139,250,0.16))",
          }}
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(rgba(96,165,250,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.10) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            transform: "translateZ(10px)",
          }}
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(220px circle at var(--gx) var(--gy), rgba(56,189,248,0.22), transparent 60%)",
            ["--gx" as string]: glowX,
            ["--gy" as string]: glowY,
          }}
        />

        <motion.div
          initial={{ x: "-120%", opacity: 0 }}
          whileInView={{ x: "130%", opacity: [0, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 2.1, delay: 0.4, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-cyan-300/18 to-transparent blur-2xl"
          style={{ transform: "translateZ(48px)" }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="flex items-start justify-between gap-4"
            style={{ transform: "translateZ(70px)" }}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">
                Official Institutional Platform
              </p>
              <h3 className="mt-3 max-w-[16ch] text-2xl font-semibold tracking-tight text-white">
                REC Sonbhadra
              </h3>
              <p className="mt-2 max-w-[28ch] text-sm leading-6 text-white/58">
                Public-facing college infrastructure with structured academic communication.
              </p>
            </div>

            <div className="rounded-full border border-cyan-300/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-cyan-100/70">
              Private Repo
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.22 } },
            }}
            className="relative mt-10 grid grid-cols-6 gap-3"
            style={{ transform: "translateZ(90px)" }}
          >
            {modules.map((item, index) => {
              const wide = index === 0 || index === 3;
              return (
                <motion.div
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 18, scale: 0.94 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-3 backdrop-blur-xl ${
                    wide ? "col-span-3" : "col-span-3 md:col-span-2"
                  }`}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                      Module
                    </span>
                    <span className="h-2 w-2 rounded-full bg-cyan-300/70 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white/88">{item}</p>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${68 + index * 6}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.35 + index * 0.05 }}
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300"
                      />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="relative mt-8 grid grid-cols-3 gap-3"
            style={{ transform: "translateZ(110px)" }}
          >
            {[
              { label: "Identity", value: "Official" },
              { label: "Audience", value: "Students" },
              { label: "System", value: "Live Web" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-md"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white/85">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}


function CocamSKVisual({ accent }: VisualProps) {
  const flash = useAnimation();
  const shutter = useAnimation();
  const thumb = useAnimation();

  useEffect(() => {
    let mounted = true;

    async function loop() {
      while (mounted) {
        await new Promise((r) => setTimeout(r, 1400));
        if (!mounted) return;
        await shutter.start({ scale: 0.82, transition: { duration: 0.12 } });
        if (!mounted) return;
        await flash.start({ opacity: [0, 1, 0], transition: { duration: 0.35 } });
        if (!mounted) return;
        await shutter.start({ scale: 1, transition: { duration: 0.25 } });
        if (!mounted) return;
        thumb.start({
          opacity: [0, 1, 1, 0],
          scale: [0.7, 1, 1, 0.9],
          transition: { duration: 1.6, times: [0, 0.15, 0.75, 1] },
        });
        await new Promise((r) => setTimeout(r, 1900));
      }
    }

    loop();
    return () => {
      mounted = false;
    };
  }, [flash, shutter, thumb]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-[420px] w-full max-w-[440px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#04070d] p-5 shadow-2xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-red-200">
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-red-400"
          />
          Live
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/45">
          Capture
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
        <div className="absolute left-5 top-5 h-9 w-9 border-l-2 border-t-2 border-cyan-300" />
        <div className="absolute right-5 top-5 h-9 w-9 border-r-2 border-t-2 border-cyan-300" />
        <div className="absolute bottom-5 left-5 h-9 w-9 border-b-2 border-l-2 border-cyan-300" />
        <div className="absolute bottom-5 right-5 h-9 w-9 border-b-2 border-r-2 border-cyan-300" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 1 }}
            animate={shutter}
            className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-cyan-300 bg-white/10"
          >
            <svg
              width="46"
              height="46"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="text-cyan-100"
            >
              <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
              <circle cx="12" cy="13" r="3.4" />
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={flash}
          className="pointer-events-none absolute inset-0 bg-white"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={thumb}
          className="absolute bottom-6 right-6 h-16 w-12 rounded-lg border-2 border-white/40 bg-cyan-200"
        />
      </div>
    </motion.div>
  );
}










const GRID_COLS = 24;
const GRID_ROWS = 18;

type DemoStep =
  | { tool: "draw"; cells: [number, number][] }
  | { tool: "rect"; from: [number, number]; to: [number, number] }
  | { tool: "fill"; origin: [number, number]; cells: [number, number][] }
  | { tool: "pick"; cell: [number, number] }
  | { tool: "undo" };

const PALETTE = ["#22d3ee", "#f472b6", "#facc15", "#a3e635", "#38bdf8"];

const DEMO_SCRIPT: DemoStep[] = [
  { tool: "draw", cells: [[8,4],[9,4],[10,4],[8,5],[10,5],[8,6],[9,6],[10,6]] },
  { tool: "rect", from: [13, 4], to: [17, 8] },
  { tool: "pick", cell: [9, 5] },
  {
    tool: "fill",
    origin: [14, 6],
    cells: [[13,5],[14,5],[15,5],[16,5],[13,6],[14,6],[15,6],[16,6],[13,7],[14,7],[15,7],[16,7]],
  },
  { tool: "draw", cells: [[5,10],[6,10],[7,10],[5,11],[7,11],[5,12],[6,12],[7,12]] },
  { tool: "undo" },
  { tool: "draw", cells: [[5,10],[6,10],[7,10],[5,11],[7,11],[5,12],[6,12],[7,12]] },
];

function PixeyEditorShowcase({ accent }: VisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"assembling" | "interactive" | "idle">("assembling");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });
  const [activeTool, setActiveTool] = useState<string>("draw");
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const paintedCells = useRef<Map<string, string>>(new Map());
  const historyRef = useRef<Map<string, string>[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.scale(dpr, dpr);

    const cellW = cssW / GRID_COLS;
    const cellH = cssH / GRID_ROWS;

    let raf = 0;
    let assembled = new Set<string>();
    let cancelled = false;

    function drawGrid(progress: number) {
      ctx.clearRect(0, 0, cssW, cssH);

      const totalCells = GRID_COLS * GRID_ROWS;
      const visibleCount = Math.floor(totalCells * progress);

      for (let i = 0; i < visibleCount; i++) {
        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);
        const key = `${col},${row}`;
        assembled.add(key);
        const x = col * cellW;
        const y = row * cellH;
        ctx.fillStyle = "rgba(255,255,255,0.04)";
        ctx.fillRect(x, y, cellW - 1, cellH - 1);
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.strokeRect(x, y, cellW - 1, cellH - 1);
      }

      paintedCells.current.forEach((color, key) => {
        const [col, row] = key.split(",").map(Number);
        const x = col * cellW;
        const y = row * cellH;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, cellW - 1, cellH - 1);
      });
    }

    function paintCell(col: number, row: number, color: string) {
      paintedCells.current.set(`${col},${row}`, color);
      const x = col * cellW;
      const y = row * cellH;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, cellW - 1, cellH - 1);
    }

    function eraseCell(col: number, row: number) {
      paintedCells.current.delete(`${col},${row}`);
      const x = col * cellW;
      const y = row * cellH;
      ctx.clearRect(x, y, cellW - 1, cellH - 1);
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(x, y, cellW - 1, cellH - 1);
    }

    function snapshotHistory() {
      historyRef.current.push(new Map(paintedCells.current));
    }

    async function wait(ms: number) {
      return new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        if (cancelled) clearTimeout(t);
      });
    }

    async function assemble() {
      const duration = reducedMotion ? 200 : 900;
      const start = performance.now();
      return new Promise<void>((resolve) => {
        function step(now: number) {
          if (cancelled) return resolve();
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          drawGrid(eased);
          if (t < 1) {
            raf = requestAnimationFrame(step);
          } else {
            resolve();
          }
        }
        raf = requestAnimationFrame(step);
      });
    }

    async function moveCursor(col: number, row: number) {
      const x = col * cellW + cellW / 2;
      const y = row * cellH + cellH / 2;
      setCursorPos({ x, y, visible: true });
      await wait(reducedMotion ? 0 : 220);
    }

    async function runStep(step: DemoStep, colorIndex: number) {
      const color = PALETTE[colorIndex % PALETTE.length];

      if (step.tool === "draw") {
        setActiveTool("draw");
        snapshotHistory();
        for (const [col, row] of step.cells) {
          if (cancelled) return;
          await moveCursor(col, row);
          paintCell(col, row, color);
          await wait(reducedMotion ? 0 : 60);
        }
      }

      if (step.tool === "rect") {
        setActiveTool("rectangle");
        snapshotHistory();
        const [c1, r1] = step.from;
        const [c2, r2] = step.to;
        await moveCursor(c1, r1);
        await wait(150);
        await moveCursor(c2, r2);
        for (let col = c1; col <= c2; col++) {
          for (let row = r1; row <= r2; row++) {
            const isEdge = col === c1 || col === c2 || row === r1 || row === r2;
            if (isEdge) paintCell(col, row, color);
          }
        }
      }

      if (step.tool === "pick") {
        setActiveTool("pick color");
        const [col, row] = step.cell;
        await moveCursor(col, row);
        await wait(reducedMotion ? 0 : 300);
      }

      if (step.tool === "fill") {
        setActiveTool("fill");
        snapshotHistory();
        const [col, row] = step.origin;
        await moveCursor(col, row);
        for (const [c, r] of step.cells) {
          if (cancelled) return;
          paintCell(c, r, color);
          await wait(reducedMotion ? 0 : 25);
        }
      }

      if (step.tool === "undo") {
        setActiveTool("undo");
        const previous = historyRef.current.pop();
        if (previous) {
          const currentKeys = new Set(paintedCells.current.keys());
          previous.forEach((_, key) => currentKeys.delete(key));
          currentKeys.forEach((key) => {
            const [c, r] = key.split(",").map(Number);
            eraseCell(c, r);
          });
          paintedCells.current = new Map(previous);
          drawGrid(1);
        }
        await wait(reducedMotion ? 0 : 400);
      }
    }

    async function run() {
      await assemble();
      if (cancelled) return;
      setPhase("interactive");

      for (let i = 0; i < DEMO_SCRIPT.length; i++) {
        if (cancelled) return;
        await runStep(DEMO_SCRIPT[i], i);
        await wait(reducedMotion ? 0 : 250);
      }

      if (cancelled) return;
      setCursorPos((p) => ({ ...p, visible: false }));
      setPhase("idle");
    }

    run();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [visible, reducedMotion]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-[420px] w-full max-w-[520px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#05060a] p-5 shadow-2xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Canvas Editor
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">
            PIXEy-EDITOR
          </h3>
        </div>
        <div
          className="flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
          style={{ borderColor: `${accent}44`, color: accent }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: accent }}
          />
          {phase === "assembling" ? "Building" : activeTool}
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ imageRendering: "pixelated" }}
        />

        {cursorPos.visible && (
          <motion.div
            className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm border-2"
            style={{ borderColor: accent }}
            animate={{ left: cursorPos.x, top: cursorPos.y }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        {PALETTE.map((color) => (
          <span
            key={color}
            className="h-4 w-4 rounded-sm border border-white/20"
            style={{ background: color }}
          />
        ))}
        <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-white/30">
          Vanilla JS · Canvas API
        </span>
      </div>
    </motion.div>
  );
}







const HANDLE = "anubhav";

type Stage = "idle" | "typing" | "ready" | "resolving" | "profile" | "reset";

function CodeChefFinderShowcase({ accent }: VisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [typed, setTyped] = useState("");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;

    async function wait(ms: number) {
      return new Promise<void>((r) => setTimeout(r, cancelled ? 0 : ms));
    }

    async function run() {
      while (!cancelled) {
        setStage("idle");
        setTyped("");
        await wait(reducedMotion ? 100 : 500);
        if (cancelled) return;

        setStage("typing");
        for (let i = 1; i <= HANDLE.length; i++) {
          if (cancelled) return;
          setTyped(HANDLE.slice(0, i));
          await wait(reducedMotion ? 10 : 110 + Math.random() * 90);
        }

        await wait(reducedMotion ? 100 : 500);
        if (cancelled) return;
        setStage("ready");

        await wait(reducedMotion ? 100 : 700);
        if (cancelled) return;
        setStage("resolving");

        await wait(reducedMotion ? 100 : 900);
        if (cancelled) return;
        setStage("profile");

        await wait(reducedMotion ? 300 : 3200);
        if (cancelled) return;
        setStage("reset");
        await wait(reducedMotion ? 100 : 600);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [visible, reducedMotion]);

  const showTerminal = stage !== "profile";
  const showProfile = stage === "profile";

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-[420px] w-full max-w-[480px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#05070a] p-5 shadow-2xl"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Utility
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">
            CodeChef User Finder
          </h3>
        </div>
        <div
          className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
          style={{ borderColor: `${accent}44`, color: accent }}
        >
          {stage === "profile" ? "Resolved" : "Idle"}
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 font-mono">
        <AnimatePresence mode="wait">
          {showTerminal && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex h-full flex-col justify-center gap-4"
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">
                Enter profile ID
              </p>

              <div
                className="flex items-center gap-2 rounded-xl border bg-white/[0.03] px-4 py-3 transition-colors"
                style={{
                  borderColor:
                    stage === "typing" || stage === "ready"
                      ? `${accent}66`
                      : "rgba(255,255,255,0.1)",
                }}
              >
                <span className="text-sm text-white/80">{typed}</span>
                {(stage === "idle" || stage === "typing") && (
                  <motion.span
                    className="h-4 w-[2px]"
                    style={{ background: accent }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                )}
              </div>

              <motion.button
                type="button"
                disabled
                className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider"
                style={{
                  background:
                    stage === "ready" || stage === "resolving" ? accent : "rgba(255,255,255,0.06)",
                  color: stage === "ready" || stage === "resolving" ? "#0a0a0a" : "rgba(255,255,255,0.35)",
                }}
                animate={
                  stage === "resolving"
                    ? { scale: [1, 0.96, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.3 }}
              >
                Find User
                <motion.span
                  animate={stage === "resolving" ? { x: [0, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.5, repeat: stage === "resolving" ? Infinity : 0 }}
                >
                  →
                </motion.span>
              </motion.button>

              {stage === "resolving" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] text-white/40"
                >
                  codechef.com/users/{typed}
                </motion.p>
              )}
            </motion.div>
          )}

          {showProfile && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col items-center justify-center gap-3 text-center"
            >
              <div
                className="grid h-14 w-14 place-items-center rounded-xl border text-lg font-bold"
                style={{ borderColor: `${accent}66`, color: accent }}
              >
                CC
              </div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                CodeChef Profile
              </p>
              <p className="text-base font-semibold text-white/90">
                @{HANDLE}
              </p>
              <p className="text-[10px] text-white/30">
                codechef.com/users/{HANDLE}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="relative z-10 mt-4 text-[10px] uppercase tracking-[0.24em] text-white/25">
        HTML · CSS · JavaScript → Direct Profile Routing
      </p>
    </motion.div>
  );
}








