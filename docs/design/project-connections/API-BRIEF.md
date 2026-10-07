# AgentWitch Project Connections — API brief (NRG AgentWitch)

**Audience:** NRG AgentWitch · **UI tip:** `feat/awc-project-connections-en` @ `c99b9344` (on main)  
**Updated:** 2026-10-07 ~10:30 CEST · **Notion + Google Drive BUILD GO** (AW Lead)  
**Base:** stack on P2 tip `feat/awc-project-connections-p2-r1` @ `ebed87c1` (Linear + Gmail). Do **not** FF main from implement tip. Merge order before this tip lands: History default-ON hotfix → admin set-plan → Human UI merges P2 → rebase this tip.

---

## 1. Goal

Project-scoped OAuth binds (Slack, Linear, Gmail, GitHub, **Notion**, **Google Drive**) for assistants **in that project** via **server-side proxy tools** later. Never raw tokens to clients/bots. `projectId` required; no cross-project leaks.

## 2. UI contract (LOCKED — provider list extended)

| | |
| --- | --- |
| List | `GET /api/projects/:projectId/connections` |
| AuthZ list | signed-in project page actor (owner / member / viewer) |
| Success 200 | `{ ok: true, connections: ConnectionItem[] }` (bare array also OK) |
| Item | camelCase: `provider`, `status`, `accountLabel`, `connectedAt` |
| `provider` | `slack`\|`linear`\|`gmail`\|`github`\|`notion`\|`google_drive` |
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

## 3. Migration **104** (no new migration for Notion/Drive)

Main has `101`. Parked: **102** Neon prune, **103** computer-sync — **do not reuse**. File: `db/migrations/104-project-connections.sql`.

Table `project_connections`: `id`, `project_id`, `provider`, `status`, `external_account_id`, `account_label`, `scopes`, encrypted access/refresh (`*_ciphertext`, `*_iv`), `token_expires_at`, `created_by_user_id`, `connected_at`, timestamps. **UNIQUE** `(project_id, provider)`. v1 UI = one active row per provider (reconnect replaces). Indexes: `project_connections_project_idx`, `project_connections_project_provider_status_idx` (ensure helper matches SQL). Provider is a free string — **no schema change** for `notion` / `google_drive`.

## 4. ACL / encrypt / bots

- List: `authorizeProjectPageActor`. Mutate: `authorizeProjectOwner`.
- Encrypt: AES-256-GCM like Cursor Cloud (`scrypt(AUTH_SECRET, "project-connections-v1", 32)`).
- Tool runtime: server decrypt + proxy only — **never hand raw tokens to bots**.
- Refresh: `refreshProjectConnectionAccessToken` for Gmail, Linear, **Notion**, **Google Drive**; failure → `status=expired`. List overlays past `token_expires_at` as `expired` even if DB still says `connected`.

## 5. Env (Thien)

`PROJECT_CONNECTIONS_{GITHUB,SLACK,LINEAR,GOOGLE,NOTION}_{CLIENT_ID,CLIENT_SECRET}`, `AUTH_SECRET`, public origin. Optional `PROJECT_CONNECTIONS_ENABLED` (`0` → GET **501**). Missing provider env → start **501** `{ ok:false, code:"unavailable" }`; list still 200 with `none` — never crash.

| Provider | Env pair |
| --- | --- |
| GitHub | `PROJECT_CONNECTIONS_GITHUB_CLIENT_ID` / `_SECRET` |
| Slack | `PROJECT_CONNECTIONS_SLACK_CLIENT_ID` / `_SECRET` |
| Linear | `PROJECT_CONNECTIONS_LINEAR_CLIENT_ID` / `_SECRET` |
| Gmail **and** Google Drive | **same** `PROJECT_CONNECTIONS_GOOGLE_CLIENT_ID` / `_SECRET` (Drive adds Drive scopes on connect) |
| Notion | `PROJECT_CONNECTIONS_NOTION_CLIENT_ID` / `_SECRET` |

Railway: GitHub/Slack already set. Add Linear + Google + Notion client pairs for Connect buttons to light up.

## 6. Phases (size)

| Phase | Scope | Size |
| --- | --- | --- |
| **P1** ✅ | mig 104 + encrypt + GET + start/callback/DELETE for **GitHub + Slack** + unavailable honesty | **M** |
| **P2** (tip ready) | **Linear + Gmail** OAuth exchange + Google/Linear refresh + expiry → `expired` | **M–L** (Gmail verification risk) |
| **Notion + Drive** (this branch) | **Notion + Google Drive** on same start/exchange/callback/disconnect/refresh pattern | **M** (Drive Sensitive; Notion public vs internal) |
| **P3** | proxy tools + audit lines + GitHub picker cut | **M** |

### Provider scopes

| Provider | Scopes | Notes |
| --- | --- | --- |
| Linear | `read`, `write` (comma-separated on authorize) | Standard OAuth2; refresh tokens (~24h access) |
| Gmail | `gmail.readonly` + `gmail.send` | Personal-first; offline + consent; **least privilege for assistant read+send**. `gmail.readonly` is **Restricted** (Google verification / possible security assessment). Prefer over `mail.google.com` / `gmail.modify`. |
| Notion | Portal capabilities: **Read content** + **Update content** (stored as `read_content`, `update_content`) | **Public** Notion integration OAuth (`owner=user`). Authorize has **no** `scope` query param — capabilities are set in the Notion integration settings. **Internal** integrations use a static workspace token and do **not** use this flow. Token exchange: HTTP Basic (`client_id:client_secret`) + JSON body; `Notion-Version: 2022-06-28`. Page picker at install limits which pages/databases the bot can see. |
| Google Drive | `drive.file` only | **Same Google OAuth client** as Gmail. Personal-first; `access_type=offline` + `prompt=consent`. `drive.file` is **Sensitive** (not Restricted): files the app creates or the user opens with the app. Avoid `drive` / `drive.readonly` unless assistants must browse arbitrary existing Drive files without a picker — those are **Restricted** and trigger Google verification / possible security assessment. |

## 7. Risks / open Qs (Thien)

- **Gmail restricted-scope verification** before production multi-user use of `gmail.readonly`.
- **Google Drive:** `drive.file` is Sensitive (OAuth consent screen verification for production). Upgrading to `drive.readonly` / `drive` is Restricted — higher bar.
- **Notion public vs internal:** production multi-workspace needs a **public** integration + redirect URI matching `PUBLIC_ORIGIN` + `/api/oauth/project-connections/callback`. Internal integrations cannot use this OAuth path.
- Slack bot vs user token (P1 carry-over).
- Callback `PUBLIC_ORIGIN` / app base URL must match OAuth app redirect URIs.
- Soft land vs parked 102/103 (no new mig for Notion/Drive).
- Merge order: History hotfix → admin set-plan → Human UI / P2 → rebase this tip.

*Implement on `feat/awc-project-connections-notion-drive-r1` stacked on P2 tip. Light Arch before FF. Coordinator merges.*
