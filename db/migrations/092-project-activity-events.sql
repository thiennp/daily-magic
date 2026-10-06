-- Invite S1: owner-only project Access log (Lead/Thien GO 2026-10-06).
-- Partly reverses 049 (Option A) on purpose: a small, capped, append-only log
-- of access and wake changes only. No message bodies and no msg.*, key.*,
-- webhook.*, tool-call or claim/check rows. Emails are never stored.
-- Retention (newest 500 per project, max 180 days) is trimmed by the writer.
-- 073 project_invite_auto_approve_events stays and keeps being written.
CREATE TABLE IF NOT EXISTS project_activity_events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'invite.created',
    'invite.revoked',
    'invite.auto_approve_enabled',
    'invite.auto_approve_disabled',
    'member.auto_approved',
    'request.approved',
    'request.denied',
    'member.removed',
    'member.left',
    'human_invite.created',
    'human_invite.revoked',
    'human_invite.accepted',
    'member.delivery_mode_changed'
  )),
  actor_kind TEXT NOT NULL CHECK (actor_kind IN ('owner', 'member', 'system')),
  actor_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  actor_label TEXT CHECK (actor_label IS NULL OR char_length(actor_label) <= 120),
  -- No FK: memberships are revoked, not deleted.
  target_membership_id TEXT,
  target_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  -- Display-name snapshot at write time (survives removal and renames).
  target_label TEXT CHECK (target_label IS NULL OR char_length(target_label) <= 120),
  detail JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (octet_length(detail::text) <= 2048),
  -- '073:<project_invite_auto_approve_events.id>' for backfill/dual-write dedupe.
  source_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_activity_events_project_created_idx
  ON project_activity_events (project_id, created_at DESC, id DESC);

CREATE UNIQUE INDEX IF NOT EXISTS project_activity_events_source_ref_uidx
  ON project_activity_events (source_ref)
  WHERE source_ref IS NOT NULL;

-- Backfill every 073 row. Re-runnable: source_ref makes a re-run insert 0 rows
-- (scripts/db-backfill-project-activity-073.ts re-runs this file after deploy).
INSERT INTO project_activity_events (
  project_id, event_type, actor_kind, actor_user_id,
  target_membership_id, target_user_id, target_label,
  detail, source_ref, created_at
)
SELECT
  e.project_id,
  CASE e.event
    WHEN 'enabled' THEN 'invite.auto_approve_enabled'
    WHEN 'disabled' THEN 'invite.auto_approve_disabled'
    ELSE 'member.auto_approved'
  END,
  CASE WHEN e.event = 'member_auto_approved' THEN 'system' ELSE 'owner' END,
  u.id,
  e.membership_id,
  m.user_id,
  CASE WHEN position('@' IN e.member_display_name) > 0 THEN NULL
       ELSE NULLIF(left(btrim(e.member_display_name), 120), '') END,
  CASE WHEN e.event = 'member_auto_approved' THEN
    jsonb_strip_nulls(jsonb_build_object(
      'inviteId', e.invite_id, 'label', e.invite_label,
      'membershipId', e.membership_id, 'approvalSource', 'invite_auto_approve'))
  ELSE
    jsonb_build_object('inviteId', e.invite_id, 'label', e.invite_label)
  END,
  '073:' || e.id,
  e.created_at
FROM project_invite_auto_approve_events e
JOIN user_projects p ON p.id = e.project_id
LEFT JOIN users u ON u.id = e.actor_user_id
LEFT JOIN project_memberships m
  ON m.id = e.membership_id AND m.project_id = e.project_id
WHERE e.created_at >= NOW() - interval '180 days'
ON CONFLICT (source_ref) WHERE source_ref IS NOT NULL DO NOTHING;

-- Same retention as the writer (newest 500 per project, max 180 days), so a
-- re-run never brings back rows the writer already trimmed for good.
DELETE FROM project_activity_events d
USING (
  SELECT id, created_at,
    row_number() OVER (
      PARTITION BY project_id ORDER BY created_at DESC, id DESC
    ) AS rn
  FROM project_activity_events
) r
WHERE d.id = r.id
  AND (r.rn > 500 OR r.created_at < NOW() - interval '180 days');
