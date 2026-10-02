import type { AwcDisplayNamePresetsResponse } from "@/features/projects/access/types/awcProjectAccessContract.type";

export type DisplayNamePresetsResult =
  | { readonly ok: true; readonly data: AwcDisplayNamePresetsResponse }
  | { readonly ok: false; readonly errorMessage: string; readonly status: number };

export const fetchDisplayNamePresets = async (
  projectId: string,
): Promise<DisplayNamePresetsResult> => {
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(projectId)}/display-name-presets`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      const body: unknown = await response.json().catch(() => null);
      const errorMessage =
        typeof body === "object" &&
        body !== null &&
        typeof (body as { errorMessage?: unknown }).errorMessage === "string"
          ? (body as { errorMessage: string }).errorMessage
          : "Display-name presets API not available yet.";
      return { ok: false, status: response.status, errorMessage };
    }
    const body = (await response.json()) as AwcDisplayNamePresetsResponse;
    if (
      !Array.isArray(body.presets) ||
      !Array.isArray(body.available) ||
      typeof body.suggested !== "string"
    ) {
      return {
        ok: false,
        status: response.status,
        errorMessage: "Invalid display-name presets response.",
      };
    }
    return { ok: true, data: body };
  } catch {
    return {
      ok: false,
      status: 0,
      errorMessage: "Display-name presets API not available yet.",
    };
  }
};
