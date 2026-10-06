import { randomUUID } from "node:crypto";

import { advanceProjectHistorySkillgenEpisode } from "./advanceProjectHistorySkillgenEpisode";
import { attachProjectHistoryPitfallsAfterDraft } from "./attachProjectHistoryPitfallsAfterDraft";
import type { AdvanceProjectHistorySkillgenMessage } from "./advanceProjectHistorySkillgenEpisode";
import { createOwnerLlmDraftWriter } from "./createOwnerLlmDraftWriter";
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
import { persistProjectHistorySkillgenReviewFlag } from "./persistProjectHistorySkillgenReviewFlag";
import {
  PROJECT_HISTORY_SKILL_MAX_OPEN_DRAFTS,
  PROJECT_HISTORY_SKILLGEN_OWNER_LLM_ENABLE_ENV,
} from "./projectHistory.constants";
import { computeProjectHistorySkillgenReviewFlag } from "./computeProjectHistorySkillgenReviewFlag";
import { readProjectHistorySkillgenBudget } from "./readProjectHistorySkillgenBudget";
import { readProjectHistorySkillgenEpisodes } from "./readProjectHistorySkillgenEpisodes";
import {
  countProjectHistorySkillgenOpenDrafts,
  writeProjectHistorySkillgenDraft,
} from "./writeProjectHistorySkillgenDraft";
import type { ProjectHistorySkillgenEpisodeRecord } from "./projectHistorySkillgenEpisode.type";

export type CreateDefaultProjectHistorySkillgenRunnerDeps = {
  readonly ownerLlm?: OwnerLlmDraftWriter | null;
  readonly nowMs?: () => number;
};

const LOG_PREFIX = "[project-history-skillgen]";

const resolveDefaultOwnerLlm = (
  injected: OwnerLlmDraftWriter | null | undefined,
): OwnerLlmDraftWriter | null => {
  if (injected !== undefined) {
    return injected;
  }
  if (process.env[PROJECT_HISTORY_SKILLGEN_OWNER_LLM_ENABLE_ENV] === "0") {
    return null;
  }
  return createOwnerLlmDraftWriter();
};

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

const createCapturingEpisode = (input: {
  readonly projectId: string;
  readonly messages: readonly { readonly messageId: string; readonly createdAtMs: number }[];
}): ProjectHistorySkillgenEpisodeRecord => {
  const first = input.messages[0]!;
  const last = input.messages[input.messages.length - 1]!;
  return {
    episodeId: randomUUID(),
    projectId: input.projectId,
    state: "CAPTURING",
    messageIds: input.messages.map((m) => m.messageId),
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
};

/**
 * Production skillgen runner: History-ON gate, load since cursor, advance,
 * persist. Default owner LLM = Cursor with Codex fallback (disable via env=0).
 * At draft cap: mining pauses, new episodes still captured to EPISODE_READY,
 * owner notify flag written. Never throws into the tick.
 */
export const createDefaultProjectHistorySkillgenRunner = (
  deps: CreateDefaultProjectHistorySkillgenRunnerDeps = {},
): ((input: { readonly projectId: string }) => Promise<void>) => {
  const ownerLlm = resolveDefaultOwnerLlm(deps.ownerLlm);
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

      const openDraftCount = countProjectHistorySkillgenOpenDrafts(
        input.projectId,
      );
      const reviewFlag = computeProjectHistorySkillgenReviewFlag({
        openDraftCount,
        maxOpenDrafts: PROJECT_HISTORY_SKILL_MAX_OPEN_DRAFTS,
      });
      persistProjectHistorySkillgenReviewFlag({
        projectId: input.projectId,
        reviewFlag,
        nowMs,
      });

      let episode = findActiveProjectHistorySkillgenEpisode(
        episodesFile.episodes,
        input.projectId,
      );

      // Thien lock 3: at draft cap, keep capturing new episodes (park at
      // EPISODE_READY) without processing past the pause gate.
      if (
        reviewFlag.miningPaused &&
        episode !== null &&
        episode.state === "EPISODE_READY"
      ) {
        const known = new Set(episode.messageIds);
        const newer = sinceCursor.filter((m) => !known.has(m.messageId));
        if (newer.length > 0) {
          episode = createCapturingEpisode({
            projectId: input.projectId,
            messages: newer,
          });
        }
      } else if (episode === null) {
        if (sinceCursor.length === 0) {
          return;
        }
        episode = createCapturingEpisode({
          projectId: input.projectId,
          messages: sinceCursor,
        });
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

      persistProjectHistorySkillgenReviewFlag({
        projectId: input.projectId,
        reviewFlag: result.reviewFlag,
        nowMs,
      });

      if (
        result.draftWritten !== null &&
        result.episode.state === "AWAITING_REVIEW"
      ) {
        const latestEpisodes = [
          ...episodesFile.episodes.filter(
            (row) => row.episodeId !== result.episode.episodeId,
          ),
          result.episode,
        ];
        attachProjectHistoryPitfallsAfterDraft({
          projectId: input.projectId,
          successEpisode: result.episode,
          episodes: latestEpisodes,
          draftWritten: result.draftWritten,
          nowMs,
        });
      }
    } catch (error: unknown) {
      console.error(LOG_PREFIX, "run_failed", input.projectId, error);
    }
  };
};
