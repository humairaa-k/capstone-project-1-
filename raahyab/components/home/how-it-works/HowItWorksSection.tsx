"use client";

import StepsGrid from "./StepsGrid";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslations } from "next-intl";

export default function HowItWorksSection() {
 const sectionRef = useScrollReveal();
 const t = useTranslations("howItWorks")

  return (
     <section
      ref={sectionRef}
      className="py-16 sm:py-20 bg-background dark:bg-backround"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-12">
    
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-sand-100">
          {t.rich("heading", {
            brand: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h2>
        <p className="text-sm text-muted-foreground dark:text-warm-400 mt-3 max-w-md mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <StepsGrid />
    </div>
    </section>
  )
}

