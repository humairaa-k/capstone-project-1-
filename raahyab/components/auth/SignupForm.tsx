"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signupSchema, SignupFormData } from "@/lib/schemas/auth";
import { toast } from "sonner";

export default function SignupForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit,formState: { errors, isSubmitting }, } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

const onSubmit = async (data: SignupFormData) => {
  setServerError(null);

  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = await response.json();
    setServerError(result.error || "Something went wrong.");
    return;
  }

  toast.success("Account created successfully!");

  setTimeout(() => {
    router.push("/login");
  }, 1200);
};

  const inputClass =
    "w-full bg-background rounded-xl border border-foreground/12 px-4 py-3 text-sm text-foreground focus:border-primary placeholder:text-muted-foreground/50 focus:outline-none transition-all duration-200";
  const labelClass = "block text-xs font-medium text-foreground/80 mb-2";
  const errorClass = "text-xs text-red-500 mt-1.5";

  return (
    <div className="w-full">
      <h1 className="text-3xl font-medium text-foreground mb-1">Join Us</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Create an account to post and track opportunities.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {serverError && (
          <div className="px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
            {serverError}
          </div>
        )}

        <div>
          <label className={labelClass}>Full Name</label>
          <input {...register("username")} placeholder="John Doe" className={inputClass} />
          {errors.username && <p className={errorClass}>{errors.username.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input {...register("email")} type="email" placeholder="you@example.com" className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Password</label>
            <input {...register("password")} type="password" placeholder="At least 8 characters" className={inputClass} />
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Confirm Password</label>
            <input {...register("confirmPassword")} type="password" placeholder="Repeat password" className={inputClass} />
            {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 text-sm transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Continue"}
        </button>

        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
         <Link
           href="/login"
           className="text-primary font-medium hover:underline"
         >
           Log in
         </Link>       
        </p>
{/* 
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="text-xs text-muted-foreground">Or</span>
          <div className="flex-1 h-px bg-foreground/10" />
        </div> */}

        {/* <button
          type="button"
          disabled
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-foreground/12 py-3.5 text-sm font-medium text-foreground/50 cursor-not-allowed"
        >
          Sign up with Google 
        </button> */}
      </form>
    </div>
  );
}