import { createHash, randomBytes } from "node:crypto";

import {
  CLAIM_BOT_CODE_BYTES,
  CLAIM_BOT_CODE_PREFIX,
} from "@/lib/agentAccess/claimBot/claimBot.constants";

export const hashClaimBotCode = (code: string): string =>
  createHash("sha256").update(code.trim()).digest("hex");

/** Opaque CSPRNG claim code. Prefix makes it recognizable in paste/chat. */
export const createClaimBotCode = (): string =>
  `${CLAIM_BOT_CODE_PREFIX}${randomBytes(CLAIM_BOT_CODE_BYTES).toString("base64url")}`;
