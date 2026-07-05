"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

interface SavedFiltersProps {
  search: string;
  filter: string;
  onSearch: (query: string) => void;
  onFilter: (type: string) => void;
  onSort: (type: string) => void;
  onClear : () => void;
}

const filterOptions = ["All", "Job", "Internship", "Scholarship", "Remote Work", "Online Course", "Training", "Volunteer"];

export default function SearchFilters({search, onSearch, filter, onFilter, onSort, onClear }: SavedFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showSort, setShowSort] = useState(false);

    function handleFilter(option: string) {
     onFilter(option);
    }

   const checkActiveFilters = search.trim() !== "" || filter !== "All";

  return (
  <div className="px-4 sm:px-6 lg:px-8 mt-6 space-y-3 pt-4">
    <div
     className="mt-6 rounded-3xl border border-border/70 p-5"
     style={{ borderColor: "rgba(15,118,110,0.2)" }}
   >

    <div className="mb-5">
      <h3 className="text-lg font-semibold text-foreground">
        Search & Filter Your Saved Opportunities
      </h3>
    </div>

      {/* search bar + filter row */}
      <div className="flex items-center gap-3">
        <div
          className="flex flex-1 items-center gap-3 rounded-2xl border px-4 py-3"
          style={{ borderColor: "rgba(15,118,110,0.2)" }}
        >
          <Search className="h-4 w-4 text-muted-foreground shrink-0"/>
           <input
             type="text"
             placeholder="Search here..."
             value={search}
             onChange={(e) => onSearch(e.target.value)}
             className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
           />

            {checkActiveFilters  && (
             <button
               onClick={onClear}
               aria-label="Clear filters"
               style={{
                color:"#fca5a5",
                borderColor: "rgba(252,165,165,0.35)",
                backgroundColor: "rgba(252,165,165,0.08)",}}
               className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-200"
             >
               <X className="h-3.5 w-3.5 " />
               Clear
             </button>
           )}

           <button
           onClick={() => {setShowFilters(!showFilters)}}
           aria-label="Toggle filters"
            className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-xl border transition-all duration-200
              ${showFilters
                ? "border-primary/30 bg-teal-100 dark:bg-teal-500/10 text-primary"
                : "border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20"
              }`}
           >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
          </button>
        </div>

        {/* Sort Btn */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowSort(!showSort)}
            aria-label="Toggle sort"
            className={`flex items-center gap-2 text-sm font-medium px-4 py-3 rounded-2xl border transition-all duration-200
              ${showSort
                ? "border-primary/30 bg-teal-100 dark:bg-teal-500/10 text-primary"
                : "border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20"
              }`}
          >
            <ArrowUpDown className="h-4 w-4" />
            <span className="hidden sm:inline">Sort</span>
          </button>

          {showSort && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border/50 bg-background shadow-lg overflow-hidden z-50">
              {[
                { label: "Newest", value: "newest" },
                { label: "A - Z", value: "a-z" },
                { label: "Deadline", value: "deadline" },
               ].map((opt) => (
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
          <div
          className="rounded-2xl px-3 py-3 mt-3"
          >
        <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
           <button
            key={option}
            onClick={() => handleFilter(option)}
            aria-label={`Filter by ${option}`}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200
                  ${activeFilter === option
                    ? "bg-primary border-primary text-white"
                    : "border-foreground/10 text-muted-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                    >
                {option}
              </button>
          ))}
      </div>
    </div>
     )}
  
  </div>

  </div>
  );
}