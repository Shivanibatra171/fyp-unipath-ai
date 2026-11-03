import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Color Palette Constants
  static const Color background = Color(0xFFF5F6F9); // Soft Paper Blue-White
  static const Color surface = Color(0xFFFFFFFF); // Cards & Sheets
  static const Color primary = Color(0xFF17284A); // Ink Navy
  static const Color primaryDark = Color(0xFF0E1B33); // Pressed / Appbar dark
  static const Color accent = Color(0xFFC79A3D); // Convocation Gold
  static const Color accentDark = Color(0xFFA67C28);
  static const Color success = Color(0xFF2F6B4F); // Field Green
  static const Color alert = Color(0xFFB5482F); // Clay Red
  static const Color textPrimary = Color(0xFF1B1F27);
  static const Color textSecondary = Color(0xFF5B6472);
  static const Color border = Color(0xFFE1E4EA);
  static const Color primarySubtle = Color(0xFFF0F4FA);
  static const Color accentSubtle = Color(0xFFFDF7EC);
  static const Color successSubtle = Color(0xFFEFF8F3);
  static const Color alertSubtle = Color(0xFFFDF2F0);

  // Radii
  static const double radiusButton = 8.0;
  static const double radiusCard = 12.0;
  static const double radiusInput = 8.0;

  // Typography Generators
  static TextStyle headingLarge({Color color = textPrimary, FontWeight fontWeight = FontWeight.bold, double? height, FontStyle? fontStyle}) {
    return GoogleFonts.fraunces(
      fontSize: 26,
      fontWeight: fontWeight,
      color: color,
      height: height,
      fontStyle: fontStyle,
      letterSpacing: -0.5,
    );
  }

  static TextStyle headingMedium({Color color = textPrimary, FontWeight fontWeight = FontWeight.bold, double? height, FontStyle? fontStyle}) {
    return GoogleFonts.fraunces(
      fontSize: 20,
      fontWeight: fontWeight,
      color: color,
      height: height,
      fontStyle: fontStyle,
      letterSpacing: -0.3,
    );
  }

  static TextStyle headingSmall({Color color = textPrimary, FontWeight fontWeight = FontWeight.w600, double? height, FontStyle? fontStyle}) {
    return GoogleFonts.fraunces(
      fontSize: 16,
      fontWeight: fontWeight,
      color: color,
      height: height,
      fontStyle: fontStyle,
    );
  }

  static TextStyle bodyLarge({Color color = textPrimary, FontWeight fontWeight = FontWeight.normal, double? height, FontStyle? fontStyle}) {
    return GoogleFonts.ibmPlexSans(
      fontSize: 15,
      fontWeight: fontWeight,
      color: color,
      height: height ?? 1.4,
      fontStyle: fontStyle,
    );
  }

  static TextStyle bodyMedium({Color color = textPrimary, FontWeight fontWeight = FontWeight.normal, double? height, FontStyle? fontStyle}) {
    return GoogleFonts.ibmPlexSans(
      fontSize: 13,
      fontWeight: fontWeight,
      color: color,
      height: height ?? 1.4,
      fontStyle: fontStyle,
    );
  }

  static TextStyle bodySmall({Color color = textSecondary, FontWeight fontWeight = FontWeight.normal, double? height, FontStyle? fontStyle}) {
    return GoogleFonts.ibmPlexSans(
      fontSize: 11,
      fontWeight: fontWeight,
      color: color,
      height: height ?? 1.3,
      fontStyle: fontStyle,
    );
  }

  static TextStyle labelLarge({Color color = textPrimary, FontWeight fontWeight = FontWeight.w600, double? height, FontStyle? fontStyle}) {
    return GoogleFonts.ibmPlexSans(
      fontSize: 14,
      fontWeight: fontWeight,
      color: color,
      height: height,
      fontStyle: fontStyle,
    );
  }

  static TextStyle labelMedium({Color color = textSecondary, FontWeight fontWeight = FontWeight.w600, double? height, FontStyle? fontStyle}) {
    return GoogleFonts.ibmPlexSans(
      fontSize: 12,
      fontWeight: fontWeight,
      color: color,
      height: height,
      fontStyle: fontStyle,
    );
  }

  // Central ThemeData
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: background,
      primaryColor: primary,
      colorScheme: const ColorScheme.light(
        primary: primary,
        secondary: accent,
        surface: surface,
        error: alert,
        onPrimary: Colors.white,
        onSecondary: primary,
        onSurface: textPrimary,
        onError: Colors.white,
      ),
      dividerColor: border,
      appBarTheme: AppBarTheme(
        backgroundColor: primary,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: GoogleFonts.fraunces(
          fontSize: 19,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      cardTheme: CardThemeData(
        color: surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusCard),
          side: const BorderSide(color: border, width: 1),
        ),
        margin: EdgeInsets.zero,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(radiusButton),
          ),
          textStyle: GoogleFonts.ibmPlexSans(
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primary,
          side: const BorderSide(color: border, width: 1),
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(radiusButton),
          ),
          textStyle: GoogleFonts.ibmPlexSans(
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surface,
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        hintStyle: GoogleFonts.ibmPlexSans(color: const Color(0xFF8E97A6), fontSize: 13),
        labelStyle: GoogleFonts.ibmPlexSans(color: textSecondary, fontSize: 13, fontWeight: FontWeight.w500),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusInput),
          borderSide: const BorderSide(color: border, width: 1),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusInput),
          borderSide: const BorderSide(color: border, width: 1),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusInput),
          borderSide: const BorderSide(color: primary, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusInput),
          borderSide: const BorderSide(color: alert, width: 1),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusInput),
          borderSide: const BorderSide(color: alert, width: 1.5),
        ),
        errorStyle: GoogleFonts.ibmPlexSans(color: alert, fontSize: 11),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: surface,
        elevation: 3,
        indicatorColor: primarySubtle,
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return GoogleFonts.ibmPlexSans(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: primary,
            );
          }
          return GoogleFonts.ibmPlexSans(
            fontSize: 11,
            fontWeight: FontWeight.w500,
            color: textSecondary,
          );
        }),
        iconTheme: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return const IconThemeData(color: primary, size: 24);
          }
          return const IconThemeData(color: textSecondary, size: 22);
        }),
      ),
    );
  }
}
