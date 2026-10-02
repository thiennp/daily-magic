import { createHash, randomBytes } from "node:crypto";

import {
  PROJECT_API_KEY_BYTES,
  PROJECT_API_KEY_PREFIX,
} from "@/lib/projects/acl/projectApiKeys/projectApiKey.constants";

export const hashProjectApiKey = (token: string): string =>
  createHash("sha256").update(token).digest("hex");

export const createProjectApiKeyPlaintext = (): string =>
  `${PROJECT_API_KEY_PREFIX}${randomBytes(PROJECT_API_KEY_BYTES).toString("base64url")}`;

export const projectApiKeyLast4 = (token: string): string =>
  token.slice(-4);

export const readBearerProjectApiKey = (
  authorization: string | null,
): string | null => {
  if (authorization === null) {
    return null;
  }
  const match = /^Bearer\s+(awc_proj_[A-Za-z0-9_-]{20,})$/.exec(
    authorization.trim(),
  );
  return match?.[1] ?? null;
};
