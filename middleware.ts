// Temporary-site mode. When SITE_MODE=temp, only the landing page and the waitlist API are reachable.
// All other routes (about, curriculum, enrolment, contact, privacy, admin, uploads) return 404.
// Remove SITE_MODE (or set it to anything other than "temp") to restore the full site.
import { NextRequest, NextResponse } from 'next/server';

const TEMP_ALLOWED = new Set(['/', '/api/submit', '/favicon.ico', '/robots.txt']);

export function middleware(req: NextRequest) {
  if (process.env.SITE_MODE !== 'temp') return NextResponse.next();
  const path = req.nextUrl.pathname;
  if (TEMP_ALLOWED.has(path) || path.startsWith('/_next/') || path.startsWith('/assets/')) return NextResponse.next();
  return new NextResponse('Not found', {
    status: 404,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex, nofollow' },
  });
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] };
