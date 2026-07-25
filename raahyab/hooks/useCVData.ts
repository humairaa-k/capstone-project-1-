"use client";

import { useCallback, useState } from "react";
import {
  CVData,
  EducationEntry,
  ExperienceEntry,
  PersonalDetails,
  SkillEntry,
  createEmptyEducation,
  createEmptyExperience,
  createEmptySkill,
  emptyPersonalDetails,
} from "@/types/cv";

export interface UseCVDataReturn {
  data: CVData;
  updatePersonalDetails: <K extends keyof PersonalDetails>(
    field: K,
    value: PersonalDetails[K]
  ) => void;

  addExperience: () => void;
  updateExperience: <K extends keyof ExperienceEntry>(
    id: string,
    field: K,
    value: ExperienceEntry[K]
  ) => void;
  removeExperience: (id: string) => void;

  addEducation: () => void;
  updateEducation: <K extends keyof EducationEntry>(
    id: string,
    field: K,
    value: EducationEntry[K]
  ) => void;
  removeEducation: (id: string) => void;

  addSkill: () => void;
  updateSkill: <K extends keyof SkillEntry>(
    id: string,
    field: K,
    value: SkillEntry[K]
  ) => void;
  removeSkill: (id: string) => void;
}

export function useCVData(initial?: Partial<CVData>): UseCVDataReturn {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(
    initial?.personalDetails ?? emptyPersonalDetails
  );
  const [experience, setExperience] = useState<ExperienceEntry[]>(
    initial?.experience ?? []
  );
  const [education, setEducation] = useState<EducationEntry[]>(
    initial?.education ?? []
  );
  const [skills, setSkills] = useState<SkillEntry[]>(initial?.skills ?? []);

  const updatePersonalDetails = useCallback(
    <K extends keyof PersonalDetails>(field: K, value: PersonalDetails[K]) => {
      setPersonalDetails((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const addExperience = useCallback(() => {
    setExperience((prev) => [...prev, createEmptyExperience()]);
  }, []);

  const updateExperience = useCallback(
    <K extends keyof ExperienceEntry>(
      id: string,
      field: K,
      value: ExperienceEntry[K]
    ) => {
      setExperience((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
      );
    },
    []
  );

  const removeExperience = useCallback((id: string) => {
    setExperience((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addEducation = useCallback(() => {
    setEducation((prev) => [...prev, createEmptyEducation()]);
  }, []);

  const updateEducation = useCallback(
    <K extends keyof EducationEntry>(
      id: string,
      field: K,
      value: EducationEntry[K]
    ) => {
      setEducation((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
      );
    },
    []
  );

  const removeEducation = useCallback((id: string) => {
    setEducation((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addSkill = useCallback(() => {
    setSkills((prev) => [...prev, createEmptySkill()]);
  }, []);

  const updateSkill = useCallback(
    <K extends keyof SkillEntry>(id: string, field: K, value: SkillEntry[K]) => {
      setSkills((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
      );
    },
    []
  );

  const removeSkill = useCallback((id: string) => {
    setSkills((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const data: CVData = { personalDetails, experience, education, skills };

  return {
    data,
    updatePersonalDetails,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
  };
}
    