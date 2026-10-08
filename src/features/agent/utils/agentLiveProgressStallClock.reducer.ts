export interface AgentLiveProgressStallClockState {
  readonly lastActivityAt: number | null;
  readonly workingStartedAt: number | null;
  readonly estimateReceivedAt: number | null;
  readonly nowMs: number;
  readonly accumulatedWaitMs: number;
  readonly waitStartedAt: number | null;
}

export type AgentLiveProgressStallClockAction =
  | { readonly type: "reset"; readonly at: number }
  | { readonly type: "activity"; readonly at: number }
  | { readonly type: "estimate"; readonly at: number }
  | { readonly type: "tick"; readonly at: number }
  | { readonly type: "waitStart"; readonly at: number }
  | { readonly type: "waitEnd"; readonly at: number };

export const initialAgentLiveProgressStallClockState =
  (): AgentLiveProgressStallClockState => ({
    lastActivityAt: null,
    workingStartedAt: null,
    estimateReceivedAt: null,
    nowMs: 0,
    accumulatedWaitMs: 0,
    waitStartedAt: null,
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
        accumulatedWaitMs: 0,
        waitStartedAt: null,
      };
    case "activity":
      return {
        lastActivityAt: action.at,
        workingStartedAt: state.workingStartedAt ?? action.at,
        estimateReceivedAt: state.estimateReceivedAt,
        nowMs: action.at,
        accumulatedWaitMs: state.accumulatedWaitMs,
        waitStartedAt: state.waitStartedAt,
      };
    case "estimate":
      return {
        ...state,
        estimateReceivedAt: state.estimateReceivedAt ?? action.at,
        nowMs: action.at,
      };
    case "tick":
      return { ...state, nowMs: action.at };
    case "waitStart":
      if (state.waitStartedAt !== null) return state;
      return { ...state, waitStartedAt: action.at, nowMs: action.at };
    case "waitEnd":
      if (state.waitStartedAt === null) return state;
      return {
        ...state,
        accumulatedWaitMs:
          state.accumulatedWaitMs + (action.at - state.waitStartedAt),
        waitStartedAt: null,
        nowMs: action.at,
      };
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
  const start = input.clock.estimateReceivedAt ?? input.clock.workingStartedAt;
  if (start === null) {
    return null;
  }
  const currentWaitMs =
    input.clock.waitStartedAt === null
      ? 0
      : input.clock.nowMs - Math.max(input.clock.waitStartedAt, start);
  return Math.max(
    0,
    input.clock.nowMs - start - input.clock.accumulatedWaitMs - currentWaitMs,
  );
};

export const resolveAgentLiveProgressMsSinceLastActivity = (input: {
  readonly isWorking: boolean;
  readonly clock: AgentLiveProgressStallClockState;
}): number | null =>
  input.isWorking && input.clock.lastActivityAt !== null
    ? input.clock.nowMs - input.clock.lastActivityAt
    : null;
