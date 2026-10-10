import fs from "node:fs";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import { captureKnowledgeHookOutcome } from "@agent-witch/live-knowledge";

import { readHookStdinText } from "./readHookStdinText";

/** Enough of the transcript tail to hold the last turn. */
const MAX_TRANSCRIPT_BYTES = 2 * 1024 * 1024;

const readString = (
  record: Record<string, unknown>,
  key: string,
): string | null => {
  const value = record[key];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
};

const readTranscriptTail = (filePath: string): string => {
  const size = fs.statSync(filePath).size;
  const start = Math.max(0, size - MAX_TRANSCRIPT_BYTES);
  const fd = fs.openSync(filePath, "r");
  try {
    const buffer = Buffer.alloc(size - start);
    fs.readSync(fd, buffer, 0, buffer.length, start);
    const text = buffer.toString("utf8");
    // A tail read can start mid-line: drop the partial first line.
    return start > 0 ? text.slice(text.indexOf("\n") + 1) : text;
  } finally {
    fs.closeSync(fd);
  }
};

/**
 * `agent-witch mcp-hook knowledge_capture` for the Claude Code `Stop` hook:
 * learn from the finished turn. Prints nothing, never blocks, always exits 0.
 */
export const runKnowledgeCaptureHookCli = async (input: {
  readonly layout: AgentWitchLocalLayout;
}): Promise<0> => {
  try {
    const raw: unknown = JSON.parse(await readHookStdinText(process.stdin));
    if (typeof raw !== "object" || raw === null) return 0;
    const record = raw as Record<string, unknown>;
    const sessionId = readString(record, "session_id");
    const transcriptPath = readString(record, "transcript_path");
    const cwd = readString(record, "cwd");
    if (sessionId === null || transcriptPath === null || cwd === null) return 0;
    await captureKnowledgeHookOutcome({
      layout: input.layout,
      sessionId,
      cwd,
      transcriptText: readTranscriptTail(transcriptPath),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(
      `[agent-witch] mcp-hook knowledge_capture: ${message}\n`,
    );
  }
  return 0;
};
