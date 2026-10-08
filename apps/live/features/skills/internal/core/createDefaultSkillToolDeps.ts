import { resolveAgentWitchLocalLayout } from "@agent-witch/install-layout";
import { isCodingToolsPaused } from "@agent-witch/install-runtime-client";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import {
  embedKnowledgeQuery,
  getKnowledgeDb,
} from "@agent-witch/live-knowledge";
import { resolveAgentWitchProjectIdFromCwd } from "@agent-witch/live-projects";

import { createOllamaSkillRerank } from "./ollamaSkillRerank";
import { ensureSkillIndexSchema } from "./skillIndexSchema";
import type { SkillIndexDb } from "./skillIndex.types";
import type { SkillToolDeps } from "./skillTools.types";

const QUERY_EMBED_TIMEOUT_MS = 2_000;
const migrated = new WeakSet<object>();

/** knowledge.db with the skill tables ensured (once per handle), or null. */
export const openSkillIndexDb = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
): SkillIndexDb | null => {
  const db = getKnowledgeDb(layout);
  if (db !== null && !migrated.has(db)) {
    ensureSkillIndexSchema(db);
    migrated.add(db);
  }
  return db;
};

/** Production wiring: knowledge.db, Ollama embeddings, project-data mirror. */
export const createDefaultSkillToolDeps = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail"> &
    Partial<Pick<AgentWitchLocalLayout, "configPath">>,
): SkillToolDeps => ({
  // Fail closed: without a config path scripts are treated as paused.
  isPaused: () =>
    layout.configPath === undefined || isCodingToolsPaused(layout.configPath),
  openDb: () => openSkillIndexDb(layout),
  resolveProjectId: resolveAgentWitchProjectIdFromCwd,
  projectDataDir: resolveAgentWitchLocalLayout().projectDataDir,
  embed: (text) => embedKnowledgeQuery(text, QUERY_EMBED_TIMEOUT_MS),
  rerank: createOllamaSkillRerank(),
  runId: process.env.AGENT_WITCH_RUN_ID?.trim() || null,
  defaultCwd: () => process.cwd(),
});
