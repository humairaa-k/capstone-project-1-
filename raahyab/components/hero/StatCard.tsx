"use client";

import { useCounter } from "@/hooks/useCounter";

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
}

export default function StatCard({ value, suffix = "", label }: StatCardProps) {
  const count = useCounter(value, 1600, 1400);

  return (
    <div className="flex-1 text-center px-4 py-5 sm:px-8 sm:py-0 border-b sm:border-b-0 sm:border-r border-accent/20 last:border-b-0 sm:last:border-r-0">
      <div className="text-4xl sm:text-5xl font-serif italic text-primary">
        {count}
        {suffix}
      </div>

      <p className="mt-2 text-sm font-medium text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
