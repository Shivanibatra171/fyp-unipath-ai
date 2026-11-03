import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ShortlistProvider } from './context/ShortlistContext';
import { ProgressProvider } from './context/ProgressContext';
import { AppLayout } from './components/layout/AppLayout';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { DiscoverInterestPage } from './pages/DiscoverInterestPage';
import { ProgramFinderPage } from './pages/ProgramFinderPage';
import { UniversityDetailPage } from './pages/UniversityDetailPage';
import { UniversityComparePage } from './pages/UniversityComparePage';
import { ShortlistPage } from './pages/ShortlistPage';
import { ApplicationGuidancePage } from './pages/ApplicationGuidancePage';
import { TestPrepPage } from './pages/TestPrepPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShortlistProvider>
          <ProgressProvider>
            <Routes>
              <Route element={<AppLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />

                {/* Dashboard & 4 Guidance Modules */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/discover" element={<DiscoverInterestPage />} />
                <Route path="/match" element={<ProgramFinderPage />} />
                <Route path="/university/:id" element={<UniversityDetailPage />} />
                <Route path="/compare" element={<UniversityComparePage />} />
                <Route path="/shortlist" element={<ShortlistPage />} />
                <Route path="/guidance" element={<ApplicationGuidancePage />} />
                <Route path="/test-prep" element={<TestPrepPage />} />
                <Route path="/profile" element={<ProfileSettingsPage />} />

                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </ProgressProvider>
        </ShortlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
