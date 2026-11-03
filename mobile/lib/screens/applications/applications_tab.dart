import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../data/mock_data.dart';
import '../../widgets/badge_chip.dart';
import 'guidance_detail_screen.dart';

class DocumentItem {
  final String id;
  final String title;
  final String requirement;
  final String authority;
  bool isChecked;

  DocumentItem({
    required this.id,
    required this.title,
    required this.requirement,
    required this.authority,
    this.isChecked = false,
  });
}

class ApplicationsTab extends StatefulWidget {
  final Set<String> shortlistedIds;

  const ApplicationsTab({
    super.key,
    required this.shortlistedIds,
  });

  @override
  State<ApplicationsTab> createState() => _ApplicationsTabState();
}

class _ApplicationsTabState extends State<ApplicationsTab> {
  late List<DocumentItem> _documentChecklist;

  @override
  void initState() {
    super.initState();
    _documentChecklist = [
      DocumentItem(
        id: 'doc-bform',
        title: 'NADRA Smart National ID Card / B-Form',
        requirement: 'Attested photocopy + Original required at entry test center',
        authority: 'NADRA Pakistan',
        isChecked: true,
      ),
      DocumentItem(
        id: 'doc-matric',
        title: 'Matric / SSC Sanad & Marksheet',
        requirement: 'Verified marksheet issued by respective BISE / IBCC Attested copy',
        authority: 'BISE / IBCC',
        isChecked: true,
      ),
      DocumentItem(
        id: 'doc-fsc1',
        title: 'Intermediate / HSSC Part-1 Result Card',
        requirement: 'Original computer-generated verified marksheet or roll number slip',
        authority: 'BISE Boards',
        isChecked: true,
      ),
      DocumentItem(
        id: 'doc-domicile',
        title: 'Domicile Certificate & PRC',
        requirement: 'Required for quota seats & provincial admissions (e.g. UET, Sukkur IBA)',
        authority: 'District Magistrate Office',
        isChecked: false,
      ),
      DocumentItem(
        id: 'doc-photos',
        title: '4x Passport-Sized Photographs',
        requirement: 'Sky-blue background, attested on reverse side',
        authority: 'Studio / School Attested',
        isChecked: true,
      ),
      DocumentItem(
        id: 'doc-income',
        title: 'Guardian Income Certificate / FBR Returns',
        requirement: 'Salary slip, pension book, or latest FBR Active Taxpayer return',
        authority: 'Employer / FBR IRIS',
        isChecked: false,
      ),
      DocumentItem(
        id: 'doc-affidavit',
        title: 'Non-Political Activity Affidavit',
        requirement: 'PKR 100 Stamp Paper attested by Oath Commissioner',
        authority: 'Oath Commissioner / Notary',
        isChecked: false,
      ),
    ];
  }

  int get _readyDocsCount => _documentChecklist.where((d) => d.isChecked).length;

  @override
  Widget build(BuildContext context) {
    final activeUnis = MockData.universities.where((u) {
      if (widget.shortlistedIds.isNotEmpty) {
        return widget.shortlistedIds.contains(u.id);
      }
      return u.id == 'nust' || u.id == 'fast-nuces' || u.id == 'lums';
    }).toList();

    final docsProgress = _readyDocsCount / _documentChecklist.length;

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Application Guidance', style: AppTheme.headingSmall()),
            Text('Document Vault & Timelines', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
          ],
        ),
        backgroundColor: AppTheme.surface,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Monitored Applications Roadmaps Section
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'My Monitored Applications',
                style: AppTheme.headingSmall(fontWeight: FontWeight.bold),
              ),
              BadgeChip(
                label: '${activeUnis.length} Active',
                variant: BadgeVariant.navy,
                isSmall: true,
              ),
            ],
          ),
          const SizedBox(height: 12),

          ...activeUnis.map((uni) {
            return Container(
              margin: const EdgeInsets.only(bottom: 12),
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
                              color: AppTheme.primary,
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              uni.shortName,
                              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(uni.name, style: AppTheme.labelMedium(fontWeight: FontWeight.bold)),
                        ],
                      ),
                      BadgeChip(
                        label: 'In Progress',
                        variant: BadgeVariant.gold,
                        isSmall: true,
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Next Deadline: Registration Closes for Session 2026',
                    style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => GuidanceDetailScreen(university: uni),
                              ),
                            );
                          },
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: AppTheme.primary),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                            padding: const EdgeInsets.symmetric(vertical: 8),
                          ),
                          child: const Text('View Step-by-Step Guidance', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.primary)),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            );
          }).toList(),
          const SizedBox(height: 20),

          // Pakistani Document Vault Card
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
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: const [
                        Icon(Icons.folder_shared_outlined, color: AppTheme.primary, size: 20),
                        SizedBox(width: 8),
                        Text(
                          'Pakistani Document Vault',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                        ),
                      ],
                    ),
                    Text(
                      '$_readyDocsCount of ${_documentChecklist.length} Ready',
                      style: AppTheme.bodySmall(
                        color: docsProgress == 1.0 ? AppTheme.success : AppTheme.accentDark,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'Crucial paperwork demanded by HEC and admission testing committees across Pakistan.',
                  style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                ),
                const SizedBox(height: 12),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: docsProgress,
                    backgroundColor: AppTheme.border,
                    valueColor: AlwaysStoppedAnimation<Color>(
                      docsProgress == 1.0 ? AppTheme.success : AppTheme.accent,
                    ),
                    minHeight: 6,
                  ),
                ),
                const Divider(height: 24),

                ..._documentChecklist.map((doc) {
                  return InkWell(
                    onTap: () {
                      setState(() {
                        doc.isChecked = !doc.isChecked;
                      });
                    },
                    borderRadius: BorderRadius.circular(8),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 6),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Icon(
                            doc.isChecked ? Icons.check_box : Icons.check_box_outline_blank,
                            size: 20,
                            color: doc.isChecked ? AppTheme.success : AppTheme.textSecondary,
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  doc.title,
                                  style: AppTheme.labelMedium(
                                    fontWeight: FontWeight.w600,
                                    color: doc.isChecked ? AppTheme.textPrimary : AppTheme.textSecondary,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  doc.requirement,
                                  style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                                ),
                              ],
                            ),
                          ),
                          BadgeChip(
                            label: doc.authority,
                            variant: BadgeVariant.neutral,
                            isSmall: true,
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Official Admissions Helpline Directory
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
                    Icon(Icons.headset_mic_outlined, color: AppTheme.primary, size: 20),
                    SizedBox(width: 8),
                    Text(
                      'Official University Helplines',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  'Direct admissions office contact numbers and email help desks.',
                  style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                ),
                const SizedBox(height: 14),

                ...MockData.universities.take(5).map((uni) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 6),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(uni.shortName, style: AppTheme.labelMedium(fontWeight: FontWeight.bold)),
                            Text(uni.helplinePhone, style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                          ],
                        ),
                        Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.phone, size: 18, color: AppTheme.primary),
                              onPressed: () {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(content: Text('Calling ${uni.shortName}: ${uni.helplinePhone}')),
                                );
                              },
                            ),
                            IconButton(
                              icon: const Icon(Icons.email_outlined, size: 18, color: AppTheme.primary),
                              onPressed: () {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(content: Text('Composing email to: ${uni.helplineEmail}')),
                                );
                              },
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                }).toList(),
              ],
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }
}
