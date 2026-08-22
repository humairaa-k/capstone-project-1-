import OpportunityGrid from "@/components/opportunities/OpportunityGrid"
import { Metadata } from "next";
import { getOpportunities } from "@/lib/opportunities";

// Opportunities are approved after deployment, so this page must not use a build-time snapshot.
export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Explore Opportunities",
  description: "Browse jobs, internships, scholarships, and remote work opportunities across Afghanistan.",
};

export default async function page() {
  const opportunities = await getOpportunities();
  const approvedOnly = opportunities.filter((opp) => opp.status === "approved");
  return (

    <OpportunityGrid initialOpportunities={ approvedOnly }/>
  )
}

