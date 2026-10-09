import {
  DOC_INGEST_DESCRIPTION_MAX_CHARS,
  DOC_INGEST_MAX_KEYWORDS,
  type DocSourceKind,
} from "./docIngest.constants";
import {
  firstSentence,
  rewriteRelativeDocLinks,
  readDocSection,
  slugifyDocName,
  splitDocFrontMatter,
} from "./docSkillText";

const NOISE_WORDS: ReadonlySet<string> = new Set([
  "new",
  "using",
  "one",
  "existing",
  "without",
  "with",
  "into",
  "from",
  "this",
  "that",
  "your",
  "when",
  "use",
  "the",
  "and",
  "for",
]);

const MIN_DESCRIPTION_CHARS = 30;

export type DocSource = {
  readonly relPath: string;
  readonly kind: DocSourceKind;
  readonly text: string;
  readonly sha: string;
};

export type DocSkillDraft = {
  readonly name: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly body: string;
  readonly relPath: string;
  readonly sha: string;
  readonly kind: DocSourceKind;
};

const stem = (relPath: string): string => {
  const parts = relPath.split("/");
  const last = parts[parts.length - 1] ?? "";
  const base = last === "SKILL.md" ? (parts[parts.length - 2] ?? "") : last;
  return slugifyDocName(base.replace(/\.md$/i, ""));
};

const keywordsOf = (...texts: readonly string[]): readonly string[] =>
  [
    ...new Set(
      texts
        .join(" ")
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((word) => word.length >= 3 && !NOISE_WORDS.has(word)),
    ),
  ].slice(0, DOC_INGEST_MAX_KEYWORDS);

const firstParagraph = (body: string): string =>
  body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block.length > 0 && !block.startsWith("#")) ?? "";

const fromQa = (source: DocSource): DocSkillDraft => {
  const { body } = splitDocFrontMatter(source.text);
  const aliases = readDocSection(body, "Query aliases");
  const short = readDocSection(body, "Short answer");
  const question = /^#\s+(.+)$/m.exec(body)?.[1]?.trim() ?? "";
  const rest = body
    .replace(/^#\s+.*\n/, "")
    .replace(/^##\s+Query aliases[\s\S]*?(?=\n##\s|(?![\s\S]))/im, "")
    .trim();
  const asked = aliases
    .split("\n")
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter((line) => line.length > 0)
    .slice(0, 3);
  const when = `## When to use\n\nUse when asked about: ${asked.join("; ")}.\n\n`;
  return {
    name: stem(source.relPath),
    description: `${question} ${firstSentence(
      short,
      Math.max(0, DOC_INGEST_DESCRIPTION_MAX_CHARS - question.length - 1),
    )}`
      .trim()
      .slice(0, DOC_INGEST_DESCRIPTION_MAX_CHARS),
    keywords: keywordsOf(aliases, question),
    body: rewriteRelativeDocLinks(`${when}${rest}`, source.relPath),
    relPath: source.relPath,
    sha: source.sha,
    kind: source.kind,
  };
};

/** A one-word title is no description: add the first body sentence that says something new. */
const describe = (given: string, body: string): string => {
  const base = firstSentence(given, DOC_INGEST_DESCRIPTION_MAX_CHARS);
  if (base.length >= MIN_DESCRIPTION_CHARS) {
    return base;
  }
  const more = body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0 && !block.startsWith("#"))
    .map((block) => firstSentence(block, DOC_INGEST_DESCRIPTION_MAX_CHARS))
    .find(
      (sentence) =>
        sentence.length >= MIN_DESCRIPTION_CHARS &&
        !sentence.toLowerCase().startsWith(base.toLowerCase()),
    );
  return more === undefined
    ? base
    : `${base}. ${more}`.slice(0, DOC_INGEST_DESCRIPTION_MAX_CHARS);
};

const fromSkillOrCommand = (source: DocSource): DocSkillDraft => {
  const { fm, body } = splitDocFrontMatter(source.text);
  return {
    name: slugifyDocName(fm.name ?? "") || stem(source.relPath),
    description: describe(fm.description ?? firstParagraph(body), body),
    keywords: keywordsOf(fm.keywords ?? fm.tags ?? "", fm.description ?? ""),
    body: rewriteRelativeDocLinks(body.trim(), source.relPath),
    relPath: source.relPath,
    sha: source.sha,
    kind: source.kind,
  };
};

/** Deterministic: the doc already has the shape of a skill, only the wrapper changes. */
export const convertDocToSkillDraft = (source: DocSource): DocSkillDraft =>
  source.kind === "qa" ? fromQa(source) : fromSkillOrCommand(source);
