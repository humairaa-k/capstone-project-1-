import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SignupContent from "@/components/auth/SignupContent";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your RaahYab account.",
};

export default function SignupPage() {
  return <SignupContent />;
}