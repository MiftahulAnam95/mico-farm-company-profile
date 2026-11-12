import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { company, isPlaceholder, whatsappLink } from "@/data/company";
import { cn } from "@/utils/cn";

type Field = "nama" | "email" | "telepon" | "subjek" | "pesan";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const initial: Values = { nama: "", email: "", telepon: "", subjek: "", pesan: "" };

const subjects = [
  "Informasi Produk",
  "Kerja Sama & Kemitraan",
  "Informasi Peternakan",
  "Pertanyaan Umum",
];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.nama.trim().length < 2) e.nama = "Nama minimal 2 karakter.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Format email tidak valid.";
  if (!/^[0-9+\-\s()]{8,18}$/.test(v.telepon)) e.telepon = "Nomor telepon tidak valid (8–18 digit).";
  if (!v.subjek.trim()) e.subjek = "Subjek wajib diisi.";
  if (v.pesan.trim().length < 10) e.pesan = "Pesan minimal 10 karakter.";
  return e;
}

export default function ContactSection() {
  const root = useRef<HTMLElement>(null);
  const [params] = useSearchParams();
  const [values, setValues] = useState<Values>({ ...initial, subjek: params.get("subjek") ?? "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "ready" | "copied">("idle");
  const statusRef = useRef<HTMLDivElement>(null);
  useReveal(root);

  useEffect(() => {
    const s = params.get("subjek");
    if (s) setValues((v) => ({ ...v, subjek: s }));
  }, [params]);

  const composed = useMemo(
    () =>
      `Halo Mico Farm,\n\nNama: ${values.nama}\nEmail: ${values.email}\nTelepon: ${values.telepon}\nSubjek: ${values.subjek}\n\n${values.pesan}`,
    [values],
  );

  const wa = whatsappLink(composed);
  const mail = !isPlaceholder(company.contact.email)
    ? `mailto:${company.contact.email}?subject=${encodeURIComponent(values.subjek || "Pertanyaan")}&body=${encodeURIComponent(composed)}`
    : null;

  const onChange = (f: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [f]: e.target.value };
    setValues(next);
    if (touched[f]) setErrors(validate(next));
  };
  const onBlur = (f: Field) => () => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ nama: true, email: true, telepon: true, subjek: true, pesan: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      (document.getElementById(`field-${first}`) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("ready");
    setTimeout(() => statusRef.current?.focus(), 50);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(composed);
      setStatus("copied");
    } catch {
      /* clipboard unavailable */
    }
  };

  const fieldCls = (f: Field) =>
    cn(
      "w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/35 focus:border-forest focus:ring-2 focus:ring-leaf/30",
      errors[f] && touched[f] ? "border-red-500" : "border-charcoal/15",
    );

  const Err = ({ f }: { f: Field }) =>
    errors[f] && touched[f] ? (
      <p id={`err-${f}`} role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
        <Icon icon="solar:danger-circle-linear" className="h-3.5 w-3.5" aria-hidden="true" />
        {errors[f]}
      </p>
    ) : null;

  const { contact } = company;

  return (
    <section id="kontak" ref={root} className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Info */}
          <div className="lg:col-span-5">
            <SectionHeading
              as="h1"
              eyebrow="Kontak"
              title="Mari Berbincang dengan Mico Farm."
              description="Kami senang mendengar dari peternak, mitra, maupun siapa pun yang ingin mengenal Mico Farm lebih dekat."
            />

            <dl className="mt-10 space-y-5">
              {[
                { icon: "solar:buildings-2-linear", label: "Perusahaan", value: company.name },
                { icon: "solar:map-point-linear", label: "Alamat", value: contact.address },
                { icon: "solar:letter-linear", label: "Email", value: contact.email, href: !isPlaceholder(contact.email) ? `mailto:${contact.email}` : undefined },
                { icon: "solar:phone-linear", label: "Telepon", value: contact.phone, href: !isPlaceholder(contact.phone) ? `tel:${contact.phone}` : undefined },
                { icon: "solar:chat-round-call-linear", label: "WhatsApp", value: contact.whatsappDisplay, href: contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : undefined },
                { icon: "solar:clock-circle-linear", label: "Jam Operasional", value: contact.hours },
              ].map((row, i) => (
                <div key={row.label} data-reveal data-delay={String(i * 0.05)} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-forest shadow-sm">
                    <Icon icon={row.icon} className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">{row.label}</dt>
                    <dd className={cn("mt-0.5 text-sm", isPlaceholder(row.value) ? "italic text-charcoal/45" : "text-charcoal")}>
                      {row.href ? (
                        <a href={row.href} className="hover:text-forest">{row.value}</a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div data-reveal className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Media Sosial</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {company.social.map((s) => (
                  <li key={s.name}>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-4 py-2 text-xs font-medium text-forest hover:border-forest">
                        <Icon icon={s.icon} className="h-4 w-4" aria-hidden="true" /> {s.name}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 px-4 py-2 text-xs text-charcoal/40">
                        <Icon icon={s.icon} className="h-4 w-4" aria-hidden="true" /> {s.name} (segera)
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Map */}
            <div data-reveal className="mt-10 overflow-hidden rounded-3xl border border-charcoal/10 bg-white">
              {contact.mapEmbedUrl ? (
                <iframe
                  src={contact.mapEmbedUrl}
                  title="Peta lokasi Mico Farm"
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-56 flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_30%,rgba(185,201,168,0.5),transparent_60%)] text-center">
                  <Icon icon="solar:map-linear" className="h-8 w-8 text-forest/60" aria-hidden="true" />
                  <p className="px-6 text-sm text-charcoal/55">Peta lokasi akan ditampilkan setelah alamat perusahaan tersedia.</p>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form
              data-reveal
              onSubmit={onSubmit}
              noValidate
              className="rounded-[2rem] border border-charcoal/10 bg-white p-7 shadow-[0_30px_60px_-40px_rgba(41,51,44,0.3)] sm:p-10"
              aria-describedby="form-note"
            >
              <h2 className="font-heading text-2xl font-bold text-charcoal">Kirim Pertanyaan</h2>
              <p id="form-note" className="mt-2 text-sm text-charcoal/60">
                Isi formulir berikut, lalu lanjutkan pengiriman melalui WhatsApp atau email. Semua kolom wajib diisi.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="field-nama" className="mb-1.5 block text-sm font-medium text-charcoal">Nama</label>
                  <input id="field-nama" name="nama" autoComplete="name" value={values.nama} onChange={onChange("nama")} onBlur={onBlur("nama")} className={fieldCls("nama")} placeholder="Nama lengkap" aria-invalid={!!(errors.nama && touched.nama)} aria-describedby={errors.nama ? "err-nama" : undefined} required />
                  <Err f="nama" />
                </div>
                <div>
                  <label htmlFor="field-email" className="mb-1.5 block text-sm font-medium text-charcoal">Email</label>
                  <input id="field-email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange("email")} onBlur={onBlur("email")} className={fieldCls("email")} placeholder="nama@email.com" aria-invalid={!!(errors.email && touched.email)} aria-describedby={errors.email ? "err-email" : undefined} required />
                  <Err f="email" />
                </div>
                <div>
                  <label htmlFor="field-telepon" className="mb-1.5 block text-sm font-medium text-charcoal">Nomor Telepon</label>
                  <input id="field-telepon" name="telepon" type="tel" inputMode="tel" autoComplete="tel" value={values.telepon} onChange={onChange("telepon")} onBlur={onBlur("telepon")} className={fieldCls("telepon")} placeholder="08xxxxxxxxxx" aria-invalid={!!(errors.telepon && touched.telepon)} aria-describedby={errors.telepon ? "err-telepon" : undefined} required />
                  <Err f="telepon" />
                </div>
                <div>
                  <label htmlFor="field-subjek" className="mb-1.5 block text-sm font-medium text-charcoal">Subjek</label>
                  <input id="field-subjek" name="subjek" list="subjek-list" value={values.subjek} onChange={onChange("subjek")} onBlur={onBlur("subjek")} className={fieldCls("subjek")} placeholder="Pilih atau tulis subjek" aria-invalid={!!(errors.subjek && touched.subjek)} aria-describedby={errors.subjek ? "err-subjek" : undefined} required />
                  <datalist id="subjek-list">
                    {subjects.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                  <Err f="subjek" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="field-pesan" className="mb-1.5 block text-sm font-medium text-charcoal">Pesan</label>
                  <textarea id="field-pesan" name="pesan" rows={5} value={values.pesan} onChange={onChange("pesan")} onBlur={onBlur("pesan")} className={cn(fieldCls("pesan"), "resize-y")} placeholder="Tuliskan pertanyaan atau kebutuhan Anda" aria-invalid={!!(errors.pesan && touched.pesan)} aria-describedby={errors.pesan ? "err-pesan" : undefined} required />
                  <Err f="pesan" />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button type="submit" className="btn-primary">
                  Periksa & Lanjutkan
                  <Icon icon="solar:arrow-right-linear" className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="text-xs text-charcoal/50">Website ini belum terhubung ke server pengiriman pesan.</p>
              </div>

              {status !== "idle" && (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role="status"
                  aria-live="polite"
                  className="mt-6 rounded-2xl border border-leaf/40 bg-sage/20 p-5"
                >
                  <p className="flex items-center gap-2 font-heading font-bold text-forest">
                    <Icon icon="solar:check-circle-bold" className="h-5 w-5" aria-hidden="true" />
                    Formulir valid. Pilih cara pengiriman:
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {wa ? (
                      <a href={wa} target="_blank" rel="noreferrer" className="btn-primary">
                        <Icon icon="solar:chat-round-call-linear" className="h-4 w-4" aria-hidden="true" /> Kirim via WhatsApp
                      </a>
                    ) : (
                      <span className="btn border border-charcoal/10 text-charcoal/45">WhatsApp belum tersedia</span>
                    )}
                    {mail ? (
                      <a href={mail} className="btn-outline">
                        <Icon icon="solar:letter-linear" className="h-4 w-4" aria-hidden="true" /> Kirim via Email
                      </a>
                    ) : (
                      <span className="btn border border-charcoal/10 text-charcoal/45">Email belum tersedia</span>
                    )}
                    <button type="button" onClick={copy} className="btn-outline">
                      <Icon icon="solar:copy-linear" className="h-4 w-4" aria-hidden="true" />
                      {status === "copied" ? "Pesan tersalin" : "Salin pesan"}
                    </button>
                  </div>
                  {!wa && !mail && (
                    <p className="mt-3 text-xs text-charcoal/60">
                      Kontak resmi perusahaan belum dimasukkan. Anda dapat menyalin pesan untuk dikirim secara manual.
                    </p>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
