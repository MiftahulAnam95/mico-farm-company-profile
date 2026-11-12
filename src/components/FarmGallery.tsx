import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { farmCategories } from "@/data/company";
import { cn } from "@/utils/cn";

interface FarmGalleryProps {
  activeIndex: number;
  onActiveChange: (index: number) => void;
  onOpenDetail: (index: number) => void;
}

export default function FarmGallery({
  activeIndex,
  onActiveChange,
  onOpenDetail,
}: FarmGalleryProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanPrev(scrollLeft > 12);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 12);

    // Find card closest to left padding edge
    const trackRect = track.getBoundingClientRect();
    let closestIdx = 0;
    let closestDist = Infinity;
    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const dist = Math.abs(card.getBoundingClientRect().left - trackRect.left - 32);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });
    onActiveChange(closestIdx);
  }, [onActiveChange]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Safe, non-pinning entrance animation
  useEffect(() => {
    const root = wrapRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".farm-card",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(farmCategories.length - 1, index));
    const track = trackRef.current;
    const card = cardRefs.current[clamped];
    if (!track || !card) return;
    const style = window.getComputedStyle(track);
    const padLeft = parseFloat(style.paddingLeft) || 0;
    track.scrollTo({
      left: card.offsetLeft - padLeft,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  // Expose imperative scroll when parent changes activeIndex via pill click
  useEffect(() => {
    const track = trackRef.current;
    const card = cardRefs.current[activeIndex];
    if (!track || !card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    // Only auto-scroll if card isn't already the leading visible card
    if (Math.abs(cardRect.left - trackRect.left) > cardRect.width * 0.6) {
      scrollToIndex(activeIndex);
    }
  }, [activeIndex, scrollToIndex]);

  // Mouse drag-to-scroll for desktop ergonomics
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.pageX - track.offsetLeft;
    startScrollLeft.current = track.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 6) {
      dragMoved.current = true;
      e.preventDefault();
      trackRef.current.scrollLeft = startScrollLeft.current - walk * 1.2;
    }
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  return (
    <div ref={wrapRef} className="relative">
      {/* Horizontal editorial track */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollToIndex(activeIndex + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollToIndex(activeIndex - 1);
          }
        }}
        tabIndex={0}
        role="region"
        aria-label="Galeri kategori kegiatan peternakan"
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 active:cursor-grabbing sm:gap-6 sm:px-8 lg:px-10"
      >
        {farmCategories.map((c, i) => {
          const isFeatured = i % 2 === 0;
          const isCurrent = i === activeIndex;
          return (
            <figure
              key={c.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => {
                if (!dragMoved.current) onOpenDetail(i);
              }}
              className={cn(
                "farm-card group relative shrink-0 snap-start overflow-hidden rounded-3xl bg-beige transition-shadow duration-500",
                isFeatured
                  ? "w-[84vw] sm:w-[58vw] lg:w-[44vw]"
                  : "w-[76vw] sm:w-[48vw] lg:w-[35vw]",
                "h-[400px] sm:h-[460px] lg:h-[520px]",
                isCurrent
                  ? "ring-2 ring-forest/30 shadow-[0_24px_50px_-24px_rgba(40,91,59,0.35)]"
                  : "hover:shadow-[0_20px_45px_-25px_rgba(41,51,44,0.28)]",
              )}
            >
              <img
                src={c.image}
                alt={c.alt}
                loading="eager"
                decoding="async"
                draggable={false}
                className="h-full w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/20 to-transparent" />

              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-forest opacity-90 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Icon icon="solar:maximize-square-minimalistic-linear" className="h-5 w-5" aria-hidden="true" />
              </span>

              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-heading text-xs font-bold tracking-widest text-sage backdrop-blur-sm">
                  0{i + 1} / 0{farmCategories.length}
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                  {c.desc}
                </p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Controls & progress bar */}
      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <div className="flex flex-1 items-center gap-3">
          <span className="font-heading text-xs font-bold text-forest">
            0{activeIndex + 1}
          </span>
          <div className="relative h-1 max-w-xs flex-1 overflow-hidden rounded-full bg-forest/15">
            <div
              className="h-full rounded-full bg-forest transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / farmCategories.length) * 100}%` }}
            />
          </div>
          <span className="font-heading text-xs font-medium text-charcoal/45">
            0{farmCategories.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={!canPrev && activeIndex === 0}
            aria-label="Kategori sebelumnya"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/25 bg-white text-forest transition-all hover:border-forest hover:bg-forest hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Icon icon="solar:arrow-left-linear" className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={!canNext && activeIndex === farmCategories.length - 1}
            aria-label="Kategori berikutnya"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/25 bg-white text-forest transition-all hover:border-forest hover:bg-forest hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Icon icon="solar:arrow-right-linear" className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
