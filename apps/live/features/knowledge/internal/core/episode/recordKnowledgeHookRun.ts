import { createHash } from "node:crypto";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { selectKnowledgeNotes } from "./buildKnowledgeNotes";
import { classifyKnowledgeTaskClass } from "./classifyKnowledgeTaskClass";
import { getKnowledgeDb } from "./knowledgeDb";
import { isKnowledgeOnForFolder } from "./knowledgeProjectFlags";
import {
  isKnowledgeEnabled,
  isKnowledgeHoldoutRun,
} from "./knowledgeProjectKey";
import {
  insertKnowledgeEvent,
  recordInjections,
  touchKnowledgeProject,
} from "./knowledgeStore";

/** A message counts as a run only when it can be a request (not "ok" / "thanks"). */
export const KNOWLEDGE_HOOK_MIN_WORDS = 4;
export const KNOWLEDGE_HOOK_MIN_CHARS = 20;

export const isKnowledgeHookRequest = (message: string): boolean => {
  const text = message.trim();
  return (
    text.length >= KNOWLEDGE_HOOK_MIN_CHARS &&
    text.split(/\s+/).length >= KNOWLEDGE_HOOK_MIN_WORDS
  );
};

/** One run per (session, prompt): a retried hook call replaces its own row. */
export const buildKnowledgeHookRunId = (
  sessionId: string | undefined,
  message: string,
): string =>
  `hook:${sessionId ?? "nosession"}:${createHash("sha256").update(message).digest("hex").slice(0, 16)}`;

/**
 * Notes for a prompt of an agent that runs outside AgentWitch dispatch
 * (Claude Code / Cursor hook), and the measurement dispatch already has: a
 * run entry, the notes injected, their tokens. The same stable holdout slice
 * gets no notes, so with/without numbers stay comparable. Fail-open: returns
 * "" and records nothing on any error.
 */
export const recordKnowledgeHookRun = (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly projectKey: string;
  readonly projectFolderPath?: string;
  readonly message: string;
  readonly sessionId?: string;
}): string => {
  if (
    !isKnowledgeEnabled() ||
    !isKnowledgeHookRequest(input.message) ||
    (input.projectFolderPath !== undefined &&
      !isKnowledgeOnForFolder(input.projectFolderPath))
  ) {
    return "";
  }
  try {
    const startedAt = performance.now();
    const db = getKnowledgeDb(input.layout);
    if (db === null) return "";
    const runId = buildKnowledgeHookRunId(input.sessionId, input.message);
    const holdout = isKnowledgeHoldoutRun(runId);
    const notes = holdout
      ? { text: "", cards: [], tokens: 0 }
      : selectKnowledgeNotes(input);
    if (input.projectFolderPath !== undefined) {
      touchKnowledgeProject(db, input.projectKey, input.projectFolderPath);
    }
    recordInjections(db, runId, notes.cards);
    insertKnowledgeEvent(db, {
      runId,
      projectKey: input.projectKey,
      taskClass: classifyKnowledgeTaskClass(input.message),
      mode: holdout ? "holdout" : "fts",
      holdout,
      cardsInjected: notes.cards.length,
      injectedTokens: notes.tokens,
      checkLatencyMs: Math.round(performance.now() - startedAt),
      degraded: null,
    });
    return notes.text;
  } catch {
    return "";
  }
};
