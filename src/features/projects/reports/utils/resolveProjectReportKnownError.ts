import { summarizeKnownWriterError } from "@agent-witch/shared/dispatch";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

/**
 * 9b3947bc (Testi recheck @300): a failed run with a known agy / CLI error
 * shows one plain sentence in "What happened"; the raw text goes to Details.
 * Returns null when the run did not fail or the error is not known.
 */
export const resolveProjectReportKnownError = (
  run: { readonly status: string; readonly resultOutput: string | null },
  reportSummary: string | null | undefined,
  output: string,
): { readonly body: string; readonly details: string | null } | null => {
  if (run.status !== AgentRunStatus.FAILED) {
    return null;
  }
  const texts = [output, run.resultOutput ?? "", reportSummary ?? ""];
  const body = summarizeKnownWriterError(texts.join("\n"));
  if (body === null) {
    return null;
  }
  // c1731750: Details never just repeat the sentence shown above them.
  const raw =
    texts
      .map((text) => text.trim())
      .find((text) => text.length > 0 && text !== body) ?? "";
  return { body, details: raw.length > 0 ? raw : null };
};
