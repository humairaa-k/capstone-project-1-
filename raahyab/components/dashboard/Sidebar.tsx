"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, FileText, Bookmark, User } from "lucide-react";

const navItems = [
  { href: "/add-opportunity", label: "Add Opportunity", icon: PlusCircle },
  { href: "/dashboard/cv-builder", label: "CV Builder", icon: FileText },
  { href: "/saved", label: "Saved Opportunities", icon: Bookmark },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard navigation" className="flex flex-col gap-1.5 mt-25">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-150 ${
              isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-primary/10"
            }`}
          >
            <Icon className="w-4 h-4" strokeWidth={1.75} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}