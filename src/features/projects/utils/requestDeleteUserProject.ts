import { AWC_PROJECT_DELETE_COPY } from "@/features/projects/public-api/types";

export type DeleteUserProjectRequestResult =
  { readonly ok: true } | { readonly ok: false; readonly errorMessage: string };

/** Shared DELETE /api/projects/[projectId] call + error mapping. */
const requestDeleteUserProject = async (
  projectId: string,
): Promise<DeleteUserProjectRequestResult> => {
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(projectId)}`,
      { method: "DELETE" },
    );
    const body: unknown = await response.json().catch(() => null);

    if (response.ok) {
      return { ok: true };
    }

    if (response.status === 403) {
      return {
        ok: false,
        errorMessage: AWC_PROJECT_DELETE_COPY.ownerOnlyError,
      };
    }

    const message =
      typeof body === "object" &&
      body !== null &&
      typeof (body as { errorMessage?: unknown }).errorMessage === "string"
        ? (body as { errorMessage: string }).errorMessage
        : AWC_PROJECT_DELETE_COPY.genericError;

    return { ok: false, errorMessage: message };
  } catch {
    return { ok: false, errorMessage: AWC_PROJECT_DELETE_COPY.genericError };
  }
};

export default requestDeleteUserProject;
