import { LucideIcon, ArrowUpRight } from "lucide-react";

interface HeroStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  variant: "dark" | "gold";
}

export default function StatCardHero({ icon: Icon, label, value, trend, variant, }: HeroStatCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`relative rounded-3xl p-5 sm:p-6 overflow-hidden min-h-[160px] ${
        isDark ? "bg-black text-white" : "bg-accent text-foreground"
      }`} >

      <Icon
        className="absolute -right-4 -bottom-4 opacity-10"
        size={120}
        strokeWidth={1}
      />

      <div className="relative z-10 flex items-center gap-4">
        <div
          className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${
            isDark ? "bg-white/10" : "bg-foreground/10"
          }`}
        >
          <Icon size={22} strokeWidth={1.75} />
        </div>

        <div>
          <p className={`text-sm mb-0.5 font-semibold ${isDark ? "text-white/70" : "text-foreground/70"}`}>
            {label}
          </p>
          <p className="text-4xl font-medium tracking-tight leading-none">{value}</p>
        </div>
      </div>

      {trend && (
        <div
          className={`relative z-10 flex items-center gap-1 mt-3 text-[12px] ${
            isDark ? "text-teal-300" : "text-foreground"
          }`}
        >
          <ArrowUpRight size={14} strokeWidth={2} />
          {trend}
        </div>
      )}
    </div>
  );
}