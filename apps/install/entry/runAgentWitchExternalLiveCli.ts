import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_CONNECTION_STALE_MS,
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
} from "@agent-witch/install-connection-health";
import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLocalLayout,
} from "@agent-witch/install-layout";
import { kickstartAgentWitchClientLaunchAgents } from "@agent-witch/install-macos-launch";
import {
  resolveLocalAppPublicKey,
  startAgentWitchLocalApp,
} from "../../live/features/local-server/public-api/infrastructure";

import { exitUnlessActiveMacOsConsoleUser } from "../../../scripts/guardMacOsConsoleUser";

const readLinkCode = (installDir: string): string | null => {
  const linkCodePath = path.join(installDir, "link-code.txt");
  if (!fs.existsSync(linkCodePath)) {
    return null;
  }
  const raw = fs.readFileSync(linkCodePath, "utf8").trim();
  return raw.length > 0 ? raw : null;
};

export const runAgentWitchExternalLiveCli = (): void => {
  exitUnlessActiveMacOsConsoleUser("agent-witch-live");

  const installDir = resolveAgentWitchInstallDir();
  const layout = resolveAgentWitchLocalLayout();
  const linkCode = readLinkCode(installDir);
  const publicKeyRaw = resolveLocalAppPublicKey(layout);

  startAgentWitchLocalApp({
    layout,
    controllers: {
      getStatus: () => {
        const health = readAgentWitchConnectionHealth(layout);
        const wsConnected =
          health !== null &&
          !isAgentWitchConnectionHealthStale(
            health,
            AGENT_WITCH_CONNECTION_STALE_MS,
          );
        return {
          wsConnected,
          lastHeartbeatAt: health?.lastAckAt ?? null,
          wakeError: null,
          linkCode,
          publicKeyRaw,
        };
      },
      reviveWebSocket: () => {
        void kickstartAgentWitchClientLaunchAgents(installDir);
      },
    },
  });
};
