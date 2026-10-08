import { createHash, randomUUID } from "node:crypto";

import type { KnowledgeDatabase } from "./knowledgeDb";
import {
  EPISODE_MAX_FILES,
  EPISODE_PROJECT_CARD_CAP,
  EPISODE_REQUEST_MAX_CHARS,
  EPISODE_TAKEAWAY_MAX_CHARS,
  type EpisodeCard,
  type EpisodeCardInput,
  type EpisodeCardWithVector,
  type EpisodeKind,
  type EpisodeOutcome,
} from "./episode.types";

type EpisodeRow = {
  id: string;
  project_key: string;
  kind: string;
  request: string;
  takeaway: string;
  files_json: string;
  commit_shas_json: string;
  branch: string | null;
  outcome: string;
  supersedes: string | null;
  fingerprint: string | null;
  occurrences: number;
  hits: number;
  useful_count: number;
  ineffective_count: number;
  cost_tokens: number;
  source_run_id: string | null;
  embed_model: string | null;
  created_at: string;
  updated_at: string;
  vector?: Uint8Array | null;
};

const parseStringArray = (raw: string): string[] => {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
};

const toCard = (row: EpisodeRow): EpisodeCard => ({
  id: row.id,
  projectKey: row.project_key,
  kind: row.kind as EpisodeKind,
  request: row.request,
  takeaway: row.takeaway,
  files: parseStringArray(row.files_json),
  commitShas: parseStringArray(row.commit_shas_json),
  branch: row.branch,
  outcome: row.outcome as EpisodeOutcome,
  supersedes: row.supersedes,
  fingerprint: row.fingerprint,
  occurrences: row.occurrences,
  hits: row.hits,
  usefulCount: row.useful_count,
  ineffectiveCount: row.ineffective_count,
  costTokens: row.cost_tokens,
  sourceRunId: row.source_run_id,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  embedModel: row.embed_model,
});

export const decodeVector = (
  blob: Uint8Array | null | undefined,
): Float32Array | null => {
  if (blob === null || blob === undefined || blob.byteLength % 4 !== 0) {
    return null;
  }
  const copy = new Uint8Array(blob);
  return new Float32Array(copy.buffer, 0, copy.byteLength / 4);
};

export const encodeVector = (vector: readonly number[]): Buffer =>
  Buffer.from(new Float32Array(vector).buffer);

const buildContentHash = (input: EpisodeCardInput): string =>
  createHash("sha256")
    .update(`${input.kind}|${input.takeaway.toLowerCase().trim()}`)
    .digest("hex")
    .slice(0, 24);

export type UpsertEpisodeResult = {
  readonly id: string;
  readonly created: boolean;
  readonly occurrences: number;
};

/** Insert a card, or bump `occurrences` when the same takeaway already exists. */
export const upsertEpisode = (
  db: KnowledgeDatabase,
  input: EpisodeCardInput,
): UpsertEpisodeResult => {
  const contentHash = buildContentHash(input);
  const now = new Date().toISOString();
  const existing = db
    .prepare(
      "SELECT id, occurrences, commit_shas_json FROM episodes WHERE project_key = ? AND content_hash = ?",
    )
    .get(input.projectKey, contentHash) as unknown as
    { id: string; occurrences: number; commit_shas_json: string } | undefined;

  if (existing !== undefined) {
    const mergedShas = Array.from(
      new Set([
        ...parseStringArray(existing.commit_shas_json),
        ...(input.commitShas ?? []),
      ]),
    );
    db.prepare(
      `UPDATE episodes SET occurrences = occurrences + 1, updated_at = ?,
         commit_shas_json = ?, outcome = ?, cost_tokens = MAX(cost_tokens, ?)
       WHERE id = ?`,
    ).run(
      now,
      JSON.stringify(mergedShas),
      input.outcome,
      input.costTokens ?? 0,
      existing.id,
    );
    return {
      id: existing.id,
      created: false,
      occurrences: existing.occurrences + 1,
    };
  }

  const id = randomUUID();
  db.prepare(
    `INSERT INTO episodes (id, project_key, kind, request, takeaway, files_json,
       commit_shas_json, branch, outcome, supersedes, fingerprint, content_hash,
       cost_tokens, source_run_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.projectKey,
    input.kind,
    input.request.slice(0, EPISODE_REQUEST_MAX_CHARS),
    input.takeaway.slice(0, EPISODE_TAKEAWAY_MAX_CHARS),
    JSON.stringify((input.files ?? []).slice(0, EPISODE_MAX_FILES)),
    JSON.stringify(input.commitShas ?? []),
    input.branch ?? null,
    input.outcome,
    input.supersedes ?? null,
    input.fingerprint ?? null,
    contentHash,
    input.costTokens ?? 0,
    input.sourceRunId ?? null,
    now,
    now,
  );
  return { id, created: true, occurrences: 1 };
};

export const setEpisodeVector = (
  db: KnowledgeDatabase,
  episodeId: string,
  vector: readonly number[],
  embedModel: string,
): void => {
  db.prepare(
    `INSERT INTO episode_vectors (episode_id, vector, dim) VALUES (?, ?, ?)
     ON CONFLICT(episode_id) DO UPDATE SET vector = excluded.vector, dim = excluded.dim`,
  ).run(episodeId, encodeVector(vector), vector.length);
  db.prepare("UPDATE episodes SET embed_model = ? WHERE id = ?").run(
    embedModel,
    episodeId,
  );
};

export const listEpisodesWithVectors = (
  db: KnowledgeDatabase,
  projectKey: string,
  options: { readonly withVectors: boolean },
): EpisodeCardWithVector[] => {
  const rows = db
    .prepare(
      options.withVectors
        ? `SELECT e.*, v.vector AS vector FROM episodes e
           LEFT JOIN episode_vectors v ON v.episode_id = e.id
           WHERE e.project_key = ? AND e.outcome != 'superseded'`
        : `SELECT e.* FROM episodes e
           WHERE e.project_key = ? AND e.outcome != 'superseded'`,
    )
    .all(projectKey) as unknown as EpisodeRow[];
  return rows.map((row) => ({
    ...toCard(row),
    vector: decodeVector(row.vector),
  }));
};

export const listEpisodesMissingVectors = (
  db: KnowledgeDatabase,
  projectKey: string,
  limit: number,
): EpisodeCard[] =>
  (
    db
      .prepare(
        `SELECT e.* FROM episodes e
         LEFT JOIN episode_vectors v ON v.episode_id = e.id
         WHERE e.project_key = ? AND v.episode_id IS NULL
         ORDER BY e.created_at DESC LIMIT ?`,
      )
      .all(projectKey, limit) as unknown as EpisodeRow[]
  ).map(toCard);

export const getEpisode = (
  db: KnowledgeDatabase,
  episodeId: string,
): EpisodeCard | null => {
  const row = db
    .prepare("SELECT * FROM episodes WHERE id = ?")
    .get(episodeId) as unknown as EpisodeRow | undefined;
  return row === undefined ? null : toCard(row);
};

export const findEpisodeByFingerprint = (
  db: KnowledgeDatabase,
  projectKey: string,
  fingerprint: string,
): EpisodeCard | null => {
  const row = db
    .prepare(
      "SELECT * FROM episodes WHERE project_key = ? AND fingerprint = ? AND kind = 'mistake' LIMIT 1",
    )
    .get(projectKey, fingerprint) as unknown as EpisodeRow | undefined;
  return row === undefined ? null : toCard(row);
};

export const findEpisodesByCommit = (
  db: KnowledgeDatabase,
  projectKey: string,
  sha: string,
): EpisodeCard[] =>
  (
    db
      .prepare(
        "SELECT * FROM episodes WHERE project_key = ? AND commit_shas_json LIKE ?",
      )
      .all(projectKey, `%${sha.slice(0, 7)}%`) as unknown as EpisodeRow[]
  ).map(toCard);

export const markEpisodeSuperseded = (
  db: KnowledgeDatabase,
  episodeId: string,
): void => {
  db.prepare(
    "UPDATE episodes SET outcome = 'superseded', updated_at = ? WHERE id = ?",
  ).run(new Date().toISOString(), episodeId);
};

export const attachCommitsToEpisode = (
  db: KnowledgeDatabase,
  episodeId: string,
  shas: readonly string[],
): void => {
  const card = getEpisode(db, episodeId);
  if (card === null) {
    return;
  }
  db.prepare(
    "UPDATE episodes SET commit_shas_json = ?, outcome = 'verified', updated_at = ? WHERE id = ?",
  ).run(
    JSON.stringify(Array.from(new Set([...card.commitShas, ...shas]))),
    new Date().toISOString(),
    episodeId,
  );
};

/** Unverified `fix` cards touching any of these files (for the commit reconciler). */
export const listUnverifiedFixesTouching = (
  db: KnowledgeDatabase,
  projectKey: string,
): EpisodeCard[] =>
  (
    db
      .prepare(
        "SELECT * FROM episodes WHERE project_key = ? AND kind = 'fix' AND outcome = 'unverified' AND commit_shas_json = '[]'",
      )
      .all(projectKey) as unknown as EpisodeRow[]
  ).map(toCard);

export const recordInjections = (
  db: KnowledgeDatabase,
  runId: string,
  items: readonly { readonly episodeId: string; readonly score: number }[],
): void => {
  for (const item of items) {
    db.prepare(
      "INSERT OR IGNORE INTO injections (run_id, episode_id, score) VALUES (?, ?, ?)",
    ).run(runId, item.episodeId, item.score);
    db.prepare("UPDATE episodes SET hits = hits + 1 WHERE id = ?").run(
      item.episodeId,
    );
  }
};

export const listInjectedEpisodeIds = (
  db: KnowledgeDatabase,
  runId: string,
): string[] =>
  (
    db
      .prepare("SELECT episode_id FROM injections WHERE run_id = ?")
      .all(runId) as unknown as { episode_id: string }[]
  ).map((row) => row.episode_id);

export type KnowledgeEventInput = {
  readonly runId: string;
  readonly projectKey: string;
  readonly taskClass: string;
  readonly mode: string;
  readonly holdout: boolean;
  readonly cardsInjected: number;
  readonly injectedTokens: number;
  readonly checkLatencyMs: number;
  readonly degraded: string | null;
};

export const insertKnowledgeEvent = (
  db: KnowledgeDatabase,
  input: KnowledgeEventInput,
): void => {
  db.prepare(
    `INSERT OR REPLACE INTO knowledge_events (id, run_id, project_key, ts, task_class,
       mode, holdout, cards_injected, injected_tokens, check_latency_ms, degraded)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    randomUUID(),
    input.runId,
    input.projectKey,
    new Date().toISOString(),
    input.taskClass,
    input.mode,
    input.holdout ? 1 : 0,
    input.cardsInjected,
    input.injectedTokens,
    input.checkLatencyMs,
    input.degraded,
  );
};

export const finishKnowledgeEvent = (
  db: KnowledgeDatabase,
  input: {
    readonly runId: string;
    readonly outcome: "pass" | "fail";
    readonly repeatedMistake: boolean;
    readonly createdMistake: boolean;
  },
): void => {
  db.prepare(
    `UPDATE knowledge_events SET outcome = ?, repeated_mistake = ?, created_mistake = ?
     WHERE run_id = ?`,
  ).run(
    input.outcome,
    input.repeatedMistake ? 1 : 0,
    input.createdMistake ? 1 : 0,
    input.runId,
  );
};

export const bumpCorrectionTurns = (
  db: KnowledgeDatabase,
  runId: string,
): void => {
  db.prepare(
    "UPDATE knowledge_events SET correction_turns = correction_turns + 1 WHERE run_id = ?",
  ).run(runId);
};

export const recordMistakeHit = (
  db: KnowledgeDatabase,
  input: {
    readonly episodeId: string;
    readonly runId: string;
    readonly prevented: boolean;
  },
): void => {
  db.prepare(
    "INSERT INTO mistake_hits (episode_id, run_id, prevented, ts) VALUES (?, ?, ?, ?)",
  ).run(
    input.episodeId,
    input.runId,
    input.prevented ? 1 : 0,
    new Date().toISOString(),
  );
};

export const incrementEpisodeCounter = (
  db: KnowledgeDatabase,
  episodeId: string,
  counter: "useful_count" | "ineffective_count",
): void => {
  db.prepare(
    `UPDATE episodes SET ${counter} = ${counter} + 1 WHERE id = ?`,
  ).run(episodeId);
};

/** Keep at most `cap` cards: drop never-used first, then oldest. */
export const pruneEpisodes = (
  db: KnowledgeDatabase,
  projectKey: string,
  cap: number = EPISODE_PROJECT_CARD_CAP,
): number => {
  const total = (
    db
      .prepare("SELECT COUNT(*) AS n FROM episodes WHERE project_key = ?")
      .get(projectKey) as unknown as { n: number }
  ).n;
  if (total <= cap) {
    return 0;
  }
  const excess = total - cap;
  const victims = db
    .prepare(
      `SELECT id FROM episodes WHERE project_key = ?
       ORDER BY (hits = 0 AND useful_count = 0) DESC, created_at ASC LIMIT ?`,
    )
    .all(projectKey, excess) as unknown as { id: string }[];
  for (const victim of victims) {
    db.prepare("DELETE FROM episodes WHERE id = ?").run(victim.id);
  }
  return victims.length;
};
