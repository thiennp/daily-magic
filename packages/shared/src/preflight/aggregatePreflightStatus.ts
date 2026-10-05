import type { PreflightCheckResult } from "./PreflightResult.type";
import type { PreflightResultStatus } from "./preflightStatus.constant";

/**
 * Roll-up: any block → block, else any errored → errored,
 * else any warn → warn, else pass (skipped alone still passes).
 */
export const aggregatePreflightStatus = (
  results: readonly Pick<PreflightCheckResult, "status">[],
): PreflightResultStatus => {
  if (results.some((result) => result.status === "block")) {
    return "block";
  }
  if (results.some((result) => result.status === "errored")) {
    return "errored";
  }
  if (results.some((result) => result.status === "warn")) {
    return "warn";
  }
  return "pass";
};
