import { getSql } from "@/lib/db";

const state: { ready: Promise<void> | null } = { ready: null };

const runDdl = async (): Promise<void> => {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS project_activity_events (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
      event_type TEXT NOT NULL CHECK (event_type IN (
        'invite.created', 'invite.revoked',
        'invite.auto_approve_enabled', 'invite.auto_approve_disabled',
        'member.auto_approved', 'request.approved', 'request.denied',
        'member.removed', 'member.left', 'human_invite.created',
        'human_invite.revoked', 'human_invite.accepted',
        'member.delivery_mode_changed',
        'project.runs_without_approval_enabled',
        'project.runs_without_approval_disabled',
        'rule.dropped', 'rule.restored',
        'messages.archived', 'messages.restored',
        'project.member_permissions_changed')),
      actor_kind TEXT NOT NULL CHECK (actor_kind IN ('owner', 'member', 'system')),
      actor_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      actor_label TEXT CHECK (actor_label IS NULL OR char_length(actor_label) <= 120),
      target_membership_id TEXT,
      target_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      target_label TEXT CHECK (target_label IS NULL OR char_length(target_label) <= 120),
      detail JSONB NOT NULL DEFAULT '{}'::jsonb
        CHECK (octet_length(detail::text) <= 2048),
      source_ref TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS project_activity_events_project_created_idx
    ON project_activity_events (project_id, created_at DESC, id DESC)
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS project_activity_events_source_ref_uidx
    ON project_activity_events (source_ref) WHERE source_ref IS NOT NULL
  `;
  // Mirrors migration 133 on an older table; no-op once the type is allowed.
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'project_activity_events_event_type_check'
          AND pg_get_constraintdef(oid) LIKE '%project.member_permissions_changed%'
      ) THEN
        ALTER TABLE project_activity_events
          DROP CONSTRAINT IF EXISTS project_activity_events_event_type_check;
        ALTER TABLE project_activity_events
          ADD CONSTRAINT project_activity_events_event_type_check
          CHECK (event_type IN (
            'invite.created', 'invite.revoked',
            'invite.auto_approve_enabled', 'invite.auto_approve_disabled',
            'member.auto_approved', 'request.approved', 'request.denied',
            'member.removed', 'member.left', 'human_invite.created',
            'human_invite.revoked', 'human_invite.accepted',
            'member.delivery_mode_changed',
            'project.runs_without_approval_enabled',
            'project.runs_without_approval_disabled',
            'rule.dropped', 'rule.restored',
            'messages.archived', 'messages.restored',
            'project.member_permissions_changed'));
      END IF;
    END $$
  `;
};

/**
 * DDL only (mirrors migrations 092 + 095 + 097 + 098 + 133; every CHECK list must equal
 * PROJECT_ACTIVITY_EVENT_TYPES, asserted in projectActivityMigration092.test.ts
 * and projectActivityMigration098.test.ts). Never runs the 073 backfill: that is
 * the migration and scripts/db-backfill-project-activity-073.ts.
 */
export const ensureProjectActivityEventsSchema = async (): Promise<void> => {
  if (state.ready === null) {
    state.ready = runDdl().catch((error: unknown) => {
      state.ready = null;
      throw error;
    });
  }
  await state.ready;
};

export const resetProjectActivityEventsSchemaForTests = (): void => {
  state.ready = null;
};
