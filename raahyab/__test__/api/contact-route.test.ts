/**
 * @jest-environment node
 */
import { POST } from "@/app/api/contact/route";

const validPayload = {
  name: "Humaira",
  email: "humaira@gmail.com",
  subject: "Test subject",
  message: "This is a test message",
};

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/contact", () => {
  it("returns 201 and a success message for a valid submission", async () => {
    const response = await POST(makeRequest(validPayload));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toEqual({
      success: true,
      message: "Message sent successfully!",
    });
  });

  it("returns 400 with field errors when name is too short", async () => {
    const response = await POST(makeRequest({ ...validPayload, name: "H" }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.message).toBe("Invalid form data");
    expect(body.errors.name).toBeDefined();
  });

  it("returns 400 with field errors when the email is invalid", async () => {
    const response = await POST(makeRequest({ ...validPayload, email: "not-an-email" }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.errors.email).toBeDefined();
  });

  it("returns 400 with field errors when subject is too short", async () => {
    const response = await POST(makeRequest({ ...validPayload, subject: "Hi" }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.errors.subject).toBeDefined();
  });

  it("returns 400 with field errors when message is too short", async () => {
    const response = await POST(makeRequest({ ...validPayload, message: "Short" }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.errors.message).toBeDefined();
  });

  it("returns 400 with all field errors when every field is empty", async () => {
    const response = await POST(
      makeRequest({ name: "", email: "", subject: "", message: "" })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(Object.keys(body.errors)).toEqual(
      expect.arrayContaining(["name", "email", "subject", "message"])
    );
  });

  it("returns 400 when the request body is missing fields entirely", async () => {
    const response = await POST(makeRequest({}));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
  });

  it("returns 500 when the request body is not valid JSON", async () => {
    const badRequest = new Request("http://localhost/api/contact", {
      method: "POST",
      body: "not json",
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(badRequest);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      success: false,
      message: "Something went wrong.",
    });
  });
});