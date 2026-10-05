/** Matches bash SIGINT-style stop exit used when the user cancels a local writer run. */
export const AGENT_RUN_USER_STOPPED_EXIT_CODE = 130;

export const isAgentRunUserStoppedExitCode = (
  exitCode: number | null,
): boolean => exitCode === AGENT_RUN_USER_STOPPED_EXIT_CODE;
