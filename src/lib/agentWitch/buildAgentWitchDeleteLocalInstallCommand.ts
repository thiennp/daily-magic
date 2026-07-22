const normalizeOrigin = (origin: string): string => origin.replace(/\/$/, "");

export const buildAgentWitchDeleteInstallScriptUrl = (origin: string): string =>
  `${normalizeOrigin(origin)}/install/agent-witch-delete.sh`;

export const buildAgentWitchDeleteLocalInstallCommand = (
  origin: string,
): string =>
  `curl -fsSL ${JSON.stringify(buildAgentWitchDeleteInstallScriptUrl(origin))} | bash`;
