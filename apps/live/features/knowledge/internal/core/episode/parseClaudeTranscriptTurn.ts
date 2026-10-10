import { hasKnowledgeErrorLine } from "./detectKnowledgeSignals";

export type ClaudeTranscriptTurn = {
  /** What the user asked in the last real prompt of the transcript. */
  readonly prompt: string;
  /** The last Bash result and the final assistant text of that turn (tail, capped). */
  readonly output: string;
  /** 1 when the turn ended on a failing Bash call that printed a real error line, else 0. */
  readonly exitCode: 0 | 1;
};

const MAX_PROMPT_CHARS = 2_000;
const MAX_OUTPUT_CHARS = 12_000;
const NOT_A_PROMPT =
  /^\s*(<system-reminder>|<command-|<task-notification|\[SYSTEM NOTIFICATION|Caveat:|<local-command)/;

type Block = Record<string, unknown>;
type Line = {
  readonly type?: string;
  readonly isMeta?: boolean;
  readonly isSidechain?: boolean;
  readonly message?: { readonly content?: unknown };
};

const asBlocks = (content: unknown): Block[] =>
  Array.isArray(content)
    ? content.filter((b): b is Block => typeof b === "object" && b !== null)
    : [];

const textOf = (value: unknown): string =>
  typeof value === "string"
    ? value
    : asBlocks(value)
        .map((b) => (typeof b.text === "string" ? b.text : ""))
        .join("\n");

/** The user's own words in a transcript line, or "" for tool results and injected context. */
const promptOf = (line: Line): string => {
  if (
    line.type !== "user" ||
    line.isMeta === true ||
    line.isSidechain === true
  ) {
    return "";
  }
  const content = line.message?.content;
  if (typeof content === "string") {
    return NOT_A_PROMPT.test(content) ? "" : content.trim();
  }
  const blocks = asBlocks(content);
  if (blocks.some((b) => b.type === "tool_result")) return "";
  return blocks
    .filter((b) => b.type === "text" && typeof b.text === "string")
    .map((b) => String(b.text))
    .filter((t) => !NOT_A_PROMPT.test(t))
    .join("\n")
    .trim();
};

const parseLines = (jsonl: string): Line[] =>
  jsonl
    .split("\n")
    .map((raw) => {
      try {
        return JSON.parse(raw) as Line;
      } catch {
        return null;
      }
    })
    .filter((line): line is Line => line !== null);

/**
 * The last turn of a Claude Code transcript (JSONL): the last real user prompt,
 * what its Bash commands printed, the final assistant text, and whether the
 * last Bash call failed. Null when there is no real prompt.
 */
export const parseClaudeTranscriptTurn = (
  jsonl: string,
): ClaudeTranscriptTurn | null => {
  const lines = parseLines(jsonl);
  const start = lines.map(promptOf).findLastIndex((p) => p.length > 0);
  if (start < 0) return null;
  const prompt = promptOf(lines[start] as Line);
  const bashIds = new Set<string>();
  const results: { readonly text: string; readonly failed: boolean }[] = [];
  let lastAssistantText = "";
  for (const line of lines.slice(start + 1)) {
    const blocks = asBlocks(line.message?.content);
    if (line.type === "assistant") {
      for (const b of blocks) {
        if (b.type === "tool_use" && b.name === "Bash")
          bashIds.add(String(b.id));
      }
      const text = blocks
        .filter((b) => b.type === "text")
        .map((b) => textOf([b]))
        .join("\n")
        .trim();
      if (text.length > 0) lastAssistantText = text;
    } else if (line.type === "user") {
      for (const b of blocks) {
        if (b.type !== "tool_result" || !bashIds.has(String(b.tool_use_id)))
          continue;
        const text = textOf(b.content);
        results.push({
          text,
          failed: b.is_error === true || /^Exit code [1-9]/.test(text),
        });
      }
    }
  }
  // Only the last Bash result decides: an earlier failure that was fixed is not
  // this turn's mistake, and `grep` finding nothing is not a failure either.
  const last = results.at(-1);
  const lastText = last?.text ?? "";
  const failed = last?.failed === true && hasKnowledgeErrorLine(lastText);
  const output = [lastText, lastAssistantText]
    .filter((t) => t.length > 0)
    .join("\n")
    .slice(-MAX_OUTPUT_CHARS);
  return {
    prompt: prompt.slice(0, MAX_PROMPT_CHARS),
    output,
    exitCode: failed ? 1 : 0,
  };
};
