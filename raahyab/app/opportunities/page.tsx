import OpportunityGrid from "@/components/opportunities/OpportunityGrid"
import { Metadata } from "next";
import { getOpportunities } from "@/lib/opportunities";


export const metadata: Metadata = {
  title: "Explore Opportunities",
  description: "Browse jobs, internships, scholarships, and remote work opportunities across Afghanistan.",
};

export default async function page() {
  const opportunities = await getOpportunities();
  return (

    <OpportunityGrid initialOpportunities={ opportunities }/>
  )
}

