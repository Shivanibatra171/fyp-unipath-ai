import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../data/mock_data.dart';
import '../../widgets/app_button.dart';
import '../../widgets/badge_chip.dart';
import 'diagnostic_test_screen.dart';

class MockCatalogScreen extends StatelessWidget {
  const MockCatalogScreen({super.key});

  void _showMockInstructions(BuildContext context, MockTestCatalogItem item) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
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
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppTheme.border,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                BadgeChip(label: item.universityTarget, variant: BadgeVariant.navy),
                BadgeChip(label: item.difficulty, variant: BadgeVariant.gold),
              ],
            ),
            const SizedBox(height: 12),
            Text(item.title, style: AppTheme.headingSmall(fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            Text('Official Test Code: ${item.testCode}', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
            const Divider(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStatPill(Icons.timer_outlined, '${item.durationMinutes} Mins', 'Duration'),
                _buildStatPill(Icons.help_outline, '${item.totalQuestions} Qs', 'Questions'),
                _buildStatPill(Icons.bar_chart, '${item.avgScore}%', 'Avg Score'),
              ],
            ),
            const SizedBox(height: 16),
            Text('Included Sections:', style: AppTheme.labelMedium(fontWeight: FontWeight.bold)),
            const SizedBox(height: 6),
            Wrap(
              spacing: 6,
              runSpacing: 6,
              children: item.sections.map((s) => BadgeChip(label: s, variant: BadgeVariant.neutral, isSmall: true)).toList(),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppTheme.primarySubtle,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                'Simulates the exact CBT (Computer-Based Test) environment, section timers, and negative marking penalty (if applicable).',
                style: AppTheme.bodySmall(color: AppTheme.primary),
              ),
            ),
            const SizedBox(height: 20),
            AppButton(
              text: 'Start Simulated Entrance Exam',
              icon: Icons.play_arrow,
              onPressed: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const DiagnosticTestScreen()),
                );
              },
            ),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
  }

  Widget _buildStatPill(IconData icon, String val, String label) {
    return Column(
      children: [
        Icon(icon, size: 20, color: AppTheme.primary),
        const SizedBox(height: 4),
        Text(val, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
        Text(label, style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final mocks = MockData.mockCatalog;

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Simulated Entry Tests', style: AppTheme.headingSmall()),
            Text('Targeted University Entrance Mocks', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
          ],
        ),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.primaryDark),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: mocks.length,
        separatorBuilder: (context, i) => const SizedBox(height: 14),
        itemBuilder: (context, index) {
          final mock = mocks[index];
          return Container(
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
                    BadgeChip(label: mock.universityTarget, variant: BadgeVariant.navy, isSmall: true),
                    BadgeChip(label: mock.difficulty, variant: BadgeVariant.gold, isSmall: true),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  mock.title,
                  style: AppTheme.labelLarge(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                Text(
                  '${mock.durationMinutes} Minutes • ${mock.totalQuestions} Questions • ${mock.attemptsCount} Students Attempted',
                  style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                ),
                const Divider(height: 20),
                Wrap(
                  spacing: 6,
                  runSpacing: 4,
                  children: mock.sections.map((s) {
                    return Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppTheme.background,
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(s, style: const TextStyle(fontSize: 10, color: AppTheme.textSecondary)),
                    );
                  }).toList(),
                ),
                const SizedBox(height: 14),
                AppButton(
                  text: 'Take Entrance Mock',
                  icon: Icons.assignment_outlined,
                  height: 38,
                  onPressed: () => _showMockInstructions(context, mock),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
