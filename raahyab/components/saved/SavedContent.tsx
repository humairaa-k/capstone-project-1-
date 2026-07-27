"use client";

import OpportunityCard from "@/components/opportunities/OpportunityCard";
import { useSaved }from "@/context/SavedContext";
import { BookmarkPlus } from "lucide-react";
import { Bookmark } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import Heading from "@/components/common/Heading";
import { useState, useEffect } from "react";
import SearchFilter from "@/components/saved/SeachFilters";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Opportunity } from "@/types";
import { useTranslations } from "next-intl";

export default function SavedContent() {
   const { savedOpt, clearSaved } = useSaved();
   const t = useTranslations("savedPage");

   const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
   const [search, setSearch] = useState("");
   const [filter, setFilter] = useState("All");
   const [sortType, setSortType ] = useState("newest");
   const [showConfirm, setShowConfirm] = useState(false);
   const [visibleCount, setVisibleCount] = useState(6);
  
     useEffect(() => {
     fetch("/api/opportunities")
       .then((res) => res.json())
       .then(setOpportunities);
   }, []);


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
   
  return (
     <div>
   <Heading
     title={t("title")}
     highlight={t("highlight")}
     subtitle={t("subtitle", { count: savedOpportunities.length })}
     className="animate-fade-in-up"
   />

   <SearchFilter
   search={search}
   onSearch={setSearch}
   filter={filter}
   onFilter={setFilter}
   onSort={setSortType}
   onClear={clearPhilter}
   className="animate-fade-in-up-delay-1"
   />
  
   {savedOpt.length === 0 ? (
    <EmptyState
      title={t("empty.noneYetTitle")}
      description={t("empty.noneYetDescription")}
      icon={BookmarkPlus}
      buttonText={t("empty.browse")}
      buttonHref="/opportunities"
    />
 ) : sortedOpport.length === 0 ? (
      <EmptyState
          title={t("empty.noMatchTitle")}
          description={t("empty.noMatchDescription")}
          icon={BookmarkPlus}
          buttonText={t("empty.clearFilters")}
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
          {t("clearAllButton")}
         </button>
       </div>
     )}

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 py-8 px-10 animate-fade-in-up-delay-2">
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
         {t("loadMore")}
        </button>
      </div>
    )}
    </>
  )}

   <ConfirmDialog
    open={showConfirm}
    title={t("confirmDialog.title")}
    description={t("confirmDialog.description")}
    confirmText={t("confirmDialog.confirmText")}
    onConfirm={handleConfirmClear}
    onCancel={() => setShowConfirm(false)}
    />
  </div>
    
  )
}

