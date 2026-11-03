import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap, Mail, Lock, User, MapPin, ArrowRight,
  BookOpen, Target, Wallet, Percent, Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { IntermediateBoard, IntermediateGroup } from '../types';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  // Step management
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Islamabad');

  // Step 2 fields
  const [board, setBoard] = useState<IntermediateBoard>('Federal Board (FBISE Islamabad)');
  const [group, setGroup] = useState<IntermediateGroup>('ICS (Physics)');
  const [matricMarks, setMatricMarks] = useState(970);
  const [fscMarks, setFscMarks] = useState(485);
  const [expectedTestScore, setExpectedTestScore] = useState(155);
  const [budget, setBudget] = useState(200000);
  const [targetMajor, setTargetMajor] = useState('BS Computer Science');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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
    'BISE Hyderabad',
    'Aga Khan University Examination Board (AKU-EB)',
    'Cambridge Assessment International Education (CAIE / Edexcel)'
  ];

  const groups: IntermediateGroup[] = [
    'Pre-Engineering', 'Pre-Medical', 'ICS (Physics)', 'ICS (Stats)',
    'ICS (Economics)', 'I.Com', 'General Science', 'Humanities/FA',
    'A-Levels (Pre-Eng)', 'A-Levels (Pre-Med)', 'A-Levels (CompSci)'
  ];

  const targetMajors = [
    'BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence',
    'BS Data Science', 'BS Electrical Engineering', 'BS Mechanical Engineering',
    'BS Civil Engineering', 'BBA / Business Administration', 'BS Economics',
    'BS Accounting & Finance', 'BS Cyber Security', 'Pre-Med (MBBS pathway)',
    'Not decided yet'
  ];

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!password.trim()) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      signup({
        name,
        email,
        phone: '',
        city,
        intermediateBoard: board,
        intermediateGroup: group,
        matricMarks,
        matricTotal: 1100,
        fsc1Marks: fscMarks,
        fsc1Total: 550,
        expectedTestScore,
        maxBudgetPerSemester: budget,
        targetMajor,
        preferredCities: [city],
        isLoggedIn: true
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const fscPct = Math.round((fscMarks / 550) * 100);
  const matricPct = Math.round((matricMarks / 1100) * 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 py-12">
      <div className="w-full max-w-lg bg-white rounded-[12px] border border-[#DEE6F2] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#17284A] text-white p-6 sm:p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-[8px] bg-[#C79A3D] text-[#17284A] flex items-center justify-center mx-auto shadow-sm">
            <GraduationCap className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h2 className="font-serif text-2xl font-bold">Create Student Account</h2>
          <p className="text-xs text-[#CAD8EC]">
            Personalized admission matching for Pakistani Intermediate & A-Level students
          </p>
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${step === 1 ? 'bg-[#C79A3D] text-[#17284A]' : 'bg-white/20 text-white'}`}>
              <span>1</span> <span>Account Info</span>
            </div>
            <div className="w-6 h-px bg-white/30" />
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${step === 2 ? 'bg-[#C79A3D] text-[#17284A]' : 'bg-white/20 text-white'}`}>
              <span>2</span> <span>Academic Profile</span>
            </div>
          </div>
        </div>

        {/* Step 1: Basic Account */}
        {step === 1 && (
          <form onSubmit={handleStep1Next} className="p-6 sm:p-8 space-y-4">
            <Input
              label="Full Student Name"
              placeholder="e.g. Ayesha Khan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              leftElement={<User className="w-4 h-4" />}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="student@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              leftElement={<Mail className="w-4 h-4" />}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="City of Residence"
                placeholder="e.g. Lahore"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                leftElement={<MapPin className="w-4 h-4" />}
              />
              <Input
                label="Create Password"
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                leftElement={<Lock className="w-4 h-4" />}
                required
              />
            </div>
            <div className="pt-2">
              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full font-bold shadow-xs"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Next: Academic Profile
              </Button>
            </div>
            <div className="text-center pt-2 border-t border-[#E1E4EA] text-xs text-[#5B6472]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#17284A] font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        )}

        {/* Step 2: Academic Profile */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Intermediate Board"
                value={board}
                onChange={(e) => setBoard(e.target.value as IntermediateBoard)}
              >
                {boards.map((b) => <option key={b} value={b}>{b}</option>)}
              </Select>
              <Select
                label="Academic Group / Stream"
                value={group}
                onChange={(e) => setGroup(e.target.value as IntermediateGroup)}
              >
                {groups.map((g) => <option key={g} value={g}>{g}</option>)}
              </Select>
            </div>

            {/* Matric Marks */}
            <div>
              <label className="text-xs font-semibold text-[#17284A] uppercase tracking-wide block mb-1.5">
                Matric / SSC Marks (out of 1100)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={400}
                  max={1100}
                  value={matricMarks}
                  onChange={(e) => setMatricMarks(Number(e.target.value))}
                  className="flex-1 bg-white text-sm text-[#1B1F27] rounded-[8px] border border-[#E1E4EA] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#17284A]"
                />
                <span className="text-xs font-bold text-[#17284A] bg-[#F0F4FA] px-3 py-2 rounded-[8px] border border-[#DEE6F2] shrink-0">
                  {matricPct}%
                </span>
              </div>
            </div>

            {/* FSc Marks */}
            <div>
              <label className="text-xs font-semibold text-[#17284A] uppercase tracking-wide block mb-1.5">
                FSc / HSSC Part-1 Marks (out of 550)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={200}
                  max={550}
                  value={fscMarks}
                  onChange={(e) => setFscMarks(Number(e.target.value))}
                  className="flex-1 bg-white text-sm text-[#1B1F27] rounded-[8px] border border-[#E1E4EA] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#17284A]"
                />
                <span className="text-xs font-bold text-[#17284A] bg-[#F0F4FA] px-3 py-2 rounded-[8px] border border-[#DEE6F2] shrink-0">
                  {fscPct}%
                </span>
              </div>
            </div>

            {/* Expected Test Score */}
            <div>
              <label className="text-xs font-semibold text-[#17284A] uppercase tracking-wide block mb-1.5">
                Expected Entry Test Score (NET / NU Test / GIKI — out of 200)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={50}
                  max={200}
                  step={1}
                  value={expectedTestScore}
                  onChange={(e) => setExpectedTestScore(Number(e.target.value))}
                  className="flex-1 accent-[#17284A] cursor-pointer"
                />
                <span className="text-xs font-bold text-[#17284A] bg-[#F0F4FA] px-3 py-2 rounded-[8px] border border-[#DEE6F2] shrink-0 min-w-[60px] text-center">
                  {expectedTestScore}/200
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-[#8E97A6] mt-0.5">
                <span>50 (Avg)</span><span>130 (Competitive)</span><span>180+ (Top Merit)</span>
              </div>
            </div>

            {/* Target Major */}
            <Select
              label="Target Degree / Major"
              value={targetMajor}
              onChange={(e) => setTargetMajor(e.target.value)}
            >
              {targetMajors.map((m) => <option key={m} value={m}>{m}</option>)}
            </Select>

            {/* Budget Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label className="font-semibold text-[#17284A] uppercase tracking-wide flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5 text-[#C79A3D]" /> Max Semester Budget
                </label>
                <span className="font-bold text-[#17284A] bg-[#FDF7EC] px-2.5 py-0.5 rounded-[6px] border border-[#E9CCA0]">
                  PKR {budget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={40000}
                max={600000}
                step={10000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[#17284A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8E97A6] mt-0.5">
                <span>PKR 40k (Public)</span><span>PKR 200k (Semi-Govt)</span><span>PKR 600k (Private)</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="font-bold"
                onClick={() => setStep(1)}
              >
                ← Back
              </Button>
              <Button
                type="submit"
                variant="accent"
                size="lg"
                isLoading={isLoading}
                className="flex-1 font-bold shadow-xs"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start Admission Journey
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
