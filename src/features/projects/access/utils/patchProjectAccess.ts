import type {
  AwcAccessActionResult,
  AwcPatchAccessBody,
} from "@/features/projects/access/types/awcProjectAccessContract.type";
import { mapAccessActionHttpError } from "@/features/projects/access/utils/projectDisplayName.helpers";

/**
 * Owner PATCH /api/projects/:id/access — contract-locked body.
 * Eng lands handlers on feat/project-bot-invite-hooks; Product binds here only.
 */
export const patchProjectAccess = async (
  projectId: string,
  body: AwcPatchAccessBody,
): Promise<AwcAccessActionResult> => {
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(projectId)}/access`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (response.ok) {
      return { ok: true };
    }
    const payload: unknown = await response.json().catch(() => null);
    const rawMessage =
      typeof payload === "object" &&
      payload !== null &&
      typeof (payload as { errorMessage?: unknown }).errorMessage === "string"
        ? (payload as { errorMessage: string }).errorMessage
        : "";
    const mapped = mapAccessActionHttpError(response.status, rawMessage);
    return {
      ok: false,
      status: response.status,
      errorMessage: mapped.errorMessage,
      code: mapped.code,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      errorMessage: "Could not update access.",
      code: "other",
    };
  }
};
