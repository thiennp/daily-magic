/** Join step — trailing project line (name + id, or id only), or null. */
export const buildProjectInviteJoinProjectLine = (input: {
  readonly projectId?: string;
  readonly projectName?: string | null;
}): string | null =>
  input.projectName && input.projectName.trim().length > 0
    ? `Project: ${input.projectName.trim()}${input.projectId ? ` (${input.projectId})` : ""}`
    : input.projectId
      ? `Project id: ${input.projectId}`
      : null;
