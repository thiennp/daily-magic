import {
  fetchProjectAccess,
  fetchProjectFolderRefs,
  fetchProjectInvites,
  type AccessMembershipView,
  type AccessPendingView,
  type InviteListItem,
} from "@/features/projects/access/utils/projectAccessApi";

export type AwcProjectAccessMember = AccessMembershipView;
export type AwcProjectAccessPending = AccessPendingView;
export type AwcProjectAccessInvite = InviteListItem;

export type AwcProjectAccessFolderRef = {
  readonly id: string;
  readonly machineOrDeviceRef: string;
  readonly folderPath: string;
};

export type AwcProjectAccessSnapshot = {
  readonly members: readonly AwcProjectAccessMember[];
  readonly pending: readonly AwcProjectAccessPending[];
  readonly folderRefs: readonly AwcProjectAccessFolderRef[];
  readonly invites: readonly AwcProjectAccessInvite[];
};

export const loadAwcProjectAccess = async (
  projectId: string,
): Promise<AwcProjectAccessSnapshot> => {
  const [access, folders, invites] = await Promise.all([
    fetchProjectAccess(projectId),
    fetchProjectFolderRefs(projectId),
    fetchProjectInvites(projectId),
  ]);

  return {
    members: access.ok ? (access.members ?? []) : [],
    pending: access.ok ? (access.pendingRequests ?? []) : [],
    folderRefs: folders.ok ? (folders.folderRefs ?? []) : [],
    invites: invites.invites ?? [],
  };
};
