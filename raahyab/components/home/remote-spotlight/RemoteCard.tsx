import Link from "next/link";
import { Opportunity } from "@/types";
import { ArrowUpRight, MapPin, Wifi } from "lucide-react";

export default function RemoteCard({ id, title, organization, category, location }: Opportunity) {
  return (
    <Link
      href={`/opportunities/${id}`}
      className="group relative flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_28px_-8px_rgba(15,118,110,0.25)] overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/30" />

      <div className="relative flex items-center gap-2 mb-4">
        <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">
          {category}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
          <Wifi size={11} strokeWidth={2.5} />
          Remote
        </span>
      </div>

      <h3 className="relative mb-1.5 text-base font-semibold text-foreground leading-snug transition-colors group-hover:text-primary line-clamp-2">
        {title}
      </h3>

      <div className="relative flex items-center gap-2 mb-5">
        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
          {organization?.charAt(0)}
        </div>
        <p className="text-xs text-muted-foreground truncate">{organization}</p>
      </div>

      <div className="relative mt-auto flex items-center justify-between pt-4 border-t border-border/50">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <MapPin size={13} className="text-primary/60" />
          {location}
        </span>
        <span className="flex items-center gap-1 text-xs text-primary font-semibold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          View
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}