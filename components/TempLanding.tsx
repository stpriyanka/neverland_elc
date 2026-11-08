/* eslint-disable @next/next/no-img-element -- Preserve the supplied static artwork and its CSS sizing. */
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
    <div className="nl-site" id="top">
      <header className="nl-header">
        <div className="nl-header-inner">
          <a className="nl-brand" href="#top" aria-label="Neverland ELC, home">
            <img className="nl-brand-symbol" src="/assets/neverland-emblem.png" alt="" />
            <span className="nl-brand-name">Neverland <small>ELC</small></span>
          </a>
          <nav className="nl-navigation" aria-label="Main navigation">
            <a className="nl-nav-active" href="#top" aria-current="page">Home</a>
            <a href="#about">About</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#waitlist">Enrolment</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nl-header-actions">
            <a className="nl-header-phone" href="tel:+8801781288650" aria-label="Call +880 1781288650">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 3.5c1.5-1.2 3.2-.5 3.8 1.2l.7 2.1c.2.6 0 1.2-.5 1.6L8.1 9.6c1.2 2.2 2.6 3.7 4.8 4.9l1.3-1.5c.4-.5 1-.6 1.6-.4l2.1.7c1.7.6 2.4 2.3 1.2 3.8-1.1 1.4-2.5 2.1-4.3 1.8C9.2 18 6 14.8 4 9.2c-.5-2 .1-4.1 1.5-5.7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              <span>+880 1781288650</span>
            </a>
            <a className="nl-header-tour" href="mailto:ash@neverlandelc.com?subject=Neverland%20ELC%20Tour%20Request">
              <span>Book a Tour</span>
              <span className="nl-coming-soon">Coming soon</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="nl-hero" aria-labelledby="nl-hero-title">
          <img className="nl-decor nl-hero-plane" src="/assets/plane.svg" alt="" />
          <img className="nl-decor nl-hero-boat" src="/assets/boat.svg" alt="" />
          <img className="nl-decor nl-hero-flower" src="/assets/flower.svg" alt="" />
          <svg className="nl-decor nl-star nl-hero-star" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 1 23 15 34 6 27 18 40 20 27 23 34 35 22 26 20 40 17 26 5 34 13 22 1 20 14 17 6 5 18 14Z" fill="currentColor"/></svg>
          <div className="nl-hero-center">
            <p className="nl-eyebrow">Early Learning Centre &amp; Long Day Care</p>
            <h1 id="nl-hero-title">Building foundations<br />that <em>last a lifetime,</em><br />backed by world-class<br />standards.</h1>
            <p className="nl-hero-description">Neverland ELC brings Australia&apos;s rigorous EYLF framework to<br className="nl-wide-only" /> Banani, Dhaka. We&apos;re turning early childhood research into a<br className="nl-wide-only" /> visible, safe, and joyful daily reality for your child.</p>

            <form id="waitlist" className="nl-waitlist" onSubmit={submit} aria-label="Join the waitlist">
              <input type="text" name="website" className="nl-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <label className="nl-visually-hidden" htmlFor="nl-waitlist-email">Your email address</label>
              <input id="nl-waitlist-email" name="email" type="email" maxLength={254} required placeholder="Your email address" autoComplete="email" />
              <button type="submit" disabled={busy}>{busy ? 'Sending…' : 'Join the Waitlist'}</button>
              <p className="nl-form-status" role="status" aria-live="polite">{status}</p>
            </form>
            <div className="nl-opening-pill"><span>Open Saturday to Thursday</span><span className="nl-pill-dot">·</span><span>8:00 am – 6:00 pm</span></div>
          </div>

          <div className="nl-hero-lower">
            <svg className="nl-decor nl-star nl-lower-star" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 1 23 15 34 6 27 18 40 20 27 23 34 35 22 26 20 40 17 26 5 34 13 22 1 20 14 17 6 5 18 14Z" fill="currentColor"/></svg>
            <img className="nl-decor nl-lower-flower" src="/assets/flower.svg" alt="" />
            <div id="about" className="nl-value-grid" aria-label="What makes Neverland special">
              <article id="curriculum" className="nl-value">
                <div className="nl-value-icon" aria-hidden="true"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#dbc08b"/><path d="M32 12C39 21 43 27 43 34c0 10-5 15-11 19-6-4-11-9-11-19 0-7 4-13 11-22Z" fill="#4a0b13"/><path d="M32 21c-5 11-4 22 0 28 4-6 5-17 0-28Z" fill="#f6efdf"/><circle cx="32" cy="32" r="3.7" fill="#4a0b13"/></svg></div>
                <h2>Australia&apos;s EYLF Standards</h2>
                <p>A nationally recognised learning framework, shaping every day from birth to five.</p>
              </article>
              <article className="nl-value">
                <div className="nl-value-icon" aria-hidden="true"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#dbc08b"/><path d="M32 43 13 26c-7-8 6-20 15-9l4 5 4-5c9-11 22 1 15 9Z" fill="#4a0b13"/><path d="M7 43c7 0 12-1 17-6 3 4 4 7 4 13-7 5-14 7-21 3ZM57 43c-7 0-12-1-17-6-3 4-4 7-4 13 7 5 14 7 21 3Z" fill="#f6efdf"/></svg></div>
                <h2>Responsive Care</h2>
                <p>Educators who notice, listen and respond to every child as an individual.</p>
              </article>
              <article className="nl-value">
                <div className="nl-value-icon" aria-hidden="true"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#dbc08b"/><path d="M32 9 48 32 32 55 16 32Z" fill="#4a0b13"/><path d="M32 9 32 32 16 32Z" fill="#6e192c"/><path d="M32 9 48 32 32 32Z" fill="#f6efdf"/><path d="M16 32 32 32 32 55Z" fill="#dbc08b"/><path d="M16 32h32M32 9v46" stroke="#f6efdf" strokeWidth="1.2"/><path d="M32 54c-6 6 6 6 0 10" fill="none" stroke="#4a0b13" strokeWidth="1.7"/></svg></div>
                <h2>Safe, Joyful Space</h2>
                <p>Calm, warm, child-scaled rooms that are easy to supervise and a pleasure to explore.</p>
              </article>
            </div>

            <div className="nl-info-strip" aria-label="Centre information">
              <div><span className="nl-info-label">Ages</span><span>2 years – 5 years</span></div>
              <div><span className="nl-info-label">Open</span><span>Saturday – Thursday<br />8:00 am – 6:00 pm</span></div>
              <div><span className="nl-info-label">Location</span><span>Banani, Dhaka</span></div>
              <div><span className="nl-info-label">Curriculum</span><span>EYLF (Australia)</span></div>
            </div>
          </div>
        </section>

        <section className="nl-contact" id="contact" aria-labelledby="nl-contact-title">
          <div className="nl-contact-inner">
            <div className="nl-contact-copy">
              <p className="nl-section-label">Visit &amp; Contact</p>
              <h2 id="nl-contact-title">Come and say <em>hello.</em></h2>
              <p className="nl-contact-lead">Visit our rooms, meet the educators, and discover how we learn through play.</p>

              <div className="nl-contact-details">
                <div className="nl-contact-item"><span className="nl-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="m4.5 7 7.5 6 7.5-6"/></svg></span><div><span className="nl-contact-label">Email</span><a href="mailto:ash@neverlandelc.com">ash@neverlandelc.com</a><a href="mailto:info@neverlandelc.com">info@neverlandelc.com</a></div></div>
                <div className="nl-contact-item"><span className="nl-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 3.7c1.5-1 2.9-.2 3.5 1.5l.6 1.6-2 2c1.2 2.7 3 4.5 5.6 5.7l2.1-2 1.6.7c1.7.7 2.4 2.1 1.4 3.5-1.1 1.5-2.9 2.1-4.8 1.6-5.2-1.4-8.8-5-10.3-10.2-.5-1.8.3-3.4 2.3-4.4Z"/></svg></span><div><span className="nl-contact-label">Phone</span><a href="tel:+8801781288650">+880 1781288650</a></div></div>
                <div className="nl-contact-item"><span className="nl-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg></span><div><span className="nl-contact-label">Find us</span><span>Banani, Dhaka</span></div></div>
              </div>

              <p className="nl-days-caption">Opening days</p>
              <div className="nl-day-list" aria-label="Open Saturday through Thursday, closed Friday">
                <span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span className="nl-closed-day">Fri</span>
              </div>
              <p className="nl-schedule-note">8:00 am–6:00 pm · Closed Fridays</p>
            </div>
            <div className="nl-contact-art" aria-hidden="true">
              <svg className="nl-decor nl-star nl-contact-star" viewBox="0 0 40 40"><path d="M20 1 23 15 34 6 27 18 40 20 27 23 34 35 22 26 20 40 17 26 5 34 13 22 1 20 14 17 6 5 18 14Z" fill="currentColor"/></svg>
              <img className="nl-contact-flower" src="/assets/flower.svg" alt="" />
              <img className="nl-contact-logo" src="/assets/neverland-logo.png" alt="" />
            </div>
          </div>
        </section>
      </main>

      <footer className="nl-footer">
        <div className="nl-footer-inner">
          <div className="nl-footer-grid">
            <div><span className="nl-footer-brand">Neverland</span><span>Neverland ELC – Early Learning Centre &amp; Long Day Care</span></div>
            <div><a href="mailto:ash@neverlandelc.com">ash@neverlandelc.com</a><a href="mailto:info@neverlandelc.com">info@neverlandelc.com</a><a href="tel:+8801781288650">+880 1781288650</a></div>
            <div><span>Banani, Dhaka</span><span>Open Saturday – Thursday, 8:00 am – 6:00 pm</span></div>
          </div>
          <div className="nl-footer-bottom"><span>© 2026 Neverland ELC. All rights reserved.</span><span>Aligned with the Early Years Learning Framework (EYLF) – Australia</span></div>
        </div>
      </footer>
    </div>
  );
}
