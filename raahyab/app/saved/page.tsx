"use client";

import OpportunityCard from "@/components/opportunity/OpportunityCard";
import { useSaved }from "@/context/SavedContext";
import { opportunities } from "@/data/opportunities";
import { BookmarkPlus } from "lucide-react";
import { Bookmark } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import Heading from "@/components/common/Heading";


export default function SavedPage() {

 const { savedOpt, toggleSave } = useSaved();
 
 const savedOpportunities = opportunities.filter((opportunity) => 
  savedOpt.includes(opportunity.id))

 console.log(savedOpportunities)

  return(
  <div>
   <Heading
     title="Saved"
     highlight="Opportunities"
     subtitle={`${savedOpportunities.length} opportunities saved`}
     icon={Bookmark}
   />

   {savedOpportunities.length > 0 ? (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 py-20 px-10">
      {savedOpportunities.map((opportunity) => (
         <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
    
   ) : (
    <EmptyState
       title="No Saved Opportunities"
       description="Save jobs, scholarships, internships, and other opportunities to access them anytime."
       icon={BookmarkPlus}
       buttonText="Browse Opportunities"
       buttonHref="/opportunities"
     />
   )}
  </div>
  
 )
}