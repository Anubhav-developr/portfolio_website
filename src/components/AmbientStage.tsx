export function AmbientStage() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[52vh] bg-[linear-gradient(104deg,rgba(77,212,189,0.18),transparent_32%,rgba(196,123,77,0.14)_63%,transparent)] blur-3xl" />
      <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-ivory/20 to-transparent" />
      <div className="absolute bottom-0 right-0 h-[44vh] w-[70vw] bg-[linear-gradient(134deg,transparent,rgba(201,255,100,0.09),rgba(244,240,232,0.04))] blur-3xl" />
    </div>
  );
}
