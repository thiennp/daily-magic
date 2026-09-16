# E2E user scenarios (Gherkin)

Human-readable end-to-end scenarios for real-user flows in Agent Witch. These specs are documentation-first; Playwright/Cucumber wiring is not required yet.

## Conventions

| Item        | Value                                                                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test emails | `test*@agentwitch.com` (e.g. `test-admin-1@agentwitch.com`)                                                                                          |
| Login       | `POST /api/auth/test-login` for `test*@agentwitch.com` when `ALLOW_TEST_AUTH=1`, `E2E=1`, or `NODE_ENV≠production` (blocked on `www.agentwitch.com`) |
| Mac bridge  | Real `agent-witch` with localhost profile: `npm run e2e:agent-witch:setup -- <email> --start`                                                        |
| Cleanup log | `.e2e/cleanup-log.ndjson` — rows created by test accounts                                                                                            |
| Tags        | `@smoke`, `@requires-mac`, `@multi-user`, `@admin`                                                                                                   |

## Same-Mac multi-account team

You do **not** need multiple computers. Several `test*@agentwitch.com` accounts
on this Mac form a team:

1. Admin creates a company and invites executor + requester
2. Run agent-witch as the **executor**:
   `npm run e2e:agent-witch:setup -- test-team-executor-1@agentwitch.com --start`
3. Sign in as the executor so Home pairs this Mac
4. Requester dispatches to the executor (same machine, different user)

Playwright coverage: `e2e/same-mac-team.spec.ts` (serial).

## Excluded (per product decision)

- Google OAuth
- `/ws-test`, `/connection-lab`, `/styleguide`
- Super-admin `/admin/users` unless actor is seeded super_admin

## Feature files

| File                     | Area                       |
| ------------------------ | -------------------------- |
| `auth.feature`           | Login, logout, session     |
| `onboarding.feature`     | First-run checklist        |
| `home.feature`           | Dashboard, Mac connect     |
| `marketplace.feature`    | Browse, save to library    |
| `library.feature`        | Playbooks, publish         |
| `automations.feature`    | Schedule workflows         |
| `reports.feature`        | Job history                |
| `admin-company.feature`  | Companies & rules          |
| `team-dispatch.feature`  | Self, colleague, approval  |
| `agent-composer.feature` | Send a task                |
| `user-profile.feature`   | Profile edit               |
| `navigation.feature`     | Shell nav, guest vs authed |

## Running manually (browser)

Production build is required for interactive login UI (custom `npm run dev` may not hydrate client JS when HMR websocket fails):

```bash
set -a; . ./.env.local; set +a
npm run build && npx next start -p 3000
```

Or use the API helper in Playwright: `e2e/helpers/signInTestAccount.ts`.

### Playwright session (no OAuth UI)

```typescript
import { signInTestAccount } from "./helpers/signInTestAccount";

await signInTestAccount(page, "test-admin-1@agentwitch.com");
await page.goto("/admin");
```

`playwright.config.ts` exports `ALLOW_TEST_AUTH=1` and `E2E=1` for the web server so `npm run start` E2E works.

### CLI session + cookie (manual QA)

```bash
set -a; . ./.env.local; set +a
npm run test:auth:session -- test-qa-1@agentwitch.com
npm run test:auth:session -- test-qa-admin@agentwitch.com --super-admin
```

The script prints `cookieName` and `sessionToken` for DevTools → Application → Cookies, or use the printed `curlTestLogin` against a running app with `ALLOW_TEST_AUTH=1`.

For Mac pairing during E2E:

```bash
set -a; . ./.env.local; set +a
npm run dev
# separate terminal:
npm run e2e:agent-witch:setup -- test-member-a-1@agentwitch.com --start
```

Open http://localhost:3000/login, enter `test-member-a-1@agentwitch.com`, submit — no magic link email is sent.

## Cleanup

Test accounts append rows to `.e2e/cleanup-log.ndjson` when users or company groups are created. Use this file to delete Neon rows after a test run.
