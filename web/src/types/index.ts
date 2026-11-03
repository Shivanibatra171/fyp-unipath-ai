export type IntermediateGroup = 
  | 'Pre-Engineering'
  | 'Pre-Medical'
  | 'ICS (Physics)'
  | 'ICS (Stats)'
  | 'ICS (Economics)'
  | 'I.Com'
  | 'General Science'
  | 'Humanities/FA'
  | 'A-Levels (Pre-Eng)'
  | 'A-Levels (Pre-Med)'
  | 'A-Levels (CompSci)';

export type IntermediateBoard =
  | 'Federal Board (FBISE Islamabad)'
  | 'BISE Lahore'
  | 'BISE Rawalpindi'
  | 'BISE Karachi (BIEK)'
  | 'BISE Faisalabad'
  | 'BISE Multan'
  | 'BISE Gujranwala'
  | 'BISE Peshawar'
  | 'BISE Abbottabad'
  | 'BISE Quetta'
  | 'BISE Hyderabad'
  | 'Aga Khan University Examination Board (AKU-EB)'
  | 'Cambridge Assessment International Education (CAIE / Edexcel)';

export interface ScholarshipInfo {
  id: string;
  name: string;
  type: 'Need-Based' | 'Merit-Based' | 'National Program' | 'Institutional';
  coverage: string;
  eligibility: string;
  applicationDeadline: string;
  linkText?: string;
}

export interface Program {
  id: string;
  universityId: string;
  universityName: string;
  name: string;
  code: string;
  degreeType: 'BS' | 'BE' | 'BBA' | 'LLB' | 'Pharm-D' | 'B.Arch';
  faculty: string;
  durationYears: number;
  totalSemesters: number;
  semesterFeePKR: number;
  annualFeePKR: number;
  eligibilityCriteria: {
    minFscPercent: number;
    allowedGroups: string[];
    requiredTest: string;
    minTestScorePercent?: number;
  };
  meritAggregateFormula: string;
  lastYearClosingMeritPercent: number;
  seats: number;
  description: string;
  keySubjects: string[];
  careerProspects: string[];
  scholarshipAvailable: boolean;
  matchScore?: number;
  matchRationale?: string;
}

export interface TimelineMilestone {
  title: string;
  date: string;
  status: 'Open' | 'Upcoming' | 'Closed' | 'Results Soon';
  badgeColor?: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  city: string;
  province: string;
  type: 'Public' | 'Private' | 'Chartered Non-Profit' | 'Semi-Government';
  founded: number;
  hecRanking: string;
  qsRanking?: string;
  logo: string;
  badgeAccent: string;
  overview: string;
  accreditations: string[];
  acceptedTests: string[];
  aggregateWeights: {
    entryTest: number;
    fscHssc: number;
    matricSsc: number;
  };
  meritFormulaExplanation: string;
  averageSemesterFeeRange: string;
  hostelAvailable: boolean;
  hostelDetails: string;
  transportAvailable: boolean;
  facilities: string[];
  scholarships: ScholarshipInfo[];
  timeline: TimelineMilestone[];
  helpline: {
    phone: string;
    email: string;
    address: string;
    admissionsPortalUrl: string;
    workingHours: string;
  };
  programs: Program[];
}

export interface InterestCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  sampleDegrees: string[];
  subFields: string[];
  badgeColor: string;
}

export interface InterestInterviewQuestion {
  id: number;
  question: string;
  explanation: string;
  options: {
    id: string;
    label: string;
    archetypeWeights: Record<string, number>;
  }[];
}

export interface InterestProfileResult {
  primaryArchetype: string;
  secondaryArchetype: string;
  matchScore: number;
  topStreams: string[];
  breakdown: {
    category: string;
    score: number;
    percentage: number;
    description: string;
  }[];
  strengths: string[];
  recommendedDegrees: string[];
  recommendedUniversities: string[];
  guidanceNote: string;
}

export interface DiagnosticQuestion {
  id: number;
  section: 'English' | 'Mathematics' | 'Logical Reasoning' | 'Physics & Computing';
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  passageText?: string;
  questionText: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
}

export interface DiagnosticResult {
  totalScore: number;
  totalQuestions: number;
  percentage: number;
  percentileEstimate: number;
  timeSpentSeconds: number;
  sectionScores: {
    section: string;
    correct: number;
    total: number;
    percentage: number;
    status: 'Strong' | 'Average' | 'Needs Work';
  }[];
  weakAreas: {
    topic: string;
    section: string;
    advice: string;
    recommendedPracticeCount: number;
  }[];
  readinessRating: 'High Merit Contender' | 'Competitive' | 'Foundation Building Required';
}

export interface StudyPlanDayTask {
  id: string;
  time: string;
  subject: string;
  topic: string;
  resource: string;
  completed: boolean;
}

export interface StudyPlanWeek {
  weekNumber: number;
  title: string;
  theme: string;
  objective: string;
  tasks: StudyPlanDayTask[];
}

export interface MockTestCatalogItem {
  id: string;
  title: string;
  universityTarget: string;
  testCode: string;
  durationMinutes: number;
  totalQuestions: number;
  sections: string[];
  difficulty: 'Standard' | 'High Merit Target' | 'Speed Drill';
  attemptsCount: number;
  avgScore: number;
}

export interface AdmissionAlert {
  id: string;
  universityId: string;
  universityName: string;
  title: string;
  message: string;
  date: string;
  urgency: 'urgent' | 'info' | 'success';
  isRead: boolean;
  linkTo: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  intermediateBoard: IntermediateBoard;
  intermediateGroup: IntermediateGroup;
  matricMarks: number;
  matricTotal: number;
  fsc1Marks: number;
  fsc1Total: number;
  fsc2Marks?: number;
  fsc2Total?: number;
  expectedTestScore: number;
  maxBudgetPerSemester: number;
  targetMajor: string;
  preferredCities: string[];
  targetUniversities?: string[];
  isLoggedIn: boolean;
}

export interface RAGKnowledgeItem {
  id: string;
  query: string;
  answer: string;
  source: string;
  category: 'Fee & Scholarships' | 'Eligibility & Merit' | 'Test & Syllabus' | 'Hostels & Campus' | 'Documents & Process' | 'Comparison';
  universityName?: string;
  officialLink?: string;
}
