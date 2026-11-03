import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../widgets/app_button.dart';
import '../../widgets/badge_chip.dart';

class UniversityDetailScreen extends StatefulWidget {
  final University university;
  final bool isInitiallyShortlisted;
  final ValueChanged<bool>? onShortlistToggled;

  const UniversityDetailScreen({
    super.key,
    required this.university,
    this.isInitiallyShortlisted = false,
    this.onShortlistToggled,
  });

  @override
  State<UniversityDetailScreen> createState() => _UniversityDetailScreenState();
}

class _UniversityDetailScreenState extends State<UniversityDetailScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  late bool _isShortlisted;

  // Merit Calculator state
  double _matricPercent = 90.0;
  double _fscPercent = 86.0;
  double _testScorePercent = 78.0;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this);
    _isShortlisted = widget.isInitiallyShortlisted;
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  double get _calculatedAggregate {
    final uni = widget.university;
    final matricWeight = uni.matricWeight / 100.0;
    final fscWeight = uni.fscWeight / 100.0;
    final testWeight = uni.entryTestWeight / 100.0;
    return (_matricPercent * matricWeight) +
        (_fscPercent * fscWeight) +
        (_testScorePercent * testWeight);
  }

  void _toggleShortlist() {
    setState(() {
      _isShortlisted = !_isShortlisted;
    });
    widget.onShortlistToggled?.call(_isShortlisted);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          _isShortlisted
              ? '${widget.university.shortName} added to your shortlist'
              : '${widget.university.shortName} removed from shortlist',
        ),
        backgroundColor: _isShortlisted ? AppTheme.success : AppTheme.primary,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final uni = widget.university;

    return Scaffold(
      backgroundColor: AppTheme.background,
      body: NestedScrollView(
        headerSliverBuilder: (context, innerBoxIsScrolled) {
          return [
            SliverAppBar(
              expandedHeight: 200.0,
              pinned: true,
              backgroundColor: AppTheme.primaryDark,
              leading: IconButton(
                icon: const Icon(Icons.arrow_back, color: Colors.white),
                onPressed: () => Navigator.pop(context),
              ),
              actions: [
                IconButton(
                  icon: Icon(
                    _isShortlisted ? Icons.bookmark : Icons.bookmark_border,
                    color: _isShortlisted ? AppTheme.accent : Colors.white,
                  ),
                  onPressed: _toggleShortlist,
                  tooltip: 'Save to Shortlist',
                ),
                IconButton(
                  icon: const Icon(Icons.share_outlined, color: Colors.white),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Prospectus link copied for ${uni.shortName}')),
                    );
                  },
                ),
              ],
              flexibleSpace: FlexibleSpaceBar(
                background: Container(
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [AppTheme.primaryDark, AppTheme.primary],
                    ),
                  ),
                  padding: const EdgeInsets.fromLTRB(20, 60, 20, 20),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: AppTheme.accent,
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              uni.shortName,
                              style: const TextStyle(
                                color: AppTheme.primaryDark,
                                fontWeight: FontWeight.bold,
                                fontSize: 13,
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          BadgeChip(
                            label: '${uni.type} University',
                            variant: BadgeVariant.neutral,
                            isSmall: true,
                          ),
                          const SizedBox(width: 8),
                          BadgeChip(
                            label: uni.city,
                            variant: BadgeVariant.neutral,
                            isSmall: true,
                            icon: Icons.location_on_outlined,
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        uni.name,
                        style: AppTheme.headingMedium(color: Colors.white),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        uni.tagline,
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.8),
                          fontSize: 12,
                          fontStyle: FontStyle.italic,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ),
              bottom: TabBar(
                controller: _tabController,
                isScrollable: true,
                indicatorColor: AppTheme.accent,
                indicatorWeight: 3,
                labelColor: AppTheme.accent,
                unselectedLabelColor: Colors.white70,
                labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                tabs: const [
                  Tab(text: 'Overview'),
                  Tab(text: 'Programs'),
                  Tab(text: 'Merit Calc'),
                  Tab(text: 'Timeline'),
                  Tab(text: 'Scholarships'),
                ],
              ),
            ),
          ];
        },
        body: TabBarView(
          controller: _tabController,
          children: [
            _buildOverviewTab(uni),
            _buildProgramsTab(uni),
            _buildMeritCalcTab(uni),
            _buildTimelineTab(uni),
            _buildScholarshipsTab(uni),
          ],
        ),
      ),
    );
  }

  // TAB 1: OVERVIEW
  Widget _buildOverviewTab(University uni) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Rankings Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              borderRadius: BorderRadius.circular(AppTheme.radiusCard),
              border: Border.all(color: AppTheme.border),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('HEC Ranking', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                      const SizedBox(height: 4),
                      Text(uni.hecRanking, style: AppTheme.labelMedium(fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
                Container(width: 1, height: 40, color: AppTheme.border),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('QS Ranking', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                      const SizedBox(height: 4),
                      Text(uni.qsRanking, style: AppTheme.labelMedium(fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Overview text
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
                Text('Institutional Profile', style: AppTheme.headingSmall(fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                Text(uni.overview, style: AppTheme.bodyMedium(height: 1.5)),
                const SizedBox(height: 16),
                Text('Recognitions & Accreditations', style: AppTheme.labelMedium(fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: uni.accreditations.map((acc) {
                    return BadgeChip(label: acc, variant: BadgeVariant.navy, isSmall: true);
                  }).toList(),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Campus & Hostel Facilities
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
                    Text('Hostel & Accommodation', style: AppTheme.headingSmall(fontWeight: FontWeight.bold)),
                    BadgeChip(
                      label: uni.hostelAvailable ? 'Available' : 'Day Scholars Only',
                      variant: uni.hostelAvailable ? BadgeVariant.green : BadgeVariant.red,
                      isSmall: true,
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(uni.hostelDetails, style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                const SizedBox(height: 14),
                Text('Campus Infrastructure', style: AppTheme.labelMedium(fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: uni.facilities.map((fac) {
                    return BadgeChip(label: fac, variant: BadgeVariant.neutral, isSmall: true, icon: Icons.check);
                  }).toList(),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Admissions Contact
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
                Text('Official Admissions Office', style: AppTheme.headingSmall(fontWeight: FontWeight.bold)),
                const SizedBox(height: 10),
                Row(
                  children: [
                    const Icon(Icons.phone_outlined, size: 16, color: AppTheme.primary),
                    const SizedBox(width: 8),
                    Text(uni.helplinePhone, style: AppTheme.bodySmall()),
                  ],
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    const Icon(Icons.email_outlined, size: 16, color: AppTheme.primary),
                    const SizedBox(width: 8),
                    Text(uni.helplineEmail, style: AppTheme.bodySmall()),
                  ],
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    const Icon(Icons.location_on_outlined, size: 16, color: AppTheme.primary),
                    const SizedBox(width: 8),
                    Expanded(child: Text(uni.address, style: AppTheme.bodySmall())),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  // TAB 2: PROGRAMS
  Widget _buildProgramsTab(University uni) {
    return ListView.separated(
      padding: const EdgeInsets.all(20),
      itemCount: uni.programs.length,
      separatorBuilder: (context, i) => const SizedBox(height: 14),
      itemBuilder: (context, index) {
        final prog = uni.programs[index];
        return Container(
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
                  Expanded(
                    child: Text(
                      prog.name,
                      style: AppTheme.labelLarge(fontWeight: FontWeight.bold),
                    ),
                  ),
                  BadgeChip(
                    label: '${prog.durationYears} Years',
                    variant: BadgeVariant.neutral,
                    isSmall: true,
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                'Faculty of ${prog.faculty} • ${prog.degreeType}',
                style: AppTheme.bodySmall(color: AppTheme.textSecondary),
              ),
              const Divider(height: 18),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Est. Semester Fee', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                      Text(
                        'PKR ${prog.semesterFeePKR.toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (m) => '${m[1]},')}',
                        style: AppTheme.labelMedium(color: AppTheme.primary, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text('2025 Closing Merit', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                      Text(
                        '${prog.lastYearClosingMeritPercent}%',
                        style: AppTheme.labelMedium(color: AppTheme.accentDark, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Wrap(
                spacing: 6,
                runSpacing: 4,
                children: prog.allowedGroups.map((grp) {
                  return Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: AppTheme.primarySubtle,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      grp,
                      style: const TextStyle(fontSize: 10, color: AppTheme.primary, fontWeight: FontWeight.w600),
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 10),
              Text(
                prog.description,
                style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        );
      },
    );
  }

  // TAB 3: MERIT CALCULATOR
  Widget _buildMeritCalcTab(University uni) {
    final aggregate = _calculatedAggregate;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Formula Explanation Banner
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.primarySubtle,
              borderRadius: BorderRadius.circular(AppTheme.radiusCard),
              border: Border.all(color: AppTheme.primary.withOpacity(0.2)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: const [
                    Icon(Icons.calculate_outlined, color: AppTheme.primary, size: 20),
                    SizedBox(width: 8),
                    Text(
                      'Official Formula Breakdown',
                      style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  uni.meritFormulaExplanation,
                  style: AppTheme.bodySmall(color: AppTheme.primaryDark),
                ),
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildWeightPill('Matric', '${uni.matricWeight}%'),
                    _buildWeightPill('FSc Part-1', '${uni.fscWeight}%'),
                    _buildWeightPill('Entry Test', '${uni.entryTestWeight}%'),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Calculator Sliders
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
                Text('Enter Your Academic Percentages', style: AppTheme.headingSmall(fontWeight: FontWeight.bold)),
                const SizedBox(height: 16),

                // Matric Slider
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Matric / O-Levels:', style: AppTheme.labelMedium()),
                    Text('${_matricPercent.toStringAsFixed(1)}%', style: AppTheme.labelLarge(fontWeight: FontWeight.bold)),
                  ],
                ),
                Slider(
                  value: _matricPercent,
                  min: 50.0,
                  max: 100.0,
                  divisions: 50,
                  activeColor: AppTheme.primary,
                  inactiveColor: AppTheme.border,
                  onChanged: (val) => setState(() => _matricPercent = val),
                ),
                const SizedBox(height: 8),

                // FSc Slider
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('FSc Part-1 / AS-Levels:', style: AppTheme.labelMedium()),
                    Text('${_fscPercent.toStringAsFixed(1)}%', style: AppTheme.labelLarge(fontWeight: FontWeight.bold)),
                  ],
                ),
                Slider(
                  value: _fscPercent,
                  min: 50.0,
                  max: 100.0,
                  divisions: 50,
                  activeColor: AppTheme.primary,
                  inactiveColor: AppTheme.border,
                  onChanged: (val) => setState(() => _fscPercent = val),
                ),
                const SizedBox(height: 8),

                // Test Score Slider
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('${uni.shortName} Entry Test Score:', style: AppTheme.labelMedium()),
                    Text('${_testScorePercent.toStringAsFixed(1)}%', style: AppTheme.labelLarge(color: AppTheme.accentDark, fontWeight: FontWeight.bold)),
                  ],
                ),
                Slider(
                  value: _testScorePercent,
                  min: 30.0,
                  max: 100.0,
                  divisions: 70,
                  activeColor: AppTheme.accent,
                  inactiveColor: AppTheme.border,
                  onChanged: (val) => setState(() => _testScorePercent = val),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Aggregate Result Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.primary,
              borderRadius: BorderRadius.circular(AppTheme.radiusCard),
            ),
            child: Column(
              children: [
                Text(
                  'YOUR PROJECTED AGGREGATE',
                  style: TextStyle(
                    color: AppTheme.accent,
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1.0,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  '${aggregate.toStringAsFixed(2)}%',
                  style: AppTheme.headingLarge(color: Colors.white),
                ),
                const SizedBox(height: 12),
                const Divider(color: Colors.white24),
                const SizedBox(height: 8),
                Text(
                  'Eligibility Status for ${uni.shortName} Programs:',
                  style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 10),
                ...uni.programs.take(3).map((p) {
                  final isEligible = aggregate >= p.lastYearClosingMeritPercent;
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 4),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(p.name, style: const TextStyle(color: Colors.white70, fontSize: 12)),
                        Row(
                          children: [
                            Text(
                              '${p.lastYearClosingMeritPercent}%',
                              style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(width: 6),
                            Icon(
                              isEligible ? Icons.check_circle : Icons.cancel,
                              color: isEligible ? AppTheme.accent : Colors.redAccent,
                              size: 16,
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

  Widget _buildWeightPill(String label, String value) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppTheme.primary.withOpacity(0.2)),
      ),
      child: Column(
        children: [
          Text(value, style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primary)),
          Text(label, style: const TextStyle(fontSize: 10, color: AppTheme.textSecondary)),
        ],
      ),
    );
  }

  // TAB 4: TIMELINE
  Widget _buildTimelineTab(University uni) {
    return ListView.separated(
      padding: const EdgeInsets.all(20),
      itemCount: uni.timeline.length,
      separatorBuilder: (context, i) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final item = uni.timeline[index];
        final isOpen = item.status == 'Open';
        final isClosed = item.status == 'Closed';

        return Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppTheme.surface,
            borderRadius: BorderRadius.circular(AppTheme.radiusCard),
            border: Border.all(color: isOpen ? AppTheme.accent : AppTheme.border),
          ),
          child: Row(
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: isOpen ? AppTheme.accentSubtle : AppTheme.background,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  isOpen ? Icons.event_available : Icons.calendar_today_outlined,
                  color: isOpen ? AppTheme.accentDark : AppTheme.textSecondary,
                  size: 20,
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(item.title, style: AppTheme.labelLarge(fontWeight: FontWeight.bold)),
                    const SizedBox(height: 2),
                    Text(item.date, style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
                  ],
                ),
              ),
              BadgeChip(
                label: item.status,
                variant: isOpen ? BadgeVariant.green : (isClosed ? BadgeVariant.red : BadgeVariant.neutral),
                isSmall: true,
              ),
            ],
          ),
        );
      },
    );
  }

  // TAB 5: SCHOLARSHIPS
  Widget _buildScholarshipsTab(University uni) {
    return ListView.separated(
      padding: const EdgeInsets.all(20),
      itemCount: uni.scholarships.length,
      separatorBuilder: (context, i) => const SizedBox(height: 14),
      itemBuilder: (context, index) {
        final sch = uni.scholarships[index];
        return Container(
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
                  Expanded(
                    child: Text(
                      sch.name,
                      style: AppTheme.labelLarge(fontWeight: FontWeight.bold),
                    ),
                  ),
                  BadgeChip(
                    label: sch.type,
                    variant: BadgeVariant.gold,
                    isSmall: true,
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: AppTheme.successSubtle,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.monetization_on_outlined, size: 18, color: AppTheme.success),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        sch.coverage,
                        style: const TextStyle(color: AppTheme.success, fontWeight: FontWeight.bold, fontSize: 12),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 10),
              Text('Eligibility Criteria:', style: AppTheme.bodySmall(fontWeight: FontWeight.bold)),
              Text(sch.eligibility, style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.alarm, size: 14, color: AppTheme.alert),
                  const SizedBox(width: 4),
                  Text(
                    'Deadline: ${sch.applicationDeadline}',
                    style: AppTheme.bodySmall(color: AppTheme.alert, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}
