"use client"

import StatCardHero from "@/components/dashboard/StatCardHero";
import { LayoutGrid, Globe2 } from "lucide-react";
import { Briefcase, GraduationCap, FileText, Clock} from "lucide-react";
import StatCardNeutral from "@/components/dashboard/StatCardNeutral";
import SubmissionTrendChart from "@/components/dashboard/SubmissionTrendChart";
import CategoryBarChart from "@/components/dashboard/CategoryBarChart";
import PendingApprovals from "@/components/dashboard/admin/PendingApprovals";
import RecentSubmissions from "@/components/dashboard/RecentSubmissions";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/LanguageContext";
import WorkTypeChart from "@/components/dashboard/WorkTypeChart";


  interface DashboardContentProps {
  username: string | null;
  role: "user" | "admin";
  stats: any; 
  trend: any; 
}

export default function DashbaordContent({ username, role, stats, trend }: DashboardContentProps) {
  const t = useTranslations("dashboard");
  const { locale, dir } = useLanguage();

  const localeMap: Record<string, string> = { en: "en-US", fa: "fa-AF", ps: "ps-AF" };
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
      <div dir={dir} className="pr-4">
      <div className="rounded-3xl bg-linear-to-br from-primary/90 to-primary-hover/70 p-6 sm:p-8 mb-6 text-white animate-fade-in-up-delay-1">
       <p className="text-[14px] tracking-widest text-white/70 leading-none mb-1.5"> {t("welcomeBack")}, {username} · { today}</p>
       <h1 className="text-2xl sm:text-3xl font-medium">{t("overview")}</h1>
     </div>
  
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 animate-fade-in-up-delay-2">
          <StatCardHero
            icon={LayoutGrid}
            label={t("totalOpportunities")}
            value={stats.total}
            trend={t("newThisMonth", { count: stats.newThisMonth })}
            variant="dark"
          />
          <StatCardHero
            icon={Globe2}
            label={t("remoteOpportunities")}
            value={stats.remote}
            trend={t("percentOfTotal", { percent: stats.remotePercent })}
            variant="gold"
          />
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 mb-4 animate-fade-in-up-delay-2">
  
        <div className="grid grid-cols-2 gap-4">
          <StatCardNeutral icon={Briefcase} label={t("jobs")} value={stats.jobs} />
          <StatCardNeutral icon={GraduationCap} label={t("scholarships")} value={stats.scholarships} />
          <StatCardNeutral icon={FileText} label={t("internships")} value={stats.internships} />
          <StatCardNeutral icon={Clock} label={t("expiringSoon")} value={stats.expiringSoon} urgent />
        </div>
  
        <SubmissionTrendChart trendData={trend}/>
  
    </div>

   <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 mb-4 animate-fade-in-up-delay-2">
    <CategoryBarChart
        data={[
          { category: t("jobs"), count: stats.jobs },
          { category: t("scholarships"), count: stats.scholarships },
          { category: t("internships"), count: stats.internships },
          { category: t("remote"), count: stats.remote },
          { category: t("onlineCourse"), count: stats.onlineCourse },
          { category: t("training"), count: stats.training },
          { category: t("volunteer"), count: stats.volunteer },
        ]}
      />

     <WorkTypeChart data={stats.workTypeBreakdown}/>

      </div>
  
      <div className="space-y-4">
       {role === "admin" && <PendingApprovals data={stats.pendingApprovals} />}
       <RecentSubmissions data={stats.recentSubmissions} />
    
     </div>
   </div>
  
    );
}

