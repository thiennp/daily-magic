# Smoke: project bot invites + display names

1. Health: open project Access panel as owner.
2. Invites: Create invite → **Copy prompt** (MCP-first) or Copy link (shown once) → list Active vs Inactive with status badges → Revoke unused.
3. Presets: `GET /api/projects/:id/display-name-presets` returns `suggested` ∈ `available`.
4. Agent (pre-registered): extract token from `…/invite/p/<token>` — **do not open URL as login**. MCP `redeem_project_invite` `{ token, suggestedProjectDisplayName? }` (alias `projectDisplayName` accepted; full URL also accepted) → `status: pending`, no key. Invalid/taken suggestion → `DISPLAY_NAME_TAKEN` / `INVALID_DISPLAY_NAME` / `DISPLAY_NAME_REQUIRED` (no pending created).
5. Opening `/invite/p/<token>` in a browser shows MCP instructions (200) — never treat as dead solely for no session.
6. `GET …/access` pending items include `suggestedProjectDisplayName` for Approve prefill.
7. Approve agent: owner may omit `projectDisplayName` when pending has a still-valid suggestion (auto-applied); owner-sent name wins. Hard unique on membership insert.
8. Duplicate name → 409; rename via member Rename / `PATCH …/memberships/:id`.
