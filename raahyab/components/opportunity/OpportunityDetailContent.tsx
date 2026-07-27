"use client";

import { useSaved } from "@/context/SavedContext";
import Link from "next/link";
import { categoryThemes } from "@/constants/opportunityThemes";
import {Bookmark, MapPin, BriefcaseBusiness, CalendarClock,
         Building2, Zap, ExternalLink, CheckCircle2, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { getDaysLeft } from "@/utils/getDeadlineStatus";
import { Opportunity } from "@/types";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

function formatFullDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function OpportunityDetailContent({ opportunity }: { opportunity: Opportunity }) {
  const t = useTranslations("opportunityDetail");
  const [showConfirm, setShowConfirm] = useState(false);

  const { toggleSave, isSaved } = useSaved();
  const saved = isSaved(opportunity.id);

  const daysLeft = getDaysLeft(opportunity.deadline);
  const isExpiring = daysLeft <= 7;

  const theme =
    categoryThemes[opportunity.category as keyof typeof categoryThemes] ??
    categoryThemes.Job;

  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status: sessionStatus } = useSession();

  const handleEdit = () => {
    if (sessionStatus === "loading") return;
    if (!session?.user) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/opportunities/${opportunity.id}/edit`)}`);
      return;
    }
    router.push(`/opportunities/${opportunity.id}/edit`);
  };

  const handleDeleteClick = () => {
    if (sessionStatus === "loading") return;
    if (!session?.user) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    setShowConfirm(false);
    try {
      const response = await fetch(`/api/opportunities/${opportunity.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      const data = await response.json();

      if (data.pending) {
        toast.success(t("toast.deletePending"));
      } else {
        toast.success(t("toast.deleteSuccess"));
        router.push("/opportunities");
      }
    } catch (error) {
      toast.error(t("toast.deleteError"));
    }
  };
  const { dir } = useLanguage();
  const BackIcon = dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12">

         <Link
           href="/opportunities"
           className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 group"
         >
           <BackIcon className="h-4 w-4 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform duration-200" />
           {t("backLink")}
         </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <div className={`relative rounded-2xl overflow-hidden border border-foreground/8 ${theme.wrapper} p-7`}>
              <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${theme.blob}`} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${theme.badge}`}>
                    {opportunity.category}
                  </span>

                  {isExpiring && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600">
                      <Zap className="h-3 w-3" />
                      {t("expiringSoon")}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-3">
                  {opportunity.title}
                </h1>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span className="text-base font-medium">{opportunity.organization}</span>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <MapPin className={`h-4 w-4 ${theme.accent}`} />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <BriefcaseBusiness className={`h-4 w-4 ${theme.accent}`} />
                    {opportunity.type}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <CalendarClock className={`h-4 w-4 ${theme.accent}`} />
                    {formatFullDate(opportunity.deadline)}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/8 bg-card overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  {t("about")}
                </h2>
                <p className="text-[15px] leading-8 text-foreground/80 max-w-2xl">
                  {opportunity.description}
                </p>
              </div>

              <div className="h-px bg-foreground/8 mx-6 sm:mx-8" />

              <div className="p-6 sm:p-8">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  {t("requirements")}
                </h2>
                <ul className="space-y-3">
                  {opportunity.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 pl-4 border-l-2 border-primary/20">
                      <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${theme.accent}`} />
                      <span className="text-sm text-foreground/80">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px bg-foreground/8 mx-6 sm:mx-8" />

              <div className="p-6 sm:p-8">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  {t("tags")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-foreground/8 bg-card p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  {t("deadlineLabel")}
                </p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {formatFullDate(opportunity.deadline)}
                </p>
                <div className={`mt-3 text-sm font-medium ${isExpiring ? "text-red-500" : "text-primary"}`}>
                  {daysLeft > 0 ? t("daysRemaining", { days: daysLeft }) : t("deadlinePassed")}
                </div>

                <div className="mt-3 h-1.5 bg-foreground/6 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isExpiring ? "bg-red-400" : "bg-primary"}`}
                    style={{ width: `${Math.min(100, Math.max(5, (daysLeft / 90) * 100))}%` }}
                  />
                </div>
              </div>

              
              <a href={opportunity.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-2xl bg-primary hover:bg-primary-hover text-white font-medium py-4 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
              >
                {t("applyNow")}
                <ExternalLink className="h-4 w-4" />
              </a>

              <button
                onClick={() => toggleSave(opportunity.id)}
                aria-label={saved ? t("removeSaveAria") : t("saveAria")}
                className={`flex items-center justify-center gap-2 w-full rounded-2xl border py-4 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5
                  ${saved
                    ? "border-primary/30 bg-teal-100 dark:bg-teal-500/10 text-primary"
                    : "border-foreground/10 text-muted-foreground hover:border-primary/30 hover:text-primary"
                  }`}
              >
                <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                {saved ? t("saved") : t("saveOpportunity")}
              </button>

              <div className="rounded-2xl border border-foreground/8 bg-card p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
                  {t("actions")}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleEdit}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-foreground/10 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-200"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    {t("edit")}
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    aria-label={t("deleteAria")}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-400/40 py-2.5 text-xs font-medium text-red-400 hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-400/10 dark:hover:border-red-500/40 transition-all duration-200"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {t("delete")}
                  </button>
                </div>
              </div>

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-amber-500 fill-amber-100" />
                {t("demoReminder")}
              </p>
            </div>
          </div>
        </div>

        <ConfirmDialog
          open={showConfirm}
          title={t("confirmDialog.title")}
          description={t("confirmDialog.description")}
          confirmText={t("confirmDialog.confirmText")}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      </div>
    </div>
  );
}