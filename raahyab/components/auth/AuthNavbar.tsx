"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { LogIn, LogOut, User, LayoutDashboard, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl"; // Added next-intl hook

export default function AuthNavButton() {
  const t = useTranslations("authNav"); // Hook initialization
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return <div className="w-28 h-9 rounded-full border border-foreground/10 animate-pulse" />;
  }

  if (session?.user) {
    const initial = session.user.username?.[0]?.toUpperCase() ?? "U";
    return (
      <div className="relative" ref={ref}>
        {/* Adjusted padding classes to use start/end logical properties */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full border border-foreground/15 hover:border-primary/40 hover:bg-primary/5 text-foreground text-sm font-medium ps-2 pe-3 py-1.5 transition-all duration-200"
        >
          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
            {initial}
          </span>
          <span className="max-w-30 truncate">{session.user.username}</span>
          <ChevronDown
            size={14}
            strokeWidth={2}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          /* Replaced right-0 with dynamic location anchors ltr:right-0 rtl:left-0 */
          <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 rounded-2xl border border-foreground/10 bg-card shadow-lg overflow-hidden z-50">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-primary/5"
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard size={15} strokeWidth={2} className="text-primary" />
              {t("dashboard")}
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-primary/5"
              onClick={() => setOpen(false)}
            >
              <User size={15} strokeWidth={2} className="text-primary" />
              {t("profile")}
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-300/20 border-t border-foreground/8"
            >
              <LogOut size={15} strokeWidth={2} />
              {t("logOut")}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-2 rounded-full border border-foreground/15 hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-foreground text-sm font-medium px-4 py-2 transition-all duration-200"
    >
      <LogIn size={15} strokeWidth={2} />
      {t("logIn")}
    </Link>
  );
}
