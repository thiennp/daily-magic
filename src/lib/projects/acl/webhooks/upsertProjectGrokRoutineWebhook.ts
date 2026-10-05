import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import {
  writeProjectGrokRoutineWebhook,
  type WriteProjectGrokRoutineWebhookResult,
} from "@/lib/projects/acl/webhooks/writeProjectGrokRoutineWebhook";

export type UpsertProjectGrokRoutineWebhookResult =
  WriteProjectGrokRoutineWebhookResult;

/** Agent path: store the caller's own membership Grok routine webhook. */
export const upsertProjectGrokRoutineWebhook = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly grokWebhookUrl: unknown;
  readonly grokWebhookBearer: unknown;
}): Promise<UpsertProjectGrokRoutineWebhookResult> => {
  const hasBearer =
    typeof input.grokWebhookBearer === "string" &&
    input.grokWebhookBearer.trim().length > 0;
  const membership = hasBearer
    ? await getActiveProjectMembership(input.projectId, input.actorUserId)
    : null;
  return writeProjectGrokRoutineWebhook({
    projectId: input.projectId,
    membership,
    grokWebhookUrl: input.grokWebhookUrl,
    grokWebhookBearer: input.grokWebhookBearer,
  });
};
