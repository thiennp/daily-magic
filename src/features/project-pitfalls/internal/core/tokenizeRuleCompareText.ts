import { normalizeRuleCompareText } from "@/features/project-pitfalls/internal/core/normalizeRuleCompareText";

/** Unique token set from normalized text. Pure. */
export const tokenizeRuleCompareText = (text: string): ReadonlySet<string> => {
  const normalized = normalizeRuleCompareText(text);
  if (normalized.length === 0) {
    return new Set();
  }
  return new Set(normalized.split(" "));
};
