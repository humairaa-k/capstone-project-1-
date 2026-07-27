"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface SavedFiltersProps {
  search: string;
  filter: string;
  onSearch: (query: string) => void;
  onFilter: (type: string) => void;
  onSort: (type: string) => void;
  onClear: () => void;
  className?: string;
}

export default function SearchFilters({ search, onSearch, filter, onFilter, onSort, onClear, className = "" }: SavedFiltersProps) {
  const t = useTranslations("savedPage.searchFilters");
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const filterOptions = useMemo(() => [
    { label: t("filterOptions.all"), value: "All" },
    { label: t("filterOptions.job"), value: "Job" },
    { label: t("filterOptions.internship"), value: "Internship" },
    { label: t("filterOptions.scholarship"), value: "Scholarship" },
    { label: t("filterOptions.remoteWork"), value: "Remote Work" },
    { label: t("filterOptions.onlineCourse"), value: "Online Course" },
    { label: t("filterOptions.training"), value: "Training" },
    { label: t("filterOptions.volunteer"), value: "Volunteer" },
  ], [t]);

  const sortOptions = useMemo(() => [
    { label: t("sortOptions.newest"), value: "newest" },
    { label: t("sortOptions.az"), value: "a-z" },
    { label: t("sortOptions.deadline"), value: "deadline" },
  ],[t] );

  function handleFilter(value: string) {
    onFilter(value);
  }

  const checkActiveFilters = search.trim() !== "" || filter !== "All";

  return (
    <div className={`px-4 sm:px-6 lg:px-8 mt-6 space-y-3 pt-4 ${className}`}>
      <div className="mt-6 rounded-3xl bg-card border border-foreground/8 shadow-sm p-5">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-foreground">
            {t("heading")}
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex flex-1 min-w-0 items-center gap-3 rounded-2xl border border-foreground/10 bg-surface px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
            />

            {checkActiveFilters && (
              <button
                onClick={onClear}
                aria-label={t("clearAria")}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl shrink-0 border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-all duration-200"
              >
                <X className="h-3.5 w-3.5" />
                {t("clear")}
              </button>
            )}

            <button
              onClick={() => setShowFilters(!showFilters)}
              aria-label={t("filterAria")}
              className={`flex items-center gap-2 text-xs font-medium shrink-0 px-3 py-1.5 rounded-xl border transition-all duration-200
                ${showFilters
                  ? "border-primary/30 primary/10 dark:bg-primary/10 text-primary"
                  : "border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {t("filter")}
            </button>
          </div>

          {/* Sort Btn */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowSort(!showSort)}
              aria-label={t("sortAria")}
              className={`flex items-center gap-2 whitespace-nowrap text-sm font-medium px-4 py-3 rounded-2xl border transition-all duration-200
                ${showSort
                  ? "border-primary/30 bg-teal-100 dark:bg-teal-500/10 text-primary"
                  : "border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
            >
              <ArrowUpDown className="h-4 w-4" />
              <span className="hidden sm:inline">{t("sort")}</span>
            </button>

            {showSort && (
              <div className="absolute right-0 mt-2 w-36 max-w-[90vw] rounded-xl border border-foreground/10 bg-card shadow-lg overflow-hidden z-50">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onSort(opt.value);
                      setShowSort(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-muted"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="rounded-2xl px-3 py-3 mt-3 border-t border-foreground/8">
            <div className="flex flex-wrap gap-2 pt-3">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilter(option.value)}
                  aria-label={t("filterByAria", { option: option.label })}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200
                    ${filter === option.value
                      ? "bg-primary border-primary text-white"
                      : "border-foreground/10 text-muted-foreground hover:border-primary/30 hover:text-primary"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}