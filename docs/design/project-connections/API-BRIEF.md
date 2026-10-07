# AgentWitch Project Connections — API brief (NRG AgentWitch)

**Audience:** NRG AgentWitch · **UI tip:** `feat/awc-project-connections-en` @ `c99b9344` (on main)  
**Updated:** 2026-10-07 ~10:00 CEST · **P2 BUILD GO** (AW Lead)  
**Base:** `origin/main` @ `bc288c27` (P1 live). Do **not** FF main from implement tip.

---

## 1. Goal

Project-scoped OAuth binds (Slack, Linear, Gmail, GitHub) for assistants **in that project** via **server-side proxy tools** later. Never raw tokens to clients/bots. `projectId` required; no cross-project leaks.

## 2. UI contract (LOCKED — unchanged in P2)

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

**Mutate stubs (owner only):**

| | |
| --- | --- |
| Start | `POST …/connections/:provider/start` → `{ url }` |
| Disconnect | `DELETE …/connections/:provider` |
| Callback | `GET /api/oauth/project-connections/callback` (browser; not called by list UI) |

## 3. Migration **104** (no new migration in P2)

Main has `101`. Parked: **102** Neon prune, **103** computer-sync — **do not reuse**. File: `db/migrations/104-project-connections.sql`.

Table `project_connections`: `id`, `project_id`, `provider`, `status`, `external_account_id`, `account_label`, `scopes`, encrypted access/refresh (`*_ciphertext`, `*_iv`), `token_expires_at`, `created_by_user_id`, `connected_at`, timestamps. **UNIQUE** `(project_id, provider)`. v1 UI = one active row per provider (reconnect replaces). Indexes: `project_connections_project_idx`, `project_connections_project_provider_status_idx` (ensure helper matches SQL).

## 4. ACL / encrypt / bots

- List: `authorizeProjectPageActor`. Mutate: `authorizeProjectOwner`.
- Encrypt: AES-256-GCM like Cursor Cloud (`scrypt(AUTH_SECRET, "project-connections-v1", 32)`).
- Tool runtime: server decrypt + proxy only — **never hand raw tokens to bots**.
- Refresh: `refreshProjectConnectionAccessToken` for Gmail + Linear; failure → `status=expired`. List overlays past `token_expires_at` as `expired` even if DB still says `connected`.

## 5. Env (Thien)

`PROJECT_CONNECTIONS_{GITHUB,SLACK,LINEAR,GOOGLE}_{CLIENT_ID,CLIENT_SECRET}`, `AUTH_SECRET`, public origin. Optional `PROJECT_CONNECTIONS_ENABLED` (`0` → GET **501**). Missing provider env → start **501** `{ ok:false, code:"unavailable" }`; list still 200 with `none` — never crash.

Railway: GitHub/Slack already set. Add Linear + Google client pairs for P2 Connect buttons to light up.

## 6. Phases (size)

| Phase | Scope | Size |
| --- | --- | --- |
| **P1** ✅ | mig 104 + encrypt + GET + start/callback/DELETE for **GitHub + Slack** + unavailable honesty | **M** |
| **P2** (this branch) | **Linear + Gmail** OAuth exchange + Google/Linear refresh + expiry → `expired` | **M–L** (Gmail verification risk) |
| **P3** | proxy tools + audit lines + GitHub picker cut | **M** |

### P2 provider scopes

| Provider | Scopes | Notes |
| --- | --- | --- |
| Linear | `read`, `write` (comma-separated on authorize) | Standard OAuth2; refresh tokens (~24h access) |
| Gmail | `gmail.readonly` + `gmail.send` | Personal-first; offline + consent; **least privilege for assistant read+send**. `gmail.readonly` is **Restricted** (Google verification / possible security assessment). Prefer over `mail.google.com` / `gmail.modify`. |

## 7. Risks / open Qs (Thien)

- **Gmail restricted-scope verification** before production multi-user use of `gmail.readonly`.
- Slack bot vs user token (P1 carry-over).
- Callback `PUBLIC_ORIGIN` / app base URL must match OAuth app redirect URIs.
- Soft land vs parked 102/103 (no new mig in P2).

*Implement on `feat/awc-project-connections-p2-r1`. Light Arch before FF. Coordinator merges.*
