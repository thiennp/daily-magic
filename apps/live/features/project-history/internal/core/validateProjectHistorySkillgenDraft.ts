import {
  PROJECT_HISTORY_SKILL_DRAFT_MAX_BODY_BYTES,
  PROJECT_HISTORY_SKILL_DRAFT_MIN_STEPS,
} from "./projectHistory.constants";
import { findProjectHistorySkillgenIdentifiers } from "./scrubProjectHistorySkillgenIdentifiers";
import { projectHistorySkillgenTextHasResidualSecret } from "./scrubProjectHistorySkillgenSecrets";

export type ValidateProjectHistorySkillgenDraftInput = {
  readonly skillMarkdown: string;
  readonly minSteps?: number;
  readonly maxBodyBytes?: number;
  /** Sender/recipient names that must not appear in the draft. */
  readonly knownNames?: readonly string[];
};

export type ValidateProjectHistorySkillgenDraftResult =
  | {
      readonly ok: true;
      readonly name: string;
      readonly description: string;
      readonly version: string;
      readonly sourceMessageIds: readonly string[];
      readonly stepCount: number;
      readonly bodyBytes: number;
    }
  | {
      readonly ok: false;
      readonly reason:
        | "empty"
        | "missing_frontmatter"
        | "invalid_name"
        | "missing_description"
        | "description_repeats_name"
        | "not_reusable"
        | "missing_version"
        | "missing_status_draft"
        | "missing_source_message_ids"
        | "too_few_steps"
        | "residual_secret"
        | "body_too_large";
    };

const NAME_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const parseFrontmatter = (
  markdown: string,
): { readonly fm: Record<string, string>; readonly body: string } | null => {
  const trimmed = markdown.replace(/^\uFEFF/, "");
  if (!trimmed.startsWith("---")) {
    return null;
  }
  const end = trimmed.indexOf("\n---", 3);
  if (end < 0) {
    return null;
  }
  const raw = trimmed.slice(3, end).replace(/^\r?\n/, "");
  const body = trimmed.slice(end + 4).replace(/^\r?\n/, "");
  const fm: Record<string, string> = {};
  for (const line of raw.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx <= 0) {
      continue;
    }
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (key.length > 0) {
      fm[key] = value;
    }
  }
  return { fm, body };
};

const countSteps = (body: string): number => {
  const stepsSection = body.match(
    /(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i,
  );
  const section = stepsSection?.[1] ?? body;
  const items = section.match(/^\s*(?:\d+\.|[-*])\s+\S+/gm);
  return items?.length ?? 0;
};

const parseSourceIds = (raw: string | undefined): readonly string[] | null => {
  if (raw === undefined || raw.trim().length === 0) {
    return null;
  }
  const trimmed = raw.trim();
  if (trimmed.startsWith("[")) {
    try {
      const parsed: unknown = JSON.parse(trimmed.replace(/'/g, '"'));
      if (!Array.isArray(parsed)) {
        return null;
      }
      return parsed.filter((x): x is string => typeof x === "string");
    } catch {
      return trimmed
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter((s) => s.length > 0);
    }
  }
  return trimmed
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
};

/**
 * Step 11 — validate draft (frontmatter, ≥2 steps, no secrets, size cap).
 * Local rules only; no LLM.
 */
export const validateProjectHistorySkillgenDraft = (
  input: ValidateProjectHistorySkillgenDraftInput,
): ValidateProjectHistorySkillgenDraftResult => {
  const minSteps = input.minSteps ?? PROJECT_HISTORY_SKILL_DRAFT_MIN_STEPS;
  const maxBodyBytes =
    input.maxBodyBytes ?? PROJECT_HISTORY_SKILL_DRAFT_MAX_BODY_BYTES;
  const markdown = input.skillMarkdown;
  if (markdown.trim().length === 0) {
    return { ok: false, reason: "empty" };
  }
  const bodyBytes = Buffer.byteLength(markdown, "utf8");
  if (bodyBytes > maxBodyBytes) {
    return { ok: false, reason: "body_too_large" };
  }
  if (projectHistorySkillgenTextHasResidualSecret(markdown)) {
    return { ok: false, reason: "residual_secret" };
  }
  const parsed = parseFrontmatter(markdown);
  if (parsed === null) {
    return { ok: false, reason: "missing_frontmatter" };
  }
  const { fm, body } = parsed;
  const name = fm.name ?? "";
  if (!NAME_RE.test(name)) {
    return { ok: false, reason: "invalid_name" };
  }
  const description = fm.description ?? "";
  if (description.trim().length === 0) {
    return { ok: false, reason: "missing_description" };
  }
  if (slugify(description) === slugify(name)) {
    return { ok: false, reason: "description_repeats_name" };
  }
  const bodyAndName = `${name}\n${description}\n${body}`;
  if (
    findProjectHistorySkillgenIdentifiers(bodyAndName, input.knownNames)
      .length > 0
  ) {
    return { ok: false, reason: "not_reusable" };
  }
  const version = fm.version ?? "";
  if (version.trim().length === 0) {
    return { ok: false, reason: "missing_version" };
  }
  if ((fm.status ?? "").trim() !== "draft") {
    return { ok: false, reason: "missing_status_draft" };
  }
  const sourceMessageIds = parseSourceIds(
    fm.source_message_ids ?? fm["source_message_ids"],
  );
  if (sourceMessageIds === null || sourceMessageIds.length === 0) {
    return { ok: false, reason: "missing_source_message_ids" };
  }
  const stepCount = countSteps(body);
  if (stepCount < minSteps) {
    return { ok: false, reason: "too_few_steps" };
  }
  return {
    ok: true,
    name,
    description,
    version,
    sourceMessageIds,
    stepCount,
    bodyBytes,
  };
};

/** Extract ordered step lines for near-duplicate fingerprinting. */
export const extractProjectHistorySkillgenStepLines = (
  skillMarkdown: string,
): readonly string[] => {
  const parsed = parseFrontmatter(skillMarkdown);
  const body = parsed?.body ?? skillMarkdown;
  const stepsSection = body.match(
    /(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i,
  );
  const section = stepsSection?.[1] ?? "";
  const items = section.match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm) ?? [];
  return items.map((line) => line.replace(/^\s*(?:\d+\.|[-*])\s+/, "").trim());
};
