# AgentWitch Project Connections — API brief (NRG AgentWitch)

**Audience:** NRG AgentWitch · **UI tip:** `feat/awc-project-connections-en` @ `c99b9344` (now on main `ca665e66`)  
**Updated:** 2026-10-07 ~09:23 CEST · **BUILD GO** (NRG Lead + AW Lead)  
**Base:** `origin/main` ≥ `0f390e4d` (API tip off current main). Do **not** FF main from implement tip.

---

## 1. Goal

Project-scoped OAuth binds (Slack, Linear, Gmail, GitHub) for assistants **in that project** via **server-side proxy tools** later. Never raw tokens to clients/bots. `projectId` required; no cross-project leaks.

## 2. UI contract (LOCKED)

| | |
| --- | --- |
| List | `GET /api/projects/:projectId/connections` |
| AuthZ list | signed-in project page actor (owner / member / viewer) |
| Success 200 | `{ ok: true, connections: ConnectionItem[] }` (bare array also OK) |
| Item | camelCase: `provider`, `status`, `accountLabel`, `connectedAt` |
| `provider` | `slack`\|`linear`\|`gmail`\|`github` |
| `status` | `connected`\|`expired`\|`error`\|`revoked`\|`none` (UI maps `revoked`→`none`) |
| Unavailable | **404** or **501** → UI Connect disabled + honest empty |
| Error | other non-2xx → load error + Try again |
| Tokens | **NEVER** in any response |

**Stubs for UI wire-up:**

| | |
| --- | --- |
| Start | `POST …/connections/:provider/start` → `{ url }` (**owner**) |
| Disconnect | `DELETE …/connections/:provider` (**owner**) |
| Callback | `GET /api/oauth/project-connections/callback` (browser; not called by list UI) |

## 3. Migration **104**

Main has `101`. Parked: **102** Neon prune, **103** computer-sync — **do not reuse**. File: `db/migrations/104-project-connections.sql`.

Table `project_connections`: `id`, `project_id`, `provider`, `status`, `external_account_id`, `account_label`, `scopes`, encrypted access/refresh (`*_ciphertext`, `*_iv`), `token_expires_at`, `created_by_user_id`, `connected_at`, timestamps. **UNIQUE** `(project_id, provider, external_account_id)`. v1 UI = one active row per provider (reconnect replaces).

## 4. ACL / encrypt / bots

- List: `authorizeProjectPageActor`. Mutate: `authorizeProjectOwner`.
- Encrypt: AES-256-GCM like Cursor Cloud (`scrypt(AUTH_SECRET, "project-connections-v1", 32)`).
- Tool runtime: server decrypt + proxy only — **never hand raw tokens to bots**.

## 5. Env (Thien)

`PROJECT_CONNECTIONS_{GITHUB,SLACK,LINEAR,GOOGLE}_{CLIENT_ID,CLIENT_SECRET}`, `AUTH_SECRET`, public origin. Optional `PROJECT_CONNECTIONS_ENABLED` (`0` → GET **501**). Missing provider env → start **501** `{ ok:false, code:"unavailable" }`; list still 200 with `none` — never crash.

## 6. Phases (size)

| Phase | Scope | Size |
| --- | --- | --- |
| **P1** | mig 104 + encrypt + GET + start/callback/DELETE for **GitHub + Slack** + unavailable honesty | **M** ~2–4d |
| **P2** | Linear + Gmail (+ refresh harden) | **M–L** (Gmail verification risk) |
| **P3** | proxy tools + audit lines + GitHub picker cut | **M** |

## 7. Risks / open Qs (Thien)

Gmail restricted scopes; Slack bot vs user token; which OAuth apps exist; callback `PUBLIC_ORIGIN`; Soft land vs parked 102/103.

*Implement on `feat/awc-project-connections-api-r1`. Light Arch before FF.*
