import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../widgets/badge_chip.dart';

class CompareScreen extends StatelessWidget {
  final List<University> universities;

  const CompareScreen({
    super.key,
    required this.universities,
  });

  @override
  Widget build(BuildContext context) {
    if (universities.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('Compare Universities')),
        body: const Center(child: Text('No universities selected for comparison')),
      );
    }

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text('University Comparison', style: AppTheme.headingSmall()),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.primaryDark),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Comparing ${universities.length} Institutions',
                style: AppTheme.headingSmall(color: AppTheme.primaryDark, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),

              // University Headers Cards (horizontal scroll)
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: universities.map((u) {
                    return Container(
                      width: 170,
                      margin: const EdgeInsets.only(right: 12),
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: AppTheme.surface,
                        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                        border: Border.all(color: AppTheme.accent.withOpacity(0.5), width: 1.5),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          BadgeChip(label: u.shortName, variant: BadgeVariant.navy, isSmall: true),
                          const SizedBox(height: 8),
                          Text(
                            u.name,
                            style: AppTheme.labelMedium(fontWeight: FontWeight.bold),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 4),
                          Text(
                            u.city,
                            style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 20),

              // Comparison Attributes Table
              _buildComparisonSection(
                title: 'Rankings & Classification',
                icon: Icons.star_border,
                rows: [
                  _MetricRow(
                    label: 'Institution Type',
                    values: universities.map((u) => u.type).toList(),
                  ),
                  _MetricRow(
                    label: 'HEC Ranking',
                    values: universities.map((u) => u.hecRanking).toList(),
                  ),
                  _MetricRow(
                    label: 'QS Global Rank',
                    values: universities.map((u) => u.qsRanking).toList(),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              _buildComparisonSection(
                title: 'Financials & Accommodation',
                icon: Icons.account_balance_wallet_outlined,
                rows: [
                  _MetricRow(
                    label: 'Semester Fee',
                    values: universities.map((u) => u.averageSemesterFeeRange).toList(),
                  ),
                  _MetricRow(
                    label: 'Hostel Facility',
                    values: universities.map((u) => u.hostelAvailable ? 'Yes (On-Campus)' : 'No (Off-Campus)').toList(),
                  ),
                  _MetricRow(
                    label: 'Need-Based Aid',
                    values: universities.map((u) => u.scholarships.isNotEmpty ? 'Available' : 'Limited').toList(),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              _buildComparisonSection(
                title: 'Admissions & Weightage',
                icon: Icons.tune,
                rows: [
                  _MetricRow(
                    label: 'Entry Test Weight',
                    values: universities.map((u) => '${u.entryTestWeight}%').toList(),
                  ),
                  _MetricRow(
                    label: 'FSc Part-1 Weight',
                    values: universities.map((u) => '${u.fscWeight}%').toList(),
                  ),
                  _MetricRow(
                    label: 'Matric Weight',
                    values: universities.map((u) => '${u.matricWeight}%').toList(),
                  ),
                  _MetricRow(
                    label: 'Accepted Test',
                    values: universities.map((u) => u.acceptedTests.first).toList(),
                  ),
                ],
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildComparisonSection({
    required String title,
    required IconData icon,
    required List<_MetricRow> rows,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        border: Border.all(color: AppTheme.border),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 18, color: AppTheme.primary),
              const SizedBox(width: 8),
              Text(
                title,
                style: AppTheme.labelLarge(color: AppTheme.primary, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          const SizedBox(height: 12),
          ...rows.map((r) => _buildRowWidget(r)),
        ],
      ),
    );
  }

  Widget _buildRowWidget(_MetricRow row) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            row.label,
            style: AppTheme.bodySmall(color: AppTheme.textSecondary, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 6),
          Row(
            children: row.values.map((v) {
              return Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppTheme.background,
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      v,
                      style: AppTheme.bodySmall(color: AppTheme.textPrimary, fontWeight: FontWeight.w500),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}

class _MetricRow {
  final String label;
  final List<String> values;
  const _MetricRow({required this.label, required this.values});
}
