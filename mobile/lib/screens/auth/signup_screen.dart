import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_text_field.dart';
import '../main_navigation_screen.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController(text: 'Ahmed Khan');
  final _emailController = TextEditingController(text: 'ahmed.khan@unipath.pk');
  final _phoneController = TextEditingController(text: '+92 300 1234567');
  final _cityController = TextEditingController(text: 'Islamabad');
  final _marksController = TextEditingController(text: '475');
  final _passwordController = TextEditingController(text: 'PakStudent2026!');

  String _selectedBoard = 'Federal Board (FBISE)';
  String _selectedGroup = 'FSc Pre-Engineering';
  bool _isLoading = false;

  final List<String> _boards = [
    'Federal Board (FBISE)',
    'BISE Lahore',
    'BISE Karachi',
    'BISE Rawalpindi',
    'BISE Peshawar',
    'BISE Faisalabad',
    'BISE Multan',
    'Aga Khan Board (AKU-EB)',
    'Cambridge / Edexcel A-Levels',
  ];

  final List<String> _groups = [
    'FSc Pre-Engineering',
    'FSc Pre-Medical',
    'ICS (Computer Science)',
    'I.Com (Commerce)',
    'General Science',
    'FA (Humanities)',
    'A-Levels (Science / Math)',
  ];

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _cityController.dispose();
    _marksController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleSignUp() {
    if (_formKey.currentState?.validate() ?? false) {
      setState(() => _isLoading = true);
      Future.delayed(const Duration(milliseconds: 700), () {
        if (mounted) {
          setState(() => _isLoading = false);
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => const MainNavigationScreen()),
            (route) => false,
          );
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text('Student Registration', style: AppTheme.headingSmall()),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.primaryDark),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppTheme.primarySubtle,
                    borderRadius: BorderRadius.circular(AppTheme.radiusCard),
                    border: Border.all(color: AppTheme.primary.withOpacity(0.1)),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.verified_user_outlined, color: AppTheme.primary, size: 22),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          'Your academic stream determines eligibility and merit calculations for top Pakistani universities.',
                          style: AppTheme.bodySmall(color: AppTheme.primary),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // Name
                AppTextField(
                  label: 'Full Name',
                  hint: 'e.g. Fatima Tariq',
                  controller: _nameController,
                  prefixIcon: Icons.person_outline,
                  validator: (v) => v == null || v.isEmpty ? 'Please enter your name' : null,
                ),
                const SizedBox(height: 14),

                // Email
                AppTextField(
                  label: 'Email Address',
                  hint: 'student@example.pk',
                  controller: _emailController,
                  prefixIcon: Icons.email_outlined,
                  keyboardType: TextInputType.emailAddress,
                  validator: (v) => v == null || !v.contains('@') ? 'Valid email required' : null,
                ),
                const SizedBox(height: 14),

                // Phone & City Row
                Row(
                  children: [
                    Expanded(
                      flex: 3,
                      child: AppTextField(
                        label: 'Mobile (+92)',
                        hint: '0300 1234567',
                        controller: _phoneController,
                        prefixIcon: Icons.phone_outlined,
                        keyboardType: TextInputType.phone,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      flex: 2,
                      child: AppTextField(
                        label: 'Domicile / City',
                        hint: 'e.g. Lahore',
                        controller: _cityController,
                        prefixIcon: Icons.location_city_outlined,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),

                // Board Selection Dropdown
                Text(
                  'Intermediate Board / System',
                  style: AppTheme.labelMedium(fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  decoration: BoxDecoration(
                    color: AppTheme.surface,
                    border: Border.all(color: AppTheme.border),
                    borderRadius: BorderRadius.circular(AppTheme.radiusInput),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: _selectedBoard,
                      isExpanded: true,
                      items: _boards.map((b) {
                        return DropdownMenuItem<String>(
                          value: b,
                          child: Text(b, style: AppTheme.bodyMedium()),
                        );
                      }).toList(),
                      onChanged: (val) {
                        if (val != null) setState(() => _selectedBoard = val);
                      },
                    ),
                  ),
                ),
                const SizedBox(height: 14),

                // Group Selection Dropdown
                Text(
                  'Intermediate Study Group',
                  style: AppTheme.labelMedium(fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  decoration: BoxDecoration(
                    color: AppTheme.surface,
                    border: Border.all(color: AppTheme.border),
                    borderRadius: BorderRadius.circular(AppTheme.radiusInput),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: _selectedGroup,
                      isExpanded: true,
                      items: _groups.map((g) {
                        return DropdownMenuItem<String>(
                          value: g,
                          child: Text(g, style: AppTheme.bodyMedium()),
                        );
                      }).toList(),
                      onChanged: (val) {
                        if (val != null) setState(() => _selectedGroup = val);
                      },
                    ),
                  ),
                ),
                const SizedBox(height: 14),

                // Part-1 Marks
                AppTextField(
                  label: 'FSc / ICS Part-1 Marks (out of 520)',
                  hint: 'e.g. 475',
                  controller: _marksController,
                  prefixIcon: Icons.grade_outlined,
                  keyboardType: TextInputType.number,
                  helperText: 'Used for provisional merit aggregate calculations',
                ),
                const SizedBox(height: 14),

                // Password
                AppTextField(
                  label: 'Create Password',
                  hint: 'Min 6 characters',
                  controller: _passwordController,
                  prefixIcon: Icons.lock_outline,
                  obscureText: true,
                  validator: (v) => v == null || v.length < 6 ? 'Min 6 characters' : null,
                ),
                const SizedBox(height: 24),

                AppButton(
                  text: 'Create Academic Account',
                  icon: Icons.check_circle_outline,
                  variant: AppButtonVariant.primary,
                  isLoading: _isLoading,
                  onPressed: _handleSignUp,
                ),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
