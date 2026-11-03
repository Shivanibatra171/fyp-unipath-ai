import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ProgressStepItem {
  final int stepNumber;
  final String title;
  final String subtitle;
  final IconData icon;
  final bool isCompleted;
  final bool isCurrent;

  const ProgressStepItem({
    required this.stepNumber,
    required this.title,
    required this.subtitle,
    required this.icon,
    this.isCompleted = false,
    this.isCurrent = false,
  });
}

class ProgressPath extends StatelessWidget {
  final List<ProgressStepItem> steps;
  final ValueChanged<int>? onStepTap;

  const ProgressPath({
    super.key,
    required this.steps,
    this.onStepTap,
  });

  @override
  Widget build(BuildContext context) {
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
              Text(
                'Admission Journey Progress',
                style: AppTheme.headingSmall(fontWeight: FontWeight.bold),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: AppTheme.accentSubtle,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppTheme.accent.withOpacity(0.3)),
                ),
                child: Text(
                  '${steps.where((s) => s.isCompleted).length} of ${steps.length} Completed',
                  style: AppTheme.bodySmall(
                    color: AppTheme.accentDark,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Column(
            children: List.generate(steps.length, (index) {
              final step = steps[index];
              final isLast = index == steps.length - 1;

              Color indicatorColor;
              Color iconColor;
              Widget iconWidget;

              if (step.isCompleted) {
                indicatorColor = AppTheme.success;
                iconColor = Colors.white;
                iconWidget = const Icon(Icons.check, size: 14, color: Colors.white);
              } else if (step.isCurrent) {
                indicatorColor = AppTheme.accent;
                iconColor = AppTheme.primaryDark;
                iconWidget = Text(
                  '${step.stepNumber}',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.primaryDark,
                  ),
                );
              } else {
                indicatorColor = AppTheme.border;
                iconColor = AppTheme.textSecondary;
                iconWidget = Text(
                  '${step.stepNumber}',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.textSecondary,
                  ),
                );
              }

              return InkWell(
                onTap: onStepTap != null ? () => onStepTap!(index) : null,
                borderRadius: BorderRadius.circular(8),
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 4),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Column(
                        children: [
                          Container(
                            width: 28,
                            height: 28,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: indicatorColor,
                              border: step.isCurrent
                                  ? Border.all(color: AppTheme.accentDark, width: 2)
                                  : null,
                            ),
                            alignment: Alignment.center,
                            child: iconWidget,
                          ),
                          if (!isLast)
                            Container(
                              width: 2,
                              height: 32,
                              color: step.isCompleted
                                  ? AppTheme.success
                                  : AppTheme.border,
                            ),
                        ],
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Text(
                                  step.title,
                                  style: AppTheme.labelLarge(
                                    color: step.isCurrent
                                        ? AppTheme.primary
                                        : (step.isCompleted
                                            ? AppTheme.textPrimary
                                            : AppTheme.textSecondary),
                                    fontWeight: step.isCurrent ? FontWeight.bold : FontWeight.w600,
                                  ),
                                ),
                                if (step.isCurrent) ...[
                                  const SizedBox(width: 8),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: AppTheme.primarySubtle,
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      'ACTIVE',
                                      style: TextStyle(
                                        fontSize: 9,
                                        fontWeight: FontWeight.bold,
                                        color: AppTheme.primary,
                                      ),
                                    ),
                                  ),
                                ],
                              ],
                            ),
                            const SizedBox(height: 2),
                            Text(
                              step.subtitle,
                              style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                            ),
                          ],
                        ),
                      ),
                      Icon(
                        Icons.chevron_right,
                        size: 18,
                        color: AppTheme.textSecondary.withOpacity(0.5),
                      ),
                    ],
                  ),
                ),
              );
            }),
          ),
        ],
      ),
    );
  }
}
