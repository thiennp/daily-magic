import { describe, expect, it } from "vitest";

import { buildKnowledgeQuery } from "./buildKnowledgeQuery";
import { classifyKnowledgeTaskClass } from "./classifyKnowledgeTaskClass";
import type { EpisodeCardWithVector, EpisodeKind } from "./episode.types";
import { resolveKnowledgePlan } from "./knowledgePlan";
import { packKnowledgeCardsToBudget } from "./packKnowledgeCards";
import {
  scoreKnowledgeCards,
  selectDiverseKnowledgeCards,
} from "./scoreKnowledgeCards";

const buildCard = (
  overrides: Partial<EpisodeCardWithVector> & { id: string; takeaway: string },
): EpisodeCardWithVector => ({
  projectKey: "p1",
  kind: "mistake" as EpisodeKind,
  request: "",
  files: [],
  commitShas: [],
  branch: null,
  outcome: "failed",
  supersedes: null,
  fingerprint: null,
  occurrences: 1,
  hits: 0,
  usefulCount: 0,
  ineffectiveCount: 0,
  costTokens: 0,
  sourceRunId: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  embedModel: null,
  vector: null,
  ...overrides,
});

describe("classifyKnowledgeTaskClass", () => {
  it("treats file paths, fences and fix intent as code", () => {
    expect(classifyKnowledgeTaskClass("look at src/app/page.tsx")).toBe("code");
    expect(classifyKnowledgeTaskClass("fix the login bug")).toBe("code");
    expect(classifyKnowledgeTaskClass("sửa lỗi đăng nhập")).toBe("code");
  });
  it("treats plain questions as chat", () => {
    expect(classifyKnowledgeTaskClass("what is a monad?")).toBe("chat");
  });
});

describe("resolveKnowledgePlan", () => {
  it("skips when the CLI already holds the session", () => {
    expect(
      resolveKnowledgePlan({
        contextBudget: "minimal",
        continuationStrategy: "cli_continue",
        taskClass: "code",
      }).mode,
    ).toBe("skip");
  });
  it("routes chat to a small lexical plan", () => {
    const plan = resolveKnowledgePlan({
      contextBudget: "standard",
      continuationStrategy: "none",
      taskClass: "chat",
    });
    expect(plan).toMatchObject({ mode: "fts", tokenBudget: 150, maxCards: 2 });
  });
  it("gives code tasks 300 tokens, and 800 when the budget is full or seeded", () => {
    const base = { taskClass: "code", continuationStrategy: "none" } as const;
    expect(
      resolveKnowledgePlan({ ...base, contextBudget: "standard" }).tokenBudget,
    ).toBe(300);
    expect(
      resolveKnowledgePlan({ ...base, contextBudget: "full" }).tokenBudget,
    ).toBe(800);
    expect(
      resolveKnowledgePlan({
        taskClass: "code",
        contextBudget: "standard",
        continuationStrategy: "source_run_seed",
      }).maxCards,
    ).toBe(6);
  });
});

describe("buildKnowledgeQuery", () => {
  it("caps text at 400 chars and extracts files and terms", () => {
    const query = buildKnowledgeQuery(
      `fix src/lib/auth.ts ${"x".repeat(1000)}`,
    );
    expect(query.text.length).toBe(400);
    expect(query.files).toEqual(["src/lib/auth.ts"]);
    expect(query.terms).toContain("auth");
  });
});

describe("scoreKnowledgeCards + selection", () => {
  const query = buildKnowledgeQuery("fix the login redirect loop in auth.ts");
  const relevant = buildCard({
    id: "a",
    takeaway: "Login redirect loop came from stale cookie in auth.ts",
    files: ["src/lib/auth.ts"],
  });
  const unrelated = buildCard({
    id: "b",
    takeaway: "Database migration needs a backfill step",
  });

  it("ranks the relevant card first and drops unrelated ones below minScore", () => {
    const scored = scoreKnowledgeCards({
      cards: [unrelated, relevant],
      query,
      queryVector: null,
      mode: "fts",
      kinds: ["mistake"],
    });
    const selected = selectDiverseKnowledgeCards(scored, 0.3);
    expect(selected.map((entry) => entry.card.id)).toEqual(["a"]);
  });

  it("excludes superseded cards and penalises ineffective ones", () => {
    const scored = scoreKnowledgeCards({
      cards: [
        { ...relevant, outcome: "superseded" },
        { ...relevant, id: "c", ineffectiveCount: 3 },
        relevant,
      ],
      query,
      queryVector: null,
      mode: "fts",
      kinds: ["mistake"],
    });
    expect(scored).toHaveLength(2);
    const byId = Object.fromEntries(scored.map((e) => [e.card.id, e.score]));
    expect(byId.c).toBeLessThan(byId.a ?? 0);
  });

  it("blends cosine into hybrid scores", () => {
    const vector = new Float32Array([1, 0]);
    const scored = scoreKnowledgeCards({
      cards: [{ ...relevant, vector }],
      query,
      queryVector: new Float32Array([1, 0]),
      mode: "hybrid",
      kinds: ["mistake"],
    });
    expect(scored[0]?.cosine).toBeCloseTo(1);
  });

  it("drops near-duplicate takeaways", () => {
    const duplicate = { ...relevant, id: "dup" };
    const scored = scoreKnowledgeCards({
      cards: [relevant, duplicate],
      query,
      queryVector: null,
      mode: "fts",
      kinds: ["mistake"],
    });
    expect(selectDiverseKnowledgeCards(scored, 0.1)).toHaveLength(1);
  });
});

describe("packKnowledgeCardsToBudget", () => {
  const entry = (
    id: string,
    kind: EpisodeKind,
    takeaway: string,
    score: number,
  ) => ({
    card: buildCard({ id, kind, takeaway }),
    score,
    lexical: score,
    cosine: null,
  });

  it("puts mistakes first and respects the token budget", () => {
    const packed = packKnowledgeCardsToBudget({
      cards: [
        entry("l", "lesson", "a lesson ".repeat(8), 0.9),
        entry("m", "mistake", "avoid the thing ".repeat(4), 0.5),
      ],
      tokenBudget: 60,
      maxCards: 5,
      promptText: "",
    });
    expect(packed.cards[0]?.card.id).toBe("m");
    expect(packed.tokens).toBeLessThanOrEqual(60);
  });

  it("returns empty text when nothing fits or the prompt already says it", () => {
    const only = entry("m", "mistake", "already in prompt", 0.9);
    expect(
      packKnowledgeCardsToBudget({
        cards: [only],
        tokenBudget: 300,
        maxCards: 3,
        promptText: "please note already in prompt",
      }).text,
    ).toBe("");
    expect(
      packKnowledgeCardsToBudget({
        cards: [only],
        tokenBudget: 5,
        maxCards: 3,
        promptText: "",
      }).text,
    ).toBe("");
  });
});
