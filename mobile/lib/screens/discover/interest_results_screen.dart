import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../widgets/app_button.dart';
import '../../widgets/badge_chip.dart';
import 'interest_interview_screen.dart';

class InterestResultsScreen extends StatelessWidget {
  final InterestProfileResult profileResult;

  const InterestResultsScreen({
    super.key,
    required this.profileResult,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text('Cognitive Profile Report', style: AppTheme.headingSmall()),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.primaryDark),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Hero Match Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppTheme.primary,
                  borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.primary.withOpacity(0.25),
                      offset: const Offset(0, 4),
                      blurRadius: 12,
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppTheme.accent,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            'PRIMARY ARCHETYPE',
                            style: AppTheme.bodySmall(
                              color: AppTheme.primaryDark,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        Text(
                          '${profileResult.matchScore}% Match',
                          style: AppTheme.headingSmall(color: AppTheme.accent),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      profileResult.primaryArchetype,
                      style: AppTheme.headingLarge(color: Colors.white),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Secondary Fit: ${profileResult.secondaryArchetype}',
                      style: AppTheme.bodySmall(color: Colors.white.withOpacity(0.8)),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      profileResult.guidanceNote,
                      style: AppTheme.bodySmall(color: Colors.white.withOpacity(0.9)),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Recommended Degrees Card
              Container(
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
                      children: const [
                        Icon(Icons.school_outlined, color: AppTheme.primary, size: 20),
                        SizedBox(width: 8),
                        Text(
                          'Top Recommended Degrees',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: profileResult.recommendedDegrees.map((degree) {
                        return BadgeChip(
                          label: degree,
                          variant: BadgeVariant.navy,
                          icon: Icons.check,
                        );
                      }).toList(),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Domain Competencies
              Container(
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
                      children: const [
                        Icon(Icons.insights, color: AppTheme.primary, size: 20),
                        SizedBox(width: 8),
                        Text(
                          'Domain Aptitude Breakdown',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    ...profileResult.breakdown.map((item) {
                      final score = item['score'] as int;
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  item['domain'] as String,
                                  style: AppTheme.bodySmall(color: AppTheme.textPrimary, fontWeight: FontWeight.w600),
                                ),
                                Text(
                                  '$score%',
                                  style: AppTheme.bodySmall(color: AppTheme.primary, fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            ClipRRect(
                              borderRadius: BorderRadius.circular(4),
                              child: LinearProgressIndicator(
                                value: score / 100,
                                backgroundColor: AppTheme.border,
                                valueColor: AlwaysStoppedAnimation<Color>(
                                  score > 85 ? AppTheme.success : AppTheme.accent,
                                ),
                                minHeight: 6,
                              ),
                            ),
                          ],
                        ),
                      );
                    }).toList(),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Recommended Universities
              Container(
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
                      children: const [
                        Icon(Icons.account_balance_outlined, color: AppTheme.primary, size: 20),
                        SizedBox(width: 8),
                        Text(
                          'Top Institutional Targets in Pakistan',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ...profileResult.recommendedUniversities.map((uni) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4),
                        child: Row(
                          children: [
                            const Icon(Icons.star, size: 16, color: AppTheme.accent),
                            const SizedBox(width: 8),
                            Text(uni, style: AppTheme.bodyMedium(fontWeight: FontWeight.w500)),
                          ],
                        ),
                      );
                    }).toList(),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              AppButton(
                text: 'Explore Recommended Programs',
                icon: Icons.search,
                variant: AppButtonVariant.primary,
                onPressed: () {
                  Navigator.pop(context); // Pops back to Discover tab
                },
              ),
              const SizedBox(height: 10),
              AppButton(
                text: 'Retake Assessment',
                variant: AppButtonVariant.outline,
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (context) => const InterestInterviewScreen()),
                  );
                },
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
