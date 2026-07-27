import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginContent from "@/components/auth/LoginContent";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your RaahYab account.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = typeof params?.callbackUrl === "string" ? params.callbackUrl : "/dashboard";

  if (session?.user) {
    redirect(callbackUrl);
  }

  return <LoginContent callbackUrl={callbackUrl} />;
}