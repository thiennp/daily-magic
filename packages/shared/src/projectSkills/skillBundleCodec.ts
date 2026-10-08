import { SKILL_BUNDLE_END, SKILL_BUNDLE_START } from "./skillBundle.constant";
import type { SkillBundle } from "./skillBundle.type";

/** `>` is escaped so script text can never close the HTML comment. */
const escapeJson = (json: string): string => json.replace(/>/g, "\\u003e");

/** Append the bundle as a trailing HTML comment (covered by the content hash). */
export const embedSkillBundle = (
  markdown: string,
  bundle: SkillBundle,
): string =>
  `${markdown.trimEnd()}\n\n${SKILL_BUNDLE_START}${escapeJson(
    JSON.stringify(bundle),
  )}${SKILL_BUNDLE_END}\n`;

export type SplitSkillBody = {
  /** SKILL.md without the bundle comment. */
  readonly markdown: string;
  /** Raw bundle JSON, or null when the body has none. */
  readonly bundleJson: string | null;
};

export const splitSkillBundle = (body: string): SplitSkillBody => {
  const start = body.lastIndexOf(SKILL_BUNDLE_START);
  if (start < 0) {
    return { markdown: body, bundleJson: null };
  }
  const from = start + SKILL_BUNDLE_START.length;
  const end = body.indexOf(SKILL_BUNDLE_END, from);
  if (end < 0) {
    return { markdown: body, bundleJson: null };
  }
  return {
    markdown: `${body.slice(0, start).trimEnd()}\n`,
    bundleJson: body.slice(from, end),
  };
};
