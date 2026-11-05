import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  GraduationCap,
  FileCheck,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Bookmark,
  Scale,
  Calendar,
  Award,
  Bell,
  MessageSquareText,
  Building
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useShortlist } from '../context/ShortlistContext';
import { UNIVERSITIES_DATA } from '../data/universitiesData';
import { MOCK_NOTIFICATIONS } from '../data/mockNotifications';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { modules, diagnosticResult, interestProfile, overallJourneyProgress } = useProgress();
  const { shortlistedUniversityIds, compareUniversityIds } = useShortlist();

  const shortlistedUnis = UNIVERSITIES_DATA.filter((u) =>
    shortlistedUniversityIds.includes(u.id)
  );

  const moduleIcons: Record<number, React.ReactNode> = {
    1: <Compass className="w-5 h-5 text-[#17284A]" />,
    2: <GraduationCap className="w-5 h-5 text-[#C79A3D]" />,
    3: <FileCheck className="w-5 h-5 text-[#2F6B4F]" />,
    4: <BookOpen className="w-5 h-5 text-[#17284A]" />
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#17284A] via-[#1C325B] to-[#0E1B33] text-white rounded-[12px] p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#C79A3D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-white/15 text-[#E9CCA0] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                {user.intermediateBoard}
              </span>
              <span className="text-xs bg-[#C79A3D] text-[#17284A] font-bold px-2.5 py-1 rounded-full">
                {user.intermediateGroup}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Welcome back, {user.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#CAD8EC] max-w-xl leading-relaxed">
              Your undergraduate admission progress is on track. You have completed the Interest Profiler and have 3 universities actively monitored.
            </p>
          </div>

          {/* Overall Pathway Progress Box */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 p-5 rounded-[12px] text-center shrink-0 min-w-[170px]">
            <span className="text-[10px] uppercase font-bold text-[#E9CCA0] tracking-wider block">
              Admission Readiness
            </span>
            <span className="font-serif text-4xl font-bold text-white block mt-1">
              {overallJourneyProgress}%
            </span>
            <span className="text-[11px] text-[#CAD8EC] mt-1 block">
              Stage 2 Active
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Shortlist Card */}
        <div
          onClick={() => navigate('/shortlist')}
          className="bg-white p-5 rounded-[12px] border border-[#E1E4EA] hover:border-[#CAD0DC] shadow-xs cursor-pointer transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase text-[#8E97A6]">
              Shortlisted
            </span>
            <Bookmark className="w-4 h-4 text-[#17284A]" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#17284A]">
            {shortlistedUniversityIds.length} Universities
          </p>
          <p className="text-[11px] text-[#2F6B4F] font-medium mt-1">
            Admissions Alerts Active
          </p>
        </div>

        {/* Diagnostic Score Card */}
        <div
          onClick={() => navigate('/test-prep')}
          className="bg-white p-5 rounded-[12px] border border-[#E1E4EA] hover:border-[#CAD0DC] shadow-xs cursor-pointer transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase text-[#8E97A6]">
              Diagnostic Baseline
            </span>
            <Award className="w-4 h-4 text-[#C79A3D]" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#17284A]">
            {diagnosticResult ? `${diagnosticResult.percentage}%` : 'Not Taken'}
          </p>
          <p className="text-[11px] text-[#C79A3D] font-medium mt-1">
            {diagnosticResult ? `${diagnosticResult.percentileEstimate}th Percentile` : 'Take Diagnostic'}
          </p>
        </div>

        {/* Aggregate Estimate Card */}
        <div
          onClick={() => navigate('/match')}
          className="bg-white p-5 rounded-[12px] border border-[#E1E4EA] hover:border-[#CAD0DC] shadow-xs cursor-pointer transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase text-[#8E97A6]">
              FSc Part-1 Score
            </span>
            <Sparkles className="w-4 h-4 text-[#2F6B4F]" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#17284A]">
            {Math.round((user.fsc1Marks / user.fsc1Total) * 100)}%
          </p>
          <p className="text-[11px] text-[#5B6472] font-medium mt-1">
            {user.fsc1Marks} / {user.fsc1Total} marks
          </p>
        </div>

        {/* Document Readiness Card */}
        <div
          onClick={() => navigate('/guidance')}
          className="bg-white p-5 rounded-[12px] border border-[#E1E4EA] hover:border-[#CAD0DC] shadow-xs cursor-pointer transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase text-[#8E97A6]">
              Document Dossier
            </span>
            <FileCheck className="w-4 h-4 text-[#17284A]" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#17284A]">
            5 / 7 Verified
          </p>
          <p className="text-[11px] text-[#2F6B4F] font-medium mt-1">
            71% Dossier Readiness
          </p>
        </div>
      </div>

      {/* 4-MODULE CONNECTED PROGRESSION PATHWAY */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#17284A]" />
              <h3 className="font-serif text-lg font-bold text-[#17284A]">
                4-Stage Undergraduate Journey Progression
              </h3>
            </div>
            <p className="text-xs text-[#5B6472]">
              Track and advance through each required milestone to complete your admission preparation.
            </p>
          </div>

          <Badge variant="navy" size="md">
            Stage 2 of 4 Active
          </Badge>
        </div>

        {/* Stepped Connected Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod, idx) => {
            const isCompleted = mod.status === 'completed';
            const isInProgress = mod.status === 'in_progress';

            return (
              <div
                key={mod.id}
                onClick={() => navigate(mod.path)}
                className={`rounded-[12px] border p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between group ${
                  isCompleted
                    ? 'bg-[#FAFBFD] border-[#BCE1CE] hover:border-[#2F6B4F]'
                    : isInProgress
                    ? 'bg-white border-[#17284A] ring-2 ring-[#17284A]/10 shadow-sm'
                    : 'bg-white border-[#E1E4EA] hover:border-[#CAD0DC]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-[8px] flex items-center justify-center text-xs ${
                        isCompleted
                          ? 'bg-[#EFF8F3] text-[#2F6B4F]'
                          : isInProgress
                          ? 'bg-[#F0F4FA] text-[#17284A]'
                          : 'bg-[#F5F6F9] text-[#8E97A6]'
                      }`}
                    >
                      {moduleIcons[mod.id]}
                    </div>

                    <div className="flex items-center gap-1">
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#2F6B4F] bg-[#EFF8F3] px-2 py-0.5 rounded-full border border-[#BCE1CE]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Done
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#C79A3D] bg-[#FDF7EC] px-2 py-0.5 rounded-full border border-[#E9CCA0]">
                          <Clock className="w-3.5 h-3.5" />
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-[#8E97A6] uppercase tracking-wider block">
                    Module {mod.id}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#17284A] mt-0.5 leading-snug">
                    {mod.title}
                  </h4>

                  <div className="mt-3">
                    <ProgressBar
                      value={mod.completionPercentage}
                      variant={isCompleted ? 'green' : 'navy'}
                      size="sm"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E1E4EA] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#5B6472]">
                    {mod.badgeText}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#17284A] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Section: Shortlisted Universities & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Shortlisted Universities */}
        <div className="lg:col-span-2 bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-[#17284A]" />
              <h3 className="font-serif text-base font-bold text-[#17284A]">
                Monitored Launch Universities ({shortlistedUnis.length})
              </h3>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/match')}
            >
              Add More
            </Button>
          </div>

          <div className="space-y-3">
            {shortlistedUnis.map((uni) => (
              <div
                key={uni.id}
                className="p-4 rounded-[8px] bg-[#FAFBFD] border border-[#E1E4EA] hover:border-[#CAD0DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: uni.badgeAccent || '#17284A' }}>
                    <span className="text-white text-[9px] font-bold leading-none text-center px-0.5">
                      {uni.shortName.slice(0, 4)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#17284A]">
                      {uni.name} ({uni.shortName})
                    </h4>
                    <p className="text-[11px] text-[#5B6472]">
                      {uni.city} • {uni.averageSemesterFeeRange.split('/')[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/university/${uni.id}`)}
                    className="text-xs"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Admission Alerts Feed */}
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#C79A3D]" />
              <h3 className="font-serif text-base font-bold text-[#17284A]">
                Live Admission Alerts
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {MOCK_NOTIFICATIONS.slice(0, 3).map((notif) => (
              <div
                key={notif.id}
                onClick={() => navigate(notif.linkTo)}
                className="p-3 rounded-[8px] bg-[#FAFBFD] border border-[#E1E4EA] hover:bg-[#F5F6F9] transition-colors cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#17284A]">
                    {notif.universityName}
                  </span>
                  <span className="text-[10px] text-[#8E97A6]">{notif.date}</span>
                </div>
                <p className="text-xs font-semibold text-[#1B1F27] leading-snug">
                  {notif.title}
                </p>
                <p className="text-[11px] text-[#5B6472] line-clamp-2">
                  {notif.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
