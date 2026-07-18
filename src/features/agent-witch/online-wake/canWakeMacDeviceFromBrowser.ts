/** Cloud restart can be queued for any offline Mac via the devices API. */
export const canWakeMacDeviceFromBrowser = (input: {
  readonly deviceLabel: string | null;
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
}): boolean => {
  void input;
  return true;
};
