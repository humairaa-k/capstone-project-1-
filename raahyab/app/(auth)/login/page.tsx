import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { GradientPanel } from "@/components/auth/GradientPanel";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your RaahYab account.",
};

 type SearchParams = Promise<{ [key:string]: string | string[] | undefined }>

export default async function LoginPage({ searchParams,}: {searchParams: SearchParams}) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = 
  typeof params?.callbackUrl === "string" ? params.callbackUrl : "/dashboard";

  if(session?.user){
    redirect(callbackUrl)
  }

  return (
    <main className="min-h-screen bg-background p-4 lg:p-6">

      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="mx-auto max-w-5xl">

        {/* mobile */}
        <div className="lg:hidden">

          <GradientPanel>

            <h1 className="text-3xl font-semibold text-white">
              Welcome back to Raahyab
            </h1>

            <p className="mt-3 text-sm text-white/80 mb-6">
             Your next opportunity is waiting.
            </p>

          </GradientPanel>

          <div className="-mt-8 relative z-10 mx-4 rounded-3xl border border-black/5 bg-card p-8 shadow-xl">

            <LoginForm callbackUrl={callbackUrl}/>

          </div>

        </div>

        {/* desktop */}
        <div className="hidden lg:grid lg:grid-cols-[.85fr_1fr] overflow-hidden rounded-[32px] border border-black/5 bg-card shadow-xl">

         <div className="flex items-center justify-center bg-card p-10">
            <div className="w-full max-w-md">
              <LoginForm callbackUrl={callbackUrl}/>
            </div>

          </div>
          
          <GradientPanel>

          <div className="font-serif text-2xl italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            Raahyab
          </div>

            <div className="mt-auto">
              <h1 className="text-[42px] font-semibold leading-tight text-white mb-4">
               Welcome back to <br /> Raahyab
              </h1>

              <p className="max-w-sm text-white/80 mb-12">
               Your next opportunity is waiting.
              </p>


            </div>

          </GradientPanel>

        </div>
      </div>

    </main>
  );
}
