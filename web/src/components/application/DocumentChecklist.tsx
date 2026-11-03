import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  Circle,
  UploadCloud,
  Download,
  AlertTriangle,
  Info,
  Check,
  Sparkles
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';

export const DocumentChecklist: React.FC = () => {
  const { checkedDocuments, toggleDocumentCheck } = useProgress();
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const documentItems = [
    {
      id: 'doc-matric-sanad',
      title: 'Matric / SSC Original Certificate & Marksheet',
      issuer: 'Respective BISE / FBISE / AKU-EB',
      description: 'Attested copy showing total marks, roll number, and date of birth.',
      requiredFor: 'All Universities (Mandatory)',
      critical: true
    },
    {
      id: 'doc-fsc1-dmc',
      title: 'Intermediate / HSSC Part-1 Detailed Marks Certificate (DMC)',
      issuer: 'Respective Board of Intermediate Education',
      description: 'Official board verified result card for FSc / ICS / I.Com Part-1.',
      requiredFor: 'All Universities (Used for Provisional Merit Aggregate)',
      critical: true
    },
    {
      id: 'doc-cnic-bform',
      title: 'Student CNIC or NADRA Smart B-Form',
      issuer: 'NADRA Pakistan',
      description: 'Valid National Identity Card or 13-digit Smart B-Form certificate.',
      requiredFor: 'All Universities & Entrance Test Centers',
      critical: true
    },
    {
      id: 'doc-domicile',
      title: 'Student & Father Domicile Certificate + PRC',
      issuer: 'District Deputy Commissioner (DC) Office',
      description: 'Mandatory for provincial quota seats (e.g. QAU, UET, Punjab University, Sukkur IBA).',
      requiredFor: 'Public University Quota & Scholarships',
      critical: false
    },
    {
      id: 'doc-photos',
      title: '8x Passport Size Color Photographs (Blue / White BG)',
      issuer: 'Professional Studio (Attested on Reverse)',
      description: 'Recent photographs matching the CNIC / B-Form biometric record.',
      requiredFor: 'Admit Card & Registration Dossier',
      critical: true
    },
    {
      id: 'doc-paid-challan',
      title: 'Paid Bank Admission Processing Fee Challan',
      issuer: 'Designated Commercial Bank (HBL, Askari, NBP, Meezan)',
      description: 'University stamped applicant copy or online 1Link transaction confirmation.',
      requiredFor: 'Final Portal Verification',
      critical: true
    },
    {
      id: 'doc-equivalence',
      title: 'IBCC Equivalence Certificate (O / A-Levels / Foreign)',
      issuer: 'Inter Board Coordination Commission (IBCC Islamabad / Regional)',
      description: 'Required if you completed Cambridge O/A-Levels or American High School Diploma.',
      requiredFor: 'Cambridge / Edexcel Applicants Only',
      critical: false
    }
  ];

  const checkedCount = Object.values(checkedDocuments).filter(Boolean).length;
  const totalCount = documentItems.length;
  const completionPercentage = Math.round((checkedCount / totalCount) * 100);

  const handleSimulatedDocUpload = (docId: string) => {
    setActiveUploadId(docId);
    setTimeout(() => {
      if (!checkedDocuments[docId]) {
        toggleDocumentCheck(docId);
      }
      setActiveUploadId(null);
    }, 800);
  };

  const handleDownloadChecklist = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Progress Header Card */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#17284A]" />
              <h3 className="font-serif text-xl font-bold text-[#17284A]">
                Mandatory Pakistani Admission Document Dossier
              </h3>
            </div>
            <p className="text-xs text-[#5B6472]">
              Track and verify all mandatory certificates required for entrance test registrations and university admissions in Pakistan.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadChecklist}
              leftIcon={<Download className="w-4 h-4" />}
            >
              {downloadSuccess ? 'Downloaded Checklist!' : 'Download PDF Checklist'}
            </Button>
          </div>
        </div>

        {/* Progress Bar Strip */}
        <div className="mt-5 pt-4 border-t border-[#E1E4EA]">
          <ProgressBar
            value={completionPercentage}
            label={`Document Readiness: ${checkedCount} of ${totalCount} Verified`}
            showValueLabel
            variant={completionPercentage === 100 ? 'green' : 'navy'}
            size="md"
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] shadow-xs divide-y divide-[#E1E4EA] overflow-hidden">
        {documentItems.map((item) => {
          const isChecked = !!checkedDocuments[item.id];
          const isUploading = activeUploadId === item.id;

          return (
            <div
              key={item.id}
              className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                isChecked ? 'bg-[#FAFBFD]' : 'bg-white hover:bg-[#F5F6F9]/50'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <button
                  onClick={() => toggleDocumentCheck(item.id)}
                  className={`mt-0.5 w-6 h-6 rounded-[6px] flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    isChecked
                      ? 'bg-[#2F6B4F] text-white'
                      : 'border-2 border-[#CAD0DC] bg-white hover:border-[#17284A]'
                  }`}
                  aria-label={`Toggle ${item.title}`}
                >
                  {isChecked ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span className="w-2 h-2" />
                  )}
                </button>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4
                      className={`text-sm font-semibold ${
                        isChecked ? 'line-through text-[#5B6472]' : 'text-[#17284A]'
                      }`}
                    >
                      {item.title}
                    </h4>
                    {item.critical && (
                      <Badge variant="red" size="sm">
                        Mandatory
                      </Badge>
                    )}
                    <span className="text-[11px] text-[#5B6472] bg-[#F0F4FA] px-2 py-0.5 rounded">
                      {item.issuer}
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6472]">{item.description}</p>
                  <p className="text-[11px] text-[#C79A3D] font-medium">
                    Applicable to: {item.requiredFor}
                  </p>
                </div>
              </div>

              {/* Upload Mock Simulator */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={() => handleSimulatedDocUpload(item.id)}
                  />
                  <div
                    className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                      isChecked
                        ? 'bg-[#EFF8F3] text-[#2F6B4F] border-[#BCE1CE]'
                        : 'bg-white text-[#17284A] border-[#CAD0DC] hover:bg-[#F0F4FA]'
                    }`}
                  >
                    {isUploading ? (
                      <span>Uploading...</span>
                    ) : isChecked ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6B4F]" />
                        <span>Document Uploaded</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-3.5 h-3.5 text-[#5B6472]" />
                        <span>Upload Copy</span>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* Attestation Advisory Alert */}
      <div className="bg-[#FDF7EC] border border-[#E9CCA0] rounded-[12px] p-5 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#C79A3D] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#8C661D]">
          <h4 className="font-bold text-[#17284A]">
            Official Attestation Guidelines for Pakistani Universities
          </h4>
          <p className="leading-relaxed">
            All photocopies must be attested by a Grade-17 or above Government Gazetted Officer / Principal before submission. For O/A-Level students, obtain an equivalence certificate from the Inter Board Coordination Commission (IBCC) at least 3 weeks before deadlines.
          </p>
        </div>
      </div>
    </div>
  );
};
