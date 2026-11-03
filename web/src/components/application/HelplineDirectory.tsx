import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, Clock, Search, ExternalLink, PlayCircle } from 'lucide-react';
import { UNIVERSITIES_DATA } from '../../data/universitiesData';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PortalTutorialModal } from './PortalTutorialModal';

export const HelplineDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTutorialUni, setSelectedTutorialUni] = useState<string | null>(null);

  const filtered = UNIVERSITIES_DATA.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#17284A]">
            Official Admissions Office & Helpline Directory
          </h3>
          <p className="text-xs text-[#5B6472] mt-0.5">
            Verified contact details, campus addresses, and online admission portal URLs for 10 Pakistani institutions.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8E97A6] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search university or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAFBFD] border border-[#CAD0DC] rounded-[8px] pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#17284A]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((uni) => (
          <div
            key={uni.id}
            className="bg-white rounded-[12px] border border-[#E1E4EA] p-5 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-white border border-[#E1E4EA] p-1 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={uni.logo}
                      alt={uni.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#C79A3D] uppercase">
                      {uni.shortName}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#17284A] leading-snug">
                      {uni.name}
                    </h4>
                  </div>
                </div>

                <Badge variant={uni.type === 'Public' ? 'navy' : 'gold'} size="sm">
                  {uni.type}
                </Badge>
              </div>

              {/* Contact Details List */}
              <div className="space-y-2.5 text-xs text-[#1B1F27] pt-2 border-t border-[#E1E4EA]">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#17284A] shrink-0" />
                  <a
                    href={`tel:${uni.helpline.phone}`}
                    className="font-semibold hover:text-[#C79A3D] transition-colors"
                  >
                    {uni.helpline.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#17284A] shrink-0" />
                  <a
                    href={`mailto:${uni.helpline.email}`}
                    className="text-[#5B6472] hover:text-[#17284A] transition-colors truncate"
                  >
                    {uni.helpline.email}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#17284A] shrink-0 mt-0.5" />
                  <span className="text-[#5B6472] leading-tight">
                    {uni.helpline.address}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C79A3D] shrink-0" />
                  <span className="text-[11px] text-[#5B6472]">
                    {uni.helpline.workingHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Portal Walkthrough Video & Direct Portal Link */}
            <div className="pt-3 border-t border-[#E1E4EA] flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedTutorialUni(uni.name)}
                className="text-xs font-semibold text-[#17284A] hover:text-[#C79A3D] flex items-center gap-1.5 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-[#C79A3D]" />
                <span>Portal Video Guide</span>
              </button>

              <a
                href={uni.helpline.admissionsPortalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17284A] bg-[#F0F4FA] hover:bg-[#DEE6F2] px-3 py-1.5 rounded-[8px] border border-[#DEE6F2] transition-colors"
              >
                <span>Online Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {selectedTutorialUni && (
        <PortalTutorialModal
          universityName={selectedTutorialUni}
          isOpen={!!selectedTutorialUni}
          onClose={() => setSelectedTutorialUni(null)}
        />
      )}
    </div>
  );
};
