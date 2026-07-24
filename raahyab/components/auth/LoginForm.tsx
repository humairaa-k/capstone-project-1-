"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/schemas/auth";

interface LoginFormProps {
  callbackUrl?: string;
}

export default function LoginForm({ callbackUrl}: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setServerError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl || "/dashboard");
    router.refresh();
  };

  const inputClass =
    "w-full bg-transparent rounded-xl border border-foreground/12 px-4 py-3 text-sm text-foreground bg-background focus:border-primary placeholder:text-muted-foreground/50 focus:outline-none transition-all duration-200";
  const labelClass = "block text-xs font-medium text-foreground/80 mb-2";
  const errorClass = "text-xs text-red-500 mt-1.5";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl p-6 sm:p-8"
    >
      <h1 className="text-2xl font-medium text-foreground mb-1">Login</h1>
      <p className="text-sm text-muted-foreground mb-6">Log in to your RaahYab account.</p>

      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      {justRegistered && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-primary/10 text-primary text-sm">
          Account created! Please log in.
        </div>
      )}

      {serverError && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
          {serverError}
        </div>
      )}

      <div className="mb-4">
        <label className={labelClass}>Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className={inputClass}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div className="mb-6">
        <label className={labelClass}>Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="Your password"
          className={inputClass}
        />
        {errors.password && <p className={errorClass}>{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>

      <p className="text-sm text-muted-foreground text-center mt-5">
        Don't have an account?{" "}
        <a href="/signup" className="text-primary font-medium hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}
