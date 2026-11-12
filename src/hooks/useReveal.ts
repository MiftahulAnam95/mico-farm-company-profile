import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/**
 * Reveals every [data-reveal] / [data-mask] descendant on scroll.
 * Elements are visible by default when JS is disabled (see index.css).
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      reveals.forEach((el) => {
        const delay = Number(el.dataset.delay ?? 0);
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onComplete: () => {
            el.classList.add("is-visible");
            gsap.set(el, { clearProps: "transform,willChange" });
          },
        });
      });

      const masks = gsap.utils.toArray<HTMLElement>("[data-mask]", root);
      masks.forEach((el) => {
        gsap.to(el, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.25,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onComplete: () => {
            el.classList.add("is-visible");
            gsap.set(el, { clearProps: "clipPath" });
          },
        });
        const img = el.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.2 },
            {
              scale: 1,
              duration: 1.6,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
        }
      });

      const parallax = gsap.utils.toArray<HTMLElement>("[data-parallax]", root);
      parallax.forEach((el) => {
        const amount = Number(el.dataset.parallax || 12);
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export const refreshScroll = () => ScrollTrigger.refresh();
