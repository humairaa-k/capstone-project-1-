/**
 * @jest-environment node
 */
// auth() normally wraps our callback with real session resolution.
// For a unit test we only care about the routing logic itself, so we
// mock auth() to pass the callback straight through

jest.mock("@/lib/auth", () => ({
  auth: (callback: any) => callback,
}));

import { proxy as proxyImport, config } from "@/proxy";

// The mocked auth() above makes `proxy` just our plain callback at runtime,
// but TypeScript still resolves its type against the real (unmocked)
// Auth.js middleware signature. Recast it to what it actually is.
const proxy = proxyImport as unknown as (
  request: any
) => Response | undefined | Promise<Response | undefined>;

function makeRequest(pathname: string, isLoggedIn: boolean) {
  return {
    nextUrl: new URL(`http://localhost${pathname}`),
    auth: isLoggedIn ? { user: { id: "u1", role: "user" } } : null,
  } as any;
}

describe("proxy (route protection)", () => {
  describe("protected routes", () => {
    it.each(["/dashboard", "/profile", "/settings", "/add-opportunity", "/saved"])(
      "redirects to /login with a callbackUrl when visiting %s while logged out",
      async (route) => {
        const response = await proxy(makeRequest(route, false));

        expect(response).toBeInstanceOf(Response);
        expect(response!.status).toBe(302);
        const location = new URL(response!.headers.get("location")!);
        expect(location.pathname).toBe("/login");
        expect(location.searchParams.get("callbackUrl")).toBe(route);
      }
    );

    it("protects nested paths under a protected route", async () => {
      const response = await proxy(makeRequest("/dashboard/profile", false));

      expect(response).toBeInstanceOf(Response);
      const location = new URL(response!.headers.get("location")!);
      expect(location.pathname).toBe("/login");
      expect(location.searchParams.get("callbackUrl")).toBe("/dashboard/profile");
    });

    it("does not redirect when logged in", async () => {
      const response = await proxy(makeRequest("/dashboard", true));
      expect(response).toBeUndefined();
    });
  });

  describe("public routes", () => {
    it("does not redirect an unprotected route when logged out", async () => {
      const response = await proxy(makeRequest("/opportunities", false));
      expect(response).toBeUndefined();
    });

    it("does not redirect an unprotected route when logged in", async () => {
      const response = await proxy(makeRequest("/opportunities", true));
      expect(response).toBeUndefined();
    });
  });

  describe("/login route", () => {
    it("redirects to /dashboard when already logged in", async () => {
      const response = await proxy(makeRequest("/login", true));

      expect(response).toBeInstanceOf(Response);
      expect(response!.status).toBe(302);
      const location = new URL(response!.headers.get("location")!);
      expect(location.pathname).toBe("/dashboard");
    });

    it("does not redirect when logged out", async () => {
      const response = await proxy(makeRequest("/login", false));
      expect(response).toBeUndefined();
    });
  });
});

describe("proxy config", () => {
  it("matches all the expected protected route patterns", () => {
    expect(config.matcher).toEqual(
      expect.arrayContaining([
        "/dashboard/:path*",
        "/profile/:path*",
        "/add-opportunity/:path*",
        "/saved/:path*",
        "/login",
      ])
    );
  });
});