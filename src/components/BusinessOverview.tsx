import { useRef } from "react";
import { Icon } from "@iconify/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { useScrollTo } from "@/hooks/useLenis";

const focus = [
  {
    num: "01",
    title: "Peternakan",
    desc: "Menampilkan kegiatan operasional dan pengelolaan peternakan Mico Farm.",
    image: "https://images.pexels.com/photos/6798461/pexels-photo-6798461.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    alt: "Kawanan sapi merumput di padang rumput hijau",
    target: "peternakan",
    icon: "solar:home-smile-linear",
  },
  {
    num: "02",
    title: "Kebutuhan Peternakan",
    desc: "Menyediakan berbagai kebutuhan pendukung kegiatan peternakan.",
    image: "https://images.pexels.com/photos/17555574/pexels-photo-17555574.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000",
    alt: "Aneka biji-bijian dan bahan pakan dalam karung",
    target: "produk",
    icon: "solar:box-linear",
  },
];

export default function BusinessOverview() {
  const root = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();
  useReveal(root);

  return (
    <section id="bidang-usaha" ref={root} className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Pengantar"
              title="Mengenal Mico Farm Lebih Dekat."
              description="Mico Farm merupakan perusahaan yang bergerak di bidang agribisnis dan peternakan. Melalui kegiatan peternakan mandiri serta penyediaan berbagai kebutuhan peternakan, Mico Farm berupaya menghadirkan solusi yang mendukung kebutuhan para pelaku usaha dan masyarakat."
            />
            <p data-reveal className="mt-8 font-heading text-xl font-semibold italic text-forest">
              "Growing Together, Naturally."
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:gap-8">
            {focus.map((f, i) => (
              <article
                key={f.num}
                data-reveal
                data-delay={String(i * 0.12)}
                className={i === 1 ? "sm:mt-16" : ""}
              >
                <div data-mask className={`relative overflow-hidden rounded-3xl bg-beige ${i === 0 ? "aspect-[4/5]" : "aspect-[5/4]"}`}>
                  <img src={f.image} alt={f.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <div className="mt-6 flex items-start gap-4">
                  <span className="font-heading text-sm font-bold text-leaf">{f.num}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal">{f.title}</h3>
                    <p className="mt-2 text-charcoal/70">{f.desc}</p>
                    <button
                      type="button"
                      onClick={() => scrollTo(f.target)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-leaf"
                    >
                      Selengkapnya
                      <Icon icon="solar:arrow-right-linear" className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
