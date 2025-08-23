import { useState, useEffect } from 'react';

export type Language = 'en' | 'vi';

interface LanguageContext {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string | { en: string; vi: string }) => string;
}

export const useLanguage = (): LanguageContext => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vi')) {
      setLanguage(savedLanguage);
    } else {
      // Default to browser language or English
      const browserLang = navigator.language.split('-')[0];
      setLanguage(browserLang === 'vi' ? 'vi' : 'en');
    }
  }, []);

  // Save language preference to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (text: string | { en: string; vi: string }): string => {
    if (typeof text === 'string') {
      return text;
    }
    return text[language] || text.en || '';
  };

  return {
    language,
    setLanguage: handleSetLanguage,
    t
  };
}; 