export type LevelType = 'Pemula' | 'Menengah' | 'Lanjutan';

export type ModuleStatus = 'published' | 'draft' | 'needs_update' | 'archived';

export interface CurriculumModule {
  id: string;
  title: string;
  summary: string;
  estimatedHours: number;
  topics: string[];
  practicalOutput: string;
  keyCompetency: string;
  status: ModuleStatus;
  lastReviewedDate: string;
  version: string;
  level: LevelType;
  curriculumId: string;
  slidesCount?: number;
  hasWorksheet?: boolean;
  hasGuide?: boolean;
}

export interface LevelTrack {
  level: LevelType;
  objective: string;
  color: string;
  iconName?: string;
  modules: CurriculumModule[];
}

export interface Curriculum {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAudience: string;
  duration: string;
  version: string;
  lastUpdated: string;
  tags: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  levels: LevelTrack[];
}

export interface SlideItem {
  slideNumber: number;
  title: string;
  subtitle: string;
  bullets: string[];
  visualConcept: string;
  speakerNotes: string;
  actionTakeaway: string;
}

export interface SlideDeck {
  id: string;
  moduleId: string;
  moduleTitle: string;
  deckTitle: string;
  lastModified: string;
  slides: SlideItem[];
  theme: 'dark' | 'indigo' | 'emerald' | 'sunset';
}

export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  hint: string;
  type: 'text' | 'textarea' | 'checklist';
  value?: string | boolean;
}

export interface WorksheetSection {
  sectionName: string;
  instructions: string;
  fields: FormField[];
}

export interface PracticalStep {
  stepNumber: number;
  title: string;
  instruction: string;
  proTip: string;
  commonMistake: string;
}

export interface RubricCriteria {
  criteria: string;
  level4: string; // Sangat Baik
  level2: string; // Perlu Perbaikan
  weight: string;
}

export interface Worksheet {
  id: string;
  moduleId: string;
  moduleTitle: string;
  title: string;
  objective: string;
  estimatedTimeMinutes: number;
  sections: WorksheetSection[];
  practicalSteps: PracticalStep[];
  evaluationRubric: RubricCriteria[];
  lastModified: string;
}

export interface PracticalTemplate {
  id: string;
  title: string;
  category: 'Copywriting' | 'Content Calendar' | 'SOP Live' | 'Brief Iklan' | 'Funnel WA' | 'Checklist Bio';
  description: string;
  tags: string[];
  format: 'Markdown' | 'Spreadsheet' | 'Checklist';
  content: string;
  updatedAt: string;
}

export type PlatformType =
  | 'Instagram'
  | 'TikTok'
  | 'Meta Ads'
  | 'YouTube'
  | 'LinkedIn'
  | 'AI Tools'
  | 'Google & SEO'
  | 'Marketplace';

export type UrgencyLevel = 'kritis' | 'sedang' | 'info';

export interface SuggestedRevision {
  moduleId: string;
  moduleTitle: string;
  changeUrgency: 'High' | 'Medium' | 'Low';
  reason: string;
  diffBefore: string;
  diffAfter: string;
  newTopicsToAdd: string[];
  obsoleteTopicsToRemove: string[];
}

export interface PlatformUpdate {
  id: string;
  platform: PlatformType;
  updateTitle: string;
  releaseDate: string;
  urgency: UrgencyLevel;
  summary: string;
  whatChanged: string[];
  impactedModuleIds: string[];
  status: 'pending_review' | 'applied' | 'dismissed';
  suggestedRevisions: SuggestedRevision[];
  trainerAdvice: string;
}

export interface AuditScoreBreakdown {
  profileBioOptimization: number; // 0 - 100
  contentHookAndQuality: number; // 0 - 100
  engagementAndCommunity: number; // 0 - 100
  funnelAndConversionCTA: number; // 0 - 100
  consistencyAndBranding: number; // 0 - 100
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface ActionPlanWeek {
  week: string;
  focus: string;
  tasks: string[];
}

export interface RecommendedModuleStudy {
  moduleId?: string;
  moduleTitle: string;
  whyImportant: string;
  priority: 'Tinggi' | 'Sedang';
}

export interface BioProposal {
  recommendedHeadline: string;
  bulletPoints: string[];
  ctaWording: string;
}

export interface MemberAccountAudit {
  id: string;
  clientName: string;
  platform: PlatformType;
  accountHandle: string;
  avatarUrl?: string;
  niche: string;
  followersCount: string;
  currentBio: string;
  contentFrequency: string;
  topComplaintsOrGoal: string;
  auditDate: string;
  overallScore: number;
  scoreBreakdown: AuditScoreBreakdown;
  executiveSummary: string;
  swotAnalysis: SwotAnalysis;
  quickWins: string[];
  thirtyDayActionPlan: ActionPlanWeek[];
  recommendedModulesToStudy: RecommendedModuleStudy[];
  bioImprovementProposal: BioProposal;
  reviewerNotes?: string;
  status: 'Baru' | 'Dalam Pembinaan' | 'Selesai';
}
