# UI contract freeze (eng tip)

See AgentWitch box doc `project-bot-invite-hooks-ui-contract.md` — locked DTO names for Product.

## Locked REST (this tip)

- `POST/GET /api/projects/:projectId/invites`, `DELETE …/invites/:inviteId`
- `GET /api/projects/:projectId/display-name-presets` → `{ presets, available, suggested }`
- `GET /api/projects/:projectId/access` → members/pending enriched with `projectDisplayName`, `isAgent`, `requesterIsAgent`, **`suggestedProjectDisplayName`** (nullable; from invite redeem)
- Approve: `POST …/access/requests/:requestId/approve` body `{ projectDisplayName }` **required for agents unless pending has suggestion**; also `PATCH …/access` with `{ action:"approve", requestId, projectDisplayName? }` — owner name wins; else auto-apply pending suggestion when still valid/unique
- Rename: `PATCH …/memberships/:membershipId` `{ projectDisplayName }`
- Revoke via PATCH: **`membershipId` locked**; `requestId` temporary alias until Product switches
- Redeem: MCP `redeem_project_invite` `{ token, suggestedProjectDisplayName? }` (alias `projectDisplayName`) → **pending** (no scoped key until Approve); reject redeem if suggestion invalid/taken (`DISPLAY_NAME_*`)

## Smoke

1. Owner session: create invite → copy URL once → list → revoke unused
2. GET display-name-presets → suggested available
3. Agent redeems with optional `suggestedProjectDisplayName` → pending; GET access shows suggestion; Approve omits name → auto-applies; or owner overrides
4. Collision on redeem or Approve → 409 / `DISPLAY_NAME_TAKEN`; rename via PATCH memberships

## Invite URL page (2026-10-02)

`GET /invite/p/<token>` — public instructions page (no auth). Redeem is MCP-only (`redeem_project_invite`). Do not treat missing browser session as dead invite. POST create returns `url` + `token` once.
