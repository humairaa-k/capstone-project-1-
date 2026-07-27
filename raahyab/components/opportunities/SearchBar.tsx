"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface OpportunitySearchBarProps {
  search: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ search, onSearch }: OpportunitySearchBarProps) {
  const [focused, setFocused] = useState(false);
  const t = useTranslations("opportunitiesPage");

  return (
    <div className="rounded-3xl border border-foreground/8 bg-primary/90 shadow-sm p-6 sm:p-8 mt-10">
      <div className=" mb-5 ">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
            {t("OpportunitySearch.title")}
        </h2>
      </div>

      <div
        className={`flex items-center gap-2 bg-background rounded-full px-3 py-2 border transition-all duration-300 border-foreground/10`}
      >
        <Search className="h-5 w-5 text-muted-foreground shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={t("OpportunitySearch.placeholder")}
          className="flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none py-1.2"
        />
        <button
          aria-label={t("OpportunitySearch.searchAria")}
          className="flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-gold-400 text-white hover:bg-primary/90 active:scale-95 transition-all duration-200"
        >
          <Search className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
}