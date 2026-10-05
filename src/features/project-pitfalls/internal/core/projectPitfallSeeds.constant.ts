import type { ProjectPitfallContent } from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { PROJECT_PITFALL_SEEDS_BUILD } from "@/features/project-pitfalls/internal/core/projectPitfallSeedsBuild.constant";
import { PROJECT_PITFALL_SEEDS_SAFETY } from "@/features/project-pitfalls/internal/core/projectPitfallSeedsSafety.constant";
import { PROJECT_PITFALL_SEEDS_SHIP } from "@/features/project-pitfalls/internal/core/projectPitfallSeedsShip.constant";

/**
 * Platform-owned seed templates (projectId null). Mirrored by
 * db/migrations/067-project-pitfalls.sql; the runtime schema ensure re-syncs
 * global rows from this list. Projects override a seed by upserting the same id.
 */
export const PROJECT_PITFALL_SEEDS: readonly ProjectPitfallContent[] = [
  ...PROJECT_PITFALL_SEEDS_BUILD,
  ...PROJECT_PITFALL_SEEDS_SHIP,
  ...PROJECT_PITFALL_SEEDS_SAFETY,
];
