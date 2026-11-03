import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../widgets/app_button.dart';
import '../auth/login_screen.dart';
import '../main_navigation_screen.dart';

class OnboardingSlide {
  final String title;
  final String description;
  final IconData icon;
  final String tag;

  const OnboardingSlide({
    required this.title,
    required this.description,
    required this.icon,
    required this.tag,
  });
}

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<OnboardingSlide> _slides = const [
    OnboardingSlide(
      tag: 'DISCOVER FIT',
      title: 'Find the Right Degree for Your Strengths',
      description:
          'Take our AI cognitive interview tailored for Pakistani FSc (Pre-Eng, Pre-Med, ICS, I.Com) and A-Level students to discover matching degree programs.',
      icon: Icons.psychology_outlined,
    ),
    OnboardingSlide(
      tag: 'TRANSPARENT ADMISSIONS',
      title: 'Compare 10 Top Pakistani Universities',
      description:
          'Access verified closing merits, fee breakdowns, HEC rankings, hostel availability, and need-based scholarships for NUST, LUMS, FAST, IBA, and more.',
      icon: Icons.account_balance_outlined,
    ),
    OnboardingSlide(
      tag: 'TEST PREPARATION',
      title: 'Ace NET, ECAT, FAST & IBA Entry Tests',
      description:
          'Diagnostic 25-MCQ evaluations, personalized 4-week timetables, subject-wise weakness isolation, and university entrance mock tests.',
      icon: Icons.assignment_turned_in_outlined,
    ),
  ];

  void _onNext() {
    if (_currentPage < _slides.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _goToLogin();
    }
  }

  void _goToLogin() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const LoginScreen()),
    );
  }

  void _skipToApp() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const MainNavigationScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          TextButton(
            onPressed: _skipToApp,
            child: Text(
              'Skip',
              style: AppTheme.labelMedium(
                color: AppTheme.textSecondary,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                itemCount: _slides.length,
                onPageChanged: (index) => setState(() => _currentPage = index),
                itemBuilder: (context, index) {
                  final slide = _slides[index];
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 28.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 110,
                          height: 110,
                          decoration: BoxDecoration(
                            color: AppTheme.primarySubtle,
                            shape: BoxShape.circle,
                            border: Border.all(color: AppTheme.accent.withOpacity(0.4), width: 2),
                          ),
                          child: Icon(
                            slide.icon,
                            size: 52,
                            color: AppTheme.primary,
                          ),
                        ),
                        const SizedBox(height: 36),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppTheme.accentSubtle,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: AppTheme.accent.withOpacity(0.3)),
                          ),
                          child: Text(
                            slide.tag,
                            style: AppTheme.bodySmall(
                              color: AppTheme.accentDark,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          slide.title,
                          textAlign: TextAlign.center,
                          style: AppTheme.headingLarge(
                            color: AppTheme.primaryDark,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 14),
                        Text(
                          slide.description,
                          textAlign: TextAlign.center,
                          style: AppTheme.bodyMedium(
                            color: AppTheme.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      _slides.length,
                      (index) => AnimatedContainer(
                        duration: const Duration(milliseconds: 250),
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        width: _currentPage == index ? 24 : 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: _currentPage == index ? AppTheme.accent : AppTheme.border,
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 28),
                  AppButton(
                    text: _currentPage == _slides.length - 1 ? 'Get Started' : 'Next',
                    variant: _currentPage == _slides.length - 1
                        ? AppButtonVariant.accent
                        : AppButtonVariant.primary,
                    icon: Icons.arrow_forward,
                    onPressed: _onNext,
                  ),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Already registered? ',
                        style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                      ),
                      GestureDetector(
                        onTap: _goToLogin,
                        child: Text(
                          'Sign In',
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
            ),
          ],
        ),
      ),
    );
  }
}
