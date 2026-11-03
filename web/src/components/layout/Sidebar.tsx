import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  GraduationCap,
  FileCheck,
  BookOpen,
  LayoutDashboard,
  Bookmark,
  Scale,
  Settings,
  HelpCircle,
  MessageSquareText,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { useShortlist } from '../../context/ShortlistContext';

export const Sidebar: React.FC = () => {
  const { modules, overallJourneyProgress } = useProgress();
  const { shortlistedUniversityIds, compareUniversityIds } = useShortlist();

  const moduleIcons: Record<number, React.ReactNode> = {
    1: <Compass className="w-4 h-4" />,
    2: <GraduationCap className="w-4 h-4" />,
    3: <FileCheck className="w-4 h-4" />,
    4: <BookOpen className="w-4 h-4" />
  };

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[#E1E4EA] min-h-[calc(100vh-4rem)] flex flex-col justify-between hidden md:flex">
      <div className="p-4 space-y-6">
        {/* Journey Progress Summary Box */}
        <div className="p-3.5 rounded-[8px] bg-[#F5F6F9] border border-[#DEE6F2]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#17284A]">Admission Journey</span>
            <span className="font-bold text-[#C79A3D]">{overallJourneyProgress}%</span>
          </div>
          <div className="w-full bg-[#E1E4EA] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#17284A] to-[#C79A3D] h-full transition-all duration-500 rounded-full"
              style={{ width: `${overallJourneyProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-[#5B6472] mt-1.5">
            Step 2 of 4 currently active
          </p>
        </div>

        {/* Dashboard Link */}
        <div>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-[8px] text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#17284A] text-white font-semibold'
                  : 'text-[#5B6472] hover:text-[#17284A] hover:bg-[#F0F4FA]'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </NavLink>
        </div>

        {/* 4-Module Sequence Section */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#8E97A6] uppercase tracking-wider">
              Guidance Modules
            </span>
          </div>
          <nav className="space-y-1">
            {modules.map((mod) => (
              <NavLink
                key={mod.id}
                to={mod.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-[8px] text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#17284A] text-white font-semibold shadow-xs'
                      : 'text-[#1B1F27] hover:bg-[#F0F4FA] hover:text-[#17284A]'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs shrink-0 ${
                      mod.status === 'completed'
                        ? 'bg-[#EFF8F3] text-[#2F6B4F]'
                        : 'bg-[#F0F4FA] text-[#17284A]'
                    }`}
                  >
                    {moduleIcons[mod.id]}
                  </div>
                  <span className="truncate">{mod.shortTitle}</span>
                </div>
                {mod.status === 'completed' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6B4F] shrink-0" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-[#8E97A6] shrink-0" />
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Quick Tools */}
        <div>
          <div className="px-3 mb-2">
            <span className="text-[10px] font-bold text-[#8E97A6] uppercase tracking-wider">
              Student Workspace
            </span>
          </div>
          <div className="space-y-1">
            <NavLink
              to="/shortlist"
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-[8px] text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#17284A] text-white font-semibold'
                    : 'text-[#5B6472] hover:text-[#17284A] hover:bg-[#F0F4FA]'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4" />
                <span>Saved Universities</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#DEE6F2] text-[#17284A] font-bold">
                {shortlistedUniversityIds.length}
              </span>
            </NavLink>

            <NavLink
              to="/compare"
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-[8px] text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#17284A] text-white font-semibold'
                    : 'text-[#5B6472] hover:text-[#17284A] hover:bg-[#F0F4FA]'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Scale className="w-4 h-4" />
                <span>Side-by-Side Compare</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#FDF7EC] text-[#8C661D] font-bold">
                {compareUniversityIds.length}/3
              </span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#17284A] text-white font-semibold'
                    : 'text-[#5B6472] hover:text-[#17284A] hover:bg-[#F0F4FA]'
                }`
              }
            >
              <Settings className="w-4 h-4" />
              <span>Profile & Settings</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Footer Support Info */}
      <div className="p-4 border-t border-[#E1E4EA] bg-[#FAFBFD] space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#5B6472]">
          <MessageSquareText className="w-4 h-4 text-[#C79A3D]" />
          <span className="font-medium text-[#17284A]">Need Admission Help?</span>
        </div>
        <p className="text-[11px] text-[#5B6472] leading-tight">
          Use the AI Prospectus Assistant in Module 2 for official admissions queries.
        </p>
      </div>
    </aside>
  );
};
