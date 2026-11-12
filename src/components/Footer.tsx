import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Logo from "@/components/ui/Logo";
import { navItems } from "@/components/Navbar";
import { productCategories } from "@/data/products";
import { company, isPlaceholder } from "@/data/company";
import { useScrollTo } from "@/hooks/useLenis";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTo = useScrollTo();
  const { contact } = company;

  const goSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") navigate("/", { state: { scrollTo: id } });
    else scrollTo(id, -72);
  };

  const Placeholder = ({ v }: { v: string }) =>
    isPlaceholder(v) ? <span className="text-white/45">{v}</span> : <>{v}</>;

  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">{company.shortDescription}</p>
            <ul className="mt-6 flex gap-2">
              {company.social.map((s) => (
                <li key={s.name}>
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-sage hover:text-sage"
                    >
                      <Icon icon={s.icon} className="h-5 w-5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span
                      aria-label={`${s.name} (tautan belum tersedia)`}
                      title={`${s.name} — tautan belum tersedia`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/35"
                    >
                      <Icon icon={s.icon} className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Navigasi footer" className="lg:col-span-2">
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-sage">Navigasi</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navItems.map((n) => (
                <li key={n.id}>
                  {n.to ? (
                    <Link to={n.to} className="text-white/70 transition-colors hover:text-white">
                      {n.label}
                    </Link>
                  ) : (
                    <a href={`/#${n.id}`} onClick={goSection(n.id)} className="text-white/70 transition-colors hover:text-white">
                      {n.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-sage">Kategori Produk</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {productCategories.map((c) => (
                <li key={c.slug}>
                  <a href="/#produk" onClick={goSection("produk")} className="text-white/70 transition-colors hover:text-white">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic lg:col-span-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-sage">Kontak</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Icon icon="solar:map-point-linear" className="mt-0.5 h-5 w-5 shrink-0 text-sage" aria-hidden="true" />
                <span className="text-white/70">
                  <Placeholder v={contact.address} />
                </span>
              </li>
              <li className="flex gap-3">
                <Icon icon="solar:letter-linear" className="mt-0.5 h-5 w-5 shrink-0 text-sage" aria-hidden="true" />
                {isPlaceholder(contact.email) ? (
                  <span className="text-white/45">{contact.email}</span>
                ) : (
                  <a href={`mailto:${contact.email}`} className="text-white/70 hover:text-white">{contact.email}</a>
                )}
              </li>
              <li className="flex gap-3">
                <Icon icon="solar:chat-round-call-linear" className="mt-0.5 h-5 w-5 shrink-0 text-sage" aria-hidden="true" />
                {contact.whatsapp ? (
                  <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white">
                    {contact.whatsappDisplay}
                  </a>
                ) : (
                  <span className="text-white/45">{contact.whatsappDisplay}</span>
                )}
              </li>
            </ul>
          </address>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. Hak cipta dilindungi.</p>
          <p>{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
