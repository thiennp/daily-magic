/**
 * 77e29f7a: a deep link's deviceId was replaced by another computer (stale or
 * missing device, open session, linked project) and the URL was rewritten with
 * no word to the user. Say which computer the task will run on instead.
 */
export const resolveDeepLinkDeviceSwitchNotice = (input: {
  readonly linkDeviceId: string;
  readonly runDeviceId: string;
  readonly displayNameById: ReadonlyMap<string, string>;
}): string | null => {
  if (
    input.linkDeviceId.length === 0 ||
    input.runDeviceId.length === 0 ||
    input.linkDeviceId === input.runDeviceId
  ) {
    return null;
  }
  const runName =
    input.displayNameById.get(input.runDeviceId) ?? "another computer";
  const linkName = input.displayNameById.get(input.linkDeviceId);
  return linkName === undefined
    ? `The computer in this link isn't connected any more, so this task will run on ${runName}.`
    : `This link was for ${linkName}. This task will run on ${runName}; pick the computer again to change it.`;
};
