import { authorizeProjectOwnerMember } from "@/lib/projects/acl/authorizeProjectOwnerMember";
import {
  writeProjectGrokRoutineWebhook,
  type WriteProjectGrokRoutineWebhookResult,
} from "@/lib/projects/acl/webhooks/writeProjectGrokRoutineWebhook";

export type SaveProjectMemberGrokRoutineWebhookAsOwnerResult =
  | WriteProjectGrokRoutineWebhookResult
  | { readonly ok: false; readonly code: "not_found" };

/** Owner path: store a member bot's Grok routine webhook from the secret form. */
export const saveProjectMemberGrokRoutineWebhookAsOwner = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly actorUserId: string;
  readonly grokWebhookUrl: unknown;
  readonly grokWebhookBearer: unknown;
}): Promise<SaveProjectMemberGrokRoutineWebhookAsOwnerResult> => {
  const auth = await authorizeProjectOwnerMember({
    projectId: input.projectId,
    membershipId: input.membershipId,
    actorUserId: input.actorUserId,
  });
  if (!auth.ok) {
    return auth;
  }
  return writeProjectGrokRoutineWebhook({
    projectId: input.projectId,
    membership: auth.membership,
    grokWebhookUrl: input.grokWebhookUrl,
    grokWebhookBearer: input.grokWebhookBearer,
  });
};
