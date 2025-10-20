"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLocale } from '@/lib/formatting';

interface LocaleContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  availableLocales: SupportedLocale[];
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const availableLocales: SupportedLocale[] = [
  'en-US',
  'tr-TR', 
  'de-DE',
  'fr-FR',
  'es-ES'
];

const localeNames: Record<SupportedLocale, string> = {
  'en-US': 'English (US)',
  'tr-TR': 'Türkçe (TR)',
  'de-DE': 'Deutsch (DE)',
  'fr-FR': 'Français (FR)',
  'es-ES': 'Español (ES)'
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<SupportedLocale>('en-US');

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('maglo-locale') as SupportedLocale;
    if (savedLocale && availableLocales.includes(savedLocale)) {
      setLocale(savedLocale);
    }
  }, []);

  const handleSetLocale = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
    localStorage.setItem('maglo-locale', newLocale);
  };

  return (
    <LocaleContext.Provider 
      value={{ 
        locale, 
        setLocale: handleSetLocale, 
        availableLocales 
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

export function getLocaleName(locale: SupportedLocale): string {
  return localeNames[locale];
}
