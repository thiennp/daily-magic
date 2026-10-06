import { createHash } from "node:crypto";

import { OAUTH_PKCE_METHOD } from "@/lib/agentAccess/oauth/oauth.constants";

/** Base64url without padding (RFC 7636). */
export const base64UrlEncode = (buffer: Buffer): string =>
  buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

export const computePkceS256Challenge = (codeVerifier: string): string =>
  base64UrlEncode(createHash("sha256").update(codeVerifier).digest());

export const isPkceS256Method = (method: string): boolean =>
  method === OAUTH_PKCE_METHOD;

export const verifyPkceS256 = (input: {
  readonly codeVerifier: string;
  readonly codeChallenge: string;
}): boolean => {
  if (input.codeVerifier.length < 43 || input.codeVerifier.length > 128) {
    return false;
  }
  return computePkceS256Challenge(input.codeVerifier) === input.codeChallenge;
};
