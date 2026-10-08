import { createHmac, timingSafeEqual } from "node:crypto";

export const LINEAR_WEBHOOK_MAX_AGE_MS = 60_000;

export type LinearWebhookVerdict =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "bad_signature" | "stale" };

const readTimestamp = (rawBody: string): number => {
  try {
    const parsed: unknown = JSON.parse(rawBody);
    return parsed !== null && typeof parsed === "object"
      ? Number((parsed as { webhookTimestamp?: unknown }).webhookTimestamp)
      : Number.NaN;
  } catch {
    return Number.NaN;
  }
};

/**
 * Linear-Signature = hex HMAC-SHA256(raw body, secret). Constant-time compare;
 * webhookTimestamp (ms) more than 60 s from now → stale.
 */
export const verifyLinearWebhook = (input: {
  readonly rawBody: string;
  readonly signature: string | null;
  readonly secret: string;
  readonly now?: number;
}): LinearWebhookVerdict => {
  const expected = createHmac("sha256", input.secret)
    .update(input.rawBody)
    .digest();
  const given = Buffer.from(input.signature ?? "", "hex");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return { ok: false, code: "bad_signature" };
  }
  const age = Math.abs(
    (input.now ?? Date.now()) - readTimestamp(input.rawBody),
  );
  return age <= LINEAR_WEBHOOK_MAX_AGE_MS
    ? { ok: true }
    : { ok: false, code: "stale" };
};
