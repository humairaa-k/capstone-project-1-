"use client";

import { SkillEntry } from "@/types/cv";
import { Plus, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";
import { UseCVDataReturn } from "@/hooks/useCVData";
import { useTranslations } from "next-intl";

type CVBuilderFormProps = UseCVDataReturn;

const inputClass =
  "w-full rounded-lg border border-foreground/15 bg-card px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary";

const labelClass = "mb-1 block text-xs font-medium text-muted-foreground";

const skillLevels: SkillEntry["level"][] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

export function CVBuilderForm({data, updatePersonalDetails, addExperience, updateExperience,
  removeExperience, addEducation, updateEducation, removeEducation, addSkill,
  updateSkill, removeSkill, }: CVBuilderFormProps) {
  const t = useTranslations("cvBuilderPage.form");
  const { personalDetails, experience, education, skills } = data;

  return (
    <div className="space-y-8">
      {/* Personal details */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Personal Details
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>{t("fullName")}</label>
            <input
              className={inputClass}
              value={personalDetails.fullName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updatePersonalDetails("fullName", e.target.value)
              }
            />
          </div>
          <div>
            <label className={labelClass}> {t("jobTitle")} </label>
            <input
              className={inputClass}
              value={personalDetails.jobTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updatePersonalDetails("jobTitle", e.target.value)
              }
            />
          </div>
          <div>
            <label className={labelClass}> {t("email")} </label>
            <input
              type="email"
              className={inputClass}
              value={personalDetails.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updatePersonalDetails("email", e.target.value)
              }
            />
          </div>
          <div>
            <label className={labelClass}> {t("phone")} </label>
            <input
              className={inputClass}
              value={personalDetails.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updatePersonalDetails("phone", e.target.value)
              }
            />
          </div>
          <div>
            <label className={labelClass}>{t("location")}</label>
            <input
              className={inputClass}
              value={personalDetails.location}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updatePersonalDetails("location", e.target.value)
              }
            />
          </div>
          <div>
            <label className={labelClass}> {t("website")} </label>
            <input
              className={inputClass}
              value={personalDetails.website}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updatePersonalDetails("website", e.target.value)
              }
            />
          </div>
        </div>
        <div className="mt-3">
          <label className={labelClass}> {t("summary")} </label>
          <textarea
            rows={3}
            className={inputClass}
            value={personalDetails.summary}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              updatePersonalDetails("summary", e.target.value)
            }
          />
        </div>
      </section>

      {/* Experience */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">{t("experience")}</h2>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover"
          >
            <Plus className="h-3.5 w-3.5" /> {t("add")}
          </button>
        </div>

        <div className="space-y-4">
          {experience.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-foreground/10 p-3"
            >
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeExperience(item.id)}
                  className="text-foreground/40 hover:text-red-600"
                  aria-label={t("removeExperienceAria")}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  className={inputClass}
                  placeholder={t("rolePlaceholder")}
                  value={item.role}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateExperience(item.id, "role", e.target.value)
                  }
                />
                <input
                  className={inputClass}
                  placeholder={t("companyPlaceholder")}
                  value={item.company}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateExperience(item.id, "company", e.target.value)
                  }
                />
                <input
                  className={inputClass}
                  placeholder={t("locationPlaceholder")}
                  value={item.location}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateExperience(item.id, "location", e.target.value)
                  }
                />
                <div className="flex flex-row items-center gap-2">
                  <input
                    type="month"
                    className={inputClass}
                    value={item.startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateExperience(item.id, "startDate", e.target.value)
                    }
                  />
                  <input
                    type="month"
                    className={inputClass}
                    value={item.endDate}
                    disabled={item.current}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateExperience(item.id, "endDate", e.target.value)
                    }
                  />
                </div>
              </div>

              <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={item.current}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateExperience(item.id, "current", e.target.checked)
                  }
                />
                 {t("currentlyWorking")}
              </label>

              <textarea
                rows={2}
                placeholder={t("descriptionPlaceholder")}
                className={`${inputClass} mt-2`}
                value={item.description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  updateExperience(item.id, "description", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground"> {t("education")} </h2>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover"
          >
            <Plus className="h-3.5 w-3.5" /> {t("add")}
          </button>
        </div>

        <div className="space-y-4">
          {education.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-foreground/10 p-3"
            >
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeEducation(item.id)}
                  className="text-foreground/40 hover:text-red-600"
                  aria-label={t("removeEducationAria")}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  className={inputClass}
                  placeholder={t("degreePlaceholder")}
                  value={item.degree}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateEducation(item.id, "degree", e.target.value)
                  }
                />
                <input
                  className={inputClass}
                  placeholder={t("fieldPlaceholder")}
                  value={item.field}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateEducation(item.id, "field", e.target.value)
                  }
                />
                <input
                  className={inputClass}
                  placeholder={t("institutionPlaceholder")}
                  value={item.institution}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateEducation(item.id, "institution", e.target.value)
                  }
                />
                <div className="flex items-center gap-2">
                  <input
                    type="month"
                    className={inputClass}
                    value={item.startDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateEducation(item.id, "startDate", e.target.value)
                    }
                  />
                  <input
                    type="month"
                    className={inputClass}
                    value={item.endDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateEducation(item.id, "endDate", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">{t("skills")}</h2>
          <button
            type="button"
            onClick={addSkill}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover"
          >
            <Plus className="h-3.5 w-3.5" /> {t("add")}
          </button>
        </div>

        <div className="space-y-2">
          {skills.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <input
                className={inputClass}
                placeholder={t("skillNamePlaceholder")}
                value={item.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateSkill(item.id, "name", e.target.value)
                }
              />
              <select
                className={inputClass}
                value={item.level}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  updateSkill(
                    item.id,
                    "level",
                    e.target.value as SkillEntry["level"]
                  )
                }
              >
                {skillLevels.map((level) => (
                  <option key={level} value={level}>
                    {t(`levels.${level}`)}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeSkill(item.id)}
                className="text-foreground/40 hover:text-red-600"
                aria-label={t("removeSkillAria")}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
