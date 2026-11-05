import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bookmark,
  Bell,
  BellOff,
  Trash2,
  Scale,
  ArrowRight,
  Sparkles,
  Download,
  Building,
  CheckCircle2
} from 'lucide-react';
import { useShortlist } from '../context/ShortlistContext';
import { UNIVERSITIES_DATA } from '../data/universitiesData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ShortlistPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    shortlistedUniversityIds,
    removeFromShortlist,
    toggleAlertPreference,
    isAlertActive,
    toggleCompare,
    isInCompare
  } = useShortlist();

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const shortlistedUnis = UNIVERSITIES_DATA.filter((u) =>
    shortlistedUniversityIds.includes(u.id)
  );

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E4EA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bookmark className="w-5 h-5 text-[#17284A]" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#17284A]">
              My Saved Shortlist & Admission Alerts
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6472]">
            Manage monitored Pakistani institutions and toggle real-time WhatsApp & Email admission opening notices.
          </p>
        </div>

        {shortlistedUnis.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              leftIcon={<Download className="w-4 h-4" />}
            >
              {downloadSuccess ? 'Shortlist Exported!' : 'Export Shortlist PDF'}
            </Button>
          </div>
        )}
      </div>

      {shortlistedUnis.length === 0 ? (
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-12 text-center space-y-4">
          <Bookmark className="w-12 h-12 text-[#8E97A6] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#17284A]">
            No Universities Shortlisted Yet
          </h3>
          <p className="text-xs text-[#5B6472] max-w-md mx-auto">
            Browse through our catalog of 10 premier launch universities and tap the bookmark icon to track admission schedules and fees.
          </p>
          <Button
            variant="accent"
            size="md"
            onClick={() => navigate('/match')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Programs & Universities
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shortlistedUnis.map((uni) => {
              const alertOn = isAlertActive(uni.id);
              const inCompare = isInCompare(uni.id);

              return (
                <div
                  key={uni.id}
                  className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-[8px] flex items-center justify-center shrink-0 shadow-xs" style={{ backgroundColor: uni.badgeAccent || '#17284A' }}>
                          <span className="text-white text-[10px] font-bold leading-none text-center px-1">
                            {uni.shortName.slice(0, 4)}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-[#C79A3D] uppercase">
                            {uni.shortName} • {uni.city}
                          </span>
                          <h3 className="font-serif text-base font-bold text-[#17284A] leading-snug">
                            {uni.name}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromShortlist(uni.id)}
                        className="text-[#8E97A6] hover:text-[#B5482F] p-1.5 rounded hover:bg-[#FDF2F0] transition-colors"
                        title="Remove from shortlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAFBFD] p-3 rounded-[8px] border border-[#E1E4EA]">
                      <div>
                        <span className="text-[10px] text-[#8E97A6] uppercase font-bold block">
                          Average Semester Fee
                        </span>
                        <span className="font-semibold text-[#17284A]">
                          {uni.averageSemesterFeeRange.split('/')[0]}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8E97A6] uppercase font-bold block">
                          Accepted Test
                        </span>
                        <span className="font-semibold text-[#17284A] truncate block">
                          {uni.acceptedTests[0]}
                        </span>
                      </div>
                    </div>

                    {/* Admission Alert Toggle Switch */}
                    <div className="mt-4 p-3 rounded-[8px] bg-[#F5F6F9] border border-[#DEE6F2] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {alertOn ? (
                          <Bell className="w-4 h-4 text-[#C79A3D]" />
                        ) : (
                          <BellOff className="w-4 h-4 text-[#8E97A6]" />
                        )}
                        <div>
                          <span className="text-xs font-semibold text-[#17284A] block">
                            Notify When Admissions Open
                          </span>
                          <span className="text-[10px] text-[#5B6472]">
                            {alertOn ? 'Active (SMS & Email alerts on)' : 'Muted'}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleAlertPreference(uni.id)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                          alertOn ? 'bg-[#17284A]' : 'bg-[#CAD0DC]'
                        }`}
                        aria-label="Toggle admission notification"
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            alertOn ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#E1E4EA] flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleCompare(uni.id)}
                      className={`text-xs px-3 py-1.5 rounded-[8px] font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                        inCompare
                          ? 'bg-[#C79A3D] text-[#17284A] border-[#C79A3D]'
                          : 'bg-white text-[#5B6472] border-[#E1E4EA] hover:bg-[#F5F6F9]'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{inCompare ? 'Comparing' : 'Compare'}</span>
                    </button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/university/${uni.id}`)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      className="text-xs font-semibold"
                    >
                      View University Prospectus
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
