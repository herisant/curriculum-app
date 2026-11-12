import React, { useState, useEffect } from 'react';
import {
  initialCurriculums,
  initialSlideDecks,
  initialWorksheets,
  initialTemplates,
  initialPlatformUpdates,
  initialMemberAudits,
} from './data/initialData';
import {
  Curriculum,
  SlideDeck,
  Worksheet,
  PracticalTemplate,
  PlatformUpdate,
  MemberAccountAudit,
} from './types';
import { Header } from './components/layout/Header';
import { CurriculumManager } from './components/curriculum/CurriculumManager';
import { AssetStudio } from './components/assets/AssetStudio';
import { PlatformUpdater } from './components/platform/PlatformUpdater';
import { AccountAuditReview } from './components/audit/AccountAuditReview';
import { Plus, GraduationCap, Sparkles } from 'lucide-react';

export default function App() {
  // 1. Core State with LocalStorage Persistence
  const [curriculums, setCurriculums] = useState<Curriculum[]>(() => {
    try {
      const saved = localStorage.getItem('kurikraf_curriculums');
      return saved ? JSON.parse(saved) : initialCurriculums;
    } catch {
      return initialCurriculums;
    }
  });

  const [currentCurriculumId, setCurrentCurriculumId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('kurikraf_active_curriculum_id');
      return saved || initialCurriculums[0].id;
    } catch {
      return initialCurriculums[0].id;
    }
  });

  const [slideDecks, setSlideDecks] = useState<SlideDeck[]>(() => {
    try {
      const saved = localStorage.getItem('kurikraf_slides');
      return saved ? JSON.parse(saved) : initialSlideDecks;
    } catch {
      return initialSlideDecks;
    }
  });

  const [worksheets, setWorksheets] = useState<Worksheet[]>(() => {
    try {
      const saved = localStorage.getItem('kurikraf_worksheets');
      return saved ? JSON.parse(saved) : initialWorksheets;
    } catch {
      return initialWorksheets;
    }
  });

  const [templates, setTemplates] = useState<PracticalTemplate[]>(() => {
    try {
      const saved = localStorage.getItem('kurikraf_templates');
      return saved ? JSON.parse(saved) : initialTemplates;
    } catch {
      return initialTemplates;
    }
  });

  const [platformUpdates, setPlatformUpdates] = useState<PlatformUpdate[]>(() => {
    try {
      const saved = localStorage.getItem('kurikraf_platform_updates');
      return saved ? JSON.parse(saved) : initialPlatformUpdates;
    } catch {
      return initialPlatformUpdates;
    }
  });

  const [memberAudits, setMemberAudits] = useState<MemberAccountAudit[]>(() => {
    try {
      const saved = localStorage.getItem('kurikraf_audits');
      return saved ? JSON.parse(saved) : initialMemberAudits;
    } catch {
      return initialMemberAudits;
    }
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState<'curriculum' | 'assets' | 'updater' | 'audit'>('curriculum');
  const [assetModuleId, setAssetModuleId] = useState<string>('');
  const [assetSubTab, setAssetSubTab] = useState<'slides' | 'worksheet' | 'templates' | 'guide'>('slides');

  // Modal Create Curriculum
  const [isCreateCurriculumModalOpen, setIsCreateCurriculumModalOpen] = useState(false);
  const [newCurrTitle, setNewCurrTitle] = useState('');
  const [newCurrDesc, setNewCurrDesc] = useState('');
  const [newCurrCategory, setNewCurrCategory] = useState('Digital Marketing');
  const [newCurrAudience, setNewCurrAudience] = useState('Pelaku Bisnis & UMKM');

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kurikraf_curriculums', JSON.stringify(curriculums));
    } catch (e) {
      console.warn('Storage limit', e);
    }
  }, [curriculums]);

  useEffect(() => {
    localStorage.setItem('kurikraf_active_curriculum_id', currentCurriculumId);
  }, [currentCurriculumId]);

  useEffect(() => {
    try {
      localStorage.setItem('kurikraf_slides', JSON.stringify(slideDecks));
    } catch (e) {
      console.warn(e);
    }
  }, [slideDecks]);

  useEffect(() => {
    try {
      localStorage.setItem('kurikraf_worksheets', JSON.stringify(worksheets));
    } catch (e) {
      console.warn(e);
    }
  }, [worksheets]);

  useEffect(() => {
    try {
      localStorage.setItem('kurikraf_templates', JSON.stringify(templates));
    } catch (e) {
      console.warn(e);
    }
  }, [templates]);

  useEffect(() => {
    try {
      localStorage.setItem('kurikraf_platform_updates', JSON.stringify(platformUpdates));
    } catch (e) {
      console.warn(e);
    }
  }, [platformUpdates]);

  useEffect(() => {
    try {
      localStorage.setItem('kurikraf_audits', JSON.stringify(memberAudits));
    } catch (e) {
      console.warn(e);
    }
  }, [memberAudits]);

  // Active Curriculum
  const currentCurriculum =
    curriculums.find((c) => c.id === currentCurriculumId) || curriculums[0];

  // Cross-Navigation Handler: From Curriculum to Assets Studio
  const handleNavigateToAsset = (moduleId: string, assetType: 'slides' | 'worksheet' | 'module') => {
    setAssetModuleId(moduleId);
    setAssetSubTab(assetType === 'worksheet' ? 'worksheet' : 'slides');
    setActiveTab('assets');
  };

  // Cross-Navigation Handler: From Audit to Curriculum
  const handleNavigateToCurriculumModule = (moduleId: string) => {
    setActiveTab('curriculum');
  };

  const handleUpdateCurriculum = (updated: Curriculum) => {
    const nextCurriculums = curriculums.map((c) => (c.id === updated.id ? updated : c));
    setCurriculums(nextCurriculums);
  };

  const handleCreateNewCurriculum = () => {
    if (!newCurrTitle.trim()) return;

    const newCurr: Curriculum = {
      id: `curr-${Date.now()}`,
      title: newCurrTitle,
      description: newCurrDesc || 'Program kurikulum baru',
      category: newCurrCategory,
      targetAudience: newCurrAudience,
      duration: '4 Minggu (16 Pertemuan)',
      version: 'v1.0',
      lastUpdated: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      tags: [newCurrCategory, 'Bootcamp'],
      learningOutcomes: [
        'Mampu memahami pondasi materi dari tingkat dasar',
        'Mampu mempraktikkan langsung pada studi kasus riil',
      ],
      prerequisites: ['Koneksi internet dan smartphone/laptop'],
      levels: [
        {
          level: 'Pemula',
          objective: 'Pondasi awal, pengenalan tools, dan mindset.',
          color: 'from-blue-600 to-cyan-500',
          modules: [
            {
              id: `mod-${Date.now()}-1`,
              curriculumId: `curr-${Date.now()}`,
              level: 'Pemula',
              title: `Pengenalan Dasar ${newCurrTitle}`,
              summary: 'Membedah fondasi dasar dan setup awal yang wajib dipersiapkan peserta.',
              estimatedHours: 4,
              topics: ['Konsep Utama', 'Setup Akun & Alat Bantu', 'Praktik Mandiri'],
              practicalOutput: 'Akun dan checklist persiapan siap pakai.',
              keyCompetency: 'Fondasi & Pemahaman Konseptual',
              status: 'published',
              lastReviewedDate: new Date().toISOString().split('T')[0],
              version: '1.0',
              slidesCount: 6,
              hasWorksheet: true,
              hasGuide: true,
            },
          ],
        },
        {
          level: 'Menengah',
          objective: 'Eksperimen strategi, optimasi alur kerja, dan konversi.',
          color: 'from-indigo-600 to-purple-600',
          modules: [],
        },
        {
          level: 'Lanjutan',
          objective: 'Skalabilitas, manajemen tim, dan otomatisasi hasil.',
          color: 'from-amber-600 to-rose-600',
          modules: [],
        },
      ],
    };

    const nextList = [newCurr, ...curriculums];
    setCurriculums(nextList);
    setCurrentCurriculumId(newCurr.id);
    setIsCreateCurriculumModalOpen(false);
    setNewCurrTitle('');
    setNewCurrDesc('');
    setActiveTab('curriculum');
  };

  const pendingUpdatesCount = platformUpdates.filter((u) => u.status === 'pending_review').length;
  const pendingAuditsCount = memberAudits.filter((a) => a.status === 'Dalam Pembinaan' || a.status === 'Baru').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        curriculums={curriculums}
        currentCurriculumId={currentCurriculumId}
        onSelectCurriculum={(id) => setCurrentCurriculumId(id)}
        onOpenCreateCurriculum={() => setIsCreateCurriculumModalOpen(true)}
        pendingUpdatesCount={pendingUpdatesCount}
        pendingAuditsCount={pendingAuditsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Perancangan Kurikulum & Silabus */}
        {activeTab === 'curriculum' && currentCurriculum && (
          <CurriculumManager
            curriculum={currentCurriculum}
            onUpdateCurriculum={handleUpdateCurriculum}
            onNavigateToAsset={handleNavigateToAsset}
          />
        )}

        {/* Tab 2: Studio Modul, Slide & Worksheet */}
        {activeTab === 'assets' && currentCurriculum && (
          <AssetStudio
            curriculum={currentCurriculum}
            slideDecks={slideDecks}
            onUpdateSlideDecks={setSlideDecks}
            worksheets={worksheets}
            onUpdateWorksheets={setWorksheets}
            templates={templates}
            onUpdateTemplates={setTemplates}
            initialSelectedModuleId={assetModuleId}
            initialSubTab={assetSubTab}
          />
        )}

        {/* Tab 3: Pembaruan Materi & Radar Platform */}
        {activeTab === 'updater' && currentCurriculum && (
          <PlatformUpdater
            curriculum={currentCurriculum}
            onUpdateCurriculum={handleUpdateCurriculum}
            platformUpdates={platformUpdates}
            onUpdatePlatformUpdates={setPlatformUpdates}
          />
        )}

        {/* Tab 4: Rekomendasi & Review Akun Klien/Member */}
        {activeTab === 'audit' && currentCurriculum && (
          <AccountAuditReview
            curriculum={currentCurriculum}
            audits={memberAudits}
            onUpdateAudits={setMemberAudits}
            onNavigateToCurriculumModule={handleNavigateToCurriculumModule}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">KuriKraf Engine</span>
            <span>• Solusi Kurikulum &amp; Pembinaan Member Terpadu</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Standar SKKNI &amp; Bloom's Taxonomy</span>
            <span>• AI-Assisted Architecture</span>
          </div>
        </div>
      </footer>

      {/* Modal: Create Curriculum Baru */}
      {isCreateCurriculumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Buat Program Kurikulum Baru</h3>
                  <p className="text-xs text-slate-400">Siapkan struktur pelatihan berjenjang baru</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateCurriculumModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nama Program Kurikulum:</label>
                <input
                  type="text"
                  placeholder="Misal: Masterclass Live Selling &amp; Keranjang Kuning 2026"
                  value={newCurrTitle}
                  onChange={(e) => setNewCurrTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Kategori Program:</label>
                <select
                  value={newCurrCategory}
                  onChange={(e) => setNewCurrCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                >
                  <option value="Social Media &amp; Content">Social Media &amp; Content</option>
                  <option value="E-Commerce &amp; Live Selling">E-Commerce &amp; Live Selling</option>
                  <option value="Performance Ads &amp; Funnel">Performance Ads &amp; Funnel</option>
                  <option value="Creative &amp; Video Production">Creative &amp; Video Production</option>
                  <option value="Business &amp; Freelancing">Business &amp; Freelancing</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Target Peserta:</label>
                <input
                  type="text"
                  placeholder="Misal: Pemilik Toko Online, Creator Affiliate, Admin CS"
                  value={newCurrAudience}
                  onChange={(e) => setNewCurrAudience(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Deskripsi Singkat Program:</label>
                <textarea
                  rows={3}
                  placeholder="Uraikan tujuan besar dan apa yang membedakan kurikulum ini..."
                  value={newCurrDesc}
                  onChange={(e) => setNewCurrDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsCreateCurriculumModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleCreateNewCurriculum}
                disabled={!newCurrTitle.trim()}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs transition-colors"
              >
                Buat Kurikulum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
