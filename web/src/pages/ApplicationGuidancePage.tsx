import React, { useState } from 'react';
import {
  FileCheck,
  Calendar,
  Phone,
  PlayCircle,
  Sparkles,
  Award,
  CheckCircle2,
  Building
} from 'lucide-react';
import { DocumentChecklist } from '../components/application/DocumentChecklist';
import { TimelineTracker } from '../components/application/TimelineTracker';
import { HelplineDirectory } from '../components/application/HelplineDirectory';
import { PortalTutorialModal } from '../components/application/PortalTutorialModal';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const ApplicationGuidancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('checklist');
  const [tutorialModalUni, setTutorialModalUni] = useState<string | null>(null);

  const tabs = [
    { id: 'checklist', label: 'Mandatory Document Checklist' },
    { id: 'timeline', label: '2026 Deadlines & Milestones' },
    { id: 'helpline', label: 'Admission Helplines Directory' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E4EA]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileCheck className="w-5 h-5 text-[#2F6B4F]" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#17284A]">
              Module 3: Application Support & Guidance
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6472]">
            Ensure all required Pakistani certificates are verified and stay on top of critical registration deadlines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="accent"
            size="sm"
            onClick={() => setTutorialModalUni('NUST & FAST-NUCES')}
            leftIcon={<PlayCircle className="w-4 h-4" />}
            className="font-semibold shadow-xs"
          >
            Watch Portal Tutorial Video
          </Button>
          <Badge variant="navy" size="md">
            Stage 3 of 4
          </Badge>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-4 shadow-xs">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab Panels */}
      {activeTab === 'checklist' && <DocumentChecklist />}
      {activeTab === 'timeline' && <TimelineTracker />}
      {activeTab === 'helpline' && <HelplineDirectory />}

      {tutorialModalUni && (
        <PortalTutorialModal
          universityName={tutorialModalUni}
          isOpen={!!tutorialModalUni}
          onClose={() => setTutorialModalUni(null)}
        />
      )}
    </div>
  );
};
