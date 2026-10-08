export type ParsedSkillText = {
  readonly name: string;
  readonly description: string;
  readonly whenToUse: string;
  readonly keywords: string;
};

const WHEN_CAP = 400;

const splitFrontmatter = (
  markdown: string,
): { fm: Record<string, string>; body: string } => {
  const text = markdown.replace(/^﻿/, "");
  const end = text.startsWith("---") ? text.indexOf("\n---", 3) : -1;
  if (end < 0) {
    return { fm: {}, body: text };
  }
  const fm: Record<string, string> = {};
  for (const line of text.slice(3, end).split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx > 0) {
      fm[line.slice(0, idx).trim().toLowerCase()] = line
        .slice(idx + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  }
  return { fm, body: text.slice(end + 4) };
};

const readWhenToUse = (body: string): string => {
  const match =
    /^#{1,4}\s*when to use[^\n]*\n([\s\S]*?)(?=\n#{1,4}\s|$)/im.exec(body);
  return (match?.[1] ?? "").replace(/\s+/g, " ").trim().slice(0, WHEN_CAP);
};

/** Read name / description / when-to-use / keywords from a SKILL.md body. */
export const parseSkillText = (
  markdown: string,
  fallbackName: string,
): ParsedSkillText => {
  const { fm, body } = splitFrontmatter(markdown);
  const heading = /^#\s+(.+)$/m.exec(body)?.[1]?.trim();
  return {
    name: fm.name || heading || fallbackName,
    description: fm.description ?? "",
    whenToUse: fm.when_to_use || readWhenToUse(body),
    keywords: (fm.keywords ?? fm.tags ?? "")
      .replace(/[[\]]/g, "")
      .replace(/[\s,]+/g, " ")
      .trim(),
  };
};
