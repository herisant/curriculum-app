import {
  Curriculum,
  SlideDeck,
  Worksheet,
  PracticalTemplate,
  PlatformUpdate,
  MemberAccountAudit,
} from '../types';

export const initialCurriculums: Curriculum[] = [
  {
    id: 'curr-sm-creator',
    title: 'Akselerator Social Media & Content Creator Mastery 2026',
    description:
      'Program kurikulum komprehensif berjenjang dari dasar riset audiens, produksi konten berbasis data, psikologi hook, hingga konversi penjualan dan monetisasi.',
    category: 'Digital Marketing & Content',
    targetAudience: 'Pemilik Bisnis UMKM, Social Media Specialist, Content Creator, dan Freelancer',
    duration: '8 Minggu (32 Sesi Belajar & Praktik)',
    version: 'v2.4',
    lastUpdated: '12 Nov 2026',
    tags: ['Instagram', 'TikTok', 'Copywriting', 'Shorts', 'Funneling'],
    learningOutcomes: [
      'Memahami algoritma distribusi konten organik terbaru 2026',
      'Mampu memproduksi konten short-form dengan retensi penonton di atas 60%',
      'Menguasai struktur funneling dari penonton acak menjadi pembeli setia',
      'Mampu melakukan audit akun mandiri dan membaca dashboard analytics',
    ],
    prerequisites: ['Smartphone dengan kamera layak', 'Akun Instagram dan TikTok aktif'],
    levels: [
      {
        level: 'Pemula',
        objective: 'Membangun pondasi branding, riset audiens target, dan optimasi profil akun.',
        color: 'from-blue-600 to-cyan-500',
        modules: [
          {
            id: 'mod-101',
            curriculumId: 'curr-sm-creator',
            level: 'Pemula',
            title: 'Arsitektur Bio & Conversion Funnel Link-in-Bio',
            summary:
              'Merombak total bio profil, foto profil, nama pengguna SEO-friendly, dan link penampung leads agar pengunjung langsung paham value proposition dalam 3 detik.',
            estimatedHours: 4,
            topics: [
              'Psikologi 3 Detik Pertama Profil Akun',
              'Formula Formula Headline 3 Baris',
              'SEO Searchability pada Username & Name Field',
              'Setup Linktree / Koji / Lynk.id dengan CTA Tunggal',
            ],
            practicalOutput: 'Bio akun yang telah dirombak dengan headline formula dan link bio terukur.',
            keyCompetency: 'Brand Profile Optimization & Search Discovery',
            status: 'published',
            lastReviewedDate: '2026-11-01',
            version: '2.1',
            slidesCount: 7,
            hasWorksheet: true,
            hasGuide: true,
          },
          {
            id: 'mod-102',
            curriculumId: 'curr-sm-creator',
            level: 'Pemula',
            title: 'Riset Persona Audiens & 4 Pilar Konten Relevan',
            summary:
              'Menentukan target market spesifik, mengidentifikasi rasa sakit (pain points) audiens, dan membagi konten ke dalam 4 pilar inti: Edukasi, Inspirasi, Relatable, dan Konversi.',
            estimatedHours: 6,
            topics: [
              'Membedah Pain Points & Desires Target Market',
              'Framework 4 Pilar Konten (Edukasi, Hiburan, Relatable, Promo)',
              'Teknik Mindmapping 50 Ide Konten dalam 1 Jam',
              'Membuat Content Calendar Mingguan yang Konsisten',
            ],
            practicalOutput: 'Dokumen Matriks 4 Pilar Konten dan Kalender Editorial 30 Hari.',
            keyCompetency: 'Audience Research & Content Planning',
            status: 'published',
            lastReviewedDate: '2026-10-25',
            version: '2.0',
            slidesCount: 8,
            hasWorksheet: true,
            hasGuide: true,
          },
          {
            id: 'mod-103',
            curriculumId: 'curr-sm-creator',
            level: 'Pemula',
            title: 'Dasar Produksi Video Smartphone & Pencahayaan',
            summary:
              'Teknik dasar merekam video jernih hanya bermodal HP, setup pencahayaan alami/ring light, framing rule of thirds, dan audio tanpa noise.',
            estimatedHours: 5,
            topics: [
              'Setting Kamera HP 4K vs 1080p 60fps',
              '3-Point Lighting Sederhana di Kamar/Studio Rumahan',
              'Mikrofon Nirkabel vs Clip-on untuk Audio Renyah',
              'Basic Editing CapCut: Cut to Beat, Zoom In/Out, & Sound FX',
            ],
            practicalOutput: '1 Video perkenalan vertikal 30 detik dengan audio dan visual jernih.',
            keyCompetency: 'Mobile Video Capture & Basic Editing',
            status: 'published',
            lastReviewedDate: '2026-10-18',
            version: '1.9',
            slidesCount: 6,
            hasWorksheet: true,
            hasGuide: true,
          },
        ],
      },
      {
        level: 'Menengah',
        objective: 'Memperdalam retensi video, psikologi hook, copywriting penawaran, dan engagement hacking.',
        color: 'from-indigo-600 to-purple-600',
        modules: [
          {
            id: 'mod-201',
            curriculumId: 'curr-sm-creator',
            level: 'Menengah',
            title: 'Formula Hook 3 Detik & Retensi Reels/TikTok',
            summary:
              'Strategi menahan jari audiens agar tidak swipe away. Menghindari dead-intro, merancang visual curiosity gap, dan menaikkan persentase re-watch.',
            estimatedHours: 8,
            topics: [
              '7 Formula Hook Terbukti (Negatif Hook, Pertanyaan Kontroversial, Data Mengejutkan)',
              'Visual Pattern Interrupt & Text Overlay yang Menarik Mata',
              'Struktur Storytelling: Hook -> Agitasi -> Solusi -> CTA',
              'Analisis Retention Graph TikTok & Instagram Reels Studio',
            ],
            practicalOutput: 'Script 5 video pendek dengan 3 variasi hook uji coba.',
            keyCompetency: 'Viral Hook Crafting & Viewer Retention',
            status: 'needs_update',
            lastReviewedDate: '2026-09-15',
            version: '2.3',
            slidesCount: 8,
            hasWorksheet: true,
            hasGuide: true,
          },
          {
            id: 'mod-202',
            curriculumId: 'curr-sm-creator',
            level: 'Menengah',
            title: 'Algoritma Shares & Saves 2026 (Value Stacking Carousel)',
            summary:
              'Memanfaatkan pergeseran algoritma yang kini lebih memprioritaskan Direct Message Shares dan Saves ketimbang likes untuk melipatgandakan jangkauan akun.',
            estimatedHours: 6,
            topics: [
              'Mengapa DM Shares adalah Metrik #1 di Algoritma 2026',
              'Merancang Carousel Edukasi Infografik yang "Wajib Disimpan"',
              'Struktur Slide Penutup Carousel yang Mengundang Diskusi',
              'Hashtag Strategy yang Tepat di Era Semantic Search SEO',
            ],
            practicalOutput: '1 Konten Carousel 7-Slide yang siap dipublikasikan.',
            keyCompetency: 'Engagement Engineering & Carousel Stacking',
            status: 'needs_update',
            lastReviewedDate: '2026-08-20',
            version: '2.0',
            slidesCount: 7,
            hasWorksheet: true,
            hasGuide: true,
          },
          {
            id: 'mod-203',
            curriculumId: 'curr-sm-creator',
            level: 'Menengah',
            title: 'Membangun Komunitas & Interaksi Story yang Hidup',
            summary:
              'Membuat audiens pasif menjadi fans setia dengan fitur interaktif Instagram Stories, polling, stiker tanya jawab, dan teknik broadcast channel.',
            estimatedHours: 5,
            topics: [
              'Framework Daily Story 5 Fase (Morning Routine - Behind The Scene - Value - Interaksi - Penawaran)',
              'Stiker Polling & Slider untuk Menaikkan Algoritma Story Views',
              'Memanfaatkan Fitur Saluran Siaran (Broadcast Channel) untuk Nurturing',
              'Etika Balas DM & Otomasi Balasan Ramah (ManyChat / Direct)',
            ],
            practicalOutput: 'Rancangan alur cerita 1 minggu Instagram Story dengan 3 tipe stiker interaksi.',
            keyCompetency: 'Community Nurturing & Story Retention',
            status: 'published',
            lastReviewedDate: '2026-10-30',
            version: '1.8',
            slidesCount: 6,
            hasWorksheet: true,
            hasGuide: true,
          },
        ],
      },
      {
        level: 'Lanjutan',
        objective: 'Monetisasi akun, funneling penjualan ke WhatsApp/Website, paid ads booster, dan kolaborasi brand.',
        color: 'from-amber-600 to-rose-600',
        modules: [
          {
            id: 'mod-301',
            curriculumId: 'curr-sm-creator',
            level: 'Lanjutan',
            title: 'Funnel Konversi Konten ke WhatsApp & Checkout',
            summary:
              'Mengubah followers dan views menjadi closing transaksi nyata. Menyusun lead magnet menarik, script fast-closing WhatsApp, dan penawaran waktu terbatas.',
            estimatedHours: 8,
            topics: [
              'Lead Magnet Gratis yang Bernilai Tinggi (Ebook/Template/Kupon)',
              'Menyusun Kata Pemicu (Keyword Trigger) DM untuk Kirim Link',
              'Script CS WhatsApp 3 Langkah (Sapa -> Kebutuhan -> Solusi)',
              'Handling Objection: Mengatasi Calon Pembeli "Tanya Suami Dulu"',
            ],
            practicalOutput: 'SOP Sales Script WhatsApp Bisnis dan Landing Page Sederhana.',
            keyCompetency: 'High-Converting Sales Funnels & Lead Generation',
            status: 'published',
            lastReviewedDate: '2026-10-15',
            version: '2.2',
            slidesCount: 8,
            hasWorksheet: true,
            hasGuide: true,
          },
          {
            id: 'mod-302',
            curriculumId: 'curr-sm-creator',
            level: 'Lanjutan',
            title: 'Meta Ads & TikTok Spark Ads untuk Booster Organik',
            summary:
              'Menggunakan iklan berbayar dengan budget hemat untuk mempercepat konten organik terbaik (winning content) menjangkau jutaan calon pelanggan potensial.',
            estimatedHours: 10,
            topics: [
              'Memilih Konten Organik Terbaik untuk Dijadikan Iklan',
              'Pengaturan Target Advantage+ Audience di Ads Manager',
              'Menghitung ROAS (Return on Ad Spend) & Biaya per Pesan WA',
              'A/B Testing Thumbnail, Hook, dan Headline Iklan',
            ],
            practicalOutput: 'Setup 1 Campaign Booster iklan dengan anggaran uji coba Rp 25.000/hari.',
            keyCompetency: 'Paid Traffic Amplification & ROAS Optimization',
            status: 'published',
            lastReviewedDate: '2026-10-05',
            version: '2.1',
            slidesCount: 9,
            hasWorksheet: true,
            hasGuide: true,
          },
          {
            id: 'mod-303',
            curriculumId: 'curr-sm-creator',
            level: 'Lanjutan',
            title: 'Audit Akun Komprehensif & Skalabilitas Tim Konten',
            summary:
              'Metodologi review mendalam untuk mendiagnosis penurunan reach, benchmarking kompetitor, dan membangun sistem pendelegasian tim konten.',
            estimatedHours: 6,
            topics: [
              'Framework Audit Akun 5 Pilar (Bio, Visual, Hook, Komunitas, CTA)',
              'Membaca Data Insights: Drop-off Rate, Profile Visits, Share Ratio',
              'Penyusunan Rate Card & Portofolio Endorsement / Jasa',
              'SOP Perekrutan dan Brief untuk Video Editor / Desainer Grafis',
            ],
            practicalOutput: 'Laporan Audit Akun Lengkap dan SOP Briefing Tim Kreatif.',
            keyCompetency: 'Account Diagnostics & Creative Team Management',
            status: 'published',
            lastReviewedDate: '2026-11-05',
            version: '2.4',
            slidesCount: 8,
            hasWorksheet: true,
            hasGuide: true,
          },
        ],
      },
    ],
  },
  {
    id: 'curr-tt-shop',
    title: 'Mastery TikTok Shop & Live Streaming Selling 2026',
    description:
      'Kurikulum spesifik percepatan penjualan produk fisik melalui TikTok Shop, program Affiliate, keranjang kuning, dan eksekusi Live Shopping berkonversi tinggi.',
    category: 'E-Commerce & Live Selling',
    targetAudience: 'Seller TikTok Shop, Brand Owner, Streamer Host, dan Affiliate Creator',
    duration: '4 Minggu (16 Pertemuan Intensif)',
    version: 'v1.8',
    lastUpdated: '10 Nov 2026',
    tags: ['TikTok Shop', 'Live Streaming', 'Affiliate', 'Produk Fisik', 'GMV'],
    learningOutcomes: [
      'Mampu membangun alur siaran Live Shopping dengan durasi retensi tinggi',
      'Menguasai strategi rekrutmen affiliate kreator dengan komisi kompetitif',
      'Memahami kepatuhan kebijakan terbaru TikTok Shop agar bebas pelanggaran',
    ],
    prerequisites: ['Toko TikTok Shop aktif atau akun Affiliate terverifikasi'],
    levels: [
      {
        level: 'Pemula',
        objective: 'Setup toko, listing produk SEO friendly, dan aturan dasar keranjang kuning.',
        color: 'from-emerald-600 to-teal-500',
        modules: [
          {
            id: 'mod-tt-1',
            curriculumId: 'curr-tt-shop',
            level: 'Pemula',
            title: 'Katalog Produk & Judul SEO TikTok Shop',
            summary: 'Riset kata kunci pencarian belanja TikTok dan optimasi foto produk utama.',
            estimatedHours: 4,
            topics: ['Keyword Search Belanja', 'Foto Produk 1:1 Resolusi Tinggi', 'Penataan Varian'],
            practicalOutput: '5 Listing produk teroptimasi lengkap dengan deskripsi manfaat.',
            keyCompetency: 'Product Listing SEO',
            status: 'published',
            lastReviewedDate: '2026-10-20',
            version: '1.2',
            slidesCount: 6,
            hasWorksheet: true,
            hasGuide: true,
          },
        ],
      },
      {
        level: 'Menengah',
        objective: 'Strategi video short affiliate berkonversi dan teknik live streaming 2 jam.',
        color: 'from-indigo-600 to-cyan-600',
        modules: [
          {
            id: 'mod-tt-2',
            curriculumId: 'curr-tt-shop',
            level: 'Menengah',
            title: 'SOP Live Streaming 120 Menit Beromzet Puluhan Juta',
            summary: 'Struktur opening, flash sale pin keranjang, storytelling demo produk, dan closing.',
            estimatedHours: 8,
            topics: ['Script Opening Penarik Penonton', 'Penyematan Keranjang Pin', 'Aturan Flash Sale'],
            practicalOutput: 'Rancangan rundown Live 2 Jam dan papan promosi fisik.',
            keyCompetency: 'Live Selling Execution',
            status: 'published',
            lastReviewedDate: '2026-11-02',
            version: '1.5',
            slidesCount: 7,
            hasWorksheet: true,
            hasGuide: true,
          },
        ],
      },
      {
        level: 'Lanjutan',
        objective: 'Scaling GMV dengan jaring affiliate massal dan iklan GMV Max.',
        color: 'from-purple-600 to-pink-600',
        modules: [
          {
            id: 'mod-tt-3',
            curriculumId: 'curr-tt-shop',
            level: 'Lanjutan',
            title: 'Rekrutmen Ratusan Affiliate & Kampanye GMV Max',
            summary: 'SOP pengiriman sample gratis ke kreator potensial dan iklan Shop Ads.',
            estimatedHours: 8,
            topics: ['Targeting Affiliate Tertarget', 'Filter Konten Sampel', 'Setting Iklan GMV Max'],
            practicalOutput: 'Template broadcast undangan affiliate dan setting kampanye iklan.',
            keyCompetency: 'Affiliate Scaling & Shop Ads',
            status: 'needs_update',
            lastReviewedDate: '2026-09-01',
            version: '1.4',
            slidesCount: 8,
            hasWorksheet: true,
            hasGuide: true,
          },
        ],
      },
    ],
  },
];

export const initialSlideDecks: SlideDeck[] = [
  {
    id: 'deck-mod-201',
    moduleId: 'mod-201',
    moduleTitle: 'Formula Hook 3 Detik & Retensi Reels/TikTok',
    deckTitle: 'Masterclass: Menaklukkan 3 Detik Pertama Penonton Digital',
    lastModified: '2026-11-10',
    theme: 'indigo',
    slides: [
      {
        slideNumber: 1,
        title: 'Menaklukkan 3 Detik Pertama',
        subtitle: 'Mengapa Jari Penonton Menentukan Kesuksesan Konten Anda',
        bullets: [
          'Rata-rata rentang perhatian pengguna modern kini turun menjadi 2.8 detik',
          'Algoritma menilai tingkat retensi video dalam 2 detik pertama sebelum mendistribusikan lebih luas',
          'Tujuan utama: Menghilangkan kebiasaan scrolling instan penonton',
        ],
        visualConcept: 'Grafik kontras penurunan view count pada video tanpa hook vs video dengan hook kuat.',
        speakerNotes:
          'Buka sesi dengan mendemonstrasikan perilaku kita sendiri saat membuka TikTok/Instagram. Tekankan bahwa secanggih apapun isi materi kita, jika 3 detik pertama gagal, konten kita dianggap tidak ada oleh algoritma.',
        actionTakeaway: 'Audit 3 video terakhir Anda: apakah 3 detik pertama langsung ke poin utama?',
      },
      {
        slideNumber: 2,
        title: '3 Kesalahan Fatal pada Opening Video',
        subtitle: 'Hal-hal yang Bikin Penonton Langsung Swipe Away',
        bullets: [
          'Opening Basa-basi: "Halo guys, balik lagi sama gue..." (Membuang 4 detik emas)',
          'Title Bisu: Video tanpa teks pembuka berukuran besar dan jelas di layar',
          'Visual Statis: Wajah diam di depan kamera tanpa pergerakan atau props penarik perhatian',
        ],
        visualConcept: 'Tiga ikon peringatan merah dengan contoh klip yang sering diskip audiens.',
        speakerNotes:
          'Jelaskan konsep "Dead Time". Setiap detik hening di awal adalah pembunuh retensi nomor satu. Tampilkan contoh before-after.',
        actionTakeaway: 'Hapus salam pembuka dari seluruh draf video yang akan direkam minggu ini.',
      },
      {
        slideNumber: 3,
        title: 'Formula Hook #1: Negasi & Peringatan',
        subtitle: 'Memanfaatkan Rasa Ingin Menghindari Kerugian (Loss Aversion)',
        bullets: [
          'Formula: "Jangan pernah lakukan [X] kalau kamu masih mau [Y]!"',
          'Contoh: "Jangan pernah upload Reels di jam 7 malam kalau belum tahu aturan baru ini!"',
          'Mengapa ampuh: Otak manusia 2x lebih reaktif terhadap ancaman kerugian dibanding iming-iming keuntungan',
        ],
        visualConcept: 'Tanda seru kuning neon dengan perbandingan psikologi rasa takut tertinggal (FOMO).',
        speakerNotes:
          'Ingatkan peserta untuk tidak overpromising atau clickbait palsu. Informasi yang diberikan di dalam video harus benar-benar menjawab ancaman tersebut.',
        actionTakeaway: 'Tulis 1 headline peringatan untuk niche bisnis Anda masing-masing.',
      },
      {
        slideNumber: 4,
        title: 'Formula Hook #2: Hasil Nyata Kontradiktif',
        subtitle: 'Mematahkan Mitos Umum dengan Fakta Mengejutkan',
        bullets: [
          'Formula: "Bagaimana cara saya dapat [Hasil Luar Biasa] tanpa harus [Kesulitan Umum]?"',
          'Contoh: "Cara kami dapat 1.200 leads WA tanpa keluar modal iklan sepeser pun"',
          'Elemen kunci: Spesifik angka, realistis, dan mematahkan asumsi rumit audiens',
        ],
        visualConcept: 'Tangkapan layar dashboard metrik nyata yang disorot dengan highlight hijau.',
        speakerNotes:
          'Audiens menyukai angka ganjil dan spesifik (misal: 14 hari, Rp 3.250.000). Jangan gunakan angka bulat yang terkesan mengada-ada.',
        actionTakeaway: 'Identifikasi 1 studi kasus atau pengalaman nyata yang pernah Anda capai.',
      },
      {
        slideNumber: 5,
        title: 'Visual Pattern Interrupt (Pemicu Visual)',
        subtitle: 'Menghentikan Mata Sebelum Otak Mengambil Keputusan',
        bullets: [
          'Pergerakan kamera cepat (Zoom in mendadak dalam 0.5 detik)',
          'Sound Effect yang menghentak (Whoosh, Pop, Bell ding)',
          'Props visual unik (Memegang barang tidak lazim di depan lensa)',
          'Text overlay kontras dengan latar belakang kontras hitam-kuning atau putih-merah',
        ],
        visualConcept: 'Timeline timeline CapCut dengan cut berdurasi 1.2 detik dan sound effect marker.',
        speakerNotes:
          'Ingat bahwa 60% pengguna menonton video pertama kali tanpa suara di tempat umum. Karenanya visual text hook wajib terbaca sangat jelas.',
        actionTakeaway: 'Tambahkan efek Zoom Cut pada detik 0.8 di setiap video Anda.',
      },
      {
        slideNumber: 6,
        title: 'Struktur Storytelling 4 Babak',
        subtitle: 'Menjaga Penonton Tetap Nonton Hingga Akhir',
        bullets: [
          '00 - 03 Detik: HOOK (Mengaitkan perhatian)',
          '03 - 15 Detik: AGITASI (Menjelaskan mengapa masalah ini mendesak)',
          '15 - 45 Detik: SOLUSI PRAKTIS (Langkah 1, 2, 3 tanpa berbelit-belit)',
          '45 - 60 Detik: CALL TO ACTION (Komentar kata kunci untuk materi lengkap)',
        ],
        visualConcept: 'Diagram alur piramida terbalik dengan persentase retensi penonton di tiap babak.',
        speakerNotes:
          'Jangan letakkan CTA di tengah yang memutus aliran cerita. Berikan value 80% sebelum meminta audiens melakukan tindakan apapun.',
        actionTakeaway: 'Gunakan template skrip 4 babak pada lembar kerja worksheet.',
      },
      {
        slideNumber: 7,
        title: 'Rangkuman & Tugas Praktik Hari Ini',
        subtitle: 'Saatnya Langsung Praktek di Lapangan',
        bullets: [
          'Pilih 1 produk atau jasa yang ingin Anda promosikan hari ini',
          'Tulis 3 variasi Hook berbeda (Negasi, Hasil Kontradiktif, Penasaran)',
          'Rekam video 45 detik mengikuti pola 4 babak',
          'Kumpulkan link draft ke platform untuk mendapatkan review dan feedback!',
        ],
        visualConcept: 'Piala emas dengan checklist 4 tugas praktis siap centang.',
        speakerNotes:
          'Beri semangat kepada peserta. Teori tanpa praktek hanya akan jadi tumpukan catatan. Evaluasi akan dibahas pada sesi review akun.',
        actionTakeaway: 'Submit tugas di tab Worksheet sebelum jam 21.00 WIB.',
      },
    ],
  },
  {
    id: 'deck-mod-101',
    moduleId: 'mod-101',
    moduleTitle: 'Arsitektur Bio & Conversion Funnel Link-in-Bio',
    deckTitle: 'Bedah Tuntas Bio Akun: Etalase Utama Penjualan Anda',
    lastModified: '2026-11-08',
    theme: 'emerald',
    slides: [
      {
        slideNumber: 1,
        title: 'Anatomi Bio Berdaya Konversi Tinggi',
        subtitle: 'Mengubah Pengunjung Acak Menjadi Pelanggan Tetap',
        bullets: [
          'Profil media sosial adalah etalase digital toko Anda',
          '70% calon pembeli memeriksa bio sebelum menekan tombol Follow atau Order',
          'Formula 3 Elemen Wajib: Siapa Anda, Apa Manfaatnya, dan Kemana Harus Klik',
        ],
        visualConcept: 'Mockup layar profil smartphone dengan panah penunjuk di 4 bagian utama.',
        speakerNotes: 'Tanyakan kepada audiens: jika orang awam membaca bio Anda, apakah mereka paham bisnis Anda dalam 5 detik?',
        actionTakeaway: 'Baca bio Anda sekarang: apakah ada kalimat yang ambigu?',
      },
      {
        slideNumber: 2,
        title: 'Formula Headline 3 Baris',
        subtitle: 'Ringkas, Bernas, dan Menghilangkan Kebingungan',
        bullets: [
          'Baris 1: Target Audiens & Solusi ("Membantu pemilik UMKM raup omzet...")',
          'Baris 2: Kredibilitas / Social Proof ("Dipercaya 3.500+ alumni & rating 4.9")',
          'Baris 3: Single CTA Jelas ("👇 Konsultasi Gratis via WhatsApp")',
        ],
        visualConcept: 'Contoh perbandingan Bio berantakan vs Bio rapi dengan layout baris.',
        speakerNotes: 'Hindari memasukkan hobi yang tidak relevan jika akun bertujuan untuk komersial atau personal brand profesional.',
        actionTakeaway: 'Terapkan rumus 3 baris di akun utama Anda.',
      },
    ],
  },
];

export const initialWorksheets: Worksheet[] = [
  {
    id: 'ws-mod-201',
    moduleId: 'mod-201',
    moduleTitle: 'Formula Hook 3 Detik & Retensi Reels/TikTok',
    title: 'Lembar Kerja Praktik: Perumusan Hook & Script Video 45 Detik',
    objective:
      'Peserta mampu merancang 3 variasi hook penahan scroll dan menyusun naskah video lengkap dengan Call to Action yang terukur.',
    estimatedTimeMinutes: 45,
    lastModified: '2026-11-10',
    sections: [
      {
        sectionName: 'Bagian 1: Identifikasi Topik & Pain Point Audiens',
        instructions: 'Tentukan masalah paling menjengkelkan yang dialami oleh calon pelanggan Anda saat ini.',
        fields: [
          {
            id: 'niche_target',
            label: 'Niche Bisnis & Target Audiens Utama',
            placeholder: 'Contoh: Pemilik brand busana muslim pemula yang ingin jualan di TikTok Shop',
            hint: 'Buat sejelas mungkin, jangan terlalu luas seperti "Semua orang"',
            type: 'text',
          },
          {
            id: 'biggest_pain',
            label: 'Masalah / Ketakutan Terbesar Audiens Terkait Topik Ini',
            placeholder: 'Contoh: Sudah sering upload video tapi views mentok di 200 dan tidak ada pesanan masuk',
            hint: 'Pilih masalah nyata yang sering mereka keluhkan di kolom komentar atau DM',
            type: 'textarea',
          },
        ],
      },
      {
        sectionName: 'Bagian 2: 3 Eksperimen Variasi Hook Pembuka',
        instructions: 'Tuliskan 3 alternatif kalimat pertama (hook) yang akan diucapkan di 3 detik awal.',
        fields: [
          {
            id: 'hook_negasi',
            label: 'Variasi A: Hook Peringatan / Negatif (Loss Aversion)',
            placeholder: 'Contoh: "Jangan upload video di TikTok kalau kamu belum matikan settingan privasi ini..."',
            hint: 'Gunakan kata "Jangan", "Hati-hati", "Stop", "Kesalahan terbesar"',
            type: 'text',
          },
          {
            id: 'hook_kontradiktif',
            label: 'Variasi B: Hook Hasil Nyata / Kontradiksi',
            placeholder: 'Contoh: "Rahasia toko baju ini raup 50 juta dari 1 video sederhana tanpa endorse artis"',
            hint: 'Tampilkan bukti atau angka spesifik',
            type: 'text',
          },
          {
            id: 'hook_pertanyaan',
            label: 'Variasi C: Hook Pertanyaan Relevan & Rasa Penasaran',
            placeholder: 'Contoh: "Pernah nggak ngerasa capek ngedit berjam-jam tapi penontonnya cuma teman sendiri?"',
            hint: 'Buat audiens spontan mengangguk di detik pertama',
            type: 'text',
          },
        ],
      },
      {
        sectionName: 'Bagian 3: Naskah Lengkap & CTA Penutup',
        instructions: 'Lengkapi struktur video 45 detik Anda.',
        fields: [
          {
            id: 'body_solution',
            label: 'Isi Solusi Singkat (Maksimal 3 Poin Kunci)',
            placeholder: 'Poin 1: ... \nPoin 2: ... \nPoin 3: ...',
            hint: 'Jangan bertele-tele, sampaikan actionable insight',
            type: 'textarea',
          },
          {
            id: 'cta_action',
            label: 'Call to Action (CTA) Penutup',
            placeholder: 'Contoh: "Ketik kata \'MAU\' di komentar untuk dapat PDF panduan lengkapnya gratis!"',
            hint: 'Minta 1 aksi saja, jangan minta like + share + komen + follow + klik link sekaligus',
            type: 'text',
          },
        ],
      },
    ],
    practicalSteps: [
      {
        stepNumber: 1,
        title: 'Pilih Hook Terbaik',
        instruction: 'Pilih salah satu dari 3 variasi hook di atas yang paling berenergi saat diucapkan langsung.',
        proTip: 'Ucapkan di depan cermin atau rekam voice note terlebih dahulu untuk menguji intonasi.',
        commonMistake: 'Membaca teks secara kaku seperti membaca teks proklamasi.',
      },
      {
        stepNumber: 2,
        title: 'Setup HP & Pencahayaan',
        instruction: 'Bersihkan lensa kamera HP dengan kain microfiber dan pastikan sumber cahaya ada di depan wajah.',
        proTip: 'Letakkan kamera sejajar mata (eye-level) agar terbangun koneksi emosional.',
        commonMistake: 'Lensa kamera berminyak sehingga video tampak buram dan berembun.',
      },
      {
        stepNumber: 3,
        title: 'Rekam dengan Potongan Cepat (Jump Cut)',
        instruction: 'Rekam per kalimat. Berhenti sejenak, lalu lanjutkan kalimat berikutnya agar tidak ada dead space.',
        proTip: 'Gunakan aplikasi CapCut untuk memotong jeda diam secara otomatis (Remove Silences).',
        commonMistake: 'Merekam 1 take panjang sambil mengingat teks sehingga banyak jeda "eemm..." dan "eehh..."',
      },
    ],
    evaluationRubric: [
      {
        criteria: 'Kekuatan Hook 3 Detik',
        level4: 'Sangat memikat, langsung memunculkan rasa penasaran dalam < 3 detik, didukung visual/props.',
        level2: 'Masih mengandung salam pembuka atau jeda hening lebih dari 2 detik.',
        weight: '35%',
      },
      {
        criteria: 'Kejelasan Solusi & Nilai Edukasi',
        level4: 'Solusi runtut 3 langkah praktis yang mudah dipahami orang awam tanpa istilah membingungkan.',
        level2: 'Terlalu teoritis dan membingungkan langkah eksekusinya.',
        weight: '35%',
      },
      {
        criteria: 'Efektivitas Call To Action (CTA)',
        level4: 'CTA tunggal, jelas, memberikan insentif timbal-balik yang kuat bagi penonton.',
        level2: 'Tidak ada CTA atau meminta terlalu banyak tindakan sekaligus.',
        weight: '30%',
      },
    ],
  },
  {
    id: 'ws-mod-101',
    moduleId: 'mod-101',
    moduleTitle: 'Arsitektur Bio & Conversion Funnel Link-in-Bio',
    title: 'Lembar Kerja Praktik: Makeover Bio Akun & Setting Link Penjualan',
    objective: 'Peserta mampu menata ulang identitas akun, menulis bio standar 3 baris, dan menyiapkan funnel tautan WhatsApp.',
    estimatedTimeMinutes: 30,
    lastModified: '2026-11-08',
    sections: [
      {
        sectionName: 'Audit Profil Saat Ini',
        instructions: 'Salin kondisi profil akun Anda saat ini untuk evaluasi komparasi.',
        fields: [
          {
            id: 'old_username',
            label: 'Username & Name Tag Saat Ini',
            placeholder: '@nama.olshop / Baju Murah',
            hint: 'Perhatikan apakah name tag sudah mengandung kata kunci pencarian SEO',
            type: 'text',
          },
          {
            id: 'old_bio',
            label: 'Bio Akun Saat Ini',
            placeholder: 'Tuliskan teks bio persis seperti yang tampil saat ini di akun Anda',
            hint: 'Sertakan emoji atau tautan yang ada saat ini',
            type: 'textarea',
          },
        ],
      },
      {
        sectionName: 'Desain Bio Baru Berdasarkan Formula',
        instructions: 'Gunakan formula 3 baris teruji untuk memaksimalkan rasio follow dan klik tautan.',
        fields: [
          {
            id: 'new_headline',
            label: 'Baris 1: Siapa Anda & Solusi yang Diberikan',
            placeholder: 'Contoh: Solusi kulit cerah & sehat tanpa rasa perih',
            hint: 'Fokus pada hasil akhir yang diinginkan pembeli',
            type: 'text',
          },
          {
            id: 'new_social_proof',
            label: 'Baris 2: Bukti Sosial / Otoritas',
            placeholder: 'Contoh: Terdaftar BPOM & 50.000+ pcs terjual',
            hint: 'Tampilkan angka atau pencapaian yang menimbulkan rasa aman',
            type: 'text',
          },
          {
            id: 'new_cta_link',
            label: 'Baris 3: Ajakan Bertindak & Penunjuk Tautan',
            placeholder: 'Contoh: 👇 Cek promo ongkir & konsultasi gratis di bawah',
            hint: 'Arahkan telunjuk ke link bio di bawahnya',
            type: 'text',
          },
        ],
      },
    ],
    practicalSteps: [
      {
        stepNumber: 1,
        title: 'Update Name Field dengan Keyword',
        instruction: 'Ubah Name Field di setting profil menjadi [Nama Brand] | [Kata Kunci Utama]',
        proTip: 'Instagram mengindeks kata di Name Field pada tab Search, bukan hanya username.',
        commonMistake: 'Hanya menulis nama panggilan pribadi sehingga tidak pernah ditemukan di pencarian.',
      },
      {
        stepNumber: 2,
        title: 'Pasang Link WhatsApp Direct dengan Template Pesan',
        instruction: 'Gunakan link wa.me dengan teks otomatis seperti: "Halo Admin, saya mau tanya promo di bio..."',
        proTip: 'Pesan otomatis membuat calon pembeli tidak malas memulai obrolan.',
        commonMistake: 'Memberikan link nomor HP polos tanpa pesan pembuka.',
      },
    ],
    evaluationRubric: [
      {
        criteria: 'Optimasi SEO Nama Akun',
        level4: 'Mengandung kata kunci spesifik yang dicari calon pembeli di kotanya/niche.',
        level2: 'Hanya berisi nama acak atau singkatan tanpa kata kunci.',
        weight: '30%',
      },
      {
        criteria: 'Kejelasan Value Proposition Bio',
        level4: 'Sangat jelas membantu siapa dan apa manfaat produk dalam 5 detik membaca.',
        level2: 'Membingungkan atau hanya berisi quotes motivasi tanpa kejelasan bisnis.',
        weight: '40%',
      },
      {
        criteria: 'Kesiapan Link Konversi',
        level4: 'Tautan aktif, cepat terbuka, dan langsung menuju chat WhatsApp dengan pesan ramah.',
        level2: 'Link rusak atau menampilkan terlalu banyak tombol yang membingungkan pengunjung.',
        weight: '30%',
      },
    ],
  },
];

export const initialTemplates: PracticalTemplate[] = [
  {
    id: 'tpl-1',
    title: 'SOP Live Streaming TikTok & Shopee High-Converting',
    category: 'SOP Live',
    description: 'Panduan operasional baku untuk host live streaming durasi 2 jam dengan pembagian waktu yang disiplin.',
    tags: ['Live', 'Host', 'Penjualan', 'Konversi'],
    format: 'Markdown',
    updatedAt: '2026-11-05',
    content: `# SOP LIVE STREAMING 120 MENIT
## Fase 1: 00 - 15 Menit (Warm-up & Pemicu Algoritma)
- Sapa penonton pertama dengan menyebutkan nama akun mereka.
- Minta penonton tap-tap layar hingga mencapai target 5.000 likes pertama.
- Umumkan voucher khusus penonton tercepat yang akan dirilis di menit ke-15.

## Fase 2: 15 - 60 Menit (Demo Produk Utama & Flash Sale)
- Angkat produk hero nomor 1. Jelaskan rasa/bahan/manfaat nyata secara visual.
- Pasang timer countdown 5 menit di layar fisik.
- Sematkan pin keranjang produk dan pandu cara checkout langkah demi langkah.
- Ucapkan terima kasih langsung setiap kali notifikasi pesanan masuk berbunyi.

## Fase 3: 60 - 90 Menit (Interaksi Q&A & Cross-selling Produk Kedua)
- Jawab pertanyaan di kolom komentar dengan memperagakan langsung di kamera.
- Tawarkan paket bundling (Beli 2 gratis 1) untuk menaikkan nilai rata-rata keranjang (AOV).

## Fase 4: 90 - 120 Menit (Last Call & FOMO Closing)
- Ingatkan bahwa kuota voucher subsidi platform tersisa sedikit.
- Hitung mundur penutupan sesi live.
- Ingatkan jadwal live berikutnya agar penonton menekan tombol ikuti.`,
  },
  {
    id: 'tpl-2',
    title: 'Template Script Konten Hook-Story-Offer (HSO) 45 Detik',
    category: 'Copywriting',
    description: 'Format naskah video pendek yang terbukti menjaga retensi dan mengundang interaksi komentar.',
    tags: ['Script', 'Shorts', 'Reels', 'TikTok'],
    format: 'Markdown',
    updatedAt: '2026-11-02',
    content: `[00:00 - 00:03] HOOK VISUAL & VERBAL:
Visual: [Tindakan tak biasa / teks headline besar di layar]
Audio: "Kalau kamu masih ngalamin [Masalah Spesifik], tolong stop lakukan [Kesalahan Umum] ini sekarang!"

[00:03 - 00:15] AGITASI / STORY:
"Banyak orang ngira solusinya adalah [Solusi Salah]. Padahal yang bikin kamu gagal terus adalah [Penyebab Akar Masalah]."

[00:15 - 00:35] SOLUSI SEDERHANA:
"Coba ganti dengan 2 langkah simpel ini:
1. [Langkah 1 yang bisa dipraktekkan hari ini juga]
2. [Langkah 2 yang hemat waktu atau biaya]"

[00:35 - 00:45] CALL TO ACTION (CTA):
"Mau template lengkapnya biar nggak perlu mikir dari nol? Komen kata 'KIRIM' di bawah, nanti link download-nya langsung aku kirim ke DM kamu!"`,
  },
  {
    id: 'tpl-3',
    title: 'Checklist Optimasi Bio & Funnel WhatsApp Bisnis',
    category: 'Checklist Bio',
    description: 'Daftar 10 item verifikasi sebelum meluncurkan iklan atau kampanye konten baru.',
    tags: ['Checklist', 'Bio', 'WhatsApp', 'Konversi'],
    format: 'Checklist',
    updatedAt: '2026-10-28',
    content: `[ ] 1. Foto profil beresolusi tinggi, kontras dengan latar belakang, dan wajah/logo tidak terpotong lingkaran.
[ ] 2. Username mudah dieja tanpa simbol ganda seperti ___ atau ...
[ ] 3. Name field mengandung kata kunci pencarian industri (misal: Skincare Jerawat Herbal).
[ ] 4. Baris pertama bio menjelaskan siapa yang Anda layani dan apa transformasinya.
[ ] 5. Baris kedua mencantumkan bukti sosial atau sertifikasi (BPOM / Halal / Testimoni).
[ ] 6. Baris ketiga mengarahkan dengan jelas ke tautan di bawahnya.
[ ] 7. Tautan linktree/bio aktif dan terbuka dalam waktu kurang dari 2 detik.
[ ] 8. Tautan WhatsApp memiliki template pesan pembuka yang ramah.
[ ] 9. Profil WhatsApp Bisnis sudah memiliki katalog dan jam operasional.
[ ] 10. Fitur auto-reply pesan sambutan WhatsApp sudah aktif dan tidak terkesan robotik.`,
  },
];

export const initialPlatformUpdates: PlatformUpdate[] = [
  {
    id: 'upd-ig-2026-11',
    platform: 'Instagram',
    updateTitle: 'Pergeseran Algoritma: DM Shares & Re-watch Menjadi Penentu Reach Utama',
    releaseDate: '05 Nov 2026',
    urgency: 'kritis',
    summary:
      'Pihak Instagram secara resmi mengumumkan pembaruan sistem ranking feed & reels. Metrik Likes kini memiliki bobot terkecil, digantikan oleh persentase penonton yang membagikan video ke DM teman (Send-to-Friend) dan menonton ulang (Re-watch rate).',
    whatChanged: [
      'Bobot Like diturunkan hingga 40% dalam perhitungan viralitas.',
      'Metrik "Send to a Friend via DM" mendapat bobot tertinggi 3.5x lipat.',
      'Durasi tonton penuh (Completion rate) dan Re-watch di atas 100% memicu penyebaran Reels ke Explore secara instan.',
      'Teks caption panjang yang informatif meningkatkan durasi tinggal (dwell time) pengguna di layar video.',
    ],
    impactedModuleIds: ['mod-201', 'mod-202'],
    status: 'pending_review',
    trainerAdvice:
      'Segera revisi materi Modul 201 (Formula Hook) dan Modul 202 (Algoritma Shares). Ganti instruksi "Ajak audiens Like" menjadi "Ajak audiens bagikan video ke teman yang membutuhkan".',
    suggestedRevisions: [
      {
        moduleId: 'mod-201',
        moduleTitle: 'Formula Hook 3 Detik & Retensi Reels/TikTok',
        changeUrgency: 'High',
        reason: 'CTA penutup lama meminta audiens menekan Like, padahal algoritma 2026 mengutamakan Share.',
        diffBefore: 'CTA: "Jangan lupa tekan Like dan Follow akun ini untuk tips berikutnya!"',
        diffAfter: 'CTA: "Share video ini ke teman atau partner bisnis kamu yang sering mengalami masalah serupa!"',
        newTopicsToAdd: ['Psikologi Konten Shareable (Mengapa Orang Mau Kirim ke DM)', 'Optimasi Re-Watch Loops'],
        obsoleteTopicsToRemove: ['Taktik Engagement Like Bombing'],
      },
      {
        moduleId: 'mod-2026',
        moduleTitle: 'Algoritma Shares & Saves 2026 (Value Stacking Carousel)',
        changeUrgency: 'High',
        reason: 'Penyesuaian slide infografis untuk memicu diskusi di kolom chat pribadi.',
        diffBefore: 'Fokus pada menyimpan postingan (Save bookmark).',
        diffAfter: 'Fokus ganda: Simpan untuk referensi pribadi + Kirim ke partner kerja/teman terdekat.',
        newTopicsToAdd: ['Struktur Slide Carousel yang Mengundang Debat Sehat di DM'],
        obsoleteTopicsToRemove: [],
      },
    ],
  },
  {
    id: 'upd-tt-2026-10',
    platform: 'TikTok',
    updateTitle: 'Regulasi Tagging Keranjang Kuning & Standar Durasi Live TikTok Shop 2026',
    releaseDate: '28 Okt 2026',
    urgency: 'sedang',
    summary:
      'TikTok memberlakukan filter otomatis bagi video yang menyematkan keranjang kuning tanpa memperlihatkan fisik produk di 10 detik pertama. Serta standar performa siaran live minimal 90 menit tanpa jeda hening agar mendapatkan boost rekomendasi.',
    whatChanged: [
      'Produk keranjang kuning wajib muncul secara visual dan diulas langsung di dalam video, tidak boleh hanya teks.',
      'Akun affiliate yang video promonya tidak relevan dengan produk yang disematkan akan terkena pembatasan jangkauan 7 hari.',
      'Durasi live di bawah 45 menit tidak lagi mendapatkan insentif kupon subsidi platform.',
    ],
    impactedModuleIds: ['mod-tt-2', 'mod-tt-3'],
    status: 'pending_review',
    trainerAdvice:
      'Perbarui SOP Live Streaming dan panduan praktik kreator affiliate. Wajibkan peserta selalu memegang produk asli saat merekam hook video keranjang kuning.',
    suggestedRevisions: [
      {
        moduleId: 'mod-tt-2',
        moduleTitle: 'SOP Live Streaming 120 Menit Beromzet Puluhan Juta',
        changeUrgency: 'Medium',
        reason: 'Durasi live minimal dan aturan subsidi kupon berubah.',
        diffBefore: 'Target durasi live 60 menit per sesi.',
        diffAfter: 'Target durasi live minimal 90 - 120 menit per sesi untuk membuka kupon subsidi.',
        newTopicsToAdd: ['Menjaga Stamina Host 120 Menit', 'Kepatuhan Penampilan Fisik Produk'],
        obsoleteTopicsToRemove: [],
      },
    ],
  },
  {
    id: 'upd-meta-2026-10',
    platform: 'Meta Ads',
    updateTitle: 'Advantage+ Creative & Audience Menggantikan Targeting Manual Interest',
    releaseDate: '15 Okt 2026',
    urgency: 'info',
    summary:
      'Meta secara bertahap menghapus opsi pemilihan demografi dan minat rinci (detailed interest) manual pada level iklan pemula, dan menggantikannya dengan sistem AI Advantage+ yang membaca konten visual serta teks video iklan.',
    whatChanged: [
      'Kreatif iklan (video & caption) kini berfungsi sebagai "penargetan baru" (Creative is the targeting).',
      'Meta AI secara otomatis mencocokkan video dengan penonton berdasarkan kemiripan konten yang sering mereka tonton.',
    ],
    impactedModuleIds: ['mod-302'],
    status: 'applied',
    trainerAdvice:
      'Fokus pengajaran iklan berbayar beralih dari trik teknis dashboard ke kualitas hook dan variasi materi kreatif iklan.',
    suggestedRevisions: [],
  },
];

export const initialMemberAudits: MemberAccountAudit[] = [
  {
    id: 'audit-1',
    clientName: 'Bambang Santoso (Kopi Kenari Lokal)',
    platform: 'Instagram',
    accountHandle: '@kopikenarilokal',
    avatarUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=80',
    niche: 'Food & Beverage / Coffee Roastery',
    followersCount: '3.420',
    currentBio: 'Kedai Kopi & Roastery di Bandung. Buka jam 10-22. Menerima pesanan biji kopi. DM untuk order.',
    contentFrequency: '2-3x per minggu (Foto cangkir kopi & quotes santai)',
    topComplaintsOrGoal:
      'Views reels selalu mentok di 200-300 penonton. DM sepi pesanan, padahal rasa kopi sangat disukai pelanggan offline. Ingin penjualan biji kopi kiloan ke luar kota meningkat.',
    auditDate: '10 Nov 2026',
    overallScore: 62,
    scoreBreakdown: {
      profileBioOptimization: 55,
      contentHookAndQuality: 58,
      engagementAndCommunity: 65,
      funnelAndConversionCTA: 50,
      consistencyAndBranding: 80,
    },
    executiveSummary:
      'Akun memiliki estetika visual foto yang cukup konsisten dan produk yang otentik. Namun, akun ini mengalami "penyakit etalase pasif": bio tidak memiliki USP yang tajam, video reels tidak memiliki hook penahan scroll di 3 detik pertama, dan instruksi pemesanan "DM untuk order" terlalu merepotkan calon pembeli dibanding link WhatsApp instan.',
    swotAnalysis: {
      strengths: [
        'Kualitas foto cangkir kopi dan interior kedai terlihat estetik dan rapi.',
        'Sudah memiliki basis pelanggan setia di lokasi offline yang memberi ulasan positif.',
        'Branding nama lokal yang kuat dan mudah diingat.',
      ],
      weaknesses: [
        'Bio akun sangat kaku, tidak menjelaskan apa keunikan biji kopi Kenari dibanding kopi lain.',
        'Tidak ada linktree / link wa.me di profil; pelanggan harus mengetik manual.',
        'Video reels hanya berupa panning interior dengan musik santai tanpa narasi atau edukasi yang memicu interaksi.',
      ],
      opportunities: [
        'Tren home-brewer dan pecinta seduh manual di kota-kota besar sedang melonjak.',
        'Membuat konten edukasi cara seduh kopi nikmat di rumah dengan alat sederhana untuk menarik pembeli biji kopi.',
        'Menawarkan bundle promo "Paket Cicip 3 Varian Single Origin" dengan diskon pengiriman.',
      ],
      threats: [
        'Persaingan roastery lokal lain yang sangat agresif menggunakan Reels edukatif dan promosi TikTok.',
        'Penonton mudah lupa jika akun tidak membangun interaksi aktif lewat Instagram Story.',
      ],
    },
    quickWins: [
      'Ganti instruksi "DM untuk order" di bio menjadi tautan langsung https://wa.me dengan pesan otomatis: "Halo Barista Kopi Kenari, saya mau pesan biji kopi fresh..."',
      'Ubah Name Field profil dari "Kopi Kenari" menjadi "Kopi Kenari | Roastery Biji Kopi Fresh Bandung" agar terindeks di pencarian Instagram.',
      'Sematkan (Pin) 3 postingan terbaik di grid atas: 1) Video proses roasting otentik, 2) Menu & daftar harga biji kopi, 3) Testimoni pelanggan luar kota.',
    ],
    thirtyDayActionPlan: [
      {
        week: 'Minggu 1: Perombakan Fondasi & Funnel',
        focus: 'Makeover Bio, pembuatan link WhatsApp satu klik, dan setup sorotan (Highlights) edukasi & katalog.',
        tasks: [
          'Pasang headline bio baru 3 baris dengan garansi "Roasting segar maksimal 48 jam"',
          'Buat 4 cover sorotan: "Menu & Biji", "Cara Seduh", "Ulasan Pembeli", "Lokasi & Jam"',
          'Siapkan template pesan otomatis WhatsApp Bisnis untuk respon cepat.',
        ],
      },
      {
        week: 'Minggu 2: Eksekusi Formula Hook 3 Detik',
        focus: 'Memproduksi 4 video Reels berbasis edukasi home brewing dengan hook rasa penasaran.',
        tasks: [
          'Video 1: "Jangan pernah seduh kopi pakai air mendidih 100°C kalau nggak mau rasanya pahit gosong!"',
          'Video 2: "3 Rekomendasi biji kopi ramah lambung buat kamu yang suka mual ngopi."',
          'Gunakan transisi audio yang menghentak di detik awal.',
        ],
      },
      {
        week: 'Minggu 3: Interaksi Komunitas & Storytelling',
        focus: 'Menaikkan engagement melalui polling interaktif di Instagram Stories setiap pagi.',
        tasks: [
          'Upload story tebak-tebakan aroma kopi setiap jam 09.00 pagi.',
          'Buka kotak pertanyaan (Q&A sticker): "Punya alat seduh apa di rumah? Kami kasih rekomendasi bijinya."',
          'Bagikan cuplikan pesanan yang sedang dipacking ke kurir ekspedisi.',
        ],
      },
      {
        week: 'Minggu 4: Penawaran Terbatas & Evaluasi',
        focus: 'Meluncurkan flash promo khusus followers di akhir bulan untuk menguji konversi WhatsApp.',
        tasks: [
          'Rilis bundle "Weekend Brewing Pack" dengan gratis ongkir se-Jawa Barat.',
          'Hitung jumlah klik link bio dan jumlah chat WhatsApp yang closing.',
          'Review analitik Reels: cek persentase penyelesaian tontonan dan share.',
        ],
      },
    ],
    recommendedModulesToStudy: [
      {
        moduleId: 'mod-101',
        moduleTitle: 'Arsitektur Bio & Conversion Funnel Link-in-Bio',
        whyImportant: 'Mendesak untuk memperbaiki etalase akun dan menyambungkan alur pembelian ke WhatsApp.',
        priority: 'Tinggi',
      },
      {
        moduleId: 'mod-201',
        moduleTitle: 'Formula Hook 3 Detik & Retensi Reels/TikTok',
        whyImportant: 'Untuk mengatasi masalah views yang mentok di angka 200 dan menaikkan retensi penonton.',
        priority: 'Tinggi',
      },
      {
        moduleId: 'mod-301',
        moduleTitle: 'Funnel Konversi Konten ke WhatsApp & Checkout',
        whyImportant: 'Mempelajari cara closing pesanan kiloan di WhatsApp dengan ramah dan tidak memaksa.',
        priority: 'Sedang',
      },
    ],
    bioImprovementProposal: {
      recommendedHeadline: 'Kopi Kenari | Biji Kopi Fresh Roasted Bandung',
      bulletPoints: [
        '☕ Roasting segar tiap minggu dari petani lokal pilihan',
        '🌿 100% Arabika & Robusta grade premium ramah lambung',
        '📦 Dikirim ke seluruh Indonesia • 2.000+ seduhan puas',
      ],
      ctaWording: '👇 Klaim Promo Gratis Ongkir Biji Kopi via WhatsApp:',
    },
    reviewerNotes: 'Member sangat kooperatif. Evaluasi kembali setelah 14 hari implementasi hook reels.',
    status: 'Dalam Pembinaan',
  },
  {
    id: 'audit-2',
    clientName: 'Siti Rahmawati (Hijab Chic Official)',
    platform: 'TikTok',
    accountHandle: '@hijabchic.official',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    niche: 'Fashion Muslim & Hijab Segi Empat',
    followersCount: '18.900',
    currentBio: 'Pusat Hijab Segi Empat Voal Premium Anti Lepek! Check keranjang kuning sekarang ✨',
    contentFrequency: '1-2x video per hari & Live 3x seminggu',
    topComplaintsOrGoal:
      'Penjualan live streaming fluktuatif. Kadang tembus 5 juta, kadang sepi hanya 200 ribu. Ingin menstabilkan omzet live di angka 10-15 juta per sesi dan memperluas jaringan reseller affiliate.',
    auditDate: '08 Nov 2026',
    overallScore: 78,
    scoreBreakdown: {
      profileBioOptimization: 85,
      contentHookAndQuality: 75,
      engagementAndCommunity: 78,
      funnelAndConversionCTA: 82,
      consistencyAndBranding: 72,
    },
    executiveSummary:
      'Akun memiliki momentum yang sangat baik dengan 18.900 followers aktif. Kualitas display produk sangat cantik. Masalah utama terletak pada inkonsistensi energi host saat live streaming dan kurangnya variasi hook video keranjang kuning.',
    swotAnalysis: {
      strengths: [
        'Visual hijab voal terlihat premium dan warna-warna pastel sangat disukai Gen Z dan ibu muda.',
        'Sudah terdaftar resmi di TikTok Shop dengan reputasi toko bintang 4.8.',
        'Followers organik yang cukup loyal.',
      ],
      weaknesses: [
        'Host live sering terlihat kelelahan setelah menit ke-45 dan ritme bicara melambat drastis.',
        'Video TikTok pendek terlalu sering memakai format yang sama tanpa eksperimen format peragaan masalah rambut/lepek.',
      ],
      opportunities: [
        'Merekrut 20 affiliate micro-influencer pesantren dan kampus untuk posting video keranjang kuning secara serempak.',
        'Menerapkan sistem 2 Host bergantian dalam 1 sesi live streaming 3 jam.',
      ],
      threats: [
        'Persaingan perang harga dari pabrikan konveksi besar dengan bahan voal standar.',
      ],
    },
    quickWins: [
      'Gunakan format 2 Host bergantian (Host A demo pakai hijab, Host B pegang ponsel dan balas chat secara antusias).',
      'Buat video pembuktian "Uji Siram Air & Anti Lepek Ditiup Kipas Angin" sebagai video hero di-pin.',
      'Sediakan komisi khusus affiliate sebesar 12% untuk 100 pesanan pertama.',
    ],
    thirtyDayActionPlan: [
      {
        week: 'Minggu 1: Optimalisasi Skrip Live',
        focus: 'Menerapkan SOP Rundown Live 120 Menit dengan penentuan timer flash sale tiap 20 menit.',
        tasks: ['Cetak papan promosi fisik', 'Latih host teknik demo cepat 3 gaya hijab dalam 60 detik'],
      },
      {
        week: 'Minggu 2: Kampanye Affiliate Kreator',
        focus: 'Kirimkan sampel gratis ke 25 kreator OOTD hijab mikro di TikTok.',
        tasks: ['Pilih kreator dengan engagement rate > 4%', 'Buat panduan singkat sudut rekaman'],
      },
      {
        week: 'Minggu 3: Iklan Shop GMV Max',
        focus: 'Booster video terbaik dengan TikTok Ads GMV Max.',
        tasks: ['Alokasikan budget harian Rp 50.000', 'Evaluasi ROAS setelah 3 hari berjalan'],
      },
      {
        week: 'Minggu 4: Retensi Pembeli & Review Toko',
        focus: 'Kirimkan ucapan terima kasih dengan kartu kecil di dalam paket hijab.',
        tasks: ['Selipkan kupon diskon repeat order untuk pembelian berikutnya'],
      },
    ],
    recommendedModulesToStudy: [
      {
        moduleId: 'mod-tt-2',
        moduleTitle: 'SOP Live Streaming 120 Menit Beromzet Puluhan Juta',
        whyImportant: 'Menata ritme host dan penyematan pin keranjang kuning agar konversi stabil.',
        priority: 'Tinggi',
      },
      {
        moduleId: 'mod-tt-3',
        moduleTitle: 'Rekrutmen Ratusan Affiliate & Kampanye GMV Max',
        whyImportant: 'Menduplikasi sumber penjualan agar tidak hanya bertumpu pada akun utama.',
        priority: 'Tinggi',
      },
    ],
    bioImprovementProposal: {
      recommendedHeadline: 'Hijab Chic Official | Voal Premium Anti Lepek',
      bulletPoints: [
        '🌸 Tegak di dahi seharian tanpa semprotan hairspray',
        '🧕 45+ Pilihan warna pastel elegan ramah kulit',
        '⚡ Kirim hari ini • Garansi retur jika bahan gerah',
      ],
      ctaWording: '👇 Klaim Voucher Diskon Live & Keranjang Kuning:',
    },
    reviewerNotes: 'Potensi menjadi brand hijab terkemuka sangat tinggi. Fokus pada penguatan tim live streaming.',
    status: 'Selesai',
  },
  {
    id: 'audit-3',
    clientName: 'Ahmad Fauzi (Tech Mentor Hub)',
    platform: 'LinkedIn',
    accountHandle: 'ahmadfauzi-engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    niche: 'Software Engineering & Career Coaching',
    followersCount: '4.850',
    currentBio: 'Software Engineer at Unicorn. Coding Enthusiast. Contact me for mentoring.',
    contentFrequency: '1x per bulan (Hanya share sertifikat atau repost berita teknologi)',
    topComplaintsOrGoal:
      'Ingin meluncurkan batch mentoring 1-on-1 coding dan review CV, tapi tidak ada yang mendaftar saat posting promo. Ingin membangun personal branding yang diakui sebagai expert di bidang teknologi.',
    auditDate: '02 Nov 2026',
    overallScore: 54,
    scoreBreakdown: {
      profileBioOptimization: 50,
      contentHookAndQuality: 45,
      engagementAndCommunity: 52,
      funnelAndConversionCTA: 42,
      consistencyAndBranding: 78,
    },
    executiveSummary:
      'Kredibilitas latar belakang pekerjaan klien sangat impresif (Software Engineer di Unicorn). Namun cara komunikasinya terlalu pasif dan hanya mengandalkan repost. Klien belum membagikan "insider insights" atau tips teknis yang nyata sehingga audiens belum melihat urgensi untuk ikut mentoring berbayar.',
    swotAnalysis: {
      strengths: ['Pengalaman kerja nyata di industri tech tier-1.', 'Portofolio teknis dan GitHub sangat solid.'],
      weaknesses: ['Jarang posting tulisan orisinil.', 'Bio LinkedIn standar tanpa penawaran solusi jelas.'],
      opportunities: ['Tingginya permintaan fresh graduate yang kesulitan menembus interview kerja coding.'],
      threats: ['Banyak tech content creator lain yang aktif membagikan breakdown arsitektur sistem setiap hari.'],
    },
    quickWins: [
      'Ganti Headline LinkedIn menjadi: "Software Engineer @ Unicorn | Membantu 100+ Junior Dev Lolos Interview Kerja Tech | Mentor Karir & Bedah Portofolio"',
      'Tulis 1 artikel breakdown orisinil: "3 Pertanyaan System Design yang Bikin 80% Kandidat Gagal Interview"',
      'Buat form pendaftaran gratis bedah CV sederhana di Google Forms / Tally.',
    ],
    thirtyDayActionPlan: [
      {
        week: 'Minggu 1: Revamp Profil & Otoritas',
        focus: 'Menata banner, headline, dan featured section LinkedIn.',
        tasks: ['Desain banner profesional', 'Cantumkan testimoni mentee sebelumnya di Featured section'],
      },
      {
        week: 'Minggu 2: Konsistensi Tulisan 2x Seminggu',
        focus: 'Membagikan cerita nyata kegagalan dan solusi saat ngoding.',
        tasks: ['Post 1: Kesalahan konyol di awal karir', 'Post 2: Checklist persiapan interview coding'],
      },
      {
        week: 'Minggu 3: Lead Magnet Bedah CV Terbuka',
        focus: 'Membuka 5 slot review CV gratis untuk bahan studi kasus konten berikutnya.',
        tasks: ['Buat postingan ajakan', 'Minta izin mempublikasikan before-after anonim'],
      },
      {
        week: 'Minggu 4: Pembukaan Batch Mentoring Berbayar',
        focus: 'Membuka kuota terbatas 10 kursi mentoring 1-on-1 intensif.',
        tasks: ['Rilis penawaran dengan batas waktu 48 jam'],
      },
    ],
    recommendedModulesToStudy: [
      {
        moduleId: 'mod-101',
        moduleTitle: 'Arsitektur Bio & Conversion Funnel Link-in-Bio',
        whyImportant: 'Merancang alur penawaran mentoring dan penataan profil berwibawa.',
        priority: 'Tinggi',
      },
      {
        moduleId: 'mod-202',
        moduleTitle: 'Algoritma Shares & Saves 2026 (Value Stacking Carousel)',
        whyImportant: 'Membuat dokumen PDF carousel teknis yang disukai algoritma LinkedIn.',
        priority: 'Tinggi',
      },
    ],
    bioImprovementProposal: {
      recommendedHeadline: 'Senior Software Engineer | Career & Coding Interview Mentor',
      bulletPoints: [
        '🚀 Membimbing calon engineer menembus perusahaan teknologi impian',
        '💻 7+ Tahun pengalaman building scalable system di startup Unicorn',
        '📝 50+ Mentee lolos tahap teknis & negosiasi gaji',
      ],
      ctaWording: '👇 Jadwalkan Sesi Bedah Portofolio 1-on-1:',
    },
    reviewerNotes: 'Profil berpotensi tinggi. Butuh dorongan untuk lebih percaya diri menulis di ruang publik.',
    status: 'Baru',
  },
];
