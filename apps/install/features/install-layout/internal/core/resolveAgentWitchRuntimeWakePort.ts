import fs from "node:fs";
import path from "node:path";

import { AWI_INSTALL_ROOT_FILES } from "../../public-api/types";

import {
  resolveAgentWitchDefaultWakePort,
  resolveAgentWitchInstallDir,
} from "./resolveAgentWitchLocalLayout";
import { isValidAgentWitchWakePort } from "./isValidAgentWitchWakePort";
import { resolveAgentWitchWakePortFromSources } from "./resolveAgentWitchWakePortFromSources";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const readAgentWitchWakePortFromFile = (
  installDir: string,
): number | null => {
  const portFilePath = path.join(installDir, AWI_INSTALL_ROOT_FILES.wakePort);
  if (!fs.existsSync(portFilePath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(portFilePath, "utf8"));
    if (isRecord(parsed) && isValidAgentWitchWakePort(parsed.wakePort)) {
      return parsed.wakePort;
    }
  } catch {
    return null;
  }

  return null;
};

/** Wake port: `wake-port.json` → `AGENT_WITCH_WAKE_PORT` → install-root default (AGENT-067). */
export const resolveAgentWitchRuntimeWakePort = (
  installDir: string = resolveAgentWitchInstallDir(),
): number =>
  resolveAgentWitchWakePortFromSources({
    filePort: readAgentWitchWakePortFromFile(installDir),
    envValue: process.env.AGENT_WITCH_WAKE_PORT,
    defaultPort: resolveAgentWitchDefaultWakePort(installDir),
  });
