import React from 'react';
import {
  GraduationCap,
  Layers,
  Sparkles,
  RefreshCw,
  UserCheck,
  Plus,
  BookOpen,
} from 'lucide-react';
import { Curriculum } from '../../types';

interface HeaderProps {
  activeTab: 'curriculum' | 'assets' | 'updater' | 'audit';
  setActiveTab: (tab: 'curriculum' | 'assets' | 'updater' | 'audit') => void;
  curriculums: Curriculum[];
  currentCurriculumId: string;
  onSelectCurriculum: (id: string) => void;
  onOpenCreateCurriculum: () => void;
  pendingUpdatesCount: number;
  pendingAuditsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  curriculums,
  currentCurriculumId,
  onSelectCurriculum,
  onOpenCreateCurriculum,
  pendingUpdatesCount,
  pendingAuditsCount,
}) => {
  const currentCurriculum = curriculums.find((c) => c.id === currentCurriculumId) || curriculums[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">KuriKraf</span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Master Platform
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Kurikulum, Modul Ajar, Radar Update &amp; Audit Akun Member
              </p>
            </div>
          </div>

          {/* Program / Curriculum Switcher */}
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
              <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <select
                value={currentCurriculumId}
                onChange={(e) => onSelectCurriculum(e.target.value)}
                className="pl-9 pr-8 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-[200px] sm:max-w-[260px] truncate"
              >
                {curriculums.map((curr) => (
                  <option key={curr.id} value={curr.id}>
                    {curr.title} ({curr.version})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onOpenCreateCurriculum}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-colors"
              title="Rancang Kurikulum Baru"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Kurikulum Baru</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex space-x-1 sm:space-x-2 border-t border-slate-800/80 pt-2 pb-2.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'curriculum'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>1. Perancangan Kurikulum &amp; Alur Belajar</span>
            {currentCurriculum && (
              <span className="px-1.5 py-0.2 rounded-md bg-slate-800 text-[10px] text-slate-400 border border-slate-700/60 font-mono">
                {currentCurriculum.levels.reduce((acc, lvl) => acc + lvl.modules.length, 0)} Modul
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'assets'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Studio Modul, Slide &amp; Worksheet</span>
          </button>

          <button
            onClick={() => setActiveTab('updater')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'updater'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>3. Pembaruan Materi &amp; Radar Platform</span>
            {pendingUpdatesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] animate-pulse">
                {pendingUpdatesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'audit'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>4. Rekomendasi &amp; Review Akun Klien/Member</span>
            {pendingAuditsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                {pendingAuditsCount} Member
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
