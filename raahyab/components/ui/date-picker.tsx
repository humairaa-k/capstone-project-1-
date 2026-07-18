// components/ui/date-picker.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select a date",
  className,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "w-full bg-transparent rounded-xl border border-foreground/12 px-4 py-3 text-sm text-left text-foreground",
            "flex items-center justify-between gap-2",
            "focus:border-primary focus:outline-none transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
        >
          <span className={cn(!value && "text-muted-foreground/50")}>
            {value ? format(value, "PPP") : placeholder}
          </span>
          <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
        </button>
      </PopoverTrigger>
<PopoverContent
  className="w-auto p-0 bg-popover text-popover-foreground border border-border shadow-lg z-50"
  align="start"
>
  <Calendar
    mode="single"
    selected={value}
    onSelect={(date) => {
      onChange(date);
      setOpen(false);
    }}
  />
</PopoverContent>
    </Popover>
  );
}