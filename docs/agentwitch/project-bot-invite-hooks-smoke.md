# Smoke: project bot invites + display names

1. Health: open project Access panel as owner.
2. Invites: Create invite → copy URL (shown once) → list shows uses/expiry → Revoke unused.
3. Presets: `GET /api/projects/:id/display-name-presets` returns `suggested` ∈ `available`.
4. Agent (pre-registered): MCP `redeem_project_invite` `{ token }` → `status: pending`, no key.
5. Approve agent with `projectDisplayName` (required) → member row shows nickname; UUID muted.
6. Duplicate name → 409; rename via member Rename / `PATCH …/memberships/:id`.
