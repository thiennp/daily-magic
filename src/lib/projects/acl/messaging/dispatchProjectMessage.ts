import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { normalizeProjectDisplayNameKey } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { asRowArray, getSql } from "@/lib/db";

export type DispatchProjectMessageResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly recipientCount: number;
    }
  | {
      readonly ok: false;
      readonly code: string;
    };

export const dispatchProjectMessage = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<DispatchProjectMessageResult> => {
  const sender = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (sender === null) {
    return { ok: false, code: "forbidden" };
  }
  if (!sender.projectDisplayName) {
    return { ok: false, code: "naming_required" };
  }
  if (!sender.scopes.includes("msg:dispatch")) {
    return { ok: false, code: "missing_scope" };
  }
  const parsed = parseProjectDispatchPayload(input.args);
  if (!parsed.ok) {
    return { ok: false, code: parsed.code };
  }

  await ensureProjectAclSchema();
  const sql = getSql();

  let recipients: { id: string; user_id: string }[] = [];
  if (parsed.toProjectDisplayName) {
    const key = normalizeProjectDisplayNameKey(parsed.toProjectDisplayName);
    const rows = asRowArray(
      await sql`
        SELECT id, user_id, project_display_name
        FROM project_memberships
        WHERE project_id = ${input.projectId}
          AND status = 'active'
          AND project_display_name IS NOT NULL
      `,
    );
    recipients = rows
      .filter(
        (row) =>
          row.project_display_name &&
          normalizeProjectDisplayNameKey(String(row.project_display_name)) ===
            key &&
          String(row.user_id) !== input.actorUserId,
      )
      .map((row) => ({ id: String(row.id), user_id: String(row.user_id) }));
    if (recipients.length === 0) {
      return { ok: false, code: "recipient_not_found" };
    }
  } else if (parsed.toTeamLabel) {
    const rows = asRowArray(
      await sql`
        SELECT id, user_id
        FROM project_memberships
        WHERE project_id = ${input.projectId}
          AND status = 'active'
          AND team_label = ${parsed.toTeamLabel}
          AND user_id <> ${input.actorUserId}
      `,
    );
    recipients = rows.map((row) => ({
      id: String(row.id),
      user_id: String(row.user_id),
    }));
    if (recipients.length === 0) {
      return { ok: false, code: "recipient_not_found" };
    }
  }

  // Unicast by display name should be one; teamLabel may be small N (cap 20).
  if (recipients.length > 20) {
    return { ok: false, code: "fanout_cap" };
  }

  const messageId = randomUUID();
  const refsJson = JSON.stringify(parsed.refs);
  const primary = recipients[0];
  await sql`
    INSERT INTO project_messages (
      id, project_id, sender_membership_id, sender_user_id,
      to_membership_id, to_user_id, to_team_label, to_project_display_name,
      kind, summary, refs
    )
    VALUES (
      ${messageId},
      ${input.projectId},
      ${sender.id},
      ${input.actorUserId},
      ${parsed.toProjectDisplayName ? primary.id : null},
      ${parsed.toProjectDisplayName ? primary.user_id : null},
      ${parsed.toTeamLabel},
      ${parsed.toProjectDisplayName},
      ${parsed.kind},
      ${parsed.summary},
      ${refsJson}::jsonb
    )
  `;

  for (const recipient of recipients) {
    await sql`
      INSERT INTO project_message_deliveries (
        id, message_id, membership_id, attempt, status
      )
      VALUES (
        ${randomUUID()},
        ${messageId},
        ${recipient.id},
        0,
        'pending'
      )
      ON CONFLICT DO NOTHING
    `;
  }

  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: "msg.dispatch",
    detail: {
      messageId,
      kind: parsed.kind,
      recipientCount: recipients.length,
      toProjectDisplayName: parsed.toProjectDisplayName,
      toTeamLabel: parsed.toTeamLabel,
    },
  });

  return { ok: true, messageId, recipientCount: recipients.length };
};
