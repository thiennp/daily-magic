import { oneLine } from "@agent-witch/shared/pitfalls";

import type { Pitfall, PitfallBotLine } from "../../public-api/types";

/** Compact `{ id, avoidance }` rows (whitespace collapsed) for bot payloads. */
export const toPitfallBotLines = (
  pitfalls: readonly Pitfall[],
): readonly PitfallBotLine[] =>
  pitfalls.map((pitfall) => ({
    id: oneLine(pitfall.id),
    avoidance: oneLine(pitfall.avoidance),
  }));
