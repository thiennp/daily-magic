import {
  fetchProjectAccess,
  fetchProjectFolderRefs,
  fetchProjectInvites,
  type AccessMembershipView,
  type AccessPendingView,
  type InviteListItem,
} from "@/features/projects/access/utils/projectAccessApi";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export type AwcProjectAccessMember = AccessMembershipView;
export type AwcProjectAccessPending = AccessPendingView;
export type AwcProjectAccessInvite = InviteListItem;

export type AwcProjectAccessFolderRef = {
  readonly id: string;
  readonly machineOrDeviceRef: string;
  readonly folderPath: string;
};

export type AwcProjectAccessSnapshot =
  | {
      readonly ok: true;
      readonly members: readonly AwcProjectAccessMember[];
      readonly pending: readonly AwcProjectAccessPending[];
      readonly folderRefs: readonly AwcProjectAccessFolderRef[];
      readonly invites: readonly AwcProjectAccessInvite[];
      readonly projectName: string | null;
    }
  | {
      readonly ok: false;
      readonly errorMessage: string;
      readonly members: readonly [];
      readonly pending: readonly [];
      readonly folderRefs: readonly [];
      readonly invites: readonly [];
      readonly projectName: null;
    };

export const loadAwcProjectAccess = async (
  projectId: string,
): Promise<AwcProjectAccessSnapshot> => {
  const [access, folders, invites] = await Promise.all([
    fetchProjectAccess(projectId),
    fetchProjectFolderRefs(projectId),
    fetchProjectInvites(projectId),
  ]);

  if (!access.ok) {
    return {
      ok: false,
      errorMessage: mapProjectAccessError(
        access.errorMessage,
        "Could not load Project Access.",
      ),
      members: [],
      pending: [],
      folderRefs: [],
      invites: [],
      projectName: null,
    };
  }

  const projectName =
    access.project &&
    typeof access.project === "object" &&
    typeof (access.project as { name?: unknown }).name === "string"
      ? (access.project as { name: string }).name
      : null;

  return {
    ok: true,
    members: access.members ?? [],
    pending: access.pendingRequests ?? [],
    folderRefs: folders.ok ? (folders.folderRefs ?? []) : [],
    invites: invites.invites ?? [],
    projectName,
  };
};
