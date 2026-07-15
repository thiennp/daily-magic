import { createHash, randomBytes } from "node:crypto";

export const hashAutomationWebhookSecret = (secret: string): string =>
  createHash("sha256").update(secret.trim()).digest("hex");

export const generateAutomationWebhookSecret = (): string =>
  randomBytes(24).toString("base64url");

export const readAutomationWebhookSecretPrefix = (secret: string): string =>
  secret.slice(0, 8);

export const verifyAutomationWebhookSecret = (
  secret: string,
  expectedHash: string,
): boolean =>
  hashAutomationWebhookSecret(secret) === expectedHash.trim().toLowerCase();
