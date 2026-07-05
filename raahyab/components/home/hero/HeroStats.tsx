import StatCard from "./StatCard";

const stats = [
  { value: 25, suffix: "+", label: "Opportunities" },
  { value: 7, suffix: "", label: "Categories" },
  { value: 15, suffix: "+", label: "Organizations" },
  { value: 10, suffix: "+", label: "Remote Roles" },
];

export default function HeroStats() {
  return (
    <div className="flex flex-col sm:flex-row mt-4 w-full">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
