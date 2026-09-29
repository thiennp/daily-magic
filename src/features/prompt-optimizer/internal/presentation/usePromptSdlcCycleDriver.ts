"use client";

import { useEffect, useRef } from "react";

import {
  fetchPromptSdlcCycle,
  postPromptSdlcAdvance,
  postPromptSdlcLocalResult,
  requestPromptSdlcOllamaChat,
} from "@/features/prompt-optimizer/internal/core/promptSdlcClient";
import { resolveAgentWitchWakeBaseUrlForPage } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrl";
import { isPromptSdlcTerminalStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";
import type PromptSdlcCycleView from "@/lib/promptOptimizer/types/PromptSdlcCycleView.type";

const FINISHED_RUN_STATUSES = new Set([
  "completed",
  "failed",
  "denied",
  "expired",
]);

export const usePromptSdlcCycleDriver = (
  cycle: PromptSdlcCycleView | null,
  onCycle: (next: PromptSdlcCycleView) => void,
): void => {
  const localKey = useRef("");
  const busy = useRef(false);

  useEffect(() => {
    if (cycle === null || isPromptSdlcTerminalStatus(cycle.status)) {
      return;
    }

    const cancelled = { current: false };

    const publish = (next: PromptSdlcCycleView | null): void => {
      if (!cancelled.current && next !== null) {
        onCycle(next);
      }
    };

    const tick = async (): Promise<void> => {
      if (busy.current || cancelled.current) {
        return;
      }

      busy.current = true;
      try {
        if (cycle.status === "awaiting_local" && cycle.pendingLocal !== null) {
          const key = `${cycle.pendingLocal.role}:${cycle.pendingLocal.prompt}`;
          if (localKey.current === key) {
            publish(await fetchPromptSdlcCycle(cycle.id));
            return;
          }
          localKey.current = key;
          const text = await requestPromptSdlcOllamaChat({
            wakeBaseUrl: resolveAgentWitchWakeBaseUrlForPage(),
            model:
              cycle.pendingLocal.role === "judge"
                ? cycle.judgeModel
                : cycle.improverModel,
            prompt: cycle.pendingLocal.prompt,
          });
          publish(
            await postPromptSdlcLocalResult({
              cycleId: cycle.id,
              role: cycle.pendingLocal.role,
              text,
            }),
          );
          return;
        }

        if (
          cycle.activeRunId !== null &&
          cycle.activeRunStatus !== null &&
          FINISHED_RUN_STATUSES.has(cycle.activeRunStatus)
        ) {
          publish(await postPromptSdlcAdvance(cycle.id));
          return;
        }

        publish(await fetchPromptSdlcCycle(cycle.id));
      } catch {
        localKey.current = "";
      } finally {
        busy.current = false;
      }
    };

    const timer = window.setInterval(() => {
      void tick();
    }, 2000);
    void tick();

    return () => {
      cancelled.current = true;
      window.clearInterval(timer);
    };
  }, [cycle, onCycle]);
};
