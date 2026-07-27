"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/LanguageContext";
import SignupForm from "@/components/auth/SignupForm";
import { GradientPanel } from "@/components/auth/GradientPanel";
import { BenefitCards } from "@/components/auth/BenefitCards";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SignupContent() {
    const t = useTranslations("signup");
    const { dir } = useLanguage();
    const BackIcon = dir === "rtl" ? ArrowRight : ArrowLeft;
    return (
    <main dir={dir} className="min-h-screen bg-background p-4 lg:p-6">

      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
        <BackIcon className="h-4 w-4" />
         {t("back")}
      </Link>

      <div className="mx-auto max-w-7xl">

        {/* mobile */}
        <div className="lg:hidden">

          <GradientPanel>
            <h1 className="text-4xl font-semibold text-white">{t("heading")}</h1>
            <p className="mt-3 text-sm text-white/80 mb-6">{t("subtitle")}</p>
          </GradientPanel>

          <div className="-mt-8 relative z-10 mx-4 rounded-3xl border border-black/5 bg-card p-8 shadow-xl">
            <SignupForm />
          </div>

        </div>

        {/* desktop */}
        <div className="hidden lg:grid lg:grid-cols-[1.05fr_.95fr] overflow-hidden rounded-[32px] border border-black/5 bg-card shadow-xl">

          <GradientPanel>

          <div className="font-serif text-2xl italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            Raahyab
          </div>

            <div className="mt-auto">
               <h1 className="mb-3 text-5xl font-semibold leading-tight text-white">{t("heading")}</h1>
               <p className="mb-10 max-w-sm text-white/80">{t("subtitle")}</p>
              <BenefitCards />

            </div>

          </GradientPanel>

          <div className="flex items-center justify-center bg-card p-14">
            <div className="w-full max-w-md">
              <SignupForm />
            </div>

          </div>

        </div>
      </div>

    </main>
  );
}

