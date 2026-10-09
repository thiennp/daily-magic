import { DOC_INGEST_MIN_STEPS } from "./docIngest.constants";
import { countDocSteps, splitDocFrontMatter } from "./docSkillText";
import { PROJECT_HISTORY_SKILL_DRAFT_MAX_BODY_BYTES } from "./projectHistory.constants";
import { projectHistorySkillgenTextHasResidualSecret } from "./scrubProjectHistorySkillgenSecrets";

export type DocSkillValidation =
  | { readonly ok: true; readonly stepCount: number }
  | {
      readonly ok: false;
      readonly reason:
        | "missing_frontmatter"
        | "invalid_name"
        | "missing_description"
        | "description_repeats_name"
        | "missing_source"
        | "too_few_steps"
        | "residual_secret"
        | "absolute_path_or_email"
        | "body_too_large";
    };

const NAME_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;
const SOURCE_RE = /^[\w./-]+@[0-9a-f]{40}$/;
/** A person's home directory: /Users/<name>, /home/<name>, C:\\Users\\<name>. System and ~/ paths are product facts. */
const ABSOLUTE_PATH =
  /(?:^|[\s"'(=:])\/(?:Users|home)\/[^\s/]+|\b[A-Z]:\\Users\\/;
const EMAIL = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

/**
 * Doc-mode check of a generated SKILL.md. Unlike run-derived drafts there is
 * no `source_message_ids`; the proof of origin is `source: path@sha`. Relative
 * paths, ids and https URLs are fine here, secrets, absolute paths and
 * emails are not.
 */
export const validateDocSkillDraft = (markdown: string): DocSkillValidation => {
  const { fm, body } = splitDocFrontMatter(markdown);
  if (Object.keys(fm).length === 0) {
    return { ok: false, reason: "missing_frontmatter" };
  }
  if (!NAME_RE.test(fm.name ?? "")) {
    return { ok: false, reason: "invalid_name" };
  }
  if ((fm.description ?? "").length === 0) {
    return { ok: false, reason: "missing_description" };
  }
  if ((fm.description ?? "").toLowerCase() === fm.name) {
    return { ok: false, reason: "description_repeats_name" };
  }
  if (!SOURCE_RE.test(fm.source ?? "")) {
    return { ok: false, reason: "missing_source" };
  }
  if (projectHistorySkillgenTextHasResidualSecret(markdown)) {
    return { ok: false, reason: "residual_secret" };
  }
  if (ABSOLUTE_PATH.test(markdown) || EMAIL.test(markdown)) {
    return { ok: false, reason: "absolute_path_or_email" };
  }
  if (
    Buffer.byteLength(markdown, "utf8") >
    PROJECT_HISTORY_SKILL_DRAFT_MAX_BODY_BYTES
  ) {
    return { ok: false, reason: "body_too_large" };
  }
  const stepCount = countDocSteps(body);
  return stepCount < DOC_INGEST_MIN_STEPS
    ? { ok: false, reason: "too_few_steps" }
    : { ok: true, stepCount };
};
