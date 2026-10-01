import loadUserProjectsFromApi from "@/features/agent/hooks/loadUserProjectsFromApi";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export type UserProjectsFetchOutcome =
  | {
      readonly ok: true;
      readonly projects: readonly UserProjectRecord[];
      readonly compositionCountsByProjectId: Readonly<
        Record<string, ProjectCompositionCounts>
      >;
    }
  | { readonly ok: false };

export const runUserProjectsFetch = async (
  deviceId: string,
): Promise<UserProjectsFetchOutcome> => {
  const loaded = await loadUserProjectsFromApi(deviceId);

  if (!loaded.ok) {
    return { ok: false };
  }

  return {
    ok: true,
    projects: loaded.projects,
    compositionCountsByProjectId: loaded.compositionCountsByProjectId,
  };
};
