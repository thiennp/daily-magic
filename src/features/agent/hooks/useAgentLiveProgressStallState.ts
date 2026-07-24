"use client";

import { useCallback, useEffect, useReducer, useState } from "react";

import {
  agentLiveProgressStallClockReducer,
  initialAgentLiveProgressStallClockState,
  resolveAgentLiveProgressMsSinceLastActivity,
  resolveAgentLiveProgressWorkedMs,
} from "@/features/agent/utils/agentLiveProgressStallClock.reducer";
import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import { resolveAgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";

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
    agentLiveProgressStallClockReducer,
    undefined,
    initialAgentLiveProgressStallClockState,
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
    if (
      input.estimateSeconds !== null &&
      input.estimateSeconds !== undefined &&
      input.estimateSeconds > 0
    ) {
      dispatch({ type: "estimate", at: Date.now() });
    }
  }, [input.estimateSeconds]);

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

  const msSinceLastActivity = resolveAgentLiveProgressMsSinceLastActivity({
    isWorking: input.isWorking,
    clock,
  });
  const workedMs = resolveAgentLiveProgressWorkedMs({
    isWorking: input.isWorking,
    clock,
  });

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
