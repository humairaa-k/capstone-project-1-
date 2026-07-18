"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OpportunityForm from "@/components/opportunity/OpportunityForm";
import { OpportunityFormData } from "@/lib/schemas/opportunity";

export default function EditOpportunityContent({ id, initialData,}: {
  id: string;
  initialData: Partial<OpportunityFormData>;
}) {
  const router = useRouter();

  const handleUpdate = async (data: OpportunityFormData) => {
    try {
      const payload = {
        ...data,
        requirements: data.requirements.split(",").map((r) => r.trim()).filter(Boolean),
        tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };

      const response = await fetch(`/api/opportunities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update opportunity");
      }

      const updated = await response.json();

      toast.success("Opportunity updated successfully.");
      router.push(`/opportunities/${updated.id}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-26 pb-16">
      <div className="mb-12">
        <h1
          style={{ fontFamily: "var(--font-dm-serif)" }}
          className="text-2xl sm:text-[40px] italic text-foreground leading-tight mb-4"
        >
          Edit Opportunity
        </h1>
        <p className="text-sm text-muted-foreground leading-6 max-w-sm">
          Update the details below and save your changes.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch lg:items-start">
        <OpportunityForm
          initialData={initialData}
          onSubmit={handleUpdate}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}