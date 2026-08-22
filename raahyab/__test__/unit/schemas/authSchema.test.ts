import { signupSchema, loginSchema } from "@/lib/schemas/auth";

describe("Signup Schema", () => {

  it("passes with valid signup data", () => {
    const result = signupSchema.safeParse({
      username: "humaira_k",
      email: "humaira@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("fails when passwords do not match", () => {
    const result = signupSchema.safeParse({
      username: "humaira_k",
      email: "humaira@gmail.com",
      password: "password123",
      confirmPassword: "different123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Passwords don't match");
  });

  it("fails when username has special characters", () => {
    const result = signupSchema.safeParse({
      username: "humaira@k!",
      email: "humaira@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Only letters, numbers, and underscores");
  });

  it("fails when username is less than 3 characters", () => {
    const result = signupSchema.safeParse({
      username: "hk",
      email: "humaira@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Username must be at least 3 characters");
  });

  it("fails when password is less than 8 characters", () => {
    const result = signupSchema.safeParse({
      username: "humaira_k",
      email: "humaira@gmail.com",
      password: "pass",
      confirmPassword: "pass",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Password must be at least 8 characters");
  });

});

describe("Login Schema", () => {

  it("passes with valid login data", () => {
    const result = loginSchema.safeParse({
      email: "humaira@gmail.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("fails with invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("fails with empty password", () => {
    const result = loginSchema.safeParse({
      email: "humaira@gmail.com",
      password: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Password is required");
  });

});