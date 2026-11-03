import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../data/mock_data.dart';
import '../../widgets/badge_chip.dart';

class StudyPlanScreen extends StatefulWidget {
  const StudyPlanScreen({super.key});

  @override
  State<StudyPlanScreen> createState() => _StudyPlanScreenState();
}

class _StudyPlanScreenState extends State<StudyPlanScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final List<StudyPlanWeek> _weeks = MockData.sampleStudyPlan;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _weeks.length, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  double _getWeekProgress(StudyPlanWeek week) {
    if (week.tasks.isEmpty) return 0;
    final done = week.tasks.where((t) => t.completed).length;
    return done / week.tasks.length;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('4-Week Study Timetable', style: AppTheme.headingSmall()),
            Text('Tailored for NET, ECAT & FAST-NU', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
          ],
        ),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.primaryDark),
          onPressed: () => Navigator.pop(context),
        ),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppTheme.accent,
          indicatorWeight: 3,
          labelColor: AppTheme.primary,
          unselectedLabelColor: AppTheme.textSecondary,
          labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
          tabs: _weeks.map((w) => Tab(text: 'Week ${w.weekNumber}')).toList(),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: _weeks.map((week) {
          final progress = _getWeekProgress(week);
          final doneTasks = week.tasks.where((t) => t.completed).length;

          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              // Week Overview Banner
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
                        Text(
                          week.title,
                          style: const TextStyle(color: AppTheme.accent, fontWeight: FontWeight.bold, fontSize: 13),
                        ),
                        BadgeChip(
                          label: '${(progress * 100).toInt()}% Done',
                          variant: progress == 1.0 ? BadgeVariant.green : BadgeVariant.gold,
                          isSmall: true,
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      week.theme,
                      style: AppTheme.headingSmall(color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      week.objective,
                      style: TextStyle(color: Colors.white.withOpacity(0.85), fontSize: 12),
                    ),
                    const SizedBox(height: 12),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: progress,
                        backgroundColor: Colors.white24,
                        valueColor: AlwaysStoppedAnimation<Color>(
                          progress == 1.0 ? AppTheme.success : AppTheme.accent,
                        ),
                        minHeight: 6,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Daily Scheduled Tasks', style: AppTheme.labelLarge(fontWeight: FontWeight.bold)),
                  Text(
                    '$doneTasks of ${week.tasks.length} Completed',
                    style: AppTheme.bodySmall(color: AppTheme.textSecondary, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
              const SizedBox(height: 10),

              // Task List
              ...week.tasks.map((task) {
                return Container(
                  margin: const EdgeInsets.only(bottom: 10),
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: AppTheme.surface,
                    borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                    border: Border.all(
                      color: task.completed ? AppTheme.success.withOpacity(0.3) : AppTheme.border,
                    ),
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            task.completed = !task.completed;
                          });
                          if (_getWeekProgress(week) == 1.0) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('MashaAllah! All tasks for Week ${week.weekNumber} completed!'),
                                backgroundColor: AppTheme.success,
                              ),
                            );
                          }
                        },
                        child: Container(
                          width: 24,
                          height: 24,
                          margin: const EdgeInsets.only(top: 2),
                          decoration: BoxDecoration(
                            color: task.completed ? AppTheme.success : Colors.transparent,
                            borderRadius: BorderRadius.circular(6),
                            border: Border.all(
                              color: task.completed ? AppTheme.success : AppTheme.textSecondary,
                              width: 1.5,
                            ),
                          ),
                          child: task.completed
                              ? const Icon(Icons.check, size: 16, color: Colors.white)
                              : null,
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
                                BadgeChip(label: task.subject, variant: BadgeVariant.navy, isSmall: true),
                                Row(
                                  children: [
                                    const Icon(Icons.access_time, size: 12, color: AppTheme.textSecondary),
                                    const SizedBox(width: 4),
                                    Text(task.time, style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                                  ],
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(
                              task.topic,
                              style: AppTheme.labelMedium(
                                fontWeight: FontWeight.bold,
                                color: task.completed ? AppTheme.textSecondary : AppTheme.textPrimary,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Row(
                              children: [
                                const Icon(Icons.menu_book_outlined, size: 13, color: AppTheme.accentDark),
                                const SizedBox(width: 4),
                                Expanded(
                                  child: Text(
                                    task.resource,
                                    style: AppTheme.bodySmall(color: AppTheme.accentDark, fontWeight: FontWeight.w500),
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              }).toList(),
            ],
          );
        }).toList(),
      ),
    );
  }
}
