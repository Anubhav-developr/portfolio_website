"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

const MotionPreferenceContext = createContext(false);

export function MotionPreferenceProvider({ children }: PropsWithChildren) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const value = useMemo(() => prefersReducedMotion, [prefersReducedMotion]);

  return (
    <MotionPreferenceContext.Provider value={value}>
      {children}
    </MotionPreferenceContext.Provider>
  );
}

export function usePrefersReducedMotion() {
  return useContext(MotionPreferenceContext);
}
