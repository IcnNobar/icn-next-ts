import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const defaultLocal = "jo";
  const defaultLang = "ar";

  const segments = pathname.split("/").filter(Boolean);
  const local = segments[0];
  const lang = segments[1];

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocal}/${defaultLang}`;
    return NextResponse.redirect(url);
  }

  if (segments.length === 0) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocal}/${defaultLang}`;
    return NextResponse.redirect(url);
  }

  if (
    segments.length === 1 &&
    segments[0] !== defaultLocal &&
    segments[0] !== defaultLang
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocal}/${defaultLang}/${segments[0]}`;
    return NextResponse.redirect(url);
  }

  if (segments.length === 1 && segments[0].length === 2) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocal}/${segments[0]}`;
    return NextResponse.redirect(url);
  }

  if (segments.length === 1 && segments[0].length > 2) {
    const url = request.nextUrl.clone();
    url.pathname = `/${segments[0]}/${defaultLang}`;
    return NextResponse.redirect(url);
  }

  if (segments.length === 2) {
    if (local === defaultLocal && lang !== defaultLang) {
      const url = request.nextUrl.clone();
      url.pathname = `/${defaultLocal}/${defaultLang}`;
      return NextResponse.redirect(url);
    } else if (local !== defaultLocal) {
      const url = request.nextUrl.clone();
      url.pathname = `/${defaultLocal}/${defaultLang}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (segments.length > 2) {
    if (local === lang) {
      const url = request.nextUrl.clone();
      url.pathname = `/${defaultLocal}/${defaultLang}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
