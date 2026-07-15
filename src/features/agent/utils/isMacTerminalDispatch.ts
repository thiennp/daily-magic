export const isMacTerminalDispatch = (options: {
  readonly targetUserId?: string;
  readonly groupId?: string;
  readonly targetDeviceId?: string;
}): boolean =>
  options.targetUserId === undefined && options.groupId === undefined;
