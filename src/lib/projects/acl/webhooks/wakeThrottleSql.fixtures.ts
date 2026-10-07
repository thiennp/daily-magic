import { wakeProjectGrokRoutineWebhooks } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

/** Test-only fake DB for the DF-026 wake gate (coalesce + stored 429). */
const hookRow = (membershipId: string) => ({
  membership_id: membershipId,
  webhook_url: `https://example.com/wake/${membershipId}`,
  bearer_retained: "sekret-bearer",
});

/** An accepted, not-yet-read wake for a membership coalesces later rows. */
export const fakeWakeThrottleDb =
  (state: {
    readonly hooks: readonly string[];
    readonly woken: Set<string>;
    readonly rateLimitedStored?: readonly string[];
  }) =>
  async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const q = strings.join("?");
    if (q.includes("FROM project_membership_grok_routine_webhooks")) {
      return state.hooks.map(hookRow);
    }
    if (q.includes("AS rate_limited_membership_id")) {
      return (state.rateLimitedStored ?? []).map((id) => ({
        rate_limited_membership_id: id,
        latest_post_result: "http_429",
      }));
    }
    if (q.includes("AS coalesced_membership_id")) {
      return [...state.woken].map((id) => ({ coalesced_membership_id: id }));
    }
    if (q.includes("INSERT INTO project_grok_routine_wake_attempts")) {
      const [, , membershipId, result] = values as string[];
      if (/^http_2\d\d$/.test(result)) {
        state.woken.add(membershipId);
      }
    }
    return [];
  };

export const wakeForThrottleTest = (
  messageId: string,
  recipientMembershipIds: readonly string[],
) =>
  wakeProjectGrokRoutineWebhooks({
    projectId: "proj-1",
    messageId,
    summary: "hello",
    fromMembershipId: "mem-s",
    fromProjectDisplayName: "Probe",
    recipientMembershipIds,
  });

export const storedWakeResults = (
  calls: readonly (readonly unknown[])[],
): unknown[] =>
  calls
    .filter((call) =>
      String(call[0]).includes(
        "INSERT INTO project_grok_routine_wake_attempts",
      ),
    )
    .map((call) => call[4]);
