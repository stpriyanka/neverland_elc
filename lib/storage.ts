// Server-only storage. On Netlify (read-only filesystem) use Netlify Blobs; locally use the disk.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { getStore } from '@netlify/blobs';

const STORE = 'neverland-cms';
const onNetlify = () => Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT);

export async function readText(key: string): Promise<string | null> {
  if (onNetlify()) return (await getStore({ name: STORE, consistency: 'strong' }).get(key, { type: 'text' })) ?? null;
  try { return await fs.readFile(path.join(process.cwd(), 'data', key), 'utf8'); } catch { return null; }
}

export async function writeText(key: string, value: string): Promise<void> {
  if (onNetlify()) { await getStore({ name: STORE, consistency: 'strong' }).set(key, value); return; }
  const file = path.join(process.cwd(), 'data', key);
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = file + '.tmp';
  await fs.writeFile(tmp, value);
  await fs.rename(tmp, file);
}

export async function writeImage(name: string, bytes: Buffer, contentType: string): Promise<void> {
  if (onNetlify()) {
    const data = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    await getStore({ name: STORE, consistency: 'strong' }).set(`uploads/${name}`, data, { metadata: { contentType } });
    return;
  }
  const dir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), bytes);
}

export async function readImage(name: string): Promise<{ bytes: ArrayBuffer; contentType: string } | null> {
  if (!/^[\w.-]+$/.test(name)) return null;
  if (!onNetlify()) {
    const contentTypes: Record<string, string> = {
      '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
      '.webp': 'image/webp', '.gif': 'image/gif',
    };
    const contentType = contentTypes[path.extname(name).toLowerCase()];
    if (!contentType) return null;
    try {
      const bytes = await fs.readFile(path.join(process.cwd(), 'public', 'uploads', name));
      return { bytes: Uint8Array.from(bytes).buffer, contentType };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw error;
    }
  }
  const store = getStore({ name: STORE, consistency: 'strong' });
  const blob = await store.getWithMetadata(`uploads/${name}`, { type: 'arrayBuffer' });
  if (!blob) return null;
  return { bytes: blob.data, contentType: String(blob.metadata?.contentType ?? 'application/octet-stream') };
}
