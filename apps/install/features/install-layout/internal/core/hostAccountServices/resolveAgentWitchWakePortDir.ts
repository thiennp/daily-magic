import path from "node:path";

import { AGENT_WITCH_PROFILES_DIR_NAME } from "../../../public-api/types";

import type { AgentWitchHostEnv } from "./hostAccountServices.type";
import { resolveAgentWitchHostAccountFromEnv } from "./resolveAgentWitchHostProcessScope";

export const resolveAgentWitchAccountProfileDir = (
  installDir: string,
  email: string,
): string =>
  path.join(
    installDir,
    AGENT_WITCH_PROFILES_DIR_NAME,
    email.trim().toLowerCase(),
  );

/** Directory holding this process's wake-port.json: the account profile dir, else the install root. */
export const resolveAgentWitchWakePortDir = (
  installDir: string,
  env: AgentWitchHostEnv = process.env,
): string => {
  const email = resolveAgentWitchHostAccountFromEnv(env);
  return email === null
    ? installDir
    : resolveAgentWitchAccountProfileDir(installDir, email);
};
