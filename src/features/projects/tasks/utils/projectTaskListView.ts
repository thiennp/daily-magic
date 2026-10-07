import type { ProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";

/** Assistant filter options: trimmed name when known, else membership id. */
export const listProjectTaskAssistants = (
  allTasks: readonly ProjectTaskMeta[],
): readonly { readonly id: string; readonly name: string }[] => {
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
};

/** Tasks list after the assistant + status filters. */
export const filterProjectTasks = (
  allTasks: readonly ProjectTaskMeta[],
  assistantFilter: string | "all",
  statusFilter: ProjectTaskDisplayStatus | "all",
): readonly ProjectTaskMeta[] =>
  allTasks.filter((t) => {
    if (assistantFilter !== "all") {
      const label = t.assistantName?.trim() || t.assistantMembershipId || "";
      if (label !== assistantFilter) return false;
    }
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    return true;
  });
