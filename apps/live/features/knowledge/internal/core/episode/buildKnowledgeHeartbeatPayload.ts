import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { resolveKnowledgeEmbedModel } from "./embedKnowledgeText";
import {
  buildKnowledgeSharedCards,
  type KnowledgeSharedCard,
} from "./buildKnowledgeSharedCards";
import { getKnowledgeDb, type KnowledgeDatabase } from "./knowledgeDb";
import { isKnowledgeEnabled } from "./knowledgeProjectKey";

const DAILY_SYNC_INTERVAL_MS = 10 * 60 * 1_000;
const OLLAMA_CHECK_INTERVAL_MS = 5 * 60 * 1_000;
const OLLAMA_CHECK_TIMEOUT_MS = 300;
const SYNC_WINDOW_DAYS = 2;
const DAY_MS = 24 * 60 * 60 * 1_000;

export type KnowledgeDailyAggregate = {
  readonly projectId: string;
  readonly day: string;
  readonly runs: number;
  readonly holdoutRuns: number;
  readonly runsWith: number;
  readonly repeatsWith: number;
  readonly repeatsHoldout: number;
  readonly cardsInjected: number;
  readonly injectedTokens: number;
  readonly mistakesAvoided: number;
  readonly estTokensSaved: number;
  readonly correctionTurns: number;
};

export type KnowledgeCapabilities = {
  readonly enabled: boolean;
  readonly storage: "sqlite" | "none";
  readonly ollama: "ready" | "missing";
  readonly embedModel: string;
  readonly cardCount: number;
};

export type KnowledgeHeartbeatPayload = {
  readonly capabilities: KnowledgeCapabilities;
  readonly daily?: readonly KnowledgeDailyAggregate[];
  /** Note text, only for projects with `knowledgeShare` on. */
  readonly cards?: readonly KnowledgeSharedCard[];
  /** Projects whose shared notes the server should drop (`knowledgeShare` off). */
  readonly shareOffProjectIds?: readonly string[];
  /** Per project skill savings and miss stats (counts only), when provided. */
  readonly skillStats?: readonly unknown[];
};

/** Optional contributions from other slices (kept out to avoid import cycles). */
export type KnowledgeHeartbeatExtras = {
  readonly skillStats?: (db: KnowledgeDatabase) => readonly unknown[];
};

const ollamaCache: { checkedAt: number; status: "ready" | "missing" } = {
  checkedAt: 0,
  status: "missing",
};
const dailyCache: { sentAt: number } = { sentAt: 0 };

const checkOllamaReady = async (now: number): Promise<"ready" | "missing"> => {
  if (now - ollamaCache.checkedAt < OLLAMA_CHECK_INTERVAL_MS) {
    return ollamaCache.status;
  }
  const baseUrl =
    process.env.AGENT_WITCH_OLLAMA_URL?.trim() || "http://127.0.0.1:11434";
  const model = resolveKnowledgeEmbedModel();
  let status: "ready" | "missing" = "missing";
  try {
    const response = await fetch(`${baseUrl}/api/tags`, {
      signal: AbortSignal.timeout(OLLAMA_CHECK_TIMEOUT_MS),
    });
    if (response.ok) {
      const body = (await response.json()) as {
        models?: { name?: string }[];
      };
      status = (body.models ?? []).some((entry) =>
        entry.name?.startsWith(model),
      )
        ? "ready"
        : "missing";
    }
  } catch {
    status = "missing";
  }
  ollamaCache.checkedAt = now;
  ollamaCache.status = status;
  return status;
};

type EventAggregateRow = {
  project_key: string;
  day: string;
  runs: number;
  holdout_runs: number;
  runs_with: number;
  repeats_with: number;
  repeats_holdout: number;
  cards_injected: number;
  injected_tokens: number;
  correction_turns: number;
};

type AvoidedAggregateRow = {
  project_key: string;
  day: string;
  n: number;
  cost: number;
};

/** Per project (real ids only) and UTC day aggregates; no prompts or card text. */
export const buildKnowledgeDailyAggregates = (
  db: KnowledgeDatabase,
  now: number = Date.now(),
): KnowledgeDailyAggregate[] => {
  const since = new Date(now - SYNC_WINDOW_DAYS * DAY_MS).toISOString();
  const events = db
    .prepare(
      `SELECT project_key, substr(ts, 1, 10) AS day,
              COUNT(*) AS runs,
              SUM(holdout) AS holdout_runs,
              SUM(CASE WHEN holdout = 0 THEN 1 ELSE 0 END) AS runs_with,
              SUM(CASE WHEN holdout = 0 AND repeated_mistake = 1 THEN 1 ELSE 0 END) AS repeats_with,
              SUM(CASE WHEN holdout = 1 AND repeated_mistake = 1 THEN 1 ELSE 0 END) AS repeats_holdout,
              SUM(CASE WHEN holdout = 0 THEN cards_injected ELSE 0 END) AS cards_injected,
              SUM(CASE WHEN holdout = 0 THEN injected_tokens ELSE 0 END) AS injected_tokens,
              SUM(correction_turns) AS correction_turns
       FROM knowledge_events
       WHERE ts >= ? AND project_key NOT LIKE 'path:%'
       GROUP BY project_key, day`,
    )
    .all(since) as unknown as EventAggregateRow[];
  const avoided = db
    .prepare(
      `SELECT e.project_key AS project_key, substr(h.ts, 1, 10) AS day,
              COUNT(*) AS n, SUM(e.cost_tokens) AS cost
       FROM mistake_hits h JOIN episodes e ON e.id = h.episode_id
       WHERE h.prevented = 1 AND h.ts >= ? AND e.project_key NOT LIKE 'path:%'
       GROUP BY e.project_key, day`,
    )
    .all(since) as unknown as AvoidedAggregateRow[];
  const avoidedByKey = new Map(
    avoided.map((row) => [`${row.project_key}|${row.day}`, row]),
  );

  return events.map((row) => {
    const hit = avoidedByKey.get(`${row.project_key}|${row.day}`);
    return {
      projectId: row.project_key,
      day: row.day,
      runs: row.runs,
      holdoutRuns: row.holdout_runs ?? 0,
      runsWith: row.runs_with ?? 0,
      repeatsWith: row.repeats_with ?? 0,
      repeatsHoldout: row.repeats_holdout ?? 0,
      cardsInjected: row.cards_injected ?? 0,
      injectedTokens: row.injected_tokens ?? 0,
      mistakesAvoided: hit?.n ?? 0,
      estTokensSaved: hit?.cost ?? 0,
      correctionTurns: row.correction_turns ?? 0,
    };
  });
};

const tryBuildSkillStats = (
  db: KnowledgeDatabase,
  extras: KnowledgeHeartbeatExtras,
): readonly unknown[] => {
  try {
    return extras.skillStats?.(db) ?? [];
  } catch {
    return [];
  }
};

/** Heartbeat `knowledge` block: capabilities every beat, aggregates every 10 min. */
export const buildKnowledgeHeartbeatPayload = async (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
  now: number = Date.now(),
  extras: KnowledgeHeartbeatExtras = {},
): Promise<KnowledgeHeartbeatPayload> => {
  const enabled = isKnowledgeEnabled();
  const db = enabled ? getKnowledgeDb(layout) : null;
  const cardCount =
    db === null
      ? 0
      : (
          db.prepare("SELECT COUNT(*) AS n FROM episodes").get() as unknown as {
            n: number;
          }
        ).n;
  const capabilities: KnowledgeCapabilities = {
    enabled,
    storage: db === null ? "none" : "sqlite",
    ollama: await checkOllamaReady(now),
    embedModel: resolveKnowledgeEmbedModel(),
    cardCount,
  };

  if (db === null || now - dailyCache.sentAt < DAILY_SYNC_INTERVAL_MS) {
    return { capabilities };
  }
  dailyCache.sentAt = now;
  try {
    const shared = buildKnowledgeSharedCards(db, now);
    const skillStats = tryBuildSkillStats(db, extras);
    return {
      capabilities,
      daily: buildKnowledgeDailyAggregates(db, now),
      ...(skillStats.length > 0 ? { skillStats } : {}),
      ...(shared.cards.length > 0 ? { cards: shared.cards } : {}),
      ...(shared.shareOffProjectIds.length > 0
        ? { shareOffProjectIds: shared.shareOffProjectIds }
        : {}),
    };
  } catch {
    return { capabilities };
  }
};
