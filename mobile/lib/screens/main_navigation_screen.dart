import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';
import '../data/mock_data.dart';
import 'home/home_tab.dart';
import 'discover/discover_tab.dart';
import 'applications/applications_tab.dart';
import 'test_prep/test_prep_tab.dart';
import 'profile/profile_tab.dart';

class MainNavigationScreen extends StatefulWidget {
  final int initialTabIndex;

  const MainNavigationScreen({
    super.key,
    this.initialTabIndex = 0,
  });

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  late int _currentIndex;
  final Set<String> _shortlistedIds = {'nust', 'fast-nuces', 'lums'};
  late UserProfile _currentProfile;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialTabIndex;
    _currentProfile = MockData.defaultProfile;
  }

  void _switchTab(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  void _toggleShortlist(String id) {
    setState(() {
      if (_shortlistedIds.contains(id)) {
        _shortlistedIds.remove(id);
      } else {
        _shortlistedIds.add(id);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final screens = [
      HomeTab(
        profile: _currentProfile,
        shortlistedIds: _shortlistedIds,
        onNavigateToTab: _switchTab,
      ),
      DiscoverTab(
        shortlistedIds: _shortlistedIds,
        onShortlistToggled: _toggleShortlist,
      ),
      ApplicationsTab(
        shortlistedIds: _shortlistedIds,
      ),
      const TestPrepTab(),
      ProfileTab(
        profile: _currentProfile,
        onProfileUpdated: (p) => setState(() => _currentProfile = p),
      ),
    ];

    return Scaffold(
      backgroundColor: AppTheme.background,
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: _switchTab,
        backgroundColor: AppTheme.surface,
        indicatorColor: AppTheme.primarySubtle,
        elevation: 3,
        height: 64,
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home, color: AppTheme.primary),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.explore_outlined),
            selectedIcon: Icon(Icons.explore, color: AppTheme.primary),
            label: 'Discover',
          ),
          NavigationDestination(
            icon: Icon(Icons.assignment_outlined),
            selectedIcon: Icon(Icons.assignment, color: AppTheme.primary),
            label: 'Applications',
          ),
          NavigationDestination(
            icon: Icon(Icons.school_outlined),
            selectedIcon: Icon(Icons.school, color: AppTheme.primary),
            label: 'Test Prep',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person, color: AppTheme.primary),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
