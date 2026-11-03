import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { UNIVERSITIES_DATA } from '../../data/universitiesData';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0E1B33] text-white border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[8px] bg-[#C79A3D] flex items-center justify-center text-[#17284A]">
                <GraduationCap className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                UniPath <span className="text-[#C79A3D]">AI</span>
              </span>
            </div>
            <p className="text-xs text-[#CAD8EC] leading-relaxed max-w-sm">
              An institutional guidance and diagnostic test preparation portal dedicated to Pakistani Intermediate (FSc, ICS, I.Com, FA) and A-Level students seeking undergraduate admissions.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C79A3D]">
              <ShieldCheck className="w-4 h-4" />
              <span>Accreditation verified with HEC, PEC, and NCEAC</span>
            </div>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-white mb-2">
                Subscribe to Pakistani Admissions Bulletin
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 p-2.5 bg-[#2F6B4F]/30 border border-[#2F6B4F] rounded-[8px] text-xs text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#C79A3D]" />
                  <span>Subscribed! You will receive upcoming test deadline alerts.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter student / guardian email"
                    required
                    className="flex-1 bg-white/10 border border-white/20 rounded-[8px] px-3 py-2 text-xs text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#C79A3D]"
                  />
                  <button
                    type="submit"
                    className="bg-[#C79A3D] text-[#17284A] px-3.5 py-2 rounded-[8px] text-xs font-semibold hover:bg-[#A67C28] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 10 Launch Universities Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C79A3D] mb-3">
              Launch Universities
            </h4>
            <ul className="space-y-1.5 text-xs text-[#CAD8EC]">
              {UNIVERSITIES_DATA.slice(0, 5).map((uni) => (
                <li key={uni.id}>
                  <Link
                    to={`/university/${uni.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {uni.name} ({uni.shortName})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C79A3D] mb-3">
              More Institutions
            </h4>
            <ul className="space-y-1.5 text-xs text-[#CAD8EC]">
              {UNIVERSITIES_DATA.slice(5).map((uni) => (
                <li key={uni.id}>
                  <Link
                    to={`/university/${uni.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {uni.name} ({uni.shortName})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4-Module Journey Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C79A3D] mb-3">
              Admissions Modules
            </h4>
            <ul className="space-y-2 text-xs text-[#CAD8EC]">
              <li>
                <Link to="/discover" className="hover:text-white transition-colors">
                  1. Discover Your Interest
                </Link>
              </li>
              <li>
                <Link to="/match" className="hover:text-white transition-colors">
                  2. Program & University Finder
                </Link>
              </li>
              <li>
                <Link to="/guidance" className="hover:text-white transition-colors">
                  3. Application & Document Roadmap
                </Link>
              </li>
              <li>
                <Link to="/test-prep" className="hover:text-white transition-colors">
                  4. Diagnostic Test & Study Plan
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">
                  Side-by-Side Comparison Matrix
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Disclaimer */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#8E97A6] gap-4">
          <p>
            &copy; {new Date().getFullYear()} UniPath AI Pakistan. Academic Guidance & Admissions Preparation System.
          </p>
          <div className="flex items-center gap-6">
            <span>Federally Compliant Guidance</span>
            <span>HEC & PEC Reference Data</span>
            <span className="text-[#C79A3D]">Made for Pakistani Intermediate Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
