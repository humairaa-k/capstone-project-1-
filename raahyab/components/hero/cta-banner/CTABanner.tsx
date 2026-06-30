"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CTABanner() {
 const sectionRef = useScrollReveal();    

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-background dark:bg-warm-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl px-6 sm:px-12 py-10 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative overflow-hidden">

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
           <div className="absolute -bottom-12 -left-8 w-32 h-32 bg-white/5 rounded-full" />

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Know an opportunity?
            </h2>
            <p className="text-sm text-teal-100 max-w-md">
              Share it with thousands of Afghan youth looking for their next step.
            </p>
          </div>

          <Link
            href="/add-opportunity"
            className="relative z-10 bg-gold-400 hover:bg-gold-500 text-white rounded-xl px-7 py-3 text-sm font-medium transition-colors duration-200 shrink-0 whitespace-nowrap"
          >
            + Add an Opportunity
          </Link>

        </div>
      </div>
    </section>
  );
}