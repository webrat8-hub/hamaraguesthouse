import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, UI_TRANSLATIONS } from './translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get saved language or fallback to default 'id' (Indonesian)
    const saved = localStorage.getItem('hamara_lang');
    if (saved === 'en' || saved === 'id' || saved === 'zh') {
      return saved as Language;
    }
    return 'id';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('hamara_lang', lang);
  };

  const t = (key: string): string => {
    const translations = UI_TRANSLATIONS[language] || UI_TRANSLATIONS['id'];
    return (translations as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
