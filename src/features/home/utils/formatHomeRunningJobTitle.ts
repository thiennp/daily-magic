const MAX_TITLE_CHARS = 72;

export const formatHomeRunningJobTitle = (prompt: string): string => {
  const trimmed = prompt.trim().replace(/\s+/g, " ");
  if (trimmed.length === 0) {
    return "Untitled task";
  }

  if (trimmed.length <= MAX_TITLE_CHARS) {
    return trimmed;
  }

  return `${trimmed.slice(0, MAX_TITLE_CHARS - 1)}…`;
};
