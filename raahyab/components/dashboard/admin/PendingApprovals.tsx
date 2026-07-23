"use client";

import { Opportunity } from "@/types";
import { useState } from "react";
import { Clock } from "lucide-react";

function daysWaiting(opp: Opportunity) {
  const since = opp.updatedAt ?? opp.createdAt;
  const created = new Date(since);
  const now = new Date();
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
}

const GRID_COLS = "grid-cols-[2fr_auto] lg:grid-cols-[2fr_1fr_1fr_auto]";

export default function PendingApprovals({ data }: { data: Opportunity[] }) {
  const [items, setItems] = useState(data);
  const hasUrgent = items.some((opp) => daysWaiting(opp) >= 3);

  const handleApprove = async (id: string) => {
  setItems((prev) => prev.filter((o) => o.id !== id));
  await fetch(`/api/opportunities/${id}/decision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "approve" }),
  });
};

 const handleReject = async (id: string) => {
  setItems((prev) => prev.filter((o) => o.id !== id));
  await fetch(`/api/opportunities/${id}/decision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "reject" }),
  });
};

  return (
    <div className="rounded-3xl border border-foreground/10 bg-card mb-6 overflow-hidden">
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-foreground/10">
        <div className="flex items-center gap-2.5">
          {hasUrgent && (
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
            </span>
          )}
          <h3 className="text-base font-medium text-foreground">Pending Approvals</h3>
        </div>
        <span className="text-xs font-medium bg-accent/10 text-accent px-2.5 py-1 rounded-full">
          {items.length} waiting
        </span>
      </div>

      {items.length === 0 ? (
        <p className="px-6 py-10 text-sm text-muted-foreground text-center">
          Nothing waiting on you right now.
        </p>
      ) : (
        <>
      <div className={`grid ${GRID_COLS} items-center gap-3 px-5 sm:px-6 py-2.5 bg-foreground/5 w-full`}>
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground justify-self-start">
          Title & Company
        </span>
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground justify-self-start hidden lg:block">
          Category
        </span>
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground justify-self-start hidden lg:block">
          Last Updated
        </span>
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground justify-self-start ">
          Actions
        </span>
      </div>

      <div className="divide-y divide-foreground/8">
          {items
            .sort((a, b) => daysWaiting(b) - daysWaiting(a))
            .map((opp) => {
              const waiting = daysWaiting(opp);
              const isUrgent = waiting >= 3;

              return (
                <div
                  key={opp.id}
                  className={`grid ${GRID_COLS} gap-3 items-center px-5 sm:px-6 py-4 border-l-[3px] transition-colors hover:bg-accent/4 ${
                    isUrgent ? "border-l-accent" : "border-l-transparent"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate mb-0.5">{opp.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{opp.organization}</p>
                  </div>

                  <div className="hidden lg:block">
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      {opp.category}
                    </span>
                  </div>

                  <div
                    className={`hidden lg:flex items-center gap-1 text-xs ${
                      isUrgent ? "text-accent font-medium" : "text-muted-foreground"
                    }`}
                  >
                    <Clock size={12} strokeWidth={2} />
                    {waiting === 0 ? "today" : `${waiting}d`}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(opp.id)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-primary/8 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(opp.id)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-400/3 text-muted-foreground border border-red-500/30 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        </>
      )}
    </div>
    
  );
}