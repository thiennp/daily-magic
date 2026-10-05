import type { MatchPitfallsInput, Pitfall } from "../../public-api/types";
import { listShadowedPitfalls } from "./listPitfalls";
import { matchPitfallsByKeywords } from "./matchPitfallsByKeywords";
import type { PitfallDatabase } from "./openPitfallDb";

export const matchPitfallsFromDb = (
  db: PitfallDatabase,
  input: MatchPitfallsInput,
): readonly Pitfall[] => {
  const pitfalls = listShadowedPitfalls(db, {
    projectId: input.projectId,
    includeRetired: false,
  });
  return matchPitfallsByKeywords({
    pitfalls,
    text: input.text,
  });
};
