import type { UserProjectsFetchOutcome } from "@/features/agent/hooks/runUserProjectsFetch";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export const applyUserProjectsFetchOutcome = (
  outcome: UserProjectsFetchOutcome,
  setters: {
    readonly setProjects: (value: readonly UserProjectRecord[]) => void;
    readonly setCompositionCountsByProjectId: (
      value: Readonly<Record<string, ProjectCompositionCounts>>,
    ) => void;
    readonly setLoadFailed: (value: boolean) => void;
    readonly setIsLoading: (value: boolean) => void;
  },
): void => {
  if (!outcome.ok) {
    setters.setLoadFailed(true);
    setters.setIsLoading(false);
    return;
  }

  setters.setProjects(outcome.projects);
  setters.setCompositionCountsByProjectId(outcome.compositionCountsByProjectId);
  setters.setLoadFailed(false);
  setters.setIsLoading(false);
};
