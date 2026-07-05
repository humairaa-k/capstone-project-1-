"use client";

import OpportunityCard from "@/components/opportunity/OpportunityCard";
import { useSaved }from "@/context/SavedContext";
import { opportunities } from "@/data/opportunities";
import { BookmarkPlus } from "lucide-react";
import { Bookmark } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import Heading from "@/components/common/Heading";
import { useState } from "react";
import SearchFilter from "@/components/saved/SeachFilters";

export default function SavedPage() {

 const { savedOpt } = useSaved();

 const [search, setSearch] = useState("");
 const [filter, setFilter] = useState("All");
 const [sortType, setSortType ] = useState("newest");


 const clearPhilter = () => {
  setSearch("");
  setFilter("All");
  setSortType("newest");
 }
 
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

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 py-20 px-10">
      {sortedOpport.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  )}
  </div>
  
 )
}