import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Building,
  MapPin,
  Award,
  Calendar,
  DollarSign,
  GraduationCap,
  FileCheck,
  Phone,
  Mail,
  ExternalLink,
  Bookmark,
  Scale,
  CheckCircle2,
  Info,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { UNIVERSITIES_DATA } from '../data/universitiesData';
import { useShortlist } from '../context/ShortlistContext';
import { Tabs } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CompareBar } from '../components/match/CompareBar';

export const UniversityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isShortlisted, toggleShortlist, isInCompare, toggleCompare } = useShortlist();

  const [activeTab, setActiveTab] = useState('programs');

  const university = UNIVERSITIES_DATA.find((u) => u.id === id) || UNIVERSITIES_DATA[0];

  const shortlisted = isShortlisted(university.id);
  const inCompare = isInCompare(university.id);

  const tabs = [
    { id: 'programs', label: `Offered Programs (${university.programs.length})` },
    { id: 'eligibility', label: 'Merit & Aggregate Formula' },
    { id: 'timeline', label: 'Admission Timeline & Deadlines' },
    { id: 'scholarships', label: `Scholarships (${university.scholarships.length})` },
    { id: 'campus', label: 'Campus & Facilities' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 pb-24">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-xs font-semibold text-[#17284A] hover:text-[#C79A3D] flex items-center gap-1 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Programs Catalog</span>
      </button>

      {/* University Banner Header */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[12px] bg-[#17284A] flex items-center justify-center shrink-0 shadow-xs">
              <span className="text-white text-sm font-bold leading-none text-center px-2">
                {university.shortName.slice(0, 4)}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={university.type === 'Public' ? 'navy' : 'gold'} size="sm">
                  {university.type}
                </Badge>
                <span className="text-xs text-[#5B6472]">
                  Est. {university.founded}
                </span>
                <span className="text-xs text-[#5B6472]">•</span>
                <span className="text-xs font-bold text-[#C79A3D]">
                  {university.hecRanking}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#17284A]">
                {university.name} ({university.shortName})
              </h1>

              <p className="text-xs sm:text-sm text-[#5B6472] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8E97A6]" />
                <span>
                  {university.city}, {university.province}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => toggleShortlist(university.id)}
              className={`px-3 py-2 rounded-[8px] text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                shortlisted
                  ? 'bg-[#17284A] text-white border-[#17284A]'
                  : 'bg-white text-[#17284A] border-[#CAD0DC] hover:bg-[#F5F6F9]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{shortlisted ? 'Shortlisted' : 'Shortlist'}</span>
            </button>

            <button
              onClick={() => toggleCompare(university.id)}
              className={`px-3 py-2 rounded-[8px] text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                inCompare
                  ? 'bg-[#C79A3D] text-[#17284A] border-[#C79A3D]'
                  : 'bg-white text-[#17284A] border-[#CAD0DC] hover:bg-[#F5F6F9]'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{inCompare ? 'Comparing' : 'Compare'}</span>
            </button>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/test-prep')}
              leftIcon={<BookOpen className="w-4 h-4" />}
            >
              Prepare for {university.acceptedTests[0]?.split(' ')[0]}
            </Button>
          </div>
        </div>

        {/* Overview Bio & Accreditations */}
        <p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed pt-4 border-t border-[#E1E4EA]">
          {university.overview}
        </p>

        {/* Accreditations Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-[#8E97A6] uppercase tracking-wider">
            Accreditations:
          </span>
          {university.accreditations.map((acc) => (
            <span
              key={acc}
              className="text-[11px] px-2.5 py-1 rounded bg-[#F0F4FA] text-[#17284A] border border-[#DEE6F2] font-semibold"
            >
              {acc}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-4 shadow-xs">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* TAB 1: PROGRAMS OFFERED */}
      {activeTab === 'programs' && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#17284A]">
            Accredited Undergraduate Degree Programs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {university.programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-[12px] border border-[#E1E4EA] p-5 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono text-[#8E97A6]">
                        {prog.code}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#17284A]">
                        {prog.name}
                      </h4>
                      <p className="text-xs text-[#5B6472]">{prog.faculty}</p>
                    </div>

                    <Badge variant="navy" size="sm">
                      {prog.degreeType} (4 Years)
                    </Badge>
                  </div>

                  {/* Fee & Seats */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAFBFD] p-3 rounded-[8px] border border-[#E1E4EA]">
                    <div>
                      <span className="text-[10px] text-[#8E97A6] uppercase font-bold block">
                        Semester Tuition Fee
                      </span>
                      <span className="font-bold text-[#17284A]">
                        PKR {prog.semesterFeePKR.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E97A6] uppercase font-bold block">
                        Annual Estimate
                      </span>
                      <span className="font-bold text-[#17284A]">
                        PKR {prog.annualFeePKR.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#5B6472] leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Career Prospects */}
                  <div>
                    <span className="text-[10px] text-[#8E97A6] font-bold uppercase block mb-1">
                      Career Outcomes:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {prog.careerProspects.map((cp) => (
                        <span
                          key={cp}
                          className="text-[10px] bg-[#F5F6F9] px-2 py-0.5 rounded text-[#17284A] border border-[#E1E4EA]"
                        >
                          {cp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E1E4EA] flex items-center justify-between text-xs text-[#5B6472]">
                  <span>
                    Closing Merit: <strong>{prog.lastYearClosingMeritPercent}%</strong>
                  </span>
                  <Badge variant="green" size="sm">
                    {prog.seats} Total Seats
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ELIGIBILITY & AGGREGATE */}
      {activeTab === 'eligibility' && (
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#17284A]">
              Undergraduate Merit Calculation Formula
            </h3>
            <p className="text-xs text-[#5B6472]">
              {university.meritFormulaExplanation}
            </p>
          </div>

          {/* Aggregate Weights Bar */}
          <div className="p-5 bg-[#FAFBFD] border border-[#DEE6F2] rounded-[10px] space-y-4">
            <h4 className="text-xs font-bold uppercase text-[#17284A] tracking-wider">
              Weightage Distribution Breakdown
            </h4>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white rounded-[8px] border border-[#E1E4EA]">
                <span className="font-serif text-3xl font-bold text-[#17284A] block">
                  {university.aggregateWeights.entryTest}%
                </span>
                <span className="text-xs font-semibold text-[#5B6472] mt-1 block">
                  Entrance Test Score
                </span>
              </div>

              <div className="p-4 bg-white rounded-[8px] border border-[#E1E4EA]">
                <span className="font-serif text-3xl font-bold text-[#C79A3D] block">
                  {university.aggregateWeights.fscHssc}%
                </span>
                <span className="text-xs font-semibold text-[#5B6472] mt-1 block">
                  FSc / HSSC-1 Marks
                </span>
              </div>

              <div className="p-4 bg-white rounded-[8px] border border-[#E1E4EA]">
                <span className="font-serif text-3xl font-bold text-[#2F6B4F] block">
                  {university.aggregateWeights.matricSsc}%
                </span>
                <span className="text-xs font-semibold text-[#5B6472] mt-1 block">
                  Matric / SSC Marks
                </span>
              </div>
            </div>
          </div>

          {/* Accepted Entry Tests */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-[#17284A] tracking-wider">
              Accepted Entrance Examinations
            </h4>
            <div className="space-y-2">
              {university.acceptedTests.map((test) => (
                <div
                  key={test}
                  className="p-3.5 rounded-[8px] bg-[#F5F6F9] border border-[#E1E4EA] text-xs font-semibold text-[#17284A] flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2F6B4F]" />
                  <span>{test}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TIMELINE & DEADLINES */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#17284A]">
              Official 2026 Admissions Calendar
            </h3>
            <p className="text-xs text-[#5B6472]">
              Track critical milestones, test windows, and merit list announcements.
            </p>
          </div>

          <div className="space-y-3">
            {university.timeline.map((item, idx) => (
              <div
                key={item.title}
                className="p-4 rounded-[8px] bg-[#FAFBFD] border border-[#E1E4EA] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#17284A] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#17284A]">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#5B6472]">{item.date}</p>
                  </div>
                </div>

                <Badge
                  variant={
                    item.status === 'Open'
                      ? 'green'
                      : item.status === 'Closed'
                      ? 'gray'
                      : 'gold'
                  }
                  size="sm"
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SCHOLARSHIPS */}
      {activeTab === 'scholarships' && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#17284A]">
            Financial Aid & National Scholarship Programs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {university.scholarships.map((sch) => (
              <div
                key={sch.id}
                className="bg-white rounded-[12px] border border-[#E1E4EA] p-5 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-base font-bold text-[#17284A]">
                      {sch.name}
                    </h4>
                    <Badge variant="green" size="sm">
                      {sch.type}
                    </Badge>
                  </div>

                  <div className="p-3 bg-[#EFF8F3] border border-[#BCE1CE] rounded-[8px] text-xs text-[#2F6B4F]">
                    <strong>Coverage: </strong>
                    <span>{sch.coverage}</span>
                  </div>

                  <p className="text-xs text-[#5B6472]">
                    <strong>Eligibility: </strong>
                    {sch.eligibility}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E1E4EA] flex items-center justify-between text-xs">
                  <span className="text-[#8E97A6]">
                    Deadline: <strong>{sch.applicationDeadline}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CAMPUS & FACILITIES */}
      {activeTab === 'campus' && (
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-6">
          <h3 className="font-serif text-lg font-bold text-[#17284A]">
            Campus Life, Hostels & Laboratory Infrastructure
          </h3>

          {/* Hostel Info Card */}
          <div className="p-4 bg-[#F5F6F9] border border-[#DEE6F2] rounded-[10px] space-y-2 text-xs">
            <h4 className="font-bold text-[#17284A] flex items-center gap-1.5">
              <Building className="w-4 h-4 text-[#C79A3D]" />
              Residential Hostel Accommodation
            </h4>
            <p className="text-[#5B6472]">{university.hostelDetails}</p>
          </div>

          {/* Facilities List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#17284A]">
              Key Infrastructure Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {university.facilities.map((fac) => (
                <div
                  key={fac}
                  className="p-3 rounded-[8px] bg-white border border-[#E1E4EA] text-xs font-medium text-[#17284A] flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] shrink-0" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Official Contact & Helpline Footer */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-4">
        <h4 className="font-serif text-base font-bold text-[#17284A]">
          Official Admission Office Helpline
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#17284A]" />
            <a href={`tel:${university.helpline.phone}`} className="font-semibold text-[#17284A]">
              {university.helpline.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#17284A]" />
            <a href={`mailto:${university.helpline.email}`} className="text-[#5B6472] truncate">
              {university.helpline.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-[#C79A3D]" />
            <a
              href={university.helpline.admissionsPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#C79A3D] font-bold hover:underline"
            >
              Admissions Portal
            </a>
          </div>
        </div>
      </div>

      <CompareBar />
    </div>
  );
};
