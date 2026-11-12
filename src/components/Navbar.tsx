import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import Logo from "@/components/ui/Logo";
import { useScrollTo, useLenis } from "@/hooks/useLenis";

export const navItems = [
  { label: "Beranda", id: "beranda" },
  { label: "Tentang Kami", id: "tentang" },
  { label: "Peternakan", id: "peternakan" },
  { label: "Produk", id: "produk" },
  { label: "Layanan", id: "layanan" },
  { label: "Artikel", id: "artikel" },
  { label: "Kontak", id: "kontak", to: "/kontak" },
];

interface Props {
  /** When true the navbar starts transparent over a dark hero. */
  transparent?: boolean;
}

export default function Navbar({ transparent = true }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTo = useScrollTo();
  const lenis = useLenis();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock scroll + focus management for mobile menu
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      setTimeout(() => firstLinkRef.current?.focus(), 50);
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  const go = (item: (typeof navItems)[number]) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (item.to) {
      navigate(item.to);
      return;
    }
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: item.id } });
    } else {
      scrollTo(item.id, item.id === "beranda" ? 0 : -72);
    }
  };

  const solid = scrolled || !transparent || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "bg-cream/90 shadow-[0_1px_0_rgba(41,51,44,0.08)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-white"
      >
        Lewati ke konten utama
      </a>
      <nav aria-label="Navigasi utama" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link to="/" aria-label="Mico Farm — Beranda" onClick={() => setOpen(false)}>
          <Logo light={!solid} />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.to ?? `/#${item.id}`}
                onClick={go(item)}
                className={cn(
                  "group relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  solid ? "text-charcoal/80 hover:text-forest" : "text-white/85 hover:text-white",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                    solid ? "bg-forest" : "bg-white",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link to="/kontak" className={cn("hidden sm:inline-flex", solid ? "btn-primary" : "btn-light")}>
            Hubungi Kami
            <Icon icon="solar:arrow-right-up-linear" className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
              solid ? "border-charcoal/15 text-charcoal" : "border-white/40 text-white",
            )}
          >
            <Icon icon={open ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-charcoal/40 transition-opacity duration-500 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-dvh w-[86%] max-w-sm flex-col bg-cream px-8 pb-10 pt-24 shadow-2xl transition-transform duration-500 ease-out-expo lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
        data-lenis-prevent
      >
        <ul className="flex flex-col gap-1">
          {navItems.map((item, i) => (
            <li
              key={item.id}
              style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
              className={cn("transition-all duration-500", open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0")}
            >
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.to ?? `/#${item.id}`}
                onClick={go(item)}
                className="flex items-center justify-between border-b border-charcoal/10 py-4 font-heading text-2xl font-semibold text-charcoal hover:text-forest"
              >
                {item.label}
                <Icon icon="solar:alt-arrow-right-linear" className="h-5 w-5 text-leaf" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <Link to="/kontak" onClick={() => setOpen(false)} className="btn-primary w-full">
            Hubungi Kami
          </Link>
          <p className="mt-6 text-xs text-charcoal/50">Growing Together, Naturally.</p>
        </div>
      </div>
    </header>
  );
}
