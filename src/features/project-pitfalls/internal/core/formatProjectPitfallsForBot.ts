import { formatPitfallBotLine } from "@agent-witch/shared/pitfalls";
import type { ProjectPitfallView } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

/** Compact `id|avoidance` lines for bot prompts (format=bot). */
export const formatProjectPitfallsForBot = (
  pitfalls: readonly ProjectPitfallView[],
): string => pitfalls.map((pitfall) => formatPitfallBotLine(pitfall)).join("\n");
