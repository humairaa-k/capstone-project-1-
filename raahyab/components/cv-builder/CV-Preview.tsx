"use client";

import { forwardRef } from "react";
import { CVData } from "@/types/cv";

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  function CVPreview({ data }, ref) {
    const { personalDetails, experience, education, skills } = data;

    return (
      <div ref={ref} className="bg-white p-8" style={{ backgroundColor: "#ffffff", color: "#1d293d" }}>
        <header className="border-b pb-5" style={{ borderColor: "#e2e8f0" }}>
          <h1 className="text-3xl font-bold">{personalDetails.fullName || "Your Name"}</h1>
          {personalDetails.jobTitle && (
            <p className="mt-1 text-lg" style={{ color: "#475569" }}>{personalDetails.jobTitle}</p>
          )}
          <p className="mt-3 text-sm" style={{ color: "#475569" }}>
            {[personalDetails.email, personalDetails.phone, personalDetails.location, personalDetails.website]
              .filter(Boolean)
              .join(" | ")}
          </p>
        </header>

        {personalDetails.summary && (
          <section className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: "#0f766e" }}>Profile</h2>
            <p className="mt-2 text-sm leading-6">{personalDetails.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: "#0f766e" }}>Experience</h2>
            <div className="mt-3 space-y-4">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{item.role || "Role"}</h3>
                      <p className="text-sm" style={{ color: "#475569" }}>{[item.company, item.location].filter(Boolean).join(" | ")}</p>
                    </div>
                    <p className="text-right text-xs" style={{ color: "#64748b" }}>{item.startDate} - {item.current ? "Present" : item.endDate}</p>
                  </div>
                  {item.description && <p className="mt-1 text-sm leading-6">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: "#0f766e" }}>Education</h2>
            <div className="mt-3 space-y-3">
              {education.map((item) => (
                <div key={item.id} className="flex justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{item.degree || "Degree"}{item.field && `, ${item.field}`}</h3>
                    <p className="text-sm" style={{ color: "#475569" }}>{item.institution}</p>
                  </div>
                  <p className="text-right text-xs" style={{ color: "#64748b" }}>{item.startDate} - {item.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: "#0f766e" }}>Skills</h2>
            <p className="mt-2 text-sm">{skills.map((item) => `${item.name} (${item.level})`).join(" | ")}</p>
          </section>
        )}
      </div>
    );
  }
);
