import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";

export default function ContactPage() {
  useSeo({
    title: "Hubungi Kami | Mico Farm",
    description:
      "Hubungi Mico Farm untuk informasi produk kebutuhan peternakan, kegiatan peternakan, serta peluang kerja sama dan kemitraan.",
    path: "/kontak",
  });

  return (
    <>
      <Navbar transparent={false} />
      <main id="konten-utama" className="pt-20">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
