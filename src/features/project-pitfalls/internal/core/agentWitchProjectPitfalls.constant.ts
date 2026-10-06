import { AGENTWITCH_PROJECT_PITFALLS_BUILD } from "@/features/project-pitfalls/internal/core/agentWitchProjectPitfallsBuild.constant";
import { AGENTWITCH_PROJECT_PITFALLS_SAFETY } from "@/features/project-pitfalls/internal/core/agentWitchProjectPitfallsSafety.constant";
import { AGENTWITCH_PROJECT_PITFALLS_SHIP } from "@/features/project-pitfalls/internal/core/agentWitchProjectPitfallsShip.constant";
import type { ProjectPitfallContent } from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { PROJECT_PITFALL_AGENTWITCH_PROJECT_ID } from "@agent-witch/shared/pitfalls";

/** The AgentWitch (daily-magic) project that owns the former daily-magic seeds. */
export const AGENTWITCH_PROJECT_ID = PROJECT_PITFALL_AGENTWITCH_PROJECT_ID;

/**
 * Former platform seeds that only make sense for daily-magic. Since 099 they
 * live as source='project' rows on AGENTWITCH_PROJECT_ID; the global seed rows
 * are retired. Mirrored by db/migrations/099-project-pitfall-seeds-project-scoped.sql.
 */
export const AGENTWITCH_PROJECT_PITFALLS: readonly ProjectPitfallContent[] = [
  ...AGENTWITCH_PROJECT_PITFALLS_BUILD,
  ...AGENTWITCH_PROJECT_PITFALLS_SHIP,
  ...AGENTWITCH_PROJECT_PITFALLS_SAFETY,
];
