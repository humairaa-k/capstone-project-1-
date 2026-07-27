import { StepDataType } from "./StepsData";
import { LucideIcon } from "lucide-react";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function StepCard({ number, title, description, icon:Icon, }: StepDataType) {
  return (
   <div className="relative bg-card dark:bg-background border border-accent/20 dark:border-gold-400/20 rounded-2xl p-6 sm:p-8">
     
      <span className="absolute top-4 end-5 text-4xl font-bold text-primary/10 dark:text-teal-100/10 select-none">
        {number}
      </span>

      <div className="w-12 h-12 bg-teal-100 dark:bg-teal-500/10 rounded-xl flex items-center justify-center text-2xl mb-5">
        <Icon className="h-6 w-6 text-primary"/>
      </div>

      <h3 className="text-lg font-semibold text-foreground dark:text-sand-100 mb-2">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground dark:text-warm-400 leading-relaxed">
        {description}
      </p>
   </div>
  )
}

