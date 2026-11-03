import { AdmissionAlert, MockTestCatalogItem } from '../types';

export const MOCK_NOTIFICATIONS: AdmissionAlert[] = [
  {
    id: 'notif-1',
    universityId: 'nust',
    universityName: 'NUST Islamabad',
    title: 'NET-3 Registration Deadline Approaching',
    message: 'Online registration for NUST Entry Test (NET Series 3) closes on April 15, 2026. Select your preferred slot early.',
    date: '2 hours ago',
    urgency: 'urgent',
    isRead: false,
    linkTo: '/university/nust'
  },
  {
    id: 'notif-2',
    universityId: 'lums',
    universityName: 'LUMS Lahore',
    title: 'Financial Aid Documentation Window Open',
    message: 'Shortlisted applicants can now upload verified FBR tax returns and electricity bills for LUMS Need-Based Aid.',
    date: '1 day ago',
    urgency: 'info',
    isRead: false,
    linkTo: '/university/lums'
  },
  {
    id: 'notif-3',
    universityId: 'fast-nuces',
    universityName: 'FAST-NUCES',
    title: 'NU Admission Portal Announcement',
    message: 'Online admissions for Fall 2026 session will formally commence on May 15 across all 5 campuses.',
    date: '3 days ago',
    urgency: 'info',
    isRead: true,
    linkTo: '/university/fast-nuces'
  },
  {
    id: 'notif-4',
    universityId: 'iba-karachi',
    universityName: 'IBA Karachi',
    title: 'Round-2 Aptitude Test Schedule Released',
    message: 'IBA Karachi Round-2 Entrance Test will be administered on June 28, 2026 at Karachi, Lahore, and Islamabad centers.',
    date: '5 days ago',
    urgency: 'urgent',
    isRead: true,
    linkTo: '/university/iba-karachi'
  },
  {
    id: 'notif-5',
    universityId: 'giki',
    universityName: 'GIKI Topi',
    title: 'KPK Chief Minister Scholarship Announced',
    message: 'Top merit candidates domiciled in KPK are eligible for 100% full-ride funding for 4-year engineering studies.',
    date: '1 week ago',
    urgency: 'success',
    isRead: true,
    linkTo: '/university/giki'
  }
];

export const MOCK_TESTS_CATALOG: MockTestCatalogItem[] = [
  {
    id: 'mock-net-cs',
    title: 'NUST NET Full Simulation (Computing & CS Stream)',
    universityTarget: 'NUST Islamabad',
    testCode: 'NET-CS-FULL',
    durationMinutes: 180,
    totalQuestions: 200,
    sections: ['Mathematics (80 Qs)', 'Physics (60 Qs)', 'Computer Science (30 Qs)', 'English (20 Qs)', 'Intelligence (10 Qs)'],
    difficulty: 'High Merit Target',
    attemptsCount: 1420,
    avgScore: 138
  },
  {
    id: 'mock-ecat-uet',
    title: 'UET Combined Entry Test (ECAT Sprint)',
    universityTarget: 'UET Lahore',
    testCode: 'ECAT-PRE-ENG',
    durationMinutes: 100,
    totalQuestions: 100,
    sections: ['Mathematics (30 Qs)', 'Physics (30 Qs)', 'Chemistry/CS (30 Qs)', 'English (10 Qs)'],
    difficulty: 'Standard',
    attemptsCount: 2890,
    avgScore: 68
  },
  {
    id: 'mock-fast-nu',
    title: 'FAST NU Speed Drill Test',
    universityTarget: 'FAST-NUCES',
    testCode: 'FAST-NU-SPEED',
    durationMinutes: 120,
    totalQuestions: 120,
    sections: ['Advanced Math (50 Qs)', 'Basic Math (20 Qs)', 'Analytical Reasoning (20 Qs)', 'English (30 Qs)'],
    difficulty: 'Speed Drill',
    attemptsCount: 3150,
    avgScore: 74
  },
  {
    id: 'mock-iba-aptitude',
    title: 'IBA Karachi Aptitude Diagnostic Exam',
    universityTarget: 'IBA Karachi',
    testCode: 'IBA-APT-MOCK',
    durationMinutes: 120,
    totalQuestions: 90,
    sections: ['Mathematics & Problem Solving (45 Qs)', 'English Grammar & Vocabulary (45 Qs)'],
    difficulty: 'High Merit Target',
    attemptsCount: 980,
    avgScore: 62
  },
  {
    id: 'mock-giki-eng',
    title: 'GIKI Engineering Entrance Simulation',
    universityTarget: 'GIKI Topi',
    testCode: 'GIKI-ENG-MOCK',
    durationMinutes: 120,
    totalQuestions: 80,
    sections: ['Mathematics (30 Qs)', 'Physics (30 Qs)', 'English (20 Qs)'],
    difficulty: 'High Merit Target',
    attemptsCount: 760,
    avgScore: 59
  }
];
