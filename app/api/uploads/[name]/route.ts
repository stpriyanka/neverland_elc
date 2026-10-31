import { NextResponse } from 'next/server';
import { readImage } from '@/lib/storage';

export const runtime = 'nodejs';

const SAFE = /^[\w.-]+$/;

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!SAFE.test(name)) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const image = await readImage(name);
  if (!image) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return new NextResponse(image.bytes, { headers: { 'content-type': image.contentType, 'cache-control': 'public, max-age=31536000, immutable' } });
}
