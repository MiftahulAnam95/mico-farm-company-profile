import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("js");
    if (prefersReducedMotion()) {
      document.documentElement.classList.add("reduced-motion");
      return;
    }

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });
    ref.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      ref.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export const useLenis = () => useContext(LenisContext);

/** Scroll to an element id or top. Works with or without Lenis. */
export function useScrollTo() {
  const lenis = useLenis();
  return (target: string | number, offset = -80) => {
    if (typeof target === "number") {
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else window.scrollTo({ top: target });
      return;
    }
    const el = document.getElementById(target);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.2 });
    else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };
}
