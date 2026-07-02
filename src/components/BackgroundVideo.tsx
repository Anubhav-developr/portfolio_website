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
            "linear-gradient(to bottom, rgba(2,3,4,0.18) 0%, rgba(2,3,4,0.58) 52%, rgba(2,3,4,0.9) 100%)",
          boxShadow: "inset 0 0 120px 40px rgba(2,3,4,0.76)",
          mixBlendMode: "multiply"
        }}
      />
    </>
  );
}
