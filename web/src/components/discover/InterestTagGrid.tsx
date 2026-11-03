import React, { useState } from 'react';
import {
  Cpu,
  Cog,
  TrendingUp,
  HeartPulse,
  Atom,
  Scale,
  CheckCircle2,
  Sparkles,
  Plus,
  Check
} from 'lucide-react';
import { INTEREST_CATEGORIES } from '../../data/interestData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface InterestTagGridProps {
  onContinueToChat: (selectedCategoryIds: string[]) => void;
}

export const InterestTagGrid: React.FC<InterestTagGridProps> = ({ onContinueToChat }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'tech-computing',
    'natural-sciences'
  ]);
  const [selectedSubFields, setSelectedSubFields] = useState<string[]>([
    'Machine Learning',
    'Full-Stack Web',
    'Quantum Mechanics'
  ]);

  const categoryIcons: Record<string, React.ReactNode> = {
    'tech-computing': <Cpu className="w-5 h-5 text-[#17284A]" />,
    'engineering-applied': <Cog className="w-5 h-5 text-[#17284A]" />,
    'business-finance': <TrendingUp className="w-5 h-5 text-[#C79A3D]" />,
    'healthcare-bio': <HeartPulse className="w-5 h-5 text-[#2F6B4F]" />,
    'natural-sciences': <Atom className="w-5 h-5 text-[#17284A]" />,
    'law-social': <Scale className="w-5 h-5 text-[#B5482F]" />
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSubField = (field: string) => {
    setSelectedSubFields((prev) =>
      prev.includes(field) ? prev.filter((item) => item !== field) : [...prev, field]
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Instruction Banner */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#F0F4FA] text-[#17284A] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C79A3D]" />
              <span>Step 1: Broad Domain Orientation</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#17284A]">
              Select Fields of Academic Curiosity
            </h3>
            <p className="text-xs text-[#5B6472] mt-1 max-w-2xl">
              Tap the areas you enjoy studying or exploring. You can select multiple disciplines to analyze interdisciplinary degrees (e.g. Data Science + Economics or Bio-Informatics).
            </p>
          </div>

          <div className="bg-[#FAFBFD] border border-[#DEE6F2] px-4 py-3 rounded-[8px] flex items-center gap-3 shrink-0">
            <div>
              <span className="text-[10px] text-[#8E97A6] font-bold uppercase block">
                Selected Disciplines
              </span>
              <span className="text-base font-bold text-[#17284A]">
                {selectedCategories.length} Categories
              </span>
            </div>
            <Button
              variant="accent"
              size="sm"
              disabled={selectedCategories.length === 0}
              onClick={() => onContinueToChat(selectedCategories)}
            >
              Begin AI Interview
            </Button>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INTEREST_CATEGORIES.map((cat) => {
          const isSelected = selectedCategories.includes(cat.id);

          return (
            <div
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`rounded-[12px] border transition-all duration-200 cursor-pointer overflow-hidden p-5 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#17284A] ring-2 ring-[#17284A]/10 shadow-md'
                  : 'bg-white border-[#E1E4EA] hover:border-[#CAD0DC] hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-[8px] flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#F0F4FA]' : 'bg-[#F5F6F9]'
                      }`}
                    >
                      {categoryIcons[cat.id]}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#17284A]">
                        {cat.title}
                      </h4>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs transition-colors shrink-0 ${
                      isSelected
                        ? 'bg-[#17284A] border-[#17284A] text-white'
                        : 'border-[#CAD0DC] bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                </div>

                <p className="text-xs text-[#5B6472] leading-relaxed mb-4">
                  {cat.description}
                </p>

                {/* Subfield Tags */}
                <div className="space-y-2 pt-3 border-t border-[#E1E4EA]">
                  <span className="text-[10px] uppercase font-bold text-[#8E97A6] tracking-wider block">
                    Specialized Topics
                  </span>
                  <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {cat.subFields.map((field) => {
                      const isFieldActive = selectedSubFields.includes(field);
                      return (
                        <button
                          key={field}
                          onClick={() => toggleSubField(field)}
                          className={`text-[11px] px-2.5 py-1 rounded-[6px] font-medium transition-colors cursor-pointer border ${
                            isFieldActive
                              ? 'bg-[#17284A] text-white border-[#17284A]'
                              : 'bg-[#F5F6F9] text-[#5B6472] border-[#E1E4EA] hover:bg-[#DEE6F2] hover:text-[#17284A]'
                          }`}
                        >
                          {field}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sample degrees footer */}
              <div className="mt-4 pt-3 border-t border-[#E1E4EA]/60 text-[11px] text-[#5B6472]">
                <span className="font-semibold text-[#17284A]">Sample Degrees: </span>
                <span>{cat.sampleDegrees.slice(0, 3).join(', ')}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Continue Action */}
      <div className="flex items-center justify-center pt-4">
        <Button
          variant="primary"
          size="lg"
          disabled={selectedCategories.length === 0}
          onClick={() => onContinueToChat(selectedCategories)}
          className="shadow-md"
        >
          Proceed to AI Conversational Interview ({selectedCategories.length} selected)
        </Button>
      </div>
    </div>
  );
};
