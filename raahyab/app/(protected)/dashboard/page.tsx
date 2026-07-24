import { Metadata } from "next";
import StatCardHero from "@/components/dashboard/StatCardHero";
import { LayoutGrid, Globe2 } from "lucide-react";
import { Briefcase, GraduationCap, FileText, Clock} from "lucide-react";
import StatCardNeutral from "@/components/dashboard/StatCardNeutral";
import { getDashboardStats, getSubmissionsTrend } from "@/lib/opportunities";
import SubmissionTrendChart from "@/components/dashboard/SubmissionTrendChart";
import CategoryBarChart from "@/components/dashboard/CategoryBarChart";
import PendingApprovals from "@/components/dashboard/admin/PendingApprovals";
import RecentSubmissions from "@/components/dashboard/RecentSubmissions";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track opportunity statistics, recent submissions, and platform activity on RaahYab.",
};

export default async function DashboardPage() {
  const session = await auth();
  const stats = await getDashboardStats();
  const trend =  await getSubmissionsTrend();

   const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });


  return (
    <>
    <div className="rounded-3xl bg-linear-to-br from-primary/90 to-primary-hover/70 p-6 sm:p-8 mb-6 text-white animate-fade-in-up-delay-1">
     <p className="text-[14px] tracking-widest text-white/70 leading-none mb-1.5">Welcome Back, {session.user.username ?? session.user.name} · {     today}</p>
     <h1 className="text-2xl sm:text-3xl font-medium">Dashboard Overview</h1>
   </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 animate-fade-in-up-delay-2">
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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 mb-4 animate-fade-in-up-delay-2">

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

    <div className="space-y-4">
     {session?.user.role === "admin" && <PendingApprovals data={stats.pendingApprovals} />}
     <RecentSubmissions data={stats.recentSubmissions} />
  
   </div>
 </>

  );
}