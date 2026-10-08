import type { AgentWitchClientConfig } from "./agentWitchClientConfig.type";

export interface WaitForAgentWitchClientConfigsDeps {
  readonly listProfileEmails: () => readonly string[];
  readonly readConfig: (
    profileEmail?: string | null,
  ) => AgentWitchClientConfig | null;
  readonly pollIntervalMs: number;
  readonly logWaiting: (message: string) => void;
  readonly onlyProfileEmail?: string | null;
}

const loadAgentWitchClientConfigs = (
  deps: Pick<
    WaitForAgentWitchClientConfigsDeps,
    "listProfileEmails" | "readConfig" | "onlyProfileEmail"
  >,
): readonly AgentWitchClientConfig[] => {
  const only = deps.onlyProfileEmail?.trim().toLowerCase() ?? "";
  const listed = deps.listProfileEmails();
  // AWL-ISO-1 account host: exactly its own profile (keep waiting until it exists).
  if (only.length > 0) {
    const config = listed.includes(only) ? deps.readConfig(only) : null;
    return config === null ? [] : [config];
  }
  const profileEmails = listed;
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
