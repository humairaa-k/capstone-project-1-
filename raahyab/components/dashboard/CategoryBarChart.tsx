// components/dashboard/CategoryBarChart.tsx
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Opportunities",
    color: "var(--color-accent)",
  },
} satisfies ChartConfig;

interface CategoryBarChartProps {
  data: { category: string; count: number }[];
}

export default function CategoryBarChart({ data }: CategoryBarChartProps) {
  return (
    <div className="relative rounded-3xl bg-black/90 p-6 sm:p-8 overflow-hidden my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white/90 font-medium text-background">By category</h3>
        <span className="text-xs text-muted-foreground">This month</span>
      </div>

      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart data={data} margin={{ left: -20, right: 10, top: 20 }}>
          <defs>
            <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="goldBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5B84E" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis
            dataKey="category"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            fontSize={12}
            stroke="rgba(253,246,236,0.5)"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
            stroke="rgba(253,246,236,0.5)"
          />
         <ChartTooltip
  cursor={{ fill: "rgba(255,255,255,0.06)" }}
  content={
    <ChartTooltipContent
      indicator="dot"
      className="bg-black text-white border-white/10"
    />
  }
/>
          <Bar
            dataKey="count"
            fill="url(#goldBar)"
            radius={[8, 8, 0, 0]}
            maxBarSize={44}
            activeBar={false}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}