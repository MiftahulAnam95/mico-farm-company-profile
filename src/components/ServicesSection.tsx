import { useRef } from "react";
import { Icon } from "@iconify/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { services } from "@/data/company";

export default function ServicesSection() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="layanan" ref={root} className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Layanan & Bidang Usaha"
          title="Mendukung Setiap Langkah dalam Peternakan."
          description="Bidang layanan Mico Farm berfokus pada penyediaan kebutuhan, berbagi informasi, dan membangun kemitraan."
        />

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li
              key={s.num}
              data-reveal
              data-delay={String((i % 3) * 0.08)}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-leaf/50 hover:shadow-[0_24px_50px_-30px_rgba(40,91,59,0.4)] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/35 text-forest transition-colors duration-500 group-hover:bg-forest group-hover:text-white">
                  <Icon icon={s.icon} className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-heading text-3xl font-extrabold text-beige">{s.num}</span>
              </div>
              <h3 className="mt-8 font-heading text-xl font-bold text-charcoal">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{s.desc}</p>
            </li>
          ))}
          <li data-reveal data-delay="0.16" className="flex items-center rounded-3xl border border-dashed border-forest/30 p-7 sm:p-8">
            <p className="text-sm leading-relaxed text-charcoal/60">
              Cakupan layanan ditampilkan sesuai kegiatan bisnis yang dijalankan saat ini. Informasi layanan lain akan
              diperbarui setelah dikonfirmasi oleh perusahaan.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
