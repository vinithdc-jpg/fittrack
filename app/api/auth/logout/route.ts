import { NextResponse, type NextRequest } from "next/server";

const sessionCookieNames = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");

  if (
    (origin && origin !== request.nextUrl.origin) ||
    fetchSite === "cross-site"
  ) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const cookieNames = new Set(sessionCookieNames);
  for (const { name } of request.cookies.getAll()) {
    if (
      sessionCookieNames.some(
        (sessionCookieName) =>
          name === sessionCookieName ||
          name.startsWith(`${sessionCookieName}.`),
      )
    ) {
      cookieNames.add(name);
    }
  }

  const response = NextResponse.json({ ok: true });
  const secure =
    process.env.NODE_ENV === "production" ||
    process.env.NEXTAUTH_URL?.startsWith("https://") === true;

  for (const name of cookieNames) {
    response.cookies.set(name, "", {
      httpOnly: true,
      secure: name.startsWith("__Secure-") || secure,
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });
  }

  return response;
}
