import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';

class ComparisonBar extends StatelessWidget {
  final List<University> selectedUniversities;
  final VoidCallback onComparePressed;
  final VoidCallback onClearPressed;

  const ComparisonBar({
    super.key,
    required this.selectedUniversities,
    required this.onComparePressed,
    required this.onClearPressed,
  });

  @override
  Widget build(BuildContext context) {
    if (selectedUniversities.isEmpty) {
      return const SizedBox.shrink();
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: AppTheme.primaryDark,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.25),
            offset: const Offset(0, 4),
            blurRadius: 16,
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppTheme.accent,
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.compare_arrows, color: AppTheme.primaryDark, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  '${selectedUniversities.length} Universities Selected',
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                  ),
                ),
                Text(
                  selectedUniversities.map((u) => u.shortName).join(', '),
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.8),
                    fontSize: 11,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.close, color: Colors.white70, size: 18),
            onPressed: onClearPressed,
            tooltip: 'Clear selection',
          ),
          const SizedBox(width: 4),
          ElevatedButton(
            onPressed: selectedUniversities.length >= 2 ? onComparePressed : null,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.accent,
              foregroundColor: AppTheme.primaryDark,
              disabledBackgroundColor: Colors.white24,
              disabledForegroundColor: Colors.white38,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(AppTheme.radiusButton),
              ),
              elevation: 0,
            ),
            child: Text(
              selectedUniversities.length < 2 ? 'Select 2+' : 'Compare',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
            ),
          ),
        ],
      ),
    );
  }
}
