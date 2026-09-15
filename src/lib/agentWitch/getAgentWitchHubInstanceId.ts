import { randomUUID } from "node:crypto";

const instanceIdGlobalKey = "__dailyMagicAgentWitchHubInstanceId";

export const getAgentWitchHubInstanceId = (): string => {
  const globalState = globalThis as typeof globalThis & {
    [instanceIdGlobalKey]?: string;
  };

  if (globalState[instanceIdGlobalKey] === undefined) {
    globalState[instanceIdGlobalKey] = randomUUID();
  }

  return globalState[instanceIdGlobalKey] ?? randomUUID();
};

export const resetAgentWitchHubInstanceIdForTests = (): void => {
  const globalState = globalThis as typeof globalThis & {
    [instanceIdGlobalKey]?: string;
  };
  delete globalState[instanceIdGlobalKey];
};
