import { contactSchema } from "@/lib/schemas/contact";

describe("Contact Form Schema", () => {

  it("passes with valid data", () => {
    const result = contactSchema.safeParse({
      name: "Humaira",
      email: "humaira@gmail.com",
      subject: "Test subject",
      message: "This is a test message",
    });
    expect(result.success).toBe(true);
  });

  it("fails when name is less than 2 characters", () => {
    const result = contactSchema.safeParse({
      name: "H",
      email: "humaira@gmail.com",
      subject: "Test subject",
      message: "This is a test message",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Name must be alteast 2 characters");
  });

  it("fails with invalid email format", () => {
    const result = contactSchema.safeParse({
      name: "Humaira",
      email: "not-an-email",
      subject: "Test subject",
      message: "This is a test message",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("PLease enter a valid email");
  });

  it("fails when subject is less than 6 characters", () => {
    const result = contactSchema.safeParse({
      name: "Humaira",
      email: "humaira@gmail.com",
      subject: "Hi",
      message: "This is a test message",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Subject must be atleast 6 characters");
  });

  it("fails when message is less than 10 characters", () => {
    const result = contactSchema.safeParse({
      name: "Humaira",
      email: "humaira@gmail.com",
      subject: "Test subject",
      message: "Short",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Message must be at least 10 characters");
  });

  it("fails when fields are empty", () => {
    const result = contactSchema.safeParse({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    expect(result.success).toBe(false);
  });

});