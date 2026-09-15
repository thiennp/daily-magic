# Threat model — Daily Magic

This document describes **what we protect**, **who can attack**, and **which controls exist today**. It is not a penetration test report. Query it via:

```bash
npm run feature-knowledge:query -- "threat model cursor cloud dispatch" --feature=docs
```

Related: [ADR 0004 — Cursor Cloud dispatch origin](../adr/0004-cursor-cloud-dispatch-origin.md), [ADR 0002 — Custom server WebSocket](../adr/0002-custom-server-for-agent-witch-websocket.md).

---

## Assets

| Asset                                              | Why it matters                                    |
| -------------------------------------------------- | ------------------------------------------------- |
| User session (NextAuth, DB strategy)               | Impersonation, dispatch, admin actions            |
| Cursor Cloud API key (encrypted at rest)           | Spends quota; runs cloud agents as the user       |
| Agent Witch device pairing / device keys           | Mac acts as execution endpoint for the account    |
| Agent run content (prompts, logs, terminal output) | Sensitive code, secrets in prompts, business data |
| Harness files on Mac (`~/.agent-witch/harness/`)   | Rules/skills that steer agent behavior            |
| Group membership and dispatch policies             | Who may run tasks on whose Mac                    |
| Published capabilities and marketplace borrows     | Team-wide agent definitions                       |

Never store secrets in this doc or in feature-knowledge chunks.

---

## Trust boundaries

```text
[Browser on app origin] --HTTPS/cookies--> [Next.js + API routes + custom WS server]
        |                                          |
        |                                          +--> [Neon PostgreSQL]
        |                                          |
        +-- SSE/WS (authenticated) ----------------+--> [Agent Witch on user Mac]
                                                          |
                                                          +--> [Writer CLIs / shell]
[Browser] --user connects API key--> [Cursor Cloud API]  (via server-side dispatch)
[Third-party website] --must not drive dispatch--> (CSRF / cross-origin)
```

- **In scope for cloud:** session auth, dispatch authorization, origin checks for browser-initiated cloud runs, WebSocket upgrade rules.
- **On the Mac:** Agent Witch runs with the Mac user’s OS privileges; cloud policy cannot fully constrain arbitrary shell commands once dispatched.

---

## Actors

| Actor                                            | Goal                                                                    |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| Legitimate signed-in user                        | Run tasks on own Mac or Cursor Cloud; team dispatch where policy allows |
| Team member / delegate                           | Dispatch to another member’s Mac per group rules and approvals          |
| Global / group admin                             | Users, groups, dispatch configuration                                   |
| External website (attacker)                      | Trigger authenticated actions via victim’s browser (CSRF)               |
| Bearer of stolen session cookie                  | Call APIs as the victim without using the UI                            |
| Malicious browser extension or XSS on app origin | Read DOM, exfiltrate cookies, trigger in-origin requests                |
| Local attacker on Mac                            | Read harness, logs, or interfere with Agent Witch process               |

---

## Controls (current)

### Authentication and sessions

- NextAuth with database sessions; API routes use `requireAuth` / actor resolution from cookies.
- Production cookies follow `resolveAppBaseUrl()` (HTTPS when app URL is HTTPS).
- **Gap to track:** periodic authz audit on all mutating `/api/agent-runs/*` and `/api/agent-witch/*` routes (see backlog P0.3).

### Cursor Cloud dispatch (browser)

- User must connect Cursor Cloud on Home (stored API key).
- **Production:** `POST /api/agent-runs/dispatch` with a Cursor Cloud body requires `Origin` or `Referer` host to match `resolveAppBaseUrl()` (`isAllowedAppHttpOrigin`). See ADR 0004.
- **Does not replace** session auth; attacker with a stolen cookie can still call the API from a same-origin context or tools that forge origin headers in non-browser clients.

### Mac dispatch (Agent Witch)

- Device registry and pairing; dispatch targets resolved server-side (`resolveClaudeDispatchTarget`, policies, capabilities).
- WebSocket upgrade: `isSecureAgentWitchUpgrade`, `isAllowedAgentWitchOrigin` on `/api/agent-witch/ws`.
- Mac client runs in the user’s environment; treat paired devices as **high trust** for that account.

### Development-only hazards

- `AGENT_WITCH_DEV_DASHBOARD=1` (non-production) can synthesize a **super_admin** dashboard actor for local WS testing.
- **Must not** be enabled on production or shared staging that faces the internet.

### Admin

- Global admin routes under `/api/admin/*` use role checks (`isGlobalAdmin`, etc.).

---

## Threat scenarios

| ID  | Scenario                                                | Mitigation today                                               | Residual risk                                             |
| --- | ------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| T1  | CSRF: evil site POSTs cloud dispatch with victim cookie | Origin/referer check for cloud dispatch bodies (prod)          | XSS on app origin; forged non-browser clients with cookie |
| T2  | Stolen session cookie                                   | HTTPS, session storage in DB; no origin check on all endpoints | Full account actions until session revoked                |
| T3  | User dispatches to wrong Mac / wrong teammate           | Dispatch policies, approvals, capability resolution            | Misconfiguration; social engineering                      |
| T4  | Unpaired or spoofed Mac                                 | Pairing, device keys, lease semantics (Agent Witch)            | Compromised Mac user account                              |
| T5  | Prompt injection → harmful shell on Mac                 | User trust model; harness rules                                | **Inherent** to running agents on real machines           |
| T6  | Leak of Cursor Cloud API key from DB                    | Encryption with auth-derived key                               | DB breach + `AUTH_SECRET` compromise                      |
| T7  | Dev dashboard left on in prod                           | Env-gated; production should not set flag                      | Operator error                                            |

---

## Out of scope (documented, not solved here)

- Supply-chain compromise of install bundle or npm dependencies.
- Google OAuth / Resend provider outages or misconfiguration (availability, not app logic).
- Cursor Cloud or writer CLI vendor security.
- DDoS and WAF (platform/Vercel).

---

## Follow-up work (backlog)

| Item                     | Purpose                                                              |
| ------------------------ | -------------------------------------------------------------------- |
| P0.3 Authz audit         | Verify every dispatch and agent-witch mutation checks actor + policy |
| P0.4 Agent Witch runbook | Safe upgrade, rollback, incident response on Mac                     |
| Rate limits / abuse      | Optional caps on dispatch per user (not implemented)                 |

---

## Review

Update this file when adding dispatch surfaces, new executors (e.g. cloud providers), or auth changes. Re-run `npm run feature-knowledge:index` after edits.
