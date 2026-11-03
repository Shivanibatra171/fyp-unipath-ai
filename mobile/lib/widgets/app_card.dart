import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AppCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final VoidCallback? onTap;
  final Color backgroundColor;
  final Color borderColor;
  final double borderWidth;
  final double borderRadius;
  final Color? topAccentColor;
  final Widget? headerLeading;
  final String? title;
  final String? subtitle;
  final Widget? headerTrailing;

  const AppCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(16.0),
    this.onTap,
    this.backgroundColor = AppTheme.surface,
    this.borderColor = AppTheme.border,
    this.borderWidth = 1.0,
    this.borderRadius = AppTheme.radiusCard,
    this.topAccentColor,
    this.headerLeading,
    this.title,
    this.subtitle,
    this.headerTrailing,
  });

  @override
  Widget build(BuildContext context) {
    Widget content = child;

    if (title != null || headerLeading != null || headerTrailing != null) {
      content = Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              if (headerLeading != null) ...[
                headerLeading!,
                const SizedBox(width: 10),
              ],
              if (title != null)
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title!,
                        style: AppTheme.headingSmall(fontWeight: FontWeight.w700),
                      ),
                      if (subtitle != null) ...[
                        const SizedBox(height: 2),
                        Text(
                          subtitle!,
                          style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                        ),
                      ],
                    ],
                  ),
                ),
              if (headerTrailing != null) headerTrailing!,
            ],
          ),
          const SizedBox(height: 12),
          child,
        ],
      );
    }

    Widget cardBody = Container(
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(borderRadius),
        border: Border.all(color: borderColor, width: borderWidth),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(borderRadius),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (topAccentColor != null)
              Container(
                height: 4,
                color: topAccentColor,
              ),
            Padding(
              padding: padding,
              child: content,
            ),
          ],
        ),
      ),
    );

    if (onTap != null) {
      return Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(borderRadius),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(borderRadius),
          splashColor: AppTheme.primarySubtle,
          highlightColor: AppTheme.primarySubtle.withOpacity(0.5),
          child: cardBody,
        ),
      );
    }

    return cardBody;
  }
}
