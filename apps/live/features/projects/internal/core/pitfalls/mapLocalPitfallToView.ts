import type { ProjectPitfallView } from "@agent-witch/shared/pitfalls";
import type { Pitfall } from "@agent-witch/live-token-saver/types";

/**
 * Maps an AWL local registry `Pitfall` row to the shared UI `ProjectPitfallView`.
 * Local rows have no `updatedAt`; seed override is inferred from source.
 */
export const mapLocalPitfallToView = (
  pitfall: Pitfall,
): ProjectPitfallView => ({
  id: pitfall.id,
  projectId: pitfall.projectId,
  symptom: pitfall.symptom,
  cause: pitfall.cause,
  avoidance: pitfall.avoidance,
  check: pitfall.check,
  keywords: pitfall.keywords,
  tags: pitfall.tags,
  severity: pitfall.severity,
  source: pitfall.source,
  overridesSeed: pitfall.source !== "seed",
  hitCount: pitfall.hitCount,
  lastSeenAt: pitfall.lastSeenAt,
  updatedAt: null,
});
