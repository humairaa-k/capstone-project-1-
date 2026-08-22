/**
 * @jest-environment node
 */
import { prismaMock } from "../mocks/prismaMock";
import { GET, POST } from "@/app/api/opportunities/route";

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
  updatedAt: null,
  pendingAction: null,
  previousState: null,
};

// A payload that satisfies opportunitySchema (requirements/tags are
// comma-separated strings at this stage, split into arrays by the route).
const validPayload = {
  title: "Frontend Developer Intern",
  organization: "Kabul Tech",
  category: "Internship",
  location: "Kabul",
  type: "Remote",
  deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days out
  description: "A beginner friendly internship for students.",
  requirements: "React, HTML/CSS",
  tags: "React, Next.js",
  applyLink: "https://example.com",
};

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/opportunities", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("GET /api/opportunities", () => {
  it("returns only approved opportunities ordered by createdAt desc", async () => {
    prismaMock.opportunity.findMany.mockResolvedValue([mockOpportunity] as any);

    const response = await GET();
    const body = await response.json();

    expect(prismaMock.opportunity.findMany).toHaveBeenCalledWith({
      where: { status: "approved" },
      orderBy: { createdAt: "desc" },
    });
    expect(response.status).toBe(200);
    expect(body).toHaveLength(1);
    expect(body[0].status).toBe("approved");
  });

  it("returns an empty array when there are no approved opportunities", async () => {
    prismaMock.opportunity.findMany.mockResolvedValue([]);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual([]);
  });

  it("returns 500 when the database call fails", async () => {
    prismaMock.opportunity.findMany.mockRejectedValue(new Error("DB down"));

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Failed to load opportunities.");
  });
});

describe("POST /api/opportunities", () => {
  it("creates an opportunity with status pending and splits requirements/tags", async () => {
    prismaMock.opportunity.create.mockResolvedValue({
      ...mockOpportunity,
      status: "pending",
    } as any);

    const response = await POST(makeRequest(validPayload));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(prismaMock.opportunity.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          title: validPayload.title,
          status: "pending",
          requirements: ["React", "HTML/CSS"],
          tags: ["React", "Next.js"],
        }),
      })
    );
    expect(body.status).toBe("pending");
  });

  it("trims whitespace and drops empty entries from requirements/tags", async () => {
    prismaMock.opportunity.create.mockResolvedValue(mockOpportunity as any);

    const messyPayload = {
      ...validPayload,
      requirements: "React,  , HTML/CSS ,",
      tags: " React ,Next.js,",
    };

    await POST(makeRequest(messyPayload));

    expect(prismaMock.opportunity.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          requirements: ["React", "HTML/CSS"],
          tags: ["React", "Next.js"],
        }),
      })
    );
  });

  it("returns 400 with flattened errors when the payload is invalid", async () => {
    const invalidPayload = { ...validPayload, title: "hi", applyLink: "not-a-url" };

    const response = await POST(makeRequest(invalidPayload));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.fieldErrors.title).toBeDefined();
    expect(body.error.fieldErrors.applyLink).toBeDefined();
    expect(prismaMock.opportunity.create).not.toHaveBeenCalled();
  });

  it("rejects a deadline that is not in the future", async () => {
    const pastDeadlinePayload = {
      ...validPayload,
      deadline: new Date("2020-01-01").toISOString(),
    };

    const response = await POST(makeRequest(pastDeadlinePayload));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.fieldErrors.deadline).toBeDefined();
  });

  it("returns 500 when the database call fails", async () => {
    prismaMock.opportunity.create.mockRejectedValue(new Error("DB down"));

    const response = await POST(makeRequest(validPayload));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Failed to create opportunity.");
  });
});