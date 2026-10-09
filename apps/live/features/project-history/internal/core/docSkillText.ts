const unquote = (value: string): string =>
  value.trim().replace(/^["']|["']$/g, "");

/** `key: >-` / `key: |` take their value from the indented lines that follow. */
const readFrontMatterLines = (
  lines: readonly string[],
): Readonly<Record<string, string>> =>
  lines.reduce<{ fm: Record<string, string>; key: string | null }>(
    (acc, line) => {
      const idx = line.indexOf(":");
      const top = idx > 0 && !/^\s/.test(line);
      if (top) {
        const key = line.slice(0, idx).trim().toLowerCase();
        const value = line.slice(idx + 1).trim();
        return /^[>|][+-]?$/.test(value)
          ? { fm: { ...acc.fm, [key]: "" }, key }
          : { fm: { ...acc.fm, [key]: unquote(value) }, key: null };
      }
      return acc.key !== null && line.trim().length > 0
        ? {
            fm: {
              ...acc.fm,
              [acc.key]: `${acc.fm[acc.key] ?? ""} ${line.trim()}`.trim(),
            },
            key: acc.key,
          }
        : acc;
    },
    { fm: {}, key: null },
  ).fm;

export const splitDocFrontMatter = (
  text: string,
): { readonly fm: Readonly<Record<string, string>>; readonly body: string } => {
  const clean = text.replace(/^\uFEFF/, "");
  const end = clean.startsWith("---") ? clean.indexOf("\n---", 3) : -1;
  return end < 0
    ? { fm: {}, body: clean }
    : {
        fm: readFrontMatterLines(clean.slice(3, end).split(/\r?\n/)),
        body: clean.slice(end + 4),
      };
};

export const slugifyDocName = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

/** Body of the `## <heading>` section (up to the next heading), or "". */
export const readDocSection = (body: string, heading: string): string => {
  const match = new RegExp(
    `^##\\s+${heading}[^\\n]*\\n([\\s\\S]*?)(?=\\n#{1,2}\\s|(?![\\s\\S]))`,
    "im",
  ).exec(body);
  return (match?.[1] ?? "").trim();
};

export const firstSentence = (text: string, max: number): string => {
  const flat = text.replace(/[*_`]/g, "").replace(/\s+/g, " ").trim();
  const cut = /^(.+?[.!?])(\s|$)/.exec(flat)?.[1] ?? flat;
  return cut.slice(0, max).trim();
};

const STEP_LINE = /^\s*(\d+[.)]|[-*])\s+\S/;
const LINK_ONLY_LINE = /^\s*([-*]\s+)?\[[^\]]+\]\([^)]+\)\.?\s*$/;

const NUMBERED_LINE = /^\s*\d+[.)]\s+\S/;

/** Numbered or bulleted lines, the shape of a skill or command. */
export const countDocSteps = (body: string): number =>
  body.split(/\r?\n/).filter((line) => STEP_LINE.test(line)).length;

/** Only numbered lines: a Q&A doc with bullet facts is not a procedure. */
export const countNumberedDocSteps = (body: string): number =>
  body.split(/\r?\n/).filter((line) => NUMBERED_LINE.test(line)).length;

export const linkOnlyShare = (body: string): number => {
  const lines = body.split(/\r?\n/).filter((line) => line.trim().length > 0);
  return lines.length === 0
    ? 0
    : lines.filter((line) => LINK_ONLY_LINE.test(line)).length / lines.length;
};

const EXTERNAL_LINK = /^([a-z][a-z0-9+.-]*:|#|\/\/)/i;

/**
 * A skill does not live in the repo, so `[x](../../docs/a.md)` would be a dead
 * link. Rewrite relative targets to the path from the folder root; a target
 * outside the folder keeps only its text.
 */
export const rewriteRelativeDocLinks = (
  body: string,
  docRelPath: string,
): string => {
  const dir = docRelPath.split("/").slice(0, -1);
  return body.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_match, text: string, target: string) => {
      if (EXTERNAL_LINK.test(target)) {
        return `[${text}](${target})`;
      }
      const [pathPart = "", anchor] = target.split("#");
      const resolved = pathPart
        .split("/")
        .reduce<string[] | null>(
          (acc, seg) =>
            acc === null || seg === "" || seg === "."
              ? acc
              : seg === ".."
                ? acc.length > 0
                  ? acc.slice(0, -1)
                  : null
                : [...acc, seg],
          dir,
        );
      return resolved === null
        ? text
        : `[${text}](${resolved.join("/")}${anchor === undefined ? "" : `#${anchor}`})`;
    },
  );
};
