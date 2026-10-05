/** Prefer device display name, else label; never empty for an active seat. */
export const resolveComputerMembershipDisplayName = (input: {
  readonly displayName: string | null | undefined;
  readonly deviceLabel: string | null | undefined;
  readonly deviceId: string;
}): string => {
  const display = input.displayName?.trim() ?? "";
  if (display.length > 0) {
    return display;
  }
  const label = input.deviceLabel?.trim() ?? "";
  if (label.length > 0) {
    return label;
  }
  return `Computer ${input.deviceId.slice(0, 8)}`;
};
