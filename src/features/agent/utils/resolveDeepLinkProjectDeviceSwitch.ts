/**
 * 5c30842c: a deep link with deviceId=A and a projectId bound to computer B
 * settled on A with "No project selected". The project's binding wins: run
 * on B (the switch banner says so) and keep the project selected.
 */
export const resolveDeepLinkProjectDeviceSwitch = (input: {
  readonly projectDeviceId: string | null;
  readonly selectedDeviceId: string;
  readonly deviceIds: readonly string[];
}): string | null => {
  const target = input.projectDeviceId?.trim() ?? "";
  if (
    target.length === 0 ||
    target === input.selectedDeviceId ||
    !input.deviceIds.includes(target)
  ) {
    return null;
  }
  return target;
};
