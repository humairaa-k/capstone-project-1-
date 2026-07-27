"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OpportunityForm from "@/components/opportunity/OpportunityForm";
import { OpportunityFormData } from "@/lib/schemas/opportunity";
import { useTranslations } from "next-intl";

export default function EditOpportunityContent({ id, initialData,}: {
  id: string;
  initialData: Partial<OpportunityFormData>;
}) {
  const router = useRouter();
  const t = useTranslations("addOpportunityPage");

  const handleUpdate = async (data: OpportunityFormData) => {
    try {
      const response = await fetch(`/api/opportunities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update opportunity");
      }

      const updated = await response.json();

      toast.success("Changes saved — they'll go live once approved by an admin.");
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
           {t("editTitle")}
        </h1>
        <p className="text-sm text-muted-foreground leading-6 max-w-sm">
          {t("editIntro")}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch lg:items-start">
        <OpportunityForm
          initialData={initialData}
          onSubmit={handleUpdate}
           submitLabel={t("saveChanges")}
        />
      </div>
    </div>
  );
}