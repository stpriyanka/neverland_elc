import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { writeImage } from '@/lib/storage';

export const runtime = 'nodejs';

const TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const file = (await req.formData()).get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'No file received' }, { status: 400 });
  const ext = TYPES[file.type];
  if (!ext) return NextResponse.json({ error: 'Only JPG, PNG, WEBP or GIF images are allowed' }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: 'Image must be 5 MB or smaller' }, { status: 413 });

  const name = `${Date.now()}-${randomBytes(4).toString('hex')}.${ext}`;
  await writeImage(name, Buffer.from(await file.arrayBuffer()), file.type);
  return NextResponse.json({ url: `/api/uploads/${name}` });
}
