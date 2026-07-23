"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

const HIDDEN_ON = ["/login", "/signup"];

export function ConditionalFooter() {
  const pathname = usePathname();

  if (HIDDEN_ON.some((path) => pathname.startsWith(path))) return null;

  return <Footer />;
}