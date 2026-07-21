const normalizeOrigin = (origin: string): string => origin.replace(/\/$/, "");

export const buildAgentWitchRepairInstallScriptUrl = (origin: string): string =>
  `${normalizeOrigin(origin)}/install/agent-witch-repair.sh`;

export const buildAgentWitchRepairInstallCommand = (origin: string): string =>
  `curl -fsSL ${JSON.stringify(buildAgentWitchRepairInstallScriptUrl(origin))} | bash`;
