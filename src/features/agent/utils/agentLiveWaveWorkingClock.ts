export interface AgentLiveWaveWorkingClockState {
  readonly startedAtById: Readonly<Record<string, number>>;
  readonly nowMs: number;
}

export type AgentLiveWaveWorkingClockAction =
  | {
      readonly type: "sync";
      readonly workingIds: readonly string[];
      readonly at: number;
    }
  | { readonly type: "tick"; readonly at: number };

export const initialAgentLiveWaveWorkingClock =
  (): AgentLiveWaveWorkingClockState => ({
    startedAtById: {},
    nowMs: 0,
  });

export const agentLiveWaveWorkingClockReducer = (
  state: AgentLiveWaveWorkingClockState,
  action: AgentLiveWaveWorkingClockAction,
): AgentLiveWaveWorkingClockState => {
  if (action.type === "tick") {
    return { ...state, nowMs: action.at };
  }

  const nextStarted: Record<string, number> = {};
  for (const id of action.workingIds) {
    nextStarted[id] = state.startedAtById[id] ?? action.at;
  }
  return { startedAtById: nextStarted, nowMs: action.at };
};
