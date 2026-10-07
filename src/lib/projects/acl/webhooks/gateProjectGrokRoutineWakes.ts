import { loadCoalescedProjectWakeMembershipIds } from "@/lib/projects/acl/webhooks/loadCoalescedProjectWakeMembershipIds";
import { loadRateLimitedProjectWakeMembershipIds } from "@/lib/projects/acl/webhooks/loadRateLimitedProjectWakeMembershipIds";
import {
  PROJECT_WAKE_RESULT_COALESCED,
  PROJECT_WAKE_RESULT_DEFERRED_429,
} from "@/lib/projects/acl/webhooks/projectWakeThrottle.constant";

/**
 * DF-026 gate before any Grok wake POST. Returns the skip result per postable
 * recipient that must NOT be POSTed now: deferred_429 (Retry-After active) or
 * coalesced (an earlier wake already covers this batch). Others are absent.
 */
export const gateProjectGrokRoutineWakes = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly postableMembershipIds: readonly string[];
  readonly nowMs: number;
}): Promise<ReadonlyMap<string, string>> => {
  if (input.postableMembershipIds.length === 0) {
    return new Map();
  }
  const rateLimited = await loadRateLimitedProjectWakeMembershipIds({
    membershipIds: input.postableMembershipIds,
    nowMs: input.nowMs,
  });
  const coalesced = await loadCoalescedProjectWakeMembershipIds({
    projectId: input.projectId,
    messageId: input.messageId,
    membershipIds: input.postableMembershipIds.filter(
      (membershipId) => !rateLimited.has(membershipId),
    ),
  });
  return new Map([
    ...[...rateLimited].map(
      (membershipId) =>
        [membershipId, PROJECT_WAKE_RESULT_DEFERRED_429] as const,
    ),
    ...[...coalesced].map(
      (membershipId) => [membershipId, PROJECT_WAKE_RESULT_COALESCED] as const,
    ),
  ]);
};
