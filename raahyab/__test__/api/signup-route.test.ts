/**
 * @jest-environment node
 */
import { prismaMock } from "../mocks/prismaMock";
import { POST } from "@/app/api/signup/route";

jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockResolvedValue("hashed-password"),
}));
import bcrypt from "bcryptjs";
const mockHash = bcrypt.hash as jest.Mock;

const mockUser = {
  id: "u1",
  name: null,
  username: "johndoe",
  email: "john@example.com",
  password: "hashed-password",
  role: "user",
  emailVerified: null,
  image: null,
  createdAt: new Date().toISOString(),
};

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/signup", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

const validPayload = {
  username: "johndoe",
  email: "john@example.com",
  password: "supersecret123",
};

describe("POST /api/signup", () => {
  it("creates a user and returns id + email on success", async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(mockUser as any);

    const response = await POST(makeRequest(validPayload));
    const body = await response.json();

    expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
      where: { OR: [{ email: validPayload.email }, { username: validPayload.username }] },
    });
    expect(mockHash).toHaveBeenCalledWith(validPayload.password, 12);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        username: validPayload.username,
        email: validPayload.email,
        password: "hashed-password",
        role: "user",
      },
    });
    expect(response.status).toBe(201);
    expect(body).toEqual({ id: mockUser.id, email: mockUser.email });
  });

  it.each([
    ["username", { ...validPayload, username: undefined }],
    ["email", { ...validPayload, email: undefined }],
    ["password", { ...validPayload, password: undefined }],
  ])("returns 400 when %s is missing", async (_field, payload) => {
    const response = await POST(makeRequest(payload));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("All fields are required.");
    expect(prismaMock.user.findFirst).not.toHaveBeenCalled();
  });

  it("returns 400 when the password is shorter than 8 characters", async () => {
    const response = await POST(makeRequest({ ...validPayload, password: "short1" }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Password must be at least 8 characters.");
    expect(prismaMock.user.findFirst).not.toHaveBeenCalled();
  });

  it("returns 409 when the email is already taken", async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      ...mockUser,
      email: validPayload.email,
      username: "someoneelse",
    } as any);

    const response = await POST(makeRequest(validPayload));
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.error).toBe("That email is already taken.");
    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });

  it("returns 409 when the username is already taken", async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      ...mockUser,
      email: "different@example.com",
      username: validPayload.username,
    } as any);

    const response = await POST(makeRequest(validPayload));
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.error).toBe("That username is already taken.");
    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });

  it("never stores the plaintext password", async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(mockUser as any);

    await POST(makeRequest(validPayload));

    const createArgs = prismaMock.user.create.mock.calls[0][0];
    expect(createArgs.data.password).not.toBe(validPayload.password);
    expect(createArgs.data.password).toBe("hashed-password");
  });

  it("returns 500 on database failure", async () => {
    prismaMock.user.findFirst.mockRejectedValue(new Error("DB down"));

    const response = await POST(makeRequest(validPayload));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Failed to create account.");
  });
});