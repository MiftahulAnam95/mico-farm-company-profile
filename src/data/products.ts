export interface ProductCategory {
  slug: string;
  name: string;
  short: string;
  description: string;
  items: string[];
  image: string;
  alt: string;
  icon: string;
}

/**
 * Katalog informatif. Ketersediaan setiap item mengikuti stok aktual
 * perusahaan — website tidak menyatakan bahwa semua produk selalu tersedia.
 */
export const productCategories: ProductCategory[] = [
  {
    slug: "pakan-ternak",
    name: "Pakan Ternak",
    short: "Berbagai jenis pakan untuk mendukung kebutuhan nutrisi harian ternak.",
    description:
      "Kategori pakan ternak mencakup berbagai pilihan pakan yang umum digunakan dalam kegiatan peternakan unggas, ruminansia, dan perikanan.",
    items: ["Pakan ayam", "Pakan sapi", "Pakan kambing", "Pakan domba", "Pakan ikan", "Konsentrat"],
    image: "https://images.pexels.com/photos/7782871/pexels-photo-7782871.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000",
    alt: "Tangan menakar pakan ternak dari wadah logam",
    icon: "solar:bowl-chopsticks-linear",
  },
  {
    slug: "vitamin-nutrisi",
    name: "Vitamin & Nutrisi",
    short: "Produk pendukung nutrisi untuk menjaga kondisi ternak.",
    description:
      "Kategori ini meliputi vitamin, mineral, dan suplemen yang berperan melengkapi kebutuhan nutrisi ternak dalam masa pemeliharaan.",
    items: ["Vitamin ternak", "Mineral", "Suplemen nutrisi", "Produk pendukung kebutuhan nutrisi ternak"],
    image: "https://images.pexels.com/photos/7781984/pexels-photo-7781984.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000",
    alt: "Wadah berisi pelet nutrisi ternak",
    icon: "solar:test-tube-linear",
  },
  {
    slug: "peralatan-peternakan",
    name: "Peralatan Peternakan",
    short: "Peralatan dasar untuk aktivitas pemeliharaan sehari-hari.",
    description:
      "Peralatan yang menunjang kegiatan pemeliharaan, mulai dari tempat pakan dan minum hingga perlengkapan kandang lainnya.",
    items: ["Tempat pakan", "Tempat minum", "Peralatan kandang", "Perlengkapan pemeliharaan"],
    image: "https://images.pexels.com/photos/15348969/pexels-photo-15348969.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000",
    alt: "Peralatan ember logam di lingkungan peternakan",
    icon: "solar:settings-minimalistic-linear",
  },
  {
    slug: "kesehatan-kebersihan",
    name: "Kesehatan & Kebersihan",
    short: "Produk pendukung kesehatan hewan dan sanitasi kandang.",
    description:
      "Kategori yang mendukung upaya menjaga kesehatan ternak dan kebersihan lingkungan peternakan, termasuk perlengkapan biosekuriti.",
    items: ["Produk kesehatan hewan", "Perlengkapan sanitasi", "Produk pendukung biosekuriti"],
    image: "https://images.pexels.com/photos/5798535/pexels-photo-5798535.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000",
    alt: "Sapi di dalam kandang yang bersih dan terawat",
    icon: "solar:health-linear",
  },
  {
    slug: "perlengkapan-kandang",
    name: "Perlengkapan Kandang",
    short: "Kebutuhan operasional untuk kandang yang tertata dan bersih.",
    description:
      "Perlengkapan yang membantu operasional kandang berjalan rapi, termasuk perlengkapan kebersihan dan kebutuhan operasional harian.",
    items: ["Peralatan kandang", "Perlengkapan kebersihan", "Kebutuhan operasional peternakan"],
    image: "https://images.pexels.com/photos/7883128/pexels-photo-7883128.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000",
    alt: "Penataan perlengkapan operasional di dalam kandang",
    icon: "solar:home-2-linear",
  },
];
