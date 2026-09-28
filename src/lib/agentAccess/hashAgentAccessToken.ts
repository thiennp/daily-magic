import { createHash, randomBytes } from "node:crypto";

import { AGENT_ACCESS_TOKEN_PREFIX } from "@/lib/agentAccess/agentAccess.constant";

export const hashAgentAccessToken = (token: string): string =>
  createHash("sha256").update(token).digest("hex");

export const createAgentAccessToken = (): string =>
  `${AGENT_ACCESS_TOKEN_PREFIX}${randomBytes(24).toString("base64url")}`;

export const readBearerAgentAccessToken = (
  authorization: string | null,
): string | null => {
  if (authorization === null) {
    return null;
  }

  const match = /^Bearer\s+(aw_[A-Za-z0-9_-]{20,})$/.exec(authorization.trim());

  return match?.[1] ?? null;
};
