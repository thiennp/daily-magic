import {
  isAgentLiveProgressFeedActive,
  isAnyAgentLiveProgressFeedActive,
} from "@/features/agent/utils/registerAgentLiveProgressFeed";
import { isAgentRunLiveTerminalActive } from "@/features/reports/utils/registerAgentRunLiveTerminal";

export interface GlobalAgentRunInputModalDeps {
  readonly isAgentRunLiveTerminalActive: (runId: string) => boolean;
  readonly isAnyAgentLiveProgressFeedActive: () => boolean;
  readonly isAgentLiveProgressFeedActive: (runId: string) => boolean;
}

const DEFAULT_DEPS: GlobalAgentRunInputModalDeps = {
  isAgentRunLiveTerminalActive,
  isAnyAgentLiveProgressFeedActive,
  isAgentLiveProgressFeedActive,
};

/**
 * S3: a checkpoint opens the global "Agent needs your input" modal only when
 * no surface owns it — not when its own live terminal is open, and not when
 * another run's floater is live (a replayed old checkpoint must not land there).
 */
export const shouldShowGlobalAgentRunInputModal = (
  requestAgentRunId: string,
  deps: GlobalAgentRunInputModalDeps = DEFAULT_DEPS,
): boolean => {
  if (deps.isAgentRunLiveTerminalActive(requestAgentRunId)) {
    return false;
  }
  return (
    !deps.isAnyAgentLiveProgressFeedActive() ||
    deps.isAgentLiveProgressFeedActive(requestAgentRunId)
  );
};
