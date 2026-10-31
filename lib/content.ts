// Server-only: reads/writes editable content to data/site-content.json (Option 1: JSON file storage).
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { DEFAULTS, FIELD_TYPES } from '@/lib/cms-schema';

const FILE = path.join(process.cwd(), 'data', 'site-content.json');
const IMAGE_OK = /^(\/uploads\/[\w.-]+|https:\/\/[^\s"'<>]+)$/;

async function readOverrides(): Promise<Record<string, string>> {
  try {
    const parsed = JSON.parse(await fs.readFile(FILE, 'utf8'));
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export async function getContent(): Promise<Record<string, string>> {
  return { ...DEFAULTS, ...(await readOverrides()) };
}

export async function saveContent(values: Record<string, string>) {
  const clean: Record<string, string> = {};
  for (const [key, raw] of Object.entries(values)) {
    const type = FIELD_TYPES[key];
    if (!type) continue; // ignore unknown keys
    if (type === 'image') {
      const v = raw.trim();
      if (v !== '' && !IMAGE_OK.test(v)) continue; // only uploaded or https image URLs
      clean[key] = v;
    } else {
      clean[key] = type === 'textarea' ? raw.replace(/\r/g, '') : raw.trim();
    }
  }
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = FILE + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(clean, null, 2));
  await fs.rename(tmp, FILE);
}
