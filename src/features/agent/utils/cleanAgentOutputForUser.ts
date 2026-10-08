import {
  dropAgentOutputCliPreamble,
  isAgentOutputCliChromeLine,
} from "@/features/agent/utils/agentOutputCliChrome";
import { isAgentRunHarnessInstructionLine } from "@/features/agent/utils/isAgentRunHarnessInstructionLine";
import { stripAgentRunCliAnsi } from "@/features/agent/utils/stripAgentRunCliAnsi";

export interface CleanAgentOutputForUserOptions {
  /** Keep `[[PROGRESS]]` / wave / ask markers for a parser that runs next. */
  readonly keepMarkers?: boolean;
  /** Terminal mirror: keep the CLI banner and echoed prompt (it is a mirror). */
  readonly keepCliPreamble?: boolean;
}

const MARKER_TOKEN = /\[\[[A-Z_]+\]\]/g;

const dropMarkerTokens = (lines: readonly string[]): readonly string[] =>
  lines.flatMap((line) => {
    const stripped = line.replace(MARKER_TOKEN, "");
    if (stripped === line) return [line];
    return stripped.trim().length === 0 ? [] : [stripped.trimEnd()];
  });

/**
 * aedfe094: the ONE cleaner for agent output shown to people (progress feed,
 * terminal mirror, ask card "Context so far", reports). Strips ANSI, CLI
 * chrome, harness / system-prompt rule lines and their cut fragments, and —
 * unless a parser still needs them — every `[[MARKER]]` token.
 */
export const cleanAgentOutputForUser = (
  output: string,
  options: CleanAgentOutputForUserOptions = {},
): string => {
  const lines = stripAgentRunCliAnsi(output ?? "").split("\n");
  const kept = (
    options.keepCliPreamble === true ? lines : dropAgentOutputCliPreamble(lines)
  ).filter((line) => {
    const trimmed = line.trim();
    return (
      !isAgentOutputCliChromeLine(trimmed) &&
      !isAgentRunHarnessInstructionLine(trimmed)
    );
  });
  return (options.keepMarkers === true ? kept : dropMarkerTokens(kept))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
};
