import { PROJECT_ACTIVITY_SAFE_DETAIL_KEYS } from "@/lib/projects/acl/projectActivityAllowlist.constant";

export type ProjectActivitySafeDetail = Readonly<
  Record<string, string | boolean | null>
>;

/** Strip non-allowlisted detail keys — never return reason/body/token/paths. */
export const sanitizeProjectActivityDetail = (
  detail: Readonly<Record<string, unknown>> | null | undefined,
): ProjectActivitySafeDetail => {
  if (detail === null || detail === undefined) {
    return {};
  }
  const out: Record<string, string | boolean | null> = {};
  for (const key of PROJECT_ACTIVITY_SAFE_DETAIL_KEYS) {
    if (!(key in detail)) {
      continue;
    }
    const value = detail[key];
    if (
      typeof value === "string" ||
      typeof value === "boolean" ||
      value === null
    ) {
      out[key] = value;
    } else if (typeof value === "number" && Number.isFinite(value)) {
      out[key] = String(value);
    }
  }
  return out;
};
