import Link from "next/link";
import { Opportunity } from "@/types";
import { ArrowUpRight } from "lucide-react";

export default function RemoteCard({ id, title, organization, category, location }: Opportunity) {
  return (
    <Link
      href={`/opportunities/${id}`}
      className="group rounded-xl border border-accent/20 bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-lg"    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
          {category}
        </span>
       <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">          Remote
        </span>
      </div>
      <h3 className="mb-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground mb-3">{organization}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">📍 {location}</span>
        <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          View <ArrowUpRight className="inline-block ml-1 h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}