/** Test-only fixtures shared by the owner grok-webhook route GET tests. */
export const GROK_GET_WAKE_AT = "2026-10-07T21:15:00.000Z";

/** Status SELECT row for the member's stored Grok wake link + latest wake. */
export const grokGetStatusRow = (
  lastWakeResult: string | null,
  lastWakeAt: string | Date | null,
): Record<string, unknown> => ({
  webhook_url: "https://hooks.example.com/wake/abc",
  last_wake_result: lastWakeResult,
  last_wake_at: lastWakeAt,
});

/** The Grok status SELECT text the route issued, if any. */
export const grokGetStatusQuery = (
  calls: readonly (readonly unknown[])[],
): string | undefined =>
  calls
    .map((call) => String(call[0]))
    .find((q) =>
      q.includes("LEFT JOIN project_membership_grok_routine_webhooks"),
    );
