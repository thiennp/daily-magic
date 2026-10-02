import { createHash, randomBytes } from "node:crypto";

import { PROJECT_INVITE_TOKEN_BYTES } from "@/lib/projects/acl/invites/projectInvite.constants";

export const hashProjectInviteToken = (token: string): string =>
  createHash("sha256").update(token).digest("hex");

/** Opaque ≥128-bit CSPRNG token (base64url). No projectId embedded. */
export const createProjectInviteToken = (): string =>
  randomBytes(PROJECT_INVITE_TOKEN_BYTES).toString("base64url");
