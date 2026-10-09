import { authorizeProjectInviter } from "@/lib/projects/acl/authorizeProjectInviter";
import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import { selectAwaitingApprovalHumanInviteRows } from "@/lib/projects/acl/humanInvites/selectAwaitingApprovalHumanInviteRows";
import { selectUsableHumanInviteRows } from "@/lib/projects/acl/humanInvites/selectUsableHumanInviteRows";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";

export type ListHumanInvitesResult =
  | { readonly ok: true; readonly invites: readonly HumanInviteRecord[] }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/** Owner: all invites. Member: only the invites they created. */
export const listHumanProjectInvites = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
}): Promise<ListHumanInvitesResult> => {
  const access = await authorizeProjectInviter({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
  });
  if (!access.allow) {
    return { ok: false, code: access.reason };
  }
  await ensureProjectAclSchema();
  // A member sees only the invites they created (and their invitees' emails), not the owner's.
  const createdBy = access.owner ? null : input.ownerUserId;
  // 108: "Wants to join" (status accepted) first, then unused pending invites.
  const [awaiting, rows] = await Promise.all([
    selectAwaitingApprovalHumanInviteRows(input.projectId, createdBy),
    selectUsableHumanInviteRows(input.projectId, createdBy),
  ]);
  return {
    ok: true,
    invites: [...awaiting, ...rows].map((row) => mapHumanInviteRow(row)),
  };
};
