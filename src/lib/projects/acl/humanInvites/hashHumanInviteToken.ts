import { createHash, randomBytes } from "node:crypto";

import { HUMAN_INVITE_TOKEN_BYTES } from "@/lib/projects/acl/humanInvites/humanInvite.constants";

export const hashHumanInviteToken = (token: string): string =>
  createHash("sha256").update(token.trim()).digest("hex");

/** Opaque ≥128-bit CSPRNG token (base64url). */
export const createHumanInviteToken = (): string =>
  randomBytes(HUMAN_INVITE_TOKEN_BYTES).toString("base64url");
