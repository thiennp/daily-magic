import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_PITFALL_LIMITS } from "@agent-witch/shared/pitfalls";
import { PROJECT_PITFALL_SEEDS } from "@/features/project-pitfalls/internal/core/projectPitfallSeeds.constant";
import { validateProjectPitfallUpsert } from "@/features/project-pitfalls/internal/core/validateProjectPitfallUpsert";

const migrationSql = fs.readFileSync(
  path.join(process.cwd(), "db/migrations/067-project-pitfalls.sql"),
  "utf8",
);
const BANNED_COPY =
  /\bFF\b|HMAC|agent-access|signed webhook|experimental|unverified/i;

describe("PROJECT_PITFALL_SEEDS", () => {
  it("ships the 11 seeds with unique ids", () => {
    const ids = PROJECT_PITFALL_SEEDS.map((seed) => seed.id);
    expect(ids).toHaveLength(11);
    expect(new Set(ids).size).toBe(11);
    expect(ids).toEqual(
      expect.arrayContaining([
        "arch-max-lines",
        "health-lag",
        "dirty-home-checkout",
        "secrets-in-logs",
      ]),
    );
  });

  it("every seed passes upsert validation and the length limits", () => {
    PROJECT_PITFALL_SEEDS.forEach((seed) => {
      expect(validateProjectPitfallUpsert(seed).ok).toBe(true);
      expect(seed.symptom.length).toBeLessThanOrEqual(
        PROJECT_PITFALL_LIMITS.symptom,
      );
      expect(seed.avoidance.length).toBeLessThanOrEqual(
        PROJECT_PITFALL_LIMITS.avoidance,
      );
    });
  });

  it("keeps plain copy: no jargon and exact commands only in check.value", () => {
    PROJECT_PITFALL_SEEDS.forEach((seed) => {
      expect(`${seed.symptom} ${seed.avoidance}`).not.toMatch(BANNED_COPY);
      if (seed.check.kind === "command") {
        expect(`${seed.symptom} ${seed.avoidance}`).not.toContain(
          seed.check.value,
        );
      }
    });
  });

  it("block severity on the must-not-break seeds", () => {
    const blocking = PROJECT_PITFALL_SEEDS.filter(
      (seed) => seed.severity === "block",
    )
      .map((seed) => seed.id)
      .sort();
    expect(blocking).toEqual([
      "arch-max-lines",
      "dirty-home-checkout",
      "health-lag",
      "secrets-in-logs",
    ]);
  });

  it("migration 067 inserts the same seed text as the code constant", () => {
    PROJECT_PITFALL_SEEDS.forEach((seed) => {
      [
        seed.id,
        seed.symptom,
        seed.cause,
        seed.avoidance,
        seed.check.value,
      ].forEach((text) => {
        expect(migrationSql).toContain(`'${text.replace(/'/g, "''")}'`);
      });
    });
  });
});
