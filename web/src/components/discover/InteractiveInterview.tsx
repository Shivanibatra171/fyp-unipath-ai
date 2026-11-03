import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Bot, User, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '../../data/interestData';
import { InterestProfileResult } from '../../types';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

interface InteractiveInterviewProps {
  selectedCategories: string[];
  onComplete: (profile: InterestProfileResult) => void;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  explanation?: string;
  options?: {
    id: string;
    label: string;
    archetypeWeights: Record<string, number>;
  }[];
}

export const InteractiveInterview: React.FC<InteractiveInterviewProps> = ({
  selectedCategories,
  onComplete,
  onBack
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [accumulatedScores, setAccumulatedScores] = useState<Record<string, number>>({
    'tech-computing': selectedCategories.includes('tech-computing') ? 4 : 0,
    'engineering-applied': selectedCategories.includes('engineering-applied') ? 4 : 0,
    'business-finance': selectedCategories.includes('business-finance') ? 4 : 0,
    'healthcare-bio': selectedCategories.includes('healthcare-bio') ? 4 : 0,
    'natural-sciences': selectedCategories.includes('natural-sciences') ? 4 : 0,
    'law-social': selectedCategories.includes('law-social') ? 4 : 0
  });

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize first AI question
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      const q1 = INTERVIEW_QUESTIONS[0];
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: `Assalam-o-Alaikum! I'm your UniPath AI Academic Counselor. Let's explore your academic passions through 4 focused questions to generate your institutional profile.`
        },
        {
          id: `q-${q1.id}`,
          sender: 'ai',
          text: q1.question,
          explanation: q1.explanation,
          options: q1.options
        }
      ]);
      setIsTyping(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSelectOption = (
    option: { id: string; label: string; archetypeWeights: Record<string, number> }
  ) => {
    // 1. Add user reply
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option.label
    };

    // Update weights
    const newScores = { ...accumulatedScores };
    Object.entries(option.archetypeWeights).forEach(([key, weight]) => {
      newScores[key] = (newScores[key] || 0) + weight;
    });
    setAccumulatedScores(newScores);

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const nextIndex = currentQuestionIndex + 1;

    setTimeout(() => {
      if (nextIndex < INTERVIEW_QUESTIONS.length) {
        const nextQ = INTERVIEW_QUESTIONS[nextIndex];
        setCurrentQuestionIndex(nextIndex);
        setMessages((prev) => [
          ...prev,
          {
            id: `q-${nextQ.id}`,
            sender: 'ai',
            text: nextQ.question,
            explanation: nextQ.explanation,
            options: nextQ.options
          }
        ]);
        setIsTyping(false);
      } else {
        // Complete interview & synthesize result
        generateFinalProfile(newScores);
      }
    }, 700);
  };

  const generateFinalProfile = (scores: Record<string, number>) => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topKey = sorted[0][0];

    const categoryNames: Record<string, string> = {
      'tech-computing': 'Technology & Computing',
      'engineering-applied': 'Engineering & Applied Sciences',
      'business-finance': 'Business, Economics & Finance',
      'healthcare-bio': 'Healthcare, Pharmacy & Bio-Sciences',
      'natural-sciences': 'Pure Sciences & Mathematics',
      'law-social': 'Law, Policy & Social Impact'
    };

    const totalScorePoints = sorted.reduce((sum, item) => sum + item[1], 0) || 1;

    const breakdown = sorted.slice(0, 4).map(([cat, score]) => ({
      category: categoryNames[cat] || cat,
      score,
      percentage: Math.min(98, Math.max(35, Math.round((score / totalScorePoints) * 100 * 2.8))),
      description: `High aptitude for ${categoryNames[cat] || cat} fundamentals.`
    }));

    const profile: InterestProfileResult = {
      primaryArchetype:
        topKey === 'tech-computing'
          ? 'System Architect & Software Innovator'
          : topKey === 'engineering-applied'
          ? 'Infrastructure & Hardware Engineer'
          : topKey === 'business-finance'
          ? 'Quantitative Strategist & Business Leader'
          : topKey === 'healthcare-bio'
          ? 'Biomedical & Clinical Researcher'
          : topKey === 'law-social'
          ? 'Legal Advocate & Policy Analyst'
          : 'Pure Science & Mathematical Analyst',
      secondaryArchetype: 'Analytical Problem Solver',
      matchScore: 94,
      topStreams:
        topKey === 'tech-computing'
          ? ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence']
          : topKey === 'engineering-applied'
          ? ['BE Electrical Engineering', 'BE Mechanical Engineering', 'BS Mechatronics']
          : topKey === 'business-finance'
          ? ['BBA (Hons)', 'BSc Accounting & Finance', 'BS Economics']
          : topKey === 'healthcare-bio'
          ? ['Pharm-D', 'BS Biotechnology', 'BS Bioinformatics']
          : ['BS Physics', 'BS Mathematics', 'BS Data Analytics'],
      breakdown,
      strengths: [
        'Algorithmic and logical structuring',
        'Complex abstract reasoning',
        'Autonomous debugging & persistence',
        'Mathematical formulation'
      ],
      recommendedDegrees: [
        'BS Computer Science',
        'BS Software Engineering',
        'BS Artificial Intelligence',
        'BS Data Science'
      ],
      recommendedUniversities: ['NUST', 'FAST-NUCES', 'LUMS', 'GIKI', 'COMSATS'],
      guidanceNote:
        'This profile serves as institutional academic guidance based on your responses. It represents an analytical match to assist in your degree selection, not a rigid constraint.'
    };

    onComplete(profile);
  };

  const progressPercent = Math.round(
    ((currentQuestionIndex + 1) / INTERVIEW_QUESTIONS.length) * 100
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header with Progress */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[8px] bg-[#17284A] text-white flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#17284A]">
              AI Academic Counselor Interview
            </h3>
            <p className="text-xs text-[#5B6472]">
              Question {Math.min(currentQuestionIndex + 1, INTERVIEW_QUESTIONS.length)} of{' '}
              {INTERVIEW_QUESTIONS.length}
            </p>
          </div>
        </div>

        <div className="w-40 hidden sm:block">
          <ProgressBar value={progressPercent} size="sm" variant="navy" />
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-[12px] border border-[#E1E4EA] p-6 shadow-xs min-h-[420px] flex flex-col justify-between space-y-6">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'ai'
                    ? 'bg-[#17284A] text-[#C79A3D]'
                    : 'bg-[#C79A3D] text-[#17284A]'
                }`}
              >
                {msg.sender === 'ai' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-[12px] p-4 text-xs leading-relaxed ${
                  msg.sender === 'ai'
                    ? 'bg-[#F5F6F9] border border-[#E1E4EA] text-[#1B1F27]'
                    : 'bg-[#17284A] text-white'
                }`}
              >
                <p className="font-medium">{msg.text}</p>
                {msg.explanation && (
                  <p className="text-[11px] text-[#5B6472] mt-2 pt-2 border-t border-[#E1E4EA]">
                    {msg.explanation}
                  </p>
                )}

                {/* Option Buttons if present on the latest AI message */}
                {msg.options && (
                  <div className="mt-3.5 space-y-2">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(opt)}
                        className="w-full text-left p-3 rounded-[8px] bg-white hover:bg-[#F0F4FA] border border-[#DEE6F2] hover:border-[#17284A] text-xs font-medium text-[#17284A] transition-all cursor-pointer shadow-xs flex items-center justify-between group"
                      >
                        <span>{opt.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8E97A6] group-hover:text-[#17284A] shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#17284A] text-[#C79A3D] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-[#F5F6F9] border border-[#E1E4EA] px-4 py-3 rounded-[12px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#8E97A6] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#8E97A6] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#8E97A6] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Bottom controls */}
        <div className="border-t border-[#E1E4EA] pt-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Back to Categories
          </Button>

          <span className="text-xs text-[#5B6472]">
            Answers are synthesized in real-time
          </span>
        </div>
      </div>
    </div>
  );
};
