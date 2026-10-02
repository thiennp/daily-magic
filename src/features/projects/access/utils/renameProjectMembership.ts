import type { AwcAccessActionResult } from "@/features/projects/access/types/awcProjectAccessContract.type";
import {
  isValidProjectDisplayName,
  mapAccessActionHttpError,
} from "@/features/projects/access/utils/projectDisplayName.helpers";

export const renameProjectMembership = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly projectDisplayName: string;
}): Promise<AwcAccessActionResult> => {
  const name = input.projectDisplayName.trim();
  if (!isValidProjectDisplayName(name)) {
    return {
      ok: false,
      status: 400,
      errorMessage:
        "Invalid project nickname (2–32 letters; reserved names blocked).",
      code: "name_invalid",
    };
  }

  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(input.projectId)}/memberships/${encodeURIComponent(input.membershipId)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDisplayName: name }),
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
      errorMessage: "Could not rename member.",
      code: "other",
    };
  }
};
