import { useRef } from "react";
import { Icon } from "@iconify/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { visionMission } from "@/data/company";

const ABOUT_IMG =
  "https://images.pexels.com/photos/14020604/pexels-photo-14020604.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1300&w=1000";

export default function AboutSection() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="tentang" ref={root} className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          {/* Image column */}
          <div className="relative lg:col-span-5 lg:sticky lg:top-28">
            <div data-mask className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-beige">
              <img
                src={ABOUT_IMG}
                alt="Peternak menggiring kawanan sapi di jalan pedesaan berlatar pegunungan"
                loading="lazy"
                decoding="async"
                data-parallax="8"
                className="h-[115%] w-full object-cover"
              />
            </div>
            <div
              data-reveal
              className="absolute -bottom-6 -right-4 hidden max-w-[230px] rounded-2xl bg-forest p-5 text-white shadow-xl sm:block lg:-right-8"
            >
              <Icon icon="solar:leaf-linear" className="mb-3 h-7 w-7 text-sage" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-white/85">
                Menghubungkan kegiatan peternakan dan penyediaan kebutuhan peternakan dalam satu ekosistem.
              </p>
            </div>
          </div>

          {/* Content column */}
          <div className="lg:col-span-7 lg:pl-8">
            <SectionHeading
              eyebrow="Tentang Kami"
              title="Berawal dari Alam, Bergerak untuk Masa Depan Peternakan."
              description="Mico Farm bergerak dengan pendekatan yang menghubungkan kegiatan peternakan dan penyediaan kebutuhan peternakan. Dengan menjalankan peternakan sendiri, kami memahami kebutuhan di lapangan, dan pemahaman itulah yang menjadi dasar dalam menghadirkan berbagai kebutuhan bagi para peternak dan mitra."
            />

            {/* Profil */}
            <div data-reveal className="mt-12 rounded-3xl border border-charcoal/10 bg-cream p-7 sm:p-9">
              <h3 className="font-heading text-lg font-bold text-charcoal">Profil Perusahaan</h3>
              <p className="mt-3 leading-relaxed text-charcoal/75">
                Mico Farm adalah perusahaan agribisnis dan peternakan di Indonesia dengan dua kegiatan bisnis utama:
                menjalankan kegiatan peternakan secara mandiri, serta menyediakan berbagai kebutuhan peternakan seperti
                pakan, vitamin, suplemen, peralatan, hingga perlengkapan kandang.
              </p>
              <p className="mt-3 text-xs text-charcoal/50">
                Informasi tahun berdiri, lokasi, dan detail legalitas akan ditampilkan setelah data resmi perusahaan
                tersedia.
              </p>
            </div>

            {/* Visi & Misi */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div data-reveal className="rounded-3xl bg-forest p-7 text-white sm:p-9">
                <span className="eyebrow text-sage before:bg-sage">Visi</span>
                <p className="mt-5 font-heading text-xl font-semibold leading-snug">"{visionMission.vision}"</p>
              </div>
              <div data-reveal data-delay="0.1" className="rounded-3xl border border-charcoal/10 p-7 sm:p-9">
                <span className="eyebrow">Misi</span>
                <ol className="mt-5 space-y-3">
                  {visionMission.mission.map((m, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-charcoal/80">
                      <span className="font-heading font-bold text-leaf">0{i + 1}</span>
                      {m}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <p data-reveal className="mt-4 text-xs italic text-charcoal/50">
              {visionMission.disclaimer}
            </p>

            {/* Nilai */}
            <div className="mt-12">
              <span data-reveal className="eyebrow">
                Nilai-nilai Kami
              </span>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {visionMission.values.map((v, i) => (
                  <li
                    key={v.title}
                    data-reveal
                    data-delay={String(i * 0.08)}
                    className="flex gap-4 rounded-2xl border border-charcoal/10 p-5 transition-colors hover:border-leaf/50"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage/40 text-forest">
                      <Icon icon={v.icon} className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-charcoal">{v.title}</h4>
                      <p className="mt-1 text-sm text-charcoal/65">{v.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
