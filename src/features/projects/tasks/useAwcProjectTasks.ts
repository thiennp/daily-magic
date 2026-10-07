"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  ProjectTaskLocalRecord,
  ProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/projectTasksAdapter";
import {
  projectSyncConnectionFromProbe,
  reduceProjectSyncConnection,
} from "@/features/projects/sync/projectSyncConnection";
import {
  PROJECT_SYNC_COMPUTER_OFFLINE_ERROR,
  type ProjectSyncConnectionState,
} from "@/features/projects/sync/projectSync.types";
import { isProjectSyncModuleEnabled } from "@/features/projects/sync/projectSyncFlag";
import type {
  ProjectTaskMeta,
  ProjectTaskPlanCounts,
} from "@/features/projects/tasks/projectTask.type";
import type { AwcProjectTasksState } from "@/features/projects/tasks/awcProjectTasksState.type";
import { useProjectTasksPickedChatVisibility } from "@/features/projects/tasks/useProjectTasksPickedChatVisibility";
import { fetchProjectTaskReportEntries } from "@/features/projects/tasks/utils/fetchProjectTaskReportEntries";
import { loadProjectTasksSyncPage } from "@/features/projects/tasks/utils/loadProjectTasksSyncPage";
import { useProjectTaskFilters } from "@/features/projects/tasks/useProjectTaskFilters";

export type { AwcProjectTasksState } from "@/features/projects/tasks/awcProjectTasksState.type";

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
  const [connection, setConnection] = useState<ProjectSyncConnectionState>("unknown");
  const [offlineMessage, setOfflineMessage] = useState<string | null>(null);
  const [idbSoftDegraded, setIdbSoftDegraded] = useState(false);
  const { chatVisibility, setChatVisibility } =
    useProjectTasksPickedChatVisibility(projectId);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => {
    setTick((n) => n + 1);
  }, []);

  const { hasOwnerComputer, localLive: localLiveOpt } = opts;
  const { neonMeta: neonMetaOpt, localMeta: localMetaOpt } = opts;
  const planCounts = opts.planCounts ?? null;

  useEffect(() => {
    const controller = new AbortController();
    const run = async (): Promise<void> => {
      setLoading(true);
      setLoadFailed(false);
      const localLive = localLiveOpt ?? hasOwnerComputer;
      const next = reduceProjectSyncConnection(
        projectSyncConnectionFromProbe({ localLive, neonAnswered: true }),
        { type: "probe", localLive },
      );
      setConnection(next);

      // Always load Reports meta for chrome (presentation). Flag gates IDB/sync merge only.
      const report = await fetchProjectTaskReportEntries(projectId, controller.signal);
      if (report.aborted) return;
      if (report.failed) setLoadFailed(true);
      const reportEntries = report.entries;

      if (!isProjectSyncModuleEnabled()) {
        if (controller.signal.aborted) return;
        setAllTasks(reportEntries);
        setIdbSoftDegraded(false);
        setOfflineMessage(null);
        setLoading(false);
        return;
      }

      const { page, idbSoftOk } = await loadProjectTasksSyncPage({
        projectId,
        reportEntries,
        neonMeta: neonMetaOpt,
        localMeta: localMetaOpt,
        localLive,
      });
      if (controller.signal.aborted) return;
      setAllTasks(page.entries);
      setIdbSoftDegraded(!idbSoftOk);
      setOfflineMessage(page.error?.message ?? null);
      if (page.error !== undefined) {
        setConnection(
          reduceProjectSyncConnection(next, { type: "load_older_exhausted_offline" }),
        );
      }
      setLoading(false);
    };
    void run();
    return () => {
      controller.abort();
    };
  }, [projectId, hasOwnerComputer, localLiveOpt, localMetaOpt, neonMetaOpt, tick]);

  const filters = useProjectTaskFilters(allTasks);

  return {
    ...filters,
    allTasks,
    connection,
    offlineMessage:
      connection === "lost"
        ? PROJECT_SYNC_COMPUTER_OFFLINE_ERROR.message
        : offlineMessage,
    idbSoftDegraded,
    planCounts,
    chatVisibility,
    loading,
    loadFailed,
    setChatVisibility,
    reload,
  };
}
