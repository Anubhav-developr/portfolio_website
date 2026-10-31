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
        preload="metadata"
        poster="/assets/hero-lab.png"
        src="/assets/hero-bg.mp4"
      />
      <div aria-hidden="true" className="hero-bg-overlay absolute inset-0 z-10" />
    </>
  );
}
