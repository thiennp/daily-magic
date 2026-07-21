"use client";

import { useCallback, useEffect, useReducer, useState } from "react";

import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import { resolveAgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";

interface StallClockState {
  readonly lastActivityAt: number | null;
  readonly workingStartedAt: number | null;
  readonly nowMs: number;
}

type StallClockAction =
  | { readonly type: "reset"; readonly at: number }
  | { readonly type: "activity"; readonly at: number }
  | { readonly type: "tick"; readonly at: number };

const stallClockReducer = (
  state: StallClockState,
  action: StallClockAction,
): StallClockState => {
  switch (action.type) {
    case "reset":
      return { lastActivityAt: null, workingStartedAt: null, nowMs: action.at };
    case "activity":
      return {
        lastActivityAt: action.at,
        workingStartedAt: state.workingStartedAt ?? action.at,
        nowMs: action.at,
      };
    case "tick":
      return { ...state, nowMs: action.at };
    default:
      return state;
  }
};

const initialStallClockState = (): StallClockState => ({
  lastActivityAt: null,
  workingStartedAt: null,
  nowMs: 0,
});

export const useAgentLiveProgressStallState = (input: {
  readonly isWorking: boolean;
  readonly activityFingerprint: string;
  readonly estimateSeconds?: number | null;
}): {
  readonly stallState: AgentLiveProgressStallState;
  readonly msSinceLastActivity: number | null;
  readonly workedMs: number | null;
  readonly noteRunHeartbeat: () => void;
} => {
  const [clock, dispatch] = useReducer(
    stallClockReducer,
    undefined,
    initialStallClockState,
  );
  const [runHeartbeatRevision, setRunHeartbeatRevision] = useState(0);
  const noteRunHeartbeat = useCallback(() => {
    setRunHeartbeatRevision((revision) => revision + 1);
  }, []);

  useEffect(() => {
    if (!input.isWorking) {
      dispatch({ type: "reset", at: Date.now() });
      return;
    }

    dispatch({ type: "activity", at: Date.now() });
  }, [input.activityFingerprint, input.isWorking, runHeartbeatRevision]);

  useEffect(() => {
    if (!input.isWorking) {
      return;
    }

    const timer = window.setInterval(() => {
      dispatch({ type: "tick", at: Date.now() });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [input.isWorking]);

  const msSinceLastActivity =
    input.isWorking && clock.lastActivityAt !== null
      ? clock.nowMs - clock.lastActivityAt
      : null;
  const workedMs =
    input.isWorking && clock.workingStartedAt !== null
      ? clock.nowMs - clock.workingStartedAt
      : null;

  return {
    stallState: resolveAgentLiveProgressStallState({
      isWorking: input.isWorking,
      msSinceLastActivity,
      workedMs,
      estimateSeconds: input.estimateSeconds ?? null,
    }),
    msSinceLastActivity,
    workedMs,
    noteRunHeartbeat,
  };
};
