import { Metadata } from "next";
import { getDashboardStats, getSubmissionsTrend } from "@/lib/opportunities";
import { auth } from "@/lib/auth";
import DashboardContent from "@/components/dashboard/DashbaordContent";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track opportunity statistics, recent submissions, and platform activity on RaahYab.",
};

export default async function DashboardPage() {
  const session = await auth();
  const stats = await getDashboardStats();
  const trend =  await getSubmissionsTrend();

  return (
   <DashboardContent
      username={session?.user.username ?? session?.user.name ?? null}
      role={session?.user.role ?? "user"}
      stats={stats}
      trend={trend}
    />

  );
}