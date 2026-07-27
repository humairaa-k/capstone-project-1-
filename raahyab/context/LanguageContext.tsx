"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { NextIntlClientProvider } from "next-intl";
import en from "@/messages/en.json";
import fa from "@/messages/fa.json";
import ps from "@/messages/ps.json";
import { useRouter } from "next/navigation";

export type Locale = "en" | "fa" | "ps";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fa: "دری",
  ps: "پښتو",
};

const rtlLocales: Locale[] = ["fa", "ps"];

const messagesByLocale: Record<Locale, typeof en> = { en, fa, ps };

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextValue | undefined>( undefined);

const STORAGE_KEY = "raahyab-locale";
const COOKIE_KEY = "locale";

function setCookie(value: string) {
  document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && (saved === "en" || saved === "fa" || saved === "ps")) {
      setLocaleState(saved);
      setCookie(saved); 
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = rtlLocales.includes(locale) ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
     setCookie(next);
     router.refresh();
  };

  const dir: "rtl" | "ltr" = rtlLocales.includes(locale) ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dir }}>
      <NextIntlClientProvider
        locale={locale}
        messages={messagesByLocale[locale]}
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}