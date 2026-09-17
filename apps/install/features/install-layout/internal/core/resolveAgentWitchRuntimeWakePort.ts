import fs from "node:fs";
import path from "node:path";

import { AWI_INSTALL_ROOT_FILES } from "../../public-api/types";

import {
  resolveAgentWitchDefaultWakePort,
  resolveAgentWitchInstallDir,
} from "./resolveAgentWitchLocalLayout";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isValidWakePort = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value > 0 &&
  value <= 65535;

export const readAgentWitchWakePortFromFile = (
  installDir: string,
): number | null => {
  const portFilePath = path.join(installDir, AWI_INSTALL_ROOT_FILES.wakePort);
  if (!fs.existsSync(portFilePath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(portFilePath, "utf8"));
    if (isRecord(parsed) && isValidWakePort(parsed.wakePort)) {
      return parsed.wakePort;
    }
  } catch {
    return null;
  }

  return null;
};

/** Wake port from `wake-port.json`, else the install-root default (AGENT-067). */
export const resolveAgentWitchRuntimeWakePort = (
  installDir: string = resolveAgentWitchInstallDir(),
): number =>
  readAgentWitchWakePortFromFile(installDir) ??
  resolveAgentWitchDefaultWakePort(installDir);
