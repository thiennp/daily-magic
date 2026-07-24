export interface AgentLiveProgressStallClockState {
  readonly lastActivityAt: number | null;
  readonly workingStartedAt: number | null;
  readonly estimateReceivedAt: number | null;
  readonly nowMs: number;
}

export type AgentLiveProgressStallClockAction =
  | { readonly type: "reset"; readonly at: number }
  | { readonly type: "activity"; readonly at: number }
  | { readonly type: "estimate"; readonly at: number }
  | { readonly type: "tick"; readonly at: number };

export const initialAgentLiveProgressStallClockState =
  (): AgentLiveProgressStallClockState => ({
    lastActivityAt: null,
    workingStartedAt: null,
    estimateReceivedAt: null,
    nowMs: 0,
  });

export const agentLiveProgressStallClockReducer = (
  state: AgentLiveProgressStallClockState,
  action: AgentLiveProgressStallClockAction,
): AgentLiveProgressStallClockState => {
  switch (action.type) {
    case "reset":
      return {
        lastActivityAt: null,
        workingStartedAt: null,
        estimateReceivedAt: null,
        nowMs: action.at,
      };
    case "activity":
      return {
        lastActivityAt: action.at,
        workingStartedAt: state.workingStartedAt ?? action.at,
        estimateReceivedAt: state.estimateReceivedAt,
        nowMs: action.at,
      };
    case "estimate":
      return {
        ...state,
        estimateReceivedAt: state.estimateReceivedAt ?? action.at,
        nowMs: action.at,
      };
    case "tick":
      return { ...state, nowMs: action.at };
    default:
      return state;
  }
};

export const resolveAgentLiveProgressWorkedMs = (input: {
  readonly isWorking: boolean;
  readonly clock: AgentLiveProgressStallClockState;
}): number | null => {
  if (!input.isWorking) {
    return null;
  }
  if (input.clock.estimateReceivedAt !== null) {
    return input.clock.nowMs - input.clock.estimateReceivedAt;
  }
  if (input.clock.workingStartedAt !== null) {
    return input.clock.nowMs - input.clock.workingStartedAt;
  }
  return null;
};

export const resolveAgentLiveProgressMsSinceLastActivity = (input: {
  readonly isWorking: boolean;
  readonly clock: AgentLiveProgressStallClockState;
}): number | null =>
  input.isWorking && input.clock.lastActivityAt !== null
    ? input.clock.nowMs - input.clock.lastActivityAt
    : null;
