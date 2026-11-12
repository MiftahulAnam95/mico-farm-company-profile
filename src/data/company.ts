/**
 * DATA PERUSAHAAN
 * ---------------------------------------------------------------
 * Semua nilai yang diawali "[" adalah PLACEHOLDER yang harus diganti
 * dengan data resmi Mico Farm sebelum website dipublikasikan.
 * Jangan menambahkan klaim (tahun berdiri, jumlah ternak, sertifikasi,
 * dll.) yang belum dikonfirmasi oleh perusahaan.
 */

export const company = {
  name: "Mico Farm",
  tagline: "Growing Together, Naturally.",
  shortDescription:
    "Mico Farm merupakan perusahaan agribisnis dan peternakan yang menjalankan kegiatan peternakan mandiri serta menyediakan berbagai kebutuhan peternakan di Indonesia.",
  // URL produksi — ganti saat domain sudah tersedia
  siteUrl: "https://micofarm.id",
  contact: {
    address: "[Alamat lengkap perusahaan — menunggu konfirmasi]",
    city: "[Kota / Provinsi]",
    email: "[email@micofarm.id]",
    phone: "[Nomor telepon perusahaan]",
    // Format internasional tanpa tanda "+" (contoh: 628123456789)
    whatsapp: "",
    whatsappDisplay: "[Nomor WhatsApp perusahaan]",
    // Embed URL Google Maps — isi jika alamat sudah tersedia
    mapEmbedUrl: "",
    hours: "[Jam operasional — menunggu konfirmasi]",
  },
  social: [
    { name: "Instagram", icon: "solar:camera-linear", url: "" },
    { name: "Facebook", icon: "solar:users-group-rounded-linear", url: "" },
    { name: "YouTube", icon: "solar:play-circle-linear", url: "" },
    { name: "TikTok", icon: "solar:music-note-linear", url: "" },
  ],
};

export const isPlaceholder = (value: string) =>
  !value || value.trim().startsWith("[");

export const whatsappLink = (message?: string) => {
  if (!company.contact.whatsapp) return null;
  const base = `https://wa.me/${company.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const visionMission = {
  disclaimer:
    "Rumusan visi dan misi berikut merupakan konsep awal yang dapat disesuaikan dan belum merupakan pernyataan resmi perusahaan.",
  vision:
    "Menjadi perusahaan agribisnis dan peternakan terpercaya yang turut mendukung pertumbuhan sektor peternakan Indonesia.",
  mission: [
    "Menjalankan kegiatan peternakan dengan pengelolaan yang baik.",
    "Menyediakan berbagai kebutuhan peternakan yang relevan dengan kebutuhan pelanggan.",
    "Membangun hubungan yang baik dengan peternak dan mitra bisnis.",
    "Mendukung perkembangan sektor peternakan melalui pelayanan dan inovasi berkelanjutan.",
  ],
  values: [
    { title: "Natural", desc: "Bekerja selaras dengan alam dan proses yang alami.", icon: "solar:leaf-linear" },
    { title: "Terpercaya", desc: "Mengutamakan kejujuran dalam setiap hubungan bisnis.", icon: "solar:shield-check-linear" },
    { title: "Ramah", desc: "Dekat dengan peternak dan masyarakat.", icon: "solar:hand-heart-linear" },
    { title: "Berkelanjutan", desc: "Tumbuh dengan memperhatikan masa depan.", icon: "solar:refresh-circle-linear" },
  ],
};

export const whyUs = [
  {
    icon: "solar:layers-minimalistic-linear",
    title: "Integrated Business",
    desc: "Menggabungkan kegiatan peternakan mandiri dan penyediaan kebutuhan peternakan.",
  },
  {
    icon: "solar:hand-heart-linear",
    title: "Dekat dengan Kebutuhan Peternak",
    desc: "Memahami kebutuhan kegiatan peternakan dari sisi operasional maupun perlengkapan.",
  },
  {
    icon: "solar:widget-4-linear",
    title: "Pilihan Kebutuhan Beragam",
    desc: "Menghadirkan berbagai kategori kebutuhan pendukung peternakan.",
  },
  {
    icon: "solar:plant-linear",
    title: "Tumbuh Bersama",
    desc: "Membangun hubungan yang baik dengan pelanggan, peternak, dan mitra bisnis.",
  },
];

export const services = [
  {
    num: "01",
    icon: "solar:box-linear",
    title: "Penyediaan Kebutuhan Peternakan",
    desc: "Menyediakan berbagai kategori kebutuhan pendukung, mulai dari pakan hingga perlengkapan kandang.",
  },
  {
    num: "02",
    icon: "solar:document-text-linear",
    title: "Informasi & Pengenalan Produk",
    desc: "Membantu pelanggan mengenal kategori produk dan kegunaannya dalam kegiatan peternakan.",
  },
  {
    num: "03",
    icon: "solar:home-smile-linear",
    title: "Kegiatan Peternakan Mandiri",
    desc: "Menjalankan dan mengelola kegiatan peternakan sendiri sebagai bagian dari bisnis terpadu.",
  },
  {
    num: "04",
    icon: "solar:notebook-linear",
    title: "Informasi Kebutuhan Pemeliharaan",
    desc: "Berbagi informasi umum seputar kebutuhan pemeliharaan ternak sehari-hari.",
  },
  {
    num: "05",
    icon: "solar:users-group-two-rounded-linear",
    title: "Kerja Sama & Kemitraan Bisnis",
    desc: "Terbuka untuk membangun kemitraan dengan peternak, distributor, supplier, dan pelaku usaha.",
  },
];

export const partnerTypes = [
  "Peternak",
  "Distributor",
  "Supplier",
  "Reseller",
  "Pelaku Usaha Agribisnis",
  "Institusi & Perusahaan",
];

export const farmCategories = [
  {
    id: "peternakan",
    title: "Peternakan",
    desc: "Kegiatan peternakan yang dikelola secara mandiri oleh Mico Farm.",
    image: "https://images.pexels.com/photos/31158202/pexels-photo-31158202.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    alt: "Sapi merumput di padang rumput hijau pada hari cerah",
  },
  {
    id: "pemeliharaan",
    title: "Aktivitas Pemeliharaan",
    desc: "Rutinitas harian dalam merawat dan memantau kondisi ternak.",
    image: "https://images.pexels.com/photos/18860466/pexels-photo-18860466.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    alt: "Peternak membawa hijauan segar untuk ternak",
  },
  {
    id: "pakan",
    title: "Pemberian Pakan",
    desc: "Penyediaan pakan sebagai bagian penting dari pengelolaan ternak.",
    image: "https://images.pexels.com/photos/17064389/pexels-photo-17064389.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    alt: "Ayam berkumpul di sekitar tempat pakan",
  },
  {
    id: "lingkungan",
    title: "Lingkungan Peternakan",
    desc: "Lanskap hijau yang menjadi bagian dari ekosistem peternakan.",
    image: "https://images.pexels.com/photos/3266773/pexels-photo-3266773.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    alt: "Lanskap pertanian hijau berbukit yang asri",
  },
  {
    id: "pengelolaan",
    title: "Pengelolaan Ternak",
    desc: "Pengelolaan ternak yang tertata untuk mendukung produktivitas.",
    image: "https://images.pexels.com/photos/4939980/pexels-photo-4939980.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    alt: "Kambing merumput di padang rumput hijau",
  },
];
