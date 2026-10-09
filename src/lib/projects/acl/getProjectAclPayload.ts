import { listProjectFolderRefs } from "@/lib/projects/acl/listProjectFolderRefs";
import {
  listProjectPeers,
  listProjectPeersForOwnerActor,
  type ProjectPeer,
  type ProjectPeerSelf,
} from "@/lib/projects/acl/messaging/listProjectPeers";
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
      readonly repoUrls: readonly string[];
      readonly defaultBranch: string | null;
      readonly scopes: readonly ProjectAclScope[];
      readonly relation: "owner" | "member";
      readonly self: ProjectPeerSelf;
      readonly peers: readonly ProjectPeer[];
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

const summarizeFolderRef = (ref: ProjectFolderRefRecord) => ({
  id: ref.id,
  machineOrDeviceRef: ref.machineOrDeviceRef,
  folderPath: ref.folderPath,
});

/** name + folder refs + repo URLs + self scopes + peers — no content. */
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

  const roster = access.isOwner
    ? await listProjectPeersForOwnerActor({
        projectId: input.projectId,
        ownerUserId: input.actorUserId,
      })
    : await listProjectPeers({
        projectId: input.projectId,
        actorUserId: input.actorUserId,
      });
  if (!roster.ok) {
    return { ok: false, code: "forbidden" };
  }

  const folderRefs = await listProjectFolderRefs(input.projectId);
  return {
    ok: true,
    name: access.project.name,
    folderRefs: folderRefs.filter((ref) => ref.shared).map(summarizeFolderRef),
    repoUrls: access.project.repoUrls,
    defaultBranch: access.project.defaultBranch,
    scopes: access.scopes,
    relation: access.isOwner ? "owner" : "member",
    self: roster.self,
    peers: roster.peers,
  };
};
