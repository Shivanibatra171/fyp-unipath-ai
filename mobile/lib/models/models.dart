class ScholarshipInfo {
  final String id;
  final String name;
  final String type;
  final String coverage;
  final String eligibility;
  final String applicationDeadline;

  const ScholarshipInfo({
    required this.id,
    required this.name,
    required this.type,
    required this.coverage,
    required this.eligibility,
    required this.applicationDeadline,
  });
}

class Program {
  final String id;
  final String universityId;
  final String universityName;
  final String name;
  final String code;
  final String degreeType;
  final String faculty;
  final int durationYears;
  final int totalSemesters;
  final int semesterFeePKR;
  final int annualFeePKR;
  final double minFscPercent;
  final List<String> allowedGroups;
  final String requiredTest;
  final double lastYearClosingMeritPercent;
  final int seats;
  final String description;
  final List<String> careerProspects;
  final bool scholarshipAvailable;

  const Program({
    required this.id,
    required this.universityId,
    required this.universityName,
    required this.name,
    required this.code,
    required this.degreeType,
    required this.faculty,
    required this.durationYears,
    required this.totalSemesters,
    required this.semesterFeePKR,
    required this.annualFeePKR,
    required this.minFscPercent,
    required this.allowedGroups,
    required this.requiredTest,
    required this.lastYearClosingMeritPercent,
    required this.seats,
    required this.description,
    required this.careerProspects,
    required this.scholarshipAvailable,
  });
}

class TimelineMilestone {
  final String title;
  final String date;
  final String status; // 'Open', 'Upcoming', 'Closed'

  const TimelineMilestone({
    required this.title,
    required this.date,
    required this.status,
  });
}

class University {
  final String id;
  final String name;
  final String shortName;
  final String tagline;
  final String city;
  final String province;
  final String type; // 'Public', 'Private', 'Chartered'
  final int founded;
  final String hecRanking;
  final String qsRanking;
  final String logoUrl;
  final String overview;
  final List<String> accreditations;
  final List<String> acceptedTests;
  final int entryTestWeight;
  final int fscWeight;
  final int matricWeight;
  final String meritFormulaExplanation;
  final String averageSemesterFeeRange;
  final bool hostelAvailable;
  final String hostelDetails;
  final List<String> facilities;
  final List<ScholarshipInfo> scholarships;
  final List<TimelineMilestone> timeline;
  final String helplinePhone;
  final String helplineEmail;
  final String address;
  final String admissionsPortalUrl;
  final List<Program> programs;

  const University({
    required this.id,
    required this.name,
    required this.shortName,
    required this.tagline,
    required this.city,
    required this.province,
    required this.type,
    required this.founded,
    required this.hecRanking,
    required this.qsRanking,
    required this.logoUrl,
    required this.overview,
    required this.accreditations,
    required this.acceptedTests,
    required this.entryTestWeight,
    required this.fscWeight,
    required this.matricWeight,
    required this.meritFormulaExplanation,
    required this.averageSemesterFeeRange,
    required this.hostelAvailable,
    required this.hostelDetails,
    required this.facilities,
    required this.scholarships,
    required this.timeline,
    required this.helplinePhone,
    required this.helplineEmail,
    required this.address,
    required this.admissionsPortalUrl,
    required this.programs,
  });
}

class InterestCategory {
  final String id;
  final String title;
  final String iconCode;
  final String description;
  final List<String> sampleDegrees;
  final List<String> subFields;

  const InterestCategory({
    required this.id,
    required this.title,
    required this.iconCode,
    required this.description,
    required this.sampleDegrees,
    required this.subFields,
  });
}

class InterestInterviewOption {
  final String id;
  final String label;
  final Map<String, int> archetypeWeights;

  const InterestInterviewOption({
    required this.id,
    required this.label,
    required this.archetypeWeights,
  });
}

class InterestInterviewQuestion {
  final int id;
  final String question;
  final String explanation;
  final List<InterestInterviewOption> options;

  const InterestInterviewQuestion({
    required this.id,
    required this.question,
    required this.explanation,
    required this.options,
  });
}

class InterestProfileResult {
  final String primaryArchetype;
  final String secondaryArchetype;
  final int matchScore;
  final List<String> topStreams;
  final List<Map<String, dynamic>> breakdown;
  final List<String> strengths;
  final List<String> recommendedDegrees;
  final List<String> recommendedUniversities;
  final String guidanceNote;

  const InterestProfileResult({
    required this.primaryArchetype,
    required this.secondaryArchetype,
    required this.matchScore,
    required this.topStreams,
    required this.breakdown,
    required this.strengths,
    required this.recommendedDegrees,
    required this.recommendedUniversities,
    required this.guidanceNote,
  });
}

class DiagnosticOption {
  final String id;
  final String text;

  const DiagnosticOption({required this.id, required this.text});
}

class DiagnosticQuestion {
  final int id;
  final String section;
  final String topic;
  final String difficulty;
  final String? passageText;
  final String questionText;
  final List<DiagnosticOption> options;
  final String correctOptionId;
  final String explanation;

  const DiagnosticQuestion({
    required this.id,
    required this.section,
    required this.topic,
    required this.difficulty,
    this.passageText,
    required this.questionText,
    required this.options,
    required this.correctOptionId,
    required this.explanation,
  });
}

class SectionScore {
  final String section;
  final int correct;
  final int total;
  final int percentage;
  final String status;

  const SectionScore({
    required this.section,
    required this.correct,
    required this.total,
    required this.percentage,
    required this.status,
  });
}

class WeakArea {
  final String topic;
  final String section;
  final String advice;
  final int recommendedPracticeCount;

  const WeakArea({
    required this.topic,
    required this.section,
    required this.advice,
    required this.recommendedPracticeCount,
  });
}

class DiagnosticResult {
  final int totalScore;
  final int totalQuestions;
  final int percentage;
  final double percentileEstimate;
  final int timeSpentSeconds;
  final List<SectionScore> sectionScores;
  final List<WeakArea> weakAreas;
  final String readinessRating;

  const DiagnosticResult({
    required this.totalScore,
    required this.totalQuestions,
    required this.percentage,
    required this.percentileEstimate,
    required this.timeSpentSeconds,
    required this.sectionScores,
    required this.weakAreas,
    required this.readinessRating,
  });
}

class StudyPlanDayTask {
  final String id;
  final String time;
  final String subject;
  final String topic;
  final String resource;
  bool completed;

  StudyPlanDayTask({
    required this.id,
    required this.time,
    required this.subject,
    required this.topic,
    required this.resource,
    this.completed = false,
  });
}

class StudyPlanWeek {
  final int weekNumber;
  final String title;
  final String theme;
  final String objective;
  final List<StudyPlanDayTask> tasks;

  const StudyPlanWeek({
    required this.weekNumber,
    required this.title,
    required this.theme,
    required this.objective,
    required this.tasks,
  });
}

class MockTestCatalogItem {
  final String id;
  final String title;
  final String universityTarget;
  final String testCode;
  final int durationMinutes;
  final int totalQuestions;
  final List<String> sections;
  final String difficulty;
  final int attemptsCount;
  final int avgScore;

  const MockTestCatalogItem({
    required this.id,
    required this.title,
    required this.universityTarget,
    required this.testCode,
    required this.durationMinutes,
    required this.totalQuestions,
    required this.sections,
    required this.difficulty,
    required this.attemptsCount,
    required this.avgScore,
  });
}

class AdmissionAlert {
  final String id;
  final String universityId;
  final String universityName;
  final String title;
  final String message;
  final String date;
  final String urgency;
  bool isRead;

  AdmissionAlert({
    required this.id,
    required this.universityId,
    required this.universityName,
    required this.title,
    required this.message,
    required this.date,
    required this.urgency,
    this.isRead = false,
  });
}

class UserProfile {
  String name;
  String email;
  String phone;
  String city;
  String intermediateBoard;
  String intermediateGroup;
  int matricMarks;
  int matricTotal;
  int fsc1Marks;
  int fsc1Total;
  int maxBudgetPerSemester;
  String targetMajor;
  bool isLoggedIn;

  UserProfile({
    required this.name,
    required this.email,
    required this.phone,
    required this.city,
    required this.intermediateBoard,
    required this.intermediateGroup,
    required this.matricMarks,
    required this.matricTotal,
    required this.fsc1Marks,
    required this.fsc1Total,
    required this.maxBudgetPerSemester,
    required this.targetMajor,
    this.isLoggedIn = true,
  });
}

class RAGKnowledgeItem {
  final String id;
  final String query;
  final String answer;
  final String source;
  final String category;
  final String? universityName;

  const RAGKnowledgeItem({
    required this.id,
    required this.query,
    required this.answer,
    required this.source,
    required this.category,
    this.universityName,
  });
}
