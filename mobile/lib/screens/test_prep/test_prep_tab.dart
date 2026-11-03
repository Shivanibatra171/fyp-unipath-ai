import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../widgets/app_button.dart';
import '../../widgets/badge_chip.dart';
import 'diagnostic_test_screen.dart';
import 'study_plan_screen.dart';
import 'mock_catalog_screen.dart';
import 'performance_tracker_screen.dart';

class TestPrepTab extends StatelessWidget {
  const TestPrepTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Admission Test Prep', style: AppTheme.headingSmall()),
            Text('NET • ECAT • FAST-NU • IBA', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
          ],
        ),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.insights, color: AppTheme.primary),
            tooltip: 'Performance Analytics',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const PerformanceTrackerScreen()),
              );
            },
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Readiness Score Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [AppTheme.primaryDark, AppTheme.primary],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(AppTheme.radiusCard),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppTheme.accent,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        'READINESS STATUS',
                        style: AppTheme.bodySmall(
                          color: AppTheme.primaryDark,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const Text(
                      '88th Percentile',
                      style: TextStyle(color: Colors.white70, fontSize: 12),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Text(
                      '72%',
                      style: AppTheme.headingLarge(color: Colors.white).copyWith(fontSize: 36),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Competitive for Computing',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15),
                          ),
                          Text(
                            'On track for NUST SEECS & FAST Islamabad closing merits.',
                            style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 11),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                AppButton(
                  text: 'Take 25-MCQ Diagnostic Test',
                  icon: Icons.assignment_outlined,
                  variant: AppButtonVariant.accent,
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const DiagnosticTestScreen()),
                    );
                  },
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          Text(
            'Preparation Modules',
            style: AppTheme.headingSmall(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),

          // Module 1: 4-Week Study Timetable
          _buildModuleCard(
            context,
            icon: Icons.calendar_month_outlined,
            title: '4-Week Personalized Study Timetable',
            subtitle: 'Day-by-day revision slots for Math, Physics & English with PTB & KIPS references.',
            tag: 'WEEK 2 ACTIVE',
            tagVariant: BadgeVariant.green,
            buttonText: 'Open Timetable',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const StudyPlanScreen()),
              );
            },
          ),
          const SizedBox(height: 12),

          // Module 2: Entrance Exam Mocks
          _buildModuleCard(
            context,
            icon: Icons.quiz_outlined,
            title: 'Simulated Entrance Exam Mocks',
            subtitle: 'Timed full-length mock drills for NUST NET, UET ECAT, FAST-NU, and IBA Karachi.',
            tag: '5 TESTS AVAILABLE',
            tagVariant: BadgeVariant.navy,
            buttonText: 'View Mocks Catalog',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const MockCatalogScreen()),
              );
            },
          ),
          const SizedBox(height: 12),

          // Module 3: Performance Tracker
          _buildModuleCard(
            context,
            icon: Icons.analytics_outlined,
            title: 'Performance & Accuracy Analytics',
            subtitle: 'Subject-wise breakdown, historical score evolution, and topic weakness detection.',
            tag: '8 EXAMS ANALYZED',
            tagVariant: BadgeVariant.gold,
            buttonText: 'View Analytics',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const PerformanceTrackerScreen()),
              );
            },
          ),
          const SizedBox(height: 20),

          // High Yield Entry Test Pattern Card
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
                    Icon(Icons.format_list_bulleted, color: AppTheme.primary, size: 20),
                    SizedBox(width: 8),
                    Text(
                      'Pakistani Entry Test Typical Weights',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                _buildWeightRow('Mathematics', '40% (80 MCQs in NET)'),
                _buildWeightRow('Physics', '30% (60 MCQs in NET)'),
                _buildWeightRow('Chemistry / Computer Science', '15% (30 MCQs in NET)'),
                _buildWeightRow('English & Vocabulary', '10% (20 MCQs in NET)'),
                _buildWeightRow('Intelligence & Logic', '5% (10 MCQs in NET)'),
              ],
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildModuleCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required String tag,
    required BadgeVariant tagVariant,
    required String buttonText,
    required VoidCallback onTap,
  }) {
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
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppTheme.primarySubtle,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(icon, color: AppTheme.primary, size: 20),
              ),
              BadgeChip(label: tag, variant: tagVariant, isSmall: true),
            ],
          ),
          const SizedBox(height: 10),
          Text(title, style: AppTheme.labelLarge(fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Text(subtitle, style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
          const SizedBox(height: 12),
          AppButton(
            text: buttonText,
            variant: AppButtonVariant.secondary,
            height: 38,
            onPressed: onTap,
          ),
        ],
      ),
    );
  }

  Widget _buildWeightRow(String subject, String weight) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(subject, style: AppTheme.bodySmall(color: AppTheme.textPrimary, fontWeight: FontWeight.w500)),
          Text(weight, style: AppTheme.bodySmall(color: AppTheme.primary, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}
