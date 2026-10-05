import { isProjectDisplayNameTaken } from "@/lib/projects/acl/displayNames/isProjectDisplayNameTaken";
import { validateProjectDisplayName } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";

export type HumanAcceptDisplayNameResult =
  | { readonly ok: true; readonly name: string }
  | {
      readonly ok: false;
      readonly code:
        | "display_name_invalid"
        | "display_name_reserved"
        | "display_name_required"
        | "display_name_taken";
      /** Prefill for S1 accept page retry. */
      readonly suggestedProjectDisplayName: string | null;
    };

const mapValidationFail = (
  code: "missing" | "invalid" | "reserved" | "too_long" | "too_short",
): Extract<HumanAcceptDisplayNameResult, { ok: false }>["code"] => {
  if (code === "reserved") return "display_name_reserved";
  if (code === "missing") return "display_name_required";
  return "display_name_invalid";
};

/**
 * Resolve the project nickname for human accept.
 * Reuses validateProjectDisplayName + isProjectDisplayNameTaken (bot redeem path).
 * Name is required: body suggestion, else derive from account name via the same validator.
 */
export const resolveHumanAcceptDisplayName = async (input: {
  readonly projectId: string;
  readonly suggestedProjectDisplayName?: string | null;
  readonly accountName?: string | null;
}): Promise<HumanAcceptDisplayNameResult> => {
  const rawSuggested = input.suggestedProjectDisplayName;
  const hasSuggestion =
    rawSuggested !== undefined &&
    rawSuggested !== null &&
    String(rawSuggested).trim().length > 0;

  const candidate = hasSuggestion
    ? String(rawSuggested)
    : typeof input.accountName === "string"
      ? input.accountName
      : "";

  const prefill =
    typeof candidate === "string" && candidate.trim().length > 0
      ? candidate.trim()
      : null;

  const validated = validateProjectDisplayName(candidate);
  if (!validated.ok) {
    return {
      ok: false,
      code: mapValidationFail(validated.code),
      suggestedProjectDisplayName: prefill,
    };
  }

  const taken = await isProjectDisplayNameTaken({
    projectId: input.projectId,
    displayNameKey: validated.key,
    softCheckPending: true,
  });
  if (taken) {
    return {
      ok: false,
      code: "display_name_taken",
      suggestedProjectDisplayName: validated.name,
    };
  }
  return { ok: true, name: validated.name };
};
