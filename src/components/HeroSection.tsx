import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { useScrollTo } from "@/hooks/useLenis";

const HERO_IMG =
  "https://images.pexels.com/photos/18860444/pexels-photo-18860444.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800";

const headline = "Bersama Alam, Tumbuh Lebih Baik.";

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero-media",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.6, ease: "power4.inOut" },
      )
        .fromTo(".hero-img", { scale: 1.25 }, { scale: 1, duration: 2.2, ease: "power3.out" }, 0)
        .to(".hero-word", { y: 0, opacity: 1, duration: 1.1, stagger: 0.08 }, 0.7)
        .fromTo(".hero-fade", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12 }, 1.2)
        .fromTo(".hero-cta", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 1.5);

      gsap.to(".hero-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="beranda" ref={root} className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-deep">
      <div className="hero-media absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Peternak membawa jerami di antara kawanan sapi di padang rumput"
          className="hero-img h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/50 to-transparent" />
      </div>

      {/* organic decorative element */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/4 hidden h-[520px] w-[520px] text-sage/20 lg:block"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M100 10c50 0 90 40 90 90s-40 90-90 90S10 150 10 100 50 10 100 10Z" stroke="currentColor" strokeWidth="0.5" />
        <path d="M100 30c38 0 70 32 70 70s-32 70-70 70-70-32-70-70 32-70 70-70Z" stroke="currentColor" strokeWidth="0.5" />
        <path d="M20 100c30-40 130-40 160 0" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <p className="hero-fade mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-sage">
          <span className="h-px w-10 bg-sage" />
          Agribisnis & Peternakan Terpadu
        </p>
        <h1 className="max-w-4xl text-[2.75rem] font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-[5.5rem]">
          {headline.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 pr-[0.25em]">
              <span className="hero-word">{word}</span>
            </span>
          ))}
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="hero-fade max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Mico Farm hadir sebagai mitra agribisnis dan peternakan yang menyediakan berbagai kebutuhan peternakan
            sekaligus menjalankan kegiatan peternakan secara mandiri untuk mendukung pertumbuhan sektor peternakan
            Indonesia.
          </p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => scrollTo("tentang")} className="hero-cta btn-light">
              Kenali Mico Farm
              <Icon icon="solar:arrow-down-linear" className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollTo("bidang-usaha")} className="hero-cta btn-outline-light">
              Jelajahi Bidang Usaha
            </button>
          </div>
        </div>

        <div className="hero-fade mt-14 flex items-center gap-6 border-t border-white/15 pt-6 text-xs text-white/60">
          <span className="inline-flex items-center gap-2">
            <Icon icon="solar:home-smile-linear" className="h-4 w-4 text-sage" aria-hidden="true" /> Peternakan Mandiri
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon icon="solar:box-linear" className="h-4 w-4 text-sage" aria-hidden="true" /> Kebutuhan Peternakan
          </span>
        </div>
      </div>
    </section>
  );
}
