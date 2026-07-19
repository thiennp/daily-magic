"use client";

import { useEffect, useReducer } from "react";

import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import { resolveAgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";

interface StallClockState {
  readonly lastActivityAt: number | null;
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
      return { lastActivityAt: null, nowMs: action.at };
    case "activity":
      return { lastActivityAt: action.at, nowMs: action.at };
    case "tick":
      return { ...state, nowMs: action.at };
    default:
      return state;
  }
};

const initialStallClockState = (): StallClockState => ({
  lastActivityAt: null,
  nowMs: 0,
});

export const useAgentLiveProgressStallState = (input: {
  readonly isWorking: boolean;
  readonly activityFingerprint: string;
}): AgentLiveProgressStallState => {
  const [clock, dispatch] = useReducer(
    stallClockReducer,
    undefined,
    initialStallClockState,
  );

  useEffect(() => {
    if (!input.isWorking) {
      dispatch({ type: "reset", at: Date.now() });
      return;
    }

    dispatch({ type: "activity", at: Date.now() });
  }, [input.activityFingerprint, input.isWorking]);

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

  return resolveAgentLiveProgressStallState({
    isWorking: input.isWorking,
    msSinceLastActivity,
  });
};
