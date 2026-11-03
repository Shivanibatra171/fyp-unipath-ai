import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../widgets/app_button.dart';
import '../../widgets/badge_chip.dart';
import 'study_plan_screen.dart';

class TestResultsScreen extends StatelessWidget {
  final DiagnosticResult result;

  const TestResultsScreen({
    super.key,
    required this.result,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text('Diagnostic Evaluation Report', style: AppTheme.headingSmall()),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close, color: AppTheme.primaryDark),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Scorecard Hero
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppTheme.primary,
                  borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.primary.withOpacity(0.25),
                      offset: const Offset(0, 4),
                      blurRadius: 12,
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    BadgeChip(
                      label: result.readinessRating.toUpperCase(),
                      variant: BadgeVariant.gold,
                    ),
                    const SizedBox(height: 14),
                    Text(
                      '${result.totalScore} / ${result.totalQuestions}',
                      style: AppTheme.headingLarge(color: Colors.white).copyWith(fontSize: 36),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Score: ${result.percentage}% • Estimated ${result.percentileEstimate}th Percentile',
                      style: TextStyle(color: Colors.white.withOpacity(0.9), fontSize: 13),
                    ),
                    const SizedBox(height: 14),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        'Benchmark: Highly competitive for NUST (SEECS), FAST-NUCES, and GIKI Computing streams.',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.white.withOpacity(0.9), fontSize: 11),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Section Breakdown
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
                    Row(
                      children: const [
                        Icon(Icons.pie_chart_outline, color: AppTheme.primary, size: 20),
                        SizedBox(width: 8),
                        Text(
                          'Section Performance Breakdown',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    ...result.sectionScores.map((sec) {
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  sec.section,
                                  style: AppTheme.labelMedium(fontWeight: FontWeight.w600),
                                ),
                                Text(
                                  '${sec.correct}/${sec.total} (${sec.percentage}%)',
                                  style: AppTheme.bodySmall(color: AppTheme.primary, fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            ClipRRect(
                              borderRadius: BorderRadius.circular(4),
                              child: LinearProgressIndicator(
                                value: sec.percentage / 100,
                                backgroundColor: AppTheme.border,
                                valueColor: AlwaysStoppedAnimation<Color>(
                                  sec.percentage >= 75 ? AppTheme.success : AppTheme.accent,
                                ),
                                minHeight: 6,
                              ),
                            ),
                          ],
                        ),
                      );
                    }).toList(),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Weak Areas Isolation
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
                    Row(
                      children: const [
                        Icon(Icons.warning_amber_rounded, color: AppTheme.alert, size: 20),
                        SizedBox(width: 8),
                        Text(
                          'Identified High-Yield Weak Areas',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ...result.weakAreas.map((weak) {
                      return Container(
                        margin: const EdgeInsets.only(bottom: 10),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppTheme.alertSubtle,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: AppTheme.alert.withOpacity(0.2)),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(weak.topic, style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.alert)),
                                BadgeChip(label: weak.section, variant: BadgeVariant.neutral, isSmall: true),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Text(weak.advice, style: AppTheme.bodySmall(color: AppTheme.textPrimary)),
                          ],
                        ),
                      );
                    }).toList(),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              AppButton(
                text: 'Generate 4-Week Study Timetable',
                icon: Icons.calendar_month,
                variant: AppButtonVariant.accent,
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (context) => const StudyPlanScreen()),
                  );
                },
              ),
              const SizedBox(height: 10),
              AppButton(
                text: 'Return to Test Prep Hub',
                variant: AppButtonVariant.outline,
                onPressed: () => Navigator.pop(context),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
