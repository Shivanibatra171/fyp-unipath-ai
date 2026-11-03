import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Info,
  Building,
  GraduationCap,
  Download,
  Share2
} from 'lucide-react';
import { InterestProfileResult } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

interface InterestProfileCardProps {
  profile: InterestProfileResult;
  onRetake: () => void;
}

export const InterestProfileCard: React.FC<InterestProfileCardProps> = ({
  profile,
  onRetake
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-[#17284A] via-[#1A3059] to-[#0E1B33] text-white rounded-[12px] p-6 sm:p-8 shadow-md relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#C79A3D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E9CCA0] border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#C79A3D]" />
              <span>Official Cognitive Orientation Report</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {profile.primaryArchetype}
            </h2>

            <p className="text-xs sm:text-sm text-[#CAD8EC] max-w-xl leading-relaxed">
              Your responses indicate a dominant orientation toward algorithmic reasoning, computational modeling, and complex systems architecture.
            </p>
          </div>

          {/* Match Score Badge Box */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 p-5 rounded-[12px] text-center shrink-0 min-w-[150px]">
            <span className="text-[11px] uppercase font-bold text-[#E9CCA0] tracking-wider block">
              Confidence Fit
            </span>
            <span className="font-serif text-4xl font-bold text-white block mt-1">
              {profile.matchScore}%
            </span>
            <span className="text-[10px] text-[#CAD8EC] mt-1 block">
              High Stream Cohesion
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Breakdown & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Detailed Breakdown & Strengths */}
        <div className="lg:col-span-2 space-y-6">
          {/* Domain Breakdown Bars */}
          <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[#17284A]">
                Disciplinary Alignment Breakdown
              </h3>
              <Badge variant="navy" size="sm">
                Multi-Factor Analysis
              </Badge>
            </div>

            <div className="space-y-4">
              {profile.breakdown.map((item) => (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#17284A]">
                      {item.category}
                    </span>
                    <span className="font-bold text-[#17284A]">
                      {item.percentage}%
                    </span>
                  </div>
                  <ProgressBar
                    value={item.percentage}
                    variant={item.percentage > 70 ? 'navy' : 'gold'}
                    size="md"
                  />
                  <p className="text-[11px] text-[#5B6472]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Strengths */}
          <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs">
            <h3 className="font-serif text-base font-bold text-[#17284A] mb-4">
              Identified Core Strengths
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.strengths.map((str) => (
                <div
                  key={str}
                  className="flex items-start gap-2.5 p-3 rounded-[8px] bg-[#F5F6F9] border border-[#E1E4EA]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[#1B1F27]">{str}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Recommended Degrees & Next Action */}
        <div className="space-y-6">
          {/* Recommended Undergraduate Degrees */}
          <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#17284A]">
              <GraduationCap className="w-5 h-5 text-[#C79A3D]" />
              <h3 className="font-serif text-base font-bold">
                Top Matched Degrees
              </h3>
            </div>

            <ul className="space-y-2">
              {profile.recommendedDegrees.map((deg) => (
                <li
                  key={deg}
                  className="p-3 rounded-[8px] bg-[#F0F4FA] text-xs font-semibold text-[#17284A] border border-[#DEE6F2] flex items-center justify-between"
                >
                  <span>{deg}</span>
                  <Badge variant="green" size="sm">
                    95% Fit
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Pakistani Institutions */}
          <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#17284A]">
              <Building className="w-5 h-5 text-[#17284A]" />
              <h3 className="font-serif text-base font-bold">
                Target Institutions
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.recommendedUniversities.map((uni) => (
                <span
                  key={uni}
                  className="px-3 py-1.5 rounded-[8px] bg-[#FDF7EC] text-[#8C661D] border border-[#E9CCA0] text-xs font-bold"
                >
                  {uni}
                </span>
              ))}
            </div>
          </div>

          {/* Guidance Disclaimer Box */}
          <div className="p-4 bg-[#F5F6F9] border border-[#E1E4EA] rounded-[8px] flex items-start gap-2.5 text-xs text-[#5B6472] leading-relaxed">
            <Info className="w-4 h-4 text-[#17284A] shrink-0 mt-0.5" />
            <p className="text-[11px]">{profile.guidanceNote}</p>
          </div>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button
          variant="outline"
          size="md"
          onClick={onRetake}
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Retake Assessment
        </Button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="accent"
            size="md"
            onClick={() => navigate('/match')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto font-semibold"
          >
            Continue to Module 2: Match Programs & Universities
          </Button>
        </div>
      </div>
    </div>
  );
};
