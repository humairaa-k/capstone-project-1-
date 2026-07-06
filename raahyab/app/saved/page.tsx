"use client";

import OpportunityCard from "@/components/opportunity/OpportunityCard";
import { useSaved }from "@/context/SavedContext";
import { opportunities } from "@/data/opportunities";
import { BookmarkPlus } from "lucide-react";
import { Bookmark } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import Heading from "@/components/common/Heading";
import { useState, useEffect } from "react";
import SearchFilter from "@/components/saved/SeachFilters";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function SavedPage() {

 const { savedOpt, clearSaved } = useSaved();

 const [search, setSearch] = useState("");
 const [filter, setFilter] = useState("All");
 const [sortType, setSortType ] = useState("newest");
 const [showConfirm, setShowConfirm] = useState(false);
const [visibleCount, setVisibleCount] = useState(6);

 useEffect(() => {
  setVisibleCount(6);
}, [search, filter, sortType]);

 const clearPhilter = () => {
  setSearch("");
  setFilter("All");
  setSortType("newest");
 }

 const handleConfirmClear = () => {
  clearSaved();
  setShowConfirm(false);
};
 
 const savedOpportunities = opportunities
 .filter((opportunity) => savedOpt.includes(opportunity.id))
 .filter((opportunity) => 
   opportunity.title.toLowerCase().includes(search.toLowerCase()) ||
   opportunity.organization.toLowerCase().includes(search.toLowerCase())                  
  )
  .filter((opportunity) => filter === "All" || opportunity.category === filter)

  const sortedOpport = [...savedOpportunities].sort((a, b) => {
    if (sortType === "newest") {
      return new Date(b.createdAt ).getTime() - new Date(a.createdAt).getTime()
    }

    if(sortType === "a-z") {
      return a.title.localeCompare(b.title);
    }

    if(sortType === "deadline") {
     return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    }

    return 0
  })

   const visibleItems = sortedOpport.slice(0, visibleCount);
 

  return(
  <div>
   <Heading
     title="Saved"
     highlight="Opportunities"
     subtitle={`${savedOpportunities.length} opportunities saved`}
     icon={Bookmark}
   />

   <SearchFilter
   search={search}
   onSearch={setSearch}
   filter={filter}
   onFilter={setFilter}
   onSort={setSortType}
   onClear={clearPhilter}
   />
  
   {savedOpt.length === 0 ? (
   <EmptyState
     title="No Saved Opportunities"
     description="Save jobs, scholarships, internships, and other opportunities to access them anytime."
     icon={BookmarkPlus}
     buttonText="Browse Opportunities"
     buttonHref="/opportunities"
   />
 ) : sortedOpport.length === 0 ? (
    <EmptyState
      title="No Matching Results"
      description="Try adjusting your search or filter to find what you're looking for."
      icon={BookmarkPlus}
      buttonText="Clear Filters"
      onButtonClick={clearPhilter}
    />

  ) : (

    <>
     {sortedOpport.length > 0 && (
       <div className="flex justify-end px-10 pt-8">
         <button
           onClick={() => setShowConfirm(true)}
           className="text-sm font-semibold border-2 px-6 py-2.5 rounded-xl border-red-400/40 text-red-400 hover:bg-red-400/10 transition-all duration-200"
         >
           Clear all Saved
         </button>
       </div>
     )}

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 py-20 px-10">
      {visibleItems.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>

     {/* Loadmore btn */}
     {visibleCount < sortedOpport.length && (
      <div className="flex justify-center py-6">
        <button onClick={() => setVisibleCount((prev) => prev + 6)}
         className="text-sm font-medium px-6 py-2.5 rounded-xl border border-primary/30 text-primary hover:bg-teal-100 dark:hover:bg-teal-500/10 transition-all duration-200 hover:-translate-y-0.5"
         >
          Load More
        </button>
      </div>
    )}
    </>
  )}

  <ConfirmDialog
  open={showConfirm}
  title="Clear all saved opportunities?"
  description="This will remove all your saved opportunities. This action cannot be undone."
  confirmText="Clear All"
  onConfirm={handleConfirmClear}
  onCancel={() => setShowConfirm(false)}
  />
  </div>
  
  
 
 )
}