import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BusinessOverview from "@/components/BusinessOverview";
import AboutSection from "@/components/AboutSection";
import OurFarmSection from "@/components/OurFarmSection";
import ProductSection from "@/components/ProductSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import PartnershipSection from "@/components/PartnershipSection";
import ArticlesSection from "@/components/ArticlesSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useScrollTo } from "@/hooks/useLenis";
import { refreshScroll } from "@/hooks/useReveal";

export default function HomePage() {
  const location = useLocation();
  const scrollTo = useScrollTo();

  useSeo({
    title: "Mico Farm | Perusahaan Agribisnis & Kebutuhan Peternakan Indonesia",
    description:
      "Mico Farm merupakan perusahaan agribisnis dan peternakan yang menjalankan kegiatan peternakan mandiri serta menyediakan berbagai kebutuhan peternakan di Indonesia.",
    path: "/",
  });

  // Handle cross-page anchor navigation and /#hash deep links
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo || location.hash.replace("#", "");
    if (!target) return;
    const t = setTimeout(() => {
      refreshScroll();
      scrollTo(target, target === "beranda" ? 0 : -72);
    }, 250);
    return () => clearTimeout(t);
  }, [location, scrollTo]);

  return (
    <>
      <Navbar transparent />
      <main id="konten-utama">
        <HeroSection />
        <BusinessOverview />
        <AboutSection />
        <OurFarmSection />
        <ProductSection />
        <WhyChooseUs />
        <ServicesSection />
        <PartnershipSection />
        <ArticlesSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
