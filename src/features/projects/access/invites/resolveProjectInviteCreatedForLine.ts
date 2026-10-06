import { AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY as C } from "@/features/projects/access/invites/awcProjectInviteAddAssistantCopy.constant";
import { awcProjectInviteTypeLabel } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import { AWC_PROJECT_INVITE_PLATFORM_COPY } from "@/features/projects/access/invites/awcProjectInvitePlatformCopy.constant";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";

/** Created-banner line: picked type, or "any assistant" when none was picked. */
export const resolveProjectInviteCreatedForLine = (input: {
  readonly platform: ProjectInvitePlatform;
  /** undefined = legacy caller (platform only); null = no type picked. */
  readonly joinTypeId?: string | null;
}): string => {
  if (input.joinTypeId === undefined) {
    return AWC_PROJECT_INVITE_PLATFORM_COPY[input.platform].createdFor;
  }
  if (input.joinTypeId === "grok-bot") {
    return AWC_PROJECT_INVITE_PLATFORM_COPY.grok.createdFor;
  }
  const label = awcProjectInviteTypeLabel(input.joinTypeId);
  return label === null ? C.createdForAny : C.createdForType(label);
};
