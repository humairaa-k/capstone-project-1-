import OpportunityGrid from "@/components/opportunity/OpportunityGrid"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Opportunities",
  description: "Browse jobs, internships, scholarships, and remote work opportunities across Afghanistan.",
};

export default function page() {
  return (

    <OpportunityGrid/>
  )
}

