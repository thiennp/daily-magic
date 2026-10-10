import { AWC_PROJECT_LEAVE_COPY } from "@/features/projects/public-api/types";

export type LeaveUserProjectRequestResult =
  { readonly ok: true } | { readonly ok: false; readonly errorMessage: string };

/** Shared POST /api/projects/[projectId]/leave + error mapping. */
const requestLeaveUserProject = async (
  projectId: string,
): Promise<LeaveUserProjectRequestResult> => {
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(projectId)}/leave`,
      { method: "POST" },
    );
    const body: unknown = await response.json().catch(() => null);

    if (response.ok) {
      return { ok: true };
    }

    if (response.status === 403) {
      return {
        ok: false,
        errorMessage: AWC_PROJECT_LEAVE_COPY.ownerCannotLeave,
      };
    }

    const message =
      typeof body === "object" &&
      body !== null &&
      typeof (body as { errorMessage?: unknown }).errorMessage === "string"
        ? (body as { errorMessage: string }).errorMessage
        : AWC_PROJECT_LEAVE_COPY.genericError;

    return { ok: false, errorMessage: message };
  } catch {
    return { ok: false, errorMessage: AWC_PROJECT_LEAVE_COPY.genericError };
  }
};

export default requestLeaveUserProject;
