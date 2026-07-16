export const isLocalMacAgentRunDispatch = (input: {
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly groupId: string | null;
}): boolean =>
  input.groupId === null && input.requesterUserId === input.executorUserId;
