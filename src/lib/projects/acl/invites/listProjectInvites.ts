import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import { selectUsableProjectInviteRows } from "@/lib/projects/acl/invites/selectUsableProjectInviteRows";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import { authorizeProjectInviter } from "@/lib/projects/acl/authorizeProjectInviter";

export type ListProjectInvitesResult =
  | { readonly ok: true; readonly invites: readonly ProjectInviteRecord[] }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/** Owner: every usable invite. A member: only the assistant invites they created. */
export const listProjectInvites = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
}): Promise<ListProjectInvitesResult> => {
  const access = await authorizeProjectInviter({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
  });
  if (!access.allow) {
    return { ok: false, code: access.reason };
  }
  await ensureProjectAclSchema();
  const rows = await selectUsableProjectInviteRows(
    input.projectId,
    access.owner ? null : input.ownerUserId,
  );
  return { ok: true, invites: rows.map((row) => mapProjectInviteRow(row)) };
};
