import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles, formatDate, HEALTH_DISCLAIMER } from "@/data/articles";
import { useSeo } from "@/hooks/useSeo";
import { useReveal } from "@/hooks/useReveal";

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  const root = useRef<HTMLElement>(null);
  useReveal(root, [slug]);

  useSeo({
    title: article ? `${article.title} | Mico Farm` : "Artikel | Mico Farm",
    description: article?.excerpt ?? "",
    image: article?.image,
    path: `/artikel/${slug}`,
    type: "article",
  });

  if (!article) return <Navigate to="/404" replace />;

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Navbar transparent={false} />
      <main id="konten-utama" ref={root} className="bg-cream pt-28">
        <article className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Link to="/#artikel" className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-leaf">
            <Icon icon="solar:arrow-left-linear" className="h-4 w-4" aria-hidden="true" /> Kembali ke Artikel
          </Link>

          <header className="mt-8 max-w-3xl">
            <span className="rounded-full bg-sage/40 px-3 py-1 text-xs font-semibold text-forest">{article.category}</span>
            <h1 className="mt-5 text-3xl font-bold leading-[1.1] text-charcoal sm:text-5xl">{article.title}</h1>
            <div className="mt-5 flex items-center gap-3 text-sm text-charcoal/55">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true">•</span>
              <span>{article.readTime} baca</span>
            </div>
          </header>

          <div data-mask className="relative mt-10 aspect-[16/8] overflow-hidden rounded-[2rem] bg-beige">
            <img src={article.image} alt={article.alt} className="h-full w-full object-cover" decoding="async" />
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-12 lg:grid-cols-12">
            <div className="prose-custom lg:col-span-8">
              {article.body.map((p, i) => (
                <p key={i} data-reveal className="mb-6 text-base leading-[1.85] text-charcoal/80 sm:text-lg">
                  {p}
                </p>
              ))}
              {(article.category === "Kesehatan Ternak" || article.category === "Nutrisi dan Pakan") && (
                <p data-reveal className="mt-8 flex gap-3 rounded-2xl border border-earth/30 bg-beige/40 p-5 text-sm text-charcoal/75">
                  <Icon icon="solar:danger-triangle-linear" className="h-5 w-5 shrink-0 text-earth" aria-hidden="true" />
                  {HEALTH_DISCLAIMER}
                </p>
              )}
            </div>
            <aside className="lg:col-span-4">
              <div data-reveal className="rounded-3xl bg-forest p-7 text-white">
                <h2 className="font-heading text-xl font-bold">Ada pertanyaan?</h2>
                <p className="mt-3 text-sm text-white/75">Hubungi tim Mico Farm untuk informasi produk dan kerja sama.</p>
                <Link to="/kontak" className="btn-light mt-6">Hubungi Kami</Link>
              </div>
            </aside>
          </div>

          <section className="mt-24 border-t border-charcoal/10 pb-24 pt-14" aria-labelledby="related-title">
            <h2 id="related-title" className="font-heading text-2xl font-bold text-charcoal">Artikel Lainnya</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <Link key={a.slug} to={`/artikel/${a.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <img src={a.image} alt={a.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-leaf">{a.category}</p>
                  <h3 className="mt-1 font-heading font-bold text-charcoal group-hover:text-forest">{a.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
