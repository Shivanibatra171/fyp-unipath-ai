import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { JourneySection } from '../components/home/JourneySection';
import { UniversityShowcase } from '../components/home/UniversityShowcase';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-0">
      <HeroSection />
      <JourneySection />
      <UniversityShowcase />

      {/* Trust & Accreditation Banner */}
      <section className="py-16 bg-[#F5F6F9] border-t border-[#E1E4EA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#17284A] text-[#C79A3D] flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17284A]">
            Built with Institutional Integrity for Pakistani Students
          </h2>

          <p className="text-sm text-[#5B6472] max-w-2xl mx-auto leading-relaxed">
            Every formula, fee schedule, and test syllabus on UniPath AI is benchmarked against official HEC policies, PEC Washington Accord accreditations, and official university prospectuses.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate('/signup')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="font-bold shadow-md"
            >
              Create Free Student Account
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/match')}
            >
              Browse Programs Without Login
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
