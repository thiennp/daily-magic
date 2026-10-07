import { parseProjectConnectionsResponse } from "@/features/projects/settings/connections/parseProjectConnectionsResponse";
import type { ProjectConnectionsFetchResult } from "@/features/projects/settings/connections/projectConnection.types";

/** GET /api/projects/:id/connections — metadata only (API-BRIEF). */
export const requestProjectConnections = async (input: {
  readonly projectId: string;
  readonly signal?: AbortSignal;
}): Promise<ProjectConnectionsFetchResult> => {
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(input.projectId)}/connections`,
      { method: "GET", signal: input.signal },
    );
    const data: unknown = await response.json().catch(() => null);
    return parseProjectConnectionsResponse(
      response.status,
      response.ok,
      data,
    );
  } catch {
    // Network / deploy without the route — honest unavailable, not a fake error.
    return { ok: false, reason: "unavailable" };
  }
};
