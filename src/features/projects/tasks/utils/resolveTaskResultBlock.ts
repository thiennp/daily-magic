import {
  stripAgentRunWriterExecutionHonesty,
  summarizeKnownWriterError,
} from "@agent-witch/shared/dispatch";

import { sanitizeAgentRunTextForDisplay } from "@/features/agent/utils/sanitizeAgentRunTextForDisplay";
import { CODING_TOOL_LABELS } from "@/features/projects/tasks/utils/codingToolLabels.constant";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import { dropRedundantAgentRunDetailLines } from "@/lib/dispatch/dropRedundantAgentRunDetailLines";

export const TASK_RESULT_PREVIEW_MAX_CHARS = 600;

export type TaskResultBlock = {
  readonly tone: "bad" | "neutral";
  readonly title: string;
  readonly body: string;
  readonly preview: string;
  readonly truncated: boolean;
  readonly hint?: string | null;
};

const block = (
  tone: TaskResultBlock["tone"],
  title: string,
  body: string,
): TaskResultBlock => ({
  tone,
  title,
  body,
  preview: body.slice(0, TASK_RESULT_PREVIEW_MAX_CHARS),
  truncated: body.length > TASK_RESULT_PREVIEW_MAX_CHARS,
});

const normalize = (line: string): string => line.trim().replace(/\s+/g, " ");

const dedupeLines = (text: string): string =>
  text
    .split("\n")
    .filter(
      (line, index, lines) =>
        index === 0 ||
        normalize(line).length === 0 ||
        normalize(line) !== normalize(lines[index - 1] ?? ""),
    )
    .join("\n");

const dropLinesEqualTo = (text: string, hint: string | null): string =>
  hint === null
    ? text
    : text
        .split("\n")
        .filter((line) => normalize(line) !== normalize(hint))
        .join("\n")
        .trim();

const NOT_SIGNED_IN = /not logged in|cli-writer-api-key-missing/i;

/** Plain-language hint when the coding tool is not signed in; else null. */
export const resolveNotSignedInHint = (
  output: string,
  writerAgent: string | null | undefined,
): string | null => {
  if (!NOT_SIGNED_IN.test(output)) return null;
  const labels: Readonly<Record<string, string>> = CODING_TOOL_LABELS;
  const tool = labels[writerAgent ?? ""] ?? "The coding tool";
  return `${tool} isn't signed in on this computer. Sign in to it in Terminal, or pick another coding tool and send the task again.`;
};

/** Terminal-state explanation shown in task detail; null for other states. */
export const resolveTaskResultBlock = (
  task: Pick<
    ProjectTaskMeta,
    "status" | "resultOutput" | "denialReason" | "writerAgent" | "reportSummary"
  >,
): TaskResultBlock | null => {
  if (task.status === "failed") {
    const raw = task.resultOutput?.trim() ?? "";
    const stripped = stripAgentRunWriterExecutionHonesty(raw);
    const output = dedupeLines(sanitizeAgentRunTextForDisplay(stripped));
    // 9b3947bc: a known CLI error (agy quota…) gets one plain sentence; the raw text stays below.
    const hint =
      resolveNotSignedInHint(
        task.writerAgent === "claude-cli" ? raw : stripped,
        task.writerAgent,
      ) ??
      summarizeKnownWriterError(`${stripped}\n${task.reportSummary ?? ""}`);
    // 73181622: the reason showed twice when the hint repeats the output.
    const body = dropRedundantAgentRunDetailLines(
      dropLinesEqualTo(output, hint),
      [hint],
    );
    return {
      ...block(
        "bad",
        "Why it failed",
        body.length > 0
          ? body
          : hint === null
            ? "No details were reported."
            : "",
      ),
      hint,
    };
  }
  if (task.status === "denied") {
    return block("neutral", "Denied", task.denialReason?.trim() ?? "");
  }
  if (task.status === "timed_out") {
    return block(
      "neutral",
      "Timed out",
      "Nobody answered in time. Nothing ran.",
    );
  }
  return null;
};
