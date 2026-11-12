import { useRef } from "react";
import { Icon } from "@iconify/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { whyUs } from "@/data/company";

export default function WhyChooseUs() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="relative overflow-hidden bg-forest py-24 text-white sm:py-32">
      {/* decorative organic shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-leaf/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-sage/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              light
              eyebrow="Mengapa Mico Farm"
              title="Mengapa Mengenal Mico Farm?"
              description="Empat hal yang menjadi dasar cara kami bekerja dan tumbuh bersama para peternak."
            />
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {whyUs.map((w, i) => (
              <li
                key={w.title}
                data-reveal
                data-delay={String(i * 0.1)}
                className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-white/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/20 text-sage transition-transform duration-500 group-hover:scale-110">
                  <Icon icon={w.icon} className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-heading text-xl font-bold">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{w.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
