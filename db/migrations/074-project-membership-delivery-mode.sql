-- Wake / Non-Grok S4+S5 contract: per-membership inbox delivery mode.
-- webhook = wake-link (existing 5m/10m silence+block). poll = no-wake /
-- checks-on-demand (S5 skips silence notify+block; senders see "Checks on demand").
-- Column default stays webhook; linkless assistant seats are backfilled to poll below.
-- S4 owns writers/flip-on-wake-link; S5 only reads this column.

ALTER TABLE project_memberships
  ADD COLUMN IF NOT EXISTS delivery_mode TEXT NOT NULL DEFAULT 'webhook';

ALTER TABLE project_memberships
  DROP CONSTRAINT IF EXISTS project_memberships_delivery_mode_check;

ALTER TABLE project_memberships
  ADD CONSTRAINT project_memberships_delivery_mode_check
  CHECK (delivery_mode IN ('webhook', 'poll'));

-- Invite platform (grok | muse) so join can pick the connect-time mode
-- (resolveInitialProjectMembershipDeliveryMode). NULL = legacy / unknown.
ALTER TABLE project_invites
  ADD COLUMN IF NOT EXISTS platform TEXT;

-- Truth at the root: a seat with no stored wake link cannot be woken, so it
-- must not sit on webhook ("Wakes up on its own"). Backfill → poll
-- ("Checks on demand") for active assistant seats with NO wake link, where a
-- wake link is either:
--   * an owner-saved Grok routine wake link
--     (project_membership_grok_routine_webhooks with a webhook_url), or
--   * a bot-registered HMAC wake link
--     (project_membership_webhooks enabled with a webhook_url).
-- Assistant seat = active role='member' member_kind='bot' row whose user is an
-- agent-access bot (synthetic @agents.agentwitch.com email).
-- Platform was never stored before this migration, so a linkless Grok seat
-- cannot be told apart from a non-Grok / unknown one: every linkless
-- assistant seat becomes poll. Saving a wake link flips it back to webhook.
-- Untouched: seats with a wake link, humans, computers, owners, revoked rows.
UPDATE project_memberships m
SET delivery_mode = 'poll'
FROM users u
WHERE u.id = m.user_id
  AND u.email LIKE '%@agents.agentwitch.com'
  AND m.status = 'active'
  AND m.role = 'member'
  AND m.member_kind = 'bot'
  AND m.delivery_mode = 'webhook'
  AND NOT EXISTS (
    SELECT 1 FROM project_membership_grok_routine_webhooks g
    WHERE g.membership_id = m.id
      AND length(coalesce(g.webhook_url, '')) > 0
  )
  AND NOT EXISTS (
    SELECT 1 FROM project_membership_webhooks w
    WHERE w.membership_id = m.id
      AND w.enabled = TRUE
      AND length(coalesce(w.webhook_url, '')) > 0
  );
