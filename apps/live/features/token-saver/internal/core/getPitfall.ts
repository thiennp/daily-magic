import type { GetPitfallInput, Pitfall } from "../../public-api/types";
import type { PitfallDatabase } from "./openPitfallDb";
import { selectPitfall } from "./pitfallDbStatements";
import { listShadowedPitfalls } from "./listPitfalls";

export const getPitfallFromDb = (
  db: PitfallDatabase,
  input: GetPitfallInput,
): Pitfall | null => {
  const projectId = input.projectId ?? null;
  if (projectId === null || projectId === "") {
    return selectPitfall(db, null, input.id);
  }

  const shadowed = listShadowedPitfalls(db, {
    projectId,
    includeRetired: true,
  });
  return shadowed.find((row) => row.id === input.id) ?? null;
};
