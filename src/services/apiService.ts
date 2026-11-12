import {
  Curriculum,
  CurriculumModule,
  LevelTrack,
  SlideDeck,
  SlideItem,
  Worksheet,
  MemberAccountAudit,
  PlatformUpdate,
  PlatformType,
} from '../types';

export interface GenerateCurriculumParams {
  topic: string;
  targetAudience: string;
  duration: string;
  levels: ('Pemula' | 'Menengah' | 'Lanjutan')[];
  focusArea: string;
}

export interface GenerateSlidesParams {
  moduleTitle: string;
  level: string;
  keyTopics: string;
  audience: string;
}

export interface GenerateWorksheetParams {
  moduleTitle: string;
  level: string;
  objective: string;
}

export interface PlatformImpactParams {
  platform: PlatformType;
  updateNews: string;
  affectedModules: Array<{ id: string; title: string }>;
}

export interface AccountAuditParams {
  clientName: string;
  platform: PlatformType;
  accountHandle: string;
  niche: string;
  followersCount: string;
  currentBio: string;
  contentFrequency: string;
  topComplaintsOrGoal: string;
  availableModules?: Array<{ id: string; title: string }>;
}

// 1. Generate Curriculum with Gemini or Fallback
export async function apiGenerateCurriculum(params: GenerateCurriculumParams): Promise<Partial<Curriculum>> {
  try {
    const res = await fetch('/api/ai/curriculum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
  } catch (err) {
    console.warn('API error, using intelligent fallback generator', err);
  }

  // Fallback template generator tailored to topic
  const currId = `curr-${Date.now()}`;
  return {
    title: `Kurikulum Komprehensif: ${params.topic}`,
    description: `Program pembelajaran intensif berjenjang terstruktur untuk menguasai ${params.topic} dari pondasi hingga eksekusi tingkat lanjut.`,
    category: 'Pelatihan & Sertifikasi Profesional',
    targetAudience: params.targetAudience || 'Praktisi, Pelaku Bisnis, dan Kreator',
    duration: params.duration || '6 Minggu (24 Pertemuan)',
    version: 'v1.0',
    tags: [params.topic.split(' ')[0], 'Praktik', 'Strategi', 'Optimasi'],
    learningOutcomes: [
      `Memahami konsep fundamental dan tren terbaru dalam ${params.topic}`,
      'Mampu mengeksekusi strategi mandiri dengan metode berbasis data',
      'Menghasilkan portofolio praktis dan laporan evaluasi terukur',
    ],
    prerequisites: ['Koneksi internet stabil', 'Komitmen belajar dan praktek mingguan'],
    levels: params.levels.map((lvl) => {
      const isPemula = lvl === 'Pemula';
      const isMenengah = lvl === 'Menengah';
      return {
        level: lvl,
        objective: isPemula
          ? `Membangun pemahaman pondasi, terminologi inti, dan setup dasar ${params.topic}.`
          : isMenengah
          ? `Menguasai teknik taktis, efisiensi eksekusi, dan optimasi performa ${params.topic}.`
          : `Strategi tingkat lanjut, otomatisasi, scaling, dan evaluasi kepatuhan tren masa depan.`,
        color: isPemula
          ? 'from-blue-600 to-cyan-500'
          : isMenengah
          ? 'from-indigo-600 to-purple-600'
          : 'from-amber-600 to-rose-600',
        modules: [
          {
            id: `mod-${Date.now()}-${lvl}-1`,
            curriculumId: currId,
            level: lvl,
            title: isPemula
              ? `Dasar & Arsitektur Inti ${params.topic}`
              : isMenengah
              ? `Taktik Eksekusi & Optimasi Alur ${params.topic}`
              : `Strategi Skalabilitas & Monetisasi ${params.topic}`,
            summary: `Panduan implementasi terarah untuk tahapan level ${lvl} dengan fokus pada keluaran nyata.`,
            estimatedHours: isPemula ? 4 : isMenengah ? 6 : 8,
            topics: [
              `Prinsip Kunci ${params.topic} Level ${lvl}`,
              'Alat Bantu & Framework Kerja Standar',
              'Studi Kasus Kesalahan Umum & Solusinya',
              'Latihan Praktik Mandiri Terpandu',
            ],
            practicalOutput: `Dokumen portofolio dan checklist eksekusi level ${lvl}.`,
            keyCompetency: `Kompetensi Terapan ${params.topic} (${lvl})`,
            status: 'published',
            lastReviewedDate: new Date().toISOString().split('T')[0],
            version: '1.0',
            slidesCount: 6,
            hasWorksheet: true,
            hasGuide: true,
          },
          {
            id: `mod-${Date.now()}-${lvl}-2`,
            curriculumId: currId,
            level: lvl,
            title: isPemula
              ? `Riset & Pemetaan Target Pasar pada ${params.topic}`
              : isMenengah
              ? `Eksperimen & Analisis Metrik Keberhasilan`
              : `Audit Sistem & Kepemimpinan Tim pada ${params.topic}`,
            summary: `Pembahasan mendalam untuk menajamkan kompetensi analitis dan evaluatif peserta.`,
            estimatedHours: isPemula ? 5 : isMenengah ? 7 : 8,
            topics: [
              'Pengumpulan Data & Benchmarking Kompetitor',
              'Formulasi Hipotesis & Uji Coba Cepat',
              'Penyusunan Standard Operating Procedure (SOP)',
            ],
            practicalOutput: `Laporan analisis dan template SOP siap pakai.`,
            keyCompetency: `Evaluasi & Problem Solving ${lvl}`,
            status: 'published',
            lastReviewedDate: new Date().toISOString().split('T')[0],
            version: '1.0',
            slidesCount: 7,
            hasWorksheet: true,
            hasGuide: true,
          },
        ],
      } as LevelTrack;
    }),
  };
}

// 2. Generate Slide Deck
export async function apiGenerateSlides(params: GenerateSlidesParams): Promise<{ deckTitle: string; slides: SlideItem[] }> {
  try {
    const res = await fetch('/api/ai/slides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
  } catch (err) {
    console.warn('API error, using fallback slides', err);
  }

  // Fallback slides
  return {
    deckTitle: `Presentasi Modul: ${params.moduleTitle}`,
    slides: [
      {
        slideNumber: 1,
        title: params.moduleTitle,
        subtitle: `Panduan Pembelajaran Komprehensif (Level: ${params.level})`,
        bullets: [
          'Memahami konsep utama secara mendalam tanpa jargon membingungkan',
          'Melihat relevansi materi dengan perkembangan platform dan industri terkini',
          'Mempersiapkan keluaran praktik yang siap diterapkan hari ini juga',
        ],
        visualConcept: 'Ilustrasi diagram proses dari titik awal hingga hasil akhir optimal.',
        speakerNotes:
          'Sambut peserta dengan hangat. Jelaskan tujuan sesi ini dan mengapa topik ini sangat penting bagi kemajuan karir/bisnis mereka.',
        actionTakeaway: 'Tulis 1 tujuan utama yang ingin Anda capai setelah menyelesaikan materi ini.',
      },
      {
        slideNumber: 2,
        title: 'Tantangan Terbesar di Lapangan',
        subtitle: 'Mengapa Banyak Orang Gagal atau Mengalami Hambatan',
        bullets: [
          'Kurangnya framework kerja yang terstruktur dan terukur',
          'Terjebak pada teori tanpa latihan eksekusi yang disiplin',
          'Mengabaikan pembaruan aturan serta algoritma platform terbaru',
        ],
        visualConcept: 'Grafik perbandingan tingkat keberhasilan metode konvensional vs metode terstruktur.',
        speakerNotes: 'Ajak audiens merefleksikan pengalaman pribadi mereka terhadap 3 hambatan tersebut.',
        actionTakeaway: 'Identifikasi hambatan mana yang paling sering Anda temui selama ini.',
      },
      {
        slideNumber: 3,
        title: 'Pilar Solusi & Framework Utama',
        subtitle: 'Langkah Demi Langkah Menguasai Materi',
        bullets: [
          'Pilar 1: Fondasi yang Kuat & Riset Terarah',
          'Pilar 2: Eksekusi Cepat dengan Template Teruji',
          'Pilar 3: Evaluasi Metrik & Iterasi Berkelanjutan',
        ],
        visualConcept: 'Piramida 3 lapis berwarna kontras dengan ikon di tiap pilar.',
        speakerNotes: 'Jelaskan keterkaitan erat antara pilar 1, 2, dan 3.',
        actionTakeaway: 'Gunakan lembar kerja (worksheet) terlampir untuk mengisi rincian pilar Anda.',
      },
      {
        slideNumber: 4,
        title: 'Checklist Implementasi Lapangan',
        subtitle: 'Kriteria Keberhasilan yang Wajib Dicapai',
        bullets: [
          'Seluruh persiapan teknis sudah terverifikasi',
          'Konten atau strategi sudah disesuaikan dengan aturan platform terkini',
          'Terdapat call to action (CTA) yang jelas dan terarah',
        ],
        visualConcept: 'Tampilan checklist dengan tanda centang hijau menyala.',
        speakerNotes: 'Pastikan peserta tidak melewatkan satu pun poin sebelum merilis pekerjaan mereka.',
        actionTakeaway: 'Lakukan verifikasi mandiri menggunakan checklist di panduan praktik.',
      },
      {
        slideNumber: 5,
        title: 'Rangkuman & Tugas Aksi Nyata',
        subtitle: 'Komitmen Praktik Peserta',
        bullets: [
          'Download materi dan lembar kerja pendamping',
          'Selesaikan tugas praktik dalam waktu 24 jam',
          'Kirimkan hasil kerja ke mentor untuk mendapatkan review akun & feedback',
        ],
        visualConcept: 'Kotak tugas berwarna emas dengan tombol seruan aksi.',
        speakerNotes: 'Tutup presentasi dengan motivasi tinggi dan buka sesi tanya jawab interaktif.',
        actionTakeaway: 'Buka tab Worksheet sekarang dan lengkapi bagian pertama.',
      },
    ],
  };
}

// 3. Generate Worksheet
export async function apiGenerateWorksheet(params: GenerateWorksheetParams): Promise<Partial<Worksheet>> {
  try {
    const res = await fetch('/api/ai/worksheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
  } catch (err) {
    console.warn('API error, using fallback worksheet', err);
  }

  return {
    title: `Lembar Kerja: ${params.moduleTitle}`,
    objective: params.objective || `Mampu mengeksekusi dan mendokumentasikan hasil praktik ${params.moduleTitle} secara mandiri.`,
    estimatedTimeMinutes: 40,
    sections: [
      {
        sectionName: 'Bagian 1: Analisis Situasi Awal & Tujuan',
        instructions: 'Identifikasi posisi Anda saat ini sebelum memulai implementasi.',
        fields: [
          {
            id: 'current_status',
            label: 'Kondisi / Data Saat Ini',
            placeholder: 'Tuliskan kondisi riil proyek, akun, atau bisnis Anda saat ini...',
            hint: 'Sertakan angka atau metrik jika ada',
            type: 'textarea',
          },
          {
            id: 'target_outcome',
            label: 'Hasil Spesifik yang Ingin Dicapai',
            placeholder: 'Misal: Kenaikan interaksi 50%, 10 leads baru dalam 7 hari...',
            hint: 'Buat target yang realistis dan terukur',
            type: 'text',
          },
        ],
      },
      {
        sectionName: 'Bagian 2: Rencana Eksekusi & Solusi Praktis',
        instructions: 'Rincikan langkah taktis yang akan Anda kerjakan hari ini.',
        fields: [
          {
            id: 'action_step_1',
            label: 'Tindakan Prioritas Utama (Hari Ini)',
            placeholder: 'Tuliskan langkah konkrit pertama...',
            hint: 'Fokus pada hal yang paling berdampak cepat',
            type: 'text',
          },
          {
            id: 'action_step_2',
            label: 'Rencana Konten / Materi yang Akan Dibuat',
            placeholder: 'Uraikan konsep, judul, atau draft materi...',
            hint: 'Gunakan panduan formula yang telah dipelajari di slide',
            type: 'textarea',
          },
        ],
      },
    ],
    practicalSteps: [
      {
        stepNumber: 1,
        title: 'Review Silabus & Slide Terlebih Dahulu',
        instruction: 'Pastikan sudah membaca materi dasar sebelum mengisi lembar kerja ini.',
        proTip: 'Buka slide presentasi di tab terpisah sebagai referensi.',
        commonMistake: 'Langsung mengisi tanpa memahami konteks pembelajaran.',
      },
      {
        stepNumber: 2,
        title: 'Uji Coba dengan Skala Kecil',
        instruction: 'Lakukan uji coba konsep pada 1 sampel sebelum mempublikasikan secara luas.',
        proTip: 'Minta feedback teman atau tim terlebih dahulu.',
        commonMistake: 'Ragu-ragu memulai karena ingin hasil yang langsung 100% sempurna.',
      },
    ],
    evaluationRubric: [
      {
        criteria: 'Kedalaman Analisis & Pemahaman Masalah',
        level4: 'Sangat spesifik, didukung data riil, dan mengidentifikasi akar persoalan.',
        level2: 'Terlalu umum atau mengabaikan data pendukung.',
        weight: '40%',
      },
      {
        criteria: 'Realisasi Rencana Aksi',
        level4: 'Langkah taktis jelas, terukur, dan memiliki batas waktu penyelesaian yang tegas.',
        level2: 'Rencana kabur dan tidak ada tolok ukur penyelesaian.',
        weight: '60%',
      },
    ],
  };
}

// 4. Generate Platform Impact Analysis
export async function apiAnalyzePlatformImpact(params: PlatformImpactParams): Promise<Partial<PlatformUpdate>> {
  try {
    const res = await fetch('/api/ai/platform-impact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
  } catch (err) {
    console.warn('API error, using fallback platform impact', err);
  }

  return {
    platform: params.platform,
    updateTitle: `Pembaruan Sistem & Algoritma ${params.platform} 2026`,
    urgency: 'sedang',
    summary: `Analisis penyesuaian materi ajar akibat kebijakan terbaru ${params.platform}: ${params.updateNews}`,
    whatChanged: [
      `Perubahan sistem rekomendasi pada platform ${params.platform}`,
      'Peningkatan prioritas konten yang mempertahankan durasi tonton pengguna',
      'Pemberlakuan filter otomatis terhadap format promosi berlebihan',
    ],
    trainerAdvice:
      'Lakukan update pada modul silabus terkait. Berikan catatan tambahan kepada peserta agar mematuhi pedoman komunitas terkini.',
    suggestedRevisions: params.affectedModules.map((m) => ({
      moduleId: m.id,
      moduleTitle: m.title,
      changeUrgency: 'Medium',
      reason: `Materi pada modul "${m.title}" perlu diselaraskan dengan update ${params.platform}.`,
      diffBefore: 'Pedoman konvensional sebelumnya.',
      diffAfter: 'Pedoman baru yang mengedepankan kepatuhan dan retensi organik.',
      newTopicsToAdd: [`Adaptasi Fitur Baru ${params.platform}`],
      obsoleteTopicsToRemove: ['Taktik Lama yang Sudah Tidak Relevan'],
    })),
  };
}

// 5. Generate Client/Member Account Audit
export async function apiGenerateAccountAudit(params: AccountAuditParams): Promise<MemberAccountAudit> {
  try {
    const res = await fetch('/api/ai/account-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (data.success && data.data) {
      return {
        ...data.data,
        id: `audit-${Date.now()}`,
        clientName: params.clientName,
        platform: params.platform,
        accountHandle: params.accountHandle,
        niche: params.niche,
        followersCount: params.followersCount,
        currentBio: params.currentBio,
        contentFrequency: params.contentFrequency,
        topComplaintsOrGoal: params.topComplaintsOrGoal,
        auditDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Baru',
      };
    }
  } catch (err) {
    console.warn('API error, using fallback account audit', err);
  }

  // Calculate intelligent baseline scores
  const bioScore = params.currentBio.length > 50 ? 68 : 45;
  const hookScore = params.contentFrequency.includes('hari') ? 70 : 55;
  const commScore = 60;
  const ctaScore = params.currentBio.toLowerCase().includes('wa') || params.currentBio.toLowerCase().includes('http') ? 72 : 40;
  const brandScore = 75;
  const overall = Math.round((bioScore + hookScore + commScore + ctaScore + brandScore) / 5);

  return {
    id: `audit-${Date.now()}`,
    clientName: params.clientName || 'Member Program',
    platform: params.platform,
    accountHandle: params.accountHandle || '@member.official',
    niche: params.niche || 'Bisnis & Konten',
    followersCount: params.followersCount || '1.000',
    currentBio: params.currentBio || 'Deskripsi akun...',
    contentFrequency: params.contentFrequency || 'Belum konsisten',
    topComplaintsOrGoal: params.topComplaintsOrGoal || 'Menaikkan interaksi dan penjualan',
    auditDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
    overallScore: overall,
    scoreBreakdown: {
      profileBioOptimization: bioScore,
      contentHookAndQuality: hookScore,
      engagementAndCommunity: commScore,
      funnelAndConversionCTA: ctaScore,
      consistencyAndBranding: brandScore,
    },
    executiveSummary: `Akun ${params.accountHandle} di kategori ${params.niche} memiliki potensi pertumbuhan yang baik. Hambatan terbesarnya adalah efektivitas penataan profil (bio) dan ketiadaan jalur konversi yang mulus dari penonton menjadi pembeli.`,
    swotAnalysis: {
      strengths: [
        `Niche ${params.niche} memiliki peminat yang jelas dan kebutuhan produk yang nyata.`,
        'Sudah memiliki akun aktif dan pemahaman dasar mengenai pasar.',
      ],
      weaknesses: [
        'Profil akun belum memiliki kalimat penawar (value proposition) yang tajam.',
        'Call to action (CTA) belum terpusat ke satu pintu masuk pelanggan (WhatsApp/Katalog).',
      ],
      opportunities: [
        'Memproduksi video edukasi singkat dengan hook emosional untuk menjangkau audiens baru.',
        'Membangun keakraban melalui interaksi rutin di Instagram/TikTok Stories.',
      ],
      threats: [
        'Kehilangan potensi pembeli ke kompetitor yang memiliki alur pemesanan lebih cepat dan ramah.',
      ],
    },
    quickWins: [
      `Ubah Bio akun agar menyertakan manfaat utama produk dalam 1 kalimat ringkas.`,
      `Pasang tautan satu klik ke WhatsApp dengan format pesan otomatis.`,
      `Sematkan 3 postingan terbaik (Testimoni, Best Seller, Cerita Brand) di grid teratas akun.`,
    ],
    thirtyDayActionPlan: [
      {
        week: 'Minggu 1: Makeover Profil & Funnel',
        focus: 'Merapikan tampilan bio, foto profil beresolusi tinggi, dan tautan bio.',
        tasks: ['Terapkan formula bio 3 baris', 'Setup WhatsApp Bisnis', 'Atur Highlight/Sorotan'],
      },
      {
        week: 'Minggu 2: Penerapan Hook Konten',
        focus: 'Eksperimen 4 video pendek dengan pola hook 3 detik penahan scroll.',
        tasks: ['Uji coba hook peringatan & kontradiktif', 'Gunakan teks pembuka kontras'],
      },
      {
        week: 'Minggu 3: Penguatan Engagement',
        focus: 'Menaikkan respon komentar dan DM melalui stiker interaktif.',
        tasks: ['Buka sesi tanya jawab di Story', 'Balas seluruh komentar dalam kurun waktu 1 jam'],
      },
      {
        week: 'Minggu 4: Penawaran Terarah',
        focus: 'Mengarahkan traffic ke penawaran khusus dan mengukur konversi.',
        tasks: ['Rilis voucher terbatas', 'Evaluasi rasio chat WhatsApp yang closing'],
      },
    ],
    recommendedModulesToStudy: (params.availableModules && params.availableModules.length > 0)
      ? params.availableModules.slice(0, 2).map((m, idx) => ({
          moduleId: m.id,
          moduleTitle: m.title,
          whyImportant: idx === 0 ? 'Mendasar untuk memperbaiki etalase dan pintu masuk pelanggan.' : 'Meningkatkan jangkauan penonton organik.',
          priority: idx === 0 ? 'Tinggi' : 'Sedang',
        }))
      : [
          {
            moduleTitle: 'Arsitektur Bio & Conversion Funnel Link-in-Bio',
            whyImportant: 'Mendesak untuk membenahi tampilan etalase agar pengunjung langsung paham value bisnis Anda.',
            priority: 'Tinggi',
          },
          {
            moduleTitle: 'Formula Hook 3 Detik & Retensi Reels/TikTok',
            whyImportant: 'Kunci untuk menaikkan jangkauan views dan retensi penonton dari 200 views ke ribuan.',
            priority: 'Tinggi',
          },
        ],
    bioImprovementProposal: {
      recommendedHeadline: `${params.accountHandle.replace('@', '')} | Solusi ${params.niche}`,
      bulletPoints: [
        '✨ Pilihan terpercaya dengan kualitas terjamin',
        '📦 Pengiriman cepat & garansi kepuasan pelanggan',
        '💬 Ribuan pelanggan terbantu di seluruh Indonesia',
      ],
      ctaWording: '👇 Konsultasi & Pesan Cepat via WhatsApp:',
    },
    reviewerNotes: 'Klien disarankan menyelesaikan Modul Rekomendasi sebelum mulai beriklan berbayar.',
    status: 'Baru',
  };
}
