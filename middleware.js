import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");
  if (
    (pathname.startsWith("/product/") || pathname.startsWith("/profile/")) &&
    !sessionCookie
  ) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("authRequired", "1");
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
