"use client";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function CategorySection({ children }: { children: React.ReactNode }) {
    const sectionRef = useScrollReveal();
    const t = useTranslations("categoryBrowse");
  return (
    <section 
    ref={sectionRef}
    className="relative py-16 sm:py-20 bg-surface">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
              {t("eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                {t.rich("heading", {
                 highlight: (chunks) => <span className="text-primary">{chunks}</span>,
                })}
            </h2>
          </div>

       <Link
       href="/opportunities"
       className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-3 transition-all duration-200 group"
        >
         {t("viewAll")}
         <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
       </Link>
        </div>

        {children}

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/opportunities"
            className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-card px-4 py-2 text-sm font-medium text-primary"
          >
             {t("viewAllMobile")}
             <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}