import { Icon } from "@iconify/react";
import type { ProductCategory as Category } from "@/data/products";
import { cn } from "@/utils/cn";

interface Props {
  category: Category;
  index: number;
  active: boolean;
  onSelect: (slug: string) => void;
}

export default function ProductCategory({ category, index, active, onSelect }: Props) {
  return (
    <article
      data-reveal
      data-delay={String((index % 3) * 0.08)}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-500",
        active ? "border-forest shadow-[0_20px_50px_-20px_rgba(40,91,59,0.35)]" : "border-charcoal/10 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(41,51,44,0.3)]",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-beige">
        <img
          src={category.image}
          alt={category.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-forest">
          <Icon icon={category.icon} className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="font-heading text-xs font-bold text-leaf">0{index + 1}</span>
        <h3 className="mt-2 font-heading text-xl font-bold text-charcoal">{category.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/65">{category.short}</p>
        <button
          type="button"
          onClick={() => onSelect(category.slug)}
          aria-expanded={active}
          aria-controls={`detail-${category.slug}`}
          className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-forest transition-colors hover:text-leaf"
        >
          {active ? "Tutup Informasi" : "Lihat Informasi"}
          <Icon
            icon="solar:arrow-right-linear"
            className={cn("h-4 w-4 transition-transform", active ? "rotate-90" : "group-hover:translate-x-1")}
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}
