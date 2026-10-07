import { isProjectMessageWakeSkippedByPolicy } from "@/lib/projects/acl/messaging/isProjectMessageWakeSkippedByPolicy";
import { GROK_WAKE_RESULT_SKIPPED_BY_POLICY } from "@/lib/projects/acl/messaging/storedGrokWakeResult.constant";
import { persistProjectGrokRoutineWakeAttempt } from "@/lib/projects/acl/webhooks/persistProjectGrokRoutineWakeAttempt";
import {
  wakeProjectGrokRoutineWebhooks,
  type ProjectGrokRoutineWakeResult,
} from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

export type WakeProjectMessageGrokRoutinesInput = {
  readonly projectId: string;
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly senderMembershipId: string | null;
  readonly senderProjectDisplayName?: string | null;
  readonly recipientMembershipIds: readonly string[];
};

const wakeSenderDisplayName = (
  input: WakeProjectMessageGrokRoutinesInput,
): string | null => {
  if (input.senderMembershipId !== null) {
    return input.senderProjectDisplayName ?? null;
  }
  return input.senderProjectDisplayName
    ? input.senderProjectDisplayName
    : "Owner";
};

/** Status kinds: no POST; store skipped_by_policy per recipient (DF-019/022). */
const skipWakeByPolicy = async (
  input: WakeProjectMessageGrokRoutinesInput,
): Promise<readonly ProjectGrokRoutineWakeResult[]> => {
  const membershipIds = [...new Set(input.recipientMembershipIds)];
  const results: ProjectGrokRoutineWakeResult[] = [];
  for (const membershipId of membershipIds) {
    await persistProjectGrokRoutineWakeAttempt({
      messageId: input.messageId,
      membershipId,
      result: GROK_WAKE_RESULT_SKIPPED_BY_POLICY,
    });
    results.push({ membershipId, result: GROK_WAKE_RESULT_SKIPPED_BY_POLICY });
  }
  return results;
};

/**
 * Grok routine wake step for a stored project message.
 * Await it after the message and delivery rows exist.
 * Pure status kinds never wake the recipient bot (skipped_by_policy).
 * Never throws: a failed wake is logged and yields no results.
 */
export const wakeProjectMessageGrokRoutines = async (
  input: WakeProjectMessageGrokRoutinesInput,
): Promise<readonly ProjectGrokRoutineWakeResult[]> => {
  try {
    if (isProjectMessageWakeSkippedByPolicy(input.kind)) {
      return await skipWakeByPolicy(input);
    }
    return await wakeProjectGrokRoutineWebhooks({
      projectId: input.projectId,
      messageId: input.messageId,
      summary: input.summary,
      fromMembershipId: input.senderMembershipId,
      fromProjectDisplayName: wakeSenderDisplayName(input),
      recipientMembershipIds: input.recipientMembershipIds,
    });
  } catch (error: unknown) {
    console.error("project grok routine webhook wake failed", {
      messageId: input.messageId,
      error: error instanceof Error ? error.message : "wake_failed",
    });
    return [];
  }
};
