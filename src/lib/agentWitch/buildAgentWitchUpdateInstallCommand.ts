const normalizeOrigin = (origin: string): string => origin.replace(/\/$/, "");

export const buildAgentWitchUpdateInstallScriptUrl = (origin: string): string =>
  `${normalizeOrigin(origin)}/install/agent-witch-update.sh`;

export const buildAgentWitchUpdateInstallCommand = (origin: string): string =>
  `curl -fsSL ${JSON.stringify(buildAgentWitchUpdateInstallScriptUrl(origin))} | bash`;
