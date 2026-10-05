import { resolveAgentWitchWakePortFromSources } from "@agent-witch/install-layout";

import { readAgentWitchWakePortFromFile } from "./agentWitchWakePortFile";
import {
  resolveAgentWitchDefaultWakePort,
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
} from "./resolveAgentWitchLocalLayout";
import { writeAgentWitchWakePortFile } from "./agentWitchWakePortFile";

export const AGENT_WITCH_WAKE_DEFAULT_PORT = resolveAgentWitchDefaultWakePort();

export const AGENT_WITCH_WAKE_LAUNCH_AGENT_LABEL = `${resolveAgentWitchLaunchAgentPrefix()}-wake`;

export const AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL =
  resolveAgentWitchLaunchAgentPrefix();

/** `wake-port.json` → `AGENT_WITCH_WAKE_PORT` → install-root default (one order everywhere). */
export const resolveAgentWitchWakePort = (): number => {
  const installDir = resolveAgentWitchInstallDir();
  return resolveAgentWitchWakePortFromSources({
    filePort: readAgentWitchWakePortFromFile(installDir),
    envValue: process.env.AGENT_WITCH_WAKE_PORT,
    defaultPort: resolveAgentWitchDefaultWakePort(installDir),
  });
};

export const persistAgentWitchWakePortIfMissing = (wakePort: number): void => {
  const installDir = resolveAgentWitchInstallDir();
  if (readAgentWitchWakePortFromFile(installDir) !== null) {
    return;
  }

  writeAgentWitchWakePortFile(installDir, wakePort);
};
