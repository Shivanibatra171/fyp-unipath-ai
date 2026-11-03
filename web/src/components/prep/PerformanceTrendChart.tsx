import React from 'react';
import { TrendingUp, Award, Calendar, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const PerformanceTrendChart: React.FC = () => {
  const testHistory = [
    { label: 'Initial Baseline Diagnostic', score: 54, date: 'Feb 10', test: 'Diagnostic #1' },
    { label: 'NET-1 Math & Physics Drill', score: 62, date: 'Feb 24', test: 'NET Speed' },
    { label: 'FAST NU Quantitative Mock', score: 68, date: 'Mar 08', test: 'FAST-NU' },
    { label: 'ECAT Full Length Simulation', score: 76, date: 'Mar 18', test: 'ECAT-1' },
    { label: 'Current Diagnostic Exam', score: 84, date: 'Sep 22', test: 'Diagnostic #2' }
  ];

  return (
    <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-[#2F6B4F]" />
            <h3 className="font-serif text-lg font-bold text-[#17284A]">
              Performance Trajectory Over Time
            </h3>
          </div>
          <p className="text-xs text-[#5B6472]">
            Overall accuracy progression across practice simulations (+30% improvement)
          </p>
        </div>

        <Badge variant="green" size="md">
          +30% Net Growth
        </Badge>
      </div>

      {/* Visual Chart Bars */}
      <div className="pt-4 pb-2">
        <div className="h-48 flex items-end justify-between gap-3 sm:gap-6 border-b border-[#E1E4EA] px-2 sm:px-4">
          {testHistory.map((item, idx) => {
            const isLatest = idx === testHistory.length - 1;
            return (
              <div key={item.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-xs font-bold text-[#17284A] opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.score}%
                </div>

                <div
                  className={`w-full max-w-[48px] rounded-t-[6px] transition-all duration-500 relative ${
                    isLatest
                      ? 'bg-gradient-to-t from-[#17284A] to-[#C79A3D] shadow-md'
                      : 'bg-[#DEE6F2] hover:bg-[#CAD8EC]'
                  }`}
                  style={{ height: `${item.score}%` }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-[#17284A] block">
                    {item.score}%
                  </span>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[11px] font-semibold text-[#17284A] block">
                    {item.test}
                  </span>
                  <span className="text-[10px] text-[#8E97A6]">{item.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insight Callout */}
      <div className="p-3.5 bg-[#EFF8F3] border border-[#BCE1CE] rounded-[8px] flex items-center justify-between text-xs text-[#2F6B4F]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C79A3D]" />
          <span>
            Current trajectory puts you in the top <strong>85th Percentile</strong> for NUST SEECS & FAST CS admissions.
          </span>
        </div>
        <span className="font-bold">Merit Zone: Safe</span>
      </div>
    </div>
  );
};
