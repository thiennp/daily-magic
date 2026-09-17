import type { AgentWitchClientConfig } from "./agentWitchClientConfig.type";

export interface WaitForAgentWitchClientConfigsDeps {
  readonly listProfileEmails: () => readonly string[];
  readonly readConfig: (
    profileEmail?: string | null,
  ) => AgentWitchClientConfig | null;
  readonly pollIntervalMs: number;
  readonly logWaiting: (message: string) => void;
}

const loadAgentWitchClientConfigs = (
  deps: Pick<
    WaitForAgentWitchClientConfigsDeps,
    "listProfileEmails" | "readConfig"
  >,
): readonly AgentWitchClientConfig[] => {
  const profileEmails = deps.listProfileEmails();
  if (profileEmails.length === 0) {
    const legacy = deps.readConfig(null);
    return legacy === null ? [] : [legacy];
  }

  return profileEmails.flatMap((profileEmail) => {
    const config = deps.readConfig(profileEmail);
    return config === null ? [] : [config];
  });
};

export const waitForAgentWitchClientConfigsWithDeps = async (
  deps: WaitForAgentWitchClientConfigsDeps,
): Promise<readonly AgentWitchClientConfig[]> => {
  const existing = loadAgentWitchClientConfigs(deps);
  if (existing.length > 0) {
    return existing;
  }

  deps.logWaiting("[agent-witch] Waiting for valid config…");

  return new Promise((resolve) => {
    const retry = (): void => {
      const configs = loadAgentWitchClientConfigs(deps);
      if (configs.length > 0) {
        resolve(configs);
        return;
      }

      setTimeout(retry, deps.pollIntervalMs);
    };

    retry();
  });
};
