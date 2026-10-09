import type { DocSkillDraft } from "./convertDocToSkillDraft";
import {
  DOC_INGEST_LINK_ONLY_SHARE,
  DOC_INGEST_MIN_STEPS,
} from "./docIngest.constants";
import {
  countDocSteps,
  countNumberedDocSteps,
  linkOnlyShare,
  slugifyDocName,
} from "./docSkillText";

export type DocIngestDecision =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly reason: "too_few_steps" | "mostly_links" | "already_covered";
    };

/** Existing skill ids/names that mean "this doc is already a skill" (same name or `name-xxxx`). */
const covers = (existing: string, name: string): boolean => {
  const key = slugifyDocName(existing);
  return key === name || key.startsWith(`${name}-`);
};

/**
 * Cheap, deterministic gate before a doc becomes a question: it must be
 * procedural (3+ steps), not a page of pointers, and not already a skill.
 */
export const shouldIngestDoc = (
  draft: DocSkillDraft,
  existingNames: readonly string[],
): DocIngestDecision => {
  if (existingNames.some((existing) => covers(existing, draft.name))) {
    return { ok: false, reason: "already_covered" };
  }
  if (linkOnlyShare(draft.body) >= DOC_INGEST_LINK_ONLY_SHARE) {
    return { ok: false, reason: "mostly_links" };
  }
  const steps =
    draft.kind === "qa"
      ? countNumberedDocSteps(draft.body)
      : countDocSteps(draft.body);
  return steps < DOC_INGEST_MIN_STEPS
    ? { ok: false, reason: "too_few_steps" }
    : { ok: true };
};
