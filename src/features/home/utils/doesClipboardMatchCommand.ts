const normalizeClipboardText = (value: string): string => value.trim();

export const doesClipboardMatchCommand = (
  command: string,
  clipboardText: string | null,
): boolean => {
  if (clipboardText === null || clipboardText.length === 0) {
    return false;
  }

  return normalizeClipboardText(clipboardText) === normalizeClipboardText(command);
};
