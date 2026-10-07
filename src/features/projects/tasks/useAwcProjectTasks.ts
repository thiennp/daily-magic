"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";
import type {
  ProjectTaskMeta,
  ProjectTaskPlanCounts,
  ProjectTasksChatVisibility,
} from "@/features/projects/tasks/projectTask.type";
import { mapAgentRunToProjectTaskMeta } from "@/features/projects/tasks/utils/mapAgentRunToProjectTaskMeta";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export type AwcProjectTasksState = {
  readonly tasks: readonly ProjectTaskMeta[];
  readonly allTasks: readonly ProjectTaskMeta[];
  readonly offlineMessage: string | null;
  readonly planCounts: ProjectTaskPlanCounts | null;
  readonly assistantFilter: string | "all";
  readonly statusFilter: ProjectTaskUiStatus | "all";
  readonly chatVisibility: ProjectTasksChatVisibility;
  readonly loading: boolean;
  readonly loadFailed: boolean;
  readonly setAssistantFilter: (id: string | "all") => void;
  readonly setStatusFilter: (s: ProjectTaskUiStatus | "all") => void;
  readonly setChatVisibility: (v: ProjectTasksChatVisibility) => void;
  readonly reload: () => void;
  readonly assistants: readonly { readonly id: string; readonly name: string }[];
};

/**
 * Presentation data path: project Reports (agent_runs) → S1 status mapper.
 * No IDB / sync pager here — f61 rebase will wire S1+IDB into this chrome later.
 * Plan counts / branch-worktree / offline Load-older FSM stay stubbed until then.
 */
export default function useAwcProjectTasks(
  projectId: string,
  opts: {
    readonly hasOwnerComputer: boolean;
  },
): AwcProjectTasksState {
  // Reserved for f61 S1 connection/offline wiring; chrome tip keeps offline stubbed.
  void opts.hasOwnerComputer;
  const [allTasks, setAllTasks] = useState<readonly ProjectTaskMeta[]>([]);
  const [assistantFilter, setAssistantFilter] = useState<string | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ProjectTaskUiStatus | "all">(
    "all",
  );
  const [chatVisibility, setChatVisibility] =
    useState<ProjectTasksChatVisibility>("tasks_tab_only");
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => {
    setTick((n) => n + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const load = async (): Promise<void> => {
      setLoading(true);
      setLoadFailed(false);
      try {
        const response = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/reports`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          setLoadFailed(true);
          setAllTasks([]);
          return;
        }
        const data: unknown = await response.json();
        const list =
          typeof data === "object" &&
          data !== null &&
          "runs" in data &&
          Array.isArray((data as { runs: unknown }).runs)
            ? (data as { runs: EnrichedAgentRunRecord[] }).runs
            : null;
        if (list === null) {
          setLoadFailed(true);
          setAllTasks([]);
          return;
        }
        setAllTasks(
          list
            .filter((run) => run.projectId === projectId)
            .map((run) => mapAgentRunToProjectTaskMeta(run, projectId)),
        );
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setLoadFailed(true);
        setAllTasks([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void load();
    return () => {
      controller.abort();
    };
  }, [projectId, tick]);

  const assistants = useMemo(() => {
    const map = new Map<string, string>();
    for (const t of allTasks) {
      const name = t.assistantName?.trim();
      if (name !== undefined && name.length > 0) {
        map.set(name, name);
      }
    }
    return [...map.entries()].map(([id, name]) => ({ id, name }));
  }, [allTasks]);

  const tasks = useMemo(
    () =>
      allTasks.filter((t) => {
        if (
          assistantFilter !== "all" &&
          (t.assistantName?.trim() || "") !== assistantFilter
        ) {
          return false;
        }
        if (statusFilter !== "all" && t.status !== statusFilter) return false;
        return true;
      }),
    [allTasks, assistantFilter, statusFilter],
  );

  return {
    tasks,
    allTasks,
    offlineMessage: null,
    planCounts: null,
    assistantFilter,
    statusFilter,
    chatVisibility,
    loading,
    loadFailed,
    setAssistantFilter,
    setStatusFilter,
    setChatVisibility,
    reload,
    assistants,
  };
}
