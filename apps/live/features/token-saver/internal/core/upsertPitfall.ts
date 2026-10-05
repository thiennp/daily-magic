import type { Pitfall, UpsertPitfallInput } from "../../public-api/types";
import type { PitfallDatabase } from "./openPitfallDb";
import { insertPitfallRow, selectPitfall } from "./pitfallDbStatements";
import { selectPitfallHit } from "./pitfallHitStatements";
import { listShadowedPitfalls } from "./listPitfalls";
import { countActivePitfalls } from "./shadowPitfalls";
import {
  assertActiveCapAllows,
  validatePitfallFieldLengths,
  type PitfallValidationError,
} from "./validatePitfallUpsert";

export type UpsertPitfallResult =
  | { readonly ok: true; readonly pitfall: Pitfall }
  | { readonly ok: false; readonly error: PitfallValidationError };

/**
 * Upsert a project row. Editing a seed id with projectId creates an override;
 * seed rows (project_id='') are never rewritten. Hit counters are never written.
 */
export const upsertPitfallInDb = (
  db: PitfallDatabase,
  input: UpsertPitfallInput,
): UpsertPitfallResult => {
  const lengthError = validatePitfallFieldLengths(input);
  if (lengthError !== null) {
    return { ok: false, error: lengthError };
  }

  const id = input.id.trim();
  const existing = selectPitfall(db, input.projectId, id);
  const counters = selectPitfallHit(db, input.projectId, id);
  const source = input.source ?? "project";
  const next: Pitfall = {
    id,
    projectId: input.projectId,
    symptom: input.symptom,
    cause: input.cause,
    avoidance: input.avoidance,
    check: input.check,
    keywords: input.keywords,
    tags: input.tags ?? [],
    source,
    // Counters are read-only here: they live in pitfall_hits and survive upserts.
    hitCount: counters.hitCount,
    lastSeenAt: counters.lastSeenAt,
    severity: input.severity ?? existing?.severity ?? "warn",
  };

  const current = listShadowedPitfalls(db, {
    projectId: input.projectId,
    includeRetired: true,
  });
  const withoutId = current.filter((row) => row.id !== next.id);
  const activeAfter = countActivePitfalls([...withoutId, next]);
  const capError = assertActiveCapAllows({ activeCountAfter: activeAfter });
  if (capError !== null) {
    return { ok: false, error: capError };
  }

  insertPitfallRow(db, next);
  return { ok: true, pitfall: next };
};
