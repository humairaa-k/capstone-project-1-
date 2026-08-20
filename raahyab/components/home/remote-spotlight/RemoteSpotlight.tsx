"use client";

import Link from "next/link";
import { getRemoteOpportunities } from "./remoteData";
import { Opportunity } from "@/types";
import RemoteCard from "./RemoteCard";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/LanguageContext";

export default function RemoteSpotlightSection({ opportunities }: { opportunities: Opportunity[] }) {
  const sectionRef = useScrollReveal();
  const remoteOpportunities = getRemoteOpportunities(opportunities);

   const t = useTranslations("remoteSpotlight");
     const { dir } = useLanguage();

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="py-16 sm:py-20 bg-[#0d3b3520]/12 relative overflow-hidden"
    >
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <pattern id="remotePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#0F766E" />
            </pattern>
          </defs>
          <rect width="300" height="300" fill="url(#remotePattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
              🌐 {t("eyebrow")}
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                 {t("heading")}
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-md">
               {t("subtitle")}
            </p>
          </div>
          <Link
            href="/opportunities?type=Remote"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-3 transition-all duration-200 group"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {remoteOpportunities.map((opp) => (
            <RemoteCard key={opp.id} {...opp} />
          ))}
        </div>

      </div>
    </section>
  );
}