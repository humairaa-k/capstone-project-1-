/**
 * @jest-environment node
 */
import { prismaMock } from "../mocks/prismaMock";

// The real generated client uses `import.meta.url` (ESM-only), which Jest's
// CommonJS transform can't parse. Mock it before the route imports it so the
// real file is never executed.
jest.mock("@/lib/generated/prisma/client", () => ({
  Prisma: { JsonNull: "JsonNull" },
}));

jest.mock("@/lib/auth", () => ({
  auth: jest.fn(),
}));

import { GET, PUT, DELETE } from "@/app/api/opportunities/[id]/route";
import { auth } from "@/lib/auth";
const mockAuth = auth as jest.Mock;

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

const validPayload = {
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

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

function makeRequest(body?: unknown, method = "GET") {
  return new Request("http://localhost/api/opportunities/1", {
    method,
    ...(body ? { body: JSON.stringify(body) } : {}),
    headers: { "Content-Type": "application/json" },
  });
}

describe("GET /api/opportunities/[id]", () => {
  it("returns the opportunity when found", async () => {
    prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);

    const response = await GET(makeRequest(), makeParams("1"));
    const body = await response.json();

    expect(prismaMock.opportunity.findUnique).toHaveBeenCalledWith({ where: { id: "1" } });
    expect(response.status).toBe(200);
    expect(body.id).toBe("1");
  });

  it("returns 404 when the opportunity does not exist", async () => {
    prismaMock.opportunity.findUnique.mockResolvedValue(null);

    const response = await GET(makeRequest(), makeParams("999"));
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error).toBe("Opportunity not found.");
  });

  it("returns 500 on database failure", async () => {
    prismaMock.opportunity.findUnique.mockRejectedValue(new Error("DB down"));

    const response = await GET(makeRequest(), makeParams("1"));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Failed to find opportunity.");
  });
});

describe("PUT /api/opportunities/[id]", () => {
  it("returns 400 when the payload is invalid", async () => {
    const response = await PUT(
      makeRequest({ ...validPayload, title: "hi" }, "PUT"),
      makeParams("1")
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.fieldErrors.title).toBeDefined();
    expect(prismaMock.opportunity.update).not.toHaveBeenCalled();
  });

  it("returns 404 when the opportunity does not exist", async () => {
    prismaMock.opportunity.findUnique.mockResolvedValue(null);

    const response = await PUT(makeRequest(validPayload, "PUT"), makeParams("999"));
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error).toBe("Opportunity not found.");
  });

  it("re-queues an approved opportunity as pending with a snapshot when edited", async () => {
    prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any); // status: approved
    prismaMock.opportunity.update.mockResolvedValue({
      ...mockOpportunity,
      status: "pending",
    } as any);

    await PUT(makeRequest(validPayload, "PUT"), makeParams("1"));

    expect(prismaMock.opportunity.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "1" },
        data: expect.objectContaining({
          status: "pending",
          pendingAction: "edit",
          previousState: mockOpportunity,
          requirements: ["React", "HTML/CSS"],
          tags: ["React", "Next.js"],
        }),
      })
    );
  });

  it("keeps status and previousState untouched when editing an already-pending opportunity", async () => {
    const pendingOpportunity = {
      ...mockOpportunity,
      status: "pending",
      previousState: { title: "Old title" },
    };
    prismaMock.opportunity.findUnique.mockResolvedValue(pendingOpportunity as any);
    prismaMock.opportunity.update.mockResolvedValue(pendingOpportunity as any);

    await PUT(makeRequest(validPayload, "PUT"), makeParams("1"));

    expect(prismaMock.opportunity.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "pending",
          pendingAction: "edit",
          previousState: { title: "Old title" },
          updatedAt: pendingOpportunity.updatedAt,
        }),
      })
    );
  });

  it("returns 500 on database failure", async () => {
    prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);
    prismaMock.opportunity.update.mockRejectedValue(new Error("DB down"));

    const response = await PUT(makeRequest(validPayload, "PUT"), makeParams("1"));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Failed to update opportunity.");
  });
});

describe("DELETE /api/opportunities/[id]", () => {
  it("returns 401 when there is no session", async () => {
    mockAuth.mockResolvedValue(null);

    const response = await DELETE(makeRequest(undefined, "DELETE"), makeParams("1"));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe("Unauthorized");
    expect(prismaMock.opportunity.findUnique).not.toHaveBeenCalled();
  });

  it("returns 404 when the opportunity does not exist", async () => {
    mockAuth.mockResolvedValue({ user: { id: "u1", role: "user" } });
    prismaMock.opportunity.findUnique.mockResolvedValue(null);

    const response = await DELETE(makeRequest(undefined, "DELETE"), makeParams("999"));
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error).toBe("Opportunity not found.");
  });

  it("deletes immediately when the session user is an admin", async () => {
    mockAuth.mockResolvedValue({ user: { id: "admin1", role: "admin" } });
    prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);
    prismaMock.opportunity.delete.mockResolvedValue(mockOpportunity as any);

    const response = await DELETE(makeRequest(undefined, "DELETE"), makeParams("1"));
    const body = await response.json();

    expect(prismaMock.opportunity.delete).toHaveBeenCalledWith({ where: { id: "1" } });
    expect(prismaMock.opportunity.update).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true });
  });

  it("flags for pending deletion when the session user is a regular user", async () => {
    mockAuth.mockResolvedValue({ user: { id: "u1", role: "user" } });
    prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);
    prismaMock.opportunity.update.mockResolvedValue({
      ...mockOpportunity,
      status: "pending",
      pendingAction: "delete",
    } as any);

    const response = await DELETE(makeRequest(undefined, "DELETE"), makeParams("1"));
    const body = await response.json();

    expect(prismaMock.opportunity.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: { status: "pending", pendingAction: "delete" },
    });
    expect(prismaMock.opportunity.delete).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true, pending: true });
  });

  it("returns 500 on database failure", async () => {
    mockAuth.mockResolvedValue({ user: { id: "admin1", role: "admin" } });
    prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);
    prismaMock.opportunity.delete.mockRejectedValue(new Error("DB down"));

    const response = await DELETE(makeRequest(undefined, "DELETE"), makeParams("1"));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Failed to process delete request.");
  });
});