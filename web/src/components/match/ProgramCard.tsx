import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Scale,
  ArrowRight,
  Award,
  CheckCircle2,
  DollarSign,
  Building,
  GraduationCap,
  Info
} from 'lucide-react';
import { Program, University } from '../../types';
import { useShortlist } from '../../context/ShortlistContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProgramCardProps {
  program: Program;
  university: University;
  matchPercentage: number;
  fitRationale: string;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  university,
  matchPercentage,
  fitRationale
}) => {
  const navigate = useNavigate();
  const {
    isShortlisted,
    toggleShortlist,
    isInCompare,
    toggleCompare,
    addToCompare
  } = useShortlist();

  const shortlisted = isShortlisted(university.id);
  const inCompare = isInCompare(university.id);

  return (
    <div className="bg-white rounded-[12px] border border-[#E1E4EA] hover:border-[#CAD0DC] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Card Header with University Name & Fit Percentage */}
        <div className="p-5 border-b border-[#E1E4EA] bg-[#FAFBFD] flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[8px] bg-[#17284A] flex items-center justify-center shrink-0 shadow-xs">
              <span className="text-white text-[10px] font-bold leading-none text-center px-1">
                {university.shortName.slice(0, 4)}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#C79A3D] uppercase tracking-wider block">
                {university.shortName} • {university.city}
              </span>
              <h4 className="font-serif text-base font-bold text-[#17284A] leading-snug">
                {program.name}
              </h4>
            </div>
          </div>

          {/* Match Score Badge */}
          <div className="bg-[#EFF8F3] border border-[#BCE1CE] px-2.5 py-1 rounded-[8px] text-center shrink-0">
            <span className="text-[10px] text-[#2F6B4F] font-bold uppercase block">
              Fit Score
            </span>
            <span className="text-sm font-bold text-[#2F6B4F]">
              {matchPercentage}%
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3.5">
          {/* Fit Rationale Callout */}
          <div className="bg-[#FDF7EC] border border-[#E9CCA0] p-2.5 rounded-[8px] flex items-start gap-2 text-xs text-[#8C661D]">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#C79A3D]" />
            <p className="font-medium leading-relaxed">
              <strong className="text-[#17284A]">Fit Rationale: </strong>
              {fitRationale}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-1">
            <div className="bg-[#F5F6F9] p-2.5 rounded-[8px] border border-[#E1E4EA]">
              <span className="text-[10px] text-[#8E97A6] uppercase font-bold block">
                Estimated Fee
              </span>
              <span className="font-bold text-[#17284A]">
                PKR {program.semesterFeePKR.toLocaleString()} / sem
              </span>
            </div>

            <div className="bg-[#F5F6F9] p-2.5 rounded-[8px] border border-[#E1E4EA]">
              <span className="text-[10px] text-[#8E97A6] uppercase font-bold block">
                Required Test
              </span>
              <span className="font-bold text-[#17284A] truncate block">
                {program.eligibilityCriteria.requiredTest}
              </span>
            </div>

            <div className="bg-[#F5F6F9] p-2.5 rounded-[8px] border border-[#E1E4EA] col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#8E97A6] uppercase font-bold block">
                Last Year Closing
              </span>
              <span className="font-bold text-[#17284A]">
                {program.lastYearClosingMeritPercent}% Aggregate
              </span>
            </div>
          </div>

          {/* Description Snippet */}
          <p className="text-xs text-[#5B6472] line-clamp-2 leading-relaxed">
            {program.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <Badge variant="navy" size="sm">
              {program.faculty.split('(')[0].trim()}
            </Badge>
            {program.scholarshipAvailable && (
              <Badge variant="green" size="sm">
                Scholarships Open
              </Badge>
            )}
            <Badge variant="gray" size="sm">
              {program.seats} Total Seats
            </Badge>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-[#FAFBFD] border-t border-[#E1E4EA] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => toggleShortlist(university.id)}
            className={`p-2 rounded-[8px] text-xs font-medium transition-colors cursor-pointer border ${
              shortlisted
                ? 'bg-[#17284A] text-white border-[#17284A]'
                : 'bg-white text-[#5B6472] border-[#E1E4EA] hover:bg-[#F5F6F9] hover:text-[#17284A]'
            }`}
            title={shortlisted ? 'Saved in Shortlist' : 'Add to Shortlist'}
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleCompare(university.id)}
            className={`p-2 rounded-[8px] text-xs font-medium transition-colors cursor-pointer border ${
              inCompare
                ? 'bg-[#C79A3D] text-[#17284A] border-[#C79A3D]'
                : 'bg-white text-[#5B6472] border-[#E1E4EA] hover:bg-[#F5F6F9] hover:text-[#17284A]'
            }`}
            title={inCompare ? 'In Compare Matrix' : 'Compare University'}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate(`/university/${university.id}`)}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="text-xs font-semibold"
        >
          University Prospectus
        </Button>
      </div>
    </div>
  );
};
