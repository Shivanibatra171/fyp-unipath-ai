import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Scale,
  X,
  Plus,
  ArrowLeft,
  Building,
  DollarSign,
  Award,
  CheckCircle2,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { UNIVERSITIES_DATA } from '../data/universitiesData';
import { useShortlist } from '../context/ShortlistContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const UniversityComparePage: React.FC = () => {
  const navigate = useNavigate();
  const { compareUniversityIds, removeFromCompare, addToCompare, clearCompare } = useShortlist();

  const selectedUnis = UNIVERSITIES_DATA.filter((u) =>
    compareUniversityIds.includes(u.id)
  );

  const availableUnis = UNIVERSITIES_DATA.filter(
    (u) => !compareUniversityIds.includes(u.id)
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E4EA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-5 h-5 text-[#C79A3D]" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#17284A]">
              Side-by-Side University Comparison Matrix
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6472]">
            Compare up to 3 Pakistani institutions across tuition fees, aggregate formulas, scholarships, and campus facilities.
          </p>
        </div>

        {selectedUnis.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCompare}
            className="text-[#B5482F] hover:bg-[#FDF2F0]"
          >
            Clear Matrix
          </Button>
        )}
      </div>

      {/* If fewer than 2 universities are selected, show selection helper */}
      {selectedUnis.length < 3 && (
        <div className="bg-white p-4 rounded-[12px] border border-[#DEE6F2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#17284A]">
            <Sparkles className="w-4 h-4 text-[#C79A3D]" />
            <span>
              You have {selectedUnis.length} institution{selectedUnis.length === 1 ? '' : 's'} in the matrix. Add another:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {availableUnis.map((uni) => (
              <button
                key={uni.id}
                onClick={() => addToCompare(uni.id)}
                className="px-2.5 py-1 rounded-[6px] bg-[#F0F4FA] hover:bg-[#DEE6F2] text-[#17284A] text-xs font-semibold flex items-center gap-1 border border-[#DEE6F2] cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{uni.shortName}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedUnis.length === 0 ? (
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-12 text-center space-y-4">
          <Scale className="w-12 h-12 text-[#8E97A6] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#17284A]">
            Your Comparison Matrix is Empty
          </h3>
          <p className="text-xs text-[#5B6472] max-w-md mx-auto">
            Select at least 2 universities from our 10 launch institutions to compare their fees, eligibility, and scholarship programs side-by-side.
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <Button
              variant="accent"
              size="sm"
              onClick={() => {
                addToCompare('nust');
                addToCompare('fast-nuces');
                addToCompare('lums');
              }}
            >
              Load Default Comparison (NUST vs FAST vs LUMS)
            </Button>
          </div>
        </div>
      ) : (
        /* COMPARISON TABLE MATRIX */
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E4EA] bg-[#FAFBFD]">
                <th className="p-4 w-1/4 font-serif font-bold text-[#17284A] uppercase text-[11px] tracking-wider">
                  Comparative Criteria
                </th>
                {selectedUnis.map((uni) => (
                  <th key={uni.id} className="p-4 w-1/4 border-l border-[#E1E4EA] align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-white border border-[#E1E4EA] p-1 overflow-hidden shrink-0">
                          <img
                            src={uni.logo}
                            alt={uni.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-serif text-sm font-bold text-[#17284A] block">
                            {uni.shortName}
                          </span>
                          <span className="text-[10px] text-[#5B6472]">{uni.city}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCompare(uni.id)}
                        className="text-[#8E97A6] hover:text-[#B5482F] p-1"
                        aria-label={`Remove ${uni.shortName}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E4EA]">
              {/* Institution Type & HEC Ranking */}
              <tr>
                <td className="p-4 font-semibold text-[#17284A] bg-[#FAFBFD]/50">
                  Sector & HEC Ranking
                </td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-4 border-l border-[#E1E4EA]">
                    <Badge variant={uni.type === 'Public' ? 'navy' : 'gold'} size="sm">
                      {uni.type}
                    </Badge>
                    <p className="text-xs font-semibold text-[#17284A] mt-1.5">
                      {uni.hecRanking}
                    </p>
                    <p className="text-[10px] text-[#5B6472]">{uni.qsRanking}</p>
                  </td>
                ))}
              </tr>

              {/* Average Semester Fee */}
              <tr>
                <td className="p-4 font-semibold text-[#17284A] bg-[#FAFBFD]/50">
                  Average Semester Tuition Fee
                </td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-4 border-l border-[#E1E4EA]">
                    <span className="font-bold text-[#17284A] text-sm block">
                      {uni.averageSemesterFeeRange.split('/')[0]}
                    </span>
                    <span className="text-[10px] text-[#5B6472]">
                      Tuition + Lab fees per term
                    </span>
                  </td>
                ))}
              </tr>

              {/* Flagship CS Program Fee */}
              <tr>
                <td className="p-4 font-semibold text-[#17284A] bg-[#FAFBFD]/50">
                  BS Computer Science Semester Fee
                </td>
                {selectedUnis.map((uni) => {
                  const csProg = uni.programs.find((p) => p.name.includes('Computer Science'));
                  return (
                    <td key={uni.id} className="p-4 border-l border-[#E1E4EA]">
                      {csProg ? (
                        <div>
                          <span className="font-bold text-[#17284A]">
                            PKR {csProg.semesterFeePKR.toLocaleString()}
                          </span>
                          <p className="text-[10px] text-[#5B6472]">
                            Last Closing: {csProg.lastYearClosingMeritPercent}%
                          </p>
                        </div>
                      ) : (
                        <span className="text-[#8E97A6]">N/A</span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Merit Aggregate Formula */}
              <tr>
                <td className="p-4 font-semibold text-[#17284A] bg-[#FAFBFD]/50">
                  Admission Aggregate Formula
                </td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-4 border-l border-[#E1E4EA] space-y-1">
                    <p className="font-medium text-[#17284A]">
                      {uni.meritFormulaExplanation}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-[#5B6472] pt-1">
                      <span>Test: {uni.aggregateWeights.entryTest}%</span>
                      <span>• FSc: {uni.aggregateWeights.fscHssc}%</span>
                      <span>• Matric: {uni.aggregateWeights.matricSsc}%</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Accepted Entrance Tests */}
              <tr>
                <td className="p-4 font-semibold text-[#17284A] bg-[#FAFBFD]/50">
                  Accepted Entrance Tests
                </td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-4 border-l border-[#E1E4EA]">
                    <div className="flex flex-wrap gap-1">
                      {uni.acceptedTests.map((t) => (
                        <span
                          key={t}
                          className="bg-[#F0F4FA] px-2 py-0.5 rounded text-[10px] font-semibold text-[#17284A]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Scholarships & Financial Aid */}
              <tr>
                <td className="p-4 font-semibold text-[#17284A] bg-[#FAFBFD]/50">
                  Major National Scholarships
                </td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-4 border-l border-[#E1E4EA] space-y-1.5">
                    {uni.scholarships.map((sch) => (
                      <div key={sch.id} className="p-1.5 bg-[#EFF8F3] rounded text-[11px] text-[#2F6B4F]">
                        <strong>{sch.name}: </strong>
                        <span>{sch.coverage}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              {/* Hostels & Residential Life */}
              <tr>
                <td className="p-4 font-semibold text-[#17284A] bg-[#FAFBFD]/50">
                  Hostels & Residential Life
                </td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-4 border-l border-[#E1E4EA]">
                    <p className="text-xs text-[#5B6472]">{uni.hostelDetails}</p>
                  </td>
                ))}
              </tr>

              {/* Actions Row */}
              <tr>
                <td className="p-4 font-semibold text-[#17284A] bg-[#FAFBFD]/50">
                  Action
                </td>
                {selectedUnis.map((uni) => (
                  <td key={uni.id} className="p-4 border-l border-[#E1E4EA]">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/university/${uni.id}`)}
                      className="w-full text-xs"
                    >
                      Full Profile
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
