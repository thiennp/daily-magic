import type { KnowledgeDatabase } from "./knowledgeDb";

const DAY_MS = 24 * 60 * 60 * 1_000;
const REVIEW_LIST_LIMIT = 10;
const UNUSED_AFTER_DAYS = 14;
const RECURRING_MISTAKE_OCCURRENCES = 3;
const INEFFECTIVE_REVIEW_THRESHOLD = 2;

export type KnowledgeWeeklyPoint = {
  readonly weekStart: string;
  readonly runsWithKnowledge: number;
  readonly repeatsWithKnowledge: number;
  readonly runsHoldout: number;
  readonly repeatsHoldout: number;
  readonly avgInjectedTokens: number;
};

export type KnowledgeAvoidedMistake = {
  readonly episodeId: string;
  readonly takeaway: string;
  readonly count: number;
  readonly commitShas: readonly string[];
};

export type KnowledgeReviewItem = {
  readonly episodeId: string;
  readonly takeaway: string;
  readonly reason: "ineffective" | "unused" | "recurring";
};

export type KnowledgeImpactSummary = {
  readonly windowDays: number;
  readonly runs: number;
  readonly holdoutRuns: number;
  readonly cardCount: number;
  readonly mistakeCards: number;
  readonly cardsInjectedTotal: number;
  readonly injectedTokensTotal: number;
  readonly injectedTokensAvg: number;
  readonly mistakesAvoided: number;
  /** Estimate: sum of the token cost of the failing runs behind each avoided mistake. */
  readonly estTokensSaved: number;
  readonly repeatRateWithKnowledge: number | null;
  readonly repeatRateHoldout: number | null;
  readonly correctionTurns: number;
  readonly checkP95Ms: number;
  readonly degradedPercent: number;
  readonly weekly: readonly KnowledgeWeeklyPoint[];
  readonly topAvoided: readonly KnowledgeAvoidedMistake[];
  readonly review: readonly KnowledgeReviewItem[];
};

type EventRow = {
  ts: string;
  holdout: number;
  cards_injected: number;
  injected_tokens: number;
  check_latency_ms: number;
  degraded: string | null;
  repeated_mistake: number;
  correction_turns: number;
  mode: string;
};

export const startOfUtcWeek = (iso: string): string => {
  const date = new Date(iso);
  const day = (date.getUTCDay() + 6) % 7;
  const monday = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() - day,
    ),
  );
  return monday.toISOString().slice(0, 10);
};

export const percentile95 = (values: readonly number[]): number => {
  if (values.length === 0) {
    return 0;
  }
  const sorted = [...values].sort((left, right) => left - right);
  return (
    sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.95) - 1)] ??
    0
  );
};

const rate = (part: number, total: number): number | null =>
  total === 0 ? null : part / total;

export const buildWeeklyPoints = (
  events: readonly EventRow[],
): KnowledgeWeeklyPoint[] => {
  const weeks = new Map<string, EventRow[]>();
  for (const event of events) {
    const key = startOfUtcWeek(event.ts);
    weeks.set(key, [...(weeks.get(key) ?? []), event]);
  }
  return Array.from(weeks.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([weekStart, rows]) => {
      const withKnowledge = rows.filter((row) => row.holdout === 0);
      const holdout = rows.filter((row) => row.holdout === 1);
      return {
        weekStart,
        runsWithKnowledge: withKnowledge.length,
        repeatsWithKnowledge: withKnowledge.filter(
          (row) => row.repeated_mistake === 1,
        ).length,
        runsHoldout: holdout.length,
        repeatsHoldout: holdout.filter((row) => row.repeated_mistake === 1)
          .length,
        avgInjectedTokens:
          withKnowledge.length === 0
            ? 0
            : Math.round(
                withKnowledge.reduce(
                  (sum, row) => sum + row.injected_tokens,
                  0,
                ) / withKnowledge.length,
              ),
      };
    });
};

const buildReviewItems = (
  db: KnowledgeDatabase,
  projectFilter: {
    readonly clause: string;
    readonly params: readonly string[];
  },
): KnowledgeReviewItem[] => {
  const unusedBefore = new Date(
    Date.now() - UNUSED_AFTER_DAYS * DAY_MS,
  ).toISOString();
  const select = (where: string, extra: readonly (string | number)[]) =>
    db
      .prepare(
        `SELECT id, takeaway FROM episodes WHERE ${projectFilter.clause} AND ${where} LIMIT ${REVIEW_LIST_LIMIT}`,
      )
      .all(...projectFilter.params, ...extra) as unknown as {
      id: string;
      takeaway: string;
    }[];
  const toItems = (
    rows: { id: string; takeaway: string }[],
    reason: KnowledgeReviewItem["reason"],
  ): KnowledgeReviewItem[] =>
    rows.map((row) => ({ episodeId: row.id, takeaway: row.takeaway, reason }));

  return [
    ...toItems(
      select("ineffective_count >= ? AND outcome != 'superseded'", [
        INEFFECTIVE_REVIEW_THRESHOLD,
      ]),
      "ineffective",
    ),
    ...toItems(
      select(
        "kind = 'mistake' AND occurrences >= ? AND outcome != 'superseded'",
        [RECURRING_MISTAKE_OCCURRENCES],
      ),
      "recurring",
    ),
    ...toItems(select("hits = 0 AND created_at < ?", [unusedBefore]), "unused"),
  ];
};

/** Aggregate impact numbers for a project (or every project when `projectKey` is null). */
export const summarizeKnowledgeImpact = (
  db: KnowledgeDatabase,
  input: { readonly projectKey: string | null; readonly windowDays: number },
): KnowledgeImpactSummary => {
  const since = new Date(Date.now() - input.windowDays * DAY_MS).toISOString();
  const filter =
    input.projectKey === null
      ? { clause: "1 = 1", params: [] as string[] }
      : { clause: "project_key = ?", params: [input.projectKey] };

  const events = db
    .prepare(
      `SELECT ts, holdout, cards_injected, injected_tokens, check_latency_ms, degraded,
              repeated_mistake, correction_turns, mode
       FROM knowledge_events WHERE ${filter.clause} AND ts >= ?`,
    )
    .all(...filter.params, since) as unknown as EventRow[];
  const withKnowledge = events.filter((event) => event.holdout === 0);
  const holdout = events.filter((event) => event.holdout === 1);
  const injectedTokensTotal = withKnowledge.reduce(
    (sum, row) => sum + row.injected_tokens,
    0,
  );

  const avoided = db
    .prepare(
      `SELECT e.id AS id, e.takeaway AS takeaway, e.commit_shas_json AS shas, e.cost_tokens AS cost, COUNT(*) AS n
       FROM mistake_hits h JOIN episodes e ON e.id = h.episode_id
       WHERE h.prevented = 1 AND h.ts >= ? AND ${filter.clause.replace("project_key", "e.project_key")}
       GROUP BY e.id ORDER BY n DESC`,
    )
    .all(since, ...filter.params) as unknown as {
    id: string;
    takeaway: string;
    shas: string;
    cost: number;
    n: number;
  }[];

  const counts = db
    .prepare(
      `SELECT COUNT(*) AS cards, SUM(CASE WHEN kind = 'mistake' THEN 1 ELSE 0 END) AS mistakes
       FROM episodes WHERE ${filter.clause} AND outcome != 'superseded'`,
    )
    .get(...filter.params) as unknown as {
    cards: number;
    mistakes: number | null;
  };

  return {
    windowDays: input.windowDays,
    runs: events.length,
    holdoutRuns: holdout.length,
    cardCount: counts.cards,
    mistakeCards: counts.mistakes ?? 0,
    cardsInjectedTotal: withKnowledge.reduce(
      (sum, row) => sum + row.cards_injected,
      0,
    ),
    injectedTokensTotal,
    injectedTokensAvg:
      withKnowledge.length === 0
        ? 0
        : Math.round(injectedTokensTotal / withKnowledge.length),
    mistakesAvoided: avoided.reduce((sum, row) => sum + row.n, 0),
    estTokensSaved: avoided.reduce((sum, row) => sum + row.cost * row.n, 0),
    repeatRateWithKnowledge: rate(
      withKnowledge.filter((row) => row.repeated_mistake === 1).length,
      withKnowledge.length,
    ),
    repeatRateHoldout: rate(
      holdout.filter((row) => row.repeated_mistake === 1).length,
      holdout.length,
    ),
    correctionTurns: events.reduce((sum, row) => sum + row.correction_turns, 0),
    checkP95Ms: percentile95(events.map((row) => row.check_latency_ms)),
    degradedPercent:
      events.length === 0
        ? 0
        : Math.round(
            (events.filter((row) => row.degraded !== null).length /
              events.length) *
              100,
          ),
    weekly: buildWeeklyPoints(events),
    topAvoided: avoided.slice(0, REVIEW_LIST_LIMIT).map((row) => ({
      episodeId: row.id,
      takeaway: row.takeaway,
      count: row.n,
      commitShas: (JSON.parse(row.shas) as string[]).slice(0, 3),
    })),
    review: buildReviewItems(db, filter),
  };
};
