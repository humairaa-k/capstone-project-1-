"use client";

import { useState, useRef, useEffect } from "react";
import { Languages, Check } from "lucide-react";
import { useLanguage, Locale, localeNames } from "@/context/LanguageContext";

const options: Locale[] = ["en", "ps","fa"];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-9 h-9 rounded-xl border border-accent/20 bg-surface hover:bg-accent/10 flex items-center justify-center transition-all duration-200"
        aria-label="Change language"
      >
        <Languages className="w-4 h-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl border border-foreground/10 bg-card p-1.5 shadow-lg z-50">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setLocale(option);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
            >
              {localeNames[option]}
              {locale === option && <Check className="h-3.5 w-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}