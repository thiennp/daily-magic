import { summarizeKnownWriterError } from "@agent-witch/shared/dispatch";

import { sanitizeAgentRunTextForDisplay } from "@/features/agent/utils/sanitizeAgentRunTextForDisplay";
import { stripAgentRunCliAnsi } from "@/features/agent/utils/stripAgentRunCliAnsi";

const WRITER_LABELS: Readonly<Record<string, string>> = {
  "claude-cli": "Claude Code",
  codex: "Codex",
  cursor: "Cursor",
  "cursor-cloud": "Cursor Cloud",
  antigravity: "Antigravity",
};

/** Internal backend / reason codes mapped to plain copy (aedfe094). */
const KNOWN_BACKEND_CODES: readonly {
  readonly pattern: RegExp;
  readonly copy: (tool: string) => string;
}[] = [
  {
    pattern: /cli-writer-api-key-missing|MISSING_\w*WRITER_API_KEY/,
    copy: (tool) =>
      `${tool} isn't signed in on this computer. Sign in to it in Terminal, or pick another coding tool and send the task again.`,
  },
];

export const AGENT_RUN_REASON_FALLBACK =
  "The task stopped without a readable reason. Open it for details.";

/** One plain line for a failed run on Home / task lists (legacy rows too). */
export const summarizeAgentRunReasonForDisplay = (input: {
  readonly raw: string | null;
  readonly writerAgent?: string | null;
}): string => {
  const raw = input.raw ?? "";
  if (raw.trim().length === 0) {
    return "";
  }
  const tool = WRITER_LABELS[input.writerAgent ?? ""] ?? "The coding tool";
  const code = KNOWN_BACKEND_CODES.find((known) => known.pattern.test(raw));
  if (code !== undefined) {
    return code.copy(tool);
  }
  const cleaned = sanitizeAgentRunTextForDisplay(raw);
  const known =
    summarizeKnownWriterError(cleaned) ??
    summarizeKnownWriterError(stripAgentRunCliAnsi(raw));
  if (known !== null) {
    return known;
  }
  const firstLine = cleaned
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0);
  return firstLine ?? AGENT_RUN_REASON_FALLBACK;
};
