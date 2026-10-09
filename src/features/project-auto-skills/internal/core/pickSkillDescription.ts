const MAX_DESCRIPTION_CHARS = 280;

/**
 * The skill's own front matter `description:` when it has one (doc-made drafts
 * do), otherwise the question title. The title is a question to the owner, not
 * something a bot should read when it searches the library.
 */
export const pickSkillDescription = (
  draftBody: string,
  fallbackTitle: string,
): string => {
  const text = draftBody.replace(/^﻿/, "");
  const end = text.startsWith("---") ? text.indexOf("\n---", 3) : -1;
  const line = (end < 0 ? "" : text.slice(3, end))
    .split(/\r?\n/)
    .find((row) => row.startsWith("description:"));
  const value = (line ?? "")
    .slice("description:".length)
    .trim()
    .replace(/^["']|["']$/g, "");
  return (value.length > 0 ? value : fallbackTitle).slice(
    0,
    MAX_DESCRIPTION_CHARS,
  );
};
