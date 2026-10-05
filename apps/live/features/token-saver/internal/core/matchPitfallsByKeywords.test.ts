import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  PITFALL_MATCH_MAX_LINES,
  PITFALL_MATCH_MAX_TOKENS,
} from "../../public-api/types";
import { createPitfallRegistry } from "./createPitfallRegistry";
import {
  formatPitfallBotLine,
  capPitfallsForBot,
} from "./formatPitfallsForBot";
import { estimateTokenCount } from "./pitfall.constants";
import { matchPitfallsByKeywords } from "./matchPitfallsByKeywords";
import type { Pitfall } from "../../public-api/types";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

const samplePitfall = (overrides: Partial<Pitfall> & { id: string }): Pitfall => ({
  projectId: null,
  symptom: "s",
  cause: "c",
  avoidance: overrides.avoidance ?? "fix it",
  check: { kind: "id", value: `pit.${overrides.id}` },
  keywords: overrides.keywords ?? [overrides.id],
  tags: [],
  source: "seed",
  hitCount: 0,
  lastSeenAt: null,
  severity: "warn",
  ...overrides,
});

describe("matchPitfallsByKeywords", () => {
  it("returns empty on miss", () => {
    const hits = matchPitfallsByKeywords({
      pitfalls: [
        samplePitfall({
          id: "arch-max-lines",
          keywords: ["architecture", "land"],
        }),
      ],
      text: "unrelated weather report",
    });
    expect(hits).toEqual([]);
  });

  it("hits on keywords and ranks by score", () => {
    const hits = matchPitfallsByKeywords({
      pitfalls: [
        samplePitfall({
          id: "stale-next",
          keywords: ["build", "typecheck"],
          avoidance: "rm .next",
        }),
        samplePitfall({
          id: "main-moved-rebase",
          keywords: ["ship", "ff", "push", "rebase"],
          avoidance: "rebase onto -rN",
        }),
      ],
      text: "ship ff push failed after main moved",
    });
    expect(hits.map((row) => row.id)).toEqual(["main-moved-rebase"]);
  });

  it("caps bot payload to 4 lines and ~200 tokens", () => {
    const longFix = "x".repeat(200);
    const many = Array.from({ length: 8 }, (_, index) =>
      samplePitfall({
        id: `p-${index}`,
        keywords: ["match-all"],
        avoidance: `${longFix}-${index}`,
      }),
    );
    const capped = matchPitfallsByKeywords({
      pitfalls: many,
      text: "match-all please",
    });
    expect(capped.length).toBeLessThanOrEqual(PITFALL_MATCH_MAX_LINES);
    const tokenSum = capped.reduce(
      (sum, row) => sum + estimateTokenCount(formatPitfallBotLine(row)),
      0,
    );
    expect(tokenSum).toBeLessThanOrEqual(PITFALL_MATCH_MAX_TOKENS);
    expect(capPitfallsForBot(many).length).toBeLessThanOrEqual(
      PITFALL_MATCH_MAX_LINES,
    );
  });

  it("registry match hits seed keywords under p95 budget", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-pitfall-m-"));
    tempDirs.push(tempDir);
    const registry = createPitfallRegistry({
      dbPath: path.join(tempDir, "token-saver.db"),
    });

    const started = performance.now();
    const hits = registry.matchPitfalls({
      projectId: "proj-1",
      text: "architecture land before tipping Arch with ci:architecture",
    });
    const elapsedMs = performance.now() - started;

    expect(hits.some((row) => row.id === "arch-max-lines")).toBe(true);
    expect(hits.length).toBeLessThanOrEqual(PITFALL_MATCH_MAX_LINES);
    expect(elapsedMs).toBeLessThan(50);

    const miss = registry.matchPitfalls({
      projectId: "proj-1",
      text: "lorem ipsum dolor sit amet",
    });
    expect(miss).toEqual([]);
    registry.close();
  });
});
