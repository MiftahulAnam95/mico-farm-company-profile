export type ArticleCategory =
  | "Tips Peternakan"
  | "Nutrisi dan Pakan"
  | "Kesehatan Ternak"
  | "Pengelolaan Kandang"
  | "Agribisnis Indonesia";

export interface Article {
  slug: string;
  category: ArticleCategory;
  title: string;
  excerpt: string;
  date: string; // ISO
  readTime: string;
  image: string;
  alt: string;
  body: string[]; // paragraphs
}

export const articleCategories: ArticleCategory[] = [
  "Tips Peternakan",
  "Nutrisi dan Pakan",
  "Kesehatan Ternak",
  "Pengelolaan Kandang",
  "Agribisnis Indonesia",
];

export const HEALTH_DISCLAIMER =
  "Konten ini bersifat informasi umum dan bukan pengganti konsultasi dengan dokter hewan atau tenaga profesional.";

/** KONTEN DEMO — ganti dengan artikel resmi Mico Farm. */
export const articles: Article[] = [
  {
    slug: "memulai-usaha-peternakan-skala-kecil",
    category: "Tips Peternakan",
    title: "Hal-hal yang Perlu Dipersiapkan Sebelum Memulai Peternakan Skala Kecil",
    excerpt:
      "Memulai usaha peternakan membutuhkan persiapan matang, mulai dari pemilihan lokasi hingga perencanaan kebutuhan harian.",
    date: "2025-01-15",
    readTime: "4 menit",
    image: "https://images.pexels.com/photos/27896714/pexels-photo-27896714.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200",
    alt: "Sapi perah merumput di padang rumput pedesaan",
    body: [
      "Banyak peternak pemula memulai dari skala kecil sebelum mengembangkan usahanya. Tahap awal ini menjadi momen penting untuk memahami ritme pemeliharaan, kebutuhan pakan, dan pengelolaan kandang.",
      "Beberapa hal yang umumnya dipertimbangkan antara lain ketersediaan lahan, akses air bersih, sumber pakan, serta perlengkapan dasar seperti tempat pakan dan minum.",
      "Perencanaan kebutuhan harian membantu peternak memperkirakan biaya operasional dan menjaga konsistensi pemeliharaan. Catatan sederhana mengenai jadwal pemberian pakan dan kondisi ternak juga dapat menjadi kebiasaan yang bermanfaat.",
      "Artikel ini merupakan konten demo yang dapat diganti dengan materi edukasi resmi dari tim Mico Farm.",
    ],
  },
  {
    slug: "mengenal-jenis-pakan-ruminansia",
    category: "Nutrisi dan Pakan",
    title: "Mengenal Jenis Pakan untuk Ternak Ruminansia",
    excerpt:
      "Hijauan dan konsentrat memiliki peran yang berbeda dalam memenuhi kebutuhan nutrisi sapi, kambing, dan domba.",
    date: "2025-02-03",
    readTime: "5 menit",
    image: "https://images.pexels.com/photos/38594292/pexels-photo-38594292.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200",
    alt: "Domba dan kambing merumput di padang terbuka",
    body: [
      "Ternak ruminansia seperti sapi, kambing, dan domba umumnya memperoleh nutrisi dari hijauan seperti rumput dan leguminosa, serta dari pakan tambahan berupa konsentrat.",
      "Hijauan menyediakan serat yang dibutuhkan sistem pencernaan ruminansia, sementara konsentrat biasanya digunakan untuk melengkapi kebutuhan energi dan protein.",
      "Proporsi keduanya dapat berbeda tergantung tujuan pemeliharaan, usia ternak, dan ketersediaan bahan pakan di lokasi.",
      "Artikel ini merupakan konten demo. Untuk kebutuhan spesifik, konsultasikan dengan ahli nutrisi ternak atau tenaga profesional terkait.",
    ],
  },
  {
    slug: "menjaga-kebersihan-kandang-ayam",
    category: "Pengelolaan Kandang",
    title: "Kebiasaan Sederhana untuk Menjaga Kebersihan Kandang Ayam",
    excerpt:
      "Kandang yang bersih dan memiliki sirkulasi udara baik menjadi salah satu fondasi pengelolaan peternakan unggas.",
    date: "2025-02-20",
    readTime: "3 menit",
    image: "https://images.pexels.com/photos/27083552/pexels-photo-27083552.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200",
    alt: "Kawanan ayam di dalam kandang peternakan modern",
    body: [
      "Kebersihan kandang berpengaruh langsung terhadap kenyamanan ternak. Pembersihan rutin, pengaturan ventilasi, dan pengelolaan litter adalah beberapa kebiasaan yang umum diterapkan.",
      "Perlengkapan kebersihan dan sanitasi menjadi bagian dari kebutuhan operasional kandang yang perlu direncanakan sejak awal.",
      "Artikel ini merupakan konten demo yang dapat diganti dengan materi edukasi resmi Mico Farm.",
    ],
  },
  {
    slug: "tanda-umum-ternak-sehat",
    category: "Kesehatan Ternak",
    title: "Mengamati Tanda-tanda Umum Ternak yang Sehat",
    excerpt:
      "Pengamatan harian membantu peternak mengenali perubahan kondisi ternak lebih awal.",
    date: "2025-03-08",
    readTime: "4 menit",
    image: "https://images.pexels.com/photos/38896948/pexels-photo-38896948.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200",
    alt: "Peternak membawa jerami dengan kambing di latar belakang",
    body: [
      "Peternak yang terbiasa mengamati ternaknya setiap hari umumnya lebih cepat mengenali perubahan perilaku, nafsu makan, atau kondisi fisik.",
      "Beberapa indikator umum yang sering diperhatikan antara lain nafsu makan, aktivitas, kondisi bulu atau kulit, dan kebiasaan minum.",
      "Apabila ditemukan perubahan yang mengkhawatirkan, langkah terbaik adalah berkonsultasi dengan dokter hewan. Informasi dalam artikel ini bersifat umum dan bukan pengganti konsultasi profesional.",
    ],
  },
  {
    slug: "peluang-agribisnis-peternakan-indonesia",
    category: "Agribisnis Indonesia",
    title: "Melihat Peluang Agribisnis Peternakan di Indonesia",
    excerpt:
      "Sektor peternakan Indonesia terus bergerak seiring kebutuhan pangan dan pertumbuhan pelaku usaha di berbagai daerah.",
    date: "2025-03-25",
    readTime: "5 menit",
    image: "https://images.pexels.com/photos/15994341/pexels-photo-15994341.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200",
    alt: "Sawah berundak hijau dikelilingi pepohonan kelapa",
    body: [
      "Peternakan merupakan bagian penting dari sektor agribisnis Indonesia, melibatkan peternak individu, usaha skala kecil, hingga perusahaan besar.",
      "Kolaborasi antara penyedia kebutuhan peternakan, peternak, dan distributor membuka peluang untuk tumbuh bersama.",
      "Artikel ini merupakan konten demo tanpa data statistik resmi. Silakan ganti dengan analisis dan referensi yang terverifikasi.",
    ],
  },
];

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );
