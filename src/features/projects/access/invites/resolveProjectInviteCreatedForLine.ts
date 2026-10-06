import { AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY as C } from "@/features/projects/access/invites/awcProjectInviteAddAssistantCopy.constant";
import {
  awcProjectInviteTypeLabel,
  joinTypeIdForInvitePlatform,
} from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import { AWC_PROJECT_INVITE_PLATFORM_COPY } from "@/features/projects/access/invites/awcProjectInvitePlatformCopy.constant";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";

/** Created-banner line: the picked type, or "any assistant" when none was picked. */
export const resolveProjectInviteCreatedForLine = (input: {
  readonly platform: ProjectInvitePlatform | null;
  /** Picked types[] id; null = no type; undefined = derive it from platform. */
  readonly joinTypeId?: string | null;
}): string => {
  const joinTypeId =
    input.joinTypeId === undefined
      ? joinTypeIdForInvitePlatform(input.platform)
      : input.joinTypeId;
  if (joinTypeId === "grok-bot") {
    return AWC_PROJECT_INVITE_PLATFORM_COPY.grok.createdFor;
  }
  const label = awcProjectInviteTypeLabel(joinTypeId);
  return label === null ? C.createdForAny : C.createdForType(label);
};
