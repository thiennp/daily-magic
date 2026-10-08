import net from "node:net";

import { syncAgentWitchLaunchAgentPlistWakePort } from "@agent-witch/install-macos-launch";
import {
  resolveAgentWitchWakePortDir,
  resolveAgentWitchHostProcessScope,
  resolveAgentWitchAccountLaunchAgentLabel,
} from "@agent-witch/install-layout";

import { allocateAgentWitchWakePort } from "./allocateAgentWitchWakePort";
import {
  persistAgentWitchWakePortIfMissing,
  resolveAgentWitchWakePort,
} from "./agentWitchWakeConstants";
import { writeAgentWitchWakePortFile } from "./agentWitchWakePortFile";
import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
} from "./resolveAgentWitchLocalLayout";

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

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Port for the wake server. The persisted port (see resolveAgentWitchWakePort) is retried for
 * a few seconds first: during a restart the previous process may still hold it, and moving
 * ports then is what left wake-port.json and the LaunchAgent env disagreeing. Only when it stays
 * busy is a new port allocated, and then wake-port.json, this process's env and the
 * LaunchAgent plists all move to it together.
 */
export const resolveAgentWitchWakeListenPort = async (
  options: { readonly attempts?: number; readonly retryDelayMs?: number } = {},
): Promise<number> => {
  const installDir = resolveAgentWitchInstallDir();
  const initialPort = resolveAgentWitchWakePort();
  const attempts = Math.max(1, options.attempts ?? 10);
  const retryDelayMs = options.retryDelayMs ?? 500;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    if (await isWakePortAvailable(initialPort)) {
      persistAgentWitchWakePortIfMissing(initialPort);
      return initialPort;
    }
    if (attempt < attempts) {
      await sleep(retryDelayMs);
    }
  }

  const allocatedPort = await allocateAgentWitchWakePort();
  const dir = resolveAgentWitchWakePortDir(installDir);
  writeAgentWitchWakePortFile(dir, allocatedPort);
  process.env.AGENT_WITCH_WAKE_PORT = String(allocatedPort);
  try {
    const scope = resolveAgentWitchHostProcessScope({ installDir });
    const launchAgentPrefix =
      scope.kind === "account"
        ? resolveAgentWitchAccountLaunchAgentLabel(installDir, scope.email)
        : resolveAgentWitchLaunchAgentPrefix(installDir);
    syncAgentWitchLaunchAgentPlistWakePort({
      launchAgentPrefix,
      wakePort: allocatedPort,
    });
  } catch (error) {
    console.error(
      `[agent-witch] Could not update LaunchAgent wake port: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  return allocatedPort;
};
