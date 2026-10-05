import type { Pitfall, RecordPitfallHitInput } from "../../public-api/types";
import type { PitfallDatabase } from "./openPitfallDb";
import {
  selectPitfall,
  updatePitfallHit,
} from "./pitfallDbStatements";

export type RecordPitfallHitResult =
  | { readonly ok: true; readonly pitfall: Pitfall }
  | { readonly ok: false; readonly reason: "not_found" };

/**
 * Bump hitCount + lastSeenAt on the project override if present, else the seed.
 */
export const recordPitfallHitInDb = (
  db: PitfallDatabase,
  input: RecordPitfallHitInput,
): RecordPitfallHitResult => {
  const nowIso = input.nowIso ?? new Date().toISOString();
  const override = selectPitfall(db, input.projectId, input.id);
  const target =
    override ?? selectPitfall(db, null, input.id);

  if (target === null) {
    return { ok: false, reason: "not_found" };
  }

  const nextHit = target.hitCount + 1;
  updatePitfallHit(db, target.projectId, target.id, nextHit, nowIso);

  return {
    ok: true,
    pitfall: {
      ...target,
      hitCount: nextHit,
      lastSeenAt: nowIso,
    },
  };
};
