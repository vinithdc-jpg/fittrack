import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";
  const isHomePage = request.nextUrl.pathname === "/";

  if ((isAuthPage || isHomePage) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/workouts/:path*",
    "/nutrition/:path*",
    "/water/:path*",
    "/sleep/:path*",
    "/activity/:path*",
    "/habits/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
