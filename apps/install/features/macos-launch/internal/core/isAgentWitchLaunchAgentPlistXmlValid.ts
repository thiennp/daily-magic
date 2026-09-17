/** AGENT-067: bash leaked into LaunchAgent XML must never be treated as valid. */
export const isAgentWitchLaunchAgentPlistXmlValid = (
  contents: string,
): boolean => {
  const trimmed = contents.trim();
  if (!trimmed.startsWith("<?xml")) {
    return false;
  }
  if (!trimmed.includes("</plist>")) {
    return false;
  }
  if (!trimmed.includes("<key>Label</key>")) {
    return false;
  }
  if (trimmed.includes("agent_witch_is_truthy_env")) {
    return false;
  }
  if (trimmed.includes("AWI_PROCESS_HOST_ENV")) {
    return false;
  }
  if (trimmed.includes("cat <<")) {
    return false;
  }
  return true;
};
