import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type {
  GetPitfallInput,
  ListPitfallsInput,
  MatchPitfallsInput,
  Pitfall,
  RecordPitfallHitInput,
  UpsertPitfallInput,
} from "../../public-api/types";
import { getPitfallFromDb } from "./getPitfall";
import {
  listPitfallsFromDb,
  type ListPitfallsResult,
} from "./listPitfalls";
import { matchPitfallsFromDb } from "./matchPitfalls";
import {
  closePitfallDb,
  openPitfallDb,
} from "./openPitfallDb";
import {
  recordPitfallHitInDb,
  type RecordPitfallHitResult,
} from "./recordPitfallHit";
import { resolveTokenSaverDbPath } from "./resolveTokenSaverDbPath";
import { seedPitfallsIdempotent } from "./seedPitfallsIdempotent";
import {
  upsertPitfallInDb,
  type UpsertPitfallResult,
} from "./upsertPitfall";

export interface PitfallRegistry {
  readonly dbPath: string;
  readonly listPitfalls: (input?: ListPitfallsInput) => ListPitfallsResult;
  readonly getPitfall: (input: GetPitfallInput) => Pitfall | null;
  readonly upsertPitfall: (input: UpsertPitfallInput) => UpsertPitfallResult;
  readonly recordHit: (input: RecordPitfallHitInput) => RecordPitfallHitResult;
  readonly matchPitfalls: (input: MatchPitfallsInput) => readonly Pitfall[];
  readonly close: () => void;
}

export const createPitfallRegistry = (input: {
  readonly dbPath?: string;
  readonly layout?: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
}): PitfallRegistry => {
  const dbPath =
    input.dbPath ??
    (input.layout !== undefined
      ? resolveTokenSaverDbPath(input.layout)
      : (() => {
          throw new Error("createPitfallRegistry requires dbPath or layout");
        })());

  const db = openPitfallDb(dbPath);
  seedPitfallsIdempotent(db);

  return {
    dbPath,
    listPitfalls: (listInput) => listPitfallsFromDb(db, listInput),
    getPitfall: (getInput) => getPitfallFromDb(db, getInput),
    upsertPitfall: (upsertInput) => upsertPitfallInDb(db, upsertInput),
    recordHit: (hitInput) => recordPitfallHitInDb(db, hitInput),
    matchPitfalls: (matchInput) => matchPitfallsFromDb(db, matchInput),
    close: () => closePitfallDb(db),
  };
};
