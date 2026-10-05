import type { PitfallDatabase } from "./openPitfallDb";
import { listBundledSeedPitfalls } from "./pitfallSeedRows";
import { insertPitfallRow, selectPitfall } from "./pitfallDbStatements";

/**
 * Idempotent seed: insert missing seed rows; never rewrite existing seed content
 * (project overrides and hit counts stay intact).
 */
export const seedPitfallsIdempotent = (db: PitfallDatabase): number => {
  const seeds = listBundledSeedPitfalls();
  return seeds.reduce((inserted, seed) => {
    const existing = selectPitfall(db, null, seed.id);
    if (existing !== null) {
      return inserted;
    }
    insertPitfallRow(db, seed);
    return inserted + 1;
  }, 0);
};
