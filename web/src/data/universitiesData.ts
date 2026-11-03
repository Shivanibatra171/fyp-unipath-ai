import { University } from '../types';

export const UNIVERSITIES_DATA: University[] = [
  {
    id: 'nust',
    name: 'National University of Sciences and Technology',
    shortName: 'NUST',
    tagline: 'Defining Futures through Innovation, Research & Leadership',
    city: 'Islamabad',
    province: 'Federal Capital',
    type: 'Public',
    founded: 1991,
    hecRanking: '#1 General Category (Engineering & Technology)',
    qsRanking: '#353 Global (QS World University Rankings 2025)',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=160&auto=format&fit=crop&q=80',
    badgeAccent: '#17284A',
    overview: 'NUST is Pakistan’s premier science and technology research institution located in Sector H-12, Islamabad. Spanning over 700 acres, it houses state-of-the-art schools including SEECS, SMME, SCME, ASAB, and NBS. NUST is internationally accredited with Washington Accord (PEC) Tier-1 engineering status.',
    accreditations: ['PEC Tier-1 (Washington Accord)', 'HEC Recognized', 'NCEAC (Computing)', 'AACSB Member (NBS)'],
    acceptedTests: ['NUST Entry Test (NET-1, 2, 3, 4)', 'ACT / SAT (National & International Seats)'],
    aggregateWeights: {
      entryTest: 75,
      fscHssc: 15,
      matricSsc: 10,
    },
    meritFormulaExplanation: '75% Weightage to best NET score + 15% HSSC-I / FSc Part-1 marks + 10% SSC / Matric marks.',
    averageSemesterFeeRange: 'PKR 145,000 – PKR 190,000 / semester',
    hostelAvailable: true,
    hostelDetails: 'On-campus separate hostels for boys and girls with furnished rooms, mess, high-speed WiFi, laundry, and round-the-clock security.',
    transportAvailable: true,
    facilities: ['National Science & Technology Park (NSTP)', 'Central Library with 100k+ volumes', 'Olympic Size Swimming Pool', 'Gymnasium & Indoor Sports Complex', 'Shifa Health Center', 'Incubation & Co-working Hubs'],
    scholarships: [
      {
        id: 'nust-need-based',
        name: 'NUST Need-Based Financial Aid (NBS)',
        type: 'Need-Based',
        coverage: 'Up to 100% Tuition Fee + Hostel Subsidy',
        eligibility: 'Demonstrated household income under PKR 120,000/month; admitted on open merit.',
        applicationDeadline: 'June 30, 2026',
        linkText: 'Submit NUST Financial Aid Form with admission application'
      },
      {
        id: 'ehsaas-nust',
        name: 'HEC Need-Based / Ehsaas Scholarship',
        type: 'National Program',
        coverage: 'Full Tuition + PKR 5,000 monthly living stipend',
        eligibility: 'Undergraduate students from low-income background across Pakistan.',
        applicationDeadline: 'August 15, 2026'
      },
      {
        id: 'nust-merit',
        name: 'NUST Rector Merit Scholarship',
        type: 'Merit-Based',
        coverage: '50% - 100% semester fee waiver for top 3 rankers in each department',
        eligibility: 'Semester GPA >= 3.85',
        applicationDeadline: 'Renewed per semester'
      }
    ],
    timeline: [
      { title: 'NET-1 Registration', date: 'Oct 15 - Nov 20, 2025', status: 'Closed' },
      { title: 'NET-2 Registration', date: 'Jan 05 - Feb 10, 2026', status: 'Closed' },
      { title: 'NET-3 Registration', date: 'Mar 10 - Apr 15, 2026', status: 'Open' },
      { title: 'NET-4 Registration (Final)', date: 'May 01 - Jun 25, 2026', status: 'Upcoming' },
      { title: 'First Merit List Display', date: 'August 08, 2026', status: 'Upcoming' },
      { title: 'Commencement of Classes', date: 'September 08, 2026', status: 'Upcoming' }
    ],
    helpline: {
      phone: '+92-51-90856880',
      email: 'admissions@nust.edu.pk',
      address: 'Main Office, Sector H-12, Islamabad, 44000, Pakistan',
      admissionsPortalUrl: 'https://ugadmissions.nust.edu.pk',
      workingHours: 'Monday – Friday: 9:00 AM – 5:00 PM PKT'
    },
    programs: [
      {
        id: 'nust-bs-cs',
        universityId: 'nust',
        universityName: 'NUST',
        name: 'BS Computer Science',
        code: 'CS-SEECS',
        degreeType: 'BS',
        faculty: 'School of Electrical Engineering and Computer Science (SEECS)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 165000,
        annualFeePKR: 330000,
        eligibilityCriteria: {
          minFscPercent: 60,
          allowedGroups: ['ICS (Physics)', 'ICS (Stats)', 'Pre-Engineering', 'General Science', 'A-Levels (CompSci)', 'A-Levels (Pre-Eng)'],
          requiredTest: 'NET (Computer Science Stream)'
        },
        meritAggregateFormula: '75% NET + 15% FSc-I + 10% Matric',
        lastYearClosingMeritPercent: 78.4,
        seats: 220,
        description: 'Comprehensive curriculum covering Systems Programming, Distributed Computing, AI/ML, Algorithms, Cloud Architecture, and Software Development.',
        keySubjects: ['Data Structures & Algorithms', 'Operating Systems', 'Machine Learning', 'Computer Networks', 'Database Systems'],
        careerProspects: ['Software Engineer', 'AI / ML Specialist', 'Systems Architect', 'Cloud DevOps Engineer', 'Quantitative Analyst'],
        scholarshipAvailable: true
      },
      {
        id: 'nust-bs-se',
        universityId: 'nust',
        universityName: 'NUST',
        name: 'BS Software Engineering',
        code: 'SE-SEECS',
        degreeType: 'BS',
        faculty: 'School of Electrical Engineering and Computer Science (SEECS)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 165000,
        annualFeePKR: 330000,
        eligibilityCriteria: {
          minFscPercent: 60,
          allowedGroups: ['ICS (Physics)', 'Pre-Engineering', 'A-Levels (CompSci)', 'A-Levels (Pre-Eng)'],
          requiredTest: 'NET (Engineering/CS Stream)'
        },
        meritAggregateFormula: '75% NET + 15% FSc-I + 10% Matric',
        lastYearClosingMeritPercent: 77.1,
        seats: 150,
        description: 'Focuses on scalable architecture, agile methodologies, requirements engineering, DevOps pipelines, and enterprise systems design.',
        keySubjects: ['Software Architecture', 'Agile Methodologies', 'Software Quality Assurance', 'Mobile App Development', 'Cloud Computing'],
        careerProspects: ['Full-Stack Developer', 'DevOps Lead', 'QA Automation Engineer', 'Product Engineer', 'Tech Lead'],
        scholarshipAvailable: true
      },
      {
        id: 'nust-be-ee',
        universityId: 'nust',
        universityName: 'NUST',
        name: 'BE Electrical Engineering',
        code: 'EE-SEECS',
        degreeType: 'BE',
        faculty: 'SEECS / College of E&ME',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 165000,
        annualFeePKR: 330000,
        eligibilityCriteria: {
          minFscPercent: 60,
          allowedGroups: ['Pre-Engineering', 'A-Levels (Pre-Eng)'],
          requiredTest: 'NET (Engineering Stream)'
        },
        meritAggregateFormula: '75% NET + 15% FSc-I + 10% Matric',
        lastYearClosingMeritPercent: 71.8,
        seats: 200,
        description: 'PEC Tier-1 accredited program spanning Power Systems, Embedded Systems, Telecom, RF & Microwave, and Digital Signal Processing.',
        keySubjects: ['Linear Circuit Analysis', 'Microprocessors & Microcontrollers', 'Signals & Systems', 'Power Distribution', 'Communication Systems'],
        careerProspects: ['Embedded Systems Engineer', 'Power Grid Consultant', 'Telecom Engineer', 'Robotics Specialist'],
        scholarshipAvailable: true
      },
      {
        id: 'nust-bba',
        universityId: 'nust',
        universityName: 'NUST',
        name: 'Bachelor of Business Administration (BBA)',
        code: 'BBA-NBS',
        degreeType: 'BBA',
        faculty: 'NUST Business School (NBS)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 155000,
        annualFeePKR: 310000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['Pre-Engineering', 'Pre-Medical', 'ICS (Physics)', 'I.Com', 'General Science', 'Humanities/FA', 'A-Levels (Pre-Eng)', 'A-Levels (Pre-Med)'],
          requiredTest: 'NET (Business / Social Sciences Stream)'
        },
        meritAggregateFormula: '75% NET + 15% FSc-I + 10% Matric',
        lastYearClosingMeritPercent: 74.2,
        seats: 180,
        description: 'AACSB-member business curriculum providing intensive training in Finance, Supply Chain Management, Marketing, and FinTech.',
        keySubjects: ['Financial Accounting', 'Corporate Finance', 'Strategic Marketing', 'Operations Management', 'Business Analytics'],
        careerProspects: ['Investment Banker', 'Brand Manager', 'Management Consultant', 'Supply Chain Analyst', 'Entrepreneur'],
        scholarshipAvailable: true
      }
    ]
  },
  {
    id: 'lums',
    name: 'Lahore University of Management Sciences',
    shortName: 'LUMS',
    tagline: 'Learning Without Borders — Inspiring Leadership & Purpose',
    city: 'Lahore',
    province: 'Punjab',
    type: 'Private',
    founded: 1985,
    hecRanking: '#1 Private Sector University',
    qsRanking: '#535 Global (Top 100 in Asian Rankings)',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=160&auto=format&fit=crop&q=80',
    badgeAccent: '#C79A3D',
    overview: 'LUMS is Pakistan’s leading research and liberal arts university situated in DHA Phase-5, Lahore. Known for its rigorous academic culture, world-class faculty, diverse student body, and extraordinary financial aid program (National Outreach Program - NOP).',
    accreditations: ['AACSB Accredited (SDSB)', 'HEC Recognized', 'PEC Tier-1 (SBASSE)', 'Pakistan Bar Council (SAHSOL)'],
    acceptedTests: ['SAT-1 (Digital SAT)', 'LCAT (LUMS Common Admission Test)', 'ACT', 'SBASSE Subject Test (Scientific Aptitude)'],
    aggregateWeights: {
      entryTest: 45,
      fscHssc: 35,
      matricSsc: 20,
    },
    meritFormulaExplanation: 'Holistic review combining SAT/LCAT score, Matric/O-Levels, FSc/A-Levels, personal statement, extracurriculars, and SBASSE Subject Test for science applicants.',
    averageSemesterFeeRange: 'PKR 490,000 – PKR 570,000 / semester',
    hostelAvailable: true,
    hostelDetails: 'Superb residential life with on-campus single and shared hostel rooms, dining halls (PDC), cafes, 24/7 library, laundromat, and clinic.',
    transportAvailable: false,
    facilities: ['Syed Babar Ali School of Science and Engineering Labs', 'Rausing Executive Centre', 'State-of-the-art Sports Complex with Squash & Tennis Courts', 'Gad & Birgit Rausing Library', 'National Incubation Center Lahore'],
    scholarships: [
      {
        id: 'lums-nop',
        name: 'LUMS National Outreach Program (NOP)',
        type: 'National Program',
        coverage: '100% Full Ride (Tuition, Hostel, Mess, Books & Living Stipend)',
        eligibility: 'Talented students from underprivileged and remote regions with at least 80% in Matric.',
        applicationDeadline: 'March 15, 2026',
        linkText: 'Apply through LUMS NOP portal before Intermediate 2nd year'
      },
      {
        id: 'lums-financial-aid',
        name: 'LUMS Need-Based Financial Aid',
        type: 'Need-Based',
        coverage: '20% to 100% Tuition Assistance + Interest-Free Student Loans',
        eligibility: 'Over 1 in 3 LUMS students receive financial aid based on demonstrated need.',
        applicationDeadline: 'With regular admission deadline'
      },
      {
        id: 'lums-merit',
        name: 'LUMS Dean’s Honor List Merit Awards',
        type: 'Merit-Based',
        coverage: 'Up to 100% Tuition Fee waiver for top 10% in each cohort',
        eligibility: 'CGPA >= 3.80 at LUMS',
        applicationDeadline: 'Annually'
      }
    ],
    timeline: [
      { title: 'Online Admissions Open', date: 'October 15, 2025', status: 'Closed' },
      { title: 'Application Deadline (Round 1)', date: 'January 30, 2026', status: 'Closed' },
      { title: 'LCAT / SBASSE Subject Test', date: 'February 22, 2026', status: 'Closed' },
      { title: 'Financial Aid Form Submission', date: 'March 15, 2026', status: 'Open' },
      { title: 'Admission Decision Rollout', date: 'April 15 – June 30, 2026', status: 'Upcoming' },
      { title: 'Orientation & Classes', date: 'August 28, 2026', status: 'Upcoming' }
    ],
    helpline: {
      phone: '+92-42-35608000',
      email: 'admissions@lums.edu.pk',
      address: 'DHA Phase 5, Khayaban-e-Jinnah, Lahore Cantt, 54792, Pakistan',
      admissionsPortalUrl: 'https://admissions.lums.edu.pk',
      workingHours: 'Monday – Friday: 8:30 AM – 5:00 PM PKT'
    },
    programs: [
      {
        id: 'lums-bs-cs',
        universityId: 'lums',
        universityName: 'LUMS',
        name: 'BS Computer Science',
        code: 'CS-SBASSE',
        degreeType: 'BS',
        faculty: 'Syed Babar Ali School of Science and Engineering (SBASSE)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 520000,
        annualFeePKR: 1040000,
        eligibilityCriteria: {
          minFscPercent: 70,
          allowedGroups: ['Pre-Engineering', 'ICS (Physics)', 'General Science', 'A-Levels (Pre-Eng)', 'A-Levels (CompSci)'],
          requiredTest: 'LCAT / SAT-1 + SBASSE Subject Test'
        },
        meritAggregateFormula: 'Holistic evaluation (Test 45% + Academic Profile 55%)',
        lastYearClosingMeritPercent: 84.5,
        seats: 120,
        description: 'Elite computer science education modeled after MIT & Stanford curricula with intense research in Artificial Intelligence, Computer Vision, and Robotics.',
        keySubjects: ['Advanced Algorithms', 'Artificial Intelligence', 'Distributed Systems', 'Computer Architecture', 'Theory of Automata'],
        careerProspects: ['Silicon Valley Software Engineer', 'Research Scientist', 'Tech Founder', 'Quantitative Trader', 'ML Engineer'],
        scholarshipAvailable: true
      },
      {
        id: 'lums-bs-econ',
        universityId: 'lums',
        universityName: 'LUMS',
        name: 'BS Economics & Data Science',
        code: 'ECON-HSS',
        degreeType: 'BS',
        faculty: 'Mushtaq Ahmad Gurmani School of Humanities & Social Sciences (MGSHSS)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 510000,
        annualFeePKR: 1020000,
        eligibilityCriteria: {
          minFscPercent: 65,
          allowedGroups: ['Pre-Engineering', 'Pre-Medical', 'ICS (Stats)', 'I.Com', 'Humanities/FA', 'A-Levels (Pre-Eng)'],
          requiredTest: 'LCAT / SAT-1'
        },
        meritAggregateFormula: 'Holistic evaluation (SAT score + Academic Transcripts + Essay)',
        lastYearClosingMeritPercent: 81.0,
        seats: 100,
        description: 'Combines micro/macroeconomic theory, econometrics, data analytics, and computational modeling for evidence-based policy and business.',
        keySubjects: ['Econometrics', 'Microeconomic Theory', 'Data Analytics with Python/R', 'Financial Economics', 'Public Policy'],
        careerProspects: ['Economic Analyst', 'Data Scientist', 'Policy Advisor at World Bank/IMF', 'Management Consultant', 'Risk Analyst'],
        scholarshipAvailable: true
      },
      {
        id: 'lums-bsc-acc',
        universityId: 'lums',
        universityName: 'LUMS',
        name: 'BSc (Hons) Accounting and Finance',
        code: 'ACF-SDSB',
        degreeType: 'BS',
        faculty: 'Suleman Dawood School of Business (SDSB)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 535000,
        annualFeePKR: 1070000,
        eligibilityCriteria: {
          minFscPercent: 65,
          allowedGroups: ['Pre-Engineering', 'Pre-Medical', 'ICS (Physics)', 'I.Com', 'Humanities/FA', 'A-Levels (Pre-Eng)', 'A-Levels (Pre-Med)'],
          requiredTest: 'LCAT / SAT-1'
        },
        meritAggregateFormula: 'Holistic evaluation (SDSB Admission Matrix)',
        lastYearClosingMeritPercent: 83.0,
        seats: 130,
        description: 'AACSB-accredited business program providing maximum exemptions from ACCA, CFA, and ICAEW professional qualifications.',
        keySubjects: ['Financial Management', 'Auditing & Assurance', 'Corporate Valuation', 'Investment Banking', 'Taxation Law'],
        careerProspects: ['Chartered Accountant (ACCA/CA)', 'Private Equity Analyst', 'Chief Financial Officer track', 'Corporate Auditor'],
        scholarshipAvailable: true
      }
    ]
  },
  {
    id: 'fast-nuces',
    name: 'National University of Computer and Emerging Sciences',
    shortName: 'FAST-NUCES',
    tagline: 'Pioneering Excellence in Computing & Emerging Technologies',
    city: 'Islamabad (Campuses in Lahore, Karachi, Peshawar, CFD)',
    province: 'Multi-Campus',
    type: 'Chartered Non-Profit',
    founded: 2000,
    hecRanking: '#1 Computing Education & Industry Employability',
    qsRanking: '#400-450 in Asian University Rankings',
    logo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=160&auto=format&fit=crop&q=80',
    badgeAccent: '#17284A',
    overview: 'FAST-NUCES is widely revered as Pakistan’s tech powerhouse. Founded by the Foundation for Advancement of Science and Technology (FAST), it produces over 30% of the country’s leading software engineers, IT executives, and startup founders.',
    accreditations: ['NCEAC Highest W-Category', 'PEC Tier-1', 'HEC Recognized'],
    acceptedTests: ['FAST Admission Test (NU Test)', 'NTS NAT-IE / NAT-ICS', 'SAT-1 (Digital SAT)'],
    aggregateWeights: {
      entryTest: 50,
      fscHssc: 50,
      matricSsc: 0,
    },
    meritFormulaExplanation: '50% Weightage to NU Entry Test (or NTS NAT score with penalty formula) + 50% HSSC / FSc Part-1 marks.',
    averageSemesterFeeRange: 'PKR 170,000 – PKR 195,000 / semester',
    hostelAvailable: true,
    hostelDetails: 'Hostel facilities available at Islamabad, Lahore, Peshawar, and CFD campuses on merit basis.',
    transportAvailable: true,
    facilities: ['Specialized GPU & Deep Learning Labs', 'Robotics & Embedded Systems Center', 'High-Speed Fiber Backbone', 'Kinnaird / SOFTEC Tech Festivals Host', 'Extensive Placement Office'],
    scholarships: [
      {
        id: 'fast-merit',
        name: 'FAST Academic Excellence Merit Scholarship',
        type: 'Merit-Based',
        coverage: 'Full tuition fee waiver for campus position holders',
        eligibility: 'Top 3 positions in each batch semester-wise (SGPA >= 3.80).',
        applicationDeadline: 'Auto-applied per semester'
      },
      {
        id: 'fast-financial-aid',
        name: 'FAST Need-Based Financial Assistance',
        type: 'Need-Based',
        coverage: '25% - 75% Tuition Fee Loan / Grant',
        eligibility: 'Students facing genuine financial distress; verified by Campus Committee.',
        applicationDeadline: 'First month of each semester'
      },
      {
        id: 'peef-fast',
        name: 'Punjab Educational Endowment Fund (PEEF)',
        type: 'National Program',
        coverage: '100% Tuition Fee + Monthly Stipend',
        eligibility: 'Punjab domicile, orphan or parents income <= PKR 60,000/month.',
        applicationDeadline: 'September 30, 2026'
      }
    ],
    timeline: [
      { title: 'Online Admission Registration', date: 'May 15 – June 30, 2026', status: 'Upcoming' },
      { title: 'FAST NU Computer-Based Test', date: 'July 06 – July 20, 2026', status: 'Upcoming' },
      { title: 'Merit List Announcement', date: 'July 28, 2026', status: 'Upcoming' },
      { title: 'Fee Submission Deadline', date: 'August 08, 2026', status: 'Upcoming' },
      { title: 'Fall Semester Orientation', date: 'August 24, 2026', status: 'Upcoming' }
    ],
    helpline: {
      phone: '+92-51-111-128-128',
      email: 'admissions@nu.edu.pk',
      address: 'A.K. Brohi Road, Sector H-11/4, Islamabad, Pakistan',
      admissionsPortalUrl: 'https://admissions.nu.edu.pk',
      workingHours: 'Monday – Friday: 9:00 AM – 4:30 PM PKT'
    },
    programs: [
      {
        id: 'fast-bs-cs',
        universityId: 'fast-nuces',
        universityName: 'FAST-NUCES',
        name: 'BS Computer Science',
        code: 'BSCS',
        degreeType: 'BS',
        faculty: 'Faculty of Computing',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 185000,
        annualFeePKR: 370000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['ICS (Physics)', 'ICS (Stats)', 'Pre-Engineering', 'General Science', 'A-Levels (CompSci)'],
          requiredTest: 'FAST NU Test / NTS NAT-ICS'
        },
        meritAggregateFormula: '50% NU Test + 50% FSc Part-1',
        lastYearClosingMeritPercent: 73.5,
        seats: 350,
        description: 'Industry-standard rigorous computing degree legendary for coding fundamentals, data structures, compiler design, and software development.',
        keySubjects: ['Advanced Programming in C++', 'Data Structures', 'Design & Analysis of Algorithms', 'Database Systems', 'Parallel Distributed Computing'],
        careerProspects: ['Software Development Engineer (SDE)', 'Backend Engineer', 'Solutions Architect', 'Cybersecurity Analyst'],
        scholarshipAvailable: true
      },
      {
        id: 'fast-bs-ai',
        universityId: 'fast-nuces',
        universityName: 'FAST-NUCES',
        name: 'BS Artificial Intelligence',
        code: 'BSAI',
        degreeType: 'BS',
        faculty: 'Faculty of Computing',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 185000,
        annualFeePKR: 370000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['ICS (Physics)', 'Pre-Engineering', 'A-Levels (CompSci)', 'A-Levels (Pre-Eng)'],
          requiredTest: 'FAST NU Test'
        },
        meritAggregateFormula: '50% NU Test + 50% FSc Part-1',
        lastYearClosingMeritPercent: 72.8,
        seats: 120,
        description: 'Specialized program focusing on Deep Neural Networks, Natural Language Processing, Reinforcement Learning, Computer Vision, and Generative AI.',
        keySubjects: ['Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Knowledge Representation', 'Reinforcement Learning'],
        careerProspects: ['AI Engineer', 'Machine Learning Specialist', 'Computer Vision Developer', 'Prompt & LLM Engineer'],
        scholarshipAvailable: true
      },
      {
        id: 'fast-bs-ds',
        universityId: 'fast-nuces',
        universityName: 'FAST-NUCES',
        name: 'BS Data Science',
        code: 'BSDS',
        degreeType: 'BS',
        faculty: 'Faculty of Computing',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 185000,
        annualFeePKR: 370000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['ICS (Physics)', 'ICS (Stats)', 'Pre-Engineering', 'A-Levels (CompSci)'],
          requiredTest: 'FAST NU Test'
        },
        meritAggregateFormula: '50% NU Test + 50% FSc Part-1',
        lastYearClosingMeritPercent: 71.0,
        seats: 120,
        description: 'Curriculum bridging Statistical Modeling, Big Data Technologies (Hadoop/Spark), Predictive Analytics, and Business Intelligence.',
        keySubjects: ['Statistical Machine Learning', 'Big Data Analytics', 'Data Warehousing', 'Data Visualization', 'Time Series Forecasting'],
        careerProspects: ['Data Scientist', 'Business Intelligence Developer', 'Data Engineer', 'Quantitative Data Analyst'],
        scholarshipAvailable: true
      }
    ]
  },
  {
    id: 'iba-karachi',
    name: 'Institute of Business Administration Karachi',
    shortName: 'IBA Karachi',
    tagline: 'Ideas for Innovation, Leadership for Impact',
    city: 'Karachi',
    province: 'Sindh',
    type: 'Public',
    founded: 1955,
    hecRanking: '#1 Business School in Sindh / Top 2 Nationwide',
    qsRanking: '#300 in Asian Business & Management Studies',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=160&auto=format&fit=crop&q=80',
    badgeAccent: '#B5482F',
    overview: 'Established in 1955 in collaboration with the Wharton School of the University of Pennsylvania, IBA is the oldest business school outside North America. Located in University Road and City Campus Saddar, IBA now excels in Business, Computer Science, Economics, and Mathematics.',
    accreditations: ['AACSB Member', 'AMBA Accredited', 'HEC Recognized', 'NCEAC (Computing)'],
    acceptedTests: ['IBA Aptitude Test (Math + English)', 'SAT-1 (Digital SAT score >= 1270 exempts from test)', 'ACT'],
    aggregateWeights: {
      entryTest: 60,
      fscHssc: 25,
      matricSsc: 15,
    },
    meritFormulaExplanation: 'Cut-off score in IBA Aptitude Test (English + Mathematics minimum sectional score required) + Panel Interview for shortlisted candidates.',
    averageSemesterFeeRange: 'PKR 295,000 – PKR 350,000 / semester',
    hostelAvailable: true,
    hostelDetails: 'State-of-the-art residential complexes at Main Campus (Karachi University compound) with air-conditioned rooms, cafeteria, and sports fields.',
    transportAvailable: true,
    facilities: ['Aman Tower (City Campus)', 'Center for Excellence in Islamic Finance', 'Martin Dow Gymnasium', 'Library with Financial Data Terminals (Bloomberg)', 'Alumni Resource Center'],
    scholarships: [
      {
        id: 'iba-nthp',
        name: 'IBA National Talent Hunt Program (NTHP)',
        type: 'National Program',
        coverage: '100% Full Ride (Full Tuition, Hostel, Laptop, Books & PKR 8,000/mo allowance)',
        eligibility: 'Meritorious students from Balochistan, KPK, Gilgit-Baltistan, FATA, AJK, and rural Sindh.',
        applicationDeadline: 'February 28, 2026',
        linkText: 'Apply via IBA NTHP portal'
      },
      {
        id: 'iba-financial-aid',
        name: 'IBA Need-Based Financial Assistance',
        type: 'Need-Based',
        coverage: '25% - 100% Tuition Waiver and Qarz-e-Hasna',
        eligibility: 'Awarded to over 35% of the undergraduate student body based on family financial assessment.',
        applicationDeadline: 'Submitted with admission packet'
      }
    ],
    timeline: [
      { title: 'Round 1 Online Application Deadline', date: 'January 10, 2026', status: 'Closed' },
      { title: 'Round 1 Aptitude Test', date: 'February 08, 2026', status: 'Closed' },
      { title: 'Round 2 Application Deadline', date: 'June 05, 2026', status: 'Open' },
      { title: 'Round 2 Aptitude Test', date: 'June 28, 2026', status: 'Upcoming' },
      { title: 'Final Interviews & Merit List', date: 'July 20, 2026', status: 'Upcoming' },
      { title: 'Commencement of Fall Term', date: 'August 18, 2026', status: 'Upcoming' }
    ],
    helpline: {
      phone: '+92-21-38104700',
      email: 'admissions@iba.edu.pk',
      address: 'Main Campus: University Road, Karachi, 75270, Pakistan',
      admissionsPortalUrl: 'https://admissions.iba.edu.pk',
      workingHours: 'Monday – Friday: 9:00 AM – 5:00 PM PKT'
    },
    programs: [
      {
        id: 'iba-bba',
        universityId: 'iba-karachi',
        universityName: 'IBA Karachi',
        name: 'Bachelor of Business Administration (BBA)',
        code: 'BBA',
        degreeType: 'BBA',
        faculty: 'School of Business Studies (SBS)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 340000,
        annualFeePKR: 680000,
        eligibilityCriteria: {
          minFscPercent: 65,
          allowedGroups: ['Pre-Engineering', 'Pre-Medical', 'ICS (Physics)', 'I.Com', 'General Science', 'Humanities/FA', 'A-Levels (Pre-Eng)'],
          requiredTest: 'IBA Aptitude Test (BBA Cutoff)'
        },
        meritAggregateFormula: 'IBA Aptitude Test Cut-off + Interview Score',
        lastYearClosingMeritPercent: 76.0,
        seats: 250,
        description: 'Flagship business degree with experiential learning, mandatory summer corporate internships, case study pedagogy, and global exchange semesters.',
        keySubjects: ['Managerial Accounting', 'Corporate Strategy', 'Marketing Analytics', 'Financial Markets', 'Organizational Behavior'],
        careerProspects: ['Management Trainee Officer (MTO)', 'Brand Strategist', 'Equity Analyst', 'FMCG Corporate Leader'],
        scholarshipAvailable: true
      },
      {
        id: 'iba-bs-cs',
        universityId: 'iba-karachi',
        universityName: 'IBA Karachi',
        name: 'BS Computer Science',
        code: 'BS-CS',
        degreeType: 'BS',
        faculty: 'School of Mathematics & Computer Science (SMCS)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 310000,
        annualFeePKR: 620000,
        eligibilityCriteria: {
          minFscPercent: 60,
          allowedGroups: ['ICS (Physics)', 'Pre-Engineering', 'General Science', 'A-Levels (CompSci)', 'A-Levels (Pre-Eng)'],
          requiredTest: 'IBA Aptitude Test (Math + English)'
        },
        meritAggregateFormula: 'IBA Aptitude Test Cut-off + Interview Score',
        lastYearClosingMeritPercent: 74.0,
        seats: 120,
        description: 'High-impact computing program uniting theoretical computer science with financial technology, distributed databases, and high-frequency trading systems.',
        keySubjects: ['Algorithms & Complexity', 'Distributed Systems', 'Applied Machine Learning', 'FinTech Architecture', 'Cybersecurity'],
        careerProspects: ['FinTech Developer', 'Software Architect', 'Information Security Officer', 'Cloud Systems Specialist'],
        scholarshipAvailable: true
      },
      {
        id: 'iba-bs-econ',
        universityId: 'iba-karachi',
        universityName: 'IBA Karachi',
        name: 'BS Economics & Mathematics',
        code: 'BS-EM',
        degreeType: 'BS',
        faculty: 'School of Economics & Social Sciences (SESS)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 295000,
        annualFeePKR: 590000,
        eligibilityCriteria: {
          minFscPercent: 60,
          allowedGroups: ['Pre-Engineering', 'Pre-Medical', 'ICS (Stats)', 'I.Com', 'Humanities/FA', 'A-Levels (Pre-Eng)'],
          requiredTest: 'IBA Aptitude Test'
        },
        meritAggregateFormula: 'IBA Aptitude Test Score + Interview',
        lastYearClosingMeritPercent: 71.5,
        seats: 90,
        description: 'Rigorous mathematical economics, statistical inference, quantitative macroeconomics, and computational game theory.',
        keySubjects: ['Mathematical Economics', 'Econometric Analysis', 'Game Theory', 'Quantitative Finance', 'Development Economics'],
        careerProspects: ['Central Bank Analyst (State Bank of Pakistan)', 'Actuarial Consultant', 'Economic Researcher', 'Policy Think Tank Fellow'],
        scholarshipAvailable: true
      }
    ]
  },
  {
    id: 'giki',
    name: 'Ghulam Ishaq Khan Institute of Engineering Sciences and Technology',
    shortName: 'GIKI',
    tagline: 'Where Technology Meets Integrity & Innovation',
    city: 'Topi, Swabi',
    province: 'Khyber Pakhtunkhwa',
    type: 'Private',
    founded: 1993,
    hecRanking: '#1 Private Engineering Institution',
    qsRanking: '#400-450 QS Asian Rankings (Top in Engineering Research)',
    logo: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=160&auto=format&fit=crop&q=80',
    badgeAccent: '#17284A',
    overview: 'GIKI is a fully residential, 400-acre world-class engineering sanctuary located in the foothills of Tarbela Dam in Topi, KPK. Renowned for its state-of-the-art laboratory infrastructure, elite alumni network in Silicon Valley and Europe, and 100% on-campus living experience.',
    accreditations: ['PEC Tier-1 (Washington Accord)', 'NCEAC (Computing)', 'HEC Recognized'],
    acceptedTests: ['GIKI Admission Test', 'SAT-1 / ACT (International & Overseas Pakistani Seats)'],
    aggregateWeights: {
      entryTest: 85,
      fscHssc: 10,
      matricSsc: 5,
    },
    meritFormulaExplanation: '85% GIKI Admission Test + 10% HSSC-I / FSc Part 1 + 5% SSC / Matric score.',
    averageSemesterFeeRange: 'PKR 410,000 – PKR 485,000 / semester',
    hostelAvailable: true,
    hostelDetails: '100% compulsory residential campus. All students provided modern hostel rooms with heating/cooling, high-speed fiber, central mess, and security.',
    transportAvailable: false,
    facilities: ['Advanced Nanotechnology Labs', 'Autonomous Vehicle & Robotics Testbeds', 'Olympic Standard Sports Pavilion & Lake', '24/7 Medical Center', 'The Catalyst GIKI Incubation Center'],
    scholarships: [
      {
        id: 'giki-financial-aid',
        name: 'GIKI Need-Based Financial Assistance (Fellowships)',
        type: 'Need-Based',
        coverage: 'Full or Partial Tuition Waiver + Interest-Free Loans',
        eligibility: 'Over 40% of enrolled students receive financial assistance from GIK Trust funds.',
        applicationDeadline: 'June 25, 2026'
      },
      {
        id: 'kpk-chief-minister-giki',
        name: 'Chief Minister KPK GIKI Scholarship',
        type: 'National Program',
        coverage: '100% Full Ride for Top KPK Domiciled Candidates',
        eligibility: 'KPK domicile holders securing top ranks in GIKI entrance examination.',
        applicationDeadline: 'With admission results'
      },
      {
        id: 'giki-alumni-endowment',
        name: 'GIKI Alumni Association (GIKIAA) Scholarship',
        type: 'Institutional',
        coverage: 'Full living expense + tuition support for meritorious needy scholars',
        eligibility: 'Assessed after 1st semester results based on GPA >= 3.20.',
        applicationDeadline: 'December 15, 2026'
      }
    ],
    timeline: [
      { title: 'Online Admission Application Opens', date: 'April 01, 2026', status: 'Open' },
      { title: 'Application Submission Deadline', date: 'June 18, 2026', status: 'Upcoming' },
      { title: 'GIKI Admission Test (Nationwide Centers)', date: 'July 04 – July 07, 2026', status: 'Upcoming' },
      { title: 'Merit List Announcement', date: 'July 15, 2026', status: 'Upcoming' },
      { title: 'Hostel Allotment & Registration', date: 'August 20, 2026', status: 'Upcoming' },
      { title: 'First Day of Academic Year', date: 'September 01, 2026', status: 'Upcoming' }
    ],
    helpline: {
      phone: '+92-938-271858',
      email: 'admissions@giki.edu.pk',
      address: 'GIK Institute, Topi, District Swabi, Khyber Pakhtunkhwa, 23640, Pakistan',
      admissionsPortalUrl: 'https://admissions.giki.edu.pk',
      workingHours: 'Monday – Friday: 8:00 AM – 4:00 PM PKT'
    },
    programs: [
      {
        id: 'giki-bs-cs',
        universityId: 'giki',
        universityName: 'GIKI',
        name: 'BS Computer Science',
        code: 'CS-FCSE',
        degreeType: 'BS',
        faculty: 'Faculty of Computer Science & Engineering (FCSE)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 450000,
        annualFeePKR: 900000,
        eligibilityCriteria: {
          minFscPercent: 60,
          allowedGroups: ['Pre-Engineering', 'ICS (Physics)', 'A-Levels (CompSci)', 'A-Levels (Pre-Eng)'],
          requiredTest: 'GIKI Admission Test'
        },
        meritAggregateFormula: '85% GIKI Test + 10% FSc-1 + 5% Matric',
        lastYearClosingMeritPercent: 78.0,
        seats: 120,
        description: 'Elite computer science curriculum emphasizing low-level system design, operating systems, compiler construction, machine intelligence, and cryptography.',
        keySubjects: ['Computer Architecture', 'Distributed Operating Systems', 'Artificial Intelligence', 'Network Security', 'Algorithmic Complexity'],
        careerProspects: ['Systems Software Engineer', 'Cybersecurity Specialist', 'Embedded Firmware Engineer', 'High Performance Computing Developer'],
        scholarshipAvailable: true
      },
      {
        id: 'giki-bs-cyber',
        universityId: 'giki',
        universityName: 'GIKI',
        name: 'BS Cyber Security',
        code: 'CY-FCSE',
        degreeType: 'BS',
        faculty: 'Faculty of Computer Science & Engineering (FCSE)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 450000,
        annualFeePKR: 900000,
        eligibilityCriteria: {
          minFscPercent: 60,
          allowedGroups: ['Pre-Engineering', 'ICS (Physics)', 'A-Levels (CompSci)'],
          requiredTest: 'GIKI Admission Test'
        },
        meritAggregateFormula: '85% GIKI Test + 10% FSc-1 + 5% Matric',
        lastYearClosingMeritPercent: 75.5,
        seats: 60,
        description: 'Comprehensive cybersecurity program covering offensive penetration testing, defensive SOC architecture, digital forensics, malware analysis, and cloud security.',
        keySubjects: ['Applied Cryptography', 'Ethical Hacking & PenTesting', 'Malware Analysis & Forensics', 'Cloud & Virtualization Security', 'Security Governance'],
        careerProspects: ['Penetration Tester / Red Teamer', 'SOC Security Analyst', 'Incident Responder', 'Cryptographic Engineer'],
        scholarshipAvailable: true
      },
      {
        id: 'giki-be-me',
        universityId: 'giki',
        universityName: 'GIKI',
        name: 'BE Mechanical Engineering',
        code: 'ME-FME',
        degreeType: 'BE',
        faculty: 'Faculty of Mechanical Engineering (FME)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 430000,
        annualFeePKR: 860000,
        eligibilityCriteria: {
          minFscPercent: 60,
          allowedGroups: ['Pre-Engineering', 'A-Levels (Pre-Eng)'],
          requiredTest: 'GIKI Admission Test'
        },
        meritAggregateFormula: '85% GIKI Test + 10% FSc-1 + 5% Matric',
        lastYearClosingMeritPercent: 72.0,
        seats: 100,
        description: 'PEC Tier-1 Washington Accord accredited mechanical program with specialized tracks in Aerospace, Automotive, Thermal Engineering, and Mechatronics.',
        keySubjects: ['Thermodynamics & Heat Transfer', 'Fluid Mechanics', 'CAD/CAM Finite Element Analysis', 'Robotics & Control', 'Automotive Systems'],
        careerProspects: ['Aerospace Design Engineer', 'Automotive Product Developer', 'Plant Operations Lead', 'HVAC & Energy Consultant'],
        scholarshipAvailable: true
      }
    ]
  },
  {
    id: 'qau',
    name: 'Quaid-i-Azam University Islamabad',
    shortName: 'QAU',
    tagline: 'Pakistan’s Highest Ranked Federal Research University',
    city: 'Islamabad',
    province: 'Federal Capital',
    type: 'Public',
    founded: 1967,
    hecRanking: '#1 Overall General University in Pakistan',
    qsRanking: '#315 Global (Highest in Pakistan)',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=160&auto=format&fit=crop&q=80',
    badgeAccent: '#2F6B4F',
    overview: 'Nestled at the base of the Margalla Hills, Quaid-i-Azam University is Pakistan’s top-ranked public research powerhouse. Celebrated for producing renowned national scientists, diplomats, economists, and researchers, QAU boasts the highest research publication output in the country.',
    accreditations: ['HEC #1 Ranked', 'Pharmacy Council of Pakistan (PCP)', 'Pakistan Bar Council (PBC)'],
    acceptedTests: ['QAU Departmental Entry Test / HEC USAT', 'Open Merit based on HSSC & SSC'],
    aggregateWeights: {
      entryTest: 30,
      fscHssc: 50,
      matricSsc: 20,
    },
    meritFormulaExplanation: '50% FSc / HSSC Marks + 20% Matric / SSC Marks + 30% Departmental Entrance Test (for selective disciplines).',
    averageSemesterFeeRange: 'PKR 45,000 – PKR 85,000 / semester (Most Affordable Premier Public)',
    hostelAvailable: true,
    hostelDetails: '14 on-campus residential halls accommodating over 6,000 students on provincial quota and merit basis.',
    transportAvailable: true,
    facilities: ['National Center for Physics (NCP)', 'Dr. Raziuddin Siddiqui Memorial Library', 'Biological Sciences Botanical Gardens', 'Margalla Hiking Trail Access', 'Central Scientific Instrumentation Cell'],
    scholarships: [
      {
        id: 'ehsaas-qau',
        name: 'HEC Need-Based & Ehsaas Undergraduate Scholarship',
        type: 'National Program',
        coverage: '100% Tuition Fee + PKR 50,000 annual stipend',
        eligibility: 'Enrolled undergraduate students meeting income criteria.',
        applicationDeadline: 'October 30, 2026'
      },
      {
        id: 'qau-merit-stipend',
        name: 'QAU Chancellor Merit Fellowship',
        type: 'Merit-Based',
        coverage: 'Full tuition exemption + Monthly book allowance for batch toppers',
        eligibility: 'Top merit rankers in each undergraduate discipline.',
        applicationDeadline: 'Awarded at time of admission'
      }
    ],
    timeline: [
      { title: 'Undergraduate Fall Admissions Advertised', date: 'July 01, 2026', status: 'Upcoming' },
      { title: 'Online Form Submission Deadline', date: 'August 05, 2026', status: 'Upcoming' },
      { title: 'Departmental Tests (BS CS & Pharm-D)', date: 'August 12, 2026', status: 'Upcoming' },
      { title: 'First Provincial Merit List Display', date: 'August 22, 2026', status: 'Upcoming' },
      { title: 'Commencement of Regular Classes', date: 'September 15, 2026', status: 'Upcoming' }
    ],
    helpline: {
      phone: '+92-51-90640000',
      email: 'admissions@qau.edu.pk',
      address: 'University Road, Islamabad, 45320, Pakistan',
      admissionsPortalUrl: 'https://ugadmissions.qau.edu.pk',
      workingHours: 'Monday – Friday: 8:30 AM – 4:00 PM PKT'
    },
    programs: [
      {
        id: 'qau-bs-physics',
        universityId: 'qau',
        universityName: 'QAU',
        name: 'BS Physics',
        code: 'BS-PHYS',
        degreeType: 'BS',
        faculty: 'Faculty of Natural Sciences',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 52000,
        annualFeePKR: 104000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['Pre-Engineering', 'ICS (Physics)', 'A-Levels (Pre-Eng)'],
          requiredTest: 'QAU Academic Merit (FSc + Matric)'
        },
        meritAggregateFormula: '70% FSc + 30% Matric',
        lastYearClosingMeritPercent: 82.3,
        seats: 80,
        description: 'Recognized as the premier physics department in South Asia, affiliated with CERN (Geneva) and the National Center for Physics.',
        keySubjects: ['Quantum Mechanics', 'Electrodynamics', 'Solid State Physics', 'Nuclear & Particle Physics', 'Statistical Mechanics'],
        careerProspects: ['Research Scientist at PAEC / NESCOM / KRL', 'Astrophysicist', 'Academia & Higher Research', 'Quantum Computing Specialist'],
        scholarshipAvailable: true
      },
      {
        id: 'qau-bs-cs',
        universityId: 'qau',
        universityName: 'QAU',
        name: 'BS Computer Science',
        code: 'BS-CS-QAU',
        degreeType: 'BS',
        faculty: 'Department of Computer Sciences',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 68000,
        annualFeePKR: 136000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['Pre-Engineering', 'ICS (Physics)', 'ICS (Stats)', 'A-Levels (CompSci)'],
          requiredTest: 'QAU Computer Science Entry Test'
        },
        meritAggregateFormula: '50% FSc + 20% Matric + 30% QAU CS Test',
        lastYearClosingMeritPercent: 80.5,
        seats: 60,
        description: 'Solid academic foundation in computational theory, distributed algorithms, data mining, and machine learning.',
        keySubjects: ['Theory of Computation', 'Database Architecture', 'Distributed Systems', 'Applied Machine Learning', 'Software Engineering'],
        careerProspects: ['Software Engineer', 'Data Engineer', 'Systems Programmer', 'IT Officer in Public Sector'],
        scholarshipAvailable: true
      },
      {
        id: 'qau-pharm-d',
        universityId: 'qau',
        universityName: 'QAU',
        name: 'Doctor of Pharmacy (Pharm-D)',
        code: 'PHARM-D',
        degreeType: 'Pharm-D',
        faculty: 'Faculty of Biological Sciences',
        durationYears: 5,
        totalSemesters: 10,
        semesterFeePKR: 78000,
        annualFeePKR: 156000,
        eligibilityCriteria: {
          minFscPercent: 60,
          allowedGroups: ['Pre-Medical', 'A-Levels (Pre-Med)'],
          requiredTest: 'Open Merit Evaluation'
        },
        meritAggregateFormula: '70% FSc Pre-Med + 30% Matric',
        lastYearClosingMeritPercent: 86.4,
        seats: 100,
        description: '5-year clinical and pharmaceutical professional doctorate accredited by the Pharmacy Council of Pakistan (PCP).',
        keySubjects: ['Pharmaceutics', 'Pharmacology & Therapeutics', 'Pharmaceutical Chemistry', 'Clinical Pharmacy', 'Hospital Pharmacy'],
        careerProspects: ['Hospital Pharmacist', 'Clinical Research Associate', 'Pharmaceutical QC Lead', 'Drug Regulatory Authority Inspector'],
        scholarshipAvailable: true
      }
    ]
  },
  {
    id: 'uet-lahore',
    name: 'University of Engineering and Technology Lahore',
    shortName: 'UET Lahore',
    tagline: 'Legacy of Engineering Leadership & Industrial Innovation since 1921',
    city: 'Lahore (Sub-campuses in Kala Shah Kaku, Faisalabad, Rachna, Narowal)',
    province: 'Punjab',
    type: 'Public',
    founded: 1921,
    hecRanking: '#2 Engineering Category in Pakistan',
    qsRanking: '#350-400 in Engineering & Technology Asia',
    logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=160&auto=format&fit=crop&q=80',
    badgeAccent: '#17284A',
    overview: 'Founded over a century ago in 1921, UET Lahore is Pakistan’s oldest and most prolific engineering university. It has built the critical infrastructure of Pakistan, from dams and power grids to telecommunications and software enterprises.',
    accreditations: ['PEC Tier-1 (Washington Accord)', 'HEC Recognized', 'PCATP (Architecture)', 'NCEAC (Computing)'],
    acceptedTests: ['Combined Entrance Test (ECAT) conducted by UET Lahore'],
    aggregateWeights: {
      entryTest: 33,
      fscHssc: 50,
      matricSsc: 17,
    },
    meritFormulaExplanation: '33% ECAT Test Score + 50% FSc (Pre-Engineering / ICS) Marks + 17% Matric / SSC Marks.',
    averageSemesterFeeRange: 'PKR 65,000 – PKR 95,000 / semester (Subsidized Regular Merit)',
    hostelAvailable: true,
    hostelDetails: '16 legendary residential halls (e.g. Zubair Hall, Mumtaz Hall) accommodating over 4,500 students.',
    transportAvailable: true,
    facilities: ['Center of Energy Research & Development (CERAD)', 'Automotive Research & Testing Center', 'Historic Main Auditorium', 'High Voltage Engineering Laboratory', 'Sports Grounds & Pavilion'],
    scholarships: [
      {
        id: 'peef-uet',
        name: 'Punjab Educational Endowment Fund (PEEF) for UET',
        type: 'National Program',
        coverage: 'Full Tuition Fee + PKR 4,000 monthly living stipend',
        eligibility: 'Punjab domicile with marks >= 60% and verified income below threshold.',
        applicationDeadline: 'October 15, 2026'
      },
      {
        id: 'uet-alumni-aid',
        name: 'UET Alumni Association Financial Aid',
        type: 'Institutional',
        coverage: '100% Tuition assistance for deserving engineers',
        eligibility: 'Assessed on financial hardship and maintaining good academic standing.',
        applicationDeadline: 'Semester start'
      }
    ],
    timeline: [
      { title: 'ECAT-1 (1st Phase)', date: 'March 11 – 15, 2026', status: 'Closed' },
      { title: 'ECAT-2 Registration', date: 'April 20 – May 25, 2026', status: 'Open' },
      { title: 'ECAT-2 Test Dates', date: 'June 08 – 12, 2026', status: 'Upcoming' },
      { title: 'Admission Portal Opens', date: 'June 25, 2026', status: 'Upcoming' },
      { title: '1st Merit List for All Faculties', date: 'July 25, 2026', status: 'Upcoming' },
      { title: 'Fall 2026 Session Commences', date: 'September 01, 2026', status: 'Upcoming' }
    ],
    helpline: {
      phone: '+92-42-99029216',
      email: 'admission@uet.edu.pk',
      address: 'Grand Trunk (G.T.) Road, Staff Houses, Lahore, 54890, Pakistan',
      admissionsPortalUrl: 'https://admission.uet.edu.pk',
      workingHours: 'Monday – Friday: 8:00 AM – 3:30 PM PKT'
    },
    programs: [
      {
        id: 'uet-be-ee',
        universityId: 'uet-lahore',
        universityName: 'UET Lahore',
        name: 'BSc Electrical Engineering',
        code: 'EE-UET',
        degreeType: 'BE',
        faculty: 'Faculty of Electrical Engineering',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 72000,
        annualFeePKR: 144000,
        eligibilityCriteria: {
          minFscPercent: 60,
          allowedGroups: ['Pre-Engineering', 'A-Levels (Pre-Eng)'],
          requiredTest: 'UET ECAT'
        },
        meritAggregateFormula: '33% ECAT + 50% FSc + 17% Matric',
        lastYearClosingMeritPercent: 74.8,
        seats: 240,
        description: 'PEC Tier-1 flagship electrical engineering curriculum covering power systems, smart grids, control engineering, telecommunications, and electronics.',
        keySubjects: ['Power Transmission & Distribution', 'Control Systems', 'Digital Signal Processing', 'Electric Machinery', 'Embedded Microcontrollers'],
        careerProspects: ['WAPDA / NTDC / DISCOs Power Engineer', 'Telecom Optimization Engineer', 'Control & Automation Lead', 'Electronics Hardware Engineer'],
        scholarshipAvailable: true
      },
      {
        id: 'uet-be-me',
        universityId: 'uet-lahore',
        universityName: 'UET Lahore',
        name: 'BSc Mechanical Engineering',
        code: 'ME-UET',
        degreeType: 'BE',
        faculty: 'Faculty of Mechanical Engineering',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 72000,
        annualFeePKR: 144000,
        eligibilityCriteria: {
          minFscPercent: 60,
          allowedGroups: ['Pre-Engineering', 'A-Levels (Pre-Eng)'],
          requiredTest: 'UET ECAT'
        },
        meritAggregateFormula: '33% ECAT + 50% FSc + 17% Matric',
        lastYearClosingMeritPercent: 73.2,
        seats: 220,
        description: 'Extensive hands-on training in thermal power plants, manufacturing tooling, robotics, CFD analysis, and HVAC engineering.',
        keySubjects: ['Mechanics of Materials', 'Applied Thermodynamics', 'Manufacturing Processes', 'Machine Design', 'Heat Exchanger Design'],
        careerProspects: ['Automotive Engineer at Pak Suzuki/Honda/Toyota', 'Power Plant Operations Engineer', 'Refinery Maintenance Lead', 'Design Engineer'],
        scholarshipAvailable: true
      },
      {
        id: 'uet-bs-cs',
        universityId: 'uet-lahore',
        universityName: 'UET Lahore',
        name: 'BS Computer Science',
        code: 'CS-UET',
        degreeType: 'BS',
        faculty: 'Department of Computer Science',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 78000,
        annualFeePKR: 156000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['Pre-Engineering', 'ICS (Physics)', 'ICS (Stats)', 'A-Levels (CompSci)'],
          requiredTest: 'UET ECAT (Math/Physics/CS)'
        },
        meritAggregateFormula: '33% ECAT + 50% FSc + 17% Matric',
        lastYearClosingMeritPercent: 78.5,
        seats: 120,
        description: 'Focused software and computing degree emphasizing algorithms, operating systems, cloud infrastructures, and web platforms.',
        keySubjects: ['Data Structures & Algorithms', 'Database Systems', 'Computer Networks', 'Operating Systems', 'Software Engineering'],
        careerProspects: ['Software Developer', 'Backend Engineer', 'Database Administrator', 'Network Operations Lead'],
        scholarshipAvailable: true
      }
    ]
  },
  {
    id: 'pu-lahore',
    name: 'University of the Punjab',
    shortName: 'University of the Punjab',
    tagline: 'Oldest & Largest Seat of Higher Learning in Pakistan (Est. 1882)',
    city: 'Lahore',
    province: 'Punjab',
    type: 'Public',
    founded: 1882,
    hecRanking: '#2 General Category Nationwide',
    qsRanking: '#740 Global / Top 150 Asian Rankings',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=160&auto=format&fit=crop&q=80',
    badgeAccent: '#2F6B4F',
    overview: 'Established in 1882, Punjab University (PU) is the mother of higher education institutions in Pakistan. Spanning the iconic Old Campus (Allama Iqbal) and the sprawling 1,800-acre New Campus (Quaid-e-Azam) along the Lahore Canal, PU is famed for PUCIT, PU Law College, and IBA-PU.',
    accreditations: ['HEC Recognized', 'NCEAC (PUCIT)', 'Pakistan Bar Council (PULC)', 'PEC (Chemical Engineering)'],
    acceptedTests: ['PU Entry Test (General / Engineering / Computing / Pre-Medical streams)'],
    aggregateWeights: {
      entryTest: 25,
      fscHssc: 50,
      matricSsc: 25,
    },
    meritFormulaExplanation: '50% FSc Part-1 + 25% Matriculation + 25% Punjab University Undergraduate Entrance Test.',
    averageSemesterFeeRange: 'PKR 35,000 – PKR 60,000 / semester (Highly Subsidized)',
    hostelAvailable: true,
    hostelDetails: '28 on-campus halls accommodating over 9,000 male and female students across Quaid-e-Azam and Allama Iqbal campuses.',
    transportAvailable: true,
    facilities: ['PU Main Library (Largest university library in Pakistan with 500k+ manuscripts)', 'Lahore Canal Botanical Garden', 'Swimming Pool & Olympic Tracks', 'Punjab University Press', 'PU Radio & FM 96.6'],
    scholarships: [
      {
        id: 'peef-pu',
        name: 'PEEF & Punjab Government Scholarships',
        type: 'National Program',
        coverage: '100% Tuition Fee + Monthly Living Allowance',
        eligibility: 'Meritorious students from Punjab with family income under ceiling.',
        applicationDeadline: 'September 20, 2026'
      },
      {
        id: 'pu-needy-students',
        name: 'PU Student Needy Welfare Fund (Zakat/Bait-ul-Maal)',
        type: 'Need-Based',
        coverage: 'Tuition waiver + Hostel fee relief',
        eligibility: 'Enrolled students submitting poverty certificates and income declaration.',
        applicationDeadline: 'Semester start'
      }
    ],
    timeline: [
      { title: 'PU Undergraduate Test-1 Registration', date: 'May 01 – June 05, 2026', status: 'Upcoming' },
      { title: 'PU Test-1 Conduction', date: 'June 21, 2026', status: 'Upcoming' },
      { title: 'PU Test-2 Conduction', date: 'July 19, 2026', status: 'Upcoming' },
      { title: 'Admission Application Form Portal', date: 'July 25 – August 10, 2026', status: 'Upcoming' },
      { title: 'General Merit List Display', date: 'August 18, 2026', status: 'Upcoming' },
      { title: 'Commencement of Classes', date: 'September 05, 2026', status: 'Upcoming' }
    ],
    helpline: {
      phone: '+92-42-99231105',
      email: 'admissions@pu.edu.pk',
      address: 'Quaid-e-Azam Campus, Canal Road, Lahore, 54590, Pakistan',
      admissionsPortalUrl: 'https://admissions.pu.edu.pk',
      workingHours: 'Monday – Friday: 8:00 AM – 4:00 PM PKT'
    },
    programs: [
      {
        id: 'pucit-bs-se',
        universityId: 'pu-lahore',
        universityName: 'University of the Punjab',
        name: 'BS Software Engineering (PUCIT)',
        code: 'BSSE-PUCIT',
        degreeType: 'BS',
        faculty: 'Punjab University College of Information Technology (PUCIT)',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 48000,
        annualFeePKR: 96000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['ICS (Physics)', 'ICS (Stats)', 'Pre-Engineering', 'A-Levels (CompSci)'],
          requiredTest: 'PU Entry Test (Computing Stream)'
        },
        meritAggregateFormula: '50% FSc-1 + 25% Matric + 25% PU Test',
        lastYearClosingMeritPercent: 88.2,
        seats: 180,
        description: 'One of the most competitive computing programs in Pakistan, famous for rigorous programming tournaments, Open Source culture, and elite software houses recruitment.',
        keySubjects: ['Object Oriented Programming', 'Data Structures', 'Database Engineering', 'Enterprise Web Development', 'Mobile Computing'],
        careerProspects: ['Software Engineer', 'Full Stack Developer', 'Cloud Architect', 'Open Source Contributor'],
        scholarshipAvailable: true
      },
      {
        id: 'pu-llb',
        universityId: 'pu-lahore',
        universityName: 'University of the Punjab',
        name: 'LLB (5 Years)',
        code: 'LLB-PULC',
        degreeType: 'LLB',
        faculty: 'Punjab University Law College (PULC)',
        durationYears: 5,
        totalSemesters: 10,
        semesterFeePKR: 42000,
        annualFeePKR: 84000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['Pre-Engineering', 'Pre-Medical', 'ICS (Physics)', 'I.Com', 'Humanities/FA', 'A-Levels (Pre-Eng)', 'A-Levels (Pre-Med)'],
          requiredTest: 'Law Admission Test (LAT) conducted by HEC'
        },
        meritAggregateFormula: '50% FSc + 25% Matric + 25% HEC LAT Score',
        lastYearClosingMeritPercent: 84.1,
        seats: 250,
        description: 'Pakistan’s premier legal academy training future Supreme Court justices, Senior Advocates, corporate barristers, and human rights litigators.',
        keySubjects: ['Constitutional Law', 'Criminal Jurisprudence', 'Civil Procedure Code', 'Corporate & Commercial Law', 'Human Rights Law'],
        careerProspects: ['Advocate High Court', 'Corporate Legal Counsel', 'Judicial Magistrate / Civil Judge', 'Public Prosecutor'],
        scholarshipAvailable: true
      }
    ]
  },
  {
    id: 'sukkur-iba',
    name: 'Sukkur IBA University',
    shortName: 'Sukkur IBA',
    tagline: 'Merit, Quality, and Excellence — Transforming Lives across Sindh',
    city: 'Sukkur',
    province: 'Sindh',
    type: 'Public',
    founded: 1994,
    hecRanking: '#3 Business & IT University in Sindh',
    qsRanking: '#450-500 QS Asian Rankings',
    logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=160&auto=format&fit=crop&q=80',
    badgeAccent: '#C79A3D',
    overview: 'Sukkur IBA University is a national beacon of quality education and transformative social mobility situated in Upper Sindh. Pioneered by legendary educationist Prof. Nisar Ahmed Siddiqui, Sukkur IBA is world-renowned for its zero-tolerance merit policy, world-class green campus, and famous Talent Hunt Programs (OGDCL-THP & Sindh THP).',
    accreditations: ['AACSB Member', 'NCEAC Highest Category', 'PEC Tier-1', 'HEC Recognized'],
    acceptedTests: ['Sukkur IBA Admission Test', 'SAT-1', 'NTS NAT'],
    aggregateWeights: {
      entryTest: 60,
      fscHssc: 30,
      matricSsc: 10,
    },
    meritFormulaExplanation: '60% Sukkur IBA Aptitude Test Score + 30% HSSC / Intermediate + 10% Matriculation.',
    averageSemesterFeeRange: 'PKR 85,000 – PKR 125,000 / semester',
    hostelAvailable: true,
    hostelDetails: 'Modern air-conditioned student residences for male and female students with 24/7 solar backup, gym, and Wi-Fi.',
    transportAvailable: true,
    facilities: ['FabLab Sukkur (Affiliated with MIT FabLab Network)', 'Robotics & AI Innovation Hub', 'Solar-Powered Smart Campus', 'Auditorium with 1,200 seating', 'Business Incubation Center'],
    scholarships: [
      {
        id: 'sukkur-thp',
        name: 'OGDCL / Sindh Talent Hunt Program (THP)',
        type: 'National Program',
        coverage: '100% Free 4-Year Degree (Tuition, Hostel, Mess & PKR 5,000/mo allowance)',
        eligibility: 'Underprivileged students qualifying 6-month preparatory foundation semester.',
        applicationDeadline: 'March 30, 2026',
        linkText: 'Apply for Sukkur IBA Foundation Semester THP'
      },
      {
        id: 'sukkur-merit-loan',
        name: 'Sukkur IBA Need-cum-Merit Scholarship',
        type: 'Need-Based',
        coverage: '50% to 100% fee waiver for deserving students',
        eligibility: 'Demonstrated financial constraint assessed through home verification.',
        applicationDeadline: 'Semester admission'
      }
    ],
    timeline: [
      { title: 'Talent Hunt Program (THP) Registration', date: 'February 15 – March 25, 2026', status: 'Closed' },
      { title: 'Direct Admission Application Open', date: 'May 01 – June 20, 2026', status: 'Upcoming' },
      { title: 'Sukkur IBA Written Entry Test', date: 'July 12, 2026', status: 'Upcoming' },
      { title: 'Merit List Publication', date: 'July 24, 2026', status: 'Upcoming' },
      { title: 'Classes Begin', date: 'August 25, 2026', status: 'Upcoming' }
    ],
    helpline: {
      phone: '+92-71-5644000',
      email: 'admissions@iba-suk.edu.pk',
      address: 'Airport Road, Sukkur, Sindh, 65200, Pakistan',
      admissionsPortalUrl: 'https://admissions.iba-suk.edu.pk',
      workingHours: 'Monday – Friday: 9:00 AM – 5:00 PM PKT'
    },
    programs: [
      {
        id: 'sukkur-bs-cs',
        universityId: 'sukkur-iba',
        universityName: 'Sukkur IBA',
        name: 'BS Computer Science',
        code: 'BSCS-SIBA',
        degreeType: 'BS',
        faculty: 'Department of Computer Science',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 110000,
        annualFeePKR: 220000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['ICS (Physics)', 'Pre-Engineering', 'General Science', 'A-Levels (CompSci)'],
          requiredTest: 'Sukkur IBA Entrance Test'
        },
        meritAggregateFormula: '60% Test + 30% FSc + 10% Matric',
        lastYearClosingMeritPercent: 68.0,
        seats: 120,
        description: 'Hands-on programming and computing degree with access to the MIT-affiliated FabLab, robotics development, and software incubation.',
        keySubjects: ['Data Structures & Algorithms', 'Web & Mobile Engineering', 'Database Systems', 'Cloud Computing', 'Artificial Intelligence'],
        careerProspects: ['Full-Stack Software Engineer', 'Mobile App Developer', 'Cloud Infrastructure Engineer', 'Tech Entrepreneur'],
        scholarshipAvailable: true
      },
      {
        id: 'sukkur-bba',
        universityId: 'sukkur-iba',
        universityName: 'Sukkur IBA',
        name: 'Bachelor of Business Administration (BBA)',
        code: 'BBA-SIBA',
        degreeType: 'BBA',
        faculty: 'Department of Business Administration',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 115000,
        annualFeePKR: 230000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['Pre-Engineering', 'Pre-Medical', 'ICS (Physics)', 'I.Com', 'Humanities/FA', 'A-Levels (Pre-Eng)'],
          requiredTest: 'Sukkur IBA Entrance Test'
        },
        meritAggregateFormula: '60% Test + 30% FSc + 10% Matric',
        lastYearClosingMeritPercent: 65.5,
        seats: 150,
        description: 'Accredited business administration curriculum with strong emphasis on entrepreneurship, agri-business management, marketing, and finance.',
        keySubjects: ['Principles of Management', 'Financial Accounting', 'Agri-Business Management', 'Marketing Strategy', 'Business Analytics'],
        careerProspects: ['Corporate Banker', 'Supply Chain Analyst', 'Entrepreneur', 'Marketing Executive'],
        scholarshipAvailable: true
      }
    ]
  },
  {
    id: 'comsats',
    name: 'COMSATS University Islamabad',
    shortName: 'COMSATS',
    tagline: 'Leading Public Sector IT & Science University',
    city: 'Islamabad (Campuses in Lahore, Abbottabad, Wah, Attock, Sahiwal, Vehari)',
    province: 'Multi-Campus Federal',
    type: 'Public',
    founded: 1998,
    hecRanking: '#3 General Category / Top 3 in Computer Science',
    qsRanking: '#650 Global / Top 150 Asian Rankings',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=160&auto=format&fit=crop&q=80',
    badgeAccent: '#17284A',
    overview: 'COMSATS University Islamabad (CUI) is a premier federal public chartered university. Known for its extensive nationwide network of 7 campuses, strong research productivity in Computer Science, Electrical Engineering, and Physics, and massive alumni base in the national software sector.',
    accreditations: ['NCEAC Highest Category', 'PEC Tier-1', 'HEC Recognized', 'PCATP'],
    acceptedTests: ['NTS NAT (National Aptitude Test)', 'NTS Special Test for COMSATS'],
    aggregateWeights: {
      entryTest: 50,
      fscHssc: 40,
      matricSsc: 10,
    },
    meritFormulaExplanation: '50% NTS NAT Score + 40% FSc / HSSC Part-1 Marks + 10% Matric / SSC Marks.',
    averageSemesterFeeRange: 'PKR 125,000 – PKR 160,000 / semester',
    hostelAvailable: true,
    hostelDetails: 'Hostel accommodation available for outstation students at Islamabad, Abbottabad, Lahore, and Wah campuses.',
    transportAvailable: true,
    facilities: ['CUI Telecommunication & Software Labs', 'Central Library with Digital IEEE Access', 'Student Activity Center', 'Technology Incubation Center (TIC)', 'Sports Complex'],
    scholarships: [
      {
        id: 'cui-ehsaas',
        name: 'HEC Need-Based & Ehsaas Scholarship at COMSATS',
        type: 'National Program',
        coverage: 'Full Tuition Fee + Living Allowance',
        eligibility: 'Low-income family background across all campuses.',
        applicationDeadline: 'October 15, 2026'
      },
      {
        id: 'cui-merit-award',
        name: 'CUI Campus Merit Scholarship',
        type: 'Merit-Based',
        coverage: '100% Tuition Fee waiver for top 3 GPA rankers per semester',
        eligibility: 'Semester GPA >= 3.80',
        applicationDeadline: 'Automated each semester'
      }
    ],
    timeline: [
      { title: 'Fall 2026 Admissions Open', date: 'June 01, 2026', status: 'Upcoming' },
      { title: 'Application Form Submission Deadline', date: 'July 15, 2026', status: 'Upcoming' },
      { title: 'NTS NAT-Test Conducted at Campuses', date: 'July 25, 2026', status: 'Upcoming' },
      { title: '1st Merit List Display', date: 'August 06, 2026', status: 'Upcoming' },
      { title: 'Commencement of Fall Semester', date: 'September 01, 2026', status: 'Upcoming' }
    ],
    helpline: {
      phone: '+92-51-9247000',
      email: 'admissions@comsats.edu.pk',
      address: 'Park Road, Tarlai Kalan, Islamabad, 45550, Pakistan',
      admissionsPortalUrl: 'https://admissions.comsats.edu.pk',
      workingHours: 'Monday – Friday: 9:00 AM – 4:30 PM PKT'
    },
    programs: [
      {
        id: 'cui-bs-se',
        universityId: 'comsats',
        universityName: 'COMSATS',
        name: 'BS Software Engineering',
        code: 'BS-SE-CUI',
        degreeType: 'BS',
        faculty: 'Department of Computer Science',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 145000,
        annualFeePKR: 290000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['ICS (Physics)', 'ICS (Stats)', 'Pre-Engineering', 'A-Levels (CompSci)'],
          requiredTest: 'NTS NAT-ICS / NAT-IE'
        },
        meritAggregateFormula: '50% NTS NAT + 40% FSc + 10% Matric',
        lastYearClosingMeritPercent: 82.1,
        seats: 250,
        description: 'Industry-oriented software engineering education with rigorous training in design patterns, mobile applications, cloud platforms, and DevOps.',
        keySubjects: ['Software Architecture', 'Web Technologies', 'Software Verification & Validation', 'Mobile Application Development', 'Cloud Computing'],
        careerProspects: ['Software Engineer', 'Mobile App Developer', 'DevOps Specialist', 'QA Engineer'],
        scholarshipAvailable: true
      },
      {
        id: 'cui-bs-cs',
        universityId: 'comsats',
        universityName: 'COMSATS',
        name: 'BS Computer Science',
        code: 'BS-CS-CUI',
        degreeType: 'BS',
        faculty: 'Department of Computer Science',
        durationYears: 4,
        totalSemesters: 8,
        semesterFeePKR: 145000,
        annualFeePKR: 290000,
        eligibilityCriteria: {
          minFscPercent: 50,
          allowedGroups: ['ICS (Physics)', 'Pre-Engineering', 'General Science', 'A-Levels (CompSci)'],
          requiredTest: 'NTS NAT-ICS / NAT-IE'
        },
        meritAggregateFormula: '50% NTS NAT + 40% FSc + 10% Matric',
        lastYearClosingMeritPercent: 83.5,
        seats: 300,
        description: 'Comprehensive computer science curriculum with strong emphasis on algorithmic efficiency, artificial intelligence, and operating systems.',
        keySubjects: ['Data Structures', 'Artificial Intelligence', 'Operating Systems', 'Computer Networks', 'Database Systems'],
        careerProspects: ['Software Developer', 'Backend Developer', 'AI Practitioner', 'Systems Engineer'],
        scholarshipAvailable: true
      }
    ]
  }
];
