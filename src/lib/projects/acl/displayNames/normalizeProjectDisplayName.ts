import { PROJECT_DISPLAY_NAME_RESERVED } from "@/lib/projects/acl/displayNames/projectDisplayNamePresets.constant";

const RESERVED = new Set(
  PROJECT_DISPLAY_NAME_RESERVED.map((n) => n.toLocaleLowerCase("en-US")),
);

/** Trim + Unicode casefold for uniqueness comparisons. */
export const normalizeProjectDisplayNameKey = (value: string): string =>
  value.trim().toLocaleLowerCase("en-US");

export type ProjectDisplayNameValidation =
  | { readonly ok: true; readonly name: string; readonly key: string }
  | {
      readonly ok: false;
      readonly code: "missing" | "invalid" | "reserved" | "too_long" | "too_short";
    };

const NAME_RE = /^[\p{L}][\p{L}\p{M}'-]{0,31}$/u;

export const validateProjectDisplayName = (
  raw: unknown,
): ProjectDisplayNameValidation => {
  if (typeof raw !== "string") {
    return { ok: false, code: "missing" };
  }
  const name = raw.trim();
  if (name.length === 0) {
    return { ok: false, code: "missing" };
  }
  if (name.length < 2) {
    return { ok: false, code: "too_short" };
  }
  if (name.length > 32) {
    return { ok: false, code: "too_long" };
  }
  if (/[\u0000-\u001f\u007f]/.test(name) || /[/@]/.test(name)) {
    return { ok: false, code: "invalid" };
  }
  if (!NAME_RE.test(name)) {
    return { ok: false, code: "invalid" };
  }
  const key = normalizeProjectDisplayNameKey(name);
  if (RESERVED.has(key)) {
    return { ok: false, code: "reserved" };
  }
  return { ok: true, name, key };
};
