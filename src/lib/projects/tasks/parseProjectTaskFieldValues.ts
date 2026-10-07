import { scrubOutboundSecrets } from "@agent-witch/shared/dispatch";
import {
  PROJECT_TASK_DEPENDS_ON_MAX,
  PROJECT_TASK_DESCRIPTION_MAX_CHARS,
  PROJECT_TASK_TIP_SHA_PATTERN,
  PROJECT_TASK_TITLE_MAX_CHARS,
} from "@/lib/projects/tasks/projectTaskTools.constant";

/** Single-field validators for project task meta (DF-024). */
export type ProjectTaskFieldError =
  | "title_required"
  | "title_too_long"
  | "description_too_long"
  | "invalid_priority"
  | "invalid_stage"
  | "invalid_tip_sha"
  | "invalid_owner"
  | "invalid_depends_on"
  | "too_many_depends_on"
  | "invalid_plan_item";

export type ProjectTaskFieldResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly code: ProjectTaskFieldError };

export const ok = <T>(value: T): ProjectTaskFieldResult<T> => ({
  ok: true,
  value,
});
export const fail = (
  code: ProjectTaskFieldError,
): ProjectTaskFieldResult<never> => ({ ok: false, code });
export const isBlank = (v: unknown): boolean =>
  v === null || (typeof v === "string" && v.trim().length === 0);
export const oneOf = <T extends string>(
  list: readonly T[],
  v: unknown,
): T | null =>
  typeof v === "string" &&
  (list as readonly string[]).includes(v.trim().toLowerCase())
    ? (v.trim().toLowerCase() as T)
    : null;
const scrub = (text: string): string =>
  scrubOutboundSecrets(text).scrubbed.trim();

export const parseTitle = (v: unknown): ProjectTaskFieldResult<string> => {
  const title = typeof v === "string" ? scrub(v) : "";
  if (title.length === 0) return fail("title_required");
  return title.length > PROJECT_TASK_TITLE_MAX_CHARS
    ? fail("title_too_long")
    : ok(title);
};

export const parseDescription = (
  v: unknown,
): ProjectTaskFieldResult<string | null> => {
  if (isBlank(v)) return ok(null);
  if (typeof v !== "string") return fail("description_too_long");
  const text = scrub(v);
  return text.length > PROJECT_TASK_DESCRIPTION_MAX_CHARS
    ? fail("description_too_long")
    : ok(text.length > 0 ? text : null);
};

export const parseTipSha = (
  v: unknown,
): ProjectTaskFieldResult<string | null> => {
  if (isBlank(v)) return ok(null);
  const sha = typeof v === "string" ? v.trim().toLowerCase() : "";
  return PROJECT_TASK_TIP_SHA_PATTERN.test(sha)
    ? ok(sha)
    : fail("invalid_tip_sha");
};

export const parseDependsOn = (
  v: unknown,
): ProjectTaskFieldResult<readonly string[]> => {
  if (!Array.isArray(v)) return fail("invalid_depends_on");
  const ids = v.map((id) => (typeof id === "string" ? id.trim() : ""));
  if (ids.some((id) => id.length === 0)) return fail("invalid_depends_on");
  const unique = [...new Set(ids)];
  return unique.length > PROJECT_TASK_DEPENDS_ON_MAX
    ? fail("too_many_depends_on")
    : ok(unique);
};
