import { opportunitySchema } from "@/lib/schemas/opportunity";

const validData = {
  title: "Frontend Developer Intern",
  organization: "Kabul Tech",
  category: "Internship",
  location: "Kabul",
  type: "Remote",
  deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  description: "A beginner friendly internship for students.",
  requirements: "React, HTML/CSS",
  tags: "React, Next.js",
  applyLink: "https://example.com",
};

describe("Opportunity Schema", () => {
  it("passes with valid data", () => {
    const result = opportunitySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails when title is less than 6 characters", () => {
    const result = opportunitySchema.safeParse({ ...validData, title: "Hi" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Title must be alteast 6 characters");
  });

  it("fails when organization is less than 2 characters", () => {
    const result = opportunitySchema.safeParse({ ...validData, organization: "K" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "organization name must be atleast 2 characters"
    );
  });

  it("fails with an invalid category", () => {
    const result = opportunitySchema.safeParse({ ...validData, category: "Freelance" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Please select a category");
  });

  it("fails when location is less than 2 characters", () => {
    const result = opportunitySchema.safeParse({ ...validData, location: "K" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Location must be at least 2 characters");
  });

  it("fails with an invalid type", () => {
    const result = opportunitySchema.safeParse({ ...validData, type: "Freelance" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Please select a type");
  });

  it("fails when deadline is empty", () => {
    const result = opportunitySchema.safeParse({ ...validData, deadline: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Deadline is required");
  });

  it("fails when deadline is in the past", () => {
    const result = opportunitySchema.safeParse({
      ...validData,
      deadline: new Date("2020-01-01").toISOString(),
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Deadline must be a future date");
  });

  it("fails when description is less than 10 characters", () => {
    const result = opportunitySchema.safeParse({ ...validData, description: "Too short" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Description must be at least 10 characters"
    );
  });

  it("fails when requirements is less than 3 characters", () => {
    const result = opportunitySchema.safeParse({ ...validData, requirements: "Hi" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Please list at least one requirement");
  });

  it("fails when tags is less than 2 characters", () => {
    const result = opportunitySchema.safeParse({ ...validData, tags: "R" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Please add at least one tag");
  });

  it("fails with an invalid applyLink URL", () => {
    const result = opportunitySchema.safeParse({ ...validData, applyLink: "not-a-url" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Please enter a valid URL");
  });

  it("fails when all fields are empty", () => {
    const result = opportunitySchema.safeParse({
      title: "",
      organization: "",
      category: "",
      location: "",
      type: "",
      deadline: "",
      description: "",
      requirements: "",
      tags: "",
      applyLink: "",
    });
    expect(result.success).toBe(false);
  });
});