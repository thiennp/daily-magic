import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { captureKnowledgeAfterRun } from "./captureKnowledgeAfterRun";
import { getKnowledgeDb, type KnowledgeDatabase } from "./knowledgeDb";
import { readHookGitBefore, snapshotGitBeforeSync } from "./hookGitBefore";
import { parseClaudeTranscriptTurn } from "./parseClaudeTranscriptTurn";
import { buildKnowledgeHookRunId } from "./recordKnowledgeHookRun";

type OpenRun = { readonly run_id: string; readonly project_key: string };

const OPEN_RUN_WINDOW_MS = 6 * 60 * 60 * 1000;

/** This prompt's own run if it is still open, else the session's newest open one. */
const findOpenHookRun = (
  db: KnowledgeDatabase,
  sessionId: string,
  expectedRunId: string,
): OpenRun | null => {
  const exact = db
    .prepare(
      "SELECT run_id, project_key FROM knowledge_events WHERE run_id = ? AND outcome IS NULL",
    )
    .get(expectedRunId) as unknown as OpenRun | undefined;
  if (exact !== undefined) return exact;
  const since = new Date(Date.now() - OPEN_RUN_WINDOW_MS).toISOString();
  return (
    (db
      .prepare(
        `SELECT run_id, project_key FROM knowledge_events
         WHERE run_id LIKE ? AND outcome IS NULL AND ts >= ? ORDER BY ts DESC LIMIT 1`,
      )
      .get(`hook:${sessionId}:%`, since) as unknown as OpenRun | undefined) ??
    null
  );
};

/**
 * Close the run the prompt hook opened: read the finished turn from the Claude
 * transcript and hand it to the same capture dispatched runs use (mistake and
 * fix notes, repeat detection, avoided mistakes). Fail-open; returns whether a
 * run was captured.
 */
export const captureKnowledgeHookOutcome = async (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly sessionId: string;
  readonly cwd: string;
  readonly transcriptText: string;
}): Promise<boolean> => {
  try {
    const turn = parseClaudeTranscriptTurn(input.transcriptText);
    const db = getKnowledgeDb(input.layout);
    if (turn === null || db === null) return false;
    const run = findOpenHookRun(
      db,
      input.sessionId,
      buildKnowledgeHookRunId(input.sessionId, turn.prompt),
    );
    if (run === null) return false;
    await captureKnowledgeAfterRun({
      layout: input.layout,
      projectKey: run.project_key,
      projectFolderPath: input.cwd,
      runId: run.run_id,
      prompt: turn.prompt,
      output: turn.output,
      exitCode: turn.exitCode,
      // Without the start state a dirty repo would be read as this turn's work.
      gitBefore:
        readHookGitBefore(input.layout, run.run_id) ??
        snapshotGitBeforeSync(input.cwd),
    });
    return true;
  } catch {
    return false;
  }
};
