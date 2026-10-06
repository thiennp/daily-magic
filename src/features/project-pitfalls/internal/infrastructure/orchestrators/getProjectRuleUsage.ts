import { buildRuleUsageResponse } from "@/features/project-pitfalls/internal/core/buildRuleUsageResponse";
import { parseRuleUsageDays } from "@/features/project-pitfalls/internal/core/parseRuleUsageDays";
import type { ProjectPitfallFailure } from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import type { ProjectRuleUsageResult } from "@/features/project-pitfalls/internal/core/ruleUsage.type";
import { listProjectPitfalls } from "@/features/project-pitfalls/internal/infrastructure/orchestrators/listProjectPitfalls";

/**
 * Read-only rule usage + overlaps for a project (Safety / pitfalls registry).
 * ?days= is validated (1..90, default 30) for forward-compat; hitCount is
 * all-time so windowDays stays null until a per-hit event log exists.
 */
export const getProjectRuleUsage = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly daysRaw: string | null;
}): Promise<ProjectRuleUsageResult | ProjectPitfallFailure> => {
  const parsedDays = parseRuleUsageDays(input.daysRaw);
  if (!parsedDays.ok) {
    return parsedDays;
  }
  void parsedDays.days;
  const listed = await listProjectPitfalls({
    actorUserId: input.actorUserId,
    projectId: input.projectId,
    includeRetired: true,
  });
  if (!listed.ok) {
    return listed;
  }
  return buildRuleUsageResponse({
    projectId: input.projectId.trim(),
    pitfalls: listed.pitfalls,
  });
};
