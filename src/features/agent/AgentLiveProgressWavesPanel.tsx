"use client";

import { useEffect, useReducer } from "react";

import AgentLiveProgressWaveItemRow from "@/features/agent/AgentLiveProgressWaveItemRow";
import type { AgentLiveWavePlanViewItem } from "@/features/agent/utils/agentLiveWavePlan.type";
import {
  agentLiveWaveWorkingClockReducer,
  initialAgentLiveWaveWorkingClock,
} from "@/features/agent/utils/agentLiveWaveWorkingClock";

interface AgentLiveProgressWavesPanelProps {
  readonly items: readonly AgentLiveWavePlanViewItem[];
}

export default function AgentLiveProgressWavesPanel({
  items,
}: AgentLiveProgressWavesPanelProps) {
  const workingIds = items
    .filter((item) => item.status === "working")
    .map((item) => item.id);
  const workingIdsKey = workingIds.join("\0");
  const [clock, dispatch] = useReducer(
    agentLiveWaveWorkingClockReducer,
    undefined,
    initialAgentLiveWaveWorkingClock,
  );

  useEffect(() => {
    dispatch({
      type: "sync",
      workingIds: workingIdsKey.length > 0 ? workingIdsKey.split("\0") : [],
      at: Date.now(),
    });
  }, [workingIdsKey]);

  useEffect(() => {
    if (workingIdsKey.length === 0) {
      return;
    }
    const timer = window.setInterval(() => {
      dispatch({ type: "tick", at: Date.now() });
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, [workingIdsKey]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-4" role="region" aria-label="Waves and subagents">
      <h4 className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Waves & subagents
      </h4>
      <ul className="mt-2 space-y-2">
        {items.map((item) => {
          const startedAt = clock.startedAtById[item.id];
          const workedMs =
            item.status === "working" &&
            startedAt !== undefined &&
            clock.nowMs > 0
              ? clock.nowMs - startedAt
              : null;
          return (
            <AgentLiveProgressWaveItemRow
              key={`${item.kind}-${item.id}`}
              item={item}
              workedMs={workedMs}
            />
          );
        })}
      </ul>
    </div>
  );
}
