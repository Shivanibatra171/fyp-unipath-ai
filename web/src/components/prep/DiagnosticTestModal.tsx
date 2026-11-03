import React, { useState, useEffect } from 'react';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../../data/questionsData';
import { DiagnosticResult } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

interface DiagnosticTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinishTest: (result: DiagnosticResult) => void;
}

export const DiagnosticTestModal: React.FC<DiagnosticTestModalProps> = ({
  isOpen,
  onClose,
  onFinishTest
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [isTimed, setIsTimed] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60); // 30 mins
  const [testStarted, setTestStarted] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  // Timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (testStarted && isTimed && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleCompleteEvaluation();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [testStarted, isTimed, secondsRemaining]);

  if (!isOpen) return null;

  const questions = DIAGNOSTIC_QUESTIONS;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleCompleteEvaluation = () => {
    let totalCorrect = 0;
    const sectionCounts: Record<string, { total: number; correct: number }> = {
      Mathematics: { total: 0, correct: 0 },
      English: { total: 0, correct: 0 },
      'Logical Reasoning': { total: 0, correct: 0 },
      'Physics & Computing': { total: 0, correct: 0 }
    };

    const weakTopics: { topic: string; section: string; advice: string; count: number }[] = [];

    questions.forEach((q) => {
      const userAns = selectedAnswers[q.id];
      const isCorrect = userAns === q.correctOptionId;

      if (sectionCounts[q.section]) {
        sectionCounts[q.section].total += 1;
        if (isCorrect) {
          sectionCounts[q.section].correct += 1;
          totalCorrect += 1;
        } else {
          weakTopics.push({
            topic: q.topic,
            section: q.section,
            advice: `Revise fundamental formulas and problem-solving techniques for ${q.topic}.`,
            count: 10
          });
        }
      }
    });

    const percentage = Math.round((totalCorrect / questions.length) * 100);
    const percentileEstimate = Math.min(99.4, Math.max(45.0, Number((percentage * 1.15 + 6.5).toFixed(1))));

    const sectionScores = Object.entries(sectionCounts).map(([section, data]) => {
      const p = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
      return {
        section,
        correct: data.correct,
        total: data.total,
        percentage: p,
        status: p >= 75 ? ('Strong' as const) : p >= 55 ? ('Average' as const) : ('Needs Work' as const)
      };
    });

    const result: DiagnosticResult = {
      totalScore: totalCorrect,
      totalQuestions: questions.length,
      percentage,
      percentileEstimate,
      timeSpentSeconds: 1800 - secondsRemaining,
      sectionScores,
      weakAreas: weakTopics.slice(0, 3).map((w) => ({
        topic: w.topic,
        section: w.section,
        advice: w.advice,
        recommendedPracticeCount: w.count
      })),
      readinessRating:
        percentage >= 80
          ? 'High Merit Contender'
          : percentage >= 60
          ? 'Competitive'
          : 'Foundation Building Required'
    };

    onFinishTest(result);
    onClose();
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#0E1B33]/70 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl bg-white rounded-[12px] border border-[#DEE6F2] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        {!testStarted ? (
          /* INTRO SCREEN */
          <div className="p-8 sm:p-12 space-y-6 text-center max-w-2xl mx-auto my-auto">
            <div className="w-14 h-14 rounded-full bg-[#17284A] text-[#C79A3D] flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <Badge variant="navy" size="md">
                National Entrance Assessment Engine
              </Badge>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17284A]">
                UniPath Comprehensive Diagnostic Assessment
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed">
                Evaluate your baseline aptitude across 25 curated questions modeled after NUST NET, UET ECAT, FAST NU Test, and IBA Karachi entry exams.
              </p>
            </div>

            {/* Test Specifications Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-2">
              <div className="p-3 bg-[#F5F6F9] rounded-[8px] border border-[#E1E4EA]">
                <span className="text-[10px] text-[#8E97A6] font-bold uppercase block">
                  Questions
                </span>
                <span className="font-bold text-sm text-[#17284A]">25 MCQs</span>
              </div>
              <div className="p-3 bg-[#F5F6F9] rounded-[8px] border border-[#E1E4EA]">
                <span className="text-[10px] text-[#8E97A6] font-bold uppercase block">
                  Subjects
                </span>
                <span className="font-bold text-sm text-[#17284A]">4 Sections</span>
              </div>
              <div className="p-3 bg-[#F5F6F9] rounded-[8px] border border-[#E1E4EA]">
                <span className="text-[10px] text-[#8E97A6] font-bold uppercase block">
                  Time Limit
                </span>
                <span className="font-bold text-sm text-[#17284A]">30 Minutes</span>
              </div>
              <div className="p-3 bg-[#F5F6F9] rounded-[8px] border border-[#E1E4EA]">
                <span className="text-[10px] text-[#8E97A6] font-bold uppercase block">
                  Scoring
                </span>
                <span className="font-bold text-sm text-[#17284A]">+1 / No Negative</span>
              </div>
            </div>

            {/* Mode selection */}
            <div className="flex items-center justify-center gap-6 text-xs text-[#17284A] font-semibold pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="timedMode"
                  checked={isTimed}
                  onChange={() => setIsTimed(true)}
                  className="accent-[#17284A]"
                />
                <span>Timed Exam Mode (30:00)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="timedMode"
                  checked={!isTimed}
                  onChange={() => setIsTimed(false)}
                  className="accent-[#17284A]"
                />
                <span>Untimed Practice Mode</span>
              </label>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <Button variant="ghost" size="md" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="accent"
                size="lg"
                onClick={() => setTestStarted(true)}
                className="font-bold shadow-md"
              >
                Begin Assessment Now
              </Button>
            </div>
          </div>
        ) : (
          /* ACTIVE TEST TAKING SCREEN */
          <div className="flex flex-col h-full flex-1">
            {/* Top Bar: Timer, Subject Badge, Flag, Close */}
            <div className="px-6 py-3.5 bg-[#FAFBFD] border-b border-[#E1E4EA] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Badge variant="navy" size="md">
                  {currentQ.section}
                </Badge>
                <span className="text-xs text-[#5B6472] hidden sm:inline">
                  Topic: {currentQ.topic}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {isTimed && (
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-[8px] border text-xs font-mono font-bold ${
                      secondsRemaining < 300
                        ? 'bg-[#FDF2F0] text-[#B5482F] border-[#F3C4BA] animate-pulse'
                        : 'bg-[#F0F4FA] text-[#17284A] border-[#DEE6F2]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTimer(secondsRemaining)}</span>
                  </div>
                )}

                <button
                  onClick={toggleFlag}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-[6px] border transition-colors cursor-pointer ${
                    flaggedQuestions[currentQ.id]
                      ? 'bg-[#FDF7EC] text-[#8C661D] border-[#E9CCA0]'
                      : 'bg-white text-[#5B6472] border-[#E1E4EA] hover:bg-[#F5F6F9]'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5 fill-current" />
                  <span>{flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag'}</span>
                </button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setConfirmSubmitOpen(true)}
                >
                  Submit Test
                </Button>
              </div>
            </div>

            {/* Main Content: Question + Options on Left, Palette on Right */}
            <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
              {/* Question & Options Area */}
              <div className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto border-r border-[#E1E4EA]">
                {/* Passage if applicable */}
                {currentQ.passageText && (
                  <div className="p-4 bg-[#F5F6F9] border border-[#DEE6F2] rounded-[8px] text-xs text-[#1B1F27] leading-relaxed">
                    <span className="text-[10px] font-bold text-[#8E97A6] uppercase block mb-1">
                      Reading Comprehension Passage:
                    </span>
                    <p className="italic">{currentQ.passageText}</p>
                  </div>
                )}

                {/* Question Statement */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#C79A3D]">
                    Question {currentIdx + 1} of {questions.length}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#17284A] leading-relaxed whitespace-pre-line">
                    {currentQ.questionText}
                  </h3>
                </div>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQ.options.map((opt) => {
                    const isSelected = selectedAnswers[currentQ.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full text-left p-4 rounded-[8px] border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#F0F4FA] border-[#17284A] ring-2 ring-[#17284A]/10 text-[#17284A] font-semibold'
                            : 'bg-white border-[#E1E4EA] hover:border-[#CAD0DC] text-[#1B1F27]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 uppercase ${
                              isSelected
                                ? 'bg-[#17284A] text-white'
                                : 'bg-[#F5F6F9] text-[#5B6472]'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span className="text-xs sm:text-sm">{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Navigation Palette (Right Column) */}
              <div className="w-full md:w-72 bg-[#FAFBFD] p-5 space-y-5 shrink-0 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#17284A] mb-3">
                    Question Palette ({answeredCount}/{questions.length} Answered)
                  </h4>

                  {/* Grid of numbers 1-25 */}
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((q, idx) => {
                      const isCurrent = idx === currentIdx;
                      const isAnswered = !!selectedAnswers[q.id];
                      const isFlagged = !!flaggedQuestions[q.id];

                      let btnStyle = 'bg-white text-[#5B6472] border-[#E1E4EA]';
                      if (isCurrent) {
                        btnStyle = 'bg-[#17284A] text-white border-[#17284A] ring-2 ring-[#C79A3D]';
                      } else if (isFlagged) {
                        btnStyle = 'bg-[#FDF7EC] text-[#8C661D] border-[#E9CCA0] font-bold';
                      } else if (isAnswered) {
                        btnStyle = 'bg-[#EFF8F3] text-[#2F6B4F] border-[#BCE1CE] font-bold';
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentIdx(idx)}
                          className={`w-full aspect-square rounded-[6px] border text-xs font-medium flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="mt-6 pt-4 border-t border-[#E1E4EA] space-y-1.5 text-[11px] text-[#5B6472]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-[#EFF8F3] border border-[#BCE1CE]" />
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-[#FDF7EC] border border-[#E9CCA0]" />
                      <span>Flagged for Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-white border border-[#E1E4EA]" />
                      <span>Unvisited</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E1E4EA]">
                  <ProgressBar
                    value={Math.round((answeredCount / questions.length) * 100)}
                    size="sm"
                    label="Test Progress"
                    showValueLabel
                  />
                </div>
              </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="px-6 py-3.5 bg-[#FAFBFD] border-t border-[#E1E4EA] flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => prev - 1)}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Previous
              </Button>

              <span className="text-xs text-[#5B6472]">
                {questions.length - answeredCount} questions remaining
              </span>

              {currentIdx < questions.length - 1 ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setCurrentIdx((prev) => prev + 1)}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Next Question
                </Button>
              ) : (
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => setConfirmSubmitOpen(true)}
                  rightIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Review & Submit
                </Button>
              )}
            </div>
          </div>
        )}

        {/* SUBMIT CONFIRMATION MODAL OVERLAY */}
        {confirmSubmitOpen && (
          <div className="fixed inset-0 z-60 bg-[#0E1B33]/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-[12px] p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-[#EFF8F3] text-[#2F6B4F] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#17284A]">
                Submit Diagnostic Assessment?
              </h3>
              <p className="text-xs text-[#5B6472]">
                You have answered <strong>{answeredCount}</strong> out of{' '}
                <strong>{questions.length}</strong> questions. Once submitted, your sectional weak areas and estimated percentiles will be generated immediately.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmSubmitOpen(false)}
                >
                  Return to Test
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={handleCompleteEvaluation}
                >
                  Confirm & Generate Scorecard
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
