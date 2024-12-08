import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldHandle = pathname.startsWith("/about") || pathname === "/";
  if (!shouldHandle) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const local = segments[0];
  const lang = segments[1];

  if (!local || !lang) {
    const url = request.nextUrl.clone();
    url.pathname = `/jo/ar${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
