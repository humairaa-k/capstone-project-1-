export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string; // ISO "YYYY-MM"
  endDate: string; // ISO "YYYY-MM", ignored if current is true
  current: boolean;
  description: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface SkillEntry {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface CVData {
  personalDetails: PersonalDetails;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillEntry[];
}

export const emptyPersonalDetails: PersonalDetails = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
};

export function createEmptyExperience(): ExperienceEntry {
  return {
    id: crypto.randomUUID(),
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  };
}

export function createEmptyEducation(): EducationEntry {
  return {
    id: crypto.randomUUID(),
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
  };
}

export function createEmptySkill(): SkillEntry {
  return {
    id: crypto.randomUUID(),
    name: "",
    level: "Intermediate",
  };
}
