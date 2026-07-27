"use client";

import { useState, RefObject } from "react";
import { Download, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface ExportPdfButtonProps {
  targetRef: RefObject<HTMLDivElement | null>;
  fileName?: string;
}

export function ExportPdfButton({ targetRef, fileName = "cv.pdf" }: ExportPdfButtonProps) {
  const t = useTranslations("cvBuilderPage.exportButton");
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async (): Promise<void> => {
    const node = targetRef.current;
    if (!node) {
      setError(t("notReadyError"));
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const options = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: fileName,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait" as const,
        },
        pagebreak: { mode: ["css", "avoid-all"] },
      };

      await html2pdf().set(options).from(node).save();
    } catch (err) {
      console.error("PDF export failed:", err);
      setError(t("genericError"));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover disabled:opacity-60"
      >
        {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {isExporting ? t("generating") : t("download")}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}