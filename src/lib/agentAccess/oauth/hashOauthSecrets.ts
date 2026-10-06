import { createHash, randomBytes } from "node:crypto";

export const hashOauthSecret = (value: string): string =>
  createHash("sha256").update(value.trim()).digest("hex");

export const createOauthClientId = (): string =>
  `awc_oid_${randomBytes(16).toString("base64url")}`;

export const createOauthClientSecret = (): string =>
  `awc_os_${randomBytes(24).toString("base64url")}`;

export const createOauthAuthorizationCode = (): string =>
  `awc_ac_${randomBytes(24).toString("base64url")}`;

export const createOauthPendingId = (): string =>
  randomBytes(24).toString("base64url");
