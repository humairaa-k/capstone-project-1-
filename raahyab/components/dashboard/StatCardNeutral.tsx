import { LucideIcon } from "lucide-react";

interface StatCardSmallProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  urgent?: boolean;
}

export default function StatCardNeutral({icon: Icon, label, value, urgent = false,}: StatCardSmallProps) {
  return (
    <div className="relative rounded-2xl border border-foreground/10 bg-card p-4 min-h-[110px]">
      <div
        className={`absolute top-3.5 end-3.5 w-[30px] h-[30px] rounded-lg flex items-center justify-center ${
          urgent ? "bg-accent/10" : "bg-primary/10"
        }`}
      >
        <Icon
          size={18}
          strokeWidth={1.75}
          className={urgent ? "text-accent" : "text-primary"}
        />
      </div>

      <div className="mt-4">
        <p className="text-[15px] text-muted-foreground mb-1">{label}</p>
        <p
          className={`text-[26px] font-medium tracking-tight ${
            urgent ? "text-accent" : "text-foreground"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}