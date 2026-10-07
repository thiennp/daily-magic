-- DF-038 (Thien 2026-10-07 22:37): an ACTIVE bot member may invite another
-- bot owned by the SAME owner account. Redeem seats it without an owner
-- Approve click. This is the ONE exception to the 2026-10-06 "no silent
-- auto-approve / no same-owner shortcut" rule; every other join path is
-- unchanged (owner invites, the per-invite auto-approve checkbox, the
-- test-only auto-connect flag).
--
-- created_by_membership_id: the inviting bot's membership. NOT NULL marks a
--   bot-made invite. Redeem requires this membership to still be active
--   (revoked / left / deleted inviter => invite dead; FK cascade on delete).
-- bound_owner_user_id: project owner at create time. Redeem requires the
--   project owner AND the redeeming bot's server-side owner link
--   (agent_access_tokens.owner_user_id) to equal it, so an invite can never
--   be chained to a different owner.
-- The CHECK pins the guardrails in the DB too: bot-made invites are
-- single-use and can never carry the owner-only auto-approve checkbox.
-- Additive + idempotent; safe to run after later-numbered files.

ALTER TABLE project_invites
  ADD COLUMN IF NOT EXISTS created_by_membership_id TEXT
    REFERENCES project_memberships(id) ON DELETE CASCADE;

ALTER TABLE project_invites
  ADD COLUMN IF NOT EXISTS bound_owner_user_id TEXT;

ALTER TABLE project_invites
  DROP CONSTRAINT IF EXISTS project_invites_bot_made_guard_check;

ALTER TABLE project_invites
  ADD CONSTRAINT project_invites_bot_made_guard_check CHECK (
    created_by_membership_id IS NULL
    OR (
      max_uses = 1
      AND auto_approve = FALSE
      AND bound_owner_user_id IS NOT NULL
    )
  );

CREATE INDEX IF NOT EXISTS project_invites_created_by_membership_idx
  ON project_invites (created_by_membership_id)
  WHERE created_by_membership_id IS NOT NULL;
