# Chapter 2 — Auth and test login

AWC uses **Auth.js (NextAuth v5)** with Google OAuth, email magic links, and a **gated test bypass** for engineers and E2E. Product sign-in flows are in [user guide ch.2 — Accounts and sign-in](../user-guide/02-accounts-and-sign-in.md).

Code layout: UI `src/features/auth/` · server helpers `src/lib/auth/` · routes `src/app/api/auth/`.

---

## Session model (skim)

- Browser holds **`authjs.session-token`** (HttpOnly cookie) after sign-in.
- API routes and WebSocket upgrade resolve the actor from that cookie (`resolveAuthActorFromCookieHeader` in `server.ts`).
- **Production host** `www.agentwitch.com` never allows test bypass — enforced by host check, not only `NODE_ENV`.

Implementation gate: `src/lib/auth/isTestAuthBypassAllowed.ts`.

---

## Real auth (local)

With `.env.local` sourced into the shell:

| Method           | Env                                                                |
| ---------------- | ------------------------------------------------------------------ |
| Google OAuth     | `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`                             |
| Email magic link | `AUTH_RESEND_KEY` / `RESEND_API_KEY`, `EMAIL_FROM`                 |
| Dev secret login | `SECRET` in env + matching `localStorage` key (see `.env.example`) |

Login page: `http://localhost:3000/login`.

---

## Test auth bypass (preferred for agents)

Use **`test*@agentwitch.com`** addresses (validated by `isTestAgentWitchEmail`).

### When bypass is allowed

`isTestAuthEnvEnabled()` is true if **any** of:

- `ALLOW_TEST_AUTH=1`
- `E2E=1`
- `NODE_ENV !== "production"`

**And** the request host is **not** production Agent Witch (`www.agentwitch.com` / canonical origin from `AGENT_WITCH_DEFAULT_ORIGIN`).

`npm run dev` sets `NODE_ENV=development`, so the login form accepts test emails without email delivery.

### Ways to sign in

| Method              | Command / action                                                           |
| ------------------- | -------------------------------------------------------------------------- |
| Login UI            | `npm run dev` → `/login` → enter `test-qa-1@agentwitch.com`                |
| HTTP API            | `POST /api/auth/test-login` JSON `{ "email": "test-qa-1@agentwitch.com" }` |
| Session seed script | `npm run test:auth:session -- test-qa-1@agentwitch.com`                    |
| Playwright          | `e2e/helpers/signInTestAccount.ts`                                         |

**Always source DB first on Cursor Cloud:**

```bash
set -a; . ./.env.local; set +a
npm run test:auth:session -- test-qa-1@agentwitch.com
```

The script prints `cookieName`, `sessionToken`, and a sample `curl` for `/api/auth/test-login`.

### Production build locally

Test login with a production build:

```bash
set -a; . ./.env.local; set +a
ALLOW_TEST_AUTH=1 npm run build && ALLOW_TEST_AUTH=1 npm run start
```

Playwright’s `playwright.config.ts` sets `ALLOW_TEST_AUTH=1` and `E2E=1` on the webServer — see `e2e/README.md`.

### Super-admin / `/admin/users`

```bash
set -a; . ./.env.local; set +a
npm run test:auth:session -- test-qa-admin@agentwitch.com --super-admin
```

Or configure a super-admin email in product config and seed that user.

---

## Dev dashboard actor (WebSocket only)

When **`AGENT_WITCH_DEV_DASHBOARD=1`**, unauthenticated WebSocket upgrades may attach a synthetic dashboard user (`resolveDevDashboardActor` in `server.ts`). This supports local `/ws-test` and self-dispatch — **not** team dispatch or cross-user approvals. See `src/features/dispatch/KNOWN_ISSUES.md`.

---

## Security notes (do not skip)

- Test bypass is **disabled on production host** even with `ALLOW_TEST_AUTH=1`.
- Showcase tests assert test-login strings are not leaked in public artifacts (`e2eShowcasePublicLeakage.test.ts`).
- Cursor Cloud dispatch origin policy (ADR 0004) is separate from auth — session cookie still required; see [Chapter 5](05-dispatch-presence-and-runs.md).

Threat summary: [docs/security/threat-model.md](../../security/threat-model.md).

---

## Database tables (auth)

Schema in `db/schema.sql`: `users`, `accounts`, `sessions`, `verification_tokens`, etc. Auth migrations may live under `db/migrations/`.

After schema apply, test login creates or reuses users via `findOrCreateUserByEmail`.

---

## Related

| Topic                   | Link                                                                  |
| ----------------------- | --------------------------------------------------------------------- |
| User accounts & pairing | [user guide ch.2](../user-guide/02-accounts-and-sign-in.md)           |
| Local env & VM DB       | [Chapter 1](01-local-dev-and-env.md)                                  |
| Domain: auth            | [docs/domains/auth-shell-admin.md](../../domains/auth-shell-admin.md) |
| E2E login               | [e2e/README.md](../../../e2e/README.md)                               |

```bash
npm run feature-knowledge:query -- "test login agentwitch.com" --feature=docs
```

---

## Query aliases

- test auth bypass test*@agentwitch.com POST /api/auth/test-login
- ALLOW_TEST_AUTH E2E seedTestAuthSession super-admin
- NextAuth Auth.js login localhost not production agentwitch
- đăng nhập test Agent Witch, bypass OAuth, cookie session
