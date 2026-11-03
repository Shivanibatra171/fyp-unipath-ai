import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, Award, ShieldCheck, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#17284A] via-[#12203C] to-[#0E1B33] text-white pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Decorative background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C79A3D 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Institutional Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-[#C79A3D]/40 text-xs text-[#E9CCA0] font-medium backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C79A3D]" />
            <span>Dedicated to Pakistani Intermediate & A-Level Students</span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Navigate Your Path to Pakistan’s{' '}
            <span className="text-[#C79A3D] italic underline decoration-[#C79A3D]/40 underline-offset-8">
              Top Universities
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#CAD8EC] leading-relaxed max-w-2xl mx-auto font-sans">
            Discover your academic strengths, calculate your merit aggregate, explore accredited undergraduate programs across 10 premier institutions, and prepare for entry tests with institutional precision.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate('/discover')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-lg"
            >
              Start Free Interest Profiler
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/match')}
              leftIcon={<Compass className="w-4 h-4" />}
              className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Explore 10 Launch Universities
            </Button>
          </div>

          {/* Quick Search / University Pills */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 text-xs text-[#DEE6F2]">
            <span className="text-white/60 font-medium">Quick Explore:</span>
            {['NUST', 'LUMS', 'FAST-NUCES', 'IBA Karachi', 'GIKI', 'QAU', 'UET Lahore'].map((uni) => (
              <button
                key={uni}
                onClick={() => navigate('/match')}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                {uni}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Stats Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-4 rounded-[12px] text-center">
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#C79A3D]">10 Premier</p>
            <p className="text-xs text-[#CAD8EC] mt-1">Accredited Launch Universities</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-4 rounded-[12px] text-center">
            <p className="font-serif text-2xl sm:text-3xl font-bold text-white">45+ Programs</p>
            <p className="text-xs text-[#CAD8EC] mt-1">CS, Engineering, Business & Law</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-4 rounded-[12px] text-center">
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#C79A3D]">100% Verified</p>
            <p className="text-xs text-[#CAD8EC] mt-1">Fee & Aggregate Formulas</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-4 rounded-[12px] text-center">
            <p className="font-serif text-2xl sm:text-3xl font-bold text-white">25 High-Yield</p>
            <p className="text-xs text-[#CAD8EC] mt-1">Diagnostic MCQ Bank</p>
          </div>
        </div>
      </div>
    </section>
  );
};
