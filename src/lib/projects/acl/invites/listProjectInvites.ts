import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import { selectUsableProjectInviteRows } from "@/lib/projects/acl/invites/selectUsableProjectInviteRows";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type ListProjectInvitesResult =
  | { readonly ok: true; readonly invites: readonly ProjectInviteRecord[] }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/** Owner-only invite list orchestrator: auth, then the usable-invite SELECT. */
export const listProjectInvites = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
}): Promise<ListProjectInvitesResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }
  await ensureProjectAclSchema();
  const rows = await selectUsableProjectInviteRows(input.projectId);
  return { ok: true, invites: rows.map((row) => mapProjectInviteRow(row)) };
};
