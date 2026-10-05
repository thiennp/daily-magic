import loadUserProjectsFromApi from "@/features/agent/hooks/loadUserProjectsFromApi";
import { readLastSaveProjectId } from "@/features/capabilities/utils/lastSaveProjectStore";
import { resolveSaveToProjectDefault } from "@/lib/projects/resolveSaveToProjectDefault";

export const CREATE_PROJECT_REQUIRED_MESSAGE =
  "Create or open a project before saving to your library.";

export type ResolveCreateTargetProjectIdResult =
  | { readonly ok: true; readonly projectId: string }
  | { readonly ok: false; readonly errorMessage: string };

/**
 * Resolve project_id for library create/fork callers.
 * Explicit id wins; else Default → Personal (same as save picker), using last-used as a hint.
 */
export const resolveCreateTargetProjectId = async (input?: {
  readonly projectId?: string | null;
  readonly contextProjectId?: string | null;
}): Promise<ResolveCreateTargetProjectIdResult> => {
  const explicit = input?.projectId?.trim() ?? "";
  if (explicit.length > 0) {
    return { ok: true, projectId: explicit };
  }

  const loaded = await loadUserProjectsFromApi("");
  if (!loaded.ok) {
    return {
      ok: false,
      errorMessage: CREATE_PROJECT_REQUIRED_MESSAGE,
    };
  }

  const projectId = resolveSaveToProjectDefault({
    projects: loaded.projects,
    contextProjectId: input?.contextProjectId,
    lastUsedProjectId: readLastSaveProjectId(),
  });

  if (projectId.length === 0) {
    return {
      ok: false,
      errorMessage: CREATE_PROJECT_REQUIRED_MESSAGE,
    };
  }

  return { ok: true, projectId };
};
