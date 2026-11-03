import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../data/mock_data.dart';
import '../../widgets/stat_card.dart';
import '../../widgets/progress_path.dart';
import '../../widgets/badge_chip.dart';
import '../../widgets/app_button.dart';
import '../../widgets/marksheet_scanner.dart';
import 'notifications_sheet.dart';
import '../discover/rag_chat_screen.dart';
import '../test_prep/diagnostic_test_screen.dart';
import '../discover/interest_interview_screen.dart';

class HomeTab extends StatefulWidget {
  final UserProfile profile;
  final Set<String> shortlistedIds;
  final ValueChanged<int> onNavigateToTab;

  const HomeTab({
    super.key,
    required this.profile,
    required this.shortlistedIds,
    required this.onNavigateToTab,
  });

  @override
  State<HomeTab> createState() => _HomeTabState();
}

class _HomeTabState extends State<HomeTab> {
  int get _unreadAlertsCount => MockData.admissionAlerts.where((a) => !a.isRead).length;

  @override
  Widget build(BuildContext context) {
    final profile = widget.profile;

    final progressSteps = [
      const ProgressStepItem(
        stepNumber: 1,
        title: 'Cognitive Interest Discovery',
        subtitle: 'Profile mapped: Systems Architect & Technologist',
        icon: Icons.psychology,
        isCompleted: true,
      ),
      const ProgressStepItem(
        stepNumber: 2,
        title: 'Program & University Matching',
        subtitle: '3 institutions shortlisted (NUST, FAST, LUMS)',
        icon: Icons.account_balance,
        isCompleted: false,
        isCurrent: true,
      ),
      const ProgressStepItem(
        stepNumber: 3,
        title: 'Application Guidance & Deadlines',
        subtitle: '4 of 7 required documents ready in vault',
        icon: Icons.assignment,
        isCompleted: false,
      ),
      const ProgressStepItem(
        stepNumber: 4,
        title: 'Admission Test Preparation',
        subtitle: 'Week 2 timetable active • Diagnostic score 72%',
        icon: Icons.timer,
        isCompleted: false,
      ),
    ];

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(
                  'Assalam-o-Alaikum, ${profile.name.split(' ').first}',
                  style: AppTheme.headingSmall(),
                ),
              ],
            ),
            Text(
              '${profile.intermediateGroup} • ${profile.city}',
              style: AppTheme.bodySmall(color: AppTheme.textSecondary),
            ),
          ],
        ),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        actions: [
          IconButton(
            icon: Stack(
              children: [
                const Icon(Icons.notifications_outlined, color: AppTheme.primary),
                if (_unreadAlertsCount > 0)
                  Positioned(
                    right: 0,
                    top: 0,
                    child: Container(
                      padding: const EdgeInsets.all(2),
                      decoration: const BoxDecoration(color: AppTheme.alert, shape: BoxShape.circle),
                      constraints: const BoxConstraints(minWidth: 14, minHeight: 14),
                      child: Text(
                        '$_unreadAlertsCount',
                        style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.white),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
              ],
            ),
            tooltip: 'Admission Alerts',
            onPressed: () {
              NotificationsSheet.show(
                context,
                onAlertsUpdated: () => setState(() {}),
              );
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Fall 2026 Admissions Campaign Card
          Container(
            padding: const EdgeInsets.all(16),
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
                    BadgeChip(
                      label: 'FALL 2026 CYCLE',
                      variant: BadgeVariant.gold,
                      isSmall: true,
                    ),
                    Text(
                      'Target: NET Series 3 & 4',
                      style: TextStyle(color: Colors.white.withOpacity(0.85), fontSize: 11),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  'Your Path to Pakistan’s Top Universities',
                  style: AppTheme.headingSmall(color: Colors.white, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                Text(
                  'Closing merit tracking, official prospectus RAG citations, and 25-MCQ test engine.',
                  style: TextStyle(color: Colors.white.withOpacity(0.85), fontSize: 12),
                ),
                const SizedBox(height: 14),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () => widget.onNavigateToTab(1), // Go to Discover tab
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.accent,
                          foregroundColor: AppTheme.primaryDark,
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                        ),
                        child: const Text('Explore Programs', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: OutlinedButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => const RagChatScreen()),
                          );
                        },
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: Colors.white38),
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                        ),
                        child: const Text('Ask Prospectus AI', style: TextStyle(color: Colors.white, fontSize: 12)),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // 4-Step Connected Journey Stepper
          ProgressPath(
            steps: progressSteps,
            onStepTap: (index) {
              if (index == 0) {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const InterestInterviewScreen()),
                );
              } else if (index == 1) {
                widget.onNavigateToTab(1); // Discover
              } else if (index == 2) {
                widget.onNavigateToTab(2); // Applications
              } else if (index == 3) {
                widget.onNavigateToTab(3); // Test Prep
              }
            },
          ),
          const SizedBox(height: 16),

          // 4 Key Stat Cards
          Row(
            children: [
              Expanded(
                child: StatCard(
                  title: 'Shortlisted',
                  value: '${widget.shortlistedIds.length} Unis',
                  subtitle: 'NUST, FAST, LUMS',
                  icon: Icons.bookmark_added_outlined,
                  accentColor: AppTheme.primary,
                  onTap: () => widget.onNavigateToTab(1),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: StatCard(
                  title: 'Next Deadline',
                  value: '18 Days',
                  subtitle: 'NET Series 3 Reg',
                  icon: Icons.calendar_today_outlined,
                  accentColor: AppTheme.accentDark,
                  onTap: () => widget.onNavigateToTab(2),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: StatCard(
                  title: 'Diagnostic Score',
                  value: '72%',
                  subtitle: '88th Percentile',
                  icon: Icons.assessment_outlined,
                  accentColor: AppTheme.success,
                  onTap: () => widget.onNavigateToTab(3),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: StatCard(
                  title: 'Study Timetable',
                  value: '12 / 28',
                  subtitle: 'Week 2 Tasks Done',
                  icon: Icons.task_alt_outlined,
                  accentColor: AppTheme.primary,
                  onTap: () => widget.onNavigateToTab(3),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),

          // Urgent Admission Alerts Section
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Admission Alerts',
                style: AppTheme.headingSmall(fontWeight: FontWeight.bold),
              ),
              TextButton(
                onPressed: () {
                  NotificationsSheet.show(
                    context,
                    onAlertsUpdated: () => setState(() {}),
                  );
                },
                child: Text(
                  'View All',
                  style: AppTheme.bodySmall(color: AppTheme.accentDark, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),

          ...MockData.admissionAlerts.take(2).map((alert) {
            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                border: Border.all(color: AppTheme.border),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: alert.urgency == 'urgent' ? AppTheme.alertSubtle : AppTheme.primarySubtle,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Icon(
                      alert.urgency == 'urgent' ? Icons.notification_important_outlined : Icons.info_outline,
                      color: alert.urgency == 'urgent' ? AppTheme.alert : AppTheme.primary,
                      size: 20,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              alert.universityName,
                              style: AppTheme.labelMedium(color: AppTheme.primary, fontWeight: FontWeight.bold),
                            ),
                            Text(alert.date, style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          alert.title,
                          style: AppTheme.labelMedium(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          alert.message,
                          style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            );
          }).toList(),
          const SizedBox(height: 20),

          // Quick Launcher Bar
          Text(
            'Quick Actions',
            style: AppTheme.headingSmall(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 10),

          Row(
            children: [
              Expanded(
                child: _buildActionTile(
                  icon: Icons.document_scanner_outlined,
                  label: 'Scan Marksheet',
                  onTap: () => MarksheetScannerSheet.show(context),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _buildActionTile(
                  icon: Icons.assignment_outlined,
                  label: 'Diagnostic Test',
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const DiagnosticTestScreen()),
                    );
                  },
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _buildActionTile(
                  icon: Icons.psychology_outlined,
                  label: 'RAG Assistant',
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const RagChatScreen()),
                    );
                  },
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildActionTile({
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppTheme.radiusCard),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
        decoration: BoxDecoration(
          color: AppTheme.surface,
          borderRadius: BorderRadius.circular(AppTheme.radiusCard),
          border: Border.all(color: AppTheme.border),
        ),
        child: Column(
          children: [
            Icon(icon, color: AppTheme.primary, size: 24),
            const SizedBox(height: 6),
            Text(
              label,
              style: AppTheme.bodySmall(fontWeight: FontWeight.w600, color: AppTheme.textPrimary),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}
