import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

/**
 * afae8216: after a reload (e.g. the host auto-update), reopen the floater
 * this tab had for a run that is still running or waiting on approval.
 */
export const shouldRestoreLiveFloaterAfterReload = (input: {
  readonly storedRunId: string | null;
  readonly runStatus: string | null;
  readonly floaterOpen: boolean;
}): boolean =>
  input.storedRunId !== null &&
  input.storedRunId.length > 0 &&
  !input.floaterOpen &&
  (input.runStatus === AgentRunStatus.RUNNING ||
    input.runStatus === AgentRunStatus.PENDING_APPROVAL);
