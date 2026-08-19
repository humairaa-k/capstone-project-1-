"use client";

import { ChevronDown, X, MapPin, Briefcase, Clock, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/LanguageContext";

interface FilterSidebarProps {
  category: string[];
  onCategoryChange: (value: string[]) => void;
  location: string;
  onLocationChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  expiringSoon: boolean;
  onExpiringChange: (value: boolean) => void;
  availableCat: string[];
  availableLocations: string[];
  availableTypes: string[];
  onClearAll: () => void;
  variant?:  "sidebar" | "drawer";
}

export default function FiltersSidebar({
  category,
  onCategoryChange,
  location,
  onLocationChange,
  type,
  onTypeChange,
  expiringSoon,
  onExpiringChange,
  availableCat,
  availableLocations,
  availableTypes,
  onClearAll,
  variant = "sidebar",
}: FilterSidebarProps) {
  const t = useTranslations("opportunitiesPage.filters");
  const { dir } = useLanguage();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const handleCategoryToggle = (cat: string) => {
    if (category.includes(cat)) {
      onCategoryChange(category.filter((c) => c !== cat));
    } else {
      onCategoryChange([...category, cat]);
    }
  };

  const hasActiveFilters =
    category.length > 0 || location !== "All" || type !== "All" || expiringSoon;

  const activeCount =
    category.length + (location !== "All" ? 1 : 0) + (type !== "All" ? 1 : 0) + (expiringSoon ? 1 : 0);

  return (
    <div
      dir={dir}
      className={
        variant === "drawer" ?
        " w-full rounded-2xl" :
        "bg-card w-full sticky top-24 rounded-2xl border border-foreground/8 shadow-sm max-h-[calc(100vh-6rem)] mt-10 overflow-y-auto custom-scrollbar" 
      }
    >
  
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/8">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h2 className="lg:text-sm sm:text-[8px] font-semibold text-foreground ">{t("title")}</h2>
        </div>
        {activeCount > 0 && (
          <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
            {activeCount}
          </span>
        )}
      </div>

      <div className="p-4 space-y-1">
        {/* Category */}
        <div className="rounded-xl overflow-hidden">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/90 hover:bg-foreground/[0.04] transition-colors duration-200"
          >
            <span className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
              {t("category")}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCategoryOpen && (
            <div className="px-3 pb-2 pt-1 space-y-0.5">
              {availableCat.map((cat) => {
                const isChecked = category.includes(cat);
                return (
                  <label
                    key={cat}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-sm transition-colors duration-150 ${
                      isChecked
                        ? "bg-primary/8 text-primary font-medium"
                        : "text-foreground/70 hover:bg-foreground/[0.04]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCategoryToggle(cat)}
                      className="w-3.5 h-3.5 rounded accent-primary cursor-pointer shrink-0"
                    />
                    <span className="truncate">{cat}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <div className="h-px bg-foreground/8 mx-3 my-2" />

        {/* Location */}
        <div className="rounded-xl overflow-hidden">
          <button
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/90 hover:bg-foreground/[0.04] transition-colors duration-200"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              {t("location")}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
                isLocationOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isLocationOpen && (
            <div className="px-3 pb-2 pt-1">
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                  className="w-full appearance-none border border-foreground/10 rounded-lg pl-3 pr-9 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer transition-all duration-150"
                >
                  <option value="All">{t("allLocations")}</option>
                  {availableLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-foreground/8 mx-3 my-2" />

        {/* Job type */}
        <div className="px-3 py-2">
          <h3 className="flex items-center gap-2 text-sm font-medium text-foreground/90 mb-2 px-0">
            <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
            {t("jobType")}
          </h3>
          <div className="space-y-0.5">
            <label
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-sm transition-colors duration-150 ${
                type === "All"
                  ? "bg-primary/8 text-primary font-medium"
                  : "text-foreground/70 hover:bg-foreground/[0.04]"
              }`}
            >
              <input
                type="radio"
                name="type"
                checked={type === "All"}
                onChange={() => onTypeChange("All")}
                className="w-3.5 h-3.5 accent-primary cursor-pointer shrink-0"
              />
              {t("all")}
            </label>

            {availableTypes.map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-sm transition-colors duration-150 ${
                  type === opt
                    ? "bg-primary/8 text-primary font-medium"
                    : "text-foreground/70 hover:bg-foreground/[0.04]"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  checked={type === opt}
                  onChange={() => onTypeChange(opt)}
                  className="w-3.5 h-3.5 accent-primary cursor-pointer shrink-0"
                />
                <span className="truncate">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-foreground/8 mx-3 my-2" />

        {/* Deadline */}
        <div className="px-3 py-2">
          <h3 className="flex items-center gap-2 text-sm font-medium text-foreground/90 mb-2">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            {t("deadline")}
          </h3>
          <label
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-sm transition-colors duration-150 ${
              expiringSoon
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium"
                : "text-foreground/70 hover:bg-foreground/[0.04]"
            }`}
          >
            <input
              type="checkbox"
              checked={expiringSoon}
              onChange={() => onExpiringChange(!expiringSoon)}
              className="w-3.5 h-3.5 rounded accent-primary cursor-pointer shrink-0"
            />
            {t("expiringSoon")}
          </label>
        </div>
      </div>

      {/* Clear all */}
      {hasActiveFilters && (
        <div className="p-4 pt-2">
          <button
            onClick={onClearAll}
            className="group flex items-center justify-center gap-1.5 w-full text-sm font-medium text-muted-foreground border border-foreground/10 py-2.5 rounded-xl hover:text-red-500 hover:border-red-400/30 hover:bg-red-400/5 active:scale-[0.98] transition-all duration-200"
          >
            <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-200" />
            {t("clearAll")}
          </button>
        </div>
      )}
    </div>
  );
}