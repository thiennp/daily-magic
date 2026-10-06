import { ensureProjectActivityEventsSchema } from "@/lib/projects/acl/activity/ensureProjectActivityEventsSchema";
import type {
  ProjectActivityActorKind,
  ProjectActivityEventType,
} from "@/lib/projects/acl/activity/projectActivityEvent.constant";
import {
  sanitizeProjectActivityEventDetail,
  sanitizeProjectActivityLabel,
} from "@/lib/projects/acl/activity/sanitizeProjectActivityEventDetail";
import { trimProjectActivityEvents } from "@/lib/projects/acl/activity/trimProjectActivityEvents";
import { asRowArray, getSql } from "@/lib/db";

export type WriteProjectActivityEventInput = {
  readonly projectId: string;
  readonly type: ProjectActivityEventType;
  /** kind omitted: owner when userId is the project owner, else member. */
  readonly actor: {
    readonly kind?: ProjectActivityActorKind;
    readonly userId: string | null;
    readonly label?: string | null;
  };
  readonly target?: {
    readonly membershipId?: string | null;
    readonly userId?: string | null;
    readonly label?: string | null;
  };
  readonly detail?: Readonly<Record<string, unknown>>;
  /** '073:<id>' links a row to the 073 table so backfill never duplicates it. */
  readonly sourceRef?: string | null;
};

const insertRow = async (
  input: WriteProjectActivityEventInput,
): Promise<boolean> => {
  const actorId = input.actor.userId;
  const memberId = input.target?.membershipId ?? null;
  const detail = JSON.stringify(sanitizeProjectActivityEventDetail(input.detail));
  const rows = asRowArray(
    await getSql()`
      INSERT INTO project_activity_events (
        project_id, event_type, actor_kind, actor_user_id, actor_label,
        target_membership_id, target_user_id, target_label, detail, source_ref
      )
      SELECT
        p.id,
        ${input.type}::text,
        COALESCE(${input.actor.kind ?? null}::text,
          CASE WHEN p.owner_user_id = ${actorId}::text THEN 'owner' ELSE 'member' END),
        (SELECT u.id FROM users u WHERE u.id = ${actorId}::text),
        COALESCE(${sanitizeProjectActivityLabel(input.actor.label)}::text,
          (SELECT left(m.project_display_name, 120) FROM project_memberships m
           WHERE m.project_id = p.id AND m.user_id = ${actorId}::text
             AND m.user_id <> p.owner_user_id
           ORDER BY m.created_at DESC LIMIT 1)),
        ${memberId}::text,
        (SELECT u.id FROM users u WHERE u.id = ${input.target?.userId ?? null}::text),
        COALESCE(${sanitizeProjectActivityLabel(input.target?.label)}::text,
          (SELECT left(m.project_display_name, 120) FROM project_memberships m
           WHERE m.id = ${memberId}::text AND m.project_id = p.id)),
        ${detail}::jsonb,
        ${input.sourceRef ?? null}::text
      FROM user_projects p
      WHERE p.id = ${input.projectId}::text
      ON CONFLICT (source_ref) WHERE source_ref IS NOT NULL DO NOTHING
      RETURNING id
    `,
  );
  return rows.length > 0;
};

const codeOf = (error: unknown): string =>
  error !== null && typeof error === "object" && "code" in error
    ? String((error as { code: unknown }).code)
    : "unknown";

/**
 * Append one Access log row, then trim. Never throws: a failed log write
 * must not turn a successful approve/leave/remove into a 500. Missing
 * project → 0 rows. Unknown user ids → NULL (FK-safe). Logs no detail.
 */
export const writeProjectActivityEvent = async (
  input: WriteProjectActivityEventInput,
): Promise<void> => {
  try {
    await ensureProjectActivityEventsSchema();
    if (await insertRow(input)) {
      await trimProjectActivityEvents(input.projectId);
    }
  } catch (error) {
    console.warn("[project-activity] write skipped", {
      code: codeOf(error),
      type: input.type,
      projectId: input.projectId,
    });
  }
};
