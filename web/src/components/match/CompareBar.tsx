import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';
import { useShortlist } from '../../context/ShortlistContext';
import { UNIVERSITIES_DATA } from '../../data/universitiesData';
import { Button } from '../ui/Button';

export const CompareBar: React.FC = () => {
  const navigate = useNavigate();
  const { compareUniversityIds, removeFromCompare, clearCompare } = useShortlist();

  if (compareUniversityIds.length === 0) return null;

  const compareUniversities = UNIVERSITIES_DATA.filter((u) =>
    compareUniversityIds.includes(u.id)
  );

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl bg-[#17284A] text-white rounded-[12px] p-3.5 shadow-2xl border border-[#C79A3D]/40 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="w-8 h-8 rounded-[8px] bg-[#C79A3D] text-[#17284A] flex items-center justify-center shrink-0">
          <Scale className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">
            Comparison Tray ({compareUniversityIds.length}/3)
          </span>
          <span className="text-[11px] text-[#CAD8EC]">
            Side-by-side fees, merit formulas & scholarships
          </span>
        </div>
      </div>

      {/* University Thumbnails */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-full">
        {compareUniversities.map((uni) => (
          <div
            key={uni.id}
            className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-[6px] text-xs text-white border border-white/15"
          >
            <span className="font-semibold">{uni.shortName}</span>
            <button
              onClick={() => removeFromCompare(uni.id)}
              className="text-white/60 hover:text-white p-0.5"
              aria-label={`Remove ${uni.shortName}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={clearCompare}
          className="text-xs text-[#DEE6F2] hover:text-white underline p-1 cursor-pointer"
        >
          Clear
        </button>
        <Button
          variant="accent"
          size="sm"
          onClick={() => navigate('/compare')}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Compare Now
        </Button>
      </div>
    </div>
  );
};
