"use client";

import Link from "next/link";
import { getRemoteOpportunities } from "./remoteData";
import { Opportunity } from "@/types";
import RemoteCard from "./RemoteCard";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function RemoteSpotlightSection({ opportunities }: { opportunities: Opportunity[] }) {
  const sectionRef = useScrollReveal();
   const remoteOpportunities = getRemoteOpportunities(opportunities);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 bg-background relative overflow-hidden"
    >
      
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
              🌐 Work from anywhere
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Remote Opportunities
              <br className="sm:hidden" /> for Every Afghan
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-md">
              No need to relocate — find opportunities you can do from home, anywhere in Afghanistan.
            </p>
          </div>
          <Link
            href="/opportunities?type=Remote"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-primary/20 bg-card px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:border-primary/40 hover:bg-primary hover:text-card"
          >
            View all remote 
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
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