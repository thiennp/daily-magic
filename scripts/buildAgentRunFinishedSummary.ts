import { execFileSync } from "node:child_process";

import { buildGitSubprocessEnv } from "@agent-witch/shared";

const ANSI = /\u001b\[[0-9;?]*[A-Za-z]/g;
const MARKER = /^\[\[([A-Z_]+)\]\]$/;
const NOISE =
  /^(?:agent-witch@(?:mac|linux)\s|[WA]\||\d+\|(?:pending|working|done)$|Preparing \S.* for this session|error:\s*interrupted|\[checkpoint answer\])/i;
const MAX_CHARS = 160;

const clip = (text: string): string =>
  text.length > MAX_CHARS ? `${text.slice(0, MAX_CHARS - 1).trimEnd()}…` : text;

const toLines = (output: string): readonly string[] =>
  output
    .replace(ANSI, "")
    .split(/\r?\n/)
    .map((line) => line.trim());

/** Title (+ first detail) of the last [[PROGRESS]] block, if any. */
const lastProgressStep = (lines: readonly string[]): string | null => {
  const index = lines.findLastIndex((line) => line === "[[PROGRESS]]");
  if (index < 0) return null;
  const [title, detail] = lines
    .slice(index + 1)
    .filter((line) => line.length > 0)
    .slice(0, 2);
  if (title === undefined || MARKER.test(title)) return null;
  return detail !== undefined && !MARKER.test(detail)
    ? `${title.replace(/[.:]$/, "")}: ${detail}`
    : title;
};

/** Last plain line of the final answer, above a trailing [[NEXT_ACTIONS]]. */
const lastAnswerLine = (lines: readonly string[]): string | null => {
  const nextActions = lines.findLastIndex(
    (line) => line === "[[NEXT_ACTIONS]]",
  );
  const answer = nextActions >= 0 ? lines.slice(0, nextActions) : lines;
  const blockStart = answer.findLastIndex((line) => MARKER.test(line));
  const tail = blockStart >= 0 ? answer.slice(blockStart + 1) : answer;
  return (
    tail.findLast(
      (line) => line.length > 0 && !MARKER.test(line) && !NOISE.test(line),
    ) ?? null
  );
};

/** "2 files changed, 618 insertions(+)" plus new files; null outside git. */
export const readAgentRunGitChangeLine = (
  folderPath: string | undefined,
): string | null => {
  if (folderPath === undefined || folderPath.trim().length === 0) return null;
  const git = (args: readonly string[]): string =>
    execFileSync("git", ["-C", folderPath, ...args], {
      encoding: "utf8",
      env: buildGitSubprocessEnv(),
      timeout: 3000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  try {
    const shortstat = git(["diff", "--shortstat", "HEAD"]);
    const untracked = git(["ls-files", "--others", "--exclude-standard"])
      .split("\n")
      .filter((line) => line.trim().length > 0).length;
    const parts = [
      ...(shortstat.length > 0 ? [shortstat] : []),
      ...(untracked > 0 ? [`${untracked} new file(s)`] : []),
    ];
    return parts.length > 0 ? parts.join(", ") : null;
  } catch {
    return null;
  }
};

/**
 * 7daeea78 (812e1568): a Done run with no agent summary said only "Finished
 * on your computer.". Build one from the last progress step or final answer
 * line, plus what changed in git. Null when there is nothing to say.
 */
export const buildAgentRunFinishedSummary = (input: {
  readonly output: string;
  readonly gitChangeLine: string | null;
}): string | null => {
  const lines = toLines(input.output);
  const outcome = lastProgressStep(lines) ?? lastAnswerLine(lines);
  const changes =
    input.gitChangeLine !== null ? `Changed: ${input.gitChangeLine}.` : null;
  if (outcome === null) {
    return changes === null ? null : `Finished on your computer. ${changes}`;
  }
  const sentence = /[.!?…]$/.test(outcome) ? outcome : `${outcome}.`;
  return changes === null ? clip(sentence) : `${clip(sentence)} ${changes}`;
};
