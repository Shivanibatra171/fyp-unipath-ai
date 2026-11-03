import React, { useState } from 'react';
import { BookOpen, Clock, Users, ArrowRight, Play, CheckCircle2, Filter } from 'lucide-react';
import { MOCK_TESTS_CATALOG } from '../../data/mockNotifications';
import { MockTestCatalogItem } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface MockTestCatalogProps {
  onStartDiagnostic: () => void;
}

export const MockTestCatalog: React.FC<MockTestCatalogProps> = ({ onStartDiagnostic }) => {
  const [selectedUni, setSelectedUni] = useState<string>('all');
  const [launchedTest, setLaunchedTest] = useState<string | null>(null);

  const tests = MOCK_TESTS_CATALOG;

  const universities = ['all', 'NUST Islamabad', 'UET Lahore', 'FAST-NUCES', 'IBA Karachi', 'GIKI Topi'];

  const filteredTests =
    selectedUni === 'all'
      ? tests
      : tests.filter((t) => t.universityTarget.toLowerCase().includes(selectedUni.toLowerCase()));

  const handleLaunchMock = (title: string) => {
    setLaunchedTest(title);
    setTimeout(() => {
      onStartDiagnostic();
      setLaunchedTest(null);
    }, 400);
  };

  return (
    <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-[#17284A]" />
            <h3 className="font-serif text-lg font-bold text-[#17284A]">
              University Entry Test Simulation Bank
            </h3>
          </div>
          <p className="text-xs text-[#5B6472]">
            Targeted full-length mock exams aligned with official test patterns and weightages.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {universities.map((uni) => (
            <button
              key={uni}
              onClick={() => setSelectedUni(uni)}
              className={`text-xs px-3 py-1.5 rounded-[8px] font-medium transition-colors cursor-pointer shrink-0 border ${
                selectedUni === uni
                  ? 'bg-[#17284A] text-white border-[#17284A] shadow-xs'
                  : 'bg-[#F5F6F9] text-[#5B6472] border-[#E1E4EA] hover:bg-[#DEE6F2] hover:text-[#17284A]'
              }`}
            >
              {uni === 'all' ? 'All Tests' : uni.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="p-5 rounded-[10px] border border-[#E1E4EA] hover:border-[#CAD0DC] bg-[#FAFBFD] space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-[#C79A3D] uppercase">
                  {test.universityTarget}
                </span>
                <Badge
                  variant={
                    test.difficulty === 'High Merit Target'
                      ? 'red'
                      : test.difficulty === 'Speed Drill'
                      ? 'gold'
                      : 'navy'
                  }
                  size="sm"
                >
                  {test.difficulty}
                </Badge>
              </div>

              <h4 className="font-serif text-base font-bold text-[#17284A] leading-snug">
                {test.title}
              </h4>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-2 text-xs pt-3 mt-3 border-t border-[#E1E4EA]">
                <div>
                  <span className="text-[10px] text-[#8E97A6] font-bold uppercase block">
                    Duration
                  </span>
                  <span className="font-semibold text-[#17284A]">
                    {test.durationMinutes} mins
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8E97A6] font-bold uppercase block">
                    Questions
                  </span>
                  <span className="font-semibold text-[#17284A]">
                    {test.totalQuestions} MCQs
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8E97A6] font-bold uppercase block">
                    Attempts
                  </span>
                  <span className="font-semibold text-[#17284A]">
                    {test.attemptsCount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Sections covered */}
              <div className="pt-3">
                <span className="text-[10px] text-[#8E97A6] font-bold uppercase block mb-1">
                  Subjects Included:
                </span>
                <p className="text-[11px] text-[#5B6472]">
                  {test.sections.join(' • ')}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E1E4EA] flex items-center justify-between">
              <span className="text-xs text-[#5B6472]">
                Avg. Score: <strong>{test.avgScore}</strong>
              </span>

              <Button
                variant="accent"
                size="sm"
                onClick={() => handleLaunchMock(test.title)}
                leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
              >
                Launch Mock Exam
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
