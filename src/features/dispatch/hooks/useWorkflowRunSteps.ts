"use client";

import { useEffect, useState } from "react";

import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

type WorkflowRunStepsState = {
  readonly steps: readonly WorkflowStepRunRecord[];
  readonly isLoading: boolean;
};

const emptyState: WorkflowRunStepsState = {
  steps: [],
  isLoading: false,
};

const parseWorkflowRunStepsResponse = (
  body: unknown,
): readonly WorkflowStepRunRecord[] => {
  if (typeof body !== "object" || body === null) {
    return [];
  }

  const record = body as { ok?: unknown; steps?: unknown };
  if (record.ok !== true || !Array.isArray(record.steps)) {
    return [];
  }

  return record.steps as WorkflowStepRunRecord[];
};

const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === "AbortError";

export const useWorkflowRunSteps = (
  workflowRunId: string,
  pollWhileOpen = true,
): WorkflowRunStepsState => {
  const [state, setState] = useState<WorkflowRunStepsState>({
    ...emptyState,
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      try {
        const response = await fetch(
          `/api/workflow-runs/${encodeURIComponent(workflowRunId)}`,
          { signal: controller.signal },
        );
        const body: unknown = await response.json();
        setState({
          steps: parseWorkflowRunStepsResponse(body),
          isLoading: false,
        });
      } catch (error: unknown) {
        if (isAbortError(error)) {
          return;
        }
        setState({ steps: [], isLoading: false });
      }
    };

    void load();

    const intervalId = pollWhileOpen
      ? window.setInterval(() => {
          void load();
        }, 4000)
      : null;

    return () => {
      controller.abort();
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [workflowRunId, pollWhileOpen]);

  return state;
};
