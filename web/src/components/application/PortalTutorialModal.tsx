import React, { useState } from 'react';
import { Play, CheckCircle2, FileText, Info, ExternalLink } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface PortalTutorialModalProps {
  universityName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PortalTutorialModal: React.FC<PortalTutorialModalProps> = ({
  universityName,
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    { time: '00:45', title: 'Account Registration & CNIC Verification' },
    { time: '02:15', title: 'Entering Matric & FSc-1 Marks with Roll Number' },
    { time: '04:30', title: 'Selecting Desired Degree Programs in Priority Order' },
    { time: '06:10', title: 'Uploading Scanned DMC & Passport Photo Specs' },
    { time: '08:00', title: 'Generating 1Link / HBL Fee Challan & Confirmation' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Online Admissions Portal Walkthrough: ${universityName}`}
      subtitle="Comprehensive video guide explaining the step-by-step application submission"
      maxWidth="2xl"
    >
      <div className="space-y-5">
        {/* Mock Video Player Canvas */}
        <div className="relative aspect-video bg-[#0E1B33] rounded-[10px] overflow-hidden flex flex-col items-center justify-center text-white border border-[#17284A]">
          {!isPlaying ? (
            <div className="text-center p-6 space-y-3">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 rounded-full bg-[#C79A3D] text-[#17284A] flex items-center justify-center mx-auto hover:scale-110 transition-transform shadow-lg cursor-pointer"
                aria-label="Play video tutorial"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <h4 className="font-serif text-lg font-bold text-white">
                How to Complete {universityName} Online Application (2026 Batch)
              </h4>
              <p className="text-xs text-[#CAD8EC]">
                Duration: 09 mins 45 secs • HD Step-by-Step Screen Recording
              </p>
            </div>
          ) : (
            <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between text-xs text-white/80">
                <Badge variant="green" size="sm">
                  Playing Video Tutorial
                </Badge>
                <span>02:45 / 09:45</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-white">
                  Demonstrating document upload and fee challan generation...
                </p>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#C79A3D] h-full w-[35%]" />
              </div>
            </div>
          )}
        </div>

        {/* Video Key Timestamps & Steps */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#17284A]">
            Key Timestamps & Application Milestones
          </h4>
          <div className="space-y-2">
            {steps.map((st) => (
              <div
                key={st.time}
                className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#F5F6F9] border border-[#E1E4EA] text-xs"
              >
                <span className="font-medium text-[#17284A]">{st.title}</span>
                <span className="font-mono font-bold text-[#C79A3D] bg-white px-2 py-0.5 rounded border border-[#DEE6F2]">
                  {st.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Advice Notice */}
        <div className="p-3.5 bg-[#EFF8F3] border border-[#BCE1CE] rounded-[8px] flex items-start gap-2.5 text-xs text-[#2F6B4F]">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            Always verify that your name and father’s name spelling matches your Matriculation Sanad exactly to avoid registration discrepancies.
          </p>
        </div>
      </div>
    </Modal>
  );
};
