import {
  PROJECT_HISTORY_SKILL_EPISODE_MESSAGE_COUNT,
  PROJECT_HISTORY_SKILL_IDLE_MS,
  PROJECT_HISTORY_SKILL_MAX_INTERVAL_MS,
} from "./projectHistory.constants";

export type ProjectHistorySkillgenCloseMessage = {
  readonly messageId: string;
  readonly createdAtMs: number;
};

export type CloseProjectHistorySkillgenEpisodeInput = {
  readonly messages: readonly ProjectHistorySkillgenCloseMessage[];
  readonly nowMs: number;
  /** Last time an episode was closed (or last mining run). Null = never. */
  readonly lastClosedAtMs: number | null;
  readonly messageCountCap?: number;
  readonly idleMs?: number;
  readonly maxIntervalMs?: number;
};

export type CloseProjectHistorySkillgenEpisodeResult =
  | {
      readonly ready: false;
      readonly reason: "empty" | "below_triggers";
    }
  | {
      readonly ready: true;
      readonly reason: "count" | "idle" | "max_interval";
      readonly messageIds: readonly string[];
    };

/**
 * Step 2 — close an episode when count, idle, or max-interval fires.
 * Pure: the caller supplies messages already scoped to the open episode.
 */
export const closeProjectHistorySkillgenEpisode = (
  input: CloseProjectHistorySkillgenEpisodeInput,
): CloseProjectHistorySkillgenEpisodeResult => {
  const messageCountCap =
    input.messageCountCap ?? PROJECT_HISTORY_SKILL_EPISODE_MESSAGE_COUNT;
  const idleMs = input.idleMs ?? PROJECT_HISTORY_SKILL_IDLE_MS;
  const maxIntervalMs =
    input.maxIntervalMs ?? PROJECT_HISTORY_SKILL_MAX_INTERVAL_MS;
  const messages = input.messages;

  if (messages.length === 0) {
    return { ready: false, reason: "empty" };
  }

  const newestCreatedAt = Math.max(...messages.map((m) => m.createdAtMs));
  const countDue = messages.length >= messageCountCap;
  const idleDue = input.nowMs - newestCreatedAt >= idleMs;
  const maxIntervalDue =
    input.lastClosedAtMs === null ||
    input.nowMs - input.lastClosedAtMs >= maxIntervalMs;

  if (!countDue && !idleDue && !maxIntervalDue) {
    return { ready: false, reason: "below_triggers" };
  }

  const reason = countDue ? "count" : idleDue ? "idle" : "max_interval";
  return {
    ready: true,
    reason,
    messageIds: messages.map((m) => m.messageId),
  };
};
