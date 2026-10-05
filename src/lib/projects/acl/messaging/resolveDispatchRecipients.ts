import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

import {
  lookupDisplayNameRecipients,
  type DispatchRecipient,
} from "@/lib/projects/acl/messaging/lookupDispatchMembershipRecipients";
import { loadComputerMembershipDeviceId } from "@/lib/projects/acl/messaging/loadComputerMembershipDeviceId";

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

const resolveMembershipIdRecipient = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly toMembershipId: string;
}): Promise<
  | { readonly ok: true; readonly recipients: readonly DispatchRecipient[] }
  | { readonly ok: false; readonly code: "recipient_not_found" }
> => {
  const sql = getSql();
  // member_kind exists since 063. Allow owner→own computer (user_id may equal actor).
  // device_id is Mac 068 — loaded separately so bot resolve stays safe pre-mig.
  const rows = asRowArray(
    await sql`
      SELECT id, user_id, member_kind
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND status = 'active'
        AND id = ${input.toMembershipId}
        AND (
          user_id <> ${input.actorUserId}
          OR member_kind = 'computer'
        )
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (!row) {
    return { ok: false, code: "recipient_not_found" };
  }
  const memberKind =
    row.member_kind === "human"
      ? "human"
      : row.member_kind === "computer"
        ? "computer"
        : "bot";
  if (memberKind !== "computer") {
    return {
      ok: true,
      recipients: [
        {
          id: String(row.id),
          user_id: String(row.user_id),
          memberKind,
          deviceId: null,
        },
      ],
    };
  }
  const deviceId = await loadComputerMembershipDeviceId(String(row.id));
  if (deviceId === null) {
    return { ok: false, code: "recipient_not_found" };
  }
  return {
    ok: true,
    recipients: [
      {
        id: String(row.id),
        user_id: String(row.user_id),
        memberKind: "computer",
        deviceId,
      },
    ],
  };
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
    return resolveMembershipIdRecipient({
      projectId: input.projectId,
      actorUserId: input.actorUserId,
      toMembershipId: input.toMembershipId,
    });
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
        SELECT id, user_id, member_kind
        FROM project_memberships
        WHERE project_id = ${input.projectId}
          AND status = 'active'
          AND team_label = ${input.toTeamLabel}
          AND user_id <> ${input.actorUserId}
          AND member_kind <> 'computer'
      `,
    );
    return capRecipients(
      rows.map((row) => ({
        id: String(row.id),
        user_id: String(row.user_id),
        memberKind:
          row.member_kind === "human"
            ? ("human" as const)
            : row.member_kind === "computer"
              ? ("computer" as const)
              : ("bot" as const),
        deviceId: null,
      })),
    );
  }
  return { ok: false, code: "recipient_not_found" };
};
