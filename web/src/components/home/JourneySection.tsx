import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, GraduationCap, FileCheck, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const JourneySection: React.FC = () => {
  const navigate = useNavigate();

  const stages = [
    {
      step: '01',
      title: 'Discover Your Interest',
      subtitle: 'Career Archetype & Streams',
      description: 'Interact with our dynamic questionnaire and interest matrix to match your cognitive strengths with high-demand degree programs.',
      icon: <Compass className="w-6 h-6 text-[#17284A]" />,
      route: '/discover',
      accent: 'border-[#17284A]',
      bulletPoints: ['8 Major academic disciplines', 'Pre-scripted AI interview', 'Personalized Interest Profile']
    },
    {
      step: '02',
      title: 'Find Programs & Universities',
      subtitle: 'Merit Matching & Prospectus RAG',
      description: 'Input your FSc / Matric marks or upload a marksheet to simulate admission merit aggregates across 10 top Pakistani institutions.',
      icon: <GraduationCap className="w-6 h-6 text-[#C79A3D]" />,
      route: '/match',
      accent: 'border-[#C79A3D]',
      bulletPoints: ['Marksheet OCR simulator', 'Budget & location filters', 'Prospectus AI Chat with citations']
    },
    {
      step: '03',
      title: 'Application Guidance',
      subtitle: 'Checklists & Admission Office Directory',
      description: 'Track mandatory Pakistani admission documents (Matric Sanad, DMC, CNIC, Domicile) and follow step-by-step portal guidelines.',
      icon: <FileCheck className="w-6 h-6 text-[#2F6B4F]" />,
      route: '/guidance',
      accent: 'border-[#2F6B4F]',
      bulletPoints: ['Interactive document checklist', 'Admission calendar countdown', 'Helplines & portal walkthroughs']
    },
    {
      step: '04',
      title: 'Admission Test Preparation',
      subtitle: 'NET, ECAT, FAST & IBA Prep',
      description: 'Take a 25-question diagnostic MCQ assessment, identify weak topics, and follow a 4-week structured daily timetable.',
      icon: <BookOpen className="w-6 h-6 text-[#17284A]" />,
      route: '/test-prep',
      accent: 'border-[#17284A]',
      bulletPoints: ['Timed diagnostic assessment', 'Sectional weak area breakdown', '4-Week personalized study plan']
    }
  ];

  return (
    <section className="py-20 bg-[#F5F6F9] border-b border-[#E1E4EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C79A3D] mb-2">
            Sequential Guidance Pathway
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17284A]">
            The 4-Stage Undergraduate Journey
          </h2>
          <p className="text-sm text-[#5B6472] mt-3">
            A structured, step-by-step framework designed to eliminate admission anxiety and guide Pakistani students from self-discovery to exam day.
          </p>
        </div>

        {/* 4 Cards Stepped Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {stages.map((stage, idx) => (
            <div
              key={stage.step}
              className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Step number badge & icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-[8px] bg-[#F0F4FA] flex items-center justify-center group-hover:bg-[#DEE6F2] transition-colors">
                    {stage.icon}
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#CAD0DC] group-hover:text-[#17284A] transition-colors">
                    {stage.step}
                  </span>
                </div>

                <p className="text-[11px] font-semibold text-[#C79A3D] uppercase tracking-wider">
                  {stage.subtitle}
                </p>
                <h3 className="font-serif text-lg font-bold text-[#17284A] mt-1 mb-2">
                  {stage.title}
                </h3>
                <p className="text-xs text-[#5B6472] leading-relaxed mb-4">
                  {stage.description}
                </p>

                {/* Key feature bullets */}
                <ul className="space-y-2 border-t border-[#E1E4EA] pt-3 mb-6">
                  {stage.bulletPoints.map((pt) => (
                    <li key={pt} className="text-xs text-[#1B1F27] flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6B4F] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(stage.route)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="w-full text-xs font-semibold group-hover:bg-[#17284A] group-hover:text-white group-hover:border-[#17284A] transition-all"
              >
                Launch Stage {stage.step}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
