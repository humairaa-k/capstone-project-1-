import { opportunities } from "@/data/opportunities";
import OpportunityCard  from "@/components/opportunity/OpportunityCard"
import Heading from "@/components/common/Heading";
import { Compass } from "lucide-react";

export default function OpportunityGrid() {
  return (
   <>
    <Heading
      title=" Explore"
      highlight=" Opportunities"
      subtitle="25 opportunities found ( Demo Data )"
      icon={Compass}
    />

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 py-20 px-10">
      {opportunities.map((opportunity) => (
         <OpportunityCard
         key={opportunity.id}
         opportunity={opportunity}
         /> 
       ))}
    </div>
    </>
  )
}

