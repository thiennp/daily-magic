import type {
  ProjectTaskLocalRecord,
  ProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/projectTasksAdapter";
import { encodeProjectSyncCursor } from "@/features/projects/sync/projectSyncCursor";
import {
  idbEntriesOrEmpty,
  softReadIdbEntries,
} from "@/features/projects/sync/projectSyncIdbSoftDegrade";
import { loadPage } from "@/features/projects/sync/projectSyncPager";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import { listProjectTasksIdbOrThrowSoft } from "@/features/projects/tasks/projectTasksIdb";
import { toProjectTaskMeta } from "@/features/projects/tasks/utils/toProjectTaskMeta";

/** Sync flag ON: softRead IDB → loadPage(local → Neon / reports). */
export const loadProjectTasksSyncPage = async (input: {
  readonly projectId: string;
  readonly reportEntries: readonly ProjectTaskMeta[];
  readonly neonMeta?: readonly ProjectTaskNeonMeta[];
  readonly localMeta?: readonly ProjectTaskLocalRecord[];
  readonly localLive: boolean;
}) => {
  const { projectId, reportEntries, neonMeta, localMeta, localLive } = input;
  const idbSoft = await softReadIdbEntries({
    read: () => listProjectTasksIdbOrThrowSoft(projectId),
  });
  const idbEntries = idbEntriesOrEmpty(idbSoft).map((row) => toProjectTaskMeta(row));
  const neonEntries: readonly ProjectTaskMeta[] =
    neonMeta !== undefined ? neonMeta.map((r) => toProjectTaskMeta(r)) : reportEntries;
  const page = loadPage({
    idbEntries,
    localEntries: (localMeta ?? []).map((r) => toProjectTaskMeta(r)),
    localHasMore: false,
    neonEntries,
    neonHasMore: false,
    localLive,
    beforeRequested: false,
    limit: 50,
    // Same key as keyOfProjectTask (record id); meta status is display-wide.
    keyOf: (e) => e.id,
    createdAtOf: (e) => e.createdAt,
    encodeCursor: encodeProjectSyncCursor,
  });
  return { page, idbSoftOk: idbSoft.ok };
};
