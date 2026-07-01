import { opportunities } from "@/data/opportunities";
import OpportunityCard  from "@/components/opportunity/OpportunityCard"

export default function OpportunityGrid() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 py-20 px-10">
      {opportunities.map((opportunity) => (
         <OpportunityCard
         key={opportunity.id}
         opportunity={opportunity}
         /> 
       ))}
    </div>
  )
}

