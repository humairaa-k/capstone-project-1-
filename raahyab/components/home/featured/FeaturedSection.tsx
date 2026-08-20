"use client";
import FeaturedCard from "./FeaturedCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Opportunity } from "@/types";
import { useTranslations } from "next-intl";

export default function FeaturedSection({ opportunities }: { opportunities: Opportunity[] }) {
  const featuredJobs = opportunities.filter((opp) => opp.featured).slice(0, 3);
  const sectionRef = useScrollReveal();
  const t = useTranslations("featuredSection");
  
  return (
    <section 
     ref={sectionRef}
    className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            
            <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {t.rich("heading", {
                 highlight: (chunks) => <span className="text-primary">{chunks}</span>,
               })}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
             {t("subtitle")}
            </p>
          </div>

         <Link
          href="/opportunities"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-3 transition-all duration-200 group"
           >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
         </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((opp) => (
            <FeaturedCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </div>
    </section>
  );
}
