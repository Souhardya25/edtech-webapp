# Stripe Checkout Integration (React + Vercel)

This app uses a Vercel Serverless Function for Stripe Checkout.

## Prerequisites
- Stripe account and secret key (test): `sk_test_...`
- Vercel CLI: `npm i -g vercel`

## Environment Variables
Create a local env file in `react-app/`:

1) Create `react-app/.env.local` with:
```
STRIPE_SECRET_KEY=sk_test_your_key_here
```

2) On Vercel (for deployments):
- Go to Project Settings → Environment Variables
- Add `STRIPE_SECRET_KEY`

Note: `react-app/.env.local` is git-ignored via `.gitignore` (`.env.*`).

## Local Development (with API)
Use Vercel Dev to run both Vite and API locally:

```
# From react-app/
vercel login     # if prompted
vercel dev
```

- App runs at a local URL printed in the console (often http://localhost:3000)
- API endpoint: `/api/create-checkout-session`

## Usage
- Navigate to a course details page, e.g. `/course/1`
- Click "Enroll Now" → You will be redirected to Stripe Checkout
- After completing payment, you'll be redirected to `/success?courseId=...`
- If canceled, you'll be redirected to `/cancel?courseId=...`

## Files
- API: `api/create-checkout-session.ts`
- Pages: `src/pages/Success.tsx`, `src/pages/Cancel.tsx`
- Wiring: `src/pages/CourseDetail.tsx`, `src/main.tsx`
- Vercel config: `vercel.json` (builds `api/**/*.ts` and Vite)

## Notes
- Prices are parsed from the course list (e.g., "$99" → 9900 cents).
- No publishable key is required for redirect-to-checkout flow.
- For production, ensure `STRIPE_SECRET_KEY` is set in Vercel env.
