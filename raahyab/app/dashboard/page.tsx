import { Metadata } from "next";
import StatCardHero from "@/components/dashboard/StatCardHero";
import { LayoutGrid, Globe2 } from "lucide-react";
import { Briefcase, GraduationCap, FileText, Clock} from "lucide-react";
import StatCardNeutral from "@/components/dashboard/StatCardNeutral";
import { getDashboardStats, getSubmissionsTrend } from "@/lib/opportunities";
import SubmissionTrendChart from "@/components/dashboard/SubmissionTrendChart";
import CategoryBarChart from "@/components/dashboard/CategoryBarChart";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track opportunity statistics, recent submissions, and platform activity on RaahYab.",
};

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const trend =  await getSubmissionsTrend();

   const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <>
    <div className="rounded-3xl bg-gradient-to-br from-primary/90 to-primary-hover/70 p-6 sm:p-8 mb-6 text-white">
     <p className="text-[14px] tracking-widest text-white/70 mb-1 leading-none mb-1.5">Welcome Back, Name  · {     today}</p>
     <h1 className="text-2xl sm:text-3xl font-medium">Dashboard Overview</h1>
   </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <StatCardHero
          icon={LayoutGrid}
          label="Total opportunities"
          value={stats.total}
          trend={`+${stats.newThisMonth} this month`}
          variant="dark"
        />
        <StatCardHero
          icon={Globe2}
          label="Remote opportunities"
          value={stats.remote}
          trend={`${stats.remotePercent}% of total`}
          variant="gold"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 mb-4">

      <div className="grid grid-cols-2 gap-4">
        <StatCardNeutral icon={Briefcase} label="Jobs" value={stats.jobs} />
        <StatCardNeutral icon={GraduationCap} label="Scholarships" value={stats.scholarships} />
        <StatCardNeutral icon={FileText} label="Internships" value={stats.internships} />
        <StatCardNeutral icon={Clock} label="Expiring soon" value={stats.expiringSoon} urgent />
      </div>

      <SubmissionTrendChart trendData={trend}/>

  </div>

     <CategoryBarChart
      data={[
        { category: "Jobs", count: stats.jobs },
        { category: "Scholarships", count: stats.scholarships },
        { category: "Internships", count: stats.internships },
        { category: "Remote", count: stats.remote },
        { category: "Online Course", count: stats.onlineCourse },
        { category: "Training", count: stats.training },
        { category: "Volunteer", count:stats.volunteer}
      ]}
    />
 </>

  );
}