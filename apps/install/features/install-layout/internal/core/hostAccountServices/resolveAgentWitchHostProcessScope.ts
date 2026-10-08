import { sanitizeProfileEmailForDir } from "../resolveAgentWitchLocalLayout";

import { readAgentWitchHostServices } from "./agentWitchHostServicesFile";
import { AGENT_WITCH_HOST_ACCOUNT_ENV } from "./hostAccountServices.constant";
import type {
  AgentWitchHostEnv,
  AgentWitchHostProcessScope,
} from "./hostAccountServices.type";

/** Account this process serves, from AGENT_WITCH_HOST_ACCOUNT only (never AGENT_WITCH_PROFILE). */
export const resolveAgentWitchHostAccountFromEnv = (
  env: AgentWitchHostEnv = process.env,
): string | null => {
  const value = env[AGENT_WITCH_HOST_ACCOUNT_ENV]?.trim() ?? "";
  return value.length > 0 ? sanitizeProfileEmailForDir(value) : null;
};

/**
 * account: AGENT_WITCH_HOST_ACCOUNT set (one account per process).
 * launcher: no account env but host-services.json exists (start account services, idle).
 * monolith: neither (legacy single process for every profile).
 */
export const resolveAgentWitchHostProcessScope = (input: {
  readonly installDir: string;
  readonly env?: AgentWitchHostEnv;
}): AgentWitchHostProcessScope => {
  const email = resolveAgentWitchHostAccountFromEnv(input.env ?? process.env);
  if (email !== null) {
    return { kind: "account", email };
  }
  const services = readAgentWitchHostServices(input.installDir);
  return services === null
    ? { kind: "monolith" }
    : { kind: "launcher", services };
};
