import { asRowArray, getSql } from "@/lib/db";
import {
  buildProjectGrokRoutineWakeBody,
  PROJECT_GROK_ROUTINE_WAKE_EVENT,
} from "@/lib/projects/acl/webhooks/buildProjectGrokRoutineWakeBody";
import { gateProjectGrokRoutineWakes } from "@/lib/projects/acl/webhooks/gateProjectGrokRoutineWakes";
import { loadProjectGrokWakeProjectName } from "@/lib/projects/acl/webhooks/loadProjectGrokWakeProjectName";
import { persistProjectGrokRoutineWakeAttempt } from "@/lib/projects/acl/webhooks/persistProjectGrokRoutineWakeAttempt";
import {
  isPostableGrokRoutineWebhook,
  wakeProjectGrokRoutineRecipient,
} from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineRecipient";
import { PROJECT_WAKE_GATED_RESULTS } from "@/lib/projects/acl/webhooks/projectWakeThrottle.constant";

export { PROJECT_GROK_ROUTINE_WAKE_EVENT };

/** Memberships whose stored Grok webhook can be POSTed. Does not read HMAC rows. */
export const loadPostableGrokRoutineWebhookMembershipIds = async (input: {
  readonly projectId: string;
  readonly membershipIds: readonly string[];
}): Promise<ReadonlySet<string>> => {
  if (input.membershipIds.length === 0) {
    return new Set();
  }
  const membershipIds = [...input.membershipIds];
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT membership_id, webhook_url, bearer_retained
      FROM project_membership_grok_routine_webhooks
      WHERE project_id = ${input.projectId}
        AND membership_id = ANY(${membershipIds}::text[])
    `,
  );
  return new Set(
    rows.flatMap((row) =>
      isPostableGrokRoutineWebhook(row) ? [String(row.membership_id)] : [],
    ),
  );
};

export type ProjectGrokRoutineWakeResult = {
  readonly membershipId: string;
  readonly result: string;
};

/**
 * POST each addressed recipient and persist the short result.
 * Returns one result per recipient. Callers must await this.
 * DF-026: at most one wake per recipient per batch (coalesced) and no POST
 * while a 429 Retry-After is active (deferred_429). Those two results are
 * returned but not stored, so they never read as bot health or a wake row.
 * A missed POST must not fail dispatch.
 * Wake body is scoped to THIS project only (id, name, triggering message).
 */
export const wakeProjectGrokRoutineWebhooks = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly summary: string;
  readonly fromMembershipId: string | null;
  readonly fromProjectDisplayName: string | null;
  readonly recipientMembershipIds: readonly string[];
}): Promise<readonly ProjectGrokRoutineWakeResult[]> => {
  if (input.recipientMembershipIds.length === 0) {
    return [];
  }
  const membershipIds = [...new Set(input.recipientMembershipIds)];
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT membership_id, webhook_url, bearer_retained
      FROM project_membership_grok_routine_webhooks
      WHERE project_id = ${input.projectId}
        AND membership_id = ANY(${membershipIds}::text[])
    `,
  );
  const byMembership = new Map(
    rows.map((row) => [String(row.membership_id), row]),
  );
  const projectName = await loadProjectGrokWakeProjectName(input.projectId);
  const body = buildProjectGrokRoutineWakeBody({
    projectId: input.projectId,
    projectName,
    messageId: input.messageId,
    summary: input.summary,
    fromMembershipId: input.fromMembershipId,
    fromProjectDisplayName: input.fromProjectDisplayName,
  });
  const gated = await gateProjectGrokRoutineWakes({
    projectId: input.projectId,
    messageId: input.messageId,
    postableMembershipIds: membershipIds.filter((membershipId) =>
      isPostableGrokRoutineWebhook(byMembership.get(membershipId)),
    ),
    nowMs: Date.now(),
  });
  const wakeResults: ProjectGrokRoutineWakeResult[] = [];
  for (const membershipId of membershipIds) {
    const result = await wakeProjectGrokRoutineRecipient({
      membershipId,
      row: byMembership.get(membershipId),
      gatedResult: gated.get(membershipId),
      body,
    });
    wakeResults.push({ membershipId, result });
    if (PROJECT_WAKE_GATED_RESULTS.has(result)) {
      continue;
    }
    await persistProjectGrokRoutineWakeAttempt({
      messageId: input.messageId,
      membershipId,
      result,
    });
  }
  return wakeResults;
};
