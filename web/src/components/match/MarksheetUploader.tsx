import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, Sparkles, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface MarksheetUploaderProps {
  onApplyExtractedMarks: (fscMarks: number, matricMarks: number) => void;
}

export const MarksheetUploader: React.FC<MarksheetUploaderProps> = ({
  onApplyExtractedMarks
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    fileName: string;
    board: string;
    studentName: string;
    rollNo: string;
    fscPart1Total: number;
    fscPart1Max: number;
    matricTotal: number;
    matricMax: number;
    subjects: { name: string; marks: number; max: number }[];
  } | null>(null);

  const [applied, setApplied] = useState(false);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setApplied(false);

    // Simulate OCR processing time
    setTimeout(() => {
      setIsScanning(false);
      setExtractedData({
        fileName: file.name,
        board: 'Federal Board of Intermediate & Secondary Education (FBISE)',
        studentName: 'Hamza Tariq',
        rollNo: '2491084',
        fscPart1Total: 494,
        fscPart1Max: 550,
        matricTotal: 1024,
        matricMax: 1100,
        subjects: [
          { name: 'Mathematics (Part-I)', marks: 98, max: 100 },
          { name: 'Physics (Theory & Practical)', marks: 92, max: 100 },
          { name: 'Computer Science (Theory & Lab)', marks: 95, max: 100 },
          { name: 'English Compulsory', marks: 86, max: 100 },
          { name: 'Urdu Compulsory', marks: 78, max: 100 },
          { name: 'Islamic Education', marks: 45, max: 50 }
        ]
      });
    }, 1200);
  };

  const handleApply = () => {
    if (extractedData) {
      onApplyExtractedMarks(extractedData.fscPart1Total, extractedData.matricTotal);
      setApplied(true);
    }
  };

  return (
    <div className="bg-white rounded-[12px] border border-[#DEE6F2] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[6px] bg-[#F0F4FA] text-[#17284A] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#C79A3D]" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-[#17284A]">
              Automated Marksheet Scanner (OCR)
            </h4>
            <p className="text-[11px] text-[#5B6472]">
              Upload FSc / Matric DMC to automatically extract verified scores
            </p>
          </div>
        </div>

        <Badge variant="navy" size="sm">
          Supports FBISE, BISE Lahore, BIEK & O/A-Levels
        </Badge>
      </div>

      {!extractedData && !isScanning && (
        <label className="border-2 border-dashed border-[#CAD0DC] hover:border-[#17284A] rounded-[10px] p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-[#FAFBFD] hover:bg-[#F0F4FA] transition-all">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleSimulateUpload}
            className="hidden"
          />
          <UploadCloud className="w-8 h-8 text-[#17284A] mb-2" />
          <p className="text-xs font-semibold text-[#17284A]">
            Click or drag & drop Marksheet / DMC document
          </p>
          <p className="text-[10px] text-[#5B6472] mt-0.5">
            PNG, JPG, or PDF (Max 5MB)
          </p>
        </label>
      )}

      {isScanning && (
        <div className="border border-[#DEE6F2] bg-[#FAFBFD] rounded-[10px] p-6 flex flex-col items-center justify-center text-center space-y-3">
          <RefreshCw className="w-7 h-7 text-[#C79A3D] animate-spin" />
          <div>
            <p className="text-xs font-bold text-[#17284A]">
              Scanning Official Board Seal & Transcripts...
            </p>
            <p className="text-[11px] text-[#5B6472] mt-0.5">
              Parsing subject scores and calculating verified aggregate
            </p>
          </div>
        </div>
      )}

      {extractedData && (
        <div className="border border-[#BCE1CE] bg-[#EFF8F3]/50 rounded-[10px] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2F6B4F]" />
              <span className="text-xs font-bold text-[#17284A]">
                Extracted: {extractedData.board}
              </span>
            </div>
            <span className="text-[11px] text-[#5B6472]">
              File: {extractedData.fileName}
            </span>
          </div>

          {/* Subject Breakdown Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-[#BCE1CE]/60">
            {extractedData.subjects.map((sub) => (
              <div
                key={sub.name}
                className="bg-white p-2 rounded-[6px] border border-[#DEE6F2] text-[11px]"
              >
                <span className="text-[#5B6472] block truncate">{sub.name}</span>
                <span className="font-bold text-[#17284A]">
                  {sub.marks} / {sub.max}
                </span>
              </div>
            ))}
          </div>

          {/* Summary & Apply CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-[#BCE1CE]/60 gap-3">
            <div className="text-xs">
              <span className="text-[#5B6472]">Extracted FSc-1 Score: </span>
              <strong className="text-[#17284A]">
                {extractedData.fscPart1Total} / {extractedData.fscPart1Max} (
                {Math.round((extractedData.fscPart1Total / extractedData.fscPart1Max) * 100)}
                %)
              </strong>
            </div>

            <div className="flex items-center gap-2">
              {applied ? (
                <span className="text-xs font-bold text-[#2F6B4F] flex items-center gap-1">
                  <Check className="w-4 h-4" /> Filter Scores Updated!
                </span>
              ) : (
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleApply}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Apply to Merit Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
