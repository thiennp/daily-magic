import { createHash, createHmac, randomBytes } from "node:crypto";

export const PROJECT_WEBHOOK_SECRET_PREFIX = "awc_whsec_";

export const createProjectWebhookSecret = (): string =>
  `${PROJECT_WEBHOOK_SECRET_PREFIX}${randomBytes(24).toString("base64url")}`;

export const hashProjectWebhookSecret = (secret: string): string =>
  createHash("sha256").update(secret).digest("hex");

/** Sign timestamp.messageId.body (A3.2). */
export const signProjectWebhookBody = (input: {
  readonly secret: string;
  readonly timestamp: string;
  readonly messageId: string;
  readonly body: string;
}): string =>
  createHmac("sha256", input.secret)
    .update(`${input.timestamp}.${input.messageId}.${input.body}`)
    .digest("hex");

export const isProjectWebhookTimestampFresh = (
  timestampSec: number,
  nowMs: number = Date.now(),
): boolean => Math.abs(nowMs / 1000 - timestampSec) <= 300;
