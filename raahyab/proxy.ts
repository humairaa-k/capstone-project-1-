// proxy.ts (project root)
import { auth } from "@/lib/auth";

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/add-opportunity","/saved",];

export const proxy = auth((request) => {
  const { nextUrl } = request;
  const isLoggedIn = Boolean(request.auth);

  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return Response.redirect(loginUrl);
  }

  if (nextUrl.pathname === "/login" && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }
});

export const config = {
  matcher: ["/dashboard/:path*",  "/profile/:path*", "/add-opportunity/:path*",
             "/saved/:path*", "/login",
  ],
};
