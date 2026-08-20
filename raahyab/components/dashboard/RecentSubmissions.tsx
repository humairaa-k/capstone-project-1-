"use client";

import { Opportunity } from "@/types";
import { CheckCircle2, Inbox  } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/LanguageContext";

const GRID_COLS = "grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr]";

export default function RecentSubmissions({ data }: { data: Opportunity[] }) {
  const t = useTranslations("dashboard");
  const { locale } = useLanguage();
  const localeMap: Record<string, string> = { en: "en-US", fa: "fa-AF", ps: "ps-AF" };

  function timeAgo(dateStr: string) {
    const difference = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(difference / (1000 * 60 * 60));
    if (hours < 1) return t("recentSubmissions.justNow");
    if (hours < 24) return t("recentSubmissions.hoursAgo", { hours });
    const days = Math.floor(hours / 24);
    return t("recentSubmissions.daysAgo", { days });
  }

  function formatDeadline(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(localeMap[locale], {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="rounded-3xl border border-foreground/10 my-6 bg-card overflow-hidden">
      <div className="px-8 sm:px-6 py-4 border-b mt-2.5 border-foreground/10">
        <h3 className="flex items-center gap-3 font-medium text-foreground">
          < Inbox size={20} className="text-primary" />
          {t("recentSubmissions.heading")} </h3>
      </div>

      <div className={`grid ${GRID_COLS} gap-3 px-5 sm:px-6 py-2.5 bg-foreground/1.5`}>
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {t("recentSubmissions.titleCompany")}
        </span>
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{t("recentSubmissions.category")}</span>
        <span className="text-[11px] uppercase tracking-wide hidden lg:block ps-4 text-muted-foreground">
          {t("recentSubmissions.deadline")}
        </span>
        <span className="text-[11px] hidden lg:block uppercase tracking-wide text-muted-foreground text-end">
          {t("recentSubmissions.submitted")}
        </span>
      </div>

      <div className="divide-y divide-foreground/8">
        {data.map((opp) => (
          <div
            key={opp.id}
            className={`grid ${GRID_COLS} gap-3 items-center px-5 sm:px-6 py-3.5 border-s-[3px] border-s-primary hover:bg-primary/4 transition-colors`}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate mb-0.5">{opp.title}</p>
              <p className="text-xs text-muted-foreground truncate">{opp.organization}</p>
            </div>

            <div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                {opp.category}
              </span>
            </div>

            <div className="text-xs text-foreground ps-4">{formatDeadline(opp.deadline)}</div>

            <div className="hidden lg:flex items-center gap-2 justify-end text-xs text-muted-foreground">
              <CheckCircle2 size={13} className="text-primary" strokeWidth={2} />
              {timeAgo(opp.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}