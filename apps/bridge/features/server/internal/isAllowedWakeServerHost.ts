/**
 * The wake server is for the browser on this computer. A request whose Host is not the loopback
 * address and our port (DNS rebinding: a public name that now resolves to 127.0.0.1) is refused.
 */
export const isAllowedWakeServerHost = (
  hostHeader: string | undefined,
  wakePort: number,
): boolean =>
  hostHeader !== undefined &&
  [
    `127.0.0.1:${wakePort}`,
    `localhost:${wakePort}`,
    `[::1]:${wakePort}`,
  ].includes(hostHeader.toLowerCase());
