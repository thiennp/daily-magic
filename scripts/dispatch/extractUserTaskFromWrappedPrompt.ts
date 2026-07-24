/** First section of a hub-wrapped prompt (before instruction blocks). */
export const extractUserTaskFromWrappedPrompt = (
  wrappedPrompt: string,
): string => {
  const trimmed = wrappedPrompt.trim();
  if (trimmed.length === 0) {
    return "";
  }

  const separator = "\n\n---\n";
  const firstSection = trimmed.split(separator)[0]?.trim() ?? trimmed;
  return firstSection;
};
