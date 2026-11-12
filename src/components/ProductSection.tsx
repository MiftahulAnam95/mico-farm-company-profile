import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCategory from "@/components/ProductCategory";
import { useReveal, refreshScroll } from "@/hooks/useReveal";
import { productCategories } from "@/data/products";

export default function ProductSection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  useReveal(root);

  useEffect(() => {
    refreshScroll();
    if (active) detailRef.current?.focus({ preventScroll: true });
  }, [active]);

  const selected = productCategories.find((c) => c.slug === active);

  return (
    <section id="produk" ref={root} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Produk & Kebutuhan"
          title="Berbagai Kebutuhan untuk Mendukung Peternakan."
          description="Temukan berbagai kategori produk dan perlengkapan yang mendukung kegiatan pemeliharaan serta pengelolaan peternakan."
          align="center"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((c, i) => (
            <ProductCategory
              key={c.slug}
              category={c}
              index={i}
              active={active === c.slug}
              onSelect={(slug) => setActive((cur) => (cur === slug ? null : slug))}
            />
          ))}
          {/* info card */}
          <div data-reveal className="flex flex-col justify-between rounded-3xl bg-forest p-7 text-white">
            <div>
              <Icon icon="solar:chat-round-dots-linear" className="h-8 w-8 text-sage" aria-hidden="true" />
              <h3 className="mt-5 font-heading text-2xl font-bold">Butuh informasi lebih lanjut?</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Website ini bersifat informatif. Untuk ketersediaan produk dan pertanyaan lainnya, silakan hubungi tim
                Mico Farm.
              </p>
            </div>
            <Link to="/kontak" className="btn-light mt-8 self-start">
              Hubungi Kami
              <Icon icon="solar:arrow-right-up-linear" className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div
            id={`detail-${selected.slug}`}
            ref={detailRef}
            tabIndex={-1}
            className="mt-8 grid gap-8 rounded-3xl border border-forest/20 bg-cream p-7 sm:p-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <span className="eyebrow">Informasi Kategori</span>
              <h3 className="mt-4 font-heading text-3xl font-bold text-charcoal">{selected.name}</h3>
              <p className="mt-4 leading-relaxed text-charcoal/75">{selected.description}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {selected.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-charcoal/80">
                    <Icon icon="solar:check-circle-linear" className="h-4 w-4 text-leaf" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-white p-6 lg:col-span-5">
              <p className="text-sm leading-relaxed text-charcoal/65">
                <Icon icon="solar:info-circle-linear" className="mr-1 inline h-4 w-4 text-leaf" aria-hidden="true" />
                Ketersediaan setiap item mengikuti stok aktual perusahaan. Tidak ada transaksi melalui website ini.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/kontak?subjek=${encodeURIComponent("Informasi " + selected.name)}`} className="btn-primary">
                  Tanyakan Kategori Ini
                </Link>
                <button type="button" onClick={() => setActive(null)} className="btn-outline">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
