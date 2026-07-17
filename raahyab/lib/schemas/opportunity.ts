import { z } from "zod";

export const opportunitySchema = z.object({
  title: z.string().min(6, "Title must be alteast 6 characters"),
  organization: z.string().min(2, "organization name must be atleast 2 characters"),
  category: z.enum(
    ["Job", "Internship", "Scholarship", "Remote Work", "Online Course", "Training", "Volunteer"],
    { message: "Please select a category" }
  ),
  location: z.string().min(2, "Location must be at least 2 characters"),

  type: z.enum(["On-site", "Remote", "Hybrid"], {
    message: "Please select a type",
  }),

  deadline: z
    .string()
    .min(1, "Deadline is required")
    .refine((date) => new Date(date) > new Date(), {
      message: "Deadline must be a future date",
    }),

  description: z
  .string()
  .min(10, "Description must be at least 10 characters"),

  requirements: z.string().min(3, "Please list at least one requirement"),
 
  tags: z.string().min(2, "Please add at least one tag"),
 
  applyLink: z.string().url("Please enter a valid URL"),

});

export type OpportunityFormData = z.infer<typeof opportunitySchema>

