import React from 'react';
import { SlidersHorizontal, MapPin, DollarSign, Award, BookOpen } from 'lucide-react';
import { IntermediateGroup, IntermediateBoard } from '../../types';
import { Input, Select } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface ProfileFilterFormProps {
  fscMarks: number;
  fscTotal: number;
  matricMarks: number;
  matricTotal: number;
  selectedGroup: IntermediateGroup;
  selectedCity: string;
  selectedCategory: string;
  maxBudget: number;
  onFscChange: (marks: number) => void;
  onMatricChange: (marks: number) => void;
  onGroupChange: (group: IntermediateGroup) => void;
  onCityChange: (city: string) => void;
  onCategoryChange: (category: string) => void;
  onBudgetChange: (budget: number) => void;
  onReset: () => void;
}

export const ProfileFilterForm: React.FC<ProfileFilterFormProps> = ({
  fscMarks,
  fscTotal,
  matricMarks,
  matricTotal,
  selectedGroup,
  selectedCity,
  selectedCategory,
  maxBudget,
  onFscChange,
  onMatricChange,
  onGroupChange,
  onCityChange,
  onCategoryChange,
  onBudgetChange,
  onReset
}) => {
  const fscPercentage = Math.round((fscMarks / fscTotal) * 100);
  const matricPercentage = Math.round((matricMarks / matricTotal) * 100);

  const groups: IntermediateGroup[] = [
    'Pre-Engineering',
    'Pre-Medical',
    'ICS (Physics)',
    'ICS (Stats)',
    'ICS (Economics)',
    'I.Com',
    'General Science',
    'Humanities/FA',
    'A-Levels (Pre-Eng)',
    'A-Levels (Pre-Med)',
    'A-Levels (CompSci)'
  ];

  const cities = ['All Locations', 'Islamabad', 'Lahore', 'Karachi', 'Topi, Swabi', 'Sukkur'];

  const categories = [
    { value: 'all', label: 'All Disciplines' },
    { value: 'Computing', label: 'Computer Science & AI' },
    { value: 'Engineering', label: 'Engineering (PEC Accredited)' },
    { value: 'Business', label: 'Business & Management (BBA/ACF)' },
    { value: 'Sciences', label: 'Pure Sciences & Physics' },
    { value: 'Law', label: 'Law & Social Sciences (LLB)' }
  ];

  return (
    <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-5 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E1E4EA]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#17284A]" />
          <h3 className="font-serif text-base font-bold text-[#17284A]">
            Eligibility & Merit Filters
          </h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-[#C79A3D] hover:text-[#A67C28] font-semibold cursor-pointer"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Intermediate Marks */}
        <div>
          <label className="text-xs font-semibold text-[#17284A] uppercase tracking-wide block mb-1.5">
            FSc / HSSC-1 Marks
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={250}
              max={550}
              value={fscMarks}
              onChange={(e) => onFscChange(Number(e.target.value))}
              className="w-full bg-white text-sm text-[#1B1F27] rounded-[8px] border border-[#E1E4EA] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#17284A]"
            />
            <span className="text-xs font-semibold text-[#17284A] shrink-0 bg-[#F0F4FA] px-2 py-2 rounded-[8px] border border-[#DEE6F2]">
              {fscPercentage}%
            </span>
          </div>
          <p className="text-[10px] text-[#5B6472] mt-1">Out of {fscTotal} marks</p>
        </div>

        {/* Matric Marks */}
        <div>
          <label className="text-xs font-semibold text-[#17284A] uppercase tracking-wide block mb-1.5">
            Matric / SSC Marks
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={500}
              max={1100}
              value={matricMarks}
              onChange={(e) => onMatricChange(Number(e.target.value))}
              className="w-full bg-white text-sm text-[#1B1F27] rounded-[8px] border border-[#E1E4EA] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#17284A]"
            />
            <span className="text-xs font-semibold text-[#17284A] shrink-0 bg-[#F0F4FA] px-2 py-2 rounded-[8px] border border-[#DEE6F2]">
              {matricPercentage}%
            </span>
          </div>
          <p className="text-[10px] text-[#5B6472] mt-1">Out of {matricTotal} marks</p>
        </div>

        {/* Intermediate Academic Stream */}
        <div>
          <Select
            label="Academic Group"
            value={selectedGroup}
            onChange={(e) => onGroupChange(e.target.value as IntermediateGroup)}
          >
            {groups.map((grp) => (
              <option key={grp} value={grp}>
                {grp}
              </option>
            ))}
          </Select>
        </div>

        {/* Preferred Location */}
        <div>
          <Select
            label="Preferred City"
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Second Row: Budget Slider & Discipline Filter */}
      <div className="pt-3 border-t border-[#E1E4EA] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Budget Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#17284A] flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-[#C79A3D]" />
              Maximum Semester Budget:
            </span>
            <span className="font-bold text-[#17284A] text-sm bg-[#FDF7EC] px-2.5 py-0.5 rounded-[6px] border border-[#E9CCA0]">
              PKR {maxBudget.toLocaleString()} / sem
            </span>
          </div>
          <input
            type="range"
            min={40000}
            max={600000}
            step={10000}
            value={maxBudget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="w-full accent-[#17284A] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#8E97A6]">
            <span>PKR 40k (Subsidized Public)</span>
            <span>PKR 250k (Semi-Govt)</span>
            <span>PKR 600k (Private Elite)</span>
          </div>
        </div>

        {/* Field of Study Category Pills */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#17284A] uppercase tracking-wide block">
            Filter by Degree Discipline
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => onCategoryChange(cat.value)}
                  className={`text-xs px-3 py-1.5 rounded-[8px] font-medium transition-colors cursor-pointer border ${
                    isActive
                      ? 'bg-[#17284A] text-white border-[#17284A] shadow-xs'
                      : 'bg-[#F5F6F9] text-[#5B6472] border-[#E1E4EA] hover:bg-[#DEE6F2] hover:text-[#17284A]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
