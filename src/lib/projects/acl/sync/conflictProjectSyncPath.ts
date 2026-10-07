/** Sibling path for last-writer-wins loser copy. */
export const conflictProjectSyncPath = (input: {
  readonly path: string;
  readonly deviceId: string;
  readonly now?: Date;
}): string => {
  const stamp = (input.now ?? new Date())
    .toISOString()
    .replace(/[-:]/g, "")
    .slice(0, 15);
  const short = input.deviceId.slice(0, 8);
  const dot = input.path.lastIndexOf(".");
  return dot > 0
    ? `${input.path.slice(0, dot)}.conflict-${short}-${stamp}${input.path.slice(dot)}`
    : `${input.path}.conflict-${short}-${stamp}`;
};
