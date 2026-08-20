import { StepDataType } from "./StepsData";
import { LucideIcon } from "lucide-react";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function StepCard({ number, title, description, icon:Icon, }: StepCardProps) {
  return (
  <div className="relative bg-white dark:bg-card border border-accent/20 dark:border-gold-400/20 rounded-2xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
  <span className="absolute top-4 right-6 text-6xl font-bold text-primary/10 select-none">
    {number}
  </span>
  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
    <Icon className="w-6 h-6 text-primary" />
  </div>
  <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
  <p className="text-sm text-muted-foreground">{description}</p>
</div>
  )
}

