export type GrokWebhookStatusView = {
  readonly grokWebhookRegistered: boolean;
  readonly grokWebhookUrlHost: string | null;
  readonly keySet: boolean;
};

const hostOf = (url: string): string | null => {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
};

/** The one display shape for a stored webhook: registered flag, host only, key set. Never the key. */
export const toGrokWebhookStatusView = (
  grokWebhookUrl: string | null,
): GrokWebhookStatusView => ({
  grokWebhookRegistered: grokWebhookUrl !== null,
  grokWebhookUrlHost: grokWebhookUrl === null ? null : hostOf(grokWebhookUrl),
  keySet: grokWebhookUrl !== null,
});
