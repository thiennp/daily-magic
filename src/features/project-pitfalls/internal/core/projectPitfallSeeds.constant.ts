import type { ProjectPitfallContent } from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { PROJECT_PITFALL_SEEDS_SAFETY } from "@/features/project-pitfalls/internal/core/projectPitfallSeedsSafety.constant";

/**
 * Platform-owned seed templates (projectId null), shown on every project, so
 * only rules that fit any software project belong here. The runtime schema
 * ensure re-syncs global rows from this list and retires any other global
 * seed row. AgentWitch-only rules moved to AGENTWITCH_PROJECT_PITFALLS (094).
 * Projects override a seed by upserting the same id.
 */
export const PROJECT_PITFALL_SEEDS: readonly ProjectPitfallContent[] = [
  ...PROJECT_PITFALL_SEEDS_SAFETY,
];
