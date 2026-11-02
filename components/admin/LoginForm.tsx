'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push('/team-k7x2q9');
      router.refresh();
    } else {
      setError((await res.json().catch(() => ({}))).error || 'Login failed');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="form-card" style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Admin login</h2>
      <div className="form-fields">
        <label>Username<input value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" required /></label>
        <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required /></label>
        {error && <p role="alert" style={{ color: 'crimson' }}>{error}</p>}
        <div className="form-actions">
          <button className="pill pill-burgundy" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        </div>
      </div>
    </form>
  );
}
