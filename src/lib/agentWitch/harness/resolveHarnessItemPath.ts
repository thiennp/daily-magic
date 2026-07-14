import type { HarnessItemKind } from "./types/HarnessItemKind.constant";
import sanitizeHarnessSlug from "./sanitizeHarnessSlug";

const toFileStem = (title: string): string => {
  const stem = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (stem.length > 0) {
    return stem;
  }

  return "item";
};

const resolveHarnessItemPath = (
  kind: HarnessItemKind,
  title: string,
): string => {
  const stem = toFileStem(title);
  const slug = sanitizeHarnessSlug(title);

  if (kind === "rule") {
    return `rules/${stem}.mdc`;
  }

  if (kind === "skill") {
    return `skills/${slug}/SKILL.md`;
  }

  if (kind === "command") {
    return `commands/${stem}.md`;
  }

  if (kind === "agent") {
    return `agents/${stem}.md`;
  }

  return `instructions/${stem}.md`;
};

export default resolveHarnessItemPath;
