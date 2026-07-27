"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmissionsTrend } from "@/lib/opportunities";
import { useTranslations } from "next-intl";

export default function SubmissionsTrendChart({ trendData }: { trendData: SubmissionsTrend }) {
  const t = useTranslations("dashboard");
  const [range, setRange] = useState<"week" | "month" | "all">("all");
  const data = trendData[range];

  const chartConfig = {
    submissions: {
      label: t("submissions"),
      color: "var(--color-primary)",
    },
  } satisfies ChartConfig;

  return (
    <div className="rounded-3xl border border-primary/15 bg-primary/5 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-foreground">{t("trendChart.heading")}</h3>
        <Select value={range} onValueChange={(v) => setRange(v as typeof range)}>
          <SelectTrigger className="w-[130px] h-8 text-xs bg-card border-foreground/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">{t("trendChart.week")}</SelectItem>
            <SelectItem value="month">{t("trendChart.month")}</SelectItem>
            <SelectItem value="all">{t("trendChart.allTime")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ChartContainer config={chartConfig} className="h-[180px] w-full">
        <AreaChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
          <defs>
            <linearGradient id="fillSubmissions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="submissions"
            type="monotone"
            fill="url(#fillSubmissions)"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}