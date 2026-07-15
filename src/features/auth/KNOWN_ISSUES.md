# Authentication — known issues

## AUTH-001 — Magic link UI showed success when email was not sent

**Symptom:** Clicking “Email me a sign-in link” shows “Check your inbox” but no email arrives.

**Root cause:** `signIn("resend", { redirect: false })` can return `{ ok: false, error: "Configuration" }` when Resend rejects delivery (unverified sender domain, sandbox-only recipient, missing env). The login form ignored the result and always showed success. Production `POST /api/auth/signin/resend` currently redirects to `error=Configuration`.

**Fix:** `parseEmailSignInFeedback` maps the `signIn` result to user-visible errors; `resolveEmailFrom` / `resolveResendApiKey` reject placeholder env values; auth logs Resend failures server-side.

**Regression test:** `src/features/auth/utils/parseEmailSignInFeedback.test.ts`.

**Ops:** On Railway, set `AUTH_RESEND_KEY` (or `RESEND_API_KEY`) and a verified `EMAIL_FROM` such as `Agent Witch <noreply@agentwitch.com>` after adding the domain in Resend.
