"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  keyOfProjectTask,
  toNeonMetaProjectTask,
  type ProjectTaskIdbRecord,
  type ProjectTaskLocalRecord,
  type ProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/projectTasksAdapter";
import {
  projectSyncConnectionFromProbe,
  reduceProjectSyncConnection,
} from "@/features/projects/sync/projectSyncConnection";
import {
  PROJECT_SYNC_COMPUTER_OFFLINE_ERROR,
  type ProjectSyncConnectionState,
  type ProjectTaskUiStatus,
} from "@/features/projects/sync/projectSync.types";
import { encodeProjectSyncCursor } from "@/features/projects/sync/projectSyncCursor";
import { isProjectSyncModuleEnabled } from "@/features/projects/sync/projectSyncFlag";
import {
  idbEntriesOrEmpty,
  softReadIdbEntries,
} from "@/features/projects/sync/projectSyncIdbSoftDegrade";
import { loadPage } from "@/features/projects/sync/projectSyncPager";
import type {
  ProjectTaskMeta,
  ProjectTaskPlanCounts,
  ProjectTasksChatVisibility,
} from "@/features/projects/tasks/projectTask.type";
import {
  PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT,
  readProjectTasksChatVisibility,
  writeProjectTasksChatVisibility,
} from "@/features/projects/tasks/projectTasksChatVisibility";
import { listProjectTasksIdbOrThrowSoft } from "@/features/projects/tasks/projectTasksIdb";
import { mapAgentRunToProjectTaskMeta } from "@/features/projects/tasks/utils/mapAgentRunToProjectTaskMeta";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export type AwcProjectTasksState = {
  readonly tasks: readonly ProjectTaskMeta[];
  readonly allTasks: readonly ProjectTaskMeta[];
  readonly connection: ProjectSyncConnectionState;
  readonly offlineMessage: string | null;
  readonly idbSoftDegraded: boolean;
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

const toMeta = (
  row: ProjectTaskNeonMeta | ProjectTaskIdbRecord | ProjectTaskLocalRecord,
): ProjectTaskMeta => {
  if ("prompt" in row) {
    return { ...toNeonMetaProjectTask(row), assistantName: null };
  }
  if ("localClaimedAt" in row) {
    return { ...row, assistantName: null };
  }
  return {
    id: row.id,
    projectId: row.projectId,
    assistantMembershipId: row.assistantMembershipId,
    title: row.title,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    startedAt: row.startedAt,
    endedAt: row.endedAt,
    version: row.version,
    sessionId: row.sessionId,
    agentRunId: row.agentRunId,
    branch: row.branch,
    worktree: row.worktree,
    localClaimedAt: null,
    assistantName: null,
  };
};

/**
 * UI Box chrome API + Soft FIX Soft Soft data wire.
 * Flag OFF (default): Reports (agent_runs) presentation path.
 * Flag ON: softRead IDB → loadPage(local→Neon/reports) → offline; soft-degrade never hides tab.
 */
export default function useAwcProjectTasks(
  projectId: string,
  opts: {
    readonly hasOwnerComputer: boolean;
    readonly neonMeta?: readonly ProjectTaskNeonMeta[];
    readonly localMeta?: readonly ProjectTaskLocalRecord[];
    readonly localLive?: boolean;
    readonly planCounts?: ProjectTaskPlanCounts | null;
  },
): AwcProjectTasksState {
  const [allTasks, setAllTasks] = useState<readonly ProjectTaskMeta[]>([]);
  const [connection, setConnection] =
    useState<ProjectSyncConnectionState>("unknown");
  const [offlineMessage, setOfflineMessage] = useState<string | null>(null);
  const [idbSoftDegraded, setIdbSoftDegraded] = useState(false);
  const [assistantFilter, setAssistantFilter] = useState<string | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ProjectTaskUiStatus | "all">(
    "all",
  );
  const [chatVisibility, setChatVisibilityState] =
    useState<ProjectTasksChatVisibility>(PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT);

  useEffect(() => {
    setChatVisibilityState(readProjectTasksChatVisibility(projectId));
  }, [projectId]);

  const setChatVisibility = useCallback(
    (v: ProjectTasksChatVisibility) => {
      setChatVisibilityState(v);
      writeProjectTasksChatVisibility(projectId, v);
    },
    [projectId],
  );
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => {
    setTick((n) => n + 1);
  }, []);

  const hasOwnerComputer = opts.hasOwnerComputer;
  const localLiveOpt = opts.localLive;
  const neonMetaOpt = opts.neonMeta;
  const localMetaOpt = opts.localMeta;
  const planCounts = opts.planCounts ?? null;

  useEffect(() => {
    const controller = new AbortController();
    const run = async (): Promise<void> => {
      setLoading(true);
      setLoadFailed(false);
      const localLive = localLiveOpt ?? hasOwnerComputer;
      let next = projectSyncConnectionFromProbe({
        localLive,
        neonAnswered: true,
      });
      next = reduceProjectSyncConnection(next, { type: "probe", localLive });
      setConnection(next);

      // Always load Reports meta for chrome (presentation). Flag gates IDB/sync merge only.
      let reportEntries: ProjectTaskMeta[] = [];
      try {
        const response = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/reports`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          setLoadFailed(true);
        } else {
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
          } else {
            reportEntries = list
              .filter((run) => run.projectId === projectId)
              .map((run) => mapAgentRunToProjectTaskMeta(run, projectId));
          }
        }
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setLoadFailed(true);
      }

      if (!isProjectSyncModuleEnabled()) {
        if (controller.signal.aborted) return;
        setAllTasks(reportEntries);
        setIdbSoftDegraded(false);
        setOfflineMessage(null);
        setLoading(false);
        return;
      }

      const idbSoft = await softReadIdbEntries({
        read: () => listProjectTasksIdbOrThrowSoft(projectId),
      });
      const idbEntries = idbEntriesOrEmpty(idbSoft).map((row) => toMeta(row));
      const neonEntries: readonly ProjectTaskMeta[] =
        neonMetaOpt !== undefined
          ? neonMetaOpt.map((r) => toMeta(r))
          : reportEntries;
      const page = loadPage({
        idbEntries,
        localEntries: (localMetaOpt ?? []).map((r) => toMeta(r)),
        localHasMore: false,
        neonEntries,
        neonHasMore: false,
        localLive,
        beforeRequested: false,
        limit: 50,
        keyOf: (e) => keyOfProjectTask(e),
        createdAtOf: (e) => e.createdAt,
        encodeCursor: encodeProjectSyncCursor,
      });
      if (controller.signal.aborted) return;
      setAllTasks(page.entries);
      setIdbSoftDegraded(!idbSoft.ok);
      if (page.error !== undefined) {
        setOfflineMessage(page.error.message);
        setConnection(
          reduceProjectSyncConnection(next, {
            type: "load_older_exhausted_offline",
          }),
        );
      } else {
        setOfflineMessage(null);
      }
      setLoading(false);
    };
    void run();
    return () => {
      controller.abort();
    };
  }, [
    projectId,
    hasOwnerComputer,
    localLiveOpt,
    localMetaOpt,
    neonMetaOpt,
    tick,
  ]);

  const assistants = useMemo(() => {
    const map = new Map<string, string>();
    for (const t of allTasks) {
      const name = t.assistantName?.trim();
      if (name !== undefined && name.length > 0) {
        map.set(name, name);
        continue;
      }
      if (t.assistantMembershipId !== null) {
        map.set(t.assistantMembershipId, t.assistantMembershipId);
      }
    }
    return [...map.entries()].map(([id, name]) => ({ id, name }));
  }, [allTasks]);

  const tasks = useMemo(
    () =>
      allTasks.filter((t) => {
        if (assistantFilter !== "all") {
          const label = t.assistantName?.trim() || t.assistantMembershipId || "";
          if (label !== assistantFilter) return false;
        }
        if (statusFilter !== "all" && t.status !== statusFilter) return false;
        return true;
      }),
    [allTasks, assistantFilter, statusFilter],
  );

  return {
    tasks,
    allTasks,
    connection,
    offlineMessage:
      connection === "lost"
        ? PROJECT_SYNC_COMPUTER_OFFLINE_ERROR.message
        : offlineMessage,
    idbSoftDegraded,
    planCounts,
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
