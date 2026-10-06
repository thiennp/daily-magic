import { createHash, randomBytes } from "node:crypto";

import { AGENT_ACCESS_TOKEN_PREFIX } from "@/lib/agentAccess/agentAccess.constant";
import {
  AGENT_ACCESS_REFRESH_TOKEN_PREFIX,
  DEVICE_USER_CODE_ALPHABET,
  DEVICE_USER_CODE_LENGTH,
} from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import { hashAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";

export const hashDeviceCode = (code: string): string =>
  createHash("sha256").update(code.trim()).digest("hex");

export const hashUserCode = (code: string): string =>
  createHash("sha256").update(normalizeUserCode(code)).digest("hex");

/** Strip display hyphen and uppercase for lookup. */
export const normalizeUserCode = (code: string): string =>
  code.trim().toUpperCase().replace(/[^A-Z]/g, "");

/** Format 8-char code as XXXX-XXXX for display. */
export const formatUserCodeDisplay = (rawEight: string): string => {
  const normalized = normalizeUserCode(rawEight);
  if (normalized.length !== DEVICE_USER_CODE_LENGTH) {
    return normalized;
  }
  return `${normalized.slice(0, 4)}-${normalized.slice(4)}`;
};

/** Opaque CSPRNG device_code (secret for poll). */
export const createDeviceCode = (): string =>
  `awc_dc_${randomBytes(24).toString("base64url")}`;

/** 8-char consonant-only user_code (human-enterable). */
export const createUserCode = (): string => {
  const alphabet = DEVICE_USER_CODE_ALPHABET;
  const bytes = randomBytes(DEVICE_USER_CODE_LENGTH);
  return Array.from({ length: DEVICE_USER_CODE_LENGTH }, (_, index) => {
    return alphabet[bytes[index]! % alphabet.length]!;
  }).join("");
};

export const createRefreshToken = (): string =>
  `${AGENT_ACCESS_REFRESH_TOKEN_PREFIX}${randomBytes(24).toString("base64url")}`;

export const hashRefreshToken = (token: string): string =>
  hashAgentAccessToken(token);

export const isAgentAccessRefreshToken = (token: string): boolean =>
  token.startsWith(AGENT_ACCESS_REFRESH_TOKEN_PREFIX) &&
  token.length > AGENT_ACCESS_REFRESH_TOKEN_PREFIX.length + 16;

export const isAgentAccessAccessToken = (token: string): boolean =>
  token.startsWith(AGENT_ACCESS_TOKEN_PREFIX) &&
  token.length > AGENT_ACCESS_TOKEN_PREFIX.length + 16;
