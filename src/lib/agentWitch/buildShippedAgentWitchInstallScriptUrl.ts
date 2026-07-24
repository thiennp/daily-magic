export const buildShippedAgentWitchInstallScriptUrl = (
  baseUrl: string,
  scriptName: string,
): string => {
  const origin = baseUrl.replace(/\/$/, "");
  return `${origin}/install/agent-witch/${scriptName}`;
};
