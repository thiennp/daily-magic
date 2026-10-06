import type { PitfallDatabase } from "./openPitfallDb";
import { listBundledSeedPitfalls } from "./pitfallSeedRows";
import { insertPitfallRow, selectPitfall } from "./pitfallDbStatements";
import { retireStaleLocalSeedPitfalls } from "./retireStaleLocalSeedPitfalls";

/**
 * Idempotent seed: insert missing seed rows; never rewrite existing seed content
 * (project overrides and hit counts stay intact). Seed rows no longer bundled
 * are retired (moved to the AgentWitch project when known, same id).
 */
export const seedPitfallsIdempotent = (db: PitfallDatabase): number => {
  const seeds = listBundledSeedPitfalls();
  retireStaleLocalSeedPitfalls(
    db,
    seeds.map((seed) => seed.id),
  );
  return seeds.reduce((inserted, seed) => {
    const existing = selectPitfall(db, null, seed.id);
    if (existing !== null) {
      return inserted;
    }
    insertPitfallRow(db, seed);
    return inserted + 1;
  }, 0);
};
