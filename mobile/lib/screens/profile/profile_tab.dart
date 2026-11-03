import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../data/mock_data.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_text_field.dart';
import '../../widgets/badge_chip.dart';
import '../../widgets/marksheet_scanner.dart';
import '../auth/login_screen.dart';

class ProfileTab extends StatefulWidget {
  final UserProfile profile;
  final ValueChanged<UserProfile>? onProfileUpdated;

  const ProfileTab({
    super.key,
    required this.profile,
    this.onProfileUpdated,
  });

  @override
  State<ProfileTab> createState() => _ProfileTabState();
}

class _ProfileTabState extends State<ProfileTab> {
  late UserProfile _profile;
  bool _deadlineNotifs = true;
  bool _prepNotifs = true;
  bool _scholarshipNotifs = true;

  @override
  void initState() {
    super.initState();
    _profile = widget.profile;
  }

  void _openEditProfileDialog() {
    final nameCtrl = TextEditingController(text: _profile.name);
    final cityCtrl = TextEditingController(text: _profile.city);
    final matricCtrl = TextEditingController(text: _profile.matricMarks.toString());
    final fscCtrl = TextEditingController(text: _profile.fsc1Marks.toString());
    final budgetCtrl = TextEditingController(text: _profile.maxBudgetPerSemester.toString());

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        padding: EdgeInsets.only(
          left: 20,
          right: 20,
          top: 20,
          bottom: MediaQuery.of(context).viewInsets.bottom + 24,
        ),
        decoration: const BoxDecoration(
          color: AppTheme.surface,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: AppTheme.border,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Text('Edit Academic Profile', style: AppTheme.headingSmall(fontWeight: FontWeight.bold)),
              const SizedBox(height: 16),

              AppTextField(label: 'Full Name', controller: nameCtrl, prefixIcon: Icons.person_outline),
              const SizedBox(height: 12),

              AppTextField(label: 'City / Domicile', controller: cityCtrl, prefixIcon: Icons.location_city_outlined),
              const SizedBox(height: 12),

              Row(
                children: [
                  Expanded(
                    child: AppTextField(
                      label: 'Matric Marks (/1100)',
                      controller: matricCtrl,
                      keyboardType: TextInputType.number,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: AppTextField(
                      label: 'FSc Part-1 (/550)',
                      controller: fscCtrl,
                      keyboardType: TextInputType.number,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              AppTextField(
                label: 'Max Budget / Semester (PKR)',
                controller: budgetCtrl,
                keyboardType: TextInputType.number,
                prefixIcon: Icons.account_balance_wallet_outlined,
              ),
              const SizedBox(height: 20),

              AppButton(
                text: 'Save Academic Profile',
                icon: Icons.check,
                onPressed: () {
                  setState(() {
                    _profile.name = nameCtrl.text.trim();
                    _profile.city = cityCtrl.text.trim();
                    _profile.matricMarks = int.tryParse(matricCtrl.text) ?? _profile.matricMarks;
                    _profile.fsc1Marks = int.tryParse(fscCtrl.text) ?? _profile.fsc1Marks;
                    _profile.maxBudgetPerSemester = int.tryParse(budgetCtrl.text) ?? _profile.maxBudgetPerSemester;
                  });
                  widget.onProfileUpdated?.call(_profile);
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Academic profile updated successfully!'),
                      backgroundColor: AppTheme.success,
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _confirmLogout() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppTheme.radiusCard)),
        title: Text('Sign Out?', style: AppTheme.headingSmall()),
        content: Text(
          'Are you sure you want to log out of UniPath AI?',
          style: AppTheme.bodySmall(color: AppTheme.textSecondary),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel', style: AppTheme.labelMedium()),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(builder: (context) => const LoginScreen()),
                (route) => false,
              );
            },
            style: ElevatedButton.styleFrom(backgroundColor: AppTheme.alert, foregroundColor: Colors.white),
            child: const Text('Log Out'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final matricPct = ((_profile.matricMarks / _profile.matricTotal) * 100).toStringAsFixed(1);
    final fscPct = ((_profile.fsc1Marks / _profile.fsc1Total) * 100).toStringAsFixed(1);

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text('Student Profile', style: AppTheme.headingSmall()),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.edit_outlined, color: AppTheme.primary),
            tooltip: 'Edit Profile',
            onPressed: _openEditProfileDialog,
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Student Avatar & Overview Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              borderRadius: BorderRadius.circular(AppTheme.radiusCard),
              border: Border.all(color: AppTheme.border),
            ),
            child: Row(
              children: [
                Container(
                  width: 60,
                  height: 60,
                  decoration: BoxDecoration(
                    color: AppTheme.primary,
                    shape: BoxShape.circle,
                    border: Border.all(color: AppTheme.accent, width: 2),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    _profile.name.isNotEmpty ? _profile.name[0].toUpperCase() : 'S',
                    style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _profile.name,
                        style: AppTheme.headingSmall(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        _profile.email,
                        style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                      ),
                      const SizedBox(height: 6),
                      BadgeChip(
                        label: '${_profile.intermediateGroup} • ${_profile.city}',
                        variant: BadgeVariant.navy,
                        isSmall: true,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Academic Profile Details
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
                    Text('Verified Academic Metrics', style: AppTheme.labelLarge(fontWeight: FontWeight.bold)),
                    InkWell(
                      onTap: () => MarksheetScannerSheet.show(
                        context,
                        onMarksExtracted: (obtained, total, board) {
                          setState(() {
                            _profile.fsc1Marks = obtained;
                            _profile.fsc1Total = total;
                            _profile.intermediateBoard = board;
                          });
                          widget.onProfileUpdated?.call(_profile);
                        },
                      ),
                      child: Row(
                        children: const [
                          Icon(Icons.document_scanner, size: 14, color: AppTheme.accentDark),
                          SizedBox(width: 4),
                          Text(
                            'Scan Marksheet',
                            style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.accentDark),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const Divider(height: 20),
                _buildInfoRow('Board:', _profile.intermediateBoard),
                _buildInfoRow('Group:', _profile.intermediateGroup),
                _buildInfoRow('Matric Score:', '${_profile.matricMarks}/${_profile.matricTotal} ($matricPct%)'),
                _buildInfoRow('FSc Part-1 Score:', '${_profile.fsc1Marks}/${_profile.fsc1Total} ($fscPct%)'),
                _buildInfoRow('Target Major:', _profile.targetMajor),
                _buildInfoRow(
                  'Budget / Semester:',
                  'PKR ${_profile.maxBudgetPerSemester.toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (m) => '${m[1]},')}',
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Notification Preferences
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
                Text('Notification Preferences', style: AppTheme.labelLarge(fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Admission Deadlines & Registration', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                  subtitle: const Text('Alerts 7 days and 24 hours prior to university close dates', style: TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
                  value: _deadlineNotifs,
                  activeColor: AppTheme.accent,
                  onChanged: (val) => setState(() => _deadlineNotifs = val),
                ),
                const Divider(height: 1),
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Entry Test Prep Drills & Reminders', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                  subtitle: const Text('Daily question-of-the-day and 4-week timetable slot pings', style: TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
                  value: _prepNotifs,
                  activeColor: AppTheme.accent,
                  onChanged: (val) => setState(() => _prepNotifs = val),
                ),
                const Divider(height: 1),
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Need-Based Scholarship Notices', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                  subtitle: const Text('Alerts when LUMS NOP, HEC Ehsaas, or NUST financial aid windows open', style: TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
                  value: _scholarshipNotifs,
                  activeColor: AppTheme.accent,
                  onChanged: (val) => setState(() => _scholarshipNotifs = val),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // App Info
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
                    Icon(Icons.info_outline, size: 18, color: AppTheme.primary),
                    SizedBox(width: 8),
                    Text('About UniPath AI', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  'UniPath AI v1.0.0 — Final Year Project (FYP) academic guidance and test preparation platform for Pakistani students.',
                  style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Log Out Button
          AppButton(
            text: 'Sign Out of Account',
            icon: Icons.logout,
            variant: AppButtonVariant.outline,
            onPressed: _confirmLogout,
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: AppTheme.bodySmall(color: AppTheme.textSecondary, fontWeight: FontWeight.w500)),
          Text(value, style: AppTheme.bodySmall(color: AppTheme.textPrimary, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}
