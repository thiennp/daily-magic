import {
  isProjectMessageAssignerOnlyWakeKind,
  isProjectMessageWakeSkippedByPolicy,
} from "@/lib/projects/acl/messaging/isProjectMessageWakeSkippedByPolicy";
import { loadProjectMessageAssignerMembershipId } from "@/lib/projects/acl/messaging/loadProjectMessageAssignerMembershipId";
import { GROK_WAKE_RESULT_SKIPPED_BY_POLICY } from "@/lib/projects/acl/messaging/storedGrokWakeResult.constant";
import { persistProjectGrokRoutineWakeAttempt } from "@/lib/projects/acl/webhooks/persistProjectGrokRoutineWakeAttempt";
import type { ProjectGrokRoutineWakeResult } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

export type ProjectMessageWakePolicyInput = {
  readonly projectId: string;
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly recipientMembershipIds: readonly string[];
};

export type ProjectMessageWakeRecipientSplit = {
  readonly wakeMembershipIds: readonly string[];
  readonly skippedMembershipIds: readonly string[];
};

/**
 * Who may be woken for this message (DF-022 / DF-026):
 * - normal kinds: every recipient (unchanged, duplicates left to the wake step);
 * - received / processing / status / ack events: nobody;
 * - done / blocked: only the assigner bot, if it is a recipient. Assigner not
 *   resolvable → nobody (no fallback to a directly-addressed bot).
 */
export const resolveProjectMessageWakeRecipients = async (
  input: ProjectMessageWakePolicyInput,
): Promise<ProjectMessageWakeRecipientSplit> => {
  if (!isProjectMessageWakeSkippedByPolicy(input.kind)) {
    return {
      wakeMembershipIds: input.recipientMembershipIds,
      skippedMembershipIds: [],
    };
  }
  const unique = [...new Set(input.recipientMembershipIds)];
  const assigner = isProjectMessageAssignerOnlyWakeKind(input.kind)
    ? await loadProjectMessageAssignerMembershipId(input)
    : null;
  if (assigner === null || !unique.includes(assigner)) {
    return { wakeMembershipIds: [], skippedMembershipIds: unique };
  }
  return {
    wakeMembershipIds: [assigner],
    skippedMembershipIds: unique.filter((id) => id !== assigner),
  };
};

/**
 * Apply the policy: store skipped_by_policy per skipped recipient (no POST),
 * then hand the remaining recipients (if any) to the wake step.
 */
export const applyProjectMessageWakePolicy = async (
  input: ProjectMessageWakePolicyInput,
  wake: (
    recipientMembershipIds: readonly string[],
  ) => Promise<readonly ProjectGrokRoutineWakeResult[]>,
): Promise<readonly ProjectGrokRoutineWakeResult[]> => {
  const split = await resolveProjectMessageWakeRecipients(input);
  const results: ProjectGrokRoutineWakeResult[] = [];
  for (const membershipId of split.skippedMembershipIds) {
    await persistProjectGrokRoutineWakeAttempt({
      messageId: input.messageId,
      membershipId,
      result: GROK_WAKE_RESULT_SKIPPED_BY_POLICY,
    });
    results.push({ membershipId, result: GROK_WAKE_RESULT_SKIPPED_BY_POLICY });
  }
  if (split.wakeMembershipIds.length === 0) {
    return results;
  }
  return [...results, ...(await wake(split.wakeMembershipIds))];
};
