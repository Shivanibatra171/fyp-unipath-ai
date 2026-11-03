import { InterestCategory, InterestInterviewQuestion } from '../types';

export const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    id: 'tech-computing',
    title: 'Technology & Computing',
    iconName: 'Cpu',
    description: 'Software development, artificial intelligence, cybersecurity, algorithms, and cloud infrastructure.',
    sampleDegrees: ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence', 'BS Data Science', 'BS Cyber Security'],
    subFields: ['Machine Learning', 'Full-Stack Web', 'Information Security', 'Mobile Apps', 'Distributed Systems'],
    badgeColor: '#17284A'
  },
  {
    id: 'engineering-applied',
    title: 'Engineering & Applied Sciences',
    iconName: 'Cog',
    description: 'Hardware, mechanics, circuits, power systems, structural design, and aerospace systems.',
    sampleDegrees: ['BE Electrical Engineering', 'BE Mechanical Engineering', 'BE Mechatronics', 'BE Civil Engineering', 'BS Aerospace'],
    subFields: ['Robotics', 'Renewable Energy', 'Automotive Systems', 'Microcontrollers', 'Structural Design'],
    badgeColor: '#17284A'
  },
  {
    id: 'business-finance',
    title: 'Business, Economics & Finance',
    iconName: 'TrendingUp',
    description: 'Financial markets, entrepreneurship, strategic management, marketing, and quantitative economics.',
    sampleDegrees: ['BBA (Hons)', 'BSc Accounting & Finance', 'BS Economics & Data Analytics', 'BS FinTech', 'BS Supply Chain'],
    subFields: ['Investment Banking', 'Corporate Strategy', 'FinTech', 'Digital Marketing', 'Econometrics'],
    badgeColor: '#C79A3D'
  },
  {
    id: 'healthcare-bio',
    title: 'Healthcare, Pharmacy & Bio-Sciences',
    iconName: 'HeartPulse',
    description: 'Clinical therapeutics, genetics, pharmacology, bioinformatics, and biomedical technologies.',
    sampleDegrees: ['Pharm-D (5 Years)', 'BS Bioinformatics', 'BS Biotechnology', 'BS Medical Lab Tech', 'BS Biochemistry'],
    subFields: ['Drug Discovery', 'Genomics', 'Clinical Trials', 'Computational Biology', 'Immunology'],
    badgeColor: '#2F6B4F'
  },
  {
    id: 'natural-sciences',
    title: 'Pure Sciences & Mathematics',
    iconName: 'Atom',
    description: 'Fundamental laws of the universe, quantum theory, organic synthesis, and pure mathematical modeling.',
    sampleDegrees: ['BS Physics', 'BS Mathematics', 'BS Chemistry', 'BS Statistics', 'BS Actuarial Science'],
    subFields: ['Quantum Mechanics', 'Mathematical Modeling', 'Nanotechnology', 'Data Inference', 'Astrophysics'],
    badgeColor: '#17284A'
  },
  {
    id: 'law-social',
    title: 'Law, Policy & Social Impact',
    iconName: 'Scale',
    description: 'Constitutional law, public administration, international relations, corporate governance, and ethics.',
    sampleDegrees: ['LLB (5 Years)', 'BS International Relations', 'BS Public Administration', 'BS Sociology'],
    subFields: ['Constitutional Law', 'Corporate Governance', 'Diplomacy', 'Development Studies', 'Human Rights'],
    badgeColor: '#B5482F'
  }
];

export const INTERVIEW_QUESTIONS: InterestInterviewQuestion[] = [
  {
    id: 1,
    question: 'When you are working on a challenging academic assignment or weekend project, what activity brings you the most focus and energy?',
    explanation: 'Helps identify your intrinsic problem-solving archetype (analytical, conceptual, managerial, or diagnostic).',
    options: [
      {
        id: 'opt1',
        label: 'Building logic, writing scripts, fixing code bugs, or analyzing numeric patterns',
        archetypeWeights: { 'tech-computing': 5, 'natural-sciences': 3, 'engineering-applied': 2 }
      },
      {
        id: 'opt2',
        label: 'Tinkering with physical devices, circuits, model motors, or understanding how machines work',
        archetypeWeights: { 'engineering-applied': 5, 'natural-sciences': 2, 'tech-computing': 2 }
      },
      {
        id: 'opt3',
        label: 'Leading group presentations, analyzing company balance sheets, pitching project ideas, or trading/investing',
        archetypeWeights: { 'business-finance': 5, 'law-social': 2 }
      },
      {
        id: 'opt4',
        label: 'Understanding human physiology, biological experiments, cellular mechanics, or medical discoveries',
        archetypeWeights: { 'healthcare-bio': 5, 'natural-sciences': 2 }
      },
      {
        id: 'opt5',
        label: 'Debating constitutional principles, writing persuasive essays, or exploring social policy dilemmas',
        archetypeWeights: { 'law-social': 5, 'business-finance': 2 }
      }
    ]
  },
  {
    id: 2,
    question: 'Which type of real-world problem would you be most proud to dedicate your undergraduate studies towards solving?',
    explanation: 'Maps your long-term values to industry sectors and academic disciplines in Pakistan and globally.',
    options: [
      {
        id: 'opt1',
        label: 'Developing autonomous AI systems, high-speed software apps, or defending against cyber threats',
        archetypeWeights: { 'tech-computing': 5, 'engineering-applied': 2 }
      },
      {
        id: 'opt2',
        label: 'Constructing renewable energy grids, smart electric vehicles, or modern national infrastructure',
        archetypeWeights: { 'engineering-applied': 5, 'natural-sciences': 3 }
      },
      {
        id: 'opt3',
        label: 'Building high-growth venture startups, structuring capital investments, or optimizing global supply chains',
        archetypeWeights: { 'business-finance': 5, 'tech-computing': 1 }
      },
      {
        id: 'opt4',
        label: 'Formulating novel pharmaceutical drugs, combating epidemic diseases, or advancing genetic diagnostics',
        archetypeWeights: { 'healthcare-bio': 5, 'natural-sciences': 3 }
      },
      {
        id: 'opt5',
        label: 'Advancing corporate legal frameworks, judicial reform, or formulating national economic policies',
        archetypeWeights: { 'law-social': 5, 'business-finance': 3 }
      }
    ]
  },
  {
    id: 3,
    question: 'How do you prefer to spend your ideal workday in a university or research environment?',
    explanation: 'Evaluates your operational work style: laboratory/experimental, desk computation, or interpersonal teamwork.',
    options: [
      {
        id: 'opt1',
        label: 'Deep individual concentration at a dual-monitor workstation solving algorithmic logic and building systems',
        archetypeWeights: { 'tech-computing': 5, 'natural-sciences': 2 }
      },
      {
        id: 'opt2',
        label: 'Collaborating in a workshop or laboratory surrounded by oscilloscopes, microcontrollers, and physical hardware',
        archetypeWeights: { 'engineering-applied': 5, 'natural-sciences': 2 }
      },
      {
        id: 'opt3',
        label: 'Interacting with cross-functional teams, negotiating partnerships, and presenting data dashboards',
        archetypeWeights: { 'business-finance': 5, 'law-social': 3 }
      },
      {
        id: 'opt4',
        label: 'Conducting biochemical assays, molecular tests, and clinical laboratory documentation',
        archetypeWeights: { 'healthcare-bio': 5 }
      }
    ]
  },
  {
    id: 4,
    question: 'Which academic subjects during Matric/FSc or O/A-Levels gave you the highest satisfaction when you mastered them?',
    explanation: 'Correlates your historical academic aptitude with university curriculum prerequisites.',
    options: [
      {
        id: 'opt1',
        label: 'Computer Science & Mathematics (Algebra, Trigonometry, Calculus)',
        archetypeWeights: { 'tech-computing': 5, 'natural-sciences': 3 }
      },
      {
        id: 'opt2',
        label: 'Physics (Mechanics, Electromagnetism) & Advanced Mathematics',
        archetypeWeights: { 'engineering-applied': 5, 'natural-sciences': 4 }
      },
      {
        id: 'opt3',
        label: 'Accounting, Economics, Statistics, or Commerce',
        archetypeWeights: { 'business-finance': 5 }
      },
      {
        id: 'opt4',
        label: 'Biology (Botany, Zoology, Genetics) & Chemistry',
        archetypeWeights: { 'healthcare-bio': 5, 'natural-sciences': 2 }
      },
      {
        id: 'opt5',
        label: 'English Literature, History, Civics, or Pakistan Studies',
        archetypeWeights: { 'law-social': 5 }
      }
    ]
  }
];
