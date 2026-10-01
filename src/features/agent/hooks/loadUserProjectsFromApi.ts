import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";

export type LoadUserProjectsFromApiSuccess = {
  readonly ok: true;
  readonly projects: readonly UserProjectRecord[];
  readonly compositionCountsByProjectId: Readonly<
    Record<string, ProjectCompositionCounts>
  >;
};

export type LoadUserProjectsFromApiFailure = {
  readonly ok: false;
};

export type LoadUserProjectsFromApiResult =
  LoadUserProjectsFromApiSuccess | LoadUserProjectsFromApiFailure;

const loadUserProjectsFromApi = async (
  deviceId: string,
): Promise<LoadUserProjectsFromApiResult> => {
  const query =
    deviceId.length > 0 ? `?deviceId=${encodeURIComponent(deviceId)}` : "";
  const response = await fetch(`/api/projects${query}`);

  if (!response.ok) {
    return { ok: false };
  }

  const data: unknown = await response.json();

  if (
    typeof data === "object" &&
    data !== null &&
    "projects" in data &&
    Array.isArray((data as { projects: unknown }).projects)
  ) {
    const record = data as {
      projects: UserProjectRecord[];
      compositionCountsByProjectId?: Record<string, ProjectCompositionCounts>;
    };

    return {
      ok: true,
      projects: record.projects,
      compositionCountsByProjectId: record.compositionCountsByProjectId ?? {},
    };
  }

  return { ok: false };
};

export default loadUserProjectsFromApi;
