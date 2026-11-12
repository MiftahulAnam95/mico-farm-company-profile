import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { articles, articleCategories, formatDate, type ArticleCategory } from "@/data/articles";
import { cn } from "@/utils/cn";

export default function ArticlesSection() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<ArticleCategory | "Semua">("Semua");
  useReveal(root);

  const list = filter === "Semua" ? articles : articles.filter((a) => a.category === filter);

  return (
    <section id="artikel" ref={root} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Artikel & Wawasan"
            title="Cerita dan Wawasan Seputar Peternakan."
            description="Bacaan ringan seputar tips, nutrisi, kesehatan ternak, pengelolaan kandang, dan agribisnis Indonesia."
          />
        </div>

        <div data-reveal className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter kategori artikel">
          {(["Semua", ...articleCategories] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                filter === c ? "border-forest bg-forest text-white" : "border-charcoal/15 text-charcoal/70 hover:border-forest hover:text-forest",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <article key={a.slug} data-reveal data-delay={String((i % 3) * 0.08)} className="group flex flex-col">
              <Link to={`/artikel/${a.slug}`} className="relative block aspect-[16/11] overflow-hidden rounded-3xl bg-beige" tabIndex={-1} aria-hidden="true">
                <img
                  src={a.image}
                  alt={a.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-semibold text-forest">
                  {a.category}
                </span>
              </Link>
              <div className="flex flex-1 flex-col pt-5">
                <div className="flex items-center gap-3 text-xs text-charcoal/50">
                  <time dateTime={a.date}>{formatDate(a.date)}</time>
                  <span aria-hidden="true">•</span>
                  <span>{a.readTime} baca</span>
                </div>
                <h3 className="mt-3 font-heading text-xl font-bold leading-snug text-charcoal">
                  <Link to={`/artikel/${a.slug}`} className="transition-colors hover:text-forest">
                    {a.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/65">{a.excerpt}</p>
                <Link
                  to={`/artikel/${a.slug}`}
                  className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-forest hover:text-leaf"
                >
                  Baca Selengkapnya
                  <Icon icon="solar:arrow-right-linear" className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-xs italic text-charcoal/45">Artikel di atas merupakan konten demo yang dapat diganti dengan materi resmi Mico Farm.</p>
      </div>
    </section>
  );
}
