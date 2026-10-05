import { randomUUID } from "node:crypto";

import { advanceProjectHistorySkillgenEpisode } from "./advanceProjectHistorySkillgenEpisode";
import type { AdvanceProjectHistorySkillgenMessage } from "./advanceProjectHistorySkillgenEpisode";
import { extractProjectHistoryMessageText } from "./extractProjectHistoryMessageText";
import { findActiveProjectHistorySkillgenEpisode } from "./findActiveProjectHistorySkillgenEpisode";
import { isLocalProjectHistoryOn } from "./isLocalProjectHistoryOn";
import { listProjectHistoryMessages } from "./listProjectHistoryMessages";
import { listProjectHistorySkillgenDraftFingerprints } from "./listProjectHistorySkillgenDraftFingerprints";
import { listProjectHistorySkillgenPublishedFingerprints } from "./listProjectHistorySkillgenPublishedFingerprints";
import { loadProjectHistorySkillgenMessagesSinceCursor } from "./loadProjectHistorySkillgenMessagesSinceCursor";
import { readLocalProjectHistoryState } from "./localProjectHistoryState";
import type { OwnerLlmDraftWriter } from "./ownerLlmDraftWriter.port";
import { persistProjectHistorySkillgenAdvance } from "./persistProjectHistorySkillgenAdvance";
import { readProjectHistorySkillgenBudget } from "./readProjectHistorySkillgenBudget";
import { readProjectHistorySkillgenEpisodes } from "./readProjectHistorySkillgenEpisodes";
import {
  countProjectHistorySkillgenOpenDrafts,
  writeProjectHistorySkillgenDraft,
} from "./writeProjectHistorySkillgenDraft";

export type CreateDefaultProjectHistorySkillgenRunnerDeps = {
  readonly ownerLlm?: OwnerLlmDraftWriter | null;
  readonly nowMs?: () => number;
};

const LOG_PREFIX = "[project-history-skillgen]";

const toAdvanceMessages = (
  projectId: string,
  messageIds: readonly string[],
): readonly AdvanceProjectHistorySkillgenMessage[] => {
  const byId = new Map<string, AdvanceProjectHistorySkillgenMessage>();
  for (const record of listProjectHistoryMessages(projectId)) {
    const savedAtMs = Date.parse(record.savedAt);
    if (Number.isNaN(savedAtMs)) {
      continue;
    }
    byId.set(record.messageId, {
      messageId: record.messageId,
      createdAtMs: savedAtMs,
      text: extractProjectHistoryMessageText(record),
    });
  }
  return messageIds
    .map((id) => byId.get(id))
    .filter((row): row is AdvanceProjectHistorySkillgenMessage => row !== undefined);
};

/**
 * Production skillgen runner: History-ON gate, load since cursor, advance,
 * persist. Owner LLM stays injected; null stops before EXTRACT with a metric.
 * Never throws into the tick.
 */
export const createDefaultProjectHistorySkillgenRunner = (
  deps: CreateDefaultProjectHistorySkillgenRunnerDeps = {},
): ((input: { readonly projectId: string }) => Promise<void>) => {
  const ownerLlm = deps.ownerLlm ?? null;
  const nowMsFn = deps.nowMs ?? Date.now;

  return async (input: { readonly projectId: string }): Promise<void> => {
    try {
      const local = readLocalProjectHistoryState(input.projectId);
      if (!isLocalProjectHistoryOn(local?.state)) {
        return;
      }
      const nowMs = nowMsFn();
      const episodesFile = readProjectHistorySkillgenEpisodes(input.projectId);
      const budget = readProjectHistorySkillgenBudget({
        projectId: input.projectId,
        nowMs,
      });
      const sinceCursor = loadProjectHistorySkillgenMessagesSinceCursor({
        projectId: input.projectId,
        cursorMessageId: episodesFile.cursorMessageId,
        cursorSavedAtMs: episodesFile.cursorSavedAtMs,
      });

      let episode = findActiveProjectHistorySkillgenEpisode(
        episodesFile.episodes,
        input.projectId,
      );

      if (episode === null) {
        if (sinceCursor.length === 0) {
          return;
        }
        const first = sinceCursor[0]!;
        const last = sinceCursor[sinceCursor.length - 1]!;
        episode = {
          episodeId: randomUUID(),
          projectId: input.projectId,
          state: "CAPTURING",
          messageIds: sinceCursor.map((m) => m.messageId),
          startedAtMs: first.createdAtMs,
          lastMessageAtMs: last.createdAtMs,
          closedAtMs: null,
          reason: null,
          scrubbedTranscript: null,
          ownerMarkedSaveAsSkill: false,
          hasSuccessSignal: false,
          validateAttempts: 0,
          draftId: null,
          contentHash: null,
          mergeDraftId: null,
          tokensUsed: 0,
        };
      } else if (episode.state === "CAPTURING" && sinceCursor.length > 0) {
        // Merge only while capturing; a parked episode (e.g. DEDUP with no owner
        // LLM) must not absorb new messages or the cursor would skip them.
        const known = new Set(episode.messageIds);
        const mergedIds = [...episode.messageIds];
        let lastMessageAtMs = episode.lastMessageAtMs;
        for (const message of sinceCursor) {
          if (!known.has(message.messageId)) {
            mergedIds.push(message.messageId);
            known.add(message.messageId);
            lastMessageAtMs = Math.max(lastMessageAtMs, message.createdAtMs);
          }
        }
        episode = {
          ...episode,
          messageIds: mergedIds,
          lastMessageAtMs,
        };
      }

      const episodeMessages = toAdvanceMessages(
        input.projectId,
        episode.messageIds,
      );
      if (episodeMessages.length === 0) {
        return;
      }

      const result = await advanceProjectHistorySkillgenEpisode({
        episode,
        messages: episodeMessages,
        tokensUsedToday: budget.tokensUsedToday,
        lastClosedAtMs: budget.lastClosedAtMs,
        nowMs,
        deps: {
          ownerLlm,
          writeDraft: writeProjectHistorySkillgenDraft,
          listDraftFingerprints: () =>
            listProjectHistorySkillgenDraftFingerprints(input.projectId),
          listPublishedFingerprints: () =>
            listProjectHistorySkillgenPublishedFingerprints(input.projectId),
          openDraftCount: () =>
            countProjectHistorySkillgenOpenDrafts(input.projectId),
        },
      });

      persistProjectHistorySkillgenAdvance({
        projectId: input.projectId,
        episodesFile,
        budget,
        result,
        nowMs,
      });
    } catch (error: unknown) {
      console.error(LOG_PREFIX, "run_failed", input.projectId, error);
    }
  };
};
