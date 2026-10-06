import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectMembershipDeliveryModeSchema } from "@/lib/projects/acl/ensureProjectMembershipDeliveryModeSchema";
import { isProjectMembershipPollDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";

/**
 * Recipients in delivery_mode=poll (Checks on demand): no wake fan-out.
 * Fails open to an empty set (= webhook, today's default) so a read error
 * never drops a wake for a webhook member.
 */
export const loadProjectPollDeliveryMembershipIds = async (input: {
  readonly projectId: string;
  readonly membershipIds: readonly string[];
}): Promise<ReadonlySet<string>> => {
  if (input.membershipIds.length === 0) {
    return new Set();
  }
  try {
    await ensureProjectMembershipDeliveryModeSchema();
    const rows = asRowArray(
      await getSql()`
        SELECT id, delivery_mode
        FROM project_memberships
        WHERE project_id = ${input.projectId}::text
          AND id = ANY(${[...input.membershipIds]}::text[])
      `,
    );
    return new Set(
      rows.flatMap((row) =>
        isProjectMembershipPollDeliveryMode(row.delivery_mode)
          ? [String(row.id)]
          : [],
      ),
    );
  } catch (error: unknown) {
    console.error("delivery_mode read failed; waking all recipients", {
      error: error instanceof Error ? error.message : "read_failed",
    });
    return new Set();
  }
};

/** Recipients that still get Grok / HMAC wake POSTs (poll members removed). */
export const filterProjectWakeRecipientIds = async (input: {
  readonly projectId: string;
  readonly membershipIds: readonly string[];
}): Promise<readonly string[]> => {
  const poll = await loadProjectPollDeliveryMembershipIds(input);
  return input.membershipIds.filter((id) => !poll.has(id));
};
