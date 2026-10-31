// Server-only: reads/writes editable content (Netlify Blobs on Netlify, data/site-content.json locally).
import { DEFAULTS, FIELD_TYPES } from '@/lib/cms-schema';
import { readText, writeText } from '@/lib/storage';

const KEY = 'site-content.json';
const IMAGE_OK = /^(\/uploads\/[\w.-]+|\/api\/uploads\/[\w.-]+|https:\/\/[^\s"'<>]+)$/;

async function readOverrides(): Promise<Record<string, string>> {
  try {
    const parsed = JSON.parse((await readText(KEY)) ?? '{}');
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
  await writeText(KEY, JSON.stringify(clean, null, 2));
}
