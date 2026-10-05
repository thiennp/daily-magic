import { isBoolean, isNonNullObject, isString } from "guardz";

export type ProjectComputerHistoryToggleView =
  { readonly ok: true; readonly enabled: boolean } | { readonly ok: false };

/**
 * Owner GET (no `enabled`) or PATCH (with `enabled`) of the project computer
 * history opt-in. Any state other than off reads as enabled.
 */
export const requestProjectComputerHistory = async (input: {
  readonly projectId: string;
  readonly enabled?: boolean;
  readonly signal?: AbortSignal;
}): Promise<ProjectComputerHistoryToggleView> => {
  const isWrite = isBoolean(input.enabled);
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(input.projectId)}/computer-history`,
      {
        method: isWrite ? "PATCH" : "GET",
        signal: input.signal,
        ...(isWrite
          ? {
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ enabled: input.enabled }),
            }
          : {}),
      },
    );
    const data: unknown = await response.json().catch(() => null);
    if (!response.ok || !isNonNullObject(data) || !isString(data.state)) {
      return { ok: false };
    }
    return { ok: true, enabled: data.state !== "off" };
  } catch {
    return { ok: false };
  }
};
