const escapeXml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLaunchAgentPathValue = (homeDir: string): string =>
  `${homeDir}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`;

export const buildAgentWitchLaunchAgentPlistXml = (input: {
  readonly launchAgentLabel: string;
  readonly runPath: string;
  readonly installDir: string;
  readonly homeDir: string;
  readonly wakePort: number;
  readonly pathValue?: string;
}): string => {
  const pathValue =
    input.pathValue ?? buildAgentWitchLaunchAgentPathValue(input.homeDir);

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${escapeXml(input.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${escapeXml(input.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${escapeXml(input.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${escapeXml(input.homeDir)}</string>
    <key>PATH</key>
    <string>${escapeXml(pathValue)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${escapeXml(input.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${escapeXml(String(input.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`;
};
