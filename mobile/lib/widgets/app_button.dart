import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

enum AppButtonVariant {
  primary,
  accent,
  secondary,
  outline,
  danger,
  textOnly,
}

class AppButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final AppButtonVariant variant;
  final IconData? icon;
  final bool isLoading;
  final bool isFullWidth;
  final double height;
  final EdgeInsetsGeometry? padding;

  const AppButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.variant = AppButtonVariant.primary,
    this.icon,
    this.isLoading = false,
    this.isFullWidth = true,
    this.height = 48,
    this.padding,
  });

  @override
  Widget build(BuildContext context) {
    Color bgColor;
    Color fgColor;
    BorderSide? borderSide;

    switch (variant) {
      case AppButtonVariant.primary:
        bgColor = AppTheme.primary;
        fgColor = Colors.white;
        break;
      case AppButtonVariant.accent:
        bgColor = AppTheme.accent;
        fgColor = AppTheme.primaryDark;
        break;
      case AppButtonVariant.secondary:
        bgColor = AppTheme.primarySubtle;
        fgColor = AppTheme.primary;
        break;
      case AppButtonVariant.outline:
        bgColor = Colors.transparent;
        fgColor = AppTheme.primary;
        borderSide = const BorderSide(color: AppTheme.border, width: 1.5);
        break;
      case AppButtonVariant.danger:
        bgColor = AppTheme.alert;
        fgColor = Colors.white;
        break;
      case AppButtonVariant.textOnly:
        bgColor = Colors.transparent;
        fgColor = AppTheme.primary;
        break;
    }

    final bool isDisabled = onPressed == null || isLoading;

    Widget child = isLoading
        ? SizedBox(
            height: 20,
            width: 20,
            child: CircularProgressIndicator(
              strokeWidth: 2,
              valueColor: AlwaysStoppedAnimation<Color>(fgColor),
            ),
          )
        : Row(
            mainAxisSize: isFullWidth ? MainAxisSize.max : MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (icon != null) ...[
                Icon(icon, size: 18, color: isDisabled ? fgColor.withOpacity(0.5) : fgColor),
                const SizedBox(width: 8),
              ],
              Text(
                text,
                style: AppTheme.labelLarge(
                  color: isDisabled ? fgColor.withOpacity(0.5) : fgColor,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          );

    return SizedBox(
      width: isFullWidth ? double.infinity : null,
      height: height,
      child: ElevatedButton(
        onPressed: isDisabled ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: bgColor,
          foregroundColor: fgColor,
          disabledBackgroundColor: bgColor.withOpacity(0.4),
          disabledForegroundColor: fgColor.withOpacity(0.4),
          elevation: 0,
          shadowColor: Colors.transparent,
          side: borderSide,
          padding: padding ?? const EdgeInsets.symmetric(horizontal: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppTheme.radiusButton),
          ),
        ),
        child: child,
      ),
    );
  }
}
