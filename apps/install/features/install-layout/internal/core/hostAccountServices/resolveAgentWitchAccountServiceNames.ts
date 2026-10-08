import { createHash } from "node:crypto";

import { resolveAgentWitchLaunchAgentPrefix } from "../resolveAgentWitchLaunchAgentPrefix.util";
import { sanitizeProfileEmailForDir } from "../resolveAgentWitchLocalLayout";

/** First 12 hex chars of sha256(lowercased, trimmed email). */
export const resolveAgentWitchAccountHash = (email: string): string =>
  createHash("sha256")
    .update(sanitizeProfileEmailForDir(email))
    .digest("hex")
    .slice(0, 12);

/** `com.agent-witch.<hash>` (`com.local-agent-witch.<hash>` for local dev). */
export const resolveAgentWitchAccountLaunchAgentLabel = (
  installDir: string,
  email: string,
): string =>
  `${resolveAgentWitchLaunchAgentPrefix(installDir)}.${resolveAgentWitchAccountHash(email)}`;

/** `agent-witch-<hash>.service` (systemd user unit). */
export const resolveAgentWitchAccountSystemdUnitName = (
  email: string,
): string => `agent-witch-${resolveAgentWitchAccountHash(email)}.service`;
