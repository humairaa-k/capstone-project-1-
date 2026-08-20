"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/LanguageContext";

export default function CTABanner() {
 const sectionRef = useScrollReveal(); 
 const t = useTranslations("cta");
 const { dir } = useLanguage();   

  return (
    <section ref={sectionRef} dir={dir} className="py-16 sm:py-20 bg-background dark:bg-warm-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl px-8 sm:px-14 py-14 sm:py-18 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative overflow-hidden">

      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
           <div className="absolute -bottom-12 -left-8 w-32 h-32 bg-white/5 rounded-full" />

          <div className="relative z-10">
            <h2 className="text-2xl text-white mb-2 sm:text-3xl font-bold text-start relative overflow-hidden">
              {t("heading")}
            </h2>
            <p className="text-sm text-teal-100 max-w-md">
              {t("subtitle")}
            </p>
          </div>

          <Link
            href="/add-opportunity"
            className="relative z-10 bg-gold-400 hover:bg-gold-500 text-white rounded-xl px-8 py-3 text-md font-medium transition-colors duration-200 shrink-0 whitespace-nowrap"
          >
             + {t("addOpportunity")}
          </Link>

        </div>
      </div>
    </section>
  );
}