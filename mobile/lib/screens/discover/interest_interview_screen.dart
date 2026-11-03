import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../data/mock_data.dart';
import '../../widgets/app_button.dart';
import 'interest_results_screen.dart';

class InterestInterviewScreen extends StatefulWidget {
  const InterestInterviewScreen({super.key});

  @override
  State<InterestInterviewScreen> createState() => _InterestInterviewScreenState();
}

class _InterestInterviewScreenState extends State<InterestInterviewScreen> {
  int _currentIndex = 0;
  final Map<int, String> _selectedOptionPerQuestion = {};
  final Map<String, int> _accumulatedArchetypes = {
    'technologist': 0,
    'builder': 0,
    'strategist': 0,
    'healer': 0,
    'investigator': 0,
    'creative': 0,
  };

  InterestInterviewQuestion get _currentQuestion => MockData.interestQuestions[_currentIndex];

  void _selectOption(InterestInterviewOption option) {
    setState(() {
      _selectedOptionPerQuestion[_currentIndex] = option.id;
    });
  }

  void _onNext() {
    final selectedId = _selectedOptionPerQuestion[_currentIndex];
    if (selectedId == null) return;

    final selectedOption = _currentQuestion.options.firstWhere((o) => o.id == selectedId);
    selectedOption.archetypeWeights.forEach((key, val) {
      _accumulatedArchetypes[key] = (_accumulatedArchetypes[key] ?? 0) + val;
    });

    if (_currentIndex < MockData.interestQuestions.length - 1) {
      setState(() {
        _currentIndex++;
      });
    } else {
      _finishInterview();
    }
  }

  void _finishInterview() {
    // Determine top archetype
    final sorted = _accumulatedArchetypes.entries.toList()
      ..sort((a, b) => b.value.compareTo(a.value));

    final primaryKey = sorted.first.key;
    final secondaryKey = sorted.length > 1 ? sorted[1].key : 'builder';

    String primaryTitle = 'The Systems Architect & Technologist';
    String secondaryTitle = 'The Precision Engineer';
    List<String> degrees = ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence', 'BS Data Science'];
    List<String> unis = ['FAST-NUCES (Islamabad/Lahore)', 'NUST (SEECS)', 'GIKI', 'IBA Karachi'];

    if (primaryKey == 'builder') {
      primaryTitle = 'The Quantitative & Physical Builder';
      secondaryTitle = 'The Systems Architect';
      degrees = ['BE Electrical Engineering', 'BE Mechanical Engineering', 'BS Mechatronics', 'BS Civil'];
      unis = ['NUST (CEME/SMME)', 'GIKI (Topi)', 'UET Lahore', 'FAST-NUCES'];
    } else if (primaryKey == 'healer') {
      primaryTitle = 'The Clinical Healer & Life Scientist';
      secondaryTitle = 'The Quantitative Investigator';
      degrees = ['MBBS / BDS', 'Doctor of Pharmacy (Pharm-D)', 'BS Biotechnology', 'BS Medical Lab Tech'];
      unis = ['Quaid-e-Azam University (QAU)', 'Punjab University', 'Aga Khan University', 'KEMU'];
    } else if (primaryKey == 'strategist') {
      primaryTitle = 'The Economic Strategist & Business Leader';
      secondaryTitle = 'The Systems Architect';
      degrees = ['BBA (Hons)', 'BS Accounting & Finance', 'BS Economics & Data', 'BS FinTech'];
      unis = ['LUMS (SDSB)', 'IBA Karachi', 'NUST (NBS)', 'Sukkur IBA'];
    }

    final result = InterestProfileResult(
      primaryArchetype: primaryTitle,
      secondaryArchetype: secondaryTitle,
      matchScore: 94,
      topStreams: ['Computing & Software Systems', 'Intelligent Systems & AI', 'Applied Mathematical Modeling'],
      breakdown: [
        {'domain': 'Software Architecture & Logic', 'score': 95},
        {'domain': 'Algorithmic Problem Solving', 'score': 90},
        {'domain': 'Hardware & Physical Systems', 'score': 78},
        {'domain': 'Business Strategy & FinTech', 'score': 72},
      ],
      strengths: [
        'High aptitude for recursive logic and computational reasoning',
        'Strong quantitative analysis and mathematical pattern detection',
        'Interest in building scalable software products for Pakistani industry',
        'Resilient problem solving in timed debugging environments',
      ],
      recommendedDegrees: degrees,
      recommendedUniversities: unis,
      guidanceNote: 'Your diagnostic profile matches students who excel in FAST-NUCES, NUST SEECS, and GIKI Computing streams. Prioritize mathematics speed in entry tests.',
    );

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => InterestResultsScreen(profileResult: result)),
    );
  }

  @override
  Widget build(BuildContext context) {
    final question = _currentQuestion;
    final totalQuestions = MockData.interestQuestions.length;
    final selectedOptionId = _selectedOptionPerQuestion[_currentIndex];

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text('Academic Fit Interview', style: AppTheme.headingSmall()),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.primaryDark),
          onPressed: () {
            if (_currentIndex > 0) {
              setState(() => _currentIndex--);
            } else {
              Navigator.pop(context);
            }
          },
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Progress Header
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              color: AppTheme.surface,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Question ${_currentIndex + 1} of $totalQuestions',
                        style: AppTheme.labelMedium(color: AppTheme.primary, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        '${((_currentIndex + 1) / totalQuestions * 100).toInt()}% Done',
                        style: AppTheme.bodySmall(color: AppTheme.textSecondary, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(
                      value: (_currentIndex + 1) / totalQuestions,
                      backgroundColor: AppTheme.border,
                      valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.accent),
                      minHeight: 6,
                    ),
                  ),
                ],
              ),
            ),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: AppTheme.surface,
                        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                        border: Border.all(color: AppTheme.border),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            question.question,
                            style: AppTheme.headingMedium(
                              color: AppTheme.primaryDark,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            question.explanation,
                            style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),

                    Text(
                      'Choose the statement that best describes you:',
                      style: AppTheme.labelMedium(color: AppTheme.textSecondary),
                    ),
                    const SizedBox(height: 12),

                    ...question.options.map((opt) {
                      final isSelected = selectedOptionId == opt.id;
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: InkWell(
                          onTap: () => _selectOption(opt),
                          borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: isSelected ? AppTheme.primarySubtle : AppTheme.surface,
                              borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                              border: Border.all(
                                color: isSelected ? AppTheme.primary : AppTheme.border,
                                width: isSelected ? 2 : 1,
                              ),
                            ),
                            child: Row(
                              children: [
                                Container(
                                  width: 22,
                                  height: 22,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    border: Border.all(
                                      color: isSelected ? AppTheme.primary : AppTheme.textSecondary,
                                      width: 2,
                                    ),
                                    color: isSelected ? AppTheme.primary : Colors.transparent,
                                  ),
                                  child: isSelected
                                      ? const Center(
                                          child: Icon(Icons.check, size: 14, color: Colors.white),
                                        )
                                      : null,
                                ),
                                const SizedBox(width: 14),
                                Expanded(
                                  child: Text(
                                    opt.label,
                                    style: AppTheme.bodyMedium(
                                      color: isSelected ? AppTheme.primaryDark : AppTheme.textPrimary,
                                      fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ],
                ),
              ),
            ),

            // Footer action
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                border: Border(top: BorderSide(color: AppTheme.border)),
              ),
              child: AppButton(
                text: _currentIndex == totalQuestions - 1 ? 'Analyze Cognitive Profile' : 'Next Question',
                icon: _currentIndex == totalQuestions - 1 ? Icons.psychology : Icons.arrow_forward,
                variant: selectedOptionId != null ? AppButtonVariant.primary : AppButtonVariant.secondary,
                onPressed: selectedOptionId != null ? _onNext : null,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
