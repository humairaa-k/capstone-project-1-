"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, FileText, Bookmark, User, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/add-opportunity", label: "Add Opportunity", icon: PlusCircle },
  { href: "/saved", label: "Saved Opportunities", icon: Bookmark },
  { href: "/dashboard/cv-builder", label: "CV Builder", icon: FileText },
  { href: "/dashboard/profile", label: "Profile", icon: User }

];

export default function Sidebar() {
  const pathname = usePathname();
  const {data: session} = useSession();

  return (
    <nav aria-label="Dashboard navigation" className="flex flex-col gap-1.5 mt-0.5">
      {session?.user && (
        <div className="mb-1.5 px-4 py-3">
          <p className="font-bold uppercase text-[17px] mb-0.5 tracking-[4px] text-primary/80">
            Signed in
          </p>
          <p className="mt-1 truncate text-[14px] font-semibold text-foreground/80 mb-1">
            {session.user.username ?? session.user.name}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {session.user.email}
          </p>
        </div>
      )}

      <div className="mx-4 my-1 h-px bg-foreground/10 mb-2.5" />

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