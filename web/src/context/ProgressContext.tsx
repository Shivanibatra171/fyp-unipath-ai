import React, { createContext, useContext, useState, useEffect } from 'react';
import { DiagnosticResult, InterestProfileResult } from '../types';

export interface ModuleProgress {
  id: number;
  title: string;
  shortTitle: string;
  path: string;
  status: 'completed' | 'in_progress' | 'ready';
  badgeText: string;
  completionPercentage: number;
}

interface ProgressContextType {
  modules: ModuleProgress[];
  diagnosticResult: DiagnosticResult | null;
  interestProfile: InterestProfileResult | null;
  checkedDocuments: Record<string, boolean>;
  saveDiagnosticResult: (result: DiagnosticResult) => void;
  saveInterestProfile: (profile: InterestProfileResult) => void;
  toggleDocumentCheck: (docId: string) => void;
  isDocumentChecked: (docId: string) => boolean;
  completeModule: (moduleId: number) => void;
  overallJourneyProgress: number;
}

const DEFAULT_INTEREST_PROFILE: InterestProfileResult = {
  primaryArchetype: 'System Architect & Computing Innovator',
  secondaryArchetype: 'Analytical Problem Solver',
  matchScore: 94,
  topStreams: ['Computer Science & AI', 'Software Engineering', 'Data Science & FinTech'],
  breakdown: [
    { category: 'Technology & Computing', score: 20, percentage: 95, description: 'Exceptionally strong alignment with algorithms, software engineering, and AI.' },
    { category: 'Engineering & Applied Sciences', score: 14, percentage: 70, description: 'Good aptitude for hardware architecture and embedded electronics.' },
    { category: 'Pure Sciences & Mathematics', score: 15, percentage: 75, description: 'High mathematical foundation and discrete analytical reasoning.' },
    { category: 'Business, Economics & Finance', score: 11, percentage: 55, description: 'Moderate interest in FinTech and technological entrepreneurship.' }
  ],
  strengths: ['Algorithmic Logic', 'Computational Thinking', 'Mathematical Problem Solving', 'Autonomous Debugging'],
  recommendedDegrees: ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence', 'BS Data Science'],
  recommendedUniversities: ['NUST', 'FAST-NUCES', 'LUMS', 'GIKI', 'COMSATS'],
  guidanceNote: 'This profile serves as institutional guidance based on your self-reported preferences and academic strengths. It does not restrict your choice of any degree.'
};

const DEFAULT_DIAGNOSTIC_RESULT: DiagnosticResult = {
  totalScore: 17,
  totalQuestions: 25,
  percentage: 68,
  percentileEstimate: 84.5,
  timeSpentSeconds: 1420,
  sectionScores: [
    { section: 'Mathematics', correct: 6, total: 8, percentage: 75, status: 'Strong' },
    { section: 'English', correct: 4, total: 7, percentage: 57, status: 'Average' },
    { section: 'Logical Reasoning', correct: 4, total: 5, percentage: 80, status: 'Strong' },
    { section: 'Physics & Computing', correct: 3, total: 5, percentage: 60, status: 'Average' }
  ],
  weakAreas: [
    { topic: 'Analytical Geometry (Conics)', section: 'Mathematics', advice: 'Review hyperbola and ellipse eccentricity formulas and standard directrix equations.', recommendedPracticeCount: 15 },
    { topic: 'Reading Comprehension (Speed & Inference)', section: 'English', advice: 'Practice timed reading of scientific journals to improve structural inference.', recommendedPracticeCount: 10 },
    { topic: 'Wave Optics & Interference', section: 'Physics', advice: 'Revise Young’s Double Slit fringe spacing equations and thin film reflections.', recommendedPracticeCount: 12 }
  ],
  readinessRating: 'Competitive'
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interestProfile, setInterestProfile] = useState<InterestProfileResult | null>(() => {
    const saved = localStorage.getItem('unipath_interest_profile');
    return saved ? JSON.parse(saved) : DEFAULT_INTEREST_PROFILE;
  });

  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(() => {
    const saved = localStorage.getItem('unipath_diagnostic_result');
    return saved ? JSON.parse(saved) : DEFAULT_DIAGNOSTIC_RESULT;
  });

  const [checkedDocuments, setCheckedDocuments] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('unipath_checked_docs');
    return saved ? JSON.parse(saved) : {
      'doc-matric-sanad': true,
      'doc-fsc1-dmc': true,
      'doc-cnic-bform': true,
      'doc-domicile': false,
      'doc-photos': true,
      'doc-paid-challan': false,
      'doc-equivalence': false
    };
  });

  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    const saved = localStorage.getItem('unipath_completed_modules');
    return saved ? JSON.parse(saved) : [1];
  });

  useEffect(() => {
    if (interestProfile) localStorage.setItem('unipath_interest_profile', JSON.stringify(interestProfile));
  }, [interestProfile]);

  useEffect(() => {
    if (diagnosticResult) localStorage.setItem('unipath_diagnostic_result', JSON.stringify(diagnosticResult));
  }, [diagnosticResult]);

  useEffect(() => {
    localStorage.setItem('unipath_checked_docs', JSON.stringify(checkedDocuments));
  }, [checkedDocuments]);

  useEffect(() => {
    localStorage.setItem('unipath_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  const saveDiagnosticResult = (res: DiagnosticResult) => {
    setDiagnosticResult(res);
    if (!completedModules.includes(4)) {
      setCompletedModules((prev) => [...prev, 4]);
    }
  };

  const saveInterestProfile = (prof: InterestProfileResult) => {
    setInterestProfile(prof);
    if (!completedModules.includes(1)) {
      setCompletedModules((prev) => [...prev, 1]);
    }
  };

  const completeModule = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules((prev) => [...prev, moduleId]);
    }
  };

  const toggleDocumentCheck = (docId: string) => {
    setCheckedDocuments((prev) => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  const isDocumentChecked = (docId: string) => !!checkedDocuments[docId];

  // Document checklist calculation
  const totalDocsCount = 7;
  const checkedDocsCount = Object.values(checkedDocuments).filter(Boolean).length;
  const docChecklistPercentage = Math.round((checkedDocsCount / totalDocsCount) * 100);

  const modules: ModuleProgress[] = [
    {
      id: 1,
      title: 'Discover Your Interest',
      shortTitle: '1. Interest Profiler',
      path: '/discover',
      status: interestProfile ? 'completed' : 'ready',
      badgeText: interestProfile ? `${interestProfile.matchScore}% Match` : 'Start Assessment',
      completionPercentage: interestProfile ? 100 : 0
    },
    {
      id: 2,
      title: 'Find Programs & Universities',
      shortTitle: '2. Match Finder',
      path: '/match',
      status: 'in_progress',
      badgeText: '3 Shortlisted',
      completionPercentage: 75
    },
    {
      id: 3,
      title: 'Application Guidance & Documents',
      shortTitle: '3. Application Roadmap',
      path: '/guidance',
      status: docChecklistPercentage === 100 ? 'completed' : 'in_progress',
      badgeText: `${checkedDocsCount}/${totalDocsCount} Verified`,
      completionPercentage: docChecklistPercentage
    },
    {
      id: 4,
      title: 'Admission Test Preparation',
      shortTitle: '4. Test Prep',
      path: '/test-prep',
      status: diagnosticResult ? 'in_progress' : 'ready',
      badgeText: diagnosticResult ? `Diagnostic: ${diagnosticResult.percentage}%` : 'Take Test',
      completionPercentage: diagnosticResult ? 85 : 0
    }
  ];

  const overallJourneyProgress = Math.round(
    modules.reduce((sum, m) => sum + m.completionPercentage, 0) / modules.length
  );

  return (
    <ProgressContext.Provider
      value={{
        modules,
        diagnosticResult,
        interestProfile,
        checkedDocuments,
        saveDiagnosticResult,
        saveInterestProfile,
        toggleDocumentCheck,
        isDocumentChecked,
        completeModule,
        overallJourneyProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
