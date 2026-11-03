import { StudyPlanWeek } from '../types';

export const INITIAL_STUDY_PLAN: StudyPlanWeek[] = [
  {
    weekNumber: 1,
    title: 'Week 1: Quantitative Core & Analytical Foundations',
    theme: 'Algebra, Matrices & English Sentence Equivalence',
    objective: 'Master high-weightage matrix determinants, conic sections, and core GRE/SAT grammar rules.',
    tasks: [
      {
        id: 'w1-t1',
        time: '4:00 PM – 5:30 PM',
        subject: 'Mathematics',
        topic: 'Matrices, Determinants & Cramer’s Rule (FSc Book 1 Ch 3)',
        resource: 'Standard textbook practice + 25 past NET MCQs',
        completed: true
      },
      {
        id: 'w1-t2',
        time: '5:45 PM – 7:00 PM',
        subject: 'Physics',
        topic: 'Vectors & Equilibrium: Dot/Cross Products and Torque (FSc Book 1 Ch 2)',
        resource: 'ECAT/NET chapterwise drill set',
        completed: true
      },
      {
        id: 'w1-t3',
        time: '8:30 PM – 9:30 PM',
        subject: 'English',
        topic: 'Subject-Verb Agreement & Modifier Rules (IBA/SAT Grammar)',
        resource: 'Flashcards + 20 sentence correction drills',
        completed: false
      }
    ]
  },
  {
    weekNumber: 2,
    title: 'Week 2: Advanced Calculus & Electromagnetism',
    theme: 'Limits, Differentiation, Integration & Gauss’s Law',
    objective: 'Solve rapid differential calculus problems and conceptual electrostatics for NUST NET / FAST tests.',
    tasks: [
      {
        id: 'w2-t1',
        time: '4:00 PM – 5:30 PM',
        subject: 'Mathematics',
        topic: 'Limits, Continuity & Derivatives Shortcuts (FSc Book 2 Ch 1 & 2)',
        resource: 'Past 5-year NET/GIKI shortcut technique sheet',
        completed: false
      },
      {
        id: 'w2-t2',
        time: '5:45 PM – 7:00 PM',
        subject: 'Physics',
        topic: 'Electrostatics & Electric Potential (FSc Book 2 Ch 12)',
        resource: 'Conceptual problem sets & formula revision',
        completed: false
      },
      {
        id: 'w2-t3',
        time: '8:30 PM – 9:30 PM',
        subject: 'Logical Reasoning',
        topic: 'Deductive Syllogisms & Seating Arrangements',
        resource: '30 high-speed analytical questions',
        completed: false
      }
    ]
  },
  {
    weekNumber: 3,
    title: 'Week 3: Conics, Electrodynamics & Reading Comprehension',
    theme: 'Analytical Geometry, Conic Sections & Magnetism',
    objective: 'Cover ellipse/hyperbola formulas, Lorentz force, and long passage comprehension techniques.',
    tasks: [
      {
        id: 'w3-t1',
        time: '4:00 PM – 5:30 PM',
        subject: 'Mathematics',
        topic: 'Analytical Geometry: Circles, Parabola & Hyperbola (FSc Book 2 Ch 6)',
        resource: 'UET ECAT past paper solved bank',
        completed: false
      },
      {
        id: 'w3-t2',
        time: '5:45 PM – 7:00 PM',
        subject: 'Physics',
        topic: 'Electromagnetism & Faraday’s Induction Law (FSc Book 2 Ch 14 & 15)',
        resource: 'Numerical problem solver bank',
        completed: false
      },
      {
        id: 'w3-t3',
        time: '8:30 PM – 9:30 PM',
        subject: 'English',
        topic: 'Speed Reading & Inference Questions in Passages',
        resource: '5 timed long passage drills',
        completed: false
      }
    ]
  },
  {
    weekNumber: 4,
    title: 'Week 4: Full-Length Timed Simulations & Revision',
    theme: 'Full Mock Exams & Weak Area Elimination',
    objective: 'Simulate realistic 3-hour test conditions under timed pressure and review wrong attempts.',
    tasks: [
      {
        id: 'w4-t1',
        time: '10:00 AM – 1:00 PM',
        subject: 'Full Mock Test',
        topic: 'Full 200-MCQ NUST NET Computer Science / Engineering Simulation',
        resource: 'UniPath Test Engine Timed Mode',
        completed: false
      },
      {
        id: 'w4-t2',
        time: '4:00 PM – 6:00 PM',
        subject: 'Test Review',
        topic: 'Comprehensive Error Log Analysis & Formula Sheet Flash Review',
        resource: 'UniPath Weak Areas Drill Recommendations',
        completed: false
      }
    ]
  }
];
