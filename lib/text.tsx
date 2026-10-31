import type { CSSProperties, ReactNode } from 'react';

// Renders newline-separated text with <br/> line breaks.
export function br(s: string): ReactNode {
  return s.split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>);
}

// Splits a one-item-per-line field into a clean list.
export function lines(s: string): string[] {
  return s.split('\n').map(x => x.trim()).filter(Boolean);
}

// Background image style for any section (undefined when empty).
export function bgStyle(url?: string): CSSProperties | undefined {
  return url ? { backgroundImage: `url("${url}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined;
}
