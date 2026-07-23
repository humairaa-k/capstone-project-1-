import fs from "fs/promises";
import path from "path";
import { Opportunity} from "@/types"; 
import { OpportunityFormData } from "@/lib/schemas/opportunity";


const dataFilePath = path.join( process.cwd(), "data", "opportunities.json");

export async function getOpportunities(): Promise<Opportunity[]> {  
    const fileContents = await fs.readFile(dataFilePath, "utf-8")
    return JSON.parse(fileContents)
} 


export async function getOpportunityById (id: string) : Promise<Opportunity | null> {
const opportunities = await getOpportunities();
return opportunities.find((opp) => opp.id === id) ?? null;
}

export function toFormData(opp: Opportunity): Partial<OpportunityFormData> {
  return {
    title: opp.title,
    organization: opp.organization,
    category: opp.category as OpportunityFormData["category"],
    location: opp.location,
    type: opp.type as OpportunityFormData["type"],
    deadline: opp.deadline,
    description: opp.description,
    requirements: opp.requirements.join(", "),
    tags: opp.tags.join(", "),
    applyLink: opp.applyLink,
  };
}


export interface DashboardStats {
  total: number;
  jobs: number;
  scholarships: number;
  internships: number;
  remote: number;
  remotePercent: number; 
  onlineCourse: number;   
  training: number;       
  volunteer: number;   
  expiringSoon: number;
  newThisMonth: number;
  recentSubmissions: Opportunity[];
  pendingApprovals: Opportunity[];

}

export async function getDashboardStats(): Promise<DashboardStats> {
  const opportunities = await getOpportunities();
  const approved = opportunities.filter((o) => o.status === "approved");

  const now = new Date();
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const expiringSoon = approved.filter((o) => {
    const deadline = new Date(o.deadline);
    return deadline >= now && deadline <= sevenDaysFromNow;
  });

  const newThisMonth = approved.filter((o) => new Date(o.createdAt) >= thirtyDaysAgo).length;

  const total = approved.length;
  const remote = approved.filter((o) => o.type === "Remote").length;
  const remotePercent = total > 0 ? Math.round((remote / total) * 100) : 0;

  
  const recentSubmissions = [...approved] 
    .sort((a, b) =>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) 
    .slice(0,5);

  const pendingApprovals = [...opportunities]
   .filter((opp) => opp.status === "pending")
   .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());


    return {
    total,
    jobs: approved.filter((o) => o.category === "Job").length,
    scholarships: approved.filter((o) => o.category === "Scholarship").length,
    internships: approved.filter((o) => o.category === "Internship").length,
    onlineCourse: approved.filter((o) => o.category === "Online Course").length,  
    training: approved.filter((o) => o.category === "Training").length,           
    volunteer: approved.filter((o) => o.category === "Volunteer").length,    
    remote,
    remotePercent,
    expiringSoon: expiringSoon.length,
    newThisMonth,
    recentSubmissions,
    pendingApprovals, 
  };
}

export interface TrendPoint {
  label: string;
  submissions: number;
}

export interface SubmissionsTrend {
  week: TrendPoint[];
  month: TrendPoint[];
  all: TrendPoint[];
}

//Submission Chart
export async function getSubmissionsTrend(): Promise<SubmissionsTrend> {
  const opportunities = await getOpportunities();

  // this week - last 7 days, one bar per day
  const week: TrendPoint[] = [];
  for (let i = 6; i >= 0; i--) {
    const dayStart = new Date();
    dayStart.setDate(dayStart.getDate() - i);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayStart.getDate() + 1);

    const count = opportunities.filter((o) => {
      const created = new Date(o.createdAt);
      return created >= dayStart && created < dayEnd;
    }).length;

    week.push({ label: dayStart.toLocaleDateString("en-US", { weekday: "short" }), submissions: count });
  }

  // this month - last 4 weekly buckets
  const month: TrendPoint[] = [];
  for (let i = 3; i >= 0; i--) {
    const end = new Date();
    end.setDate(end.getDate() - i * 7);
    end.setHours(23, 59, 59, 999);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    const count = opportunities.filter((o) => {
      const created = new Date(o.createdAt);
      return created >= start && created <= end;
    }).length;

    month.push({ label: `Week ${4 - i}`, submissions: count });
  }

  // all time - last 6 months
  const all: TrendPoint[] = [];
  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date();
    monthDate.setMonth(monthDate.getMonth() - i);

    const count = opportunities.filter((o) => {
      const created = new Date(o.createdAt);
      return (
        created.getMonth() === monthDate.getMonth() &&
        created.getFullYear() === monthDate.getFullYear()
      );
    }).length;

    all.push({ label: monthDate.toLocaleDateString("en-US", { month: "short" }), submissions: count });
  }

  return { week, month, all };
}