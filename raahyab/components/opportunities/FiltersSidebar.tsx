"use client"

import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

 interface FilterSidebarProps {
  category: string[];
  onCategoryChange: (value: string[]) => void;
  location: string;
  onLocationChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  expiringSoon:boolean;
  onExpiringChange: (value: boolean) => void;
  availableCat: string[];
  availableLocations: string[];
  availableTypes: string[];
  onClearAll: () => void;
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
  onClearAll
}: FilterSidebarProps) {

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

    const handleCategoryToggle = (cat: string) => {
       if(category.includes(cat)) {
        onCategoryChange(category.filter((c) => c !== cat));
       } else {
        onCategoryChange([...category, cat]);
       }
     }

     const hasActiveFilters = category.length > 0 || location !== "All" || type !== "All" || expiringSoon;

  return (
    <>
     <div className="bg-card w-full sticky top-24 rounded-2xl border border-foreground/8 shadow-sm p-6 space-y-6 max-h-[calc(100vh-6rem)] mt-10 overflow-y-auto custom-scrollbar">
      <div className=""> 
        <h2 className="text-base font-bold text-foreground">Filters</h2>
    
      </div>
      {/* category */}
      <button
       onClick={ () => setIsCategoryOpen(!isCategoryOpen)}
       className="w-full flex justify-between font-semibold mb-4 rounded-lg px-6 py-1.5 hover:bg-foreground/5 transition-colors"
       >
       Category  
       <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}/>
     </button>   

     {isCategoryOpen && (
        <div>
         {availableCat.map((cat) => (
          <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer pl-6">
            <input 
            type="checkbox"
            checked={category.includes(cat)}
            onChange={() => handleCategoryToggle(cat)}
            className="flex flex-col accent-primary w-4 h-4"
            />
            {cat}
          </label>
         ))}
      </div>
     )}    
     
   {/* location */}
   <div className="mt-4">
    <button 
    onClick={() => setIsLocationOpen(!isLocationOpen)}
    className="w-full flex justify-between font-semibold mb-4 rounded-lg px-6 py-1.5 hover:bg-foreground/5 transition-colors"
    >
      Location
    <ChevronDown className={`w-4 h-4 transition-transform ${isLocationOpen ? "rotate-180" : ""}`}/>
    </button>

   {isLocationOpen && 
    <div>
      <select
      value={location}
      onChange={(e) => onLocationChange(e.target.value)}
      className="w-full border border-foreground/15 rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
      >
      <option value="All">All Locations</option>
      {availableLocations.map((loc) => (
        <option key={loc} value={loc}> {loc} </option>
      ))}
    </select>
    </div>
    } 
  </div>

  {/* job type */}
  <div className="mt-4 pl-6">
    <h2 className="font-semibold mb-4">Job type</h2>
    <label className="flex items-center gap-2 mb-2 cursor-pointer  pl-1">
      <input 
      type="radio"
      name="type"
      checked={type === "All"}
      onChange={() => onTypeChange("All")}
       className="accent-primary" 
       />
       All
    </label>

    {availableTypes.map((t) => (
    <label key={t} className="flex items-center gap-2 mb-2 cursor-pointer pl-1">
      <input 
      type="radio"
      name="type"
      checked={type === t}
      onChange={() => onTypeChange(t)}
      className="accent-primary"
        />
      {t}
    </label>
    
    )) }
      
   
  </div>

  <div className="mt-4 pl-6">
  <h2 className="font-semibold mb-4">Deadline</h2>
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={expiringSoon}
      onChange={() => onExpiringChange(!expiringSoon)}
      className="accent-primary w-4 h-4"
    />
    Expiring Soon
  </label>
</div>

  {hasActiveFilters && (
    <button
      onClick={onClearAll}
      className="flex items-center justify-center w-full text-sm font-semibold text-amber-50 bg-primary py-3 px-3 rounded-xl shadow-sm hover:bg-primary/90 hover:shadow-md active:scale-[0.98] transition-all duration-200"
    >
      Clear All Filters
    </button>
  )}
   
</div>
</>
  )
}

