import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isAdmin } from '@/lib/auth';
import { saveContent } from '@/lib/content';

export const runtime = 'nodejs';

const Body = z.object({ values: z.record(z.string(), z.string().max(10000)) });

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid content' }, { status: 400 });
  await saveContent(parsed.data.values);
  return NextResponse.json({ ok: true });
}
