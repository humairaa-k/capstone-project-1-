"use client";

import StepsGrid from "./StepsGrid";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslations } from "next-intl";

export default function HowItWorksSection() {
  const sectionRef = useScrollReveal();
  const t = useTranslations("howItWorks");

  return (
    <section
      ref={sectionRef}
      className="relative py-15 sm:py-20 overflow-hidden bg-background dark:bg-teal-950/20">
       <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
  );
}