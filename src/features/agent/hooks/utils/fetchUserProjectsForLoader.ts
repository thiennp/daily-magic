import { runUserProjectsFetch } from "@/features/agent/hooks/runUserProjectsFetch";
import { applyUserProjectsFetchOutcome } from "@/features/agent/hooks/utils/applyUserProjectsFetchOutcome";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export const fetchUserProjectsForLoader = async (input: {
  readonly deviceId: string;
  readonly generation: number;
  readonly showLoading: boolean;
  readonly loadGenerationRef: { readonly current: number };
  readonly isCancelled?: () => boolean;
  readonly setProjects: (value: readonly UserProjectRecord[]) => void;
  readonly setCompositionCountsByProjectId: (
    value: Readonly<Record<string, ProjectCompositionCounts>>,
  ) => void;
  readonly setLoadFailed: (value: boolean) => void;
  readonly setIsLoading: (value: boolean) => void;
}): Promise<void> => {
  const {
    deviceId,
    generation,
    showLoading,
    loadGenerationRef,
    isCancelled,
    setProjects,
    setCompositionCountsByProjectId,
    setLoadFailed,
    setIsLoading,
  } = input;

  if (showLoading) {
    setIsLoading(true);
    setLoadFailed(false);
  }

  const applyOutcome = (
    outcome: Awaited<ReturnType<typeof runUserProjectsFetch>>,
  ): void => {
    if (loadGenerationRef.current !== generation) {
      return;
    }

    if (!outcome.ok && !showLoading) {
      return;
    }

    applyUserProjectsFetchOutcome(outcome, {
      setProjects,
      setCompositionCountsByProjectId,
      setLoadFailed,
      setIsLoading,
    });
  };

  try {
    const outcome = await runUserProjectsFetch(deviceId);
    if (isCancelled?.()) {
      return;
    }
    applyOutcome(outcome);
  } catch {
    if (
      isCancelled?.() ||
      loadGenerationRef.current !== generation ||
      !showLoading
    ) {
      return;
    }
    setLoadFailed(true);
    setIsLoading(false);
  }
};
