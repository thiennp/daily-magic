const DEFAULT_MAX_LABEL_LENGTH = 72;

/** Compact one-line label for a past run in the Send-a-task picker. */
export const buildSendTaskComposerHistoryPickerLabel = (
  prompt: string,
  maxLength: number = DEFAULT_MAX_LABEL_LENGTH,
): string => {
  const compact = prompt.trim().replace(/\s+/g, " ");
  if (compact.length === 0) {
    return "Previous task";
  }

  if (compact.length <= maxLength) {
    return compact;
  }

  return `${compact.slice(0, Math.max(1, maxLength - 1))}…`;
};
