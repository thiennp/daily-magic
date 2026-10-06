/**
 * HOME-059/065 Connect-this-computer placeholder: mint reserves a row with no
 * hostname, display name, or install bundle until the Mac register-installs.
 * Those ghosts must not count as a linked computer (HOME-067).
 */
export const isAgentWitchConnectInstallPlaceholderDevice = (device: {
  readonly installBundleVersion?: string | null;
  readonly deviceLabel?: string | null;
  readonly displayName?: string | null;
}): boolean => {
  const bundle = device.installBundleVersion?.trim() ?? "";
  const label = device.deviceLabel?.trim() ?? "";
  const name = device.displayName?.trim() ?? "";
  return bundle.length === 0 && label.length === 0 && name.length === 0;
};

export const countLinkedAgentWitchComputers = (
  devices: readonly {
    readonly installBundleVersion?: string | null;
    readonly deviceLabel?: string | null;
    readonly displayName?: string | null;
  }[],
): number =>
  devices.filter((device) => !isAgentWitchConnectInstallPlaceholderDevice(device))
    .length;
