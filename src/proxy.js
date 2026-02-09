import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function proxy(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // 1. Explicitly define protected routes
  const protectedRoutes = ["/cart", "/order-success", "/dashboard"];

  // Check if current path matches any of our protected routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // 2. Logic: If it is a protected route AND no valid token exists
  if (isProtectedRoute && !token) {
    const loginUrl = new URL(`/login`, req.url);

    // Friendly UX: Tell the login page where to go after success
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // 3. Continue for public routes or authenticated users
  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/order-success/:path*", "/dashboard/:path*"],
};
