"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslations } from "next-intl";
import { Tags } from "lucide-react";

const chartConfig = {
  count: {
    label: "Opportunities",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

interface CategoryBarChartProps {
  data: { category: string; count: number }[];
}

export default function CategoryBarChart({ data }: CategoryBarChartProps) {
  const t = useTranslations("dashboard");

  return (
    <div className="relative rounded-3xl bg-primary/5 backdrop-blur-2xl p-6 sm:p-8 overflow-hidden my-8 border border-primary/10 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="flex items-center gap-2 text-foreground/90 font-medium">
          <Tags size={16} className="text-primary" />
          {t("categoryChart.heading")}
        </h3>
        <span className="text-xs text-muted-foreground">{t("categoryChart.thisMonth")}</span>
      </div>

      <ChartContainer config={chartConfig} className="h-[260px] w-full">
        <BarChart data={data} margin={{ left: -20, right: 10, top: 20, bottom: 40 }}>
          <defs>
            <linearGradient id="primaryBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={1} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.6} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            strokeDasharray="4 4"
            stroke="var(--color-primary)"
            strokeOpacity={0.15}
          />

          <XAxis
            dataKey="category"
            tickLine={true}
            axisLine={false}
            tickMargin={12}
            fontSize={11}
            stroke="var(--color-muted-foreground)"
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
            stroke="var(--color-muted-foreground)"
          />

          <ChartTooltip
            cursor={{ fill: "var(--color-primary)", fillOpacity: 0.06 }}
            content={
              <ChartTooltipContent
                indicator="dot"
                className="bg-background text-foreground border-border"
              />
            }
          />

          <Bar
            dataKey="count"
            fill="url(#primaryBar)"
            radius={[8, 8, 0, 0]}
            maxBarSize={44}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}