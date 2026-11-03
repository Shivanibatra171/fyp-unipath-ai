import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('hamza.tariq@gmail.com');
  const [password, setPassword] = useState('password123');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 py-12">
      <div className="w-full max-w-md bg-white rounded-[12px] border border-[#DEE6F2] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#17284A] text-white p-6 sm:p-8 text-center space-y-2">
          <div className="w-12 h-12 rounded-[8px] bg-[#C79A3D] text-[#17284A] flex items-center justify-center mx-auto shadow-sm">
            <GraduationCap className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h2 className="font-serif text-2xl font-bold">
            Sign In to UniPath AI
          </h2>
          <p className="text-xs text-[#CAD8EC]">
            Access your university matches, admission checklists & mock scores
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            leftElement={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            leftElement={<Lock className="w-4 h-4" />}
            required
          />

          <div className="flex items-center justify-between text-xs text-[#5B6472] pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#17284A] rounded" />
              <span>Remember this device</span>
            </label>
            <a href="#forgot" className="text-[#C79A3D] hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-semibold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Dashboard
            </Button>
          </div>

          {/* Demo account quick login helper */}
          <div className="p-3 bg-[#F0F4FA] border border-[#DEE6F2] rounded-[8px] text-[11px] text-[#17284A]">
            <p className="font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C79A3D]" />
              Demo Student Profile Pre-filled
            </p>
            <p className="text-[#5B6472] mt-0.5">
              Click &quot;Sign In&quot; to test the platform as Hamza Tariq (FBISE ICS 88%).
            </p>
          </div>

          <div className="text-center pt-2 border-t border-[#E1E4EA] text-xs text-[#5B6472]">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="text-[#C79A3D] font-bold hover:underline"
            >
              Sign Up for Free
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
