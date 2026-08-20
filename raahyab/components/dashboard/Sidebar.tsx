"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, FileText, Bookmark, User, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";

const navItems = [
  { href: "/dashboard", key: "dashboard", icon: LayoutDashboard },
  { href: "/dashboard/add-opportunity", key: "addOpportunity", icon: PlusCircle },
  { href: "/dashboard/saved", key: "saved", icon: Bookmark },
  { href: "/dashboard/cv-builder", key: "cvBuilder", icon: FileText },
  { href: "/dashboard/profile", key: "profile", icon: User },
];

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { dir } = useLanguage();
  const t = useTranslations("nav");

  const initials = (session?.user?.username ?? session?.user?.name ?? "?")
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav aria-label="Dashboard navigation" className="flex flex-col gap-1 mt-0.5">
      {session?.user && (
        <div
          className={`flex items-center mb-3 rounded-2xl bg-primary/5 transition-all duration-200
            ${isOpen ? "gap-3 px-4 py-3.5" : "justify-center py-3"}`}
          title={!isOpen ? (session.user.username ?? session.user.name ?? "") : undefined}
        >
          <div className="flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-primary/15 text-primary text-sm font-semibold">
            {initials}
          </div>
          {isOpen && (
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-primary/70 mb-0.5">
                {t("signedIn")}
              </p>
              <p className="truncate text-sm font-semibold text-foreground/90 leading-tight">
                {session.user.username ?? session.user.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mx-1 mb-2 h-px bg-foreground/8" />

      {navItems.map(({ href, key, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            title={!isOpen ? t(key) : undefined}
            className={`group relative flex items-center rounded-xl text-sm font-medium transition-all duration-150
              ${isOpen ? "gap-3 px-4 py-2.5" : "justify-center px-2 py-2.5"}
              ${isActive
                ? "bg-primary/10 text-primary"
                : "text-foreground/70 hover:bg-foreground/[0.05] hover:text-foreground"
              }`}
          >
            {isActive && (
              <span
                className={`absolute top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-primary
                  ${dir === "rtl" ? "right-0" : "left-0"}`}
              />
            )}
            <Icon
              className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                isActive ? "" : "group-hover:scale-110"
              }`}
              strokeWidth={1.75}
            />
            {isOpen && <span>{t(key)}</span>}
          </Link>
        );
      })}
    </nav>
  );
}