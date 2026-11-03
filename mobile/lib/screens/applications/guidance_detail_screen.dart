import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../widgets/app_button.dart';
import '../../widgets/badge_chip.dart';

class GuidanceStep {
  final int step;
  final String title;
  final String description;
  final String tip;
  bool isCompleted;

  GuidanceStep({
    required this.step,
    required this.title,
    required this.description,
    required this.tip,
    this.isCompleted = false,
  });
}

class GuidanceDetailScreen extends StatefulWidget {
  final University university;

  const GuidanceDetailScreen({
    super.key,
    required this.university,
  });

  @override
  State<GuidanceDetailScreen> createState() => _GuidanceDetailScreenState();
}

class _GuidanceDetailScreenState extends State<GuidanceDetailScreen> {
  late List<GuidanceStep> _steps;

  @override
  void initState() {
    super.initState();
    _steps = [
      GuidanceStep(
        step: 1,
        title: 'Create Account on Official Portal',
        description:
            'Visit the admission portal at ${widget.university.admissionsPortalUrl}. Register with a permanent email and student CNIC/B-Form number.',
        tip: 'Ensure your name matches your Matriculation Sanad character-for-character.',
        isCompleted: true,
      ),
      GuidanceStep(
        step: 2,
        title: 'Print & Pay Admission Processing Fee Challan',
        description:
            'Generate the printed fee challan (approx PKR 3,500–5,000) and deposit at designated branches (HBL, Askari Bank, or online 1Link/Kuickpay).',
        tip: 'Retain the stamped "University Copy" and "Student Copy" safely. Scan the paid voucher immediately.',
        isCompleted: true,
      ),
      GuidanceStep(
        step: 3,
        title: 'Select Entry Test Schedule & Center',
        description:
            'Log back into the portal after fee verification (usually 24–48 hours) and select your preferred test city and morning/afternoon shift.',
        tip: 'Computer-based test slots at main campuses fill within days. Book as early as possible.',
        isCompleted: false,
      ),
      GuidanceStep(
        step: 4,
        title: 'Upload Scanned Documents & Photographs',
        description:
            'Upload clear scans of your Matric marksheet, FSc Part-1 result card, CNIC/B-Form, and passport-size photographs with light blue background.',
        tip: 'Keep each PDF/JPEG file size under 1MB to avoid portal upload errors.',
        isCompleted: false,
      ),
      GuidanceStep(
        step: 5,
        title: 'Print Admit Card & Test Day Checklist',
        description:
            'Download and print the official roll number slip / admit card 1 week prior to your examination date.',
        tip: 'Bring original CNIC/B-Form, printed admit card, and a transparent clipboard. Mobile phones and calculators are strictly prohibited.',
        isCompleted: false,
      ),
    ];
  }

  int get _completedCount => _steps.where((s) => s.isCompleted).length;

  @override
  Widget build(BuildContext context) {
    final uni = widget.university;
    final progress = _completedCount / _steps.length;

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text('${uni.shortName} Application Roadmap', style: AppTheme.headingSmall()),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.primaryDark),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Progress Header Card
            Container(
              padding: const EdgeInsets.all(16),
              color: AppTheme.surface,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Application Completion', style: AppTheme.labelMedium(fontWeight: FontWeight.bold)),
                          Text('$_completedCount of ${_steps.length} Steps Ready', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                        ],
                      ),
                      BadgeChip(
                        label: '${(progress * 100).toInt()}% Done',
                        variant: progress == 1.0 ? BadgeVariant.green : BadgeVariant.gold,
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(
                      value: progress,
                      backgroundColor: AppTheme.border,
                      valueColor: AlwaysStoppedAnimation<Color>(
                        progress == 1.0 ? AppTheme.success : AppTheme.accent,
                      ),
                      minHeight: 6,
                    ),
                  ),
                ],
              ),
            ),
            const Divider(height: 1),

            // Steps List
            Expanded(
              child: ListView.separated(
                padding: const EdgeInsets.all(16),
                itemCount: _steps.length,
                separatorBuilder: (context, i) => const SizedBox(height: 12),
                itemBuilder: (context, index) {
                  final step = _steps[index];
                  return Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppTheme.surface,
                      borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                      border: Border.all(
                        color: step.isCompleted ? AppTheme.success.withOpacity(0.4) : AppTheme.border,
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            GestureDetector(
                              onTap: () {
                                setState(() {
                                  step.isCompleted = !step.isCompleted;
                                });
                              },
                              child: Container(
                                width: 26,
                                height: 26,
                                decoration: BoxDecoration(
                                  color: step.isCompleted ? AppTheme.success : Colors.transparent,
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: step.isCompleted ? AppTheme.success : AppTheme.textSecondary,
                                    width: 2,
                                  ),
                                ),
                                child: step.isCompleted
                                    ? const Icon(Icons.check, size: 16, color: Colors.white)
                                    : Center(
                                        child: Text(
                                          '${step.step}',
                                          style: const TextStyle(
                                            fontSize: 11,
                                            fontWeight: FontWeight.bold,
                                            color: AppTheme.textSecondary,
                                          ),
                                        ),
                                      ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    step.title,
                                    style: AppTheme.labelLarge(
                                      fontWeight: FontWeight.bold,
                                      color: step.isCompleted ? AppTheme.textPrimary : AppTheme.primaryDark,
                                    ),
                                  ),
                                  const SizedBox(height: 6),
                                  Text(
                                    step.description,
                                    style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: AppTheme.accentSubtle,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: AppTheme.accent.withOpacity(0.3)),
                          ),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Icon(Icons.lightbulb_outline, size: 16, color: AppTheme.accentDark),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  step.tip,
                                  style: AppTheme.bodySmall(
                                    color: AppTheme.accentDark,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),

            // Footer Action
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                border: Border(top: BorderSide(color: AppTheme.border)),
              ),
              child: AppButton(
                text: 'Launch ${uni.shortName} Admission Portal',
                icon: Icons.open_in_new,
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Opening portal: ${uni.admissionsPortalUrl}')),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
