import type {
  AwcMembershipView,
  AwcPendingRequestView,
} from "@/features/projects/access/types/awcProjectAccessContract.type";
import {
  fetchProjectAccess,
  fetchProjectFolderRefs,
} from "@/features/projects/access/utils/projectAccessApi";

export type AwcProjectAccessMember = AwcMembershipView;
export type AwcProjectAccessPending = AwcPendingRequestView;

export type AwcProjectAccessFolderRef = {
  readonly id: string;
  readonly machineOrDeviceRef: string;
  readonly folderPath: string;
};

export type AwcProjectAccessSnapshot = {
  readonly members: readonly AwcProjectAccessMember[];
  readonly pending: readonly AwcProjectAccessPending[];
  readonly folderRefs: readonly AwcProjectAccessFolderRef[];
};

export const loadAwcProjectAccess = async (
  projectId: string,
): Promise<AwcProjectAccessSnapshot> => {
  const [access, folders] = await Promise.all([
    fetchProjectAccess(projectId),
    fetchProjectFolderRefs(projectId),
  ]);

  return {
    members: access.ok ? access.members : [],
    pending: access.ok ? access.pendingRequests : [],
    folderRefs: folders.ok ? (folders.folderRefs ?? []) : [],
  };
};
