import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../data/mock_data.dart';
import '../../widgets/app_button.dart';
import '../../widgets/badge_chip.dart';
import '../../widgets/comparison_bar.dart';
import '../../widgets/marksheet_scanner.dart';
import 'interest_interview_screen.dart';
import 'university_detail_screen.dart';
import 'compare_screen.dart';
import 'shortlist_screen.dart';
import 'rag_chat_screen.dart';

class DiscoverTab extends StatefulWidget {
  final Set<String> shortlistedIds;
  final ValueChanged<String>? onShortlistToggled;

  const DiscoverTab({
    super.key,
    required this.shortlistedIds,
    this.onShortlistToggled,
  });

  @override
  State<DiscoverTab> createState() => _DiscoverTabState();
}

class _DiscoverTabState extends State<DiscoverTab> {
  String _searchQuery = '';
  String _selectedDiscipline = 'All';
  String _selectedCity = 'All Cities';
  final List<University> _selectedForComparison = [];

  final List<String> _disciplines = [
    'All',
    'Computing & AI',
    'Engineering',
    'Business',
    'Sciences',
  ];

  final List<String> _cities = [
    'All Cities',
    'Islamabad',
    'Lahore',
    'Karachi',
    'Topi',
    'Sukkur',
  ];

  List<University> get _filteredUniversities {
    return MockData.universities.where((u) {
      final matchesSearch = _searchQuery.isEmpty ||
          u.name.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          u.shortName.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          u.city.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          u.programs.any((p) => p.name.toLowerCase().contains(_searchQuery.toLowerCase()));

      final matchesCity = _selectedCity == 'All Cities' || u.city.toLowerCase() == _selectedCity.toLowerCase();

      final matchesDiscipline = _selectedDiscipline == 'All' ||
          u.programs.any((p) {
            if (_selectedDiscipline == 'Computing & AI') {
              return p.faculty.toLowerCase().contains('computing') || p.name.toLowerCase().contains('computer') || p.name.toLowerCase().contains('software');
            } else if (_selectedDiscipline == 'Engineering') {
              return p.faculty.toLowerCase().contains('engineering');
            } else if (_selectedDiscipline == 'Business') {
              return p.faculty.toLowerCase().contains('business') || p.faculty.toLowerCase().contains('management');
            } else if (_selectedDiscipline == 'Sciences') {
              return p.faculty.toLowerCase().contains('science') || p.faculty.toLowerCase().contains('natural');
            }
            return true;
          });

      return matchesSearch && matchesCity && matchesDiscipline;
    }).toList();
  }

  void _toggleComparison(University uni) {
    setState(() {
      if (_selectedForComparison.any((u) => u.id == uni.id)) {
        _selectedForComparison.removeWhere((u) => u.id == uni.id);
      } else {
        if (_selectedForComparison.length < 3) {
          _selectedForComparison.add(uni);
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('You can compare up to 3 universities at once')),
          );
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final universities = _filteredUniversities;

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Discover & Match', style: AppTheme.headingSmall()),
            Text('10 Premier Pakistani Universities', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
          ],
        ),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.psychology_outlined, color: AppTheme.primary),
            tooltip: 'AI Prospectus Assistant',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const RagChatScreen()),
              );
            },
          ),
          IconButton(
            icon: Stack(
              children: [
                const Icon(Icons.bookmark_border, color: AppTheme.primary),
                if (widget.shortlistedIds.isNotEmpty)
                  Positioned(
                    right: 0,
                    top: 0,
                    child: Container(
                      padding: const EdgeInsets.all(2),
                      decoration: const BoxDecoration(color: AppTheme.accent, shape: BoxShape.circle),
                      constraints: const BoxConstraints(minWidth: 14, minHeight: 14),
                      child: Text(
                        '${widget.shortlistedIds.length}',
                        style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.primaryDark),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
              ],
            ),
            tooltip: 'Shortlist',
            onPressed: () {
              final shortlisted = MockData.universities
                  .where((u) => widget.shortlistedIds.contains(u.id))
                  .toList();
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ShortlistScreen(
                    shortlistedUniversities: shortlisted,
                    onRemove: widget.onShortlistToggled,
                  ),
                ),
              );
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          ListView(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 100),
            children: [
              // Search Input
              Container(
                decoration: BoxDecoration(
                  color: AppTheme.surface,
                  borderRadius: BorderRadius.circular(AppTheme.radiusInput),
                  border: Border.all(color: AppTheme.border),
                ),
                child: TextField(
                  onChanged: (val) => setState(() => _searchQuery = val),
                  decoration: InputDecoration(
                    hintText: 'Search universities, programs, or cities...',
                    hintStyle: AppTheme.bodySmall(color: AppTheme.textSecondary),
                    prefixIcon: const Icon(Icons.search, color: AppTheme.textSecondary, size: 20),
                    border: InputBorder.none,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                  ),
                ),
              ),
              const SizedBox(height: 12),

              // AI Cognitive Banner
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [AppTheme.primaryDark, AppTheme.primary],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: AppTheme.accent,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Icon(Icons.psychology, color: AppTheme.primaryDark, size: 22),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'AI Academic Fit Interview',
                                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                              ),
                              Text(
                                'Find your ideal undergraduate degree & stream',
                                style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 11),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    Row(
                      children: [
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => const InterestInterviewScreen()),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppTheme.accent,
                              foregroundColor: AppTheme.primaryDark,
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                            ),
                            child: const Text('Start Interview', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: OutlinedButton.icon(
                            onPressed: () => MarksheetScannerSheet.show(context),
                            icon: const Icon(Icons.document_scanner, size: 14, color: Colors.white),
                            label: const Text('Scan Marksheet', style: TextStyle(color: Colors.white, fontSize: 12)),
                            style: OutlinedButton.styleFrom(
                              side: const BorderSide(color: Colors.white38),
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Discipline Filter Chips
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: _disciplines.map((d) {
                    final isSelected = _selectedDiscipline == d;
                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: ChoiceChip(
                        label: Text(d),
                        selected: isSelected,
                        onSelected: (s) {
                          if (s) setState(() => _selectedDiscipline = d);
                        },
                        selectedColor: AppTheme.primary,
                        backgroundColor: AppTheme.surface,
                        labelStyle: TextStyle(
                          color: isSelected ? Colors.white : AppTheme.textPrimary,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                          side: BorderSide(color: isSelected ? AppTheme.primary : AppTheme.border),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 10),

              // City filter dropdown row
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '${universities.length} Institutions Found',
                    style: AppTheme.labelMedium(color: AppTheme.textSecondary),
                  ),
                  DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: _selectedCity,
                      icon: const Icon(Icons.arrow_drop_down, size: 20),
                      style: AppTheme.bodySmall(color: AppTheme.primary, fontWeight: FontWeight.bold),
                      items: _cities.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                      onChanged: (val) {
                        if (val != null) setState(() => _selectedCity = val);
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),

              // University Cards List
              ...universities.map((uni) {
                final isShortlisted = widget.shortlistedIds.contains(uni.id);
                final isCompared = _selectedForComparison.any((u) => u.id == uni.id);

                return Container(
                  margin: const EdgeInsets.only(bottom: 14),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppTheme.surface,
                    borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                    border: Border.all(
                      color: isCompared ? AppTheme.accent : AppTheme.border,
                      width: isCompared ? 1.5 : 1.0,
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
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: AppTheme.primary,
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Text(
                                  uni.shortName,
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 8),
                              BadgeChip(label: uni.city, variant: BadgeVariant.neutral, isSmall: true),
                              const SizedBox(width: 6),
                              BadgeChip(label: uni.type, variant: BadgeVariant.neutral, isSmall: true),
                            ],
                          ),
                          IconButton(
                            icon: Icon(
                              isShortlisted ? Icons.bookmark : Icons.bookmark_border,
                              color: isShortlisted ? AppTheme.accent : AppTheme.textSecondary,
                              size: 22,
                            ),
                            onPressed: () => widget.onShortlistToggled?.call(uni.id),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        uni.name,
                        style: AppTheme.labelLarge(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        uni.hecRanking,
                        style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                      ),
                      const Divider(height: 18),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Semester Fee Range', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                              Text(uni.averageSemesterFeeRange, style: AppTheme.bodySmall(fontWeight: FontWeight.bold)),
                            ],
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text('Entry Test Weight', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                              Text('${uni.entryTestWeight}%', style: AppTheme.bodySmall(color: AppTheme.primary, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(
                            child: AppButton(
                              text: 'Explore Details',
                              variant: AppButtonVariant.primary,
                              height: 38,
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => UniversityDetailScreen(
                                      university: uni,
                                      isInitiallyShortlisted: isShortlisted,
                                      onShortlistToggled: (_) => widget.onShortlistToggled?.call(uni.id),
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
                          const SizedBox(width: 10),
                          InkWell(
                            onTap: () => _toggleComparison(uni),
                            borderRadius: BorderRadius.circular(AppTheme.radiusButton),
                            child: Container(
                              height: 38,
                              padding: const EdgeInsets.symmetric(horizontal: 12),
                              decoration: BoxDecoration(
                                color: isCompared ? AppTheme.accentSubtle : AppTheme.background,
                                borderRadius: BorderRadius.circular(AppTheme.radiusButton),
                                border: Border.all(
                                  color: isCompared ? AppTheme.accentDark : AppTheme.border,
                                ),
                              ),
                              child: Row(
                                children: [
                                  Icon(
                                    isCompared ? Icons.check_box : Icons.check_box_outline_blank,
                                    size: 16,
                                    color: isCompared ? AppTheme.accentDark : AppTheme.textSecondary,
                                  ),
                                  const SizedBox(width: 6),
                                  Text(
                                    'Compare',
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                      color: isCompared ? AppTheme.accentDark : AppTheme.textSecondary,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              }).toList(),
            ],
          ),

          // Floating Comparison Bar
          if (_selectedForComparison.isNotEmpty)
            Positioned(
              bottom: 16,
              left: 16,
              right: 16,
              child: ComparisonBar(
                selectedUniversities: _selectedForComparison,
                onComparePressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => CompareScreen(universities: _selectedForComparison),
                    ),
                  );
                },
                onClearPressed: () => setState(() => _selectedForComparison.clear()),
              ),
            ),
        ],
      ),
    );
  }
}
