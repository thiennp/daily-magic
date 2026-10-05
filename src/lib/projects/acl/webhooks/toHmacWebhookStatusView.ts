export type HmacWebhookStatusView = {
  readonly hmacWebhookRegistered: boolean;
  readonly hmacWebhookUrlHost: string | null;
  readonly secretSet: boolean;
};

const hostOf = (url: string): string | null => {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
};

/** Display shape for a stored HMAC webhook: registered flag, host only, secret set. Never the secret. */
export const toHmacWebhookStatusView = (input: {
  readonly hmacWebhookUrl: string | null;
  readonly secretSet: boolean;
}): HmacWebhookStatusView => ({
  hmacWebhookRegistered: input.hmacWebhookUrl !== null,
  hmacWebhookUrlHost:
    input.hmacWebhookUrl === null ? null : hostOf(input.hmacWebhookUrl),
  secretSet: input.hmacWebhookUrl !== null && input.secretSet,
});
