import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import { resolveDispatchRecipients } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getSql } from "@/lib/db";

export type DispatchProjectMessageResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly recipientCount: number;
    }
  | { readonly ok: false; readonly code: string };

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
  const resolved = await resolveDispatchRecipients({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    toProjectDisplayName: parsed.toProjectDisplayName,
    toTeamLabel: parsed.toTeamLabel,
  });
  if (!resolved.ok) {
    return { ok: false, code: resolved.code };
  }

  const sql = getSql();
  const messageId = randomUUID();
  const refsJson = JSON.stringify(parsed.refs);
  const primary = resolved.recipients[0];
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
  for (const recipient of resolved.recipients) {
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
      recipientCount: resolved.recipients.length,
      toProjectDisplayName: parsed.toProjectDisplayName,
      toTeamLabel: parsed.toTeamLabel,
    },
  });
  return {
    ok: true,
    messageId,
    recipientCount: resolved.recipients.length,
  };
};
