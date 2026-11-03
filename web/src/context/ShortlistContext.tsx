import React, { createContext, useContext, useState, useEffect } from 'react';

interface ShortlistContextType {
  shortlistedUniversityIds: string[];
  compareUniversityIds: string[];
  alertPreferences: Record<string, boolean>;
  addToShortlist: (id: string) => void;
  removeFromShortlist: (id: string) => void;
  toggleShortlist: (id: string) => void;
  isShortlisted: (id: string) => boolean;
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  toggleCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  toggleAlertPreference: (id: string) => void;
  isAlertActive: (id: string) => boolean;
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export const ShortlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shortlistedUniversityIds, setShortlistedUniversityIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('unipath_shortlist');
    return saved ? JSON.parse(saved) : ['nust', 'fast-nuces', 'lums'];
  });

  const [compareUniversityIds, setCompareUniversityIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('unipath_compare');
    return saved ? JSON.parse(saved) : ['nust', 'fast-nuces', 'giki'];
  });

  const [alertPreferences, setAlertPreferences] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('unipath_alerts');
    return saved ? JSON.parse(saved) : { nust: true, 'fast-nuces': true, lums: true, 'iba-karachi': false };
  });

  useEffect(() => {
    localStorage.setItem('unipath_shortlist', JSON.stringify(shortlistedUniversityIds));
  }, [shortlistedUniversityIds]);

  useEffect(() => {
    localStorage.setItem('unipath_compare', JSON.stringify(compareUniversityIds));
  }, [compareUniversityIds]);

  useEffect(() => {
    localStorage.setItem('unipath_alerts', JSON.stringify(alertPreferences));
  }, [alertPreferences]);

  const addToShortlist = (id: string) => {
    setShortlistedUniversityIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromShortlist = (id: string) => {
    setShortlistedUniversityIds((prev) => prev.filter((item) => item !== id));
  };

  const toggleShortlist = (id: string) => {
    if (shortlistedUniversityIds.includes(id)) {
      removeFromShortlist(id);
    } else {
      addToShortlist(id);
    }
  };

  const isShortlisted = (id: string) => shortlistedUniversityIds.includes(id);

  const addToCompare = (id: string): boolean => {
    if (compareUniversityIds.includes(id)) return true;
    if (compareUniversityIds.length >= 3) {
      return false; // Max 3
    }
    setCompareUniversityIds((prev) => [...prev, id]);
    return true;
  };

  const removeFromCompare = (id: string) => {
    setCompareUniversityIds((prev) => prev.filter((item) => item !== id));
  };

  const toggleCompare = (id: string) => {
    if (compareUniversityIds.includes(id)) {
      removeFromCompare(id);
    } else {
      addToCompare(id);
    }
  };

  const isInCompare = (id: string) => compareUniversityIds.includes(id);

  const clearCompare = () => setCompareUniversityIds([]);

  const toggleAlertPreference = (id: string) => {
    setAlertPreferences((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isAlertActive = (id: string) => !!alertPreferences[id];

  return (
    <ShortlistContext.Provider
      value={{
        shortlistedUniversityIds,
        compareUniversityIds,
        alertPreferences,
        addToShortlist,
        removeFromShortlist,
        toggleShortlist,
        isShortlisted,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
        toggleAlertPreference,
        isAlertActive
      }}
    >
      {children}
    </ShortlistContext.Provider>
  );
};

export const useShortlist = () => {
  const context = useContext(ShortlistContext);
  if (!context) {
    throw new Error('useShortlist must be used within a ShortlistProvider');
  }
  return context;
};
