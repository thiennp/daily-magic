import { PROJECT_HISTORY_SKILL_QUALIFY_MIN_MESSAGES } from "./projectHistory.constants";

export type QualifyProjectHistorySkillgenEpisodeInput = {
  readonly messageCount: number;
  /** Owner explicitly marked the stretch "save as skill". */
  readonly ownerMarkedSaveAsSkill: boolean;
  /**
   * Rules-only success signal: done / landed / tests green / thumbs-up
   * (caller derives the boolean from message text or flags).
   */
  readonly hasSuccessSignal: boolean;
  readonly minMessages?: number;
};

export type QualifyProjectHistorySkillgenEpisodeResult =
  | { readonly ok: true; readonly reason: "owner_mark" | "success_signal" }
  | {
      readonly ok: false;
      readonly reason: "too_short" | "no_success_signal";
    };

/**
 * Step 4 — qualify (rules only; Ollama triage is an optional later add-on).
 * Owner mark bypasses the success-signal requirement but still needs min length
 * unless the mark itself is present with at least one message.
 */
export const qualifyProjectHistorySkillgenEpisode = (
  input: QualifyProjectHistorySkillgenEpisodeInput,
): QualifyProjectHistorySkillgenEpisodeResult => {
  const minMessages =
    input.minMessages ?? PROJECT_HISTORY_SKILL_QUALIFY_MIN_MESSAGES;
  const count = Math.max(0, input.messageCount);

  if (input.ownerMarkedSaveAsSkill) {
    if (count < 1) {
      return { ok: false, reason: "too_short" };
    }
    return { ok: true, reason: "owner_mark" };
  }

  if (count < minMessages) {
    return { ok: false, reason: "too_short" };
  }
  if (!input.hasSuccessSignal) {
    return { ok: false, reason: "no_success_signal" };
  }
  return { ok: true, reason: "success_signal" };
};

const SUCCESS_SIGNAL_RE =
  /\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i;

/** Rules-only helper: detect a success phrase in concatenated message text. */
export const detectProjectHistorySkillgenSuccessSignal = (
  text: string,
): boolean => SUCCESS_SIGNAL_RE.test(text);

const OWNER_MARK_RE =
  /\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i;

/** Rules-only helper: detect an owner "save as skill" mark in text. */
export const detectProjectHistorySkillgenOwnerMark = (text: string): boolean =>
  OWNER_MARK_RE.test(text);
