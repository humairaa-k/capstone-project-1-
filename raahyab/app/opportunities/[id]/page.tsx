import type { Metadata } from "next";
import OpportunityDetailContent from "@/components/opportunity/OpportunityDetailContent";
import { getOpportunities } from "@/lib/opportunities";
import { notFound } from "next/navigation";


export async function generateMetadata({params,}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const opportunities = await getOpportunities()
  const opportunity = opportunities.find((o) => o.id === id);

  if (!opportunity) {
    notFound();
  }

  return {
    title: `${opportunity.title} at ${opportunity.organization}`,
    description: opportunity.description,
    keywords: opportunity.tags.join(", "),
    openGraph: {
      title: opportunity.title,
      description: opportunity.description,
      type: "website",
    },
  };
}

export default async function OpportunityDetailPage({params,}: { params: Promise<{ id: string }>;}) {
  const { id } = await params;
  const opportunities = await getOpportunities();
  const opportunity = opportunities.find((o) => o.id === id);

  if (!opportunity) {
    notFound();
  }


  return (
  <OpportunityDetailContent 
  opportunity={opportunity}/>
) 
}


