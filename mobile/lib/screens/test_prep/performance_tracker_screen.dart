import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../widgets/badge_chip.dart';

class PerformanceTrackerScreen extends StatelessWidget {
  const PerformanceTrackerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text('Performance Analytics', style: AppTheme.headingSmall()),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.primaryDark),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // High Level Stats Row
            Row(
              children: [
                Expanded(
                  child: _buildMetricCard('Average Accuracy', '74.2%', Icons.track_changes, AppTheme.success),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildMetricCard('Tests Completed', '8 Exams', Icons.assignment_turned_in_outlined, AppTheme.primary),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _buildMetricCard('Prep Time', '18.5 Hours', Icons.hourglass_bottom, AppTheme.accentDark),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildMetricCard('Est. NET Score', '148 / 200', Icons.emoji_events_outlined, AppTheme.accentDark),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Score Evolution History
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
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Score Trend (Last 5 Tests)', style: AppTheme.labelLarge(fontWeight: FontWeight.bold)),
                      BadgeChip(label: '+17% Growth', variant: BadgeVariant.green, isSmall: true),
                    ],
                  ),
                  const SizedBox(height: 16),
                  _buildTrendRow('Diagnostic Baseline Test', '62%', 0.62),
                  _buildTrendRow('NET Sprint Drill 1', '68%', 0.68),
                  _buildTrendRow('FAST Speed Drill', '71%', 0.71),
                  _buildTrendRow('NET Series 2 Simulation', '76%', 0.76),
                  _buildTrendRow('Comprehensive Evaluation', '79%', 0.79),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Subject Strengths & Deficits
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
                  Text('Subject-Wise Accuracy', style: AppTheme.labelLarge(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 14),
                  _buildSubjectBar('Analytical Intelligence & Logic', 88, AppTheme.success),
                  _buildSubjectBar('Computer Science / Logic Gates', 82, AppTheme.success),
                  _buildSubjectBar('Advanced Mathematics (Calculus/Algebra)', 78, AppTheme.accent),
                  _buildSubjectBar('English Grammar & Sentence Completion', 72, AppTheme.accent),
                  _buildSubjectBar('Physics (Electromagnetism/Dynamics)', 68, AppTheme.alert),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // AI Recommendations Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.primarySubtle,
                borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                border: Border.all(color: AppTheme.primary.withOpacity(0.2)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: const [
                      Icon(Icons.psychology, color: AppTheme.primary, size: 20),
                      SizedBox(width: 8),
                      Text('UniPath AI Admission Recommendation', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primary)),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    '• Mathematics integration speed is your largest score booster for NUST NET. Practicing 20 substitutions daily can lift your score by +8 marks.',
                    style: AppTheme.bodySmall(color: AppTheme.primaryDark),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    '• For FAST-NUCES, your analytical accuracy (88%) is exceptional. Maintain pace during the 50-question advanced math speed drill.',
                    style: AppTheme.bodySmall(color: AppTheme.primaryDark),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildMetricCard(String title, String val, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title, style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
              Icon(icon, size: 16, color: color),
            ],
          ),
          const SizedBox(height: 8),
          Text(val, style: AppTheme.headingSmall(fontWeight: FontWeight.bold, color: AppTheme.textPrimary)),
        ],
      ),
    );
  }

  Widget _buildTrendRow(String testName, String score, double progress) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          Expanded(
            flex: 4,
            child: Text(testName, style: AppTheme.bodySmall(fontWeight: FontWeight.w500)),
          ),
          Expanded(
            flex: 4,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: LinearProgressIndicator(
                value: progress,
                backgroundColor: AppTheme.border,
                valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.primary),
                minHeight: 6,
              ),
            ),
          ),
          const SizedBox(width: 10),
          Text(score, style: AppTheme.bodySmall(fontWeight: FontWeight.bold, color: AppTheme.primary)),
        ],
      ),
    );
  }

  Widget _buildSubjectBar(String subject, int pct, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(subject, style: AppTheme.bodySmall(fontWeight: FontWeight.w600)),
              Text('$pct%', style: AppTheme.bodySmall(fontWeight: FontWeight.bold, color: color)),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: pct / 100,
              backgroundColor: AppTheme.border,
              valueColor: AlwaysStoppedAnimation<Color>(color),
              minHeight: 6,
            ),
          ),
        ],
      ),
    );
  }
}
