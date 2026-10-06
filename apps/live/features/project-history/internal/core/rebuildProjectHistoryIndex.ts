import fs from "node:fs";
import path from "node:path";

import { HISTORY_STORE_KIND_MESSAGE } from "./historyStore.constants";
import { ingestHistoryMessageIntoIndex } from "./ingestHistoryMessageIntoIndex";
import {
  closeHistoryStoreDb,
  openHistoryStoreDb,
} from "./openHistoryStoreDb";
import { PROJECT_HISTORY_DIR_NAME } from "./projectHistoryPaths.constant";
import { readProjectHistoryMessage } from "./readProjectHistoryMessage";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

export type RebuildProjectHistoryIndexResult =
  | {
      readonly ok: true;
      readonly scanned: number;
      readonly ingested: number;
    }
  | { readonly ok: false; readonly reason: string; readonly scanned: number };

const LOG_PREFIX = "[project-history-index]";

/**
 * Wipe/recreate index rows for one project by scanning `history/*.json`
 * (skips state.json). No-op when sqlite unavailable.
 */
export const rebuildProjectHistoryIndex = (input: {
  readonly projectId: string;
}): RebuildProjectHistoryIndexResult => {
  const historyDir = path.join(
    resolveProjectDataDir(input.projectId),
    PROJECT_HISTORY_DIR_NAME,
  );
  const messageIds =
    fs.existsSync(historyDir)
      ? fs
          .readdirSync(historyDir)
          .filter((name) => name.endsWith(".json") && name !== "state.json")
          .map((name) => name.slice(0, -".json".length))
      : [];

  const opened = openHistoryStoreDb(input.projectId);
  if (!opened.ok) {
    return { ok: false, reason: opened.reason, scanned: messageIds.length };
  }

  try {
    opened.db
      .prepare("DELETE FROM records WHERE project_id = ?")
      .run(input.projectId);
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "rebuild_wipe_failed", input.projectId, error);
    closeHistoryStoreDb(opened.db);
    return {
      ok: false,
      reason: "rebuild_wipe_failed",
      scanned: messageIds.length,
    };
  }
  closeHistoryStoreDb(opened.db);

  let ingested = 0;
  for (const messageId of messageIds) {
    const record = readProjectHistoryMessage({
      projectId: input.projectId,
      messageId,
    });
    if (record === null) {
      continue;
    }
    const result = ingestHistoryMessageIntoIndex({
      record,
      kind: HISTORY_STORE_KIND_MESSAGE,
    });
    if (result.ok) {
      ingested += 1;
    }
  }
  return { ok: true, scanned: messageIds.length, ingested };
};
