import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/admin_panel",
  "/Headphones",
  "/EarphonesPage",
  "/HomePage",
  "/products",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/profile/:path*"],
};
