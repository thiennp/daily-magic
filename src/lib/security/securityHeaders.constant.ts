/**
 * Response security headers for every AWC response: Next.js routes via
 * `next.config.ts` `headers()`, and the custom server's own responses
 * (`/api/health`, the "Service starting" 503) via `applySecurityHeaders`.
 *
 * Keep this file import-free: `next.config.ts` loads it before path aliases
 * exist.
 *
 * - HSTS: 2 years + subdomains, deliberately no `preload`.
 * - CSP: only `frame-ancestors 'self'` (clickjacking). A script-src policy
 *   needs its own review.
 */
export const SECURITY_HEADERS: ReadonlyArray<{
  readonly key: string;
  readonly value: string;
}> = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
];
