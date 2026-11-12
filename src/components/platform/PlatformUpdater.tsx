import React, { useState } from 'react';
import {
  Curriculum,
  CurriculumModule,
  PlatformUpdate,
  PlatformType,
  UrgencyLevel,
} from '../../types';
import {
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  ExternalLink,
  ShieldAlert,
  Sliders,
  Calendar,
  Layers,
  Check,
  FileDiff,
  Plus,
} from 'lucide-react';
import { apiAnalyzePlatformImpact } from '../../services/apiService';

interface PlatformUpdaterProps {
  curriculum: Curriculum;
  onUpdateCurriculum: (curriculum: Curriculum) => void;
  platformUpdates: PlatformUpdate[];
  onUpdatePlatformUpdates: (updates: PlatformUpdate[]) => void;
}

export const PlatformUpdater: React.FC<PlatformUpdaterProps> = ({
  curriculum,
  onUpdateCurriculum,
  platformUpdates,
  onUpdatePlatformUpdates,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('All');
  const [activeUpdateId, setActiveUpdateId] = useState<string>(platformUpdates[0]?.id || '');
  const [isAiScannerOpen, setIsAiScannerOpen] = useState(false);

  // AI Scanner state
  const [scannerPlatform, setScannerPlatform] = useState<PlatformType>('Instagram');
  const [scannerNews, setScannerNews] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // Active Update
  const activeUpdate = platformUpdates.find((u) => u.id === activeUpdateId) || platformUpdates[0];

  // All modules flattened
  const allModules = curriculum.levels.flatMap((lvl) => lvl.modules);

  // Filtered Updates
  const filteredUpdates = platformUpdates.filter((u) => {
    const matchPlatform = selectedPlatform === 'All' || u.platform === selectedPlatform;
    const matchUrgency = selectedUrgency === 'All' || u.urgency === selectedUrgency;
    return matchPlatform && matchUrgency;
  });

  // Apply Update to Module (1-Click Sync)
  const handleApplyUpdateToModule = (update: PlatformUpdate, moduleId: string) => {
    // Find revision details
    const revision = update.suggestedRevisions.find((r) => r.moduleId === moduleId);

    const updatedLevels = curriculum.levels.map((lvl) => ({
      ...lvl,
      modules: lvl.modules.map((m) => {
        if (m.id === moduleId) {
          const currentVer = parseFloat(m.version) || 1.0;
          const nextVer = (currentVer + 0.1).toFixed(1);
          const newTopics = revision ? [...m.topics, ...revision.newTopicsToAdd] : m.topics;

          return {
            ...m,
            version: nextVer,
            status: 'published' as const,
            lastReviewedDate: new Date().toISOString().split('T')[0],
            topics: Array.from(new Set(newTopics)),
          };
        }
        return m;
      }),
    }));

    // Update curriculum
    onUpdateCurriculum({
      ...curriculum,
      levels: updatedLevels,
      lastUpdated: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
    });

    // Mark update status if all modules applied
    const updatedUpdates = platformUpdates.map((u) => {
      if (u.id === update.id) {
        return {
          ...u,
          status: 'applied' as const,
        };
      }
      return u;
    });

    onUpdatePlatformUpdates(updatedUpdates);
  };

  // Run AI Scanner
  const handleRunAiScanner = async () => {
    if (!scannerNews.trim()) return;
    setIsScanning(true);

    try {
      const affectedList = allModules.map((m) => ({ id: m.id, title: m.title }));
      const result = await apiAnalyzePlatformImpact({
        platform: scannerPlatform,
        updateNews: scannerNews,
        affectedModules: affectedList,
      });

      const newUpdate: PlatformUpdate = {
        id: `upd-${Date.now()}`,
        platform: scannerPlatform,
        updateTitle: result.updateTitle || `Pembaruan Fitur & Algoritma ${scannerPlatform} 2026`,
        releaseDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        urgency: (result.urgency as UrgencyLevel) || 'sedang',
        summary: result.summary || scannerNews,
        whatChanged: result.whatChanged || ['Perubahan algoritma sistem rekomendasi'],
        impactedModuleIds: (result.suggestedRevisions || []).map((r) => r.moduleId),
        status: 'pending_review',
        suggestedRevisions: result.suggestedRevisions || [],
        trainerAdvice: result.trainerAdvice || 'Sesuaikan materi ajar dan perbarui worksheet.',
      };

      // Flag modules as needs_update
      const impactedIds = newUpdate.impactedModuleIds;
      const updatedLevels = curriculum.levels.map((lvl) => ({
        ...lvl,
        modules: lvl.modules.map((m) => {
          if (impactedIds.includes(m.id)) {
            return {
              ...m,
              status: 'needs_update' as const,
            };
          }
          return m;
        }),
      }));

      onUpdateCurriculum({
        ...curriculum,
        levels: updatedLevels,
      });

      onUpdatePlatformUpdates([newUpdate, ...platformUpdates]);
      setActiveUpdateId(newUpdate.id);
      setIsAiScannerOpen(false);
      setScannerNews('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Radar Statistics */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-slate-700/80 p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
                Platform Radar &amp; Material Synchronizer
              </span>
              <span className="text-xs text-slate-400">
                Memastikan Silabus Selalu Relevan dengan Algoritma Terkini
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pembaruan Materi &amp; Radar Algoritma Platform
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pantau regulasi terbaru Instagram, TikTok Shop, Meta Ads, dan AI Tools. Deteksi modul yang terpengaruh dan lakukan sinkronisasi materi versi terbaru secara instan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => setIsAiScannerOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-xs shadow-lg shadow-amber-600/25 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Scan Update Platform Baru (AI)</span>
            </button>

            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
              <span className="text-slate-400">Modul Perlu Sync:</span>
              <span className="font-bold text-amber-400 font-mono">
                {allModules.filter((m) => m.status === 'needs_update').length} Modul
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Platform Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {['All', 'Instagram', 'TikTok', 'Meta Ads', 'YouTube', 'AI Tools'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedPlatform === p
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Urgensi:</span>
          <select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none"
          >
            <option value="All">Semua Tingkat</option>
            <option value="kritis">🚨 Kritis / Segera</option>
            <option value="sedang">⚠️ Sedang</option>
            <option value="info">💡 Wawasan Baru</option>
          </select>
        </div>
      </div>

      {/* 3. Main Split View: Update Cards List & Detailed Impact Diff */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Updates List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Daftar Berita &amp; Update Terkini ({filteredUpdates.length})
          </h3>

          <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
            {filteredUpdates.map((u) => {
              const isSelected = activeUpdate?.id === u.id;
              const isKritis = u.urgency === 'kritis';
              const isApplied = u.status === 'applied';

              return (
                <div
                  key={u.id}
                  onClick={() => setActiveUpdateId(u.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-850 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-amber-400 uppercase tracking-wide">
                      {u.platform}
                    </span>

                    <div className="flex items-center gap-2">
                      {isApplied ? (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          Tersinkron
                        </span>
                      ) : isKritis ? (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 animate-pulse">
                          <AlertTriangle className="w-3 h-3" />
                          Kritis
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          Sedang
                        </span>
                      )}

                      <span className="text-[10px] text-slate-500 font-mono">
                        {u.releaseDate}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-white line-clamp-2 leading-snug">
                    {u.updateTitle}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {u.summary}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{u.impactedModuleIds.length} Modul Terdampak</span>
                    <span className="text-amber-400 font-medium flex items-center gap-1">
                      Lihat Rincian <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Impact Analysis & Side-by-Side Diff */}
        <div className="lg:col-span-7">
          {activeUpdate ? (
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
              {/* Active Update Header */}
              <div className="border-b border-slate-800 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {activeUpdate.platform} Update
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Rilis: {activeUpdate.releaseDate}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white tracking-tight">
                  {activeUpdate.updateTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeUpdate.summary}
                </p>
              </div>

              {/* What Changed Bullets */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Rincian Perubahan &amp; Kebijakan Baru:
                </h4>
                <div className="space-y-1.5 pt-1">
                  {activeUpdate.whatChanged.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trainer Advice */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs space-y-1">
                <span className="font-bold text-indigo-300 uppercase tracking-wide block">
                  💡 Saran &amp; Langkah Strategis bagi Fasilitator:
                </span>
                <p className="text-slate-200 leading-relaxed italic">
                  "{activeUpdate.trainerAdvice}"
                </p>
              </div>

              {/* Impacted Modules & Side-by-Side Diff */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <FileDiff className="w-4 h-4 text-indigo-400" />
                    Analisis Dampak pada Silabus &amp; Revisi Materi
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeUpdate.impactedModuleIds.length} Modul Terkait
                  </span>
                </div>

                {activeUpdate.suggestedRevisions && activeUpdate.suggestedRevisions.length > 0 ? (
                  <div className="space-y-4">
                    {activeUpdate.suggestedRevisions.map((rev, revIdx) => {
                      const targetMod = allModules.find((m) => m.id === rev.moduleId);

                      return (
                        <div
                          key={revIdx}
                          className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                            <div>
                              <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase">
                                Modul Target
                              </span>
                              <h5 className="font-bold text-sm text-white">
                                {rev.moduleTitle}
                              </h5>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                Alasan: {rev.reason}
                              </p>
                            </div>

                            <button
                              onClick={() => handleApplyUpdateToModule(activeUpdate, rev.moduleId)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Terapkan Pembaruan Modul</span>
                            </button>
                          </div>

                          {/* Side-by-side comparison */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-slate-300 space-y-1">
                              <span className="font-semibold text-rose-400 text-[11px] block">
                                ❌ Materi / Konsep Versi Lama:
                              </span>
                              <p className="line-through text-slate-400">{rev.diffBefore}</p>
                            </div>

                            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-slate-200 space-y-1">
                              <span className="font-semibold text-emerald-400 text-[11px] block">
                                ✅ Pembaruan yang Direkomendasikan:
                              </span>
                              <p>{rev.diffAfter}</p>
                            </div>
                          </div>

                          {/* New Topics to add */}
                          {rev.newTopicsToAdd.length > 0 && (
                            <div className="pt-2 flex flex-wrap items-center gap-1 text-[11px]">
                              <span className="text-slate-400 font-medium">Topik Baru Ditambahkan:</span>
                              {rev.newTopicsToAdd.map((top, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30"
                                >
                                  + {top}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-center text-xs text-slate-400">
                    Pembaruan ini berstatus wawasan umum dan telah tersinkronisasi pada materi ajar.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl bg-slate-900 border border-slate-800 p-6 text-slate-400">
              Pilih salah satu update dari daftar di sebelah kiri untuk melihat analisis dampak.
            </div>
          )}
        </div>
      </div>

      {/* MODAL: AI Platform Impact Scanner */}
      {isAiScannerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">AI Platform Impact Analyzer</h3>
                  <p className="text-xs text-slate-400">
                    Tempelkan berita atau rilis pembaruan platform untuk dianalisis dampaknya ke silabus.
                  </p>
                </div>
              </div>
              <button onClick={() => setIsAiScannerOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Platform Terkait:</label>
                <select
                  value={scannerPlatform}
                  onChange={(e) => setScannerPlatform(e.target.value as PlatformType)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                >
                  <option value="Instagram">Instagram (Reels, Feed, Stories, Algorithm)</option>
                  <option value="TikTok">TikTok (TikTok Shop, Affiliate, FYP)</option>
                  <option value="Meta Ads">Meta Ads (Facebook, Instagram Ads, AI Advantage+)</option>
                  <option value="YouTube">YouTube (Shorts, Monetization, Long-form)</option>
                  <option value="AI Tools">AI Generatif (Sora, Claude, ChatGPT, Gemini)</option>
                  <option value="Google & SEO">Google Search &amp; SEO Update</option>
                  <option value="Marketplace">Shopee / Tokopedia Seller Policy</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Rincian Update / Catatan Rilis Baru:
                </label>
                <textarea
                  rows={5}
                  placeholder="Contoh: Instagram mengumumkan perubahan ranking reels di mana DM shares bernilai 3x lipat dibanding likes, dan completion rate harus di atas 80%..."
                  value={scannerNews}
                  onChange={(e) => setScannerNews(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsAiScannerOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleRunAiScanner}
                disabled={isScanning || !scannerNews.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold text-xs shadow-md"
              >
                {isScanning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Menganalisis Dampak Modul...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Analisis Dampak Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
