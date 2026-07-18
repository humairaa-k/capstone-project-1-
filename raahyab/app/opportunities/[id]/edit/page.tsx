import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getOpportunityById, toFormData } from "@/lib/opportunities";
import EditOpportunityContent from "@/components/opportunity/edit-opportunity/EditOpportunityContent";

export const metadata: Metadata = {
  title: "Edit Opportunity",
};

export default async function EditOpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opportunity = await getOpportunityById(id);
  if (!opportunity) notFound();

  return (
    <EditOpportunityContent
      id={opportunity.id}
      initialData={toFormData(opportunity)}
    />
  );
}