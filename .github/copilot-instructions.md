# Copilot instructions for `neverland-elc-site`

## Big picture (App Router + single-site scope)
- This is a **public marketing site** in Next.js App Router (`app/`), not a dashboard or CMS.
- Route pages are static TSX files in `app/*/page.tsx` (`/`, `/about`, `/curriculum`, `/enrolment`, `/contact`, `/privacy`).
- Shared UI building blocks live in `components/`:
  - `components/Shell.tsx` → `Header`, `Footer`, `CookieConsent`
  - `components/Blocks.tsx` → `PageHero`, `Cta`
  - `components/Forms.tsx` → client form UX + reCAPTCHA token handling
- Global composition is in `app/layout.tsx` (imports `Header`, `Footer`, `CookieConsent`).

## Data flow and service boundaries (forms)
- All form submissions go through **one API endpoint**: `POST /api/submit` in `app/api/submit/route.ts`.
- Validation/security pipeline in order:
  1. same-origin host check
  2. Zod parse (`kind` = `enquiry | tour | waitlist` + field constraints)
  3. honeypot short-circuit (`website` field)
  4. date/business-rule checks for tour/waitlist
  5. Google reCAPTCHA v3 server verification (action `submit`, score ≥ 0.5)
  6. inbox email via Resend + best-effort acknowledgement email
  7. Axiom activity log (best-effort; no personal data)
- `runtime='nodejs'` is intentional; keep it unless you redesign integrations.
- Submission data is **email-delivered only** (no database).

## Project-specific coding conventions
- Keep source compact style consistent with existing files (single-line JSX blocks/common minimal spacing).
- Use the `@/*` path alias from `tsconfig.json` (e.g., `@/components/Blocks`).
- Prefer existing primitives over new abstractions:
  - use `Cta` for pill CTAs
  - use `PageHero` for page headers
  - keep navigation edits centralized in `components/Shell.tsx` `nav` array
- Forms are client components (`'use client'`) and must continue posting JSON to `/api/submit`.

## Environment + fail-closed behavior
- Required integrations are documented in `.env.example`: Resend, reCAPTCHA v3, Axiom (optional), Google Analytics.
- Treat missing form/security env vars as **configuration errors** (fail closed), consistent with current API behavior.
- `CookieConsent` only loads GA after explicit consent (`localStorage` key: `neverland-analytics-choice`). Preserve this gating.

## Developer workflow (from this repo)
- Package manager: npm.
- Scripts in `package.json`:
  - `npm run dev` → local dev server
  - `npm run build` → production build
  - `npm run start` → run built app
  - `npm run lint` → ESLint
- No test framework is currently configured; when adding tests, keep setup minimal and aligned with Next.js + TypeScript.

## Safe change patterns for AI agents
- When changing form fields, update both sides together:
  - client payload construction in `components/Forms.tsx`
  - Zod schema + business rules + email field rendering in `app/api/submit/route.ts`
- Do not remove or bypass anti-abuse layers (honeypot, origin check, reCAPTCHA) unless explicitly requested.
- Keep placeholder content markers (`[PHONE]`, `[DOMAIN]`, etc.) unless task explicitly provides approved replacements.
- `public/reference/*.jpeg` are visual references only; do not render them as page content unless asked.
