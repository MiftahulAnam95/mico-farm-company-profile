import { useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { partnerTypes } from "@/data/company";

const IMG =
  "https://images.pexels.com/photos/36699649/pexels-photo-36699649.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800";

export default function PartnershipSection() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="kemitraan" ref={root} className="relative overflow-hidden bg-forest-deep py-28 text-white sm:py-40">
      <div className="absolute inset-0">
        <img
          src={IMG}
          alt="Hamparan lanskap agribisnis tropis hijau dengan pepohonan"
          loading="lazy"
          decoding="async"
          data-parallax="10"
          className="h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-deep/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-forest/70 via-transparent to-charcoal/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              light
              eyebrow="Kemitraan"
              title="Mari Tumbuh Bersama Mico Farm."
              description="Kami terbuka untuk membangun hubungan dan peluang kerja sama dengan berbagai pihak yang memiliki semangat untuk mengembangkan sektor agribisnis dan peternakan."
            />
            <div data-reveal className="mt-10">
              <Link
                to={`/kontak?subjek=${encodeURIComponent("Kerja Sama & Kemitraan")}`}
                className="btn-light"
              >
                Hubungi Kami untuk Kerja Sama
                <Icon icon="solar:arrow-right-up-linear" className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
            {partnerTypes.map((p, i) => (
              <li
                key={p}
                data-reveal
                data-delay={String(i * 0.06)}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-medium backdrop-blur-sm"
              >
                <Icon icon="solar:check-circle-bold" className="h-5 w-5 text-sage" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
