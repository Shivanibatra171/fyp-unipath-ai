import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../widgets/app_button.dart';
import '../../widgets/badge_chip.dart';
import 'university_detail_screen.dart';

class ShortlistScreen extends StatefulWidget {
  final List<University> shortlistedUniversities;
  final ValueChanged<String>? onRemove;

  const ShortlistScreen({
    super.key,
    required this.shortlistedUniversities,
    this.onRemove,
  });

  @override
  State<ShortlistScreen> createState() => _ShortlistScreenState();
}

class _ShortlistScreenState extends State<ShortlistScreen> {
  final Map<String, bool> _notificationToggles = {};

  @override
  void initState() {
    super.initState();
    for (var u in widget.shortlistedUniversities) {
      _notificationToggles[u.id] = true;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text('My Shortlist', style: AppTheme.headingSmall()),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.primaryDark),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: widget.shortlistedUniversities.isEmpty
            ? Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.bookmark_border, size: 64, color: AppTheme.textSecondary.withOpacity(0.4)),
                    const SizedBox(height: 12),
                    Text(
                      'No Universities Shortlisted Yet',
                      style: AppTheme.headingSmall(color: AppTheme.textSecondary),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Tap the bookmark icon on any university to track deadlines.',
                      style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                    ),
                  ],
                ),
              )
            : ListView.separated(
                padding: const EdgeInsets.all(16),
                itemCount: widget.shortlistedUniversities.length,
                separatorBuilder: (context, i) => const SizedBox(height: 14),
                itemBuilder: (context, index) {
                  final uni = widget.shortlistedUniversities[index];
                  final bool notifOn = _notificationToggles[uni.id] ?? true;

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
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: AppTheme.accent,
                                    borderRadius: BorderRadius.circular(6),
                                  ),
                                  child: Text(
                                    uni.shortName,
                                    style: const TextStyle(
                                      color: AppTheme.primaryDark,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 12,
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                BadgeChip(label: uni.city, variant: BadgeVariant.neutral, isSmall: true),
                              ],
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete_outline, color: AppTheme.alert, size: 20),
                              onPressed: () {
                                widget.onRemove?.call(uni.id);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(content: Text('${uni.shortName} removed from shortlist')),
                                );
                              },
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          uni.name,
                          style: AppTheme.labelLarge(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Target Test: ${uni.acceptedTests.first} (Weight: ${uni.entryTestWeight}%)',
                          style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                        ),
                        const Divider(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Icon(
                                  notifOn ? Icons.notifications_active : Icons.notifications_off_outlined,
                                  size: 16,
                                  color: notifOn ? AppTheme.accentDark : AppTheme.textSecondary,
                                ),
                                const SizedBox(width: 6),
                                Text(
                                  'Deadline Reminders',
                                  style: AppTheme.bodySmall(fontWeight: FontWeight.w600),
                                ),
                              ],
                            ),
                            Switch(
                              value: notifOn,
                              activeColor: AppTheme.accent,
                              onChanged: (val) {
                                setState(() {
                                  _notificationToggles[uni.id] = val;
                                });
                              },
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Expanded(
                              child: AppButton(
                                text: 'View Details',
                                variant: AppButtonVariant.secondary,
                                height: 38,
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => UniversityDetailScreen(
                                        university: uni,
                                        isInitiallyShortlisted: true,
                                      ),
                                    ),
                                  );
                                },
                              ),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: AppButton(
                                text: 'Online Portal',
                                variant: AppButtonVariant.primary,
                                height: 38,
                                icon: Icons.open_in_new,
                                onPressed: () {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(content: Text('Opening ${uni.shortName} Admissions Portal: ${uni.admissionsPortalUrl}')),
                                  );
                                },
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),
      ),
    );
  }
}
