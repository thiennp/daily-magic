import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

export type ProjectTaskRecordTab = "all" | ProjectTaskStatus;
export type ProjectTaskRecordSortKey =
  "updated" | "created" | "priority" | "status" | "title";
export type ProjectTaskRecordSortDir = "asc" | "desc";

/** Tab order: what needs attention first, finished work last. */
export const PROJECT_TASK_RECORD_TABS: readonly ProjectTaskRecordTab[] = [
  "all",
  "in_progress",
  "blocked",
  "queued",
  "planned",
  "done",
];

export const PROJECT_TASK_RECORD_SORT_KEYS: readonly ProjectTaskRecordSortKey[] =
  ["updated", "created", "priority", "status", "title"];

/** Natural direction when a key is first chosen (newest / most urgent first). */
export const PROJECT_TASK_RECORD_DEFAULT_DIR: Record<
  ProjectTaskRecordSortKey,
  ProjectTaskRecordSortDir
> = {
  updated: "desc",
  created: "desc",
  priority: "asc",
  status: "asc",
  title: "asc",
};

const STATUS_RANK: Record<ProjectTaskStatus, number> = {
  in_progress: 0,
  blocked: 1,
  queued: 2,
  planned: 3,
  done: 4,
};

export const countProjectTaskRecordsByTab = (
  records: readonly ProjectTaskRecord[],
): Record<ProjectTaskRecordTab, number> => {
  const counts: Record<ProjectTaskRecordTab, number> = {
    all: records.length,
    in_progress: 0,
    blocked: 0,
    queued: 0,
    planned: 0,
    done: 0,
  };
  for (const r of records) counts[r.status] += 1;
  return counts;
};

export const filterProjectTaskRecordsByTab = (
  records: readonly ProjectTaskRecord[],
  tab: ProjectTaskRecordTab,
): readonly ProjectTaskRecord[] =>
  tab === "all" ? records : records.filter((r) => r.status === tab);

/** Priority p0..p3, tasks without one last in either direction. */
const priorityRank = (r: ProjectTaskRecord): number | null =>
  r.priority === null ? null : Number(r.priority.slice(1));

const byKey = (
  key: ProjectTaskRecordSortKey,
  a: ProjectTaskRecord,
  b: ProjectTaskRecord,
): number => {
  if (key === "updated") return a.updatedAt.localeCompare(b.updatedAt);
  if (key === "created") return a.createdAt.localeCompare(b.createdAt);
  if (key === "status") return STATUS_RANK[a.status] - STATUS_RANK[b.status];
  if (key === "title")
    return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
  return (priorityRank(a) ?? 0) - (priorityRank(b) ?? 0);
};

export const sortProjectTaskRecords = (
  records: readonly ProjectTaskRecord[],
  key: ProjectTaskRecordSortKey,
  dir: ProjectTaskRecordSortDir,
): readonly ProjectTaskRecord[] => {
  const sign = dir === "asc" ? 1 : -1;
  return [...records].sort((a, b) => {
    if (key === "priority") {
      const [pa, pb] = [priorityRank(a), priorityRank(b)];
      if (pa === null || pb === null) {
        if (pa === pb) return b.updatedAt.localeCompare(a.updatedAt);
        return pa === null ? 1 : -1;
      }
    }
    const diff = sign * byKey(key, a, b);
    return diff !== 0 ? diff : b.updatedAt.localeCompare(a.updatedAt);
  });
};
