import { describe, expect, it } from "vitest";

import {
  parseKnowledgeHeartbeat,
  resolveKnowledgeComputerStatus,
} from "@/lib/knowledge/parseKnowledgeHeartbeat";

const capabilities = {
  enabled: true,
  storage: "sqlite",
  ollama: "ready",
  embedModel: "nomic-embed-text",
  cardCount: 12,
};

const dailyRow = {
  projectId: "p1",
  day: "2026-10-05",
  runs: 4,
  holdoutRuns: 1,
  runsWith: 3,
  repeatsWith: 0,
  repeatsHoldout: 1,
  cardsInjected: 5,
  injectedTokens: 600,
  mistakesAvoided: 2,
  estTokensSaved: 3000,
  correctionTurns: 1,
};

describe("parseKnowledgeHeartbeat", () => {
  it("accepts a valid block", () => {
    const parsed = parseKnowledgeHeartbeat({
      knowledge: { capabilities, daily: [dailyRow] },
    });
    expect(parsed?.capabilities.cardCount).toBe(12);
    expect(parsed?.daily).toHaveLength(1);
  });

  it("drops malformed daily rows but keeps capabilities", () => {
    const parsed = parseKnowledgeHeartbeat({
      knowledge: {
        capabilities,
        daily: [
          { ...dailyRow, day: "yesterday" },
          { ...dailyRow, runs: -1 },
          { ...dailyRow, projectId: "" },
          dailyRow,
        ],
      },
    });
    expect(parsed?.daily).toHaveLength(1);
  });

  it("rejects missing or invalid capabilities", () => {
    expect(parseKnowledgeHeartbeat(undefined)).toBeNull();
    expect(parseKnowledgeHeartbeat({ knowledge: {} })).toBeNull();
    expect(
      parseKnowledgeHeartbeat({
        knowledge: { capabilities: { ...capabilities, storage: "redis" } },
      }),
    ).toBeNull();
  });
});

describe("resolveKnowledgeComputerStatus", () => {
  it("maps capabilities to a status", () => {
    const base = parseKnowledgeHeartbeat({
      knowledge: { capabilities },
    })!.capabilities;
    expect(resolveKnowledgeComputerStatus(base)).toBe("ready");
    expect(resolveKnowledgeComputerStatus({ ...base, ollama: "missing" })).toBe(
      "degraded",
    );
    expect(resolveKnowledgeComputerStatus({ ...base, storage: "none" })).toBe(
      "unavailable",
    );
    expect(resolveKnowledgeComputerStatus({ ...base, enabled: false })).toBe(
      "off",
    );
    expect(resolveKnowledgeComputerStatus(null)).toBe("unknown");
  });

  it("calls a ready or keyword-only computer stale after 15 minutes without a report", () => {
    const base = parseKnowledgeHeartbeat({
      knowledge: { capabilities },
    })!.capabilities;
    const now = Date.parse("2026-10-10T12:00:00Z");
    const ago = (minutes: number) =>
      new Date(now - minutes * 60_000).toISOString();
    expect(resolveKnowledgeComputerStatus(base, ago(5), now)).toBe("ready");
    expect(resolveKnowledgeComputerStatus(base, ago(16), now)).toBe("stale");
    expect(
      resolveKnowledgeComputerStatus(
        { ...base, ollama: "missing" },
        ago(60),
        now,
      ),
    ).toBe("stale");
    // A problem the owner has to fix is not hidden behind "offline".
    expect(
      resolveKnowledgeComputerStatus(
        { ...base, storage: "none" },
        ago(600),
        now,
      ),
    ).toBe("unavailable");
    expect(resolveKnowledgeComputerStatus(base, null, now)).toBe("ready");
    expect(resolveKnowledgeComputerStatus(base, "not a date", now)).toBe(
      "ready",
    );
  });
});
