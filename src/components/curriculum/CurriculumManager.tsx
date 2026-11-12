import React, { useState } from 'react';
import {
  Curriculum,
  CurriculumModule,
  LevelType,
  LevelTrack,
} from '../../types';
import {
  Plus,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Presentation,
  Sliders,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Trash2,
  Edit3,
  ExternalLink,
  Download,
  Share2,
} from 'lucide-react';
import { apiGenerateCurriculum } from '../../services/apiService';

interface CurriculumManagerProps {
  curriculum: Curriculum;
  onUpdateCurriculum: (updated: Curriculum) => void;
  onNavigateToAsset: (moduleId: string, assetType: 'slides' | 'worksheet' | 'module') => void;
  onTriggerAuditReviewForModule?: (moduleTitle: string) => void;
}

export const CurriculumManager: React.FC<CurriculumManagerProps> = ({
  curriculum,
  onUpdateCurriculum,
  onNavigateToAsset,
}) => {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'All' | LevelType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEditModuleModalOpen, setIsEditModuleModalOpen] = useState(false);
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [activeModuleForEdit, setActiveModuleForEdit] = useState<CurriculumModule | null>(null);
  const [targetLevelForAdd, setTargetLevelForAdd] = useState<LevelType>('Pemula');

  // AI Form state
  const [aiTopic, setAiTopic] = useState('');
  const [aiAudience, setAiAudience] = useState('Pemilik Bisnis UMKM & Content Creator');
  const [aiDuration, setAiDuration] = useState('6 Minggu (24 Sesi)');
  const [aiFocusArea, setAiFocusArea] = useState('Praktek langsung dan optimasi algoritma terbaru');
  const [aiLevels, setAiLevels] = useState<LevelType[]>(['Pemula', 'Menengah', 'Lanjutan']);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Manual Module Form state
  const [modTitle, setModTitle] = useState('');
  const [modSummary, setModSummary] = useState('');
  const [modHours, setModHours] = useState(6);
  const [modTopics, setModTopics] = useState('');
  const [modOutput, setModOutput] = useState('');
  const [modCompetency, setModCompetency] = useState('');
  const [modStatus, setModStatus] = useState<CurriculumModule['status']>('published');

  // Calculate stats
  const totalModules = curriculum.levels.reduce((acc, lvl) => acc + lvl.modules.length, 0);
  const totalHours = curriculum.levels.reduce(
    (acc, lvl) => acc + lvl.modules.reduce((mAcc, m) => mAcc + m.estimatedHours, 0),
    0
  );
  const needsUpdateCount = curriculum.levels.reduce(
    (acc, lvl) => acc + lvl.modules.filter((m) => m.status === 'needs_update').length,
    0
  );

  const handleOpenEditModule = (mod: CurriculumModule) => {
    setActiveModuleForEdit(mod);
    setModTitle(mod.title);
    setModSummary(mod.summary);
    setModHours(mod.estimatedHours);
    setModTopics(mod.topics.join('\n'));
    setModOutput(mod.practicalOutput);
    setModCompetency(mod.keyCompetency);
    setModStatus(mod.status);
    setIsEditModuleModalOpen(true);
  };

  const handleSaveEditModule = () => {
    if (!activeModuleForEdit) return;

    const updatedLevels = curriculum.levels.map((lvl) => {
      return {
        ...lvl,
        modules: lvl.modules.map((m) => {
          if (m.id === activeModuleForEdit.id) {
            return {
              ...m,
              title: modTitle,
              summary: modSummary,
              estimatedHours: Number(modHours),
              topics: modTopics.split('\n').filter((t) => t.trim().length > 0),
              practicalOutput: modOutput,
              keyCompetency: modCompetency,
              status: modStatus,
              lastReviewedDate: new Date().toISOString().split('T')[0],
            };
          }
          return m;
        }),
      };
    });

    onUpdateCurriculum({
      ...curriculum,
      lastUpdated: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      levels: updatedLevels,
    });
    setIsEditModuleModalOpen(false);
  };

  const handleOpenAddModule = (level: LevelType) => {
    setTargetLevelForAdd(level);
    setModTitle('');
    setModSummary('');
    setModHours(6);
    setModTopics('');
    setModOutput('');
    setModCompetency('');
    setModStatus('published');
    setIsAddModuleModalOpen(true);
  };

  const handleSaveNewModule = () => {
    const newModule: CurriculumModule = {
      id: `mod-${Date.now()}`,
      curriculumId: curriculum.id,
      level: targetLevelForAdd,
      title: modTitle || 'Modul Baru',
      summary: modSummary || 'Ringkasan modul...',
      estimatedHours: Number(modHours) || 4,
      topics: modTopics ? modTopics.split('\n').filter((t) => t.trim().length > 0) : ['Topik 1', 'Topik 2'],
      practicalOutput: modOutput || 'Keluaran praktis',
      keyCompetency: modCompetency || 'Kompetensi terapan',
      status: modStatus,
      lastReviewedDate: new Date().toISOString().split('T')[0],
      version: '1.0',
      slidesCount: 6,
      hasWorksheet: true,
      hasGuide: true,
    };

    const updatedLevels = curriculum.levels.map((lvl) => {
      if (lvl.level === targetLevelForAdd) {
        return {
          ...lvl,
          modules: [...lvl.modules, newModule],
        };
      }
      return lvl;
    });

    onUpdateCurriculum({
      ...curriculum,
      levels: updatedLevels,
      lastUpdated: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
    });
    setIsAddModuleModalOpen(false);
  };

  const handleDeleteModule = (moduleId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus modul ini dari silabus?')) return;
    const updatedLevels = curriculum.levels.map((lvl) => ({
      ...lvl,
      modules: lvl.modules.filter((m) => m.id !== moduleId),
    }));
    onUpdateCurriculum({
      ...curriculum,
      levels: updatedLevels,
    });
  };

  const handleMoveModule = (level: LevelType, index: number, direction: 'up' | 'down') => {
    const targetTrack = curriculum.levels.find((l) => l.level === level);
    if (!targetTrack) return;
    const newModules = [...targetTrack.modules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newModules.length) return;

    const temp = newModules[index];
    newModules[index] = newModules[targetIndex];
    newModules[targetIndex] = temp;

    const updatedLevels = curriculum.levels.map((lvl) => {
      if (lvl.level === level) {
        return { ...lvl, modules: newModules };
      }
      return lvl;
    });

    onUpdateCurriculum({ ...curriculum, levels: updatedLevels });
  };

  const handleGenerateCurriculumAi = async () => {
    if (!aiTopic.trim()) return;
    setIsGeneratingAi(true);

    try {
      const generated = await apiGenerateCurriculum({
        topic: aiTopic,
        targetAudience: aiAudience,
        duration: aiDuration,
        levels: aiLevels,
        focusArea: aiFocusArea,
      });

      const newCurr: Curriculum = {
        id: `curr-${Date.now()}`,
        title: generated.title || `Kurikulum: ${aiTopic}`,
        description: generated.description || 'Kurikulum hasil perancangan AI',
        category: generated.category || 'Digital & Business Mastery',
        targetAudience: generated.targetAudience || aiAudience,
        duration: generated.duration || aiDuration,
        version: 'v1.0',
        lastUpdated: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        tags: generated.tags || ['Mastery', 'Praktik'],
        learningOutcomes: generated.learningOutcomes || [
          'Memahami strategi komprehensif dari awal hingga akhir',
          'Mampu mengeksekusi secara mandiri',
        ],
        prerequisites: generated.prerequisites || ['Komitmen waktu praktik'],
        levels: (generated.levels || []).map((lvl) => ({
          ...lvl,
          modules: (lvl.modules || []).map((m: any, mIdx: number) => ({
            id: m.id || `mod-${Date.now()}-${lvl.level}-${mIdx}`,
            curriculumId: `curr-${Date.now()}`,
            level: lvl.level,
            title: m.title || `Modul ${mIdx + 1}`,
            summary: m.summary || 'Deskripsi materi...',
            estimatedHours: m.estimatedHours || 5,
            topics: m.topics || ['Konsep Dasar', 'Praktek Lapangan'],
            practicalOutput: m.practicalOutput || 'Output praktik terukur',
            keyCompetency: m.keyCompetency || 'Kompetensi terapan',
            status: 'published',
            lastReviewedDate: new Date().toISOString().split('T')[0],
            version: '1.0',
            slidesCount: 7,
            hasWorksheet: true,
            hasGuide: true,
          })),
        })),
      };

      onUpdateCurriculum(newCurr);
      setIsAiModalOpen(false);
      setAiTopic('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleExportCurriculumMarkdown = () => {
    let md = `# ${curriculum.title}\n\n`;
    md += `> **Kategori**: ${curriculum.category} | **Versi**: ${curriculum.version} | **Durasi**: ${curriculum.duration}\n\n`;
    md += `## Deskripsi Program\n${curriculum.description}\n\n`;
    md += `**Target Audiens**: ${curriculum.targetAudience}\n\n`;
    md += `### Capaian Pembelajaran (Learning Outcomes)\n`;
    curriculum.learningOutcomes.forEach((lo) => (md += `- ${lo}\n`));
    md += `\n### Prasyarat (Prerequisites)\n`;
    curriculum.prerequisites.forEach((p) => (md += `- ${p}\n`));
    md += `\n---\n\n`;

    curriculum.levels.forEach((lvl) => {
      md += `## LEVEL ${lvl.level.toUpperCase()}\n*Tujuan*: ${lvl.objective}\n\n`;
      lvl.modules.forEach((mod, idx) => {
        md += `### ${idx + 1}. ${mod.title} (${mod.estimatedHours} Jam - v${mod.version})\n`;
        md += `${mod.summary}\n\n`;
        md += `**Kompetensi Utama**: ${mod.keyCompetency}\n`;
        md += `**Keluaran Praktik**: ${mod.practicalOutput}\n`;
        md += `**Topik Bahasan**:\n`;
        mod.topics.forEach((t) => (md += `  - ${t}\n`));
        md += `\n`;
      });
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Silabus-${curriculum.title.replace(/\s+/g, '_')}.md`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* 1. Hero Card: Curriculum Overview & Actions */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800 border border-slate-700/80 p-6 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {curriculum.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {curriculum.version}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Diperbarui: {curriculum.lastUpdated}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {curriculum.title}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {curriculum.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-slate-400 font-medium block">🎯 Target Audiens:</span>
                <span className="text-slate-200">{curriculum.targetAudience}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-slate-400 font-medium block">⏱️ Estimasi Total Waktu:</span>
                <span className="text-slate-200">{curriculum.duration} ({totalHours} Jam Pembelajaran)</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics & CTA */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <div className="grid grid-cols-3 lg:grid-cols-3 gap-2 text-center p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <div>
                <span className="text-xl font-bold text-white block">{totalModules}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Modul</span>
              </div>
              <div>
                <span className="text-xl font-bold text-indigo-400 block">{curriculum.levels.length}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Level</span>
              </div>
              <div>
                <span className={`text-xl font-bold block ${needsUpdateCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {needsUpdateCount}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Perlu Sync</span>
              </div>
            </div>

            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Rancang Silabus via AI</span>
            </button>

            <button
              onClick={handleExportCurriculumMarkdown}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Silabus (MD)</span>
            </button>
          </div>
        </div>

        {/* Learning Outcomes Accordion Summary */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Capaian Utama:</span>
          {curriculum.learningOutcomes.slice(0, 3).map((out, idx) => (
            <span key={idx} className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {out}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Visual Learning Path Roadmap Flowchart */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Visualisasi Alur Belajar Berjenjang (Learning Roadmap)
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Dari Pemula hingga Mahir &amp; Siap Menghasilkan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {curriculum.levels.map((lvl, index) => {
            const isFirst = index === 0;
            const isLast = index === curriculum.levels.length - 1;
            return (
              <div
                key={lvl.level}
                className={`relative rounded-xl border p-4 transition-all ${
                  selectedLevelFilter === lvl.level
                    ? 'bg-slate-800/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Level Header Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${lvl.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}
                    >
                      {index + 1}
                    </span>
                    <span className="font-bold text-white text-sm">Level {lvl.level}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {lvl.modules.length} Modul
                  </span>
                </div>

                <p className="text-xs text-slate-300 min-h-[38px] leading-relaxed mb-3">
                  {lvl.objective}
                </p>

                {/* Modules Mini-Pills */}
                <div className="space-y-1.5">
                  {lvl.modules.map((m, mIdx) => (
                    <div
                      key={m.id}
                      onClick={() => handleOpenEditModule(m)}
                      className="group flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-800/80 hover:border-indigo-500/60 hover:bg-slate-850 cursor-pointer transition-all text-xs"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="text-[10px] font-mono text-slate-500">{mIdx + 1}.</span>
                        <span className="text-slate-200 group-hover:text-indigo-300 truncate font-medium">
                          {m.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                        {m.estimatedHours}h
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenAddModule(lvl.level)}
                    className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Modul
                  </button>
                  <button
                    onClick={() => setSelectedLevelFilter(selectedLevelFilter === lvl.level ? 'All' : lvl.level)}
                    className="text-[11px] text-slate-400 hover:text-slate-200 underline decoration-dotted"
                  >
                    {selectedLevelFilter === lvl.level ? 'Tampilkan Semua' : 'Filter Level Ini'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Syllabus Outline & Module Manager */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Silabus Rinci &amp; Daftar Modul</h2>
            <p className="text-xs text-slate-400">
              Rancang topik, slide presentasi, worksheet praktik, dan pantau status revisi tiap modul.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Level Filter Tabs */}
            <div className="flex p-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
              {(['All', 'Pemula', 'Menengah', 'Lanjutan'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevelFilter(lvl)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    selectedLevelFilter === lvl
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl === 'All' ? 'Semua Level' : lvl}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Cari modul atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 sm:w-56 px-3 py-1.5 text-xs rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Module Cards Grid */}
        <div className="space-y-4">
          {curriculum.levels
            .filter((lvl) => selectedLevelFilter === 'All' || lvl.level === selectedLevelFilter)
            .map((lvl) => {
              const filteredModules = lvl.modules.filter(
                (m) =>
                  m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
              );

              if (filteredModules.length === 0 && searchQuery) return null;

              return (
                <div key={lvl.level} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${lvl.color}`} />
                      <h3 className="font-bold text-sm text-white uppercase tracking-wide">
                        Jalur {lvl.level} ({lvl.modules.length} Modul)
                      </h3>
                      <span className="text-xs text-slate-400 hidden sm:inline">• {lvl.objective}</span>
                    </div>

                    <button
                      onClick={() => handleOpenAddModule(lvl.level)}
                      className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Tambah ke {lvl.level}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {filteredModules.map((mod, idx) => (
                      <div
                        key={mod.id}
                        className="rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700/80 p-4 transition-all"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-bold text-slate-400">
                                #{idx + 1}
                              </span>
                              <h4 className="font-bold text-base text-white hover:text-indigo-300 transition-colors cursor-pointer" onClick={() => handleOpenEditModule(mod)}>
                                {mod.title}
                              </h4>
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                                v{mod.version}
                              </span>

                              {mod.status === 'published' && (
                                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Siap Diajarkan
                                </span>
                              )}
                              {mod.status === 'needs_update' && (
                                <span className="flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 animate-pulse">
                                  <AlertTriangle className="w-3 h-3" />
                                  Perlu Update Platform
                                </span>
                              )}
                              {mod.status === 'draft' && (
                                <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                                  Draf
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">
                              {mod.summary}
                            </p>

                            {/* Topics Tags */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[11px] text-slate-500 font-semibold mr-1">Topik:</span>
                              {mod.topics.map((t, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            {/* Output & Competency */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px]">
                              <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80">
                                <span className="text-indigo-400 font-semibold block">🎯 Keluaran Praktik:</span>
                                <span className="text-slate-300">{mod.practicalOutput}</span>
                              </div>
                              <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80">
                                <span className="text-purple-400 font-semibold block">🏆 Kompetensi Utama:</span>
                                <span className="text-slate-300">{mod.keyCompetency}</span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleMoveModule(lvl.level, idx, 'up')}
                                disabled={idx === 0}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 disabled:opacity-30 disabled:pointer-events-none"
                                title="Pindahkan Ke Atas"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleMoveModule(lvl.level, idx, 'down')}
                                disabled={idx === lvl.modules.length - 1}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 disabled:opacity-30 disabled:pointer-events-none"
                                title="Pindahkan Ke Bawah"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleOpenEditModule(mod)}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                                title="Edit Rincian Modul"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteModule(mod.id)}
                                className="p-1 rounded bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                                title="Hapus Modul"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Direct Asset Studio Navigators */}
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => onNavigateToAsset(mod.id, 'slides')}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 text-[11px] font-medium transition-colors"
                                title="Buka Slide Presentasi Modul Ini"
                              >
                                <Presentation className="w-3 h-3" />
                                <span>Slide ({mod.slidesCount || 7})</span>
                              </button>

                              <button
                                onClick={() => onNavigateToAsset(mod.id, 'worksheet')}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 text-[11px] font-medium transition-colors"
                                title="Buka Lembar Kerja Siswa"
                              >
                                <FileText className="w-3 h-3" />
                                <span>Worksheet</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* MODAL: AI Curriculum Generator */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">AI Curriculum &amp; Syllabus Architect</h3>
                  <p className="text-xs text-slate-400">
                    Otomatis rancang kurikulum berjenjang (Pemula, Menengah, Lanjutan) siap pakai.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Topik / Judul Program Pelatihan:
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Digital Marketing 360 &amp; Performance Ads 2026, TikTok Shop Livestreaming..."
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Target Audiens:</label>
                  <input
                    type="text"
                    value={aiAudience}
                    onChange={(e) => setAiAudience(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Estimasi Durasi Program:</label>
                  <input
                    type="text"
                    value={aiDuration}
                    onChange={(e) => setAiDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Fokus Spesifik / Keluaran:</label>
                <input
                  type="text"
                  value={aiFocusArea}
                  onChange={(e) => setAiFocusArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Level yang Dibuat:</label>
                <div className="flex items-center gap-4">
                  {(['Pemula', 'Menengah', 'Lanjutan'] as LevelType[]).map((lvl) => (
                    <label key={lvl} className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={aiLevels.includes(lvl)}
                        onChange={(e) => {
                          if (e.target.checked) setAiLevels([...aiLevels, lvl]);
                          else if (aiLevels.length > 1) setAiLevels(aiLevels.filter((l) => l !== lvl));
                        }}
                        className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs"
              >
                Batal
              </button>
              <button
                onClick={handleGenerateCurriculumAi}
                disabled={isGeneratingAi || !aiTopic.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
              >
                {isGeneratingAi ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Sedang Merancang Kurikulum...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-indigo-200" />
                    <span>Generate Kurikulum Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Edit Module */}
      {isEditModuleModalOpen && activeModuleForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Edit Rincian Modul ({activeModuleForEdit.level})</h3>
              <button onClick={() => setIsEditModuleModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Judul Modul:</label>
                <input
                  type="text"
                  value={modTitle}
                  onChange={(e) => setModTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Ringkasan Materi:</label>
                <textarea
                  rows={3}
                  value={modSummary}
                  onChange={(e) => setModSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Estimasi Jam Belajar:</label>
                  <input
                    type="number"
                    value={modHours}
                    onChange={(e) => setModHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Status Modul:</label>
                  <select
                    value={modStatus}
                    onChange={(e) => setModStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="published">Siap Diajarkan (Published)</option>
                    <option value="needs_update">Perlu Update Platform</option>
                    <option value="draft">Draf (Sedang Disusun)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Daftar Topik Bahasan (1 baris per topik):</label>
                <textarea
                  rows={4}
                  value={modTopics}
                  onChange={(e) => setModTopics(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Keluaran Praktik (Deliverable):</label>
                <input
                  type="text"
                  value={modOutput}
                  onChange={(e) => setModOutput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Standar Kompetensi Kunci:</label>
                <input
                  type="text"
                  value={modCompetency}
                  onChange={(e) => setModCompetency(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsEditModuleModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEditModule}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add New Module */}
      {isAddModuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Tambah Modul Baru ke Level {targetLevelForAdd}</h3>
              <button onClick={() => setIsAddModuleModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Pilih Level Jalur:</label>
                <select
                  value={targetLevelForAdd}
                  onChange={(e) => setTargetLevelForAdd(e.target.value as LevelType)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                >
                  <option value="Pemula">Level Pemula</option>
                  <option value="Menengah">Level Menengah</option>
                  <option value="Lanjutan">Level Lanjutan</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Judul Modul:</label>
                <input
                  type="text"
                  placeholder="Misal: Optimasi Copywriting Penawaran Terbatas"
                  value={modTitle}
                  onChange={(e) => setModTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Ringkasan Materi:</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan apa yang dipelajari dan urgensi materi ini..."
                  value={modSummary}
                  onChange={(e) => setModSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Estimasi Jam:</label>
                  <input
                    type="number"
                    value={modHours}
                    onChange={(e) => setModHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Status:</label>
                  <select
                    value={modStatus}
                    onChange={(e) => setModStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                  >
                    <option value="published">Siap Diajarkan</option>
                    <option value="draft">Draf</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Topik Bahasan (1 baris per topik):</label>
                <textarea
                  rows={3}
                  placeholder="Topik 1&#10;Topik 2&#10;Topik 3"
                  value={modTopics}
                  onChange={(e) => setModTopics(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Keluaran Praktik:</label>
                <input
                  type="text"
                  placeholder="Misal: 1 Naskah Penawaran Siap Rilis"
                  value={modOutput}
                  onChange={(e) => setModOutput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Kompetensi Utama:</label>
                <input
                  type="text"
                  placeholder="Misal: Direct Response Copywriting"
                  value={modCompetency}
                  onChange={(e) => setModCompetency(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsAddModuleModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleSaveNewModule}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
              >
                Tambah Modul
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
