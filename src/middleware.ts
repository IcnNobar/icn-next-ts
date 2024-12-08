import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  // Continue to the requested path if it matches the format
  return NextResponse.next();
}
