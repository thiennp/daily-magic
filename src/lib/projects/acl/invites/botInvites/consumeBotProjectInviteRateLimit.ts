import { createHash } from "node:crypto";

import {
  countAgentAccessBucketAttempts,
  recordAgentAccessBucketAttempt,
} from "@/lib/agentAccess/consumeAgentAccessBucket";
import { readAgentAccessBucketRetryAfterSeconds } from "@/lib/agentAccess/readAgentAccessBucketRetryAfterSeconds";
import {
  BOT_PROJECT_INVITE_PER_INVITER_PER_HOUR,
  BOT_PROJECT_INVITE_PER_PROJECT_PER_HOUR,
  BOT_PROJECT_INVITE_RATE_BUCKET,
} from "@/lib/projects/acl/invites/botInvites/botProjectInvite.constants";
import type { BotProjectInviteRateLimitScope } from "@/lib/projects/acl/invites/botInvites/botProjectInviteResult.type";

export type BotProjectInviteRateLimitResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly scope: BotProjectInviteRateLimitScope;
      readonly retryAfterSeconds: number;
    };

const subjectHashOf = (kind: string, id: string): string =>
  createHash("sha256").update(`bot-project-invite:${kind}:${id}`).digest("hex");

/**
 * Per inviting membership AND per project, rolling 1 h (shared agent-access
 * bucket table). Both are checked before either is recorded.
 */
export const consumeBotProjectInviteRateLimit = async (input: {
  readonly inviterMembershipId: string;
  readonly projectId: string;
}): Promise<BotProjectInviteRateLimitResult> => {
  const bucket = BOT_PROJECT_INVITE_RATE_BUCKET;
  const checks = [
    {
      scope: "inviter" as const,
      subjectHash: subjectHashOf("membership", input.inviterMembershipId),
      limit: BOT_PROJECT_INVITE_PER_INVITER_PER_HOUR,
    },
    {
      scope: "project" as const,
      subjectHash: subjectHashOf("project", input.projectId),
      limit: BOT_PROJECT_INVITE_PER_PROJECT_PER_HOUR,
    },
  ];
  const counts = await Promise.all(
    checks.map((check) =>
      countAgentAccessBucketAttempts({ subjectHash: check.subjectHash, bucket }),
    ),
  );
  const exceeded = checks.find((check, index) => counts[index] >= check.limit);
  if (exceeded !== undefined) {
    return {
      ok: false,
      scope: exceeded.scope,
      retryAfterSeconds: await readAgentAccessBucketRetryAfterSeconds({
        subjectHash: exceeded.subjectHash,
        bucket,
      }),
    };
  }
  await Promise.all(
    checks.map((check) =>
      recordAgentAccessBucketAttempt({ subjectHash: check.subjectHash, bucket }),
    ),
  );
  return { ok: true };
};
