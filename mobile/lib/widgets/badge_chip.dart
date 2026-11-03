import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

enum BadgeVariant {
  navy,
  gold,
  green,
  red,
  neutral,
}

class BadgeChip extends StatelessWidget {
  final String label;
  final BadgeVariant variant;
  final IconData? icon;
  final bool isSmall;
  final VoidCallback? onTap;

  const BadgeChip({
    super.key,
    required this.label,
    this.variant = BadgeVariant.navy,
    this.icon,
    this.isSmall = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    Color bg;
    Color fg;
    Color border;

    switch (variant) {
      case BadgeVariant.navy:
        bg = AppTheme.primarySubtle;
        fg = AppTheme.primary;
        border = AppTheme.primary.withOpacity(0.2);
        break;
      case BadgeVariant.gold:
        bg = AppTheme.accentSubtle;
        fg = AppTheme.accentDark;
        border = AppTheme.accent.withOpacity(0.3);
        break;
      case BadgeVariant.green:
        bg = AppTheme.successSubtle;
        fg = AppTheme.success;
        border = AppTheme.success.withOpacity(0.3);
        break;
      case BadgeVariant.red:
        bg = AppTheme.alertSubtle;
        fg = AppTheme.alert;
        border = AppTheme.alert.withOpacity(0.3);
        break;
      case BadgeVariant.neutral:
        bg = const Color(0xFFF1F3F5);
        fg = AppTheme.textSecondary;
        border = AppTheme.border;
        break;
    }

    final child = Container(
      padding: EdgeInsets.symmetric(
        horizontal: isSmall ? 8 : 10,
        vertical: isSmall ? 3 : 5,
      ),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: border, width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (icon != null) ...[
            Icon(icon, size: isSmall ? 12 : 14, color: fg),
            const SizedBox(width: 4),
          ],
          Text(
            label,
            style: AppTheme.bodySmall(
              color: fg,
              fontWeight: FontWeight.w600,
            ).copyWith(fontSize: isSmall ? 11 : 12),
          ),
        ],
      ),
    );

    if (onTap != null) {
      return InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: child,
      );
    }

    return child;
  }
}
