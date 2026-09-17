import { listAgentWitchProfileEmails } from "@agent-witch/install-macos-launch";

import type { AgentWitchClientConfig } from "./agentWitchClientConfig.type";
import { readAgentWitchClientConfig } from "./readAgentWitchClientConfig";
import { waitForAgentWitchClientConfigsWithDeps } from "./waitForAgentWitchClientConfigs";

const DEFAULT_POLL_INTERVAL_MS = 10_000;

export const waitForAgentWitchClientConfigs = (): Promise<
  readonly AgentWitchClientConfig[]
> =>
  waitForAgentWitchClientConfigsWithDeps({
    listProfileEmails: listAgentWitchProfileEmails,
    readConfig: readAgentWitchClientConfig,
    pollIntervalMs: DEFAULT_POLL_INTERVAL_MS,
    logWaiting: (message) => {
      console.error(message);
    },
  });
