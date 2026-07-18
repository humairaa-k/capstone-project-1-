"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OpportunityForm from "@/components/opportunity/OpportunityForm"
import { OpportunityFormData } from "@/lib/schemas/opportunity";

export default function AddOpportunityContent() {
  const router = useRouter();

  const handleCreate = async (data: OpportunityFormData) => {
    try {
      const payload = {
        ...data,
        // convert comma-separated strings into real arrays before sending to the API
        requirements: data.requirements.split(",").map((r) => r.trim()).filter(Boolean),
        tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };

      const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-26 pb-16">

      <div className="mb-12">
        <h1
          style={{ fontFamily: "var(--font-dm-serif)" }}
          className="text-2xl sm:text-[40px] italic text-foreground leading-tight mb-4"
        >
          Add Opportunity
        </h1>
        <p className="text-sm text-muted-foreground leading-6 max-w-sm">
          Know a job, scholarship, internship or course? Share it here and help someone discover their next opportunity.
        </p>
      </div>

  <div className="flex flex-col lg:flex-row gap-8 items-stretch lg:items-start">
      <OpportunityForm onSubmit={handleCreate} submitLabel="Submit Opportunity"/>

      <div className="w-full  h-fit lg:w-[360px] shrink-0 rounded-3xl border border-dashed border-foreground/15 p-8 lg:sticky lg:top-24">
          <h3 className="text-base font-semibold text-foreground mb-6">
            What happens next?
          </h3>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-foreground/20">01</span>
              <div>
                <p className="font-medium text-sm">Submit your opportunity</p>
                <p className="text-sm text-muted-foreground">Review your details and publish.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-foreground/20">02</span>
              <div>
                <p className="font-medium text-sm">Quick review</p>
                <p className="text-sm text-muted-foreground">We verify the information.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-foreground/20">03</span>
              <div>
                <p className="font-medium text-sm">Published</p>
                <p className="text-sm text-muted-foreground">Your opportunity goes live.</p>
              </div> 
            </div> 
         </div>

    </div>
    </div>
    </div>
  );
}