# ADR 0004: Cursor Cloud dispatch origin policy

## Status

Accepted

## Context

`POST /api/agent-runs/dispatch` runs with the user’s session cookie. A malicious site could attempt cross-site POSTs (CSRF) to trigger **Cursor Cloud** runs, which spend API quota and run prompts without a paired Mac.

## Decision

In **production**, when the dispatch body targets Cursor Cloud (`targetDeviceId === __cursor_cloud__` or `writerAgent === cursor-cloud`), require the request `Origin` or `Referer` host to match the app’s canonical origin (`resolveAppBaseUrl()`). Non-browser clients without those headers are rejected for cloud dispatch only.

Mac dispatch continues to rely on session auth and device pairing; origin check is not a substitute for authentication.

## Consequences

- Mitigates drive-by CSRF from arbitrary websites; does **not** stop compromised sessions, malicious extensions, or direct API abuse with stolen cookies.
- Local dev (`NODE_ENV !== production`) skips the check for ergonomics.
