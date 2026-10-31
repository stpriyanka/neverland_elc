'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PageDef, FieldDef } from '@/lib/cms-schema';

const box: React.CSSProperties = { display: 'grid', gap: 6, marginBottom: 14 };
const input: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #d6cfc4', font: 'inherit' };
const btn: React.CSSProperties = { padding: '8px 14px', borderRadius: 999, border: 0, cursor: 'pointer', background: '#6b1d2a', color: '#fff', font: 'inherit' };
const ghost: React.CSSProperties = { ...btn, background: '#eee', color: '#222' };

export function AdminEditor({ pages, initial }: { pages: PageDef[]; initial: Record<string, string> }) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [slug, setSlug] = useState(pages[0].slug);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const page = pages.find(p => p.slug === slug) ?? pages[0];

  const set = (key: string, v: string) => setValues(prev => ({ ...prev, [key]: v }));

  async function upload(key: string, file: File) {
    setBusy(true);
    setStatus('Uploading image…');
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      set(key, data.url);
      setStatus('Image uploaded. Click Save to publish.');
    } else {
      setStatus(data.error || 'Upload failed');
    }
    setBusy(false);
  }

  async function save() {
    setBusy(true);
    setStatus('Saving…');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ values }),
      });
      if (res.ok) {
        setStatus('Saved ✓ — changes are live on the site.');
      } else if (res.status === 401) {
        setStatus('Your session has expired. Redirecting to sign in…');
        router.push('/admin/login');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus(`Save failed (${res.status}): ${data.error || 'unknown error'}`);
      }
    } catch {
      setStatus('Save failed: network error. Check the connection and try again.');
    }
    setBusy(false);
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  function renderField(f: FieldDef) {
    const v = values[f.key] ?? '';
    if (f.type === 'textarea') {
      return <label key={f.key} style={box}>{f.label}<textarea style={{ ...input, minHeight: 90 }} value={v} onChange={e => set(f.key, e.target.value)} /></label>;
    }
    if (f.type === 'image') {
      return (
        <div key={f.key} style={box}>
          <span>{f.label}</span>
          {v && <img src={v} alt="" style={{ maxWidth: 260, maxHeight: 160, objectFit: 'cover', borderRadius: 10 }} />}
          <input style={input} value={v} placeholder="Image URL (or upload below)" onChange={e => set(f.key, e.target.value)} />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={busy}
              onChange={e => { const file = e.target.files?.[0]; if (file) upload(f.key, file); e.target.value = ''; }} />
            {v && <button type="button" style={ghost} onClick={() => set(f.key, '')}>Remove</button>}
          </div>
        </div>
      );
    }
    return <label key={f.key} style={box}>{f.label}<input style={input} value={v} onChange={e => set(f.key, e.target.value)} /></label>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 28, alignItems: 'start' }}>
      <aside style={{ display: 'grid', gap: 8 }}>
        <strong>Pages</strong>
        {pages.map(p => (
          <button key={p.slug} type="button" onClick={() => setSlug(p.slug)}
            style={{ ...ghost, textAlign: 'left', background: p.slug === slug ? '#f2c94c' : '#eee' }}>{p.label}</button>
        ))}
        <button type="button" style={{ ...ghost, marginTop: 16 }} onClick={logout}>Log out</button>
      </aside>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0 }}>Edit: {page.label}</h1>
          <button type="button" style={btn} disabled={busy} onClick={save}>Save changes</button>
        </div>
        {status && <p role="status" style={{ margin: '12px 0' }}>{status}</p>}
        {page.sections.map(sec => (
          <fieldset key={sec.title} style={{ border: '1px solid #e5ded2', borderRadius: 14, padding: 18, margin: '18px 0' }}>
            <legend><strong>{sec.title}</strong></legend>
            {sec.fields.map(renderField)}
          </fieldset>
        ))}
      </section>
    </div>
  );
}
