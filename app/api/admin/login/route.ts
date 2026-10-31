import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkCredentials, createToken, cookieOptions, SESSION_COOKIE } from '@/lib/auth';

export const runtime = 'nodejs';

const Body = z.object({ username: z.string().max(200), password: z.string().max(200) });

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !checkCredentials(parsed.data.username, parsed.data.password)) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createToken(parsed.data.username), cookieOptions);
  return res;
}
