import { Opportunity } from "@/types";



export function getRemoteOpportunities(opportunities: Opportunity[]) {
  return opportunities
      .filter((opp) => opp.type === "Remote")
      .slice(0, 3); 
}