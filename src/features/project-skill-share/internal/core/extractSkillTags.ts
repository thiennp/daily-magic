export const PROJECT_SKILL_MAX_TAGS = 12;
export const PROJECT_SKILL_MAX_TAG_CHARS = 40;

const TAG_KEYS = ["keywords", "tags"] as const;

const frontMatter = (body: string): readonly string[] => {
  const text = body.replace(/^﻿/, "");
  const end = text.startsWith("---") ? text.indexOf("\n---", 3) : -1;
  return end < 0 ? [] : text.slice(3, end).split(/\r?\n/);
};

/**
 * Tags from the SKILL.md front matter, the same `keywords:` / `tags:` keys the
 * computer's skill index reads. `[a, b]`, `a, b` and `a b` all work. Lowercase,
 * deduped, capped; no front matter or key means no tags.
 */
export const extractSkillTags = (body: string): readonly string[] => {
  const line = frontMatter(body).find((row) =>
    TAG_KEYS.some((key) => row.trim().toLowerCase().startsWith(`${key}:`)),
  );
  if (line === undefined) {
    return [];
  }
  const raw = line.slice(line.indexOf(":") + 1);
  const tags = raw
    .replace(/[[\]"']/g, " ")
    .toLowerCase()
    .split(/[\s,]+/)
    .filter((tag) => tag.length > 0)
    .map((tag) => tag.slice(0, PROJECT_SKILL_MAX_TAG_CHARS));
  return [...new Set(tags)].slice(0, PROJECT_SKILL_MAX_TAGS);
};
