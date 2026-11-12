import { useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useReveal } from "@/hooks/useReveal";
import { useScrollTo } from "@/hooks/useLenis";

const IMG =
  "https://images.pexels.com/photos/28962577/pexels-photo-28962577.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800";

export default function FinalCTA() {
  const root = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();
  useReveal(root);

  return (
    <section ref={root} className="bg-cream px-5 pb-24 pt-8 sm:px-8 sm:pb-32 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-forest-deep">
        <div data-mask className="absolute inset-0">
          <img
            src={IMG}
            alt="Sapi merumput di padang rumput yang diterangi sinar matahari"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/20" />
        </div>
        <div className="relative px-7 py-20 text-white sm:px-14 sm:py-28 lg:px-20">
          <p data-reveal className="eyebrow text-sage before:bg-sage">
            Mari Terhubung
          </p>
          <h2 data-reveal data-delay="0.08" className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] sm:text-5xl">
            Mari Bangun Masa Depan Peternakan yang Lebih Baik.
          </h2>
          <p data-reveal data-delay="0.16" className="mt-6 max-w-xl text-white/80 sm:text-lg">
            Kenali lebih dekat Mico Farm, jelajahi kegiatan peternakan kami, dan temukan berbagai kebutuhan untuk
            mendukung usaha peternakan Anda.
          </p>
          <div data-reveal data-delay="0.24" className="mt-10 flex flex-wrap gap-3">
            <Link to="/kontak" className="btn-light">
              Hubungi Mico Farm
              <Icon icon="solar:arrow-right-up-linear" className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button type="button" onClick={() => scrollTo("tentang")} className="btn-outline-light">
              Tentang Kami
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
