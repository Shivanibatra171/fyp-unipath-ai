import React, { useState } from 'react';
import {
  GraduationCap,
  MessageSquareText,
  Sparkles,
  SlidersHorizontal,
  Search,
  Building,
  Scale
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UNIVERSITIES_DATA } from '../data/universitiesData';
import { Program, IntermediateGroup } from '../types';
import { ProfileFilterForm } from '../components/match/ProfileFilterForm';
import { MarksheetUploader } from '../components/match/MarksheetUploader';
import { ProgramCard } from '../components/match/ProgramCard';
import { RAGChatbotModal } from '../components/match/RAGChatbotModal';
import { CompareBar } from '../components/match/CompareBar';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ProgramFinderPage: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [fscMarks, setFscMarks] = useState<number>(user.fsc1Marks);
  const [fscTotal] = useState<number>(user.fsc1Total);
  const [matricMarks, setMatricMarks] = useState<number>(user.matricMarks);
  const [matricTotal] = useState<number>(user.matricTotal);
  const [expectedTestScore, setExpectedTestScore] = useState<number>(user.expectedTestScore || 155);
  const [selectedGroup, setSelectedGroup] = useState<IntermediateGroup>(user.intermediateGroup);
  const [selectedCity, setSelectedCity] = useState<string>('All Locations');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(user.maxBudgetPerSemester || 200000);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'fit' | 'fee_low' | 'merit_high'>('fit');
  const [showRAGChat, setShowRAGChat] = useState(false);

  // Flatten all programs across 10 universities
  const allProgramsWithUni = UNIVERSITIES_DATA.flatMap((uni) =>
    uni.programs.map((prog) => ({
      program: prog,
      university: uni
    }))
  );

  // Calculate dynamic fit & filter
  const matchedItems = allProgramsWithUni
    .map(({ program, university }) => {
      // Basic eligibility check
      const groupAllowed =
        program.eligibilityCriteria.allowedGroups.includes(selectedGroup) ||
        program.eligibilityCriteria.allowedGroups.some((g) => selectedGroup.includes(g.split(' ')[0]));

      const withinBudget = program.semesterFeePKR <= maxBudget;
      const cityMatches =
        selectedCity === 'All Locations' ||
        university.city.toLowerCase().includes(selectedCity.toLowerCase());

      const categoryMatches =
        selectedCategory === 'all' ||
        program.faculty.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        program.name.toLowerCase().includes(selectedCategory.toLowerCase());

      const queryMatches =
        searchQuery === '' ||
        program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.shortName.toLowerCase().includes(searchQuery.toLowerCase());

      if (!groupAllowed || !withinBudget || !cityMatches || !categoryMatches || !queryMatches) {
        return null;
      }

      // --- Real aggregate formula calculation ---
      const fscPct = (fscMarks / fscTotal) * 100;
      const matricPct = (matricMarks / matricTotal) * 100;
      const testPct = (expectedTestScore / 200) * 100; // normalize to %
      const { entryTest, fscHssc, matricSsc } = university.aggregateWeights;
      const computedAggregate = (testPct * entryTest / 100) + (fscPct * fscHssc / 100) + (matricPct * matricSsc / 100);
      const closingMerit = program.lastYearClosingMeritPercent;
      const gap = computedAggregate - closingMerit;

      // Fit score based on aggregate gap
      let fit: number;
      let riskLabel: string;
      if (gap >= 5) {
        fit = Math.min(98, 90 + Math.round(gap * 0.5));
        riskLabel = '✅ Safe';
      } else if (gap >= 0) {
        fit = Math.min(90, 80 + Math.round(gap * 2));
        riskLabel = '⚡ Competitive';
      } else if (gap >= -5) {
        fit = Math.max(60, 75 + Math.round(gap * 2));
        riskLabel = '⚠️ Risky';
      } else {
        fit = Math.max(40, 65 + Math.round(gap));
        riskLabel = '❌ Below Merit';
      }

      const rationale = `Your computed aggregate is ${computedAggregate.toFixed(1)}% (${entryTest}% NET + ${fscHssc}% FSc + ${matricSsc}% Matric). Last year's closing merit at ${university.shortName} ${program.name} was ${closingMerit}%. Status: ${riskLabel}`;

      return {
        program,
        university,
        matchPercentage: fit,
        fitRationale: rationale,
        riskLabel,
        computedAggregate: computedAggregate.toFixed(1)
      };
    })
    .filter(Boolean) as {
    program: Program;
    university: (typeof UNIVERSITIES_DATA)[0];
    matchPercentage: number;
    fitRationale: string;
    riskLabel: string;
    computedAggregate: string;
  }[];

  // Sorting
  const sortedItems = [...matchedItems].sort((a, b) => {
    if (sortBy === 'fit') return b.matchPercentage - a.matchPercentage;
    if (sortBy === 'fee_low') return a.program.semesterFeePKR - b.program.semesterFeePKR;
    return b.program.lastYearClosingMeritPercent - a.program.lastYearClosingMeritPercent;
  });

  const handleApplyExtractedMarks = (extractedFsc: number, extractedMatric: number) => {
    setFscMarks(extractedFsc);
    setMatricMarks(extractedMatric);
    updateProfile({ fsc1Marks: extractedFsc, matricMarks: extractedMatric });
  };

  const handleResetFilters = () => {
    setFscMarks(user.fsc1Marks);
    setMatricMarks(user.matricMarks);
    setExpectedTestScore(user.expectedTestScore || 155);
    setSelectedGroup(user.intermediateGroup);
    setSelectedCity('All Locations');
    setSelectedCategory('all');
    setMaxBudget(300000);
    setSearchQuery('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E1E4EA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-5 h-5 text-[#C79A3D]" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#17284A]">
              Module 2: Discover Programs & Universities
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6472]">
            Filter 45+ accredited undergraduate degrees across Pakistan by Intermediate score, budget, and location.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="accent"
            size="md"
            onClick={() => setShowRAGChat(true)}
            leftIcon={<MessageSquareText className="w-4 h-4" />}
            className="shadow-xs font-bold"
          >
            Chat with UniPath AI
          </Button>
        </div>
      </div>

      {/* Marksheet OCR Uploader Simulation */}
      <MarksheetUploader onApplyExtractedMarks={handleApplyExtractedMarks} />

      {/* Filter Form Card */}
      <ProfileFilterForm
        fscMarks={fscMarks}
        fscTotal={fscTotal}
        matricMarks={matricMarks}
        matricTotal={matricTotal}
        selectedGroup={selectedGroup}
        selectedCity={selectedCity}
        selectedCategory={selectedCategory}
        maxBudget={maxBudget}
        onFscChange={setFscMarks}
        onMatricChange={setMatricMarks}
        onGroupChange={setSelectedGroup}
        onCityChange={setSelectedCity}
        onCategoryChange={setSelectedCategory}
        onBudgetChange={setMaxBudget}
        onReset={handleResetFilters}
      />

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-[12px] border border-[#E1E4EA] shadow-xs">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-[#17284A] text-sm">
            Matched Opportunities:
          </span>
          <Badge variant="navy" size="md">
            {sortedItems.length} Programs Found
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Keyword Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8E97A6] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search major (e.g. CS, EE, BBA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#FAFBFD] border border-[#CAD0DC] rounded-[8px] pl-9 pr-3 py-1.5 text-xs text-[#1B1F27] focus:outline-none focus:ring-2 focus:ring-[#17284A]"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5B6472] shrink-0 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#CAD0DC] rounded-[8px] px-2.5 py-1.5 text-xs text-[#17284A] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="fit">Highest Match Fit %</option>
              <option value="fee_low">Lowest Semester Fee</option>
              <option value="merit_high">Highest Closing Merit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      {sortedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map(({ program, university, matchPercentage, fitRationale }) => (
            <ProgramCard
              key={program.id}
              program={program}
              university={university}
              matchPercentage={matchPercentage}
              fitRationale={fitRationale}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-12 text-center space-y-4">
          <Building className="w-10 h-10 text-[#8E97A6] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#17284A]">
            No Programs Matched Your Current Filters
          </h3>
          <p className="text-xs text-[#5B6472] max-w-md mx-auto">
            Try adjusting your budget slider (e.g. increase above PKR 200,000) or resetting your location filter to view more opportunities.
          </p>
          <Button variant="outline" size="sm" onClick={handleResetFilters}>
            Reset All Filters
          </Button>
        </div>
      )}

      {/* Floating Comparison Tray */}
      <CompareBar />

      {/* Chat with UniPath AI RAG Modal */}
      <RAGChatbotModal isOpen={showRAGChat} onClose={() => setShowRAGChat(false)} />
    </div>
  );
};
