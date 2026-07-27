import StatCard from "./StatCard";
import { Opportunity } from "@/types";
import { useTranslations } from "next-intl";

// const stats = [
//   { value: 25, suffix: "+", label: "Opportunities" },
//   { value: 7, suffix: "", label: "Categories" },
//   { value: 15, suffix: "+", label: "Organizations" },
//   { value: 10, suffix: "+", label: "Remote Roles" },
// ];

interface HeroStatsProps {
  opportunities: Opportunity[];
}

export default function HeroStats({ opportunities }: HeroStatsProps) {
   const t = useTranslations("heroStats");
   const uniqueCategories = new Set(opportunities.map((o) => o.category)).size;
   const uniqueOrganizations = new Set(opportunities.map((o) => o.organization)).size;
   const remoteCount = opportunities.filter((o) => o.type === "Remote").length;

   const stats = [
    { id: "opportunities", value: opportunities.length, suffix: "+" },
    { id: "categories", value: uniqueCategories, suffix: "" },
    { id: "organizations", value: uniqueOrganizations, suffix: "+" },
    { id: "remoteRoles", value: remoteCount, suffix: "+" },
  ];

  return (
    <div className="flex flex-col sm:flex-row mt-4 w-full">
      {stats.map((stat) => (
        <StatCard key={stat.id} value={stat.value} suffix={stat.suffix} label={t(stat.id)} />
       ))}
    </div>
  );
}
