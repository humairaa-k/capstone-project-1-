"use client";

import { useRef } from "react";
import { useCVData } from "@/hooks/useCVData";
import { useTranslations } from "next-intl";
import { CVBuilderForm } from "@/components/cv-builder/CVBuilderForm"
import { CVPreview } from "@/components/cv-builder/CV-Preview";
import { ExportPdfButton } from "@/components/cv-builder/ExportPdfButton";

export default function CVBuilderPage() {
  const t = useTranslations("cvBuilderPage");
  const cv = useCVData();
  const previewRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="min-h-screen bg-background px-6 py-10 mt-14">
      <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground italic">{t("title")}</h1>
        <ExportPdfButton
          targetRef={previewRef}
          fileName={`${cv.data.personalDetails.fullName || "cv"}.pdf`}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-card p-6 shadow-sm">
          <CVBuilderForm {...cv} />
        </div>

        <div className="sticky top-10 self-start overflow-auto rounded-2xl bg-surface p-6">
          <CVPreview ref={previewRef} data={cv.data} />
        </div>
      </div>
    </main>
  );
}
