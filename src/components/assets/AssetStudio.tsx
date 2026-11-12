import React, { useState } from 'react';
import {
  Curriculum,
  CurriculumModule,
  SlideDeck,
  SlideItem,
  Worksheet,
  PracticalTemplate,
} from '../../types';
import {
  Presentation,
  FileText,
  BookmarkCheck,
  Copy,
  Check,
  Sparkles,
  Download,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Plus,
  Trash2,
  Printer,
  BookOpen,
  Info,
  Clock,
  Award,
  Layers,
  CheckSquare,
} from 'lucide-react';
import { apiGenerateSlides, apiGenerateWorksheet } from '../../services/apiService';

interface AssetStudioProps {
  curriculum: Curriculum;
  slideDecks: SlideDeck[];
  onUpdateSlideDecks: (decks: SlideDeck[]) => void;
  worksheets: Worksheet[];
  onUpdateWorksheets: (worksheets: Worksheet[]) => void;
  templates: PracticalTemplate[];
  onUpdateTemplates: (templates: PracticalTemplate[]) => void;
  initialSelectedModuleId?: string;
  initialSubTab?: 'slides' | 'worksheet' | 'templates' | 'guide';
}

export const AssetStudio: React.FC<AssetStudioProps> = ({
  curriculum,
  slideDecks,
  onUpdateSlideDecks,
  worksheets,
  onUpdateWorksheets,
  templates,
  onUpdateTemplates,
  initialSelectedModuleId,
  initialSubTab = 'slides',
}) => {
  // All modules flattened from curriculum
  const allModules: CurriculumModule[] = curriculum.levels.flatMap((lvl) => lvl.modules);

  const [selectedSubTab, setSelectedSubTab] = useState<'slides' | 'worksheet' | 'templates' | 'guide'>(
    initialSubTab
  );
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    initialSelectedModuleId || (allModules[0] ? allModules[0].id : '')
  );

  // Slide Deck State
  const currentModule = allModules.find((m) => m.id === selectedModuleId) || allModules[0];
  const currentDeck = slideDecks.find((d) => d.moduleId === selectedModuleId) || slideDecks[0];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreenPresentation, setIsFullscreenPresentation] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isGeneratingSlides, setIsGeneratingSlides] = useState(false);

  // Worksheet State
  const currentWorksheet =
    worksheets.find((w) => w.moduleId === selectedModuleId) || worksheets[0];
  const [worksheetFormData, setWorksheetFormData] = useState<Record<string, any>>({});
  const [isGeneratingWorksheet, setIsGeneratingWorksheet] = useState(false);

  // Template State
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState<string>('All');
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<PracticalTemplate>(templates[0]);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [newTplTitle, setNewTplTitle] = useState('');
  const [newTplCategory, setNewTplCategory] = useState<PracticalTemplate['category']>('Copywriting');
  const [newTplContent, setNewTplContent] = useState('');

  // Handle Copy
  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplateId(id);
    setTimeout(() => setCopiedTemplateId(null), 2500);
  };

  // Generate Slides via AI
  const handleGenerateSlidesAi = async () => {
    if (!currentModule) return;
    setIsGeneratingSlides(true);

    try {
      const result = await apiGenerateSlides({
        moduleTitle: currentModule.title,
        level: currentModule.level,
        keyTopics: currentModule.topics.join(', '),
        audience: curriculum.targetAudience,
      });

      const updatedDeck: SlideDeck = {
        id: currentDeck ? currentDeck.id : `deck-${Date.now()}`,
        moduleId: currentModule.id,
        moduleTitle: currentModule.title,
        deckTitle: result.deckTitle,
        lastModified: new Date().toISOString().split('T')[0],
        theme: currentDeck ? currentDeck.theme : 'indigo',
        slides: result.slides,
      };

      const existingIndex = slideDecks.findIndex((d) => d.moduleId === currentModule.id);
      let newDecks = [...slideDecks];
      if (existingIndex >= 0) {
        newDecks[existingIndex] = updatedDeck;
      } else {
        newDecks.push(updatedDeck);
      }

      onUpdateSlideDecks(newDecks);
      setCurrentSlideIndex(0);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingSlides(false);
    }
  };

  // Generate Worksheet via AI
  const handleGenerateWorksheetAi = async () => {
    if (!currentModule) return;
    setIsGeneratingWorksheet(true);

    try {
      const result = await apiGenerateWorksheet({
        moduleTitle: currentModule.title,
        level: currentModule.level,
        objective: currentModule.practicalOutput,
      });

      const updatedWs: Worksheet = {
        id: currentWorksheet ? currentWorksheet.id : `ws-${Date.now()}`,
        moduleId: currentModule.id,
        moduleTitle: currentModule.title,
        title: result.title || `Lembar Kerja: ${currentModule.title}`,
        objective: result.objective || currentModule.practicalOutput,
        estimatedTimeMinutes: result.estimatedTimeMinutes || 45,
        sections: result.sections || [],
        practicalSteps: result.practicalSteps || [],
        evaluationRubric: result.evaluationRubric || [],
        lastModified: new Date().toISOString().split('T')[0],
      };

      const existingIndex = worksheets.findIndex((w) => w.moduleId === currentModule.id);
      let newWorksheets = [...worksheets];
      if (existingIndex >= 0) {
        newWorksheets[existingIndex] = updatedWs;
      } else {
        newWorksheets.push(updatedWs);
      }

      onUpdateWorksheets(newWorksheets);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingWorksheet(false);
    }
  };

  // Export Slide Deck Markdown
  const handleExportSlideMarkdown = () => {
    if (!currentDeck) return;
    let md = `# ${currentDeck.deckTitle}\n\n`;
    md += `**Modul**: ${currentDeck.moduleTitle} | **Terakhir Diperbarui**: ${currentDeck.lastModified}\n\n---\n\n`;

    currentDeck.slides.forEach((s) => {
      md += `## Slide ${s.slideNumber}: ${s.title}\n`;
      if (s.subtitle) md += `*${s.subtitle}*\n\n`;
      s.bullets.forEach((b) => (md += `- ${b}\n`));
      md += `\n**Konsep Visual**: ${s.visualConcept}\n`;
      md += `**Catatan Pengajar (Speaker Notes)**: ${s.speakerNotes}\n`;
      md += `**Poin Aksi (Takeaway)**: ${s.actionTakeaway}\n\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Slide-${currentDeck.moduleTitle.replace(/\s+/g, '_')}.md`;
    link.click();
  };

  const handlePrintWorksheet = () => {
    window.print();
  };

  const handleSaveNewTemplate = () => {
    if (!newTplTitle.trim() || !newTplContent.trim()) return;

    const newTpl: PracticalTemplate = {
      id: `tpl-${Date.now()}`,
      title: newTplTitle,
      category: newTplCategory,
      description: 'Template kustom praktisi kurikulum',
      tags: ['Kustom', newTplCategory],
      format: 'Markdown',
      content: newTplContent,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onUpdateTemplates([newTpl, ...templates]);
    setActiveTemplate(newTpl);
    setIsCreatingTemplate(false);
    setNewTplTitle('');
    setNewTplContent('');
  };

  return (
    <div className="space-y-6">
      {/* Module Selector & Sub-Tabs Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 no-print">
        {/* Module Picker */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
            Modul Terpilih:
          </span>
          <select
            value={selectedModuleId}
            onChange={(e) => {
              setSelectedModuleId(e.target.value);
              setCurrentSlideIndex(0);
            }}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 border border-slate-700 text-slate-100 max-w-sm truncate focus:ring-1 focus:ring-indigo-500"
          >
            {allModules.map((m) => (
              <option key={m.id} value={m.id}>
                [{m.level}] {m.title} (v{m.version})
              </option>
            ))}
          </select>
        </div>

        {/* Sub-Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setSelectedSubTab('slides')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSubTab === 'slides'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Slide Presentasi</span>
            {currentDeck && (
              <span className="px-1.5 py-0.2 rounded-md bg-indigo-700/60 text-[10px]">
                {currentDeck.slides.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setSelectedSubTab('worksheet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSubTab === 'worksheet'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Worksheet &amp; Lembar Kerja</span>
          </button>

          <button
            onClick={() => setSelectedSubTab('templates')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSubTab === 'templates'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Template &amp; SOP Praktik</span>
            <span className="px-1.5 py-0.2 rounded-md bg-emerald-700/60 text-[10px]">
              {templates.length}
            </span>
          </button>

          <button
            onClick={() => setSelectedSubTab('guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSubTab === 'guide'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pedoman Pengajar</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          SUB-TAB 1: SLIDE PRESENTATION BUILDER & VIEWER
      ======================================================== */}
      {selectedSubTab === 'slides' && (
        <div className="space-y-4">
          {currentDeck ? (
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
              {/* Slide Control Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300">
                      Deck Presentasi
                    </span>
                    <span className="text-xs text-slate-400">
                      Slide {currentSlideIndex + 1} dari {currentDeck.slides.length}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight mt-1">
                    {currentDeck.deckTitle}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleGenerateSlidesAi}
                    disabled={isGeneratingSlides}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-sm transition-all"
                    title="Generate atau perbarui slide dengan AI"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingSlides ? 'Merancang...' : 'Generate AI Slides'}</span>
                  </button>

                  <button
                    onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      showSpeakerNotes
                        ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    Speaker Notes
                  </button>

                  <button
                    onClick={() => setIsFullscreenPresentation(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Layar Penuh</span>
                  </button>

                  <button
                    onClick={handleExportSlideMarkdown}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download MD</span>
                  </button>
                </div>
              </div>

              {/* Slide Canvas Viewer */}
              {currentDeck.slides[currentSlideIndex] && (
                <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 border border-indigo-500/30 p-8 sm:p-12 shadow-2xl min-h-[380px] flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-indigo-400 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                        SLIDE {currentDeck.slides[currentSlideIndex].slideNumber}
                      </span>
                      <span className="text-xs text-slate-400">
                        {currentDeck.moduleTitle}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {currentDeck.slides[currentSlideIndex].title}
                      </h3>
                      {currentDeck.slides[currentSlideIndex].subtitle && (
                        <p className="text-sm font-medium text-indigo-300 mt-1">
                          {currentDeck.slides[currentSlideIndex].subtitle}
                        </p>
                      )}
                    </div>

                    {/* Bullets List */}
                    <div className="space-y-2.5 pt-2">
                      {currentDeck.slides[currentSlideIndex].bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0 shadow-sm shadow-indigo-400/50" />
                          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                            {b}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Concept Card & Action Takeaway */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-slate-800">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                      <span className="text-indigo-400 font-semibold block mb-0.5">
                        🎨 Konsep Visual Rekomendasi:
                      </span>
                      <span className="text-slate-300">
                        {currentDeck.slides[currentSlideIndex].visualConcept}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs">
                      <span className="text-amber-400 font-semibold block mb-0.5">
                        ⚡ Poin Aksi (Action Takeaway):
                      </span>
                      <span className="text-slate-200">
                        {currentDeck.slides[currentSlideIndex].actionTakeaway}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide Navigation Pagination */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                  disabled={currentSlideIndex === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {/* Thumbnail dots */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-md px-2 py-1">
                  {currentDeck.slides.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentSlideIndex === idx
                          ? 'w-7 bg-indigo-500'
                          : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                      }`}
                      title={`Ke Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentSlideIndex(
                      Math.min(currentDeck.slides.length - 1, currentSlideIndex + 1)
                    )
                  }
                  disabled={currentSlideIndex === currentDeck.slides.length - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-white transition-colors"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Speaker Notes Drawer */}
              {showSpeakerNotes && currentDeck.slides[currentSlideIndex] && (
                <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                    <Info className="w-3.5 h-3.5" />
                    <span>Catatan Khusus Pengajar (Trainer Speaker Notes):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">
                    "{currentDeck.slides[currentSlideIndex].speakerNotes}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <Presentation className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">Belum Ada Slide untuk Modul Ini</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
                Klik tombol di bawah untuk membuat slide presentasi instruksional secara otomatis dengan AI.
              </p>
              <button
                onClick={handleGenerateSlidesAi}
                disabled={isGeneratingSlides}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-all"
              >
                {isGeneratingSlides ? 'Sedang Merancang...' : 'Generate AI Slides Sekarang'}
              </button>
            </div>
          )}

          {/* Fullscreen Interactive Presentation Mode Modal */}
          {isFullscreenPresentation && currentDeck && (
            <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 sm:p-12 text-white">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-indigo-400 font-mono">
                    {currentDeck.moduleTitle}
                  </span>
                  <h2 className="text-lg font-bold">{currentDeck.deckTitle}</h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-slate-400">
                    {currentSlideIndex + 1} / {currentDeck.slides.length}
                  </span>
                  <button
                    onClick={() => setIsFullscreenPresentation(false)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
                  >
                    Keluar (ESC)
                  </button>
                </div>
              </div>

              {/* Main Slide Content */}
              {currentDeck.slides[currentSlideIndex] && (
                <div className="max-w-4xl mx-auto w-full my-auto space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-md bg-indigo-600 text-xs font-bold uppercase tracking-wider">
                      Slide {currentDeck.slides[currentSlideIndex].slideNumber}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
                      {currentDeck.slides[currentSlideIndex].title}
                    </h1>
                    {currentDeck.slides[currentSlideIndex].subtitle && (
                      <p className="text-lg text-indigo-300 mt-2 font-medium">
                        {currentDeck.slides[currentSlideIndex].subtitle}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 pt-4">
                    {currentDeck.slides[currentSlideIndex].bullets.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 mt-2.5 shrink-0" />
                        <p className="text-slate-100 text-lg sm:text-xl leading-relaxed">{b}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mt-8">
                    <span className="text-xs text-amber-400 font-bold block mb-1">
                      ⚡ Action Takeaway:
                    </span>
                    <span className="text-sm text-slate-200">
                      {currentDeck.slides[currentSlideIndex].actionTakeaway}
                    </span>
                  </div>
                </div>
              )}

              {/* Controls footer */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <button
                  onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                  disabled={currentSlideIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-sm font-semibold"
                >
                  ← Slide Sebelumnya
                </button>

                <div className="flex items-center gap-2">
                  {currentDeck.slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        currentSlideIndex === idx ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-800'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentSlideIndex(
                      Math.min(currentDeck.slides.length - 1, currentSlideIndex + 1)
                    )
                  }
                  disabled={currentSlideIndex === currentDeck.slides.length - 1}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-sm font-semibold"
                >
                  Slide Berikutnya →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: WORKSHEET & LEMBAR KERJA SISWA
      ======================================================== */}
      {selectedSubTab === 'worksheet' && (
        <div className="space-y-4">
          {currentWorksheet ? (
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 print-card">
              {/* Worksheet Header & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 no-print">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/20 text-purple-300">
                      Lembar Kerja Praktik Siswa
                    </span>
                    <span className="text-xs text-slate-400">
                      Estimasi: {currentWorksheet.estimatedTimeMinutes} Menit
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight mt-1">
                    {currentWorksheet.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGenerateWorksheetAi}
                    disabled={isGeneratingWorksheet}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingWorksheet ? 'Menyusun...' : 'AI Generate Worksheet'}</span>
                  </button>

                  <button
                    onClick={handlePrintWorksheet}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak / Simpan PDF</span>
                  </button>
                </div>
              </div>

              {/* Printable Header */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                    Modul Terkait: {currentWorksheet.moduleTitle}
                  </span>
                  <span className="text-xs text-slate-400">
                    Durasi Praktik: ~{currentWorksheet.estimatedTimeMinutes} Menit
                  </span>
                </div>
                <p className="text-sm text-slate-200 font-medium">
                  🎯 <span className="text-slate-400">Tujuan Belajar:</span> {currentWorksheet.objective}
                </p>
              </div>

              {/* Interactive Sections with Form Fields */}
              <div className="space-y-6">
                {currentWorksheet.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">{sec.sectionName}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{sec.instructions}</p>
                    </div>

                    <div className="space-y-3">
                      {sec.fields.map((field) => (
                        <div key={field.id} className="space-y-1">
                          <label className="text-xs font-semibold text-slate-300 block">
                            {field.label}
                          </label>
                          {field.hint && (
                            <span className="text-[11px] text-slate-500 block mb-1">
                              💡 {field.hint}
                            </span>
                          )}

                          {field.type === 'textarea' ? (
                            <textarea
                              rows={3}
                              placeholder={field.placeholder}
                              value={worksheetFormData[field.id] || ''}
                              onChange={(e) =>
                                setWorksheetFormData({
                                  ...worksheetFormData,
                                  [field.id]: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-600 text-xs focus:ring-1 focus:ring-purple-500"
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder={field.placeholder}
                              value={worksheetFormData[field.id] || ''}
                              onChange={(e) =>
                                setWorksheetFormData({
                                  ...worksheetFormData,
                                  [field.id]: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-600 text-xs focus:ring-1 focus:ring-purple-500"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Practical Steps Guidance (Step-by-Step) */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Langkah-Langkah Praktik Eksekusi (Practical Steps)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentWorksheet.practicalSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">
                          {step.stepNumber}
                        </span>
                        <h4 className="font-bold text-white">{step.title}</h4>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{step.instruction}</p>
                      <div className="pt-1 border-t border-slate-800/80 space-y-1 text-[11px]">
                        <span className="text-indigo-400 block">💡 Pro Tip: {step.proTip}</span>
                        <span className="text-rose-400 block">⚠️ Hindari: {step.commonMistake}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rubric Evaluation Table */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Rubrik Penilaian &amp; Standar Kelulusan Tugas
                  </h3>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-850 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-3">Kriteria Evaluasi</th>
                        <th className="p-3">Bobot</th>
                        <th className="p-3 text-emerald-400">Standar Sangat Baik (Level 4)</th>
                        <th className="p-3 text-amber-400">Perlu Perbaikan (Level 2)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {currentWorksheet.evaluationRubric.map((r, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-850/50">
                          <td className="p-3 font-semibold text-white">{r.criteria}</td>
                          <td className="p-3 font-mono text-purple-400">{r.weight}</td>
                          <td className="p-3 text-slate-300">{r.level4}</td>
                          <td className="p-3 text-slate-400">{r.level2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">Belum Ada Worksheet untuk Modul Ini</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
                Buat lembar kerja siswa interaktif dengan panduan praktik dan rubrik evaluasi menggunakan AI.
              </p>
              <button
                onClick={handleGenerateWorksheetAi}
                disabled={isGeneratingWorksheet}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md"
              >
                {isGeneratingWorksheet ? 'Sedang Merancang...' : 'Generate AI Worksheet'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: TEMPLATES & SOP PRAKTIK
      ======================================================== */}
      {selectedSubTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template List Sidebar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                Koleksi Template &amp; SOP
              </h3>
              <button
                onClick={() => setIsCreatingTemplate(true)}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                Template Baru
              </button>
            </div>

            <div className="space-y-2">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => setActiveTemplate(tpl)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    activeTemplate.id === tpl.id
                      ? 'bg-emerald-950/30 border-emerald-500 shadow-sm'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                      {tpl.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{tpl.format}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white mt-1.5">{tpl.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{tpl.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Active Template Viewer / Editor */}
          <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            {activeTemplate && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-emerald-400">
                      {activeTemplate.category}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {activeTemplate.title}
                    </h3>
                    <p className="text-xs text-slate-400">{activeTemplate.description}</p>
                  </div>

                  <button
                    onClick={() => handleCopyText(activeTemplate.id, activeTemplate.content)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    {copiedTemplateId === activeTemplate.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Dokumen / SOP</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
                  {activeTemplate.content}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 4: PEDOMAN PENGAJAR (TRAINER GUIDE)
      ======================================================== */}
      {selectedSubTab === 'guide' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Pedoman &amp; Standard Operating Procedure Fasilitator / Mentor
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              Panduan Praktik Pengajaran: {currentModule.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Standar baku pembawaan materi di kelas, alokasi waktu sesi teori vs praktek, serta handling pertanyaan peserta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase">1. Pembukaan (15%)</span>
              <h4 className="font-bold text-white text-sm">Validasi Masalah Lapangan</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mulai dengan meminta 2 peserta menceritakan pengalaman mereka. Tunjukkan bahwa masalah ini adalah problem massal yang memiliki pola solusi sistematis.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase">2. Teori &amp; Live Demo (35%)</span>
              <h4 className="font-bold text-white text-sm">Bedah Contoh Nyata Before-After</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gunakan slide presentasi. Peragakan langsung di layar (screen sharing ponsel atau dashboard) proses pembuatannya dari nol tanpa dipotong.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">3. Sesi Praktek Mandiri (50%)</span>
              <h4 className="font-bold text-white text-sm">Pengisian Worksheet &amp; Review</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Beri waktu 25 menit kepada peserta untuk mengisi worksheet. Fasilitator berkeliling memeriksa draf hook atau bio peserta satu per satu.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Create Template */}
      {isCreatingTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Buat Template atau SOP Praktik Baru</h3>
              <button onClick={() => setIsCreatingTemplate(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Judul Dokumen:</label>
                <input
                  type="text"
                  placeholder="Misal: Script DM Closing Penawaran Diskon 48 Jam"
                  value={newTplTitle}
                  onChange={(e) => setNewTplTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Kategori:</label>
                <select
                  value={newTplCategory}
                  onChange={(e) => setNewTplCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                >
                  <option value="Copywriting">Copywriting &amp; Naskah</option>
                  <option value="Content Calendar">Content Calendar</option>
                  <option value="SOP Live">SOP Live Streaming</option>
                  <option value="Brief Iklan">Brief Iklan &amp; Desain</option>
                  <option value="Funnel WA">Funnel WhatsApp</option>
                  <option value="Checklist Bio">Checklist Bio</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Isi Dokumen / Template (Markdown):</label>
                <textarea
                  rows={8}
                  placeholder="Tuliskan format teks, script, atau SOP di sini..."
                  value={newTplContent}
                  onChange={(e) => setNewTplContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsCreatingTemplate(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleSaveNewTemplate}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
              >
                Simpan Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
