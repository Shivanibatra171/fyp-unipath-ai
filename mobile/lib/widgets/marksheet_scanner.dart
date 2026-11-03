import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'app_button.dart';

class MarksheetScannerSheet extends StatefulWidget {
  final Function(int obtained, int total, String board)? onMarksExtracted;

  const MarksheetScannerSheet({
    super.key,
    this.onMarksExtracted,
  });

  static Future<void> show(
    BuildContext context, {
    Function(int obtained, int total, String board)? onMarksExtracted,
  }) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => MarksheetScannerSheet(onMarksExtracted: onMarksExtracted),
    );
  }

  @override
  State<MarksheetScannerSheet> createState() => _MarksheetScannerSheetState();
}

class _MarksheetScannerSheetState extends State<MarksheetScannerSheet> {
  String _selectedBoard = 'Federal Board (FBISE)';
  bool _isScanning = false;
  bool _scanComplete = false;

  final List<String> _boards = [
    'Federal Board (FBISE)',
    'BISE Lahore',
    'BISE Karachi',
    'BISE Rawalpindi',
    'BISE Peshawar',
    'Aga Khan Board (AKU-EB)',
  ];

  final Map<String, int> _extractedSubjects = {
    'Mathematics': 92,
    'Physics': 89,
    'Computer Science': 94,
    'English Compulsory': 84,
    'Urdu / Pak Studies': 86,
  };

  int get _obtainedMarks => _extractedSubjects.values.fold(0, (sum, val) => sum + val);
  final int _totalMarks = 500;

  void _triggerScan() {
    setState(() {
      _isScanning = true;
      _scanComplete = false;
    });

    Future.delayed(const Duration(milliseconds: 1400), () {
      if (mounted) {
        setState(() {
          _isScanning = false;
          _scanComplete = true;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
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
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: AppTheme.accentSubtle,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.document_scanner_outlined, color: AppTheme.accentDark),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'AI Marksheet Scanner',
                        style: AppTheme.headingSmall(fontWeight: FontWeight.bold),
                      ),
                      Text(
                        'Extract verified intermediate marks via simulated OCR',
                        style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              'Select Intermediate Board',
              style: AppTheme.labelMedium(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 6),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              decoration: BoxDecoration(
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
            const SizedBox(height: 16),

            if (!_scanComplete) ...[
              Container(
                height: 160,
                decoration: BoxDecoration(
                  color: AppTheme.primarySubtle.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: _isScanning ? AppTheme.accent : AppTheme.border,
                    style: BorderStyle.solid,
                    width: _isScanning ? 2 : 1,
                  ),
                ),
                child: Center(
                  child: _isScanning
                      ? Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const CircularProgressIndicator(color: AppTheme.accentDark),
                            const SizedBox(height: 16),
                            Text(
                              'Analyzing Pakistani Board Watermarks & Grades...',
                              style: AppTheme.bodySmall(
                                color: AppTheme.primary,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        )
                      : Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.cloud_upload_outlined, size: 40, color: AppTheme.primary),
                            const SizedBox(height: 8),
                            Text(
                              'Sample BISE Marksheet Ready',
                              style: AppTheme.labelLarge(color: AppTheme.primary),
                            ),
                            Text(
                              'PDF / JPEG / Camera Scan format',
                              style: AppTheme.bodySmall(color: AppTheme.textSecondary),
                            ),
                          ],
                        ),
                ),
              ),
              const SizedBox(height: 16),
              AppButton(
                text: _isScanning ? 'Processing Document...' : 'Scan Sample Marksheet',
                icon: Icons.camera_alt_outlined,
                isLoading: _isScanning,
                onPressed: _isScanning ? null : _triggerScan,
              ),
            ] else ...[
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: AppTheme.successSubtle,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppTheme.success.withOpacity(0.3)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: const [
                            Icon(Icons.check_circle, color: AppTheme.success, size: 18),
                            SizedBox(width: 6),
                            Text(
                              'Verified OCR Output',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: AppTheme.success,
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ),
                        Text(
                          '${((_obtainedMarks / _totalMarks) * 100).toStringAsFixed(1)}%',
                          style: AppTheme.headingSmall(color: AppTheme.success),
                        ),
                      ],
                    ),
                    const Divider(height: 16),
                    ..._extractedSubjects.entries.map((e) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 3),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(e.key, style: AppTheme.bodySmall(color: AppTheme.textPrimary)),
                            Text('${e.value}/100', style: AppTheme.bodySmall(fontWeight: FontWeight.bold)),
                          ],
                        ),
                      );
                    }).toList(),
                    const Divider(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Aggregate Total:', style: AppTheme.labelMedium(fontWeight: FontWeight.bold)),
                        Text('$_obtainedMarks / $_totalMarks', style: AppTheme.labelLarge(color: AppTheme.primary, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              AppButton(
                text: 'Apply Marks to Profile',
                icon: Icons.check,
                variant: AppButtonVariant.accent,
                onPressed: () {
                  if (widget.onMarksExtracted != null) {
                    widget.onMarksExtracted!(_obtainedMarks, _totalMarks, _selectedBoard);
                  }
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Marks applied to admission profile: $_obtainedMarks/$_totalMarks'),
                      backgroundColor: AppTheme.success,
                    ),
                  );
                },
              ),
              const SizedBox(height: 8),
              AppButton(
                text: 'Scan Another File',
                variant: AppButtonVariant.textOnly,
                onPressed: () => setState(() => _scanComplete = false),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
