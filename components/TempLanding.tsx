'use client';
import { useEffect, useState } from 'react';
import '@/app/temp.css';

// Temporary landing page, ported from the supplied HTML/CSS design.
// The waitlist posts to the same /api/submit route and reCAPTCHA as the full site.
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
declare global { interface Window { grecaptcha?: { ready: (cb: () => void) => void; execute: (key: string, opts: { action: string }) => Promise<string> } } }

async function getRecaptchaToken() {
  const g = window.grecaptcha;
  if (!siteKey || !g) return '';
  return new Promise<string>(resolve => g.ready(() => { g.execute(siteKey, { action: 'submit' }).then(resolve, () => resolve('')) }));
}

export default function TempLanding() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!siteKey || document.querySelector('script[data-recaptcha]')) return;
    const s = document.createElement('script');
    s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    s.async = true;
    s.dataset.recaptcha = 'true';
    document.head.appendChild(s);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const r = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: data.email, website: data.website, kind: 'waitlist', recaptchaToken: await getRecaptchaToken() }),
      });
      const result = await r.json();
      if (!r.ok) throw Error(result.error || 'Unable to send your request.');
      setStatus('Thank you. You are on the waitlist. We will be in touch.');
      form.reset();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Unable to submit. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="nl-landing">
      <div className="nl-landing__canvas">
        {/* Transparent artwork extracted from the supplied origami image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="nl-origami nl-origami--plane" src="/assets/origami-plane.png" alt="" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="nl-origami nl-origami--boat" src="/assets/origami-boat.png" alt="" aria-hidden="true" />

        <section className="nl-hero" aria-labelledby="nl-heading">
          <h1 id="nl-heading">Building foundations<br />that last a lifetime,<br />backed by world-class<br />standards.</h1>
          <p className="nl-hero__intro">Neverland ELC brings Australia&apos;s rigorous EYLF framework to Banani, Dhaka. We&apos;re turning early childhood research into a visible, safe, and joyful daily reality for your child.</p>
          <form className="nl-waitlist-form" id="nl-waitlist-form" onSubmit={submit}>
            <input type="text" name="website" className="nl-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label className="nl-visually-hidden" htmlFor="nl-email">Your email address</label>
            <input id="nl-email" name="email" type="email" placeholder="Your email address" autoComplete="email" maxLength={254} required />
            <button type="submit" disabled={busy}>{busy ? 'Sending…' : 'Join the Waitlist'}</button>
            <p className="nl-form-status" id="nl-form-status" role="status" aria-live="polite">{status}</p>
          </form>
        </section>

        <section className="nl-benefits" aria-label="Why Neverland">
          <div className="nl-benefit">
            <svg viewBox="0 0 80 80" aria-hidden="true"><polygon points="40,5 64,19 73,48 51,71 23,66 8,39 19,14" fill="#c8c49d" /><polygon points="40,5 51,36 19,14" fill="#e7dfb2" /><polygon points="19,14 51,36 8,39" fill="#a5a67d" /><polygon points="8,39 51,36 23,66" fill="#d4cfa3" /><polygon points="51,36 73,48 51,71 23,66" fill="#a5a77d" /><path d="m31 22 9 8-12 6 5-11m22 14 6 7-13 5 7-12m-17 9 4 7-11 1 7-8" fill="#67213a" /></svg>
            <h2>Australia EYLF Standards</h2>
          </div>
          <div className="nl-benefit">
            <svg viewBox="0 0 80 80" aria-hidden="true"><path d="M39 33C18 17 23 6 34 7c6 0 9 5 9 8 4-11 20-10 21 2 1 9-10 17-25 29Z" fill="#65172e" /><path d="M8 30 23 43 31 55 38 60 38 73 20 66 7 48Z" fill="#b7b997" /><path d="m72 30-15 13-8 12-7 5v13l18-7 13-18Z" fill="#a4a98a" /><path d="M16 46 30 55m34-9L50 55" stroke="#eee5c6" strokeWidth="4" /></svg>
            <h2>Responsive Care</h2>
          </div>
          <div className="nl-benefit">
            <svg viewBox="0 0 80 80" aria-hidden="true"><polygon points="19,6 42,21 27,38" fill="#6a1c34" /><polygon points="19,6 27,38 9,31" fill="#d2b27b" /><polygon points="42,21 65,8 54,46 27,38" fill="#e3d5a9" /><polygon points="65,8 54,46 72,56" fill="#bca778" /><polygon points="27,38 54,46 43,65" fill="#a6aa85" /><path d="m43 65 16 9-6-15" fill="#6b2137" /></svg>
            <h2>Safe, Joyful Space</h2>
          </div>
        </section>

        <footer className="nl-info-strip" aria-label="Centre information">
          <span>Ages 2 – 5 years</span><span>Sun–Thu: 8:00 – 6:00</span><span>Banani, Dhaka</span><span>EYLF (Australia)<br />curriculum</span>
        </footer>
      </div>
    </main>
  );
}
