import React, { useState } from 'react';
import {
  MemberAccountAudit,
  Curriculum,
  PlatformType,
  AuditScoreBreakdown,
} from '../../types';
import {
  UserCheck,
  Sparkles,
  Plus,
  Printer,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Share2,
  ExternalLink,
  MessageCircle,
  Search,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { apiGenerateAccountAudit } from '../../services/apiService';
import confetti from 'canvas-confetti';

interface AccountAuditReviewProps {
  curriculum: Curriculum;
  audits: MemberAccountAudit[];
  onUpdateAudits: (audits: MemberAccountAudit[]) => void;
  onNavigateToCurriculumModule?: (moduleId: string) => void;
}

export const AccountAuditReview: React.FC<AccountAuditReviewProps> = ({
  curriculum,
  audits,
  onUpdateAudits,
  onNavigateToCurriculumModule,
}) => {
  const [selectedAuditId, setSelectedAuditId] = useState<string>(audits[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Baru' | 'Dalam Pembinaan' | 'Selesai'>('All');
  const [isNewAuditModalOpen, setIsNewAuditModalOpen] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);

  // New Audit Wizard Form State
  const [newClientName, setNewClientName] = useState('');
  const [newPlatform, setNewPlatform] = useState<PlatformType>('Instagram');
  const [newAccountHandle, setNewAccountHandle] = useState('');
  const [newNiche, setNewNiche] = useState('');
  const [newFollowers, setNewFollowers] = useState('');
  const [newCurrentBio, setNewCurrentBio] = useState('');
  const [newFrequency, setNewFrequency] = useState('3x per minggu (Reels & Feed)');
  const [newGoalOrComplaint, setNewGoalOrComplaint] = useState('');
  const [isAuditingAi, setIsAuditingAi] = useState(false);

  // Active Audit Selection
  const activeAudit = audits.find((a) => a.id === selectedAuditId) || audits[0];

  // All modules in active curriculum
  const allCurriculumModules = curriculum.levels.flatMap((lvl) => lvl.modules);

  // Filtered Audits
  const filteredAudits = audits.filter((a) => {
    const matchSearch =
      a.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.accountHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.niche.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = (auditId: string, newStatus: MemberAccountAudit['status']) => {
    const updated = audits.map((a) => (a.id === auditId ? { ...a, status: newStatus } : a));
    onUpdateAudits(updated);
    if (newStatus === 'Selesai') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleCopyWhatsappSummary = () => {
    if (!activeAudit) return;

    let text = `*HASIL AUDIT & REKOMENDASI AKUN MEMBER*\n`;
    text += `Program: ${curriculum.title}\n`;
    text += `👤 *Member*: ${activeAudit.clientName} (${activeAudit.accountHandle})\n`;
    text += `📊 *Skor Akun*: ${activeAudit.overallScore}/100\n`;
    text += `📅 *Tanggal*: ${activeAudit.auditDate}\n\n`;

    text += `*RINGKASAN DIAGNOSIS:*\n${activeAudit.executiveSummary}\n\n`;

    text += `*⚡ 3 TINDAKAN CEPAT (QUICK WINS < 48 JAM):*\n`;
    activeAudit.quickWins.forEach((qw, idx) => (text += `${idx + 1}. ${qw}\n`));

    text += `\n*PROPOSAL MAKEOVER BIO:*\n`;
    text += `Headline: ${activeAudit.bioImprovementProposal.recommendedHeadline}\n`;
    activeAudit.bioImprovementProposal.bulletPoints.forEach((bp) => (text += `${bp}\n`));
    text += `${activeAudit.bioImprovementProposal.ctaWording}\n\n`;

    text += `*MODUL KURIKULUM YANG WAJIB DIPELAJARI:*\n`;
    activeAudit.recommendedModulesToStudy.forEach((mod, idx) => {
      text += `📌 *${mod.moduleTitle}* (${mod.priority})\n   Alasan: ${mod.whyImportant}\n`;
    });

    text += `\n_Semangat bertumbuh! Silakan diskusikan jika ada pertanyaan._`;

    navigator.clipboard.writeText(text);
    setCopiedWhatsapp(true);
    setTimeout(() => setCopiedWhatsapp(false), 2500);
  };

  const handleRunNewAuditAi = async () => {
    if (!newClientName.trim() || !newAccountHandle.trim()) return;
    setIsAuditingAi(true);

    try {
      const availableMods = allCurriculumModules.map((m) => ({ id: m.id, title: m.title }));
      const newAudit = await apiGenerateAccountAudit({
        clientName: newClientName,
        platform: newPlatform,
        accountHandle: newAccountHandle.startsWith('@') ? newAccountHandle : `@${newAccountHandle}`,
        niche: newNiche || 'Bisnis & Jasa',
        followersCount: newFollowers || '1.000',
        currentBio: newCurrentBio || 'Bio akun saat ini',
        contentFrequency: newFrequency,
        topComplaintsOrGoal: newGoalOrComplaint || 'Menaikkan views dan penjualan',
        availableModules: availableMods,
      });

      onUpdateAudits([newAudit, ...audits]);
      setSelectedAuditId(newAudit.id);
      setIsNewAuditModalOpen(false);

      // Reset form
      setNewClientName('');
      setNewAccountHandle('');
      setNewNiche('');
      setNewFollowers('');
      setNewCurrentBio('');
      setNewGoalOrComplaint('');

      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.7 },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuditingAi(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-700/80 p-6 shadow-xl no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                Review &amp; Rekomendasi Akun Member
              </span>
              <span className="text-xs text-slate-400">
                Pilar Evaluasi Mandiri &amp; Coaching Komprehensif
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Audit Akun Klien &amp; Penugasan Modul Kurikulum
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Lakukan review mendalam terhadap profil bio, retensi video hook, funnel konversi WA, dan berikan rekomendasi modul ajar yang tepat dari kurikulum Anda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => setIsNewAuditModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>+ Audit Akun Member Baru</span>
            </button>

            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
              <span className="text-slate-400">Total Member Terdaftar:</span>
              <span className="font-bold text-emerald-400 font-mono">
                {audits.length} Akun
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Layout: Left Directory & Right Full Audit Report */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Member Directory */}
        <div className="lg:col-span-4 space-y-3 no-print">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Daftar Member &amp; Klien ({filteredAudits.length})
            </h3>

            <div className="flex items-center gap-1">
              {(['All', 'Dalam Pembinaan', 'Selesai'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors ${
                    statusFilter === st
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st === 'All' ? 'Semua' : st}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama member, handle, niche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Cards List */}
          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {filteredAudits.map((a) => {
              const isSelected = activeAudit?.id === a.id;
              const badgeStyle =
                a.status === 'Selesai'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : a.status === 'Dalam Pembinaan'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';

              return (
                <div
                  key={a.id}
                  onClick={() => setSelectedAuditId(a.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-850 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-emerald-400 shrink-0">
                        {a.clientName.charAt(0)}
                      </div>
                      <div className="truncate">
                        <h4 className="font-bold text-xs text-white truncate">
                          {a.clientName}
                        </h4>
                        <span className="font-mono text-[11px] text-emerald-400 block truncate">
                          {a.accountHandle}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md border ${getScoreColor(a.overallScore)}`}>
                        {a.overallScore}/100
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 truncate max-w-[150px]">
                      {a.platform} • {a.niche}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-semibold border ${badgeStyle}`}>
                      {a.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Audit & Recommendation Report */}
        <div className="lg:col-span-8">
          {activeAudit ? (
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 print-card">
              {/* Report Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {activeAudit.platform} Audit Report
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Tanggal Audit: {activeAudit.auditDate}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    {activeAudit.clientName}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="font-mono text-emerald-400 font-bold">
                      {activeAudit.accountHandle}
                    </span>
                    <span>• Niche: {activeAudit.niche}</span>
                    <span>• Followers: {activeAudit.followersCount}</span>
                  </div>
                </div>

                {/* Report Actions */}
                <div className="flex flex-wrap items-center gap-2 no-print">
                  <button
                    onClick={handleCopyWhatsappSummary}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors"
                    title="Salin Rangkuman untuk WhatsApp"
                  >
                    {copiedWhatsapp ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Kirim WA</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak PDF</span>
                  </button>

                  <select
                    value={activeAudit.status}
                    onChange={(e) => handleUpdateStatus(activeAudit.id, e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 focus:outline-none"
                  >
                    <option value="Baru">Status: Baru</option>
                    <option value="Dalam Pembinaan">Status: Dalam Pembinaan</option>
                    <option value="Selesai">Status: Selesai</option>
                  </select>
                </div>
              </div>

              {/* Scorecard Hero: Overall & 5 Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Total Score Circle */}
                <div className="md:col-span-4 p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Skor Audit Akun
                  </span>
                  <div className="my-2">
                    <span className={`text-4xl font-extrabold font-mono block ${getScoreColor(activeAudit.overallScore).split(' ')[0]}`}>
                      {activeAudit.overallScore}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">dari 100 poin</span>
                  </div>
                  <span className="text-xs text-slate-300 font-medium px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                    {activeAudit.overallScore >= 75
                      ? 'Status: Sangat Potensial'
                      : activeAudit.overallScore >= 60
                      ? 'Status: Butuh Optimasi Funnel'
                      : 'Status: Perlu Restrukturisasi Total'}
                  </span>
                </div>

                {/* 5 Pillars Progress Bars */}
                <div className="md:col-span-8 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px] block">
                    Penilaian 5 Pilar Fondasi Akun:
                  </span>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span className="text-slate-300 font-medium">1. Optimasi Bio &amp; Profil (SEO, Foto, Link)</span>
                        <span className="font-mono text-emerald-400">{activeAudit.scoreBreakdown.profileBioOptimization}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${activeAudit.scoreBreakdown.profileBioOptimization}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span className="text-slate-300 font-medium">2. Kekuatan Hook 3 Detik &amp; Kualitas Video</span>
                        <span className="font-mono text-indigo-400">{activeAudit.scoreBreakdown.contentHookAndQuality}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${activeAudit.scoreBreakdown.contentHookAndQuality}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span className="text-slate-300 font-medium">3. Interaksi Komunitas &amp; Engagement Story</span>
                        <span className="font-mono text-purple-400">{activeAudit.scoreBreakdown.engagementAndCommunity}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${activeAudit.scoreBreakdown.engagementAndCommunity}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span className="text-slate-300 font-medium">4. Alur Konversi &amp; Call To Action (CTA WA)</span>
                        <span className="font-mono text-amber-400">{activeAudit.scoreBreakdown.funnelAndConversionCTA}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${activeAudit.scoreBreakdown.funnelAndConversionCTA}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span className="text-slate-300 font-medium">5. Konsistensi Branding &amp; Jadwal Upload</span>
                        <span className="font-mono text-cyan-400">{activeAudit.scoreBreakdown.consistencyAndBranding}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${activeAudit.scoreBreakdown.consistencyAndBranding}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block">
                  📋 Kesimpulan &amp; Diagnosis Konsultan:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activeAudit.executiveSummary}
                </p>
              </div>

              {/* SWOT Analysis Grid */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Matriks Analisis SWOT Akun:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1.5">
                    <span className="font-bold text-emerald-400 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Strengths (Kekuatan Utama):
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {activeAudit.swotAnalysis.strengths.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1.5">
                    <span className="font-bold text-rose-400 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Weaknesses (Kelemahan / Hambatan):
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {activeAudit.swotAnalysis.weaknesses.map((w, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 space-y-1.5">
                    <span className="font-bold text-cyan-400 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Opportunities (Peluang Pertumbuhan):
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {activeAudit.swotAnalysis.opportunities.map((o, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-1.5">
                    <span className="font-bold text-amber-400 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Threats (Tantangan / Kompetisi):
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {activeAudit.swotAnalysis.threats.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ⚡ Quick Wins (< 48 Jam) */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  ⚡ 3 Tindakan Cepat (Quick Wins &lt; 48 Jam):
                </span>
                <div className="space-y-2 pt-1">
                  {activeAudit.quickWins.map((qw, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{qw}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proposal Makeover Bio */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    ✍️ Rekomendasi Format Teks Bio Baru (Makeover):
                  </span>
                  <span className="text-[10px] text-slate-400">Siap Copy-Paste</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-700/80 font-mono text-xs text-slate-200 space-y-1">
                  <p className="font-bold text-white">{activeAudit.bioImprovementProposal.recommendedHeadline}</p>
                  {activeAudit.bioImprovementProposal.bulletPoints.map((bp, idx) => (
                    <p key={idx}>{bp}</p>
                  ))}
                  <p className="text-emerald-400 font-semibold pt-1">
                    {activeAudit.bioImprovementProposal.ctaWording}
                  </p>
                </div>
              </div>

              {/* Rekomendasi Modul Kurikulum (Integration) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    Penugasan Modul Kurikulum Terkait (Wajib Dipelajari Member):
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Dari Silabus: {curriculum.title}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeAudit.recommendedModulesToStudy.map((rec, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs truncate pr-2">
                          {rec.moduleTitle}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          rec.priority === 'Tinggi'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          Prioritas {rec.priority}
                        </span>
                      </div>

                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {rec.whyImportant}
                      </p>

                      {rec.moduleId && onNavigateToCurriculumModule && (
                        <button
                          onClick={() => onNavigateToCurriculumModule(rec.moduleId!)}
                          className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold pt-1"
                        >
                          <span>Buka Materi Modul Ini</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 30-Day Action Plan Weekly Roadmap */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  📅 Roadmap Pembinaan 30 Hari (Minggu 1 s/d 4):
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeAudit.thirtyDayActionPlan.map((plan, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5"
                    >
                      <span className="font-bold text-indigo-400 font-mono text-[11px] block">
                        {plan.week}
                      </span>
                      <h4 className="font-bold text-white text-xs">{plan.focus}</h4>
                      <ul className="space-y-1 text-slate-300 pt-1 text-[11px]">
                        {plan.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5">
                            <span className="text-slate-500">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl bg-slate-900 border border-slate-800 p-6 text-slate-400">
              Pilih salah satu akun member di kolom kiri atau buat audit baru.
            </div>
          )}
        </div>
      </div>

      {/* MODAL: New Account Audit Wizard */}
      {isNewAuditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Audit &amp; Review Akun Member Baru</h3>
                  <p className="text-xs text-slate-400">
                    Sistem AI akan menganalisis profil dan merekomendasikan modul kurikulum secara otomatis.
                  </p>
                </div>
              </div>
              <button onClick={() => setIsNewAuditModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Nama Member / Brand Klien:</label>
                  <input
                    type="text"
                    placeholder="Contoh: Rian Pratama (Roti Manis Enak)"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Platform Utama:</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok &amp; TikTok Shop</option>
                    <option value="YouTube">YouTube Shorts &amp; Channel</option>
                    <option value="LinkedIn">LinkedIn &amp; Personal Brand</option>
                    <option value="Marketplace">Shopee / Tokopedia</option>
                    <option value="Meta Ads">Meta Ads Manager</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Username / Handle Akun:</label>
                  <input
                    type="text"
                    placeholder="@rotimanisenak.id"
                    value={newAccountHandle}
                    onChange={(e) => setNewAccountHandle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Niche / Industri Bisnis:</label>
                  <input
                    type="text"
                    placeholder="Kuliner Roti / Bakery"
                    value={newNiche}
                    onChange={(e) => setNewNiche(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Jumlah Followers Saat Ini:</label>
                  <input
                    type="text"
                    placeholder="2.500"
                    value={newFollowers}
                    onChange={(e) => setNewFollowers(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Teks Bio Akun Saat Ini:</label>
                <textarea
                  rows={2}
                  placeholder="Salin teks bio akun persis seperti yang tampil saat ini..."
                  value={newCurrentBio}
                  onChange={(e) => setNewCurrentBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Frekuensi Posting Konten:</label>
                  <input
                    type="text"
                    placeholder="3x seminggu Reels &amp; 1x Feed"
                    value={newFrequency}
                    onChange={(e) => setNewFrequency(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Keluhan Utama / Target Member:</label>
                  <input
                    type="text"
                    placeholder="Views mentok di 200, pesanan sepi, ingin closing via WA..."
                    value={newGoalOrComplaint}
                    onChange={(e) => setNewGoalOrComplaint(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsNewAuditModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleRunNewAuditAi}
                disabled={isAuditingAi || !newClientName.trim() || !newAccountHandle.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs shadow-md"
              >
                {isAuditingAi ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Menganalisis Akun &amp; Modul...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Jalankan Audit AI Sekarang</span>
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
