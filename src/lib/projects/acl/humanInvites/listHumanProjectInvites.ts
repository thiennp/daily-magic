import { authorizeProjectInviter } from "@/lib/projects/acl/authorizeProjectInviter";
import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import { selectAwaitingApprovalHumanInviteRows } from "@/lib/projects/acl/humanInvites/selectAwaitingApprovalHumanInviteRows";
import { selectUsableHumanInviteRows } from "@/lib/projects/acl/humanInvites/selectUsableHumanInviteRows";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";

export type ListHumanInvitesResult =
  | { readonly ok: true; readonly invites: readonly HumanInviteRecord[] }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/** Owner or member list: auth via authorizeProjectInviter, then usable SELECT. */
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
  // 108: "Wants to join" (status accepted) first, then unused pending invites.
  const [awaiting, rows] = await Promise.all([
    selectAwaitingApprovalHumanInviteRows(input.projectId),
    selectUsableHumanInviteRows(input.projectId),
  ]);
  return {
    ok: true,
    invites: [...awaiting, ...rows].map((row) => mapHumanInviteRow(row)),
  };
};
