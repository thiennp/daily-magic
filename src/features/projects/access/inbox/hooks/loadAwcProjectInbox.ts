import type AwcProjectInboxMessage from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";
import { fetchProjectInbox } from "@/features/projects/access/inbox/utils/fetchProjectInbox";
import { fetchProjectAccess } from "@/features/projects/access/utils/projectAccessApi";
import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

export type AwcProjectInboxSnapshot =
  | {
      readonly ok: true;
      readonly messages: readonly AwcProjectInboxMessage[];
      /** Filled only while the Archived filter is on. */
      readonly archivedMessages: readonly AwcProjectInboxMessage[];
      readonly archivedCount: number;
      readonly canRestore: boolean;
      readonly members: readonly AccessMembershipView[];
    }
  | {
      readonly ok: false;
      readonly unavailable: boolean;
      readonly forbidden: boolean;
      readonly errorMessage: string;
      readonly members: readonly AccessMembershipView[];
    };

export const loadAwcProjectInbox = async (
  projectId: string,
  showArchived: boolean = false,
): Promise<AwcProjectInboxSnapshot> => {
  const [inbox, access, archived] = await Promise.all([
    fetchProjectInbox({ projectId }),
    fetchProjectAccess(projectId),
    showArchived
      ? fetchProjectInbox({ projectId, archived: true })
      : Promise.resolve(null),
  ]);
  const members = access.ok ? (access.members ?? []) : [];

  if (inbox.ok) {
    return {
      ok: true,
      messages: inbox.messages,
      archivedMessages: archived?.ok ? archived.messages : [],
      archivedCount: inbox.archivedCount,
      canRestore: inbox.canRestore,
      members,
    };
  }

  return {
    ok: false,
    unavailable: inbox.unavailable,
    forbidden: inbox.forbidden,
    errorMessage: inbox.errorMessage,
    members,
  };
};
