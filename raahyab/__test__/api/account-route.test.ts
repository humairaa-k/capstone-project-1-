/**
 * @jest-environment node
 */
import { prismaMock } from "../mocks/prismaMock";
import { DELETE } from "@/app/api/account/route";

jest.mock("@/lib/auth", () => ({
  auth: jest.fn(),
}));
import { auth } from "@/lib/auth";
const mockAuth = auth as jest.Mock;

describe("DELETE /api/account", () => {
  it("returns 401 when there is no session", async () => {
    mockAuth.mockResolvedValue(null);

    const response = await DELETE();
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe("Unauthorized");
    expect(prismaMock.user.delete).not.toHaveBeenCalled();
  });

  it("returns 403 when the session user is an admin", async () => {
    mockAuth.mockResolvedValue({ user: { id: "admin1", role: "admin" } });

    const response = await DELETE();
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.error).toBe("Admin accounts cannot be self-deleted");
    expect(prismaMock.user.delete).not.toHaveBeenCalled();
  });

  it("deletes the account when the session user is a regular user", async () => {
    mockAuth.mockResolvedValue({ user: { id: "u1", role: "user" } });
    prismaMock.user.delete.mockResolvedValue({} as any);

    const response = await DELETE();
    const body = await response.json();

    expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: "u1" } });
    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true });
  });
});