import { deviceLabelMatchesLocalHost } from "./deviceLabelMatchesLocalHost";

export const canWakeMacDeviceFromBrowser = (input: {
  readonly deviceLabel: string | null;
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
}): boolean =>
  input.isWakeServerReachable &&
  input.localHostname !== null &&
  deviceLabelMatchesLocalHost(input.deviceLabel, input.localHostname);
