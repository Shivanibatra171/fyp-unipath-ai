import { RAGKnowledgeItem } from '../types';

export const RAG_KNOWLEDGE_BASE: RAGKnowledgeItem[] = [
  // ── NUST ─────────────────────────────────────────────────────
  {
    id: 'rag-nust-merit',
    query: "How is the NUST NET merit aggregate calculated?",
    answer: "NUST calculates undergraduate admission merit using:\n• 75% Weightage from your highest NUST Entry Test (NET) score\n• 15% Weightage from HSSC / FSc Part-1 marks\n• 10% Weightage from SSC / Matriculation marks.\n\nIf you appear in multiple NET series (NET-1, 2, 3, or 4), NUST automatically considers your best score. The NET is a 200-mark computer-based test conducted at centers across Pakistan.",
    source: "NUST Undergraduate Admission Regulations 2025-26, Clause 7.1",
    category: "Eligibility & Merit",
    universityName: "NUST",
    officialLink: "https://ugadmissions.nust.edu.pk"
  },
  {
    id: 'rag-nust-fee',
    query: "What is the NUST tuition fee per semester for BS Computer Science?",
    answer: "For BS Computer Science (SEECS) and BS Software Engineering at NUST, the tuition fee for the 2025-2026 academic year is approximately PKR 145,000 to PKR 190,000 per semester depending on the school. SEECS programs are approximately PKR 165,000/semester. Additionally, NUST offers need-based financial aid covering up to 100% tuition for eligible students. A one-time admission processing fee of PKR 30,000 is charged at enrollment.",
    source: "NUST Fee Regulations & Financial Aid Policy 2025-26, Section 3",
    category: "Fee & Scholarships",
    universityName: "NUST",
    officialLink: "https://ugadmissions.nust.edu.pk"
  },
  {
    id: 'rag-nust-eligibility-ics',
    query: "Can ICS Physics students apply to NUST BS Computer Science?",
    answer: "Yes! ICS (Physics) students are fully eligible to apply for BS Computer Science and BS Software Engineering at NUST SEECS. The allowed groups are: Pre-Engineering, ICS (Physics), ICS (Stats), General Science, A-Levels (CompSci), and A-Levels (Pre-Eng). The minimum FSc percentage required is 60%. You must also sit the NUST Entry Test (NET) in the Computer Science stream.",
    source: "NUST Undergraduate Admission Policy 2025-26, Clause 5.2 – Eligible Disciplines",
    category: "Eligibility & Merit",
    universityName: "NUST",
    officialLink: "https://ugadmissions.nust.edu.pk"
  },
  {
    id: 'rag-nust-scholarship',
    query: "What scholarships does NUST offer for undergraduate students?",
    answer: "NUST offers three major scholarship programs:\n1. NUST Need-Based Financial Aid (NBS): Up to 100% tuition + hostel subsidy for household income under PKR 120,000/month.\n2. HEC Ehsaas Scholarship: Full tuition + PKR 5,000/month stipend for low-income students.\n3. NUST Rector Merit Scholarship: 50-100% fee waiver for students with Semester GPA ≥ 3.85 (top 3 per department).\n\nDeadline for need-based aid: June 30, 2026.",
    source: "NUST Office of Financial Aid – Scholarship Handbook 2025-26",
    category: "Fee & Scholarships",
    universityName: "NUST",
    officialLink: "https://ugadmissions.nust.edu.pk"
  },
  {
    id: 'rag-nust-hostel',
    query: "Is hostel available at NUST Islamabad?",
    answer: "Yes, NUST has separate on-campus hostels for male and female students at its H-12 campus in Islamabad. Hostel facilities include furnished rooms (single and shared), central mess, high-speed WiFi, laundry, gymnasium, and 24/7 security. Hostel allocation is on merit/need basis and applied for separately after admission. Monthly hostel cost ranges from PKR 12,000 to PKR 18,000 inclusive of meals.",
    source: "NUST Student Affairs Office – Residential Facilities Guide 2025",
    category: "Hostels & Campus",
    universityName: "NUST",
    officialLink: "https://ugadmissions.nust.edu.pk"
  },

  // ── FAST-NUCES ───────────────────────────────────────────────
  {
    id: 'rag-fast-fee',
    query: "What is the FAST-NUCES CS tuition fee and per-semester cost?",
    answer: "At FAST-NUCES, the tuition fee for BS Computer Science, BS AI, and BS Data Science for 2025-2026 is approximately PKR 185,000 per semester (based on 16–18 credit hours). Additionally: One-time admission fee PKR 30,000, Refundable security deposit PKR 20,000. Tuition is subject to annual indexation of 8-10%. The NU Test is computer-based and conducted at multiple centers.",
    source: "FAST-NUCES Official Prospectus 2025-26, Section 4.2 (Fee Structure)",
    category: "Fee & Scholarships",
    universityName: "FAST-NUCES",
    officialLink: "https://admissions.nu.edu.pk"
  },
  {
    id: 'rag-fast-merit',
    query: "What is the FAST-NUCES aggregate formula and closing merit?",
    answer: "FAST-NUCES calculates admission merit as:\n• 50% Weightage to FAST NU Entry Test (or NTS NAT-ICS with a 10-mark penalty)\n• 50% Weightage to FSc Part-1 / HSSC marks\n\nNote: Matric marks are NOT included in the FAST aggregate. Last year's closing aggregate for BS CS (Islamabad campus) was approximately 73.5%. For BS AI: 72.8%, For BS Data Science: 71.0%.",
    source: "FAST-NUCES Admissions Bulletin 2025-26, Merit Calculation Appendix",
    category: "Eligibility & Merit",
    universityName: "FAST-NUCES",
    officialLink: "https://admissions.nu.edu.pk"
  },
  {
    id: 'rag-fast-scholarship',
    query: "Does FAST-NUCES provide scholarships or financial aid?",
    answer: "Yes, FAST-NUCES offers:\n1. Academic Excellence Merit Scholarship: Full tuition waiver for top 3 position holders per batch (SGPA ≥ 3.80) – auto-applied each semester.\n2. Need-Based Financial Assistance: 25%–75% tuition loan/grant for students with genuine financial hardship – apply in first month of each semester.\n3. PEEF Scholarship (Punjab students): 100% tuition + monthly stipend for Punjab domicile holders with parents income ≤ PKR 60,000/month.\nDeadline: September 30, 2026.",
    source: "FAST-NUCES Financial Aid Office – Student Assistance Program Guide 2025",
    category: "Fee & Scholarships",
    universityName: "FAST-NUCES",
    officialLink: "https://admissions.nu.edu.pk"
  },
  {
    id: 'rag-fast-test-syllabus',
    query: "What is the FAST NU Entry Test syllabus and pattern?",
    answer: "The FAST NU Computer-Based Test (CBT) consists of 100 MCQs with 90 minutes time limit:\n• Mathematics: 40 MCQs (40%)\n• English (Grammar, Comprehension, Vocabulary): 20 MCQs (20%)\n• IQ / Analytical Reasoning: 20 MCQs (20%)\n• Computer Science Basics (for CS/AI/DS): 20 MCQs (20%)\n\nNo negative marking. Held at FAST campuses across Pakistan (Islamabad, Lahore, Karachi, Peshawar, CFD). Score is valid for current cycle only.",
    source: "FAST-NUCES NU Test Information Brochure 2026",
    category: "Test & Syllabus",
    universityName: "FAST-NUCES",
    officialLink: "https://admissions.nu.edu.pk"
  },

  // ── LUMS ─────────────────────────────────────────────────────
  {
    id: 'rag-lums-nop',
    query: "Does LUMS provide full financial aid and what is the NOP program?",
    answer: "Yes! LUMS has a need-blind admission policy. Over 35% of enrolled undergraduate students receive partial or full need-based financial aid. The LUMS National Outreach Program (NOP) offers 100% full-ride scholarships covering:\n✅ 100% Tuition\n✅ On-campus hostel accommodation\n✅ Monthly meal allowance\n✅ Books and stationery\n✅ Laptop\n\nEligibility: Talented students from underprivileged/remote regions with at least 80% marks in Matric. Apply BEFORE completing Intermediate 2nd year. NOP Deadline: March 15, 2026.",
    source: "LUMS Financial Aid Office Policy Manual 2025-2026",
    category: "Fee & Scholarships",
    universityName: "LUMS",
    officialLink: "https://admissions.lums.edu.pk"
  },
  {
    id: 'rag-lums-fee',
    query: "How much is LUMS tuition fee per semester?",
    answer: "LUMS tuition fees for 2025-26 academic year are:\n• SDSB (Business): PKR 535,000/semester\n• SBASSE (Computer Science, Engineering): PKR 520,000/semester\n• MGSHSS (Economics, Social Sciences): PKR 510,000/semester\n• SAHSOL (Law): PKR 490,000/semester\n\nHowever, more than 1 in 3 LUMS students pay REDUCED fees through need-based aid. Interest-free student loans (Qarz-e-Hasna) are also available through LUMS Alumni Fund.",
    source: "LUMS Fee Structure Document 2025-26, LUMS Treasurer's Office",
    category: "Fee & Scholarships",
    universityName: "LUMS",
    officialLink: "https://admissions.lums.edu.pk"
  },
  {
    id: 'rag-lums-admission-test',
    query: "What test does LUMS require for admission?",
    answer: "LUMS accepts the following for admission:\n1. LCAT (LUMS Common Admission Test) – conducted by LUMS\n2. SAT-1 (Digital SAT) – score range 400-1600\n3. ACT – score range 1-36\n\nFor SBASSE (Science & Engineering) programs, an additional SBASSE Subject Test (Scientific Aptitude Test) in Physics/Chemistry/Mathematics is mandatory. LUMS uses a holistic evaluation combining test scores (45%), academic transcript (55%), personal statement, and extracurricular activities.",
    source: "LUMS Undergraduate Admissions Policy 2025-2026, Section 3.1",
    category: "Test & Syllabus",
    universityName: "LUMS",
    officialLink: "https://admissions.lums.edu.pk"
  },

  // ── IBA Karachi ──────────────────────────────────────────────
  {
    id: 'rag-iba-sat',
    query: "Can I get direct admission or test exemption at IBA Karachi using SAT scores?",
    answer: "Yes! Candidates applying to IBA Karachi can be exempted from the IBA Aptitude Test if they have Digital SAT-1 score meeting the minimum cutoff:\n• BBA Program: SAT ≥ 1270 (minimum 600 Reading/Writing + 670 Mathematics)\n• BS Computer Science: SAT ≥ 1270 (600 Reading/Writing + 670 Mathematics)\n• BS Economics & Mathematics: SAT ≥ 1200\n\nCandidates meeting the SAT cutoff proceed directly to the Interview round, skipping the Aptitude Test.",
    source: "IBA Karachi Undergraduate Admissions Bulletin 2025, Page 14",
    category: "Test & Syllabus",
    universityName: "IBA Karachi",
    officialLink: "https://admissions.iba.edu.pk"
  },
  {
    id: 'rag-iba-fee',
    query: "What is IBA Karachi's tuition fee?",
    answer: "IBA Karachi semester fees for 2025-26:\n• BBA (School of Business Studies): PKR 340,000/semester\n• BS Computer Science (SMCS): PKR 310,000/semester\n• BS Economics & Mathematics (SESS): PKR 295,000/semester\n\nIBA provides need-based financial assistance to over 35% of students, ranging from 25% to 100% tuition waiver. The IBA National Talent Hunt Program (NTHP) offers 100% full rides for students from Balochistan, KPK, GB, FATA, AJK, and rural Sindh.",
    source: "IBA Karachi Fee Schedule & Financial Aid Guidelines 2025-26",
    category: "Fee & Scholarships",
    universityName: "IBA Karachi",
    officialLink: "https://admissions.iba.edu.pk"
  },

  // ── GIKI ─────────────────────────────────────────────────────
  {
    id: 'rag-giki-hostel',
    query: "Is hostel accommodation compulsory at GIKI Topi?",
    answer: "Yes, GIK Institute is a 100% residential campus in Topi, KPK. All undergraduate students are guaranteed and required to live on campus. Hostels include:\n✅ Fiber-optic internet connectivity\n✅ 24/7 power backup from Tarbela grid\n✅ Central dining halls (mess)\n✅ Sports facilities (Olympic-standard)\n✅ 24/7 security\n\nGIKI's compulsory residency is a key feature. The campus is approximately 400 acres with lake, cricket ground, and indoor sports complex.",
    source: "GIKI Student Handbook & Residential Life Regulations 2025",
    category: "Hostels & Campus",
    universityName: "GIKI",
    officialLink: "https://admissions.giki.edu.pk"
  },
  {
    id: 'rag-giki-merit',
    query: "What is the GIKI aggregate formula and entry test pattern?",
    answer: "GIKI admission merit formula:\n• 85% GIKI Admission Test score\n• 10% FSc Part-1 / HSSC marks\n• 5% Matric / SSC marks\n\nThe GIKI Admission Test is 200 marks (MCQ-based):\n• Mathematics: 70 marks\n• Physics: 70 marks\n• English: 30 marks\n• Analytical Reasoning: 30 marks\n\nLast year closing merits: BS CS 78.0%, BE Mechanical 72.0%, BS Cyber Security 75.5%. GIKI tests are held at centers nationwide in July.",
    source: "GIKI Admissions Office Merit Formula & Test Brochure 2025-26",
    category: "Eligibility & Merit",
    universityName: "GIKI",
    officialLink: "https://admissions.giki.edu.pk"
  },

  // ── General / Multi-University ────────────────────────────────
  {
    id: 'rag-ics-cs-eligibility',
    query: "Can FSc Pre-Medical students apply for BS Computer Science and Software Engineering in Pakistan?",
    answer: "Yes! Per the revised HEC and NCEAC policy, FSc Pre-Medical students ARE eligible to apply for BS Computer Science, BS Software Engineering, BS Artificial Intelligence, and BS Data Science at:\n✅ NUST SEECS\n✅ FAST-NUCES\n✅ COMSATS University\n✅ IBA Karachi\n\nAdmitted Pre-Medical students are required to complete 6 credit hours of deficiency Mathematics courses during their first two semesters. Pre-Med students cannot apply for Engineering programs (BE/BSc Engg) which require Physics-based FSc.",
    source: "HEC Pakistan Policy Notification No. HEC/AD/2023/118 on Computing Admissions",
    category: "Eligibility & Merit",
    officialLink: "https://www.hec.gov.pk"
  },
  {
    id: 'rag-ics-vs-pre-eng',
    query: "What is the difference between ICS and Pre-Engineering for university admissions?",
    answer: "Key differences for Pakistani university admissions:\n\n**ICS (Physics/Stats/Economics):**\n✅ Eligible for CS, Software Eng, AI, Data Science at all top universities\n✅ Eligible for BBA/Business programs\n❌ NOT eligible for traditional Engineering (EE, ME, CE) programs\n\n**Pre-Engineering (Physics + Chemistry + Math):**\n✅ Eligible for ALL CS programs\n✅ Eligible for ALL Engineering programs (NUST, UET, GIKI, NED)\n✅ Eligible for BBA/Business programs\n\nRecommendation: If you want to keep both CS and Engineering options open, Pre-Engineering is the safer choice.",
    source: "HEC Undergraduate Program Eligibility Policy 2025 & University Prospectuses",
    category: "Eligibility & Merit"
  },
  {
    id: 'rag-nust-vs-fast',
    query: "NUST aur FAST-NUCES mein kya farq hai? Which is better for CS?",
    answer: "NUST vs FAST-NUCES for BS Computer Science:\n\n**NUST SEECS:**\n• Merit formula: 75% NET + 15% FSc + 10% Matric\n• Fee: ~PKR 165,000/semester\n• HEC Ranking: #1 Overall\n• Strong: Research, AI/ML, Systems Programming\n• Entry test: NET (200 marks)\n\n**FAST-NUCES:**\n• Merit formula: 50% NU Test + 50% FSc (Matric NOT counted!)\n• Fee: ~PKR 185,000/semester\n• Known for: Coding bootcamp culture, highest industry placement\n• 5 campuses nationwide (Islamabad, Lahore, Karachi, Peshawar, CFD)\n• Entry test: NU Test (100 MCQs, 90 min)\n\nFor research → NUST. For industry/startup career → FAST. Both are excellent choices.",
    source: "Comparative analysis based on NUST & FAST-NUCES Prospectuses 2025-26",
    category: "Comparison",
    officialLink: "https://ugadmissions.nust.edu.pk"
  },
  {
    id: 'rag-hec-ranking',
    query: "Which is the top university in Pakistan according to HEC ranking?",
    answer: "HEC (Higher Education Commission) University Rankings 2024-25:\n\n**Overall:**\n1. Quaid-i-Azam University (QAU) – Federal, Islamabad\n2. University of the Punjab – Lahore\n\n**Engineering & Technology:**\n1. NUST – Islamabad\n2. UET Lahore\n\n**Computing (W-Category):**\n1. FAST-NUCES – Multi-Campus\n2. NUST SEECS\n\n**Private Universities:**\n1. LUMS – Lahore\n2. GIKI – Topi, KPK\n\n**Business Schools:**\n1. IBA Karachi\n2. LUMS SDSB\n\nSource: HEC Rankings 2024 (published annually)",
    source: "Higher Education Commission Pakistan University Rankings 2024",
    category: "Comparison",
    officialLink: "https://www.hec.gov.pk/english/universities/Pages/Rankings.aspx"
  },
  {
    id: 'rag-documents-required',
    query: "What documents do I need for Pakistani university admission?",
    answer: "Standard documents required for Pakistani undergraduate university admissions:\n\n1. ✅ NADRA Smart CNIC / B-Form (attested photocopy + original at test center)\n2. ✅ Matric / SSC Sanad & Marksheet (verified, attested by BISE)\n3. ✅ HSSC / FSc Part-1 Result Card or Provisional Certificate\n4. ✅ Domicile Certificate & PRC (for quota seats at public universities)\n5. ✅ 4–6 Passport-Sized Photographs (sky-blue background)\n6. ✅ Character Certificate (from current/last institution)\n7. ✅ Guardian Income Certificate or FBR Tax Returns (for need-based scholarship)\n8. ✅ Non-Political Activity Affidavit on PKR 100 Stamp Paper (most universities)\n\n⚠️ IMPORTANT: O-Level / A-Level students need IBCC equivalence certificate from Islamabad.",
    source: "Consolidated Pakistani University Admissions Documentation Requirements 2025-26",
    category: "Documents & Process"
  },
  {
    id: 'rag-sukkur-thp',
    query: "How does the Sukkur IBA Talent Hunt Program (THP) work?",
    answer: "The Sukkur IBA Foundation Semester / Talent Hunt Program (THP) selects deserving students through a preliminary aptitude test and offers:\n✅ 6 months intensive foundation training (English, Math, Computer Science)\n✅ FREE tuition during foundation semester\n✅ FREE hostel accommodation + monthly stipend\n\nStudents who pass the comprehensive foundation exam with CGPA ≥ 2.2 receive:\n🎓 100% tuition-free admission into 4-year undergraduate degree programs at Sukkur IBA University\n\nThis is particularly beneficial for students from rural Sindh and underprivileged backgrounds.",
    source: "Sukkur IBA University THP Directorate Guidelines 2025",
    category: "Fee & Scholarships",
    universityName: "Sukkur IBA",
    officialLink: "https://www.iba-suk.edu.pk/thp"
  },
  {
    id: 'rag-uet-ecat',
    query: "What is the syllabus and aggregate formula for UET Lahore ECAT?",
    answer: "UET ECAT (Engineering Combined Admission Test) is 400 marks, 100 MCQs:\n• Mathematics: 30 MCQs = 120 marks (+4 correct, -1 wrong)\n• Physics: 30 MCQs = 120 marks\n• Chemistry / Computer Science: 30 MCQs = 120 marks\n• English: 10 MCQs = 40 marks\n\n**UET Aggregate Formula:**\n33% ECAT + 50% FSc / HSSC Marks + 17% Matriculation\n\nFor BS programs at UET, Pre-Engineering group (Physics + Chemistry + Math) is mandatory. ICS students are NOT eligible for Engineering programs at UET.",
    source: "UET Combined Entry Test (ECAT) Brochure 2026 & UET Admissions Policy",
    category: "Test & Syllabus",
    universityName: "UET Lahore",
    officialLink: "https://www.uet.edu.pk/admissions"
  }
];
