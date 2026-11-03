import 'dart:async';
import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../data/mock_data.dart';
import '../../widgets/app_button.dart';
import '../../widgets/badge_chip.dart';
import 'test_results_screen.dart';

class DiagnosticTestScreen extends StatefulWidget {
  const DiagnosticTestScreen({super.key});

  @override
  State<DiagnosticTestScreen> createState() => _DiagnosticTestScreenState();
}

class _DiagnosticTestScreenState extends State<DiagnosticTestScreen> {
  int _currentIndex = 0;
  final Map<int, String> _userAnswers = {}; // questionIndex -> optionId
  final Set<int> _flaggedQuestions = {};

  Timer? _timer;
  int _secondsRemaining = 25 * 60; // 25 minutes
  bool _isTimerPaused = false;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!_isTimerPaused && _secondsRemaining > 0) {
        setState(() {
          _secondsRemaining--;
        });
      } else if (_secondsRemaining <= 0) {
        _timer?.cancel();
        _submitTest();
      }
    });
  }

  String get _formattedTime {
    final minutes = _secondsRemaining ~/ 60;
    final seconds = _secondsRemaining % 60;
    return '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }

  void _selectOption(String optionId) {
    setState(() {
      _userAnswers[_currentIndex] = optionId;
    });
  }

  void _toggleFlag() {
    setState(() {
      if (_flaggedQuestions.contains(_currentIndex)) {
        _flaggedQuestions.remove(_currentIndex);
      } else {
        _flaggedQuestions.add(_currentIndex);
      }
    });
  }

  void _submitTest() {
    _timer?.cancel();

    int totalScore = 0;
    final questions = MockData.diagnosticQuestions;
    final Map<String, List<int>> sectionStats = {}; // section -> [correct, total]

    for (int i = 0; i < questions.length; i++) {
      final q = questions[i];
      sectionStats.putIfAbsent(q.section, () => [0, 0]);
      sectionStats[q.section]![1]++;

      final chosen = _userAnswers[i];
      if (chosen == q.correctOptionId) {
        totalScore++;
        sectionStats[q.section]![0]++;
      }
    }

    final List<SectionScore> sectionScores = [];
    sectionStats.forEach((sec, counts) {
      final correct = counts[0];
      final total = counts[1];
      final pct = total > 0 ? ((correct / total) * 100).round() : 0;
      sectionScores.add(
        SectionScore(
          section: sec,
          correct: correct,
          total: total,
          percentage: pct,
          status: pct >= 75 ? 'Strong' : (pct >= 50 ? 'Moderate' : 'Needs Review'),
        ),
      );
    });

    final pctTotal = ((totalScore / questions.length) * 100).round();
    final percentile = (pctTotal * 1.15).clamp(40.0, 99.0);

    final List<WeakArea> weakAreas = [
      const WeakArea(
        topic: 'Integration by Parts & Substitutions',
        section: 'Mathematics',
        advice: 'Revise standard trigonometric substitutions and reduction formulas from PTB Ch 4.',
        recommendedPracticeCount: 20,
      ),
      const WeakArea(
        topic: 'Electromagnetic Induction',
        section: 'Physics',
        advice: 'Focus on Lenz Law direction problems and motional EMF calculations.',
        recommendedPracticeCount: 15,
      ),
    ];

    String rating = 'Competitive';
    if (pctTotal >= 80) {
      rating = 'Exceptional';
    } else if (pctTotal < 60) {
      rating = 'Foundation Required';
    }

    final result = DiagnosticResult(
      totalScore: totalScore,
      totalQuestions: questions.length,
      percentage: pctTotal,
      percentileEstimate: double.parse(percentile.toStringAsFixed(1)),
      timeSpentSeconds: (25 * 60) - _secondsRemaining,
      sectionScores: sectionScores,
      weakAreas: weakAreas,
      readinessRating: rating,
    );

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => TestResultsScreen(result: result)),
    );
  }

  void _confirmSubmit() {
    final unanswered = MockData.diagnosticQuestions.length - _userAnswers.length;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppTheme.radiusCard)),
        title: Text('Submit Diagnostic Test?', style: AppTheme.headingSmall()),
        content: Text(
          unanswered > 0
              ? 'You have $unanswered unanswered questions. Unanswered questions will receive zero marks.'
              : 'All questions attempted! Are you ready to generate your diagnostic report?',
          style: AppTheme.bodySmall(color: AppTheme.textSecondary),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Keep Solving', style: AppTheme.labelMedium()),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _submitTest();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primary,
              foregroundColor: Colors.white,
            ),
            child: const Text('Submit Now'),
          ),
        ],
      ),
    );
  }

  void _showPalette() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        padding: const EdgeInsets.all(20),
        decoration: const BoxDecoration(
          color: AppTheme.surface,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Question Palette', style: AppTheme.headingSmall()),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: List.generate(MockData.diagnosticQuestions.length, (idx) {
                final isAnswered = _userAnswers.containsKey(idx);
                final isFlagged = _flaggedQuestions.contains(idx);
                final isCurrent = idx == _currentIndex;

                Color bg = AppTheme.background;
                Color fg = AppTheme.textPrimary;
                Border? border;

                if (isCurrent) {
                  border = Border.all(color: AppTheme.primary, width: 2);
                }

                if (isFlagged) {
                  bg = AppTheme.accent;
                  fg = AppTheme.primaryDark;
                } else if (isAnswered) {
                  bg = AppTheme.success;
                  fg = Colors.white;
                }

                return InkWell(
                  onTap: () {
                    setState(() => _currentIndex = idx);
                    Navigator.pop(context);
                  },
                  borderRadius: BorderRadius.circular(8),
                  child: Container(
                    width: 42,
                    height: 42,
                    decoration: BoxDecoration(
                      color: bg,
                      borderRadius: BorderRadius.circular(8),
                      border: border ?? Border.all(color: AppTheme.border),
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      '${idx + 1}',
                      style: TextStyle(color: fg, fontWeight: FontWeight.bold, fontSize: 13),
                    ),
                  ),
                );
              }),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildLegend(AppTheme.success, 'Answered'),
                _buildLegend(AppTheme.accent, 'Flagged'),
                _buildLegend(AppTheme.background, 'Unvisited'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLegend(Color color, String label) {
    return Row(
      children: [
        Container(
          width: 14,
          height: 14,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(3),
            border: Border.all(color: AppTheme.border),
          ),
        ),
        const SizedBox(width: 6),
        Text(label, style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final questions = MockData.diagnosticQuestions;
    final currentQ = questions[_currentIndex];
    final selectedOptionId = _userAnswers[_currentIndex];
    final isFlagged = _flaggedQuestions.contains(_currentIndex);

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text('Q ${_currentIndex + 1} of ${questions.length}', style: AppTheme.headingSmall()),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.primaryDark),
          onPressed: () {
            showDialog(
              context: context,
              builder: (c) => AlertDialog(
                title: const Text('Exit Diagnostic Test?'),
                content: const Text('Your current progress will not be saved.'),
                actions: [
                  TextButton(onPressed: () => Navigator.pop(c), child: const Text('Continue Test')),
                  TextButton(
                    onPressed: () {
                      Navigator.pop(c);
                      Navigator.pop(context);
                    },
                    child: const Text('Exit', style: TextStyle(color: AppTheme.alert)),
                  ),
                ],
              ),
            );
          },
        ),
        actions: [
          // Timer Widget
          Container(
            margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 8),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: _secondsRemaining < 300 ? AppTheme.alertSubtle : AppTheme.primarySubtle,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(
                color: _secondsRemaining < 300 ? AppTheme.alert : AppTheme.primary.withOpacity(0.2),
              ),
            ),
            child: Row(
              children: [
                Icon(
                  Icons.timer_outlined,
                  size: 16,
                  color: _secondsRemaining < 300 ? AppTheme.alert : AppTheme.primary,
                ),
                const SizedBox(width: 4),
                Text(
                  _formattedTime,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: _secondsRemaining < 300 ? AppTheme.alert : AppTheme.primary,
                  ),
                ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.grid_view, color: AppTheme.primary),
            tooltip: 'Question Palette',
            onPressed: _showPalette,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Sub-header with Section & Difficulty
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              color: AppTheme.surface,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      BadgeChip(label: currentQ.section, variant: BadgeVariant.navy, isSmall: true),
                      const SizedBox(width: 6),
                      BadgeChip(label: currentQ.topic, variant: BadgeVariant.neutral, isSmall: true),
                    ],
                  ),
                  IconButton(
                    icon: Icon(
                      isFlagged ? Icons.flag : Icons.flag_outlined,
                      color: isFlagged ? AppTheme.accent : AppTheme.textSecondary,
                      size: 20,
                    ),
                    onPressed: _toggleFlag,
                    tooltip: 'Flag for review',
                  ),
                ],
              ),
            ),
            const Divider(height: 1),

            // Question & Options Content
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (currentQ.passageText != null) ...[
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppTheme.primarySubtle.withOpacity(0.5),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: AppTheme.border),
                        ),
                        child: Text(
                          currentQ.passageText!,
                          style: AppTheme.bodySmall(fontStyle: FontStyle.italic),
                        ),
                      ),
                      const SizedBox(height: 14),
                    ],

                    Text(
                      currentQ.questionText,
                      style: AppTheme.headingSmall(fontWeight: FontWeight.w600, height: 1.4),
                    ),
                    const SizedBox(height: 20),

                    // Options list
                    ...currentQ.options.map((opt) {
                      final isSelected = selectedOptionId == opt.id;
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: InkWell(
                          onTap: () => _selectOption(opt.id),
                          borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 180),
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
                                  width: 28,
                                  height: 28,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: isSelected ? AppTheme.primary : AppTheme.background,
                                    border: Border.all(
                                      color: isSelected ? AppTheme.primary : AppTheme.border,
                                    ),
                                  ),
                                  alignment: Alignment.center,
                                  child: Text(
                                    opt.id.toUpperCase(),
                                    style: TextStyle(
                                      color: isSelected ? Colors.white : AppTheme.textPrimary,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 12,
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 14),
                                Expanded(
                                  child: Text(
                                    opt.text,
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

            // Bottom Navigation Bar
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                border: Border(top: BorderSide(color: AppTheme.border)),
              ),
              child: Row(
                children: [
                  OutlinedButton(
                    onPressed: _currentIndex > 0
                        ? () => setState(() => _currentIndex--)
                        : null,
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppTheme.radiusButton)),
                    ),
                    child: const Text('Previous'),
                  ),
                  const SizedBox(width: 8),
                  if (_currentIndex < questions.length - 1)
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () => setState(() => _currentIndex++),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.primary,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppTheme.radiusButton)),
                        ),
                        child: const Text('Next Question'),
                      ),
                    )
                  else
                    Expanded(
                      child: ElevatedButton(
                        onPressed: _confirmSubmit,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.accent,
                          foregroundColor: AppTheme.primaryDark,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppTheme.radiusButton)),
                        ),
                        child: const Text('Submit Test', style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
                    ),
                  const SizedBox(width: 8),
                  OutlinedButton(
                    onPressed: _confirmSubmit,
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                      side: const BorderSide(color: AppTheme.accentDark),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppTheme.radiusButton)),
                    ),
                    child: const Text('Finish', style: TextStyle(color: AppTheme.accentDark, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
