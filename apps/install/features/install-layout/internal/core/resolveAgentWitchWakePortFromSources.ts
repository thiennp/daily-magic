const parseWakePort = (value: string | undefined): number | null => {
  const trimmed = value?.trim();
  if (trimmed === undefined || !/^\d+$/.test(trimmed)) {
    return null;
  }
  const port = Number.parseInt(trimmed, 10);
  return port > 0 && port <= 65535 ? port : null;
};

/**
 * The one wake-port resolution order (runtime and LaunchAgent repair):
 * 1. `wake-port.json` (`filePort`) — source of truth, written by the installer / wake server;
 * 2. `AGENT_WITCH_WAKE_PORT` env (set by the LaunchAgent plist / systemd unit from that file);
 * 3. the install-root default (47892 prod / 47893 localhost).
 */
export const resolveAgentWitchWakePortFromSources = (input: {
  readonly filePort: number | null;
  readonly envValue: string | undefined;
  readonly defaultPort: number;
}): number =>
  input.filePort ?? parseWakePort(input.envValue) ?? input.defaultPort;
