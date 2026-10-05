import { asRowArray, getSql } from "@/lib/db";
import type { DispatchRecipient } from "@/lib/projects/acl/messaging/lookupDispatchMembershipRecipients";
import { loadComputerMembershipDeviceId } from "@/lib/projects/acl/messaging/loadComputerMembershipDeviceId";
import { parseDispatchMemberKind } from "@/lib/projects/acl/messaging/parseDispatchMemberKind";

export const resolveMembershipIdDispatchRecipient = async (input: {
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
  const memberKind = parseDispatchMemberKind(row.member_kind);
  const id = String(row.id);
  const userId = String(row.user_id);
  if (memberKind !== "computer") {
    return {
      ok: true,
      recipients: [{ id, user_id: userId, memberKind, deviceId: null }],
    };
  }
  const deviceId = await loadComputerMembershipDeviceId(id);
  if (deviceId === null) {
    return { ok: false, code: "recipient_not_found" };
  }
  return {
    ok: true,
    recipients: [{ id, user_id: userId, memberKind: "computer", deviceId }],
  };
};
