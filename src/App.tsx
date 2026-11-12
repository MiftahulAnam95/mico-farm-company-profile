import { useEffect, useLayoutEffect, useRef } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { LenisProvider, useLenis } from "@/hooks/useLenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import HomePage from "@/pages/HomePage";
import ContactPage from "@/pages/ContactPage";
import ArticlePage from "@/pages/ArticlePage";
import NotFoundPage from "@/pages/NotFoundPage";

function PageShell() {
  const location = useLocation();
  const lenis = useLenis();
  const wrap = useRef<HTMLDivElement>(null);

  // Reset scroll on route change (anchor targets handled inside HomePage)
  useLayoutEffect(() => {
    const hasTarget = location.hash || (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!hasTarget) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [location.pathname, location.hash, location.state, lenis]);

  // Refresh ScrollTrigger after fonts & images finish loading
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timer);
    };
  }, [location.pathname]);

  // Subtle fade page transition (opacity only — never apply transform on page root so position:fixed works properly)
  useEffect(() => {
    if (prefersReducedMotion() || !wrap.current) return;
    const tween = gsap.fromTo(
      wrap.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.45, ease: "power2.out", clearProps: "opacity,transform" },
    );
    return () => {
      tween.kill();
    };
  }, [location.pathname]);

  return (
    <div ref={wrap} key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/kontak" element={<ContactPage />} />
        <Route path="/artikel/:slug" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <LenisProvider>
        <PageShell />
      </LenisProvider>
    </HashRouter>
  );
}
