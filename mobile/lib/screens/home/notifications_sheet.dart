import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../data/mock_data.dart';
import '../../widgets/badge_chip.dart';
import '../../widgets/app_button.dart';

class NotificationsSheet extends StatefulWidget {
  final VoidCallback? onAlertsUpdated;

  const NotificationsSheet({super.key, this.onAlertsUpdated});

  static Future<void> show(BuildContext context, {VoidCallback? onAlertsUpdated}) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => NotificationsSheet(onAlertsUpdated: onAlertsUpdated),
    );
  }

  @override
  State<NotificationsSheet> createState() => _NotificationsSheetState();
}

class _NotificationsSheetState extends State<NotificationsSheet> {
  String _filter = 'All'; // 'All', 'Unread', 'Urgent'

  List<AdmissionAlert> get _filteredAlerts {
    if (_filter == 'Unread') {
      return MockData.admissionAlerts.where((a) => !a.isRead).toList();
    } else if (_filter == 'Urgent') {
      return MockData.admissionAlerts.where((a) => a.urgency == 'urgent').toList();
    }
    return MockData.admissionAlerts;
  }

  void _markAllAsRead() {
    setState(() {
      for (var alert in MockData.admissionAlerts) {
        alert.isRead = true;
      }
    });
    widget.onAlertsUpdated?.call();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.75,
      padding: const EdgeInsets.only(top: 16),
      decoration: const BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          // Grab handle
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
          const SizedBox(height: 12),

          // Header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.notifications_active_outlined, color: AppTheme.primary, size: 22),
                    const SizedBox(width: 8),
                    Text(
                      'Admission Alerts',
                      style: AppTheme.headingSmall(fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                TextButton(
                  onPressed: _markAllAsRead,
                  child: Text(
                    'Mark all read',
                    style: AppTheme.bodySmall(color: AppTheme.accentDark, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),

          // Filter chips
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              children: ['All', 'Unread', 'Urgent'].map((tab) {
                final isSelected = _filter == tab;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ChoiceChip(
                    label: Text(tab),
                    selected: isSelected,
                    onSelected: (selected) {
                      if (selected) setState(() => _filter = tab);
                    },
                    selectedColor: AppTheme.primarySubtle,
                    backgroundColor: AppTheme.background,
                    labelStyle: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: isSelected ? AppTheme.primary : AppTheme.textSecondary,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                      side: BorderSide(
                        color: isSelected ? AppTheme.primary : AppTheme.border,
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
          const Divider(height: 20),

          // Alerts list
          Expanded(
            child: _filteredAlerts.isEmpty
                ? Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.notifications_none, size: 48, color: AppTheme.textSecondary.withOpacity(0.5)),
                        const SizedBox(height: 8),
                        Text('No alerts in this category', style: AppTheme.bodyMedium(color: AppTheme.textSecondary)),
                      ],
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                    itemCount: _filteredAlerts.length,
                    separatorBuilder: (context, i) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final alert = _filteredAlerts[index];
                      return Container(
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: alert.isRead ? AppTheme.surface : AppTheme.primarySubtle.withOpacity(0.3),
                          borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                          border: Border.all(
                            color: alert.isRead ? AppTheme.border : AppTheme.accent.withOpacity(0.4),
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    if (!alert.isRead) ...[
                                      Container(
                                        width: 8,
                                        height: 8,
                                        decoration: const BoxDecoration(
                                          color: AppTheme.accentDark,
                                          shape: BoxShape.circle,
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                    ],
                                    Text(
                                      alert.universityName,
                                      style: AppTheme.labelMedium(
                                        color: AppTheme.primary,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                                BadgeChip(
                                  label: alert.urgency.toUpperCase(),
                                  variant: alert.urgency == 'urgent' ? BadgeVariant.red : BadgeVariant.navy,
                                  isSmall: true,
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(
                              alert.title,
                              style: AppTheme.labelLarge(fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              alert.message,
                              style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                            ),
                            const SizedBox(height: 8),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  alert.date,
                                  style: AppTheme.bodySmall(color: AppTheme.textSecondary.withOpacity(0.8)),
                                ),
                                if (!alert.isRead)
                                  InkWell(
                                    onTap: () {
                                      setState(() => alert.isRead = true);
                                      widget.onAlertsUpdated?.call();
                                    },
                                    child: Text(
                                      'Acknowledge',
                                      style: AppTheme.bodySmall(
                                        color: AppTheme.primary,
                                        fontWeight: FontWeight.bold,
                                      ),
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
          Padding(
            padding: const EdgeInsets.all(16),
            child: AppButton(
              text: 'Close Alerts',
              variant: AppButtonVariant.secondary,
              onPressed: () => Navigator.pop(context),
            ),
          ),
        ],
      ),
    );
  }
}
