import 'package:flutter/material.dart';
import 'theme/app_theme.dart';
import 'screens/onboarding/onboarding_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/signup_screen.dart';
import 'screens/main_navigation_screen.dart';
import 'screens/test_prep/diagnostic_test_screen.dart';
import 'screens/test_prep/study_plan_screen.dart';
import 'screens/test_prep/mock_catalog_screen.dart';
import 'screens/discover/rag_chat_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const UniPathApp());
}

class UniPathApp extends StatelessWidget {
  const UniPathApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UniPath AI - Academic Admissions & Test Prep Portal',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: '/',
      routes: {
        '/': (context) => const OnboardingScreen(),
        '/login': (context) => const LoginScreen(),
        '/signup': (context) => const SignUpScreen(),
        '/main': (context) => const MainNavigationScreen(),
        '/diagnostic': (context) => const DiagnosticTestScreen(),
        '/study-plan': (context) => const StudyPlanScreen(),
        '/mocks': (context) => const MockCatalogScreen(),
        '/rag-chat': (context) => const RagChatScreen(),
      },
    );
  }
}
