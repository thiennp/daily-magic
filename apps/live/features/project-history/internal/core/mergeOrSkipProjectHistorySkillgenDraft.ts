import { PROJECT_HISTORY_SKILL_NEAR_DUP_STEP_JACCARD } from "./projectHistory.constants";

export type ProjectHistorySkillgenDraftFingerprint = {
  readonly id: string;
  readonly contentHash: string;
  readonly name: string;
  readonly stepLines: readonly string[];
};

export type MergeOrSkipProjectHistorySkillgenDraftInput = {
  readonly contentHash: string;
  readonly name: string;
  readonly stepLines: readonly string[];
  readonly existingDrafts: readonly ProjectHistorySkillgenDraftFingerprint[];
  readonly existingPublished: readonly ProjectHistorySkillgenDraftFingerprint[];
  readonly nearDupJaccard?: number;
};

export type MergeOrSkipProjectHistorySkillgenDraftResult =
  | { readonly action: "skip_exact"; readonly matchKind: "draft" | "published"; readonly matchId: string }
  | { readonly action: "update_draft"; readonly draftId: string; readonly reason: "same_name" | "similar_steps" }
  | { readonly action: "create_new" };

const normalizeName = (name: string): string =>
  name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const normalizeStep = (line: string): string =>
  line.trim().toLowerCase().replace(/\s+/g, " ");

const jaccard = (a: readonly string[], b: readonly string[]): number => {
  const setA = new Set(a.map(normalizeStep).filter((s) => s.length > 0));
  const setB = new Set(b.map(normalizeStep).filter((s) => s.length > 0));
  if (setA.size === 0 || setB.size === 0) {
    return 0;
  }
  let inter = 0;
  for (const item of setA) {
    if (setB.has(item)) {
      inter += 1;
    }
  }
  const union = setA.size + setB.size - inter;
  return union === 0 ? 0 : inter / union;
};

/**
 * Step 9 — merge or skip by exact contentHash and rules-based near-duplicate.
 * No embeddings. Exact hash → skip; same name or similar steps → update draft;
 * otherwise create_new (caller proceeds to EXTRACT).
 */
export const mergeOrSkipProjectHistorySkillgenDraft = (
  input: MergeOrSkipProjectHistorySkillgenDraftInput,
): MergeOrSkipProjectHistorySkillgenDraftResult => {
  const threshold =
    input.nearDupJaccard ?? PROJECT_HISTORY_SKILL_NEAR_DUP_STEP_JACCARD;
  const nameKey = normalizeName(input.name);

  for (const published of input.existingPublished) {
    if (published.contentHash === input.contentHash) {
      return {
        action: "skip_exact",
        matchKind: "published",
        matchId: published.id,
      };
    }
  }
  for (const draft of input.existingDrafts) {
    if (draft.contentHash === input.contentHash) {
      return {
        action: "skip_exact",
        matchKind: "draft",
        matchId: draft.id,
      };
    }
  }

  for (const draft of input.existingDrafts) {
    if (normalizeName(draft.name) === nameKey && nameKey.length > 0) {
      return {
        action: "update_draft",
        draftId: draft.id,
        reason: "same_name",
      };
    }
    if (jaccard(input.stepLines, draft.stepLines) >= threshold) {
      return {
        action: "update_draft",
        draftId: draft.id,
        reason: "similar_steps",
      };
    }
  }

  return { action: "create_new" };
};
