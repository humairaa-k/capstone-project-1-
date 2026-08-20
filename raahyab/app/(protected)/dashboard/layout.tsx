"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { usePathname } from "next/navigation";

const NAVBAR_HEIGHT = 64;
const HEADING_HEIGHT = 160;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const fixedHeadingSavedPage = pathname === "/dashboard/saved";
  const sidebarTop = fixedHeadingSavedPage ? NAVBAR_HEIGHT + HEADING_HEIGHT : 96;
  const sidebarMaxHeight = fixedHeadingSavedPage 
    ? `calc(100vh - ${NAVBAR_HEIGHT + HEADING_HEIGHT}px)` 
    : "calc(100vh - 6rem)";
    

  return (
    <div className="flex gap-9 p-4 pt-24 min-h-screen bg-background ml-4">

      <div className="relative hidden sm:block shrink-0">
        <aside
          className={`sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto h-fit rounded-3xl mb-8 bg-card border border-foreground/10 animate-fade-in-up transition-all duration-200
            ${isSidebarOpen ? "w-60 p-4" : "w-20 p-3"}`}
            style={{ top: `${sidebarTop}px`, maxHeight: sidebarMaxHeight }}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </aside>

        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isSidebarOpen}
          className="absolute top-10 -right-8 flex items-center justify-center h-8 w-8 rounded bg-card border border-foreground/10 text-foreground/60 hover:text-foreground shadow-sm transition-colors duration-150 z-10"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" strokeWidth={1.75} />
          ) : (
            <PanelLeftOpen className="w-5 h-5" strokeWidth={1.75} />
          )}
        </button>
      </div>

      <section className="flex-1 min-w-0">{children}</section>
    </div>
  );
}