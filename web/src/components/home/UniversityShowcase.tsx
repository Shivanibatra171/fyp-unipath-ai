import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Award,
  BookOpen,
  ArrowRight,
  Bookmark,
  Check,
  Scale,
  Sparkles
} from 'lucide-react';
import { UNIVERSITIES_DATA } from '../../data/universitiesData';
import { useShortlist } from '../../context/ShortlistContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const UniversityShowcase: React.FC = () => {
  const navigate = useNavigate();
  const { isShortlisted, toggleShortlist, isInCompare, toggleCompare } = useShortlist();
  const [filterCity, setFilterCity] = useState<string>('all');

  const cities = ['all', 'Islamabad', 'Lahore', 'Karachi', 'Topi, Swabi', 'Sukkur'];

  const filteredUnis =
    filterCity === 'all'
      ? UNIVERSITIES_DATA
      : UNIVERSITIES_DATA.filter((u) => u.city.toLowerCase().includes(filterCity.toLowerCase()));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#17284A]" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#17284A]">
                Launch Catalog
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17284A]">
              10 Premier Pakistani Universities
            </h2>
            <p className="text-sm text-[#5B6472] mt-2 max-w-2xl">
              Explore verified programs, merit aggregate weightages, tuition structures, and national scholarships for Pakistan’s top-tier institutions.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setFilterCity(city)}
                className={`text-xs px-3 py-1.5 rounded-[8px] font-medium transition-colors cursor-pointer shrink-0 ${
                  filterCity === city
                    ? 'bg-[#17284A] text-white shadow-xs'
                    : 'bg-[#F5F6F9] text-[#5B6472] hover:bg-[#DEE6F2] hover:text-[#17284A]'
                }`}
              >
                {city === 'all' ? 'All Locations' : city}
              </button>
            ))}
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnis.map((uni) => {
            const shortlisted = isShortlisted(uni.id);
            const inCompare = isInCompare(uni.id);

            return (
              <div
                key={uni.id}
                className="bg-white rounded-[12px] border border-[#E1E4EA] hover:border-[#CAD0DC] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Banner / Badges */}
                  <div className="p-5 border-b border-[#E1E4EA] bg-[#FAFBFD] flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-[8px] bg-white border border-[#E1E4EA] p-1 flex items-center justify-center shadow-xs overflow-hidden">
                        <img
                          src={uni.logo}
                          alt={uni.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#C79A3D] tracking-wide">
                          {uni.shortName}
                        </span>
                        <h3 className="font-serif text-base font-bold text-[#17284A] leading-snug line-clamp-1">
                          {uni.name}
                        </h3>
                        <p className="text-[11px] text-[#5B6472] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#8E97A6]" />
                          <span>{uni.city}</span>
                        </p>
                      </div>
                    </div>

                    <Badge variant={uni.type === 'Public' ? 'navy' : 'gold'} size="sm">
                      {uni.type}
                    </Badge>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3.5">
                    {/* HEC Ranking / Tagline */}
                    <div className="bg-[#F5F6F9] p-2.5 rounded-[8px] border border-[#E1E4EA] flex items-center gap-2 text-xs">
                      <Award className="w-4 h-4 text-[#C79A3D] shrink-0" />
                      <span className="text-[#17284A] font-medium line-clamp-1">
                        {uni.hecRanking}
                      </span>
                    </div>

                    <p className="text-xs text-[#5B6472] line-clamp-2 leading-relaxed">
                      {uni.overview}
                    </p>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E1E4EA]">
                      <div>
                        <span className="text-[10px] text-[#8E97A6] uppercase font-bold block">
                          Avg. Semester Fee
                        </span>
                        <span className="font-semibold text-[#17284A]">
                          {uni.averageSemesterFeeRange.split('/')[0]}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8E97A6] uppercase font-bold block">
                          Accepted Test
                        </span>
                        <span className="font-semibold text-[#17284A] truncate block">
                          {uni.acceptedTests[0]}
                        </span>
                      </div>
                    </div>

                    {/* Aggregate Formula Pill */}
                    <div className="text-[11px] text-[#5B6472] bg-[#F0F4FA] p-2 rounded-[6px]">
                      <span className="font-semibold text-[#17284A]">Merit: </span>
                      <span>{uni.meritFormulaExplanation}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-[#FAFBFD] border-t border-[#E1E4EA] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleShortlist(uni.id)}
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
                      onClick={() => toggleCompare(uni.id)}
                      className={`p-2 rounded-[8px] text-xs font-medium transition-colors cursor-pointer border ${
                        inCompare
                          ? 'bg-[#C79A3D] text-[#17284A] border-[#C79A3D]'
                          : 'bg-white text-[#5B6472] border-[#E1E4EA] hover:bg-[#F5F6F9] hover:text-[#17284A]'
                      }`}
                      title={inCompare ? 'In Comparison Tray' : 'Compare University'}
                    >
                      <Scale className="w-4 h-4" />
                    </button>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/university/${uni.id}`)}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    className="text-xs font-semibold"
                  >
                    View Details & Programs
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All & Compare CTA */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/match')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore All 45+ Programs & Filter by Aggregate
          </Button>
        </div>
      </div>
    </section>
  );
};
