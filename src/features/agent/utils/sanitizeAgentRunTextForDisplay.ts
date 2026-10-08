import { stripAgentRunWriterExecutionHonesty } from "@agent-witch/shared/dispatch";

import { cleanAgentOutputForUser } from "@/features/agent/utils/cleanAgentOutputForUser";
import { stripAgentRunHarnessAppendix } from "@/features/agent/utils/stripAgentRunHarnessAppendix";

/** Stored rows can hold JSON-escaped text ("\u001b[1m", "\n") instead of the bytes. */
const unescapeStoredText = (text: string): string =>
  text
    .replace(/\\u001b|\\x1b|\\033/gi, "\u001b")
    .replace(/\\r\\n|\\n/g, "\n")
    .replace(/\\t/g, " ");

/** "agentRunWriterExecutionBackend=cli-writer-api-key-missing reasonCode=…" */
const DIAGNOSTIC_PAIR = /^[A-Za-z][\w.-]*=\S*$/;

const isDiagnosticLine = (line: string): boolean => {
  const words = line.trim().split(/\s+/);
  return (
    words.length > 0 &&
    words[0].length > 0 &&
    (/\bagentRun\w*=/.test(line) || words.every((w) => DIAGNOSTIC_PAIR.test(w)))
  );
};

/**
 * aedfe094: render-time cleaner for stored run text shown on Home, task rows
 * and skill questions, so legacy rows written before the host-side cleanup
 * read clean: no ANSI, no CLI banner, no harness rules, no [[MARKER]] tokens,
 * no internal key=value diagnostics.
 */
export const sanitizeAgentRunTextForDisplay = (raw: string | null): string => {
  const unescaped = unescapeStoredText(raw ?? "");
  const withoutHonesty = stripAgentRunWriterExecutionHonesty(unescaped);
  const cleaned = cleanAgentOutputForUser(
    stripAgentRunHarnessAppendix(withoutHonesty),
  );
  return cleaned
    .split("\n")
    .filter((line) => !isDiagnosticLine(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
