import type { ProjectPitfallView } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

/** Title (symptom) + avoidance text used for duplicate/overlap. Pure. */
export const ruleCompareTextForOverlap = (
  pitfall: ProjectPitfallView,
): string => `${pitfall.symptom} ${pitfall.avoidance}`;
