import net from "node:net";

import { allocateAgentWitchWakePort } from "./allocateAgentWitchWakePort";
import {
  persistAgentWitchWakePortIfMissing,
  resolveAgentWitchWakePort,
} from "./agentWitchWakeConstants";
import { writeAgentWitchWakePortFile } from "./agentWitchWakePortFile";
import { resolveAgentWitchInstallDir } from "./resolveAgentWitchLocalLayout";

const isWakePortAvailable = (port: number): Promise<boolean> =>
  new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => {
      resolve(false);
    });
    server.listen(port, "127.0.0.1", () => {
      server.close(() => {
        resolve(true);
      });
    });
  });

export const resolveAgentWitchWakeListenPort = async (): Promise<number> => {
  const installDir = resolveAgentWitchInstallDir();
  const initialPort = resolveAgentWitchWakePort();

  if (await isWakePortAvailable(initialPort)) {
    persistAgentWitchWakePortIfMissing(initialPort);
    return initialPort;
  }

  const allocatedPort = await allocateAgentWitchWakePort();
  writeAgentWitchWakePortFile(installDir, allocatedPort);
  return allocatedPort;
};
