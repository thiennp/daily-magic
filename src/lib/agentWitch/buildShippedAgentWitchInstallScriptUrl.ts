export const buildShippedAgentWitchInstallScriptUrl = (
  baseUrl: string,
  scriptName: string,
): string => {
  const origin = baseUrl.replace(/\/$/, "");

  if (scriptName === "agent-witch.ts") {
    return `${origin}/install/agent-witch/client.ts`;
  }

  return `${origin}/install/agent-witch/scripts/${scriptName}`;
};
