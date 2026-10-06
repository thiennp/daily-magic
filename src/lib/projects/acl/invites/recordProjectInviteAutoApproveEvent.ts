import { randomUUID } from "node:crypto";

import { ensureProjectInviteAutoApproveEventsSchema } from "@/lib/projects/acl/invites/ensureProjectInviteAutoApproveEventsSchema";
import type { ProjectInviteAutoApproveEventKind } from "@/lib/projects/acl/invites/projectInviteAutoApproveEvent.types";
import { getSql } from "@/lib/db";

/** Append one durable invite auto-approve history row; returns its id (Access log source_ref). */
export const recordProjectInviteAutoApproveEvent = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly event: ProjectInviteAutoApproveEventKind;
  readonly actorUserId?: string | null;
  readonly membershipId?: string | null;
  readonly memberDisplayName?: string | null;
}): Promise<string> => {
  await ensureProjectInviteAutoApproveEventsSchema();
  const sql = getSql();
  const label = input.inviteId.slice(0, 8);
  const id = randomUUID();
  await sql`
    INSERT INTO project_invite_auto_approve_events (
      id, project_id, invite_id, invite_label, event,
      actor_user_id, membership_id, member_display_name
    )
    VALUES (
      ${id},
      ${input.projectId},
      ${input.inviteId},
      ${label},
      ${input.event},
      ${input.actorUserId ?? null},
      ${input.membershipId ?? null},
      ${input.memberDisplayName ?? null}
    )
  `;
  return id;
};
