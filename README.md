# Neverland ELC public website

Five-page Next.js website recreated from supplied desktop references. Includes public Home, About, Curriculum, Enrolment, Contact, and a draft Privacy Policy. No parent app or management portal.

## Run locally

1. Install Node.js 20+.
2. Run `npm install` and `npm run dev`.
3. Copy `.env.example` to `.env.local` and configure the services below.
4. Open `http://localhost:3000`.

## Live forms — configuration required

- **Resend**: verify your sending domain; set `RESEND_API_KEY`, `FORM_FROM_EMAIL`, and `FORM_INBOX_EMAIL`. The central inbox receives the full submission; the applicant receives an acknowledgement. No website submission database is used. Note: if the acknowledgement fails after delivery to the inbox, the API still reports success and logs a non-sensitive delivery error.
- **Cloudflare Turnstile**: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. The API rejects requests without a verified token.
- **Upstash Redis**: set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Used **only** for abuse-rate counters, not submissions; configured limit 8 per hour per source IP. Review rate limits before launch.
- **Google Analytics**: set `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Analytics scripts load only after the visitor accepts the cookie prompt. Add an accessible way to change consent later before production launch.

Without these credentials, forms **will not send**. This is deliberate fail-closed behavior. The website is not ready for public launch until form delivery, error handling, privacy policy and consent behavior are tested.

## Content still requiring approval

Screenshots contain placeholders for address, phone, email, fees, photos, founders and stories. The screenshots also claim EYLF, ages 6 months–5 years, operating hours and a nut-free center; verify these claims before public launch. No placeholder is a confirmed fact. The Privacy Policy is a draft and requires approved retention schedules for enquiry, tour and waitlist mailbox messages. Since submissions are email-only, implement retention in your email system. Set domain-specific SPF/DKIM/DMARC for delivery.

## Reference files

The five supplied desktop screenshot images are in `public/reference/` for side-by-side visual checking. They are **not displayed** as page content. Mobile app images were intentionally excluded.
