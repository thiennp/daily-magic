# Composer recipient sticky + routing FSA (server)

Status: Dispatch slice (server). Human UI owns IndexedDB + chip/popup chrome.

## Routes

Under project authz (owner or human member who may send; viewers → 403):

- `GET /api/projects/:projectId/composer/recipient-sticky`
- `PUT /api/projects/:projectId/composer/recipient-sticky` body `{ mode: "all"|"membership", membershipId?: string }`
- `DELETE /api/projects/:projectId/composer/recipient-sticky`

Persist **only while the sticky chip is checked**. Uncheck / one-shot → DELETE.

## Shape

`{ mode: "all" | "membership", membershipId: string | null, updatedAt }`

`mode=membership` requires an **active** `bot` or `computer` seat. Inactive/left → reject PUT `membership_inactive` (409). GET auto-clears stale membership sticky and may set `clearedReason: "membership_inactive"`.

## One-assistant harden (Lead)

When the project has exactly **one** assistant (active bot|computer):

- GET returns `singleAssistant: { membershipId, displayName }`
- Human UI must hide **ALL** routing UI: no popup, no checkbox, no chip, no `@` picker
- Messages go **straight to that bot**
- PUT sticky → `single_assistant` (409); leftover sticky rows are cleared on GET

## Routing FSA

Pure helper: `src/lib/projects/acl/composer/decideComposerRecipientRouting.ts`

1. One assistant → `force_single_assistant` (`hideAllRoutingUi: true`)
2. Chip uncheck → `clear_sticky` + popup
3. `@` mentions → `use_mentions` (sticky untouched)
4. No `@` + sticky checked → `use_sticky_membership` (one assistant only; `all` removed by 093103ac)
5. Else → `require_popup`

## Leave / remove

`clearStickyOnMembershipLeave` runs from leave side-effects, owner revoke, and computer-device revoke. Clears rows pointing at that `membershipId` and inserts system notice `composer.recipient_sticky_cleared` (inbox via `to_user_id`, no deliveries / no bot wakes).

## Migration

`db/migrations/094-project-composer-recipient-sticky.sql` (+ soft ensure in `ensureProjectComposerRecipientStickySchema`).

## Out of scope here

IndexedDB / chip / popup UI (Human UI). Softs (`project.updated`, local-self-dispatch). Unified `POST …/messages` cutover. S0 safety.
