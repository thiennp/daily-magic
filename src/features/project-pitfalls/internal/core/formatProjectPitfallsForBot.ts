import type { ProjectPitfallView } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

const oneLine = (text: string): string => text.replace(/\s+/g, " ").trim();

/** Compact `id|avoidance` lines for bot prompts (format=bot). */
export const formatProjectPitfallsForBot = (
  pitfalls: readonly ProjectPitfallView[],
): string =>
  pitfalls
    .map((pitfall) => `${pitfall.id}|${oneLine(pitfall.avoidance)}`)
    .join("\n");
