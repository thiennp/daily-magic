import fs from "node:fs";

import { resolveAgentWitchLocalLayout } from "@agent-witch/install-layout";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import { embedKnowledgeQuery } from "@agent-witch/live-knowledge";

import { reindexProject } from "./reindexProject";
import { openSkillIndexDb } from "./createDefaultSkillToolDeps";
import { isSafeSkillPathId } from "./skillMirror";

const INDEX_EMBED_TIMEOUT_MS = 5_000;

/**
 * Re-index every project that has a skill mirror on this computer. Called at
 * startup and after each History tick (which is where skills are pulled).
 * Never throws: indexing is best-effort and retried on the next tick.
 */
export const refreshSkillIndex = async (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
): Promise<void> => {
  try {
    const db = openSkillIndexDb(layout);
    const { projectDataDir } = resolveAgentWitchLocalLayout();
    if (db === null || !fs.existsSync(projectDataDir)) {
      return;
    }
    for (const projectId of fs.readdirSync(projectDataDir)) {
      if (isSafeSkillPathId(projectId)) {
        await reindexProject({
          db,
          projectDataDir,
          projectId,
          embed: (text) => embedKnowledgeQuery(text, INDEX_EMBED_TIMEOUT_MS),
        });
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[agent-witch] skill index refresh failed: ${message}`);
  }
};
