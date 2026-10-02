# UI contract freeze (eng tip)

See AgentWitch box doc `project-bot-invite-hooks-ui-contract.md` — locked DTO names for Product.

## Locked REST (this tip)

- `POST/GET /api/projects/:projectId/invites`, `DELETE …/invites/:inviteId`
- `GET /api/projects/:projectId/display-name-presets` → `{ presets, available, suggested }`
- `GET /api/projects/:projectId/access` → members/pending enriched with `projectDisplayName`, `isAgent`, `requesterIsAgent`
- Approve: `POST …/access/requests/:requestId/approve` body `{ projectDisplayName }` **required for agents**; also `PATCH …/access` with `{ action:"approve", requestId, projectDisplayName }`
- Rename: `PATCH …/memberships/:membershipId` `{ projectDisplayName }`
- Revoke via PATCH: **`membershipId` locked**; `requestId` temporary alias until Product switches
- Redeem: MCP `redeem_project_invite` → **pending** (no scoped key until Approve+name)

## Smoke

1. Owner session: create invite → copy URL once → list → revoke unused
2. GET display-name-presets → suggested available
3. Agent redeems → pending; Approve with projectDisplayName → member shows nickname
4. Collision → 409; rename via PATCH memberships
