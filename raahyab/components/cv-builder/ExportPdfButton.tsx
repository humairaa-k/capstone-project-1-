"use client";

import { useState, RefObject } from "react";
import { Download, Loader2 } from "lucide-react";

interface ExportPdfButtonProps {
  targetRef: RefObject<HTMLDivElement | null>;
  fileName?: string;
}

export function ExportPdfButton({ targetRef, fileName = "cv.pdf",}: ExportPdfButtonProps) {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async (): Promise<void> => {
    const node = targetRef.current;
    if (!node) {
      setError("Preview is not ready yet.");
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      // Dynamic import inside the handler — never at module scope — so this
      // module is never evaluated during Next.js SSR/prerender, avoiding
      // "window is not defined" errors from html2pdf.js's internals.
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
      setError("Something went wrong while generating the PDF. Please try again.");
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
        {isExporting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {isExporting ? "Generating PDF..." : "Download PDF"}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
