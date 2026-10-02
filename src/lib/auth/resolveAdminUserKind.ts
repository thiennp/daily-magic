import { isAgentAccessSyntheticEmail } from "@/lib/agentAccess/isAgentAccessSyntheticEmail";
import isTestAgentWitchEmail from "@/lib/auth/isTestAgentWitchEmail";
import type AdminUserKind from "@/lib/auth/types/AdminUserKind.type";

/**
 * Admin user kind: bot if agent synthetic email (@agents.agentwitch.com),
 * else test if isTestAgentWitchEmail, else real.
 */
const resolveAdminUserKind = (email: string): AdminUserKind => {
  if (isAgentAccessSyntheticEmail(email)) {
    return "bot";
  }

  if (isTestAgentWitchEmail(email)) {
    return "test";
  }

  return "real";
};

export default resolveAdminUserKind;
