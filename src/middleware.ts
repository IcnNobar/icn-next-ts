import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if(pathname === '/'){
    return NextResponse.redirect(new URL('/ar/jo/about', request.url));
  }
  if (
    pathname !== '/' && 
    !pathname.startsWith('/api') && // API routes
    !pathname.match(/\/_next/) // Next.js static files (e.g., /_next/static)
    && !pathname.includes('.js') && !pathname.includes('.ico')
  ){
    if(pathname.split('/').length < 4){
      return NextResponse.redirect(new URL('/ar/jo/'+ pathname.split('/')[pathname.split('/').length - 1], request.url));
    }
  }
  // Continue to the requested path if it matches the format
  return NextResponse.next();
}
