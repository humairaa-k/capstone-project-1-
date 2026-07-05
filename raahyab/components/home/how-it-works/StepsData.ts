import { LucideIcon, Search, Bookmark, Send } from "lucide-react";

export type StepDataType = {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const steps: StepDataType[] = [
  {
    id: 1,
    number: "01",
    title: "Browse",
    description: "Search and filter through jobs, scholarships, internships and more — all in one place.",
    icon: Search,
  },
  {
    id: 2,
    number: "02",
    title: "Save",
    description: "Bookmark opportunities you like so you can come back to them anytime.",
    icon: Bookmark,
  },
  {
    id: 3,
    number: "03",
    title: "Apply",
    description: "Click through directly to the official application and take the next step.",
    icon: Send,
  },
];