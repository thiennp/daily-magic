import type { GetPitfallInput, Pitfall } from "../../public-api/types";
import type { PitfallDatabase } from "./openPitfallDb";
import { selectPitfall } from "./pitfallDbStatements";
import { listShadowedPitfalls } from "./listPitfalls";

/** Lookup by trimmed id; project lookups return the shadowed row. */
export const getPitfallFromDb = (
  db: PitfallDatabase,
  input: GetPitfallInput,
): Pitfall | null => {
  const id = input.id.trim();
  if (id.length === 0) {
    return null;
  }

  const projectId = input.projectId ?? null;
  if (projectId === null || projectId === "") {
    return selectPitfall(db, null, id);
  }

  const shadowed = listShadowedPitfalls(db, {
    projectId,
    includeRetired: true,
  });
  return shadowed.find((row) => row.id === id) ?? null;
};
