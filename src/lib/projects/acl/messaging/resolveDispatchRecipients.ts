import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

import {
  lookupDisplayNameRecipients,
  type DispatchRecipient,
} from "@/lib/projects/acl/messaging/lookupDispatchMembershipRecipients";

export type { DispatchRecipient };

const capRecipients = (
  recipients: readonly DispatchRecipient[],
):
  | { readonly ok: true; readonly recipients: readonly DispatchRecipient[] }
  | { readonly ok: false; readonly code: "recipient_not_found" | "fanout_cap" } => {
  if (recipients.length === 0) {
    return { ok: false, code: "recipient_not_found" };
  }
  if (recipients.length > 20) {
    return { ok: false, code: "fanout_cap" };
  }
  return { ok: true, recipients };
};

export const resolveDispatchRecipients = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly toMembershipId?: string | null;
  readonly toProjectDisplayName: string | null;
  readonly toTeamLabel: string | null;
}): Promise<
  | { readonly ok: true; readonly recipients: readonly DispatchRecipient[] }
  | { readonly ok: false; readonly code: "recipient_not_found" | "fanout_cap" }
> => {
  const sql = getSql();
  if (input.toMembershipId) {
    const rows = asRowArray(
      await sql`
        SELECT id, user_id
        FROM project_memberships
        WHERE project_id = ${input.projectId}
          AND status = 'active'
          AND id = ${input.toMembershipId}
          AND user_id <> ${input.actorUserId}
        LIMIT 1
      `,
    );
    const row = rows[0];
    if (!row) {
      return { ok: false, code: "recipient_not_found" };
    }
    return {
      ok: true,
      recipients: [{ id: String(row.id), user_id: String(row.user_id) }],
    };
  }
  if (input.toProjectDisplayName?.trim().toLowerCase() === "owner") {
    const project = await getUserProjectById(input.projectId);
    if (project === null || project.ownerUserId === input.actorUserId) {
      return { ok: false, code: "recipient_not_found" };
    }
    return { ok: true, recipients: [{ id: null, user_id: project.ownerUserId }] };
  }
  if (input.toProjectDisplayName) {
    return capRecipients(
      await lookupDisplayNameRecipients({
        projectId: input.projectId,
        actorUserId: input.actorUserId,
        toProjectDisplayName: input.toProjectDisplayName,
      }),
    );
  }
  if (input.toTeamLabel) {
    const rows = asRowArray(
      await sql`
        SELECT id, user_id
        FROM project_memberships
        WHERE project_id = ${input.projectId}
          AND status = 'active'
          AND team_label = ${input.toTeamLabel}
          AND user_id <> ${input.actorUserId}
      `,
    );
    return capRecipients(
      rows.map((row) => ({
        id: String(row.id),
        user_id: String(row.user_id),
      })),
    );
  }
  return { ok: false, code: "recipient_not_found" };
};
