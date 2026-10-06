/**
 * Pull SKILL.md body from owner-LLM CLI stdout/stderr noise.
 * Prefers a fenced ```markdown / ```md block, else a --- frontmatter document.
 */
export const extractOwnerLlmSkillMarkdown = (raw: string): string | null => {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return null;
  }
  const fenced = trimmed.match(/```(?:markdown|md|skill)?\s*\n([\s\S]*?)```/i);
  if (fenced?.[1] !== undefined && fenced[1].trim().length > 0) {
    return fenced[1].trim();
  }
  const fm = trimmed.indexOf("---");
  if (fm >= 0) {
    const fromFm = trimmed.slice(fm).trim();
    if (/^---[\s\S]*?\n---/.test(fromFm)) {
      return fromFm;
    }
  }
  if (trimmed.includes("## Steps") || trimmed.includes("## When to use")) {
    return trimmed;
  }
  return null;
};
