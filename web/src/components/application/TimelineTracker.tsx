import React from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { UNIVERSITIES_DATA } from '../../data/universitiesData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const TimelineTracker: React.FC = () => {
  // Aggregate all milestones across launch universities
  const upcomingDeadlines = [
    {
      university: 'NUST Islamabad',
      test: 'NUST Entry Test (NET-3 Series)',
      date: 'April 15, 2026',
      daysLeft: 23,
      status: 'Open',
      action: 'Register at ugadmissions.nust.edu.pk'
    },
    {
      university: 'GIKI Topi',
      test: 'Undergraduate Online Application Form',
      date: 'June 18, 2026',
      daysLeft: 87,
      status: 'Open',
      action: 'Submit Online Dossier'
    },
    {
      university: 'FAST-NUCES',
      test: 'Fall 2026 NU Admission Portal',
      date: 'June 30, 2026',
      daysLeft: 99,
      status: 'Upcoming',
      action: 'Registrations Open May 15'
    },
    {
      university: 'UET Lahore',
      test: 'Combined Entry Test (ECAT Phase-2)',
      date: 'June 08, 2026',
      daysLeft: 77,
      status: 'Upcoming',
      action: 'Token Purchase from HBL'
    },
    {
      university: 'IBA Karachi',
      test: 'Round-2 Aptitude Written Exam',
      date: 'June 28, 2026',
      daysLeft: 97,
      status: 'Upcoming',
      action: 'Admit Card Issued Online'
    },
    {
      university: 'Punjab University (PUCIT)',
      test: 'PU Undergraduate Admission Entry Test',
      date: 'June 21, 2026',
      daysLeft: 90,
      status: 'Upcoming',
      action: 'Test Form Submission'
    }
  ];

  return (
    <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#17284A]" />
          <h3 className="font-serif text-lg font-bold text-[#17284A]">
            Upcoming Admission & Entry Test Deadlines (2026)
          </h3>
        </div>
        <Badge variant="gold" size="sm">
          National Academic Calendar
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingDeadlines.map((item) => (
          <div
            key={item.university + item.test}
            className="p-4 rounded-[10px] border border-[#E1E4EA] hover:border-[#CAD0DC] bg-[#FAFBFD] space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant={item.status === 'Open' ? 'green' : 'navy'} size="sm">
                  {item.status}
                </Badge>
                <span className="text-xs font-bold text-[#B5482F] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {item.daysLeft} Days Left
                </span>
              </div>

              <h4 className="font-serif text-sm font-bold text-[#17284A]">
                {item.university}
              </h4>
              <p className="text-xs font-medium text-[#5B6472] mt-0.5">
                {item.test}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E1E4EA] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#17284A]">{item.date}</span>
              <span className="text-[11px] text-[#C79A3D] font-medium">
                {item.action}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
