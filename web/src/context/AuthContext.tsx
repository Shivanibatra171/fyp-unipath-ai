import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, IntermediateBoard, IntermediateGroup } from '../types';

interface AuthContextType {
  user: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  login: (email: string, pass: string) => boolean;
  signup: (userData: Partial<UserProfile>) => boolean;
  logout: () => void;
}

const DEFAULT_USER: UserProfile = {
  name: 'Hamza Tariq',
  email: 'hamza.tariq@gmail.com',
  phone: '+92 300 5544892',
  city: 'Islamabad',
  intermediateBoard: 'Federal Board (FBISE Islamabad)',
  intermediateGroup: 'ICS (Physics)',
  matricMarks: 1018,
  matricTotal: 1100,
  fsc1Marks: 486,
  fsc1Total: 550,
  expectedTestScore: 155,
  maxBudgetPerSemester: 200000,
  targetMajor: 'BS Computer Science',
  preferredCities: ['Islamabad', 'Lahore', 'Karachi'],
  targetUniversities: ['NUST', 'FAST-NUCES', 'LUMS', 'GIKI'],
  isLoggedIn: true
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('unipath_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  useEffect(() => {
    localStorage.setItem('unipath_user', JSON.stringify(user));
  }, [user]);

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const login = (email: string, _pass: string) => {
    setUser((prev) => ({
      ...prev,
      email: email || prev.email,
      isLoggedIn: true
    }));
    return true;
  };

  const signup = (userData: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...userData,
      isLoggedIn: true
    }));
    return true;
  };

  const logout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false
    }));
  };

  return (
    <AuthContext.Provider value={{ user, updateProfile, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
