import { allocateAgentWitchWakePort } from "./allocateAgentWitchWakePort";
import {
  readAgentWitchWakePortFromFile,
  writeAgentWitchWakePortFile,
} from "./agentWitchWakePortFile";
import { isAgentWitchScriptEntryPoint } from "./isAgentWitchScriptEntryPoint";
import { resolveAgentWitchInstallDir } from "./resolveAgentWitchLocalLayout";

export const ensureAgentWitchWakePort = async (
  installDir: string = resolveAgentWitchInstallDir(),
): Promise<number> => {
  const savedPort = readAgentWitchWakePortFromFile(installDir);
  if (savedPort !== null) {
    return savedPort;
  }

  const allocatedPort = await allocateAgentWitchWakePort();
  writeAgentWitchWakePortFile(installDir, allocatedPort);
  return allocatedPort;
};

if (isAgentWitchScriptEntryPoint(import.meta.url)) {
  ensureAgentWitchWakePort()
    .then((port) => {
      process.stdout.write(String(port));
    })
    .catch(() => {
      process.exit(1);
    });
}
