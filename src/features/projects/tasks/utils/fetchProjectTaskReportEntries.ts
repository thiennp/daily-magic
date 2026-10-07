import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import { mapAgentRunToProjectTaskMeta } from "@/features/projects/tasks/utils/mapAgentRunToProjectTaskMeta";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export type ProjectTaskReportEntries = {
  readonly entries: readonly ProjectTaskMeta[];
  /** Request failed or the body had no `runs` list (entries stay empty). */
  readonly failed: boolean;
  /** Aborted by the caller (unmount / reload) — ignore the result. */
  readonly aborted: boolean;
};

const runsOf = (data: unknown): EnrichedAgentRunRecord[] | null =>
  typeof data === "object" &&
  data !== null &&
  "runs" in data &&
  Array.isArray((data as { runs: unknown }).runs)
    ? (data as { runs: EnrichedAgentRunRecord[] }).runs
    : null;

/** Reports (agent_runs) for one project → task meta rows for the Tasks chrome. */
export const fetchProjectTaskReportEntries = async (
  projectId: string,
  signal: AbortSignal,
): Promise<ProjectTaskReportEntries> => {
  const empty = { entries: [], failed: true, aborted: false };
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(projectId)}/reports`,
      { signal },
    );
    if (!response.ok) return empty;
    const list = runsOf(await response.json());
    if (list === null) return empty;
    const entries = list
      .filter((run) => run.projectId === projectId)
      .map((run) => mapAgentRunToProjectTaskMeta(run, projectId));
    return { entries, failed: false, aborted: false };
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ...empty, failed: false, aborted: true };
    }
    return empty;
  }
};
