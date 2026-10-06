import { isBoolean } from "guardz";

import { parseRunsWithoutApprovalResponse } from "@/features/projects/settings/runsWithoutApproval/parseRunsWithoutApprovalResponse";
import type { RunsWithoutApprovalResult } from "@/features/projects/settings/runsWithoutApproval/runsWithoutApproval.type";

/**
 * Owner GET (no `value`) or PUT (with `value`) of
 * /api/projects/:id/access/runs-without-approval (S0-2).
 */
export const requestProjectRunsWithoutApproval = async (input: {
  readonly projectId: string;
  readonly value?: boolean;
  readonly signal?: AbortSignal;
}): Promise<RunsWithoutApprovalResult> => {
  const isWrite = isBoolean(input.value);
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(input.projectId)}/access/runs-without-approval`,
      {
        method: isWrite ? "PUT" : "GET",
        signal: input.signal,
        ...(isWrite
          ? {
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ allowRunsWithoutApproval: input.value }),
            }
          : {}),
      },
    );
    const data: unknown = await response.json().catch(() => null);
    return parseRunsWithoutApprovalResponse(response.ok, data);
  } catch {
    return { ok: false };
  }
};
