import type { Pitfall, PitfallCheck } from "../../public-api/types";

import seedRowsJson from "./pitfallSeedRows.json";

interface SeedRowJson {
  readonly id: string;
  readonly symptom: string;
  readonly cause: string;
  readonly avoidance: string;
  readonly check: PitfallCheck;
  readonly keywords: readonly string[];
  readonly tags?: readonly string[];
}

/** Bundled seed pitfalls (API 01). Offline-capable. */
export const PITFALL_SEED_ROWS: readonly SeedRowJson[] =
  seedRowsJson as SeedRowJson[];

export const toSeedPitfall = (row: SeedRowJson): Pitfall => ({
  id: row.id,
  symptom: row.symptom,
  cause: row.cause,
  avoidance: row.avoidance,
  check: row.check,
  keywords: row.keywords,
  tags: row.tags ?? [],
  projectId: null,
  source: "seed",
  hitCount: 0,
  lastSeenAt: null,
  severity: "warn",
});

export const listBundledSeedPitfalls = (): readonly Pitfall[] =>
  PITFALL_SEED_ROWS.map(toSeedPitfall);
