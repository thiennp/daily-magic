export type ProjectGrokRoutineWebhookPublic = {
  readonly grokWebhookRegistered: true;
  readonly grokWebhookUrl: string;
};

/** Read shape: URL only. Never copy bearer_retained into API or briefing payloads. */
export const toPublicGrokRoutineWebhook = (
  row: Record<string, unknown>,
): ProjectGrokRoutineWebhookPublic | null => {
  const webhookUrl = row.webhook_url;
  if (typeof webhookUrl !== "string" || webhookUrl.length === 0) {
    return null;
  }
  return {
    grokWebhookRegistered: true,
    grokWebhookUrl: webhookUrl,
  };
};
