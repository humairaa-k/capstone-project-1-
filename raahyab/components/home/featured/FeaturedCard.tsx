import { Opportunity } from "@/types";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  MapPin,
} from "lucide-react";


interface FeaturedCardProps {
  opportunity: Opportunity;
}

function formatDeadline(deadline: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(deadline));
}

const chipStyles = [
  "bg-primary/10 text-primary",
  "bg-gold-100 text-accent-hover",
  "bg-teal-100 text-primary",
];

export default function FeaturedCard({ opportunity }: FeaturedCardProps) {
  const visibleTags = opportunity.tags.slice(0, 3);

  return (
    <Link
      href={`/opportunities/${opportunity.id}`}
      className="group relative flex min-h-[15rem] flex-col overflow-hidden rounded-2xl border border-accent/20 bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(15,118,110,0.12) 0%, transparent 46%)",
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {opportunity.category}
        </span>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-surface text-primary transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-card">
          <ArrowUpRight className="h-3.5 w-3,5" aria-hidden="true" />
        </span>
      </div>

      <div className="relative z-10 mt-6 flex-1">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          {opportunity.organization}
        </p>
        <h3 className="text-base font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary line-clamp-2">
          {opportunity.title}
        </h3>
        <p className="mt-4 line-clamp-2 text-xs leading-6 text-muted-foreground">
         {opportunity.description}
        </p>
      </div>

      <div className="relative z-10 mt-4 space-y-4">
        <div className="grid gap-3 border-y border-accent/10 py-3 text-[13px] text-foreground sm:flex flex-wrap">
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate">{opportunity.location}</span>
          </span>
          <span className="flex items-center gap-2">
            <BriefcaseBusiness
              className="h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="truncate">{opportunity.type}</span>
          </span>
          <span className="flex items-center gap-2">
            <CalendarClock
              className="h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="truncate">{formatDeadline(opportunity.deadline)}</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {visibleTags.map((tag, i) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${chipStyles[i % chipStyles.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </Link>
  );
}
