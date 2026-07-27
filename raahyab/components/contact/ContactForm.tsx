"use client";

import { ContactFormData, contactSchema } from '@/lib/schemas/contact';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from 'lucide-react';
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contactPage.form");

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(t("successToast"));
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("errorToast"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label htmlFor="name" className="block text-xs font-medium text-foreground/80 mb-2">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          placeholder={t("namePlaceholder")}
          className="w-full bg-transparent border-0 border-b border-foreground/15 pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-200"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-medium text-foreground/80 mb-2">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder={t("emailPlaceholder")}
          className="w-full bg-transparent border-0 border-b border-foreground/15 pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-200"
        />
        {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-medium text-foreground/80 mb-2">
          {t("subjectLabel")}
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          placeholder={t("subjectPlaceholder")}
          className="w-full bg-transparent border-0 border-b border-foreground/15 pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-200"
        />
        {errors.subject && <p className="text-xs text-red-500 mt-1.5">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium text-foreground/80 mb-2">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          placeholder={t("messagePlaceholder")}
          className="w-full bg-transparent border-0 border-b border-foreground/15 pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-200 resize-none"
        />
        {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-medium px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isSubmitting ? t("sending") : (
          <>
            {t("send")}
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}