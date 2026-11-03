import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Download,
  Check
} from 'lucide-react';
import { DiagnosticResult } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

interface ScoreCardBreakdownProps {
  result: DiagnosticResult;
  onRetake: () => void;
}

export const ScoreCardBreakdown: React.FC<ScoreCardBreakdownProps> = ({
  result,
  onRetake
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Summary */}
      <div className="bg-gradient-to-r from-[#17284A] via-[#1F3663] to-[#0E1B33] text-white rounded-[12px] p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Badge variant="gold" size="sm">
              Assessment Report Evaluated
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Overall Score: {result.totalScore} / {result.totalQuestions} ({result.percentage}%)
            </h2>
            <p className="text-xs sm:text-sm text-[#CAD8EC] max-w-xl leading-relaxed">
              Performance indicates <strong>{result.readinessRating}</strong> status for competitive computing and engineering seats across NUST, FAST, and GIKI.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 p-4 rounded-[12px] text-center min-w-[120px]">
              <span className="text-[10px] text-[#E9CCA0] uppercase font-bold tracking-wider block">
                Percentile
              </span>
              <span className="font-serif text-3xl font-bold text-white block mt-0.5">
                {result.percentileEstimate}th
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs border border-white/20 p-4 rounded-[12px] text-center min-w-[120px]">
              <span className="text-[10px] text-[#E9CCA0] uppercase font-bold tracking-wider block">
                Time Spent
              </span>
              <span className="font-serif text-3xl font-bold text-white block mt-0.5">
                {Math.round(result.timeSpentSeconds / 60)}m
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Section Breakdown & Weak Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Breakdown Card */}
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#17284A]">
              Sectional Competency Breakdown
            </h3>
            <span className="text-xs text-[#5B6472]">Correct / Total</span>
          </div>

          <div className="space-y-4">
            {result.sectionScores.map((sec) => (
              <div key={sec.section} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#17284A]">
                      {sec.section}
                    </span>
                    <Badge
                      variant={
                        sec.status === 'Strong'
                          ? 'green'
                          : sec.status === 'Average'
                          ? 'navy'
                          : 'red'
                      }
                      size="sm"
                    >
                      {sec.status}
                    </Badge>
                  </div>
                  <span className="font-bold text-[#17284A]">
                    {sec.correct} / {sec.total} ({sec.percentage}%)
                  </span>
                </div>
                <ProgressBar
                  value={sec.percentage}
                  variant={sec.percentage >= 75 ? 'green' : sec.percentage >= 50 ? 'navy' : 'red'}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Targeted Weak Areas Card */}
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#B5482F]" />
              <h3 className="font-serif text-base font-bold text-[#17284A]">
                Identified Weak Areas & Remediation
              </h3>
            </div>
            <Badge variant="red" size="sm">
              Priority Focus
            </Badge>
          </div>

          <div className="space-y-3">
            {result.weakAreas.map((weak) => (
              <div
                key={weak.topic}
                className="p-3.5 rounded-[8px] bg-[#FDF2F0] border border-[#F3C4BA] space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#B5482F]">{weak.topic}</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#F3C4BA] text-[#B5482F] font-semibold">
                    {weak.section}
                  </span>
                </div>
                <p className="text-[#5B6472]">{weak.advice}</p>
                <p className="text-[11px] font-semibold text-[#17284A] pt-1">
                  Recommended drills: {weak.recommendedPracticeCount} practice questions
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Strip */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onRetake}
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Retake Diagnostic Test
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleDownload}
          leftIcon={<Download className="w-4 h-4" />}
        >
          {downloaded ? 'Scorecard Saved to Device!' : 'Export Diagnostic Scorecard'}
        </Button>
      </div>
    </div>
  );
};
