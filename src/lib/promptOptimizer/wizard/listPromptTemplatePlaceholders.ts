const PLACEHOLDER = /\{\{([a-zA-Z0-9_-]+)\}\}/g;

/** Unique placeholder names in first-seen order. */
export const listPromptTemplatePlaceholders = (
  text: string,
): readonly string[] => {
  const seen = new Set<string>();
  const names: string[] = [];
  for (const match of text.matchAll(PLACEHOLDER)) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      names.push(name);
    }
  }
  return names;
};
