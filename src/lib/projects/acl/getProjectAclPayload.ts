import { listProjectFolderRefs } from "@/lib/projects/acl/listProjectFolderRefs";
import { resolveProjectAclAccess } from "@/lib/projects/acl/resolveProjectAclAccess";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectFolderRefRecord from "@/lib/projects/acl/types/ProjectFolderRefRecord.type";

export type GetProjectAclPayloadResult =
  | {
      readonly ok: true;
      readonly name: string;
      readonly folderRefs: readonly {
        readonly id: string;
        readonly machineOrDeviceRef: string;
        readonly folderPath: string;
      }[];
      readonly scopes: readonly ProjectAclScope[];
      readonly relation: "owner" | "member";
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

const summarizeFolderRef = (ref: ProjectFolderRefRecord) => ({
  id: ref.id,
  machineOrDeviceRef: ref.machineOrDeviceRef,
  folderPath: ref.folderPath,
});

/** name + folder refs + self scopes only — no content. */
export const getProjectAclPayload = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<GetProjectAclPayloadResult> => {
  const access = await resolveProjectAclAccess({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    requiredScopes: ["project:meta"],
  });
  if (!access.ok) {
    return {
      ok: false,
      code: access.reason === "not_found" ? "not_found" : "forbidden",
    };
  }

  const folderRefs = await listProjectFolderRefs(input.projectId);
  return {
    ok: true,
    name: access.project.name,
    folderRefs: folderRefs.map(summarizeFolderRef),
    scopes: access.scopes,
    relation: access.isOwner ? "owner" : "member",
  };
};
