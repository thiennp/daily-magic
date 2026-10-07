export type StampProjectHistorySkillgenSourceMessageIdsInput = {
  readonly skillMarkdown: string;
  /** History message ids that were fed to the owner LLM (episode.messageIds). */
  readonly sourceMessageIds: readonly string[];
};

const SOURCE_IDS_KEY = "source_message_ids";

const normalizeSourceMessageIds = (
  ids: readonly string[],
): readonly string[] =>
  Array.from(
    new Set(ids.map((id) => id.trim()).filter((id) => id.length > 0)),
  );

const isSourceIdsKeyLine = (line: string): boolean =>
  line.trimStart().startsWith(`${SOURCE_IDS_KEY}:`);

/** YAML block-list items (`  - m1`) that belong to the key line above them. */
const isBlockListItemLine = (line: string): boolean => /^\s+-\s*/.test(line);

const dropSourceIdsLines = (lines: readonly string[]): readonly string[] =>
  lines.reduce<{ readonly kept: readonly string[]; readonly skipping: boolean }>(
    (acc, line) => {
      if (isSourceIdsKeyLine(line)) {
        return { kept: acc.kept, skipping: true };
      }
      if (acc.skipping && isBlockListItemLine(line)) {
        return acc;
      }
      return { kept: [...acc.kept, line], skipping: false };
    },
    { kept: [], skipping: false },
  ).kept;

/**
 * Step 10b — provenance is set by code, never trusted from the owner LLM.
 * Replaces any `source_message_ids` the LLM wrote (inline or block list) with
 * the ids actually fed to it, as one inline JSON array line in frontmatter.
 * Empty ids stamp `[]` so validation fails with `missing_source_message_ids`.
 * Markdown without frontmatter is returned unchanged (validator rejects it).
 */
export const stampProjectHistorySkillgenSourceMessageIds = (
  input: StampProjectHistorySkillgenSourceMessageIdsInput,
): string => {
  const markdown = input.skillMarkdown.replace(/^\uFEFF/, "");
  if (!markdown.startsWith("---")) {
    return input.skillMarkdown;
  }
  const end = markdown.indexOf("\n---", 3);
  if (end < 0) {
    return input.skillMarkdown;
  }
  const head = markdown.slice(0, 3);
  const frontmatterLines = markdown
    .slice(3, end)
    .replace(/^\r?\n/, "")
    .split(/\r?\n/)
    .filter((line, index, all) => !(index === all.length - 1 && line === ""));
  const ids = normalizeSourceMessageIds(input.sourceMessageIds);
  const stamped = [
    ...dropSourceIdsLines(frontmatterLines),
    `${SOURCE_IDS_KEY}: ${JSON.stringify(ids)}`,
  ];
  return `${head}\n${stamped.join("\n")}${markdown.slice(end)}`;
};
