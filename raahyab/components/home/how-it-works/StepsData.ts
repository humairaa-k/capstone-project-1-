import { LucideIcon, Search, Bookmark, Send } from "lucide-react";

export type StepDataType = {
  id: number;
  number: string;
  key: "step1" | "step2" | "step3";
  icon: LucideIcon;
};

export const steps: StepDataType[] = [
  {
    id: 1,
    number: "01",
    key: "step1",
    icon: Search,
  },
  {
    id: 2,
    number: "02",
    key: "step2",
    icon: Bookmark,
  },
  {
    id: 3,
    number: "03",
    key: "step3",
    icon: Send,
  },
];