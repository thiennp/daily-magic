import { formatPitfallBotLine } from "@agent-witch/shared/pitfalls";

import type {
  ListPitfallsInput,
  Pitfall,
  PitfallBotLine,
} from "../../public-api/types";
import { toPitfallBotLines } from "./formatPitfallsForBot";
import type { PitfallDatabase } from "./openPitfallDb";
import { selectPitfallsByProjectId } from "./pitfallDbStatements";
import { shadowPitfalls } from "./shadowPitfalls";

export type ListPitfallsResult =
  | { readonly format: "full"; readonly items: readonly Pitfall[] }
  | {
      readonly format: "bot";
      readonly items: readonly PitfallBotLine[];
      readonly lines: readonly string[];
    };

export const listShadowedPitfalls = (
  db: PitfallDatabase,
  input: Pick<ListPitfallsInput, "projectId" | "includeRetired"> = {},
): readonly Pitfall[] => {
  const projectId = input.projectId ?? null;
  // Seed rows carry the querying project's hit counters (pitfall_hits).
  const seeds = selectPitfallsByProjectId(db, null, projectId);
  const projectRows =
    projectId === null || projectId === ""
      ? []
      : selectPitfallsByProjectId(db, projectId);

  return shadowPitfalls({
    seeds,
    projectRows,
    includeRetired: input.includeRetired === true,
  });
};

export const listPitfallsFromDb = (
  db: PitfallDatabase,
  input: ListPitfallsInput = {},
): ListPitfallsResult => {
  const items = listShadowedPitfalls(db, input);

  if (input.format === "bot") {
    return {
      format: "bot",
      items: toPitfallBotLines(items),
      lines: items.map((item) => formatPitfallBotLine(item)),
    };
  }

  return { format: "full", items };
};
