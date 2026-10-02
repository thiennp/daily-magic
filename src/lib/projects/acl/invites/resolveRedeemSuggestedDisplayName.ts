import { isProjectDisplayNameTaken } from "@/lib/projects/acl/displayNames/isProjectDisplayNameTaken";
import { validateProjectDisplayName } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";

export type RedeemSuggestedNameResult =
  | { readonly ok: true; readonly name: string | null }
  | {
      readonly ok: false;
      readonly code:
        | "display_name_invalid"
        | "display_name_reserved"
        | "display_name_required"
        | "display_name_taken";
    };

const mapValidationFail = (
  code: "missing" | "invalid" | "reserved" | "too_long" | "too_short",
): Extract<RedeemSuggestedNameResult, { ok: false }>["code"] => {
  if (code === "reserved") return "display_name_reserved";
  if (code === "missing") return "display_name_required";
  return "display_name_invalid";
};

/** Validate optional redeem suggestion; soft-check pending collisions. */
export const resolveRedeemSuggestedDisplayName = async (input: {
  readonly projectId: string;
  readonly suggestedProjectDisplayName?: string | null;
}): Promise<RedeemSuggestedNameResult> => {
  const raw = input.suggestedProjectDisplayName;
  if (raw === undefined || raw === null || String(raw).trim().length === 0) {
    return { ok: true, name: null };
  }
  const validated = validateProjectDisplayName(raw);
  if (!validated.ok) {
    return { ok: false, code: mapValidationFail(validated.code) };
  }
  const taken = await isProjectDisplayNameTaken({
    projectId: input.projectId,
    displayNameKey: validated.key,
    softCheckPending: true,
  });
  if (taken) {
    return { ok: false, code: "display_name_taken" };
  }
  return { ok: true, name: validated.name };
};
