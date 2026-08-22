/**
 * @jest-environment node
 */
import { prismaMock } from "../mocks/prismaMock";


jest.mock("@/lib/generated/prisma/client", () => ({
  Prisma: { JsonNull: "JsonNull" },
}));

import { POST } from "@/app/api/opportunities/[id]/decision/route";
import { Prisma } from "@/lib/generated/prisma/client";

const baseOpportunity = {
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
  status: "pending",
  featured: true,
  createdAt: new Date().toISOString(),
  updatedAt: null,
  pendingAction: null,
  previousState: null,
};

function makeRequest(action: string) {
  return new Request("http://localhost/api/opportunities/1/decision", {
    method: "POST",
    body: JSON.stringify({ action }),
    headers: { "Content-Type": "application/json" },
  });
}

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

describe("POST /api/opportunities/[id]/decision", () => {
  it("returns 404 when the opportunity does not exist", async () => {
    prismaMock.opportunity.findUnique.mockResolvedValue(null);

    const response = await POST(makeRequest("approve"), makeParams("999"));
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error).toBe("Opportunity not found.");
  });

  describe("new-submission opportunities (pendingAction is not 'delete')", () => {
    it("approves: sets status approved, clears previousState and pendingAction", async () => {
      prismaMock.opportunity.findUnique.mockResolvedValue(baseOpportunity as any);
      prismaMock.opportunity.update.mockResolvedValue({
        ...baseOpportunity,
        status: "approved",
      } as any);

      const response = await POST(makeRequest("approve"), makeParams("1"));
      const body = await response.json();

      expect(prismaMock.opportunity.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: { status: "approved", previousState: Prisma.JsonNull, pendingAction: null },
      });
      expect(response.status).toBe(200);
      expect(body.status).toBe("approved");
    });

    it("rejects a brand-new submission (no previousState) by deleting it", async () => {
      prismaMock.opportunity.findUnique.mockResolvedValue(baseOpportunity as any); // previousState: null
      prismaMock.opportunity.delete.mockResolvedValue(baseOpportunity as any);

      const response = await POST(makeRequest("reject"), makeParams("1"));
      const body = await response.json();

      expect(prismaMock.opportunity.delete).toHaveBeenCalledWith({ where: { id: "1" } });
      expect(prismaMock.opportunity.update).not.toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(body).toEqual({ success: true, deleted: true });
    });

    it("rejects an edited opportunity by restoring its previousState snapshot", async () => {
      const previousState = { title: "Original title", status: "approved" };
      const editedOpportunity = { ...baseOpportunity, previousState };
      prismaMock.opportunity.findUnique.mockResolvedValue(editedOpportunity as any);
      prismaMock.opportunity.update.mockResolvedValue({
        ...editedOpportunity,
        ...previousState,
      } as any);

      await POST(makeRequest("reject"), makeParams("1"));

      expect(prismaMock.opportunity.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: {
          ...previousState,
          previousState: Prisma.JsonNull,
          pendingAction: null,
        },
      });
      expect(prismaMock.opportunity.delete).not.toHaveBeenCalled();
    });

    it("returns 400 for an invalid action", async () => {
      prismaMock.opportunity.findUnique.mockResolvedValue(baseOpportunity as any);

      const response = await POST(makeRequest("maybe"), makeParams("1"));
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.error).toBe("Invalid action.");
      expect(prismaMock.opportunity.update).not.toHaveBeenCalled();
      expect(prismaMock.opportunity.delete).not.toHaveBeenCalled();
    });
  });

  describe("pending deletion requests (pendingAction === 'delete')", () => {
    const deletionRequest = { ...baseOpportunity, status: "approved", pendingAction: "delete" };

    it("approves the deletion by deleting the record", async () => {
      prismaMock.opportunity.findUnique.mockResolvedValue(deletionRequest as any);
      prismaMock.opportunity.delete.mockResolvedValue(deletionRequest as any);

      const response = await POST(makeRequest("approve"), makeParams("1"));
      const body = await response.json();

      expect(prismaMock.opportunity.delete).toHaveBeenCalledWith({ where: { id: "1" } });
      expect(response.status).toBe(200);
      expect(body).toEqual({ success: true, deleted: true });
    });

    it("rejects the deletion by restoring status to approved and clearing pendingAction", async () => {
      prismaMock.opportunity.findUnique.mockResolvedValue(deletionRequest as any);
      prismaMock.opportunity.update.mockResolvedValue({
        ...deletionRequest,
        status: "approved",
        pendingAction: null,
      } as any);

      const response = await POST(makeRequest("reject"), makeParams("1"));
      const body = await response.json();

      expect(prismaMock.opportunity.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: { status: "approved", pendingAction: null },
      });
      expect(response.status).toBe(200);
      expect(body.status).toBe("approved");
    });

    it("returns 400 for an invalid action", async () => {
      prismaMock.opportunity.findUnique.mockResolvedValue(deletionRequest as any);

      const response = await POST(makeRequest("maybe"), makeParams("1"));
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.error).toBe("Invalid action.");
    });
  });

  it("returns 500 when the database call fails", async () => {
    prismaMock.opportunity.findUnique.mockRejectedValue(new Error("DB down"));

    const response = await POST(makeRequest("approve"), makeParams("1"));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Failed to process decision.");
  });
});