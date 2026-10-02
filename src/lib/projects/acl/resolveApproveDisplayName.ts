import { validateProjectDisplayName } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";

export type ResolveApproveDisplayNameResult =
  | { readonly ok: true; readonly displayName: string | null }
  | {
      readonly ok: false;
      readonly code:
        | "display_name_required"
        | "display_name_invalid"
        | "display_name_reserved";
    };

export const resolveApproveDisplayName = (input: {
  readonly requesterIsAgent: boolean;
  readonly projectDisplayName?: string | null;
}): ResolveApproveDisplayNameResult => {
  if (input.requesterIsAgent) {
    const validated = validateProjectDisplayName(input.projectDisplayName);
    if (!validated.ok) {
      if (validated.code === "reserved") {
        return { ok: false, code: "display_name_reserved" };
      }
      if (validated.code === "missing") {
        return { ok: false, code: "display_name_required" };
      }
      return { ok: false, code: "display_name_invalid" };
    }
    return { ok: true, displayName: validated.name };
  }
  if (
    typeof input.projectDisplayName === "string" &&
    input.projectDisplayName.trim().length > 0
  ) {
    const validated = validateProjectDisplayName(input.projectDisplayName);
    if (!validated.ok) {
      return {
        ok: false,
        code:
          validated.code === "reserved"
            ? "display_name_reserved"
            : "display_name_invalid",
      };
    }
    return { ok: true, displayName: validated.name };
  }
  return { ok: true, displayName: null };
};
