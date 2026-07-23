"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar"

const HIDDEN_ON = ["/login", "/signup"];

export function ConditionalNavbar() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((path) => pathname.startsWith(path))) return null;
  return <Navbar />;
}