export function BackgroundVideo() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
      <video
        className="ambient-video absolute inset-0 h-full w-full object-cover opacity-[0.34] saturate-[1.18]"
        style={{ width: "100%", height: "100%" }}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/assets/hero-lab.png"
      >
        <source src="/assets/ambient-code-loop.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(77,212,189,0.18),transparent_34%),linear-gradient(90deg,rgba(7,8,7,0.84),rgba(7,8,7,0.58)_42%,rgba(7,8,7,0.88))]" />
      <div className="absolute inset-0 bg-ink-950/32 backdrop-blur-[1px]" />
    </div>
  );
}
