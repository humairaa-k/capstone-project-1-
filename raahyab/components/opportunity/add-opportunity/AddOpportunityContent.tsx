"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import OpportunityForm from "@/components/opportunity/OpportunityForm"
import { OpportunityFormData } from "@/lib/schemas/opportunity";

export default function AddOpportunityContent() {
  const router = useRouter();
  const t = useTranslations("addOpportunityPage");

  const handleCreate = async (data: OpportunityFormData) => {
    try {
     const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create opportunity");
      }

      const created = await response.json();

      toast.success("Thanks! Your opportunity has been submitted and is pending review.");
      router.push(`/opportunities/${created.id}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 animate-fade-in-up">

      <div className="mb-12">
        <h1
          style={{ fontFamily: "var(--font-dm-serif)" }}
          className="text-2xl sm:text-[40px] italic text-foreground leading-tight mb-4"
        >
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground leading-6 max-w-sm">
           {t("intro")}
        </p>
      </div>

  <div className="flex flex-col lg:flex-row gap-8 items-stretch lg:items-start animate-fade-in-up-delay-1">
      <OpportunityForm onSubmit={handleCreate} submitLabel={t("submitLabel")}/>

      <div className="w-full  h-fit lg:w-[360px] shrink-0 rounded-3xl border border-dashed border-foreground/15 p-8 lg:sticky lg:top-24">
          <h3 className="text-base font-semibold text-foreground mb-6">
            {t("whatNext.heading")}
          </h3>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-foreground/20">01</span>
              <div>
                <p className="font-medium text-sm">{t("whatNext.step1Title")}</p>
                <p className="text-sm text-muted-foreground">{t("whatNext.step1Description")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-foreground/20">02</span>
              <div>
                <p className="font-medium text-sm">{t("whatNext.step2Title")}</p>
                <p className="text-sm text-muted-foreground">{t("whatNext.step2Description")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-foreground/20">03</span>
              <div>
                <p className="font-medium text-sm">{t("whatNext.step3Title")}</p>
                <p className="text-sm text-muted-foreground">{t("whatNext.step3Description")}</p>
              </div> 
            </div> 
         </div>

    </div>
    </div>
    </div>
  );
}