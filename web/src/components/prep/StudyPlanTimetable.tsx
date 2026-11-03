import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Circle, BookOpen, Check } from 'lucide-react';
import { INITIAL_STUDY_PLAN } from '../../data/studyPlanData';
import { StudyPlanWeek } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

export const StudyPlanTimetable: React.FC = () => {
  const [weeks, setWeeks] = useState<StudyPlanWeek[]>(INITIAL_STUDY_PLAN);
  const [activeWeekNum, setActiveWeekNum] = useState<number>(1);

  const activeWeek = weeks.find((w) => w.weekNumber === activeWeekNum) || weeks[0];

  const toggleTask = (taskId: string) => {
    setWeeks((prev) =>
      prev.map((wk) => ({
        ...wk,
        tasks: wk.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      }))
    );
  };

  const totalTasks = weeks.reduce((sum, w) => sum + w.tasks.length, 0);
  const completedTasks = weeks.reduce(
    (sum, w) => sum + w.tasks.filter((t) => t.completed).length,
    0
  );
  const overallProgress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-6">
      {/* Header & Overall Progress */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E1E4EA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-[#17284A]" />
            <h3 className="font-serif text-lg font-bold text-[#17284A]">
              Personalized 4-Week University Preparation Timetable
            </h3>
          </div>
          <p className="text-xs text-[#5B6472]">
            Daily time-blocked revision syllabus targeting high-yield admission test chapters.
          </p>
        </div>

        <div className="w-full md:w-64 shrink-0">
          <ProgressBar
            value={overallProgress}
            label={`Plan Completion (${completedTasks}/${totalTasks} Tasks)`}
            showValueLabel
            variant="gold"
            size="sm"
          />
        </div>
      </div>

      {/* Week Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {weeks.map((wk) => {
          const isActive = wk.weekNumber === activeWeekNum;
          const weekDone = wk.tasks.every((t) => t.completed);
          return (
            <button
              key={wk.weekNumber}
              onClick={() => setActiveWeekNum(wk.weekNumber)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-[8px] text-xs font-semibold transition-all cursor-pointer border shrink-0 ${
                isActive
                  ? 'bg-[#17284A] text-white border-[#17284A] shadow-xs'
                  : 'bg-[#F5F6F9] text-[#5B6472] border-[#E1E4EA] hover:bg-[#DEE6F2] hover:text-[#17284A]'
              }`}
            >
              <span>Week {wk.weekNumber}</span>
              {weekDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6B4F]" />}
            </button>
          );
        })}
      </div>

      {/* Active Week Focus Card */}
      <div className="p-4 rounded-[10px] bg-[#FAFBFD] border border-[#DEE6F2] space-y-1 text-xs">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-sm font-bold text-[#17284A]">
            {activeWeek.title}
          </h4>
          <Badge variant="navy" size="sm">
            {activeWeek.theme}
          </Badge>
        </div>
        <p className="text-[#5B6472]">{activeWeek.objective}</p>
      </div>

      {/* Daily Tasks List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E97A6]">
          Daily Time-Blocked Schedule
        </h4>

        <div className="space-y-2.5">
          {activeWeek.tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded-[8px] border transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                task.completed
                  ? 'bg-[#EFF8F3]/50 border-[#BCE1CE]'
                  : 'bg-white border-[#E1E4EA] hover:border-[#CAD0DC]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center text-xs transition-colors shrink-0 ${
                    task.completed
                      ? 'bg-[#2F6B4F] text-white'
                      : 'border border-[#CAD0DC] bg-white'
                  }`}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-semibold ${
                        task.completed ? 'line-through text-[#5B6472]' : 'text-[#17284A]'
                      }`}
                    >
                      {task.topic}
                    </span>
                    <Badge variant="navy" size="sm">
                      {task.subject}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[#5B6472] mt-0.5">
                    Resource: {task.resource}
                  </p>
                </div>
              </div>

              {/* Time block */}
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#5B6472] shrink-0 bg-[#F5F6F9] px-2.5 py-1 rounded border border-[#E1E4EA]">
                <Clock className="w-3.5 h-3.5 text-[#C79A3D]" />
                <span>{task.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
