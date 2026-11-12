import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LogoMark } from "@/components/ui/Logo";
import { useSeo } from "@/hooks/useSeo";

export default function NotFoundPage() {
  useSeo({ title: "Halaman Tidak Ditemukan | Mico Farm", description: "Halaman yang Anda cari tidak tersedia.", path: "/404" });
  return (
    <>
      <Navbar transparent={false} />
      <main id="konten-utama" className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-20 text-center">
        <LogoMark className="h-16 w-16 text-forest" />
        <h1 className="mt-6 text-4xl font-bold text-charcoal">Halaman tidak ditemukan</h1>
        <p className="mt-3 max-w-md text-charcoal/65">Tautan mungkin sudah berubah atau halaman belum tersedia.</p>
        <Link to="/" className="btn-primary mt-8">Kembali ke Beranda</Link>
      </main>
      <Footer />
    </>
  );
}
