import fs from "node:fs";
import path from "node:path";

import { appendProjectHistorySkillgenMetrics } from "./appendProjectHistorySkillgenMetrics";
import { mapHistoryFailuresToSkillPitfalls } from "./mapHistoryFailuresToSkillPitfalls";
import { mergeSkillPitfallsIntoDraftMarkdown } from "./mergeSkillPitfallsIntoDraftMarkdown";
import { PROJECT_HISTORY_PITFALL_MAX_STORED } from "./projectHistory.constants";
import type { ProjectHistoryLearnedPitfall } from "./projectHistoryLearnedPitfall.type";
import type { ProjectHistorySkillgenEpisodeRecord } from "./projectHistorySkillgenEpisode.type";
import { readProjectHistoryLearnedPitfalls } from "./readProjectHistoryLearnedPitfalls";
import { recordProjectHistorySkillgenMetrics } from "./recordProjectHistorySkillgenMetrics";
import { selectProjectHistorySkillgenFailureEpisodes } from "./selectProjectHistorySkillgenFailureEpisodes";
import {
  writeProjectHistorySkillgenDraft,
  type WriteProjectHistorySkillgenDraftResult,
} from "./writeProjectHistorySkillgenDraft";
import { writeProjectHistoryLearnedPitfalls } from "./writeProjectHistoryLearnedPitfalls";
import { writeProjectHistorySkillgenFlags } from "./writeProjectHistorySkillgenFlags";

const LOG_PREFIX = "[project-history-skillgen]";

export type AttachProjectHistoryPitfallsAfterDraftInput = {
  readonly projectId: string;
  readonly successEpisode: ProjectHistorySkillgenEpisodeRecord;
  readonly episodes: readonly ProjectHistorySkillgenEpisodeRecord[];
  readonly draftWritten: WriteProjectHistorySkillgenDraftResult;
  readonly nowMs: number;
};

export type AttachProjectHistoryPitfallsAfterDraftResult = {
  readonly appendedCount: number;
  readonly storedCount: number;
  readonly ok: boolean;
};

const upsertLearned = (
  existing: readonly ProjectHistoryLearnedPitfall[],
  incoming: readonly ProjectHistoryLearnedPitfall[],
): readonly ProjectHistoryLearnedPitfall[] => {
  const byHash = new Map<string, ProjectHistoryLearnedPitfall>();
  for (const item of existing) {
    byHash.set(item.contentHash, item);
  }
  for (const item of incoming) {
    byHash.set(item.contentHash, item);
  }
  return [...byHash.values()].slice(-PROJECT_HISTORY_PITFALL_MAX_STORED);
};

const readDraftMeta = (
  metaPath: string,
): {
  readonly name: string;
  readonly description: string;
  readonly sourceMessageIds: readonly string[];
} => {
  try {
    const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as {
      name?: unknown;
      description?: unknown;
      sourceMessageIds?: unknown;
    };
    return {
      name: typeof meta.name === "string" ? meta.name : "draft",
      description: typeof meta.description === "string" ? meta.description : "",
      sourceMessageIds: Array.isArray(meta.sourceMessageIds)
        ? meta.sourceMessageIds.filter((x): x is string => typeof x === "string")
        : [],
    };
  } catch {
    return { name: "draft", description: "", sourceMessageIds: [] };
  }
};

const pushMetric = (input: {
  readonly projectId: string;
  readonly episodeId: string;
  readonly state: ProjectHistorySkillgenEpisodeRecord["state"];
  readonly reason: string;
  readonly nowIso: string;
}): void => {
  try {
    appendProjectHistorySkillgenMetrics({
      projectId: input.projectId,
      events: [
        recordProjectHistorySkillgenMetrics({
          projectId: input.projectId,
          episodeId: input.episodeId,
          fromState: input.state,
          toState: input.state,
          reason: input.reason,
          tokensUsed: 0,
          nowIso: input.nowIso,
        }),
      ],
    });
  } catch {
    // never fail the tick
  }
};

/**
 * Side path after a successful draft write: map failure episodes → Pitfalls
 * bullets + local learned-pitfalls/flags. Never throws into the tick.
 */
export const attachProjectHistoryPitfallsAfterDraft = (
  input: AttachProjectHistoryPitfallsAfterDraftInput,
): AttachProjectHistoryPitfallsAfterDraftResult => {
  const nowIso = new Date(input.nowMs).toISOString();
  try {
    const failures = selectProjectHistorySkillgenFailureEpisodes({
      episodes: input.episodes,
      excludeEpisodeId: input.successEpisode.episodeId,
    });
    const mapped = mapHistoryFailuresToSkillPitfalls({
      failures,
      nowIso,
    });
    if (
      mapped.skillPitfallLines.length === 0 &&
      mapped.localEntries.length === 0
    ) {
      return { appendedCount: 0, storedCount: 0, ok: true };
    }

    let appendedCount = 0;
    try {
      const meta = readDraftMeta(input.draftWritten.metaPath);
      const currentMd = fs.readFileSync(input.draftWritten.skillPath, "utf8");
      const merged = mergeSkillPitfallsIntoDraftMarkdown({
        skillMarkdown: currentMd,
        newPitfallLines: mapped.skillPitfallLines,
      });
      appendedCount = merged.appendedCount;
      if (merged.skillMarkdown !== currentMd) {
        writeProjectHistorySkillgenDraft({
          projectId: input.projectId,
          draftId: path.basename(input.draftWritten.draftDir),
          skillMarkdown: merged.skillMarkdown,
          episodeId: input.successEpisode.episodeId,
          sourceMessageIds: meta.sourceMessageIds,
          name: meta.name,
          description: meta.description,
        });
      }
    } catch (error: unknown) {
      console.error(
        LOG_PREFIX,
        "pitfalls_draft_merge_failed",
        input.projectId,
        error,
      );
      pushMetric({
        projectId: input.projectId,
        episodeId: input.successEpisode.episodeId,
        state: input.successEpisode.state,
        reason: "pitfalls_draft_merge_failed",
        nowIso,
      });
    }

    try {
      const existing = readProjectHistoryLearnedPitfalls(input.projectId);
      const items = upsertLearned(existing.items, mapped.localEntries);
      writeProjectHistoryLearnedPitfalls({
        projectId: input.projectId,
        file: { items, updatedAt: nowIso },
      });
      writeProjectHistorySkillgenFlags({
        projectId: input.projectId,
        file: {
          historyLearnedPitfalls:
            items.length === 0
              ? null
              : {
                  active: true,
                  count: items.length,
                  updatedAt: nowIso,
                  summary: `${items.length} recent pitfalls from project history (local)`,
                },
          updatedAt: nowIso,
        },
      });
      pushMetric({
        projectId: input.projectId,
        episodeId: input.successEpisode.episodeId,
        state: input.successEpisode.state,
        reason: "pitfalls_attached",
        nowIso,
      });
      return { appendedCount, storedCount: items.length, ok: true };
    } catch (error: unknown) {
      console.error(LOG_PREFIX, "pitfalls_store_failed", input.projectId, error);
      pushMetric({
        projectId: input.projectId,
        episodeId: input.successEpisode.episodeId,
        state: input.successEpisode.state,
        reason: "pitfalls_store_failed",
        nowIso,
      });
      return { appendedCount, storedCount: 0, ok: false };
    }
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "pitfalls_attach_failed", input.projectId, error);
    pushMetric({
      projectId: input.projectId,
      episodeId: input.successEpisode.episodeId,
      state: input.successEpisode.state,
      reason: "pitfalls_attach_failed",
      nowIso,
    });
    return { appendedCount: 0, storedCount: 0, ok: false };
  }
};
