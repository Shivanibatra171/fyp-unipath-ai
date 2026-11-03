import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Calendar,
  Sparkles,
  TrendingUp,
  Play,
  RotateCcw,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { DiagnosticTestModal } from '../components/prep/DiagnosticTestModal';
import { ScoreCardBreakdown } from '../components/prep/ScoreCardBreakdown';
import { StudyPlanTimetable } from '../components/prep/StudyPlanTimetable';
import { MockTestCatalog } from '../components/prep/MockTestCatalog';
import { PerformanceTrendChart } from '../components/prep/PerformanceTrendChart';
import { Tabs } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const TestPrepPage: React.FC = () => {
  const { diagnosticResult, saveDiagnosticResult } = useProgress();

  const [activeTab, setActiveTab] = useState('diagnostic');
  const [testModalOpen, setTestModalOpen] = useState(false);

  const tabs = [
    { id: 'diagnostic', label: 'Diagnostic Assessment & Scorecard' },
    { id: 'timetable', label: '4-Week Personalized Study Plan' },
    { id: 'mocks', label: 'University Mock Test Bank' },
    { id: 'trend', label: 'Performance Trajectory Analytics' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E4EA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-[#17284A]" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#17284A]">
              Module 4: Admission Test Preparation
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6472]">
            Comprehensive diagnostic assessment, weak area isolation, and weekly time-blocked preparation plans for Pakistani universities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="accent"
            size="md"
            onClick={() => setTestModalOpen(true)}
            leftIcon={<Play className="w-4 h-4 fill-current" />}
            className="font-bold shadow-xs"
          >
            {diagnosticResult ? 'Retake 25-MCQ Diagnostic' : 'Take Free Diagnostic Test'}
          </Button>
          <Badge variant="navy" size="md">
            Stage 4 of 4
          </Badge>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-4 shadow-xs">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab 1: Diagnostic & Scorecard */}
      {activeTab === 'diagnostic' && (
        <div className="space-y-6">
          {diagnosticResult ? (
            <ScoreCardBreakdown
              result={diagnosticResult}
              onRetake={() => setTestModalOpen(true)}
            />
          ) : (
            <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-12 text-center space-y-4">
              <Award className="w-12 h-12 text-[#C79A3D] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#17284A]">
                You Haven&apos;t Taken the Diagnostic Assessment Yet
              </h3>
              <p className="text-xs text-[#5B6472] max-w-md mx-auto leading-relaxed">
                Take our 25-question test spanning Mathematics, English Grammar, Logical Reasoning, and Physics/CS to diagnose your baseline strengths and weak areas.
              </p>
              <Button
                variant="accent"
                size="lg"
                onClick={() => setTestModalOpen(true)}
                leftIcon={<Play className="w-4 h-4 fill-current" />}
                className="font-bold shadow-md"
              >
                Start 25-Question Assessment
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: 4-Week Study Plan Timetable */}
      {activeTab === 'timetable' && <StudyPlanTimetable />}

      {/* Tab 3: University Mock Test Catalog */}
      {activeTab === 'mocks' && (
        <MockTestCatalog onStartDiagnostic={() => setTestModalOpen(true)} />
      )}

      {/* Tab 4: Performance Trajectory */}
      {activeTab === 'trend' && <PerformanceTrendChart />}

      {/* Diagnostic Test Modal Engine */}
      <DiagnosticTestModal
        isOpen={testModalOpen}
        onClose={() => setTestModalOpen(false)}
        onFinishTest={(res) => saveDiagnosticResult(res)}
      />
    </div>
  );
};
