"use client";

import { useForm } from "react-hook-form";
import { opportunitySchema, OpportunityFormData } from "@/lib/schemas/opportunity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Zap  } from "lucide-react";
import { Controller } from "react-hook-form";
import { DatePicker } from "@/components/ui/date-picker";

interface OpportunityFormProps {
  initialData?: Partial<OpportunityFormData>;
  onSubmit: (data: OpportunityFormData) => Promise<void>;
  submitLabel?: string;
}

const categories = ["Job", "Internship", "Scholarship", "Remote Work", "Online Course", "Training", "Volunteer"];
const types = ["On-site", "Remote", "Hybrid"];

export default function ({ initialData, onSubmit, submitLabel = "Publish Opportunity",}: OpportunityFormProps) {
 
  const { register, handleSubmit,  watch, control, formState: { errors, isSubmitting }, } = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: initialData,
  });

  const inputClass =
    "w-full bg-transparent rounded-xl border border-foreground/12 px-4 py-3 pb-2 text-sm text-foreground bg-background focus:border-primary placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-200";
  const labelClass = "block text-xs font-medium text-foreground/80 mb-2";
  const errorClass = "text-xs text-red-500 mt-1.5";
  const sectionHeadingClass = "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5";

  return (
    <>
      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
         className="rounded-3xl border border-foreground/10 bg-card p-2 sm:p-4 shadow-sm">

        <div className="p-6 sm:p-8">
          <h2 className={sectionHeadingClass}>Basic Info</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClass}>Title</label>
              <input {...register("title")} placeholder="Frontend Developer" className={inputClass} />
              {errors.title && <p className={errorClass}>{errors.title.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Organization</label>
              <input {...register("organization")} placeholder="Kabul Digital Agency" className={inputClass} />
              {errors.organization && <p className={errorClass}>{errors.organization.message}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <select {...register("category")} className={inputClass}>
              <option value="" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
                Select a category</option>
              {categories.map((c) => (
                <option key={c} value={c} style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
                  {c}</option>
              ))}
            </select>
            {errors.category && <p className={errorClass}>{errors.category.message}</p>}
          </div>
        </div>

       
        <div className="p-6 sm:p-8 -mt-8">
          <h2 className={sectionHeadingClass}>Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Location</label>
              <input {...register("location")} placeholder="Kabul" className={inputClass} />
              {errors.location && <p className={errorClass}>{errors.location.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select {...register("type")} className={inputClass}>
                <option value="" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
                  Select type</option>
                {types.map((t) => (
                  <option key={t} value={t}  style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
                    {t}</option>
                ))}
              </select>
              {errors.type && <p className={errorClass}>{errors.type.message}</p>}
            </div>

          <div>
           <label className={labelClass}>Deadline</label>
           <Controller
             name="deadline"
             control={control}
             render={({ field }) => (
               <DatePicker
                 value={field.value ? new Date(field.value) : undefined}
                 onChange={(date) => field.onChange(date?.toISOString())}
                 placeholder="Select deadline"
               />
               )}
             />
             {errors.deadline && <p className={errorClass}>{errors.deadline.message}</p>}
           </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 -mt-6">
          <h2 className={sectionHeadingClass}>Description</h2>
          <textarea
            {...register("description")}
            rows={5}
            placeholder="Describe the opportunity, responsibilities, and what makes it a good fit..."
            className={`${inputClass} resize-none`}
          />
          {errors.description && <p className={errorClass}>{errors.description.message}</p>}
        </div>

        <div className="p-6 sm:p-8 space-y-6 -mt-8">
          <h2 className={sectionHeadingClass}>Requirements & Tags</h2>

          <div>
            <label className={labelClass}>Requirements (comma-separated)</label>
            <input
              {...register("requirements")}
              placeholder="React, Next.js, 2+ years experience"
              className={inputClass}
            />
            {errors.requirements && <p className={errorClass}>{errors.requirements.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Tags (comma-separated)</label>
            <input
              {...register("tags")}
              placeholder="React, Frontend, Full-time"
              className={inputClass}
            />
            {errors.tags && <p className={errorClass}>{errors.tags.message}</p>}
          </div>
        </div>


        <div className="p-6 sm:p-8 -mt-8">
          <label className={labelClass}>Apply Link</label>
          <input
            {...register("applyLink")}
            placeholder="https://example.com/apply"
            className={inputClass}
          />
          {errors.applyLink && <p className={errorClass}>{errors.applyLink.message}</p>}
        </div>


       <div className="p-6">
       <button
         type="submit"
         disabled={isSubmitting}
         className="w-full rounded-2xl flex items-center  justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-4 text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap className="w-4 h-4 fill-current" />{isSubmitting ? " Saving..." : submitLabel}
       </button>
        </div>
   </form>
 
    </>
  );
}