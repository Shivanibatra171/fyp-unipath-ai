import React, { useState } from 'react';
import {
  User,
  Settings,
  Bell,
  CheckCircle2,
  Save,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { IntermediateBoard, IntermediateGroup } from '../types';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Toast } from '../components/ui/Toast';

export const ProfileSettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    intermediateBoard: user.intermediateBoard,
    intermediateGroup: user.intermediateGroup,
    matricMarks: user.matricMarks,
    matricTotal: user.matricTotal,
    fsc1Marks: user.fsc1Marks,
    fsc1Total: user.fsc1Total,
    expectedTestScore: user.expectedTestScore,
    maxBudgetPerSemester: user.maxBudgetPerSemester,
    targetMajor: user.targetMajor
  });

  const [notificationSettings, setNotificationSettings] = useState({
    admissionAlerts: true,
    testDeadlines: true,
    scholarships: true,
    whatsappDigest: true
  });

  const [showToast, setShowToast] = useState(false);

  const boards: IntermediateBoard[] = [
    'Federal Board (FBISE Islamabad)',
    'BISE Lahore',
    'BISE Rawalpindi',
    'BISE Karachi (BIEK)',
    'BISE Faisalabad',
    'BISE Multan',
    'BISE Gujranwala',
    'BISE Peshawar',
    'BISE Quetta',
    'Aga Khan University Examination Board (AKU-EB)',
    'Cambridge Assessment International Education (CAIE / Edexcel)'
  ];

  const groups: IntermediateGroup[] = [
    'Pre-Engineering',
    'Pre-Medical',
    'ICS (Physics)',
    'ICS (Stats)',
    'ICS (Economics)',
    'I.Com',
    'General Science',
    'Humanities/FA',
    'A-Levels (Pre-Eng)',
    'A-Levels (Pre-Med)',
    'A-Levels (CompSci)'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setShowToast(true);
  };

  const toggleNotif = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6 pb-20">
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50">
          <Toast
            id="profile-save-toast"
            type="success"
            title="Profile & Academic Record Updated"
            message="Your eligibility preferences and notification alerts have been saved."
            onClose={() => setShowToast(false)}
          />
        </div>
      )}

      {/* Header */}
      <div className="pb-4 border-b border-[#E1E4EA] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-5 h-5 text-[#17284A]" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#17284A]">
              Student Profile & Academic Record
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6472]">
            Manage personal credentials, Intermediate board marks, and admission notification preferences.
          </p>
        </div>

        <Badge variant="navy" size="md">
          {formData.intermediateGroup}
        </Badge>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details Card */}
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-[#17284A] flex items-center gap-2">
            <User className="w-4 h-4 text-[#17284A]" />
            Personal & Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Student Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Phone / WhatsApp (for Admission SMS)"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Input
              label="City of Residence"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
        </div>

        {/* Academic Records Card */}
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-[#17284A] flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#C79A3D]" />
            Intermediate & Matriculation Records
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Intermediate Examination Board"
              value={formData.intermediateBoard}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  intermediateBoard: e.target.value as IntermediateBoard
                })
              }
            >
              {boards.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>

            <Select
              label="Intermediate Academic Group"
              value={formData.intermediateGroup}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  intermediateGroup: e.target.value as IntermediateGroup
                })
              }
            >
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <Input
              label="Matric Marks Obtained"
              type="number"
              value={formData.matricMarks}
              onChange={(e) =>
                setFormData({ ...formData, matricMarks: Number(e.target.value) })
              }
              helperText={`Total: ${formData.matricTotal} marks`}
            />

            <Input
              label="FSc Part-1 Marks Obtained"
              type="number"
              value={formData.fsc1Marks}
              onChange={(e) =>
                setFormData({ ...formData, fsc1Marks: Number(e.target.value) })
              }
              helperText={`Total: ${formData.fsc1Total} marks`}
            />

            <Input
              label="Target Major / Degree"
              value={formData.targetMajor}
              onChange={(e) =>
                setFormData({ ...formData, targetMajor: e.target.value })
              }
            />

            <Input
              label="Max Budget / Semester (PKR)"
              type="number"
              value={formData.maxBudgetPerSemester}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxBudgetPerSemester: Number(e.target.value)
                })
              }
            />
          </div>
        </div>

        {/* Notification Preferences Toggle List */}
        <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-[#17284A] flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#2F6B4F]" />
            Admission Notification Preferences
          </h3>

          <div className="space-y-3 divide-y divide-[#E1E4EA]">
            {/* Toggle 1 */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#17284A] block">
                  University Admission Openings (SMS & Email)
                </span>
                <span className="text-[11px] text-[#5B6472]">
                  Receive immediate alerts when NUST, FAST, LUMS, or IBA open registrations.
                </span>
              </div>
              <button
                type="button"
                onClick={() => toggleNotif('admissionAlerts')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  notificationSettings.admissionAlerts ? 'bg-[#17284A]' : 'bg-[#CAD0DC]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    notificationSettings.admissionAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="pt-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#17284A] block">
                  Entry Test Deadlines & Hall Ticket Reminders
                </span>
                <span className="text-[11px] text-[#5B6472]">
                  Get 7-day and 24-hour countdown reminders for NET, ECAT, and NAT test slots.
                </span>
              </div>
              <button
                type="button"
                onClick={() => toggleNotif('testDeadlines')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  notificationSettings.testDeadlines ? 'bg-[#17284A]' : 'bg-[#CAD0DC]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    notificationSettings.testDeadlines ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="pt-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#17284A] block">
                  National Scholarship Announcements (HEC, NOP, NTHP, Ehsaas)
                </span>
                <span className="text-[11px] text-[#5B6472]">
                  Be notified whenever full-ride or need-based scholarship applications open.
                </span>
              </div>
              <button
                type="button"
                onClick={() => toggleNotif('scholarships')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  notificationSettings.scholarships ? 'bg-[#17284A]' : 'bg-[#CAD0DC]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    notificationSettings.scholarships ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 4 */}
            <div className="pt-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#17284A] block">
                  WhatsApp Weekly Admissions Digest
                </span>
                <span className="text-[11px] text-[#5B6472]">
                  A curated Saturday summary of all active Pakistani university admissions.
                </span>
              </div>
              <button
                type="button"
                onClick={() => toggleNotif('whatsappDigest')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  notificationSettings.whatsappDigest ? 'bg-[#17284A]' : 'bg-[#CAD0DC]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    notificationSettings.whatsappDigest ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="accent"
            size="lg"
            leftIcon={<Save className="w-4 h-4" />}
            className="font-bold shadow-xs"
          >
            Save Academic Profile & Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
