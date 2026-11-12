import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK safely
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Health check & status
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Helper for Gemini generateContent
async function callGemini(prompt: string, systemInstruction?: string, isJson: boolean = false) {
  if (!aiClient) {
    throw new Error('GEMINI_API_KEY tidak dikonfigurasi. Menggunakan generator cerdas internal.');
  }

  const response = await aiClient.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      systemInstruction: systemInstruction || 'Anda adalah Konsultan Kurikulum Senior dan Praktisi Pertumbuhan Platform Digital di Indonesia.',
      ...(isJson ? { responseMimeType: 'application/json' } : {}),
    },
  });

  return response.text || '';
}

// 2. AI Curriculum & Syllabus Generator
app.post('/api/ai/curriculum', async (req: Request, res: Response) => {
  try {
    const { topic, targetAudience, duration, levels, focusArea } = req.body;

    const prompt = `
Rancang struktur kurikulum dan silabus lengkap dalam bahasa Indonesia untuk:
- Topik: "${topic || 'Social Media Marketing & Creator Growth'}"
- Target Audiens: "${targetAudience || 'Pemilik Bisnis, Freelancer, Content Creator'}"
- Estimasi Durasi: "${duration || '6 Minggu / 24 Pertemuan'}"
- Level yang dicakup: "${(levels || ['Pemula', 'Menengah', 'Lanjutan']).join(', ')}"
- Fokus Spesifik: "${focusArea || 'Praktek langsung dan relevansi platform terkini'}"

Keluarkan format JSON dengan struktur:
{
  "title": string,
  "description": string,
  "category": string,
  "targetAudience": string,
  "duration": string,
  "levels": [
    {
      "level": "Pemula" | "Menengah" | "Lanjutan",
      "objective": string,
      "color": string,
      "modules": [
        {
          "title": string,
          "summary": string,
          "estimatedHours": number,
          "topics": string[],
          "practicalOutput": string,
          "keyCompetency": string
        }
      ]
    }
  ],
  "learningOutcomes": string[],
  "prerequisites": string[]
}
`;

    if (!aiClient) {
      return res.status(200).json({ success: false, fallback: true, message: 'API key belum disetel' });
    }

    const text = await callGemini(prompt, 'Anda adalah ahli perancangan kurikulum pelatihan vokasi dan bootcamp terkemuka.', true);
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating curriculum:', error);
    return res.status(500).json({ success: false, error: error.message || 'Gagal merancang kurikulum' });
  }
});

// 3. AI Presentation Slides Generator
app.post('/api/ai/slides', async (req: Request, res: Response) => {
  try {
    const { moduleTitle, level, keyTopics, audience } = req.body;

    const prompt = `
Buat slide presentasi komprehensif (6 hingga 8 slide) untuk materi pengajaran berikut:
- Judul Modul: "${moduleTitle}"
- Level: "${level || 'Pemula'}"
- Topik Bahasan: "${keyTopics || 'Dasar dan implementasi praktis'}"
- Audiens: "${audience || 'Peserta Bootcamp / Anggota Komunitas'}"

Keluarkan format JSON dengan struktur:
{
  "deckTitle": string,
  "moduleTitle": string,
  "slides": [
    {
      "slideNumber": number,
      "title": string,
      "subtitle": string,
      "bullets": string[],
      "visualConcept": string,
      "speakerNotes": string,
      "actionTakeaway": string
    }
  ]
}
`;

    if (!aiClient) {
      return res.status(200).json({ success: false, fallback: true });
    }

    const text = await callGemini(prompt, 'Anda adalah desainer instruksional dan master presenter.', true);
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating slides:', error);
    return res.status(500).json({ success: false, error: error.message || 'Gagal membuat slide' });
  }
});

// 4. AI Worksheet & Practical Guide Generator
app.post('/api/ai/worksheet', async (req: Request, res: Response) => {
  try {
    const { moduleTitle, level, objective } = req.body;

    const prompt = `
Buat Lembar Kerja Siswa (Worksheet), Template Form, dan Panduan Praktik Terstruktur untuk modul:
- Modul: "${moduleTitle}"
- Level: "${level || 'Menengah'}"
- Tujuan Belajar: "${objective || 'Mampu mengimplementasikan strategi secara mandiri'}"

Keluarkan format JSON:
{
  "title": string,
  "objective": string,
  "estimatedTimeMinutes": number,
  "sections": [
    {
      "sectionName": string,
      "instructions": string,
      "fields": [
        { "id": string, "label": string, "placeholder": string, "hint": string, "type": "text" | "textarea" | "checklist" }
      ]
    }
  ],
  "practicalSteps": [
    { "stepNumber": number, "title": string, "instruction": string, "proTip": string, "commonMistake": string }
  ],
  "evaluationRubric": [
    { "criteria": string, "level4": string, "level2": string, "weight": string }
  ]
}
`;

    if (!aiClient) {
      return res.status(200).json({ success: false, fallback: true });
    }

    const text = await callGemini(prompt, 'Anda adalah perancang materi latihan praktik profesional.', true);
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating worksheet:', error);
    return res.status(500).json({ success: false, error: error.message || 'Gagal membuat lembar kerja' });
  }
});

// 5. AI Platform Update & Curriculum Impact Analyzer
app.post('/api/ai/platform-impact', async (req: Request, res: Response) => {
  try {
    const { platform, updateNews, affectedModules } = req.body;

    const prompt = `
Analisis pembaruan platform terkini dan dampaknya terhadap silabus/materi ajar:
- Platform: "${platform}" (misal: Instagram, TikTok Shop, Meta Ads, YouTube, Google SEO, AI Tools)
- Rincian Update / Fitur Baru: "${updateNews}"
- Daftar Modul Saat Ini: ${JSON.stringify(affectedModules || [])}

Keluarkan format JSON:
{
  "platform": string,
  "updateTitle": string,
  "importanceLevel": "Kritis / Wajib Segera" | "Sedang / Perlu Penyesuaian" | "Minor / Wawasan Tambahan",
  "summary": string,
  "whatChanged": string[],
  "impactedModules": [
    {
      "moduleId": string,
      "moduleTitle": string,
      "changeUrgency": "High" | "Medium" | "Low",
      "reason": string,
      "recommendedRevisions": string[],
      "newTopicsToAdd": string[],
      "obsoleteTopicsToRemove": string[]
    }
  ],
  "trainerAdvice": string
}
`;

    if (!aiClient) {
      return res.status(200).json({ success: false, fallback: true });
    }

    const text = await callGemini(prompt, 'Anda adalah Tech & Platform Trend Lead Analyst.', true);
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error analyzing platform impact:', error);
    return res.status(500).json({ success: false, error: error.message || 'Gagal menganalisis update platform' });
  }
});

// 6. AI Client / Member Account Review & Recommendation Engine
app.post('/api/ai/account-audit', async (req: Request, res: Response) => {
  try {
    const {
      clientName,
      platform,
      accountHandle,
      niche,
      followersCount,
      currentBio,
      contentFrequency,
      topComplaintsOrGoal,
      availableModules,
    } = req.body;

    const prompt = `
Lakukan audit mendalam dan berikan review & rekomendasi profesional untuk akun member/klien program:
- Nama Klien/Member: "${clientName || 'Member Bootcamp'}"
- Platform: "${platform || 'Instagram'}"
- Handle Akun: "${accountHandle || '@brandlokal'}"
- Niche/Kategori: "${niche || 'Fashion / Kuliner / Jasa'}"
- Jumlah Followers: "${followersCount || '3.500'}"
- Bio Saat Ini: "${currentBio || 'Membantu pemilik bisnis tumbuh di sosial media'}"
- Frekuensi Konten: "${contentFrequency || '3x seminggu Reels & Feeds'}"
- Masalah Utama / Target: "${topComplaintsOrGoal || 'Views stuck di 200, interaksi minim, ingin konversi ke penjualan WA'}"
- Katalog Modul Tersedia di Kurikulum: ${JSON.stringify(availableModules || [])}

Keluarkan format JSON:
{
  "clientName": string,
  "accountHandle": string,
  "overallScore": number, // 0 - 100
  "scoreBreakdown": {
    "profileBioOptimization": number, // 0 - 100
    "contentHookAndQuality": number, // 0 - 100
    "engagementAndCommunity": number, // 0 - 100
    "funnelAndConversionCTA": number, // 0 - 100
    "consistencyAndBranding": number // 0 - 100
  },
  "executiveSummary": string,
  "swotAnalysis": {
    "strengths": string[],
    "weaknesses": string[],
    "opportunities": string[],
    "threats": string[]
  },
  "quickWins": string[],
  "thirtyDayActionPlan": [
    { "week": "Minggu 1" | "Minggu 2" | "Minggu 3" | "Minggu 4", "focus": string, "tasks": string[] }
  ],
  "recommendedModulesToStudy": [
    {
      "moduleTitle": string,
      "whyImportant": string,
      "priority": "Tinggi" | "Sedang"
    }
  ],
  "bioImprovementProposal": {
    "recommendedHeadline": string,
    "bulletPoints": string[],
    "ctaWording": string
  }
}
`;

    if (!aiClient) {
      return res.status(200).json({ success: false, fallback: true });
    }

    const text = await callGemini(prompt, 'Anda adalah Senior Social Media & Business Growth Consultant ternama.', true);
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error running account audit:', error);
    return res.status(500).json({ success: false, error: error.message || 'Gagal melakukan audit akun' });
  }
});

// Start Express server and mount Vite
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server KuriKraf running on port ${PORT}`);
  });
}

startServer();
