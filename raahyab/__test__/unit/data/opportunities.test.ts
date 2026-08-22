import { prismaMock } from "../../mocks/prismaMock";
import {
  getOpportunities,
  getOpportunityById,
  toFormData,
  getDashboardStats,
} from "@/lib/opportunities";

const mockOpportunity = {
  id: "1",
  title: "Frontend Developer Intern",
  organization: "Kabul Tech",
  category: "Internship",
  location: "Kabul",
  type: "Remote",
  deadline: new Date("2026-07-20").toISOString(),
  description: "A beginner friendly internship",
  requirements: ["React", "HTML/CSS"],
  applyLink: "https://example.com",
  tags: ["React", "Next.js"],
  status: "approved",
  featured: true,
  createdAt: new Date().toISOString(),
};

describe("getOpportunities", () => {

  it("returns list of opportunities from DB", async () => {
    prismaMock.opportunity.findMany.mockResolvedValue([mockOpportunity] as any);
    const result = await getOpportunities();
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Frontend Developer Intern");
  });

  it("returns empty array when no opportunities exist", async () => {
    prismaMock.opportunity.findMany.mockResolvedValue([]);
    const result = await getOpportunities();
    expect(result).toHaveLength(0);
  });

});

describe("getOpportunityById", () => {

  it("returns opportunity when id exists", async () => {
    prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);
    const result = await getOpportunityById("1");
    expect(result).not.toBeNull();
    expect(result?.title).toBe("Frontend Developer Intern");
  });

  it("returns null when id does not exist", async () => {
    prismaMock.opportunity.findUnique.mockResolvedValue(null);
    const result = await getOpportunityById("999");
    expect(result).toBeNull();
  });

});

describe("toFormData", () => {

  it("correctly maps opportunity to form data", () => {
    const result = toFormData(mockOpportunity as any);
    expect(result.title).toBe("Frontend Developer Intern");
    expect(result.organization).toBe("Kabul Tech");
    expect(result.requirements).toBe("React, HTML/CSS");
    expect(result.tags).toBe("React, Next.js");
  });

});

describe("getDashboardStats", () => {

  it("correctly counts total approved opportunities", async () => {
    prismaMock.opportunity.findMany.mockResolvedValue([mockOpportunity] as any);
    const stats = await getDashboardStats();
    expect(stats.total).toBe(1);
  });

  it("correctly counts internships", async () => {
    prismaMock.opportunity.findMany.mockResolvedValue([mockOpportunity] as any);
    const stats = await getDashboardStats();
    expect(stats.internships).toBe(1);
  });

  it("correctly counts remote opportunities", async () => {
    prismaMock.opportunity.findMany.mockResolvedValue([mockOpportunity] as any);
    const stats = await getDashboardStats();
    expect(stats.remote).toBe(1);
  });

  it("returns zero stats when no opportunities", async () => {
    prismaMock.opportunity.findMany.mockResolvedValue([]);
    const stats = await getDashboardStats();
    expect(stats.total).toBe(0);
    expect(stats.jobs).toBe(0);
    expect(stats.scholarships).toBe(0);
  });

  it("correctly calculates remote percentage", async () => {
    prismaMock.opportunity.findMany.mockResolvedValue([mockOpportunity] as any);
    const stats = await getDashboardStats();
    expect(stats.remotePercent).toBe(100);
  });

  it("workTypeBreakdown has Remote On-site and Hybrid", async () => {
    prismaMock.opportunity.findMany.mockResolvedValue([mockOpportunity] as any);
    const stats = await getDashboardStats();
    expect(stats.workTypeBreakdown).toHaveLength(3);
    expect(stats.workTypeBreakdown[0].type).toBe("Remote");
  });

});