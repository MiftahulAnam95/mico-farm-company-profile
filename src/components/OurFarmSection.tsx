import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import SectionHeading from "@/components/ui/SectionHeading";
import FarmGallery from "@/components/FarmGallery";
import { useReveal } from "@/hooks/useReveal";
import { useLenis } from "@/hooks/useLenis";
import { farmCategories } from "@/data/company";
import { cn } from "@/utils/cn";

export default function OurFarmSection() {
  const root = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDetail, setSelectedDetail] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  useReveal(root);

  useEffect(() => {
    if (selectedDetail === null) {
      lenis?.start();
      document.body.style.overflow = "";
      return;
    }
    lenis?.stop();
    document.body.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current?.focus(), 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDetail(null);
      if (e.key === "ArrowRight") {
        setSelectedDetail((cur) => (cur === null ? 0 : (cur + 1) % farmCategories.length));
      }
      if (e.key === "ArrowLeft") {
        setSelectedDetail((cur) =>
          cur === null ? 0 : (cur - 1 + farmCategories.length) % farmCategories.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedDetail, lenis]);

  const currentItem = selectedDetail !== null ? farmCategories[selectedDetail] : null;

  return (
    <section id="peternakan" ref={root} className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Peternakan Kami"
            title="Lebih Dekat dengan Dunia Peternakan."
            description="Kami percaya bahwa memahami peternakan dimulai dari mengenal prosesnya secara langsung."
          />
          <div
            data-reveal
            role="tablist"
            aria-label="Pilih kategori kegiatan peternakan"
            className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end"
          >
            {farmCategories.map((c, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300",
                    active
                      ? "border-forest bg-forest text-white shadow-sm"
                      : "border-forest/20 bg-white text-forest hover:border-forest",
                  )}
                >
                  {c.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-14" id="galeri-peternakan">
        <FarmGallery
          activeIndex={activeIndex}
          onActiveChange={setActiveIndex}
          onOpenDetail={(idx) => setSelectedDetail(idx)}
        />
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-8 lg:px-10">
        <p data-reveal className="max-w-lg text-sm leading-relaxed text-charcoal/65">
          Pilih kategori di atas atau geser galeri untuk melihat rangkaian kegiatan pemeliharaan, pemberian pakan, hingga pengelolaan lingkungan peternakan.
        </p>
        <button
          type="button"
          data-reveal
          onClick={() => setSelectedDetail(activeIndex)}
          className="btn-primary"
        >
          Lihat Aktivitas Peternakan
          <Icon icon="solar:gallery-wide-linear" className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Activity Detail Modal */}
      {currentItem && selectedDetail !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/75 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedDetail(null)}
          data-lenis-prevent
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-cream shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-beige">
              <img
                src={currentItem.image}
                alt={currentItem.alt}
                className="h-full w-full object-cover"
              />
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setSelectedDetail(null)}
                aria-label="Tutup tampilan aktivitas"
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-md transition-colors hover:bg-white"
              >
                <Icon icon="solar:close-circle-linear" className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <span className="eyebrow">
                  0{selectedDetail + 1} / 0{farmCategories.length} — Aktivitas Peternakan
                </span>
                <h3 className="mt-2 font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                  {currentItem.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
                  {currentItem.desc}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedDetail((selectedDetail - 1 + farmCategories.length) % farmCategories.length)
                  }
                  aria-label="Aktivitas sebelumnya"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/25 bg-white text-forest transition-colors hover:bg-forest hover:text-white"
                >
                  <Icon icon="solar:arrow-left-linear" className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDetail((selectedDetail + 1) % farmCategories.length)}
                  aria-label="Aktivitas berikutnya"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/25 bg-white text-forest transition-colors hover:bg-forest hover:text-white"
                >
                  <Icon icon="solar:arrow-right-linear" className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
