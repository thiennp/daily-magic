import type {
  ProjectPitfallUpsertInput,
  ProjectPitfallView,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";

/**
 * Full-content upsert for an existing merged pitfall with a new source, the
 * same shape the AWL Pitfalls tab sends to retire ("retired") or restore
 * ("project"). Counters and projectId are never copied. Pure.
 */
export const toProjectPitfallUpsert = (
  view: ProjectPitfallView,
  source: ProjectPitfallUpsertInput["source"],
): ProjectPitfallUpsertInput => ({
  id: view.id,
  symptom: view.symptom,
  cause: view.cause,
  avoidance: view.avoidance,
  check: view.check,
  keywords: view.keywords,
  tags: view.tags,
  severity: view.severity,
  source,
});
