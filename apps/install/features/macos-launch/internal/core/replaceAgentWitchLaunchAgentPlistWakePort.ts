const WAKE_PORT_ENTRY =
  /(<key>AGENT_WITCH_WAKE_PORT<\/key>\s*<string>)[^<]*(<\/string>)/;

/** Rewrites the plist's `AGENT_WITCH_WAKE_PORT` value; null when the plist has no such entry. */
export const replaceAgentWitchLaunchAgentPlistWakePort = (
  xml: string,
  wakePort: number,
): string | null =>
  WAKE_PORT_ENTRY.test(xml)
    ? xml.replace(WAKE_PORT_ENTRY, `$1${String(wakePort)}$2`)
    : null;
