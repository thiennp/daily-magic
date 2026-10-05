import type { Pitfall, RecordPitfallHitInput } from "../../public-api/types";
import { getPitfallFromDb } from "./getPitfall";
import type { PitfallDatabase } from "./openPitfallDb";
import { bumpPitfallHit } from "./pitfallHitStatements";

export type RecordPitfallHitResult =
  | { readonly ok: true; readonly pitfall: Pitfall }
  | { readonly ok: false; readonly reason: "not_found" };

/**
 * Atomically bump the per-project hit counter for an existing pitfall
 * (project override or seed). Unknown ids return not_found and write nothing;
 * pitfall rows are never created or rewritten here.
 */
export const recordPitfallHitInDb = (
  db: PitfallDatabase,
  input: RecordPitfallHitInput,
): RecordPitfallHitResult => {
  const id = input.id.trim();
  const target =
    id.length === 0
      ? null
      : getPitfallFromDb(db, { projectId: input.projectId, id });

  if (target === null) {
    return { ok: false, reason: "not_found" };
  }

  const nowIso = input.nowIso ?? new Date().toISOString();
  const counters = bumpPitfallHit(db, input.projectId, target.id, nowIso);

  return {
    ok: true,
    pitfall: {
      ...target,
      hitCount: counters.hitCount,
      lastSeenAt: counters.lastSeenAt,
    },
  };
};
