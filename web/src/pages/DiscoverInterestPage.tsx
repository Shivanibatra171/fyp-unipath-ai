import React, { useState } from 'react';
import { Compass, ArrowLeft } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { InterestProfileResult } from '../types';
import { InterestTagGrid } from '../components/discover/InterestTagGrid';
import { InteractiveInterview } from '../components/discover/InteractiveInterview';
import { InterestProfileCard } from '../components/discover/InterestProfileCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const DiscoverInterestPage: React.FC = () => {
  const { interestProfile, saveInterestProfile } = useProgress();

  // Mode: 'tags' | 'interview' | 'results'
  const [viewMode, setViewMode] = useState<'tags' | 'interview' | 'results'>(
    interestProfile ? 'results' : 'tags'
  );

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([
    'tech-computing',
    'natural-sciences'
  ]);

  const handleCategoriesChosen = (ids: string[]) => {
    setSelectedCategoryIds(ids);
    setViewMode('interview');
  };

  const handleInterviewComplete = (profile: InterestProfileResult) => {
    saveInterestProfile(profile);
    setViewMode('results');
  };

  const handleRetake = () => {
    setViewMode('tags');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E4EA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-5 h-5 text-[#17284A]" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#17284A]">
              Module 1: Discover Your Academic Interest
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6472]">
            Identify your cognitive problem-solving archetype and discover which undergraduate degrees align with your strengths.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === 'interview' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('tags')}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Back to Categories
            </Button>
          )}
          <Badge variant="navy" size="md">
            Stage 1 of 4
          </Badge>
        </div>
      </div>

      {/* Screen Mode Render */}
      {viewMode === 'tags' && (
        <InterestTagGrid onContinueToChat={handleCategoriesChosen} />
      )}

      {viewMode === 'interview' && (
        <InteractiveInterview
          selectedCategories={selectedCategoryIds}
          onComplete={handleInterviewComplete}
          onBack={() => setViewMode('tags')}
        />
      )}

      {viewMode === 'results' && interestProfile && (
        <InterestProfileCard profile={interestProfile} onRetake={handleRetake} />
      )}
    </div>
  );
};
