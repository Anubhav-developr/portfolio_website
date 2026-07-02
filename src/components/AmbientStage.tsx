export function AmbientStage() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[52vh] bg-[var(--grad-hero)] blur-3xl" />
      <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 right-0 h-[44vh] w-[70vw] bg-[linear-gradient(134deg,transparent,rgba(99,136,255,0.08),rgba(56,189,248,0.05))] blur-3xl" />
    </div>
  );
}
