export function BackgroundVideo() {
  return (
    <>
      <video
        aria-hidden="true"
        className="hero-bg-video absolute inset-0 z-0 hidden h-full w-full object-cover md:block"
        style={{ animation: "kenBurns 16s ease-out forwards" }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero-lab.png"
        src="/assets/hero-bg.mp4"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(7,8,7,0.25) 0%, rgba(7,8,7,0.55) 50%, rgba(7,8,7,0.85) 100%)",
          boxShadow: "inset 0 0 120px 40px rgba(7,8,7,0.7)",
          mixBlendMode: "multiply"
        }}
      />
    </>
  );
}
