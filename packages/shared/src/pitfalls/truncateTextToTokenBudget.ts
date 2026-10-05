import { estimateTokenCount } from "./estimateTokenCount";

/** Truncate text so estimateTokenCount(result) <= maxTokens (never empty-drop). */
export const truncateTextToTokenBudget = (
  text: string,
  maxTokens: number,
): string => {
  if (maxTokens <= 0) {
    return "";
  }
  if (estimateTokenCount(text) <= maxTokens) {
    return text;
  }
  const maxChars = maxTokens * 4;
  return text.slice(0, maxChars).trimEnd();
};
