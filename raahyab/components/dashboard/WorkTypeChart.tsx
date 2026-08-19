"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslations } from "next-intl";
import { Radar } from "lucide-react";

interface WorkTypeDonutChartProps {
  data: { type: string; count: number }[];
}

const COLORS = [
  "var(--color-primary)", 
  "var(--color-foreground)",
  "#8B6F47",               //bronze
];

const chartConfig = {
  count: {
    label: "Opportunities",
  },
} satisfies ChartConfig;

export default function WorkTypeChart({ data }: WorkTypeDonutChartProps) {
  const t = useTranslations("dashboard");

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="relative rounded-3xl bg-primary/5 backdrop-blur-2xl p-6 sm:p-8 overflow-hidden my-8 border border-primary/10 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="flex items-center gap-2 text-foreground/90 font-medium">
          <Radar size={16} className="text-primary" />
          {t("workTypeChart.heading")}
        </h3>
        <span className="text-xs text-muted-foreground">{t("workTypeChart.thisMonth")}</span>
      </div>

      <div className="flex items-center gap-6">
        <ChartContainer config={chartConfig} className="h-[200px] w-[200px] shrink-0">
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="bg-background text-foreground border-border"
                />
              }
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="type"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={4}
              cornerRadius={12}
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex flex-col gap-3">
          {data.map((entry, index) => {
            const percentage = total > 0 ? Math.round((entry.count / total) * 100) : 0;
            return (
              <div key={entry.type} className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-foreground/80">{entry.type}</span>
                <span className="text-sm text-muted-foreground ml-auto pl-4">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}